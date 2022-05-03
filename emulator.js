function Emulator(memory, ip)
{
    // Video canvas:
    this.videoCanvas = document.createElement('canvas')
    this.videoCanvas.width  = 320
    this.videoCanvas.height = 200

    this.state = this.STARTING
    this.reset(memory || [], ip || 0)
}

// Runtime state
Emulator.prototype.STARTING = {'toString': function(){return "STARTING"}}
Emulator.prototype.RUNNING  = {'toString': function(){return "RUNNING"}}
Emulator.prototype.WAITING  = {'toString': function(){return "WAITING"}}
Emulator.prototype.FINISHED = {'toString': function(){return "FINISHED"}}

Emulator.prototype.scancode_map = (function(){
    // Construct table for converting keycodes to scancodes (not complete!)
    var ascii_scancodes = "  1234567890-=  QWERTYUIOP    ASDFGHJKL    \\ZXCVBNM,./"
    var scancode_map = {
         9: 0x0f,   // tab
        13: 0x1c,   // enter
        27: 0x01,   // escape
        32: 0x39,   // space
        37: 0x4b,   // left
        38: 0x48,   // up
        39: 0x4d,   // right
        40: 0x50 }  // down
    for (i in ascii_scancodes) {
        if (ascii_scancodes.charAt(i) != ' ') {
            scancode_map[ascii_scancodes.charCodeAt(i)] = i
        }
    }
    return scancode_map
})()

Emulator.prototype.reset = function(memory, ip)
{
    // Registers and flags:
    this.ax = this.bx = this.cx = this.dx = 0
    this.si = this.di = this.bp = 0
    this.cs = this.ds = this.es = 0
    this.cf = this.zf = this.sf = this.of = this.df = 0
    this.ip = ip
    this.stack = []

    // Copy memory
    this.memory = memory.slice(0)

    // BIOS equipment word:
    this.bios_equipment_list = 0x0020  // 80x25 color mode and nothing else

    // Keyboard input:
    this.keyboard_buffer = []

    // Video text
    this.graphics_mode = 0
    this.cursor_row = this.cursor_col = 0

    // Video memory
    // officially, the CGA adapter has 16K of memory, but Paratroopers writes
    // way outside of that, so allocate some extra space:
    this.video_memory_size = 65536

    // Video frame drawing statitics:
    this.last_frame = this.num_frames = this.fps = 0
    this.video_dirty = false

    // PC speaker:
    this.speaker_state = -1
    this.speaker_freq  = 0
    this.speaker_on    = 0

    this.videoContext = this.videoCanvas.getContext('2d')
    this.videoContext.fillRect(0, 0, 320, 200)
    this.videoBuffer = this.videoContext.getImageData(0, 0, 320, 200)
    this.videoData = this.videoBuffer.data

    this.state = this.RUNNING
}

Emulator.prototype.feedKey = function(code)
{
    if (!this.scancode_map[code]) return false
    this.keyboard_buffer.push(code&255 | this.scancode_map[code]<<8)
    return true
}

Emulator.prototype.emul_alert = function(msg)
{
    alert(msg + " (cs:ip=0x" + this.cs.toString(16) + ":0x" + this.ip.toString(16) + ")")
}

//
// Stack access
//

Emulator.prototype.pushw = function(value)
{
    return this.stack.push(value)
}

Emulator.prototype.popw = function(value)
{
    if (this.stack.length == 0) {
        emul_alert('Tried to pop an empty stack!')
        return 0
    }
    return this.stack.pop(value)
}

//
// Memory access
//

Emulator.prototype.loadb = function (addr)
{
    if (addr >= 0 && addr < this.memory.length) {  // main memory
        return this.memory[addr]
    }
    this.emul_alert('Tried to read byte at out-of-range address ' + addr)
    return 0
}

Emulator.prototype.loadw = function(addr)
{
    if (addr >= 0 && addr + 1 < this.memory.length) {  // main memory
        return this.memory[addr] | this.memory[addr+1]<<8
    }
    emul_alert('Tried to read word at out-of-range address ' + addr)
    return 0
}

Emulator.prototype.write_pixel_data = function(x, y, count, bits)
{
    var data = this.videoData
    var j = 4*(320*y + x + count)
    while (count-- > 0) {
        --j
        switch (bits&3)
        {
        case 0:  // black
            data[--j] = 0
            data[--j] = 0
            data[--j] = 0
            break

        case 1:  // cyan
            data[--j] = 255
            data[--j] = 255
            data[--j] = 0
            break

        case 2:  // magenta
            data[--j] = 255
            data[--j] = 0
            data[--j] = 255
            break

        case 3:  // white
            data[--j] = 255
            data[--j] = 255
            data[--j] = 255
            break
        }
        bits >>= 2
    }
    this.video_dirty = true
}

Emulator.prototype.update_video_frame = function()
{
    if (!this.video_dirty) return false
    var sec = new Date().getSeconds()
    if (sec == this.last_frame) {
        ++this.num_frames
    } else {
        this.fps = this.num_frames
        this.last_frame = sec
        this.num_frames = 0
    }
    this.videoContext.putImageData(this.videoBuffer, 0, 0)
    this.video_dirty = false
    return true
}

Emulator.prototype.storeb = function(addr, value)
{
    if (addr >= 0 && addr < this.memory.length) {  // main memory
        this.memory[addr] = value
        return
    }
    if (addr >= 0xb8000 && addr < 0xb8000 + this.video_memory_size) {  // video memory
        if (addr >= 0xb8000 && addr < 0xb8000 + 8000) {  // first interlaced frame
            var x = (addr - 0xb8000)%80
            var y = (addr - 0xb8000 - x)/40
            this.write_pixel_data(4*x, y, 4, value)
        }
        else
        if (addr >= 0xba000 && addr < 0xba000 + 8000) {  // second interlaced frame
            var x = (addr - 0xba000)%80
            var y = (addr - 0xba000 - x)/40
            this.write_pixel_data(4*x, y + 1, 4, value)
        }
        return
    }
    this.emul_alert('Tried to write byte at out-of-range address ' + addr)
}

Emulator.prototype.storew = function(addr, value)
{
    if (addr >= 0 && addr + 1 < this.memory.length) {  // main memory
        this.memory[addr]   = value&0xff
        this.memory[addr+1] = value>>8
        return
    }
    if (addr >= 0xb8000 && addr < 0xb8000 + this.video_memory_size) {  // video memory
        if (addr >= 0xb8000 && addr < 0xb8000 + 8000) {  // first interlaced frame
            var x = (addr - 0xb8000)%80
            var y = (addr - 0xb8000 - x)/40
            this.write_pixel_data(4*x, y, 8, ((value&0xff)<<8) | ((value&0xff00)>>8))
        }
        else
        if (addr >= 0xba000 && addr < 0xba000 + 8000) {  // second interlaced frame
            var x = (addr - 0xba000)%80
            var y = (addr - 0xba000 - x)/40
            this.write_pixel_data(4*x, y + 1, 8, ((value&0xff)<<8) | ((value&0xff00)>>8))
        }
        return
    }
    this.emul_alert('Tried to write word at out-of-range address ' + addr)
}

//
//  Arithmetic
//

Emulator.prototype.addb = function(x, y)
{
    this.cf = +(x+y > 0xff)
    this.sf = +((x+y&0x80) != 0)
    this.of = +((x&0x80) == (y&0x80) && (x&0x80) != (x+y&0x80))
    this.zf = +((x+y&0xff) == 0)
    return x+y&0xff
}

Emulator.prototype.addw = function(x, y)
{
    this.cf = +(x+y > 0xffff)
    this.sf = +((x+y&0x8000) != 0)
    this.of = +((x&0x8000) == (y&0x8000) && (x&0x8000) != (x+y&0x8000))
    this.zf = +((x+y&0xffff) == 0)
    return x+y&0xffff
}

Emulator.prototype.subb = function(x, y)
{
    this.cf = +(x < y)
    this.sf = +((x-y&0x80) != 0)
    this.of = +((x&0x80) != (y&0x80) && (x&0x80) != (x-y&0x80))
    this.zf = +((x-y&0xff) == 0)
    return x-y&0xff
}

Emulator.prototype.subw = function(x, y)
{
    this.cf = +(x < y)
    this.sf = +((x-y&0x8000) != 0)
    this.of = +((x&0x8000) != (y&0x8000) && (x&0x8000) != (x-y&0x8000))
    this.zf = +((x-y&0xffff) == 0)
    return x-y&0xffff
}

Emulator.prototype.mulb = function(x)
{
    this.ax = this.al*x
    if (this.ax&0xff00) {
        this.cf = this.of = 1
    } else {
        this.cf = this.of = 0
    }
}

Emulator.prototype.mulw = function(x)
{
    var res = this.ax*x
    this.ax = res&0xffff
    this.dx = res >> 16
    if (this.dx) {
        this.cf = this.of = 1
    } else {
        this.cf = this.of = 0
    }
}

Emulator.prototype.idivb = function(y)
{
    var x = this.ax
    if (x >= 0x8000) x -= 0x10000
    this.ax = parseInt(x/y)&0xff | (x%y&0xff)<<8
}

Emulator.prototype.idivw = function(y)
{
    var x = this.dx<<16 | this.ax
    if (x >= 0x80000000) x -= 0x100000000
    this.ax = parseInt(x/y)&0xffff
    this.dx = x%y&0xffff
}

//
//  Logic
//

Emulator.prototype.set_logic_flags_b = function(i)
{
    this.of = 0
    this.cf = 0
    this.zf = +(i == 0)
    this.sf = +((i&0x80) != 0)
}

Emulator.prototype.set_logic_flags_w = function(i)
{
    this.of = 0
    this.cf = 0
    this.zf = +(i == 0)
    this.sf = +((i&0x8000) != 0)
}

Emulator.prototype.andb = function(x, y) { x &= y; this.set_logic_flags_b(x); return x }
Emulator.prototype.andw = function(x, y) { x &= y; this.set_logic_flags_w(x); return x }
Emulator.prototype.orb = function(x, y)  { x |= y; this.set_logic_flags_b(x); return x }
Emulator.prototype.orw = function(x, y)  { x |= y; this.set_logic_flags_w(x); return x }
Emulator.prototype.xorb = function(x, y) { x ^= y; this.set_logic_flags_b(x); return x }
Emulator.prototype.xorw = function(x, y) { x ^= y; this.set_logic_flags_w(x); return x }

Emulator.prototype.shlw = function(x, y)
{
    y &= 31
    this.of = 0                      // FIXME: this should be updated if y == 1
    this.cf = +((x & 0x10000>>y) != 0)
    x = (x << y)&0xffff
    this.zf = +(x == 0)
    this.sf = +((x&0x8000) != 0)
    return x
}

Emulator.prototype.shrw = function(x, y)
{
    y &= 31
    this.of = 0                     // FIXME: this should be updated if y == 1
    this.cf = (y ? (x >> y-1)&1 : 0)
    x >>>= y
    this.zf = +(x == 0)
    this.sf = +((x&0x8000) != 0)
    return x
}

Emulator.prototype.sarw = function(x, y) {
    y &= 31
    if (x >= 0x8000) x -= 0x10000
    this.of = 0
    this.cf = (y ? (x >> y-1)&1 : 0)
    x = (x >> y)&0xffff
    this.zf = +(x == 0)
    this.sf = +((x&0x8000) != 0)
    return x
}

Emulator.prototype.rorb = function(x, y)  // FIXME: should update some flags
{
    y &= 7
    return y ? (x>>y | x<<8-y) : y
}

Emulator.prototype.rolb = function(x, y)  // FIXME: should update some flags
{
    y &= 7
    return y ? (x<<y | x>>8-y) : y
}

Emulator.prototype.rorw = function(x, y)  // FIXME: should update some flags
{
    y &= 15
    return y ? (x>>y | x<<16-y) : y
}

Emulator.prototype.rolw = function(x, y)  // FIXME: should update some flags
{
    y &= 15
    return y ? (x<<y | x>>16-y) : y
}

Emulator.prototype.hlt = function()
{
    // FIXME: we should yield the thread for a while!
    // (In reality, this function is never called.)
}

Emulator.prototype.int = function(i)
{
    var ah = this.ax>>8, al = this.ax&0xff
    var bh = this.bx>>8, bl = this.bx&0xff
    var dh = this.dx>>8, dl = this.dx&0xff

    switch (i)
    {
    case 0x10: // video
        switch (ah)
        {
        case 0x00:  // set video mode
            if (al >= 0 && al <= 5) {
                // we'll allow these modes even though we don't really switch:
                this.graphics_mode = al
            } else {
                this.emul_alert('Unsupported video mode (' + al + ') requested!')
            }
            break;

        case 0x02:  // set curser position
            // NB. page number (in bh) is ignored.
            this.cursor_row = dh
            this.cursor_col = dl
            break

        case 0x0b: // set background color/color palette
            switch (bh)
            {
            case 0:
                // We only accept background color 16 (intense, black).
                if (bl != 16) emul_alert('Unsupported background color requested! bl=' + bl)
                break;
            case 1:
                //  We only accept one palette (cyan/magenta/white).
                if (bl != 1) emul_alert('Unsupported palette requested! bl=' + bl)
                break;
            default:
                this.emul_alert('Unsupport video request! ah=' + ah + ' bh=' + bh)
            }
            break;

        case 0x0c: // write graphics pixel
            // NB. page number (in bh) is ignored
            // Officialy, we should update the video memory too, and if bit 7
            // of AL is set, we should XOR the pixel instead of overwriting it.
            this.write_pixel_data(this.cx, this.dx, 1, al)
            break

        case 0x0e:  // write character to teletype output
            // NB. page number (in bh) is ignored
            var color = this.graphics_mode ? (this.bx&0xff) : 3
            if (al == 13) {
                this.cursor_col = 0
            } else if (al == 10) {
                this.cursor_row += 1
            } else if (al < 128) {
                for (var i = 0; i < 8; ++i) {
                    this.write_pixel_data(8*this.cursor_col, 8*this.cursor_row + i, 8, color*font[al][i])
                }
                this.cursor_col += 1
            }
            if (this.cursor_col == 40) {
                this.cursor_col = 0
                this.cursor_row += 1
            }
            if (this.cursor_row == 25) {
                // FIXME: should scroll display!
                this.cursor_row = 24
            }
            break;

        default:
            this.emul_alert('Video interrupt 0x10 called! ah=' + ah)
        }
        break

    case 0x11: // bios: get equipment list
        this.ax = this.bios_equipment_list
        break

    case 0x16:  // keyboard
        switch (ah)
        {
        case 0:  // read keyboard input
            if (this.keyboard_buffer.length > 0) {
                this.ax = this.keyboard_buffer.shift()
            } else {
                // HACK: update IP to redo INT instruction
                this.ip -= 2
                this.state = this.WAITING
            }
            break

        case 1:  // query keyboard status
            if (this.keyboard_buffer.length == 0) {
                this.zf = 1
            } else {
                this.zf = 0
                this.ax = this.keyboard_buffer[0]
            }
            break

        default:
            this.emul_alert('Keyboard interrupt 0x16 called! ah=' + ah)
        }
        break

    case 0x1a:  // time
        if (ah == 0) {
            /* FIXME: timestamp should really be number of clockcycles since
               midnight, and ax should be set to 1 whenever midnight occured
               since the last call to this function. */
            var clocks = Math.floor(new Date().getTime() * 18.20648e-3)
            this.cx = (clocks>>16)&0xffff
            this.dx = clocks&0xffff
            // DEBUG: deterministic updates instead:
            //this.cx = (steps/1000&0xffff0000)>>16
            //this.dx = (steps/1000)&0xffff
            this.ax = 0
        } else {
            this.emul_alert('Time interrupt 0x1a called! ah=' + ah)
        }
        break

    case 0x21:  // DOS
        if (ah == 0x4c) {  // exit program
            this.state = this.FINISHED
        } else {
            this.emul_alert('DOS interrupt 0x21 called! ah=' + ah)
        }
        break

    default:
        this.emul_alert('Unknown interrupt (' + i + ') called! ax=' + ax)
    }
}

Emulator.prototype.inb = function(port, value)
{
    switch (port)
    {
    case 0x201:  // joystick
        return 0xf0

    default:
        this.emul_alert('Input from unknown port ' + port + '!')
        return 0
    }
}

Emulator.prototype.outb = function(port, value)
{
    switch (port)
    {
    case 0x201:  // joystick
        break

    case 0x42:  // speaker timer
        // Update the speaker frequency (one of two bytes)
        if (this.speaker_state < 0) {
            this.speaker_state = value
        } else {
            var new_freq = 1193180/(this.speaker_state | value<<8)
            this.speaker_state = -1
            if (new_freq != this.speaker_freq) {
                this.speaker_freq = new_freq
            }
        }
        break

    case 0x43:  // timer control
        break

    case 0x61:  // NMI Status & Control Register
        // Bit 0 turns the speaker on or off (useful to modulate the volume)
        // Bit 1 turns the speaker timer on and off
        // Paratrooper always sets bit 0, but may toggle bit 1
        this.speaker_on = (value&3) == 3
        break

    default:
        this.emul_alert('Output to uknown port ' + port + '!')
    }
}

Emulator.prototype.next_address = function()
{
    return this.state == this.RUNNING ? 16*this.cs + this.ip : -1
}

Emulator.prototype.resume = function()
{
    if (this.state != this.WAITING) return false
    this.state = this.RUNNING
    return true
}

Emulator.prototype.suspend = function()
{
    if (this.state != this.RUNNING) return false
    this.state = this.WAITING
    return true
}

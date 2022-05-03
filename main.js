var machine
var pressEvent
var pressed

function initialize()
{
    // Global state:
    fullscreen = muted = paused = false
    player_name = null
    start_ip = 0x100
    instrs = decode_smart(start_ip)
    canvas = elem('ScreenCanvas')
    hooks = { }
    stop_all_audio = function() { }

    // Set up all hooks:
    hooks[0x2f3] = on_level_complete
    for (var i in instrs) {
        var instr = instrs[i]
        if (instr.instr == "INT" && instr.args[0] == 0x16) {
            hooks[instr.begin] = redraw_screen
        }
    }
    add_audio_hook('intro', 1, [0x01dc], [])
    add_audio_hook('outro', 1, [0x0d18], [])
    add_audio_hook('shot',  3, [0x0cc9, []])
    add_audio_hook('crash', 2, [0x10ae, 0x12bd, 0x1320], [])
    add_audio_hook('bomb',  1, [0x0b9a], [0x132d])

    emulate = eval(generate_code(instrs, hooks))
    machine = new Emulator(memory, start_ip)

    elem("screen").appendChild(machine.videoCanvas)
    elem("text").remove()

    // get_high_scores(update_high_scores)

    run()
}

function run()
{
    if (!paused && emulate(machine, 500)) {
        var i = machine.next_address()
        if (hooks[i]) hooks[i]()
    } else {
        if (paused || machine.state == machine.WAITING) {
            setTimeout(run, 100)
            return
        }
        if (machine.state == machine.FINISHED) {
            stop_all_audio()
            machine.reset(memory, start_ip)
        }
    }
    setTimeout(run, 0)
}

function add_audio_hook(which, nbuffer, start_addrs, stop_addrs)
{
    var audio_formats = ["mp3"]
    var buffers = []
    for (var n = 0; n < nbuffer; ++n) {
        var audio = document.createElement('audio')
        audio.preload = "auto"
        for (var i in audio_formats) {
            var source = document.createElement('source')
            source.src = 'audio/' + which + '.' + audio_formats[i]
            audio.appendChild(source)
        }
        document.body.appendChild(audio)
        buffers.push(audio)
    }
    var current = nbuffer - 1
    var start_callback = function() {
        if (muted) return
        current = (current + 1)%nbuffer
        var audio = buffers[current]
        if (audio.currentTime) audio.currentTime = 0
        audio.play()
    }
    var stop_callback  = function() {
        var audio = buffers[current]
        audio.pause()
    }
    for (var i in start_addrs) {
        hooks[start_addrs[i]] = start_callback
    }
    for (var i in stop_addrs) {
        hooks[stop_addrs [i]] = stop_callback
    }
    var old_stop_all_audio = stop_all_audio
    stop_all_audio = function() {
      for (var n = 0; n < nbuffer; ++n) buffers[n].pause()
      old_stop_all_audio()
    }
}

function elem(id)
{
    return document.getElementById(id)
}

function redraw_screen()
{
    if (machine.update_video_frame()) {
        if (!machine.num_frames) {
            // if (console && console.log) console.log(machine.fps + " FPS")
            var span = document.getElementById('Fps')
            if (span && span.firstChild) span.firstChild.data = machine.fps
        }
    }
}

function update_high_scores(data)
{
    var table = elem('HighScoresTable')
    while (table.firstChild) table.removeChild(table.lastChild)
    for (var i = 0; i < data.length; ++i) {
        var tr = document.createElement('tr')
        var td = document.createElement('td')
        td.className = 'position'
        td.appendChild(document.createTextNode((i + 1) + '.'))
        tr.appendChild(td)
        var td = document.createElement('td')
        td.className = 'name'
        td.appendChild(document.createTextNode(data[i]['Name']))
        tr.appendChild(td)
        var td = document.createElement('td')
        td.className = 'score'
        td.appendChild(document.createTextNode(data[i]['Score']))
        tr.appendChild(td)
        table.appendChild(tr)
    }
}

function on_level_complete()
{
    /*check_score(function(val){
        if (val == true) {
          player_name = prompt("Congratulations, you achieved a high score! Enter your name below:", player_name === null ? '' : player_name)
          if (player_name !== null) post_score(player_name, update_high_scores)
          window.focus()
        }
    })*/
}

function toggleFullscreen()
{
    setFullscreen(!fullscreen)
}

function setFullscreen(value)
{
    fullscreen = !!value
    var icon = elem("ToggleFullscreen")
    icon.src = "img/fs-" + (fullscreen?"off":"on") + ".png"
    var canvas = machine.videoCanvas
    if (fullscreen) {
        var holder = elem("FullScreenHolder")
        holder.style.visibility = "visible"
        var width = holder.clientWidth, height = holder.clientHeight
        var ratio = Math.min(width/320, height/200)
        canvas.style.width = Math.floor(ratio*320) + 'px'
        canvas.style.height = Math.floor(ratio*200) + 'px'
        canvas.style.position = "absolute"
        canvas.style.left = Math.ceil((width - ratio*320)/2) + "px"
        canvas.style.top  = Math.ceil((height - ratio*200)/2) + "px"
        elem("FullScreen").appendChild(canvas)
        elem("ScreenIcons").style.visibility = "hidden"
        elem("FullScreenIcons").appendChild(elem("Icons"))
        window.scrollTo(0, 0)
    } else {
        canvas.style.width = '320px'
        canvas.style.height = '200px'
        canvas.style.position = 'static'
        canvas.style.left = '0px'
        canvas.style.top = '0px'
        elem("FullScreenIcons").style.visibility = "hidden"
        elem("FullScreenHolder").style.visibility = "hidden"
        elem("ScreenIcons").appendChild(elem("Icons"))
        elem("screen").appendChild(canvas)
    }
}

function toggleMuted()
{
    muted = !muted
    var icon = elem("ToggleMuted")
    icon.src = "img/muted-" + (muted?"on":"off") + ".png"
    if (muted) stop_all_audio()
}

document.onkeydown = function(event) {
    if (!event) var event = window.event
    var code = event.keyCode ? event.keyCode : event.which
    var mods = (event.shiftKey?1:0) | (event.ctrlKey?2:0) | (event.altKey?4:0) | (event.metaKey?8:0)
    processKey(code, mods)
}

function processKey(code, mods) {
    var char = String.fromCharCode(code)
    if (mods == 2 && char == 'F') { /* ctrl-F */
        toggleFullscreen()
        return false
    }
    if (mods == 2 && char == 'M') { /* ctrl-M */
        toggleMuted()
        return false
    }
    if (mods == 0 && code == 42) { /* pause/break */
        paused = !paused
        return false
    }
    if (mods == 0 && machine && machine.feedKey(code))
    {
        if (machine.resume()) run()
        return false
    }
}

function simulateKey(event) {
    if (!machine) {
        initialize();
        return;
    }
    if (machine.state.toString() === "WAITING") {
        processKey(32, 0) // SPACE
    } else {
        var x = event.clientX;
        if (event.touches && event.touches[0]) {
            x = event.touches[0].clientX;
        }
        if (x !== undefined) {
            var offset = 35 / 2 * window.innerWidth / 320;
            if (x < window.innerWidth / 2 - offset) {
                processKey(37, 0) // LEFT
            } else if (x > window.innerWidth / 2 + offset) {
                processKey(39, 0) // RIGHT
            } else {
                processKey(38, 0) // UP (SHOOT)
            }
        }
    }
}

window.addEventListener("touchstart", function(event) {
    pressEvent = event;
    pressed = true;
    event.preventDefault()
})

window.addEventListener("touchmove", function(event) {
    pressEvent = event;
    pressed = true;
    event.preventDefault()
})

window.addEventListener("touchend", function(event) {
    pressEvent = undefined;
    pressed = false;
    event.preventDefault()
})

window.addEventListener("mousedown", function(event) {
    pressEvent = event;
    pressed = true;
    event.preventDefault()
})

window.addEventListener("mousemove", function(event) {
    pressEvent = event;
    pressed = event.buttons > 0;
    event.preventDefault()
})

window.addEventListener("mouseup", function(event) {
    pressEvent = undefined;
    pressed = false;
    event.preventDefault()
})

setInterval(() => {
    if (pressed && pressEvent) {
        simulateKey(pressEvent);
    }
}, 100);

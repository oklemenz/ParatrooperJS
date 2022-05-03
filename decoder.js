//
//  8086 opcode maps (adapted from: http://www.mlsite.net/8086/)
//

var one_byte_opcode_map = {
    0x00: ["ADD","Eb","Gb"],
    0x01: ["ADD","Ev","Gv"],
    0x02: ["ADD","Gb","Eb"],
    0x03: ["ADD","Gv","Ev"],
    0x04: ["ADD","AL","Ib"],
    0x05: ["ADD","eAX","Iv"],
    0x06: ["PUSH","ES"],
    0x07: ["POP","ES"],
    0x08: ["OR","Eb","Gb"],
    0x09: ["OR","Ev","Gv"],
    0x0A: ["OR","Gb","Eb"],
    0x0B: ["OR","Gv","Ev"],
    0x0C: ["OR","AL","Ib"],
    0x0D: ["OR","eAX","Iv"],
    0x0E: ["PUSH","CS"],
    0x0F: ["--"],
    0x10: ["ADC","Eb","Gb"],
    0x11: ["ADC","Ev","Gv"],
    0x12: ["ADC","Gb","Eb"],
    0x13: ["ADC","Gv","Ev"],
    0x14: ["ADC","AL","Ib"],
    0x15: ["ADC","eAX","Iv"],
    0x16: ["PUSH","SS"],
    0x17: ["POP","SS"],
    0x18: ["SBB","Eb","Gb"],
    0x19: ["SBB","Ev","Gv"],
    0x1A: ["SBB","Gb","Eb"],
    0x1B: ["SBB","Gv","Ev"],
    0x1C: ["SBB","AL","Ib"],
    0x1D: ["SBB","eAX","Iv"],
    0x1E: ["PUSH","DS"],
    0x1F: ["POP","DS"],
    0x20: ["AND","Eb","Gb"],
    0x21: ["AND","Ev","Gv"],
    0x22: ["AND","Gb","Eb"],
    0x23: ["AND","Gv","Ev"],
    0x24: ["AND","AL","Ib"],
    0x25: ["AND","eAX","Iv"],
    0x26: ["ES:"],
    0x27: ["DAA"],
    0x28: ["SUB","Eb","Gb"],
    0x29: ["SUB","Ev","Gv"],
    0x2A: ["SUB","Gb","Eb"],
    0x2B: ["SUB","Gv","Ev"],
    0x2C: ["SUB","AL","Ib"],
    0x2D: ["SUB","eAX","Iv"],
    0x2E: ["CS:"],
    0x2F: ["DAS"],
    0x30: ["XOR","Eb","Gb"],
    0x31: ["XOR","Ev","Gv"],
    0x32: ["XOR","Gb","Eb"],
    0x33: ["XOR","Gv","Ev"],
    0x34: ["XOR","AL","Ib"],
    0x35: ["XOR","eAX","Iv"],
    0x36: ["SS:"],
    0x37: ["AAA"],
    0x38: ["CMP","Eb","Gb"],
    0x39: ["CMP","Ev","Gv"],
    0x3A: ["CMP","Gb","Eb"],
    0x3B: ["CMP","Gv","Ev"],
    0x3C: ["CMP","AL","Ib"],
    0x3D: ["CMP","eAX","Iv"],
    0x3E: ["DS:"],
    0x3F: ["AAS"],
    0x40: ["INC","eAX"],
    0x41: ["INC","eCX"],
    0x42: ["INC","eDX"],
    0x43: ["INC","eBX"],
    0x44: ["INC","eSP"],
    0x45: ["INC","eBP"],
    0x46: ["INC","eSI"],
    0x47: ["INC","eDI"],
    0x48: ["DEC","eAX"],
    0x49: ["DEC","eCX"],
    0x4A: ["DEC","eDX"],
    0x4B: ["DEC","eBX"],
    0x4C: ["DEC","eSP"],
    0x4D: ["DEC","eBP"],
    0x4E: ["DEC","eSI"],
    0x4F: ["DEC","eDI"],
    0x50: ["PUSH","eAX"],
    0x51: ["PUSH","eCX"],
    0x52: ["PUSH","eDX"],
    0x53: ["PUSH","eBX"],
    0x54: ["PUSH","eSP"],
    0x55: ["PUSH","eBP"],
    0x56: ["PUSH","eSI"],
    0x57: ["PUSH","eDI"],
    0x58: ["POP","eAX"],
    0x59: ["POP","eCX"],
    0x5A: ["POP","eDX"],
    0x5B: ["POP","eBX"],
    0x5C: ["POP","eSP"],
    0x5D: ["POP","eBP"],
    0x5E: ["POP","eSI"],
    0x5F: ["POP","eDI"],
    0x60: ["--"],
    0x61: ["--"],
    0x62: ["--"],
    0x63: ["--"],
    0x64: ["--"],
    0x65: ["--"],
    0x66: ["--"],
    0x67: ["--"],
    0x68: ["--"],
    0x69: ["--"],
    0x6A: ["--"],
    0x6B: ["--"],
    0x6C: ["--"],
    0x6D: ["--"],
    0x6E: ["--"],
    0x6F: ["--"],
    0x70: ["JO","Jb"],
    0x71: ["JNO","Jb"],
    0x72: ["JB","Jb"],
    0x73: ["JNB","Jb"],
    0x74: ["JZ","Jb"],
    0x75: ["JNZ","Jb"],
    0x76: ["JBE","Jb"],
    0x77: ["JA","Jb"],
    0x78: ["JS","Jb"],
    0x79: ["JNS","Jb"],
    0x7A: ["JPE","Jb"],
    0x7B: ["JPO","Jb"],
    0x7C: ["JL","Jb"],
    0x7D: ["JGE","Jb"],
    0x7E: ["JLE","Jb"],
    0x7F: ["JG","Jb"],
    0x80: ["GRP1","Eb","Ib"],
    0x81: ["GRP1","Ev","Iv"],
    0x82: ["GRP1","Eb","Ib"],
    0x83: ["GRP1","Ev","Ib"],
    0x84: ["TEST","Gb","Eb"],
    0x85: ["TEST","Gv","Ev"],
    0x86: ["XCHG","Gb","Eb"],
    0x87: ["XCHG","Gv","Ev"],
    0x88: ["MOV","Eb","Gb"],
    0x89: ["MOV","Ev","Gv"],
    0x8A: ["MOV","Gb","Eb"],
    0x8B: ["MOV","Gv","Ev"],
    0x8C: ["MOV","Ew","Sw"],
    0x8D: ["LEA","Gv","M"],
    0x8E: ["MOV","Sw","Ew"],
    0x8F: ["POP","Ev"],
    0x90: ["NOP"],
    0x91: ["XCHG","eCX","eAX"],
    0x92: ["XCHG","eDX","eAX"],
    0x93: ["XCHG","eBX","eAX"],
    0x94: ["XCHG","eSP","eAX"],
    0x95: ["XCHG","eBP","eAX"],
    0x96: ["XCHG","eSI","eAX"],
    0x97: ["XCHG","eDI","eAX"],
    0x98: ["CBW"],
    0x99: ["CWD"],
    0x9A: ["CALL","Ap"],
    0x9B: ["WAIT"],
    0x9C: ["PUSHF"],
    0x9D: ["POPF"],
    0x9E: ["SAHF"],
    0x9F: ["LAHF"],
    0xA0: ["MOV","AL","Ob"],
    0xA1: ["MOV","eAX","Ov"],
    0xA2: ["MOV","Ob","AL"],
    0xA3: ["MOV","Ov","eAX"],
    0xA4: ["MOVSB"],
    0xA5: ["MOVSW"],
    0xA6: ["CMPSB"],
    0xA7: ["CMPSW"],
    0xA8: ["TEST","AL","Ib"],
    0xA9: ["TEST","eAX","Iv"],
    0xAA: ["STOSB"],
    0xAB: ["STOSW"],
    0xAC: ["LODSB"],
    0xAD: ["LODSW"],
    0xAE: ["SCASB"],
    0xAF: ["SCASW"],
    0xB0: ["MOV","AL","Ib"],
    0xB1: ["MOV","CL","Ib"],
    0xB2: ["MOV","DL","Ib"],
    0xB3: ["MOV","BL","Ib"],
    0xB4: ["MOV","AH","Ib"],
    0xB5: ["MOV","CH","Ib"],
    0xB6: ["MOV","DH","Ib"],
    0xB7: ["MOV","BH","Ib"],
    0xB8: ["MOV","eAX","Iv"],
    0xB9: ["MOV","eCX","Iv"],
    0xBA: ["MOV","eDX","Iv"],
    0xBB: ["MOV","eBX","Iv"],
    0xBC: ["MOV","eSP","Iv"],
    0xBD: ["MOV","eBP","Iv"],
    0xBE: ["MOV","eSI","Iv"],
    0xBF: ["MOV","eDI","Iv"],
    0xC0: ["--"],
    0xC1: ["--"],
    0xC2: ["RET","Iw"],
    0xC3: ["RET"],
    0xC4: ["LES","Gv","Mp"],
    0xC5: ["LDS","Gv","Mp"],
    0xC6: ["MOV","Eb","Ib"],
    0xC7: ["MOV","Ev","Iv"],
    0xC8: ["--"],
    0xC9: ["--"],
    0xCA: ["RETF","Iw"],
    0xCB: ["RETF"],
    0xCC: ["INT","3"],
    0xCD: ["INT","Ib"],
    0xCE: ["INTO"],
    0xCF: ["IRET"],
    0xD0: ["GRP2","Eb","1"],
    0xD1: ["GRP2","Ev","1"],
    0xD2: ["GRP2","Eb","CL"],
    0xD3: ["GRP2","Ev","CL"],
    0xD4: ["AAM","I0"],
    0xD5: ["AAD","I0"],
    0xD6: ["--"],
    0xD7: ["XLAT"],
    0xD8: ["--"],
    0xD9: ["--"],
    0xDA: ["--"],
    0xDB: ["--"],
    0xDC: ["--"],
    0xDD: ["--"],
    0xDE: ["--"],
    0xDF: ["--"],
    0xE0: ["LOOPNZ","Jb"],
    0xE1: ["LOOPZ","Jb"],
    0xE2: ["LOOP","Jb"],
    0xE3: ["JCXZ","Jb"],
    0xE4: ["IN","AL","Ib"],
    0xE5: ["IN","eAX","Ib"],
    0xE6: ["OUT","Ib","AL"],
    0xE7: ["OUT","Ib","eAX"],
    0xE8: ["CALL","Jv"],
    0xE9: ["JMP","Jv"],
    0xEA: ["JMP","Ap"],
    0xEB: ["JMP","Jb"],
    0xEC: ["IN","AL","DX"],
    0xED: ["IN","eAX","DX"],
    0xEE: ["OUT","DX","AL"],
    0xEF: ["OUT","DX","eAX"],
    0xF0: ["lOCK"],
    0xF1: ["--"],
    0xF2: ["REPNZ"],
    0xF3: ["REPZ"],
    0xF4: ["HLT"],
    0xF5: ["CMC"],
    0xF6: ["GRP3a","Eb"],
    0xF7: ["GRP3b","Ev"],
    0xF8: ["CLC"],
    0xF9: ["STC"],
    0xFA: ["CLI"],
    0xFB: ["STI"],
    0xFC: ["CLD"],
    0xFD: ["STD"],
    0xFE: ["GRP4","Eb"],
    0xFF: ["GRP5","Ev"] }

var one_byte_opcode_groups = {
    "GRP1/0": ["ADD"],
    "GRP1/1": ["OR"],
    "GRP1/2": ["ADC"],
    "GRP1/3": ["SBB"],
    "GRP1/4": ["AND"],
    "GRP1/5": ["SUB"],
    "GRP1/6": ["XOR"],
    "GRP1/7": ["CMP"],
    "GRP2/0": ["ROL"],
    "GRP2/1": ["ROR"],
    "GRP2/2": ["RCL"],
    "GRP2/3": ["RCR"],
    "GRP2/4": ["SHL"],
    "GRP2/5": ["SHR"],
    "GRP2/6": ["--"],
    "GRP2/7": ["SAR"],
    "GRP3a/0": ["TEST","Eb","Ib"],
    "GRP3a/1": ["--"],
    "GRP3a/2": ["NOT"],
    "GRP3a/3": ["NEG"],
    "GRP3a/4": ["MUL"],
    "GRP3a/5": ["IMUL"],
    "GRP3a/6": ["DIV"],
    "GRP3a/7": ["IDIV"],
    "GRP3b/0": ["TEST","Ev","Iv"],
    "GRP3b/1": ["--"],
    "GRP3b/2": ["NOT"],
    "GRP3b/3": ["NEG"],
    "GRP3b/4": ["MUL"],
    "GRP3b/5": ["IMUL"],
    "GRP3b/6": ["DIV"],
    "GRP3b/7": ["IDIV"],
    "GRP4/0": ["INC"],
    "GRP4/1": ["DEC"],
    "GRP4/2": ["--"],
    "GRP4/3": ["--"],
    "GRP4/4": ["--"],
    "GRP4/5": ["--"],
    "GRP4/6": ["--"],
    "GRP4/7": ["--"],
    "GRP5/0": ["INC"],
    "GRP5/1": ["DEC"],
    "GRP5/2": ["CALL"],
    "GRP5/3": ["CALL","Mp"],
    "GRP5/4": ["JMP"],
    "GRP5/5": ["JMP","Mp"],
    "GRP5/6": ["PUSH"],
    "GRP5/7": ["--"] }

//
//  helper functions
//

function suffix(size)
{
    if (size == 1) return 'b'
    if (size == 2) return 'w'
    alert('Unsupported operand size: ' + size)
}

function mask(size)
{
    if (size == 1) return '0xff'
    if (size == 2) return '0xffff'
    alert('Unsupported operand size: ' + size)
}

function signed(value, size)
{
    if (size == 1) return (value & 0x80) ? (value - 0x100) : value
    if (size == 2) return (value & 0x8000) ? (value - 0x10000) : value
    alert('Unsupported operand size: ' + size)
}

function gen_jmp(target, condition)
{
    var res = condition ? 'if (' + condition + ') {' : ''
    if (target instanceof ImmediateOperand) {
        res += 's.ip += ' + target.load()
    } else
    if (target instanceof IndirectOperand) {
        // FIXME: we only support near jumps and no segment overrides.
        res += 's.ip = ' + target.load()
    } else {
        assert('Unsupported jump target ' + target)
        return
    }
    res += '; break'
    if (condition) res += '}'
    return res
}

function gen_loop(target, condition)
{
    if (target instanceof ImmediateOperand) {
        if (target.value == -2) {
            return 's.cx = 0'  // optimize empty loops
        } else {
            return 's.cx = (s.cx-1)&0xffff; ' +
                gen_jmp(target, condition ? condition + '&&s.cx' : 's.cx')
        }
    } else {
        assert('Unsupported loop target ' + loop)
    }
}

function wrap_rep(rep, code)
{
    if (!rep) return code
    switch (rep)
    {
    case 'REP': return 'while (s.cx) { ' + code + '; s.cx = (s.cx-1)&0xffff }'
    case 'REPZ': return 'while (s.cx) { ' + code + '; s.cx = (s.cx-1)&0xffff; if (!s.zf) break }'
    case 'REPNZ': return 'while (s.cx) { ' + code + '; s.cx = (s.cx-1)&0xffff; if (s.zf) break }'
    default: alert('Unsupported rep prefix:' + rep)
    }
}


// For convenience; a few commonly used operands:
var regAl = new RegisterOperand('AL')
var regAx = new RegisterOperand('AX')
var regCx = new RegisterOperand('CX')
var regDs = new RegisterOperand('DS')
var regSi = new RegisterOperand('SI')
var regEs = new RegisterOperand('ES')
var regDi = new RegisterOperand('DI')
var byteDsSi = new IndirectOperand([regSi], regDs, 1)
var wordDsSi = new IndirectOperand([regSi], regDs, 2)
var byteEsDi = new IndirectOperand([regDi], regEs, 1)
var wordEsDi = new IndirectOperand([regDi], regEs, 2)

//
//  Instruction class
//

function Instruction(begin, end, instr, args, rep)
{
    this.begin  = begin
    this.end    = end
    this.len    = end - begin
    this.instr  = instr
    this.args   = args
    this.rep    = rep
}

Instruction.prototype.toString = function()
{
    var res = ''
    if (this.rep) res += this.rep + ' '
    res += this.instr
    if ((this.instr.charAt(0) == 'J' || this.instr.substr(0,4) == "LOOP" ||
         this.instr == 'JCXZ' || this.instr == 'CALL') &&
        this.args.length == 1 && this.args[0] instanceof ImmediateOperand) {
        // special case: for jumps/calls, show the absolute target address:
        res += ' 0x' + (this.end + this.args[0].value).toString(16)
    } else {
        // general case: append default representation of arguments
        for (var i = 0; i < this.args.length; ++i) {
            res += (i ? "," : " ")
            var a = this.args[i]
            if (i > 0 && a.size != this.args[0].size) {
                res += ['INVALID SIZE','BYTE','WORD'][a.size] + ' '
            }
            res += a
        }
    }
    return res
}

Instruction.prototype.toCode = function() {
    var dst = this.args.length < 1 ? null : this.args[0]
    var src = this.args.length < 2 ? null : this.args[1]

    if (dst && src && dst.size != src.size)
    {
        switch (this.instr) {
        case 'ROL': case 'ROR': case 'RCL': case 'RCR':
        case 'SHL': case 'SHR': case 'SAR':
        case 'IN': case 'OUT':
            // these instructions allow mismatched arguments without problems
            break

        case 'ADD': case 'ADC': case 'SUB': case 'SBB':
        case 'CMP':
            if (dst.size < src.size) {
                alert('This should not happen! Destination operand is smaller than source operand!')
            } else {
                // OK. These instructions will sign-extend the smaller operand.
            }
            break

        default:
            alert("Unsupported instruction with size-mismatched operands: " + this.instr)
        }
    }

    switch (this.instr) {
    case 'ADD': case 'ADC': case 'SUB': case 'SBB':
        return dst.store('s.' + this.instr.toLowerCase() + suffix(dst.size) + '(' + dst.load() + ','
                + (src.size < dst.size ? src.loadSigned() + '&' + mask(dst.size) : src.load()) + ')')
    case 'NOP': return ";"
    case 'MOV': return dst.store(src.load())
    case 'AND': case 'XOR': case 'OR':
    case 'ROL': case 'ROR': case 'RCL': case 'RCR':
    case 'SHL': case 'SHR': case 'SAR':
        return dst.store('s.' + this.instr.toLowerCase() + suffix(dst.size) + '(' + dst.load() + ',' + src.load() + ')')
    case 'CMP':  return 's.sub' + suffix(dst.size) + '(' + dst.load() + ',' +
            (src.size < dst.size ? src.loadSigned() + '&' + mask(dst.size) : src.load()) + ')'
    case 'TEST': return 's.and' + suffix(dst.size) + '(' + dst.load() + ',' + src.load() + ')'
    case 'PUSH': return 's.push' + suffix(dst.size) + '(' + dst.load() + ')'
    case 'POP':  return dst.store('s.pop' + suffix(dst.size) + '()')
    case 'INC':  return 'var tmp = s.cf; ' + dst.store('s.add' + suffix(dst.size) + '(' + dst.load() + ',1)') + '; s.cf = tmp'
    case 'DEC':  return 'var tmp = s.cf; ' + dst.store('s.sub' + suffix(dst.size) + '(' + dst.load() + ',1)') + '; s.cf = tmp'
    case 'RET':  return 's.ip = s.popw(); break'
    case 'RETF': return 's.ip = s.popw(); s.cs = s.popw(); break'
    case 'CLD':  return 's.df = 0'
    case 'STD':  return 's.df = 1'
    case 'NEG':  return dst.store('s.sub' + suffix(dst.size) + '(0,' + dst.load() + ')')
    case 'NOT':  return dst.store('(' + dst.load() + '^' + mask(dst.size) + ')')
    case 'HLT':  return 's.hlt(); break'
    case 'INT':  return 's.int(' + dst.load()+ '); break'
    case 'IN':   return dst.store('s.in' + suffix(dst.size) + '(' + src.load() + ')')
    case 'OUT':  return 's.out' + suffix(src.size) + '(' + dst.load() + ',' + src.load() + ')'
    case 'XCHG': return 'tmp=' + dst.load() + '; ' + dst.store(src.load()) + '; ' + src.store('tmp')
    case 'MUL': case 'DIV':case 'IDIV': return 's.' + this.instr.toLowerCase() + suffix(dst.size) + '(' + dst.load() + ')'
    case 'CBW':  return 'if (s.ax&0x80) s.ax |= 0xff00; else s.ax &= 0x00ff'
    case 'CWD':  return 'dx = (s.ax&0x8000) ? 0xffff : 0'

    case 'LODSB': return wrap_rep(this.rep, regAl.store(byteDsSi.load()) + "; s.si += s.df?-1:1")
    case 'LODSW': return wrap_rep(this.rep, regAx.store(wordDsSi.load()) + "; s.si += s.df?-2:2")
    case 'STOSB': return wrap_rep(this.rep, byteEsDi.store(regAl.load()) + "; s.di += s.df?-1:1")
    case 'STOSW': return wrap_rep(this.rep, wordEsDi.store(regAx.load()) + "; s.di += s.df?-2:2")
    case 'MOVSB': return wrap_rep(this.rep, byteEsDi.store(byteDsSi.load()) + "; s.di += s.df?-1:1; s.si += s.df?-1:1")
    case 'MOVSW': return wrap_rep(this.rep, wordEsDi.store(wordDsSi.load()) + "; s.di += s.df?-2:2; s.si += s.df?-2:2")
    case 'CMPSB': return wrap_rep(this.rep, 's.subb(' + byteDsSi.load() + ',' + byteEsDi.load() +"); s.di += s.df?-1:1; s.si += s.df?-1:1")
    case 'CMPSW': return wrap_rep(this.rep, 's.subw(' + wordDsSi.load() + ',' + wordEsDi.load() +"); s.di += s.df?-2:2; s.si += s.df?-2:2")
    case 'SCASB': return wrap_rep(this.rep, 's.subb(' + regAl.load() + ',' + byteEsDi.load() +"); s.di += s.df?-1:1")
    case 'SCASW': return wrap_rep(this.rep, 's.subw(' + regAx.load() + ',' + wordEsDi.load() +"); s.di += s.df?-2:2")

    case 'JO':      return gen_jmp(dst, 's.of')
    case 'JNO':     return gen_jmp(dst, '!s.of')
    case 'JB':      return gen_jmp(dst, 's.cf')
    case 'JNB':     return gen_jmp(dst, '!s.cf')
    case 'JZ':      return gen_jmp(dst, 's.zf')
    case 'JNZ':     return gen_jmp(dst, '!s.zf')
    case 'JBE':     return gen_jmp(dst, 's.cf || s.zf')
    case 'JA':      return gen_jmp(dst, '!s.cf && !s.zf')
    case 'JS':      return gen_jmp(dst, 's.sf')
    case 'JNS':     return gen_jmp(dst, '!s.sf')
//  case 'JPE':     return gen_jmp(dst, 's.pf')
//  case 'JPO':     return gen_jmp(dst, '!s.pf')
    case 'JL':      return gen_jmp(dst, 's.sf!=s.of')
    case 'JGE':     return gen_jmp(dst, 's.sf==s.of')
    case 'JLE':     return gen_jmp(dst, 's.zf || s.sf!=s.of')
    case 'JG':      return gen_jmp(dst, '!s.zf && s.sf==s.of')
    case 'JCXZ':    return gen_jmp(dst, '!s.cx')
    case 'JMP':     return gen_jmp(dst)
    case 'LOOP':    return gen_loop(dst)
    case 'LOOPZ':   return gen_loop(dst, 's.zf')
    case 'LOOPNZ':  return gen_loop(dst, '!s.zf')
    case 'CALL':    return 's.pushw(s.ip); ' + gen_jmp(dst)

    default:
        alert("I don't know how to generate code for " + this.instr + '!')
    }
}

//
//  RegisterOperand class
//


function RegisterOperand(name)
{
    this.loOnly = name.charAt(1) == 'L'
    this.hiOnly = name.charAt(1) == 'H'
    this.size = (this.loOnly || this.hiOnly) ? 1 : 2
    this.name = name
    this.varName = 's.' + ((this.loOnly || this.hiOnly) ? name.charAt(0) + 'X' : name).toLowerCase()
}

RegisterOperand.prototype.toString = function() {
    return this.name
}

RegisterOperand.prototype.load = function() {
    if (this.loOnly) return '(' + this.varName + '&0xff)'
    if (this.hiOnly) return '(' + this.varName + '>>8)'
    return this.varName
}

RegisterOperand.prototype.store = function(valueString) {
    if (this.loOnly) {
        if (valueString == '0') {  // special, but common, case!
            return this.varName + ' &= 0xff00'
        } else {
            return this.varName + ' = ' + this.varName + '&0xff00|' + valueString
        }
    }
    if (this.hiOnly) {
        if (valueString == '0') {  // special, but common, case!
            return this.varName + ' &= 0xff'
        } else {
            return this.varName + ' = ' + this.varName + '&0xff|' + valueString + '<<8'
        }
    }
    return this.varName + ' = ' + valueString
}

//
//  ImmediateOperand class
//


function ImmediateOperand(value, size) {
    this.value = value
    this.size  = size
}

ImmediateOperand.prototype.toString = function(){
    return '0x' + this.value.toString(16)
}

ImmediateOperand.prototype.toSignedString = function(){
    return signed(this.value, this.size).toString()
}

ImmediateOperand.prototype.load = function() {
    return this.value.toString()
}

ImmediateOperand.prototype.loadSigned = function() {
    return this.toSignedString()
}


//
//  IndirectOperand class
//

function IndirectOperand(parts, segment, size) {
    this.parts   = parts
    this.segment = segment
    this.size    = size
}

IndirectOperand.prototype.toString = function() {
    var res = (this.size == 1 ? 'BYTE' : this.size == 2 ? 'WORD' : null)
    if (!res) {
        alert('Indirect operand without size!')
        return
    }
    res += ' ['
    if (this.segment != 'DS') res += this.segment + ':'
    for (var i = 0; i < this.parts.length; ++i) {
        if (i != 0) res += '+'
        var part = this.parts[i]
        res += (part.size == 1 ? part.toSignedString() : part.toString())
    }
    res += ']'
    return res
}

IndirectOperand.prototype.computeAddress = function() {
    var res = '16*s.' + this.segment.toString().toLowerCase()
    if (this.parts.length > 0) {
        res += '+'
        if (this.parts.length > 1) res += '('
        for (var i = 0; i < this.parts.length; ++i) {
            if (i > 0) res += '+'
            var part = this.parts[i]
            res += (part.size == 1 ? part.loadSigned() : part.load())
        }
        if (this.parts.length > 1) res += '&0xffff)'
    }
    return res
}

IndirectOperand.prototype.load = function() {
    return 's.load' + suffix(this.size) + '(' + this.computeAddress() + ')'
}

IndirectOperand.prototype.store = function(valueString) {
    return 's.store' + suffix(this.size) + '(' + this.computeAddress() + ',' + valueString + ')'
}


//
//  decoder functions
//


// Returns the size of the modr/m field (0 or 1 byte) for a given instruction.
function get_modrm_size(spec)
{
    if (spec[0].indexOf('GRP') == 0) return 1
    for (var i = 1; i < spec.length; ++i) {
        if (spec[i].charAt(0) == 'e' || spec[i].toUpperCase() == spec[i]) {
            continue
        }
        if ("BCDEGMPQRSTVW".indexOf(spec[i].charAt(0)) >= 0) {
            return 1
        }
    }
    return 0
}

// Returns the size of the immediate operand for instructions WITHOUT modr/m.
// NOTE: operand size overrides are currently ignored!
function get_imm_size(spec)
{
    for (var i = 1; i < spec.length; ++i) {
        switch (spec[i]) {
            case "Ap": return 2
            case "Ib": return 1
            case "Iv": return 2
            case "Iw": return 2
            case "Jb": return 1
            case "Jv": return 2
            case "Ob": return 2  // yes, really!
            case "Ov": return 2
        }
    }
    return 0
}

function decode_one(addr)
{
    var start = addr
    var spec = one_byte_opcode_map[memory[addr++]]

    // Parse REPZ/REPNZ prefix:
    var rep_prefix = false
    if (spec[0] == 'REPZ' || spec[0] == 'REPNZ') {
        rep_prefix = spec[0]
        spec = one_byte_opcode_map[memory[addr++]]
    }

    // Parse segment override:
    var segment_override = false
    if (spec[0].indexOf(':') > 0) {
        segment_override = spec[0].substr(0, spec[0].indexOf(':'))
        spec = one_byte_opcode_map[memory[addr++]]
    }

    var modrm_size = get_modrm_size(spec)
    if (modrm_size) {
        var modrm = memory[addr++]
        var mod = modrm>>6
        var rm  = modrm&7
        var reg = (modrm>>3)&7
    }

    var instr = spec[0]
    if (instr.indexOf('GRP') == 0) {
        var new_spec = one_byte_opcode_groups[instr + '/' + ((modrm>>3)&7)]
        instr = new_spec[0]
        if (new_spec.length > 1) spec = new_spec
    }

    var disp_size = 0
    if (modrm_size) {
        if (mod == 0 && rm == 6) disp_size = 2
        else if (mod == 1) disp_size = 1
        else if (mod == 2) disp_size = 2
    }
    var disp = 0
    for (var i = 0; i < disp_size; ++i) {
        disp |= memory[addr++] << 8*i
    }

    var imm_size = get_imm_size(spec)
    var imm = 0
    for (var i = 0; i < imm_size; ++i) {
        imm |= memory[addr++] << 8*i
    }

    var args = []
    for (var i = 1; i < spec.length; ++i) {
        var arg = spec[i]
        if (parseInt(arg) == arg) { // constant value
            args.push(new ImmediateOperand(parseInt(arg), 1))
        } else
        if (arg.toUpperCase() == arg) {  // 4/8 bit register
            args.push(new RegisterOperand(arg))
        } else
        if (arg.charAt(0) == 'e') { // 16/32 bit register
            args.push(new RegisterOperand(arg.substr(1)))
        } else
        if (arg.charAt(0) == 'G') { // general register
            if (arg.charAt(1) == 'b') {
                args.push(new RegisterOperand(["AL","CL","DL","BL","AH","CH","DH","BH"][reg]))
            } else
            if (arg.charAt(1) == 'v' || arg.charAt(1) == 'w') {
                args.push(new RegisterOperand(["AX","CX","DX","BX","SP","BP","SI","DI"][reg]))
            } else {
                alert('Expected Gb, Gv or Gw; not ' + arg)
                return
            }
        } else
        if (arg.charAt(0) == 'E') { // memory or register
            var size = 0
            if (arg.charAt(1) == 'b') {
                if (mod == 3) {
                    args.push(new RegisterOperand(["AL","CL","DL","BL","AH","CH","DH","BH"][rm]))
                } else {
                    size = 1
                }
            } else
            if (arg.charAt(1) == 'v' || arg.charAt(1) == 'w') {
                if (mod == 3) {
                    args.push(new RegisterOperand(["AX","CX","DX","BX","SP","BP","SI","DI"][rm]))
                } else {
                    size = 2
                }
            } else {
                alert('Expected Eb, Ev or Ew; not ' + arg)
                return
            }
            if (mod == 0 && rm == 6) {
                args.push(new IndirectOperand([new ImmediateOperand(disp)],
                    new RegisterOperand(segment_override ? segment_override : "DS"), size))
            } else
            if (mod < 3) {
                var parts = []
                switch (rm) {
                case 0:
                    parts.push(new RegisterOperand("BX"));
                    parts.push(new RegisterOperand("SI"));
                    break
                case 1:
                    parts.push(new RegisterOperand("BX"));
                    parts.push(new RegisterOperand("DI"));
                    break
                case 2:
                    parts.push(new RegisterOperand("BP"));
                    parts.push(new RegisterOperand("SI"));
                    break
                case 3:
                    parts.push(new RegisterOperand("BP"));
                    parts.push(new RegisterOperand("DI"));
                    break
                case 4:
                    parts.push(new RegisterOperand("SI"));
                    break
                case 5:
                    parts.push(new RegisterOperand("DI"));
                    break
                case 6:
                    if (mod != 0) parts.push(new RegisterOperand("BP"));
                    break
                case 7:
                    parts.push(new RegisterOperand("BX"));
                    break
                }
                if (disp_size) {
                    parts.push(new ImmediateOperand(disp, disp_size))
                }
                var segment = segment_override ? segment_override : parts[0] == "BP" ? "SS" : "DS"
                args.push(new IndirectOperand(parts, new RegisterOperand(segment), size))
            }
        } else
        if (arg.charAt(0) == 'S') { // segment register
            if (reg >= 4) {
                alert('Unsupported segment register: ' + reg)
                return
            }
            args.push(new RegisterOperand(["ES","CS","SS","DS"][reg]))
        } else
        if (arg.charAt(0) == 'I') { // immediate value
            if (!imm_size) {
                alert('Hmm... I failed to decode the immediate operand!')
                return
            }
            args.push(new ImmediateOperand(imm, imm_size))
        } else
        if (arg.charAt(0) == 'J') { // IP-relative jump offset
            args.push(new ImmediateOperand(signed(imm, imm_size), imm_size))
        } else
        if (arg.charAt(0) == 'O') { // memory reference (offset only; no modr/m byte)
            var segment = new RegisterOperand(segment_override ? segment_override : "DS")
            if (arg.charAt(1) == 'b') {
                args.push(new IndirectOperand([new ImmediateOperand(imm)], segment, 1))
            } else
            if (arg.charAt(1) == 'v' || arg.charAt(1) == 'w') {
                args.push(new IndirectOperand([new ImmediateOperand(imm)], segment, 2))
            } else {
                alert('Expected Ob, Ov or Ow; not ' + arg)
                return
            }
        } else {
            alert('Unexpected instruction argument: '+arg)
            return
        }
    }
    if (instr == '--') {
        alert('Failed to recognize instruction at address '+addr)
        return
    }

    if (rep_prefix) {
        if (instr == 'INSB' || instr == 'MOVSB' || instr == 'OUTSB' || instr == 'LODSB' || instr == 'STOSB' ||
            instr == 'INSW' || instr == 'MOVSW' || instr == 'OUTSW' || instr == 'LODSW' || instr == 'STOSW') {
            if (rep_prefix != 'REPZ') {
                alert('Invalid use of REPZ prefix at address '+addr)
                return
            }
            rep_prefix = 'REP'
        } else
        if (instr == 'CMPSB' || instr == 'SCASB' || instr == 'CMPSW' || instr == 'SCASW') {
            // OK -- keep prefix as it is!
        } else {
            alert('Invalid instruction (' + instr + ') used with REP-prefix at address '+addr)
            return
        }
    }
    return new Instruction(start, addr, instr, args, rep_prefix)
}

// Decodes all instructions starting from `addr' but heuristically skips
// zero padding after branching instructions. Stops after 16 padding bytes.
function decode_smart(addr)
{
    var accept_padding = false
    var result = []
    for (;;) {
        if (accept_padding) {
           var cnt = 0
           while (memory[addr + cnt] == 0 && cnt < 16) ++cnt
           if (cnt == 16) break
           addr += cnt
        }
        var i = decode_one(addr)
        if (!i) break
        addr = i.end
        result.push(i)
        accept_padding =  (i.instr == 'JMP' || i.instr == 'RET' || i.instr == 'RETF')
    }
    return result
}

/* Generates JavaScript code for an assembly listing (an array of Instruction
   objects).  If `hooks' is true the function returns true after every
   instruction.  If `hooks' is an object, then its keys indicate addresses at
   which to return.  This is useful to implement breakpoints (the caller must
   check machine.next_addr() to see whether a breakpoint was hit).

   FIXME: Currently, when an instruction is reached via a direct jump, the
          functions does not return!  To work around this bug, all hooks should
          be set at locations which are not branch targets.
*/
function generate_code(instrs, hooks)
{
    var code = '(function(s, steps){\n'
    code += 'for(;steps>0;--steps) switch(s.next_address()) {\n'
    for (var i = 0; i < instrs.length; ++i) {
        var instr = instrs[i]
        var line = instr.begin.toString(16)
        while (line.length < 4) line = '0' + line
        line = 'case 0x' + line + ': '
        line += 's.ip += ' + instr.len + '; ' + instr.toCode()
        if (hooks && (hooks == true || hooks[instr.end])) line += '; return true'
        while (line.length < 70) line += ' '
        line += ' // ' + instr.toString()
        code += line + '\n'
    }
    code += 'default: return false\n'
    code += '}\n'
    code += 'return true\n'
    code += '})'
    return code
}

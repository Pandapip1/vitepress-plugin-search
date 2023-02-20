import MarkdownIt from "markdown-it";
import * as fs$3 from "fs/promises";
const rControl = /[\u0000-\u001f]/g, rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g, rCombining = /[\u0300-\u036F]/g, slugify = (e) => e.normalize("NFKD").replace(rCombining, "").replace(rControl, "").replace(rSpecial, "-").replace(/-{2,}/g, "-").replace(/^-+|-+$/g, "").replace(/^(\d)/, "_$1").toLowerCase();
var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function getDefaultExportFromCjs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function getAugmentedNamespace(e) {
  if (e.__esModule)
    return e;
  var r = e.default;
  if (typeof r == "function") {
    var i = function n() {
      if (this instanceof n) {
        var s = [null];
        s.push.apply(s, arguments);
        var o = Function.bind.apply(r, s);
        return new o();
      }
      return r.apply(this, arguments);
    };
    i.prototype = r.prototype;
  } else
    i = {};
  return Object.defineProperty(i, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var s = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(i, n, s.get ? s : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), i;
}
const __viteBrowserExternal = {}, __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" })), require$$9 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
var old$1 = {}, pathModule = require$$9, isWindows$1 = process.platform === "win32", fs$2 = require$$9, DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);
function rethrow() {
  var e;
  if (DEBUG) {
    var r = new Error();
    e = i;
  } else
    e = n;
  return e;
  function i(s) {
    s && (r.message = s.message, s = r, n(s));
  }
  function n(s) {
    if (s) {
      if (process.throwDeprecation)
        throw s;
      if (!process.noDeprecation) {
        var o = "fs: missing callback " + (s.stack || s.message);
        process.traceDeprecation ? console.trace(o) : console.error(o);
      }
    }
  }
}
function maybeCallback(e) {
  return typeof e == "function" ? e : rethrow();
}
pathModule.normalize;
if (isWindows$1)
  var nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
else
  var nextPartRe = /(.*?)(?:[\/]+|$)/g;
if (isWindows$1)
  var splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
else
  var splitRootRe = /^[\/]*/;
old$1.realpathSync = function(r, i) {
  if (r = pathModule.resolve(r), i && Object.prototype.hasOwnProperty.call(i, r))
    return i[r];
  var n = r, s = {}, o = {}, h, l, g, A;
  B();
  function B() {
    var H = splitRootRe.exec(r);
    h = H[0].length, l = H[0], g = H[0], A = "", isWindows$1 && !o[g] && (fs$2.lstatSync(g), o[g] = !0);
  }
  for (; h < r.length; ) {
    nextPartRe.lastIndex = h;
    var z = nextPartRe.exec(r);
    if (A = l, l += z[0], g = A + z[1], h = nextPartRe.lastIndex, !(o[g] || i && i[g] === g)) {
      var f;
      if (i && Object.prototype.hasOwnProperty.call(i, g))
        f = i[g];
      else {
        var k = fs$2.lstatSync(g);
        if (!k.isSymbolicLink()) {
          o[g] = !0, i && (i[g] = g);
          continue;
        }
        var y = null;
        if (!isWindows$1) {
          var $ = k.dev.toString(32) + ":" + k.ino.toString(32);
          s.hasOwnProperty($) && (y = s[$]);
        }
        y === null && (fs$2.statSync(g), y = fs$2.readlinkSync(g)), f = pathModule.resolve(A, y), i && (i[g] = f), isWindows$1 || (s[$] = y);
      }
      r = pathModule.resolve(f, r.slice(h)), B();
    }
  }
  return i && (i[n] = r), r;
};
old$1.realpath = function(r, i, n) {
  if (typeof n != "function" && (n = maybeCallback(i), i = null), r = pathModule.resolve(r), i && Object.prototype.hasOwnProperty.call(i, r))
    return process.nextTick(n.bind(null, null, i[r]));
  var s = r, o = {}, h = {}, l, g, A, B;
  z();
  function z() {
    var H = splitRootRe.exec(r);
    l = H[0].length, g = H[0], A = H[0], B = "", isWindows$1 && !h[A] ? fs$2.lstat(A, function(et) {
      if (et)
        return n(et);
      h[A] = !0, f();
    }) : process.nextTick(f);
  }
  function f() {
    if (l >= r.length)
      return i && (i[s] = r), n(null, r);
    nextPartRe.lastIndex = l;
    var H = nextPartRe.exec(r);
    return B = g, g += H[0], A = B + H[1], l = nextPartRe.lastIndex, h[A] || i && i[A] === A ? process.nextTick(f) : i && Object.prototype.hasOwnProperty.call(i, A) ? $(i[A]) : fs$2.lstat(A, k);
  }
  function k(H, et) {
    if (H)
      return n(H);
    if (!et.isSymbolicLink())
      return h[A] = !0, i && (i[A] = A), process.nextTick(f);
    if (!isWindows$1) {
      var q = et.dev.toString(32) + ":" + et.ino.toString(32);
      if (o.hasOwnProperty(q))
        return y(null, o[q], A);
    }
    fs$2.stat(A, function(rt) {
      if (rt)
        return n(rt);
      fs$2.readlink(A, function(p, m) {
        isWindows$1 || (o[q] = m), y(p, m);
      });
    });
  }
  function y(H, et, q) {
    if (H)
      return n(H);
    var rt = pathModule.resolve(B, et);
    i && (i[q] = rt), $(rt);
  }
  function $(H) {
    r = pathModule.resolve(H, r.slice(l)), z();
  }
};
var fs_realpath = realpath;
realpath.realpath = realpath;
realpath.sync = realpathSync;
realpath.realpathSync = realpathSync;
realpath.monkeypatch = monkeypatch;
realpath.unmonkeypatch = unmonkeypatch;
var fs$1 = require$$9, origRealpath = fs$1.realpath, origRealpathSync = fs$1.realpathSync, version = process.version, ok = /^v[0-5]\./.test(version), old = old$1;
function newError(e) {
  return e && e.syscall === "realpath" && (e.code === "ELOOP" || e.code === "ENOMEM" || e.code === "ENAMETOOLONG");
}
function realpath(e, r, i) {
  if (ok)
    return origRealpath(e, r, i);
  typeof r == "function" && (i = r, r = null), origRealpath(e, r, function(n, s) {
    newError(n) ? old.realpath(e, r, i) : i(n, s);
  });
}
function realpathSync(e, r) {
  if (ok)
    return origRealpathSync(e, r);
  try {
    return origRealpathSync(e, r);
  } catch (i) {
    if (newError(i))
      return old.realpathSync(e, r);
    throw i;
  }
}
function monkeypatch() {
  fs$1.realpath = realpath, fs$1.realpathSync = realpathSync;
}
function unmonkeypatch() {
  fs$1.realpath = origRealpath, fs$1.realpathSync = origRealpathSync;
}
const isWindows = typeof process == "object" && process && process.platform === "win32";
var path$2 = isWindows ? { sep: "\\" } : { sep: "/" }, balancedMatch = balanced$1;
function balanced$1(e, r, i) {
  e instanceof RegExp && (e = maybeMatch(e, i)), r instanceof RegExp && (r = maybeMatch(r, i));
  var n = range(e, r, i);
  return n && {
    start: n[0],
    end: n[1],
    pre: i.slice(0, n[0]),
    body: i.slice(n[0] + e.length, n[1]),
    post: i.slice(n[1] + r.length)
  };
}
function maybeMatch(e, r) {
  var i = r.match(e);
  return i ? i[0] : null;
}
balanced$1.range = range;
function range(e, r, i) {
  var n, s, o, h, l, g = i.indexOf(e), A = i.indexOf(r, g + 1), B = g;
  if (g >= 0 && A > 0) {
    if (e === r)
      return [g, A];
    for (n = [], o = i.length; B >= 0 && !l; )
      B == g ? (n.push(B), g = i.indexOf(e, B + 1)) : n.length == 1 ? l = [n.pop(), A] : (s = n.pop(), s < o && (o = s, h = A), A = i.indexOf(r, B + 1)), B = g < A && g >= 0 ? g : A;
    n.length && (l = [o, h]);
  }
  return l;
}
var balanced = balancedMatch, braceExpansion = expandTop, escSlash = "\0SLASH" + Math.random() + "\0", escOpen = "\0OPEN" + Math.random() + "\0", escClose = "\0CLOSE" + Math.random() + "\0", escComma = "\0COMMA" + Math.random() + "\0", escPeriod = "\0PERIOD" + Math.random() + "\0";
function numeric(e) {
  return parseInt(e, 10) == e ? parseInt(e, 10) : e.charCodeAt(0);
}
function escapeBraces(e) {
  return e.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
}
function unescapeBraces(e) {
  return e.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
}
function parseCommaParts(e) {
  if (!e)
    return [""];
  var r = [], i = balanced("{", "}", e);
  if (!i)
    return e.split(",");
  var n = i.pre, s = i.body, o = i.post, h = n.split(",");
  h[h.length - 1] += "{" + s + "}";
  var l = parseCommaParts(o);
  return o.length && (h[h.length - 1] += l.shift(), h.push.apply(h, l)), r.push.apply(r, h), r;
}
function expandTop(e) {
  return e ? (e.substr(0, 2) === "{}" && (e = "\\{\\}" + e.substr(2)), expand$1(escapeBraces(e), !0).map(unescapeBraces)) : [];
}
function embrace(e) {
  return "{" + e + "}";
}
function isPadded(e) {
  return /^-?0\d/.test(e);
}
function lte(e, r) {
  return e <= r;
}
function gte(e, r) {
  return e >= r;
}
function expand$1(e, r) {
  var i = [], n = balanced("{", "}", e);
  if (!n)
    return [e];
  var s = n.pre, o = n.post.length ? expand$1(n.post, !1) : [""];
  if (/\$$/.test(n.pre))
    for (var h = 0; h < o.length; h++) {
      var l = s + "{" + n.body + "}" + o[h];
      i.push(l);
    }
  else {
    var g = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(n.body), A = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(n.body), B = g || A, z = n.body.indexOf(",") >= 0;
    if (!B && !z)
      return n.post.match(/,.*\}/) ? (e = n.pre + "{" + n.body + escClose + n.post, expand$1(e)) : [e];
    var f;
    if (B)
      f = n.body.split(/\.\./);
    else if (f = parseCommaParts(n.body), f.length === 1 && (f = expand$1(f[0], !1).map(embrace), f.length === 1))
      return o.map(function(tt) {
        return n.pre + f[0] + tt;
      });
    var k;
    if (B) {
      var y = numeric(f[0]), $ = numeric(f[1]), H = Math.max(f[0].length, f[1].length), et = f.length == 3 ? Math.abs(numeric(f[2])) : 1, q = lte, rt = $ < y;
      rt && (et *= -1, q = gte);
      var p = f.some(isPadded);
      k = [];
      for (var m = y; q(m, $); m += et) {
        var R;
        if (A)
          R = String.fromCharCode(m), R === "\\" && (R = "");
        else if (R = String(m), p) {
          var _ = H - R.length;
          if (_ > 0) {
            var w = new Array(_ + 1).join("0");
            m < 0 ? R = "-" + w + R.slice(1) : R = w + R;
          }
        }
        k.push(R);
      }
    } else {
      k = [];
      for (var j = 0; j < f.length; j++)
        k.push.apply(k, expand$1(f[j], !1));
    }
    for (var j = 0; j < k.length; j++)
      for (var h = 0; h < o.length; h++) {
        var l = s + k[j] + o[h];
        (!r || B || l) && i.push(l);
      }
  }
  return i;
}
const minimatch$1 = minimatch_1 = (e, r, i = {}) => (assertValidPattern(r), !i.nocomment && r.charAt(0) === "#" ? !1 : new Minimatch$1(r, i).match(e));
var minimatch_1 = minimatch$1;
const path$1 = path$2;
minimatch$1.sep = path$1.sep;
const GLOBSTAR = Symbol("globstar **");
minimatch$1.GLOBSTAR = GLOBSTAR;
const expand = braceExpansion, plTypes = {
  "!": { open: "(?:(?!(?:", close: "))[^/]*?)" },
  "?": { open: "(?:", close: ")?" },
  "+": { open: "(?:", close: ")+" },
  "*": { open: "(?:", close: ")*" },
  "@": { open: "(?:", close: ")" }
}, qmark = "[^/]", star = qmark + "*?", twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?", twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?", charSet = (e) => e.split("").reduce((r, i) => (r[i] = !0, r), {}), reSpecials = charSet("().*{}+?[]^$\\!"), addPatternStartSet = charSet("[.("), slashSplit = /\/+/;
minimatch$1.filter = (e, r = {}) => (i, n, s) => minimatch$1(i, e, r);
const ext = (e, r = {}) => {
  const i = {};
  return Object.keys(e).forEach((n) => i[n] = e[n]), Object.keys(r).forEach((n) => i[n] = r[n]), i;
};
minimatch$1.defaults = (e) => {
  if (!e || typeof e != "object" || !Object.keys(e).length)
    return minimatch$1;
  const r = minimatch$1, i = (n, s, o) => r(n, s, ext(e, o));
  return i.Minimatch = class extends r.Minimatch {
    constructor(s, o) {
      super(s, ext(e, o));
    }
  }, i.Minimatch.defaults = (n) => r.defaults(ext(e, n)).Minimatch, i.filter = (n, s) => r.filter(n, ext(e, s)), i.defaults = (n) => r.defaults(ext(e, n)), i.makeRe = (n, s) => r.makeRe(n, ext(e, s)), i.braceExpand = (n, s) => r.braceExpand(n, ext(e, s)), i.match = (n, s, o) => r.match(n, s, ext(e, o)), i;
};
minimatch$1.braceExpand = (e, r) => braceExpand(e, r);
const braceExpand = (e, r = {}) => (assertValidPattern(e), r.nobrace || !/\{(?:(?!\{).)*\}/.test(e) ? [e] : expand(e)), MAX_PATTERN_LENGTH = 1024 * 64, assertValidPattern = (e) => {
  if (typeof e != "string")
    throw new TypeError("invalid pattern");
  if (e.length > MAX_PATTERN_LENGTH)
    throw new TypeError("pattern is too long");
}, SUBPARSE = Symbol("subparse");
minimatch$1.makeRe = (e, r) => new Minimatch$1(e, r || {}).makeRe();
minimatch$1.match = (e, r, i = {}) => {
  const n = new Minimatch$1(r, i);
  return e = e.filter((s) => n.match(s)), n.options.nonull && !e.length && e.push(r), e;
};
const globUnescape = (e) => e.replace(/\\(.)/g, "$1"), charUnescape = (e) => e.replace(/\\([^-\]])/g, "$1"), regExpEscape = (e) => e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), braExpEscape = (e) => e.replace(/[[\]\\]/g, "\\$&");
let Minimatch$1 = class {
  constructor(r, i) {
    assertValidPattern(r), i || (i = {}), this.options = i, this.set = [], this.pattern = r, this.windowsPathsNoEscape = !!i.windowsPathsNoEscape || i.allowWindowsEscape === !1, this.windowsPathsNoEscape && (this.pattern = this.pattern.replace(/\\/g, "/")), this.regexp = null, this.negate = !1, this.comment = !1, this.empty = !1, this.partial = !!i.partial, this.make();
  }
  debug() {
  }
  make() {
    const r = this.pattern, i = this.options;
    if (!i.nocomment && r.charAt(0) === "#") {
      this.comment = !0;
      return;
    }
    if (!r) {
      this.empty = !0;
      return;
    }
    this.parseNegate();
    let n = this.globSet = this.braceExpand();
    i.debug && (this.debug = (...s) => console.error(...s)), this.debug(this.pattern, n), n = this.globParts = n.map((s) => s.split(slashSplit)), this.debug(this.pattern, n), n = n.map((s, o, h) => s.map(this.parse, this)), this.debug(this.pattern, n), n = n.filter((s) => s.indexOf(!1) === -1), this.debug(this.pattern, n), this.set = n;
  }
  parseNegate() {
    if (this.options.nonegate)
      return;
    const r = this.pattern;
    let i = !1, n = 0;
    for (let s = 0; s < r.length && r.charAt(s) === "!"; s++)
      i = !i, n++;
    n && (this.pattern = r.slice(n)), this.negate = i;
  }
  // set partial to true to test if, for example,
  // "/a/b" matches the start of "/*/b/*/d"
  // Partial means, if you run out of file before you run
  // out of pattern, then that's fine, as long as all
  // the parts match.
  matchOne(r, i, n) {
    var s = this.options;
    this.debug(
      "matchOne",
      { this: this, file: r, pattern: i }
    ), this.debug("matchOne", r.length, i.length);
    for (var o = 0, h = 0, l = r.length, g = i.length; o < l && h < g; o++, h++) {
      this.debug("matchOne loop");
      var A = i[h], B = r[o];
      if (this.debug(i, A, B), A === !1)
        return !1;
      if (A === GLOBSTAR) {
        this.debug("GLOBSTAR", [i, A, B]);
        var z = o, f = h + 1;
        if (f === g) {
          for (this.debug("** at the end"); o < l; o++)
            if (r[o] === "." || r[o] === ".." || !s.dot && r[o].charAt(0) === ".")
              return !1;
          return !0;
        }
        for (; z < l; ) {
          var k = r[z];
          if (this.debug(`
globstar while`, r, z, i, f, k), this.matchOne(r.slice(z), i.slice(f), n))
            return this.debug("globstar found match!", z, l, k), !0;
          if (k === "." || k === ".." || !s.dot && k.charAt(0) === ".") {
            this.debug("dot detected!", r, z, i, f);
            break;
          }
          this.debug("globstar swallow a segment, and continue"), z++;
        }
        return !!(n && (this.debug(`
>>> no match, partial?`, r, z, i, f), z === l));
      }
      var y;
      if (typeof A == "string" ? (y = B === A, this.debug("string match", A, B, y)) : (y = B.match(A), this.debug("pattern match", A, B, y)), !y)
        return !1;
    }
    if (o === l && h === g)
      return !0;
    if (o === l)
      return n;
    if (h === g)
      return o === l - 1 && r[o] === "";
    throw new Error("wtf?");
  }
  braceExpand() {
    return braceExpand(this.pattern, this.options);
  }
  parse(r, i) {
    assertValidPattern(r);
    const n = this.options;
    if (r === "**")
      if (n.noglobstar)
        r = "*";
      else
        return GLOBSTAR;
    if (r === "")
      return "";
    let s = "", o = !1, h = !1;
    const l = [], g = [];
    let A, B = !1, z = -1, f = -1, k, y, $, H = r.charAt(0) === ".", et = n.dot || H;
    const q = () => H ? "" : et ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)", rt = (_) => _.charAt(0) === "." ? "" : n.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)", p = () => {
      if (A) {
        switch (A) {
          case "*":
            s += star, o = !0;
            break;
          case "?":
            s += qmark, o = !0;
            break;
          default:
            s += "\\" + A;
            break;
        }
        this.debug("clearStateChar %j %j", A, s), A = !1;
      }
    };
    for (let _ = 0, w; _ < r.length && (w = r.charAt(_)); _++) {
      if (this.debug("%s	%s %s %j", r, _, s, w), h) {
        if (w === "/")
          return !1;
        reSpecials[w] && (s += "\\"), s += w, h = !1;
        continue;
      }
      switch (w) {
        case "/":
          return !1;
        case "\\":
          if (B && r.charAt(_ + 1) === "-") {
            s += w;
            continue;
          }
          p(), h = !0;
          continue;
        case "?":
        case "*":
        case "+":
        case "@":
        case "!":
          if (this.debug("%s	%s %s %j <-- stateChar", r, _, s, w), B) {
            this.debug("  in class"), w === "!" && _ === f + 1 && (w = "^"), s += w;
            continue;
          }
          this.debug("call clearStateChar %j", A), p(), A = w, n.noext && p();
          continue;
        case "(": {
          if (B) {
            s += "(";
            continue;
          }
          if (!A) {
            s += "\\(";
            continue;
          }
          const j = {
            type: A,
            start: _ - 1,
            reStart: s.length,
            open: plTypes[A].open,
            close: plTypes[A].close
          };
          this.debug(this.pattern, "	", j), l.push(j), s += j.open, j.start === 0 && j.type !== "!" && (H = !0, s += rt(r.slice(_ + 1))), this.debug("plType %j %j", A, s), A = !1;
          continue;
        }
        case ")": {
          const j = l[l.length - 1];
          if (B || !j) {
            s += "\\)";
            continue;
          }
          l.pop(), p(), o = !0, y = j, s += y.close, y.type === "!" && g.push(Object.assign(y, { reEnd: s.length }));
          continue;
        }
        case "|": {
          const j = l[l.length - 1];
          if (B || !j) {
            s += "\\|";
            continue;
          }
          p(), s += "|", j.start === 0 && j.type !== "!" && (H = !0, s += rt(r.slice(_ + 1)));
          continue;
        }
        case "[":
          if (p(), B) {
            s += "\\" + w;
            continue;
          }
          B = !0, f = _, z = s.length, s += w;
          continue;
        case "]":
          if (_ === f + 1 || !B) {
            s += "\\" + w;
            continue;
          }
          k = r.substring(f + 1, _);
          try {
            RegExp("[" + braExpEscape(charUnescape(k)) + "]"), s += w;
          } catch {
            s = s.substring(0, z) + "(?:$.)";
          }
          o = !0, B = !1;
          continue;
        default:
          p(), reSpecials[w] && !(w === "^" && B) && (s += "\\"), s += w;
          break;
      }
    }
    for (B && (k = r.slice(f + 1), $ = this.parse(k, SUBPARSE), s = s.substring(0, z) + "\\[" + $[0], o = o || $[1]), y = l.pop(); y; y = l.pop()) {
      let _;
      _ = s.slice(y.reStart + y.open.length), this.debug("setting tail", s, y), _ = _.replace(/((?:\\{2}){0,64})(\\?)\|/g, (j, tt, X) => (X || (X = "\\"), tt + tt + X + "|")), this.debug(`tail=%j
   %s`, _, _, y, s);
      const w = y.type === "*" ? star : y.type === "?" ? qmark : "\\" + y.type;
      o = !0, s = s.slice(0, y.reStart) + w + "\\(" + _;
    }
    p(), h && (s += "\\\\");
    const m = addPatternStartSet[s.charAt(0)];
    for (let _ = g.length - 1; _ > -1; _--) {
      const w = g[_], j = s.slice(0, w.reStart), tt = s.slice(w.reStart, w.reEnd - 8);
      let X = s.slice(w.reEnd);
      const it = s.slice(w.reEnd - 8, w.reEnd) + X, ot = j.split(")").length, at = j.split("(").length - ot;
      let ct = X;
      for (let nt = 0; nt < at; nt++)
        ct = ct.replace(/\)[+*?]?/, "");
      X = ct;
      const ht = X === "" && i !== SUBPARSE ? "(?:$|\\/)" : "";
      s = j + tt + X + ht + it;
    }
    if (s !== "" && o && (s = "(?=.)" + s), m && (s = q() + s), i === SUBPARSE)
      return [s, o];
    if (n.nocase && !o && (o = r.toUpperCase() !== r.toLowerCase()), !o)
      return globUnescape(r);
    const R = n.nocase ? "i" : "";
    try {
      return Object.assign(new RegExp("^" + s + "$", R), {
        _glob: r,
        _src: s
      });
    } catch {
      return new RegExp("$.");
    }
  }
  makeRe() {
    if (this.regexp || this.regexp === !1)
      return this.regexp;
    const r = this.set;
    if (!r.length)
      return this.regexp = !1, this.regexp;
    const i = this.options, n = i.noglobstar ? star : i.dot ? twoStarDot : twoStarNoDot, s = i.nocase ? "i" : "";
    let o = r.map((h) => (h = h.map(
      (l) => typeof l == "string" ? regExpEscape(l) : l === GLOBSTAR ? GLOBSTAR : l._src
    ).reduce((l, g) => (l[l.length - 1] === GLOBSTAR && g === GLOBSTAR || l.push(g), l), []), h.forEach((l, g) => {
      l !== GLOBSTAR || h[g - 1] === GLOBSTAR || (g === 0 ? h.length > 1 ? h[g + 1] = "(?:\\/|" + n + "\\/)?" + h[g + 1] : h[g] = n : g === h.length - 1 ? h[g - 1] += "(?:\\/|" + n + ")?" : (h[g - 1] += "(?:\\/|\\/" + n + "\\/)" + h[g + 1], h[g + 1] = GLOBSTAR));
    }), h.filter((l) => l !== GLOBSTAR).join("/"))).join("|");
    o = "^(?:" + o + ")$", this.negate && (o = "^(?!" + o + ").*$");
    try {
      this.regexp = new RegExp(o, s);
    } catch {
      this.regexp = !1;
    }
    return this.regexp;
  }
  match(r, i = this.partial) {
    if (this.debug("match", r, this.pattern), this.comment)
      return !1;
    if (this.empty)
      return r === "";
    if (r === "/" && i)
      return !0;
    const n = this.options;
    path$1.sep !== "/" && (r = r.split(path$1.sep).join("/")), r = r.split(slashSplit), this.debug(this.pattern, "split", r);
    const s = this.set;
    this.debug(this.pattern, "set", s);
    let o;
    for (let h = r.length - 1; h >= 0 && (o = r[h], !o); h--)
      ;
    for (let h = 0; h < s.length; h++) {
      const l = s[h];
      let g = r;
      if (n.matchBase && l.length === 1 && (g = [o]), this.matchOne(g, l, i))
        return n.flipNegate ? !0 : !this.negate;
    }
    return n.flipNegate ? !1 : this.negate;
  }
  static defaults(r) {
    return minimatch$1.defaults(r).Minimatch;
  }
};
minimatch$1.Minimatch = Minimatch$1;
var inherits_browserExports = {}, inherits_browser = {
  get exports() {
    return inherits_browserExports;
  },
  set exports(e) {
    inherits_browserExports = e;
  }
};
typeof Object.create == "function" ? inherits_browser.exports = function(r, i) {
  i && (r.super_ = i, r.prototype = Object.create(i.prototype, {
    constructor: {
      value: r,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }));
} : inherits_browser.exports = function(r, i) {
  if (i) {
    r.super_ = i;
    var n = function() {
    };
    n.prototype = i.prototype, r.prototype = new n(), r.prototype.constructor = r;
  }
};
var common = {};
common.setopts = setopts;
common.ownProp = ownProp;
common.makeAbs = makeAbs;
common.finish = finish;
common.mark = mark;
common.isIgnored = isIgnored;
common.childrenIgnored = childrenIgnored;
function ownProp(e, r) {
  return Object.prototype.hasOwnProperty.call(e, r);
}
var fs = require$$9, path = require$$9, minimatch = minimatch_1, isAbsolute = require$$9.isAbsolute, Minimatch = minimatch.Minimatch;
function alphasort(e, r) {
  return e.localeCompare(r, "en");
}
function setupIgnores(e, r) {
  e.ignore = r.ignore || [], Array.isArray(e.ignore) || (e.ignore = [e.ignore]), e.ignore.length && (e.ignore = e.ignore.map(ignoreMap));
}
function ignoreMap(e) {
  var r = null;
  if (e.slice(-3) === "/**") {
    var i = e.replace(/(\/\*\*)+$/, "");
    r = new Minimatch(i, { dot: !0 });
  }
  return {
    matcher: new Minimatch(e, { dot: !0 }),
    gmatcher: r
  };
}
function setopts(e, r, i) {
  if (i || (i = {}), i.matchBase && r.indexOf("/") === -1) {
    if (i.noglobstar)
      throw new Error("base matching requires globstar");
    r = "**/" + r;
  }
  e.windowsPathsNoEscape = !!i.windowsPathsNoEscape || i.allowWindowsEscape === !1, e.windowsPathsNoEscape && (r = r.replace(/\\/g, "/")), e.silent = !!i.silent, e.pattern = r, e.strict = i.strict !== !1, e.realpath = !!i.realpath, e.realpathCache = i.realpathCache || /* @__PURE__ */ Object.create(null), e.follow = !!i.follow, e.dot = !!i.dot, e.mark = !!i.mark, e.nodir = !!i.nodir, e.nodir && (e.mark = !0), e.sync = !!i.sync, e.nounique = !!i.nounique, e.nonull = !!i.nonull, e.nosort = !!i.nosort, e.nocase = !!i.nocase, e.stat = !!i.stat, e.noprocess = !!i.noprocess, e.absolute = !!i.absolute, e.fs = i.fs || fs, e.maxLength = i.maxLength || 1 / 0, e.cache = i.cache || /* @__PURE__ */ Object.create(null), e.statCache = i.statCache || /* @__PURE__ */ Object.create(null), e.symlinks = i.symlinks || /* @__PURE__ */ Object.create(null), setupIgnores(e, i), e.changedCwd = !1;
  var n = process.cwd();
  ownProp(i, "cwd") ? (e.cwd = path.resolve(i.cwd), e.changedCwd = e.cwd !== n) : e.cwd = path.resolve(n), e.root = i.root || path.resolve(e.cwd, "/"), e.root = path.resolve(e.root), e.cwdAbs = isAbsolute(e.cwd) ? e.cwd : makeAbs(e, e.cwd), e.nomount = !!i.nomount, process.platform === "win32" && (e.root = e.root.replace(/\\/g, "/"), e.cwd = e.cwd.replace(/\\/g, "/"), e.cwdAbs = e.cwdAbs.replace(/\\/g, "/")), i.nonegate = !0, i.nocomment = !0, e.minimatch = new Minimatch(r, i), e.options = e.minimatch.options;
}
function finish(e) {
  for (var r = e.nounique, i = r ? [] : /* @__PURE__ */ Object.create(null), n = 0, s = e.matches.length; n < s; n++) {
    var o = e.matches[n];
    if (!o || Object.keys(o).length === 0) {
      if (e.nonull) {
        var h = e.minimatch.globSet[n];
        r ? i.push(h) : i[h] = !0;
      }
    } else {
      var l = Object.keys(o);
      r ? i.push.apply(i, l) : l.forEach(function(g) {
        i[g] = !0;
      });
    }
  }
  if (r || (i = Object.keys(i)), e.nosort || (i = i.sort(alphasort)), e.mark) {
    for (var n = 0; n < i.length; n++)
      i[n] = e._mark(i[n]);
    e.nodir && (i = i.filter(function(g) {
      var A = !/\/$/.test(g), B = e.cache[g] || e.cache[makeAbs(e, g)];
      return A && B && (A = B !== "DIR" && !Array.isArray(B)), A;
    }));
  }
  e.ignore.length && (i = i.filter(function(g) {
    return !isIgnored(e, g);
  })), e.found = i;
}
function mark(e, r) {
  var i = makeAbs(e, r), n = e.cache[i], s = r;
  if (n) {
    var o = n === "DIR" || Array.isArray(n), h = r.slice(-1) === "/";
    if (o && !h ? s += "/" : !o && h && (s = s.slice(0, -1)), s !== r) {
      var l = makeAbs(e, s);
      e.statCache[l] = e.statCache[i], e.cache[l] = e.cache[i];
    }
  }
  return s;
}
function makeAbs(e, r) {
  var i = r;
  return r.charAt(0) === "/" ? i = path.join(e.root, r) : isAbsolute(r) || r === "" ? i = r : e.changedCwd ? i = path.resolve(e.cwd, r) : i = path.resolve(r), process.platform === "win32" && (i = i.replace(/\\/g, "/")), i;
}
function isIgnored(e, r) {
  return e.ignore.length ? e.ignore.some(function(i) {
    return i.matcher.match(r) || !!(i.gmatcher && i.gmatcher.match(r));
  }) : !1;
}
function childrenIgnored(e, r) {
  return e.ignore.length ? e.ignore.some(function(i) {
    return !!(i.gmatcher && i.gmatcher.match(r));
  }) : !1;
}
var sync, hasRequiredSync;
function requireSync() {
  if (hasRequiredSync)
    return sync;
  hasRequiredSync = 1, sync = B, B.GlobSync = z;
  var e = fs_realpath, r = minimatch_1;
  r.Minimatch, requireGlob().Glob;
  var i = require$$9, n = require$$9, s = require$$9.isAbsolute, o = common, h = o.setopts, l = o.ownProp, g = o.childrenIgnored, A = o.isIgnored;
  function B(f, k) {
    if (typeof k == "function" || arguments.length === 3)
      throw new TypeError(`callback provided to sync glob
See: https://github.com/isaacs/node-glob/issues/167`);
    return new z(f, k).found;
  }
  function z(f, k) {
    if (!f)
      throw new Error("must provide pattern");
    if (typeof k == "function" || arguments.length === 3)
      throw new TypeError(`callback provided to sync glob
See: https://github.com/isaacs/node-glob/issues/167`);
    if (!(this instanceof z))
      return new z(f, k);
    if (h(this, f, k), this.noprocess)
      return this;
    var y = this.minimatch.set.length;
    this.matches = new Array(y);
    for (var $ = 0; $ < y; $++)
      this._process(this.minimatch.set[$], $, !1);
    this._finish();
  }
  return z.prototype._finish = function() {
    if (n.ok(this instanceof z), this.realpath) {
      var f = this;
      this.matches.forEach(function(k, y) {
        var $ = f.matches[y] = /* @__PURE__ */ Object.create(null);
        for (var H in k)
          try {
            H = f._makeAbs(H);
            var et = e.realpathSync(H, f.realpathCache);
            $[et] = !0;
          } catch (q) {
            if (q.syscall === "stat")
              $[f._makeAbs(H)] = !0;
            else
              throw q;
          }
      });
    }
    o.finish(this);
  }, z.prototype._process = function(f, k, y) {
    n.ok(this instanceof z);
    for (var $ = 0; typeof f[$] == "string"; )
      $++;
    var H;
    switch ($) {
      case f.length:
        this._processSimple(f.join("/"), k);
        return;
      case 0:
        H = null;
        break;
      default:
        H = f.slice(0, $).join("/");
        break;
    }
    var et = f.slice($), q;
    H === null ? q = "." : ((s(H) || s(f.map(function(m) {
      return typeof m == "string" ? m : "[*]";
    }).join("/"))) && (!H || !s(H)) && (H = "/" + H), q = H);
    var rt = this._makeAbs(q);
    if (!g(this, q)) {
      var p = et[0] === r.GLOBSTAR;
      p ? this._processGlobStar(H, q, rt, et, k, y) : this._processReaddir(H, q, rt, et, k, y);
    }
  }, z.prototype._processReaddir = function(f, k, y, $, H, et) {
    var q = this._readdir(y, et);
    if (q) {
      for (var rt = $[0], p = !!this.minimatch.negate, m = rt._glob, R = this.dot || m.charAt(0) === ".", _ = [], w = 0; w < q.length; w++) {
        var j = q[w];
        if (j.charAt(0) !== "." || R) {
          var tt;
          p && !f ? tt = !j.match(rt) : tt = j.match(rt), tt && _.push(j);
        }
      }
      var X = _.length;
      if (X !== 0) {
        if ($.length === 1 && !this.mark && !this.stat) {
          this.matches[H] || (this.matches[H] = /* @__PURE__ */ Object.create(null));
          for (var w = 0; w < X; w++) {
            var j = _[w];
            f && (f.slice(-1) !== "/" ? j = f + "/" + j : j = f + j), j.charAt(0) === "/" && !this.nomount && (j = i.join(this.root, j)), this._emitMatch(H, j);
          }
          return;
        }
        $.shift();
        for (var w = 0; w < X; w++) {
          var j = _[w], it;
          f ? it = [f, j] : it = [j], this._process(it.concat($), H, et);
        }
      }
    }
  }, z.prototype._emitMatch = function(f, k) {
    if (!A(this, k)) {
      var y = this._makeAbs(k);
      if (this.mark && (k = this._mark(k)), this.absolute && (k = y), !this.matches[f][k]) {
        if (this.nodir) {
          var $ = this.cache[y];
          if ($ === "DIR" || Array.isArray($))
            return;
        }
        this.matches[f][k] = !0, this.stat && this._stat(k);
      }
    }
  }, z.prototype._readdirInGlobStar = function(f) {
    if (this.follow)
      return this._readdir(f, !1);
    var k, y;
    try {
      y = this.fs.lstatSync(f);
    } catch (H) {
      if (H.code === "ENOENT")
        return null;
    }
    var $ = y && y.isSymbolicLink();
    return this.symlinks[f] = $, !$ && y && !y.isDirectory() ? this.cache[f] = "FILE" : k = this._readdir(f, !1), k;
  }, z.prototype._readdir = function(f, k) {
    if (k && !l(this.symlinks, f))
      return this._readdirInGlobStar(f);
    if (l(this.cache, f)) {
      var y = this.cache[f];
      if (!y || y === "FILE")
        return null;
      if (Array.isArray(y))
        return y;
    }
    try {
      return this._readdirEntries(f, this.fs.readdirSync(f));
    } catch ($) {
      return this._readdirError(f, $), null;
    }
  }, z.prototype._readdirEntries = function(f, k) {
    if (!this.mark && !this.stat)
      for (var y = 0; y < k.length; y++) {
        var $ = k[y];
        f === "/" ? $ = f + $ : $ = f + "/" + $, this.cache[$] = !0;
      }
    return this.cache[f] = k, k;
  }, z.prototype._readdirError = function(f, k) {
    switch (k.code) {
      case "ENOTSUP":
      case "ENOTDIR":
        var y = this._makeAbs(f);
        if (this.cache[y] = "FILE", y === this.cwdAbs) {
          var $ = new Error(k.code + " invalid cwd " + this.cwd);
          throw $.path = this.cwd, $.code = k.code, $;
        }
        break;
      case "ENOENT":
      case "ELOOP":
      case "ENAMETOOLONG":
      case "UNKNOWN":
        this.cache[this._makeAbs(f)] = !1;
        break;
      default:
        if (this.cache[this._makeAbs(f)] = !1, this.strict)
          throw k;
        this.silent || console.error("glob error", k);
        break;
    }
  }, z.prototype._processGlobStar = function(f, k, y, $, H, et) {
    var q = this._readdir(y, et);
    if (q) {
      var rt = $.slice(1), p = f ? [f] : [], m = p.concat(rt);
      this._process(m, H, !1);
      var R = q.length, _ = this.symlinks[y];
      if (!(_ && et))
        for (var w = 0; w < R; w++) {
          var j = q[w];
          if (!(j.charAt(0) === "." && !this.dot)) {
            var tt = p.concat(q[w], rt);
            this._process(tt, H, !0);
            var X = p.concat(q[w], $);
            this._process(X, H, !0);
          }
        }
    }
  }, z.prototype._processSimple = function(f, k) {
    var y = this._stat(f);
    if (this.matches[k] || (this.matches[k] = /* @__PURE__ */ Object.create(null)), !!y) {
      if (f && s(f) && !this.nomount) {
        var $ = /[\/\\]$/.test(f);
        f.charAt(0) === "/" ? f = i.join(this.root, f) : (f = i.resolve(this.root, f), $ && (f += "/"));
      }
      process.platform === "win32" && (f = f.replace(/\\/g, "/")), this._emitMatch(k, f);
    }
  }, z.prototype._stat = function(f) {
    var k = this._makeAbs(f), y = f.slice(-1) === "/";
    if (f.length > this.maxLength)
      return !1;
    if (!this.stat && l(this.cache, k)) {
      var et = this.cache[k];
      if (Array.isArray(et) && (et = "DIR"), !y || et === "DIR")
        return et;
      if (y && et === "FILE")
        return !1;
    }
    var $ = this.statCache[k];
    if (!$) {
      var H;
      try {
        H = this.fs.lstatSync(k);
      } catch (q) {
        if (q && (q.code === "ENOENT" || q.code === "ENOTDIR"))
          return this.statCache[k] = !1, !1;
      }
      if (H && H.isSymbolicLink())
        try {
          $ = this.fs.statSync(k);
        } catch {
          $ = H;
        }
      else
        $ = H;
    }
    this.statCache[k] = $;
    var et = !0;
    return $ && (et = $.isDirectory() ? "DIR" : "FILE"), this.cache[k] = this.cache[k] || et, y && et === "FILE" ? !1 : et;
  }, z.prototype._mark = function(f) {
    return o.mark(this, f);
  }, z.prototype._makeAbs = function(f) {
    return o.makeAbs(this, f);
  }, sync;
}
var wrappy_1 = wrappy$2;
function wrappy$2(e, r) {
  if (e && r)
    return wrappy$2(e)(r);
  if (typeof e != "function")
    throw new TypeError("need wrapper function");
  return Object.keys(e).forEach(function(n) {
    i[n] = e[n];
  }), i;
  function i() {
    for (var n = new Array(arguments.length), s = 0; s < n.length; s++)
      n[s] = arguments[s];
    var o = e.apply(this, n), h = n[n.length - 1];
    return typeof o == "function" && o !== h && Object.keys(h).forEach(function(l) {
      o[l] = h[l];
    }), o;
  }
}
var onceExports = {}, once$2 = {
  get exports() {
    return onceExports;
  },
  set exports(e) {
    onceExports = e;
  }
}, wrappy$1 = wrappy_1;
once$2.exports = wrappy$1(once$1);
onceExports.strict = wrappy$1(onceStrict);
once$1.proto = once$1(function() {
  Object.defineProperty(Function.prototype, "once", {
    value: function() {
      return once$1(this);
    },
    configurable: !0
  }), Object.defineProperty(Function.prototype, "onceStrict", {
    value: function() {
      return onceStrict(this);
    },
    configurable: !0
  });
});
function once$1(e) {
  var r = function() {
    return r.called ? r.value : (r.called = !0, r.value = e.apply(this, arguments));
  };
  return r.called = !1, r;
}
function onceStrict(e) {
  var r = function() {
    if (r.called)
      throw new Error(r.onceError);
    return r.called = !0, r.value = e.apply(this, arguments);
  }, i = e.name || "Function wrapped with `once`";
  return r.onceError = i + " shouldn't be called more than once", r.called = !1, r;
}
var wrappy = wrappy_1, reqs = /* @__PURE__ */ Object.create(null), once = onceExports, inflight_1 = wrappy(inflight);
function inflight(e, r) {
  return reqs[e] ? (reqs[e].push(r), null) : (reqs[e] = [r], makeres(e));
}
function makeres(e) {
  return once(function r() {
    var i = reqs[e], n = i.length, s = slice(arguments);
    try {
      for (var o = 0; o < n; o++)
        i[o].apply(null, s);
    } finally {
      i.length > n ? (i.splice(0, n), process.nextTick(function() {
        r.apply(null, s);
      })) : delete reqs[e];
    }
  });
}
function slice(e) {
  for (var r = e.length, i = [], n = 0; n < r; n++)
    i[n] = e[n];
  return i;
}
var glob_1, hasRequiredGlob;
function requireGlob() {
  if (hasRequiredGlob)
    return glob_1;
  hasRequiredGlob = 1, glob_1 = $;
  var e = fs_realpath, r = minimatch_1;
  r.Minimatch;
  var i = inherits_browserExports, n = require$$9.EventEmitter, s = require$$9, o = require$$9, h = require$$9.isAbsolute, l = requireSync(), g = common, A = g.setopts, B = g.ownProp, z = inflight_1, f = g.childrenIgnored, k = g.isIgnored, y = onceExports;
  function $(p, m, R) {
    if (typeof m == "function" && (R = m, m = {}), m || (m = {}), m.sync) {
      if (R)
        throw new TypeError("callback provided to sync glob");
      return l(p, m);
    }
    return new q(p, m, R);
  }
  $.sync = l;
  var H = $.GlobSync = l.GlobSync;
  $.glob = $;
  function et(p, m) {
    if (m === null || typeof m != "object")
      return p;
    for (var R = Object.keys(m), _ = R.length; _--; )
      p[R[_]] = m[R[_]];
    return p;
  }
  $.hasMagic = function(p, m) {
    var R = et({}, m);
    R.noprocess = !0;
    var _ = new q(p, R), w = _.minimatch.set;
    if (!p)
      return !1;
    if (w.length > 1)
      return !0;
    for (var j = 0; j < w[0].length; j++)
      if (typeof w[0][j] != "string")
        return !0;
    return !1;
  }, $.Glob = q, i(q, n);
  function q(p, m, R) {
    if (typeof m == "function" && (R = m, m = null), m && m.sync) {
      if (R)
        throw new TypeError("callback provided to sync glob");
      return new H(p, m);
    }
    if (!(this instanceof q))
      return new q(p, m, R);
    A(this, p, m), this._didRealPath = !1;
    var _ = this.minimatch.set.length;
    this.matches = new Array(_), typeof R == "function" && (R = y(R), this.on("error", R), this.on("end", function(it) {
      R(null, it);
    }));
    var w = this;
    if (this._processing = 0, this._emitQueue = [], this._processQueue = [], this.paused = !1, this.noprocess)
      return this;
    if (_ === 0)
      return X();
    for (var j = !0, tt = 0; tt < _; tt++)
      this._process(this.minimatch.set[tt], tt, !1, X);
    j = !1;
    function X() {
      --w._processing, w._processing <= 0 && (j ? process.nextTick(function() {
        w._finish();
      }) : w._finish());
    }
  }
  q.prototype._finish = function() {
    if (o(this instanceof q), !this.aborted) {
      if (this.realpath && !this._didRealpath)
        return this._realpath();
      g.finish(this), this.emit("end", this.found);
    }
  }, q.prototype._realpath = function() {
    if (this._didRealpath)
      return;
    this._didRealpath = !0;
    var p = this.matches.length;
    if (p === 0)
      return this._finish();
    for (var m = this, R = 0; R < this.matches.length; R++)
      this._realpathSet(R, _);
    function _() {
      --p === 0 && m._finish();
    }
  }, q.prototype._realpathSet = function(p, m) {
    var R = this.matches[p];
    if (!R)
      return m();
    var _ = Object.keys(R), w = this, j = _.length;
    if (j === 0)
      return m();
    var tt = this.matches[p] = /* @__PURE__ */ Object.create(null);
    _.forEach(function(X, it) {
      X = w._makeAbs(X), e.realpath(X, w.realpathCache, function(ot, at) {
        ot ? ot.syscall === "stat" ? tt[X] = !0 : w.emit("error", ot) : tt[at] = !0, --j === 0 && (w.matches[p] = tt, m());
      });
    });
  }, q.prototype._mark = function(p) {
    return g.mark(this, p);
  }, q.prototype._makeAbs = function(p) {
    return g.makeAbs(this, p);
  }, q.prototype.abort = function() {
    this.aborted = !0, this.emit("abort");
  }, q.prototype.pause = function() {
    this.paused || (this.paused = !0, this.emit("pause"));
  }, q.prototype.resume = function() {
    if (this.paused) {
      if (this.emit("resume"), this.paused = !1, this._emitQueue.length) {
        var p = this._emitQueue.slice(0);
        this._emitQueue.length = 0;
        for (var m = 0; m < p.length; m++) {
          var R = p[m];
          this._emitMatch(R[0], R[1]);
        }
      }
      if (this._processQueue.length) {
        var _ = this._processQueue.slice(0);
        this._processQueue.length = 0;
        for (var m = 0; m < _.length; m++) {
          var w = _[m];
          this._processing--, this._process(w[0], w[1], w[2], w[3]);
        }
      }
    }
  }, q.prototype._process = function(p, m, R, _) {
    if (o(this instanceof q), o(typeof _ == "function"), !this.aborted) {
      if (this._processing++, this.paused) {
        this._processQueue.push([p, m, R, _]);
        return;
      }
      for (var w = 0; typeof p[w] == "string"; )
        w++;
      var j;
      switch (w) {
        case p.length:
          this._processSimple(p.join("/"), m, _);
          return;
        case 0:
          j = null;
          break;
        default:
          j = p.slice(0, w).join("/");
          break;
      }
      var tt = p.slice(w), X;
      j === null ? X = "." : ((h(j) || h(p.map(function(at) {
        return typeof at == "string" ? at : "[*]";
      }).join("/"))) && (!j || !h(j)) && (j = "/" + j), X = j);
      var it = this._makeAbs(X);
      if (f(this, X))
        return _();
      var ot = tt[0] === r.GLOBSTAR;
      ot ? this._processGlobStar(j, X, it, tt, m, R, _) : this._processReaddir(j, X, it, tt, m, R, _);
    }
  }, q.prototype._processReaddir = function(p, m, R, _, w, j, tt) {
    var X = this;
    this._readdir(R, j, function(it, ot) {
      return X._processReaddir2(p, m, R, _, w, j, ot, tt);
    });
  }, q.prototype._processReaddir2 = function(p, m, R, _, w, j, tt, X) {
    if (!tt)
      return X();
    for (var it = _[0], ot = !!this.minimatch.negate, at = it._glob, ct = this.dot || at.charAt(0) === ".", ht = [], nt = 0; nt < tt.length; nt++) {
      var st = tt[nt];
      if (st.charAt(0) !== "." || ct) {
        var lt;
        ot && !p ? lt = !st.match(it) : lt = st.match(it), lt && ht.push(st);
      }
    }
    var ut = ht.length;
    if (ut === 0)
      return X();
    if (_.length === 1 && !this.mark && !this.stat) {
      this.matches[w] || (this.matches[w] = /* @__PURE__ */ Object.create(null));
      for (var nt = 0; nt < ut; nt++) {
        var st = ht[nt];
        p && (p !== "/" ? st = p + "/" + st : st = p + st), st.charAt(0) === "/" && !this.nomount && (st = s.join(this.root, st)), this._emitMatch(w, st);
      }
      return X();
    }
    _.shift();
    for (var nt = 0; nt < ut; nt++) {
      var st = ht[nt];
      p && (p !== "/" ? st = p + "/" + st : st = p + st), this._process([st].concat(_), w, j, X);
    }
    X();
  }, q.prototype._emitMatch = function(p, m) {
    if (!this.aborted && !k(this, m)) {
      if (this.paused) {
        this._emitQueue.push([p, m]);
        return;
      }
      var R = h(m) ? m : this._makeAbs(m);
      if (this.mark && (m = this._mark(m)), this.absolute && (m = R), !this.matches[p][m]) {
        if (this.nodir) {
          var _ = this.cache[R];
          if (_ === "DIR" || Array.isArray(_))
            return;
        }
        this.matches[p][m] = !0;
        var w = this.statCache[R];
        w && this.emit("stat", m, w), this.emit("match", m);
      }
    }
  }, q.prototype._readdirInGlobStar = function(p, m) {
    if (this.aborted)
      return;
    if (this.follow)
      return this._readdir(p, !1, m);
    var R = "lstat\0" + p, _ = this, w = z(R, j);
    w && _.fs.lstat(p, w);
    function j(tt, X) {
      if (tt && tt.code === "ENOENT")
        return m();
      var it = X && X.isSymbolicLink();
      _.symlinks[p] = it, !it && X && !X.isDirectory() ? (_.cache[p] = "FILE", m()) : _._readdir(p, !1, m);
    }
  }, q.prototype._readdir = function(p, m, R) {
    if (!this.aborted && (R = z("readdir\0" + p + "\0" + m, R), !!R)) {
      if (m && !B(this.symlinks, p))
        return this._readdirInGlobStar(p, R);
      if (B(this.cache, p)) {
        var _ = this.cache[p];
        if (!_ || _ === "FILE")
          return R();
        if (Array.isArray(_))
          return R(null, _);
      }
      var w = this;
      w.fs.readdir(p, rt(this, p, R));
    }
  };
  function rt(p, m, R) {
    return function(_, w) {
      _ ? p._readdirError(m, _, R) : p._readdirEntries(m, w, R);
    };
  }
  return q.prototype._readdirEntries = function(p, m, R) {
    if (!this.aborted) {
      if (!this.mark && !this.stat)
        for (var _ = 0; _ < m.length; _++) {
          var w = m[_];
          p === "/" ? w = p + w : w = p + "/" + w, this.cache[w] = !0;
        }
      return this.cache[p] = m, R(null, m);
    }
  }, q.prototype._readdirError = function(p, m, R) {
    if (!this.aborted) {
      switch (m.code) {
        case "ENOTSUP":
        case "ENOTDIR":
          var _ = this._makeAbs(p);
          if (this.cache[_] = "FILE", _ === this.cwdAbs) {
            var w = new Error(m.code + " invalid cwd " + this.cwd);
            w.path = this.cwd, w.code = m.code, this.emit("error", w), this.abort();
          }
          break;
        case "ENOENT":
        case "ELOOP":
        case "ENAMETOOLONG":
        case "UNKNOWN":
          this.cache[this._makeAbs(p)] = !1;
          break;
        default:
          this.cache[this._makeAbs(p)] = !1, this.strict && (this.emit("error", m), this.abort()), this.silent || console.error("glob error", m);
          break;
      }
      return R();
    }
  }, q.prototype._processGlobStar = function(p, m, R, _, w, j, tt) {
    var X = this;
    this._readdir(R, j, function(it, ot) {
      X._processGlobStar2(p, m, R, _, w, j, ot, tt);
    });
  }, q.prototype._processGlobStar2 = function(p, m, R, _, w, j, tt, X) {
    if (!tt)
      return X();
    var it = _.slice(1), ot = p ? [p] : [], at = ot.concat(it);
    this._process(at, w, !1, X);
    var ct = this.symlinks[R], ht = tt.length;
    if (ct && j)
      return X();
    for (var nt = 0; nt < ht; nt++) {
      var st = tt[nt];
      if (!(st.charAt(0) === "." && !this.dot)) {
        var lt = ot.concat(tt[nt], it);
        this._process(lt, w, !0, X);
        var ut = ot.concat(tt[nt], _);
        this._process(ut, w, !0, X);
      }
    }
    X();
  }, q.prototype._processSimple = function(p, m, R) {
    var _ = this;
    this._stat(p, function(w, j) {
      _._processSimple2(p, m, w, j, R);
    });
  }, q.prototype._processSimple2 = function(p, m, R, _, w) {
    if (this.matches[m] || (this.matches[m] = /* @__PURE__ */ Object.create(null)), !_)
      return w();
    if (p && h(p) && !this.nomount) {
      var j = /[\/\\]$/.test(p);
      p.charAt(0) === "/" ? p = s.join(this.root, p) : (p = s.resolve(this.root, p), j && (p += "/"));
    }
    process.platform === "win32" && (p = p.replace(/\\/g, "/")), this._emitMatch(m, p), w();
  }, q.prototype._stat = function(p, m) {
    var R = this._makeAbs(p), _ = p.slice(-1) === "/";
    if (p.length > this.maxLength)
      return m();
    if (!this.stat && B(this.cache, R)) {
      var w = this.cache[R];
      if (Array.isArray(w) && (w = "DIR"), !_ || w === "DIR")
        return m(null, w);
      if (_ && w === "FILE")
        return m();
    }
    var j = this.statCache[R];
    if (j !== void 0) {
      if (j === !1)
        return m(null, j);
      var tt = j.isDirectory() ? "DIR" : "FILE";
      return _ && tt === "FILE" ? m() : m(null, tt, j);
    }
    var X = this, it = z("stat\0" + R, ot);
    it && X.fs.lstat(R, it);
    function ot(at, ct) {
      if (ct && ct.isSymbolicLink())
        return X.fs.stat(R, function(ht, nt) {
          ht ? X._stat2(p, R, null, ct, m) : X._stat2(p, R, ht, nt, m);
        });
      X._stat2(p, R, at, ct, m);
    }
  }, q.prototype._stat2 = function(p, m, R, _, w) {
    if (R && (R.code === "ENOENT" || R.code === "ENOTDIR"))
      return this.statCache[m] = !1, w();
    var j = p.slice(-1) === "/";
    if (this.statCache[m] = _, m.slice(-1) === "/" && _ && !_.isDirectory())
      return w(null, !1, _);
    var tt = !0;
    return _ && (tt = _.isDirectory() ? "DIR" : "FILE"), this.cache[m] = this.cache[m] || tt, j && tt === "FILE" ? w() : w(null, tt, _);
  }, glob_1;
}
var globExports = requireGlob();
const glob = /* @__PURE__ */ getDefaultExportFromCjs(globExports), { readdir, readFile } = fs$3;
let rootPath = "";
const replaceMdSyntax = (e) => e.replace(/\[(.*?)\]\(.*?\)/g, "$1").replace(/(\*+)(\s*\b)([^\*]*)(\b\s*)(\*+)/gm, "$3"), match = (e, r) => {
  let i = !1;
  for (const n of r)
    if (n instanceof RegExp) {
      if (n.test(e)) {
        i = !0;
        break;
      }
    } else if (typeof n == "string" && glob.sync(n).includes(e)) {
      i = !0;
      break;
    }
  return i;
}, getFileList = async (e, r) => {
  var s, o;
  let i = [];
  const n = await readdir(e, { withFileTypes: !0 });
  for (const h of n)
    ((s = r == null ? void 0 : r.allow) == null ? void 0 : s.length) > 0 && !match(`${e}/${h.name}`, r.allow) || ((o = r == null ? void 0 : r.ignore) == null ? void 0 : o.length) > 0 && match(`${e}/${h.name}`, r.ignore) || (h.isDirectory() && h.name != "node_modules" ? i = [...i, ...await getFileList(`${e}/${h.name}`, r)] : h.name.endsWith(".md") && i.push(`${e}/${h.name}`));
  return i;
}, removeFrontMatter = (e) => e.replace(/^---(.|\W)*?---/, ""), removeScriptTag = (e) => e.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "").trim(), removeStyleTag = (e) => e.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "").trim(), processMdFiles = async (e, r) => {
  rootPath = e;
  let i = await getFileList(e, r), n = [];
  for (let s = 0; s < i.length; s++) {
    const o = i[s];
    let h = await readFile(o, { encoding: "utf8" }), l = removeStyleTag(
      removeScriptTag(replaceMdSyntax(removeFrontMatter(h)))
    );
    n.push({ content: l, path: o });
  }
  return Promise.resolve(n);
}, parseMdContent = (e, r) => e.split(/(^|\s)#{2,}\s/gi).filter((o) => o != "" && o != `
`).map((o) => {
  let h = o.split(`
`);
  return { anchor: (h == null ? void 0 : h.shift()) || "", content: h.join(`
`), path: r };
}), buildDoc = (e, r) => {
  let i, n, s = e.anchor;
  (i = /\{(.*?)\}/m.exec(e.anchor)) !== null && (s = i[0], n = e.anchor.replace(/\{(.*?)\}/m, "")), s = slugify(s), s[0] == "#" && (s = s.replace("#", ""));
  let o = e.path.replace(rootPath + "/", "").replace("md", "html");
  return r.includes(".0") || (o += `#${slugify(s)}`), n ? {
    id: r,
    link: o,
    b: e.content,
    a: s,
    t: n
  } : {
    id: r,
    link: o,
    b: e.content,
    a: s
  };
}, buildDocs = async (e, r) => {
  const i = await processMdFiles(e, r), n = [];
  if (i !== void 0)
    for (let s = 0; s < i.length; s++) {
      const o = i[s];
      let h = parseMdContent(o.content, o.path);
      for (let l = 0; l < h.length; l++) {
        const g = h[l];
        n.push(buildDoc(g, s + "." + l));
      }
    }
  return n;
};
var flexsearch_bundleExports = {}, flexsearch_bundle = {
  get exports() {
    return flexsearch_bundleExports;
  },
  set exports(e) {
    flexsearch_bundleExports = e;
  }
};
(function(module) {
  (function _f(self) {
    try {
      module && (self = module);
    } catch (e) {
    }
    self._factory = _f;
    var t;
    function u(e) {
      return typeof e < "u" ? e : !0;
    }
    function aa(e) {
      const r = Array(e);
      for (let i = 0; i < e; i++)
        r[i] = v();
      return r;
    }
    function v() {
      return /* @__PURE__ */ Object.create(null);
    }
    function ba(e, r) {
      return r.length - e.length;
    }
    function x(e) {
      return typeof e == "string";
    }
    function C(e) {
      return typeof e == "object";
    }
    function D(e) {
      return typeof e == "function";
    }
    function ca(e, r) {
      var i = da;
      if (e && (r && (e = E(e, r)), this.H && (e = E(e, this.H)), this.J && 1 < e.length && (e = E(e, this.J)), i || i === "")) {
        if (e = e.split(i), this.filter) {
          r = this.filter, i = e.length;
          const n = [];
          for (let s = 0, o = 0; s < i; s++) {
            const h = e[s];
            h && !r[h] && (n[o++] = h);
          }
          e = n;
        }
        return e;
      }
      return e;
    }
    const da = /[\p{Z}\p{S}\p{P}\p{C}]+/u, ea = /[\u0300-\u036f]/g;
    function fa(e, r) {
      const i = Object.keys(e), n = i.length, s = [];
      let o = "", h = 0;
      for (let l = 0, g, A; l < n; l++)
        g = i[l], (A = e[g]) ? (s[h++] = F(r ? "(?!\\b)" + g + "(\\b|_)" : g), s[h++] = A) : o += (o ? "|" : "") + g;
      return o && (s[h++] = F(r ? "(?!\\b)(" + o + ")(\\b|_)" : "(" + o + ")"), s[h] = ""), s;
    }
    function E(e, r) {
      for (let i = 0, n = r.length; i < n && (e = e.replace(r[i], r[i + 1]), e); i += 2)
        ;
      return e;
    }
    function F(e) {
      return new RegExp(e, "g");
    }
    function ha(e) {
      let r = "", i = "";
      for (let n = 0, s = e.length, o; n < s; n++)
        (o = e[n]) !== i && (r += i = o);
      return r;
    }
    var ja = { encode: ia, F: !1, G: "" };
    function ia(e) {
      return ca.call(this, ("" + e).toLowerCase(), !1);
    }
    const ka = {}, G = {};
    function la(e) {
      I(e, "add"), I(e, "append"), I(e, "search"), I(e, "update"), I(e, "remove");
    }
    function I(e, r) {
      e[r + "Async"] = function() {
        const i = this, n = arguments;
        var s = n[n.length - 1];
        let o;
        return D(s) && (o = s, delete n[n.length - 1]), s = new Promise(function(h) {
          setTimeout(function() {
            i.async = !0;
            const l = i[r].apply(i, n);
            i.async = !1, h(l);
          });
        }), o ? (s.then(o), this) : s;
      };
    }
    function ma(e, r, i, n) {
      const s = e.length;
      let o = [], h, l, g = 0;
      n && (n = []);
      for (let A = s - 1; 0 <= A; A--) {
        const B = e[A], z = B.length, f = v();
        let k = !h;
        for (let y = 0; y < z; y++) {
          const $ = B[y], H = $.length;
          if (H)
            for (let et = 0, q, rt; et < H; et++)
              if (rt = $[et], h) {
                if (h[rt]) {
                  if (!A) {
                    if (i)
                      i--;
                    else if (o[g++] = rt, g === r)
                      return o;
                  }
                  (A || n) && (f[rt] = 1), k = !0;
                }
                if (n && (q = (l[rt] || 0) + 1, l[rt] = q, q < s)) {
                  const p = n[q - 2] || (n[q - 2] = []);
                  p[p.length] = rt;
                }
              } else
                f[rt] = 1;
        }
        if (n)
          h || (l = f);
        else if (!k)
          return [];
        h = f;
      }
      if (n)
        for (let A = n.length - 1, B, z; 0 <= A; A--) {
          B = n[A], z = B.length;
          for (let f = 0, k; f < z; f++)
            if (k = B[f], !h[k]) {
              if (i)
                i--;
              else if (o[g++] = k, g === r)
                return o;
              h[k] = 1;
            }
        }
      return o;
    }
    function na(e, r) {
      const i = v(), n = v(), s = [];
      for (let o = 0; o < e.length; o++)
        i[e[o]] = 1;
      for (let o = 0, h; o < r.length; o++) {
        h = r[o];
        for (let l = 0, g; l < h.length; l++)
          g = h[l], i[g] && !n[g] && (n[g] = 1, s[s.length] = g);
      }
      return s;
    }
    function J(e) {
      this.l = e !== !0 && e, this.cache = v(), this.h = [];
    }
    function oa(e, r, i) {
      C(e) && (e = e.query);
      let n = this.cache.get(e);
      return n || (n = this.search(e, r, i), this.cache.set(e, n)), n;
    }
    J.prototype.set = function(e, r) {
      if (!this.cache[e]) {
        var i = this.h.length;
        for (i === this.l ? delete this.cache[this.h[i - 1]] : i++, --i; 0 < i; i--)
          this.h[i] = this.h[i - 1];
        this.h[0] = e;
      }
      this.cache[e] = r;
    }, J.prototype.get = function(e) {
      const r = this.cache[e];
      if (this.l && r && (e = this.h.indexOf(e))) {
        const i = this.h[e - 1];
        this.h[e - 1] = this.h[e], this.h[e] = i;
      }
      return r;
    };
    const qa = { memory: { charset: "latin:extra", D: 3, B: 4, m: !1 }, performance: { D: 3, B: 3, s: !1, context: { depth: 2, D: 1 } }, match: { charset: "latin:extra", G: "reverse" }, score: { charset: "latin:advanced", D: 20, B: 3, context: { depth: 3, D: 9 } }, default: {} };
    function ra(e, r, i, n, s, o, h) {
      setTimeout(function() {
        const l = e(i ? i + "." + n : n, JSON.stringify(h));
        l && l.then ? l.then(function() {
          r.export(e, r, i, s, o + 1);
        }) : r.export(e, r, i, s, o + 1);
      });
    }
    function K(e, r) {
      if (!(this instanceof K))
        return new K(e);
      var i;
      if (e) {
        x(e) ? e = qa[e] : (i = e.preset) && (e = Object.assign({}, i[i], e)), i = e.charset;
        var n = e.lang;
        x(i) && (i.indexOf(":") === -1 && (i += ":default"), i = G[i]), x(n) && (n = ka[n]);
      } else
        e = {};
      let s, o, h = e.context || {};
      if (this.encode = e.encode || i && i.encode || ia, this.register = r || v(), this.D = s = e.resolution || 9, this.G = r = i && i.G || e.tokenize || "strict", this.depth = r === "strict" && h.depth, this.l = u(h.bidirectional), this.s = o = u(e.optimize), this.m = u(e.fastupdate), this.B = e.minlength || 1, this.C = e.boost, this.map = o ? aa(s) : v(), this.A = s = h.resolution || 1, this.h = o ? aa(s) : v(), this.F = i && i.F || e.rtl, this.H = (r = e.matcher || n && n.H) && fa(r, !1), this.J = (r = e.stemmer || n && n.J) && fa(r, !0), i = r = e.filter || n && n.filter) {
        i = r, n = v();
        for (let l = 0, g = i.length; l < g; l++)
          n[i[l]] = 1;
        i = n;
      }
      this.filter = i, this.cache = (r = e.cache) && new J(r);
    }
    t = K.prototype, t.append = function(e, r) {
      return this.add(e, r, !0);
    }, t.add = function(e, r, i, n) {
      if (r && (e || e === 0)) {
        if (!n && !i && this.register[e])
          return this.update(e, r);
        if (r = this.encode(r), n = r.length) {
          const A = v(), B = v(), z = this.depth, f = this.D;
          for (let k = 0; k < n; k++) {
            let y = r[this.F ? n - 1 - k : k];
            var s = y.length;
            if (y && s >= this.B && (z || !B[y])) {
              var o = L(f, n, k), h = "";
              switch (this.G) {
                case "full":
                  if (2 < s) {
                    for (o = 0; o < s; o++)
                      for (var l = s; l > o; l--)
                        if (l - o >= this.B) {
                          var g = L(f, n, k, s, o);
                          h = y.substring(o, l), M(this, B, h, g, e, i);
                        }
                    break;
                  }
                case "reverse":
                  if (1 < s) {
                    for (l = s - 1; 0 < l; l--)
                      h = y[l] + h, h.length >= this.B && M(
                        this,
                        B,
                        h,
                        L(f, n, k, s, l),
                        e,
                        i
                      );
                    h = "";
                  }
                case "forward":
                  if (1 < s) {
                    for (l = 0; l < s; l++)
                      h += y[l], h.length >= this.B && M(this, B, h, o, e, i);
                    break;
                  }
                default:
                  if (this.C && (o = Math.min(o / this.C(r, y, k) | 0, f - 1)), M(this, B, y, o, e, i), z && 1 < n && k < n - 1) {
                    for (s = v(), h = this.A, o = y, l = Math.min(z + 1, n - k), s[o] = 1, g = 1; g < l; g++)
                      if ((y = r[this.F ? n - 1 - k - g : k + g]) && y.length >= this.B && !s[y]) {
                        s[y] = 1;
                        const $ = this.l && y > o;
                        M(this, A, $ ? o : y, L(h + (n / 2 > h ? 0 : 1), n, k, l - 1, g - 1), e, i, $ ? y : o);
                      }
                  }
              }
            }
          }
          this.m || (this.register[e] = 1);
        }
      }
      return this;
    };
    function L(e, r, i, n, s) {
      return i && 1 < e ? r + (n || 0) <= e ? i + (s || 0) : (e - 1) / (r + (n || 0)) * (i + (s || 0)) + 1 | 0 : 0;
    }
    function M(e, r, i, n, s, o, h) {
      let l = h ? e.h : e.map;
      (!r[i] || h && !r[i][h]) && (e.s && (l = l[n]), h ? (r = r[i] || (r[i] = v()), r[h] = 1, l = l[h] || (l[h] = v())) : r[i] = 1, l = l[i] || (l[i] = []), e.s || (l = l[n] || (l[n] = [])), o && l.includes(s) || (l[l.length] = s, e.m && (e = e.register[s] || (e.register[s] = []), e[e.length] = l)));
    }
    t.search = function(e, r, i) {
      i || (!r && C(e) ? (i = e, e = i.query) : C(r) && (i = r));
      let n = [], s, o, h = 0;
      if (i) {
        e = i.query || e, r = i.limit, h = i.offset || 0;
        var l = i.context;
        o = i.suggest;
      }
      if (e && (e = this.encode("" + e), s = e.length, 1 < s)) {
        i = v();
        var g = [];
        for (let B = 0, z = 0, f; B < s; B++)
          if ((f = e[B]) && f.length >= this.B && !i[f])
            if (this.s || o || this.map[f])
              g[z++] = f, i[f] = 1;
            else
              return n;
        e = g, s = e.length;
      }
      if (!s)
        return n;
      r || (r = 100), l = this.depth && 1 < s && l !== !1, i = 0;
      let A;
      l ? (A = e[0], i = 1) : 1 < s && e.sort(ba);
      for (let B, z; i < s; i++) {
        if (z = e[i], l ? (B = sa(
          this,
          n,
          o,
          r,
          h,
          s === 2,
          z,
          A
        ), o && B === !1 && n.length || (A = z)) : B = sa(this, n, o, r, h, s === 1, z), B)
          return B;
        if (o && i === s - 1) {
          if (g = n.length, !g) {
            if (l) {
              l = 0, i = -1;
              continue;
            }
            return n;
          }
          if (g === 1)
            return ta(n[0], r, h);
        }
      }
      return ma(n, r, h, o);
    };
    function sa(e, r, i, n, s, o, h, l) {
      let g = [], A = l ? e.h : e.map;
      if (e.s || (A = ua(A, h, l, e.l)), A) {
        let B = 0;
        const z = Math.min(A.length, l ? e.A : e.D);
        for (let f = 0, k = 0, y, $; f < z && !((y = A[f]) && (e.s && (y = ua(y, h, l, e.l)), s && y && o && ($ = y.length, $ <= s ? (s -= $, y = null) : (y = y.slice(s), s = 0)), y && (g[B++] = y, o && (k += y.length, k >= n)))); f++)
          ;
        if (B) {
          if (o)
            return ta(g, n, 0);
          r[r.length] = g;
          return;
        }
      }
      return !i && g;
    }
    function ta(e, r, i) {
      return e = e.length === 1 ? e[0] : [].concat.apply([], e), i || e.length > r ? e.slice(i, i + r) : e;
    }
    function ua(e, r, i, n) {
      return i ? (n = n && r > i, e = (e = e[n ? r : i]) && e[n ? i : r]) : e = e[r], e;
    }
    t.contain = function(e) {
      return !!this.register[e];
    }, t.update = function(e, r) {
      return this.remove(e).add(e, r);
    }, t.remove = function(e, r) {
      const i = this.register[e];
      if (i) {
        if (this.m)
          for (let n = 0, s; n < i.length; n++)
            s = i[n], s.splice(s.indexOf(e), 1);
        else
          N(this.map, e, this.D, this.s), this.depth && N(this.h, e, this.A, this.s);
        if (r || delete this.register[e], this.cache) {
          r = this.cache;
          for (let n = 0, s, o; n < r.h.length; n++)
            o = r.h[n], s = r.cache[o], s.includes(e) && (r.h.splice(n--, 1), delete r.cache[o]);
        }
      }
      return this;
    };
    function N(e, r, i, n, s) {
      let o = 0;
      if (e.constructor === Array)
        if (s)
          r = e.indexOf(r), r !== -1 ? 1 < e.length && (e.splice(r, 1), o++) : o++;
        else {
          s = Math.min(e.length, i);
          for (let h = 0, l; h < s; h++)
            (l = e[h]) && (o = N(l, r, i, n, s), n || o || delete e[h]);
        }
      else
        for (let h in e)
          (o = N(e[h], r, i, n, s)) || delete e[h];
      return o;
    }
    t.searchCache = oa, t.export = function(e, r, i, n, s) {
      let o, h;
      switch (s || (s = 0)) {
        case 0:
          if (o = "reg", this.m) {
            h = v();
            for (let l in this.register)
              h[l] = 1;
          } else
            h = this.register;
          break;
        case 1:
          o = "cfg", h = { doc: 0, opt: this.s ? 1 : 0 };
          break;
        case 2:
          o = "map", h = this.map;
          break;
        case 3:
          o = "ctx", h = this.h;
          break;
        default:
          return;
      }
      return ra(e, r || this, i, o, n, s, h), !0;
    }, t.import = function(e, r) {
      if (r)
        switch (x(r) && (r = JSON.parse(r)), e) {
          case "cfg":
            this.s = !!r.opt;
            break;
          case "reg":
            this.m = !1, this.register = r;
            break;
          case "map":
            this.map = r;
            break;
          case "ctx":
            this.h = r;
        }
    }, la(K.prototype);
    function va(e) {
      e = e.data;
      var r = self._index;
      const i = e.args;
      var n = e.task;
      switch (n) {
        case "init":
          n = e.options || {}, e = e.factory, r = n.encode, n.cache = !1, r && r.indexOf("function") === 0 && (n.encode = Function("return " + r)()), e ? (Function("return " + e)()(self), self._index = new self.FlexSearch.Index(n), delete self.FlexSearch) : self._index = new K(n);
          break;
        default:
          e = e.id, r = r[n].apply(r, i), postMessage(n === "search" ? { id: e, msg: r } : { id: e });
      }
    }
    let wa = 0;
    function O(e) {
      if (!(this instanceof O))
        return new O(e);
      var r;
      e ? D(r = e.encode) && (e.encode = r.toString()) : e = {}, (r = (self || window)._factory) && (r = r.toString());
      const i = typeof window > "u" && self.exports, n = this;
      this.o = xa(r, i, e.worker), this.h = v(), this.o && (i ? this.o.on("message", function(s) {
        n.h[s.id](s.msg), delete n.h[s.id];
      }) : this.o.onmessage = function(s) {
        s = s.data, n.h[s.id](s.msg), delete n.h[s.id];
      }, this.o.postMessage({ task: "init", factory: r, options: e }));
    }
    P("add"), P("append"), P("search"), P("update"), P("remove");
    function P(e) {
      O.prototype[e] = O.prototype[e + "Async"] = function() {
        const r = this, i = [].slice.call(arguments);
        var n = i[i.length - 1];
        let s;
        return D(n) && (s = n, i.splice(i.length - 1, 1)), n = new Promise(function(o) {
          setTimeout(function() {
            r.h[++wa] = o, r.o.postMessage({ task: e, id: wa, args: i });
          });
        }), s ? (n.then(s), this) : n;
      };
    }
    function xa(a, b, c) {
      let d;
      try {
        d = b ? eval('new (require("worker_threads")["Worker"])("../dist/node/node.js")') : a ? new Worker(URL.createObjectURL(new Blob(["onmessage=" + va.toString()], { type: "text/javascript" }))) : new Worker(x(c) ? c : "worker/worker.js", { type: "module" });
      } catch (e) {
      }
      return d;
    }
    function Q(e) {
      if (!(this instanceof Q))
        return new Q(e);
      var r = e.document || e.doc || e, i;
      this.K = [], this.h = [], this.A = [], this.register = v(), this.key = (i = r.key || r.id) && S(i, this.A) || "id", this.m = u(e.fastupdate), this.C = (i = r.store) && i !== !0 && [], this.store = i && v(), this.I = (i = r.tag) && S(i, this.A), this.l = i && v(), this.cache = (i = e.cache) && new J(i), e.cache = !1, this.o = e.worker, this.async = !1, i = v();
      let n = r.index || r.field || r;
      x(n) && (n = [n]);
      for (let s = 0, o, h; s < n.length; s++)
        o = n[s], x(o) || (h = o, o = o.field), h = C(h) ? Object.assign({}, e, h) : e, this.o && (i[o] = new O(h), i[o].o || (this.o = !1)), this.o || (i[o] = new K(h, this.register)), this.K[s] = S(o, this.A), this.h[s] = o;
      if (this.C)
        for (e = r.store, x(e) && (e = [e]), r = 0; r < e.length; r++)
          this.C[r] = S(e[r], this.A);
      this.index = i;
    }
    function S(e, r) {
      const i = e.split(":");
      let n = 0;
      for (let s = 0; s < i.length; s++)
        e = i[s], 0 <= e.indexOf("[]") && (e = e.substring(0, e.length - 2)) && (r[n] = !0), e && (i[n++] = e);
      return n < i.length && (i.length = n), 1 < n ? i : i[0];
    }
    function T(e, r) {
      if (x(r))
        e = e[r];
      else
        for (let i = 0; e && i < r.length; i++)
          e = e[r[i]];
      return e;
    }
    function U(e, r, i, n, s) {
      if (e = e[s], n === i.length - 1)
        r[s] = e;
      else if (e)
        if (e.constructor === Array)
          for (r = r[s] = Array(e.length), s = 0; s < e.length; s++)
            U(e, r, i, n, s);
        else
          r = r[s] || (r[s] = v()), s = i[++n], U(e, r, i, n, s);
    }
    function V(e, r, i, n, s, o, h, l) {
      if (e = e[h])
        if (n === r.length - 1) {
          if (e.constructor === Array) {
            if (i[n]) {
              for (r = 0; r < e.length; r++)
                s.add(o, e[r], !0, !0);
              return;
            }
            e = e.join(" ");
          }
          s.add(o, e, l, !0);
        } else if (e.constructor === Array)
          for (h = 0; h < e.length; h++)
            V(e, r, i, n, s, o, h, l);
        else
          h = r[++n], V(e, r, i, n, s, o, h, l);
    }
    t = Q.prototype, t.add = function(e, r, i) {
      if (C(e) && (r = e, e = T(r, this.key)), r && (e || e === 0)) {
        if (!i && this.register[e])
          return this.update(e, r);
        for (let n = 0, s, o; n < this.h.length; n++)
          o = this.h[n], s = this.K[n], x(s) && (s = [s]), V(r, s, this.A, 0, this.index[o], e, s[0], i);
        if (this.I) {
          let n = T(r, this.I), s = v();
          x(n) && (n = [n]);
          for (let o = 0, h, l; o < n.length; o++)
            if (h = n[o], !s[h] && (s[h] = 1, l = this.l[h] || (this.l[h] = []), !i || !l.includes(e)) && (l[l.length] = e, this.m)) {
              const g = this.register[e] || (this.register[e] = []);
              g[g.length] = l;
            }
        }
        if (this.store && (!i || !this.store[e])) {
          let n;
          if (this.C) {
            n = v();
            for (let s = 0, o; s < this.C.length; s++)
              o = this.C[s], x(o) ? n[o] = r[o] : U(r, n, o, 0, o[0]);
          }
          this.store[e] = n || r;
        }
      }
      return this;
    }, t.append = function(e, r) {
      return this.add(e, r, !0);
    }, t.update = function(e, r) {
      return this.remove(e).add(e, r);
    }, t.remove = function(e) {
      if (C(e) && (e = T(e, this.key)), this.register[e]) {
        for (var r = 0; r < this.h.length && (this.index[this.h[r]].remove(e, !this.o), !this.m); r++)
          ;
        if (this.I && !this.m)
          for (let i in this.l) {
            r = this.l[i];
            const n = r.indexOf(e);
            n !== -1 && (1 < r.length ? r.splice(n, 1) : delete this.l[i]);
          }
        this.store && delete this.store[e], delete this.register[e];
      }
      return this;
    }, t.search = function(e, r, i, n) {
      i || (!r && C(e) ? (i = e, e = "") : C(r) && (i = r, r = 0));
      let s = [], o = [], h, l, g, A, B, z, f = 0;
      if (i)
        if (i.constructor === Array)
          g = i, i = null;
        else {
          if (e = i.query || e, g = (h = i.pluck) || i.index || i.field, A = i.tag, l = this.store && i.enrich, B = i.bool === "and", r = i.limit || r || 100, z = i.offset || 0, A && (x(A) && (A = [A]), !e)) {
            for (let y = 0, $; y < A.length; y++)
              ($ = ya.call(this, A[y], r, z, l)) && (s[s.length] = $, f++);
            return f ? s : [];
          }
          x(g) && (g = [g]);
        }
      g || (g = this.h), B = B && (1 < g.length || A && 1 < A.length);
      const k = !n && (this.o || this.async) && [];
      for (let y = 0, $, H, et; y < g.length; y++) {
        let q;
        if (H = g[y], x(H) || (q = H, H = q.field, e = q.query || e, r = q.limit || r), k)
          k[y] = this.index[H].searchAsync(e, r, q || i);
        else {
          if (n ? $ = n[y] : $ = this.index[H].search(e, r, q || i), et = $ && $.length, A && et) {
            const rt = [];
            let p = 0;
            B && (rt[0] = [$]);
            for (let m = 0, R, _; m < A.length; m++)
              R = A[m], (et = (_ = this.l[R]) && _.length) && (p++, rt[rt.length] = B ? [_] : _);
            p && ($ = B ? ma(rt, r || 100, z || 0) : na($, rt), et = $.length);
          }
          if (et)
            o[f] = H, s[f++] = $;
          else if (B)
            return [];
        }
      }
      if (k) {
        const y = this;
        return new Promise(function($) {
          Promise.all(k).then(function(H) {
            $(y.search(
              e,
              r,
              i,
              H
            ));
          });
        });
      }
      if (!f)
        return [];
      if (h && (!l || !this.store))
        return s[0];
      for (let y = 0, $; y < o.length; y++) {
        if ($ = s[y], $.length && l && ($ = za.call(this, $)), h)
          return $;
        s[y] = { field: o[y], result: $ };
      }
      return s;
    };
    function ya(e, r, i, n) {
      let s = this.l[e], o = s && s.length - i;
      if (o && 0 < o)
        return (o > r || i) && (s = s.slice(i, i + r)), n && (s = za.call(this, s)), { tag: e, result: s };
    }
    function za(e) {
      const r = Array(e.length);
      for (let i = 0, n; i < e.length; i++)
        n = e[i], r[i] = { id: n, doc: this.store[n] };
      return r;
    }
    t.contain = function(e) {
      return !!this.register[e];
    }, t.get = function(e) {
      return this.store[e];
    }, t.set = function(e, r) {
      return this.store[e] = r, this;
    }, t.searchCache = oa, t.export = function(e, r, i, n, s) {
      if (s || (s = 0), n || (n = 0), n < this.h.length) {
        const o = this.h[n], h = this.index[o];
        r = this, setTimeout(function() {
          h.export(e, r, s ? o : "", n, s++) || (n++, s = 1, r.export(e, r, o, n, s));
        });
      } else {
        let o, h;
        switch (s) {
          case 1:
            o = "tag", h = this.l;
            break;
          case 2:
            o = "store", h = this.store;
            break;
          default:
            return;
        }
        ra(e, this, i, o, n, s, h);
      }
    }, t.import = function(e, r) {
      if (r)
        switch (x(r) && (r = JSON.parse(r)), e) {
          case "tag":
            this.l = r;
            break;
          case "reg":
            this.m = !1, this.register = r;
            for (let n = 0, s; n < this.h.length; n++)
              s = this.index[this.h[n]], s.register = r, s.m = !1;
            break;
          case "store":
            this.store = r;
            break;
          default:
            e = e.split(".");
            const i = e[0];
            e = e[1], i && e && this.index[i].import(e, r);
        }
    }, la(Q.prototype);
    var Ba = { encode: Aa, F: !1, G: "" };
    const Ca = [F("[àáâãäå]"), "a", F("[èéêë]"), "e", F("[ìíîï]"), "i", F("[òóôõöő]"), "o", F("[ùúûüű]"), "u", F("[ýŷÿ]"), "y", F("ñ"), "n", F("[çc]"), "k", F("ß"), "s", F(" & "), " and "];
    function Aa(e) {
      var r = e = "" + e;
      return r.normalize && (r = r.normalize("NFD").replace(ea, "")), ca.call(this, r.toLowerCase(), !e.normalize && Ca);
    }
    var Ea = { encode: Da, F: !1, G: "strict" };
    const Fa = /[^a-z0-9]+/, Ga = { b: "p", v: "f", w: "f", z: "s", x: "s", ß: "s", d: "t", n: "m", c: "k", g: "k", j: "k", q: "k", i: "e", y: "e", u: "o" };
    function Da(e) {
      e = Aa.call(this, e).join(" ");
      const r = [];
      if (e) {
        const i = e.split(Fa), n = i.length;
        for (let s = 0, o, h = 0; s < n; s++)
          if ((e = i[s]) && (!this.filter || !this.filter[e])) {
            o = e[0];
            let l = Ga[o] || o, g = l;
            for (let A = 1; A < e.length; A++) {
              o = e[A];
              const B = Ga[o] || o;
              B && B !== g && (l += B, g = B);
            }
            r[h++] = l;
          }
      }
      return r;
    }
    var Ia = { encode: Ha, F: !1, G: "" };
    const Ja = [F("ae"), "a", F("oe"), "o", F("sh"), "s", F("th"), "t", F("ph"), "f", F("pf"), "f", F("(?![aeo])h(?![aeo])"), "", F("(?!^[aeo])h(?!^[aeo])"), ""];
    function Ha(e, r) {
      return e && (e = Da.call(this, e).join(" "), 2 < e.length && (e = E(e, Ja)), r || (1 < e.length && (e = ha(e)), e && (e = e.split(" ")))), e || [];
    }
    var La = { encode: Ka, F: !1, G: "" };
    const Ma = F("(?!\\b)[aeo]");
    function Ka(e) {
      return e && (e = Ha.call(this, e, !0), 1 < e.length && (e = e.replace(Ma, "")), 1 < e.length && (e = ha(e)), e && (e = e.split(" "))), e || [];
    }
    G["latin:default"] = ja, G["latin:simple"] = Ba, G["latin:balance"] = Ea, G["latin:advanced"] = Ia, G["latin:extra"] = La;
    const W = self;
    let Y;
    const Z = { Index: K, Document: Q, Worker: O, registerCharset: function(e, r) {
      G[e] = r;
    }, registerLanguage: function(e, r) {
      ka[e] = r;
    } };
    (Y = W.define) && Y.amd ? Y([], function() {
      return Z;
    }) : W.exports ? W.exports = Z : W.FlexSearch = Z;
  })(commonjsGlobal);
})(flexsearch_bundle);
const FlexSearch = flexsearch_bundleExports, md = new MarkdownIt();
let MAX_PREVIEW_CHARS = 62;
const buildIndexSearch = (e, r) => {
  var i = new FlexSearch.Index(r);
  return e.forEach((n) => {
    i.add(n.id, n.a + " " + n.b);
  }), i;
};
function buildPreviews(e) {
  const r = {};
  for (let i = 0; i < e.length; i++) {
    const n = e[i];
    let s = md.render(n.b).replace(/(<([^>]+)>)/gi, "");
    s == "" && (s = n.b), s.length > MAX_PREVIEW_CHARS && (s = s.slice(0, MAX_PREVIEW_CHARS) + " ..."), r[n.id] = {
      t: n.t || n.a,
      p: s,
      l: n.link,
      a: n.a
    };
  }
  return r;
}
async function IndexSearch(e, r) {
  console.log("  🔎 Indexing..."), r.previewLength && (MAX_PREVIEW_CHARS = r.previewLength);
  const i = await buildDocs(e, r), n = buildPreviews(i), s = buildIndexSearch(i, r);
  var o = {
    reg: JSON.stringify(s.registry),
    cfg: JSON.stringify(s.cfg),
    map: JSON.stringify(s.map),
    ctx: JSON.stringify(s.ctx)
  };
  const h = `const INDEX_DATA = ${JSON.stringify(o)};
  const PREVIEW_LOOKUP = ${JSON.stringify(n)};
  const Options = ${JSON.stringify(r)};
  const data = { INDEX_DATA, PREVIEW_LOOKUP, Options };
  export default data;`;
  return console.log("  🔎 Done."), h;
}
const DEFAULT_OPTIONS = {
  previewLength: 62,
  buttonLabel: "Search",
  placeholder: "Search docs",
  allow: [],
  ignore: []
};
function SearchPlugin(e) {
  const r = {
    ...DEFAULT_OPTIONS,
    ...e
  };
  let i;
  const n = "virtual:search-data", s = "\0" + n;
  return {
    name: "vite-plugin-search",
    enforce: "pre",
    configResolved(o) {
      i = o;
    },
    config: () => ({
      resolve: {
        alias: { "./VPNavBarSearch.vue": "vitepress-plugin-search/Search.vue" }
      }
    }),
    async resolveId(o) {
      if (o === n)
        return s;
    },
    async load(o) {
      if (o === s)
        return i.build.ssr ? `const INDEX_DATA = { };
				const PREVIEW_LOOKUP = {};
				const Options = ${JSON.stringify(r)};
				const data = { INDEX_DATA, PREVIEW_LOOKUP, Options };
				export default data;` : await IndexSearch(i.root, r);
    }
  };
}
export {
  SearchPlugin
};

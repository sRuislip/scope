/*! @license Firebase v2.1.2 - License: https://www.firebase.com/terms/terms-of-service.html */
(function() {
    var h, aa = this;

    function m(a) {
        return void 0 !== a
    }

    function ba() {}

    function ca(a) {
        a.Nb = function() {
            return a.kf ? a.kf : a.kf = new a
        }
    }

    function da(a) {
        var b = typeof a;
        if ("object" == b)
            if (a) {
                if (a instanceof Array) return "array";
                if (a instanceof Object) return b;
                var c = Object.prototype.toString.call(a);
                if ("[object Window]" == c) return "object";
                if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
            } else return "null";
        else if ("function" == b && "undefined" == typeof a.call) return "object";
        return b
    }

    function ea(a) {
        return "array" == da(a)
    }

    function fa(a) {
        var b = da(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }

    function p(a) {
        return "string" == typeof a
    }

    function ga(a) {
        return "number" == typeof a
    }

    function ha(a) {
        return "function" == da(a)
    }

    function ia(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }

    function ja(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }

    function ka(a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }

    function q(a, b, c) {
        q = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ja : ka;
        return q.apply(null, arguments)
    }
    var la = Date.now || function() {
        return +new Date
    };

    function ma(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.Jg = b.prototype;
        a.prototype = new c;
        a.Fg = function(a, c, f) {
            return b.prototype[c].apply(a, Array.prototype.slice.call(arguments, 2))
        }
    };

    function na(a) {
        a = String(a);
        if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) try {
            return eval("(" + a + ")")
        } catch (b) {}
        throw Error("Invalid JSON string: " + a);
    }

    function oa() {
        this.Hd = void 0
    }

    function pa(a, b, c) {
        switch (typeof b) {
            case "string":
                qa(b, c);
                break;
            case "number":
                c.push(isFinite(b) && !isNaN(b) ? b : "null");
                break;
            case "boolean":
                c.push(b);
                break;
            case "undefined":
                c.push("null");
                break;
            case "object":
                if (null == b) {
                    c.push("null");
                    break
                }
                if (ea(b)) {
                    var d = b.length;
                    c.push("[");
                    for (var e = "", f = 0; f < d; f++) c.push(e), e = b[f], pa(a, a.Hd ? a.Hd.call(b, String(f), e) : e, c), e = ",";
                    c.push("]");
                    break
                }
                c.push("{");
                d = "";
                for (f in b) Object.prototype.hasOwnProperty.call(b, f) && (e = b[f], "function" != typeof e && (c.push(d), qa(f, c),
                    c.push(":"), pa(a, a.Hd ? a.Hd.call(b, f, e) : e, c), d = ","));
                c.push("}");
                break;
            case "function":
                break;
            default:
                throw Error("Unknown type: " + typeof b);
        }
    }
    var ra = {
            '"': '\\"',
            "\\": "\\\\",
            "/": "\\/",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "\t": "\\t",
            "\x0B": "\\u000b"
        },
        sa = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;

    function qa(a, b) {
        b.push('"', a.replace(sa, function(a) {
            if (a in ra) return ra[a];
            var b = a.charCodeAt(0),
                e = "\\u";
            16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
            return ra[a] = e + b.toString(16)
        }), '"')
    };

    function ta(a) {
        return "undefined" !== typeof JSON && m(JSON.parse) ? JSON.parse(a) : na(a)
    }

    function r(a) {
        if ("undefined" !== typeof JSON && m(JSON.stringify)) a = JSON.stringify(a);
        else {
            var b = [];
            pa(new oa, a, b);
            a = b.join("")
        }
        return a
    };

    function s(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }

    function t(a, b) {
        if (Object.prototype.hasOwnProperty.call(a, b)) return a[b]
    }

    function ua(a, b) {
        for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b(c, a[c])
    }

    function va(a) {
        var b = {};
        ua(a, function(a, d) {
            b[a] = d
        });
        return b
    };

    function wa(a) {
        this.uc = a;
        this.Ed = "firebase:"
    }
    h = wa.prototype;
    h.set = function(a, b) {
        null == b ? this.uc.removeItem(this.Ed + a) : this.uc.setItem(this.Ed + a, r(b))
    };
    h.get = function(a) {
        a = this.uc.getItem(this.Ed + a);
        return null == a ? null : ta(a)
    };
    h.remove = function(a) {
        this.uc.removeItem(this.Ed + a)
    };
    h.lf = !1;
    h.toString = function() {
        return this.uc.toString()
    };

    function xa() {
        this.oc = {}
    }
    xa.prototype.set = function(a, b) {
        null == b ? delete this.oc[a] : this.oc[a] = b
    };
    xa.prototype.get = function(a) {
        return s(this.oc, a) ? this.oc[a] : null
    };
    xa.prototype.remove = function(a) {
        delete this.oc[a]
    };
    xa.prototype.lf = !0;

    function ya(a) {
        try {
            if ("undefined" !== typeof window && "undefined" !== typeof window[a]) {
                var b = window[a];
                b.setItem("firebase:sentinel", "cache");
                b.removeItem("firebase:sentinel");
                return new wa(b)
            }
        } catch (c) {}
        return new xa
    }
    var za = ya("localStorage"),
        v = ya("sessionStorage");

    function Aa(a, b, c, d, e) {
        this.host = a.toLowerCase();
        this.domain = this.host.substr(this.host.indexOf(".") + 1);
        this.Ab = b;
        this.tb = c;
        this.Dg = d;
        this.Dd = e || "";
        this.Ma = za.get("host:" + a) || this.host
    }

    function Ba(a, b) {
        b !== a.Ma && (a.Ma = b, "s-" === a.Ma.substr(0, 2) && za.set("host:" + a.host, a.Ma))
    }
    Aa.prototype.toString = function() {
        var a = (this.Ab ? "https://" : "http://") + this.host;
        this.Dd && (a += "<" + this.Dd + ">");
        return a
    };

    function Ca() {
        this.Sa = -1
    };

    function Da() {
        this.Sa = -1;
        this.Sa = 64;
        this.R = [];
        this.be = [];
        this.Ef = [];
        this.Ad = [];
        this.Ad[0] = 128;
        for (var a = 1; a < this.Sa; ++a) this.Ad[a] = 0;
        this.Td = this.Sb = 0;
        this.reset()
    }
    ma(Da, Ca);
    Da.prototype.reset = function() {
        this.R[0] = 1732584193;
        this.R[1] = 4023233417;
        this.R[2] = 2562383102;
        this.R[3] = 271733878;
        this.R[4] = 3285377520;
        this.Td = this.Sb = 0
    };

    function Ea(a, b, c) {
        c || (c = 0);
        var d = a.Ef;
        if (p(b))
            for (var e = 0; 16 > e; e++) d[e] = b.charCodeAt(c) << 24 | b.charCodeAt(c + 1) << 16 | b.charCodeAt(c + 2) << 8 | b.charCodeAt(c + 3), c += 4;
        else
            for (e = 0; 16 > e; e++) d[e] = b[c] << 24 | b[c + 1] << 16 | b[c + 2] << 8 | b[c + 3], c += 4;
        for (e = 16; 80 > e; e++) {
            var f = d[e - 3] ^ d[e - 8] ^ d[e - 14] ^ d[e - 16];
            d[e] = (f << 1 | f >>> 31) & 4294967295
        }
        b = a.R[0];
        c = a.R[1];
        for (var g = a.R[2], k = a.R[3], l = a.R[4], n, e = 0; 80 > e; e++) 40 > e ? 20 > e ? (f = k ^ c & (g ^ k), n = 1518500249) : (f = c ^ g ^ k, n = 1859775393) : 60 > e ? (f = c & g | k & (c | g), n = 2400959708) : (f = c ^ g ^ k, n = 3395469782), f = (b <<
            5 | b >>> 27) + f + l + n + d[e] & 4294967295, l = k, k = g, g = (c << 30 | c >>> 2) & 4294967295, c = b, b = f;
        a.R[0] = a.R[0] + b & 4294967295;
        a.R[1] = a.R[1] + c & 4294967295;
        a.R[2] = a.R[2] + g & 4294967295;
        a.R[3] = a.R[3] + k & 4294967295;
        a.R[4] = a.R[4] + l & 4294967295
    }
    Da.prototype.update = function(a, b) {
        m(b) || (b = a.length);
        for (var c = b - this.Sa, d = 0, e = this.be, f = this.Sb; d < b;) {
            if (0 == f)
                for (; d <= c;) Ea(this, a, d), d += this.Sa;
            if (p(a))
                for (; d < b;) {
                    if (e[f] = a.charCodeAt(d), ++f, ++d, f == this.Sa) {
                        Ea(this, e);
                        f = 0;
                        break
                    }
                } else
                    for (; d < b;)
                        if (e[f] = a[d], ++f, ++d, f == this.Sa) {
                            Ea(this, e);
                            f = 0;
                            break
                        }
        }
        this.Sb = f;
        this.Td += b
    };

    function Fa() {
        return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ la()).toString(36)
    };
    var w = Array.prototype,
        Ga = w.indexOf ? function(a, b, c) {
            return w.indexOf.call(a, b, c)
        } : function(a, b, c) {
            c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
            if (p(a)) return p(b) && 1 == b.length ? a.indexOf(b, c) : -1;
            for (; c < a.length; c++)
                if (c in a && a[c] === b) return c;
            return -1
        },
        Ha = w.forEach ? function(a, b, c) {
            w.forEach.call(a, b, c)
        } : function(a, b, c) {
            for (var d = a.length, e = p(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
        },
        Ia = w.filter ? function(a, b, c) {
            return w.filter.call(a, b, c)
        } : function(a, b, c) {
            for (var d = a.length, e = [], f = 0, g = p(a) ?
                    a.split("") : a, k = 0; k < d; k++)
                if (k in g) {
                    var l = g[k];
                    b.call(c, l, k, a) && (e[f++] = l)
                }
            return e
        },
        Ja = w.map ? function(a, b, c) {
            return w.map.call(a, b, c)
        } : function(a, b, c) {
            for (var d = a.length, e = Array(d), f = p(a) ? a.split("") : a, g = 0; g < d; g++) g in f && (e[g] = b.call(c, f[g], g, a));
            return e
        },
        Ka = w.reduce ? function(a, b, c, d) {
            d && (b = q(b, d));
            return w.reduce.call(a, b, c)
        } : function(a, b, c, d) {
            var e = c;
            Ha(a, function(c, g) {
                e = b.call(d, e, c, g, a)
            });
            return e
        },
        La = w.every ? function(a, b, c) {
            return w.every.call(a, b, c)
        } : function(a, b, c) {
            for (var d = a.length, e =
                    p(a) ? a.split("") : a, f = 0; f < d; f++)
                if (f in e && !b.call(c, e[f], f, a)) return !1;
            return !0
        };

    function Ma(a, b) {
        var c = Na(a, b, void 0);
        return 0 > c ? null : p(a) ? a.charAt(c) : a[c]
    }

    function Na(a, b, c) {
        for (var d = a.length, e = p(a) ? a.split("") : a, f = 0; f < d; f++)
            if (f in e && b.call(c, e[f], f, a)) return f;
        return -1
    }

    function Oa(a, b) {
        var c = Ga(a, b);
        0 <= c && w.splice.call(a, c, 1)
    }

    function Pa(a, b, c) {
        return 2 >= arguments.length ? w.slice.call(a, b) : w.slice.call(a, b, c)
    }

    function Qa(a, b) {
        a.sort(b || Ra)
    }

    function Ra(a, b) {
        return a > b ? 1 : a < b ? -1 : 0
    };
    var Sa;
    a: {
        var Ta = aa.navigator;
        if (Ta) {
            var Ua = Ta.userAgent;
            if (Ua) {
                Sa = Ua;
                break a
            }
        }
        Sa = ""
    }

    function Va(a) {
        return -1 != Sa.indexOf(a)
    };
    var Wa = Va("Opera") || Va("OPR"),
        Xa = Va("Trident") || Va("MSIE"),
        Ya = Va("Gecko") && -1 == Sa.toLowerCase().indexOf("webkit") && !(Va("Trident") || Va("MSIE")),
        Za = -1 != Sa.toLowerCase().indexOf("webkit");
    (function() {
        var a = "",
            b;
        if (Wa && aa.opera) return a = aa.opera.version, ha(a) ? a() : a;
        Ya ? b = /rv\:([^\);]+)(\)|;)/ : Xa ? b = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : Za && (b = /WebKit\/(\S+)/);
        b && (a = (a = b.exec(Sa)) ? a[1] : "");
        return Xa && (b = (b = aa.document) ? b.documentMode : void 0, b > parseFloat(a)) ? String(b) : a
    })();
    var $a = null,
        ab = null,
        bb = null;

    function cb(a, b) {
        if (!fa(a)) throw Error("encodeByteArray takes an array as a parameter");
        db();
        for (var c = b ? ab : $a, d = [], e = 0; e < a.length; e += 3) {
            var f = a[e],
                g = e + 1 < a.length,
                k = g ? a[e + 1] : 0,
                l = e + 2 < a.length,
                n = l ? a[e + 2] : 0,
                u = f >> 2,
                f = (f & 3) << 4 | k >> 4,
                k = (k & 15) << 2 | n >> 6,
                n = n & 63;
            l || (n = 64, g || (k = 64));
            d.push(c[u], c[f], c[k], c[n])
        }
        return d.join("")
    }

    function db() {
        if (!$a) {
            $a = {};
            ab = {};
            bb = {};
            for (var a = 0; 65 > a; a++) $a[a] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a), ab[a] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a), bb[ab[a]] = a
        }
    };
    var eb = function() {
        var a = 1;
        return function() {
            return a++
        }
    }();

    function y(a, b) {
        if (!a) throw fb(b);
    }

    function fb(a) {
        return Error("Firebase INTERNAL ASSERT FAILED:" + a)
    }

    function gb(a) {
        try {
            var b;
            if ("undefined" !== typeof atob) b = atob(a);
            else {
                db();
                for (var c = bb, d = [], e = 0; e < a.length;) {
                    var f = c[a.charAt(e++)],
                        g = e < a.length ? c[a.charAt(e)] : 0;
                    ++e;
                    var k = e < a.length ? c[a.charAt(e)] : 64;
                    ++e;
                    var l = e < a.length ? c[a.charAt(e)] : 64;
                    ++e;
                    if (null == f || null == g || null == k || null == l) throw Error();
                    d.push(f << 2 | g >> 4);
                    64 != k && (d.push(g << 4 & 240 | k >> 2), 64 != l && d.push(k << 6 & 192 | l))
                }
                if (8192 > d.length) b = String.fromCharCode.apply(null, d);
                else {
                    a = "";
                    for (c = 0; c < d.length; c += 8192) a += String.fromCharCode.apply(null, Pa(d, c,
                        c + 8192));
                    b = a
                }
            }
            return b
        } catch (n) {
            hb("base64Decode failed: ", n)
        }
        return null
    }

    function ib(a) {
        var b = jb(a);
        a = new Da;
        a.update(b);
        var b = [],
            c = 8 * a.Td;
        56 > a.Sb ? a.update(a.Ad, 56 - a.Sb) : a.update(a.Ad, a.Sa - (a.Sb - 56));
        for (var d = a.Sa - 1; 56 <= d; d--) a.be[d] = c & 255, c /= 256;
        Ea(a, a.be);
        for (d = c = 0; 5 > d; d++)
            for (var e = 24; 0 <= e; e -= 8) b[c] = a.R[d] >> e & 255, ++c;
        return cb(b)
    }

    function kb(a) {
        for (var b = "", c = 0; c < arguments.length; c++) b = fa(arguments[c]) ? b + kb.apply(null, arguments[c]) : "object" === typeof arguments[c] ? b + r(arguments[c]) : b + arguments[c], b += " ";
        return b
    }
    var lb = null,
        mb = !0;

    function hb(a) {
        !0 === mb && (mb = !1, null === lb && !0 === v.get("logging_enabled") && nb(!0));
        if (lb) {
            var b = kb.apply(null, arguments);
            lb(b)
        }
    }

    function ob(a) {
        return function() {
            hb(a, arguments)
        }
    }

    function pb(a) {
        if ("undefined" !== typeof console) {
            var b = "FIREBASE INTERNAL ERROR: " + kb.apply(null, arguments);
            "undefined" !== typeof console.error ? console.error(b) : console.log(b)
        }
    }

    function qb(a) {
        var b = kb.apply(null, arguments);
        throw Error("FIREBASE FATAL ERROR: " + b);
    }

    function z(a) {
        if ("undefined" !== typeof console) {
            var b = "FIREBASE WARNING: " + kb.apply(null, arguments);
            "undefined" !== typeof console.warn ? console.warn(b) : console.log(b)
        }
    }

    function rb(a) {
        var b = "",
            c = "",
            d = "",
            e = "",
            f = !0,
            g = "https",
            k = 443;
        if (p(a)) {
            var l = a.indexOf("//");
            0 <= l && (g = a.substring(0, l - 1), a = a.substring(l + 2));
            l = a.indexOf("/"); - 1 === l && (l = a.length);
            b = a.substring(0, l);
            e = "";
            a = a.substring(l).split("/");
            for (l = 0; l < a.length; l++)
                if (0 < a[l].length) {
                    var n = a[l];
                    try {
                        n = decodeURIComponent(n.replace(/\+/g, " "))
                    } catch (u) {}
                    e += "/" + n
                }
            a = b.split(".");
            3 === a.length ? (c = a[1], d = a[0].toLowerCase()) : 2 === a.length && (c = a[0]);
            l = b.indexOf(":");
            0 <= l && (f = "https" === g || "wss" === g, k = b.substring(l + 1), isFinite(k) &&
                (k = String(k)), k = p(k) ? /^\s*-?0x/i.test(k) ? parseInt(k, 16) : parseInt(k, 10) : NaN)
        }
        return {
            host: b,
            port: k,
            domain: c,
            Ag: d,
            Ab: f,
            scheme: g,
            Pc: e
        }
    }

    function sb(a) {
        return ga(a) && (a != a || a == Number.POSITIVE_INFINITY || a == Number.NEGATIVE_INFINITY)
    }

    function tb(a) {
        if ("complete" === document.readyState) a();
        else {
            var b = !1,
                c = function() {
                    document.body ? b || (b = !0, a()) : setTimeout(c, Math.floor(10))
                };
            document.addEventListener ? (document.addEventListener("DOMContentLoaded", c, !1), window.addEventListener("load", c, !1)) : document.attachEvent && (document.attachEvent("onreadystatechange", function() {
                "complete" === document.readyState && c()
            }), window.attachEvent("onload", c))
        }
    }

    function ub(a, b) {
        if (a === b) return 0;
        if ("[MIN_NAME]" === a || "[MAX_NAME]" === b) return -1;
        if ("[MIN_NAME]" === b || "[MAX_NAME]" === a) return 1;
        var c = vb(a),
            d = vb(b);
        return null !== c ? null !== d ? 0 == c - d ? a.length - b.length : c - d : -1 : null !== d ? 1 : a < b ? -1 : 1
    }

    function wb(a, b) {
        if (b && a in b) return b[a];
        throw Error("Missing required key (" + a + ") in object: " + r(b));
    }

    function xb(a) {
        if ("object" !== typeof a || null === a) return r(a);
        var b = [],
            c;
        for (c in a) b.push(c);
        b.sort();
        c = "{";
        for (var d = 0; d < b.length; d++) 0 !== d && (c += ","), c += r(b[d]), c += ":", c += xb(a[b[d]]);
        return c + "}"
    }

    function yb(a, b) {
        if (a.length <= b) return [a];
        for (var c = [], d = 0; d < a.length; d += b) d + b > a ? c.push(a.substring(d, a.length)) : c.push(a.substring(d, d + b));
        return c
    }

    function zb(a, b) {
        if (ea(a))
            for (var c = 0; c < a.length; ++c) b(c, a[c]);
        else A(a, b)
    }

    function Ab(a) {
        y(!sb(a), "Invalid JSON number");
        var b, c, d, e;
        0 === a ? (d = c = 0, b = -Infinity === 1 / a ? 1 : 0) : (b = 0 > a, a = Math.abs(a), a >= Math.pow(2, -1022) ? (d = Math.min(Math.floor(Math.log(a) / Math.LN2), 1023), c = d + 1023, d = Math.round(a * Math.pow(2, 52 - d) - Math.pow(2, 52))) : (c = 0, d = Math.round(a / Math.pow(2, -1074))));
        e = [];
        for (a = 52; a; a -= 1) e.push(d % 2 ? 1 : 0), d = Math.floor(d / 2);
        for (a = 11; a; a -= 1) e.push(c % 2 ? 1 : 0), c = Math.floor(c / 2);
        e.push(b ? 1 : 0);
        e.reverse();
        b = e.join("");
        c = "";
        for (a = 0; 64 > a; a += 8) d = parseInt(b.substr(a, 8), 2).toString(16), 1 === d.length &&
            (d = "0" + d), c += d;
        return c.toLowerCase()
    }
    var Bb = /^-?\d{1,10}$/;

    function vb(a) {
        return Bb.test(a) && (a = Number(a), -2147483648 <= a && 2147483647 >= a) ? a : null
    }

    function Cb(a) {
        try {
            a()
        } catch (b) {
            setTimeout(function() {
                z("Exception was thrown by user callback.", b.stack || "");
                throw b;
            }, Math.floor(0))
        }
    }

    function B(a, b) {
        if (ha(a)) {
            var c = Array.prototype.slice.call(arguments, 1).slice();
            Cb(function() {
                a.apply(null, c)
            })
        }
    };

    function Db(a, b, c, d) {
        this.le = b;
        this.Nd = c;
        this.Fd = d;
        this.jd = a
    }
    Db.prototype.Qb = function() {
        var a = this.Nd.cc();
        return "value" === this.jd ? a.path : a.parent().path
    };
    Db.prototype.pe = function() {
        return this.jd
    };
    Db.prototype.Lb = function() {
        return this.le.Lb(this)
    };
    Db.prototype.toString = function() {
        return this.Qb().toString() + ":" + this.jd + ":" + r(this.Nd.bf())
    };

    function Eb(a, b, c) {
        this.le = a;
        this.error = b;
        this.path = c
    }
    Eb.prototype.Qb = function() {
        return this.path
    };
    Eb.prototype.pe = function() {
        return "cancel"
    };
    Eb.prototype.Lb = function() {
        return this.le.Lb(this)
    };
    Eb.prototype.toString = function() {
        return this.path.toString() + ":cancel"
    };

    function C(a, b, c, d) {
        this.type = a;
        this.Ha = b;
        this.Ua = c;
        this.De = d;
        this.Fd = void 0
    }

    function Fb(a) {
        return new C(Gb, a)
    }
    var Gb = "value";

    function Hb(a, b, c) {
        this.Hb = a;
        this.kb = b;
        this.mb = c || null
    }
    h = Hb.prototype;
    h.wf = function(a) {
        return "value" === a
    };
    h.createEvent = function(a, b) {
        var c = b.n.g;
        return new Db("value", this, new D(a.Ha, b.cc(), c))
    };
    h.Lb = function(a) {
        var b = this.mb;
        if ("cancel" === a.pe()) {
            y(this.kb, "Raising a cancel event on a listener with no cancel callback");
            var c = this.kb;
            return function() {
                c.call(b, a.error)
            }
        }
        var d = this.Hb;
        return function() {
            d.call(b, a.Nd)
        }
    };
    h.Ye = function(a, b) {
        return this.kb ? new Eb(this, a, b) : null
    };
    h.matches = function(a) {
        return a instanceof Hb ? a.Hb && this.Hb ? a.Hb === this.Hb && a.mb === this.mb : !0 : !1
    };
    h.hf = function() {
        return null !== this.Hb
    };

    function Ib(a, b, c) {
        this.da = a;
        this.kb = b;
        this.mb = c
    }
    h = Ib.prototype;
    h.wf = function(a) {
        a = "children_added" === a ? "child_added" : a;
        return ("children_removed" === a ? "child_removed" : a) in this.da
    };
    h.Ye = function(a, b) {
        return this.kb ? new Eb(this, a, b) : null
    };
    h.createEvent = function(a, b) {
        y(null != a.Ua, "Child events should have a childName.");
        var c = b.cc().o(a.Ua);
        return new Db(a.type, this, new D(a.Ha, c, b.n.g), a.Fd)
    };
    h.Lb = function(a) {
        var b = this.mb;
        if ("cancel" === a.pe()) {
            y(this.kb, "Raising a cancel event on a listener with no cancel callback");
            var c = this.kb;
            return function() {
                c.call(b, a.error)
            }
        }
        var d = this.da[a.jd];
        return function() {
            d.call(b, a.Nd, a.Fd)
        }
    };
    h.matches = function(a) {
        if (a instanceof Ib) {
            if (!this.da || !a.da) return !0;
            if (this.mb === a.mb) {
                var b = Jb(a.da);
                if (b === Jb(this.da)) {
                    if (1 === b) {
                        var b = Kb(a.da),
                            c = Kb(this.da);
                        return c === b && (!a.da[b] || !this.da[c] || a.da[b] === this.da[c])
                    }
                    return Lb(this.da, function(b, c) {
                        return a.da[c] === b
                    })
                }
            }
        }
        return !1
    };
    h.hf = function() {
        return null !== this.da
    };

    function jb(a) {
        for (var b = [], c = 0, d = 0; d < a.length; d++) {
            var e = a.charCodeAt(d);
            55296 <= e && 56319 >= e && (e -= 55296, d++, y(d < a.length, "Surrogate pair missing trail surrogate."), e = 65536 + (e << 10) + (a.charCodeAt(d) - 56320));
            128 > e ? b[c++] = e : (2048 > e ? b[c++] = e >> 6 | 192 : (65536 > e ? b[c++] = e >> 12 | 224 : (b[c++] = e >> 18 | 240, b[c++] = e >> 12 & 63 | 128), b[c++] = e >> 6 & 63 | 128), b[c++] = e & 63 | 128)
        }
        return b
    };

    function F(a, b, c, d) {
        var e;
        d < b ? e = "at least " + b : d > c && (e = 0 === c ? "none" : "no more than " + c);
        if (e) throw Error(a + " failed: Was called with " + d + (1 === d ? " argument." : " arguments.") + " Expects " + e + ".");
    }

    function G(a, b, c) {
        var d = "";
        switch (b) {
            case 1:
                d = c ? "first" : "First";
                break;
            case 2:
                d = c ? "second" : "Second";
                break;
            case 3:
                d = c ? "third" : "Third";
                break;
            case 4:
                d = c ? "fourth" : "Fourth";
                break;
            default:
                throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");
        }
        return a = a + " failed: " + (d + " argument ")
    }

    function H(a, b, c, d) {
        if ((!d || m(c)) && !ha(c)) throw Error(G(a, b, d) + "must be a valid function.");
    }

    function Mb(a, b, c) {
        if (m(c) && (!ia(c) || null === c)) throw Error(G(a, b, !0) + "must be a valid context object.");
    };
    var Nb = /[\[\].#$\/\u0000-\u001F\u007F]/,
        Ob = /[\[\].#$\u0000-\u001F\u007F]/;

    function Pb(a) {
        return p(a) && 0 !== a.length && !Nb.test(a)
    }

    function Qb(a) {
        return null === a || p(a) || ga(a) && !sb(a) || ia(a) && s(a, ".sv")
    }

    function Rb(a, b, c) {
        c && !m(b) || Sb(G(a, 1, c), b)
    }

    function Sb(a, b, c, d) {
        c || (c = 0);
        var e = d || [];
        if (!m(b)) throw Error(a + "contains undefined" + Tb(e));
        if (ha(b)) throw Error(a + "contains a function" + Tb(e) + " with contents: " + b.toString());
        if (sb(b)) throw Error(a + "contains " + b.toString() + Tb(e));
        if (1E3 < c) throw new TypeError(a + "contains a cyclic object value (" + e.slice(0, 100).join(".") + "...)");
        if (p(b) && b.length > 10485760 / 3 && 10485760 < jb(b).length) throw Error(a + "contains a string greater than 10485760 utf8 bytes" + Tb(e) + " ('" + b.substring(0, 50) + "...')");
        if (ia(b)) {
            var f = !1,
                g = !1;
            ua(b, function(b, d) {
                if (".value" === b) f = !0;
                else if (".priority" !== b && ".sv" !== b && (g = !0, !Pb(b))) throw Error(a + " contains an invalid key (" + b + ")" + Tb(e) + '.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');
                e.push(b);
                Sb(a, d, c + 1, e);
                e.pop()
            });
            if (f && g) throw Error(a + ' contains ".value" child' + Tb(e) + " in addition to actual children.");
        }
    }

    function Tb(a) {
        return 0 == a.length ? "" : " in property '" + a.join(".") + "'"
    }

    function Ub(a, b) {
        if (!ia(b) || ea(b)) throw Error(G(a, 1, !1) + " must be an Object containing the children to replace.");
        if (s(b, ".value")) throw Error(G(a, 1, !1) + ' must not contain ".value".  To overwrite with a leaf value, just use .set() instead.');
        Rb(a, b, !1)
    }

    function Vb(a, b, c) {
        if (sb(c)) throw Error(G(a, b, !1) + "is " + c.toString() + ", but must be a valid Firebase priority (a string, finite number, server value, or null).");
        if (!Qb(c)) throw Error(G(a, b, !1) + "must be a valid Firebase priority (a string, finite number, server value, or null).");
    }

    function Wb(a, b, c) {
        if (!c || m(b)) switch (b) {
            case "value":
            case "child_added":
            case "child_removed":
            case "child_changed":
            case "child_moved":
                break;
            default:
                throw Error(G(a, 1, c) + 'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');
        }
    }

    function Xb(a, b, c, d) {
        if ((!d || m(c)) && !Pb(c)) throw Error(G(a, b, d) + 'was an invalid key: "' + c + '".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');
    }

    function Yb(a, b) {
        if (!p(b) || 0 === b.length || Ob.test(b)) throw Error(G(a, 1, !1) + 'was an invalid path: "' + b + '". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');
    }

    function Zb(a, b) {
        if (".info" === I(b)) throw Error(a + " failed: Can't modify data under /.info/");
    }

    function $b(a, b) {
        if (!p(b)) throw Error(G(a, 1, !1) + "must be a valid credential (a string).");
    }

    function ac(a, b, c) {
        if (!p(c)) throw Error(G(a, b, !1) + "must be a valid string.");
    }

    function J(a, b, c, d) {
        if (!d || m(c))
            if (!ia(c) || null === c) throw Error(G(a, b, d) + "must be a valid object.");
    }

    function K(a, b, c) {
        if (!ia(b) || null === b || !s(b, c)) throw Error(G(a, 1, !1) + 'must contain the key "' + c + '"');
        if (!p(t(b, c))) throw Error(G(a, 1, !1) + 'must contain the key "' + c + '" with type "string"');
    };

    function bc(a) {
        this.g = a
    }
    h = bc.prototype;
    h.C = function(a, b, c, d, e) {
        y(a.Bc(this.g), "A node must be indexed if only a child is updated");
        d = a.K(b);
        if (d.ea(c)) return a;
        null != e && (c.e() ? a.Da(b) ? cc(e, new C("child_removed", d, b)) : y(a.M(), "A child remove without an old child only makes sense on a leaf node") : d.e() ? cc(e, new C("child_added", c, b)) : cc(e, new C("child_changed", c, b, d)));
        return a.M() && c.e() ? a : a.P(b, c)
    };
    h.oa = function(a, b, c) {
        null != c && (a.M() || a.U(L, function(a, e) {
            b.Da(a) || cc(c, new C("child_removed", e, a))
        }), b.M() || b.U(L, function(b, e) {
            if (a.Da(b)) {
                var f = a.K(b);
                f.ea(e) || cc(c, new C("child_changed", e, b, f))
            } else cc(c, new C("child_added", e, b))
        }));
        return b.Fb(this.g)
    };
    h.Z = function(a, b) {
        return a.e() ? M : a.Z(b)
    };
    h.ya = function() {
        return !1
    };
    h.Mb = function() {
        return this
    };

    function dc(a) {
        this.re = new bc(a.g);
        this.g = a.g;
        var b;
        a.ia ? (b = ec(a), b = a.g.Ae(fc(a), b)) : b = a.g.Ce();
        this.Vc = b;
        a.qa ? (b = gc(a), a = a.g.Ae(hc(a), b)) : a = a.g.Be();
        this.wc = a
    }
    h = dc.prototype;
    h.matches = function(a) {
        return 0 >= this.g.compare(this.Vc, a) && 0 >= this.g.compare(a, this.wc)
    };
    h.C = function(a, b, c, d, e) {
        this.matches(new N(b, c)) || (c = M);
        return this.re.C(a, b, c, d, e)
    };
    h.oa = function(a, b, c) {
        b.M() && (b = M);
        var d = b.Fb(this.g),
            d = d.Z(M),
            e = this;
        b.U(L, function(a, b) {
            e.matches(new N(a, b)) || (d = d.P(a, M))
        });
        return this.re.oa(a, d, c)
    };
    h.Z = function(a) {
        return a
    };
    h.ya = function() {
        return !0
    };
    h.Mb = function() {
        return this.re
    };

    function ic(a, b) {
        return ub(a.name, b.name)
    }

    function jc(a, b) {
        return ub(a, b)
    };

    function kc() {}
    var lc = {};

    function mc(a) {
        return q(a.compare, a)
    }
    kc.prototype.jf = function(a, b) {
        return 0 !== this.compare(new N("[MIN_NAME]", a), new N("[MIN_NAME]", b))
    };
    kc.prototype.Ce = function() {
        return nc
    };

    function oc(a) {
        this.Ub = a
    }
    ma(oc, kc);
    h = oc.prototype;
    h.ue = function(a) {
        return !a.K(this.Ub).e()
    };
    h.compare = function(a, b) {
        var c = a.Y.K(this.Ub),
            d = b.Y.K(this.Ub),
            c = c.he(d);
        return 0 === c ? ub(a.name, b.name) : c
    };
    h.Ae = function(a, b) {
        var c = O(a),
            c = M.P(this.Ub, c);
        return new N(b, c)
    };
    h.Be = function() {
        var a = M.P(this.Ub, pc);
        return new N("[MAX_NAME]", a)
    };
    h.toString = function() {
        return this.Ub
    };
    var L = new oc(".priority");

    function qc() {}
    ma(qc, kc);
    h = qc.prototype;
    h.compare = function(a, b) {
        return ub(a.name, b.name)
    };
    h.ue = function() {
        throw fb("KeyIndex.isDefinedOn not expected to be called.");
    };
    h.jf = function() {
        return !1
    };
    h.Ce = function() {
        return nc
    };
    h.Be = function() {
        return new N("[MAX_NAME]", M)
    };
    h.Ae = function(a) {
        y(p(a), "KeyIndex indexValue must always be a string.");
        return new N(a, M)
    };
    h.toString = function() {
        return ".key"
    };
    var rc = new qc;

    function sc() {}
    sc.prototype.ef = function() {
        return null
    };
    sc.prototype.oe = function() {
        return null
    };
    var tc = new sc;

    function uc(a, b, c) {
        this.Bf = a;
        this.Ia = b;
        this.zd = c
    }
    uc.prototype.ef = function(a) {
        var b = this.Ia.F;
        if (vc(b, a)) return b.j().K(a);
        b = null != this.zd ? new wc(this.zd, !0, !1) : this.Ia.u();
        return this.Bf.Ta(a, b)
    };
    uc.prototype.oe = function(a, b, c) {
        var d = null != this.zd ? this.zd : xc(this.Ia);
        a = this.Bf.ce(d, b, 1, c, a);
        return 0 === a.length ? null : a[0]
    };

    function yc() {
        this.Za = {}
    }

    function cc(a, b) {
        var c = b.type,
            d = b.Ua;
        y("child_added" == c || "child_changed" == c || "child_removed" == c, "Only child changes supported for tracking");
        y(".priority" !== d, "Only non-priority child changes can be tracked.");
        var e = t(a.Za, d);
        if (e) {
            var f = e.type;
            if ("child_added" == c && "child_removed" == f) a.Za[d] = new C("child_changed", b.Ha, d, e.Ha);
            else if ("child_removed" == c && "child_added" == f) delete a.Za[d];
            else if ("child_removed" == c && "child_changed" == f) a.Za[d] = new C("child_removed", e.De, d);
            else if ("child_changed" == c &&
                "child_added" == f) a.Za[d] = new C("child_added", b.Ha, d);
            else if ("child_changed" == c && "child_changed" == f) a.Za[d] = new C("child_changed", b.Ha, d, e.De);
            else throw fb("Illegal combination of changes: " + b + " occurred after " + e);
        } else a.Za[d] = b
    };

    function N(a, b) {
        this.name = a;
        this.Y = b
    }

    function zc(a, b) {
        return new N(a, b)
    };

    function Ac(a) {
        this.ma = new dc(a);
        this.g = a.g;
        y(a.ka, "Only valid if limit has been set");
        this.sa = a.sa;
        this.zb = !("" === a.Eb ? a.ia : "l" === a.Eb)
    }
    h = Ac.prototype;
    h.C = function(a, b, c, d, e) {
        this.ma.matches(new N(b, c)) || (c = M);
        return a.K(b).ea(c) ? a : a.ub() < this.sa ? this.ma.Mb().C(a, b, c, d, e) : Bc(this, a, b, c, d, e)
    };
    h.oa = function(a, b, c) {
        var d;
        if (b.M() || b.e()) d = M.Fb(this.g);
        else if (2 * this.sa < b.ub() && b.Bc(this.g)) {
            d = M.Fb(this.g);
            b = this.zb ? b.Rb(this.ma.wc, this.g) : b.Pb(this.ma.Vc, this.g);
            for (var e = 0; 0 < b.Na.length && e < this.sa;) {
                var f = P(b),
                    g;
                if (g = this.zb ? 0 >= this.g.compare(this.ma.Vc, f) : 0 >= this.g.compare(f, this.ma.wc)) d = d.P(f.name, f.Y), e++;
                else break
            }
        } else {
            d = b.Fb(this.g);
            d = d.Z(M);
            var k, l, n;
            if (this.zb) {
                b = d.gf(this.g);
                k = this.ma.wc;
                l = this.ma.Vc;
                var u = mc(this.g);
                n = function(a, b) {
                    return u(b, a)
                }
            } else b = d.Ob(this.g), k = this.ma.Vc,
                l = this.ma.wc, n = mc(this.g);
            for (var e = 0, x = !1; 0 < b.Na.length;) f = P(b), !x && 0 >= n(k, f) && (x = !0), (g = x && e < this.sa && 0 >= n(f, l)) ? e++ : d = d.P(f.name, M)
        }
        return this.ma.Mb().oa(a, d, c)
    };
    h.Z = function(a) {
        return a
    };
    h.ya = function() {
        return !0
    };
    h.Mb = function() {
        return this.ma.Mb()
    };

    function Bc(a, b, c, d, e, f) {
        var g;
        if (a.zb) {
            var k = mc(a.g);
            g = function(a, b) {
                return k(b, a)
            }
        } else g = mc(a.g);
        y(b.ub() == a.sa, "");
        var l = new N(c, d),
            n = a.zb ? Cc(b, a.g) : Dc(b, a.g),
            u = a.ma.matches(l);
        if (b.Da(c)) {
            var x = b.K(c),
                n = e.oe(a.g, n, a.zb);
            null != n && n.name == c && (n = e.oe(a.g, n, a.zb));
            e = null == n ? 1 : g(n, l);
            if (u && !d.e() && 0 <= e) return null != f && cc(f, new C("child_changed", d, c, x)), b.P(c, d);
            null != f && cc(f, new C("child_removed", x, c));
            b = b.P(c, M);
            return null != n && a.ma.matches(n) ? (null != f && cc(f, new C("child_added", n.Y, n.name)), b.P(n.name,
                n.Y)) : b
        }
        return d.e() ? b : u && 0 <= g(n, l) ? (null != f && (cc(f, new C("child_removed", n.Y, n.name)), cc(f, new C("child_added", d, c))), b.P(c, d).P(n.name, M)) : b
    };

    function Ec() {
        this.vc = this.qa = this.kc = this.ia = this.ka = !1;
        this.sa = 0;
        this.Eb = "";
        this.Ac = null;
        this.Wb = "";
        this.zc = null;
        this.Tb = "";
        this.g = L
    }
    var Fc = new Ec;

    function fc(a) {
        y(a.ia, "Only valid if start has been set");
        return a.Ac
    }

    function ec(a) {
        y(a.ia, "Only valid if start has been set");
        return a.kc ? a.Wb : "[MIN_NAME]"
    }

    function hc(a) {
        y(a.qa, "Only valid if end has been set");
        return a.zc
    }

    function gc(a) {
        y(a.qa, "Only valid if end has been set");
        return a.vc ? a.Tb : "[MAX_NAME]"
    }

    function Gc(a) {
        var b = new Ec;
        b.ka = a.ka;
        b.sa = a.sa;
        b.ia = a.ia;
        b.Ac = a.Ac;
        b.kc = a.kc;
        b.Wb = a.Wb;
        b.qa = a.qa;
        b.zc = a.zc;
        b.vc = a.vc;
        b.Tb = a.Tb;
        b.g = a.g;
        return b
    }
    h = Ec.prototype;
    h.xe = function(a) {
        var b = Gc(this);
        b.ka = !0;
        b.sa = a;
        b.Eb = "";
        return b
    };
    h.ye = function(a) {
        var b = Gc(this);
        b.ka = !0;
        b.sa = a;
        b.Eb = "l";
        return b
    };
    h.ze = function(a) {
        var b = Gc(this);
        b.ka = !0;
        b.sa = a;
        b.Eb = "r";
        return b
    };
    h.Od = function(a, b) {
        var c = Gc(this);
        c.ia = !0;
        m(a) || (a = null);
        c.Ac = a;
        null != b ? (c.kc = !0, c.Wb = b) : (c.kc = !1, c.Wb = "");
        return c
    };
    h.hd = function(a, b) {
        var c = Gc(this);
        c.qa = !0;
        m(a) || (a = null);
        c.zc = a;
        m(b) ? (c.vc = !0, c.Tb = b) : (c.Ig = !1, c.Tb = "");
        return c
    };

    function Hc(a, b) {
        var c = Gc(a);
        c.g = b;
        return c
    }

    function Ic(a) {
        var b = {};
        a.ia && (b.sp = a.Ac, a.kc && (b.sn = a.Wb));
        a.qa && (b.ep = a.zc, a.vc && (b.en = a.Tb));
        if (a.ka) {
            b.l = a.sa;
            var c = a.Eb;
            "" === c && (c = a.ia ? "l" : "r");
            b.vf = c
        }
        a.g !== L && (b.i = a.g.toString());
        return b
    }

    function Jc(a) {
        return !(a.ia || a.qa || a.ka)
    }
    h.toString = function() {
        return r(Ic(this))
    };

    function Q(a, b, c, d) {
        this.k = a;
        this.path = b;
        this.n = c;
        this.ac = d
    }

    function Kc(a) {
        var b = null,
            c = null;
        a.ia && (b = fc(a));
        a.qa && (c = hc(a));
        if (a.g === rc) {
            if (a.ia) {
                if ("[MIN_NAME]" != ec(a)) throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");
                if (null != b && "string" !== typeof b) throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");
            }
            if (a.qa) {
                if ("[MAX_NAME]" != gc(a)) throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");
                if (null !=
                    c && "string" !== typeof c) throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");
            }
        } else if (a.g === L) {
            if (null != b && !Qb(b) || null != c && !Qb(c)) throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");
        } else if (y(a.g instanceof oc, "unknown index type."), null != b && "object" === typeof b || null != c && "object" === typeof c) throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
    }

    function Lc(a) {
        if (a.ia && a.qa && a.ka && (!a.ka || "" === a.Eb)) throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");
    }

    function Mc(a, b) {
        if (!0 === a.ac) throw Error(b + ": You can't combine multiple orderBy calls.");
    }
    Q.prototype.cc = function() {
        F("Query.ref", 0, 0, arguments.length);
        return new R(this.k, this.path)
    };
    Q.prototype.ref = Q.prototype.cc;
    Q.prototype.vb = function(a, b, c, d) {
        F("Query.on", 2, 4, arguments.length);
        Wb("Query.on", a, !1);
        H("Query.on", 2, b, !1);
        var e = Nc("Query.on", c, d);
        if ("value" === a) Oc(this.k, this, new Hb(b, e.cancel || null, e.Ka || null));
        else {
            var f = {};
            f[a] = b;
            Oc(this.k, this, new Ib(f, e.cancel, e.Ka))
        }
        return b
    };
    Q.prototype.on = Q.prototype.vb;
    Q.prototype.Zb = function(a, b, c) {
        F("Query.off", 0, 3, arguments.length);
        Wb("Query.off", a, !0);
        H("Query.off", 2, b, !0);
        Mb("Query.off", 3, c);
        var d = null,
            e = null;
        "value" === a ? d = new Hb(b || null, null, c || null) : a && (b && (e = {}, e[a] = b), d = new Ib(e, null, c || null));
        e = this.k;
        d = ".info" === I(this.path) ? e.qd.gb(this, d) : e.N.gb(this, d);
        Pc(e.$, this.path, d)
    };
    Q.prototype.off = Q.prototype.Zb;
    Q.prototype.lg = function(a, b) {
        function c(g) {
            f && (f = !1, e.Zb(a, c), b.call(d.Ka, g))
        }
        F("Query.once", 2, 4, arguments.length);
        Wb("Query.once", a, !1);
        H("Query.once", 2, b, !1);
        var d = Nc("Query.once", arguments[2], arguments[3]),
            e = this,
            f = !0;
        this.vb(a, c, function(b) {
            e.Zb(a, c);
            d.cancel && d.cancel.call(d.Ka, b)
        })
    };
    Q.prototype.once = Q.prototype.lg;
    Q.prototype.xe = function(a) {
        z("Query.limit() being deprecated. Please use Query.limitToFirst() or Query.limitToLast() instead.");
        F("Query.limit", 1, 1, arguments.length);
        if (!ga(a) || Math.floor(a) !== a || 0 >= a) throw Error("Query.limit: First argument must be a positive integer.");
        if (this.n.ka) throw Error("Query.limit: Limit was already set (by another call to limit, limitToFirst, orlimitToLast.");
        var b = this.n.xe(a);
        Lc(b);
        return new Q(this.k, this.path, b, this.ac)
    };
    Q.prototype.limit = Q.prototype.xe;
    Q.prototype.ye = function(a) {
        F("Query.limitToFirst", 1, 1, arguments.length);
        if (!ga(a) || Math.floor(a) !== a || 0 >= a) throw Error("Query.limitToFirst: First argument must be a positive integer.");
        if (this.n.ka) throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");
        return new Q(this.k, this.path, this.n.ye(a), this.ac)
    };
    Q.prototype.limitToFirst = Q.prototype.ye;
    Q.prototype.ze = function(a) {
        F("Query.limitToLast", 1, 1, arguments.length);
        if (!ga(a) || Math.floor(a) !== a || 0 >= a) throw Error("Query.limitToLast: First argument must be a positive integer.");
        if (this.n.ka) throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");
        return new Q(this.k, this.path, this.n.ze(a), this.ac)
    };
    Q.prototype.limitToLast = Q.prototype.ze;
    Q.prototype.mg = function(a) {
        F("Query.orderByChild", 1, 1, arguments.length);
        if ("$key" === a) throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');
        if ("$priority" === a) throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');
        Xb("Query.orderByChild", 1, a, !1);
        Mc(this, "Query.orderByChild");
        var b = Hc(this.n, new oc(a));
        Kc(b);
        return new Q(this.k, this.path, b, !0)
    };
    Q.prototype.orderByChild = Q.prototype.mg;
    Q.prototype.ng = function() {
        F("Query.orderByKey", 0, 0, arguments.length);
        Mc(this, "Query.orderByKey");
        var a = Hc(this.n, rc);
        Kc(a);
        return new Q(this.k, this.path, a, !0)
    };
    Q.prototype.orderByKey = Q.prototype.ng;
    Q.prototype.og = function() {
        F("Query.orderByPriority", 0, 0, arguments.length);
        Mc(this, "Query.orderByPriority");
        var a = Hc(this.n, L);
        Kc(a);
        return new Q(this.k, this.path, a, !0)
    };
    Q.prototype.orderByPriority = Q.prototype.og;
    Q.prototype.Od = function(a, b) {
        F("Query.startAt", 0, 2, arguments.length);
        Rb("Query.startAt", a, !0);
        Xb("Query.startAt", 2, b, !0);
        var c = this.n.Od(a, b);
        Lc(c);
        Kc(c);
        if (this.n.ia) throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");
        m(a) || (b = a = null);
        return new Q(this.k, this.path, c, this.ac)
    };
    Q.prototype.startAt = Q.prototype.Od;
    Q.prototype.hd = function(a, b) {
        F("Query.endAt", 0, 2, arguments.length);
        Rb("Query.endAt", a, !0);
        Xb("Query.endAt", 2, b, !0);
        var c = this.n.hd(a, b);
        Lc(c);
        Kc(c);
        if (this.n.qa) throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");
        return new Q(this.k, this.path, c, this.ac)
    };
    Q.prototype.endAt = Q.prototype.hd;
    Q.prototype.Tf = function(a, b) {
        F("Query.equalTo", 1, 2, arguments.length);
        Rb("Query.equalTo", a, !1);
        Xb("Query.equalTo", 2, b, !0);
        if (this.n.ia) throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");
        if (this.n.qa) throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");
        return this.Od(a, b).hd(a, b)
    };
    Q.prototype.equalTo = Q.prototype.Tf;
    Q.prototype.Fa = function() {
        var a = xb(Ic(this.n));
        return "{}" === a ? "default" : a
    };

    function Nc(a, b, c) {
        var d = {
            cancel: null,
            Ka: null
        };
        if (b && c) d.cancel = b, H(a, 3, d.cancel, !0), d.Ka = c, Mb(a, 4, d.Ka);
        else if (b)
            if ("object" === typeof b && null !== b) d.Ka = b;
            else if ("function" === typeof b) d.cancel = b;
        else throw Error(G(a, 3, !0) + " must either be a cancel callback or a context object.");
        return d
    };

    function S(a, b) {
        if (1 == arguments.length) {
            this.w = a.split("/");
            for (var c = 0, d = 0; d < this.w.length; d++) 0 < this.w[d].length && (this.w[c] = this.w[d], c++);
            this.w.length = c;
            this.ca = 0
        } else this.w = a, this.ca = b
    }

    function I(a) {
        return a.ca >= a.w.length ? null : a.w[a.ca]
    }

    function Qc(a) {
        return a.w.length - a.ca
    }

    function T(a) {
        var b = a.ca;
        b < a.w.length && b++;
        return new S(a.w, b)
    }

    function Rc(a) {
        return a.ca < a.w.length ? a.w[a.w.length - 1] : null
    }
    S.prototype.toString = function() {
        for (var a = "", b = this.ca; b < this.w.length; b++) "" !== this.w[b] && (a += "/" + this.w[b]);
        return a || "/"
    };
    S.prototype.parent = function() {
        if (this.ca >= this.w.length) return null;
        for (var a = [], b = this.ca; b < this.w.length - 1; b++) a.push(this.w[b]);
        return new S(a, 0)
    };
    S.prototype.o = function(a) {
        for (var b = [], c = this.ca; c < this.w.length; c++) b.push(this.w[c]);
        if (a instanceof S)
            for (c = a.ca; c < a.w.length; c++) b.push(a.w[c]);
        else
            for (a = a.split("/"), c = 0; c < a.length; c++) 0 < a[c].length && b.push(a[c]);
        return new S(b, 0)
    };
    S.prototype.e = function() {
        return this.ca >= this.w.length
    };
    var U = new S("");

    function V(a, b) {
        var c = I(a);
        if (null === c) return b;
        if (c === I(b)) return V(T(a), T(b));
        throw Error("INTERNAL ERROR: innerPath (" + b + ") is not within outerPath (" + a + ")");
    }
    S.prototype.ea = function(a) {
        if (Qc(this) !== Qc(a)) return !1;
        for (var b = this.ca, c = a.ca; b <= this.w.length; b++, c++)
            if (this.w[b] !== a.w[c]) return !1;
        return !0
    };
    S.prototype.contains = function(a) {
        var b = this.ca,
            c = a.ca;
        if (Qc(this) > Qc(a)) return !1;
        for (; b < this.w.length;) {
            if (this.w[b] !== a.w[c]) return !1;
            ++b;
            ++c
        }
        return !0
    };

    function Sc() {
        this.children = {};
        this.bd = 0;
        this.value = null
    }

    function Tc(a, b, c) {
        this.ud = a ? a : "";
        this.Oc = b ? b : null;
        this.A = c ? c : new Sc
    }

    function Uc(a, b) {
        for (var c = b instanceof S ? b : new S(b), d = a, e; null !== (e = I(c));) d = new Tc(e, d, t(d.A.children, e) || new Sc), c = T(c);
        return d
    }
    h = Tc.prototype;
    h.za = function() {
        return this.A.value
    };

    function Vc(a, b) {
        y("undefined" !== typeof b, "Cannot set value to undefined");
        a.A.value = b;
        Wc(a)
    }
    h.clear = function() {
        this.A.value = null;
        this.A.children = {};
        this.A.bd = 0;
        Wc(this)
    };
    h.ld = function() {
        return 0 < this.A.bd
    };
    h.e = function() {
        return null === this.za() && !this.ld()
    };
    h.U = function(a) {
        var b = this;
        A(this.A.children, function(c, d) {
            a(new Tc(d, b, c))
        })
    };

    function Xc(a, b, c, d) {
        c && !d && b(a);
        a.U(function(a) {
            Xc(a, b, !0, d)
        });
        c && d && b(a)
    }

    function Yc(a, b) {
        for (var c = a.parent(); null !== c && !b(c);) c = c.parent()
    }
    h.path = function() {
        return new S(null === this.Oc ? this.ud : this.Oc.path() + "/" + this.ud)
    };
    h.name = function() {
        return this.ud
    };
    h.parent = function() {
        return this.Oc
    };

    function Wc(a) {
        if (null !== a.Oc) {
            var b = a.Oc,
                c = a.ud,
                d = a.e(),
                e = s(b.A.children, c);
            d && e ? (delete b.A.children[c], b.A.bd--, Wc(b)) : d || e || (b.A.children[c] = a.A, b.A.bd++, Wc(b))
        }
    };

    function Zc(a, b) {
        this.Ja = a;
        this.ua = b ? b : $c
    }
    h = Zc.prototype;
    h.La = function(a, b) {
        return new Zc(this.Ja, this.ua.La(a, b, this.Ja).X(null, null, !1, null, null))
    };
    h.remove = function(a) {
        return new Zc(this.Ja, this.ua.remove(a, this.Ja).X(null, null, !1, null, null))
    };
    h.get = function(a) {
        for (var b, c = this.ua; !c.e();) {
            b = this.Ja(a, c.key);
            if (0 === b) return c.value;
            0 > b ? c = c.left : 0 < b && (c = c.right)
        }
        return null
    };

    function ad(a, b) {
        for (var c, d = a.ua, e = null; !d.e();) {
            c = a.Ja(b, d.key);
            if (0 === c) {
                if (d.left.e()) return e ? e.key : null;
                for (d = d.left; !d.right.e();) d = d.right;
                return d.key
            }
            0 > c ? d = d.left : 0 < c && (e = d, d = d.right)
        }
        throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");
    }
    h.e = function() {
        return this.ua.e()
    };
    h.count = function() {
        return this.ua.count()
    };
    h.Ic = function() {
        return this.ua.Ic()
    };
    h.Xb = function() {
        return this.ua.Xb()
    };
    h.fa = function(a) {
        return this.ua.fa(a)
    };
    h.Ob = function(a) {
        return new bd(this.ua, null, this.Ja, !1, a)
    };
    h.Pb = function(a, b) {
        return new bd(this.ua, a, this.Ja, !1, b)
    };
    h.Rb = function(a, b) {
        return new bd(this.ua, a, this.Ja, !0, b)
    };
    h.gf = function(a) {
        return new bd(this.ua, null, this.Ja, !0, a)
    };

    function bd(a, b, c, d, e) {
        this.Id = e || null;
        this.ve = d;
        this.Na = [];
        for (e = 1; !a.e();)
            if (e = b ? c(a.key, b) : 1, d && (e *= -1), 0 > e) a = this.ve ? a.left : a.right;
            else if (0 === e) {
            this.Na.push(a);
            break
        } else this.Na.push(a), a = this.ve ? a.right : a.left
    }

    function P(a) {
        if (0 === a.Na.length) return null;
        var b = a.Na.pop(),
            c;
        c = a.Id ? a.Id(b.key, b.value) : {
            key: b.key,
            value: b.value
        };
        if (a.ve)
            for (b = b.left; !b.e();) a.Na.push(b), b = b.right;
        else
            for (b = b.right; !b.e();) a.Na.push(b), b = b.left;
        return c
    }

    function cd(a) {
        if (0 === a.Na.length) return null;
        var b;
        b = a.Na;
        b = b[b.length - 1];
        return a.Id ? a.Id(b.key, b.value) : {
            key: b.key,
            value: b.value
        }
    }

    function dd(a, b, c, d, e) {
        this.key = a;
        this.value = b;
        this.color = null != c ? c : !0;
        this.left = null != d ? d : $c;
        this.right = null != e ? e : $c
    }
    h = dd.prototype;
    h.X = function(a, b, c, d, e) {
        return new dd(null != a ? a : this.key, null != b ? b : this.value, null != c ? c : this.color, null != d ? d : this.left, null != e ? e : this.right)
    };
    h.count = function() {
        return this.left.count() + 1 + this.right.count()
    };
    h.e = function() {
        return !1
    };
    h.fa = function(a) {
        return this.left.fa(a) || a(this.key, this.value) || this.right.fa(a)
    };

    function ed(a) {
        return a.left.e() ? a : ed(a.left)
    }
    h.Ic = function() {
        return ed(this).key
    };
    h.Xb = function() {
        return this.right.e() ? this.key : this.right.Xb()
    };
    h.La = function(a, b, c) {
        var d, e;
        e = this;
        d = c(a, e.key);
        e = 0 > d ? e.X(null, null, null, e.left.La(a, b, c), null) : 0 === d ? e.X(null, b, null, null, null) : e.X(null, null, null, null, e.right.La(a, b, c));
        return fd(e)
    };

    function gd(a) {
        if (a.left.e()) return $c;
        a.left.ba() || a.left.left.ba() || (a = hd(a));
        a = a.X(null, null, null, gd(a.left), null);
        return fd(a)
    }
    h.remove = function(a, b) {
        var c, d;
        c = this;
        if (0 > b(a, c.key)) c.left.e() || c.left.ba() || c.left.left.ba() || (c = hd(c)), c = c.X(null, null, null, c.left.remove(a, b), null);
        else {
            c.left.ba() && (c = jd(c));
            c.right.e() || c.right.ba() || c.right.left.ba() || (c = kd(c), c.left.left.ba() && (c = jd(c), c = kd(c)));
            if (0 === b(a, c.key)) {
                if (c.right.e()) return $c;
                d = ed(c.right);
                c = c.X(d.key, d.value, null, null, gd(c.right))
            }
            c = c.X(null, null, null, null, c.right.remove(a, b))
        }
        return fd(c)
    };
    h.ba = function() {
        return this.color
    };

    function fd(a) {
        a.right.ba() && !a.left.ba() && (a = ld(a));
        a.left.ba() && a.left.left.ba() && (a = jd(a));
        a.left.ba() && a.right.ba() && (a = kd(a));
        return a
    }

    function hd(a) {
        a = kd(a);
        a.right.left.ba() && (a = a.X(null, null, null, null, jd(a.right)), a = ld(a), a = kd(a));
        return a
    }

    function ld(a) {
        return a.right.X(null, null, a.color, a.X(null, null, !0, null, a.right.left), null)
    }

    function jd(a) {
        return a.left.X(null, null, a.color, null, a.X(null, null, !0, a.left.right, null))
    }

    function kd(a) {
        return a.X(null, null, !a.color, a.left.X(null, null, !a.left.color, null, null), a.right.X(null, null, !a.right.color, null, null))
    }

    function md() {}
    h = md.prototype;
    h.X = function() {
        return this
    };
    h.La = function(a, b) {
        return new dd(a, b, null)
    };
    h.remove = function() {
        return this
    };
    h.count = function() {
        return 0
    };
    h.e = function() {
        return !0
    };
    h.fa = function() {
        return !1
    };
    h.Ic = function() {
        return null
    };
    h.Xb = function() {
        return null
    };
    h.ba = function() {
        return !1
    };
    var $c = new md;

    function nd(a, b) {
        this.D = a;
        y(m(this.D) && null !== this.D, "LeafNode shouldn't be created with null/undefined value.");
        this.ha = b || M;
        od(this.ha);
        this.sb = null
    }
    h = nd.prototype;
    h.M = function() {
        return !0
    };
    h.L = function() {
        return this.ha
    };
    h.Z = function(a) {
        return new nd(this.D, a)
    };
    h.K = function(a) {
        return ".priority" === a ? this.ha : M
    };
    h.ra = function(a) {
        return a.e() ? this : ".priority" === I(a) ? this.ha : M
    };
    h.Da = function() {
        return !1
    };
    h.ff = function() {
        return null
    };
    h.P = function(a, b) {
        return ".priority" === a ? this.Z(b) : b.e() && ".priority" !== a ? this : M.P(a, b).Z(this.ha)
    };
    h.C = function(a, b) {
        var c = I(a);
        if (null === c) return b;
        if (b.e() && ".priority" !== c) return this;
        y(".priority" !== c || 1 === Qc(a), ".priority must be the last token in a path");
        return this.P(c, M.C(T(a), b))
    };
    h.e = function() {
        return !1
    };
    h.ub = function() {
        return 0
    };
    h.I = function(a) {
        return a && !this.L().e() ? {
            ".value": this.za(),
            ".priority": this.L().I()
        } : this.za()
    };
    h.hash = function() {
        if (null === this.sb) {
            var a = "";
            this.ha.e() || (a += "priority:" + pd(this.ha.I()) + ":");
            var b = typeof this.D,
                a = a + (b + ":"),
                a = "number" === b ? a + Ab(this.D) : a + this.D;
            this.sb = ib(a)
        }
        return this.sb
    };
    h.za = function() {
        return this.D
    };
    h.he = function(a) {
        if (a === M) return 1;
        if (a instanceof W) return -1;
        y(a.M(), "Unknown node type");
        var b = typeof a.D,
            c = typeof this.D,
            d = Ga(qd, b),
            e = Ga(qd, c);
        y(0 <= d, "Unknown leaf type: " + b);
        y(0 <= e, "Unknown leaf type: " + c);
        return d === e ? "object" === c ? 0 : this.D < a.D ? -1 : this.D === a.D ? 0 : 1 : e - d
    };
    var qd = ["object", "boolean", "number", "string"];
    nd.prototype.Fb = function() {
        return this
    };
    nd.prototype.Bc = function() {
        return !0
    };
    nd.prototype.ea = function(a) {
        return a === this ? !0 : a.M() ? this.D === a.D && this.ha.ea(a.ha) : !1
    };
    nd.prototype.toString = function() {
        return r(this.I(!0))
    };

    function rd(a, b) {
        this.pd = a;
        this.Vb = b
    }
    rd.prototype.get = function(a) {
        var b = t(this.pd, a);
        if (!b) throw Error("No index defined for " + a);
        return b === lc ? null : b
    };

    function sd(a, b, c) {
        var d = td(a.pd, function(d, f) {
            var g = t(a.Vb, f);
            y(g, "Missing index implementation for " + f);
            if (d === lc) {
                if (g.ue(b.Y)) {
                    for (var k = [], l = c.Ob(zc), n = P(l); n;) n.name != b.name && k.push(n), n = P(l);
                    k.push(b);
                    return ud(k, mc(g))
                }
                return lc
            }
            g = c.get(b.name);
            k = d;
            g && (k = k.remove(new N(b.name, g)));
            return k.La(b, b.Y)
        });
        return new rd(d, a.Vb)
    }

    function vd(a, b, c) {
        var d = td(a.pd, function(a) {
            if (a === lc) return a;
            var d = c.get(b.name);
            return d ? a.remove(new N(b.name, d)) : a
        });
        return new rd(d, a.Vb)
    }
    var wd = new rd({
        ".priority": lc
    }, {
        ".priority": L
    });

    function W(a, b, c) {
        this.m = a;
        (this.ha = b) && od(this.ha);
        this.ob = c;
        this.sb = null
    }
    h = W.prototype;
    h.M = function() {
        return !1
    };
    h.L = function() {
        return this.ha || M
    };
    h.Z = function(a) {
        return new W(this.m, a, this.ob)
    };
    h.K = function(a) {
        if (".priority" === a) return this.L();
        a = this.m.get(a);
        return null === a ? M : a
    };
    h.ra = function(a) {
        var b = I(a);
        return null === b ? this : this.K(b).ra(T(a))
    };
    h.Da = function(a) {
        return null !== this.m.get(a)
    };
    h.P = function(a, b) {
        y(b, "We should always be passing snapshot nodes");
        if (".priority" === a) return this.Z(b);
        var c = new N(a, b),
            d;
        b.e() ? (d = this.m.remove(a), c = vd(this.ob, c, this.m)) : (d = this.m.La(a, b), c = sd(this.ob, c, this.m));
        return new W(d, this.ha, c)
    };
    h.C = function(a, b) {
        var c = I(a);
        if (null === c) return b;
        y(".priority" !== I(a) || 1 === Qc(a), ".priority must be the last token in a path");
        var d = this.K(c).C(T(a), b);
        return this.P(c, d)
    };
    h.e = function() {
        return this.m.e()
    };
    h.ub = function() {
        return this.m.count()
    };
    var xd = /^(0|[1-9]\d*)$/;
    h = W.prototype;
    h.I = function(a) {
        if (this.e()) return null;
        var b = {},
            c = 0,
            d = 0,
            e = !0;
        this.U(L, function(f, g) {
            b[f] = g.I(a);
            c++;
            e && xd.test(f) ? d = Math.max(d, Number(f)) : e = !1
        });
        if (!a && e && d < 2 * c) {
            var f = [],
                g;
            for (g in b) f[g] = b[g];
            return f
        }
        a && !this.L().e() && (b[".priority"] = this.L().I());
        return b
    };
    h.hash = function() {
        if (null === this.sb) {
            var a = "";
            this.L().e() || (a += "priority:" + pd(this.L().I()) + ":");
            this.U(L, function(b, c) {
                var d = c.hash();
                "" !== d && (a += ":" + b + ":" + d)
            });
            this.sb = "" === a ? "" : ib(a)
        }
        return this.sb
    };
    h.ff = function(a, b, c) {
        return (c = yd(this, c)) ? (a = ad(c, new N(a, b))) ? a.name : null : ad(this.m, a)
    };

    function Cc(a, b) {
        var c;
        c = (c = yd(a, b)) ? (c = c.Ic()) && c.name : a.m.Ic();
        return c ? new N(c, a.m.get(c)) : null
    }

    function Dc(a, b) {
        var c;
        c = (c = yd(a, b)) ? (c = c.Xb()) && c.name : a.m.Xb();
        return c ? new N(c, a.m.get(c)) : null
    }
    h.U = function(a, b) {
        var c = yd(this, a);
        return c ? c.fa(function(a) {
            return b(a.name, a.Y)
        }) : this.m.fa(b)
    };
    h.Ob = function(a) {
        return this.Pb(a.Ce(), a)
    };
    h.Pb = function(a, b) {
        var c = yd(this, b);
        if (c) return c.Pb(a, function(a) {
            return a
        });
        for (var c = this.m.Pb(a.name, zc), d = cd(c); null != d && 0 > b.compare(d, a);) P(c), d = cd(c);
        return c
    };
    h.gf = function(a) {
        return this.Rb(a.Be(), a)
    };
    h.Rb = function(a, b) {
        var c = yd(this, b);
        if (c) return c.Rb(a, function(a) {
            return a
        });
        for (var c = this.m.Rb(a.name, zc), d = cd(c); null != d && 0 < b.compare(d, a);) P(c), d = cd(c);
        return c
    };
    h.he = function(a) {
        return this.e() ? a.e() ? 0 : -1 : a.M() || a.e() ? 1 : a === pc ? -1 : 0
    };
    h.Fb = function(a) {
        if (a === rc || zd(this.ob.Vb, a.toString())) return this;
        var b = this.ob,
            c = this.m;
        y(a !== rc, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
        for (var d = [], e = !1, c = c.Ob(zc), f = P(c); f;) e = e || a.ue(f.Y), d.push(f), f = P(c);
        d = e ? ud(d, mc(a)) : lc;
        e = a.toString();
        c = Ad(b.Vb);
        c[e] = a;
        a = Ad(b.pd);
        a[e] = d;
        return new W(this.m, this.ha, new rd(a, c))
    };
    h.Bc = function(a) {
        return a === rc || zd(this.ob.Vb, a.toString())
    };
    h.ea = function(a) {
        if (a === this) return !0;
        if (a.M()) return !1;
        if (this.L().ea(a.L()) && this.m.count() === a.m.count()) {
            var b = this.Ob(L);
            a = a.Ob(L);
            for (var c = P(b), d = P(a); c && d;) {
                if (c.name !== d.name || !c.Y.ea(d.Y)) return !1;
                c = P(b);
                d = P(a)
            }
            return null === c && null === d
        }
        return !1
    };

    function yd(a, b) {
        return b === rc ? null : a.ob.get(b.toString())
    }
    h.toString = function() {
        return r(this.I(!0))
    };

    function O(a, b) {
        if (null === a) return M;
        var c = null;
        "object" === typeof a && ".priority" in a ? c = a[".priority"] : "undefined" !== typeof b && (c = b);
        y(null === c || "string" === typeof c || "number" === typeof c || "object" === typeof c && ".sv" in c, "Invalid priority type found: " + typeof c);
        "object" === typeof a && ".value" in a && null !== a[".value"] && (a = a[".value"]);
        if ("object" !== typeof a || ".sv" in a) return new nd(a, O(c));
        if (a instanceof Array) {
            var d = M,
                e = a;
            A(e, function(a, b) {
                if (s(e, b) && "." !== b.substring(0, 1)) {
                    var c = O(a);
                    if (c.M() || !c.e()) d =
                        d.P(b, c)
                }
            });
            return d.Z(O(c))
        }
        var f = [],
            g = !1,
            k = a;
        ua(k, function(a) {
            if ("string" !== typeof a || "." !== a.substring(0, 1)) {
                var b = O(k[a]);
                b.e() || (g = g || !b.L().e(), f.push(new N(a, b)))
            }
        });
        var l = ud(f, ic, function(a) {
            return a.name
        }, jc);
        if (g) {
            var n = ud(f, mc(L));
            return new W(l, O(c), new rd({
                ".priority": n
            }, {
                ".priority": L
            }))
        }
        return new W(l, O(c), wd)
    }
    var Bd = Math.log(2);

    function Cd(a) {
        this.count = parseInt(Math.log(a + 1) / Bd, 10);
        this.$e = this.count - 1;
        this.Nf = a + 1 & parseInt(Array(this.count + 1).join("1"), 2)
    }

    function Dd(a) {
        var b = !(a.Nf & 1 << a.$e);
        a.$e--;
        return b
    }

    function ud(a, b, c, d) {
        function e(b, d) {
            var f = d - b;
            if (0 == f) return null;
            if (1 == f) {
                var n = a[b],
                    u = c ? c(n) : n;
                return new dd(u, n.Y, !1, null, null)
            }
            var n = parseInt(f / 2, 10) + b,
                f = e(b, n),
                x = e(n + 1, d),
                n = a[n],
                u = c ? c(n) : n;
            return new dd(u, n.Y, !1, f, x)
        }
        a.sort(b);
        var f = function(b) {
            function d(b, g) {
                var k = u - b,
                    x = u;
                u -= b;
                var x = e(k + 1, x),
                    k = a[k],
                    E = c ? c(k) : k,
                    x = new dd(E, k.Y, g, null, x);
                f ? f.left = x : n = x;
                f = x
            }
            for (var f = null, n = null, u = a.length, x = 0; x < b.count; ++x) {
                var E = Dd(b),
                    id = Math.pow(2, b.count - (x + 1));
                E ? d(id, !1) : (d(id, !1), d(id, !0))
            }
            return n
        }(new Cd(a.length));
        return null !== f ? new Zc(d || b, f) : new Zc(d || b)
    }

    function pd(a) {
        return "number" === typeof a ? "number:" + Ab(a) : "string:" + a
    }

    function od(a) {
        if (a.M()) {
            var b = a.I();
            y("string" === typeof b || "number" === typeof b || "object" === typeof b && s(b, ".sv"), "Priority must be a string or number.")
        } else y(a === pc || a.e(), "priority of unexpected type.");
        y(a === pc || a.L().e(), "Priority nodes can't have a priority of their own.")
    }
    var M = new W(new Zc(jc), null, wd);

    function Ed() {
        W.call(this, new Zc(jc), M, wd)
    }
    ma(Ed, W);
    h = Ed.prototype;
    h.he = function(a) {
        return a === this ? 0 : 1
    };
    h.ea = function(a) {
        return a === this
    };
    h.L = function() {
        throw fb("Why is this called?");
    };
    h.K = function() {
        return M
    };
    h.e = function() {
        return !1
    };
    var pc = new Ed,
        nc = new N("[MIN_NAME]", M);

    function D(a, b, c) {
        this.A = a;
        this.V = b;
        this.g = c
    }
    D.prototype.I = function() {
        F("Firebase.DataSnapshot.val", 0, 0, arguments.length);
        return this.A.I()
    };
    D.prototype.val = D.prototype.I;
    D.prototype.bf = function() {
        F("Firebase.DataSnapshot.exportVal", 0, 0, arguments.length);
        return this.A.I(!0)
    };
    D.prototype.exportVal = D.prototype.bf;
    D.prototype.Wf = function() {
        F("Firebase.DataSnapshot.exists", 0, 0, arguments.length);
        return !this.A.e()
    };
    D.prototype.exists = D.prototype.Wf;
    D.prototype.o = function(a) {
        F("Firebase.DataSnapshot.child", 0, 1, arguments.length);
        ga(a) && (a = String(a));
        Yb("Firebase.DataSnapshot.child", a);
        var b = new S(a),
            c = this.V.o(b);
        return new D(this.A.ra(b), c, L)
    };
    D.prototype.child = D.prototype.o;
    D.prototype.Da = function(a) {
        F("Firebase.DataSnapshot.hasChild", 1, 1, arguments.length);
        Yb("Firebase.DataSnapshot.hasChild", a);
        var b = new S(a);
        return !this.A.ra(b).e()
    };
    D.prototype.hasChild = D.prototype.Da;
    D.prototype.L = function() {
        F("Firebase.DataSnapshot.getPriority", 0, 0, arguments.length);
        return this.A.L().I()
    };
    D.prototype.getPriority = D.prototype.L;
    D.prototype.forEach = function(a) {
        F("Firebase.DataSnapshot.forEach", 1, 1, arguments.length);
        H("Firebase.DataSnapshot.forEach", 1, a, !1);
        if (this.A.M()) return !1;
        var b = this;
        return !!this.A.U(this.g, function(c, d) {
            return a(new D(d, b.V.o(c), L))
        })
    };
    D.prototype.forEach = D.prototype.forEach;
    D.prototype.ld = function() {
        F("Firebase.DataSnapshot.hasChildren", 0, 0, arguments.length);
        return this.A.M() ? !1 : !this.A.e()
    };
    D.prototype.hasChildren = D.prototype.ld;
    D.prototype.name = function() {
        z("Firebase.DataSnapshot.name() being deprecated. Please use Firebase.DataSnapshot.key() instead.");
        F("Firebase.DataSnapshot.name", 0, 0, arguments.length);
        return this.key()
    };
    D.prototype.name = D.prototype.name;
    D.prototype.key = function() {
        F("Firebase.DataSnapshot.key", 0, 0, arguments.length);
        return this.V.key()
    };
    D.prototype.key = D.prototype.key;
    D.prototype.ub = function() {
        F("Firebase.DataSnapshot.numChildren", 0, 0, arguments.length);
        return this.A.ub()
    };
    D.prototype.numChildren = D.prototype.ub;
    D.prototype.cc = function() {
        F("Firebase.DataSnapshot.ref", 0, 0, arguments.length);
        return this.V
    };
    D.prototype.ref = D.prototype.cc;

    function Fd(a) {
        y(ea(a) && 0 < a.length, "Requires a non-empty array");
        this.Ff = a;
        this.Gc = {}
    }
    Fd.prototype.Vd = function(a, b) {
        for (var c = this.Gc[a] || [], d = 0; d < c.length; d++) c[d].qc.apply(c[d].Ka, Array.prototype.slice.call(arguments, 1))
    };
    Fd.prototype.vb = function(a, b, c) {
        Gd(this, a);
        this.Gc[a] = this.Gc[a] || [];
        this.Gc[a].push({
            qc: b,
            Ka: c
        });
        (a = this.qe(a)) && b.apply(c, a)
    };
    Fd.prototype.Zb = function(a, b, c) {
        Gd(this, a);
        a = this.Gc[a] || [];
        for (var d = 0; d < a.length; d++)
            if (a[d].qc === b && (!c || c === a[d].Ka)) {
                a.splice(d, 1);
                break
            }
    };

    function Gd(a, b) {
        y(Ma(a.Ff, function(a) {
            return a === b
        }), "Unknown event: " + b)
    };

    function Hd() {
        Fd.call(this, ["visible"]);
        var a, b;
        "undefined" !== typeof document && "undefined" !== typeof document.addEventListener && ("undefined" !== typeof document.hidden ? (b = "visibilitychange", a = "hidden") : "undefined" !== typeof document.mozHidden ? (b = "mozvisibilitychange", a = "mozHidden") : "undefined" !== typeof document.msHidden ? (b = "msvisibilitychange", a = "msHidden") : "undefined" !== typeof document.webkitHidden && (b = "webkitvisibilitychange", a = "webkitHidden"));
        this.mc = !0;
        if (b) {
            var c = this;
            document.addEventListener(b,
                function() {
                    var b = !document[a];
                    b !== c.mc && (c.mc = b, c.Vd("visible", b))
                }, !1)
        }
    }
    ma(Hd, Fd);
    ca(Hd);
    Hd.prototype.qe = function(a) {
        y("visible" === a, "Unknown event type: " + a);
        return [this.mc]
    };

    function Id() {
        Fd.call(this, ["online"]);
        this.Lc = !0;
        if ("undefined" !== typeof window && "undefined" !== typeof window.addEventListener) {
            var a = this;
            window.addEventListener("online", function() {
                a.Lc || a.Vd("online", !0);
                a.Lc = !0
            }, !1);
            window.addEventListener("offline", function() {
                a.Lc && a.Vd("online", !1);
                a.Lc = !1
            }, !1)
        }
    }
    ma(Id, Fd);
    ca(Id);
    Id.prototype.qe = function(a) {
        y("online" === a, "Unknown event type: " + a);
        return [this.Lc]
    };

    function A(a, b) {
        for (var c in a) b.call(void 0, a[c], c, a)
    }

    function td(a, b) {
        var c = {},
            d;
        for (d in a) c[d] = b.call(void 0, a[d], d, a);
        return c
    }

    function Lb(a, b) {
        for (var c in a)
            if (!b.call(void 0, a[c], c, a)) return !1;
        return !0
    }

    function Jb(a) {
        var b = 0,
            c;
        for (c in a) b++;
        return b
    }

    function Kb(a) {
        for (var b in a) return b
    }

    function Jd(a) {
        var b = [],
            c = 0,
            d;
        for (d in a) b[c++] = a[d];
        return b
    }

    function Kd(a) {
        var b = [],
            c = 0,
            d;
        for (d in a) b[c++] = d;
        return b
    }

    function zd(a, b) {
        for (var c in a)
            if (a[c] == b) return !0;
        return !1
    }

    function Ld(a, b, c) {
        for (var d in a)
            if (b.call(c, a[d], d, a)) return d
    }

    function Md(a, b) {
        var c = Ld(a, b, void 0);
        return c && a[c]
    }

    function Nd(a) {
        for (var b in a) return !1;
        return !0
    }

    function Od(a, b) {
        return b in a ? a[b] : void 0
    }

    function Ad(a) {
        var b = {},
            c;
        for (c in a) b[c] = a[c];
        return b
    }
    var Pd = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

    function Qd(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d) a[c] = d[c];
            for (var f = 0; f < Pd.length; f++) c = Pd[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    };

    function Rd() {
        this.tc = {}
    }

    function Sd(a, b, c) {
        m(c) || (c = 1);
        s(a.tc, b) || (a.tc[b] = 0);
        a.tc[b] += c
    }
    Rd.prototype.get = function() {
        return Ad(this.tc)
    };

    function Td(a) {
        this.Pf = a;
        this.rd = null
    }
    Td.prototype.get = function() {
        var a = this.Pf.get(),
            b = Ad(a);
        if (this.rd)
            for (var c in this.rd) b[c] -= this.rd[c];
        this.rd = a;
        return b
    };

    function Ud(a, b) {
        this.zf = {};
        this.Pd = new Td(a);
        this.S = b;
        var c = 1E4 + 2E4 * Math.random();
        setTimeout(q(this.tf, this), Math.floor(c))
    }
    Ud.prototype.tf = function() {
        var a = this.Pd.get(),
            b = {},
            c = !1,
            d;
        for (d in a) 0 < a[d] && s(this.zf, d) && (b[d] = a[d], c = !0);
        c && (a = this.S, a.ja && (b = {
            c: b
        }, a.f("reportStats", b), a.Ca("s", b)));
        setTimeout(q(this.tf, this), Math.floor(6E5 * Math.random()))
    };
    var Vd = {},
        Wd = {};

    function Xd(a) {
        a = a.toString();
        Vd[a] || (Vd[a] = new Rd);
        return Vd[a]
    }

    function Yd(a, b) {
        var c = a.toString();
        Wd[c] || (Wd[c] = b());
        return Wd[c]
    };
    var Zd = null;
    "undefined" !== typeof MozWebSocket ? Zd = MozWebSocket : "undefined" !== typeof WebSocket && (Zd = WebSocket);

    function $d(a, b, c) {
        this.ie = a;
        this.f = ob(this.ie);
        this.frames = this.Cc = null;
        this.ib = this.jb = this.Te = 0;
        this.Ra = Xd(b);
        this.$a = (b.Ab ? "wss://" : "ws://") + b.Ma + "/.ws?v=5";
        "undefined" !== typeof location && location.href && -1 !== location.href.indexOf("firebaseio.com") && (this.$a += "&r=f");
        b.host !== b.Ma && (this.$a = this.$a + "&ns=" + b.tb);
        c && (this.$a = this.$a + "&s=" + c)
    }
    var ae;
    $d.prototype.open = function(a, b) {
        this.fb = b;
        this.hg = a;
        this.f("Websocket connecting to " + this.$a);
        this.xc = !1;
        za.set("previous_websocket_failure", !0);
        try {
            this.ta = new Zd(this.$a)
        } catch (c) {
            this.f("Error instantiating WebSocket.");
            var d = c.message || c.data;
            d && this.f(d);
            this.eb();
            return
        }
        var e = this;
        this.ta.onopen = function() {
            e.f("Websocket connected.");
            e.xc = !0
        };
        this.ta.onclose = function() {
            e.f("Websocket connection was disconnected.");
            e.ta = null;
            e.eb()
        };
        this.ta.onmessage = function(a) {
            if (null !== e.ta)
                if (a = a.data, e.ib +=
                    a.length, Sd(e.Ra, "bytes_received", a.length), be(e), null !== e.frames) ce(e, a);
                else {
                    a: {
                        y(null === e.frames, "We already have a frame buffer");
                        if (6 >= a.length) {
                            var b = Number(a);
                            if (!isNaN(b)) {
                                e.Te = b;
                                e.frames = [];
                                a = null;
                                break a
                            }
                        }
                        e.Te = 1;e.frames = []
                    }
                    null !== a && ce(e, a)
                }
        };
        this.ta.onerror = function(a) {
            e.f("WebSocket error.  Closing connection.");
            (a = a.message || a.data) && e.f(a);
            e.eb()
        }
    };
    $d.prototype.start = function() {};
    $d.isAvailable = function() {
        var a = !1;
        if ("undefined" !== typeof navigator && navigator.userAgent) {
            var b = navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);
            b && 1 < b.length && 4.4 > parseFloat(b[1]) && (a = !0)
        }
        return !a && null !== Zd && !ae
    };
    $d.responsesRequiredToBeHealthy = 2;
    $d.healthyTimeout = 3E4;
    h = $d.prototype;
    h.sd = function() {
        za.remove("previous_websocket_failure")
    };

    function ce(a, b) {
        a.frames.push(b);
        if (a.frames.length == a.Te) {
            var c = a.frames.join("");
            a.frames = null;
            c = ta(c);
            a.hg(c)
        }
    }
    h.send = function(a) {
        be(this);
        a = r(a);
        this.jb += a.length;
        Sd(this.Ra, "bytes_sent", a.length);
        a = yb(a, 16384);
        1 < a.length && this.ta.send(String(a.length));
        for (var b = 0; b < a.length; b++) this.ta.send(a[b])
    };
    h.Uc = function() {
        this.qb = !0;
        this.Cc && (clearInterval(this.Cc), this.Cc = null);
        this.ta && (this.ta.close(), this.ta = null)
    };
    h.eb = function() {
        this.qb || (this.f("WebSocket is closing itself"), this.Uc(), this.fb && (this.fb(this.xc), this.fb = null))
    };
    h.close = function() {
        this.qb || (this.f("WebSocket is being closed"), this.Uc())
    };

    function be(a) {
        clearInterval(a.Cc);
        a.Cc = setInterval(function() {
            a.ta && a.ta.send("0");
            be(a)
        }, Math.floor(45E3))
    };

    function de(a) {
        this.$b = a;
        this.Cd = [];
        this.Jb = 0;
        this.ge = -1;
        this.wb = null
    }

    function ee(a, b, c) {
        a.ge = b;
        a.wb = c;
        a.ge < a.Jb && (a.wb(), a.wb = null)
    }

    function fe(a, b, c) {
        for (a.Cd[b] = c; a.Cd[a.Jb];) {
            var d = a.Cd[a.Jb];
            delete a.Cd[a.Jb];
            for (var e = 0; e < d.length; ++e)
                if (d[e]) {
                    var f = a;
                    Cb(function() {
                        f.$b(d[e])
                    })
                }
            if (a.Jb === a.ge) {
                a.wb && (clearTimeout(a.wb), a.wb(), a.wb = null);
                break
            }
            a.Jb++
        }
    };

    function ge() {
        this.set = {}
    }
    h = ge.prototype;
    h.add = function(a, b) {
        this.set[a] = null !== b ? b : !0
    };
    h.contains = function(a) {
        return s(this.set, a)
    };
    h.get = function(a) {
        return this.contains(a) ? this.set[a] : void 0
    };
    h.remove = function(a) {
        delete this.set[a]
    };
    h.clear = function() {
        this.set = {}
    };
    h.e = function() {
        return Nd(this.set)
    };
    h.count = function() {
        return Jb(this.set)
    };

    function he(a, b) {
        A(a.set, function(a, d) {
            b(d, a)
        })
    };

    function ie(a, b, c) {
        this.ie = a;
        this.f = ob(a);
        this.ib = this.jb = 0;
        this.Ra = Xd(b);
        this.Md = c;
        this.xc = !1;
        this.Zc = function(a) {
            b.host !== b.Ma && (a.ns = b.tb);
            var c = [],
                f;
            for (f in a) a.hasOwnProperty(f) && c.push(f + "=" + a[f]);
            return (b.Ab ? "https://" : "http://") + b.Ma + "/.lp?" + c.join("&")
        }
    }
    var je, ke;
    ie.prototype.open = function(a, b) {
        this.Ze = 0;
        this.ga = b;
        this.mf = new de(a);
        this.qb = !1;
        var c = this;
        this.lb = setTimeout(function() {
            c.f("Timed out trying to connect.");
            c.eb();
            c.lb = null
        }, Math.floor(3E4));
        tb(function() {
            if (!c.qb) {
                c.Pa = new le(function(a, b, d, k, l) {
                    me(c, arguments);
                    if (c.Pa)
                        if (c.lb && (clearTimeout(c.lb), c.lb = null), c.xc = !0, "start" == a) c.id = b, c.rf = d;
                        else if ("close" === a) b ? (c.Pa.Kd = !1, ee(c.mf, b, function() {
                        c.eb()
                    })) : c.eb();
                    else throw Error("Unrecognized command received: " + a);
                }, function(a, b) {
                    me(c, arguments);
                    fe(c.mf, a, b)
                }, function() {
                    c.eb()
                }, c.Zc);
                var a = {
                    start: "t"
                };
                a.ser = Math.floor(1E8 * Math.random());
                c.Pa.Wd && (a.cb = c.Pa.Wd);
                a.v = "5";
                c.Md && (a.s = c.Md);
                "undefined" !== typeof location && location.href && -1 !== location.href.indexOf("firebaseio.com") && (a.r = "f");
                a = c.Zc(a);
                c.f("Connecting via long-poll to " + a);
                ne(c.Pa, a, function() {})
            }
        })
    };
    ie.prototype.start = function() {
        var a = this.Pa,
            b = this.rf;
        a.cg = this.id;
        a.dg = b;
        for (a.ae = !0; oe(a););
        a = this.id;
        b = this.rf;
        this.Yb = document.createElement("iframe");
        var c = {
            dframe: "t"
        };
        c.id = a;
        c.pw = b;
        this.Yb.src = this.Zc(c);
        this.Yb.style.display = "none";
        document.body.appendChild(this.Yb)
    };
    ie.isAvailable = function() {
        return !ke && !("object" === typeof window && window.chrome && window.chrome.extension && !/^chrome/.test(window.location.href)) && !("object" === typeof Windows && "object" === typeof Windows.Eg) && (je || !0)
    };
    h = ie.prototype;
    h.sd = function() {};
    h.Uc = function() {
        this.qb = !0;
        this.Pa && (this.Pa.close(), this.Pa = null);
        this.Yb && (document.body.removeChild(this.Yb), this.Yb = null);
        this.lb && (clearTimeout(this.lb), this.lb = null)
    };
    h.eb = function() {
        this.qb || (this.f("Longpoll is closing itself"), this.Uc(), this.ga && (this.ga(this.xc), this.ga = null))
    };
    h.close = function() {
        this.qb || (this.f("Longpoll is being closed."), this.Uc())
    };
    h.send = function(a) {
        a = r(a);
        this.jb += a.length;
        Sd(this.Ra, "bytes_sent", a.length);
        a = jb(a);
        a = cb(a, !0);
        a = yb(a, 1840);
        for (var b = 0; b < a.length; b++) {
            var c = this.Pa;
            c.Qc.push({
                tg: this.Ze,
                Bg: a.length,
                af: a[b]
            });
            c.ae && oe(c);
            this.Ze++
        }
    };

    function me(a, b) {
        var c = r(b).length;
        a.ib += c;
        Sd(a.Ra, "bytes_received", c)
    }

    function le(a, b, c, d) {
        this.Zc = d;
        this.fb = c;
        this.Ie = new ge;
        this.Qc = [];
        this.ke = Math.floor(1E8 * Math.random());
        this.Kd = !0;
        this.Wd = eb();
        window["pLPCommand" + this.Wd] = a;
        window["pRTLPCB" + this.Wd] = b;
        a = document.createElement("iframe");
        a.style.display = "none";
        if (document.body) {
            document.body.appendChild(a);
            try {
                a.contentWindow.document || hb("No IE domain setting required")
            } catch (e) {
                a.src = "javascript:void((function(){document.open();document.domain='" + document.domain + "';document.close();})())"
            }
        } else throw "Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
        a.contentDocument ? a.ab = a.contentDocument : a.contentWindow ? a.ab = a.contentWindow.document : a.document && (a.ab = a.document);
        this.Ba = a;
        a = "";
        this.Ba.src && "javascript:" === this.Ba.src.substr(0, 11) && (a = '<script>document.domain="' + document.domain + '";\x3c/script>');
        a = "<html><body>" + a + "</body></html>";
        try {
            this.Ba.ab.open(), this.Ba.ab.write(a), this.Ba.ab.close()
        } catch (f) {
            hb("frame writing exception"), f.stack && hb(f.stack), hb(f)
        }
    }
    le.prototype.close = function() {
        this.ae = !1;
        if (this.Ba) {
            this.Ba.ab.body.innerHTML = "";
            var a = this;
            setTimeout(function() {
                null !== a.Ba && (document.body.removeChild(a.Ba), a.Ba = null)
            }, Math.floor(0))
        }
        var b = this.fb;
        b && (this.fb = null, b())
    };

    function oe(a) {
        if (a.ae && a.Kd && a.Ie.count() < (0 < a.Qc.length ? 2 : 1)) {
            a.ke++;
            var b = {};
            b.id = a.cg;
            b.pw = a.dg;
            b.ser = a.ke;
            for (var b = a.Zc(b), c = "", d = 0; 0 < a.Qc.length;)
                if (1870 >= a.Qc[0].af.length + 30 + c.length) {
                    var e = a.Qc.shift(),
                        c = c + "&seg" + d + "=" + e.tg + "&ts" + d + "=" + e.Bg + "&d" + d + "=" + e.af;
                    d++
                } else break;
            pe(a, b + c, a.ke);
            return !0
        }
        return !1
    }

    function pe(a, b, c) {
        function d() {
            a.Ie.remove(c);
            oe(a)
        }
        a.Ie.add(c);
        var e = setTimeout(d, Math.floor(25E3));
        ne(a, b, function() {
            clearTimeout(e);
            d()
        })
    }

    function ne(a, b, c) {
        setTimeout(function() {
            try {
                if (a.Kd) {
                    var d = a.Ba.ab.createElement("script");
                    d.type = "text/javascript";
                    d.async = !0;
                    d.src = b;
                    d.onload = d.onreadystatechange = function() {
                        var a = d.readyState;
                        a && "loaded" !== a && "complete" !== a || (d.onload = d.onreadystatechange = null, d.parentNode && d.parentNode.removeChild(d), c())
                    };
                    d.onerror = function() {
                        hb("Long-poll script failed to load: " + b);
                        a.Kd = !1;
                        a.close()
                    };
                    a.Ba.ab.body.appendChild(d)
                }
            } catch (e) {}
        }, Math.floor(1))
    };

    function qe(a) {
        re(this, a)
    }
    var se = [ie, $d];

    function re(a, b) {
        var c = $d && $d.isAvailable(),
            d = c && !(za.lf || !0 === za.get("previous_websocket_failure"));
        b.Dg && (c || z("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."), d = !0);
        if (d) a.Xc = [$d];
        else {
            var e = a.Xc = [];
            zb(se, function(a, b) {
                b && b.isAvailable() && e.push(b)
            })
        }
    }

    function te(a) {
        if (0 < a.Xc.length) return a.Xc[0];
        throw Error("No transports available");
    };

    function ue(a, b, c, d, e, f) {
        this.id = a;
        this.f = ob("c:" + this.id + ":");
        this.$b = c;
        this.Kc = d;
        this.ga = e;
        this.Ge = f;
        this.O = b;
        this.Bd = [];
        this.Xe = 0;
        this.Af = new qe(b);
        this.Qa = 0;
        this.f("Connection created");
        ve(this)
    }

    function ve(a) {
        var b = te(a.Af);
        a.J = new b("c:" + a.id + ":" + a.Xe++, a.O);
        a.Ke = b.responsesRequiredToBeHealthy || 0;
        var c = we(a, a.J),
            d = xe(a, a.J);
        a.Yc = a.J;
        a.Tc = a.J;
        a.B = null;
        a.rb = !1;
        setTimeout(function() {
            a.J && a.J.open(c, d)
        }, Math.floor(0));
        b = b.healthyTimeout || 0;
        0 < b && (a.nd = setTimeout(function() {
            a.nd = null;
            a.rb || (a.J && 102400 < a.J.ib ? (a.f("Connection exceeded healthy timeout but has received " + a.J.ib + " bytes.  Marking connection healthy."), a.rb = !0, a.J.sd()) : a.J && 10240 < a.J.jb ? a.f("Connection exceeded healthy timeout but has sent " +
                a.J.jb + " bytes.  Leaving connection alive.") : (a.f("Closing unhealthy connection after timeout."), a.close()))
        }, Math.floor(b)))
    }

    function xe(a, b) {
        return function(c) {
            b === a.J ? (a.J = null, c || 0 !== a.Qa ? 1 === a.Qa && a.f("Realtime connection lost.") : (a.f("Realtime connection failed."), "s-" === a.O.Ma.substr(0, 2) && (za.remove("host:" + a.O.host), a.O.Ma = a.O.host)), a.close()) : b === a.B ? (a.f("Secondary connection lost."), c = a.B, a.B = null, a.Yc !== c && a.Tc !== c || a.close()) : a.f("closing an old connection")
        }
    }

    function we(a, b) {
        return function(c) {
            if (2 != a.Qa)
                if (b === a.Tc) {
                    var d = wb("t", c);
                    c = wb("d", c);
                    if ("c" == d) {
                        if (d = wb("t", c), "d" in c)
                            if (c = c.d, "h" === d) {
                                var d = c.ts,
                                    e = c.v,
                                    f = c.h;
                                a.Md = c.s;
                                Ba(a.O, f);
                                0 == a.Qa && (a.J.start(), ye(a, a.J, d), "5" !== e && z("Protocol version mismatch detected"), c = a.Af, (c = 1 < c.Xc.length ? c.Xc[1] : null) && ze(a, c))
                            } else if ("n" === d) {
                            a.f("recvd end transmission on primary");
                            a.Tc = a.B;
                            for (c = 0; c < a.Bd.length; ++c) a.xd(a.Bd[c]);
                            a.Bd = [];
                            Ae(a)
                        } else "s" === d ? (a.f("Connection shutdown command received. Shutting down..."),
                            a.Ge && (a.Ge(c), a.Ge = null), a.ga = null, a.close()) : "r" === d ? (a.f("Reset packet received.  New host: " + c), Ba(a.O, c), 1 === a.Qa ? a.close() : (Be(a), ve(a))) : "e" === d ? pb("Server Error: " + c) : "o" === d ? (a.f("got pong on primary."), Ce(a), De(a)) : pb("Unknown control packet command: " + d)
                    } else "d" == d && a.xd(c)
                } else if (b === a.B)
                if (d = wb("t", c), c = wb("d", c), "c" == d) "t" in c && (c = c.t, "a" === c ? Ee(a) : "r" === c ? (a.f("Got a reset on secondary, closing it"), a.B.close(), a.Yc !== a.B && a.Tc !== a.B || a.close()) : "o" === c && (a.f("got pong on secondary."),
                    a.yf--, Ee(a)));
                else if ("d" == d) a.Bd.push(c);
            else throw Error("Unknown protocol layer: " + d);
            else a.f("message on old connection")
        }
    }
    ue.prototype.Ca = function(a) {
        Fe(this, {
            t: "d",
            d: a
        })
    };

    function Ae(a) {
        a.Yc === a.B && a.Tc === a.B && (a.f("cleaning up and promoting a connection: " + a.B.ie), a.J = a.B, a.B = null)
    }

    function Ee(a) {
        0 >= a.yf ? (a.f("Secondary connection is healthy."), a.rb = !0, a.B.sd(), a.B.start(), a.f("sending client ack on secondary"), a.B.send({
            t: "c",
            d: {
                t: "a",
                d: {}
            }
        }), a.f("Ending transmission on primary"), a.J.send({
            t: "c",
            d: {
                t: "n",
                d: {}
            }
        }), a.Yc = a.B, Ae(a)) : (a.f("sending ping on secondary."), a.B.send({
            t: "c",
            d: {
                t: "p",
                d: {}
            }
        }))
    }
    ue.prototype.xd = function(a) {
        Ce(this);
        this.$b(a)
    };

    function Ce(a) {
        a.rb || (a.Ke--, 0 >= a.Ke && (a.f("Primary connection is healthy."), a.rb = !0, a.J.sd()))
    }

    function ze(a, b) {
        a.B = new b("c:" + a.id + ":" + a.Xe++, a.O, a.Md);
        a.yf = b.responsesRequiredToBeHealthy || 0;
        a.B.open(we(a, a.B), xe(a, a.B));
        setTimeout(function() {
            a.B && (a.f("Timed out trying to upgrade."), a.B.close())
        }, Math.floor(6E4))
    }

    function ye(a, b, c) {
        a.f("Realtime connection established.");
        a.J = b;
        a.Qa = 1;
        a.Kc && (a.Kc(c), a.Kc = null);
        0 === a.Ke ? (a.f("Primary connection is healthy."), a.rb = !0) : setTimeout(function() {
            De(a)
        }, Math.floor(5E3))
    }

    function De(a) {
        a.rb || 1 !== a.Qa || (a.f("sending ping on primary."), Fe(a, {
            t: "c",
            d: {
                t: "p",
                d: {}
            }
        }))
    }

    function Fe(a, b) {
        if (1 !== a.Qa) throw "Connection is not connected";
        a.Yc.send(b)
    }
    ue.prototype.close = function() {
        2 !== this.Qa && (this.f("Closing realtime connection."), this.Qa = 2, Be(this), this.ga && (this.ga(), this.ga = null))
    };

    function Be(a) {
        a.f("Shutting down all connections");
        a.J && (a.J.close(), a.J = null);
        a.B && (a.B.close(), a.B = null);
        a.nd && (clearTimeout(a.nd), a.nd = null)
    };

    function Ge(a) {
        var b = {},
            c = {},
            d = {},
            e = "";
        try {
            var f = a.split("."),
                b = ta(gb(f[0]) || ""),
                c = ta(gb(f[1]) || ""),
                e = f[2],
                d = c.d || {};
            delete c.d
        } catch (g) {}
        return {
            Gg: b,
            fe: c,
            data: d,
            xg: e
        }
    }

    function He(a) {
        a = Ge(a).fe;
        return "object" === typeof a && a.hasOwnProperty("iat") ? t(a, "iat") : null
    }

    function Ie(a) {
        a = Ge(a);
        var b = a.fe;
        return !!a.xg && !!b && "object" === typeof b && b.hasOwnProperty("iat")
    };

    function Je(a, b, c, d) {
        this.id = Ke++;
        this.f = ob("p:" + this.id + ":");
        this.Cb = !0;
        this.Aa = {};
        this.la = [];
        this.Nc = 0;
        this.Jc = [];
        this.ja = !1;
        this.Wa = 1E3;
        this.td = 3E5;
        this.yd = b;
        this.wd = c;
        this.He = d;
        this.O = a;
        this.Oe = null;
        this.Sc = {};
        this.sg = 0;
        this.Dc = this.we = null;
        Le(this, 0);
        Hd.Nb().vb("visible", this.kg, this); - 1 === a.host.indexOf("fblocal") && Id.Nb().vb("online", this.ig, this)
    }
    var Ke = 0,
        Me = 0;
    h = Je.prototype;
    h.Ca = function(a, b, c) {
        var d = ++this.sg;
        a = {
            r: d,
            a: a,
            b: b
        };
        this.f(r(a));
        y(this.ja, "sendRequest call when we're not connected not allowed.");
        this.Oa.Ca(a);
        c && (this.Sc[d] = c)
    };

    function Ne(a, b, c, d, e) {
        var f = b.Fa(),
            g = b.path.toString();
        a.f("Listen called for " + g + " " + f);
        a.Aa[g] = a.Aa[g] || {};
        y(!a.Aa[g][f], "listen() called twice for same path/queryId.");
        b = {
            H: e,
            md: c,
            pg: Ic(b.n),
            tag: d
        };
        a.Aa[g][f] = b;
        a.ja && Oe(a, g, f, b)
    }

    function Oe(a, b, c, d) {
        a.f("Listen on " + b + " for " + c);
        var e = {
            p: b
        };
        d.tag && (e.q = d.pg, e.t = d.tag);
        e.h = d.md();
        a.Ca("q", e, function(e) {
            if ((a.Aa[b] && a.Aa[b][c]) === d) {
                a.f("listen response", e);
                var g = e.s;
                "ok" !== g && Pe(a, b, c);
                e = e.d;
                d.H && d.H(g, e)
            }
        })
    }
    h.Q = function(a, b, c) {
        this.Ib = {
            Rf: a,
            cf: !1,
            qc: b,
            ad: c
        };
        this.f("Authenticating using credential: " + a);
        Qe(this);
        (b = 40 == a.length) || (a = Ge(a).fe, b = "object" === typeof a && !0 === t(a, "admin"));
        b && (this.f("Admin auth credential detected.  Reducing max reconnect time."), this.td = 3E4)
    };
    h.Ue = function(a) {
        delete this.Ib;
        this.ja && this.Ca("unauth", {}, function(b) {
            a(b.s, b.d)
        })
    };

    function Qe(a) {
        var b = a.Ib;
        a.ja && b && a.Ca("auth", {
            cred: b.Rf
        }, function(c) {
            var d = c.s;
            c = c.d || "error";
            "ok" !== d && a.Ib === b && delete a.Ib;
            b.cf ? "ok" !== d && b.ad && b.ad(d, c) : (b.cf = !0, b.qc && b.qc(d, c))
        })
    }

    function Re(a, b, c, d) {
        a.ja ? Se(a, "o", b, c, d) : a.Jc.push({
            Pc: b,
            action: "o",
            data: c,
            H: d
        })
    }

    function Te(a, b, c, d) {
        a.ja ? Se(a, "om", b, c, d) : a.Jc.push({
            Pc: b,
            action: "om",
            data: c,
            H: d
        })
    }
    h.Fe = function(a, b) {
        this.ja ? Se(this, "oc", a, null, b) : this.Jc.push({
            Pc: a,
            action: "oc",
            data: null,
            H: b
        })
    };

    function Se(a, b, c, d, e) {
        c = {
            p: c,
            d: d
        };
        a.f("onDisconnect " + b, c);
        a.Ca(b, c, function(a) {
            e && setTimeout(function() {
                e(a.s, a.d)
            }, Math.floor(0))
        })
    }
    h.put = function(a, b, c, d) {
        Ue(this, "p", a, b, c, d)
    };

    function Ve(a, b, c, d) {
        Ue(a, "m", b, c, d, void 0)
    }

    function Ue(a, b, c, d, e, f) {
        d = {
            p: c,
            d: d
        };
        m(f) && (d.h = f);
        a.la.push({
            action: b,
            uf: d,
            H: e
        });
        a.Nc++;
        b = a.la.length - 1;
        a.ja ? We(a, b) : a.f("Buffering put: " + c)
    }

    function We(a, b) {
        var c = a.la[b].action,
            d = a.la[b].uf,
            e = a.la[b].H;
        a.la[b].qg = a.ja;
        a.Ca(c, d, function(d) {
            a.f(c + " response", d);
            delete a.la[b];
            a.Nc--;
            0 === a.Nc && (a.la = []);
            e && e(d.s, d.d)
        })
    }
    h.xd = function(a) {
        if ("r" in a) {
            this.f("from server: " + r(a));
            var b = a.r,
                c = this.Sc[b];
            c && (delete this.Sc[b], c(a.b))
        } else {
            if ("error" in a) throw "A server-side error has occurred: " + a.error;
            "a" in a && (b = a.a, c = a.b, this.f("handleServerMessage", b, c), "d" === b ? this.yd(c.p, c.d, !1, c.t) : "m" === b ? this.yd(c.p, c.d, !0, c.t) : "c" === b ? Xe(this, c.p, c.q) : "ac" === b ? (a = c.s, b = c.d, c = this.Ib, delete this.Ib, c && c.ad && c.ad(a, b)) : "sd" === b ? this.Oe ? this.Oe(c) : "msg" in c && "undefined" !== typeof console && console.log("FIREBASE: " + c.msg.replace("\n",
                "\nFIREBASE: ")) : pb("Unrecognized action received from server: " + r(b) + "\nAre you using the latest client?"))
        }
    };
    h.Kc = function(a) {
        this.f("connection ready");
        this.ja = !0;
        this.Dc = (new Date).getTime();
        this.He({
            serverTimeOffset: a - (new Date).getTime()
        });
        Ye(this);
        this.wd(!0)
    };

    function Le(a, b) {
        y(!a.Oa, "Scheduling a connect when we're already connected/ing?");
        a.Kb && clearTimeout(a.Kb);
        a.Kb = setTimeout(function() {
            a.Kb = null;
            Ze(a)
        }, Math.floor(b))
    }
    h.kg = function(a) {
        a && !this.mc && this.Wa === this.td && (this.f("Window became visible.  Reducing delay."), this.Wa = 1E3, this.Oa || Le(this, 0));
        this.mc = a
    };
    h.ig = function(a) {
        a ? (this.f("Browser went online.  Reconnecting."), this.Wa = 1E3, this.Cb = !0, this.Oa || Le(this, 0)) : (this.f("Browser went offline.  Killing connection; don't reconnect."), this.Cb = !1, this.Oa && this.Oa.close())
    };
    h.of = function() {
        this.f("data client disconnected");
        this.ja = !1;
        this.Oa = null;
        for (var a = 0; a < this.la.length; a++) {
            var b = this.la[a];
            b && "h" in b.uf && b.qg && (b.H && b.H("disconnect"), delete this.la[a], this.Nc--)
        }
        0 === this.Nc && (this.la = []);
        if (this.Cb) this.mc ? this.Dc && (3E4 < (new Date).getTime() - this.Dc && (this.Wa = 1E3), this.Dc = null) : (this.f("Window isn't visible.  Delaying reconnect."), this.Wa = this.td, this.we = (new Date).getTime()), a = Math.max(0, this.Wa - ((new Date).getTime() - this.we)), a *= Math.random(), this.f("Trying to reconnect in " +
            a + "ms"), Le(this, a), this.Wa = Math.min(this.td, 1.3 * this.Wa);
        else
            for (var c in this.Sc) delete this.Sc[c];
        this.wd(!1)
    };

    function Ze(a) {
        if (a.Cb) {
            a.f("Making a connection attempt");
            a.we = (new Date).getTime();
            a.Dc = null;
            var b = q(a.xd, a),
                c = q(a.Kc, a),
                d = q(a.of, a),
                e = a.id + ":" + Me++;
            a.Oa = new ue(e, a.O, b, c, d, function(b) {
                z(b + " (" + a.O.toString() + ")");
                a.Cb = !1
            })
        }
    }
    h.pb = function() {
        this.Cb = !1;
        this.Oa ? this.Oa.close() : (this.Kb && (clearTimeout(this.Kb), this.Kb = null), this.ja && this.of())
    };
    h.hc = function() {
        this.Cb = !0;
        this.Wa = 1E3;
        this.Oa || Le(this, 0)
    };

    function Xe(a, b, c) {
        c = c ? Ja(c, function(a) {
            return xb(a)
        }).join("$") : "default";
        (a = Pe(a, b, c)) && a.H && a.H("permission_denied")
    }

    function Pe(a, b, c) {
        b = (new S(b)).toString();
        var d = a.Aa[b][c];
        delete a.Aa[b][c];
        0 === Jb(a.Aa[b]) && delete a.Aa[b];
        return d
    }

    function Ye(a) {
        Qe(a);
        A(a.Aa, function(b, d) {
            A(b, function(b, c) {
                Oe(a, d, c, b)
            })
        });
        for (var b = 0; b < a.la.length; b++) a.la[b] && We(a, b);
        for (; a.Jc.length;) b = a.Jc.shift(), Se(a, b.action, b.Pc, b.data, b.H)
    };

    function $e() {
        this.m = this.D = null
    }
    $e.prototype.dc = function(a, b) {
        if (a.e()) this.D = b, this.m = null;
        else if (null !== this.D) this.D = this.D.C(a, b);
        else {
            null == this.m && (this.m = new ge);
            var c = I(a);
            this.m.contains(c) || this.m.add(c, new $e);
            c = this.m.get(c);
            a = T(a);
            c.dc(a, b)
        }
    };

    function af(a, b) {
        if (b.e()) return a.D = null, a.m = null, !0;
        if (null !== a.D) {
            if (a.D.M()) return !1;
            var c = a.D;
            a.D = null;
            c.U(L, function(b, c) {
                a.dc(new S(b), c)
            });
            return af(a, b)
        }
        return null !== a.m ? (c = I(b), b = T(b), a.m.contains(c) && af(a.m.get(c), b) && a.m.remove(c), a.m.e() ? (a.m = null, !0) : !1) : !0
    }

    function bf(a, b, c) {
        null !== a.D ? c(b, a.D) : a.U(function(a, e) {
            var f = new S(b.toString() + "/" + a);
            bf(e, f, c)
        })
    }
    $e.prototype.U = function(a) {
        null !== this.m && he(this.m, function(b, c) {
            a(b, c)
        })
    };

    function cf() {
        this.Jd = M
    }
    cf.prototype.j = function(a) {
        return this.Jd.ra(a)
    };
    cf.prototype.toString = function() {
        return this.Jd.toString()
    };

    function df() {
        this.nb = []
    }

    function ef(a, b) {
        for (var c = null, d = 0; d < b.length; d++) {
            var e = b[d],
                f = e.Qb();
            null === c || f.ea(c.Qb()) || (a.nb.push(c), c = null);
            null === c && (c = new ff(f));
            c.add(e)
        }
        c && a.nb.push(c)
    }

    function Pc(a, b, c) {
        ef(a, c);
        gf(a, function(a) {
            return a.ea(b)
        })
    }

    function hf(a, b, c) {
        ef(a, c);
        gf(a, function(a) {
            return a.contains(b) || b.contains(a)
        })
    }

    function gf(a, b) {
        for (var c = !0, d = 0; d < a.nb.length; d++) {
            var e = a.nb[d];
            if (e)
                if (e = e.Qb(), b(e)) {
                    for (var e = a.nb[d], f = 0; f < e.kd.length; f++) {
                        var g = e.kd[f];
                        if (null !== g) {
                            e.kd[f] = null;
                            var k = g.Lb();
                            lb && hb("event: " + g.toString());
                            Cb(k)
                        }
                    }
                    a.nb[d] = null
                } else c = !1
        }
        c && (a.nb = [])
    }

    function ff(a) {
        this.Ea = a;
        this.kd = []
    }
    ff.prototype.add = function(a) {
        this.kd.push(a)
    };
    ff.prototype.Qb = function() {
        return this.Ea
    };
    var jf = "auth.firebase.com";

    function kf(a, b, c) {
        this.cd = a || {};
        this.Ud = b || {};
        this.Xa = c || {};
        this.cd.remember || (this.cd.remember = "default")
    }
    var lf = ["remember", "redirectTo"];

    function mf(a) {
        var b = {},
            c = {};
        ua(a || {}, function(a, e) {
            0 <= Ga(lf, a) ? b[a] = e : c[a] = e
        });
        return new kf(b, {}, c)
    };
    var nf = {
        NETWORK_ERROR: "Unable to contact the Firebase server.",
        SERVER_ERROR: "An unknown server error occurred.",
        TRANSPORT_UNAVAILABLE: "There are no login transports available for the requested method.",
        REQUEST_INTERRUPTED: "The browser redirected the page before the login request could complete.",
        USER_CANCELLED: "The user cancelled authentication."
    };

    function X(a) {
        var b = Error(t(nf, a), a);
        b.code = a;
        return b
    };

    function of() {
        var a = window.opener.frames,
            b;
        for (b = a.length - 1; 0 <= b; b--) try {
            if (a[b].location.protocol === window.location.protocol && a[b].location.host === window.location.host && "__winchan_relay_frame" === a[b].name) return a[b]
        } catch (c) {}
        return null
    }

    function pf(a, b, c) {
        a.attachEvent ? a.attachEvent("on" + b, c) : a.addEventListener && a.addEventListener(b, c, !1)
    }

    function qf(a, b, c) {
        a.detachEvent ? a.detachEvent("on" + b, c) : a.removeEventListener && a.removeEventListener(b, c, !1)
    }

    function rf(a) {
        /^https?:\/\//.test(a) || (a = window.location.href);
        var b = /^(https?:\/\/[\-_a-zA-Z\.0-9:]+)/.exec(a);
        return b ? b[1] : a
    }

    function sf(a) {
        var b = "";
        try {
            a = a.replace("#", "");
            var c = {},
                d = a.replace(/^\?/, "").split("&");
            for (a = 0; a < d.length; a++)
                if (d[a]) {
                    var e = d[a].split("=");
                    c[e[0]] = e[1]
                }
            c && s(c, "__firebase_request_key") && (b = t(c, "__firebase_request_key"))
        } catch (f) {}
        return b
    }

    function tf(a) {
        var b = [],
            c;
        for (c in a)
            if (s(a, c)) {
                var d = t(a, c);
                if (ea(d))
                    for (var e = 0; e < d.length; e++) b.push(encodeURIComponent(c) + "=" + encodeURIComponent(d[e]));
                else b.push(encodeURIComponent(c) + "=" + encodeURIComponent(t(a, c)))
            }
        return b ? "&" + b.join("&") : ""
    }

    function uf() {
        var a = rb(jf);
        return a.scheme + "://" + a.host + "/v2"
    }

    function vf(a) {
        return uf() + "/" + a + "/auth/channel"
    };

    function wf() {
        return !!(window.cordova || window.phonegap || window.PhoneGap) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(navigator.userAgent)
    }

    function xf() {
        var a = navigator.userAgent;
        if ("Microsoft Internet Explorer" === navigator.appName) {
            if ((a = a.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/)) && 1 < a.length) return 8 <= parseFloat(a[1])
        } else if (-1 < a.indexOf("Trident") && (a = a.match(/rv:([0-9]{2,2}[\.0-9]{0,})/)) && 1 < a.length) return 8 <= parseFloat(a[1]);
        return !1
    };

    function yf(a) {
        a.method || (a.method = "GET");
        a.headers || (a.headers = {});
        a.headers.content_type || (a.headers.content_type = "application/json");
        a.headers.content_type = a.headers.content_type.toLowerCase();
        this.options = a
    }
    yf.prototype.open = function(a, b, c) {
        function d() {
            c && (c(X("REQUEST_INTERRUPTED")), c = null)
        }
        var e = new XMLHttpRequest,
            f = this.options.method.toUpperCase(),
            g;
        pf(window, "beforeunload", d);
        e.onreadystatechange = function() {
            if (c && 4 === e.readyState) {
                var a;
                if (200 <= e.status && 300 > e.status) {
                    try {
                        a = ta(e.responseText)
                    } catch (b) {}
                    c(null, a)
                } else 500 <= e.status && 600 > e.status ? c(X("SERVER_ERROR")) : c(X("NETWORK_ERROR"));
                c = null;
                qf(window, "beforeunload", d)
            }
        };
        if ("GET" === f) a += (/\?/.test(a) ? "" : "?") + tf(b), g = null;
        else {
            var k = this.options.headers.content_type;
            "application/json" === k && (g = r(b));
            "application/x-www-form-urlencoded" === k && (g = tf(b))
        }
        e.open(f, a, !0);
        a = {
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json;text/plain"
        };
        Qd(a, this.options.headers);
        for (var l in a) e.setRequestHeader(l, a[l]);
        e.send(g)
    };
    yf.isAvailable = function() {
        return !!window.XMLHttpRequest && "string" === typeof(new XMLHttpRequest).responseType && (!(navigator.userAgent.match(/MSIE/) || navigator.userAgent.match(/Trident/)) || xf())
    };
    yf.prototype.sc = function() {
        return "json"
    };

    function zf(a) {
        this.fc = Fa() + Fa() + Fa();
        this.pf = a
    }
    zf.prototype.open = function(a, b, c) {
        function d() {
            c && (c(X("USER_CANCELLED")), c = null)
        }
        var e = this,
            f = rb(jf),
            g;
        b.requestId = this.fc;
        b.redirectTo = f.scheme + "://" + f.host + "/blank/page.html";
        a += /\?/.test(a) ? "" : "?";
        a += tf(b);
        (g = window.open(a, "_blank", "location=no")) && ha(g.addEventListener) ? (g.addEventListener("loadstart", function(a) {
            var b;
            if (b = a && a.url) a: {
                var n = a.url;
                try {
                    var u = document.createElement("a");
                    u.href = n;
                    b = u.host === f.host && "/blank/page.html" === u.pathname;
                    break a
                } catch (x) {}
                b = !1
            }
            b && (a = sf(a.url), g.removeEventListener("exit",
                d), g.close(), a = new kf(null, null, {
                requestId: e.fc,
                requestKey: a
            }), e.pf.requestWithCredential("/auth/session", a, c), c = null)
        }), g.addEventListener("exit", d)) : c(X("TRANSPORT_UNAVAILABLE"))
    };
    zf.isAvailable = function() {
        return wf()
    };
    zf.prototype.sc = function() {
        return "redirect"
    };

    function Af(a) {
        if (!a.window_features || -1 !== navigator.userAgent.indexOf("Fennec/") || -1 !== navigator.userAgent.indexOf("Firefox/") && -1 !== navigator.userAgent.indexOf("Android")) a.window_features = void 0;
        a.window_name || (a.window_name = "_blank");
        this.options = a
    }
    Af.prototype.open = function(a, b, c) {
        function d(a) {
            g && (document.body.removeChild(g), g = void 0);
            u && (u = clearInterval(u));
            qf(window, "message", e);
            qf(window, "unload", d);
            if (n && !a) try {
                n.close()
            } catch (b) {
                k.postMessage("die", l)
            }
            n = k = void 0
        }

        function e(a) {
            if (a.origin === l) try {
                var b = ta(a.data);
                "ready" === b.a ? k.postMessage(x, l) : "error" === b.a ? (d(!1), c && (c(b.d), c = null)) : "response" === b.a && (d(b.forceKeepWindowOpen), c && (c(null, b.d), c = null))
            } catch (e) {}
        }
        var f = xf(),
            g, k;
        if (!this.options.relay_url) return c(Error("invalid arguments: origin of url and relay_url must match"));
        var l = rf(a);
        if (l !== rf(this.options.relay_url)) c && setTimeout(function() {
            c(Error("invalid arguments: origin of url and relay_url must match"))
        }, 0);
        else {
            f && (g = document.createElement("iframe"), g.setAttribute("src", this.options.relay_url), g.style.display = "none", g.setAttribute("name", "__winchan_relay_frame"), document.body.appendChild(g), k = g.contentWindow);
            a += (/\?/.test(a) ? "" : "?") + tf(b);
            var n = window.open(a, this.options.window_name, this.options.window_features);
            k || (k = n);
            var u = setInterval(function() {
                    n && n.closed &&
                        (d(!1), c && (c(X("USER_CANCELLED")), c = null))
                }, 500),
                x = r({
                    a: "request",
                    d: b
                });
            pf(window, "unload", d);
            pf(window, "message", e)
        }
    };
    Af.isAvailable = function() {
        return "postMessage" in window && !/^file:\//.test(location.href) && !(wf() || navigator.userAgent.match(/Windows Phone/) || window.Windows && /^ms-appx:/.test(location.href) || navigator.userAgent.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i) || navigator.userAgent.match(/CriOS/) || navigator.userAgent.match(/Twitter for iPhone/) || navigator.userAgent.match(/FBAN\/FBIOS/) || window.navigator.standalone) && !navigator.userAgent.match(/PhantomJS/)
    };
    Af.prototype.sc = function() {
        return "popup"
    };

    function Bf(a) {
        a.callback_parameter || (a.callback_parameter = "callback");
        this.options = a;
        window.__firebase_auth_jsonp = window.__firebase_auth_jsonp || {}
    }
    Bf.prototype.open = function(a, b, c) {
        function d() {
            c && (c(X("REQUEST_INTERRUPTED")), c = null)
        }

        function e() {
            setTimeout(function() {
                window.__firebase_auth_jsonp[f] = void 0;
                Nd(window.__firebase_auth_jsonp) && (window.__firebase_auth_jsonp = void 0);
                try {
                    var a = document.getElementById(f);
                    a && a.parentNode.removeChild(a)
                } catch (b) {}
            }, 1);
            qf(window, "beforeunload", d)
        }
        var f = "fn" + (new Date).getTime() + Math.floor(99999 * Math.random());
        b[this.options.callback_parameter] = "__firebase_auth_jsonp." + f;
        a += (/\?/.test(a) ? "" : "?") + tf(b);
        pf(window, "beforeunload", d);
        window.__firebase_auth_jsonp[f] = function(a) {
            c && (c(null, a), c = null);
            e()
        };
        Cf(f, a, c)
    };

    function Cf(a, b, c) {
        setTimeout(function() {
            try {
                var d = document.createElement("script");
                d.type = "text/javascript";
                d.id = a;
                d.async = !0;
                d.src = b;
                d.onerror = function() {
                    var b = document.getElementById(a);
                    null !== b && b.parentNode.removeChild(b);
                    c && c(X("NETWORK_ERROR"))
                };
                var e = document.getElementsByTagName("head");
                (e && 0 != e.length ? e[0] : document.documentElement).appendChild(d)
            } catch (f) {
                c && c(X("NETWORK_ERROR"))
            }
        }, 0)
    }
    Bf.isAvailable = function() {
        return !wf()
    };
    Bf.prototype.sc = function() {
        return "json"
    };

    function Df(a, b) {
        this.Je = ["session", a.Dd, a.tb].join(":");
        this.Rd = b
    }
    Df.prototype.set = function(a, b) {
        if (!b)
            if (this.Rd.length) b = this.Rd[0];
            else throw Error("fb.login.SessionManager : No storage options available!");
        b.set(this.Je, a)
    };
    Df.prototype.get = function() {
        var a = Ja(this.Rd, q(this.Zf, this)),
            a = Ia(a, function(a) {
                return null !== a
            });
        Qa(a, function(a, c) {
            return He(c.token) - He(a.token)
        });
        return 0 < a.length ? a.shift() : null
    };
    Df.prototype.Zf = function(a) {
        try {
            var b = a.get(this.Je);
            if (b && b.token) return b
        } catch (c) {}
        return null
    };
    Df.prototype.clear = function() {
        var a = this;
        Ha(this.Rd, function(b) {
            b.remove(a.Je)
        })
    };

    function Ef(a) {
        this.fc = Fa() + Fa() + Fa();
        this.pf = a
    }
    Ef.prototype.open = function(a, b) {
        v.set("redirect_request_id", this.fc);
        v.set("redirect_request_id", this.fc);
        b.requestId = this.fc;
        b.redirectTo = b.redirectTo || window.location.href;
        a += (/\?/.test(a) ? "" : "?") + tf(b);
        window.location = a
    };
    Ef.isAvailable = function() {
        return !/^file:\//.test(location.href) && !wf()
    };
    Ef.prototype.sc = function() {
        return "redirect"
    };

    function Ff(a, b, c, d) {
        Fd.call(this, ["auth_status"]);
        this.O = a;
        this.We = b;
        this.Cg = c;
        this.Ee = d;
        this.ic = new Df(a, [za, v]);
        this.hb = null;
        Gf(this)
    }
    ma(Ff, Fd);
    h = Ff.prototype;
    h.ne = function() {
        return this.hb || null
    };

    function Gf(a) {
        v.get("redirect_request_id") && Hf(a);
        var b = a.ic.get();
        b && b.token ? (If(a, b), a.We(b.token, function(c, d) {
            Jf(a, c, d, !1, b.token, b)
        }, function(b, d) {
            Kf(a, "resumeSession()", b, d)
        })) : If(a, null)
    }

    function Lf(a, b, c, d, e, f) {
        "firebaseio-demo.com" === a.O.domain && z("Firebase authentication is not supported on demo Firebases (*.firebaseio-demo.com). To secure your Firebase, create a production Firebase at https://www.firebase.com.");
        a.We(b, function(f, k) {
            Jf(a, f, k, !0, b, c, d || {}, e)
        }, function(b, c) {
            Kf(a, "auth()", b, c, f)
        })
    }

    function Mf(a, b) {
        a.ic.clear();
        If(a, null);
        a.Cg(function(a, d) {
            if ("ok" === a) B(b, null);
            else {
                var e = (a || "error").toUpperCase(),
                    f = e;
                d && (f += ": " + d);
                f = Error(f);
                f.code = e;
                B(b, f)
            }
        })
    }

    function Jf(a, b, c, d, e, f, g, k) {
        "ok" === b ? (d && (b = c.auth, f.auth = b, f.expires = c.expires, f.token = Ie(e) ? e : "", c = null, b && s(b, "uid") ? c = t(b, "uid") : s(f, "uid") && (c = t(f, "uid")), f.uid = c, c = "custom", b && s(b, "provider") ? c = t(b, "provider") : s(f, "provider") && (c = t(f, "provider")), f.provider = c, a.ic.clear(), Ie(e) && (g = g || {}, c = za, "sessionOnly" === g.remember && (c = v), "none" !== g.remember && a.ic.set(f, c)), If(a, f)), B(k, null, f)) : (a.ic.clear(), If(a, null), f = a = (b || "error").toUpperCase(), c && (f += ": " + c), f = Error(f), f.code = a, B(k, f))
    }

    function Kf(a, b, c, d, e) {
        z(b + " was canceled: " + d);
        a.ic.clear();
        If(a, null);
        a = Error(d);
        a.code = c.toUpperCase();
        B(e, a)
    }

    function Nf(a, b, c, d, e) {
        Of(a);
        c = new kf(d || {}, {}, c || {});
        Pf(a, [yf, Bf], "/auth/" + b, c, e)
    }

    function Qf(a, b, c, d) {
        Of(a);
        var e = [Af, zf];
        c = mf(c);
        "anonymous" === b || "password" === b ? setTimeout(function() {
            B(d, X("TRANSPORT_UNAVAILABLE"))
        }, 0) : (c.Ud.window_features = "menubar=yes,modal=yes,alwaysRaised=yeslocation=yes,resizable=yes,scrollbars=yes,status=yes,height=625,width=625,top=" + ("object" === typeof screen ? .5 * (screen.height - 625) : 0) + ",left=" + ("object" === typeof screen ? .5 * (screen.width - 625) : 0), c.Ud.relay_url = vf(a.O.tb), c.Ud.requestWithCredential = q(a.gc, a), Pf(a, e, "/auth/" + b, c, d))
    }

    function Hf(a) {
        var b = v.get("redirect_request_id");
        if (b) {
            var c = v.get("redirect_client_options");
            v.remove("redirect_request_id");
            v.remove("redirect_client_options");
            var d = [yf, Bf],
                b = {
                    requestId: b,
                    requestKey: sf(document.location.hash)
                },
                c = new kf(c, {}, b);
            try {
                document.location.hash = document.location.hash.replace(/&__firebase_request_key=([a-zA-z0-9]*)/, "")
            } catch (e) {}
            Pf(a, d, "/auth/session", c)
        }
    }
    h.je = function(a, b) {
        Of(this);
        var c = mf(a);
        c.Xa._method = "POST";
        this.gc("/users", c, function(a, c) {
            a ? B(b, a) : B(b, a, c)
        })
    };
    h.Le = function(a, b) {
        var c = this;
        Of(this);
        var d = "/users/" + encodeURIComponent(a.email),
            e = mf(a);
        e.Xa._method = "DELETE";
        this.gc(d, e, function(a, d) {
            !a && d && d.uid && c.hb && c.hb.uid && c.hb.uid === d.uid && Mf(c);
            B(b, a)
        })
    };
    h.ee = function(a, b) {
        Of(this);
        var c = "/users/" + encodeURIComponent(a.email) + "/password",
            d = mf(a);
        d.Xa._method = "PUT";
        d.Xa.password = a.newPassword;
        this.gc(c, d, function(a) {
            B(b, a)
        })
    };
    h.de = function(a, b) {
        Of(this);
        var c = "/users/" + encodeURIComponent(a.oldEmail) + "/email",
            d = mf(a);
        d.Xa._method = "PUT";
        d.Xa.email = a.newEmail;
        d.Xa.password = a.password;
        this.gc(c, d, function(a) {
            B(b, a)
        })
    };
    h.Me = function(a, b) {
        Of(this);
        var c = "/users/" + encodeURIComponent(a.email) + "/password",
            d = mf(a);
        d.Xa._method = "POST";
        this.gc(c, d, function(a) {
            B(b, a)
        })
    };
    h.gc = function(a, b, c) {
        Rf(this, [yf, Bf], a, b, c)
    };

    function Pf(a, b, c, d, e) {
        Rf(a, b, c, d, function(b, c) {
            !b && c && c.token && c.uid ? Lf(a, c.token, c, d.cd, function(a, b) {
                a ? B(e, a) : B(e, null, b)
            }) : B(e, b || X("UNKNOWN_ERROR"))
        })
    }

    function Rf(a, b, c, d, e) {
        b = Ia(b, function(a) {
            return "function" === typeof a.isAvailable && a.isAvailable()
        });
        0 === b.length ? setTimeout(function() {
            B(e, X("TRANSPORT_UNAVAILABLE"))
        }, 0) : (b = new(b.shift())(d.Ud), d = va(d.Xa), d.v = "js-2.1.2", d.transport = b.sc(), d.suppress_status_codes = !0, a = uf() + "/" + a.O.tb + c, b.open(a, d, function(a, b) {
            if (a) B(e, a);
            else if (b && b.error) {
                var c = Error(b.error.message);
                c.code = b.error.code;
                c.details = b.error.details;
                B(e, c)
            } else B(e, null, b)
        }))
    }

    function If(a, b) {
        var c = null !== a.hb || null !== b;
        a.hb = b;
        c && a.Vd("auth_status", b);
        a.Ee(null !== b)
    }
    h.qe = function(a) {
        y("auth_status" === a, 'initial event must be of type "auth_status"');
        return [this.hb]
    };

    function Of(a) {
        var b = a.O;
        if ("firebaseio.com" !== b.domain && "firebaseio-demo.com" !== b.domain && "auth.firebase.com" === jf) throw Error("This custom Firebase server ('" + a.O.domain + "') does not support delegated login.");
    };

    function Sf(a, b) {
        return a && "object" === typeof a ? (y(".sv" in a, "Unexpected leaf node or priority contents"), b[a[".sv"]]) : a
    }

    function Tf(a, b) {
        var c = new $e;
        bf(a, new S(""), function(a, e) {
            c.dc(a, Uf(e, b))
        });
        return c
    }

    function Uf(a, b) {
        var c = a.L().I(),
            c = Sf(c, b),
            d;
        if (a.M()) {
            var e = Sf(a.za(), b);
            return e !== a.za() || c !== a.L().I() ? new nd(e, O(c)) : a
        }
        d = a;
        c !== a.L().I() && (d = d.Z(new nd(c)));
        a.U(L, function(a, c) {
            var e = Uf(c, b);
            e !== c && (d = d.P(a, e))
        });
        return d
    };

    function wc(a, b, c) {
        this.A = a;
        this.aa = b;
        this.yc = c
    }

    function Vf(a) {
        return a.aa
    }

    function vc(a, b) {
        return a.aa && !a.yc || a.A.Da(b)
    }
    wc.prototype.j = function() {
        return this.A
    };

    function Wf(a, b) {
        this.F = a;
        this.Ld = b
    }

    function Xf(a, b, c, d) {
        return new Wf(new wc(b, c, d), a.Ld)
    }

    function Yf(a) {
        return a.F.aa ? a.F.j() : null
    }
    Wf.prototype.u = function() {
        return this.Ld
    };

    function xc(a) {
        return a.Ld.aa ? a.Ld.j() : null
    };

    function Zf(a, b) {
        this.Yd = a;
        this.Of = b
    }

    function $f(a) {
        this.G = a
    }
    $f.prototype.Ya = function(a, b, c, d) {
        var e = new yc,
            f;
        if (b.type === ag) b.source.me ? c = bg(this, a, b.path, b.Ga, c, d, e) : (y(b.source.df, "Unknown source."), f = b.source.Se, c = cg(this, a, b.path, b.Ga, c, d, f, e));
        else if (b.type === dg) b.source.me ? c = eg(this, a, b.path, b.children, c, d, e) : (y(b.source.df, "Unknown source."), f = b.source.Se, c = fg(this, a, b.path, b.children, c, d, f, e));
        else if (b.type === gg)
            if (b.Ne)
                if (f = b.path, null != c.jc(f)) c = a;
                else {
                    b = new uc(c, a, d);
                    d = a.F.j();
                    if (f.e() || ".priority" === I(f)) Vf(a.u()) ? b = c.pa(xc(a)) : (b = a.u().j(),
                        y(b instanceof W, "serverChildren would be complete if leaf node"), b = c.pc(b)), b = this.G.oa(d, b, e);
                    else {
                        f = I(f);
                        var g = c.Ta(f, a.u());
                        null == g && vc(a.u(), f) && (g = d.K(f));
                        b = null != g ? this.G.C(d, f, g, b, e) : a.F.j().Da(f) ? this.G.C(d, f, M, b, e) : d;
                        b.e() && Vf(a.u()) && (d = c.pa(xc(a)), d.M() && (b = this.G.oa(b, d, e)))
                    }
                    d = Vf(a.u()) || null != c.jc(U);
                    c = Xf(a, b, d, this.G.ya())
                }
        else c = hg(this, a, b.path, c, d, e);
        else if (b.type === ig) d = b.path, b = a.u(), f = b.j(), g = b.aa || d.e(), c = jg(this, new Wf(a.F, new wc(f, g, b.yc)), d, c, tc, e);
        else throw fb("Unknown operation type: " +
            b.type);
        e = Jd(e.Za);
        d = c;
        b = d.F;
        b.aa && (f = b.j().M() || b.j().e(), g = Yf(a), (0 < e.length || !a.F.aa || f && !b.j().ea(g) || !b.j().L().ea(g.L())) && e.push(Fb(Yf(d))));
        return new Zf(c, e)
    };

    function jg(a, b, c, d, e, f) {
        var g = b.F;
        if (null != d.jc(c)) return b;
        var k;
        if (c.e()) y(Vf(b.u()), "If change path is empty, we must have complete server data"), a.G.ya() ? (e = xc(b), d = d.pc(e instanceof W ? e : M)) : d = d.pa(xc(b)), f = a.G.oa(b.F.j(), d, f);
        else {
            var l = I(c);
            if (".priority" == l) y(1 == Qc(c), "Can't have a priority with additional path components"), f = g.j(), k = b.u().j(), d = d.$c(c, f, k), f = null != d ? a.G.Z(f, d) : g.j();
            else {
                var n = T(c);
                vc(g, l) ? (k = b.u().j(), d = d.$c(c, g.j(), k), d = null != d ? g.j().K(l).C(n, d) : g.j().K(l)) : d = d.Ta(l, b.u());
                f = null != d ? a.G.C(g.j(), l, d, e, f) : g.j()
            }
        }
        return Xf(b, f, g.aa || c.e(), a.G.ya())
    }

    function cg(a, b, c, d, e, f, g, k) {
        var l = b.u();
        g = g ? a.G : a.G.Mb();
        if (c.e()) d = g.oa(l.j(), d, null);
        else if (g.ya() && !l.yc) d = l.j().C(c, d), d = g.oa(l.j(), d, null);
        else {
            var n = I(c);
            if ((c.e() ? !l.aa || l.yc : !vc(l, I(c))) && 1 < Qc(c)) return b;
            d = l.j().K(n).C(T(c), d);
            d = ".priority" == n ? g.Z(l.j(), d) : g.C(l.j(), n, d, tc, null)
        }
        l = l.aa || c.e();
        b = new Wf(b.F, new wc(d, l, g.ya()));
        return jg(a, b, c, e, new uc(e, b, f), k)
    }

    function bg(a, b, c, d, e, f, g) {
        var k = b.F;
        e = new uc(e, b, f);
        if (c.e()) g = a.G.oa(b.F.j(), d, g), a = Xf(b, g, !0, a.G.ya());
        else if (f = I(c), ".priority" === f) g = a.G.Z(b.F.j(), d), a = Xf(b, g, k.aa, k.yc);
        else {
            var l = T(c);
            c = k.j().K(f);
            if (!l.e()) {
                var n = e.ef(f);
                d = null != n ? ".priority" === Rc(l) && n.ra(l.parent()).e() ? n : n.C(l, d) : M
            }
            c.ea(d) ? a = b : (g = a.G.C(k.j(), f, d, e, g), a = Xf(b, g, k.aa, a.G.ya()))
        }
        return a
    }

    function eg(a, b, c, d, e, f, g) {
        var k = b;
        kg(d, function(d, n) {
            var u = c.o(d);
            vc(b.F, I(u)) && (k = bg(a, k, u, n, e, f, g))
        });
        kg(d, function(d, n) {
            var u = c.o(d);
            vc(b.F, I(u)) || (k = bg(a, k, u, n, e, f, g))
        });
        return k
    }

    function lg(a, b) {
        kg(b, function(b, d) {
            a = a.C(b, d)
        });
        return a
    }

    function fg(a, b, c, d, e, f, g, k) {
        if (b.u().j().e() && !Vf(b.u())) return b;
        var l = b;
        c = c.e() ? d : mg(ng, c, d);
        var n = b.u().j();
        c.children.fa(function(c, d) {
            if (n.Da(c)) {
                var E = b.u().j().K(c),
                    E = lg(E, d);
                l = cg(a, l, new S(c), E, e, f, g, k)
            }
        });
        c.children.fa(function(c, d) {
            var E = !Vf(b.u()) && null == d.value;
            n.Da(c) || E || (E = b.u().j().K(c), E = lg(E, d), l = cg(a, l, new S(c), E, e, f, g, k))
        });
        return l
    }

    function hg(a, b, c, d, e, f) {
        if (null != d.jc(c)) return b;
        var g = new uc(d, b, e),
            k = e = b.F.j();
        if (Vf(b.u())) {
            if (c.e()) e = d.pa(xc(b)), k = a.G.oa(b.F.j(), e, f);
            else if (".priority" === I(c)) {
                var l = d.Ta(I(c), b.u());
                null == l || e.e() || e.L().ea(l) || (k = a.G.Z(e, l))
            } else l = I(c), e = d.Ta(l, b.u()), null != e && (k = a.G.C(b.F.j(), l, e, g, f));
            e = !0
        } else b.F.aa ? (k = e, e = Yf(b), e.M() || e.U(L, function(c) {
            var e = d.Ta(c, b.u());
            null != e && (k = a.G.C(k, c, e, g, f))
        }), e = !0) : (!c.e() && (l = I(c), 1 == Qc(c) || vc(b.F, l)) && (c = d.Ta(l, b.u()), null != c && (k = a.G.C(e, l, c, g, f))),
            e = !1);
        return Xf(b, k, e, a.G.ya())
    };

    function og(a) {
        this.V = a;
        this.g = a.n.g
    }

    function pg(a, b, c, d) {
        var e = [],
            f = [];
        Ha(b, function(b) {
            "child_changed" === b.type && a.g.jf(b.De, b.Ha) && f.push(new C("child_moved", b.Ha, b.Ua))
        });
        qg(a, e, "child_removed", b, d, c);
        qg(a, e, "child_added", b, d, c);
        qg(a, e, "child_moved", f, d, c);
        qg(a, e, "child_changed", b, d, c);
        qg(a, e, Gb, b, d, c);
        return e
    }

    function qg(a, b, c, d, e, f) {
        d = Ia(d, function(a) {
            return a.type === c
        });
        Qa(d, q(a.Qf, a));
        Ha(d, function(c) {
            var d = rg(a, c, f);
            Ha(e, function(e) {
                e.wf(c.type) && b.push(e.createEvent(d, a.V))
            })
        })
    }

    function rg(a, b, c) {
        "value" !== b.type && "child_removed" !== b.type && (b.Fd = c.ff(b.Ua, b.Ha, a.g));
        return b
    }
    og.prototype.Qf = function(a, b) {
        if (null == a.Ua || null == b.Ua) throw fb("Should only compare child_ events.");
        return this.g.compare(new N(a.Ua, a.Ha), new N(b.Ua, b.Ha))
    };

    function sg(a, b) {
        this.V = a;
        var c = a.n,
            d = new bc(c.g),
            c = Jc(c) ? new bc(c.g) : c.ka ? new Ac(c) : new dc(c);
        this.sf = new $f(c);
        var e = b.u(),
            f = b.F,
            g = d.oa(M, e.j(), null),
            k = c.oa(M, f.j(), null);
        this.Ia = new Wf(new wc(k, f.aa, c.ya()), new wc(g, e.aa, d.ya()));
        this.Va = [];
        this.Uf = new og(a)
    }

    function tg(a) {
        return a.V
    }
    h = sg.prototype;
    h.u = function() {
        return this.Ia.u().j()
    };
    h.bb = function(a) {
        var b = xc(this.Ia);
        return b && (Jc(this.V.n) || !a.e() && !b.K(I(a)).e()) ? b.ra(a) : null
    };
    h.e = function() {
        return 0 === this.Va.length
    };
    h.Gb = function(a) {
        this.Va.push(a)
    };
    h.gb = function(a, b) {
        var c = [];
        if (b) {
            y(null == a, "A cancel should cancel all event registrations.");
            var d = this.V.path;
            Ha(this.Va, function(a) {
                (a = a.Ye(b, d)) && c.push(a)
            })
        }
        if (a) {
            for (var e = [], f = 0; f < this.Va.length; ++f) {
                var g = this.Va[f];
                if (!g.matches(a)) e.push(g);
                else if (a.hf()) {
                    e = e.concat(this.Va.slice(f + 1));
                    break
                }
            }
            this.Va = e
        } else this.Va = [];
        return c
    };
    h.Ya = function(a, b, c) {
        a.type === dg && null !== a.source.yb && (y(xc(this.Ia), "We should always have a full cache before handling merges"), y(Yf(this.Ia), "Missing event cache, even though we have a server cache"));
        var d = this.Ia;
        a = this.sf.Ya(d, a, b, c);
        b = this.sf;
        c = a.Yd;
        y(c.F.j().Bc(b.G.g), "Event snap not indexed");
        y(c.u().j().Bc(b.G.g), "Server snap not indexed");
        y(Vf(a.Yd.u()) || !Vf(d.u()), "Once a server snap is complete, it should never go back");
        this.Ia = a.Yd;
        return ug(this, a.Of, a.Yd.F.j(), null)
    };

    function vg(a, b) {
        var c = a.Ia.F,
            d = [];
        c.j().M() || c.j().U(L, function(a, b) {
            d.push(new C("child_added", b, a))
        });
        c.aa && d.push(Fb(c.j()));
        return ug(a, d, c.j(), b)
    }

    function ug(a, b, c, d) {
        return pg(a.Uf, b, c, d ? [d] : a.Va)
    };

    function wg(a, b) {
        this.value = a;
        this.children = b || xg
    }
    var xg = new Zc(function(a, b) {
            return a === b ? 0 : a < b ? -1 : 1
        }),
        ng = new wg(null);

    function yg(a) {
        var b = ng;
        A(a, function(a, d) {
            b = b.set(new S(d), a)
        });
        return b
    }
    h = wg.prototype;
    h.e = function() {
        return null === this.value && this.children.e()
    };

    function zg(a, b, c) {
        if (null != a.value && c(a.value)) return {
            path: U,
            value: a.value
        };
        if (b.e()) return null;
        var d = I(b);
        a = a.children.get(d);
        return null !== a ? (b = zg(a, T(b), c), null != b ? {
            path: (new S(d)).o(b.path),
            value: b.value
        } : null) : null
    }

    function Ag(a, b) {
        return zg(a, b, function() {
            return !0
        })
    }
    h.subtree = function(a) {
        if (a.e()) return this;
        var b = this.children.get(I(a));
        return null !== b ? b.subtree(T(a)) : ng
    };
    h.set = function(a, b) {
        if (a.e()) return new wg(b, this.children);
        var c = I(a),
            d = (this.children.get(c) || ng).set(T(a), b),
            c = this.children.La(c, d);
        return new wg(this.value, c)
    };
    h.remove = function(a) {
        if (a.e()) return this.children.e() ? ng : new wg(null, this.children);
        var b = I(a),
            c = this.children.get(b);
        return c ? (a = c.remove(T(a)), b = a.e() ? this.children.remove(b) : this.children.La(b, a), null === this.value && b.e() ? ng : new wg(this.value, b)) : this
    };
    h.get = function(a) {
        if (a.e()) return this.value;
        var b = this.children.get(I(a));
        return b ? b.get(T(a)) : null
    };

    function mg(a, b, c) {
        if (b.e()) return c;
        var d = I(b);
        b = mg(a.children.get(d) || ng, T(b), c);
        d = b.e() ? a.children.remove(d) : a.children.La(d, b);
        return new wg(a.value, d)
    }

    function Bg(a, b) {
        return Cg(a, U, b)
    }

    function Cg(a, b, c) {
        var d = {};
        a.children.fa(function(a, f) {
            d[a] = Cg(f, b.o(a), c)
        });
        return c(b, a.value, d)
    }

    function Dg(a, b, c) {
        return Eg(a, b, U, c)
    }

    function Eg(a, b, c, d) {
        var e = a.value ? d(c, a.value) : !1;
        if (e) return e;
        if (b.e()) return null;
        e = I(b);
        return (a = a.children.get(e)) ? Eg(a, T(b), c.o(e), d) : null
    }

    function Fg(a, b, c) {
        if (!b.e()) {
            var d = !0;
            a.value && (d = c(U, a.value));
            !0 === d && (d = I(b), (a = a.children.get(d)) && Gg(a, T(b), U.o(d), c))
        }
    }

    function Gg(a, b, c, d) {
        if (b.e()) return a;
        a.value && d(c, a.value);
        var e = I(b);
        return (a = a.children.get(e)) ? Gg(a, T(b), c.o(e), d) : ng
    }

    function kg(a, b) {
        Hg(a, U, b)
    }

    function Hg(a, b, c) {
        a.children.fa(function(a, e) {
            Hg(e, b.o(a), c)
        });
        a.value && c(b, a.value)
    }

    function Ig(a, b) {
        a.children.fa(function(a, d) {
            d.value && b(a, d.value)
        })
    }
    h.toString = function() {
        var a = {};
        kg(this, function(b, c) {
            a[b.toString()] = c.toString()
        });
        return r(a)
    };

    function Jg() {
        this.va = {}
    }
    h = Jg.prototype;
    h.e = function() {
        return Nd(this.va)
    };
    h.Ya = function(a, b, c) {
        var d = a.source.yb;
        if (null !== d) return d = t(this.va, d), y(null != d, "SyncTree gave us an op for an invalid query."), d.Ya(a, b, c);
        var e = [];
        A(this.va, function(d) {
            e = e.concat(d.Ya(a, b, c))
        });
        return e
    };
    h.Gb = function(a, b, c, d, e) {
        var f = a.Fa(),
            g = t(this.va, f);
        if (!g) {
            var g = c.pa(e ? d : null),
                k = !1;
            g ? k = !0 : (g = d instanceof W ? c.pc(d) : M, k = !1);
            g = new sg(a, new Wf(new wc(g, k, !1), new wc(d, e, !1)));
            this.va[f] = g
        }
        g.Gb(b);
        return vg(g, b)
    };
    h.gb = function(a, b, c) {
        var d = a.Fa(),
            e = [],
            f = [],
            g = null != Kg(this);
        if ("default" === d) {
            var k = this;
            A(this.va, function(a, d) {
                f = f.concat(a.gb(b, c));
                a.e() && (delete k.va[d], Jc(a.V.n) || e.push(a.V))
            })
        } else {
            var l = t(this.va, d);
            l && (f = f.concat(l.gb(b, c)), l.e() && (delete this.va[d], Jc(l.V.n) || e.push(l.V)))
        }
        g && null == Kg(this) && e.push(new R(a.k, a.path));
        return {
            rg: e,
            Vf: f
        }
    };

    function Lg(a) {
        return Ia(Jd(a.va), function(a) {
            return !Jc(a.V.n)
        })
    }
    h.bb = function(a) {
        var b = null;
        A(this.va, function(c) {
            b = b || c.bb(a)
        });
        return b
    };

    function Mg(a, b) {
        if (Jc(b.n)) return Kg(a);
        var c = b.Fa();
        return t(a.va, c)
    }

    function Kg(a) {
        return Md(a.va, function(a) {
            return Jc(a.V.n)
        }) || null
    };

    function Ng(a) {
        this.W = a
    }
    var Og = new Ng(new wg(null));

    function Pg(a, b, c) {
        if (b.e()) return new Ng(new wg(c));
        var d = Ag(a.W, b);
        if (null != d) {
            var e = d.path,
                d = d.value;
            b = V(e, b);
            d = d.C(b, c);
            return new Ng(a.W.set(e, d))
        }
        a = mg(a.W, b, new wg(c));
        return new Ng(a)
    }

    function Qg(a, b, c) {
        var d = a;
        ua(c, function(a, c) {
            d = Pg(d, b.o(a), c)
        });
        return d
    }
    Ng.prototype.Gd = function(a) {
        if (a.e()) return Og;
        a = mg(this.W, a, ng);
        return new Ng(a)
    };

    function Rg(a, b) {
        var c = Ag(a.W, b);
        return null != c ? a.W.get(c.path).ra(V(c.path, b)) : null
    }

    function Sg(a) {
        var b = [],
            c = a.W.value;
        null != c ? c.M() || c.U(L, function(a, c) {
            b.push(new N(a, c))
        }) : a.W.children.fa(function(a, c) {
            null != c.value && b.push(new N(a, c.value))
        });
        return b
    }

    function Tg(a, b) {
        if (b.e()) return a;
        var c = Rg(a, b);
        return null != c ? new Ng(new wg(c)) : new Ng(a.W.subtree(b))
    }
    Ng.prototype.e = function() {
        return this.W.e()
    };
    Ng.prototype.apply = function(a) {
        return Ug(U, this.W, a)
    };

    function Ug(a, b, c) {
        if (null != b.value) return c.C(a, b.value);
        var d = null;
        b.children.fa(function(b, f) {
            ".priority" === b ? (y(null !== f.value, "Priority writes must always be leaf nodes"), d = f.value) : c = Ug(a.o(b), f, c)
        });
        c.ra(a).e() || null === d || (c = c.C(a.o(".priority"), d));
        return c
    };

    function Vg() {
        this.T = Og;
        this.wa = [];
        this.Ec = -1
    }
    h = Vg.prototype;
    h.Gd = function(a) {
        var b = Na(this.wa, function(b) {
            return b.Zd === a
        });
        y(0 <= b, "removeWrite called with nonexistent writeId.");
        var c = this.wa[b];
        this.wa.splice(b, 1);
        for (var d = c.visible, e = !1, f = this.wa.length - 1; d && 0 <= f;) {
            var g = this.wa[f];
            g.visible && (f >= b && Wg(g, c.path) ? d = !1 : c.path.contains(g.path) && (e = !0));
            f--
        }
        if (d) {
            if (e) this.T = Xg(this.wa, Yg, U), this.Ec = 0 < this.wa.length ? this.wa[this.wa.length - 1].Zd : -1;
            else if (c.Ga) this.T = this.T.Gd(c.path);
            else {
                var k = this;
                A(c.children, function(a, b) {
                    k.T = k.T.Gd(c.path.o(b))
                })
            }
            return c.path
        }
        return null
    };
    h.pa = function(a, b, c, d) {
        if (c || d) {
            var e = Tg(this.T, a);
            return !d && e.e() ? b : d || null != b || null != Rg(e, U) ? (e = Xg(this.wa, function(b) {
                return (b.visible || d) && (!c || !(0 <= Ga(c, b.Zd))) && (b.path.contains(a) || a.contains(b.path))
            }, a), b = b || M, e.apply(b)) : null
        }
        e = Rg(this.T, a);
        if (null != e) return e;
        e = Tg(this.T, a);
        return e.e() ? b : null != b || null != Rg(e, U) ? (b = b || M, e.apply(b)) : null
    };
    h.pc = function(a, b) {
        var c = M,
            d = Rg(this.T, a);
        if (d) d.M() || d.U(L, function(a, b) {
            c = c.P(a, b)
        });
        else if (b) {
            var e = Tg(this.T, a);
            b.U(L, function(a, b) {
                var d = Tg(e, new S(a)).apply(b);
                c = c.P(a, d)
            });
            Ha(Sg(e), function(a) {
                c = c.P(a.name, a.Y)
            })
        } else e = Tg(this.T, a), Ha(Sg(e), function(a) {
            c = c.P(a.name, a.Y)
        });
        return c
    };
    h.$c = function(a, b, c, d) {
        y(c || d, "Either existingEventSnap or existingServerSnap must exist");
        a = a.o(b);
        if (null != Rg(this.T, a)) return null;
        a = Tg(this.T, a);
        return a.e() ? d.ra(b) : a.apply(d.ra(b))
    };
    h.Ta = function(a, b, c) {
        a = a.o(b);
        var d = Rg(this.T, a);
        return null != d ? d : vc(c, b) ? Tg(this.T, a).apply(c.j().K(b)) : null
    };
    h.jc = function(a) {
        return Rg(this.T, a)
    };
    h.ce = function(a, b, c, d, e, f) {
        var g;
        a = Tg(this.T, a);
        g = Rg(a, U);
        if (null == g)
            if (null != b) g = a.apply(b);
            else return [];
        g = g.Fb(f);
        if (g.e() || g.M()) return [];
        b = [];
        a = mc(f);
        e = e ? g.Rb(c, f) : g.Pb(c, f);
        for (f = P(e); f && b.length < d;) 0 !== a(f, c) && b.push(f), f = P(e);
        return b
    };

    function Wg(a, b) {
        return a.Ga ? a.path.contains(b) : !!Ld(a.children, function(c, d) {
            return a.path.o(d).contains(b)
        })
    }

    function Yg(a) {
        return a.visible
    }

    function Xg(a, b, c) {
        for (var d = Og, e = 0; e < a.length; ++e) {
            var f = a[e];
            if (b(f)) {
                var g = f.path;
                if (f.Ga) c.contains(g) ? (g = V(c, g), d = Pg(d, g, f.Ga)) : g.contains(c) && (g = V(g, c), d = Pg(d, U, f.Ga.ra(g)));
                else if (f.children)
                    if (c.contains(g)) g = V(c, g), d = Qg(d, g, f.children);
                    else {
                        if (g.contains(c))
                            if (g = V(g, c), g.e()) d = Qg(d, U, f.children);
                            else if (f = t(f.children, I(g))) f = f.ra(T(g)), d = Pg(d, U, f)
                    }
                else throw fb("WriteRecord should have .snap or .children");
            }
        }
        return d
    }

    function Zg(a, b) {
        this.Db = a;
        this.W = b
    }
    h = Zg.prototype;
    h.pa = function(a, b, c) {
        return this.W.pa(this.Db, a, b, c)
    };
    h.pc = function(a) {
        return this.W.pc(this.Db, a)
    };
    h.$c = function(a, b, c) {
        return this.W.$c(this.Db, a, b, c)
    };
    h.jc = function(a) {
        return this.W.jc(this.Db.o(a))
    };
    h.ce = function(a, b, c, d, e) {
        return this.W.ce(this.Db, a, b, c, d, e)
    };
    h.Ta = function(a, b) {
        return this.W.Ta(this.Db, a, b)
    };
    h.o = function(a) {
        return new Zg(this.Db.o(a), this.W)
    };

    function $g(a, b, c) {
        this.type = ag;
        this.source = a;
        this.path = b;
        this.Ga = c
    }
    $g.prototype.Mc = function(a) {
        return this.path.e() ? new $g(this.source, U, this.Ga.K(a)) : new $g(this.source, T(this.path), this.Ga)
    };
    $g.prototype.toString = function() {
        return "Operation(" + this.path + ": " + this.source.toString() + " overwrite: " + this.Ga.toString() + ")"
    };

    function ah(a, b) {
        this.type = gg;
        this.source = bh;
        this.path = a;
        this.Ne = b
    }
    ah.prototype.Mc = function() {
        return this.path.e() ? this : new ah(T(this.path), this.Ne)
    };
    ah.prototype.toString = function() {
        return "Operation(" + this.path + ": " + this.source.toString() + " ack write revert=" + this.Ne + ")"
    };

    function ch(a, b) {
        this.type = ig;
        this.source = a;
        this.path = b
    }
    ch.prototype.Mc = function() {
        return this.path.e() ? new ch(this.source, U) : new ch(this.source, T(this.path))
    };
    ch.prototype.toString = function() {
        return "Operation(" + this.path + ": " + this.source.toString() + " listen_complete)"
    };

    function dh(a, b, c) {
        this.type = dg;
        this.source = a;
        this.path = b;
        this.children = c
    }
    dh.prototype.Mc = function(a) {
        if (this.path.e()) return a = this.children.subtree(new S(a)), a.e() ? null : a.value ? new $g(this.source, U, a.value) : new dh(this.source, U, a);
        y(I(this.path) === a, "Can't get a merge for a child not on the path of the operation");
        return new dh(this.source, T(this.path), this.children)
    };
    dh.prototype.toString = function() {
        return "Operation(" + this.path + ": " + this.source.toString() + " merge: " + this.children.toString() + ")"
    };
    var ag = 0,
        dg = 1,
        gg = 2,
        ig = 3;

    function eh(a, b, c, d) {
        this.me = a;
        this.df = b;
        this.yb = c;
        this.Se = d;
        y(!d || b, "Tagged queries must be from server.")
    }
    var bh = new eh(!0, !1, null, !1),
        fh = new eh(!1, !0, null, !1);
    eh.prototype.toString = function() {
        return this.me ? "user" : this.Se ? "server(queryID=" + this.yb + ")" : "server"
    };

    function gh(a) {
        this.na = ng;
        this.xb = new Vg;
        this.Wc = {};
        this.bc = {};
        this.Fc = a
    }

    function hh(a, b, c, d, e) {
        var f = a.xb,
            g = e;
        y(d > f.Ec, "Stacking an older write on top of newer ones");
        m(g) || (g = !0);
        f.wa.push({
            path: b,
            Ga: c,
            Zd: d,
            visible: g
        });
        g && (f.T = Pg(f.T, b, c));
        f.Ec = d;
        return e ? ih(a, new $g(bh, b, c)) : []
    }

    function jh(a, b, c, d) {
        var e = a.xb;
        y(d > e.Ec, "Stacking an older merge on top of newer ones");
        e.wa.push({
            path: b,
            children: c,
            Zd: d,
            visible: !0
        });
        e.T = Qg(e.T, b, c);
        e.Ec = d;
        c = yg(c);
        return ih(a, new dh(bh, b, c))
    }

    function kh(a, b, c) {
        c = c || !1;
        b = a.xb.Gd(b);
        return null == b ? [] : ih(a, new ah(b, c))
    }

    function lh(a, b, c) {
        c = yg(c);
        return ih(a, new dh(fh, b, c))
    }

    function mh(a, b, c, d) {
        d = Od(a.Wc, "_" + d);
        if (null != d) {
            var e = nh(d);
            d = e.path;
            e = e.yb;
            b = V(d, b);
            c = new $g(new eh(!1, !0, e, !0), b, c);
            return oh(a, d, c)
        }
        return []
    }

    function ph(a, b, c, d) {
        if (d = Od(a.Wc, "_" + d)) {
            var e = nh(d);
            d = e.path;
            e = e.yb;
            b = V(d, b);
            c = yg(c);
            c = new dh(new eh(!1, !0, e, !0), b, c);
            return oh(a, d, c)
        }
        return []
    }
    gh.prototype.Gb = function(a, b) {
        var c = a.path,
            d = null,
            e = !1;
        Fg(this.na, c, function(a, b) {
            var f = V(a, c);
            d = b.bb(f);
            e = e || null != Kg(b);
            return !d
        });
        var f = this.na.get(c);
        f ? (e = e || null != Kg(f), d = d || f.bb(U)) : (f = new Jg, this.na = this.na.set(c, f));
        var g;
        null != d ? g = !0 : (g = !1, d = M, Ig(this.na.subtree(c), function(a, b) {
            var c = b.bb(U);
            c && (d = d.P(a, c))
        }));
        var k = null != Mg(f, a);
        if (!k && !Jc(a.n)) {
            var l = qh(a);
            y(!(l in this.bc), "View does not exist, but we have a tag");
            var n = rh++;
            this.bc[l] = n;
            this.Wc["_" + n] = l
        }
        g = f.Gb(a, b, new Zg(c, this.xb),
            d, g);
        k || e || (f = Mg(f, a), g = g.concat(sh(this, a, f)));
        return g
    };
    gh.prototype.gb = function(a, b, c) {
        var d = a.path,
            e = this.na.get(d),
            f = [];
        if (e && ("default" === a.Fa() || null != Mg(e, a))) {
            f = e.gb(a, b, c);
            e.e() && (this.na = this.na.remove(d));
            e = f.rg;
            f = f.Vf;
            b = -1 !== Na(e, function(a) {
                return Jc(a.n)
            });
            var g = Dg(this.na, d, function(a, b) {
                return null != Kg(b)
            });
            if (b && !g && (d = this.na.subtree(d), !d.e()))
                for (var d = th(d), k = 0; k < d.length; ++k) {
                    var l = d[k],
                        n = l.V,
                        l = uh(this, l);
                    this.Fc.Pe(n, vh(this, n), l.md, l.H)
                }
            if (!g && 0 < e.length && !c)
                if (b) this.Fc.Qd(a, null);
                else {
                    var u = this;
                    Ha(e, function(a) {
                        a.Fa();
                        var b = u.bc[qh(a)];
                        u.Fc.Qd(a, b)
                    })
                }
            wh(this, e)
        }
        return f
    };
    gh.prototype.pa = function(a, b) {
        var c = this.xb,
            d = Dg(this.na, a, function(b, c) {
                var d = V(b, a);
                if (d = c.bb(d)) return d
            });
        return c.pa(a, d, b, !0)
    };

    function th(a) {
        return Bg(a, function(a, c, d) {
            if (c && null != Kg(c)) return [Kg(c)];
            var e = [];
            c && (e = Lg(c));
            A(d, function(a) {
                e = e.concat(a)
            });
            return e
        })
    }

    function wh(a, b) {
        for (var c = 0; c < b.length; ++c) {
            var d = b[c];
            if (!Jc(d.n)) {
                var d = qh(d),
                    e = a.bc[d];
                delete a.bc[d];
                delete a.Wc["_" + e]
            }
        }
    }

    function sh(a, b, c) {
        var d = b.path,
            e = vh(a, b);
        c = uh(a, c);
        b = a.Fc.Pe(b, e, c.md, c.H);
        d = a.na.subtree(d);
        if (e) y(null == Kg(d.value), "If we're adding a query, it shouldn't be shadowed");
        else
            for (e = Bg(d, function(a, b, c) {
                    if (!a.e() && b && null != Kg(b)) return [tg(Kg(b))];
                    var d = [];
                    b && (d = d.concat(Ja(Lg(b), function(a) {
                        return a.V
                    })));
                    A(c, function(a) {
                        d = d.concat(a)
                    });
                    return d
                }), d = 0; d < e.length; ++d) c = e[d], a.Fc.Qd(c, vh(a, c));
        return b
    }

    function uh(a, b) {
        var c = b.V,
            d = vh(a, c);
        return {
            md: function() {
                return (b.u() || M).hash()
            },
            H: function(b, f) {
                if ("ok" === b) {
                    if (f && "object" === typeof f && s(f, "w")) {
                        var g = t(f, "w");
                        ea(g) && 0 <= Ga(g, "no_index") && z("Using an unspecified index. Consider adding " + ('".indexOn": "' + c.n.g.toString() + '"') + " at " + c.path.toString() + " to your security rules for better performance")
                    }
                    if (d) {
                        var k = c.path;
                        if (g = Od(a.Wc, "_" + d)) var l = nh(g),
                            g = l.path,
                            l = l.yb,
                            k = V(g, k),
                            k = new ch(new eh(!1, !0, l, !0), k),
                            g = oh(a, g, k);
                        else g = []
                    } else g = ih(a, new ch(fh,
                        c.path));
                    return g
                }
                g = "Unknown Error";
                "too_big" === b ? g = "The data requested exceeds the maximum size that can be accessed with a single request." : "permission_denied" == b ? g = "Client doesn't have permission to access the desired data." : "unavailable" == b && (g = "The service is unavailable");
                g = Error(b + ": " + g);
                g.code = b.toUpperCase();
                return a.gb(c, null, g)
            }
        }
    }

    function qh(a) {
        return a.path.toString() + "$" + a.Fa()
    }

    function nh(a) {
        var b = a.indexOf("$");
        y(-1 !== b && b < a.length - 1, "Bad queryKey.");
        return {
            yb: a.substr(b + 1),
            path: new S(a.substr(0, b))
        }
    }

    function vh(a, b) {
        var c = qh(b);
        return t(a.bc, c)
    }
    var rh = 1;

    function oh(a, b, c) {
        var d = a.na.get(b);
        y(d, "Missing sync point for query tag that we're tracking");
        return d.Ya(c, new Zg(b, a.xb), null)
    }

    function ih(a, b) {
        return xh(a, b, a.na, null, new Zg(U, a.xb))
    }

    function xh(a, b, c, d, e) {
        if (b.path.e()) return yh(a, b, c, d, e);
        var f = c.get(U);
        null == d && null != f && (d = f.bb(U));
        var g = [],
            k = I(b.path),
            l = b.Mc(k);
        if ((c = c.children.get(k)) && l) var n = d ? d.K(k) : null,
            k = e.o(k),
            g = g.concat(xh(a, l, c, n, k));
        f && (g = g.concat(f.Ya(b, e, d)));
        return g
    }

    function yh(a, b, c, d, e) {
        var f = c.get(U);
        null == d && null != f && (d = f.bb(U));
        var g = [];
        c.children.fa(function(c, f) {
            var n = d ? d.K(c) : null,
                u = e.o(c),
                x = b.Mc(c);
            x && (g = g.concat(yh(a, x, f, n, u)))
        });
        f && (g = g.concat(f.Ya(b, e, d)));
        return g
    };

    function zh(a) {
        this.O = a;
        this.Ra = Xd(a);
        this.$ = new df;
        this.vd = 1;
        this.S = new Je(this.O, q(this.yd, this), q(this.wd, this), q(this.He, this));
        this.zg = Yd(a, q(function() {
            return new Ud(this.Ra, this.S)
        }, this));
        this.lc = new Tc;
        this.se = new cf;
        var b = this;
        this.qd = new gh({
            Pe: function(a, d, e, f) {
                d = [];
                e = b.se.j(a.path);
                e.e() || (d = ih(b.qd, new $g(fh, a.path, e)), setTimeout(function() {
                    f("ok")
                }, 0));
                return d
            },
            Qd: ba
        });
        Ah(this, "connected", !1);
        this.ga = new $e;
        this.Q = new Ff(a, q(this.S.Q, this.S), q(this.S.Ue, this.S), q(this.Ee, this));
        this.gd =
            0;
        this.te = null;
        this.N = new gh({
            Pe: function(a, d, e, f) {
                Ne(b.S, a, e, d, function(d, e) {
                    var l = f(d, e);
                    hf(b.$, a.path, l)
                });
                return []
            },
            Qd: function(a, d) {
                var e = b.S,
                    f = a.path.toString(),
                    g = a.Fa();
                e.f("Unlisten called for " + f + " " + g);
                if (Pe(e, f, g) && e.ja) {
                    var k = Ic(a.n);
                    e.f("Unlisten on " + f + " for " + g);
                    f = {
                        p: f
                    };
                    d && (f.q = k, f.t = d);
                    e.Ca("n", f)
                }
            }
        })
    }
    h = zh.prototype;
    h.toString = function() {
        return (this.O.Ab ? "https://" : "http://") + this.O.host
    };
    h.name = function() {
        return this.O.tb
    };

    function Bh(a) {
        a = a.se.j(new S(".info/serverTimeOffset")).I() || 0;
        return (new Date).getTime() + a
    }

    function Ch(a) {
        a = a = {
            timestamp: Bh(a)
        };
        a.timestamp = a.timestamp || (new Date).getTime();
        return a
    }
    h.yd = function(a, b, c, d) {
        this.gd++;
        var e = new S(a);
        b = this.te ? this.te(a, b) : b;
        a = [];
        d ? c ? (b = td(b, function(a) {
            return O(a)
        }), a = ph(this.N, e, b, d)) : (b = O(b), a = mh(this.N, e, b, d)) : c ? (d = td(b, function(a) {
            return O(a)
        }), a = lh(this.N, e, d)) : (d = O(b), a = ih(this.N, new $g(fh, e, d)));
        d = e;
        0 < a.length && (d = Dh(this, e));
        hf(this.$, d, a)
    };
    h.wd = function(a) {
        Ah(this, "connected", a);
        !1 === a && Eh(this)
    };
    h.He = function(a) {
        var b = this;
        zb(a, function(a, d) {
            Ah(b, d, a)
        })
    };
    h.Ee = function(a) {
        Ah(this, "authenticated", a)
    };

    function Ah(a, b, c) {
        b = new S("/.info/" + b);
        c = O(c);
        var d = a.se;
        d.Jd = d.Jd.C(b, c);
        c = ih(a.qd, new $g(fh, b, c));
        hf(a.$, b, c)
    }
    h.Bb = function(a, b, c, d) {
        this.f("set", {
            path: a.toString(),
            value: b,
            Hg: c
        });
        var e = Ch(this);
        b = O(b, c);
        var e = Uf(b, e),
            f = this.vd++,
            e = hh(this.N, a, e, f, !0);
        ef(this.$, e);
        var g = this;
        this.S.put(a.toString(), b.I(!0), function(b, c) {
            var e = "ok" === b;
            e || z("set at " + a + " failed: " + b);
            e = kh(g.N, f, !e);
            hf(g.$, a, e);
            Fh(d, b, c)
        });
        e = Gh(this, a);
        Dh(this, e);
        hf(this.$, e, [])
    };
    h.update = function(a, b, c) {
        this.f("update", {
            path: a.toString(),
            value: b
        });
        var d = !0,
            e = Ch(this),
            f = {};
        A(b, function(a, b) {
            d = !1;
            var c = O(a);
            f[b] = Uf(c, e)
        });
        if (d) hb("update() called with empty data.  Don't do anything."), Fh(c, "ok");
        else {
            var g = this.vd++,
                k = jh(this.N, a, f, g);
            ef(this.$, k);
            var l = this;
            Ve(this.S, a.toString(), b, function(b, d) {
                y("ok" === b || "permission_denied" === b, "merge at " + a + " failed.");
                var e = "ok" === b;
                e || z("update at " + a + " failed: " + b);
                var e = kh(l.N, g, !e),
                    f = a;
                0 < e.length && (f = Dh(l, a));
                hf(l.$, f, e);
                Fh(c, b, d)
            });
            b = Gh(this, a);
            Dh(this, b);
            hf(this.$, a, [])
        }
    };

    function Eh(a) {
        a.f("onDisconnectEvents");
        var b = Ch(a),
            c = [];
        bf(Tf(a.ga, b), U, function(b, e) {
            c = c.concat(ih(a.N, new $g(fh, b, e)));
            var f = Gh(a, b);
            Dh(a, f)
        });
        a.ga = new $e;
        hf(a.$, U, c)
    }
    h.Fe = function(a, b) {
        var c = this;
        this.S.Fe(a.toString(), function(d, e) {
            "ok" === d && af(c.ga, a);
            Fh(b, d, e)
        })
    };

    function Hh(a, b, c, d) {
        var e = O(c);
        Re(a.S, b.toString(), e.I(!0), function(c, g) {
            "ok" === c && a.ga.dc(b, e);
            Fh(d, c, g)
        })
    }

    function Ih(a, b, c, d, e) {
        var f = O(c, d);
        Re(a.S, b.toString(), f.I(!0), function(c, d) {
            "ok" === c && a.ga.dc(b, f);
            Fh(e, c, d)
        })
    }

    function Jh(a, b, c, d) {
        var e = !0,
            f;
        for (f in c) e = !1;
        e ? (hb("onDisconnect().update() called with empty data.  Don't do anything."), Fh(d, "ok")) : Te(a.S, b.toString(), c, function(e, f) {
            if ("ok" === e)
                for (var l in c) {
                    var n = O(c[l]);
                    a.ga.dc(b.o(l), n)
                }
            Fh(d, e, f)
        })
    }

    function Oc(a, b, c) {
        c = ".info" === I(b.path) ? a.qd.Gb(b, c) : a.N.Gb(b, c);
        Pc(a.$, b.path, c)
    }
    h.pb = function() {
        this.S.pb()
    };
    h.hc = function() {
        this.S.hc()
    };
    h.Qe = function(a) {
        if ("undefined" !== typeof console) {
            a ? (this.Pd || (this.Pd = new Td(this.Ra)), a = this.Pd.get()) : a = this.Ra.get();
            var b = Ka(Kd(a), function(a, b) {
                    return Math.max(b.length, a)
                }, 0),
                c;
            for (c in a) {
                for (var d = a[c], e = c.length; e < b + 2; e++) c += " ";
                console.log(c + d)
            }
        }
    };
    h.Re = function(a) {
        Sd(this.Ra, a);
        this.zg.zf[a] = !0
    };
    h.f = function(a) {
        hb("r:" + this.S.id + ":", arguments)
    };

    function Fh(a, b, c) {
        a && Cb(function() {
            if ("ok" == b) a(null);
            else {
                var d = (b || "error").toUpperCase(),
                    e = d;
                c && (e += ": " + c);
                e = Error(e);
                e.code = d;
                a(e)
            }
        })
    };

    function Kh(a, b, c, d, e) {
        function f() {}
        a.f("transaction on " + b);
        var g = new R(a, b);
        g.vb("value", f);
        c = {
            path: b,
            update: c,
            H: d,
            status: null,
            qf: eb(),
            Ve: e,
            xf: 0,
            Xd: function() {
                g.Zb("value", f)
            },
            $d: null,
            xa: null,
            dd: null,
            ed: null,
            fd: null
        };
        d = a.N.pa(b, void 0) || M;
        c.dd = d;
        d = c.update(d.I());
        if (m(d)) {
            Sb("transaction failed: Data returned ", d);
            c.status = 1;
            e = Uc(a.lc, b);
            var k = e.za() || [];
            k.push(c);
            Vc(e, k);
            "object" === typeof d && null !== d && s(d, ".priority") ? (k = t(d, ".priority"), y(Qb(k), "Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")) :
                k = (a.N.pa(b) || M).L().I();
            e = Ch(a);
            d = O(d, k);
            e = Uf(d, e);
            c.ed = d;
            c.fd = e;
            c.xa = a.vd++;
            c = hh(a.N, b, e, c.xa, c.Ve);
            hf(a.$, b, c);
            Lh(a)
        } else c.Xd(), c.ed = null, c.fd = null, c.H && (a = new D(c.dd, new R(a, c.path), L), c.H(null, !1, a))
    }

    function Lh(a, b) {
        var c = b || a.lc;
        b || Mh(a, c);
        if (null !== c.za()) {
            var d = Nh(a, c);
            y(0 < d.length, "Sending zero length transaction queue");
            La(d, function(a) {
                return 1 === a.status
            }) && Oh(a, c.path(), d)
        } else c.ld() && c.U(function(b) {
            Lh(a, b)
        })
    }

    function Oh(a, b, c) {
        for (var d = Ja(c, function(a) {
                return a.xa
            }), e = a.N.pa(b, d) || M, d = e, e = e.hash(), f = 0; f < c.length; f++) {
            var g = c[f];
            y(1 === g.status, "tryToSendTransactionQueue_: items in queue should all be run.");
            g.status = 2;
            g.xf++;
            var k = V(b, g.path),
                d = d.C(k, g.ed)
        }
        d = d.I(!0);
        a.S.put(b.toString(), d, function(d) {
            a.f("transaction put response", {
                path: b.toString(),
                status: d
            });
            var e = [];
            if ("ok" === d) {
                d = [];
                for (f = 0; f < c.length; f++) {
                    c[f].status = 3;
                    e = e.concat(kh(a.N, c[f].xa));
                    if (c[f].H) {
                        var g = c[f].fd,
                            k = new R(a, c[f].path);
                        d.push(q(c[f].H,
                            null, null, !0, new D(g, k, L)))
                    }
                    c[f].Xd()
                }
                Mh(a, Uc(a.lc, b));
                Lh(a);
                hf(a.$, b, e);
                for (f = 0; f < d.length; f++) Cb(d[f])
            } else {
                if ("datastale" === d)
                    for (f = 0; f < c.length; f++) c[f].status = 4 === c[f].status ? 5 : 1;
                else
                    for (z("transaction at " + b.toString() + " failed: " + d), f = 0; f < c.length; f++) c[f].status = 5, c[f].$d = d;
                Dh(a, b)
            }
        }, e)
    }

    function Dh(a, b) {
        var c = Ph(a, b),
            d = c.path(),
            c = Nh(a, c);
        Qh(a, c, d);
        return d
    }

    function Qh(a, b, c) {
        if (0 !== b.length) {
            for (var d = [], e = [], f = Ja(b, function(a) {
                    return a.xa
                }), g = 0; g < b.length; g++) {
                var k = b[g],
                    l = V(c, k.path),
                    n = !1,
                    u;
                y(null !== l, "rerunTransactionsUnderNode_: relativePath should not be null.");
                if (5 === k.status) n = !0, u = k.$d, e = e.concat(kh(a.N, k.xa, !0));
                else if (1 === k.status)
                    if (25 <= k.xf) n = !0, u = "maxretry", e = e.concat(kh(a.N, k.xa, !0));
                    else {
                        var x = a.N.pa(k.path, f) || M;
                        k.dd = x;
                        var E = b[g].update(x.I());
                        m(E) ? (Sb("transaction failed: Data returned ", E), l = O(E), "object" === typeof E && null != E && s(E,
                            ".priority") || (l = l.Z(x.L())), x = k.xa, E = Ch(a), E = Uf(l, E), k.ed = l, k.fd = E, k.xa = a.vd++, Oa(f, x), e = e.concat(hh(a.N, k.path, E, k.xa, k.Ve)), e = e.concat(kh(a.N, x, !0))) : (n = !0, u = "nodata", e = e.concat(kh(a.N, k.xa, !0)))
                    }
                hf(a.$, c, e);
                e = [];
                n && (b[g].status = 3, setTimeout(b[g].Xd, Math.floor(0)), b[g].H && ("nodata" === u ? (k = new R(a, b[g].path), d.push(q(b[g].H, null, null, !1, new D(b[g].dd, k, L)))) : d.push(q(b[g].H, null, Error(u), !1, null))))
            }
            Mh(a, a.lc);
            for (g = 0; g < d.length; g++) Cb(d[g]);
            Lh(a)
        }
    }

    function Ph(a, b) {
        for (var c, d = a.lc; null !== (c = I(b)) && null === d.za();) d = Uc(d, c), b = T(b);
        return d
    }

    function Nh(a, b) {
        var c = [];
        Rh(a, b, c);
        c.sort(function(a, b) {
            return a.qf - b.qf
        });
        return c
    }

    function Rh(a, b, c) {
        var d = b.za();
        if (null !== d)
            for (var e = 0; e < d.length; e++) c.push(d[e]);
        b.U(function(b) {
            Rh(a, b, c)
        })
    }

    function Mh(a, b) {
        var c = b.za();
        if (c) {
            for (var d = 0, e = 0; e < c.length; e++) 3 !== c[e].status && (c[d] = c[e], d++);
            c.length = d;
            Vc(b, 0 < c.length ? c : null)
        }
        b.U(function(b) {
            Mh(a, b)
        })
    }

    function Gh(a, b) {
        var c = Ph(a, b).path(),
            d = Uc(a.lc, b);
        Yc(d, function(b) {
            Sh(a, b)
        });
        Sh(a, d);
        Xc(d, function(b) {
            Sh(a, b)
        });
        return c
    }

    function Sh(a, b) {
        var c = b.za();
        if (null !== c) {
            for (var d = [], e = [], f = -1, g = 0; g < c.length; g++) 4 !== c[g].status && (2 === c[g].status ? (y(f === g - 1, "All SENT items should be at beginning of queue."), f = g, c[g].status = 4, c[g].$d = "set") : (y(1 === c[g].status, "Unexpected transaction status in abort"), c[g].Xd(), e = e.concat(kh(a.N, c[g].xa, !0)), c[g].H && d.push(q(c[g].H, null, Error("set"), !1, null)))); - 1 === f ? Vc(b, null) : c.length = f + 1;
            hf(a.$, b.path(), e);
            for (g = 0; g < d.length; g++) Cb(d[g])
        }
    };

    function Th() {
        this.ec = {}
    }
    ca(Th);
    Th.prototype.pb = function() {
        for (var a in this.ec) this.ec[a].pb()
    };
    Th.prototype.interrupt = Th.prototype.pb;
    Th.prototype.hc = function() {
        for (var a in this.ec) this.ec[a].hc()
    };
    Th.prototype.resume = Th.prototype.hc;

    function Uh(a) {
        var b = this;
        this.rc = a;
        this.Sd = "*";
        xf() ? this.Hc = this.od = of() : (this.Hc = window.opener, this.od = window);
        if (!b.Hc) throw "Unable to find relay frame";
        pf(this.od, "message", q(this.$b, this));
        pf(this.od, "message", q(this.nf, this));
        try {
            Vh(this, {
                a: "ready"
            })
        } catch (c) {
            pf(this.Hc, "load", function() {
                Vh(b, {
                    a: "ready"
                })
            })
        }
        pf(window, "unload", q(this.jg, this))
    }

    function Vh(a, b) {
        b = r(b);
        xf() ? a.Hc.doPost(b, a.Sd) : a.Hc.postMessage(b, a.Sd)
    }
    Uh.prototype.$b = function(a) {
        var b = this,
            c;
        try {
            c = ta(a.data)
        } catch (d) {}
        c && "request" === c.a && (qf(window, "message", this.$b), this.Sd = a.origin, this.rc && setTimeout(function() {
            b.rc(b.Sd, c.d, function(a, c) {
                b.Mf = !c;
                b.rc = void 0;
                Vh(b, {
                    a: "response",
                    d: a,
                    forceKeepWindowOpen: c
                })
            })
        }, 0))
    };
    Uh.prototype.jg = function() {
        try {
            qf(this.od, "message", this.nf)
        } catch (a) {}
        this.rc && (Vh(this, {
            a: "error",
            d: "unknown closed window"
        }), this.rc = void 0);
        try {
            window.close()
        } catch (b) {}
    };
    Uh.prototype.nf = function(a) {
        if (this.Mf && "die" === a.data) try {
            window.close()
        } catch (b) {}
    };
    var Y = {
        Xf: function() {
            je = ae = !0
        }
    };
    Y.forceLongPolling = Y.Xf;
    Y.Yf = function() {
        ke = !0
    };
    Y.forceWebSockets = Y.Yf;
    Y.wg = function(a, b) {
        a.k.S.Oe = b
    };
    Y.setSecurityDebugCallback = Y.wg;
    Y.Qe = function(a, b) {
        a.k.Qe(b)
    };
    Y.stats = Y.Qe;
    Y.Re = function(a, b) {
        a.k.Re(b)
    };
    Y.statsIncrementCounter = Y.Re;
    Y.gd = function(a) {
        return a.k.gd
    };
    Y.dataUpdateCount = Y.gd;
    Y.ag = function(a, b) {
        a.k.te = b
    };
    Y.interceptServerData = Y.ag;
    Y.gg = function(a) {
        new Uh(a)
    };
    Y.onPopupOpen = Y.gg;
    Y.ug = function(a) {
        jf = a
    };
    Y.setAuthenticationServer = Y.ug;

    function Z(a, b) {
        this.Rc = a;
        this.Ea = b
    }
    Z.prototype.cancel = function(a) {
        F("Firebase.onDisconnect().cancel", 0, 1, arguments.length);
        H("Firebase.onDisconnect().cancel", 1, a, !0);
        this.Rc.Fe(this.Ea, a || null)
    };
    Z.prototype.cancel = Z.prototype.cancel;
    Z.prototype.remove = function(a) {
        F("Firebase.onDisconnect().remove", 0, 1, arguments.length);
        Zb("Firebase.onDisconnect().remove", this.Ea);
        H("Firebase.onDisconnect().remove", 1, a, !0);
        Hh(this.Rc, this.Ea, null, a)
    };
    Z.prototype.remove = Z.prototype.remove;
    Z.prototype.set = function(a, b) {
        F("Firebase.onDisconnect().set", 1, 2, arguments.length);
        Zb("Firebase.onDisconnect().set", this.Ea);
        Rb("Firebase.onDisconnect().set", a, !1);
        H("Firebase.onDisconnect().set", 2, b, !0);
        Hh(this.Rc, this.Ea, a, b)
    };
    Z.prototype.set = Z.prototype.set;
    Z.prototype.Bb = function(a, b, c) {
        F("Firebase.onDisconnect().setWithPriority", 2, 3, arguments.length);
        Zb("Firebase.onDisconnect().setWithPriority", this.Ea);
        Rb("Firebase.onDisconnect().setWithPriority", a, !1);
        Vb("Firebase.onDisconnect().setWithPriority", 2, b);
        H("Firebase.onDisconnect().setWithPriority", 3, c, !0);
        Ih(this.Rc, this.Ea, a, b, c)
    };
    Z.prototype.setWithPriority = Z.prototype.Bb;
    Z.prototype.update = function(a, b) {
        F("Firebase.onDisconnect().update", 1, 2, arguments.length);
        Zb("Firebase.onDisconnect().update", this.Ea);
        if (ea(a)) {
            for (var c = {}, d = 0; d < a.length; ++d) c["" + d] = a[d];
            a = c;
            z("Passing an Array to Firebase.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")
        }
        Ub("Firebase.onDisconnect().update", a);
        H("Firebase.onDisconnect().update", 2, b, !0);
        Jh(this.Rc,
            this.Ea, a, b)
    };
    Z.prototype.update = Z.prototype.update;
    var $ = {};
    $.nc = Je;
    $.DataConnection = $.nc;
    Je.prototype.yg = function(a, b) {
        this.Ca("q", {
            p: a
        }, b)
    };
    $.nc.prototype.simpleListen = $.nc.prototype.yg;
    Je.prototype.Sf = function(a, b) {
        this.Ca("echo", {
            d: a
        }, b)
    };
    $.nc.prototype.echo = $.nc.prototype.Sf;
    Je.prototype.interrupt = Je.prototype.pb;
    $.Df = ue;
    $.RealTimeConnection = $.Df;
    ue.prototype.sendRequest = ue.prototype.Ca;
    ue.prototype.close = ue.prototype.close;
    $.$f = function(a) {
        var b = Je.prototype.put;
        Je.prototype.put = function(c, d, e, f) {
            m(f) && (f = a());
            b.call(this, c, d, e, f)
        };
        return function() {
            Je.prototype.put = b
        }
    };
    $.hijackHash = $.$f;
    $.Cf = Aa;
    $.ConnectionTarget = $.Cf;
    $.Fa = function(a) {
        return a.Fa()
    };
    $.queryIdentifier = $.Fa;
    $.bg = function(a) {
        return a.k.S.Aa
    };
    $.listens = $.bg;
    var Wh = function() {
        var a = 0,
            b = [];
        return function(c) {
            var d = c === a;
            a = c;
            for (var e = Array(8), f = 7; 0 <= f; f--) e[f] = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c % 64), c = Math.floor(c / 64);
            y(0 === c, "Cannot push at time == 0");
            c = e.join("");
            if (d) {
                for (f = 11; 0 <= f && 63 === b[f]; f--) b[f] = 0;
                b[f]++
            } else
                for (f = 0; 12 > f; f++) b[f] = Math.floor(64 * Math.random());
            for (f = 0; 12 > f; f++) c += "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);
            y(20 === c.length, "NextPushId: Length should be 20.");
            return c
        }
    }();

    function R(a, b) {
        var c, d, e;
        if (a instanceof zh) c = a, d = b;
        else {
            F("new Firebase", 1, 2, arguments.length);
            d = rb(arguments[0]);
            c = d.Ag;
            "firebase" === d.domain && qb(d.host + " is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");
            c || qb("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");
            d.Ab || "undefined" !== typeof window && window.location && window.location.protocol && -1 !== window.location.protocol.indexOf("https:") && z("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");
            c = new Aa(d.host, d.Ab, c, "ws" === d.scheme || "wss" === d.scheme);
            d = new S(d.Pc);
            e = d.toString();
            var f;
            !(f = !p(c.host) || 0 === c.host.length || !Pb(c.tb)) && (f = 0 !== e.length) && (e && (e = e.replace(/^\/*\.info(\/|$)/, "/")), f = !(p(e) && 0 !== e.length && !Ob.test(e)));
            if (f) throw Error(G("new Firebase", 1, !1) + 'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');
            if (b)
                if (b instanceof Th) e = b;
                else if (p(b)) e = Th.Nb(), c.Dd = b;
            else throw Error("Expected a valid Firebase.Context for second argument to new Firebase()");
            else e = Th.Nb();
            f = c.toString();
            var g = t(e.ec, f);
            g || (g = new zh(c), e.ec[f] = g);
            c = g
        }
        Q.call(this, c, d, Fc, !1)
    }
    ma(R, Q);
    var Xh = R,
        Yh = ["Firebase"],
        Zh = aa;
    Yh[0] in Zh || !Zh.execScript || Zh.execScript("var " + Yh[0]);
    for (var $h; Yh.length && ($h = Yh.shift());) !Yh.length && m(Xh) ? Zh[$h] = Xh : Zh = Zh[$h] ? Zh[$h] : Zh[$h] = {};
    R.prototype.name = function() {
        z("Firebase.name() being deprecated. Please use Firebase.key() instead.");
        F("Firebase.name", 0, 0, arguments.length);
        return this.key()
    };
    R.prototype.name = R.prototype.name;
    R.prototype.key = function() {
        F("Firebase.key", 0, 0, arguments.length);
        return this.path.e() ? null : Rc(this.path)
    };
    R.prototype.key = R.prototype.key;
    R.prototype.o = function(a) {
        F("Firebase.child", 1, 1, arguments.length);
        if (ga(a)) a = String(a);
        else if (!(a instanceof S))
            if (null === I(this.path)) {
                var b = a;
                b && (b = b.replace(/^\/*\.info(\/|$)/, "/"));
                Yb("Firebase.child", b)
            } else Yb("Firebase.child", a);
        return new R(this.k, this.path.o(a))
    };
    R.prototype.child = R.prototype.o;
    R.prototype.parent = function() {
        F("Firebase.parent", 0, 0, arguments.length);
        var a = this.path.parent();
        return null === a ? null : new R(this.k, a)
    };
    R.prototype.parent = R.prototype.parent;
    R.prototype.root = function() {
        F("Firebase.ref", 0, 0, arguments.length);
        for (var a = this; null !== a.parent();) a = a.parent();
        return a
    };
    R.prototype.root = R.prototype.root;
    R.prototype.toString = function() {
        F("Firebase.toString", 0, 0, arguments.length);
        var a;
        if (null === this.parent()) a = this.k.toString();
        else {
            a = this.parent().toString() + "/";
            var b = this.key();
            a += encodeURIComponent(String(b))
        }
        return a
    };
    R.prototype.toString = R.prototype.toString;
    R.prototype.set = function(a, b) {
        F("Firebase.set", 1, 2, arguments.length);
        Zb("Firebase.set", this.path);
        Rb("Firebase.set", a, !1);
        H("Firebase.set", 2, b, !0);
        this.k.Bb(this.path, a, null, b || null)
    };
    R.prototype.set = R.prototype.set;
    R.prototype.update = function(a, b) {
        F("Firebase.update", 1, 2, arguments.length);
        Zb("Firebase.update", this.path);
        if (ea(a)) {
            for (var c = {}, d = 0; d < a.length; ++d) c["" + d] = a[d];
            a = c;
            z("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")
        }
        Ub("Firebase.update", a);
        H("Firebase.update", 2, b, !0);
        if (s(a, ".priority")) throw Error("update() does not currently support updating .priority.");
        this.k.update(this.path, a, b || null)
    };
    R.prototype.update = R.prototype.update;
    R.prototype.Bb = function(a, b, c) {
        F("Firebase.setWithPriority", 2, 3, arguments.length);
        Zb("Firebase.setWithPriority", this.path);
        Rb("Firebase.setWithPriority", a, !1);
        Vb("Firebase.setWithPriority", 2, b);
        H("Firebase.setWithPriority", 3, c, !0);
        if (".length" === this.key() || ".keys" === this.key()) throw "Firebase.setWithPriority failed: " + this.key() + " is a read-only object.";
        this.k.Bb(this.path, a, b, c || null)
    };
    R.prototype.setWithPriority = R.prototype.Bb;
    R.prototype.remove = function(a) {
        F("Firebase.remove", 0, 1, arguments.length);
        Zb("Firebase.remove", this.path);
        H("Firebase.remove", 1, a, !0);
        this.set(null, a)
    };
    R.prototype.remove = R.prototype.remove;
    R.prototype.transaction = function(a, b, c) {
        F("Firebase.transaction", 1, 3, arguments.length);
        Zb("Firebase.transaction", this.path);
        H("Firebase.transaction", 1, a, !1);
        H("Firebase.transaction", 2, b, !0);
        if (m(c) && "boolean" != typeof c) throw Error(G("Firebase.transaction", 3, !0) + "must be a boolean.");
        if (".length" === this.key() || ".keys" === this.key()) throw "Firebase.transaction failed: " + this.key() + " is a read-only object.";
        "undefined" === typeof c && (c = !0);
        Kh(this.k, this.path, a, b || null, c)
    };
    R.prototype.transaction = R.prototype.transaction;
    R.prototype.vg = function(a, b) {
        F("Firebase.setPriority", 1, 2, arguments.length);
        Zb("Firebase.setPriority", this.path);
        Vb("Firebase.setPriority", 1, a);
        H("Firebase.setPriority", 2, b, !0);
        this.k.Bb(this.path.o(".priority"), a, null, b)
    };
    R.prototype.setPriority = R.prototype.vg;
    R.prototype.push = function(a, b) {
        F("Firebase.push", 0, 2, arguments.length);
        Zb("Firebase.push", this.path);
        Rb("Firebase.push", a, !0);
        H("Firebase.push", 2, b, !0);
        var c = Bh(this.k),
            c = Wh(c),
            c = this.o(c);
        "undefined" !== typeof a && null !== a && c.set(a, b);
        return c
    };
    R.prototype.push = R.prototype.push;
    R.prototype.fb = function() {
        Zb("Firebase.onDisconnect", this.path);
        return new Z(this.k, this.path)
    };
    R.prototype.onDisconnect = R.prototype.fb;
    R.prototype.Q = function(a, b, c) {
        z("FirebaseRef.auth() being deprecated. Please use FirebaseRef.authWithCustomToken() instead.");
        F("Firebase.auth", 1, 3, arguments.length);
        $b("Firebase.auth", a);
        H("Firebase.auth", 2, b, !0);
        H("Firebase.auth", 3, b, !0);
        Lf(this.k.Q, a, {}, {
            remember: "none"
        }, b, c)
    };
    R.prototype.auth = R.prototype.Q;
    R.prototype.Ue = function(a) {
        F("Firebase.unauth", 0, 1, arguments.length);
        H("Firebase.unauth", 1, a, !0);
        Mf(this.k.Q, a)
    };
    R.prototype.unauth = R.prototype.Ue;
    R.prototype.ne = function() {
        F("Firebase.getAuth", 0, 0, arguments.length);
        return this.k.Q.ne()
    };
    R.prototype.getAuth = R.prototype.ne;
    R.prototype.fg = function(a, b) {
        F("Firebase.onAuth", 1, 2, arguments.length);
        H("Firebase.onAuth", 1, a, !1);
        Mb("Firebase.onAuth", 2, b);
        this.k.Q.vb("auth_status", a, b)
    };
    R.prototype.onAuth = R.prototype.fg;
    R.prototype.eg = function(a, b) {
        F("Firebase.offAuth", 1, 2, arguments.length);
        H("Firebase.offAuth", 1, a, !1);
        Mb("Firebase.offAuth", 2, b);
        this.k.Q.Zb("auth_status", a, b)
    };
    R.prototype.offAuth = R.prototype.eg;
    R.prototype.Hf = function(a, b, c) {
        F("Firebase.authWithCustomToken", 2, 3, arguments.length);
        $b("Firebase.authWithCustomToken", a);
        H("Firebase.authWithCustomToken", 2, b, !1);
        J("Firebase.authWithCustomToken", 3, c, !0);
        Lf(this.k.Q, a, {}, c || {}, b)
    };
    R.prototype.authWithCustomToken = R.prototype.Hf;
    R.prototype.If = function(a, b, c) {
        F("Firebase.authWithOAuthPopup", 2, 3, arguments.length);
        ac("Firebase.authWithOAuthPopup", 1, a);
        H("Firebase.authWithOAuthPopup", 2, b, !1);
        J("Firebase.authWithOAuthPopup", 3, c, !0);
        Qf(this.k.Q, a, c, b)
    };
    R.prototype.authWithOAuthPopup = R.prototype.If;
    R.prototype.Jf = function(a, b, c) {
        F("Firebase.authWithOAuthRedirect", 2, 3, arguments.length);
        ac("Firebase.authWithOAuthRedirect", 1, a);
        H("Firebase.authWithOAuthRedirect", 2, b, !1);
        J("Firebase.authWithOAuthRedirect", 3, c, !0);
        var d = this.k.Q;
        Of(d);
        var e = [Ef],
            f = mf(c);
        "anonymous" === a || "firebase" === a ? B(b, X("TRANSPORT_UNAVAILABLE")) : (v.set("redirect_client_options", f.cd), Pf(d, e, "/auth/" + a, f, b))
    };
    R.prototype.authWithOAuthRedirect = R.prototype.Jf;
    R.prototype.Kf = function(a, b, c, d) {
        F("Firebase.authWithOAuthToken", 3, 4, arguments.length);
        ac("Firebase.authWithOAuthToken", 1, a);
        H("Firebase.authWithOAuthToken", 3, c, !1);
        J("Firebase.authWithOAuthToken", 4, d, !0);
        p(b) ? (ac("Firebase.authWithOAuthToken", 2, b), Nf(this.k.Q, a + "/token", {
            access_token: b
        }, d, c)) : (J("Firebase.authWithOAuthToken", 2, b, !1), Nf(this.k.Q, a + "/token", b, d, c))
    };
    R.prototype.authWithOAuthToken = R.prototype.Kf;
    R.prototype.Gf = function(a, b) {
        F("Firebase.authAnonymously", 1, 2, arguments.length);
        H("Firebase.authAnonymously", 1, a, !1);
        J("Firebase.authAnonymously", 2, b, !0);
        Nf(this.k.Q, "anonymous", {}, b, a)
    };
    R.prototype.authAnonymously = R.prototype.Gf;
    R.prototype.Lf = function(a, b, c) {
        F("Firebase.authWithPassword", 2, 3, arguments.length);
        J("Firebase.authWithPassword", 1, a, !1);
        K("Firebase.authWithPassword", a, "email");
        K("Firebase.authWithPassword", a, "password");
        H("Firebase.authAnonymously", 2, b, !1);
        J("Firebase.authAnonymously", 3, c, !0);
        Nf(this.k.Q, "password", a, c, b)
    };
    R.prototype.authWithPassword = R.prototype.Lf;
    R.prototype.je = function(a, b) {
        F("Firebase.createUser", 2, 2, arguments.length);
        J("Firebase.createUser", 1, a, !1);
        K("Firebase.createUser", a, "email");
        K("Firebase.createUser", a, "password");
        H("Firebase.createUser", 2, b, !1);
        this.k.Q.je(a, b)
    };
    R.prototype.createUser = R.prototype.je;
    R.prototype.Le = function(a, b) {
        F("Firebase.removeUser", 2, 2, arguments.length);
        J("Firebase.removeUser", 1, a, !1);
        K("Firebase.removeUser", a, "email");
        K("Firebase.removeUser", a, "password");
        H("Firebase.removeUser", 2, b, !1);
        this.k.Q.Le(a, b)
    };
    R.prototype.removeUser = R.prototype.Le;
    R.prototype.ee = function(a, b) {
        F("Firebase.changePassword", 2, 2, arguments.length);
        J("Firebase.changePassword", 1, a, !1);
        K("Firebase.changePassword", a, "email");
        K("Firebase.changePassword", a, "oldPassword");
        K("Firebase.changePassword", a, "newPassword");
        H("Firebase.changePassword", 2, b, !1);
        this.k.Q.ee(a, b)
    };
    R.prototype.changePassword = R.prototype.ee;
    R.prototype.de = function(a, b) {
        F("Firebase.changeEmail", 2, 2, arguments.length);
        J("Firebase.changeEmail", 1, a, !1);
        K("Firebase.changeEmail", a, "oldEmail");
        K("Firebase.changeEmail", a, "newEmail");
        K("Firebase.changeEmail", a, "password");
        H("Firebase.changeEmail", 2, b, !1);
        this.k.Q.de(a, b)
    };
    R.prototype.changeEmail = R.prototype.de;
    R.prototype.Me = function(a, b) {
        F("Firebase.resetPassword", 2, 2, arguments.length);
        J("Firebase.resetPassword", 1, a, !1);
        K("Firebase.resetPassword", a, "email");
        H("Firebase.resetPassword", 2, b, !1);
        this.k.Q.Me(a, b)
    };
    R.prototype.resetPassword = R.prototype.Me;
    R.goOffline = function() {
        F("Firebase.goOffline", 0, 0, arguments.length);
        Th.Nb().pb()
    };
    R.goOnline = function() {
        F("Firebase.goOnline", 0, 0, arguments.length);
        Th.Nb().hc()
    };

    function nb(a, b) {
        y(!b || !0 === a || !1 === a, "Can't turn on custom loggers persistently.");
        !0 === a ? ("undefined" !== typeof console && ("function" === typeof console.log ? lb = q(console.log, console) : "object" === typeof console.log && (lb = function(a) {
            console.log(a)
        })), b && v.set("logging_enabled", !0)) : a ? lb = a : (lb = null, v.remove("logging_enabled"))
    }
    R.enableLogging = nb;
    R.ServerValue = {
        TIMESTAMP: {
            ".sv": "timestamp"
        }
    };
    R.SDK_VERSION = "2.1.2";
    R.INTERNAL = Y;
    R.Context = Th;
    R.TEST_ACCESS = $;
})();
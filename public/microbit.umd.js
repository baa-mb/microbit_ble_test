(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : (e = e || self, t(e.microbitFs = {}))
})(this, function (e) {
    'use strict';
    var $ = Number.isInteger,
        w = String.prototype,
        z = Math.max,
        V = Math.min,
        G = Math.floor,
        W = Math.ceil,
        K = Math.pow;

    function t(e, t) {
        return t = {
            exports: {}
        }, e(t, t.exports), t.exports
    }

    function n(e) {
        return n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, n(e)
    }

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function a(e, t) {
        for (var n, r = 0; r < t.length; r++) n = t[r], n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
    }

    function o(e, t, n) {
        return t && a(e.prototype, t), n && a(e, n), e
    }

    function l(e, t) {
        return s(e) || d(e, t) || c()
    }

    function s(e) {
        if (Array.isArray(e)) return e
    }

    function d(e, t) {
        var n = [],
            r = !0,
            a = !1,
            o = void 0;
        try {
            for (var l, i = e[Symbol.iterator](); !(r = (l = i.next()).done) && (n.push(l.value), !(t && n.length === t)); r = !0);
        } catch (e) {
            a = !0, o = e
        } finally {
            try {
                r || null == i["return"] || i["return"]()
            } finally {
                if (a) throw o
            }
        }
        return n
    }

    function c() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
    }

    function g(e) {
        return 255 & -e.reduce(function (e, t) {
            return e + t
        }, 0)
    }

    function p(e, t) {
        var n = e.reduce(function (e, t) {
                return e + t
            }, 0),
            r = t.reduce(function (e, t) {
                return e + t
            }, 0);
        return 255 & -(n + r)
    }

    function u(e) {
        return e.toString(16).toUpperCase().padStart(2, "0")
    }

    function y(e) {
        return e.replace(":::::::::::::::::::::::::::::::::::::::::::\n", "")
    }

    function h(e) {
        var t = new Ba;
        return t.encode(e)
    }

    function m(e) {
        var t = new La;
        return t.decode(e)
    }

    function E(e) {
        var t = e.length + 4;
        t % 16 && (t += 16 - t % 16);
        var n = new Uint8Array(t).fill(0);
        return n[0] = 77, n[1] = 80, n[2] = 255 & e.length, n[3] = 255 & e.length >> 8, n.set(e, 4), n
    }

    function _(t) {
        var n;
        if ("string" == typeof t) {
            var r = y(t);
            n = Fa.fromHex(r)
        } else n = t;
        var a = n.slicePad(e.AppendedBlock.StartAdd, 2, 255);
        return a[0] === 77 && a[1] === 80
    }

    function S(e, t) {
        var n = e.slicePad(t, 4, 255);
        return new DataView(n.buffer).getUint32(0, !0)
    }

    function x(e, t) {
        var n = e.slicePad(t, 2, 255);
        return new DataView(n.buffer).getUint16(0, !0)
    }

    function b(e, t) {
        var n = e.slice(t).get(t),
            r = 0;
        for (r = 0; r < n.length && 0 !== n[r]; r++);
        if (r === n.length) return "";
        var a = n.slice(0, r);
        return m(a)
    }

    function T(e) {
        var t = S(e, Ca.MagicValue);
        return t === 401518716
    }

    function P(e) {
        var t = S(e, Ca.PageSize);
        return K(2, t)
    }

    function v(e) {
        return x(e, Ca.StartPage)
    }

    function A(e) {
        return x(e, Ca.PagesUsed)
    }

    function O(e) {
        return S(e, Ca.VersionLocation)
    }

    function I(e) {
        var t = e.slice(268439744);
        if (!T(t)) throw new Error("Could not find valid MicroPython UICR data.");
        var n = P(t),
            r = v(t),
            a = A(t),
            o = O(t),
            l = b(e, o);
        return {
            flashPageSize: n,
            runtimeStartPage: r,
            runtimeStartAddress: r * n,
            runtimeEndUsed: a,
            runtimeEndAddress: a * n,
            versionAddress: o,
            version: l
        }
    }

    function F(e) {
        for (var t = [], n = R(e), r = B(e), a = n, o = 1; a < r;) {
            var l = e.slicePad(a, 1, 255)[0];
            (255 === l || 0 === l) && t.push(o), o++, a += 128
        }
        return t
    }

    function R(e) {
        var t = I(e),
            n = t.runtimeEndAddress;
        if (n % 1024) throw new Error("File system start address from UICR does not align with flash page size.");
        return n
    }

    function L(t) {
        var n = 262144;
        return _(t) && (n = e.AppendedBlock.StartAdd), n - 1024
    }

    function B(e) {
        return L(e) - 1024
    }

    function N(e) {
        e.set(B(e), new Uint8Array([253]))
    }

    function D(e, t) {
        return R(e) + (t - 1) * 128
    }

    function M(e, t) {
        var n = new $a(e, t);
        return n.getFsFileSize()
    }

    function C(e, t, n) {
        if (!t) throw new Error("File has to have a file name.");
        if (!n.length) throw new Error("File " + t + " has to contain data.");
        var r = F(e);
        if (0 === r.length) throw new Error("There is no storage space left.");
        var a = D(e, r[0]),
            o = new $a(t, n),
            l = o.getFsBytes(r);
        return e.set(a, l), N(e), e
    }

    function Y(e, t, n) {
        void 0 === n && (n = !1);
        var r = y(e),
            a = Fa.fromHex(r);
        return Object.keys(t).forEach(function (e) {
            a = C(a, e, t[e])
        }), n ? a.slicePad(0, 262144) : a.asHexString() + "\n"
    }

    function U(e) {
        for (var t = y(e), n = Fa.fromHex(t), r = R(n), a = B(n), o = {}, l = [], i = r, s = 1; i < a;) {
            var d = n.slicePad(i, 128, 255),
                c = d[0];
            255 !== c && 0 !== c && 253 !== c && (o[s] = d, 254 === c && l.push(s)), s++, i += 128
        }
        for (var g = {}, p = 0, u = l; p < u.length; p++) {
            var f = u[p],
                h = o[f],
                E = h[1],
                _ = h[2],
                S = 3 + _,
                x = m(h.slice(3, S));
            if (g.hasOwnProperty(x)) throw new Error("Found multiple files named: " + x + ".");
            g[x] = new Uint8Array(0);
            for (var b = h, T = f, k = Object.keys(o).length + 1; k--;) {
                var P = b[127];
                if (255 === P) {
                    g[x] = Na(g[x], b.slice(S, 1 + E));
                    break
                } else g[x] = Na(g[x], b.slice(S, 127));
                var v = o[P];
                if (!v) throw new Error("Chunk " + T + " points to unused index " + P + ".");
                if (v[0] !== T) throw new Error("Chunk index " + P + " did not link to previous chunk index " + T + ".");
                b = v, T = P, S = 1
            }
            if (0 >= k) throw new Error("Malformed file chunks did not link correctly.")
        }
        return g
    }

    function H(e) {
        var t = y(e),
            n = Fa.fromHex(t),
            r = R(n),
            a = L(n);
        return a - r - 1024
    }
    var X = function (e) {
            try {
                return !!e()
            } catch (t) {
                return !0
            }
        },
        Z = !X(function () {
            return 7 != Object.defineProperty({}, "a", {
                get: function () {
                    return 7
                }
            }).a
        }),
        J = !1,
        q = t(function (e) {
            var t = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
            "number" == typeof __g && (__g = t)
        }),
        Q = t(function (e) {
            var t = e.exports = {
                version: "2.6.9"
            };
            "number" == typeof __e && (__e = t)
        }),
        ee = Q.version,
        te = function (e) {
            return "object" == typeof e ? null !== e : "function" == typeof e
        },
        ne = function (e) {
            if (!te(e)) throw TypeError(e + " is not an object!");
            return e
        },
        re = q.document,
        ae = te(re) && te(re.createElement),
        oe = function (e) {
            return ae ? re.createElement(e) : {}
        },
        le = !Z && !X(function () {
            return 7 != Object.defineProperty(oe("div"), "a", {
                get: function () {
                    return 7
                }
            }).a
        }),
        ie = function (e, t) {
            if (!te(e)) return e;
            var n, r;
            if (t && "function" == typeof (n = e.toString) && !te(r = n.call(e))) return r;
            if ("function" == typeof (n = e.valueOf) && !te(r = n.call(e))) return r;
            if (!t && "function" == typeof (n = e.toString) && !te(r = n.call(e))) return r;
            throw TypeError("Can't convert object to primitive value")
        },
        se = Object.defineProperty,
        de = Z ? Object.defineProperty : function (e, t, n) {
            if (ne(e), t = ie(t, !0), ne(n), le) try {
                return se(e, t, n)
            } catch (t) {}
            if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
            return "value" in n && (e[t] = n.value), e
        },
        f = {
            f: de
        },
        ce = function (e, t) {
            return {
                enumerable: !(1 & e),
                configurable: !(2 & e),
                writable: !(4 & e),
                value: t
            }
        },
        ge = Z ? function (e, t, n) {
            return f.f(e, t, ce(1, n))
        } : function (e, t, n) {
            return e[t] = n, e
        },
        pe = {}.hasOwnProperty,
        ue = function (e, t) {
            return pe.call(e, t)
        },
        fe = 0,
        ye = Math.random(),
        he = function (e) {
            return "Symbol(".concat(e === void 0 ? "" : e, ")_", (++fe + ye).toString(36))
        },
        me = t(function (e) {
            var t = q["__core-js_shared__"] || (q["__core-js_shared__"] = {});
            (e.exports = function (e, n) {
                return t[e] || (t[e] = n === void 0 ? {} : n)
            })("versions", []).push({
                version: Q.version,
                mode: "global",
                copyright: "\xA9 2019 Denis Pushkarev (zloirock.ru)"
            })
        }),
        Ee = me("native-function-to-string", Function.toString),
        _e = t(function (e) {
            var t = he("src"),
                n = "toString",
                r = ("" + Ee).split(n);
            Q.inspectSource = function (e) {
                return Ee.call(e)
            }, (e.exports = function (e, n, a, o) {
                var l = "function" == typeof a;
                l && (ue(a, "name") || ge(a, "name", n));
                e[n] === a || (l && (ue(a, t) || ge(a, t, e[n] ? "" + e[n] : r.join(n + ""))), e === q ? e[n] = a : o ? e[n] ? e[n] = a : ge(e, n, a) : (delete e[n], ge(e, n, a)))
            })(Function.prototype, n, function () {
                return "function" == typeof this && this[t] || Ee.call(this)
            })
        }),
        Se = function (e) {
            if ("function" != typeof e) throw TypeError(e + " is not a function!");
            return e
        },
        xe = function (e, t, n) {
            return (Se(e), void 0 === t) ? e : 1 === n ? function (n) {
                return e.call(t, n)
            } : 2 === n ? function (n, r) {
                return e.call(t, n, r)
            } : 3 === n ? function (n, r, a) {
                return e.call(t, n, r, a)
            } : function () {
                return e.apply(t, arguments)
            }
        },
        be = "prototype",
        Te = function (e, t, n) {
            var r, a, o, l, i = e & Te.F,
                s = e & Te.G,
                d = e & Te.S,
                c = e & Te.P,
                g = e & Te.B,
                p = s ? q : d ? q[t] || (q[t] = {}) : (q[t] || {})[be],
                u = s ? Q : Q[t] || (Q[t] = {}),
                f = u[be] || (u[be] = {});
            for (r in s && (n = t), n) a = !i && p && void 0 !== p[r], o = (a ? p : n)[r], l = g && a ? xe(o, q) : c && "function" == typeof o ? xe(Function.call, o) : o, p && _e(p, r, o, e & Te.U), u[r] != o && ge(u, r, l), c && f[r] != o && (f[r] = o)
        };
    q.core = Q, Te.F = 1, Te.G = 2, Te.S = 4, Te.P = 8, Te.B = 16, Te.W = 32, Te.U = 64, Te.R = 128;
    for (var ke, Pe = Te, ve = he("typed_array"), Ae = he("view"), Oe = !!(q.ArrayBuffer && q.DataView), Ie = Oe, Fe = 0, Re = ["Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array"]; Fe < 9;)(ke = q[Re[Fe++]]) ? (ge(ke.prototype, ve, !0), ge(ke.prototype, Ae, !0)) : Ie = !1;
    var Le = {
            ABV: Oe,
            CONSTR: Ie,
            TYPED: ve,
            VIEW: Ae
        },
        Be = function (e, t, n) {
            for (var r in t) _e(e, r, t[r], n);
            return e
        },
        Ne = function (e, t, n, r) {
            if (!(e instanceof t) || r !== void 0 && r in e) throw TypeError(n + ": incorrect invocation!");
            return e
        },
        De = function (e) {
            return isNaN(e = +e) ? 0 : (0 < e ? G : W)(e)
        },
        Me = function (e) {
            return 0 < e ? V(De(e), 9007199254740991) : 0
        },
        Ce = function (e) {
            if (e === void 0) return 0;
            var t = De(e),
                n = Me(t);
            if (t !== n) throw RangeError("Wrong length!");
            return n
        },
        Ye = {}.toString,
        Ue = function (e) {
            return Ye.call(e).slice(8, -1)
        },
        He = Object("z").propertyIsEnumerable(0) ? Object : function (e) {
            return "String" == Ue(e) ? e.split("") : Object(e)
        },
        $e = function (e) {
            if (e == null) throw TypeError("Can't call method on  " + e);
            return e
        },
        we = function (e) {
            return He($e(e))
        },
        ze = function (e, t) {
            return e = De(e), 0 > e ? z(e + t, 0) : V(e, t)
        },
        je = function (e) {
            return function (t, n, r) {
                var a, o = we(t),
                    l = Me(o.length),
                    i = ze(r, l);
                if (e && n != n) {
                    for (; l > i;)
                        if (a = o[i++], a != a) return !0;
                } else
                    for (; l > i; i++)
                        if ((e || i in o) && o[i] === n) return e || i || 0;
                return !e && -1
            }
        },
        Ve = me("keys"),
        Ge = function (e) {
            return Ve[e] || (Ve[e] = he(e))
        },
        We = je(!1),
        Ke = Ge("IE_PROTO"),
        Xe = function (e, t) {
            var n, r = we(e),
                a = 0,
                o = [];
            for (n in r) n != Ke && ue(r, n) && o.push(n);
            for (; t.length > a;) ue(r, n = t[a++]) && (~We(o, n) || o.push(n));
            return o
        },
        Ze = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"],
        Je = Ze.concat("length", "prototype"),
        qe = Object.getOwnPropertyNames || function (e) {
            return Xe(e, Je)
        },
        Qe = {
            f: qe
        },
        et = function (e) {
            return Object($e(e))
        },
        tt = function (e) {
            for (var t = et(this), n = Me(t.length), r = arguments.length, a = ze(1 < r ? arguments[1] : void 0, n), o = 2 < r ? arguments[2] : void 0, l = void 0 === o ? n : ze(o, n); l > a;) t[a++] = e;
            return t
        },
        nt = t(function (e) {
            var t = me("wks"),
                n = q.Symbol,
                r = "function" == typeof n,
                a = e.exports = function (e) {
                    return t[e] || (t[e] = r && n[e] || (r ? n : he)("Symbol." + e))
                };
            a.store = t
        }),
        rt = f.f,
        ot = nt("toStringTag"),
        lt = function (e, t, n) {
            e && !ue(e = n ? e : e.prototype, ot) && rt(e, ot, {
                configurable: !0,
                value: t
            })
        },
        it = t(function (e, t) {
            function n(t, n, r) {
                var a, o, l, d = Array(r),
                    g = 8 * r - n - 1,
                    p = (1 << g) - 1,
                    u = p >> 1,
                    f = 23 === n ? v(2, -24) - v(2, -77) : 0,
                    y = 0,
                    h = 0 > t || 0 === t && 0 > 1 / t ? 1 : 0;
                for (t = P(t), t != t || t === T ? (o = t == t ? 0 : 1, a = p) : (a = A(O(t) / I), 1 > t * (l = v(2, -a)) && (a--, l *= 2), t += 1 <= a + u ? f / l : f * v(2, 1 - u), 2 <= t * l && (a++, l /= 2), a + u >= p ? (o = 0, a = p) : 1 <= a + u ? (o = (t * l - 1) * v(2, n), a += u) : (o = t * v(2, u - 1) * v(2, n), a = 0)); 8 <= n; d[y++] = 255 & o, o /= 256, n -= 8);
                for (a = a << n | o, g += n; 0 < g; d[y++] = 255 & a, a /= 256, g -= 8);
                return d[--y] |= 128 * h, d
            }

            function r(t, n, r) {
                var a, o = 8 * r - n - 1,
                    l = (1 << o) - 1,
                    d = l >> 1,
                    c = o - 7,
                    g = r - 1,
                    p = t[g--],
                    u = 127 & p;
                for (p >>= 7; 0 < c; u = 256 * u + t[g], g--, c -= 8);
                for (a = u & (1 << -c) - 1, u >>= -c, c += n; 0 < c; a = 256 * a + t[g], g--, c -= 8);
                if (0 === u) u = 1 - d;
                else {
                    if (u === l) return a ? NaN : p ? -T : T;
                    a += v(2, n), u -= d
                }
                return (p ? -1 : 1) * a * v(2, u - n)
            }

            function a(e) {
                return e[3] << 24 | e[2] << 16 | e[1] << 8 | e[0]
            }

            function o(e) {
                return [255 & e]
            }

            function l(e) {
                return [255 & e, 255 & e >> 8]
            }

            function i(e) {
                return [255 & e, 255 & e >> 8, 255 & e >> 16, 255 & e >> 24]
            }

            function s(e) {
                return n(e, 52, 8)
            }

            function d(e) {
                return n(e, 23, 4)
            }

            function c(e, t, n) {
                y(e.prototype, t, {
                    get: function () {
                        return this[n]
                    }
                })
            }

            function g(e, t, n, r) {
                var a = Ce(+n);
                if (a + t > e[N]) throw b("Wrong index!");
                var o = e[B]._b,
                    l = a + e[D],
                    i = o.slice(l, l + t);
                return r ? i : i.reverse()
            }

            function p(e, t, n, r, a, o) {
                var l = Ce(+n);
                if (l + t > e[N]) throw b("Wrong index!");
                for (var s = e[B]._b, d = l + e[D], c = r(+a), g = 0; g < t; g++) s[d + g] = c[o ? g : t - g - 1]
            }
            var u = Qe.f,
                y = f.f,
                h = "ArrayBuffer",
                m = "DataView",
                E = "prototype",
                _ = q[h],
                S = q[m],
                x = q.Math,
                b = q.RangeError,
                T = q.Infinity,
                k = _,
                P = x.abs,
                v = K,
                A = G,
                O = x.log,
                I = x.LN2,
                F = "buffer",
                R = "byteLength",
                L = "byteOffset",
                B = Z ? "_b" : F,
                N = Z ? "_l" : R,
                D = Z ? "_o" : L;
            if (!Le.ABV) _ = function (e) {
                Ne(this, _, h);
                var t = Ce(e);
                this._b = tt.call(Array(t), 0), this[N] = t
            }, S = function (e, t, n) {
                Ne(this, S, m), Ne(e, _, m);
                var r = e[N],
                    a = De(t);
                if (0 > a || a > r) throw b("Wrong offset!");
                if (n = void 0 === n ? r - a : Me(n), a + n > r) throw b("Wrong length!");
                this[B] = e, this[D] = a, this[N] = n
            }, Z && (c(_, R, "_l"), c(S, F, "_b"), c(S, R, "_l"), c(S, L, "_o")), Be(S[E], {
                getInt8: function (e) {
                    return g(this, 1, e)[0] << 24 >> 24
                },
                getUint8: function (e) {
                    return g(this, 1, e)[0]
                },
                getInt16: function (e) {
                    var t = g(this, 2, e, arguments[1]);
                    return (t[1] << 8 | t[0]) << 16 >> 16
                },
                getUint16: function (e) {
                    var t = g(this, 2, e, arguments[1]);
                    return t[1] << 8 | t[0]
                },
                getInt32: function (e) {
                    return a(g(this, 4, e, arguments[1]))
                },
                getUint32: function (e) {
                    return a(g(this, 4, e, arguments[1])) >>> 0
                },
                getFloat32: function (e) {
                    return r(g(this, 4, e, arguments[1]), 23, 4)
                },
                getFloat64: function (e) {
                    return r(g(this, 8, e, arguments[1]), 52, 8)
                },
                setInt8: function (e, t) {
                    p(this, 1, e, o, t)
                },
                setUint8: function (e, t) {
                    p(this, 1, e, o, t)
                },
                setInt16: function (e, t) {
                    p(this, 2, e, l, t, arguments[2])
                },
                setUint16: function (e, t) {
                    p(this, 2, e, l, t, arguments[2])
                },
                setInt32: function (e, t) {
                    p(this, 4, e, i, t, arguments[2])
                },
                setUint32: function (e, t) {
                    p(this, 4, e, i, t, arguments[2])
                },
                setFloat32: function (e, t) {
                    p(this, 4, e, d, t, arguments[2])
                },
                setFloat64: function (e, t) {
                    p(this, 8, e, s, t, arguments[2])
                }
            });
            else {
                if (!X(function () {
                        _(1)
                    }) || !X(function () {
                        new _(-1)
                    }) || X(function () {
                        return new _, new _(1.5), new _(NaN), _.name != h
                    })) {
                    _ = function (e) {
                        return Ne(this, _), new k(Ce(e))
                    };
                    for (var M, C = _[E] = k[E], Y = u(k), U = 0; Y.length > U;)(M = Y[U++]) in _ || ge(_, M, k[M]);
                    C.constructor = _
                }
                var H = new S(new _(2)),
                    $ = S[E].setInt8;
                H.setInt8(0, 2147483648), H.setInt8(1, 2147483649), (H.getInt8(0) || !H.getInt8(1)) && Be(S[E], {
                    setInt8: function (e, t) {
                        $.call(this, e, t << 24 >> 24)
                    },
                    setUint8: function (e, t) {
                        $.call(this, e, t << 24 >> 24)
                    }
                }, !0)
            }
            lt(_, h), lt(S, m), ge(S[E], Le.VIEW, !0), t[h] = _, t[m] = S
        }),
        st = nt("toStringTag"),
        dt = "Arguments" == Ue(function () {
            return arguments
        }()),
        ct = function (e, t) {
            try {
                return e[t]
            } catch (t) {}
        },
        gt = function (e) {
            var t, n, r;
            return e === void 0 ? "Undefined" : null === e ? "Null" : "string" == typeof (n = ct(t = Object(e), st)) ? n : dt ? Ue(t) : "Object" == (r = Ue(t)) && "function" == typeof t.callee ? "Arguments" : r
        },
        pt = {},
        ut = nt("iterator"),
        ft = Array.prototype,
        yt = function (e) {
            return e !== void 0 && (pt.Array === e || ft[ut] === e)
        },
        ht = Object.keys || function (e) {
            return Xe(e, Ze)
        },
        mt = Z ? Object.defineProperties : function (e, t) {
            ne(e);
            for (var n, r = ht(t), a = r.length, o = 0; a > o;) f.f(e, n = r[o++], t[n]);
            return e
        },
        Et = q.document,
        _t = Et && Et.documentElement,
        St = Ge("IE_PROTO"),
        xt = function () {},
        bt = "prototype",
        Tt = function () {
            var e, t = oe("iframe"),
                n = Ze.length,
                r = "<",
                a = ">";
            for (t.style.display = "none", _t.appendChild(t), t.src = "javascript:", e = t.contentWindow.document, e.open(), e.write(r + "script" + a + "document.F=Object" + r + "/script" + a), e.close(), Tt = e.F; n--;) delete Tt[bt][Ze[n]];
            return Tt()
        },
        kt = Object.create || function (e, t) {
            var n;
            return null === e ? n = Tt() : (xt[bt] = ne(e), n = new xt, xt[bt] = null, n[St] = e), void 0 === t ? n : mt(n, t)
        },
        Pt = Ge("IE_PROTO"),
        vt = Object.prototype,
        At = Object.getPrototypeOf || function (e) {
            return e = et(e), ue(e, Pt) ? e[Pt] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? vt : null
        },
        Ot = nt("iterator"),
        It = Q.getIteratorMethod = function (e) {
            if (e != null) return e[Ot] || e["@@iterator"] || pt[gt(e)]
        },
        Ft = Array.isArray || function (e) {
            return "Array" == Ue(e)
        },
        Rt = nt("species"),
        Lt = function (e) {
            var t;
            return Ft(e) && (t = e.constructor, "function" == typeof t && (t === Array || Ft(t.prototype)) && (t = void 0), te(t) && (t = t[Rt], null === t && (t = void 0))), void 0 === t ? Array : t
        },
        Bt = function (e, t) {
            return new(Lt(e))(t)
        },
        Nt = function (e, t) {
            var n = 1 == e,
                r = 4 == e,
                a = 6 == e,
                o = t || Bt;
            return function (t, l, i) {
                for (var s, d, c = et(t), g = He(c), p = xe(l, i, 3), u = Me(g.length), f = 0, y = n ? o(t, u) : 2 == e ? o(t, 0) : void 0; u > f; f++)
                    if ((5 == e || a || f in g) && (s = g[f], d = p(s, f, c), e))
                        if (n) y[f] = d;
                        else if (d) switch (e) {
                    case 3:
                        return !0;
                    case 5:
                        return s;
                    case 6:
                        return f;
                    case 2:
                        y.push(s);
                } else if (r) return !1;
                return a ? -1 : 3 == e || r ? r : y
            }
        },
        Dt = nt("species"),
        Mt = function (e, t) {
            var n, r = ne(e).constructor;
            return r === void 0 || (n = ne(r)[Dt]) == null ? t : Se(n)
        },
        Ct = nt("unscopables"),
        Yt = Array.prototype;
    Yt[Ct] == null && ge(Yt, Ct, {});
    var Ut = function (e) {
            Yt[Ct][e] = !0
        },
        Ht = function (e, t) {
            return {
                value: t,
                done: !!e
            }
        },
        $t = {};
    ge($t, nt("iterator"), function () {
        return this
    });
    var wt = function (e, t, n) {
            e.prototype = kt($t, {
                next: ce(1, n)
            }), lt(e, t + " Iterator")
        },
        zt = nt("iterator"),
        jt = !([].keys && "next" in [].keys()),
        Vt = "keys",
        Gt = "values",
        Wt = function () {
            return this
        },
        Kt = function (e, t, n, r, a, o, l) {
            wt(n, t, r);
            var i, s, d, c = function (e) {
                    return !jt && e in f ? f[e] : e === Vt ? function () {
                        return new n(this, e)
                    } : e === Gt ? function () {
                        return new n(this, e)
                    } : function () {
                        return new n(this, e)
                    }
                },
                g = t + " Iterator",
                p = a == Gt,
                u = !1,
                f = e.prototype,
                y = f[zt] || f["@@iterator"] || a && f[a],
                h = y || c(a),
                m = a ? p ? c("entries") : h : void 0,
                E = "Array" == t ? f.entries || y : y;
            if (E && (d = At(E.call(new e)), d !== Object.prototype && d.next && (lt(d, g, !0), !J && "function" != typeof d[zt] && ge(d, zt, Wt))), p && y && y.name !== Gt && (u = !0, h = function () {
                    return y.call(this)
                }), (!J || l) && (jt || u || !f[zt]) && ge(f, zt, h), pt[t] = h, pt[g] = Wt, a)
                if (i = {
                        values: p ? h : c(Gt),
                        keys: o ? h : c(Vt),
                        entries: m
                    }, l)
                    for (s in i) s in f || _e(f, s, i[s]);
                else Pe(Pe.P + Pe.F * (jt || u), t, i);
            return i
        },
        Xt = Kt(Array, "Array", function (e, t) {
            this._t = we(e), this._i = 0, this._k = t
        }, function () {
            var e = this._t,
                t = this._k,
                n = this._i++;
            return !e || n >= e.length ? (this._t = void 0, Ht(1)) : "keys" == t ? Ht(0, n) : "values" == t ? Ht(0, e[n]) : Ht(0, [n, e[n]])
        }, "values");
    pt.Arguments = pt.Array, Ut("keys"), Ut("values"), Ut("entries");
    var Zt = nt("iterator"),
        Jt = !1;
    try {
        var qt = [7][Zt]();
        qt["return"] = function () {
            Jt = !0
        }
    } catch (t) {}
    var Qt = function (e, t) {
            if (!t && !Jt) return !1;
            var n = !1;
            try {
                var r = [7],
                    a = r[Zt]();
                a.next = function () {
                    return {
                        done: n = !0
                    }
                }, r[Zt] = function () {
                    return a
                }, e(r)
            } catch (t) {}
            return n
        },
        en = nt("species"),
        tn = function (e) {
            var t = q[e];
            Z && t && !t[en] && f.f(t, en, {
                configurable: !0,
                get: function () {
                    return this
                }
            })
        },
        nn = [].copyWithin || function (e, t) {
            var n = et(this),
                r = Me(n.length),
                a = ze(e, r),
                o = ze(t, r),
                l = 2 < arguments.length ? arguments[2] : void 0,
                i = V((l === void 0 ? r : ze(l, r)) - o, r - a),
                s = 1;
            for (o < a && a < o + i && (s = -1, o += i - 1, a += i - 1); 0 < i--;) o in n ? n[a] = n[o] : delete n[a], a += s, o += s;
            return n
        },
        rn = {}.propertyIsEnumerable,
        an = {
            f: rn
        },
        on = Object.getOwnPropertyDescriptor,
        ln = Z ? on : function (e, t) {
            if (e = we(e), t = ie(t, !0), le) try {
                return on(e, t)
            } catch (t) {}
            return ue(e, t) ? ce(!an.f.call(e, t), e[t]) : void 0
        },
        sn = {
            f: ln
        },
        dn = t(function (e) {
            if (Z) {
                var t = J,
                    n = q,
                    r = X,
                    a = Pe,
                    o = Le,
                    l = it,
                    i = Ne,
                    s = ge,
                    d = Be,
                    c = Me,
                    g = Ce,
                    p = ze,
                    u = ie,
                    y = ue,
                    h = gt,
                    m = te,
                    E = et,
                    _ = Qe.f,
                    S = he,
                    x = nt,
                    b = Nt,
                    T = je,
                    k = Mt,
                    P = Xt,
                    v = f,
                    A = sn,
                    I = v.f,
                    O = A.f,
                    F = n.RangeError,
                    R = n.TypeError,
                    L = n.Uint8Array,
                    B = "ArrayBuffer",
                    N = "Shared" + B,
                    D = "BYTES_PER_ELEMENT",
                    M = "prototype",
                    C = Array[M],
                    Y = l.ArrayBuffer,
                    U = l.DataView,
                    H = b(0),
                    $ = b(2),
                    w = b(3),
                    z = b(4),
                    j = b(5),
                    V = b(6),
                    W = T(!0),
                    K = T(!1),
                    Q = P.values,
                    ee = P.keys,
                    ne = P.entries,
                    re = C.lastIndexOf,
                    ae = C.reduce,
                    oe = C.reduceRight,
                    le = C.join,
                    se = C.sort,
                    de = C.slice,
                    pe = C.toString,
                    fe = C.toLocaleString,
                    ye = x("iterator"),
                    me = x("toStringTag"),
                    Ee = S("typed_constructor"),
                    _e = S("def_constructor"),
                    Se = o.CONSTR,
                    be = o.TYPED,
                    Te = o.VIEW,
                    ke = "Wrong length!",
                    ve = b(1, function (e, t) {
                        return Re(k(e, e[_e]), t)
                    }),
                    Ae = r(function () {
                        return 1 === new L(new Uint16Array([1]).buffer)[0]
                    }),
                    Oe = !!L && !!L[M].set && r(function () {
                        new L(1).set({})
                    }),
                    Ie = function (e, t) {
                        var n = De(e);
                        if (0 > n || n % t) throw F("Wrong offset!");
                        return n
                    },
                    Fe = function (e) {
                        if (m(e) && be in e) return e;
                        throw R(e + " is not a typed array!")
                    },
                    Re = function (e, t) {
                        if (!(m(e) && Ee in e)) throw R("It is not a typed array constructor!");
                        return new e(t)
                    },
                    Ye = function (e, t) {
                        return Ue(k(e, e[_e]), t)
                    },
                    Ue = function (e, t) {
                        for (var n = 0, r = t.length, a = Re(e, r); r > n;) a[n] = t[n++];
                        return a
                    },
                    He = function (e, t, n) {
                        I(e, t, {
                            get: function () {
                                return this._d[n]
                            }
                        })
                    },
                    $e = function (e) {
                        var t, n, r, a, o, l, s = E(e),
                            d = arguments.length,
                            g = 1 < d ? arguments[1] : void 0,
                            p = g !== void 0,
                            u = It(s);
                        if (u != null && !yt(u)) {
                            for (l = u.call(s), r = [], t = 0; !(o = l.next()).done; t++) r.push(o.value);
                            s = r
                        }
                        for (p && 2 < d && (g = xe(g, arguments[2], 2)), t = 0, n = c(s.length), a = Re(this, n); n > t; t++) a[t] = p ? g(s[t], t) : s[t];
                        return a
                    },
                    we = function () {
                        for (var e = 0, t = arguments.length, n = Re(this, t); t > e;) n[e] = arguments[e++];
                        return n
                    },
                    Ve = !!L && r(function () {
                        fe.call(new L(1))
                    }),
                    Ge = function () {
                        return fe.apply(Ve ? de.call(Fe(this)) : Fe(this), arguments)
                    },
                    We = {
                        copyWithin: function (e, t) {
                            return nn.call(Fe(this), e, t, 2 < arguments.length ? arguments[2] : void 0)
                        },
                        every: function (e) {
                            return z(Fe(this), e, 1 < arguments.length ? arguments[1] : void 0)
                        },
                        fill: function () {
                            return tt.apply(Fe(this), arguments)
                        },
                        filter: function (e) {
                            return Ye(this, $(Fe(this), e, 1 < arguments.length ? arguments[1] : void 0))
                        },
                        find: function (e) {
                            return j(Fe(this), e, 1 < arguments.length ? arguments[1] : void 0)
                        },
                        findIndex: function (e) {
                            return V(Fe(this), e, 1 < arguments.length ? arguments[1] : void 0)
                        },
                        forEach: function (e) {
                            H(Fe(this), e, 1 < arguments.length ? arguments[1] : void 0)
                        },
                        indexOf: function (e) {
                            return K(Fe(this), e, 1 < arguments.length ? arguments[1] : void 0)
                        },
                        includes: function (e) {
                            return W(Fe(this), e, 1 < arguments.length ? arguments[1] : void 0)
                        },
                        join: function () {
                            return le.apply(Fe(this), arguments)
                        },
                        lastIndexOf: function () {
                            return re.apply(Fe(this), arguments)
                        },
                        map: function (e) {
                            return ve(Fe(this), e, 1 < arguments.length ? arguments[1] : void 0)
                        },
                        reduce: function () {
                            return ae.apply(Fe(this), arguments)
                        },
                        reduceRight: function () {
                            return oe.apply(Fe(this), arguments)
                        },
                        reverse: function () {
                            for (var e, t = this, n = Fe(t).length, r = G(n / 2), a = 0; a < r;) e = t[a], t[a++] = t[--n], t[n] = e;
                            return t
                        },
                        some: function (e) {
                            return w(Fe(this), e, 1 < arguments.length ? arguments[1] : void 0)
                        },
                        sort: function (e) {
                            return se.call(Fe(this), e)
                        },
                        subarray: function (e, t) {
                            var n = Fe(this),
                                r = n.length,
                                a = p(e, r);
                            return new(k(n, n[_e]))(n.buffer, n.byteOffset + a * n.BYTES_PER_ELEMENT, c((t === void 0 ? r : p(t, r)) - a))
                        }
                    },
                    Ke = function (e, t) {
                        return Ye(this, de.call(Fe(this), e, t))
                    },
                    Xe = function (e) {
                        Fe(this);
                        var t = Ie(arguments[1], 1),
                            n = this.length,
                            r = E(e),
                            a = c(r.length),
                            o = 0;
                        if (a + t > n) throw F(ke);
                        for (; o < a;) this[t + o] = r[o++]
                    },
                    Ze = {
                        entries: function () {
                            return ne.call(Fe(this))
                        },
                        keys: function () {
                            return ee.call(Fe(this))
                        },
                        values: function () {
                            return Q.call(Fe(this))
                        }
                    },
                    Je = function (e, t) {
                        return m(e) && e[be] && "symbol" != typeof t && t in e && +t + "" == t + ""
                    },
                    qe = function (e, t) {
                        return Je(e, t = u(t, !0)) ? ce(2, e[t]) : O(e, t)
                    },
                    rt = function (e, t, n) {
                        return Je(e, t = u(t, !0)) && m(n) && y(n, "value") && !y(n, "get") && !y(n, "set") && !n.configurable && (!y(n, "writable") || n.writable) && (!y(n, "enumerable") || n.enumerable) ? (e[t] = n.value, e) : I(e, t, n)
                    };
                Se || (A.f = qe, v.f = rt), a(a.S + a.F * !Se, "Object", {
                    getOwnPropertyDescriptor: qe,
                    defineProperty: rt
                }), r(function () {
                    pe.call({})
                }) && (pe = fe = function () {
                    return le.call(this)
                });
                var at = d({}, We);
                d(at, Ze), s(at, ye, Ze.values), d(at, {
                    slice: Ke,
                    set: Xe,
                    constructor: function () {},
                    toString: pe,
                    toLocaleString: Ge
                }), He(at, "buffer", "b"), He(at, "byteOffset", "o"), He(at, "byteLength", "l"), He(at, "length", "e"), I(at, me, {
                    get: function () {
                        return this[be]
                    }
                }), e.exports = function (e, l, d, p) {
                    p = !!p;
                    var u = e + (p ? "Clamped" : "") + "Array",
                        f = n[u],
                        y = f || {},
                        E = f && At(f),
                        S = !f || !o.ABV,
                        x = {},
                        b = f && f[M],
                        T = function (t, n) {
                            var r = t._d;
                            return r.v["get" + e](n * l + r.o, Ae)
                        },
                        k = function (t, n, r) {
                            var a = t._d;
                            p && (r = 0 > (r = Math.round(r)) ? 0 : 255 < r ? 255 : 255 & r), a.v["set" + e](n * l + a.o, r, Ae)
                        },
                        P = function (e, t) {
                            I(e, t, {
                                get: function () {
                                    return T(this, t)
                                },
                                set: function (e) {
                                    return k(this, t, e)
                                },
                                enumerable: !0
                            })
                        };
                    S ? (f = d(function (e, t, n, r) {
                        i(e, f, u, "_d");
                        var a, o, d, p, y = 0,
                            E = 0;
                        if (!m(t)) d = g(t), o = d * l, a = new Y(o);
                        else if (t instanceof Y || (p = h(t)) == B || p == N) {
                            a = t, E = Ie(n, l);
                            var _ = t.byteLength;
                            if (void 0 === r) {
                                if (_ % l) throw F(ke);
                                if (o = _ - E, 0 > o) throw F(ke)
                            } else if (o = c(r) * l, o + E > _) throw F(ke);
                            d = o / l
                        } else return be in t ? Ue(f, t) : $e.call(f, t);
                        for (s(e, "_d", {
                                b: a,
                                o: E,
                                l: o,
                                e: d,
                                v: new U(a)
                            }); y < d;) P(e, y++)
                    }), b = f[M] = kt(at), s(b, "constructor", f)) : (!r(function () {
                        f(1)
                    }) || !r(function () {
                        new f(-1)
                    }) || !Qt(function (e) {
                        new f, new f(null), new f(1.5), new f(e)
                    }, !0)) && (f = d(function (e, t, n, r) {
                        i(e, f, u);
                        var a;
                        return m(t) ? t instanceof Y || (a = h(t)) == B || a == N ? void 0 === r ? void 0 === n ? new y(t) : new y(t, Ie(n, l)) : new y(t, Ie(n, l), r) : be in t ? Ue(f, t) : $e.call(f, t) : new y(g(t))
                    }), H(E === Function.prototype ? _(y) : _(y).concat(_(E)), function (e) {
                        e in f || s(f, e, y[e])
                    }), f[M] = b, !t && (b.constructor = f));
                    var v = b[ye],
                        A = !!v && ("values" == v.name || v.name == null),
                        O = Ze.values;
                    s(f, Ee, !0), s(b, be, u), s(b, Te, !0), s(b, _e, f), (p ? new f(1)[me] != u : !(me in b)) && I(b, me, {
                        get: function () {
                            return u
                        }
                    }), x[u] = f, a(a.G + a.W + a.F * (f != y), x), a(a.S, u, {
                        BYTES_PER_ELEMENT: l
                    }), a(a.S + a.F * r(function () {
                        y.of.call(f, 1)
                    }), u, {
                        from: $e,
                        of: we
                    }), D in b || s(b, D, l), a(a.P, u, We), tn(u), a(a.P + a.F * Oe, u, {
                        set: Xe
                    }), a(a.P + a.F * !A, u, Ze), t || b.toString == pe || (b.toString = pe), a(a.P + a.F * r(function () {
                        new f(1).slice()
                    }), u, {
                        slice: Ke
                    }), a(a.P + a.F * (r(function () {
                        return [1, 2].toLocaleString() != new f([1, 2]).toLocaleString()
                    }) || !r(function () {
                        b.toLocaleString.call([1, 2])
                    })), u, {
                        toLocaleString: Ge
                    }), pt[u] = A ? v : O, t || A || s(b, ye, O)
                }
            } else e.exports = function () {}
        });
    dn("Uint8", 1, function (e) {
        return function (t, n, r) {
            return e(this, t, n, r)
        }
    }), Pe(Pe.P, "Array", {
        fill: tt
    }), Ut("fill");
    var cn = function (e) {
            return function (t, n) {
                var r, o, d = $e(t) + "",
                    s = De(n),
                    i = d.length;
                return 0 > s || s >= i ? e ? "" : void 0 : (r = d.charCodeAt(s), 55296 > r || 56319 < r || s + 1 === i || 56320 > (o = d.charCodeAt(s + 1)) || 57343 < o ? e ? d.charAt(s) : r : e ? d.slice(s, s + 2) : (r - 55296 << 10) + (o - 56320) + 65536)
            }
        },
        gn = cn(!0),
        at = function (e, t, n) {
            return t + (n ? gn(e, t).length : 1)
        },
        pn = RegExp.prototype.exec,
        un = function (e, t) {
            var n = e.exec;
            if ("function" == typeof n) {
                var r = n.call(e, t);
                if ("object" != typeof r) throw new TypeError("RegExp exec method returned something other than an Object or null");
                return r
            }
            if ("RegExp" !== gt(e)) throw new TypeError("RegExp#exec called on incompatible receiver");
            return pn.call(e, t)
        },
        fn = function () {
            var e = ne(this),
                t = "";
            return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.unicode && (t += "u"), e.sticky && (t += "y"), t
        },
        yn = RegExp.prototype.exec,
        hn = w.replace,
        mn = yn,
        En = "lastIndex",
        _n = function () {
            var e = /a/,
                t = /b*/g;
            return yn.call(e, "a"), yn.call(t, "a"), 0 !== e[En] || 0 !== t[En]
        }(),
        Sn = /()??/.exec("")[1] !== void 0;
    (_n || Sn) && (mn = function (e) {
        var t, n, r, a, o = this;
        return Sn && (n = new RegExp("^" + o.source + "$(?!\\s)", fn.call(o))), _n && (t = o[En]), r = yn.call(o, e), _n && r && (o[En] = o.global ? r.index + r[0].length : t), Sn && r && 1 < r.length && hn.call(r[0], n, function () {
            for (a = 1; a < arguments.length - 2; a++) void 0 === arguments[a] && (r[a] = void 0)
        }), r
    });
    var xn = mn;
    Pe({
        target: "RegExp",
        proto: !0,
        forced: xn !== /./.exec
    }, {
        exec: xn
    });
    var bn = nt("species"),
        Tn = !X(function () {
            var e = /./;
            return e.exec = function () {
                var e = [];
                return e.groups = {
                    a: "7"
                }, e
            }, "7" !== "".replace(e, "$<a>")
        }),
        kn = function () {
            var e = /(?:)/,
                t = e.exec;
            e.exec = function () {
                return t.apply(this, arguments)
            };
            var n = "ab".split(e);
            return 2 === n.length && "a" === n[0] && "b" === n[1]
        }(),
        Pn = function (e, t, n) {
            var r = nt(e),
                a = !X(function () {
                    var t = {};
                    return t[r] = function () {
                        return 7
                    }, 7 != "" [e](t)
                }),
                o = a ? !X(function () {
                    var t = !1,
                        n = /a/;
                    return n.exec = function () {
                        return t = !0, null
                    }, "split" === e && (n.constructor = {}, n.constructor[bn] = function () {
                        return n
                    }), n[r](""), !t
                }) : void 0;
            if (!a || !o || "replace" === e && !Tn || "split" === e && !kn) {
                var l = /./ [r],
                    i = n($e, r, "" [e], function (e, t, n, r, o) {
                        return t.exec === xn ? a && !o ? {
                            done: !0,
                            value: l.call(t, n, r)
                        } : {
                            done: !0,
                            value: e.call(n, t, r)
                        } : {
                            done: !1
                        }
                    }),
                    s = i[0],
                    d = i[1];
                _e(String.prototype, e, s), ge(RegExp.prototype, r, 2 == t ? function (e, t) {
                    return d.call(e, this, t)
                } : function (e) {
                    return d.call(e, this)
                })
            }
        },
        vn = /\$([$&`']|\d\d?|<[^>]*>)/g,
        An = /\$([$&`']|\d\d?)/g,
        On = function (e) {
            return e === void 0 ? e : e + ""
        };
    Pn("replace", 2, function (e, t, n, r) {
        function a(e, t, r, a, o, l) {
            var i = r + e.length,
                s = a.length,
                d = An;
            return void 0 !== o && (o = et(o), d = vn), n.call(l, d, function (l, d) {
                var c;
                switch (d.charAt(0)) {
                    case "$":
                        return "$";
                    case "&":
                        return e;
                    case "`":
                        return t.slice(0, r);
                    case "'":
                        return t.slice(i);
                    case "<":
                        c = o[d.slice(1, -1)];
                        break;
                    default:
                        var g = +d;
                        if (0 == g) return l;
                        if (g > s) {
                            var n = G(g / 10);
                            return 0 === n ? l : n <= s ? void 0 === a[n - 1] ? d.charAt(1) : a[n - 1] + d.charAt(1) : l
                        }
                        c = a[g - 1];
                }
                return void 0 === c ? "" : c
            })
        }
        return [function (r, a) {
            var o = e(this),
                l = r == null ? void 0 : r[t];
            return l === void 0 ? n.call(o + "", r, a) : l.call(r, o, a)
        }, function (e, t) {
            var o = r(n, e, this, t);
            if (o.done) return o.value;
            var l = ne(e),
                s = this + "",
                d = "function" == typeof t;
            d || (t = t + "");
            var c = l.global;
            if (c) {
                var g = l.unicode;
                l.lastIndex = 0
            }
            for (var p, u = [];
                (p = un(l, s), null !== p) && !(u.push(p), !c);) {
                var f = p[0] + "";
                "" == f && (l.lastIndex = at(s, Me(l.lastIndex), g))
            }
            for (var y = "", h = 0, m = 0; m < u.length; m++) {
                p = u[m];
                for (var E = p[0] + "", _ = z(V(De(p.index), s.length), 0), S = [], x = 1; x < p.length; x++) S.push(On(p[x]));
                var b = p.groups;
                if (d) {
                    var T = [E].concat(S, _, s);
                    b !== void 0 && T.push(b);
                    var k = t.apply(void 0, T) + ""
                } else k = a(E, s, _, S, b, t);
                _ >= h && (y += s.slice(h, _) + k, h = _ + E.length)
            }
            return y + s.slice(h)
        }]
    });
    var In = function (t, n, e, r) {
            try {
                return r ? n(ne(e)[0], e[1]) : n(e)
            } catch (n) {
                var a = t["return"];
                throw void 0 !== a && ne(a.call(t)), n
            }
        },
        Fn = t(function (e) {
            var t = {},
                n = {},
                r = e.exports = function (e, r, a, o, l) {
                    var i, s, d, c, g = l ? function () {
                            return e
                        } : It(e),
                        p = xe(a, o, r ? 2 : 1),
                        u = 0;
                    if ("function" != typeof g) throw TypeError(e + " is not iterable!");
                    if (yt(g)) {
                        for (i = Me(e.length); i > u; u++)
                            if (c = r ? p(ne(s = e[u])[0], s[1]) : p(e[u]), c === t || c === n) return c;
                    } else
                        for (d = g.call(e); !(s = d.next()).done;)
                            if (c = In(d, p, s.value, r), c === t || c === n) return c
                };
            r.BREAK = t, r.RETURN = n
        }),
        Rn = t(function (e) {
            var t = he("meta"),
                n = f.f,
                r = 0,
                a = Object.isExtensible || function () {
                    return !0
                },
                o = !X(function () {
                    return a(Object.preventExtensions({}))
                }),
                l = function (e) {
                    n(e, t, {
                        value: {
                            i: "O" + ++r,
                            w: {}
                        }
                    })
                },
                i = e.exports = {
                    KEY: t,
                    NEED: !1,
                    fastKey: function (e, n) {
                        if (!te(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
                        if (!ue(e, t)) {
                            if (!a(e)) return "F";
                            if (!n) return "E";
                            l(e)
                        }
                        return e[t].i
                    },
                    getWeak: function (e, n) {
                        if (!ue(e, t)) {
                            if (!a(e)) return !0;
                            if (!n) return !1;
                            l(e)
                        }
                        return e[t].w
                    },
                    onFreeze: function (e) {
                        return o && i.NEED && a(e) && !ue(e, t) && l(e), e
                    }
                }
        }),
        Ln = Rn.KEY,
        Bn = Rn.NEED,
        Nn = Rn.fastKey,
        Dn = Rn.getWeak,
        Mn = Rn.onFreeze,
        Cn = function (e, t) {
            if (!te(e) || e._t !== t) throw TypeError("Incompatible receiver, " + t + " required!");
            return e
        },
        Yn = f.f,
        Un = Rn.fastKey,
        Hn = Z ? "_s" : "size",
        $n = function (e, t) {
            var n, r = Un(t);
            if ("F" !== r) return e._i[r];
            for (n = e._f; n; n = n.n)
                if (n.k == t) return n
        },
        wn = {
            getConstructor: function (e, t, n, r) {
                var a = e(function (e, o) {
                    Ne(e, a, t, "_i"), e._t = t, e._i = kt(null), e._f = void 0, e._l = void 0, e[Hn] = 0, null != o && Fn(o, n, e[r], e)
                });
                return Be(a.prototype, {
                    clear: function () {
                        for (var e = Cn(this, t), n = e._i, r = e._f; r; r = r.n) r.r = !0, r.p && (r.p = r.p.n = void 0), delete n[r.i];
                        e._f = e._l = void 0, e[Hn] = 0
                    },
                    delete: function (e) {
                        var n = Cn(this, t),
                            r = $n(n, e);
                        if (r) {
                            var a = r.n,
                                o = r.p;
                            delete n._i[r.i], r.r = !0, o && (o.n = a), a && (a.p = o), n._f == r && (n._f = a), n._l == r && (n._l = o), n[Hn]--
                        }
                        return !!r
                    },
                    forEach: function (e) {
                        Cn(this, t);
                        for (var n, r = xe(e, 1 < arguments.length ? arguments[1] : void 0, 3); n = n ? n.n : this._f;)
                            for (r(n.v, n.k, this); n && n.r;) n = n.p
                    },
                    has: function (e) {
                        return !!$n(Cn(this, t), e)
                    }
                }), Z && Yn(a.prototype, "size", {
                    get: function () {
                        return Cn(this, t)[Hn]
                    }
                }), a
            },
            def: function (e, t, n) {
                var r, a, o = $n(e, t);
                return o ? o.v = n : (e._l = o = {
                    i: a = Un(t, !0),
                    k: t,
                    v: n,
                    p: r = e._l,
                    n: void 0,
                    r: !1
                }, !e._f && (e._f = o), r && (r.n = o), e[Hn]++, "F" !== a && (e._i[a] = o)), e
            },
            getEntry: $n,
            setStrong: function (e, t, n) {
                Kt(e, t, function (e, n) {
                    this._t = Cn(e, t), this._k = n, this._l = void 0
                }, function () {
                    for (var e = this, t = e._k, n = e._l; n && n.r;) n = n.p;
                    return e._t && (e._l = n = n ? n.n : e._t._f) ? "keys" == t ? Ht(0, n.k) : "values" == t ? Ht(0, n.v) : Ht(0, [n.k, n.v]) : (e._t = void 0, Ht(1))
                }, n ? "entries" : "values", !n, !0), tn(t)
            }
        },
        zn = function (e, t) {
            if (ne(e), !te(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
        },
        jn = {
            set: Object.setPrototypeOf || ("__proto__" in {} ? function (e, t, n) {
                try {
                    n = xe(Function.call, sn.f(Object.prototype, "__proto__").set, 2), n(e, []), t = !(e instanceof Array)
                } catch (n) {
                    t = !0
                }
                return function (e, r) {
                    return zn(e, r), t ? e.__proto__ = r : n(e, r), e
                }
            }({}, !1) : void 0),
            check: zn
        },
        Vn = jn.set,
        Gn = function (e, t, n) {
            var r, a = t.constructor;
            return a !== n && "function" == typeof a && (r = a.prototype) !== n.prototype && te(r) && Vn && Vn(e, r), e
        },
        Wn = function (e, t, n, r, a, o) {
            var l = q[e],
                i = l,
                s = a ? "set" : "add",
                d = i && i.prototype,
                c = {},
                g = function (e) {
                    var t = d[e];
                    _e(d, e, "delete" == e ? function (e) {
                        return (!o || te(e)) && t.call(this, 0 === e ? 0 : e)
                    } : "has" == e ? function (e) {
                        return (!o || te(e)) && t.call(this, 0 === e ? 0 : e)
                    } : "get" == e ? function (e) {
                        return o && !te(e) ? void 0 : t.call(this, 0 === e ? 0 : e)
                    } : "add" == e ? function (e) {
                        return t.call(this, 0 === e ? 0 : e), this
                    } : function (e, n) {
                        return t.call(this, 0 === e ? 0 : e, n), this
                    })
                };
            if ("function" != typeof i || !(o || d.forEach && !X(function () {
                    new i().entries().next()
                }))) i = r.getConstructor(t, e, a, s), Be(i.prototype, n), Rn.NEED = !0;
            else {
                var p = new i,
                    u = p[s](o ? {} : -0, 1) != p,
                    f = X(function () {
                        p.has(1)
                    }),
                    y = Qt(function (e) {
                        new i(e)
                    }),
                    h = !o && X(function () {
                        for (var e = new i, t = 5; t--;) e[s](t, t);
                        return !e.has(-0)
                    });
                y || (i = t(function (t, n) {
                    Ne(t, i, e);
                    var r = Gn(new l, t, i);
                    return null != n && Fn(n, a, r[s], r), r
                }), i.prototype = d, d.constructor = i), (f || h) && (g("delete"), g("has"), a && g("get")), (h || u) && g(s), o && d.clear && delete d.clear
            }
            return lt(i, e), c[e] = i, Pe(Pe.G + Pe.W + Pe.F * (i != l), c), o || r.setStrong(i, e, a), i
        },
        Kn = "Set",
        Xn = Wn(Kn, function (e) {
            return function () {
                return e(this, 0 < arguments.length ? arguments[0] : void 0)
            }
        }, {
            add: function (e) {
                return wn.def(Cn(this, Kn), e = 0 === e ? 0 : e, e)
            }
        }, wn);
    Pn("match", 1, function (e, t, r, a) {
        return [function (n) {
            var r = e(this),
                a = n == null ? void 0 : n[t];
            return a === void 0 ? new RegExp(n)[t](r + "") : a.call(n, r)
        }, function (e) {
            var t = a(r, e, this);
            if (t.done) return t.value;
            var o = ne(e),
                l = this + "";
            if (!o.global) return un(o, l);
            var i = o.unicode;
            o.lastIndex = 0;
            for (var s, d = [], c = 0; null !== (s = un(o, l));) {
                var g = s[0] + "";
                d[c] = g, "" == g && (o.lastIndex = at(l, Me(o.lastIndex), i)), c++
            }
            return 0 === c ? null : d
        }]
    });
    var Zn = function (e, t, n) {
        t in e ? f.f(e, t, ce(0, n)) : e[t] = n
    };
    Pe(Pe.S + Pe.F * !Qt(function () {}), "Array", {
        from: function (e) {
            var t, n, r, a, o = et(e),
                l = "function" == typeof this ? this : Array,
                i = arguments.length,
                s = 1 < i ? arguments[1] : void 0,
                d = void 0 !== s,
                c = 0,
                g = It(o);
            if (d && (s = xe(s, 2 < i ? arguments[2] : void 0, 2)), null != g && !(l == Array && yt(g)))
                for (a = g.call(o), n = new l; !(r = a.next()).done; c++) Zn(n, c, d ? In(a, s, [r.value, c], !0) : r.value);
            else
                for (t = Me(o.length), n = new l(t); t > c; c++) Zn(n, c, d ? s(o[c], c) : o[c]);
            return n.length = c, n
        }
    });
    var Jn = [].sort,
        qn = [1, 2, 3];
    Pe(Pe.P + Pe.F * (X(function () {
        qn.sort(void 0)
    }) || !X(function () {
        qn.sort(null)
    }) || ! function (e, t) {
        return !!e && X(function () {
            t ? e.call(null, function () {}, 1) : e.call(null)
        })
    }(Jn)), "Array", {
        sort: function (e) {
            return e === void 0 ? Jn.call(et(this)) : Jn.call(et(this), Se(e))
        }
    });
    (function (e, t) {
        var n = (Q.Object || {})[e] || Object[e],
            r = {};
        r[e] = t(n), Pe(Pe.S + Pe.F * X(function () {
            n(1)
        }), "Object", r)
    })("keys", function () {
        return function (e) {
            return ht(et(e))
        }
    });
    var Qn = {
            f: nt
        },
        er = f.f,
        tr = function (e) {
            var t = Q.Symbol || (Q.Symbol = q.Symbol || {});
            "_" == e.charAt(0) || e in t || er(t, e, {
                value: Qn.f(e)
            })
        };
    tr("asyncIterator");
    var nr = Object.getOwnPropertySymbols,
        rr = {
            f: nr
        },
        ar = function (e) {
            var t = ht(e),
                n = rr.f;
            if (n)
                for (var r, a = n(e), o = an.f, l = 0; a.length > l;) o.call(e, r = a[l++]) && t.push(r);
            return t
        },
        or = Qe.f,
        lr = {}.toString,
        ir = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
        sr = function (e) {
            try {
                return or(e)
            } catch (t) {
                return ir.slice()
            }
        },
        dr = {
            f: function (e) {
                return ir && "[object Window]" == lr.call(e) ? sr(e) : or(we(e))
            }
        },
        cr = Rn.KEY,
        gr = sn.f,
        pr = f.f,
        ur = dr.f,
        fr = q.Symbol,
        yr = q.JSON,
        hr = yr && yr.stringify,
        mr = "prototype",
        Er = nt("_hidden"),
        _r = nt("toPrimitive"),
        Sr = {}.propertyIsEnumerable,
        xr = me("symbol-registry"),
        br = me("symbols"),
        Tr = me("op-symbols"),
        kr = Object[mr],
        Pr = "function" == typeof fr && !!rr.f,
        vr = q.QObject,
        Ar = !vr || !vr[mr] || !vr[mr].findChild,
        Or = Z && X(function () {
            return 7 != kt(pr({}, "a", {
                get: function () {
                    return pr(this, "a", {
                        value: 7
                    }).a
                }
            })).a
        }) ? function (e, t, n) {
            var r = gr(kr, t);
            r && delete kr[t], pr(e, t, n), r && e !== kr && pr(kr, t, r)
        } : pr,
        Ir = function (e) {
            var t = br[e] = kt(fr[mr]);
            return t._k = e, t
        },
        Fr = Pr && "symbol" == typeof fr.iterator ? function (e) {
            return "symbol" == typeof e
        } : function (e) {
            return e instanceof fr
        },
        Rr = function (e, t, n) {
            return e === kr && Rr(Tr, t, n), ne(e), t = ie(t, !0), ne(n), ue(br, t) ? (n.enumerable ? (ue(e, Er) && e[Er][t] && (e[Er][t] = !1), n = kt(n, {
                enumerable: ce(0, !1)
            })) : (!ue(e, Er) && pr(e, Er, ce(1, {})), e[Er][t] = !0), Or(e, t, n)) : pr(e, t, n)
        },
        Lr = function (e, t) {
            ne(e);
            for (var n, r = ar(t = we(t)), a = 0, o = r.length; o > a;) Rr(e, n = r[a++], t[n]);
            return e
        },
        Br = function (e) {
            var t = Sr.call(this, e = ie(e, !0));
            return (this !== kr || !ue(br, e) || ue(Tr, e)) && (!(t || !ue(this, e) || !ue(br, e) || ue(this, Er) && this[Er][e]) || t)
        },
        Nr = function (e, t) {
            if (e = we(e), t = ie(t, !0), e !== kr || !ue(br, t) || ue(Tr, t)) {
                var n = gr(e, t);
                return n && ue(br, t) && !(ue(e, Er) && e[Er][t]) && (n.enumerable = !0), n
            }
        },
        Dr = function (e) {
            for (var t, n = ur(we(e)), r = [], a = 0; n.length > a;) ue(br, t = n[a++]) || t == Er || t == cr || r.push(t);
            return r
        },
        Mr = function (e) {
            for (var t, n = e === kr, r = ur(n ? Tr : we(e)), a = [], o = 0; r.length > o;) ue(br, t = r[o++]) && (!n || ue(kr, t)) && a.push(br[t]);
            return a
        };
    Pr || (fr = function () {
        if (this instanceof fr) throw TypeError("Symbol is not a constructor!");
        var e = he(0 < arguments.length ? arguments[0] : void 0),
            t = function (n) {
                this === kr && t.call(Tr, n), ue(this, Er) && ue(this[Er], e) && (this[Er][e] = !1), Or(this, e, ce(1, n))
            };
        return Z && Ar && Or(kr, e, {
            configurable: !0,
            set: t
        }), Ir(e)
    }, _e(fr[mr], "toString", function () {
        return this._k
    }), sn.f = Nr, f.f = Rr, Qe.f = dr.f = Dr, an.f = Br, rr.f = Mr, Z && !J && _e(kr, "propertyIsEnumerable", Br, !0), Qn.f = function (e) {
        return Ir(nt(e))
    }), Pe(Pe.G + Pe.W + Pe.F * !Pr, {
        Symbol: fr
    });
    for (var Cr = ["hasInstance", "isConcatSpreadable", "iterator", "match", "replace", "search", "species", "split", "toPrimitive", "toStringTag", "unscopables"], Yr = 0; Cr.length > Yr;) nt(Cr[Yr++]);
    for (var Ur = ht(nt.store), Hr = 0; Ur.length > Hr;) tr(Ur[Hr++]);
    Pe(Pe.S + Pe.F * !Pr, "Symbol", {
        for: function (e) {
            return ue(xr, e += "") ? xr[e] : xr[e] = fr(e)
        },
        keyFor: function (e) {
            if (!Fr(e)) throw TypeError(e + " is not a symbol!");
            for (var t in xr)
                if (xr[t] === e) return t
        },
        useSetter: function () {
            Ar = !0
        },
        useSimple: function () {
            Ar = !1
        }
    }), Pe(Pe.S + Pe.F * !Pr, "Object", {
        create: function (e, t) {
            return t === void 0 ? kt(e) : Lr(kt(e), t)
        },
        defineProperty: Rr,
        defineProperties: Lr,
        getOwnPropertyDescriptor: Nr,
        getOwnPropertyNames: Dr,
        getOwnPropertySymbols: Mr
    });
    var $r = X(function () {
        rr.f(1)
    });
    Pe(Pe.S + Pe.F * $r, "Object", {
        getOwnPropertySymbols: function (e) {
            return rr.f(et(e))
        }
    }), yr && Pe(Pe.S + Pe.F * (!Pr || X(function () {
        var e = fr();
        return "[null]" != hr([e]) || "{}" != hr({
            a: e
        }) || "{}" != hr(Object(e))
    })), "JSON", {
        stringify: function (e) {
            for (var t, n, r = [e], a = 1; arguments.length > a;) r.push(arguments[a++]);
            if (n = t = r[1], (te(t) || void 0 !== e) && !Fr(e)) return Ft(t) || (t = function (e, t) {
                if ("function" == typeof n && (t = n.call(this, e, t)), !Fr(t)) return t
            }), r[1] = t, hr.apply(yr, r)
        }
    }), fr[mr][_r] || ge(fr[mr], _r, fr[mr].valueOf), lt(fr, "Symbol"), lt(Math, "Math", !0), lt(q.JSON, "JSON", !0);
    for (var wr = nt("iterator"), zr = nt("toStringTag"), jr = pt.Array, Vr = {
            CSSRuleList: !0,
            CSSStyleDeclaration: !1,
            CSSValueList: !1,
            ClientRectList: !1,
            DOMRectList: !1,
            DOMStringList: !1,
            DOMTokenList: !0,
            DataTransferItemList: !1,
            FileList: !1,
            HTMLAllCollection: !1,
            HTMLCollection: !1,
            HTMLFormElement: !1,
            HTMLSelectElement: !1,
            MediaList: !0,
            MimeTypeArray: !1,
            NamedNodeMap: !1,
            NodeList: !0,
            PaintRequestList: !1,
            Plugin: !1,
            PluginArray: !1,
            SVGLengthList: !1,
            SVGNumberList: !1,
            SVGPathSegList: !1,
            SVGPointList: !1,
            SVGStringList: !1,
            SVGTransformList: !1,
            SourceBufferList: !1,
            StyleSheetList: !0,
            TextTrackCueList: !1,
            TextTrackList: !1,
            TouchList: !1
        }, Gr = ht(Vr), Wr = 0; Wr < Gr.length; Wr++) {
        var Kr, Xr = Gr[Wr],
            Zr = Vr[Xr],
            Jr = q[Xr],
            qr = Jr && Jr.prototype;
        if (qr && (qr[wr] || ge(qr, wr, jr), qr[zr] || ge(qr, zr, Xr), pt[Xr] = jr, Zr))
            for (Kr in Xt) qr[Kr] || _e(qr, Kr, Xt[Kr], !0)
    }
    var Qr = cn(!0);
    Kt(String, "String", function (e) {
        this._t = e + "", this._i = 0
    }, function () {
        var e, t = this._t,
            n = this._i;
        return n >= t.length ? {
            value: void 0,
            done: !0
        } : (e = Qr(t, n), this._i += e.length, {
            value: e,
            done: !1
        })
    });
    var ea = Wn("Map", function (e) {
            return function () {
                return e(this, 0 < arguments.length ? arguments[0] : void 0)
            }
        }, {
            get: function (e) {
                var t = wn.getEntry(Cn(this, "Map"), e);
                return t && t.v
            },
            set: function (e, t) {
                return wn.def(Cn(this, "Map"), 0 === e ? 0 : e, t)
            }
        }, wn, !0),
        ta = "\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF",
        na = "[" + ta + "]",
        ra = "\u200B\x85",
        aa = RegExp("^" + na + na + "*"),
        oa = RegExp(na + na + "*$"),
        la = function (e, t, n) {
            var r = {},
                a = X(function () {
                    return !!ta[e]() || ra[e]() != ra
                }),
                o = r[e] = a ? t(ia) : ta[e];
            n && (r[n] = o), Pe(Pe.P + Pe.F * a, "String", r)
        },
        ia = la.trim = function (e, t) {
            return e = $e(e) + "", 1 & t && (e = e.replace(aa, "")), 2 & t && (e = e.replace(oa, "")), e
        },
        sa = Qe.f,
        da = sn.f,
        ca = f.f,
        ga = la.trim,
        pa = "Number",
        ua = q[pa],
        fa = ua,
        ya = ua.prototype,
        ha = Ue(kt(ya)) == pa,
        ma = "trim" in w,
        Ea = function (e) {
            var t = ie(e, !1);
            if ("string" == typeof t && 2 < t.length) {
                t = ma ? t.trim() : ga(t, 3);
                var n, r, a, o = t.charCodeAt(0);
                if (43 === o || 45 === o) {
                    if (n = t.charCodeAt(2), 88 === n || 120 === n) return NaN;
                } else if (48 === o) {
                    switch (t.charCodeAt(1)) {
                        case 66:
                        case 98:
                            r = 2, a = 49;
                            break;
                        case 79:
                        case 111:
                            r = 8, a = 55;
                            break;
                        default:
                            return +t;
                    }
                    for (var s, d = t.slice(2), c = 0, g = d.length; c < g; c++)
                        if (s = d.charCodeAt(c), 48 > s || s > a) return NaN;
                    return parseInt(d, r)
                }
            }
            return +t
        };
    if (!ua(" 0o1") || !ua("0b1") || ua("+0x1")) {
        ua = function (e) {
            var t = 1 > arguments.length ? 0 : e,
                n = this;
            return n instanceof ua && (ha ? X(function () {
                ya.valueOf.call(n)
            }) : Ue(n) != pa) ? Gn(new fa(Ea(t)), n, ua) : Ea(t)
        };
        for (var _a, Sa = Z ? sa(fa) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), xa = 0; Sa.length > xa; xa++) ue(fa, _a = Sa[xa]) && !ue(ua, _a) && ca(ua, _a, da(fa, _a));
        ua.prototype = ya, ya.constructor = ua, _e(q, pa, ua)
    }
    Pe(Pe.S, "Number", {
        isInteger: function (e) {
            return !te(e) && isFinite(e) && G(e) === e
        }
    }), Z && "g" != /./g.flags && f.f(RegExp.prototype, "flags", {
        configurable: !0,
        get: fn
    });
    var ba = /./.toString,
        Ta = function (e) {
            _e(RegExp.prototype, "toString", e, !0)
        };
    X(function () {
        return "/a/b" != ba.call({
            source: "a",
            flags: "b"
        })
    }) ? Ta(function () {
        var e = ne(this);
        return "/".concat(e.source, "/", "flags" in e ? e.flags : !Z && e instanceof RegExp ? fn.call(e) : void 0)
    }) : ba.name != "toString" && Ta(function () {
        return ba.call(this)
    });
    ({})[nt("toStringTag")] = "z", _e(Object.prototype, "toString", function () {
        return "[object " + gt(this) + "]"
    }, !0);
    var ka = function (e) {
            var t = $e(this) + "",
                r = "",
                a = De(e);
            if (0 > a || a == 1 / 0) throw RangeError("Count can't be negative");
            for (; 0 < a;
                (a >>>= 1) && (t += t)) 1 & a && (r += t);
            return r
        },
        Pa = function (e, t, n, r) {
            var a = $e(e) + "",
                o = a.length,
                l = void 0 === n ? " " : n + "",
                i = Me(t);
            if (i <= o || "" == l) return a;
            var s = i - o,
                d = ka.call(l, W(s / l.length));
            return d.length > s && (d = d.slice(0, s)), r ? d + a : a + d
        },
        va = q.navigator,
        Aa = va && va.userAgent || "",
        Oa = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(Aa);
    Pe(Pe.P + Pe.F * Oa, "String", {
        padStart: function (e) {
            return Pa(this, e, 1 < arguments.length ? arguments[1] : void 0, !0)
        }
    });
    var Ia = /:([0-9A-Fa-f]{8,})([0-9A-Fa-f]{2})(?:\r\n|\r|\n|)/g;
    $ = $ || function (e) {
        return "number" == typeof e && isFinite(e) && G(e) === e
    };
    var Fa = function () {
            function e(t) {
                if (r(this, e), this._blocks = new Map, t && "function" == typeof t[Symbol.iterator]) {
                    var a = !0,
                        o = !1,
                        l = void 0;
                    try {
                        for (var i, s, d = t[Symbol.iterator](); !(a = (i = d.next()).done); a = !0) {
                            if (s = i.value, !(s instanceof Array) || 2 !== s.length) throw new Error("First parameter to MemoryMap constructor must be an iterable of [addr, bytes] or undefined");
                            this.set(s[0], s[1])
                        }
                    } catch (e) {
                        o = !0, l = e
                    } finally {
                        try {
                            a || null == d.return || d.return()
                        } finally {
                            if (o) throw l
                        }
                    }
                } else if ("object" === n(t))
                    for (var c, g = Object.keys(t), p = 0, u = g; p < u.length; p++) c = u[p], this.set(parseInt(c), t[c]);
                else if (void 0 !== t && null !== t) throw new Error("First parameter to MemoryMap constructor must be an iterable of [addr, bytes] or undefined")
            }
            return o(e, [{
                key: "set",
                value: function (e, t) {
                    if (!$(e)) throw new Error("Address passed to MemoryMap is not an integer");
                    if (0 > e) throw new Error("Address passed to MemoryMap is negative");
                    if (!(t instanceof Uint8Array)) throw new Error("Bytes passed to MemoryMap are not an Uint8Array");
                    return this._blocks.set(e, t)
                }
            }, {
                key: "get",
                value: function (e) {
                    return this._blocks.get(e)
                }
            }, {
                key: "clear",
                value: function () {
                    return this._blocks.clear()
                }
            }, {
                key: "delete",
                value: function (e) {
                    return this._blocks.delete(e)
                }
            }, {
                key: "entries",
                value: function () {
                    return this._blocks.entries()
                }
            }, {
                key: "forEach",
                value: function (e, t) {
                    return this._blocks.forEach(e, t)
                }
            }, {
                key: "has",
                value: function (e) {
                    return this._blocks.has(e)
                }
            }, {
                key: "keys",
                value: function () {
                    return this._blocks.keys()
                }
            }, {
                key: "values",
                value: function () {
                    return this._blocks.values()
                }
            }, {
                key: Symbol.iterator,
                value: function () {
                    return this._blocks[Symbol.iterator]()
                }
            }, {
                key: "join",
                value: function () {
                    for (var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 1 / 0, n = Array.from(this.keys()).sort(function (e, t) {
                            return e - t
                        }), r = new Map, a = -1, o = -1, s = 0, d = n.length; s < d; s++) {
                        var l = n[s],
                            c = this.get(n[s]).length;
                        if (o === l && o - a < t) r.set(a, r.get(a) + c), o += c;
                        else if (o <= l) r.set(l, c), a = l, o = l + c;
                        else throw new Error("Overlapping data around address 0x" + l.toString(16))
                    }
                    for (var g, p, u = new e, f = -1, y = 0, h = n.length; y < h; y++) p = n[y], r.has(p) && (g = new Uint8Array(r.get(p)), u.set(p, g), f = p), g.set(this.get(p), p - f);
                    return u
                }
            }, {
                key: "paginate",
                value: function () {
                    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 1024,
                        n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 255;
                    if (0 >= t) throw new Error("Page size must be greater than zero");
                    for (var r, a = new e, o = Array.from(this.keys()).sort(function (e, t) {
                            return e - t
                        }), s = 0, d = o.length; s < d; s++)
                        for (var l = o[s], c = this.get(l), g = c.length, p = l - l % t; p < l + g; p += t) {
                            r = a.get(p), r || (r = new Uint8Array(t), r.fill(n), a.set(p, r));
                            var u = p - l,
                                f = void 0;
                            0 >= u ? (f = c.subarray(0, V(t + u, g)), r.set(f, -u)) : (f = c.subarray(u, u + V(t, g - u)), r.set(f, 0))
                        }
                    return a
                }
            }, {
                key: "getUint32",
                value: function (e, t) {
                    for (var n = Array.from(this.keys()), r = 0, a = n.length; r < a; r++) {
                        var o = n[r],
                            l = this.get(o),
                            s = l.length;
                        if (o <= e && e + 4 <= o + s) return new DataView(l.buffer, e - o, 4).getUint32(0, t)
                    }
                }
            }, {
                key: "asHexString",
                value: function () {
                    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 16,
                        t = 0,
                        n = -65536,
                        r = [];
                    if (0 >= e) throw new Error("Size of record must be greater than zero");
                    else if (255 < e) throw new Error("Size of record must be less than 256");
                    for (var a = new Uint8Array(6), o = new Uint8Array(4), s = Array.from(this.keys()).sort(function (e, t) {
                            return e - t
                        }), d = 0, c = s.length; d < c; d++) {
                        var l = s[d],
                            f = this.get(l);
                        if (!(f instanceof Uint8Array)) throw new Error("Block at offset " + l + " is not an Uint8Array");
                        if (0 > l) throw new Error("Block at offset " + l + " has a negative thus invalid address");
                        var y = f.length;
                        if (y) {
                            if (l > n + 65535 && (n = l - l % 65536, t = 0, a[0] = 2, a[1] = 0, a[2] = 0, a[3] = 4, a[4] = n >> 24, a[5] = n >> 16, r.push(":" + Array.prototype.map.call(a, u).join("") + u(g(a)))), l < n + t) throw new Error("Block starting at 0x" + l.toString(16) + " overlaps with a previous block.");
                            t = l % 65536;
                            var h = 0,
                                m = l + y;
                            if (4294967295 < m) throw new Error("Data cannot be over 0xFFFFFFFF");
                            for (; n + t < m;) {
                                65535 < t && (n += 65536, t = 0, a[0] = 2, a[1] = 0, a[2] = 0, a[3] = 4, a[4] = n >> 24, a[5] = n >> 16, r.push(":" + Array.prototype.map.call(a, u).join("") + u(g(a))));
                                for (var E = -1; 65536 > t && E;)
                                    if (E = V(e, m - n - t, 65536 - t), E) {
                                        o[0] = E, o[1] = t >> 8, o[2] = t, o[3] = 0;
                                        var _ = f.subarray(h, h + E);
                                        r.push(":" + Array.prototype.map.call(o, u).join("") + Array.prototype.map.call(_, u).join("") + u(p(o, _))), h += E, t += E
                                    }
                            }
                        }
                    }
                    return r.push(":00000001FF"), r.join("\n")
                }
            }, {
                key: "clone",
                value: function () {
                    var t = new e,
                        n = !0,
                        r = !1,
                        a = void 0;
                    try {
                        for (var o, i = this[Symbol.iterator](); !(n = (o = i.next()).done); n = !0) {
                            var s = l(o.value, 2),
                                d = s[0],
                                c = s[1];
                            t.set(d, new Uint8Array(c))
                        }
                    } catch (e) {
                        r = !0, a = e
                    } finally {
                        try {
                            n || null == i.return || i.return()
                        } finally {
                            if (r) throw a
                        }
                    }
                    return t
                }
            }, {
                key: "slice",
                value: function (t) {
                    var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1 / 0;
                    if (0 > n) throw new Error("Length of the slice cannot be negative");
                    var r = new e,
                        a = !0,
                        o = !1,
                        i = void 0;
                    try {
                        for (var s, d = this[Symbol.iterator](); !(a = (s = d.next()).done); a = !0) {
                            var c = l(s.value, 2),
                                g = c[0],
                                p = c[1],
                                u = p.length;
                            if (g + u >= t && g < t + n) {
                                var f = z(t, g),
                                    y = V(t + n, g + u),
                                    h = y - f,
                                    m = f - g;
                                0 < h && r.set(f, p.subarray(m, m + h))
                            }
                        }
                    } catch (e) {
                        o = !0, i = e
                    } finally {
                        try {
                            a || null == d.return || d.return()
                        } finally {
                            if (o) throw i
                        }
                    }
                    return r
                }
            }, {
                key: "slicePad",
                value: function (e, t) {
                    var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 255;
                    if (0 > t) throw new Error("Length of the slice cannot be negative");
                    var r = new Uint8Array(t).fill(n),
                        a = !0,
                        o = !1,
                        i = void 0;
                    try {
                        for (var s, d = this[Symbol.iterator](); !(a = (s = d.next()).done); a = !0) {
                            var c = l(s.value, 2),
                                g = c[0],
                                p = c[1],
                                u = p.length;
                            if (g + u >= e && g < e + t) {
                                var f = z(e, g),
                                    y = V(e + t, g + u),
                                    h = y - f,
                                    m = f - g;
                                0 < h && r.set(p.subarray(m, m + h), f - e)
                            }
                        }
                    } catch (e) {
                        o = !0, i = e
                    } finally {
                        try {
                            a || null == d.return || d.return()
                        } finally {
                            if (o) throw i
                        }
                    }
                    return r
                }
            }, {
                key: "contains",
                value: function (e) {
                    var t = !0,
                        n = !1,
                        r = void 0;
                    try {
                        for (var a, o = e[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
                            var s = l(a.value, 2),
                                d = s[0],
                                c = s[1],
                                g = c.length,
                                p = this.slice(d, g).join().get(d);
                            if (!p || p.length !== g) return !1;
                            for (var u in c)
                                if (c[u] !== p[u]) return !1
                        }
                    } catch (e) {
                        n = !0, r = e
                    } finally {
                        try {
                            t || null == o.return || o.return()
                        } finally {
                            if (n) throw r
                        }
                    }
                    return !0
                }
            }, {
                key: "size",
                get: function () {
                    return this._blocks.size
                }
            }], [{
                key: "fromHex",
                value: function (t) {
                    var n, r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1 / 0,
                        a = new e,
                        o = 0,
                        i = 0,
                        s = 0;
                    for (Ia.lastIndex = 0; null !== (n = Ia.exec(t));) {
                        if (i++, o !== n.index) throw new Error("Malformed hex file: Could not parse between characters " + o + " and " + n.index + " (\"" + t.substring(o, V(n.index, o + 16)).trim() + "\")");
                        o = Ia.lastIndex;
                        var d = n,
                            c = l(d, 3),
                            p = c[1],
                            f = c[2],
                            y = new Uint8Array(p.match(/[\da-f]{2}/gi).map(function (e) {
                                return parseInt(e, 16)
                            })),
                            h = y[0];
                        if (h + 4 !== y.length) throw new Error("Mismatched record length at record " + i + " (" + n[0].trim() + "), expected " + h + " data bytes but actual length is " + (y.length - 4));
                        var m = g(y);
                        if (parseInt(f, 16) !== m) throw new Error("Checksum failed at record " + i + " (" + n[0].trim() + "), should be " + m.toString(16));
                        var E = (y[1] << 8) + y[2],
                            _ = y[3],
                            S = y.subarray(4);
                        if (0 === _) {
                            if (a.has(s + E)) throw new Error("Duplicated data at record " + i + " (" + n[0].trim() + ")");
                            if (65536 < E + S.length) throw new Error("Data at record " + i + " (" + n[0].trim() + ") wraps over 0xFFFF. This would trigger ambiguous behaviour. Please restructure your data so that for every record the data offset plus the data length do not exceed 0xFFFF.");
                            a.set(s + E, S)
                        } else {
                            if (0 !== E) throw new Error("Record " + i + " (" + n[0].trim() + ") must have 0000 as data offset.");
                            switch (_) {
                                case 1:
                                    if (o !== t.length) throw new Error("There is data after an EOF record at record " + i);
                                    return a.join(r);
                                case 2:
                                    s = (S[0] << 8) + S[1] << 4;
                                    break;
                                case 3:
                                    break;
                                case 4:
                                    s = (S[0] << 8) + S[1] << 16;
                                    break;
                                case 5:
                                    break;
                                default:
                                    throw new Error("Invalid record type 0x" + u(_) + " at record " + i + " (should be between 0x00 and 0x05)");
                            }
                        }
                    }
                    if (i) throw new Error("No EOF record at end of file");
                    else throw new Error("Malformed .hex file, could not parse any registers")
                }
            }, {
                key: "overlapMemoryMaps",
                value: function (e) {
                    var t = new Set,
                        n = !0,
                        r = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(n = (o = s.next()).done); n = !0) {
                            var d = l(o.value, 2),
                                c = d[1],
                                g = !0,
                                p = !1,
                                u = void 0;
                            try {
                                for (var f, y = c[Symbol.iterator](); !(g = (f = y.next()).done); g = !0) {
                                    var h = l(f.value, 2),
                                        m = h[0],
                                        E = h[1];
                                    t.add(m), t.add(m + E.length)
                                }
                            } catch (e) {
                                p = !0, u = e
                            } finally {
                                try {
                                    g || null == y.return || y.return()
                                } finally {
                                    if (p) throw u
                                }
                            }
                        }
                    } catch (e) {
                        r = !0, a = e
                    } finally {
                        try {
                            n || null == s.return || s.return()
                        } finally {
                            if (r) throw a
                        }
                    }
                    for (var _ = Array.from(t.values()).sort(function (e, t) {
                            return e - t
                        }), S = new Map, x = function (t) {
                            var n = _[t],
                                r = _[t + 1],
                                a = [],
                                o = !0,
                                i = !1,
                                s = void 0;
                            try {
                                for (var d, c = e[Symbol.iterator](); !(o = (d = c.next()).done); o = !0) {
                                    var g = l(d.value, 2),
                                        p = g[0],
                                        u = g[1],
                                        f = Array.from(u.keys()).reduce(function (e, t) {
                                            return t > n ? e : z(e, t)
                                        }, -1);
                                    if (-1 !== f) {
                                        var y = u.get(f),
                                            h = n - f;
                                        h < y.length && a.push([p, y.subarray(h, r - f)])
                                    }
                                }
                            } catch (e) {
                                i = !0, s = e
                            } finally {
                                try {
                                    o || null == c.return || c.return()
                                } finally {
                                    if (i) throw s
                                }
                            }
                            a.length && S.set(n, a)
                        }, b = 0, T = _.length - 1; b < T; b++) x(b, T);
                    return S
                }
            }, {
                key: "flattenOverlaps",
                value: function (t) {
                    return new e(Array.from(t.entries()).map(function (e) {
                        var t = l(e, 2),
                            n = t[0],
                            r = t[1];
                        return [n, r[r.length - 1][1]]
                    }))
                }
            }, {
                key: "fromPaddedUint8Array",
                value: function (t) {
                    var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 255,
                        r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 64;
                    if (!(t instanceof Uint8Array)) throw new Error("Bytes passed to fromPaddedUint8Array are not an Uint8Array");
                    for (var a, o = new e, i = 0, s = -1, d = 0, c = !1, g = t.length, l = 0; l < g; l++) a = t[l], a === n ? (i++, i >= r && (-1 !== s && o.set(d, t.subarray(d, s + 1)), c = !0)) : (c && (c = !1, d = l), s = l, i = 0);
                    return c || -1 === s || o.set(d, t.subarray(d, g)), o
                }
            }]), e
        }(),
        Ra = t(function (e) {
            function t() {}

            function n() {}(function () {
                var o = String.fromCharCode;

                function e(e, t) {
                    t = t || 1 / 0;
                    for (var n, r = e.length, a = null, o = [], l = 0; l < r; l++) {
                        if (n = e.charCodeAt(l), !(55295 < n && 57344 > n)) a && (-1 < (t -= 3) && o.push(239, 191, 189), a = null);
                        else if (a) {
                            if (56320 > n) {
                                -1 < (t -= 3) && o.push(239, 191, 189), a = n;
                                continue
                            } else n = 65536 | (a - 55296 << 10 | n - 56320), a = null;
                        } else if (56319 < n) {
                            -1 < (t -= 3) && o.push(239, 191, 189);
                            continue
                        } else if (l + 1 === r) {
                            -1 < (t -= 3) && o.push(239, 191, 189);
                            continue
                        } else {
                            a = n;
                            continue
                        }
                        if (128 > n) {
                            if (0 > (t -= 1)) break;
                            o.push(n)
                        } else if (2048 > n) {
                            if (0 > (t -= 2)) break;
                            o.push(192 | n >> 6, 128 | 63 & n)
                        } else if (65536 > n) {
                            if (0 > (t -= 3)) break;
                            o.push(224 | n >> 12, 128 | 63 & n >> 6, 128 | 63 & n)
                        } else if (2097152 > n) {
                            if (0 > (t -= 4)) break;
                            o.push(240 | n >> 18, 128 | 63 & n >> 12, 128 | 63 & n >> 6, 128 | 63 & n)
                        } else throw new Error("Invalid code point")
                    }
                    return o
                }

                function r(e, t, n) {
                    var r = "",
                        l = "";
                    n = V(e.length, n || 1 / 0), t = t || 0;
                    for (var s = t; s < n; s++) 127 >= e[s] ? (r += a(l) + o(e[s]), l = "") : l += "%" + e[s].toString(16);
                    return r + a(l)
                }

                function a(e) {
                    try {
                        return decodeURIComponent(e)
                    } catch (e) {
                        return o(65533)
                    }
                }
                t.prototype.encode = function (t) {
                    var n;
                    return n = "undefined" == typeof Uint8Array ? e(t) : new Uint8Array(e(t)), n
                }, n.prototype.decode = function (e) {
                    return r(e, 0, e.length)
                }
            })(), e && (n.TextDecoderLite = n, n.TextEncoderLite = t, e.exports.TextDecoderLite = n, e.exports.TextEncoderLite = t, e.exports = n)
        }),
        La = Ra.TextDecoderLite,
        Ba = Ra.TextEncoderLite,
        Na = function (e, t) {
            var n = new Uint8Array(e.length + t.length);
            return n.set(e), n.set(t, e.length), n
        };
    (function (e) {
        e[e.StartAdd = 253952] = "StartAdd", e[e.Length = 8192] = "Length", e[e.EndAdd = 262144] = "EndAdd"
    })(e.AppendedBlock || (e.AppendedBlock = {}));
    var Da = an.f,
        Ma = function (e) {
            return function (t) {
                for (var n, r = we(t), a = ht(r), o = a.length, l = 0, s = []; o > l;) n = a[l++], (!Z || Da.call(r, n)) && s.push(e ? [n, r[n]] : r[n]);
                return s
            }
        }(!1);
    Pe(Pe.S, "Object", {
        values: function (e) {
            return Ma(e)
        }
    });
    var Ca;
    (function (e) {
        e[e.MagicValue = 268439552 + 128 + 64] = "MagicValue", e[e.EndMarker = e.MagicValue + 4] = "EndMarker", e[e.PageSize = e.EndMarker + 4] = "PageSize", e[e.StartPage = e.PageSize + 4] = "StartPage", e[e.PagesUsed = e.StartPage + 2] = "PagesUsed", e[e.Delimiter = e.PagesUsed + 2] = "Delimiter", e[e.VersionLocation = e.Delimiter + 4] = "VersionLocation", e[e.End = e.VersionLocation + 4] = "End"
    })(Ca || (Ca = {}));
    var Ya = 1,
        Ua = 128 - Ya - 1,
        Ha = 120,
        $a = function () {
            function e(e, t) {
                if (this._filename = e, this._filenameBytes = h(e), this._filenameBytes.length > Ha) throw new Error("File name \"" + e + "\" is too long " + ("(max " + Ha + " characters)."));
                this._dataBytes = t;
                var n = this._generateFileHeaderBytes();
                this._fsDataBytes = new Uint8Array(n.length + this._dataBytes.length + 1), this._fsDataBytes.set(n, 0), this._fsDataBytes.set(this._dataBytes, n.length), this._fsDataBytes[this._fsDataBytes.length - 1] = 255
            }
            return e.prototype.getFsChunks = function (e) {
                var t = [],
                    n = 0,
                    r = 0,
                    a = new Uint8Array(128).fill(255);
                a[0] = 254;
                for (var o = V(this._fsDataBytes.length, Ua), l = 0; l < o; l++, r++) a[Ya + l] = this._fsDataBytes[r];
                for (t.push(a); r < this._fsDataBytes.length;) {
                    if (n++, n >= e.length) throw new Error("Not enough space for the " + this._filename + " file.");
                    var s = t[t.length - 1];
                    s[127] = e[n], a = new Uint8Array(128).fill(255), a[0] = e[n - 1], o = V(this._fsDataBytes.length - r, Ua);
                    for (var l = 0; l < o; l++, r++) a[Ya + l] = this._fsDataBytes[r];
                    t.push(a)
                }
                return t
            }, e.prototype.getFsBytes = function (e) {
                for (var t = this.getFsChunks(e), n = 128 * t.length, r = new Uint8Array(n), a = 0; a < t.length; a++) r.set(t[a], 128 * a);
                return r
            }, e.prototype.getFsFileSize = function () {
                var e = W(this._fsDataBytes.length / Ua);
                return 128 * e
            }, e.prototype._generateFileHeaderBytes = function () {
                var e = 1 + 1 + this._filenameBytes.length,
                    t = (e + this._dataBytes.length) % Ua,
                    n = e - this._filenameBytes.length,
                    r = new Uint8Array(e);
                r[0] = t, r[1] = this._filenameBytes.length;
                for (var a = n; a < e; ++a) r[a] = this._filenameBytes[a - n];
                return r
            }, e
        }(),
        wa = function () {
            function e(e, t) {
                if (!e) throw new Error("File was not provided a valid filename.");
                if (!t) throw new Error("File " + e + " does not have valid content.");
                if (this.filename = e, "string" == typeof t) this._dataBytes = h(t);
                else if (t instanceof Uint8Array) this._dataBytes = t;
                else throw new Error("File data type must be a string or Uint8Array.")
            }
            return e.prototype.getText = function () {
                return m(this._dataBytes)
            }, e.prototype.getBytes = function () {
                return this._dataBytes
            }, e
        }(),
        za = function () {
            function e(e, t) {
                var n = (void 0 === t ? {} : t).maxFsSize,
                    r = void 0 === n ? 0 : n;
                if (this._files = {}, this._storageSize = 0, this._intelHex = e, this.importFilesFromIntelHex(this._intelHex), this.ls().length) throw new Error("There are files in the MicropythonFsHex constructor hex file input.");
                this.setStorageSize(r)
            }
            return e.prototype.create = function (e, t) {
                if (this.exists(e)) throw new Error("File already exists.");
                this.write(e, t)
            }, e.prototype.write = function (e, t) {
                this._files[e] = new wa(e, t)
            }, e.prototype.append = function (e) {
                if (!e) throw new Error("Invalid filename.");
                if (!this.exists(e)) throw new Error("File \"" + e + "\" does not exist.");
                throw new Error("Append operation not yet implemented.")
            }, e.prototype.read = function (e) {
                if (!e) throw new Error("Invalid filename.");
                if (!this.exists(e)) throw new Error("File \"" + e + "\" does not exist.");
                return this._files[e].getText()
            }, e.prototype.readBytes = function (e) {
                if (!e) throw new Error("Invalid filename.");
                if (!this.exists(e)) throw new Error("File \"" + e + "\" does not exist.");
                return this._files[e].getBytes()
            }, e.prototype.remove = function (e) {
                if (!e) throw new Error("Invalid filename.");
                if (!this.exists(e)) throw new Error("File \"" + e + "\" does not exist.");
                delete this._files[e]
            }, e.prototype.exists = function (e) {
                return this._files.hasOwnProperty(e)
            }, e.prototype.size = function (e) {
                if (!e) throw new Error("Invalid filename.");
                if (!this.exists(e)) throw new Error("File \"" + e + "\" does not exist.");
                return M(this._files[e].filename, this._files[e].getBytes())
            }, e.prototype.ls = function () {
                var e = [];
                return Object.values(this._files).forEach(function (t) {
                    return e.push(t.filename)
                }), e
            }, e.prototype.setStorageSize = function (e) {
                if (e > H(this._intelHex)) throw new Error("Storage size limit provided is larger than size available in the MicroPython hex.");
                this._storageSize = e
            }, e.prototype.getStorageSize = function () {
                return this._storageSize ? this._storageSize : H(this._intelHex)
            }, e.prototype.getStorageUsed = function () {
                var e = this,
                    t = 0;
                return Object.values(this._files).forEach(function (n) {
                    return t += e.size(n.filename)
                }), t
            }, e.prototype.getStorageRemaining = function () {
                var e = this,
                    t = 0,
                    n = this.getStorageSize();
                return Object.values(this._files).forEach(function (n) {
                    return t += e.size(n.filename)
                }), n - t
            }, e.prototype.importFilesFromIntelHex = function (e, t) {
                var n = this,
                    r = void 0 === t ? {} : t,
                    a = r.overwrite,
                    o = r.formatFirst,
                    l = U(e);
                void 0 !== o && o && (delete this._files, this._files = {});
                var i = [];
                if (Object.keys(l).forEach(function (e) {
                        !(void 0 !== a && a) && n.exists(e) ? i.push(e) : n.write(e, l[e])
                    }), i.length) throw new Error("Files \"\" from hex already exists.");
                return Object.keys(l)
            }, e.prototype.getIntelHex = function (e) {
                if (0 > this.getStorageRemaining()) throw new Error("There is no storage space left.");
                var t = e || this._intelHex,
                    n = {};
                return Object.values(this._files).forEach(function (e) {
                    n[e.filename] = e.getBytes()
                }), Y(t, n)
            }, e.prototype.getIntelHexBytes = function (e) {
                if (0 > this.getStorageRemaining()) throw new Error("There is no storage space left.");
                var t = e || this._intelHex,
                    n = {};
                return Object.values(this._files).forEach(function (e) {
                    n[e.filename] = e.getBytes()
                }), Y(t, n, !0)
            }, e
        }();
    e.addIntelHexAppendedScript = function (t, n) {
        var r = h(n),
            a = E(r);
        if (a.length > e.AppendedBlock.Length) throw new RangeError("Too long");
        var o = y(t),
            l = Fa.fromHex(o);
        return l.set(e.AppendedBlock.StartAdd, a), l.asHexString() + "\n"
    }, e.getIntelHexAppendedScript = function (t) {
        var n = "",
            r = Fa.fromHex(t);
        if (r.has(e.AppendedBlock.StartAdd)) {
            var a = r.slice(e.AppendedBlock.StartAdd, e.AppendedBlock.Length),
                o = a.get(e.AppendedBlock.StartAdd);
            o[0] === 77 && o[1] === 80 && (n = m(o.slice(4)), n = n.replace(/\0/g, ""))
        }
        return n
    }, e.isAppendedScriptPresent = _, e.MicropythonFsHex = za, e.getHexMapUicrData = I, e.getIntelHexUicrData = function (e) {
        return I(Fa.fromHex(e))
    }, Object.defineProperty(e, "__esModule", {
        value: !0
    })
});
//# sourceMappingURL=microbit-fs.umd.min.js.map
!(function (n) {
    "use strict"
    var h,
        k,
        e,
        s,
        o = 9e15,
        p = 1e9,
        g = "0123456789abcdef",
        t =
            "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058",
        r =
            "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789",
        u = {
            precision: 20,
            rounding: 4,
            modulo: 1,
            toExpNeg: -7,
            toExpPos: 21,
            minE: -o,
            maxE: o,
            crypto: !1,
        },
        N = !0,
        c = "[DecimalError] ",
        m = c + "Invalid argument: ",
        C = c + "Precision limit exceeded",
        I = c + "crypto unavailable",
        i = "[object Decimal]",
        A = Math.floor,
        w = Math.pow,
        H = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,
        B = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,
        V = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,
        $ = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
        S = 1e7,
        Z = 7,
        j = t.length - 1,
        d = r.length - 1,
        f = { toStringTag: i }
    function b(n) {
        var e,
            i,
            t,
            r = n.length - 1,
            s = "",
            o = n[0]
        if (0 < r) {
            for (s += o, e = 1; e < r; e++)
                (t = n[e] + ""), (i = Z - t.length) && (s += a(i)), (s += t)
            ;(o = n[e]), (i = Z - (t = o + "").length) && (s += a(i))
        } else if (0 === o) return "0"
        for (; o % 10 == 0; ) o /= 10
        return s + o
    }
    function v(n, e, i) {
        if (n !== ~~n || n < e || i < n) throw Error(m + n)
    }
    function E(n, e, i, t) {
        for (var r, s, o = n[0]; 10 <= o; o /= 10) --e
        return (
            --e < 0
                ? ((e += Z), (r = 0))
                : ((r = Math.ceil((e + 1) / Z)), (e %= Z)),
            (o = w(10, Z - e)),
            (s = n[r] % o | 0),
            null == t
                ? e < 3
                    ? (0 == e
                          ? (s = (s / 100) | 0)
                          : 1 == e && (s = (s / 10) | 0),
                      (i < 4 && 99999 == s) ||
                          (3 < i && 49999 == s) ||
                          5e4 == s ||
                          0 == s)
                    : (((i < 4 && s + 1 == o) || (3 < i && s + 1 == o / 2)) &&
                          ((n[r + 1] / o / 100) | 0) == w(10, e - 2) - 1) ||
                      ((s == o / 2 || 0 == s) &&
                          0 == ((n[r + 1] / o / 100) | 0))
                : e < 4
                ? (0 == e
                      ? (s = (s / 1e3) | 0)
                      : 1 == e
                      ? (s = (s / 100) | 0)
                      : 2 == e && (s = (s / 10) | 0),
                  ((t || i < 4) && 9999 == s) || (!t && 3 < i && 4999 == s))
                : (((t || i < 4) && s + 1 == o) ||
                      (!t && 3 < i && s + 1 == o / 2)) &&
                  ((n[r + 1] / o / 1e3) | 0) == w(10, e - 3) - 1
        )
    }
    function x(n, e, i) {
        for (var t, r, s = [0], o = 0, u = n.length; o < u; ) {
            for (r = s.length; r--; ) s[r] *= e
            for (s[0] += g.indexOf(n.charAt(o++)), t = 0; t < s.length; t++)
                s[t] > i - 1 &&
                    (void 0 === s[t + 1] && (s[t + 1] = 0),
                    (s[t + 1] += (s[t] / i) | 0),
                    (s[t] %= i))
        }
        return s.reverse()
    }
    ;(f.absoluteValue = f.abs =
        function () {
            var n = new this.constructor(this)
            return n.s < 0 && (n.s = 1), _(n)
        }),
        (f.ceil = function () {
            return _(new this.constructor(this), this.e + 1, 2)
        }),
        (f.clampedTo = f.clamp =
            function (n, e) {
                var i = this.constructor
                if (((n = new i(n)), (e = new i(e)), !n.s || !e.s))
                    return new i(NaN)
                if (n.gt(e)) throw Error(m + e)
                return this.cmp(n) < 0 ? n : 0 < this.cmp(e) ? e : new i(this)
            }),
        (f.comparedTo = f.cmp =
            function (n) {
                var e,
                    i,
                    t = this,
                    r = t.d,
                    s = (n = new t.constructor(n)).d,
                    o = t.s,
                    u = n.s
                if (!r || !s)
                    return o && u
                        ? o !== u
                            ? o
                            : r === s
                            ? 0
                            : !r ^ (o < 0)
                            ? 1
                            : -1
                        : NaN
                if (!r[0] || !s[0]) return r[0] ? o : s[0] ? -u : 0
                if (o !== u) return o
                if (t.e !== n.e) return (t.e > n.e) ^ (o < 0) ? 1 : -1
                for (
                    e = 0, i = (u = r.length) < (t = s.length) ? u : t;
                    e < i;
                    ++e
                )
                    if (r[e] !== s[e]) return (r[e] > s[e]) ^ (o < 0) ? 1 : -1
                return u === t ? 0 : (t < u) ^ (o < 0) ? 1 : -1
            }),
        (f.cosine = f.cos =
            function () {
                var n,
                    e,
                    i = this,
                    t = i.constructor
                return i.d
                    ? i.d[0]
                        ? ((n = t.precision),
                          (e = t.rounding),
                          (t.precision = n + Math.max(i.e, i.sd()) + Z),
                          (t.rounding = 1),
                          (i = (function (n, e) {
                              var i, t
                              if (e.isZero()) return e
                              t =
                                  (t = e.d.length) < 32
                                      ? ((i = Math.ceil(t / 3)),
                                        (1 / U(4, i)).toString())
                                      : ((i = 16),
                                        "2.3283064365386962890625e-10")
                              ;(n.precision += i),
                                  (e = L(n, 1, e.times(t), new n(1)))
                              for (var r = i; r--; ) {
                                  var s = e.times(e)
                                  e = s.times(s).minus(s).times(8).plus(1)
                              }
                              return (n.precision -= i), e
                          })(t, X(t, i))),
                          (t.precision = n),
                          (t.rounding = e),
                          _(2 == s || 3 == s ? i.neg() : i, n, e, !0))
                        : new t(1)
                    : new t(NaN)
            }),
        (f.cubeRoot = f.cbrt =
            function () {
                var n,
                    e,
                    i,
                    t,
                    r,
                    s,
                    o,
                    u,
                    c,
                    f,
                    h = this,
                    a = h.constructor
                if (!h.isFinite() || h.isZero()) return new a(h)
                for (
                    N = !1,
                        (s = h.s * w(h.s * h, 1 / 3)) && Math.abs(s) != 1 / 0
                            ? (t = new a(s.toString()))
                            : ((i = b(h.d)),
                              (s = ((n = h.e) - i.length + 1) % 3) &&
                                  (i += 1 == s || -2 == s ? "0" : "00"),
                              (s = w(i, 1 / 3)),
                              (n =
                                  A((n + 1) / 3) - (n % 3 == (n < 0 ? -1 : 2))),
                              ((t = new a(
                                  (i =
                                      s == 1 / 0
                                          ? "5e" + n
                                          : (i = s.toExponential()).slice(
                                                0,
                                                i.indexOf("e") + 1
                                            ) + n)
                              )).s = h.s)),
                        o = (n = a.precision) + 3;
                    ;

                )
                    if (
                        ((f = (c = (u = t).times(u).times(u)).plus(h)),
                        (t = y(f.plus(h).times(u), f.plus(c), o + 2, 1)),
                        b(u.d).slice(0, o) === (i = b(t.d)).slice(0, o))
                    ) {
                        if (
                            "9999" != (i = i.slice(o - 3, o + 1)) &&
                            (r || "4999" != i)
                        ) {
                            ;(+i && (+i.slice(1) || "5" != i.charAt(0))) ||
                                (_(t, n + 1, 1),
                                (e = !t.times(t).times(t).eq(h)))
                            break
                        }
                        if (!r && (_(u, n + 1, 0), u.times(u).times(u).eq(h))) {
                            t = u
                            break
                        }
                        ;(o += 4), (r = 1)
                    }
                return (N = !0), _(t, n, a.rounding, e)
            }),
        (f.decimalPlaces = f.dp =
            function () {
                var n,
                    e = this.d,
                    i = NaN
                if (e) {
                    if (
                        ((i = ((n = e.length - 1) - A(this.e / Z)) * Z),
                        (n = e[n]))
                    )
                        for (; n % 10 == 0; n /= 10) i--
                    i < 0 && (i = 0)
                }
                return i
            }),
        (f.dividedBy = f.div =
            function (n) {
                return y(this, new this.constructor(n))
            }),
        (f.dividedToIntegerBy = f.divToInt =
            function (n) {
                var e = this.constructor
                return _(y(this, new e(n), 0, 1, 1), e.precision, e.rounding)
            }),
        (f.equals = f.eq =
            function (n) {
                return 0 === this.cmp(n)
            }),
        (f.floor = function () {
            return _(new this.constructor(this), this.e + 1, 3)
        }),
        (f.greaterThan = f.gt =
            function (n) {
                return 0 < this.cmp(n)
            }),
        (f.greaterThanOrEqualTo = f.gte =
            function (n) {
                n = this.cmp(n)
                return 1 == n || 0 === n
            }),
        (f.hyperbolicCosine = f.cosh =
            function () {
                var n,
                    e,
                    i,
                    t = (u = this).constructor,
                    r = new t(1)
                if (!u.isFinite()) return new t(u.s ? 1 / 0 : NaN)
                if (u.isZero()) return r
                ;(e = t.precision),
                    (i = t.rounding),
                    (t.precision = e + Math.max(u.e, u.sd()) + 4),
                    (t.rounding = 1)
                for (
                    var s,
                        o =
                            (o = u.d.length) < 32
                                ? (1 / U(4, (n = Math.ceil(o / 3)))).toString()
                                : ((n = 16), "2.3283064365386962890625e-10"),
                        u = L(t, 1, u.times(o), new t(1), !0),
                        c = n,
                        f = new t(8);
                    c--;

                )
                    (s = u.times(u)),
                        (u = r.minus(s.times(f.minus(s.times(f)))))
                return _(u, (t.precision = e), (t.rounding = i), !0)
            }),
        (f.hyperbolicSine = f.sinh =
            function () {
                var n,
                    e,
                    i,
                    t = (o = this).constructor
                if (!o.isFinite() || o.isZero()) return new t(o)
                if (
                    ((n = t.precision),
                    (e = t.rounding),
                    (t.precision = n + Math.max(o.e, o.sd()) + 4),
                    (t.rounding = 1),
                    (i = o.d.length) < 3)
                )
                    o = L(t, 2, o, o, !0)
                else
                    for (
                        var r,
                            s = 1.4 * Math.sqrt(i),
                            o = L(
                                t,
                                2,
                                (o = o.times(
                                    1 / U(5, (s = 16 < s ? 16 : 0 | s))
                                )),
                                o,
                                !0
                            ),
                            u = new t(5),
                            c = new t(16),
                            f = new t(20);
                        s--;

                    )
                        (r = o.times(o)),
                            (o = o.times(u.plus(r.times(c.times(r).plus(f)))))
                return _(o, (t.precision = n), (t.rounding = e), !0)
            }),
        (f.hyperbolicTangent = f.tanh =
            function () {
                var n,
                    e,
                    i = this,
                    t = i.constructor
                return i.isFinite()
                    ? i.isZero()
                        ? new t(i)
                        : ((n = t.precision),
                          (e = t.rounding),
                          (t.precision = n + 7),
                          (t.rounding = 1),
                          y(
                              i.sinh(),
                              i.cosh(),
                              (t.precision = n),
                              (t.rounding = e)
                          ))
                    : new t(i.s)
            }),
        (f.inverseCosine = f.acos =
            function () {
                var n = this,
                    e = n.constructor,
                    i = n.abs().cmp(1),
                    t = e.precision,
                    r = e.rounding
                return -1 !== i
                    ? 0 === i
                        ? n.isNeg()
                            ? D(e, t, r)
                            : new e(0)
                        : new e(NaN)
                    : n.isZero()
                    ? D(e, t + 4, r).times(0.5)
                    : ((e.precision = t + 6),
                      (e.rounding = 1),
                      (n = n.asin()),
                      (i = D(e, t + 4, r).times(0.5)),
                      (e.precision = t),
                      (e.rounding = r),
                      i.minus(n))
            }),
        (f.inverseHyperbolicCosine = f.acosh =
            function () {
                var n,
                    e,
                    i = this,
                    t = i.constructor
                return i.lte(1)
                    ? new t(i.eq(1) ? 0 : NaN)
                    : i.isFinite()
                    ? ((n = t.precision),
                      (e = t.rounding),
                      (t.precision = n + Math.max(Math.abs(i.e), i.sd()) + 4),
                      (t.rounding = 1),
                      (N = !1),
                      (i = i.times(i).minus(1).sqrt().plus(i)),
                      (N = !0),
                      (t.precision = n),
                      (t.rounding = e),
                      i.ln())
                    : new t(i)
            }),
        (f.inverseHyperbolicSine = f.asinh =
            function () {
                var n,
                    e,
                    i = this,
                    t = i.constructor
                return !i.isFinite() || i.isZero()
                    ? new t(i)
                    : ((n = t.precision),
                      (e = t.rounding),
                      (t.precision =
                          n + 2 * Math.max(Math.abs(i.e), i.sd()) + 6),
                      (t.rounding = 1),
                      (N = !1),
                      (i = i.times(i).plus(1).sqrt().plus(i)),
                      (N = !0),
                      (t.precision = n),
                      (t.rounding = e),
                      i.ln())
            }),
        (f.inverseHyperbolicTangent = f.atanh =
            function () {
                var n,
                    e,
                    i,
                    t = this,
                    r = t.constructor
                return t.isFinite()
                    ? 0 <= t.e
                        ? new r(t.abs().eq(1) ? t.s / 0 : t.isZero() ? t : NaN)
                        : ((n = r.precision),
                          (e = r.rounding),
                          (i = t.sd()),
                          Math.max(i, n) < 2 * -t.e - 1
                              ? _(new r(t), n, e, !0)
                              : ((r.precision = i = i - t.e),
                                (t = y(t.plus(1), new r(1).minus(t), i + n, 1)),
                                (r.precision = n + 4),
                                (r.rounding = 1),
                                (t = t.ln()),
                                (r.precision = n),
                                (r.rounding = e),
                                t.times(0.5)))
                    : new r(NaN)
            }),
        (f.inverseSine = f.asin =
            function () {
                var n,
                    e,
                    i,
                    t = this,
                    r = t.constructor
                return t.isZero()
                    ? new r(t)
                    : ((n = t.abs().cmp(1)),
                      (e = r.precision),
                      (i = r.rounding),
                      -1 !== n
                          ? 0 === n
                              ? (((n = D(r, e + 4, i).times(0.5)).s = t.s), n)
                              : new r(NaN)
                          : ((r.precision = e + 6),
                            (r.rounding = 1),
                            (t = t
                                .div(new r(1).minus(t.times(t)).sqrt().plus(1))
                                .atan()),
                            (r.precision = e),
                            (r.rounding = i),
                            t.times(2)))
            }),
        (f.inverseTangent = f.atan =
            function () {
                var n,
                    e,
                    i,
                    t,
                    r,
                    s,
                    o,
                    u,
                    c,
                    f = this,
                    h = f.constructor,
                    a = h.precision,
                    l = h.rounding
                if (f.isFinite()) {
                    if (f.isZero()) return new h(f)
                    if (f.abs().eq(1) && a + 4 <= d)
                        return ((o = D(h, a + 4, l).times(0.25)).s = f.s), o
                } else {
                    if (!f.s) return new h(NaN)
                    if (a + 4 <= d)
                        return ((o = D(h, a + 4, l).times(0.5)).s = f.s), o
                }
                for (
                    h.precision = u = a + 10,
                        h.rounding = 1,
                        n = i = Math.min(28, (u / Z + 2) | 0);
                    n;
                    --n
                )
                    f = f.div(f.times(f).plus(1).sqrt().plus(1))
                for (
                    N = !1,
                        e = Math.ceil(u / Z),
                        t = 1,
                        c = f.times(f),
                        o = new h(f),
                        r = f;
                    -1 !== n;

                )
                    if (
                        ((r = r.times(c)),
                        (s = o.minus(r.div((t += 2)))),
                        (r = r.times(c)),
                        void 0 !== (o = s.plus(r.div((t += 2)))).d[e])
                    )
                        for (n = e; o.d[n] === s.d[n] && n--; );
                return (
                    i && (o = o.times(2 << (i - 1))),
                    (N = !0),
                    _(o, (h.precision = a), (h.rounding = l), !0)
                )
            }),
        (f.isFinite = function () {
            return !!this.d
        }),
        (f.isInteger = f.isInt =
            function () {
                return !!this.d && A(this.e / Z) > this.d.length - 2
            }),
        (f.isNaN = function () {
            return !this.s
        }),
        (f.isNegative = f.isNeg =
            function () {
                return this.s < 0
            }),
        (f.isPositive = f.isPos =
            function () {
                return 0 < this.s
            }),
        (f.isZero = function () {
            return !!this.d && 0 === this.d[0]
        }),
        (f.lessThan = f.lt =
            function (n) {
                return this.cmp(n) < 0
            }),
        (f.lessThanOrEqualTo = f.lte =
            function (n) {
                return this.cmp(n) < 1
            }),
        (f.logarithm = f.log =
            function (n) {
                var e,
                    i,
                    t,
                    r,
                    s,
                    o,
                    u,
                    c,
                    f = this,
                    h = f.constructor,
                    a = h.precision,
                    l = h.rounding
                if (null == n) (n = new h(10)), (e = !0)
                else {
                    if (
                        ((i = (n = new h(n)).d),
                        n.s < 0 || !i || !i[0] || n.eq(1))
                    )
                        return new h(NaN)
                    e = n.eq(10)
                }
                if (((i = f.d), f.s < 0 || !i || !i[0] || f.eq(1)))
                    return new h(
                        i && !i[0] ? -1 / 0 : 1 != f.s ? NaN : i ? 0 : 1 / 0
                    )
                if (e)
                    if (1 < i.length) s = !0
                    else {
                        for (r = i[0]; r % 10 == 0; ) r /= 10
                        s = 1 !== r
                    }
                if (
                    ((N = !1),
                    (o = F(f, (u = a + 5))),
                    (t = e ? O(h, u + 10) : F(n, u)),
                    E((c = y(o, t, u, 1)).d, (r = a), l))
                )
                    do {
                        if (
                            ((o = F(f, (u += 10))),
                            (t = e ? O(h, u + 10) : F(n, u)),
                            (c = y(o, t, u, 1)),
                            !s)
                        ) {
                            ;+b(c.d).slice(r + 1, r + 15) + 1 == 1e14 &&
                                (c = _(c, a + 1, 0))
                            break
                        }
                    } while (E(c.d, (r += 10), l))
                return (N = !0), _(c, a, l)
            }),
        (f.minus = f.sub =
            function (n) {
                var e,
                    i,
                    t,
                    r,
                    s,
                    o,
                    u,
                    c,
                    f,
                    h,
                    a,
                    l = this,
                    d = l.constructor
                if (((n = new d(n)), !l.d || !n.d))
                    return (
                        l.s && n.s
                            ? l.d
                                ? (n.s = -n.s)
                                : (n = new d(n.d || l.s !== n.s ? l : NaN))
                            : (n = new d(NaN)),
                        n
                    )
                if (l.s != n.s) return (n.s = -n.s), l.plus(n)
                if (
                    ((f = l.d),
                    (a = n.d),
                    (u = d.precision),
                    (c = d.rounding),
                    !f[0] || !a[0])
                ) {
                    if (a[0]) n.s = -n.s
                    else {
                        if (!f[0]) return new d(3 === c ? -0 : 0)
                        n = new d(l)
                    }
                    return N ? _(n, u, c) : n
                }
                if (
                    ((i = A(n.e / Z)),
                    (l = A(l.e / Z)),
                    (f = f.slice()),
                    (s = l - i))
                ) {
                    for (
                        o = (h = s < 0)
                            ? ((e = f), (s = -s), a.length)
                            : ((e = a), (i = l), f.length),
                            (t = Math.max(Math.ceil(u / Z), o) + 2) < s &&
                                ((s = t), (e.length = 1)),
                            e.reverse(),
                            t = s;
                        t--;

                    )
                        e.push(0)
                    e.reverse()
                } else {
                    for (
                        (h = (t = f.length) < (o = a.length)) && (o = t), t = 0;
                        t < o;
                        t++
                    )
                        if (f[t] != a[t]) {
                            h = f[t] < a[t]
                            break
                        }
                    s = 0
                }
                for (
                    h && ((e = f), (f = a), (a = e), (n.s = -n.s)),
                        o = f.length,
                        t = a.length - o;
                    0 < t;
                    --t
                )
                    f[o++] = 0
                for (t = a.length; s < t; ) {
                    if (f[--t] < a[t]) {
                        for (r = t; r && 0 === f[--r]; ) f[r] = S - 1
                        --f[r], (f[t] += S)
                    }
                    f[t] -= a[t]
                }
                for (; 0 === f[--o]; ) f.pop()
                for (; 0 === f[0]; f.shift()) --i
                return f[0]
                    ? ((n.d = f), (n.e = q(f, i)), N ? _(n, u, c) : n)
                    : new d(3 === c ? -0 : 0)
            }),
        (f.modulo = f.mod =
            function (n) {
                var e,
                    i = this,
                    t = i.constructor
                return (
                    (n = new t(n)),
                    !i.d || !n.s || (n.d && !n.d[0])
                        ? new t(NaN)
                        : !n.d || (i.d && !i.d[0])
                        ? _(new t(i), t.precision, t.rounding)
                        : ((N = !1),
                          9 == t.modulo
                              ? ((e = y(i, n.abs(), 0, 3, 1)).s *= n.s)
                              : (e = y(i, n, 0, t.modulo, 1)),
                          (e = e.times(n)),
                          (N = !0),
                          i.minus(e))
                )
            }),
        (f.naturalExponential = f.exp =
            function () {
                return l(this)
            }),
        (f.naturalLogarithm = f.ln =
            function () {
                return F(this)
            }),
        (f.negated = f.neg =
            function () {
                var n = new this.constructor(this)
                return (n.s = -n.s), _(n)
            }),
        (f.plus = f.add =
            function (n) {
                var e,
                    i,
                    t,
                    r,
                    s,
                    o,
                    u,
                    c,
                    f = this,
                    h = f.constructor
                if (((n = new h(n)), !f.d || !n.d))
                    return (
                        f.s && n.s
                            ? f.d || (n = new h(n.d || f.s === n.s ? f : NaN))
                            : (n = new h(NaN)),
                        n
                    )
                if (f.s != n.s) return (n.s = -n.s), f.minus(n)
                if (
                    ((u = f.d),
                    (c = n.d),
                    (s = h.precision),
                    (o = h.rounding),
                    !u[0] || !c[0])
                )
                    return c[0] || (n = new h(f)), N ? _(n, s, o) : n
                if (
                    ((h = A(f.e / Z)),
                    (f = A(n.e / Z)),
                    (u = u.slice()),
                    (t = h - f))
                ) {
                    for (
                        (r =
                            (r =
                                t < 0
                                    ? ((i = u), (t = -t), c.length)
                                    : ((i = c), (f = h), u.length)) <
                            (h = Math.ceil(s / Z))
                                ? h + 1
                                : r + 1) < t && ((t = r), (i.length = 1)),
                            i.reverse();
                        t--;

                    )
                        i.push(0)
                    i.reverse()
                }
                for (
                    (r = u.length) - (t = c.length) < 0 &&
                        ((t = r), (i = c), (c = u), (u = i)),
                        e = 0;
                    t;

                )
                    (e = ((u[--t] = u[t] + c[t] + e) / S) | 0), (u[t] %= S)
                for (e && (u.unshift(e), ++f), r = u.length; 0 == u[--r]; )
                    u.pop()
                return (n.d = u), (n.e = q(u, f)), N ? _(n, s, o) : n
            }),
        (f.precision = f.sd =
            function (n) {
                var e
                if (void 0 !== n && n !== !!n && 1 !== n && 0 !== n)
                    throw Error(m + n)
                return (
                    this.d
                        ? ((e = W(this.d)),
                          n && this.e + 1 > e && (e = this.e + 1))
                        : (e = NaN),
                    e
                )
            }),
        (f.round = function () {
            var n = this.constructor
            return _(new n(this), this.e + 1, n.rounding)
        }),
        (f.sine = f.sin =
            function () {
                var n,
                    e,
                    i = this,
                    t = i.constructor
                return i.isFinite()
                    ? i.isZero()
                        ? new t(i)
                        : ((n = t.precision),
                          (e = t.rounding),
                          (t.precision = n + Math.max(i.e, i.sd()) + Z),
                          (t.rounding = 1),
                          (i = (function (n, e) {
                              var i,
                                  t = e.d.length
                              if (t < 3) return e.isZero() ? e : L(n, 2, e, e)
                              ;(i = 16 < (i = 1.4 * Math.sqrt(t)) ? 16 : 0 | i),
                                  (e = e.times(1 / U(5, i))),
                                  (e = L(n, 2, e, e))
                              for (
                                  var r,
                                      s = new n(5),
                                      o = new n(16),
                                      u = new n(20);
                                  i--;

                              )
                                  (r = e.times(e)),
                                      (e = e.times(
                                          s.plus(r.times(o.times(r).minus(u)))
                                      ))
                              return e
                          })(t, X(t, i))),
                          (t.precision = n),
                          (t.rounding = e),
                          _(2 < s ? i.neg() : i, n, e, !0))
                    : new t(NaN)
            }),
        (f.squareRoot = f.sqrt =
            function () {
                var n,
                    e,
                    i,
                    t,
                    r,
                    s,
                    o = this,
                    u = o.d,
                    c = o.e,
                    f = o.s,
                    h = o.constructor
                if (1 !== f || !u || !u[0])
                    return new h(
                        !f || (f < 0 && (!u || u[0])) ? NaN : u ? o : 1 / 0
                    )
                for (
                    N = !1,
                        t =
                            0 == (f = Math.sqrt(+o)) || f == 1 / 0
                                ? (((e = b(u)).length + c) % 2 == 0 &&
                                      (e += "0"),
                                  (f = Math.sqrt(e)),
                                  (c = A((c + 1) / 2) - (c < 0 || c % 2)),
                                  new h(
                                      (e =
                                          f == 1 / 0
                                              ? "5e" + c
                                              : (e = f.toExponential()).slice(
                                                    0,
                                                    e.indexOf("e") + 1
                                                ) + c)
                                  ))
                                : new h(f.toString()),
                        i = (c = h.precision) + 3;
                    ;

                )
                    if (
                        ((t = (s = t).plus(y(o, s, i + 2, 1)).times(0.5)),
                        b(s.d).slice(0, i) === (e = b(t.d)).slice(0, i))
                    ) {
                        if (
                            "9999" != (e = e.slice(i - 3, i + 1)) &&
                            (r || "4999" != e)
                        ) {
                            ;(+e && (+e.slice(1) || "5" != e.charAt(0))) ||
                                (_(t, c + 1, 1), (n = !t.times(t).eq(o)))
                            break
                        }
                        if (!r && (_(s, c + 1, 0), s.times(s).eq(o))) {
                            t = s
                            break
                        }
                        ;(i += 4), (r = 1)
                    }
                return (N = !0), _(t, c, h.rounding, n)
            }),
        (f.tangent = f.tan =
            function () {
                var n,
                    e,
                    i = this,
                    t = i.constructor
                return i.isFinite()
                    ? i.isZero()
                        ? new t(i)
                        : ((n = t.precision),
                          (e = t.rounding),
                          (t.precision = n + 10),
                          (t.rounding = 1),
                          ((i = i.sin()).s = 1),
                          (i = y(
                              i,
                              new t(1).minus(i.times(i)).sqrt(),
                              n + 10,
                              0
                          )),
                          (t.precision = n),
                          (t.rounding = e),
                          _(2 == s || 4 == s ? i.neg() : i, n, e, !0))
                    : new t(NaN)
            }),
        (f.times = f.mul =
            function (n) {
                var e,
                    i,
                    t,
                    r,
                    s,
                    o,
                    u,
                    c,
                    f,
                    h = this.constructor,
                    a = this.d,
                    l = (n = new h(n)).d
                if (((n.s *= this.s), !(a && a[0] && l && l[0])))
                    return new h(
                        !n.s || (a && !a[0] && !l) || (l && !l[0] && !a)
                            ? NaN
                            : a && l
                            ? 0 * n.s
                            : n.s / 0
                    )
                for (
                    i = A(this.e / Z) + A(n.e / Z),
                        (c = a.length) < (f = l.length) &&
                            ((s = a),
                            (a = l),
                            (l = s),
                            (o = c),
                            (c = f),
                            (f = o)),
                        s = [],
                        t = o = c + f;
                    t--;

                )
                    s.push(0)
                for (t = f; 0 <= --t; ) {
                    for (e = 0, r = c + t; t < r; )
                        (u = s[r] + l[t] * a[r - t - 1] + e),
                            (s[r--] = u % S | 0),
                            (e = (u / S) | 0)
                    s[r] = (s[r] + e) % S | 0
                }
                for (; !s[--o]; ) s.pop()
                return (
                    e ? ++i : s.shift(),
                    (n.d = s),
                    (n.e = q(s, i)),
                    N ? _(n, h.precision, h.rounding) : n
                )
            }),
        (f.toBinary = function (n, e) {
            return Y(this, 2, n, e)
        }),
        (f.toDecimalPlaces = f.toDP =
            function (n, e) {
                var i = this.constructor,
                    t = new i(this)
                return void 0 === n
                    ? t
                    : (v(n, 0, p),
                      void 0 === e ? (e = i.rounding) : v(e, 0, 8),
                      _(t, n + t.e + 1, e))
            }),
        (f.toExponential = function (n, e) {
            var i = this,
                t = i.constructor,
                t =
                    void 0 === n
                        ? M(i, !0)
                        : (v(n, 0, p),
                          void 0 === e ? (e = t.rounding) : v(e, 0, 8),
                          M((i = _(new t(i), n + 1, e)), !0, n + 1))
            return i.isNeg() && !i.isZero() ? "-" + t : t
        }),
        (f.toFixed = function (n, e) {
            var i = this,
                t = i.constructor,
                e =
                    void 0 === n
                        ? M(i)
                        : (v(n, 0, p),
                          void 0 === e ? (e = t.rounding) : v(e, 0, 8),
                          M((t = _(new t(i), n + i.e + 1, e)), !1, n + t.e + 1))
            return i.isNeg() && !i.isZero() ? "-" + e : e
        }),
        (f.toFraction = function (n) {
            var e,
                i,
                t,
                r,
                s,
                o,
                u,
                c,
                f,
                h,
                a = this,
                l = a.d,
                d = a.constructor
            if (!l) return new d(a)
            if (
                ((c = i = new d(1)),
                (t = u = new d(0)),
                (s = (e = new d(t)).e = W(l) - a.e - 1),
                (e.d[0] = w(10, (f = s % Z) < 0 ? Z + f : f)),
                null == n)
            )
                n = 0 < s ? e : c
            else {
                if (!(o = new d(n)).isInt() || o.lt(c)) throw Error(m + o)
                n = o.gt(e) ? (0 < s ? e : c) : o
            }
            for (
                N = !1,
                    o = new d(b(l)),
                    f = d.precision,
                    d.precision = s = l.length * Z * 2;
                (h = y(o, e, 0, 1, 1)), 1 != (r = i.plus(h.times(t))).cmp(n);

            )
                (i = t),
                    (t = r),
                    (r = c),
                    (c = u.plus(h.times(r))),
                    (u = r),
                    (r = e),
                    (e = o.minus(h.times(r))),
                    (o = r)
            return (
                (r = y(n.minus(i), t, 0, 1, 1)),
                (u = u.plus(r.times(c))),
                (i = i.plus(r.times(t))),
                (u.s = c.s = a.s),
                (l =
                    y(c, t, s, 1)
                        .minus(a)
                        .abs()
                        .cmp(y(u, i, s, 1).minus(a).abs()) < 1
                        ? [c, t]
                        : [u, i]),
                (d.precision = f),
                (N = !0),
                l
            )
        }),
        (f.toHexadecimal = f.toHex =
            function (n, e) {
                return Y(this, 16, n, e)
            }),
        (f.toNearest = function (n, e) {
            var i = (t = this).constructor,
                t = new i(t)
            if (null == n) {
                if (!t.d) return t
                ;(n = new i(1)), (e = i.rounding)
            } else {
                if (
                    ((n = new i(n)),
                    void 0 === e ? (e = i.rounding) : v(e, 0, 8),
                    !t.d)
                )
                    return n.s ? t : n
                if (!n.d) return n.s && (n.s = t.s), n
            }
            return (
                n.d[0]
                    ? ((N = !1),
                      (t = y(t, n, 0, e, 1).times(n)),
                      (N = !0),
                      _(t))
                    : ((n.s = t.s), (t = n)),
                t
            )
        }),
        (f.toNumber = function () {
            return +this
        }),
        (f.toOctal = function (n, e) {
            return Y(this, 8, n, e)
        }),
        (f.toPower = f.pow =
            function (n) {
                var e,
                    i,
                    t,
                    r,
                    s,
                    o,
                    u = this,
                    c = u.constructor,
                    f = +(n = new c(n))
                if (!(u.d && n.d && u.d[0] && n.d[0])) return new c(w(+u, f))
                if ((u = new c(u)).eq(1)) return u
                if (((t = c.precision), (s = c.rounding), n.eq(1)))
                    return _(u, t, s)
                if (
                    (e = A(n.e / Z)) >= n.d.length - 1 &&
                    (i = f < 0 ? -f : f) <= 9007199254740991
                )
                    return (
                        (r = J(c, u, i, t)),
                        n.s < 0 ? new c(1).div(r) : _(r, t, s)
                    )
                if ((o = u.s) < 0) {
                    if (e < n.d.length - 1) return new c(NaN)
                    if (
                        (0 == (1 & n.d[e]) && (o = 1),
                        0 == u.e && 1 == u.d[0] && 1 == u.d.length)
                    )
                        return (u.s = o), u
                }
                return (e =
                    0 != (i = w(+u, f)) && isFinite(i)
                        ? new c(i + "").e
                        : A(
                              f *
                                  (Math.log("0." + b(u.d)) / Math.LN10 +
                                      u.e +
                                      1)
                          )) >
                    c.maxE + 1 || e < c.minE - 1
                    ? new c(0 < e ? o / 0 : 0)
                    : ((N = !1),
                      (c.rounding = u.s = 1),
                      (i = Math.min(12, (e + "").length)),
                      ((r =
                          (r = l(n.times(F(u, t + i)), t)).d &&
                          E((r = _(r, t + 5, 1)).d, t, s) &&
                          +b(
                              (r = _(
                                  l(n.times(F(u, (e = t + 10) + i)), e),
                                  e + 5,
                                  1
                              )).d
                          ).slice(t + 1, t + 15) +
                              1 ==
                              1e14
                              ? _(r, t + 1, 0)
                              : r).s = o),
                      (N = !0),
                      _(r, t, (c.rounding = s)))
            }),
        (f.toPrecision = function (n, e) {
            var i = this,
                t = i.constructor,
                e =
                    void 0 === n
                        ? M(i, i.e <= t.toExpNeg || i.e >= t.toExpPos)
                        : (v(n, 1, p),
                          void 0 === e ? (e = t.rounding) : v(e, 0, 8),
                          M(
                              (i = _(new t(i), n, e)),
                              n <= i.e || i.e <= t.toExpNeg,
                              n
                          ))
            return i.isNeg() && !i.isZero() ? "-" + e : e
        }),
        (f.toSignificantDigits = f.toSD =
            function (n, e) {
                var i = this.constructor
                return (
                    void 0 === n
                        ? ((n = i.precision), (e = i.rounding))
                        : (v(n, 1, p),
                          void 0 === e ? (e = i.rounding) : v(e, 0, 8)),
                    _(new i(this), n, e)
                )
            }),
        (f.toString = function () {
            var n = this,
                e = n.constructor,
                e = M(n, n.e <= e.toExpNeg || n.e >= e.toExpPos)
            return n.isNeg() && !n.isZero() ? "-" + e : e
        }),
        (f.truncated = f.trunc =
            function () {
                return _(new this.constructor(this), this.e + 1, 1)
            }),
        (f.valueOf = f.toJSON =
            function () {
                var n = this,
                    e = n.constructor,
                    e = M(n, n.e <= e.toExpNeg || n.e >= e.toExpPos)
                return n.isNeg() ? "-" + e : e
            })
    var y = function (n, e, i, t, r, s) {
        var o,
            u,
            c,
            f,
            h,
            a,
            l,
            d,
            p,
            g,
            m,
            w,
            v,
            N,
            b,
            E,
            x,
            y,
            M,
            q = n.constructor,
            O = n.s == e.s ? 1 : -1,
            D = n.d,
            F = e.d
        if (!(D && D[0] && F && F[0]))
            return new q(
                n.s && e.s && (D ? !F || D[0] != F[0] : F)
                    ? (D && 0 == D[0]) || !F
                        ? 0 * O
                        : O / 0
                    : NaN
            )
        for (
            u = s
                ? ((h = 1), n.e - e.e)
                : ((s = S), A(n.e / (h = Z)) - A(e.e / h)),
                y = F.length,
                E = D.length,
                p = (O = new q(O)).d = [],
                c = 0;
            F[c] == (D[c] || 0);
            c++
        );
        if (
            (F[c] > (D[c] || 0) && u--,
            null == i
                ? ((v = i = q.precision), (t = q.rounding))
                : (v = r ? i + (n.e - e.e) + 1 : i),
            v < 0)
        )
            p.push(1), (a = !0)
        else {
            if (((v = (v / h + 2) | 0), (c = 0), 1 == y)) {
                for (F = F[(f = 0)], v++; (c < E || f) && v--; c++)
                    (N = f * s + (D[c] || 0)),
                        (p[c] = (N / F) | 0),
                        (f = N % F | 0)
                a = f || c < E
            } else {
                for (
                    1 < (f = (s / (F[0] + 1)) | 0) &&
                        ((F = P(F, f, s)),
                        (D = P(D, f, s)),
                        (y = F.length),
                        (E = D.length)),
                        b = y,
                        m = (g = D.slice(0, y)).length;
                    m < y;

                )
                    g[m++] = 0
                for (
                    (M = F.slice()).unshift(0), x = F[0], F[1] >= s / 2 && ++x;
                    (f = 0),
                        (o = R(F, g, y, m)) < 0
                            ? ((w = g[0]),
                              1 <
                              (f =
                                  ((w = y != m ? w * s + (g[1] || 0) : w) / x) |
                                  0)
                                  ? 1 ==
                                        (o = R(
                                            (l = P(
                                                F,
                                                (f = s <= f ? s - 1 : f),
                                                s
                                            )),
                                            g,
                                            (d = l.length),
                                            (m = g.length)
                                        )) && (f--, T(l, y < d ? M : F, d, s))
                                  : (0 == f && (o = f = 1), (l = F.slice())),
                              (d = l.length) < m && l.unshift(0),
                              T(g, l, m, s),
                              -1 == o &&
                                  (o = R(F, g, y, (m = g.length))) < 1 &&
                                  (f++, T(g, y < m ? M : F, m, s)),
                              (m = g.length))
                            : 0 === o && (f++, (g = [0])),
                        (p[c++] = f),
                        o && g[0]
                            ? (g[m++] = D[b] || 0)
                            : ((g = [D[b]]), (m = 1)),
                        (b++ < E || void 0 !== g[0]) && v--;

                );
                a = void 0 !== g[0]
            }
            p[0] || p.shift()
        }
        if (1 == h) (O.e = u), (k = a)
        else {
            for (c = 1, f = p[0]; 10 <= f; f /= 10) c++
            ;(O.e = c + u * h - 1), _(O, r ? i + O.e + 1 : i, t, a)
        }
        return O
    }
    function P(n, e, i) {
        var t,
            r = 0,
            s = n.length
        for (n = n.slice(); s--; )
            (t = n[s] * e + r), (n[s] = t % i | 0), (r = (t / i) | 0)
        return r && n.unshift(r), n
    }
    function R(n, e, i, t) {
        var r, s
        if (i != t) s = t < i ? 1 : -1
        else
            for (r = s = 0; r < i; r++)
                if (n[r] != e[r]) {
                    s = n[r] > e[r] ? 1 : -1
                    break
                }
        return s
    }
    function T(n, e, i, t) {
        for (var r = 0; i--; )
            (n[i] -= r), (r = n[i] < e[i] ? 1 : 0), (n[i] = r * t + n[i] - e[i])
        for (; !n[0] && 1 < n.length; ) n.shift()
    }
    function _(n, e, i, t) {
        var r,
            s,
            o,
            u,
            c,
            f,
            h,
            a,
            l = n.constructor
        n: if (null != e) {
            if (!(h = n.d)) return n
            for (r = 1, u = h[0]; 10 <= u; u /= 10) r++
            if ((s = e - r) < 0)
                (s += Z),
                    (o = e),
                    (c = ((f = h[(a = 0)]) / w(10, r - o - 1)) % 10 | 0)
            else if (((a = Math.ceil((s + 1) / Z)), (u = h.length) <= a)) {
                if (!t) break n
                for (; u++ <= a; ) h.push(0)
                ;(f = c = 0), (o = (s %= Z) - Z + (r = 1))
            } else {
                for (f = u = h[a], r = 1; 10 <= u; u /= 10) r++
                c =
                    (o = (s %= Z) - Z + r) < 0
                        ? 0
                        : (f / w(10, r - o - 1)) % 10 | 0
            }
            if (
                ((t =
                    t ||
                    e < 0 ||
                    void 0 !== h[a + 1] ||
                    (o < 0 ? f : f % w(10, r - o - 1))),
                (c =
                    i < 4
                        ? (c || t) && (0 == i || i == (n.s < 0 ? 3 : 2))
                        : 5 < c ||
                          (5 == c &&
                              (4 == i ||
                                  t ||
                                  (6 == i &&
                                      (0 < s
                                          ? 0 < o
                                              ? f / w(10, r - o)
                                              : 0
                                          : h[a - 1]) %
                                          10 &
                                          1) ||
                                  i == (n.s < 0 ? 8 : 7)))),
                e < 1 || !h[0])
            )
                return (
                    (h.length = 0),
                    c
                        ? ((e -= n.e + 1),
                          (h[0] = w(10, (Z - (e % Z)) % Z)),
                          (n.e = -e || 0))
                        : (h[0] = n.e = 0),
                    n
                )
            if (
                (0 == s
                    ? ((h.length = a), (u = 1), a--)
                    : ((h.length = a + 1),
                      (u = w(10, Z - s)),
                      (h[a] =
                          0 < o ? ((f / w(10, r - o)) % w(10, o) | 0) * u : 0)),
                c)
            )
                for (;;) {
                    if (0 == a) {
                        for (s = 1, o = h[0]; 10 <= o; o /= 10) s++
                        for (o = h[0] += u, u = 1; 10 <= o; o /= 10) u++
                        s != u && (n.e++, h[0] == S && (h[0] = 1))
                        break
                    }
                    if (((h[a] += u), h[a] != S)) break
                    ;(h[a--] = 0), (u = 1)
                }
            for (s = h.length; 0 === h[--s]; ) h.pop()
        }
        return (
            N &&
                (n.e > l.maxE
                    ? ((n.d = null), (n.e = NaN))
                    : n.e < l.minE && ((n.e = 0), (n.d = [0]))),
            n
        )
    }
    function M(n, e, i) {
        if (!n.isFinite()) return K(n)
        var t,
            r = n.e,
            s = b(n.d),
            o = s.length
        return (
            e
                ? (i && 0 < (t = i - o)
                      ? (s = s.charAt(0) + "." + s.slice(1) + a(t))
                      : 1 < o && (s = s.charAt(0) + "." + s.slice(1)),
                  (s = s + (n.e < 0 ? "e" : "e+") + n.e))
                : r < 0
                ? ((s = "0." + a(-r - 1) + s),
                  i && 0 < (t = i - o) && (s += a(t)))
                : o <= r
                ? ((s += a(r + 1 - o)),
                  i && 0 < (t = i - r - 1) && (s = s + "." + a(t)))
                : ((t = r + 1) < o && (s = s.slice(0, t) + "." + s.slice(t)),
                  i &&
                      0 < (t = i - o) &&
                      (r + 1 === o && (s += "."), (s += a(t)))),
            s
        )
    }
    function q(n, e) {
        var i = n[0]
        for (e *= Z; 10 <= i; i /= 10) e++
        return e
    }
    function O(n, e, i) {
        if (j < e) throw ((N = !0), i && (n.precision = i), Error(C))
        return _(new n(t), e, 1, !0)
    }
    function D(n, e, i) {
        if (d < e) throw Error(C)
        return _(new n(r), e, i, !0)
    }
    function W(n) {
        var e = n.length - 1,
            i = e * Z + 1
        if ((e = n[e])) {
            for (; e % 10 == 0; e /= 10) i--
            for (e = n[0]; 10 <= e; e /= 10) i++
        }
        return i
    }
    function a(n) {
        for (var e = ""; n--; ) e += "0"
        return e
    }
    function J(n, e, i, t) {
        var r,
            s = new n(1),
            o = Math.ceil(t / Z + 4)
        for (N = !1; ; ) {
            if (
                (i % 2 && nn((s = s.times(e)).d, o) && (r = !0),
                0 === (i = A(i / 2)))
            ) {
                ;(i = s.d.length - 1), r && 0 === s.d[i] && ++s.d[i]
                break
            }
            nn((e = e.times(e)).d, o)
        }
        return (N = !0), s
    }
    function z(n) {
        return 1 & n.d[n.d.length - 1]
    }
    function G(n, e, i) {
        for (var t, r = new n(e[0]), s = 0; ++s < e.length; ) {
            if (!(t = new n(e[s])).s) {
                r = t
                break
            }
            r[i](t) && (r = t)
        }
        return r
    }
    function l(n, e) {
        var i,
            t,
            r,
            s,
            o,
            u,
            c,
            f = 0,
            h = 0,
            a = 0,
            l = n.constructor,
            d = l.rounding,
            p = l.precision
        if (!n.d || !n.d[0] || 17 < n.e)
            return new l(
                n.d
                    ? n.d[0]
                        ? n.s < 0
                            ? 0
                            : 1 / 0
                        : 1
                    : n.s
                    ? n.s < 0
                        ? 0
                        : n
                    : NaN
            )
        for (c = null == e ? ((N = !1), p) : e, u = new l(0.03125); -2 < n.e; )
            (n = n.times(u)), (a += 5)
        for (
            c += t = ((Math.log(w(2, a)) / Math.LN10) * 2 + 5) | 0,
                i = s = o = new l(1),
                l.precision = c;
            ;

        ) {
            if (
                ((s = _(s.times(n), c, 1)),
                (i = i.times(++h)),
                b((u = o.plus(y(s, i, c, 1))).d).slice(0, c) ===
                    b(o.d).slice(0, c))
            ) {
                for (r = a; r--; ) o = _(o.times(o), c, 1)
                if (null != e) return (l.precision = p), o
                if (!(f < 3 && E(o.d, c - t, d, f)))
                    return _(o, (l.precision = p), d, (N = !0))
                ;(l.precision = c += 10), (i = s = u = new l(1)), (h = 0), f++
            }
            o = u
        }
    }
    function F(n, e) {
        var i,
            t,
            r,
            s,
            o,
            u,
            c,
            f,
            h,
            a,
            l,
            d = 1,
            p = n,
            g = p.d,
            m = p.constructor,
            w = m.rounding,
            v = m.precision
        if (p.s < 0 || !g || !g[0] || (!p.e && 1 == g[0] && 1 == g.length))
            return new m(g && !g[0] ? -1 / 0 : 1 != p.s ? NaN : g ? 0 : p)
        if (
            ((h = null == e ? ((N = !1), v) : e),
            (m.precision = h += 10),
            (t = (i = b(g)).charAt(0)),
            !(Math.abs((s = p.e)) < 15e14))
        )
            return (
                (f = O(m, h + 2, v).times(s + "")),
                (p = F(new m(t + "." + i.slice(1)), h - 10).plus(f)),
                (m.precision = v),
                null == e ? _(p, v, w, (N = !0)) : p
            )
        for (; (t < 7 && 1 != t) || (1 == t && 3 < i.charAt(1)); )
            (t = (i = b((p = p.times(n)).d)).charAt(0)), d++
        for (
            s = p.e,
                1 < t
                    ? ((p = new m("0." + i)), s++)
                    : (p = new m(t + "." + i.slice(1))),
                c = o = p = y((a = p).minus(1), p.plus(1), h, 1),
                l = _(p.times(p), h, 1),
                r = 3;
            ;

        ) {
            if (
                ((o = _(o.times(l), h, 1)),
                b((f = c.plus(y(o, new m(r), h, 1))).d).slice(0, h) ===
                    b(c.d).slice(0, h))
            ) {
                if (
                    ((c = c.times(2)),
                    0 !== s && (c = c.plus(O(m, h + 2, v).times(s + ""))),
                    (c = y(c, new m(d), h, 1)),
                    null != e)
                )
                    return (m.precision = v), c
                if (!E(c.d, h - 10, w, u))
                    return _(c, (m.precision = v), w, (N = !0))
                ;(m.precision = h += 10),
                    (f = o = p = y(a.minus(1), a.plus(1), h, 1)),
                    (l = _(p.times(p), h, 1)),
                    (r = u = 1)
            }
            ;(c = f), (r += 2)
        }
    }
    function K(n) {
        return String((n.s * n.s) / 0)
    }
    function Q(n, e) {
        var i, t, r
        for (
            0 <
            (t = (e =
                -1 < (i = e.indexOf(".")) ? e.replace(".", "") : e).search(
                /e/i
            ))
                ? (i < 0 && (i = t),
                  (i += +e.slice(t + 1)),
                  (e = e.substring(0, t)))
                : i < 0 && (i = e.length),
                t = 0;
            48 === e.charCodeAt(t);
            t++
        );
        for (r = e.length; 48 === e.charCodeAt(r - 1); --r);
        if ((e = e.slice(t, r))) {
            if (
                ((r -= t),
                (n.e = i = i - t - 1),
                (n.d = []),
                (t = (i + 1) % Z),
                i < 0 && (t += Z),
                t < r)
            ) {
                for (t && n.d.push(+e.slice(0, t)), r -= Z; t < r; )
                    n.d.push(+e.slice(t, (t += Z)))
                ;(e = e.slice(t)), (t = Z - e.length)
            } else t -= r
            for (; t--; ) e += "0"
            n.d.push(+e),
                N &&
                    (n.e > n.constructor.maxE
                        ? ((n.d = null), (n.e = NaN))
                        : n.e < n.constructor.minE && ((n.e = 0), (n.d = [0])))
        } else (n.e = 0), (n.d = [0])
        return n
    }
    function L(n, e, i, t, r) {
        var s,
            o,
            u,
            c,
            f = n.precision,
            h = Math.ceil(f / Z)
        for (N = !1, c = i.times(i), u = new n(t); ; ) {
            if (
                ((o = y(u.times(c), new n(e++ * e++), f, 1)),
                (u = r ? t.plus(o) : t.minus(o)),
                (t = y(o.times(c), new n(e++ * e++), f, 1)),
                void 0 !== (o = u.plus(t)).d[h])
            ) {
                for (s = h; o.d[s] === u.d[s] && s--; );
                if (-1 == s) break
            }
            ;(s = u), (u = t), (t = o), (o = s), 0
        }
        return (N = !0), (o.d.length = h + 1), o
    }
    function U(n, e) {
        for (var i = n; --e; ) i *= n
        return i
    }
    function X(n, e) {
        var i,
            t = e.s < 0,
            n = D(n, n.precision, 1),
            r = n.times(0.5)
        if ((e = e.abs()).lte(r)) return (s = t ? 4 : 1), e
        if ((i = e.divToInt(n)).isZero()) s = t ? 3 : 2
        else {
            if ((e = e.minus(i.times(n))).lte(r))
                return (s = z(i) ? (t ? 2 : 3) : t ? 4 : 1), e
            s = z(i) ? (t ? 1 : 4) : t ? 3 : 2
        }
        return e.minus(n).abs()
    }
    function Y(n, e, i, t) {
        var r,
            s,
            o,
            u,
            c,
            f,
            h,
            a,
            l = n.constructor,
            d = void 0 !== i
        if (
            (d
                ? (v(i, 1, p), void 0 === t ? (t = l.rounding) : v(t, 0, 8))
                : ((i = l.precision), (t = l.rounding)),
            n.isFinite())
        ) {
            for (
                d
                    ? ((r = 2),
                      16 == e ? (i = 4 * i - 3) : 8 == e && (i = 3 * i - 2))
                    : (r = e),
                    0 <= (o = (f = M(n)).indexOf(".")) &&
                        ((f = f.replace(".", "")),
                        ((a = new l(1)).e = f.length - o),
                        (a.d = x(M(a), 10, r)),
                        (a.e = a.d.length)),
                    s = u = (h = x(f, 10, r)).length;
                0 == h[--u];

            )
                h.pop()
            if (h[0]) {
                if (
                    (o < 0
                        ? s--
                        : (((n = new l(n)).d = h),
                          (n.e = s),
                          (h = (n = y(n, a, i, t, 0, r)).d),
                          (s = n.e),
                          (c = k)),
                    (o = h[i]),
                    (l = r / 2),
                    (c = c || void 0 !== h[i + 1]),
                    (c =
                        t < 4
                            ? (void 0 !== o || c) &&
                              (0 === t || t === (n.s < 0 ? 3 : 2))
                            : l < o ||
                              (o === l &&
                                  (4 === t ||
                                      c ||
                                      (6 === t && 1 & h[i - 1]) ||
                                      t === (n.s < 0 ? 8 : 7)))),
                    (h.length = i),
                    c)
                )
                    for (; ++h[--i] > r - 1; )
                        (h[i] = 0), i || (++s, h.unshift(1))
                for (u = h.length; !h[u - 1]; --u);
                for (o = 0, f = ""; o < u; o++) f += g.charAt(h[o])
                if (d) {
                    if (1 < u)
                        if (16 == e || 8 == e) {
                            for (o = 16 == e ? 4 : 3, --u; u % o; u++) f += "0"
                            for (u = (h = x(f, r, e)).length; !h[u - 1]; --u);
                            for (o = 1, f = "1."; o < u; o++)
                                f += g.charAt(h[o])
                        } else f = f.charAt(0) + "." + f.slice(1)
                    f = f + (s < 0 ? "p" : "p+") + s
                } else if (s < 0) {
                    for (; ++s; ) f = "0" + f
                    f = "0." + f
                } else if (++s > u) for (s -= u; s--; ) f += "0"
                else s < u && (f = f.slice(0, s) + "." + f.slice(s))
            } else f = d ? "0p+0" : "0"
            f = (16 == e ? "0x" : 2 == e ? "0b" : 8 == e ? "0o" : "") + f
        } else f = K(n)
        return n.s < 0 ? "-" + f : f
    }
    function nn(n, e) {
        return n.length > e && ((n.length = e), 1)
    }
    function en(n) {
        return new this(n).abs()
    }
    function tn(n) {
        return new this(n).acos()
    }
    function rn(n) {
        return new this(n).acosh()
    }
    function sn(n, e) {
        return new this(n).plus(e)
    }
    function on(n) {
        return new this(n).asin()
    }
    function un(n) {
        return new this(n).asinh()
    }
    function cn(n) {
        return new this(n).atan()
    }
    function fn(n) {
        return new this(n).atanh()
    }
    function hn(n, e) {
        ;(n = new this(n)), (e = new this(e))
        var i,
            t = this.precision,
            r = this.rounding,
            s = t + 4
        return (
            n.s && e.s
                ? n.d || e.d
                    ? !e.d || n.isZero()
                        ? ((i = e.s < 0 ? D(this, t, r) : new this(0)).s = n.s)
                        : !n.d || e.isZero()
                        ? ((i = D(this, s, 1).times(0.5)).s = n.s)
                        : (i =
                              e.s < 0
                                  ? ((this.precision = s),
                                    (this.rounding = 1),
                                    (i = this.atan(y(n, e, s, 1))),
                                    (e = D(this, s, 1)),
                                    (this.precision = t),
                                    (this.rounding = r),
                                    n.s < 0 ? i.minus(e) : i.plus(e))
                                  : this.atan(y(n, e, s, 1)))
                    : ((i = D(this, s, 1).times(0 < e.s ? 0.25 : 0.75)).s = n.s)
                : (i = new this(NaN)),
            i
        )
    }
    function an(n) {
        return new this(n).cbrt()
    }
    function ln(n) {
        return _((n = new this(n)), n.e + 1, 2)
    }
    function dn(n, e, i) {
        return new this(n).clamp(e, i)
    }
    function pn(n) {
        if (!n || "object" != typeof n) throw Error(c + "Object expected")
        for (
            var e,
                i,
                t = !0 === n.defaults,
                r = [
                    "precision",
                    1,
                    p,
                    "rounding",
                    0,
                    8,
                    "toExpNeg",
                    -o,
                    0,
                    "toExpPos",
                    0,
                    o,
                    "maxE",
                    0,
                    o,
                    "minE",
                    -o,
                    0,
                    "modulo",
                    0,
                    9,
                ],
                s = 0;
            s < r.length;
            s += 3
        )
            if (((e = r[s]), t && (this[e] = u[e]), void 0 !== (i = n[e]))) {
                if (!(A(i) === i && r[s + 1] <= i && i <= r[s + 2]))
                    throw Error(m + e + ": " + i)
                this[e] = i
            }
        if (((e = "crypto"), t && (this[e] = u[e]), void 0 !== (i = n[e]))) {
            if (!0 !== i && !1 !== i && 0 !== i && 1 !== i)
                throw Error(m + e + ": " + i)
            if (i) {
                if (
                    "undefined" == typeof crypto ||
                    !crypto ||
                    (!crypto.getRandomValues && !crypto.randomBytes)
                )
                    throw Error(I)
                this[e] = !0
            } else this[e] = !1
        }
        return this
    }
    function gn(n) {
        return new this(n).cos()
    }
    function mn(n) {
        return new this(n).cosh()
    }
    function wn(n, e) {
        return new this(n).div(e)
    }
    function vn(n) {
        return new this(n).exp()
    }
    function Nn(n) {
        return _((n = new this(n)), n.e + 1, 3)
    }
    function bn() {
        var n,
            e,
            i = new this(0)
        for (N = !1, n = 0; n < arguments.length; )
            if ((e = new this(arguments[n++])).d)
                i.d && (i = i.plus(e.times(e)))
            else {
                if (e.s) return (N = !0), new this(1 / 0)
                i = e
            }
        return (N = !0), i.sqrt()
    }
    function En(n) {
        return n instanceof h || (n && n.toStringTag === i) || !1
    }
    function xn(n) {
        return new this(n).ln()
    }
    function yn(n, e) {
        return new this(n).log(e)
    }
    function Mn(n) {
        return new this(n).log(2)
    }
    function qn(n) {
        return new this(n).log(10)
    }
    function On() {
        return G(this, arguments, "lt")
    }
    function Dn() {
        return G(this, arguments, "gt")
    }
    function Fn(n, e) {
        return new this(n).mod(e)
    }
    function An(n, e) {
        return new this(n).mul(e)
    }
    function Sn(n, e) {
        return new this(n).pow(e)
    }
    function Zn(n) {
        var e,
            i,
            t,
            r,
            s = 0,
            o = new this(1),
            u = []
        if (
            (void 0 === n ? (n = this.precision) : v(n, 1, p),
            (t = Math.ceil(n / Z)),
            this.crypto)
        )
            if (crypto.getRandomValues)
                for (e = crypto.getRandomValues(new Uint32Array(t)); s < t; )
                    429e7 <= (r = e[s])
                        ? (e[s] = crypto.getRandomValues(new Uint32Array(1))[0])
                        : (u[s++] = r % 1e7)
            else {
                if (!crypto.randomBytes) throw Error(I)
                for (e = crypto.randomBytes((t *= 4)); s < t; )
                    214e7 <=
                    (r =
                        e[s] +
                        (e[s + 1] << 8) +
                        (e[s + 2] << 16) +
                        ((127 & e[s + 3]) << 24))
                        ? crypto.randomBytes(4).copy(e, s)
                        : (u.push(r % 1e7), (s += 4))
                s = t / 4
            }
        else for (; s < t; ) u[s++] = (1e7 * Math.random()) | 0
        for (
            t = u[--s],
                n %= Z,
                t && n && ((r = w(10, Z - n)), (u[s] = ((t / r) | 0) * r));
            0 === u[s];
            s--
        )
            u.pop()
        if (s < 0) u = [(i = 0)]
        else {
            for (i = -1; 0 === u[0]; i -= Z) u.shift()
            for (t = 1, r = u[0]; 10 <= r; r /= 10) t++
            t < Z && (i -= Z - t)
        }
        return (o.e = i), (o.d = u), o
    }
    function Pn(n) {
        return _((n = new this(n)), n.e + 1, this.rounding)
    }
    function Rn(n) {
        return (n = new this(n)).d ? (n.d[0] ? n.s : 0 * n.s) : n.s || NaN
    }
    function Tn(n) {
        return new this(n).sin()
    }
    function _n(n) {
        return new this(n).sinh()
    }
    function Ln(n) {
        return new this(n).sqrt()
    }
    function Un(n, e) {
        return new this(n).sub(e)
    }
    function kn() {
        var n = 0,
            e = arguments,
            i = new this(e[n])
        for (N = !1; i.s && ++n < e.length; ) i = i.plus(e[n])
        return (N = !0), _(i, this.precision, this.rounding)
    }
    function Cn(n) {
        return new this(n).tan()
    }
    function In(n) {
        return new this(n).tanh()
    }
    function Hn(n) {
        return _((n = new this(n)), n.e + 1, 1)
    }
    ;(((h = (function n(e) {
        var i, t, r
        function s(n) {
            var e,
                i,
                t,
                r = this
            if (!(r instanceof s)) return new s(n)
            if (((r.constructor = s), En(n)))
                return (
                    (r.s = n.s),
                    void (N
                        ? !n.d || n.e > s.maxE
                            ? ((r.e = NaN), (r.d = null))
                            : n.e < s.minE
                            ? ((r.e = 0), (r.d = [0]))
                            : ((r.e = n.e), (r.d = n.d.slice()))
                        : ((r.e = n.e), (r.d = n.d && n.d.slice())))
                )
            if ("number" == (t = typeof n)) {
                if (0 === n)
                    return (
                        (r.s = 1 / n < 0 ? -1 : 1), (r.e = 0), void (r.d = [0])
                    )
                if (
                    (n < 0 ? ((n = -n), (r.s = -1)) : (r.s = 1),
                    n === ~~n && n < 1e7)
                ) {
                    for (e = 0, i = n; 10 <= i; i /= 10) e++
                    return void (N
                        ? s.maxE < e
                            ? ((r.e = NaN), (r.d = null))
                            : e < s.minE
                            ? ((r.e = 0), (r.d = [0]))
                            : ((r.e = e), (r.d = [n]))
                        : ((r.e = e), (r.d = [n])))
                }
                return 0 * n != 0
                    ? (n || (r.s = NaN), (r.e = NaN), void (r.d = null))
                    : Q(r, n.toString())
            }
            if ("string" != t) throw Error(m + n)
            return (
                45 === (i = n.charCodeAt(0))
                    ? ((n = n.slice(1)), (r.s = -1))
                    : (43 === i && (n = n.slice(1)), (r.s = 1)),
                ($.test(n)
                    ? Q
                    : function (n, e) {
                          var i, t, r, s, o, u, c, f
                          if (-1 < e.indexOf("_")) {
                              if (
                                  ((e = e.replace(/(\d)_(?=\d)/g, "$1")),
                                  $.test(e))
                              )
                                  return Q(n, e)
                          } else if ("Infinity" === e || "NaN" === e)
                              return (
                                  +e || (n.s = NaN),
                                  (n.e = NaN),
                                  (n.d = null),
                                  n
                              )
                          if (B.test(e)) (i = 16), (e = e.toLowerCase())
                          else if (H.test(e)) i = 2
                          else {
                              if (!V.test(e)) throw Error(m + e)
                              i = 8
                          }
                          for (
                              s = (e =
                                  0 < (s = e.search(/p/i))
                                      ? ((c = +e.slice(s + 1)),
                                        e.substring(2, s))
                                      : e.slice(2)).indexOf("."),
                                  t = n.constructor,
                                  (o = 0 <= s) &&
                                      ((s =
                                          (u = (e = e.replace(".", ""))
                                              .length) - s),
                                      (r = J(t, new t(i), s, 2 * s))),
                                  s = e = (f = x(e, i, S)).length - 1;
                              0 === f[s];
                              --s
                          )
                              f.pop()
                          return s < 0
                              ? new t(0 * n.s)
                              : ((n.e = q(f, e)),
                                (n.d = f),
                                (N = !1),
                                o && (n = y(n, r, 4 * u)),
                                c &&
                                    (n = n.times(
                                        Math.abs(c) < 54 ? w(2, c) : h.pow(2, c)
                                    )),
                                (N = !0),
                                n)
                      })(r, n)
            )
        }
        if (
            ((s.prototype = f),
            (s.ROUND_UP = 0),
            (s.ROUND_DOWN = 1),
            (s.ROUND_CEIL = 2),
            (s.ROUND_FLOOR = 3),
            (s.ROUND_HALF_UP = 4),
            (s.ROUND_HALF_DOWN = 5),
            (s.ROUND_HALF_EVEN = 6),
            (s.ROUND_HALF_CEIL = 7),
            (s.ROUND_HALF_FLOOR = 8),
            (s.EUCLID = 9),
            (s.config = s.set = pn),
            (s.clone = n),
            (s.isDecimal = En),
            (s.abs = en),
            (s.acos = tn),
            (s.acosh = rn),
            (s.add = sn),
            (s.asin = on),
            (s.asinh = un),
            (s.atan = cn),
            (s.atanh = fn),
            (s.atan2 = hn),
            (s.cbrt = an),
            (s.ceil = ln),
            (s.clamp = dn),
            (s.cos = gn),
            (s.cosh = mn),
            (s.div = wn),
            (s.exp = vn),
            (s.floor = Nn),
            (s.hypot = bn),
            (s.ln = xn),
            (s.log = yn),
            (s.log10 = qn),
            (s.log2 = Mn),
            (s.max = On),
            (s.min = Dn),
            (s.mod = Fn),
            (s.mul = An),
            (s.pow = Sn),
            (s.random = Zn),
            (s.round = Pn),
            (s.sign = Rn),
            (s.sin = Tn),
            (s.sinh = _n),
            (s.sqrt = Ln),
            (s.sub = Un),
            (s.sum = kn),
            (s.tan = Cn),
            (s.tanh = In),
            (s.trunc = Hn),
            (e = void 0 === e ? {} : e) && !0 !== e.defaults)
        )
            for (
                r = [
                    "precision",
                    "rounding",
                    "toExpNeg",
                    "toExpPos",
                    "maxE",
                    "minE",
                    "modulo",
                    "crypto",
                ],
                    i = 0;
                i < r.length;

            )
                e.hasOwnProperty((t = r[i++])) || (e[t] = this[t])
        return s.config(e), s
    })(u)).prototype.constructor = h).default = h.Decimal =
        h),
        (t = new h(t)),
        (r = new h(r)),
        "function" == typeof define && define.amd
            ? define(function () {
                  return h
              })
            : "undefined" != typeof module && module.exports
            ? ("function" == typeof Symbol &&
                  "symbol" == typeof Symbol.iterator &&
                  ((f[Symbol.for("nodejs.util.inspect.custom")] = f.toString),
                  (f[Symbol.toStringTag] = "Decimal")),
              (module.exports = h))
            : ((n =
                  n ||
                  ("undefined" != typeof self && self && self.self == self
                      ? self
                      : window)),
              (e = n.Decimal),
              (h.noConflict = function () {
                  return (n.Decimal = e), h
              }),
              (n.Decimal = h))
})(this)

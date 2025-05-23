/**
 * State-based routing for AngularJS
 * @version v0.2.14
 * @link http://angular-ui.github.com/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
"undefined" != typeof module &&
  "undefined" != typeof exports &&
  module.exports === exports &&
  (module.exports = "ui.router"),
  (function (a, b, c) {
    "use strict";
    function d(a, b) {
      return M(new (M(function () {}, { prototype: a }))(), b);
    }
    function e(a) {
      return (
        L(arguments, function (b) {
          b !== a &&
            L(b, function (b, c) {
              a.hasOwnProperty(c) || (a[c] = b);
            });
        }),
        a
      );
    }
    function f(a, b) {
      var c = [];
      for (var d in a.path) {
        if (a.path[d] !== b.path[d]) break;
        c.push(a.path[d]);
      }
      return c;
    }
    function g(a) {
      if (Object.keys) return Object.keys(a);
      var b = [];
      return (
        L(a, function (a, c) {
          b.push(c);
        }),
        b
      );
    }
    function h(a, b) {
      if (Array.prototype.indexOf)
        return a.indexOf(b, Number(arguments[2]) || 0);
      var c = a.length >>> 0,
        d = Number(arguments[2]) || 0;
      for (
        d = 0 > d ? Math.ceil(d) : Math.floor(d), 0 > d && (d += c);
        c > d;
        d++
      )
        if (d in a && a[d] === b) return d;
      return -1;
    }
    function i(a, b, c, d) {
      var e,
        i = f(c, d),
        j = {},
        k = [];
      for (var l in i)
        if (i[l].params && ((e = g(i[l].params)), e.length))
          for (var m in e)
            h(k, e[m]) >= 0 || (k.push(e[m]), (j[e[m]] = a[e[m]]));
      return M({}, j, b);
    }
    function j(a, b, c) {
      if (!c) {
        c = [];
        for (var d in a) c.push(d);
      }
      for (var e = 0; e < c.length; e++) {
        var f = c[e];
        if (a[f] != b[f]) return !1;
      }
      return !0;
    }
    function k(a, b) {
      var c = {};
      return (
        L(a, function (a) {
          c[a] = b[a];
        }),
        c
      );
    }
    function l(a) {
      var b = {},
        c = Array.prototype.concat.apply(
          Array.prototype,
          Array.prototype.slice.call(arguments, 1)
        );
      for (var d in a) -1 == h(c, d) && (b[d] = a[d]);
      return b;
    }
    function m(a, b) {
      var c = K(a),
        d = c ? [] : {};
      return (
        L(a, function (a, e) {
          b(a, e) && (d[c ? d.length : e] = a);
        }),
        d
      );
    }
    function n(a, b) {
      var c = K(a) ? [] : {};
      return (
        L(a, function (a, d) {
          c[d] = b(a, d);
        }),
        c
      );
    }
    function o(a, b) {
      var d = 1,
        f = 2,
        i = {},
        j = [],
        k = i,
        m = M(a.when(i), { $$promises: i, $$values: i });
      (this.study = function (i) {
        function n(a, c) {
          if (s[c] !== f) {
            if ((r.push(c), s[c] === d))
              throw (
                (r.splice(0, h(r, c)),
                new Error("Cyclic dependency: " + r.join(" -> ")))
              );
            if (((s[c] = d), I(a)))
              q.push(
                c,
                [
                  function () {
                    return b.get(a);
                  },
                ],
                j
              );
            else {
              var e = b.annotate(a);
              L(e, function (a) {
                a !== c && i.hasOwnProperty(a) && n(i[a], a);
              }),
                q.push(c, a, e);
            }
            r.pop(), (s[c] = f);
          }
        }
        function o(a) {
          return J(a) && a.then && a.$$promises;
        }
        if (!J(i)) throw new Error("'invocables' must be an object");
        var p = g(i || {}),
          q = [],
          r = [],
          s = {};
        return (
          L(i, n),
          (i = r = s = null),
          function (d, f, g) {
            function h() {
              --u ||
                (v || e(t, f.$$values),
                (r.$$values = t),
                (r.$$promises = r.$$promises || !0),
                delete r.$$inheritedValues,
                n.resolve(t));
            }
            function i(a) {
              (r.$$failure = a), n.reject(a);
            }
            function j(c, e, f) {
              function j(a) {
                l.reject(a), i(a);
              }
              function k() {
                if (!G(r.$$failure))
                  try {
                    l.resolve(b.invoke(e, g, t)),
                      l.promise.then(function (a) {
                        (t[c] = a), h();
                      }, j);
                  } catch (a) {
                    j(a);
                  }
              }
              var l = a.defer(),
                m = 0;
              L(f, function (a) {
                s.hasOwnProperty(a) &&
                  !d.hasOwnProperty(a) &&
                  (m++,
                  s[a].then(function (b) {
                    (t[a] = b), --m || k();
                  }, j));
              }),
                m || k(),
                (s[c] = l.promise);
            }
            if ((o(d) && g === c && ((g = f), (f = d), (d = null)), d)) {
              if (!J(d)) throw new Error("'locals' must be an object");
            } else d = k;
            if (f) {
              if (!o(f))
                throw new Error(
                  "'parent' must be a promise returned by $resolve.resolve()"
                );
            } else f = m;
            var n = a.defer(),
              r = n.promise,
              s = (r.$$promises = {}),
              t = M({}, d),
              u = 1 + q.length / 3,
              v = !1;
            if (G(f.$$failure)) return i(f.$$failure), r;
            f.$$inheritedValues && e(t, l(f.$$inheritedValues, p)),
              M(s, f.$$promises),
              f.$$values
                ? ((v = e(t, l(f.$$values, p))),
                  (r.$$inheritedValues = l(f.$$values, p)),
                  h())
                : (f.$$inheritedValues &&
                    (r.$$inheritedValues = l(f.$$inheritedValues, p)),
                  f.then(h, i));
            for (var w = 0, x = q.length; x > w; w += 3)
              d.hasOwnProperty(q[w]) ? h() : j(q[w], q[w + 1], q[w + 2]);
            return r;
          }
        );
      }),
        (this.resolve = function (a, b, c, d) {
          return this.study(a)(b, c, d);
        });
    }
    function p(a, b, c) {
      (this.fromConfig = function (a, b, c) {
        return G(a.template)
          ? this.fromString(a.template, b)
          : G(a.templateUrl)
          ? this.fromUrl(a.templateUrl, b)
          : G(a.templateProvider)
          ? this.fromProvider(a.templateProvider, b, c)
          : null;
      }),
        (this.fromString = function (a, b) {
          return H(a) ? a(b) : a;
        }),
        (this.fromUrl = function (c, d) {
          return (
            H(c) && (c = c(d)),
            null == c
              ? null
              : a
                  .get(c, { cache: b, headers: { Accept: "text/html" } })
                  .then(function (a) {
                    return a.data;
                  })
          );
        }),
        (this.fromProvider = function (a, b, d) {
          return c.invoke(a, null, d || { params: b });
        });
    }
    function q(a, b, e) {
      function f(b, c, d, e) {
        if ((q.push(b), o[b])) return o[b];
        if (!/^\w+(-+\w+)*(?:\[\])?$/.test(b))
          throw new Error(
            "Invalid parameter name '" + b + "' in pattern '" + a + "'"
          );
        if (p[b])
          throw new Error(
            "Duplicate parameter name '" + b + "' in pattern '" + a + "'"
          );
        return (p[b] = new O.Param(b, c, d, e)), p[b];
      }
      function g(a, b, c, d) {
        var e = ["", ""],
          f = a.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
        if (!b) return f;
        switch (c) {
          case !1:
            e = ["(", ")" + (d ? "?" : "")];
            break;
          case !0:
            e = ["?(", ")?"];
            break;
          default:
            e = ["(" + c + "|", ")?"];
        }
        return f + e[0] + b + e[1];
      }
      function h(e, f) {
        var g, h, i, j, k;
        return (
          (g = e[2] || e[3]),
          (k = b.params[g]),
          (i = a.substring(m, e.index)),
          (h = f ? e[4] : e[4] || ("*" == e[1] ? ".*" : null)),
          (j =
            O.type(h || "string") ||
            d(O.type("string"), {
              pattern: new RegExp(h, b.caseInsensitive ? "i" : c),
            })),
          { id: g, regexp: h, segment: i, type: j, cfg: k }
        );
      }
      b = M({ params: {} }, J(b) ? b : {});
      var i,
        j =
          /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
        k =
          /([:]?)([\w\[\]-]+)|\{([\w\[\]-]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
        l = "^",
        m = 0,
        n = (this.segments = []),
        o = e ? e.params : {},
        p = (this.params = e ? e.params.$$new() : new O.ParamSet()),
        q = [];
      this.source = a;
      for (
        var r, s, t;
        (i = j.exec(a)) && ((r = h(i, !1)), !(r.segment.indexOf("?") >= 0));

      )
        (s = f(r.id, r.type, r.cfg, "path")),
          (l += g(r.segment, s.type.pattern.source, s.squash, s.isOptional)),
          n.push(r.segment),
          (m = j.lastIndex);
      t = a.substring(m);
      var u = t.indexOf("?");
      if (u >= 0) {
        var v = (this.sourceSearch = t.substring(u));
        if (
          ((t = t.substring(0, u)),
          (this.sourcePath = a.substring(0, m + u)),
          v.length > 0)
        )
          for (m = 0; (i = k.exec(v)); )
            (r = h(i, !0)),
              (s = f(r.id, r.type, r.cfg, "search")),
              (m = j.lastIndex);
      } else (this.sourcePath = a), (this.sourceSearch = "");
      (l += g(t) + (b.strict === !1 ? "/?" : "") + "$"),
        n.push(t),
        (this.regexp = new RegExp(l, b.caseInsensitive ? "i" : c)),
        (this.prefix = n[0]),
        (this.$$paramNames = q);
    }
    function r(a) {
      M(this, a);
    }
    function s() {
      function a(a) {
        return null != a ? a.toString().replace(/\//g, "%2F") : a;
      }
      function e(a) {
        return null != a ? a.toString().replace(/%2F/g, "/") : a;
      }
      function f() {
        return { strict: p, caseInsensitive: o };
      }
      function i(a) {
        return H(a) || (K(a) && H(a[a.length - 1]));
      }
      function j() {
        for (; w.length; ) {
          var a = w.shift();
          if (a.pattern)
            throw new Error(
              "You cannot override a type's .pattern at runtime."
            );
          b.extend(u[a.name], l.invoke(a.def));
        }
      }
      function k(a) {
        M(this, a || {});
      }
      O = this;
      var l,
        o = !1,
        p = !0,
        t = !1,
        u = {},
        v = !0,
        w = [],
        x = {
          string: {
            encode: a,
            decode: e,
            is: function (a) {
              return "string" == typeof a;
            },
            pattern: /[^\/]*/,
          },
          int: {
            encode: a,
            decode: function (a) {
              return parseInt(a, 10);
            },
            is: function (a) {
              return G(a) && this.decode(a.toString()) === a;
            },
            pattern: /\d+/,
          },
          bool: {
            encode: function (a) {
              return a ? 1 : 0;
            },
            decode: function (a) {
              return 0 !== parseInt(a, 10);
            },
            is: function (a) {
              return a === !0 || a === !1;
            },
            pattern: /0|1/,
          },
          date: {
            encode: function (a) {
              return this.is(a)
                ? [
                    a.getFullYear(),
                    ("0" + (a.getMonth() + 1)).slice(-2),
                    ("0" + a.getDate()).slice(-2),
                  ].join("-")
                : c;
            },
            decode: function (a) {
              if (this.is(a)) return a;
              var b = this.capture.exec(a);
              return b ? new Date(b[1], b[2] - 1, b[3]) : c;
            },
            is: function (a) {
              return a instanceof Date && !isNaN(a.valueOf());
            },
            equals: function (a, b) {
              return (
                this.is(a) && this.is(b) && a.toISOString() === b.toISOString()
              );
            },
            pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,
            capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/,
          },
          json: {
            encode: b.toJson,
            decode: b.fromJson,
            is: b.isObject,
            equals: b.equals,
            pattern: /[^\/]*/,
          },
          any: {
            encode: b.identity,
            decode: b.identity,
            is: b.identity,
            equals: b.equals,
            pattern: /.*/,
          },
        };
      (s.$$getDefaultValue = function (a) {
        if (!i(a.value)) return a.value;
        if (!l)
          throw new Error(
            "Injectable functions cannot be called at configuration time"
          );
        return l.invoke(a.value);
      }),
        (this.caseInsensitive = function (a) {
          return G(a) && (o = a), o;
        }),
        (this.strictMode = function (a) {
          return G(a) && (p = a), p;
        }),
        (this.defaultSquashPolicy = function (a) {
          if (!G(a)) return t;
          if (a !== !0 && a !== !1 && !I(a))
            throw new Error(
              "Invalid squash policy: " +
                a +
                ". Valid policies: false, true, arbitrary-string"
            );
          return (t = a), a;
        }),
        (this.compile = function (a, b) {
          return new q(a, M(f(), b));
        }),
        (this.isMatcher = function (a) {
          if (!J(a)) return !1;
          var b = !0;
          return (
            L(q.prototype, function (c, d) {
              H(c) && (b = b && G(a[d]) && H(a[d]));
            }),
            b
          );
        }),
        (this.type = function (a, b, c) {
          if (!G(b)) return u[a];
          if (u.hasOwnProperty(a))
            throw new Error(
              "A type named '" + a + "' has already been defined."
            );
          return (
            (u[a] = new r(M({ name: a }, b))),
            c && (w.push({ name: a, def: c }), v || j()),
            this
          );
        }),
        L(x, function (a, b) {
          u[b] = new r(M({ name: b }, a));
        }),
        (u = d(u, {})),
        (this.$get = [
          "$injector",
          function (a) {
            return (
              (l = a),
              (v = !1),
              j(),
              L(x, function (a, b) {
                u[b] || (u[b] = new r(a));
              }),
              this
            );
          },
        ]),
        (this.Param = function (a, b, d, e) {
          function f(a) {
            var b = J(a) ? g(a) : [],
              c =
                -1 === h(b, "value") &&
                -1 === h(b, "type") &&
                -1 === h(b, "squash") &&
                -1 === h(b, "array");
            return (
              c && (a = { value: a }),
              (a.$$fn = i(a.value)
                ? a.value
                : function () {
                    return a.value;
                  }),
              a
            );
          }
          function j(b, c, d) {
            if (b.type && c)
              throw new Error("Param '" + a + "' has two type configurations.");
            return c
              ? c
              : b.type
              ? b.type instanceof r
                ? b.type
                : new r(b.type)
              : "config" === d
              ? u.any
              : u.string;
          }
          function k() {
            var b = { array: "search" === e ? "auto" : !1 },
              c = a.match(/\[\]$/) ? { array: !0 } : {};
            return M(b, c, d).array;
          }
          function o(a, b) {
            var c = a.squash;
            if (!b || c === !1) return !1;
            if (!G(c) || null == c) return t;
            if (c === !0 || I(c)) return c;
            throw new Error(
              "Invalid squash policy: '" +
                c +
                "'. Valid policies: false, true, or arbitrary string"
            );
          }
          function p(a, b, d, e) {
            var f,
              g,
              i = [
                { from: "", to: d || b ? c : "" },
                { from: null, to: d || b ? c : "" },
              ];
            return (
              (f = K(a.replace) ? a.replace : []),
              I(e) && f.push({ from: e, to: c }),
              (g = n(f, function (a) {
                return a.from;
              })),
              m(i, function (a) {
                return -1 === h(g, a.from);
              }).concat(f)
            );
          }
          function q() {
            if (!l)
              throw new Error(
                "Injectable functions cannot be called at configuration time"
              );
            var a = l.invoke(d.$$fn);
            if (null !== a && a !== c && !w.type.is(a))
              throw new Error(
                "Default value (" +
                  a +
                  ") for parameter '" +
                  w.id +
                  "' is not an instance of Type (" +
                  w.type.name +
                  ")"
              );
            return a;
          }
          function s(a) {
            function b(a) {
              return function (b) {
                return b.from === a;
              };
            }
            function c(a) {
              var c = n(m(w.replace, b(a)), function (a) {
                return a.to;
              });
              return c.length ? c[0] : a;
            }
            return (a = c(a)), G(a) ? w.type.$normalize(a) : q();
          }
          function v() {
            return (
              "{Param:" +
              a +
              " " +
              b +
              " squash: '" +
              z +
              "' optional: " +
              y +
              "}"
            );
          }
          var w = this;
          (d = f(d)), (b = j(d, b, e));
          var x = k();
          (b = x ? b.$asArray(x, "search" === e) : b),
            "string" !== b.name ||
              x ||
              "path" !== e ||
              d.value !== c ||
              (d.value = "");
          var y = d.value !== c,
            z = o(d, y),
            A = p(d, x, y, z);
          M(this, {
            id: a,
            type: b,
            location: e,
            array: x,
            squash: z,
            replace: A,
            isOptional: y,
            value: s,
            dynamic: c,
            config: d,
            toString: v,
          });
        }),
        (k.prototype = {
          $$new: function () {
            return d(this, M(new k(), { $$parent: this }));
          },
          $$keys: function () {
            for (var a = [], b = [], c = this, d = g(k.prototype); c; )
              b.push(c), (c = c.$$parent);
            return (
              b.reverse(),
              L(b, function (b) {
                L(g(b), function (b) {
                  -1 === h(a, b) && -1 === h(d, b) && a.push(b);
                });
              }),
              a
            );
          },
          $$values: function (a) {
            var b = {},
              c = this;
            return (
              L(c.$$keys(), function (d) {
                b[d] = c[d].value(a && a[d]);
              }),
              b
            );
          },
          $$equals: function (a, b) {
            var c = !0,
              d = this;
            return (
              L(d.$$keys(), function (e) {
                var f = a && a[e],
                  g = b && b[e];
                d[e].type.equals(f, g) || (c = !1);
              }),
              c
            );
          },
          $$validates: function (a) {
            var d,
              e,
              f,
              g,
              h,
              i = this.$$keys();
            for (
              d = 0;
              d < i.length &&
              ((e = this[i[d]]),
              (f = a[i[d]]),
              (f !== c && null !== f) || !e.isOptional);
              d++
            ) {
              if (((g = e.type.$normalize(f)), !e.type.is(g))) return !1;
              if (
                ((h = e.type.encode(g)),
                b.isString(h) && !e.type.pattern.exec(h))
              )
                return !1;
            }
            return !0;
          },
          $$parent: c,
        }),
        (this.ParamSet = k);
    }
    function t(a, d) {
      function e(a) {
        var b = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(
          a.source
        );
        return null != b ? b[1].replace(/\\(.)/g, "$1") : "";
      }
      function f(a, b) {
        return a.replace(/\$(\$|\d{1,2})/, function (a, c) {
          return b["$" === c ? 0 : Number(c)];
        });
      }
      function g(a, b, c) {
        if (!c) return !1;
        var d = a.invoke(b, b, { $match: c });
        return G(d) ? d : !0;
      }
      function h(d, e, f, g) {
        function h(a, b, c) {
          return "/" === p
            ? a
            : b
            ? p.slice(0, -1) + a
            : c
            ? p.slice(1) + a
            : a;
        }
        function m(a) {
          function b(a) {
            var b = a(f, d);
            return b ? (I(b) && d.replace().url(b), !0) : !1;
          }
          if (!a || !a.defaultPrevented) {
            var e = o && d.url() === o;
            if (((o = c), e)) return !0;
            var g,
              h = j.length;
            for (g = 0; h > g; g++) if (b(j[g])) return;
            k && b(k);
          }
        }
        function n() {
          return (i = i || e.$on("$locationChangeSuccess", m));
        }
        var o,
          p = g.baseHref(),
          q = d.url();
        return (
          l || n(),
          {
            sync: function () {
              m();
            },
            listen: function () {
              return n();
            },
            update: function (a) {
              return a
                ? void (q = d.url())
                : void (d.url() !== q && (d.url(q), d.replace()));
            },
            push: function (a, b, e) {
              var f = a.format(b || {});
              null !== f && b && b["#"] && (f += "#" + b["#"]),
                d.url(f),
                (o = e && e.$$avoidResync ? d.url() : c),
                e && e.replace && d.replace();
            },
            href: function (c, e, f) {
              if (!c.validates(e)) return null;
              var g = a.html5Mode();
              b.isObject(g) && (g = g.enabled);
              var i = c.format(e);
              if (
                ((f = f || {}),
                g || null === i || (i = "#" + a.hashPrefix() + i),
                null !== i && e && e["#"] && (i += "#" + e["#"]),
                (i = h(i, g, f.absolute)),
                !f.absolute || !i)
              )
                return i;
              var j = !g && i ? "/" : "",
                k = d.port();
              return (
                (k = 80 === k || 443 === k ? "" : ":" + k),
                [d.protocol(), "://", d.host(), k, j, i].join("")
              );
            },
          }
        );
      }
      var i,
        j = [],
        k = null,
        l = !1;
      (this.rule = function (a) {
        if (!H(a)) throw new Error("'rule' must be a function");
        return j.push(a), this;
      }),
        (this.otherwise = function (a) {
          if (I(a)) {
            var b = a;
            a = function () {
              return b;
            };
          } else if (!H(a)) throw new Error("'rule' must be a function");
          return (k = a), this;
        }),
        (this.when = function (a, b) {
          var c,
            h = I(b);
          if ((I(a) && (a = d.compile(a)), !h && !H(b) && !K(b)))
            throw new Error("invalid 'handler' in when()");
          var i = {
              matcher: function (a, b) {
                return (
                  h &&
                    ((c = d.compile(b)),
                    (b = [
                      "$match",
                      function (a) {
                        return c.format(a);
                      },
                    ])),
                  M(
                    function (c, d) {
                      return g(c, b, a.exec(d.path(), d.search()));
                    },
                    { prefix: I(a.prefix) ? a.prefix : "" }
                  )
                );
              },
              regex: function (a, b) {
                if (a.global || a.sticky)
                  throw new Error("when() RegExp must not be global or sticky");
                return (
                  h &&
                    ((c = b),
                    (b = [
                      "$match",
                      function (a) {
                        return f(c, a);
                      },
                    ])),
                  M(
                    function (c, d) {
                      return g(c, b, a.exec(d.path()));
                    },
                    { prefix: e(a) }
                  )
                );
              },
            },
            j = { matcher: d.isMatcher(a), regex: a instanceof RegExp };
          for (var k in j) if (j[k]) return this.rule(i[k](a, b));
          throw new Error("invalid 'what' in when()");
        }),
        (this.deferIntercept = function (a) {
          a === c && (a = !0), (l = a);
        }),
        (this.$get = h),
        (h.$inject = ["$location", "$rootScope", "$injector", "$browser"]);
    }
    function u(a, e) {
      function f(a) {
        return 0 === a.indexOf(".") || 0 === a.indexOf("^");
      }
      function l(a, b) {
        if (!a) return c;
        var d = I(a),
          e = d ? a : a.name,
          g = f(e);
        if (g) {
          if (!b)
            throw new Error("No reference point given for path '" + e + "'");
          b = l(b);
          for (var h = e.split("."), i = 0, j = h.length, k = b; j > i; i++)
            if ("" !== h[i] || 0 !== i) {
              if ("^" !== h[i]) break;
              if (!k.parent)
                throw new Error(
                  "Path '" + e + "' not valid for state '" + b.name + "'"
                );
              k = k.parent;
            } else k = b;
          (h = h.slice(i).join(".")),
            (e = k.name + (k.name && h ? "." : "") + h);
        }
        var m = y[e];
        return !m || (!d && (d || (m !== a && m.self !== a))) ? c : m;
      }
      function m(a, b) {
        z[a] || (z[a] = []), z[a].push(b);
      }
      function o(a) {
        for (var b = z[a] || []; b.length; ) p(b.shift());
      }
      function p(b) {
        b = d(b, {
          self: b,
          resolve: b.resolve || {},
          toString: function () {
            return this.name;
          },
        });
        var c = b.name;
        if (!I(c) || c.indexOf("@") >= 0)
          throw new Error("State must have a valid name");
        if (y.hasOwnProperty(c))
          throw new Error("State '" + c + "'' is already defined");
        var e =
          -1 !== c.indexOf(".")
            ? c.substring(0, c.lastIndexOf("."))
            : I(b.parent)
            ? b.parent
            : J(b.parent) && I(b.parent.name)
            ? b.parent.name
            : "";
        if (e && !y[e]) return m(e, b.self);
        for (var f in B) H(B[f]) && (b[f] = B[f](b, B.$delegates[f]));
        return (
          (y[c] = b),
          !b[A] &&
            b.url &&
            a.when(b.url, [
              "$match",
              "$stateParams",
              function (a, c) {
                (x.$current.navigable == b && j(a, c)) ||
                  x.transitionTo(b, a, { inherit: !0, location: !1 });
              },
            ]),
          o(c),
          b
        );
      }
      function q(a) {
        return a.indexOf("*") > -1;
      }
      function r(a) {
        for (
          var b = a.split("."),
            c = x.$current.name.split("."),
            d = 0,
            e = b.length;
          e > d;
          d++
        )
          "*" === b[d] && (c[d] = "*");
        return (
          "**" === b[0] && ((c = c.slice(h(c, b[1]))), c.unshift("**")),
          "**" === b[b.length - 1] &&
            (c.splice(h(c, b[b.length - 2]) + 1, Number.MAX_VALUE),
            c.push("**")),
          b.length != c.length ? !1 : c.join("") === b.join("")
        );
      }
      function s(a, b) {
        return I(a) && !G(b)
          ? B[a]
          : H(b) && I(a)
          ? (B[a] && !B.$delegates[a] && (B.$delegates[a] = B[a]),
            (B[a] = b),
            this)
          : this;
      }
      function t(a, b) {
        return J(a) ? (b = a) : (b.name = a), p(b), this;
      }
      function u(a, e, f, h, m, o, p) {
        function s(b, c, d, f) {
          var g = a.$broadcast("$stateNotFound", b, c, d);
          if (g.defaultPrevented) return p.update(), B;
          if (!g.retry) return null;
          if (f.$retry) return p.update(), C;
          var h = (x.transition = e.when(g.retry));
          return (
            h.then(
              function () {
                return h !== x.transition
                  ? u
                  : ((b.options.$retry = !0),
                    x.transitionTo(b.to, b.toParams, b.options));
              },
              function () {
                return B;
              }
            ),
            p.update(),
            h
          );
        }
        function t(a, c, d, g, i, j) {
          var l = d ? c : k(a.params.$$keys(), c),
            n = { $stateParams: l };
          i.resolve = m.resolve(a.resolve, n, i.resolve, a);
          var o = [
            i.resolve.then(function (a) {
              i.globals = a;
            }),
          ];
          return (
            g && o.push(g),
            L(a.views, function (c, d) {
              var e = c.resolve && c.resolve !== a.resolve ? c.resolve : {};
              (e.$template = [
                function () {
                  return (
                    f.load(d, {
                      view: c,
                      locals: n,
                      params: l,
                      notify: j.notify,
                    }) || ""
                  );
                },
              ]),
                o.push(
                  m.resolve(e, n, i.resolve, a).then(function (f) {
                    if (H(c.controllerProvider) || K(c.controllerProvider)) {
                      var g = b.extend({}, e, n, f);
                      f.$$controller = h.invoke(c.controllerProvider, null, g);
                    } else f.$$controller = c.controller;
                    (f.$$state = a),
                      (f.$$controllerAs = c.controllerAs),
                      (i[d] = f);
                  })
                );
            }),
            e.all(o).then(function () {
              return i;
            })
          );
        }
        var u = e.reject(new Error("transition superseded")),
          z = e.reject(new Error("transition prevented")),
          B = e.reject(new Error("transition aborted")),
          C = e.reject(new Error("transition failed"));
        return (
          (w.locals = { resolve: null, globals: { $stateParams: {} } }),
          (x = { params: {}, current: w.self, $current: w, transition: null }),
          (x.reload = function (a) {
            return x.transitionTo(x.current, o, {
              reload: a || !0,
              inherit: !1,
              notify: !0,
            });
          }),
          (x.go = function (a, b, c) {
            return x.transitionTo(
              a,
              b,
              M({ inherit: !0, relative: x.$current }, c)
            );
          }),
          (x.transitionTo = function (b, c, f) {
            (c = c || {}),
              (f = M(
                {
                  location: !0,
                  inherit: !1,
                  relative: null,
                  notify: !0,
                  reload: !1,
                  $retry: !1,
                },
                f || {}
              ));
            var g,
              j = x.$current,
              m = x.params,
              n = j.path,
              q = l(b, f.relative),
              r = c["#"];
            if (!G(q)) {
              var y = { to: b, toParams: c, options: f },
                B = s(y, j.self, m, f);
              if (B) return B;
              if (
                ((b = y.to),
                (c = y.toParams),
                (f = y.options),
                (q = l(b, f.relative)),
                !G(q))
              ) {
                if (!f.relative) throw new Error("No such state '" + b + "'");
                throw new Error(
                  "Could not resolve '" +
                    b +
                    "' from state '" +
                    f.relative +
                    "'"
                );
              }
            }
            if (q[A])
              throw new Error(
                "Cannot transition to abstract state '" + b + "'"
              );
            if (
              (f.inherit && (c = i(o, c || {}, x.$current, q)),
              !q.params.$$validates(c))
            )
              return C;
            (c = q.params.$$values(c)), (b = q);
            var D = b.path,
              E = 0,
              F = D[E],
              H = w.locals,
              K = [],
              L = !1;
            if (f.reload) {
              if (I(f.reload) || J(f.reload)) {
                if (J(f.reload) && !f.reload.name)
                  throw new Error("Invalid reload state object");
                var O = f.reload === !0 ? n[0] : l(f.reload);
                if (f.reload && !O)
                  throw new Error(
                    "No such reload state '" +
                      (I(f.reload) ? f.reload : f.reload.name) +
                      "'"
                  );
                for (L = !0; F && F === n[E] && F !== O; )
                  (H = K[E] = F.locals), E++, (F = D[E]);
              }
            } else
              for (; F && F === n[E] && F.ownParams.$$equals(c, m); )
                (H = K[E] = F.locals), E++, (F = D[E]);
            if (!L && v(b, j, H, f))
              return (
                b.self.reloadOnSearch !== !1 && p.update(),
                (x.transition = null),
                e.when(x.current)
              );
            if (
              ((c = k(b.params.$$keys(), c || {})),
              f.notify &&
                a.$broadcast("$stateChangeStart", b.self, c, j.self, m)
                  .defaultPrevented)
            )
              return (
                a.$broadcast("$stateChangeCancel", b.self, c, j.self, m),
                p.update(),
                z
              );
            for (var P = e.when(H), Q = E; Q < D.length; Q++, F = D[Q])
              (H = K[Q] = d(H)), (P = t(F, c, F === b, P, H, f));
            var R = (x.transition = P.then(
              function () {
                var d, e, g;
                if (x.transition !== R) return u;
                for (d = n.length - 1; d >= E; d--)
                  (g = n[d]),
                    g.self.onExit &&
                      h.invoke(g.self.onExit, g.self, g.locals.globals),
                    (g.locals = null);
                for (d = E; d < D.length; d++)
                  (e = D[d]),
                    (e.locals = K[d]),
                    e.self.onEnter &&
                      h.invoke(e.self.onEnter, e.self, e.locals.globals);
                return (
                  r && (c["#"] = r),
                  x.transition !== R
                    ? u
                    : ((x.$current = b),
                      (x.current = b.self),
                      (x.params = c),
                      N(x.params, o),
                      (x.transition = null),
                      f.location &&
                        b.navigable &&
                        p.push(
                          b.navigable.url,
                          b.navigable.locals.globals.$stateParams,
                          {
                            $$avoidResync: !0,
                            replace: "replace" === f.location,
                          }
                        ),
                      f.notify &&
                        a.$broadcast(
                          "$stateChangeSuccess",
                          b.self,
                          c,
                          j.self,
                          m
                        ),
                      p.update(!0),
                      x.current)
                );
              },
              function (d) {
                return x.transition !== R
                  ? u
                  : ((x.transition = null),
                    (g = a.$broadcast(
                      "$stateChangeError",
                      b.self,
                      c,
                      j.self,
                      m,
                      d
                    )),
                    g.defaultPrevented || p.update(),
                    e.reject(d));
              }
            ));
            return R;
          }),
          (x.is = function (a, b, d) {
            d = M({ relative: x.$current }, d || {});
            var e = l(a, d.relative);
            return G(e)
              ? x.$current !== e
                ? !1
                : b
                ? j(e.params.$$values(b), o)
                : !0
              : c;
          }),
          (x.includes = function (a, b, d) {
            if (((d = M({ relative: x.$current }, d || {})), I(a) && q(a))) {
              if (!r(a)) return !1;
              a = x.$current.name;
            }
            var e = l(a, d.relative);
            return G(e)
              ? G(x.$current.includes[e.name])
                ? b
                  ? j(e.params.$$values(b), o, g(b))
                  : !0
                : !1
              : c;
          }),
          (x.href = function (a, b, d) {
            d = M(
              { lossy: !0, inherit: !0, absolute: !1, relative: x.$current },
              d || {}
            );
            var e = l(a, d.relative);
            if (!G(e)) return null;
            d.inherit && (b = i(o, b || {}, x.$current, e));
            var f = e && d.lossy ? e.navigable : e;
            return f && f.url !== c && null !== f.url
              ? p.href(f.url, k(e.params.$$keys().concat("#"), b || {}), {
                  absolute: d.absolute,
                })
              : null;
          }),
          (x.get = function (a, b) {
            if (0 === arguments.length)
              return n(g(y), function (a) {
                return y[a].self;
              });
            var c = l(a, b || x.$current);
            return c && c.self ? c.self : null;
          }),
          x
        );
      }
      function v(a, b, c, d) {
        return a !== b ||
          ((c !== b.locals || d.reload) && a.self.reloadOnSearch !== !1)
          ? void 0
          : !0;
      }
      var w,
        x,
        y = {},
        z = {},
        A = "abstract",
        B = {
          parent: function (a) {
            if (G(a.parent) && a.parent) return l(a.parent);
            var b = /^(.+)\.[^.]+$/.exec(a.name);
            return b ? l(b[1]) : w;
          },
          data: function (a) {
            return (
              a.parent &&
                a.parent.data &&
                (a.data = a.self.data = M({}, a.parent.data, a.data)),
              a.data
            );
          },
          url: function (a) {
            var b = a.url,
              c = { params: a.params || {} };
            if (I(b))
              return "^" == b.charAt(0)
                ? e.compile(b.substring(1), c)
                : (a.parent.navigable || w).url.concat(b, c);
            if (!b || e.isMatcher(b)) return b;
            throw new Error("Invalid url '" + b + "' in state '" + a + "'");
          },
          navigable: function (a) {
            return a.url ? a : a.parent ? a.parent.navigable : null;
          },
          ownParams: function (a) {
            var b = (a.url && a.url.params) || new O.ParamSet();
            return (
              L(a.params || {}, function (a, c) {
                b[c] || (b[c] = new O.Param(c, null, a, "config"));
              }),
              b
            );
          },
          params: function (a) {
            return a.parent && a.parent.params
              ? M(a.parent.params.$$new(), a.ownParams)
              : new O.ParamSet();
          },
          views: function (a) {
            var b = {};
            return (
              L(G(a.views) ? a.views : { "": a }, function (c, d) {
                d.indexOf("@") < 0 && (d += "@" + a.parent.name), (b[d] = c);
              }),
              b
            );
          },
          path: function (a) {
            return a.parent ? a.parent.path.concat(a) : [];
          },
          includes: function (a) {
            var b = a.parent ? M({}, a.parent.includes) : {};
            return (b[a.name] = !0), b;
          },
          $delegates: {},
        };
      (w = p({ name: "", url: "^", views: null, abstract: !0 })),
        (w.navigable = null),
        (this.decorator = s),
        (this.state = t),
        (this.$get = u),
        (u.$inject = [
          "$rootScope",
          "$q",
          "$view",
          "$injector",
          "$resolve",
          "$stateParams",
          "$urlRouter",
          "$location",
          "$urlMatcherFactory",
        ]);
    }
    function v() {
      function a(a, b) {
        return {
          load: function (c, d) {
            var e,
              f = {
                template: null,
                controller: null,
                view: null,
                locals: null,
                notify: !0,
                async: !0,
                params: {},
              };
            return (
              (d = M(f, d)),
              d.view && (e = b.fromConfig(d.view, d.params, d.locals)),
              e && d.notify && a.$broadcast("$viewContentLoading", d),
              e
            );
          },
        };
      }
      (this.$get = a), (a.$inject = ["$rootScope", "$templateFactory"]);
    }
    function w() {
      var a = !1;
      (this.useAnchorScroll = function () {
        a = !0;
      }),
        (this.$get = [
          "$anchorScroll",
          "$timeout",
          function (b, c) {
            return a
              ? b
              : function (a) {
                  return c(
                    function () {
                      a[0].scrollIntoView();
                    },
                    0,
                    !1
                  );
                };
          },
        ]);
    }
    function x(a, c, d, e) {
      function f() {
        return c.has
          ? function (a) {
              return c.has(a) ? c.get(a) : null;
            }
          : function (a) {
              try {
                return c.get(a);
              } catch (b) {
                return null;
              }
            };
      }
      function g(a, b) {
        var c = function () {
          return {
            enter: function (a, b, c) {
              b.after(a), c();
            },
            leave: function (a, b) {
              a.remove(), b();
            },
          };
        };
        if (j)
          return {
            enter: function (a, b, c) {
              var d = j.enter(a, null, b, c);
              d && d.then && d.then(c);
            },
            leave: function (a, b) {
              var c = j.leave(a, b);
              c && c.then && c.then(b);
            },
          };
        if (i) {
          var d = i && i(b, a);
          return {
            enter: function (a, b, c) {
              d.enter(a, null, b), c();
            },
            leave: function (a, b) {
              d.leave(a), b();
            },
          };
        }
        return c();
      }
      var h = f(),
        i = h("$animator"),
        j = h("$animate"),
        k = {
          restrict: "ECA",
          terminal: !0,
          priority: 400,
          transclude: "element",
          compile: function (c, f, h) {
            return function (c, f, i) {
              function j() {
                l && (l.remove(), (l = null)),
                  n && (n.$destroy(), (n = null)),
                  m &&
                    (r.leave(m, function () {
                      l = null;
                    }),
                    (l = m),
                    (m = null));
              }
              function k(g) {
                var k,
                  l = z(c, i, f, e),
                  s = l && a.$current && a.$current.locals[l];
                if (g || s !== o) {
                  (k = c.$new()), (o = a.$current.locals[l]);
                  var t = h(k, function (a) {
                    r.enter(a, f, function () {
                      n && n.$emit("$viewContentAnimationEnded"),
                        ((b.isDefined(q) && !q) || c.$eval(q)) && d(a);
                    }),
                      j();
                  });
                  (m = t), (n = k), n.$emit("$viewContentLoaded"), n.$eval(p);
                }
              }
              var l,
                m,
                n,
                o,
                p = i.onload || "",
                q = i.autoscroll,
                r = g(i, c);
              c.$on("$stateChangeSuccess", function () {
                k(!1);
              }),
                c.$on("$viewContentLoading", function () {
                  k(!1);
                }),
                k(!0);
            };
          },
        };
      return k;
    }
    function y(a, b, c, d) {
      return {
        restrict: "ECA",
        priority: -400,
        compile: function (e) {
          var f = e.html();
          return function (e, g, h) {
            var i = c.$current,
              j = z(e, h, g, d),
              k = i && i.locals[j];
            if (k) {
              g.data("$uiView", { name: j, state: k.$$state }),
                g.html(k.$template ? k.$template : f);
              var l = a(g.contents());
              if (k.$$controller) {
                (k.$scope = e), (k.$element = g);
                var m = b(k.$$controller, k);
                k.$$controllerAs && (e[k.$$controllerAs] = m),
                  g.data("$ngControllerController", m),
                  g.children().data("$ngControllerController", m);
              }
              l(e);
            }
          };
        },
      };
    }
    function z(a, b, c, d) {
      var e = d(b.uiView || b.name || "")(a),
        f = c.inheritedData("$uiView");
      return e.indexOf("@") >= 0 ? e : e + "@" + (f ? f.state.name : "");
    }
    function A(a, b) {
      var c,
        d = a.match(/^\s*({[^}]*})\s*$/);
      if (
        (d && (a = b + "(" + d[1] + ")"),
        (c = a.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/)),
        !c || 4 !== c.length)
      )
        throw new Error("Invalid state ref '" + a + "'");
      return { state: c[1], paramExpr: c[3] || null };
    }
    function B(a) {
      var b = a.parent().inheritedData("$uiView");
      return b && b.state && b.state.name ? b.state : void 0;
    }
    function C(a, c) {
      var d = ["location", "inherit", "reload", "absolute"];
      return {
        restrict: "A",
        require: ["?^uiSrefActive", "?^uiSrefActiveEq"],
        link: function (e, f, g, h) {
          var i = A(g.uiSref, a.current.name),
            j = null,
            k = B(f) || a.$current,
            l =
              "[object SVGAnimatedString]" ===
              Object.prototype.toString.call(f.prop("href"))
                ? "xlink:href"
                : "href",
            m = null,
            n = "A" === f.prop("tagName").toUpperCase(),
            o = "FORM" === f[0].nodeName,
            p = o ? "action" : l,
            q = !0,
            r = { relative: k, inherit: !0 },
            s = e.$eval(g.uiSrefOpts) || {};
          b.forEach(d, function (a) {
            a in s && (r[a] = s[a]);
          });
          var t = function (c) {
            if ((c && (j = b.copy(c)), q)) {
              m = a.href(i.state, j, r);
              var d = h[1] || h[0];
              return (
                d && d.$$addStateInfo(i.state, j),
                null === m ? ((q = !1), !1) : void g.$set(p, m)
              );
            }
          };
          i.paramExpr &&
            (e.$watch(
              i.paramExpr,
              function (a) {
                a !== j && t(a);
              },
              !0
            ),
            (j = b.copy(e.$eval(i.paramExpr)))),
            t(),
            o ||
              f.bind("click", function (b) {
                var d = b.which || b.button;
                if (
                  !(
                    d > 1 ||
                    b.ctrlKey ||
                    b.metaKey ||
                    b.shiftKey ||
                    f.attr("target")
                  )
                ) {
                  var e = c(function () {
                    a.go(i.state, j, r);
                  });
                  b.preventDefault();
                  var g = n && !m ? 1 : 0;
                  b.preventDefault = function () {
                    g-- <= 0 && c.cancel(e);
                  };
                }
              });
        },
      };
    }
    function D(a, b, c) {
      return {
        restrict: "A",
        controller: [
          "$scope",
          "$element",
          "$attrs",
          function (b, d, e) {
            function f() {
              g() ? d.addClass(i) : d.removeClass(i);
            }
            function g() {
              for (var a = 0; a < j.length; a++)
                if (h(j[a].state, j[a].params)) return !0;
              return !1;
            }
            function h(b, c) {
              return "undefined" != typeof e.uiSrefActiveEq
                ? a.is(b.name, c)
                : a.includes(b.name, c);
            }
            var i,
              j = [];
            (i = c(e.uiSrefActiveEq || e.uiSrefActive || "", !1)(b)),
              (this.$$addStateInfo = function (b, c) {
                var e = a.get(b, B(d));
                j.push({ state: e || { name: b }, params: c }), f();
              }),
              b.$on("$stateChangeSuccess", f);
          },
        ],
      };
    }
    function E(a) {
      var b = function (b) {
        return a.is(b);
      };
      return (b.$stateful = !0), b;
    }
    function F(a) {
      var b = function (b) {
        return a.includes(b);
      };
      return (b.$stateful = !0), b;
    }
    var G = b.isDefined,
      H = b.isFunction,
      I = b.isString,
      J = b.isObject,
      K = b.isArray,
      L = b.forEach,
      M = b.extend,
      N = b.copy;
    b.module("ui.router.util", ["ng"]),
      b.module("ui.router.router", ["ui.router.util"]),
      b.module("ui.router.state", ["ui.router.router", "ui.router.util"]),
      b.module("ui.router", ["ui.router.state"]),
      b.module("ui.router.compat", ["ui.router"]),
      (o.$inject = ["$q", "$injector"]),
      b.module("ui.router.util").service("$resolve", o),
      (p.$inject = ["$http", "$templateCache", "$injector"]),
      b.module("ui.router.util").service("$templateFactory", p);
    var O;
    (q.prototype.concat = function (a, b) {
      var c = {
        caseInsensitive: O.caseInsensitive(),
        strict: O.strictMode(),
        squash: O.defaultSquashPolicy(),
      };
      return new q(this.sourcePath + a + this.sourceSearch, M(c, b), this);
    }),
      (q.prototype.toString = function () {
        return this.source;
      }),
      (q.prototype.exec = function (a, b) {
        function c(a) {
          function b(a) {
            return a.split("").reverse().join("");
          }
          function c(a) {
            return a.replace(/\\-/g, "-");
          }
          var d = b(a).split(/-(?!\\)/),
            e = n(d, b);
          return n(e, c).reverse();
        }
        var d = this.regexp.exec(a);
        if (!d) return null;
        b = b || {};
        var e,
          f,
          g,
          h = this.parameters(),
          i = h.length,
          j = this.segments.length - 1,
          k = {};
        if (j !== d.length - 1)
          throw new Error(
            "Unbalanced capture group in route '" + this.source + "'"
          );
        for (e = 0; j > e; e++) {
          g = h[e];
          var l = this.params[g],
            m = d[e + 1];
          for (f = 0; f < l.replace; f++)
            l.replace[f].from === m && (m = l.replace[f].to);
          m && l.array === !0 && (m = c(m)), (k[g] = l.value(m));
        }
        for (; i > e; e++) (g = h[e]), (k[g] = this.params[g].value(b[g]));
        return k;
      }),
      (q.prototype.parameters = function (a) {
        return G(a) ? this.params[a] || null : this.$$paramNames;
      }),
      (q.prototype.validates = function (a) {
        return this.params.$$validates(a);
      }),
      (q.prototype.format = function (a) {
        function b(a) {
          return encodeURIComponent(a).replace(/-/g, function (a) {
            return "%5C%" + a.charCodeAt(0).toString(16).toUpperCase();
          });
        }
        a = a || {};
        var c = this.segments,
          d = this.parameters(),
          e = this.params;
        if (!this.validates(a)) return null;
        var f,
          g = !1,
          h = c.length - 1,
          i = d.length,
          j = c[0];
        for (f = 0; i > f; f++) {
          var k = h > f,
            l = d[f],
            m = e[l],
            o = m.value(a[l]),
            p = m.isOptional && m.type.equals(m.value(), o),
            q = p ? m.squash : !1,
            r = m.type.encode(o);
          if (k) {
            var s = c[f + 1];
            if (q === !1)
              null != r &&
                (j += K(r) ? n(r, b).join("-") : encodeURIComponent(r)),
                (j += s);
            else if (q === !0) {
              var t = j.match(/\/$/) ? /\/?(.*)/ : /(.*)/;
              j += s.match(t)[1];
            } else I(q) && (j += q + s);
          } else {
            if (null == r || (p && q !== !1)) continue;
            K(r) || (r = [r]),
              (r = n(r, encodeURIComponent).join("&" + l + "=")),
              (j += (g ? "&" : "?") + (l + "=" + r)),
              (g = !0);
          }
        }
        return j;
      }),
      (r.prototype.is = function () {
        return !0;
      }),
      (r.prototype.encode = function (a) {
        return a;
      }),
      (r.prototype.decode = function (a) {
        return a;
      }),
      (r.prototype.equals = function (a, b) {
        return a == b;
      }),
      (r.prototype.$subPattern = function () {
        var a = this.pattern.toString();
        return a.substr(1, a.length - 2);
      }),
      (r.prototype.pattern = /.*/),
      (r.prototype.toString = function () {
        return "{Type:" + this.name + "}";
      }),
      (r.prototype.$normalize = function (a) {
        return this.is(a) ? a : this.decode(a);
      }),
      (r.prototype.$asArray = function (a, b) {
        function d(a, b) {
          function d(a, b) {
            return function () {
              return a[b].apply(a, arguments);
            };
          }
          function e(a) {
            return K(a) ? a : G(a) ? [a] : [];
          }
          function f(a) {
            switch (a.length) {
              case 0:
                return c;
              case 1:
                return "auto" === b ? a[0] : a;
              default:
                return a;
            }
          }
          function g(a) {
            return !a;
          }
          function h(a, b) {
            return function (c) {
              c = e(c);
              var d = n(c, a);
              return b === !0 ? 0 === m(d, g).length : f(d);
            };
          }
          function i(a) {
            return function (b, c) {
              var d = e(b),
                f = e(c);
              if (d.length !== f.length) return !1;
              for (var g = 0; g < d.length; g++) if (!a(d[g], f[g])) return !1;
              return !0;
            };
          }
          (this.encode = h(d(a, "encode"))),
            (this.decode = h(d(a, "decode"))),
            (this.is = h(d(a, "is"), !0)),
            (this.equals = i(d(a, "equals"))),
            (this.pattern = a.pattern),
            (this.$normalize = h(d(a, "$normalize"))),
            (this.name = a.name),
            (this.$arrayMode = b);
        }
        if (!a) return this;
        if ("auto" === a && !b)
          throw new Error("'auto' array mode is for query parameters only");
        return new d(this, a);
      }),
      b.module("ui.router.util").provider("$urlMatcherFactory", s),
      b.module("ui.router.util").run(["$urlMatcherFactory", function () {}]),
      (t.$inject = ["$locationProvider", "$urlMatcherFactoryProvider"]),
      b.module("ui.router.router").provider("$urlRouter", t),
      (u.$inject = ["$urlRouterProvider", "$urlMatcherFactoryProvider"]),
      b
        .module("ui.router.state")
        .value("$stateParams", {})
        .provider("$state", u),
      (v.$inject = []),
      b.module("ui.router.state").provider("$view", v),
      b.module("ui.router.state").provider("$uiViewScroll", w),
      (x.$inject = ["$state", "$injector", "$uiViewScroll", "$interpolate"]),
      (y.$inject = ["$compile", "$controller", "$state", "$interpolate"]),
      b.module("ui.router.state").directive("uiView", x),
      b.module("ui.router.state").directive("uiView", y),
      (C.$inject = ["$state", "$timeout"]),
      (D.$inject = ["$state", "$stateParams", "$interpolate"]),
      b
        .module("ui.router.state")
        .directive("uiSref", C)
        .directive("uiSrefActive", D)
        .directive("uiSrefActiveEq", D),
      (E.$inject = ["$state"]),
      (F.$inject = ["$state"]),
      b
        .module("ui.router.state")
        .filter("isState", E)
        .filter("includedByState", F);
  })(window, window.angular);

(this["webpackJsonpgenealogy-front"] =
  this["webpackJsonpgenealogy-front"] || []).push([
  [2],
  {
    23: function(e, t, n) {
      e.exports = n(57);
    },
    28: function(e, t, n) {},
    52: function(e, t, n) {},
    56: function(e, t, n) {},
    57: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(0),
        r = n.n(a),
        o = n(17),
        c = n.n(o),
        i = (n(28), n(29), n(9)),
        l = n(18),
        u = n(2),
        s = n(8),
        m = n(21),
        d = n.n(m),
        f =
          (n(51),
          n(52),
          function() {
            return r.a.createElement(
              "main",
              { className: "loader-wrapper page" },
              r.a.createElement(
                "section",
                { className: "loader" },
                r.a.createElement(d.a, {
                  type: "Circles",
                  color: "rgba(137, 194, 217, 0.3)",
                  height: 100,
                  width: 100,
                  timeout: 3e3,
                })
              )
            );
          }),
        h = r.a.lazy(function() {
          return Promise.all([n.e(0), n.e(7)]).then(n.bind(null, 162));
        }),
        g = r.a.lazy(function() {
          return Promise.all([n.e(0), n.e(1), n.e(5)]).then(n.bind(null, 156));
        }),
        p = r.a.lazy(function() {
          return Promise.all([n.e(0), n.e(1), n.e(6)]).then(n.bind(null, 157));
        }),
        b = r.a.lazy(function() {
          return Promise.all([n.e(0), n.e(8)]).then(n.bind(null, 158));
        }),
        E = function(e) {
          var t = e.component,
            n = e.isAuthenticated,
            a = Object(l.a)(e, ["component", "isAuthenticated"]);
          return r.a.createElement(
            u.b,
            Object.assign({}, a, {
              render: function(e) {
                return n
                  ? r.a.createElement(t, e)
                  : r.a.createElement(u.a, { to: { pathname: "/" } });
              },
            })
          );
        },
        v = Object(s.c)(function(e) {
          var t = e.isLogged;
          return r.a.createElement(
            r.a.Suspense,
            { fallback: f() },
            r.a.createElement(
              u.d,
              null,
              r.a.createElement(u.b, { exact: !0, path: "/", component: h }),
              r.a.createElement(E, {
                exact: !0,
                path: "/dashboard",
                component: p,
                isAuthenticated: t,
              }),
              r.a.createElement(E, {
                exact: !0,
                path: "/family",
                component: g,
                isAuthenticated: t,
              }),
              r.a.createElement(u.b, { component: b })
            )
          );
        }),
        y =
          (n(56),
          function() {
            return r.a.createElement(
              s.b,
              null,
              r.a.createElement(i.a, null, r.a.createElement(v, null))
            );
          });
      Boolean(
        "localhost" === window.location.hostname ||
          "[::1]" === window.location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
          )
      );
      c.a.render(r.a.createElement(y, null), document.getElementById("root")),
        "serviceWorker" in navigator &&
          navigator.serviceWorker.ready
            .then(function(e) {
              e.unregister();
            })
            .catch(function(e) {
              console.error(e.message);
            });
    },
    8: function(e, t, n) {
      "use strict";
      n.d(t, "a", function() {
        return u;
      }),
        n.d(t, "c", function() {
          return m;
        });
      var a = n(13),
        r = n(14),
        o = n(16),
        c = n(15),
        i = n(0),
        l = n.n(i),
        u = Object(i.createContext)({
          isLogged: !1,
          setIsLogged: function(e) {},
        }),
        s = (function(e) {
          Object(o.a)(n, e);
          var t = Object(c.a)(n);
          function n() {
            var e;
            Object(a.a)(this, n);
            for (var r = arguments.length, o = new Array(r), c = 0; c < r; c++)
              o[c] = arguments[c];
            return (
              ((e = t.call.apply(t, [this].concat(o))).state = {
                isLogged: !1,
                setIsLogged: function(t) {
                  return e.setState({ isLogged: t });
                },
              }),
              e
            );
          }
          return (
            Object(r.a)(n, [
              {
                key: "render",
                value: function() {
                  return l.a.createElement(
                    u.Provider,
                    { value: this.state },
                    this.props.children
                  );
                },
              },
            ]),
            n
          );
        })(i.Component),
        m = function(e) {
          return function(t) {
            return l.a.createElement(u.Consumer, null, function(n) {
              return l.a.createElement(e, Object.assign({}, t, n));
            });
          };
        };
      t.b = s;
    },
  },
  [[23, 3, 4]],
]);
//# sourceMappingURL=main.b709a9ae.chunk.js.map

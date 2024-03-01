/*! For license information please see 3626.9ab84e2f6d68f74587f2.bundle.js.LICENSE.txt */
"use strict";
(self.webpackChunkbos_workspace_gateway =
  self.webpackChunkbos_workspace_gateway || []).push([
  [3626],
  {
    4213: (t, e, i) => {
      i.d(e, { j: () => lt });
      const s = {
          duration: 0.3,
          delay: 0,
          endDelay: 0,
          repeat: 0,
          easing: "ease",
        },
        n = (t) => 1e3 * t,
        r = (t) => t / 1e3,
        o = () => {},
        a = (t) => t;
      function l(t, e = !0) {
        if (t && "finished" !== t.playState)
          try {
            t.stop ? t.stop() : (e && t.commitStyles(), t.cancel());
          } catch (t) {}
      }
      const h = (t) => t(),
        c = (t, e, i = s.duration) =>
          new Proxy(
            { animations: t.map(h).filter(Boolean), duration: i, options: e },
            d,
          ),
        d = {
          get: (t, e) => {
            const i = t.animations[0];
            switch (e) {
              case "duration":
                return t.duration;
              case "currentTime":
                return r((null == i ? void 0 : i[e]) || 0);
              case "playbackRate":
              case "playState":
                return null == i ? void 0 : i[e];
              case "finished":
                return (
                  t.finished ||
                    (t.finished = Promise.all(t.animations.map(u)).catch(o)),
                  t.finished
                );
              case "stop":
                return () => {
                  t.animations.forEach((t) => l(t));
                };
              case "forEachNative":
                return (e) => {
                  t.animations.forEach((i) => e(i, t));
                };
              default:
                return void 0 === (null == i ? void 0 : i[e])
                  ? void 0
                  : () => t.animations.forEach((t) => t[e]());
            }
          },
          set: (t, e, i) => {
            switch (e) {
              case "currentTime":
                i = n(i);
              case "playbackRate":
                for (let s = 0; s < t.animations.length; s++)
                  t.animations[s][e] = i;
                return !0;
            }
            return !1;
          },
        },
        u = (t) => t.finished,
        p = (t) => "object" == typeof t && Boolean(t.createAnimation),
        f = (t) => "number" == typeof t,
        v = (t) => Array.isArray(t) && !f(t[0]),
        m = (t, e, i) => -i * t + i * e + t,
        y = (t, e, i) => (e - t == 0 ? 1 : (i - t) / (e - t));
      function $(t, e) {
        const i = t[t.length - 1];
        for (let s = 1; s <= e; s++) {
          const n = y(0, e, s);
          t.push(m(i, 1, n));
        }
      }
      const _ = (t, e, i) => Math.min(Math.max(i, t), e);
      const g = (t, e, i) =>
          (((1 - 3 * i + 3 * e) * t + (3 * i - 6 * e)) * t + 3 * e) * t,
        A = 1e-7,
        S = 12;
      function E(t, e, i, s) {
        if (t === e && i === s) return a;
        return (n) =>
          0 === n || 1 === n
            ? n
            : g(
                (function (t, e, i, s, n) {
                  let r,
                    o,
                    a = 0;
                  do {
                    (o = e + (i - e) / 2),
                      (r = g(o, s, n) - t),
                      r > 0 ? (i = o) : (e = o);
                  } while (Math.abs(r) > A && ++a < S);
                  return o;
                })(n, 0, 1, t, i),
                e,
                s,
              );
      }
      const b = (t) => "function" == typeof t,
        w = (t) => Array.isArray(t) && f(t[0]),
        C = {
          ease: E(0.25, 0.1, 0.25, 1),
          "ease-in": E(0.42, 0, 1, 1),
          "ease-in-out": E(0.42, 0, 0.58, 1),
          "ease-out": E(0, 0, 0.58, 1),
        },
        x = /\((.*?)\)/;
      function T(t) {
        if (b(t)) return t;
        if (w(t)) return E(...t);
        if (C[t]) return C[t];
        if (t.startsWith("steps")) {
          const e = x.exec(t);
          if (e) {
            const t = e[1].split(",");
            return (
              (t, e = "end") =>
              (i) => {
                const s =
                    (i =
                      "end" === e ? Math.min(i, 0.999) : Math.max(i, 0.001)) *
                    t,
                  n = "end" === e ? Math.floor(s) : Math.ceil(s);
                return _(0, 1, n / t);
              }
            )(parseFloat(t[0]), t[1].trim());
          }
        }
        return a;
      }
      class P {
        constructor(
          t,
          e = [0, 1],
          {
            easing: i,
            duration: n = s.duration,
            delay: r = s.delay,
            endDelay: o = s.endDelay,
            repeat: l = s.repeat,
            offset: h,
            direction: c = "normal",
          } = {},
        ) {
          if (
            ((this.startTime = null),
            (this.rate = 1),
            (this.t = 0),
            (this.cancelTimestamp = null),
            (this.easing = a),
            (this.duration = 0),
            (this.totalDuration = 0),
            (this.repeat = 0),
            (this.playState = "idle"),
            (this.finished = new Promise((t, e) => {
              (this.resolve = t), (this.reject = e);
            })),
            (i = i || s.easing),
            p(i))
          ) {
            const t = i.createAnimation(e);
            (i = t.easing), (e = t.keyframes || e), (n = t.duration || n);
          }
          (this.repeat = l),
            (this.easing = v(i) ? a : T(i)),
            this.updateDuration(n);
          const d = (function (
            t,
            e = (function (t) {
              const e = [0];
              return $(e, t - 1), e;
            })(t.length),
            i = a,
          ) {
            const s = t.length,
              n = s - e.length;
            return (
              n > 0 && $(e, n),
              (n) => {
                let r = 0;
                for (; r < s - 2 && !(n < e[r + 1]); r++);
                let o = _(0, 1, y(e[r], e[r + 1], n));
                const a = (function (t, e) {
                  return v(t)
                    ? t[
                        ((t, e, i) => {
                          const s = e - t;
                          return ((((i - t) % s) + s) % s) + t;
                        })(0, t.length, e)
                      ]
                    : t;
                })(i, r);
                return (o = a(o)), m(t[r], t[r + 1], o);
              }
            );
          })(e, h, v(i) ? i.map(T) : a);
          (this.tick = (e) => {
            var i;
            let s = 0;
            (s =
              void 0 !== this.pauseTime
                ? this.pauseTime
                : (e - this.startTime) * this.rate),
              (this.t = s),
              (s /= 1e3),
              (s = Math.max(s - r, 0)),
              "finished" === this.playState &&
                void 0 === this.pauseTime &&
                (s = this.totalDuration);
            const n = s / this.duration;
            let a = Math.floor(n),
              l = n % 1;
            !l && n >= 1 && (l = 1), 1 === l && a--;
            const h = a % 2;
            ("reverse" === c ||
              ("alternate" === c && h) ||
              ("alternate-reverse" === c && !h)) &&
              (l = 1 - l);
            const u = s >= this.totalDuration ? 1 : Math.min(l, 1),
              p = d(this.easing(u));
            t(p),
              void 0 === this.pauseTime &&
              ("finished" === this.playState || s >= this.totalDuration + o)
                ? ((this.playState = "finished"),
                  null === (i = this.resolve) ||
                    void 0 === i ||
                    i.call(this, p))
                : "idle" !== this.playState &&
                  (this.frameRequestId = requestAnimationFrame(this.tick));
          }),
            this.play();
        }
        play() {
          const t = performance.now();
          (this.playState = "running"),
            void 0 !== this.pauseTime
              ? (this.startTime = t - this.pauseTime)
              : this.startTime || (this.startTime = t),
            (this.cancelTimestamp = this.startTime),
            (this.pauseTime = void 0),
            (this.frameRequestId = requestAnimationFrame(this.tick));
        }
        pause() {
          (this.playState = "paused"), (this.pauseTime = this.t);
        }
        finish() {
          (this.playState = "finished"), this.tick(0);
        }
        stop() {
          var t;
          (this.playState = "idle"),
            void 0 !== this.frameRequestId &&
              cancelAnimationFrame(this.frameRequestId),
            null === (t = this.reject) || void 0 === t || t.call(this, !1);
        }
        cancel() {
          this.stop(), this.tick(this.cancelTimestamp);
        }
        reverse() {
          this.rate *= -1;
        }
        commitStyles() {}
        updateDuration(t) {
          (this.duration = t), (this.totalDuration = t * (this.repeat + 1));
        }
        get currentTime() {
          return this.t;
        }
        set currentTime(t) {
          void 0 !== this.pauseTime || 0 === this.rate
            ? (this.pauseTime = t)
            : (this.startTime = performance.now() - t / this.rate);
        }
        get playbackRate() {
          return this.rate;
        }
        set playbackRate(t) {
          this.rate = t;
        }
      }
      class k {
        setAnimation(t) {
          (this.animation = t),
            null == t ||
              t.finished.then(() => this.clearAnimation()).catch(() => {});
        }
        clearAnimation() {
          this.animation = this.generator = void 0;
        }
      }
      const U = new WeakMap();
      function O(t) {
        return (
          U.has(t) || U.set(t, { transforms: [], values: new Map() }), U.get(t)
        );
      }
      const M = ["", "X", "Y", "Z"],
        R = { x: "translateX", y: "translateY", z: "translateZ" },
        H = {
          syntax: "<angle>",
          initialValue: "0deg",
          toDefaultUnit: (t) => t + "deg",
        },
        D = {
          translate: {
            syntax: "<length-percentage>",
            initialValue: "0px",
            toDefaultUnit: (t) => t + "px",
          },
          rotate: H,
          scale: { syntax: "<number>", initialValue: 1, toDefaultUnit: a },
          skew: H,
        },
        N = new Map(),
        j = (t) => `--motion-${t}`,
        L = ["x", "y", "z"];
      ["translate", "scale", "rotate", "skew"].forEach((t) => {
        M.forEach((e) => {
          L.push(t + e), N.set(j(t + e), D[t]);
        });
      });
      const z = (t, e) => L.indexOf(t) - L.indexOf(e),
        V = new Set(L),
        B = (t) => V.has(t),
        I = (t) => t.sort(z).reduce(q, "").trim(),
        q = (t, e) => `${t} ${e}(var(${j(e)}))`,
        W = (t) => t.startsWith("--"),
        Y = new Set(),
        F = (t, e) => document.createElement("div").animate(t, e),
        J = {
          cssRegisterProperty: () =>
            "undefined" != typeof CSS &&
            Object.hasOwnProperty.call(CSS, "registerProperty"),
          waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate"),
          partialKeyframes: () => {
            try {
              F({ opacity: [1] });
            } catch (t) {
              return !1;
            }
            return !0;
          },
          finished: () =>
            Boolean(F({ opacity: [0, 1] }, { duration: 0.001 }).finished),
          linearEasing: () => {
            try {
              F({ opacity: 0 }, { easing: "linear(0, 1)" });
            } catch (t) {
              return !1;
            }
            return !0;
          },
        },
        K = {},
        Z = {};
      for (const t in J)
        Z[t] = () => (void 0 === K[t] && (K[t] = J[t]()), K[t]);
      const X = (t, e) =>
          b(t)
            ? Z.linearEasing()
              ? `linear(${((t, e) => {
                  let i = "";
                  const s = Math.round(e / 0.015);
                  for (let e = 0; e < s; e++) i += t(y(0, s - 1, e)) + ", ";
                  return i.substring(0, i.length - 2);
                })(t, e)})`
              : s.easing
            : w(t)
              ? G(t)
              : t,
        G = ([t, e, i, s]) => `cubic-bezier(${t}, ${e}, ${i}, ${s})`;
      function Q(t) {
        return R[t] && (t = R[t]), B(t) ? j(t) : t;
      }
      const tt = (t, e) => {
          e = Q(e);
          let i = W(e) ? t.style.getPropertyValue(e) : getComputedStyle(t)[e];
          if (!i && 0 !== i) {
            const t = N.get(e);
            t && (i = t.initialValue);
          }
          return i;
        },
        et = (t, e, i) => {
          (e = Q(e)), W(e) ? t.style.setProperty(e, i) : (t.style[e] = i);
        };
      function it(t, e, i, r = {}, h) {
        const c = window.__MOTION_DEV_TOOLS_RECORD,
          d = !1 !== r.record && c;
        let u,
          {
            duration: m = s.duration,
            delay: y = s.delay,
            endDelay: $ = s.endDelay,
            repeat: _ = s.repeat,
            easing: g = s.easing,
            persist: A = !1,
            direction: S,
            offset: E,
            allowWebkitAcceleration: w = !1,
          } = r;
        const C = O(t),
          x = B(e);
        let T = Z.waapi();
        x &&
          ((t, e) => {
            R[e] && (e = R[e]);
            const { transforms: i } = O(t);
            var s, n;
            (n = e),
              -1 === (s = i).indexOf(n) && s.push(n),
              (t.style.transform = I(i));
          })(t, e);
        const P = Q(e),
          U = (function (t, e) {
            return t.has(e) || t.set(e, new k()), t.get(e);
          })(C.values, P),
          M = N.get(P);
        return (
          l(U.animation, !(p(g) && U.generator) && !1 !== r.record),
          () => {
            const s = () => {
              var e, i;
              return null !==
                (i =
                  null !== (e = tt(t, P)) && void 0 !== e
                    ? e
                    : null == M
                      ? void 0
                      : M.initialValue) && void 0 !== i
                ? i
                : 0;
            };
            let l = (function (t, e) {
              for (let i = 0; i < t.length; i++)
                null === t[i] && (t[i] = i ? t[i - 1] : e());
              return t;
            })(((t) => (Array.isArray(t) ? t : [t]))(i), s);
            const C = (function (t, e) {
              var i;
              let s = (null == e ? void 0 : e.toDefaultUnit) || a;
              const n = t[t.length - 1];
              if ("string" == typeof n) {
                const t =
                  (null === (i = n.match(/(-?[\d.]+)([a-z%]*)/)) || void 0 === i
                    ? void 0
                    : i[2]) || "";
                t && (s = (e) => e + t);
              }
              return s;
            })(l, M);
            if (p(g)) {
              const t = g.createAnimation(l, "opacity" !== e, s, P, U);
              (g = t.easing), (l = t.keyframes || l), (m = t.duration || m);
            }
            if (
              (W(P) &&
                (Z.cssRegisterProperty()
                  ? (function (t) {
                      if (!Y.has(t)) {
                        Y.add(t);
                        try {
                          const { syntax: e, initialValue: i } = N.has(t)
                            ? N.get(t)
                            : {};
                          CSS.registerProperty({
                            name: t,
                            inherits: !1,
                            syntax: e,
                            initialValue: i,
                          });
                        } catch (t) {}
                      }
                    })(P)
                  : (T = !1)),
              x &&
                !Z.linearEasing() &&
                (b(g) || (v(g) && g.some(b))) &&
                (T = !1),
              T)
            ) {
              M && (l = l.map((t) => (f(t) ? M.toDefaultUnit(t) : t))),
                1 !== l.length ||
                  (Z.partialKeyframes() && !d) ||
                  l.unshift(s());
              const e = {
                delay: n(y),
                duration: n(m),
                endDelay: n($),
                easing: v(g) ? void 0 : X(g, m),
                direction: S,
                iterations: _ + 1,
                fill: "both",
              };
              (u = t.animate(
                {
                  [P]: l,
                  offset: E,
                  easing: v(g) ? g.map((t) => X(t, m)) : void 0,
                },
                e,
              )),
                u.finished ||
                  (u.finished = new Promise((t, e) => {
                    (u.onfinish = t), (u.oncancel = e);
                  }));
              const i = l[l.length - 1];
              u.finished
                .then(() => {
                  A || (et(t, P, i), u.cancel());
                })
                .catch(o),
                w || (u.playbackRate = 1.000001);
            } else if (h && x)
              (l = l.map((t) => ("string" == typeof t ? parseFloat(t) : t))),
                1 === l.length && l.unshift(parseFloat(s())),
                (u = new h(
                  (e) => {
                    et(t, P, C ? C(e) : e);
                  },
                  l,
                  Object.assign(Object.assign({}, r), {
                    duration: m,
                    easing: g,
                  }),
                ));
            else {
              const e = l[l.length - 1];
              et(t, P, M && f(e) ? M.toDefaultUnit(e) : e);
            }
            return (
              d &&
                c(
                  t,
                  e,
                  l,
                  { duration: m, delay: y, easing: g, repeat: _, offset: E },
                  "motion-one",
                ),
              U.setAnimation(u),
              u
            );
          }
        );
      }
      const st = (t, e) =>
        t[e] ? Object.assign(Object.assign({}, t), t[e]) : Object.assign({}, t);
      function nt(t, e, i) {
        return b(t) ? t(e, i) : t;
      }
      const rt =
        ((ot = P),
        function (t, e, i = {}) {
          const s = (t = (function (t, e) {
            return (
              "string" == typeof t
                ? (t = document.querySelectorAll(t))
                : t instanceof Element && (t = [t]),
              Array.from(t || [])
            );
          })(t)).length;
          Boolean(s), Boolean(e);
          const n = [];
          for (let r = 0; r < s; r++) {
            const o = t[r];
            for (const t in e) {
              const a = st(i, t);
              a.delay = nt(a.delay, r, s);
              const l = it(o, t, e[t], a, ot);
              n.push(l);
            }
          }
          return c(n, i, i.duration);
        });
      var ot;
      function at(t, e = {}) {
        return c(
          [
            () => {
              const i = new P(t, [0, 1], e);
              return i.finished.catch(() => {}), i;
            },
          ],
          e,
          e.duration,
        );
      }
      function lt(t, e, i) {
        return (b(t) ? at : rt)(t, e, i);
      }
    },
    15713: (t, e, i) => {
      i.d(e, { M: () => s });
      const s = (t) => (e) =>
        "function" == typeof e
          ? ((t, e) => (customElements.define(t, e), e))(t, e)
          : ((t, e) => {
              const { kind: i, elements: s } = e;
              return {
                kind: i,
                elements: s,
                finisher(e) {
                  customElements.define(t, e);
                },
              };
            })(t, e);
    },
    99662: (t, e, i) => {
      i.d(e, { C: () => r });
      const s = (t, e) =>
          "method" === e.kind && e.descriptor && !("value" in e.descriptor)
            ? {
                ...e,
                finisher(i) {
                  i.createProperty(e.key, t);
                },
              }
            : {
                kind: "field",
                key: Symbol(),
                placement: "own",
                descriptor: {},
                originalKey: e.key,
                initializer() {
                  "function" == typeof e.initializer &&
                    (this[e.key] = e.initializer.call(this));
                },
                finisher(i) {
                  i.createProperty(e.key, t);
                },
              },
        n = (t, e, i) => {
          e.constructor.createProperty(i, t);
        };
      function r(t) {
        return (e, i) => (void 0 !== i ? n(t, e, i) : s(t, e));
      }
    },
    57935: (t, e, i) => {
      var s;
      null === (s = window.HTMLSlotElement) ||
        void 0 === s ||
        s.prototype.assignedElements;
    },
    30043: (t, e, i) => {
      i(57935);
    },
    39158: (t, e, i) => {
      i.d(e, { S: () => n });
      var s = i(99662);
      function n(t) {
        return (0, s.C)({ ...t, state: !0 });
      }
    },
    77898: (t, e, i) => {
      i.d(e, { fl: () => g, iv: () => l });
      const s = window,
        n =
          s.ShadowRoot &&
          (void 0 === s.ShadyCSS || s.ShadyCSS.nativeShadow) &&
          "adoptedStyleSheets" in Document.prototype &&
          "replace" in CSSStyleSheet.prototype,
        r = Symbol(),
        o = new WeakMap();
      class a {
        constructor(t, e, i) {
          if (((this._$cssResult$ = !0), i !== r))
            throw Error(
              "CSSResult is not constructable. Use `unsafeCSS` or `css` instead.",
            );
          (this.cssText = t), (this.t = e);
        }
        get styleSheet() {
          let t = this.o;
          const e = this.t;
          if (n && void 0 === t) {
            const i = void 0 !== e && 1 === e.length;
            i && (t = o.get(e)),
              void 0 === t &&
                ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText),
                i && o.set(e, t));
          }
          return t;
        }
        toString() {
          return this.cssText;
        }
      }
      const l = (t, ...e) => {
          const i =
            1 === t.length
              ? t[0]
              : e.reduce(
                  (e, i, s) =>
                    e +
                    ((t) => {
                      if (!0 === t._$cssResult$) return t.cssText;
                      if ("number" == typeof t) return t;
                      throw Error(
                        "Value passed to 'css' function must be a 'css' function result: " +
                          t +
                          ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.",
                      );
                    })(i) +
                    t[s + 1],
                  t[0],
                );
          return new a(i, t, r);
        },
        h = (t, e) => {
          n
            ? (t.adoptedStyleSheets = e.map((t) =>
                t instanceof CSSStyleSheet ? t : t.styleSheet,
              ))
            : e.forEach((e) => {
                const i = document.createElement("style"),
                  n = s.litNonce;
                void 0 !== n && i.setAttribute("nonce", n),
                  (i.textContent = e.cssText),
                  t.appendChild(i);
              });
        },
        c = n
          ? (t) => t
          : (t) =>
              t instanceof CSSStyleSheet
                ? ((t) => {
                    let e = "";
                    for (const i of t.cssRules) e += i.cssText;
                    return ((t) =>
                      new a("string" == typeof t ? t : t + "", void 0, r))(e);
                  })(t)
                : t;
      var d;
      const u = window,
        p = u.trustedTypes,
        f = p ? p.emptyScript : "",
        v = u.reactiveElementPolyfillSupport,
        m = {
          toAttribute(t, e) {
            switch (e) {
              case Boolean:
                t = t ? f : null;
                break;
              case Object:
              case Array:
                t = null == t ? t : JSON.stringify(t);
            }
            return t;
          },
          fromAttribute(t, e) {
            let i = t;
            switch (e) {
              case Boolean:
                i = null !== t;
                break;
              case Number:
                i = null === t ? null : Number(t);
                break;
              case Object:
              case Array:
                try {
                  i = JSON.parse(t);
                } catch (t) {
                  i = null;
                }
            }
            return i;
          },
        },
        y = (t, e) => e !== t && (e == e || t == t),
        $ = {
          attribute: !0,
          type: String,
          converter: m,
          reflect: !1,
          hasChanged: y,
        },
        _ = "finalized";
      class g extends HTMLElement {
        constructor() {
          super(),
            (this._$Ei = new Map()),
            (this.isUpdatePending = !1),
            (this.hasUpdated = !1),
            (this._$El = null),
            this._$Eu();
        }
        static addInitializer(t) {
          var e;
          this.finalize(),
            (null !== (e = this.h) && void 0 !== e ? e : (this.h = [])).push(t);
        }
        static get observedAttributes() {
          this.finalize();
          const t = [];
          return (
            this.elementProperties.forEach((e, i) => {
              const s = this._$Ep(i, e);
              void 0 !== s && (this._$Ev.set(s, i), t.push(s));
            }),
            t
          );
        }
        static createProperty(t, e = $) {
          if (
            (e.state && (e.attribute = !1),
            this.finalize(),
            this.elementProperties.set(t, e),
            !e.noAccessor && !this.prototype.hasOwnProperty(t))
          ) {
            const i = "symbol" == typeof t ? Symbol() : "__" + t,
              s = this.getPropertyDescriptor(t, i, e);
            void 0 !== s && Object.defineProperty(this.prototype, t, s);
          }
        }
        static getPropertyDescriptor(t, e, i) {
          return {
            get() {
              return this[e];
            },
            set(s) {
              const n = this[t];
              (this[e] = s), this.requestUpdate(t, n, i);
            },
            configurable: !0,
            enumerable: !0,
          };
        }
        static getPropertyOptions(t) {
          return this.elementProperties.get(t) || $;
        }
        static finalize() {
          if (this.hasOwnProperty(_)) return !1;
          this[_] = !0;
          const t = Object.getPrototypeOf(this);
          if (
            (t.finalize(),
            void 0 !== t.h && (this.h = [...t.h]),
            (this.elementProperties = new Map(t.elementProperties)),
            (this._$Ev = new Map()),
            this.hasOwnProperty("properties"))
          ) {
            const t = this.properties,
              e = [
                ...Object.getOwnPropertyNames(t),
                ...Object.getOwnPropertySymbols(t),
              ];
            for (const i of e) this.createProperty(i, t[i]);
          }
          return (this.elementStyles = this.finalizeStyles(this.styles)), !0;
        }
        static finalizeStyles(t) {
          const e = [];
          if (Array.isArray(t)) {
            const i = new Set(t.flat(1 / 0).reverse());
            for (const t of i) e.unshift(c(t));
          } else void 0 !== t && e.push(c(t));
          return e;
        }
        static _$Ep(t, e) {
          const i = e.attribute;
          return !1 === i
            ? void 0
            : "string" == typeof i
              ? i
              : "string" == typeof t
                ? t.toLowerCase()
                : void 0;
        }
        _$Eu() {
          var t;
          (this._$E_ = new Promise((t) => (this.enableUpdating = t))),
            (this._$AL = new Map()),
            this._$Eg(),
            this.requestUpdate(),
            null === (t = this.constructor.h) ||
              void 0 === t ||
              t.forEach((t) => t(this));
        }
        addController(t) {
          var e, i;
          (null !== (e = this._$ES) && void 0 !== e
            ? e
            : (this._$ES = [])
          ).push(t),
            void 0 !== this.renderRoot &&
              this.isConnected &&
              (null === (i = t.hostConnected) || void 0 === i || i.call(t));
        }
        removeController(t) {
          var e;
          null === (e = this._$ES) ||
            void 0 === e ||
            e.splice(this._$ES.indexOf(t) >>> 0, 1);
        }
        _$Eg() {
          this.constructor.elementProperties.forEach((t, e) => {
            this.hasOwnProperty(e) &&
              (this._$Ei.set(e, this[e]), delete this[e]);
          });
        }
        createRenderRoot() {
          var t;
          const e =
            null !== (t = this.shadowRoot) && void 0 !== t
              ? t
              : this.attachShadow(this.constructor.shadowRootOptions);
          return h(e, this.constructor.elementStyles), e;
        }
        connectedCallback() {
          var t;
          void 0 === this.renderRoot &&
            (this.renderRoot = this.createRenderRoot()),
            this.enableUpdating(!0),
            null === (t = this._$ES) ||
              void 0 === t ||
              t.forEach((t) => {
                var e;
                return null === (e = t.hostConnected) || void 0 === e
                  ? void 0
                  : e.call(t);
              });
        }
        enableUpdating(t) {}
        disconnectedCallback() {
          var t;
          null === (t = this._$ES) ||
            void 0 === t ||
            t.forEach((t) => {
              var e;
              return null === (e = t.hostDisconnected) || void 0 === e
                ? void 0
                : e.call(t);
            });
        }
        attributeChangedCallback(t, e, i) {
          this._$AK(t, i);
        }
        _$EO(t, e, i = $) {
          var s;
          const n = this.constructor._$Ep(t, i);
          if (void 0 !== n && !0 === i.reflect) {
            const r = (
              void 0 !==
              (null === (s = i.converter) || void 0 === s
                ? void 0
                : s.toAttribute)
                ? i.converter
                : m
            ).toAttribute(e, i.type);
            (this._$El = t),
              null == r ? this.removeAttribute(n) : this.setAttribute(n, r),
              (this._$El = null);
          }
        }
        _$AK(t, e) {
          var i;
          const s = this.constructor,
            n = s._$Ev.get(t);
          if (void 0 !== n && this._$El !== n) {
            const t = s.getPropertyOptions(n),
              r =
                "function" == typeof t.converter
                  ? { fromAttribute: t.converter }
                  : void 0 !==
                      (null === (i = t.converter) || void 0 === i
                        ? void 0
                        : i.fromAttribute)
                    ? t.converter
                    : m;
            (this._$El = n),
              (this[n] = r.fromAttribute(e, t.type)),
              (this._$El = null);
          }
        }
        requestUpdate(t, e, i) {
          let s = !0;
          void 0 !== t &&
            ((
              (i = i || this.constructor.getPropertyOptions(t)).hasChanged || y
            )(this[t], e)
              ? (this._$AL.has(t) || this._$AL.set(t, e),
                !0 === i.reflect &&
                  this._$El !== t &&
                  (void 0 === this._$EC && (this._$EC = new Map()),
                  this._$EC.set(t, i)))
              : (s = !1)),
            !this.isUpdatePending && s && (this._$E_ = this._$Ej());
        }
        async _$Ej() {
          this.isUpdatePending = !0;
          try {
            await this._$E_;
          } catch (t) {
            Promise.reject(t);
          }
          const t = this.scheduleUpdate();
          return null != t && (await t), !this.isUpdatePending;
        }
        scheduleUpdate() {
          return this.performUpdate();
        }
        performUpdate() {
          var t;
          if (!this.isUpdatePending) return;
          this.hasUpdated,
            this._$Ei &&
              (this._$Ei.forEach((t, e) => (this[e] = t)),
              (this._$Ei = void 0));
          let e = !1;
          const i = this._$AL;
          try {
            (e = this.shouldUpdate(i)),
              e
                ? (this.willUpdate(i),
                  null === (t = this._$ES) ||
                    void 0 === t ||
                    t.forEach((t) => {
                      var e;
                      return null === (e = t.hostUpdate) || void 0 === e
                        ? void 0
                        : e.call(t);
                    }),
                  this.update(i))
                : this._$Ek();
          } catch (t) {
            throw ((e = !1), this._$Ek(), t);
          }
          e && this._$AE(i);
        }
        willUpdate(t) {}
        _$AE(t) {
          var e;
          null === (e = this._$ES) ||
            void 0 === e ||
            e.forEach((t) => {
              var e;
              return null === (e = t.hostUpdated) || void 0 === e
                ? void 0
                : e.call(t);
            }),
            this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
            this.updated(t);
        }
        _$Ek() {
          (this._$AL = new Map()), (this.isUpdatePending = !1);
        }
        get updateComplete() {
          return this.getUpdateComplete();
        }
        getUpdateComplete() {
          return this._$E_;
        }
        shouldUpdate(t) {
          return !0;
        }
        update(t) {
          void 0 !== this._$EC &&
            (this._$EC.forEach((t, e) => this._$EO(e, this[e], t)),
            (this._$EC = void 0)),
            this._$Ek();
        }
        updated(t) {}
        firstUpdated(t) {}
      }
      (g[_] = !0),
        (g.elementProperties = new Map()),
        (g.elementStyles = []),
        (g.shadowRootOptions = { mode: "open" }),
        null == v || v({ ReactiveElement: g }),
        (null !== (d = u.reactiveElementVersions) && void 0 !== d
          ? d
          : (u.reactiveElementVersions = [])
        ).push("1.6.3");
    },
    8922: (t, e, i) => {
      i.d(e, { YP: () => o.YP, dy: () => o.dy, iv: () => r.iv, oi: () => a });
      var s,
        n,
        r = i(77898),
        o = i(33692);
      class a extends r.fl {
        constructor() {
          super(...arguments),
            (this.renderOptions = { host: this }),
            (this._$Do = void 0);
        }
        createRenderRoot() {
          var t, e;
          const i = super.createRenderRoot();
          return (
            (null !== (t = (e = this.renderOptions).renderBefore) &&
              void 0 !== t) ||
              (e.renderBefore = i.firstChild),
            i
          );
        }
        update(t) {
          const e = this.render();
          this.hasUpdated ||
            (this.renderOptions.isConnected = this.isConnected),
            super.update(t),
            (this._$Do = (0, o.sY)(e, this.renderRoot, this.renderOptions));
        }
        connectedCallback() {
          var t;
          super.connectedCallback(),
            null === (t = this._$Do) || void 0 === t || t.setConnected(!0);
        }
        disconnectedCallback() {
          var t;
          super.disconnectedCallback(),
            null === (t = this._$Do) || void 0 === t || t.setConnected(!1);
        }
        render() {
          return o.Jb;
        }
      }
      (a.finalized = !0),
        (a._$litElement$ = !0),
        null === (s = globalThis.litElementHydrateSupport) ||
          void 0 === s ||
          s.call(globalThis, { LitElement: a });
      const l = globalThis.litElementPolyfillSupport;
      null == l || l({ LitElement: a }),
        (null !== (n = globalThis.litElementVersions) && void 0 !== n
          ? n
          : (globalThis.litElementVersions = [])
        ).push("3.3.3");
    },
    83057: (t, e, i) => {
      i.d(e, { $: () => r });
      var s = i(33692);
      class n {
        constructor(t) {}
        get _$AU() {
          return this._$AM._$AU;
        }
        _$AT(t, e, i) {
          (this._$Ct = t), (this._$AM = e), (this._$Ci = i);
        }
        _$AS(t, e) {
          return this.update(t, e);
        }
        update(t, e) {
          return this.render(...e);
        }
      }
      const r =
        ((o = class extends n {
          constructor(t) {
            var e;
            if (
              (super(t),
              1 !== t.type ||
                "class" !== t.name ||
                (null === (e = t.strings) || void 0 === e ? void 0 : e.length) >
                  2)
            )
              throw Error(
                "`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.",
              );
          }
          render(t) {
            return (
              " " +
              Object.keys(t)
                .filter((e) => t[e])
                .join(" ") +
              " "
            );
          }
          update(t, [e]) {
            var i, n;
            if (void 0 === this.it) {
              (this.it = new Set()),
                void 0 !== t.strings &&
                  (this.nt = new Set(
                    t.strings
                      .join(" ")
                      .split(/\s/)
                      .filter((t) => "" !== t),
                  ));
              for (const t in e)
                e[t] &&
                  !(null === (i = this.nt) || void 0 === i
                    ? void 0
                    : i.has(t)) &&
                  this.it.add(t);
              return this.render(e);
            }
            const r = t.element.classList;
            this.it.forEach((t) => {
              t in e || (r.remove(t), this.it.delete(t));
            });
            for (const t in e) {
              const i = !!e[t];
              i === this.it.has(t) ||
                (null === (n = this.nt) || void 0 === n ? void 0 : n.has(t)) ||
                (i
                  ? (r.add(t), this.it.add(t))
                  : (r.remove(t), this.it.delete(t)));
            }
            return s.Jb;
          }
        }),
        (...t) => ({ _$litDirective$: o, values: t }));
      var o;
    },
    30577: (t, e, i) => {
      i.d(e, { o: () => n });
      var s = i(33692);
      const n = (t) => (null != t ? t : s.Ld);
    },
    33692: (t, e, i) => {
      var s;
      i.d(e, {
        Jb: () => C,
        Ld: () => x,
        YP: () => w,
        dy: () => b,
        sY: () => I,
      });
      const n = window,
        r = n.trustedTypes,
        o = r ? r.createPolicy("lit-html", { createHTML: (t) => t }) : void 0,
        a = "$lit$",
        l = `lit$${(Math.random() + "").slice(9)}$`,
        h = "?" + l,
        c = `<${h}>`,
        d = document,
        u = () => d.createComment(""),
        p = (t) =>
          null === t || ("object" != typeof t && "function" != typeof t),
        f = Array.isArray,
        v = "[ \t\n\f\r]",
        m = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
        y = /-->/g,
        $ = />/g,
        _ = RegExp(
          `>|${v}(?:([^\\s"'>=/]+)(${v}*=${v}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,
          "g",
        ),
        g = /'/g,
        A = /"/g,
        S = /^(?:script|style|textarea|title)$/i,
        E =
          (t) =>
          (e, ...i) => ({ _$litType$: t, strings: e, values: i }),
        b = E(1),
        w = E(2),
        C = Symbol.for("lit-noChange"),
        x = Symbol.for("lit-nothing"),
        T = new WeakMap(),
        P = d.createTreeWalker(d, 129, null, !1);
      function k(t, e) {
        if (!Array.isArray(t) || !t.hasOwnProperty("raw"))
          throw Error("invalid template strings array");
        return void 0 !== o ? o.createHTML(e) : e;
      }
      const U = (t, e) => {
        const i = t.length - 1,
          s = [];
        let n,
          r = 2 === e ? "<svg>" : "",
          o = m;
        for (let e = 0; e < i; e++) {
          const i = t[e];
          let h,
            d,
            u = -1,
            p = 0;
          for (
            ;
            p < i.length && ((o.lastIndex = p), (d = o.exec(i)), null !== d);

          )
            (p = o.lastIndex),
              o === m
                ? "!--" === d[1]
                  ? (o = y)
                  : void 0 !== d[1]
                    ? (o = $)
                    : void 0 !== d[2]
                      ? (S.test(d[2]) && (n = RegExp("</" + d[2], "g")),
                        (o = _))
                      : void 0 !== d[3] && (o = _)
                : o === _
                  ? ">" === d[0]
                    ? ((o = null != n ? n : m), (u = -1))
                    : void 0 === d[1]
                      ? (u = -2)
                      : ((u = o.lastIndex - d[2].length),
                        (h = d[1]),
                        (o = void 0 === d[3] ? _ : '"' === d[3] ? A : g))
                  : o === A || o === g
                    ? (o = _)
                    : o === y || o === $
                      ? (o = m)
                      : ((o = _), (n = void 0));
          const f = o === _ && t[e + 1].startsWith("/>") ? " " : "";
          r +=
            o === m
              ? i + c
              : u >= 0
                ? (s.push(h), i.slice(0, u) + a + i.slice(u) + l + f)
                : i + l + (-2 === u ? (s.push(void 0), e) : f);
        }
        return [k(t, r + (t[i] || "<?>") + (2 === e ? "</svg>" : "")), s];
      };
      class O {
        constructor({ strings: t, _$litType$: e }, i) {
          let s;
          this.parts = [];
          let n = 0,
            o = 0;
          const c = t.length - 1,
            d = this.parts,
            [p, f] = U(t, e);
          if (
            ((this.el = O.createElement(p, i)),
            (P.currentNode = this.el.content),
            2 === e)
          ) {
            const t = this.el.content,
              e = t.firstChild;
            e.remove(), t.append(...e.childNodes);
          }
          for (; null !== (s = P.nextNode()) && d.length < c; ) {
            if (1 === s.nodeType) {
              if (s.hasAttributes()) {
                const t = [];
                for (const e of s.getAttributeNames())
                  if (e.endsWith(a) || e.startsWith(l)) {
                    const i = f[o++];
                    if ((t.push(e), void 0 !== i)) {
                      const t = s.getAttribute(i.toLowerCase() + a).split(l),
                        e = /([.?@])?(.*)/.exec(i);
                      d.push({
                        type: 1,
                        index: n,
                        name: e[2],
                        strings: t,
                        ctor:
                          "." === e[1]
                            ? N
                            : "?" === e[1]
                              ? L
                              : "@" === e[1]
                                ? z
                                : D,
                      });
                    } else d.push({ type: 6, index: n });
                  }
                for (const e of t) s.removeAttribute(e);
              }
              if (S.test(s.tagName)) {
                const t = s.textContent.split(l),
                  e = t.length - 1;
                if (e > 0) {
                  s.textContent = r ? r.emptyScript : "";
                  for (let i = 0; i < e; i++)
                    s.append(t[i], u()),
                      P.nextNode(),
                      d.push({ type: 2, index: ++n });
                  s.append(t[e], u());
                }
              }
            } else if (8 === s.nodeType)
              if (s.data === h) d.push({ type: 2, index: n });
              else {
                let t = -1;
                for (; -1 !== (t = s.data.indexOf(l, t + 1)); )
                  d.push({ type: 7, index: n }), (t += l.length - 1);
              }
            n++;
          }
        }
        static createElement(t, e) {
          const i = d.createElement("template");
          return (i.innerHTML = t), i;
        }
      }
      function M(t, e, i = t, s) {
        var n, r, o, a;
        if (e === C) return e;
        let l =
          void 0 !== s
            ? null === (n = i._$Co) || void 0 === n
              ? void 0
              : n[s]
            : i._$Cl;
        const h = p(e) ? void 0 : e._$litDirective$;
        return (
          (null == l ? void 0 : l.constructor) !== h &&
            (null === (r = null == l ? void 0 : l._$AO) ||
              void 0 === r ||
              r.call(l, !1),
            void 0 === h ? (l = void 0) : ((l = new h(t)), l._$AT(t, i, s)),
            void 0 !== s
              ? ((null !== (o = (a = i)._$Co) && void 0 !== o
                  ? o
                  : (a._$Co = []))[s] = l)
              : (i._$Cl = l)),
          void 0 !== l && (e = M(t, l._$AS(t, e.values), l, s)),
          e
        );
      }
      class R {
        constructor(t, e) {
          (this._$AV = []),
            (this._$AN = void 0),
            (this._$AD = t),
            (this._$AM = e);
        }
        get parentNode() {
          return this._$AM.parentNode;
        }
        get _$AU() {
          return this._$AM._$AU;
        }
        u(t) {
          var e;
          const {
              el: { content: i },
              parts: s,
            } = this._$AD,
            n = (
              null !== (e = null == t ? void 0 : t.creationScope) &&
              void 0 !== e
                ? e
                : d
            ).importNode(i, !0);
          P.currentNode = n;
          let r = P.nextNode(),
            o = 0,
            a = 0,
            l = s[0];
          for (; void 0 !== l; ) {
            if (o === l.index) {
              let e;
              2 === l.type
                ? (e = new H(r, r.nextSibling, this, t))
                : 1 === l.type
                  ? (e = new l.ctor(r, l.name, l.strings, this, t))
                  : 6 === l.type && (e = new V(r, this, t)),
                this._$AV.push(e),
                (l = s[++a]);
            }
            o !== (null == l ? void 0 : l.index) && ((r = P.nextNode()), o++);
          }
          return (P.currentNode = d), n;
        }
        v(t) {
          let e = 0;
          for (const i of this._$AV)
            void 0 !== i &&
              (void 0 !== i.strings
                ? (i._$AI(t, i, e), (e += i.strings.length - 2))
                : i._$AI(t[e])),
              e++;
        }
      }
      class H {
        constructor(t, e, i, s) {
          var n;
          (this.type = 2),
            (this._$AH = x),
            (this._$AN = void 0),
            (this._$AA = t),
            (this._$AB = e),
            (this._$AM = i),
            (this.options = s),
            (this._$Cp =
              null === (n = null == s ? void 0 : s.isConnected) ||
              void 0 === n ||
              n);
        }
        get _$AU() {
          var t, e;
          return null !==
            (e = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) &&
            void 0 !== e
            ? e
            : this._$Cp;
        }
        get parentNode() {
          let t = this._$AA.parentNode;
          const e = this._$AM;
          return (
            void 0 !== e &&
              11 === (null == t ? void 0 : t.nodeType) &&
              (t = e.parentNode),
            t
          );
        }
        get startNode() {
          return this._$AA;
        }
        get endNode() {
          return this._$AB;
        }
        _$AI(t, e = this) {
          (t = M(this, t, e)),
            p(t)
              ? t === x || null == t || "" === t
                ? (this._$AH !== x && this._$AR(), (this._$AH = x))
                : t !== this._$AH && t !== C && this._(t)
              : void 0 !== t._$litType$
                ? this.g(t)
                : void 0 !== t.nodeType
                  ? this.$(t)
                  : ((t) =>
                        f(t) ||
                        "function" ==
                          typeof (null == t ? void 0 : t[Symbol.iterator]))(t)
                    ? this.T(t)
                    : this._(t);
        }
        k(t) {
          return this._$AA.parentNode.insertBefore(t, this._$AB);
        }
        $(t) {
          this._$AH !== t && (this._$AR(), (this._$AH = this.k(t)));
        }
        _(t) {
          this._$AH !== x && p(this._$AH)
            ? (this._$AA.nextSibling.data = t)
            : this.$(d.createTextNode(t)),
            (this._$AH = t);
        }
        g(t) {
          var e;
          const { values: i, _$litType$: s } = t,
            n =
              "number" == typeof s
                ? this._$AC(t)
                : (void 0 === s.el &&
                    (s.el = O.createElement(k(s.h, s.h[0]), this.options)),
                  s);
          if (
            (null === (e = this._$AH) || void 0 === e ? void 0 : e._$AD) === n
          )
            this._$AH.v(i);
          else {
            const t = new R(n, this),
              e = t.u(this.options);
            t.v(i), this.$(e), (this._$AH = t);
          }
        }
        _$AC(t) {
          let e = T.get(t.strings);
          return void 0 === e && T.set(t.strings, (e = new O(t))), e;
        }
        T(t) {
          f(this._$AH) || ((this._$AH = []), this._$AR());
          const e = this._$AH;
          let i,
            s = 0;
          for (const n of t)
            s === e.length
              ? e.push(
                  (i = new H(this.k(u()), this.k(u()), this, this.options)),
                )
              : (i = e[s]),
              i._$AI(n),
              s++;
          s < e.length &&
            (this._$AR(i && i._$AB.nextSibling, s), (e.length = s));
        }
        _$AR(t = this._$AA.nextSibling, e) {
          var i;
          for (
            null === (i = this._$AP) || void 0 === i || i.call(this, !1, !0, e);
            t && t !== this._$AB;

          ) {
            const e = t.nextSibling;
            t.remove(), (t = e);
          }
        }
        setConnected(t) {
          var e;
          void 0 === this._$AM &&
            ((this._$Cp = t),
            null === (e = this._$AP) || void 0 === e || e.call(this, t));
        }
      }
      class D {
        constructor(t, e, i, s, n) {
          (this.type = 1),
            (this._$AH = x),
            (this._$AN = void 0),
            (this.element = t),
            (this.name = e),
            (this._$AM = s),
            (this.options = n),
            i.length > 2 || "" !== i[0] || "" !== i[1]
              ? ((this._$AH = Array(i.length - 1).fill(new String())),
                (this.strings = i))
              : (this._$AH = x);
        }
        get tagName() {
          return this.element.tagName;
        }
        get _$AU() {
          return this._$AM._$AU;
        }
        _$AI(t, e = this, i, s) {
          const n = this.strings;
          let r = !1;
          if (void 0 === n)
            (t = M(this, t, e, 0)),
              (r = !p(t) || (t !== this._$AH && t !== C)),
              r && (this._$AH = t);
          else {
            const s = t;
            let o, a;
            for (t = n[0], o = 0; o < n.length - 1; o++)
              (a = M(this, s[i + o], e, o)),
                a === C && (a = this._$AH[o]),
                r || (r = !p(a) || a !== this._$AH[o]),
                a === x
                  ? (t = x)
                  : t !== x && (t += (null != a ? a : "") + n[o + 1]),
                (this._$AH[o] = a);
          }
          r && !s && this.j(t);
        }
        j(t) {
          t === x
            ? this.element.removeAttribute(this.name)
            : this.element.setAttribute(this.name, null != t ? t : "");
        }
      }
      class N extends D {
        constructor() {
          super(...arguments), (this.type = 3);
        }
        j(t) {
          this.element[this.name] = t === x ? void 0 : t;
        }
      }
      const j = r ? r.emptyScript : "";
      class L extends D {
        constructor() {
          super(...arguments), (this.type = 4);
        }
        j(t) {
          t && t !== x
            ? this.element.setAttribute(this.name, j)
            : this.element.removeAttribute(this.name);
        }
      }
      class z extends D {
        constructor(t, e, i, s, n) {
          super(t, e, i, s, n), (this.type = 5);
        }
        _$AI(t, e = this) {
          var i;
          if (
            (t = null !== (i = M(this, t, e, 0)) && void 0 !== i ? i : x) === C
          )
            return;
          const s = this._$AH,
            n =
              (t === x && s !== x) ||
              t.capture !== s.capture ||
              t.once !== s.once ||
              t.passive !== s.passive,
            r = t !== x && (s === x || n);
          n && this.element.removeEventListener(this.name, this, s),
            r && this.element.addEventListener(this.name, this, t),
            (this._$AH = t);
        }
        handleEvent(t) {
          var e, i;
          "function" == typeof this._$AH
            ? this._$AH.call(
                null !==
                  (i =
                    null === (e = this.options) || void 0 === e
                      ? void 0
                      : e.host) && void 0 !== i
                  ? i
                  : this.element,
                t,
              )
            : this._$AH.handleEvent(t);
        }
      }
      class V {
        constructor(t, e, i) {
          (this.element = t),
            (this.type = 6),
            (this._$AN = void 0),
            (this._$AM = e),
            (this.options = i);
        }
        get _$AU() {
          return this._$AM._$AU;
        }
        _$AI(t) {
          M(this, t);
        }
      }
      const B = n.litHtmlPolyfillSupport;
      null == B || B(O, H),
        (null !== (s = n.litHtmlVersions) && void 0 !== s
          ? s
          : (n.litHtmlVersions = [])
        ).push("2.8.0");
      const I = (t, e, i) => {
        var s, n;
        const r =
          null !== (s = null == i ? void 0 : i.renderBefore) && void 0 !== s
            ? s
            : e;
        let o = r._$litPart$;
        if (void 0 === o) {
          const t =
            null !== (n = null == i ? void 0 : i.renderBefore) && void 0 !== n
              ? n
              : null;
          r._$litPart$ = o = new H(
            e.insertBefore(u(), t),
            t,
            void 0,
            null != i ? i : {},
          );
        }
        return o._$AI(t), o;
      };
    },
  },
]);

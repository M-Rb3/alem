"use strict";
(self.webpackChunkbos_workspace_gateway =
  self.webpackChunkbos_workspace_gateway || []).push([
  [9343],
  {
    72478: (e, t, s) => {
      s.d(t, { jc: () => i, o5: () => r }), Symbol();
      const o = Symbol(),
        n = Object.getPrototypeOf,
        a = new WeakMap(),
        r = (e) =>
          (((e) =>
            e &&
            (a.has(e)
              ? a.get(e)
              : n(e) === Object.prototype || n(e) === Array.prototype))(e) &&
            e[o]) ||
          null,
        i = (e, t = !0) => {
          a.set(e, t);
        };
    },
    28448: (e, t, s) => {
      s.d(t, {
        ConfigCtrl: () => g,
        zv: () => u,
        uA: () => h,
        ExplorerCtrl: () => $,
        jb: () => B,
        OptionsCtrl: () => b,
        AV: () => p,
        ThemeCtrl: () => G,
        ToastCtrl: () => X,
      });
      var o = s(72478);
      const n = (e) => "object" == typeof e && null !== e,
        a = new WeakMap(),
        r = new WeakSet(),
        [i] = ((
          e = Object.is,
          t = (e, t) => new Proxy(e, t),
          s = (e) =>
            n(e) &&
            !r.has(e) &&
            (Array.isArray(e) || !(Symbol.iterator in e)) &&
            !(e instanceof WeakMap) &&
            !(e instanceof WeakSet) &&
            !(e instanceof Error) &&
            !(e instanceof Number) &&
            !(e instanceof Date) &&
            !(e instanceof String) &&
            !(e instanceof RegExp) &&
            !(e instanceof ArrayBuffer),
          i = (e) => e.configurable && e.enumerable && e.writable,
          l = (e) => {
            switch (e.status) {
              case "fulfilled":
                return e.value;
              case "rejected":
                throw e.reason;
              default:
                throw e;
            }
          },
          c = new WeakMap(),
          d = (e, t, s = l) => {
            const n = c.get(e);
            if ((null == n ? void 0 : n[0]) === t) return n[1];
            const i = Array.isArray(e)
              ? []
              : Object.create(Object.getPrototypeOf(e));
            return (
              (0, o.jc)(i, !0),
              c.set(e, [t, i]),
              Reflect.ownKeys(e).forEach((t) => {
                if (Object.getOwnPropertyDescriptor(i, t)) return;
                const n = Reflect.get(e, t),
                  l = { value: n, enumerable: !0, configurable: !0 };
                if (r.has(n)) (0, o.jc)(n, !1);
                else if (n instanceof Promise)
                  delete l.value, (l.get = () => s(n));
                else if (a.has(n)) {
                  const [e, t] = a.get(n);
                  l.value = d(e, t(), s);
                }
                Object.defineProperty(i, t, l);
              }),
              Object.preventExtensions(i)
            );
          },
          p = new WeakMap(),
          u = [1, 1],
          f = (l) => {
            if (!n(l)) throw new Error("object required");
            const c = p.get(l);
            if (c) return c;
            let h = u[0];
            const m = new Set(),
              b = (e, t = ++u[0]) => {
                h !== t && ((h = t), m.forEach((s) => s(e, t)));
              };
            let y = u[1];
            const g = (e) => (t, s) => {
                const o = [...t];
                (o[1] = [e, ...o[1]]), b(o, s);
              },
              v = new Map(),
              w = (e) => {
                var t;
                const s = v.get(e);
                s && (v.delete(e), null == (t = s[1]) || t.call(s));
              },
              C = Array.isArray(l)
                ? []
                : Object.create(Object.getPrototypeOf(l)),
              I = (t, i, l, c, d) => {
                if (t && (e(i, c) || (p.has(c) && e(i, p.get(c))))) return;
                w(l), n(c) && (c = (0, o.o5)(c) || c);
                let u = c;
                if (c instanceof Promise)
                  c.then((e) => {
                    (c.status = "fulfilled"),
                      (c.value = e),
                      b(["resolve", [l], e]);
                  }).catch((e) => {
                    (c.status = "rejected"),
                      (c.reason = e),
                      b(["reject", [l], e]);
                  });
                else {
                  !a.has(c) && s(c) && (u = f(c));
                  const e = !r.has(u) && a.get(u);
                  e &&
                    ((e, t) => {
                      if (v.has(e))
                        throw new Error("prop listener already exists");
                      if (m.size) {
                        const s = t[3](g(e));
                        v.set(e, [t, s]);
                      } else v.set(e, [t]);
                    })(l, e);
                }
                d(u), b(["set", [l], c, i]);
              },
              O = t(C, {
                deleteProperty(e, t) {
                  const s = Reflect.get(e, t);
                  w(t);
                  const o = Reflect.deleteProperty(e, t);
                  return o && b(["delete", [t], s]), o;
                },
                set(e, t, s, o) {
                  const n = Reflect.has(e, t),
                    a = Reflect.get(e, t, o);
                  return (
                    I(n, a, t, s, (s) => {
                      Reflect.set(e, t, s, o);
                    }),
                    !0
                  );
                },
                defineProperty(e, t, s) {
                  if (i(s)) {
                    const o = Reflect.getOwnPropertyDescriptor(e, t);
                    if (!o || i(o))
                      return (
                        I(
                          !!o && "value" in o,
                          null == o ? void 0 : o.value,
                          t,
                          s.value,
                          (o) => {
                            Reflect.defineProperty(e, t, { ...s, value: o });
                          },
                        ),
                        !0
                      );
                  }
                  return Reflect.defineProperty(e, t, s);
                },
              });
            p.set(l, O);
            const W = [
              C,
              (e = ++u[1]) => (
                y === e ||
                  m.size ||
                  ((y = e),
                  v.forEach(([t]) => {
                    const s = t[1](e);
                    s > h && (h = s);
                  })),
                h
              ),
              d,
              (e) => (
                m.add(e),
                1 === m.size &&
                  v.forEach(([e, t], s) => {
                    if (t) throw new Error("remove already exists");
                    const o = e[3](g(s));
                    v.set(s, [e, o]);
                  }),
                () => {
                  m.delete(e),
                    0 === m.size &&
                      v.forEach(([e, t], s) => {
                        t && (t(), v.set(s, [e]));
                      });
                }
              ),
            ];
            return (
              a.set(O, W),
              Reflect.ownKeys(l).forEach((e) => {
                const t = Object.getOwnPropertyDescriptor(l, e);
                "value" in t &&
                  ((O[e] = l[e]), delete t.value, delete t.writable),
                  Object.defineProperty(C, e, t);
              }),
              O
            );
          },
        ) => [f, a, r, e, t, s, i, l, c, d, p, u])();
      function l(e = {}) {
        return i(e);
      }
      function c(e, t, s) {
        const o = a.get(e);
        let n;
        o || console.warn("Please use proxy object");
        const r = [],
          i = o[3];
        let l = !1;
        const c = i((e) => {
          r.push(e),
            s
              ? t(r.splice(0))
              : n ||
                (n = Promise.resolve().then(() => {
                  (n = void 0), l && t(r.splice(0));
                }));
        });
        return (
          (l = !0),
          () => {
            (l = !1), c();
          }
        );
      }
      const d = l({
          history: ["ConnectWallet"],
          view: "ConnectWallet",
          data: void 0,
        }),
        p = {
          state: d,
          subscribe: (e) => c(d, () => e(d)),
          push(e, t) {
            e !== d.view &&
              ((d.view = e), t && (d.data = t), d.history.push(e));
          },
          reset(e) {
            (d.view = e), (d.history = [e]);
          },
          replace(e) {
            d.history.length > 1 &&
              ((d.history[d.history.length - 1] = e), (d.view = e));
          },
          goBack() {
            if (d.history.length > 1) {
              d.history.pop();
              const [e] = d.history.slice(-1);
              d.view = e;
            }
          },
          setData(e) {
            d.data = e;
          },
        },
        u = {
          WALLETCONNECT_DEEPLINK_CHOICE: "WALLETCONNECT_DEEPLINK_CHOICE",
          WCM_VERSION: "WCM_VERSION",
          RECOMMENDED_WALLET_AMOUNT: 9,
          isMobile: () =>
            typeof window < "u" &&
            Boolean(
              window.matchMedia("(pointer:coarse)").matches ||
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(
                  navigator.userAgent,
                ),
            ),
          isAndroid: () =>
            u.isMobile() &&
            navigator.userAgent.toLowerCase().includes("android"),
          isIos() {
            const e = navigator.userAgent.toLowerCase();
            return u.isMobile() && (e.includes("iphone") || e.includes("ipad"));
          },
          isHttpUrl: (e) => e.startsWith("http://") || e.startsWith("https://"),
          isArray: (e) => Array.isArray(e) && e.length > 0,
          formatNativeUrl(e, t, s) {
            if (u.isHttpUrl(e)) return this.formatUniversalUrl(e, t, s);
            let o = e;
            return (
              o.includes("://") ||
                ((o = e.replaceAll("/", "").replaceAll(":", "")),
                (o = `${o}://`)),
              o.endsWith("/") || (o = `${o}/`),
              this.setWalletConnectDeepLink(o, s),
              `${o}wc?uri=${encodeURIComponent(t)}`
            );
          },
          formatUniversalUrl(e, t, s) {
            if (!u.isHttpUrl(e)) return this.formatNativeUrl(e, t, s);
            let o = e;
            return (
              o.endsWith("/") || (o = `${o}/`),
              this.setWalletConnectDeepLink(o, s),
              `${o}wc?uri=${encodeURIComponent(t)}`
            );
          },
          wait: async (e) =>
            new Promise((t) => {
              setTimeout(t, e);
            }),
          openHref(e, t) {
            window.open(e, t, "noreferrer noopener");
          },
          setWalletConnectDeepLink(e, t) {
            try {
              localStorage.setItem(
                u.WALLETCONNECT_DEEPLINK_CHOICE,
                JSON.stringify({ href: e, name: t }),
              );
            } catch {
              console.info("Unable to set WalletConnect deep link");
            }
          },
          setWalletConnectAndroidDeepLink(e) {
            try {
              const [t] = e.split("?");
              localStorage.setItem(
                u.WALLETCONNECT_DEEPLINK_CHOICE,
                JSON.stringify({ href: t, name: "Android" }),
              );
            } catch {
              console.info("Unable to set WalletConnect android deep link");
            }
          },
          removeWalletConnectDeepLink() {
            try {
              localStorage.removeItem(u.WALLETCONNECT_DEEPLINK_CHOICE);
            } catch {
              console.info("Unable to remove WalletConnect deep link");
            }
          },
          setModalVersionInStorage() {
            try {
              typeof localStorage < "u" &&
                localStorage.setItem(u.WCM_VERSION, "2.6.1");
            } catch {
              console.info("Unable to set Web3Modal version in storage");
            }
          },
          getWalletRouterData() {
            var e;
            const t = null == (e = p.state.data) ? void 0 : e.Wallet;
            if (!t) throw new Error('Missing "Wallet" view data');
            return t;
          },
        },
        f = l({
          enabled:
            typeof location < "u" &&
            (location.hostname.includes("localhost") ||
              location.protocol.includes("https")),
          userSessionId: "",
          events: [],
          connectedWalletId: void 0,
        }),
        h = {
          state: f,
          subscribe: (e) =>
            c(f.events, () =>
              e(
                (function (e, t) {
                  const s = a.get(e);
                  s || console.warn("Please use proxy object");
                  const [o, n, r] = s;
                  return r(o, n(), void 0);
                })(f.events[f.events.length - 1]),
              ),
            ),
          initialize() {
            f.enabled &&
              typeof (null == crypto ? void 0 : crypto.randomUUID) < "u" &&
              (f.userSessionId = crypto.randomUUID());
          },
          setConnectedWalletId(e) {
            f.connectedWalletId = e;
          },
          click(e) {
            if (f.enabled) {
              const t = {
                type: "CLICK",
                name: e.name,
                userSessionId: f.userSessionId,
                timestamp: Date.now(),
                data: e,
              };
              f.events.push(t);
            }
          },
          track(e) {
            if (f.enabled) {
              const t = {
                type: "TRACK",
                name: e.name,
                userSessionId: f.userSessionId,
                timestamp: Date.now(),
                data: e,
              };
              f.events.push(t);
            }
          },
          view(e) {
            if (f.enabled) {
              const t = {
                type: "VIEW",
                name: e.name,
                userSessionId: f.userSessionId,
                timestamp: Date.now(),
                data: e,
              };
              f.events.push(t);
            }
          },
        },
        m = l({
          chains: void 0,
          walletConnectUri: void 0,
          isAuth: !1,
          isCustomDesktop: !1,
          isCustomMobile: !1,
          isDataLoaded: !1,
          isUiLoaded: !1,
        }),
        b = {
          state: m,
          subscribe: (e) => c(m, () => e(m)),
          setChains(e) {
            m.chains = e;
          },
          setWalletConnectUri(e) {
            m.walletConnectUri = e;
          },
          setIsCustomDesktop(e) {
            m.isCustomDesktop = e;
          },
          setIsCustomMobile(e) {
            m.isCustomMobile = e;
          },
          setIsDataLoaded(e) {
            m.isDataLoaded = e;
          },
          setIsUiLoaded(e) {
            m.isUiLoaded = e;
          },
          setIsAuth(e) {
            m.isAuth = e;
          },
        },
        y = l({
          projectId: "",
          mobileWallets: void 0,
          desktopWallets: void 0,
          walletImages: void 0,
          chains: void 0,
          enableAuthMode: !1,
          enableExplorer: !0,
          explorerExcludedWalletIds: void 0,
          explorerRecommendedWalletIds: void 0,
          termsOfServiceUrl: void 0,
          privacyPolicyUrl: void 0,
        }),
        g = {
          state: y,
          subscribe: (e) => c(y, () => e(y)),
          setConfig(e) {
            var t, s;
            h.initialize(),
              b.setChains(e.chains),
              b.setIsAuth(Boolean(e.enableAuthMode)),
              b.setIsCustomMobile(
                Boolean(null == (t = e.mobileWallets) ? void 0 : t.length),
              ),
              b.setIsCustomDesktop(
                Boolean(null == (s = e.desktopWallets) ? void 0 : s.length),
              ),
              u.setModalVersionInStorage(),
              Object.assign(y, e);
          },
        };
      var v = Object.defineProperty,
        w = Object.getOwnPropertySymbols,
        C = Object.prototype.hasOwnProperty,
        I = Object.prototype.propertyIsEnumerable,
        O = (e, t, s) =>
          t in e
            ? v(e, t, {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: s,
              })
            : (e[t] = s);
      const W = "https://explorer-api.walletconnect.com",
        E = "wcm",
        j = "js-2.6.1";
      async function A(e, t) {
        const s = ((e, t) => {
            for (var s in t || (t = {})) C.call(t, s) && O(e, s, t[s]);
            if (w) for (var s of w(t)) I.call(t, s) && O(e, s, t[s]);
            return e;
          })({ sdkType: E, sdkVersion: j }, t),
          o = new URL(e, W);
        return (
          o.searchParams.append("projectId", g.state.projectId),
          Object.entries(s).forEach(([e, t]) => {
            t && o.searchParams.append(e, String(t));
          }),
          (await fetch(o)).json()
        );
      }
      const L = async (e) => A("/w3m/v1/getDesktopListings", e),
        k = async (e) => A("/w3m/v1/getMobileListings", e),
        P = async (e) => A("/w3m/v1/getAllListings", e),
        M = (e) =>
          `${W}/w3m/v1/getWalletImage/${e}?projectId=${g.state.projectId}&sdkType=${E}&sdkVersion=${j}`,
        U = (e) =>
          `${W}/w3m/v1/getAssetImage/${e}?projectId=${g.state.projectId}&sdkType=${E}&sdkVersion=${j}`;
      var D = Object.defineProperty,
        S = Object.getOwnPropertySymbols,
        N = Object.prototype.hasOwnProperty,
        T = Object.prototype.propertyIsEnumerable,
        x = (e, t, s) =>
          t in e
            ? D(e, t, {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: s,
              })
            : (e[t] = s);
      const R = u.isMobile(),
        _ = l({
          wallets: { listings: [], total: 0, page: 1 },
          search: { listings: [], total: 0, page: 1 },
          recomendedWallets: [],
        }),
        $ = {
          state: _,
          async getRecomendedWallets() {
            const {
              explorerRecommendedWalletIds: e,
              explorerExcludedWalletIds: t,
            } = g.state;
            if ("NONE" === e || ("ALL" === t && !e)) return _.recomendedWallets;
            if (u.isArray(e)) {
              const t = { recommendedIds: e.join(",") },
                { listings: s } = await P(t),
                o = Object.values(s);
              o.sort((t, s) => e.indexOf(t.id) - e.indexOf(s.id)),
                (_.recomendedWallets = o);
            } else {
              const { chains: e, isAuth: s } = b.state,
                o = e?.join(","),
                n = u.isArray(t),
                a = {
                  page: 1,
                  sdks: s ? "auth_v1" : void 0,
                  entries: u.RECOMMENDED_WALLET_AMOUNT,
                  chains: o,
                  version: 2,
                  excludedIds: n ? t.join(",") : void 0,
                },
                { listings: r } = R ? await k(a) : await L(a);
              _.recomendedWallets = Object.values(r);
            }
            return _.recomendedWallets;
          },
          async getWallets(e) {
            const t = ((e, t) => {
                for (var s in t || (t = {})) N.call(t, s) && x(e, s, t[s]);
                if (S) for (var s of S(t)) T.call(t, s) && x(e, s, t[s]);
                return e;
              })({}, e),
              {
                explorerRecommendedWalletIds: s,
                explorerExcludedWalletIds: o,
              } = g.state,
              { recomendedWallets: n } = _;
            if ("ALL" === o) return _.wallets;
            n.length
              ? (t.excludedIds = n.map((e) => e.id).join(","))
              : u.isArray(s) && (t.excludedIds = s.join(",")),
              u.isArray(o) &&
                (t.excludedIds = [t.excludedIds, o].filter(Boolean).join(",")),
              b.state.isAuth && (t.sdks = "auth_v1");
            const { page: a, search: r } = e,
              { listings: i, total: l } = R ? await k(t) : await L(t),
              c = Object.values(i),
              d = r ? "search" : "wallets";
            return (
              (_[d] = {
                listings: [..._[d].listings, ...c],
                total: l,
                page: a ?? 1,
              }),
              { listings: c, total: l }
            );
          },
          getWalletImageUrl: (e) => M(e),
          getAssetImageUrl: (e) => U(e),
          resetSearch() {
            _.search = { listings: [], total: 0, page: 1 };
          },
        },
        V = l({ open: !1 }),
        B = {
          state: V,
          subscribe: (e) => c(V, () => e(V)),
          open: async (e) =>
            new Promise((t) => {
              const { isUiLoaded: s, isDataLoaded: o } = b.state;
              if (
                (u.removeWalletConnectDeepLink(),
                b.setWalletConnectUri(e?.uri),
                b.setChains(e?.chains),
                p.reset("ConnectWallet"),
                s && o)
              )
                (V.open = !0), t();
              else {
                const e = setInterval(() => {
                  const s = b.state;
                  s.isUiLoaded &&
                    s.isDataLoaded &&
                    (clearInterval(e), (V.open = !0), t());
                }, 200);
              }
            }),
          close() {
            V.open = !1;
          },
        };
      var H = Object.defineProperty,
        K = Object.getOwnPropertySymbols,
        z = Object.prototype.hasOwnProperty,
        J = Object.prototype.propertyIsEnumerable,
        q = (e, t, s) =>
          t in e
            ? H(e, t, {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: s,
              })
            : (e[t] = s);
      const F = l({
          themeMode:
            typeof matchMedia < "u" &&
            matchMedia("(prefers-color-scheme: dark)").matches
              ? "dark"
              : "light",
        }),
        G = {
          state: F,
          subscribe: (e) => c(F, () => e(F)),
          setThemeConfig(e) {
            const { themeMode: t, themeVariables: s } = e;
            t && (F.themeMode = t),
              s &&
                (F.themeVariables = ((e, t) => {
                  for (var s in t || (t = {})) z.call(t, s) && q(e, s, t[s]);
                  if (K) for (var s of K(t)) J.call(t, s) && q(e, s, t[s]);
                  return e;
                })({}, s));
          },
        },
        Q = l({ open: !1, message: "", variant: "success" }),
        X = {
          state: Q,
          subscribe: (e) => c(Q, () => e(Q)),
          openToast(e, t) {
            (Q.open = !0), (Q.message = e), (Q.variant = t);
          },
          closeToast() {
            Q.open = !1;
          },
        };
    },
    59343: (e, t, s) => {
      s.d(t, { WalletConnectModal: () => n });
      var o = s(28448);
      class n {
        constructor(e) {
          (this.openModal = o.jb.open),
            (this.closeModal = o.jb.close),
            (this.subscribeModal = o.jb.subscribe),
            (this.setTheme = o.ThemeCtrl.setThemeConfig),
            o.ThemeCtrl.setThemeConfig(e),
            o.ConfigCtrl.setConfig(e),
            this.initUi();
        }
        async initUi() {
          if (typeof window < "u") {
            await Promise.all([s.e(3626), s.e(4839)]).then(s.bind(s, 14839));
            const e = document.createElement("wcm-modal");
            document.body.insertAdjacentElement("beforeend", e),
              o.OptionsCtrl.setIsUiLoaded(!0);
          }
        }
      }
    },
  },
]);

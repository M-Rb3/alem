"use strict";
(self.webpackChunkbos_workspace_gateway =
  self.webpackChunkbos_workspace_gateway || []).push([
  [6831],
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
    22928: (e, t, s) => {
      s.d(t, {
        ConfigCtrl: () => g,
        zv: () => u,
        uA: () => f,
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
          i = (e) => {
            switch (e.status) {
              case "fulfilled":
                return e.value;
              case "rejected":
                throw e.reason;
              default:
                throw e;
            }
          },
          l = new WeakMap(),
          c = (e, t, s = i) => {
            const n = l.get(e);
            if ((null == n ? void 0 : n[0]) === t) return n[1];
            const d = Array.isArray(e)
              ? []
              : Object.create(Object.getPrototypeOf(e));
            return (
              (0, o.jc)(d, !0),
              l.set(e, [t, d]),
              Reflect.ownKeys(e).forEach((t) => {
                if (Object.getOwnPropertyDescriptor(d, t)) return;
                const n = Reflect.get(e, t),
                  i = { value: n, enumerable: !0, configurable: !0 };
                if (r.has(n)) (0, o.jc)(n, !1);
                else if (n instanceof Promise)
                  delete i.value, (i.get = () => s(n));
                else if (a.has(n)) {
                  const [e, t] = a.get(n);
                  i.value = c(e, t(), s);
                }
                Object.defineProperty(d, t, i);
              }),
              Object.preventExtensions(d)
            );
          },
          d = new WeakMap(),
          p = [1, 1],
          u = (i) => {
            if (!n(i)) throw new Error("object required");
            const l = d.get(i);
            if (l) return l;
            let h = p[0];
            const f = new Set(),
              m = (e, t = ++p[0]) => {
                h !== t && ((h = t), f.forEach((s) => s(e, t)));
              };
            let b = p[1];
            const y = (e) => (t, s) => {
                const o = [...t];
                (o[1] = [e, ...o[1]]), m(o, s);
              },
              g = new Map(),
              v = (e) => {
                var t;
                const s = g.get(e);
                s && (g.delete(e), null == (t = s[1]) || t.call(s));
              },
              w = Array.isArray(i)
                ? []
                : Object.create(Object.getPrototypeOf(i)),
              C = t(w, {
                deleteProperty(e, t) {
                  const s = Reflect.get(e, t);
                  v(t);
                  const o = Reflect.deleteProperty(e, t);
                  return o && m(["delete", [t], s]), o;
                },
                set(t, i, l, c) {
                  const p = Reflect.has(t, i),
                    h = Reflect.get(t, i, c);
                  if (p && (e(h, l) || (d.has(l) && e(h, d.get(l))))) return !0;
                  v(i), n(l) && (l = (0, o.o5)(l) || l);
                  let b = l;
                  if (l instanceof Promise)
                    l.then((e) => {
                      (l.status = "fulfilled"),
                        (l.value = e),
                        m(["resolve", [i], e]);
                    }).catch((e) => {
                      (l.status = "rejected"),
                        (l.reason = e),
                        m(["reject", [i], e]);
                    });
                  else {
                    !a.has(l) && s(l) && (b = u(l));
                    const e = !r.has(b) && a.get(b);
                    e &&
                      ((e, t) => {
                        if (g.has(e))
                          throw new Error("prop listener already exists");
                        if (f.size) {
                          const s = t[3](y(e));
                          g.set(e, [t, s]);
                        } else g.set(e, [t]);
                      })(i, e);
                  }
                  return Reflect.set(t, i, b, c), m(["set", [i], l, h]), !0;
                },
              });
            d.set(i, C);
            const I = [
              w,
              (e = ++p[1]) => (
                b === e ||
                  f.size ||
                  ((b = e),
                  g.forEach(([t]) => {
                    const s = t[1](e);
                    s > h && (h = s);
                  })),
                h
              ),
              c,
              (e) => (
                f.add(e),
                1 === f.size &&
                  g.forEach(([e, t], s) => {
                    if (t) throw new Error("remove already exists");
                    const o = e[3](y(s));
                    g.set(s, [e, o]);
                  }),
                () => {
                  f.delete(e),
                    0 === f.size &&
                      g.forEach(([e, t], s) => {
                        t && (t(), g.set(s, [e]));
                      });
                }
              ),
            ];
            return (
              a.set(C, I),
              Reflect.ownKeys(i).forEach((e) => {
                const t = Object.getOwnPropertyDescriptor(i, e);
                "value" in t &&
                  ((C[e] = i[e]), delete t.value, delete t.writable),
                  Object.defineProperty(w, e, t);
              }),
              C
            );
          },
        ) => [u, a, r, e, t, s, i, l, c, d, p])();
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
                localStorage.setItem(u.WCM_VERSION, "2.6.2");
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
        h = l({
          enabled:
            typeof location < "u" &&
            (location.hostname.includes("localhost") ||
              location.protocol.includes("https")),
          userSessionId: "",
          events: [],
          connectedWalletId: void 0,
        }),
        f = {
          state: h,
          subscribe: (e) =>
            c(h.events, () =>
              e(
                (function (e, t) {
                  const s = a.get(e);
                  s || console.warn("Please use proxy object");
                  const [o, n, r] = s;
                  return r(o, n(), void 0);
                })(h.events[h.events.length - 1]),
              ),
            ),
          initialize() {
            h.enabled &&
              typeof (null == crypto ? void 0 : crypto.randomUUID) < "u" &&
              (h.userSessionId = crypto.randomUUID());
          },
          setConnectedWalletId(e) {
            h.connectedWalletId = e;
          },
          click(e) {
            if (h.enabled) {
              const t = {
                type: "CLICK",
                name: e.name,
                userSessionId: h.userSessionId,
                timestamp: Date.now(),
                data: e,
              };
              h.events.push(t);
            }
          },
          track(e) {
            if (h.enabled) {
              const t = {
                type: "TRACK",
                name: e.name,
                userSessionId: h.userSessionId,
                timestamp: Date.now(),
                data: e,
              };
              h.events.push(t);
            }
          },
          view(e) {
            if (h.enabled) {
              const t = {
                type: "VIEW",
                name: e.name,
                userSessionId: h.userSessionId,
                timestamp: Date.now(),
                data: e,
              };
              h.events.push(t);
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
            f.initialize(),
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
        j = "js-2.6.2";
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
        M = async (e) => A("/w3m/v1/getAllListings", e),
        P = (e) =>
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
                { listings: s } = await M(t),
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
          getWalletImageUrl: (e) => P(e),
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
    96831: (e, t, s) => {
      s.d(t, { WalletConnectModal: () => n });
      var o = s(22928);
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
            await Promise.all([s.e(3626), s.e(5259)]).then(s.bind(s, 15259));
            const e = document.createElement("wcm-modal");
            document.body.insertAdjacentElement("beforeend", e),
              o.OptionsCtrl.setIsUiLoaded(!0);
          }
        }
      }
    },
  },
]);

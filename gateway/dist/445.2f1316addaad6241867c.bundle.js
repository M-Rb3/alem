/*! For license information please see 445.2f1316addaad6241867c.bundle.js.LICENSE.txt */
(self.webpackChunkbos_workspace_gateway =
  self.webpackChunkbos_workspace_gateway || []).push([
  [445],
  {
    80445: (t, e, n) => {
      "use strict";
      n.d(e, { default: () => rs });
      var r = n(54178);
      class s {
        static create(...t) {
          return new this(...t);
        }
        mixIn(t) {
          return Object.assign(this, t);
        }
        clone() {
          const t = new this.constructor();
          return Object.assign(t, this), t;
        }
      }
      class o extends s {
        constructor(t = [], e = 4 * t.length) {
          super();
          let n = t;
          if (
            (n instanceof ArrayBuffer && (n = new Uint8Array(n)),
            (n instanceof Int8Array ||
              n instanceof Uint8ClampedArray ||
              n instanceof Int16Array ||
              n instanceof Uint16Array ||
              n instanceof Int32Array ||
              n instanceof Uint32Array ||
              n instanceof Float32Array ||
              n instanceof Float64Array) &&
              (n = new Uint8Array(n.buffer, n.byteOffset, n.byteLength)),
            n instanceof Uint8Array)
          ) {
            const t = n.byteLength,
              e = [];
            for (let r = 0; r < t; r += 1)
              e[r >>> 2] |= n[r] << (24 - (r % 4) * 8);
            (this.words = e), (this.sigBytes = t);
          } else (this.words = t), (this.sigBytes = e);
        }
        static random(t) {
          const e = [],
            n = (t) => {
              let e = t,
                n = 987654321;
              const r = 4294967295;
              return () => {
                (n = (36969 * (65535 & n) + (n >> 16)) & r),
                  (e = (18e3 * (65535 & e) + (e >> 16)) & r);
                let t = ((n << 16) + e) & r;
                return (
                  (t /= 4294967296),
                  (t += 0.5),
                  t * (Math.random() > 0.5 ? 1 : -1)
                );
              };
            };
          for (let r, s = 0; s < t; s += 4) {
            const t = n(4294967296 * (r || Math.random()));
            (r = 987654071 * t()), e.push((4294967296 * t()) | 0);
          }
          return new o(e, t);
        }
        toString(t = i) {
          return t.stringify(this);
        }
        concat(t) {
          const e = this.words,
            n = t.words,
            r = this.sigBytes,
            s = t.sigBytes;
          if ((this.clamp(), r % 4))
            for (let t = 0; t < s; t += 1) {
              const s = (n[t >>> 2] >>> (24 - (t % 4) * 8)) & 255;
              e[(r + t) >>> 2] |= s << (24 - ((r + t) % 4) * 8);
            }
          else for (let t = 0; t < s; t += 4) e[(r + t) >>> 2] = n[t >>> 2];
          return (this.sigBytes += s), this;
        }
        clamp() {
          const { words: t, sigBytes: e } = this;
          (t[e >>> 2] &= 4294967295 << (32 - (e % 4) * 8)),
            (t.length = Math.ceil(e / 4));
        }
        clone() {
          const t = super.clone.call(this);
          return (t.words = this.words.slice(0)), t;
        }
      }
      const i = {
          stringify(t) {
            const { words: e, sigBytes: n } = t,
              r = [];
            for (let t = 0; t < n; t += 1) {
              const n = (e[t >>> 2] >>> (24 - (t % 4) * 8)) & 255;
              r.push((n >>> 4).toString(16)), r.push((15 & n).toString(16));
            }
            return r.join("");
          },
          parse(t) {
            const e = t.length,
              n = [];
            for (let r = 0; r < e; r += 2)
              n[r >>> 3] |= parseInt(t.substr(r, 2), 16) << (24 - (r % 8) * 4);
            return new o(n, e / 2);
          },
        },
        c = {
          stringify(t) {
            const { words: e, sigBytes: n } = t,
              r = [];
            for (let t = 0; t < n; t += 1) {
              const n = (e[t >>> 2] >>> (24 - (t % 4) * 8)) & 255;
              r.push(String.fromCharCode(n));
            }
            return r.join("");
          },
          parse(t) {
            const e = t.length,
              n = [];
            for (let r = 0; r < e; r += 1)
              n[r >>> 2] |= (255 & t.charCodeAt(r)) << (24 - (r % 4) * 8);
            return new o(n, e);
          },
        },
        a = {
          stringify(t) {
            try {
              return decodeURIComponent(escape(c.stringify(t)));
            } catch (t) {
              throw new Error("Malformed UTF-8 data");
            }
          },
          parse: (t) => c.parse(unescape(encodeURIComponent(t))),
        };
      class h extends s {
        constructor() {
          super(), (this._minBufferSize = 0);
        }
        reset() {
          (this._data = new o()), (this._nDataBytes = 0);
        }
        _append(t) {
          let e = t;
          "string" == typeof e && (e = a.parse(e)),
            this._data.concat(e),
            (this._nDataBytes += e.sigBytes);
        }
        _process(t) {
          let e;
          const { _data: n, blockSize: r } = this,
            s = n.words,
            i = n.sigBytes;
          let c = i / (4 * r);
          c = t ? Math.ceil(c) : Math.max((0 | c) - this._minBufferSize, 0);
          const a = c * r,
            h = Math.min(4 * a, i);
          if (a) {
            for (let t = 0; t < a; t += r) this._doProcessBlock(s, t);
            (e = s.splice(0, a)), (n.sigBytes -= h);
          }
          return new o(e, h);
        }
        clone() {
          const t = super.clone.call(this);
          return (t._data = this._data.clone()), t;
        }
      }
      class u extends h {
        constructor(t) {
          super(),
            (this.blockSize = 16),
            (this.cfg = Object.assign(new s(), t)),
            this.reset();
        }
        static _createHelper(t) {
          return (e, n) => new t(n).finalize(e);
        }
        static _createHmacHelper(t) {
          return (e, n) => new l(t, n).finalize(e);
        }
        reset() {
          super.reset.call(this), this._doReset();
        }
        update(t) {
          return this._append(t), this._process(), this;
        }
        finalize(t) {
          return t && this._append(t), this._doFinalize();
        }
      }
      class l extends s {
        constructor(t, e) {
          super();
          const n = new t();
          this._hasher = n;
          let r = e;
          "string" == typeof r && (r = a.parse(r));
          const s = n.blockSize,
            o = 4 * s;
          r.sigBytes > o && (r = n.finalize(e)), r.clamp();
          const i = r.clone();
          this._oKey = i;
          const c = r.clone();
          this._iKey = c;
          const h = i.words,
            u = c.words;
          for (let t = 0; t < s; t += 1)
            (h[t] ^= 1549556828), (u[t] ^= 909522486);
          (i.sigBytes = o), (c.sigBytes = o), this.reset();
        }
        reset() {
          const t = this._hasher;
          t.reset(), t.update(this._iKey);
        }
        update(t) {
          return this._hasher.update(t), this;
        }
        finalize(t) {
          const e = this._hasher,
            n = e.finalize(t);
          return e.reset(), e.finalize(this._oKey.clone().concat(n));
        }
      }
      const p = o;
      class d extends s {
        constructor(t, e) {
          super(), (this.high = t), (this.low = e);
        }
      }
      class f extends s {
        constructor(t = [], e = 8 * t.length) {
          super(), (this.words = t), (this.sigBytes = e);
        }
        toX32() {
          const t = this.words,
            e = t.length,
            n = [];
          for (let r = 0; r < e; r += 1) {
            const e = t[r];
            n.push(e.high), n.push(e.low);
          }
          return p.create(n, this.sigBytes);
        }
        clone() {
          const t = super.clone.call(this);
          t.words = this.words.slice(0);
          const { words: e } = t,
            n = e.length;
          for (let t = 0; t < n; t += 1) e[t] = e[t].clone();
          return t;
        }
      }
      const y = {
          stringify(t) {
            const { words: e, sigBytes: n } = t,
              r = this._map;
            t.clamp();
            const s = [];
            for (let t = 0; t < n; t += 3) {
              const o =
                (((e[t >>> 2] >>> (24 - (t % 4) * 8)) & 255) << 16) |
                (((e[(t + 1) >>> 2] >>> (24 - ((t + 1) % 4) * 8)) & 255) << 8) |
                ((e[(t + 2) >>> 2] >>> (24 - ((t + 2) % 4) * 8)) & 255);
              for (let e = 0; e < 4 && t + 0.75 * e < n; e += 1)
                s.push(r.charAt((o >>> (6 * (3 - e))) & 63));
            }
            const o = r.charAt(64);
            if (o) for (; s.length % 4; ) s.push(o);
            return s.join("");
          },
          parse(t) {
            let e = t.length;
            const n = this._map;
            let r = this._reverseMap;
            if (!r) {
              (this._reverseMap = []), (r = this._reverseMap);
              for (let t = 0; t < n.length; t += 1) r[n.charCodeAt(t)] = t;
            }
            const s = n.charAt(64);
            if (s) {
              const n = t.indexOf(s);
              -1 !== n && (e = n);
            }
            return ((t, e, n) => {
              const r = [];
              let s = 0;
              for (let o = 0; o < e; o += 1)
                if (o % 4) {
                  const e =
                    (n[t.charCodeAt(o - 1)] << ((o % 4) * 2)) |
                    (n[t.charCodeAt(o)] >>> (6 - (o % 4) * 2));
                  (r[s >>> 2] |= e << (24 - (s % 4) * 8)), (s += 1);
                }
              return o.create(r, s);
            })(t, e, r);
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        },
        b = [];
      for (let t = 0; t < 64; t += 1)
        b[t] = (4294967296 * Math.abs(Math.sin(t + 1))) | 0;
      const w = (t, e, n, r, s, o, i) => {
          const c = t + ((e & n) | (~e & r)) + s + i;
          return ((c << o) | (c >>> (32 - o))) + e;
        },
        _ = (t, e, n, r, s, o, i) => {
          const c = t + ((e & r) | (n & ~r)) + s + i;
          return ((c << o) | (c >>> (32 - o))) + e;
        },
        g = (t, e, n, r, s, o, i) => {
          const c = t + (e ^ n ^ r) + s + i;
          return ((c << o) | (c >>> (32 - o))) + e;
        },
        v = (t, e, n, r, s, o, i) => {
          const c = t + (n ^ (e | ~r)) + s + i;
          return ((c << o) | (c >>> (32 - o))) + e;
        };
      class m extends u {
        _doReset() {
          this._hash = new o([1732584193, 4023233417, 2562383102, 271733878]);
        }
        _doProcessBlock(t, e) {
          const n = t;
          for (let r = 0; r < 16; r += 1) {
            const s = e + r,
              o = t[s];
            n[s] =
              (16711935 & ((o << 8) | (o >>> 24))) |
              (4278255360 & ((o << 24) | (o >>> 8)));
          }
          const r = this._hash.words,
            s = n[e + 0],
            o = n[e + 1],
            i = n[e + 2],
            c = n[e + 3],
            a = n[e + 4],
            h = n[e + 5],
            u = n[e + 6],
            l = n[e + 7],
            p = n[e + 8],
            d = n[e + 9],
            f = n[e + 10],
            y = n[e + 11],
            m = n[e + 12],
            S = n[e + 13],
            E = n[e + 14],
            k = n[e + 15];
          let x = r[0],
            T = r[1],
            B = r[2],
            C = r[3];
          (x = w(x, T, B, C, s, 7, b[0])),
            (C = w(C, x, T, B, o, 12, b[1])),
            (B = w(B, C, x, T, i, 17, b[2])),
            (T = w(T, B, C, x, c, 22, b[3])),
            (x = w(x, T, B, C, a, 7, b[4])),
            (C = w(C, x, T, B, h, 12, b[5])),
            (B = w(B, C, x, T, u, 17, b[6])),
            (T = w(T, B, C, x, l, 22, b[7])),
            (x = w(x, T, B, C, p, 7, b[8])),
            (C = w(C, x, T, B, d, 12, b[9])),
            (B = w(B, C, x, T, f, 17, b[10])),
            (T = w(T, B, C, x, y, 22, b[11])),
            (x = w(x, T, B, C, m, 7, b[12])),
            (C = w(C, x, T, B, S, 12, b[13])),
            (B = w(B, C, x, T, E, 17, b[14])),
            (T = w(T, B, C, x, k, 22, b[15])),
            (x = _(x, T, B, C, o, 5, b[16])),
            (C = _(C, x, T, B, u, 9, b[17])),
            (B = _(B, C, x, T, y, 14, b[18])),
            (T = _(T, B, C, x, s, 20, b[19])),
            (x = _(x, T, B, C, h, 5, b[20])),
            (C = _(C, x, T, B, f, 9, b[21])),
            (B = _(B, C, x, T, k, 14, b[22])),
            (T = _(T, B, C, x, a, 20, b[23])),
            (x = _(x, T, B, C, d, 5, b[24])),
            (C = _(C, x, T, B, E, 9, b[25])),
            (B = _(B, C, x, T, c, 14, b[26])),
            (T = _(T, B, C, x, p, 20, b[27])),
            (x = _(x, T, B, C, S, 5, b[28])),
            (C = _(C, x, T, B, i, 9, b[29])),
            (B = _(B, C, x, T, l, 14, b[30])),
            (T = _(T, B, C, x, m, 20, b[31])),
            (x = g(x, T, B, C, h, 4, b[32])),
            (C = g(C, x, T, B, p, 11, b[33])),
            (B = g(B, C, x, T, y, 16, b[34])),
            (T = g(T, B, C, x, E, 23, b[35])),
            (x = g(x, T, B, C, o, 4, b[36])),
            (C = g(C, x, T, B, a, 11, b[37])),
            (B = g(B, C, x, T, l, 16, b[38])),
            (T = g(T, B, C, x, f, 23, b[39])),
            (x = g(x, T, B, C, S, 4, b[40])),
            (C = g(C, x, T, B, s, 11, b[41])),
            (B = g(B, C, x, T, c, 16, b[42])),
            (T = g(T, B, C, x, u, 23, b[43])),
            (x = g(x, T, B, C, d, 4, b[44])),
            (C = g(C, x, T, B, m, 11, b[45])),
            (B = g(B, C, x, T, k, 16, b[46])),
            (T = g(T, B, C, x, i, 23, b[47])),
            (x = v(x, T, B, C, s, 6, b[48])),
            (C = v(C, x, T, B, l, 10, b[49])),
            (B = v(B, C, x, T, E, 15, b[50])),
            (T = v(T, B, C, x, h, 21, b[51])),
            (x = v(x, T, B, C, m, 6, b[52])),
            (C = v(C, x, T, B, c, 10, b[53])),
            (B = v(B, C, x, T, f, 15, b[54])),
            (T = v(T, B, C, x, o, 21, b[55])),
            (x = v(x, T, B, C, p, 6, b[56])),
            (C = v(C, x, T, B, k, 10, b[57])),
            (B = v(B, C, x, T, u, 15, b[58])),
            (T = v(T, B, C, x, S, 21, b[59])),
            (x = v(x, T, B, C, a, 6, b[60])),
            (C = v(C, x, T, B, y, 10, b[61])),
            (B = v(B, C, x, T, i, 15, b[62])),
            (T = v(T, B, C, x, d, 21, b[63])),
            (r[0] = (r[0] + x) | 0),
            (r[1] = (r[1] + T) | 0),
            (r[2] = (r[2] + B) | 0),
            (r[3] = (r[3] + C) | 0);
        }
        _doFinalize() {
          const t = this._data,
            e = t.words,
            n = 8 * this._nDataBytes,
            r = 8 * t.sigBytes;
          e[r >>> 5] |= 128 << (24 - (r % 32));
          const s = Math.floor(n / 4294967296),
            o = n;
          (e[15 + (((r + 64) >>> 9) << 4)] =
            (16711935 & ((s << 8) | (s >>> 24))) |
            (4278255360 & ((s << 24) | (s >>> 8)))),
            (e[14 + (((r + 64) >>> 9) << 4)] =
              (16711935 & ((o << 8) | (o >>> 24))) |
              (4278255360 & ((o << 24) | (o >>> 8)))),
            (t.sigBytes = 4 * (e.length + 1)),
            this._process();
          const i = this._hash,
            c = i.words;
          for (let t = 0; t < 4; t += 1) {
            const e = c[t];
            c[t] =
              (16711935 & ((e << 8) | (e >>> 24))) |
              (4278255360 & ((e << 24) | (e >>> 8)));
          }
          return i;
        }
        clone() {
          const t = super.clone.call(this);
          return (t._hash = this._hash.clone()), t;
        }
      }
      const S = u._createHelper(m),
        E = u._createHmacHelper(m);
      class k extends s {
        constructor(t) {
          super(),
            (this.cfg = Object.assign(
              new s(),
              { keySize: 4, hasher: m, iterations: 1 },
              t,
            ));
        }
        compute(t, e) {
          let n;
          const { cfg: r } = this,
            s = r.hasher.create(),
            i = o.create(),
            c = i.words,
            { keySize: a, iterations: h } = r;
          for (; c.length < a; ) {
            n && s.update(n), (n = s.update(t).finalize(e)), s.reset();
            for (let t = 1; t < h; t += 1) (n = s.finalize(n)), s.reset();
            i.concat(n);
          }
          return (i.sigBytes = 4 * a), i;
        }
      }
      class x extends h {
        constructor(t, e, n) {
          super(),
            (this.cfg = Object.assign(new s(), n)),
            (this._xformMode = t),
            (this._key = e),
            this.reset();
        }
        static createEncryptor(t, e) {
          return this.create(this._ENC_XFORM_MODE, t, e);
        }
        static createDecryptor(t, e) {
          return this.create(this._DEC_XFORM_MODE, t, e);
        }
        static _createHelper(t) {
          const e = (t) => ("string" == typeof t ? D : R);
          return {
            encrypt: (n, r, s) => e(r).encrypt(t, n, r, s),
            decrypt: (n, r, s) => e(r).decrypt(t, n, r, s),
          };
        }
        reset() {
          super.reset.call(this), this._doReset();
        }
        process(t) {
          return this._append(t), this._process();
        }
        finalize(t) {
          return t && this._append(t), this._doFinalize();
        }
      }
      (x._ENC_XFORM_MODE = 1),
        (x._DEC_XFORM_MODE = 2),
        (x.keySize = 4),
        (x.ivSize = 4);
      class T extends x {
        constructor(...t) {
          super(...t), (this.blockSize = 1);
        }
        _doFinalize() {
          return this._process(!0);
        }
      }
      class B extends s {
        constructor(t, e) {
          super(), (this._cipher = t), (this._iv = e);
        }
        static createEncryptor(t, e) {
          return this.Encryptor.create(t, e);
        }
        static createDecryptor(t, e) {
          return this.Decryptor.create(t, e);
        }
      }
      function C(t, e, n) {
        const r = t;
        let s;
        const o = this._iv;
        o ? ((s = o), (this._iv = void 0)) : (s = this._prevBlock);
        for (let t = 0; t < n; t += 1) r[e + t] ^= s[t];
      }
      class O extends B {}
      (O.Encryptor = class extends O {
        processBlock(t, e) {
          const n = this._cipher,
            { blockSize: r } = n;
          C.call(this, t, e, r),
            n.encryptBlock(t, e),
            (this._prevBlock = t.slice(e, e + r));
        }
      }),
        (O.Decryptor = class extends O {
          processBlock(t, e) {
            const n = this._cipher,
              { blockSize: r } = n,
              s = t.slice(e, e + r);
            n.decryptBlock(t, e), C.call(this, t, e, r), (this._prevBlock = s);
          }
        });
      const I = {
        pad(t, e) {
          const n = 4 * e,
            r = n - (t.sigBytes % n),
            s = (r << 24) | (r << 16) | (r << 8) | r,
            i = [];
          for (let t = 0; t < r; t += 4) i.push(s);
          const c = o.create(i, r);
          t.concat(c);
        },
        unpad(t) {
          const e = t,
            n = 255 & e.words[(e.sigBytes - 1) >>> 2];
          e.sigBytes -= n;
        },
      };
      class A extends x {
        constructor(t, e, n) {
          super(t, e, Object.assign({ mode: O, padding: I }, n)),
            (this.blockSize = 4);
        }
        reset() {
          let t;
          super.reset.call(this);
          const { cfg: e } = this,
            { iv: n, mode: r } = e;
          this._xformMode === this.constructor._ENC_XFORM_MODE
            ? (t = r.createEncryptor)
            : ((t = r.createDecryptor), (this._minBufferSize = 1)),
            (this._mode = t.call(r, this, n && n.words)),
            (this._mode.__creator = t);
        }
        _doProcessBlock(t, e) {
          this._mode.processBlock(t, e);
        }
        _doFinalize() {
          let t;
          const { padding: e } = this.cfg;
          return (
            this._xformMode === this.constructor._ENC_XFORM_MODE
              ? (e.pad(this._data, this.blockSize), (t = this._process(!0)))
              : ((t = this._process(!0)), e.unpad(t)),
            t
          );
        }
      }
      class H extends s {
        constructor(t) {
          super(), this.mixIn(t);
        }
        toString(t) {
          return (t || this.formatter).stringify(this);
        }
      }
      const P = {
        stringify(t) {
          let e;
          const { ciphertext: n, salt: r } = t;
          return (
            (e = r
              ? o.create([1398893684, 1701076831]).concat(r).concat(n)
              : n),
            e.toString(y)
          );
        },
        parse(t) {
          let e;
          const n = y.parse(t),
            r = n.words;
          return (
            1398893684 === r[0] &&
              1701076831 === r[1] &&
              ((e = o.create(r.slice(2, 4))),
              r.splice(0, 4),
              (n.sigBytes -= 16)),
            H.create({ ciphertext: n, salt: e })
          );
        },
      };
      class R extends s {
        static encrypt(t, e, n, r) {
          const o = Object.assign(new s(), this.cfg, r),
            i = t.createEncryptor(n, o),
            c = i.finalize(e),
            a = i.cfg;
          return H.create({
            ciphertext: c,
            key: n,
            iv: a.iv,
            algorithm: t,
            mode: a.mode,
            padding: a.padding,
            blockSize: i.blockSize,
            formatter: o.format,
          });
        }
        static decrypt(t, e, n, r) {
          let o = e;
          const i = Object.assign(new s(), this.cfg, r);
          return (
            (o = this._parse(o, i.format)),
            t.createDecryptor(n, i).finalize(o.ciphertext)
          );
        }
        static _parse(t, e) {
          return "string" == typeof t ? e.parse(t, this) : t;
        }
      }
      R.cfg = Object.assign(new s(), { format: P });
      const z = {
        execute(t, e, n, r) {
          let s = r;
          s || (s = o.random(8));
          const i = k.create({ keySize: e + n }).compute(t, s),
            c = o.create(i.words.slice(e), 4 * n);
          return (i.sigBytes = 4 * e), H.create({ key: i, iv: c, salt: s });
        },
      };
      class D extends R {
        static encrypt(t, e, n, r) {
          const o = Object.assign(new s(), this.cfg, r),
            i = o.kdf.execute(n, t.keySize, t.ivSize);
          o.iv = i.iv;
          const c = R.encrypt.call(this, t, e, i.key, o);
          return c.mixIn(i), c;
        }
        static decrypt(t, e, n, r) {
          let o = e;
          const i = Object.assign(new s(), this.cfg, r);
          o = this._parse(o, i.format);
          const c = i.kdf.execute(n, t.keySize, t.ivSize, o.salt);
          return (i.iv = c.iv), R.decrypt.call(this, t, o, c.key, i);
        }
      }
      D.cfg = Object.assign(R.cfg, { kdf: z });
      const M = (t) => ((t << 8) & 4278255360) | ((t >>> 8) & 16711935),
        j = {
          stringify(t) {
            const { words: e, sigBytes: n } = t,
              r = [];
            for (let t = 0; t < n; t += 2) {
              const n = (e[t >>> 2] >>> (16 - (t % 4) * 8)) & 65535;
              r.push(String.fromCharCode(n));
            }
            return r.join("");
          },
          parse(t) {
            const e = t.length,
              n = [];
            for (let r = 0; r < e; r += 1)
              n[r >>> 1] |= t.charCodeAt(r) << (16 - (r % 2) * 16);
            return o.create(n, 2 * e);
          },
        },
        N = j,
        F = {
          stringify(t) {
            const { words: e, sigBytes: n } = t,
              r = [];
            for (let t = 0; t < n; t += 2) {
              const n = M((e[t >>> 2] >>> (16 - (t % 4) * 8)) & 65535);
              r.push(String.fromCharCode(n));
            }
            return r.join("");
          },
          parse(t) {
            const e = t.length,
              n = [];
            for (let r = 0; r < e; r += 1)
              n[r >>> 1] |= M(t.charCodeAt(r) << (16 - (r % 2) * 16));
            return o.create(n, 2 * e);
          },
        },
        L = [];
      class U extends u {
        _doReset() {
          this._hash = new o([
            1732584193, 4023233417, 2562383102, 271733878, 3285377520,
          ]);
        }
        _doProcessBlock(t, e) {
          const n = this._hash.words;
          let r = n[0],
            s = n[1],
            o = n[2],
            i = n[3],
            c = n[4];
          for (let n = 0; n < 80; n += 1) {
            if (n < 16) L[n] = 0 | t[e + n];
            else {
              const t = L[n - 3] ^ L[n - 8] ^ L[n - 14] ^ L[n - 16];
              L[n] = (t << 1) | (t >>> 31);
            }
            let a = ((r << 5) | (r >>> 27)) + c + L[n];
            (a +=
              n < 20
                ? 1518500249 + ((s & o) | (~s & i))
                : n < 40
                  ? 1859775393 + (s ^ o ^ i)
                  : n < 60
                    ? ((s & o) | (s & i) | (o & i)) - 1894007588
                    : (s ^ o ^ i) - 899497514),
              (c = i),
              (i = o),
              (o = (s << 30) | (s >>> 2)),
              (s = r),
              (r = a);
          }
          (n[0] = (n[0] + r) | 0),
            (n[1] = (n[1] + s) | 0),
            (n[2] = (n[2] + o) | 0),
            (n[3] = (n[3] + i) | 0),
            (n[4] = (n[4] + c) | 0);
        }
        _doFinalize() {
          const t = this._data,
            e = t.words,
            n = 8 * this._nDataBytes,
            r = 8 * t.sigBytes;
          return (
            (e[r >>> 5] |= 128 << (24 - (r % 32))),
            (e[14 + (((r + 64) >>> 9) << 4)] = Math.floor(n / 4294967296)),
            (e[15 + (((r + 64) >>> 9) << 4)] = n),
            (t.sigBytes = 4 * e.length),
            this._process(),
            this._hash
          );
        }
        clone() {
          const t = super.clone.call(this);
          return (t._hash = this._hash.clone()), t;
        }
      }
      const K = u._createHelper(U),
        V = u._createHmacHelper(U),
        $ = [],
        W = [],
        q = (t) => {
          const e = Math.sqrt(t);
          for (let n = 2; n <= e; n += 1) if (!(t % n)) return !1;
          return !0;
        },
        X = (t) => (4294967296 * (t - (0 | t))) | 0;
      let Y = 2,
        G = 0;
      for (; G < 64; )
        q(Y) &&
          (G < 8 && ($[G] = X(Y ** 0.5)), (W[G] = X(Y ** (1 / 3))), (G += 1)),
          (Y += 1);
      const Q = [];
      class Z extends u {
        _doReset() {
          this._hash = new o($.slice(0));
        }
        _doProcessBlock(t, e) {
          const n = this._hash.words;
          let r = n[0],
            s = n[1],
            o = n[2],
            i = n[3],
            c = n[4],
            a = n[5],
            h = n[6],
            u = n[7];
          for (let n = 0; n < 64; n += 1) {
            if (n < 16) Q[n] = 0 | t[e + n];
            else {
              const t = Q[n - 15],
                e =
                  ((t << 25) | (t >>> 7)) ^
                  ((t << 14) | (t >>> 18)) ^
                  (t >>> 3),
                r = Q[n - 2],
                s =
                  ((r << 15) | (r >>> 17)) ^
                  ((r << 13) | (r >>> 19)) ^
                  (r >>> 10);
              Q[n] = e + Q[n - 7] + s + Q[n - 16];
            }
            const l = (r & s) ^ (r & o) ^ (s & o),
              p =
                ((r << 30) | (r >>> 2)) ^
                ((r << 19) | (r >>> 13)) ^
                ((r << 10) | (r >>> 22)),
              d =
                u +
                (((c << 26) | (c >>> 6)) ^
                  ((c << 21) | (c >>> 11)) ^
                  ((c << 7) | (c >>> 25))) +
                ((c & a) ^ (~c & h)) +
                W[n] +
                Q[n];
            (u = h),
              (h = a),
              (a = c),
              (c = (i + d) | 0),
              (i = o),
              (o = s),
              (s = r),
              (r = (d + (p + l)) | 0);
          }
          (n[0] = (n[0] + r) | 0),
            (n[1] = (n[1] + s) | 0),
            (n[2] = (n[2] + o) | 0),
            (n[3] = (n[3] + i) | 0),
            (n[4] = (n[4] + c) | 0),
            (n[5] = (n[5] + a) | 0),
            (n[6] = (n[6] + h) | 0),
            (n[7] = (n[7] + u) | 0);
        }
        _doFinalize() {
          const t = this._data,
            e = t.words,
            n = 8 * this._nDataBytes,
            r = 8 * t.sigBytes;
          return (
            (e[r >>> 5] |= 128 << (24 - (r % 32))),
            (e[14 + (((r + 64) >>> 9) << 4)] = Math.floor(n / 4294967296)),
            (e[15 + (((r + 64) >>> 9) << 4)] = n),
            (t.sigBytes = 4 * e.length),
            this._process(),
            this._hash
          );
        }
        clone() {
          const t = super.clone.call(this);
          return (t._hash = this._hash.clone()), t;
        }
      }
      const J = u._createHelper(Z),
        tt = u._createHmacHelper(Z);
      class et extends Z {
        _doReset() {
          this._hash = new o([
            3238371032, 914150663, 812702999, 4144912697, 4290775857,
            1750603025, 1694076839, 3204075428,
          ]);
        }
        _doFinalize() {
          const t = super._doFinalize.call(this);
          return (t.sigBytes -= 4), t;
        }
      }
      const nt = Z._createHelper(et),
        rt = Z._createHmacHelper(et),
        st = [
          new d(1116352408, 3609767458),
          new d(1899447441, 602891725),
          new d(3049323471, 3964484399),
          new d(3921009573, 2173295548),
          new d(961987163, 4081628472),
          new d(1508970993, 3053834265),
          new d(2453635748, 2937671579),
          new d(2870763221, 3664609560),
          new d(3624381080, 2734883394),
          new d(310598401, 1164996542),
          new d(607225278, 1323610764),
          new d(1426881987, 3590304994),
          new d(1925078388, 4068182383),
          new d(2162078206, 991336113),
          new d(2614888103, 633803317),
          new d(3248222580, 3479774868),
          new d(3835390401, 2666613458),
          new d(4022224774, 944711139),
          new d(264347078, 2341262773),
          new d(604807628, 2007800933),
          new d(770255983, 1495990901),
          new d(1249150122, 1856431235),
          new d(1555081692, 3175218132),
          new d(1996064986, 2198950837),
          new d(2554220882, 3999719339),
          new d(2821834349, 766784016),
          new d(2952996808, 2566594879),
          new d(3210313671, 3203337956),
          new d(3336571891, 1034457026),
          new d(3584528711, 2466948901),
          new d(113926993, 3758326383),
          new d(338241895, 168717936),
          new d(666307205, 1188179964),
          new d(773529912, 1546045734),
          new d(1294757372, 1522805485),
          new d(1396182291, 2643833823),
          new d(1695183700, 2343527390),
          new d(1986661051, 1014477480),
          new d(2177026350, 1206759142),
          new d(2456956037, 344077627),
          new d(2730485921, 1290863460),
          new d(2820302411, 3158454273),
          new d(3259730800, 3505952657),
          new d(3345764771, 106217008),
          new d(3516065817, 3606008344),
          new d(3600352804, 1432725776),
          new d(4094571909, 1467031594),
          new d(275423344, 851169720),
          new d(430227734, 3100823752),
          new d(506948616, 1363258195),
          new d(659060556, 3750685593),
          new d(883997877, 3785050280),
          new d(958139571, 3318307427),
          new d(1322822218, 3812723403),
          new d(1537002063, 2003034995),
          new d(1747873779, 3602036899),
          new d(1955562222, 1575990012),
          new d(2024104815, 1125592928),
          new d(2227730452, 2716904306),
          new d(2361852424, 442776044),
          new d(2428436474, 593698344),
          new d(2756734187, 3733110249),
          new d(3204031479, 2999351573),
          new d(3329325298, 3815920427),
          new d(3391569614, 3928383900),
          new d(3515267271, 566280711),
          new d(3940187606, 3454069534),
          new d(4118630271, 4000239992),
          new d(116418474, 1914138554),
          new d(174292421, 2731055270),
          new d(289380356, 3203993006),
          new d(460393269, 320620315),
          new d(685471733, 587496836),
          new d(852142971, 1086792851),
          new d(1017036298, 365543100),
          new d(1126000580, 2618297676),
          new d(1288033470, 3409855158),
          new d(1501505948, 4234509866),
          new d(1607167915, 987167468),
          new d(1816402316, 1246189591),
        ],
        ot = [];
      for (let t = 0; t < 80; t += 1) ot[t] = new d();
      class it extends u {
        constructor() {
          super(), (this.blockSize = 32);
        }
        _doReset() {
          this._hash = new f([
            new d(1779033703, 4089235720),
            new d(3144134277, 2227873595),
            new d(1013904242, 4271175723),
            new d(2773480762, 1595750129),
            new d(1359893119, 2917565137),
            new d(2600822924, 725511199),
            new d(528734635, 4215389547),
            new d(1541459225, 327033209),
          ]);
        }
        _doProcessBlock(t, e) {
          const n = this._hash.words,
            r = n[0],
            s = n[1],
            o = n[2],
            i = n[3],
            c = n[4],
            a = n[5],
            h = n[6],
            u = n[7],
            l = r.high;
          let p = r.low;
          const d = s.high;
          let f = s.low;
          const y = o.high;
          let b = o.low;
          const w = i.high;
          let _ = i.low;
          const g = c.high;
          let v = c.low;
          const m = a.high;
          let S = a.low;
          const E = h.high;
          let k = h.low;
          const x = u.high;
          let T = u.low,
            B = l,
            C = p,
            O = d,
            I = f,
            A = y,
            H = b,
            P = w,
            R = _,
            z = g,
            D = v,
            M = m,
            j = S,
            N = E,
            F = k,
            L = x,
            U = T;
          for (let n = 0; n < 80; n += 1) {
            let r, s;
            const o = ot[n];
            if (n < 16)
              (o.high = 0 | t[e + 2 * n]),
                (s = o.high),
                (o.low = 0 | t[e + 2 * n + 1]),
                (r = o.low);
            else {
              const t = ot[n - 15],
                e = t.high,
                i = t.low,
                c =
                  ((e >>> 1) | (i << 31)) ^ ((e >>> 8) | (i << 24)) ^ (e >>> 7),
                a =
                  ((i >>> 1) | (e << 31)) ^
                  ((i >>> 8) | (e << 24)) ^
                  ((i >>> 7) | (e << 25)),
                h = ot[n - 2],
                u = h.high,
                l = h.low,
                p =
                  ((u >>> 19) | (l << 13)) ^
                  ((u << 3) | (l >>> 29)) ^
                  (u >>> 6),
                d =
                  ((l >>> 19) | (u << 13)) ^
                  ((l << 3) | (u >>> 29)) ^
                  ((l >>> 6) | (u << 26)),
                f = ot[n - 7],
                y = f.high,
                b = f.low,
                w = ot[n - 16],
                _ = w.high,
                g = w.low;
              (r = a + b),
                (s = c + y + (r >>> 0 < a >>> 0 ? 1 : 0)),
                (r += d),
                (s = s + p + (r >>> 0 < d >>> 0 ? 1 : 0)),
                (r += g),
                (s = s + _ + (r >>> 0 < g >>> 0 ? 1 : 0)),
                (o.high = s),
                (o.low = r);
            }
            const i = (z & M) ^ (~z & N),
              c = (D & j) ^ (~D & F),
              a = (B & O) ^ (B & A) ^ (O & A),
              h = (C & I) ^ (C & H) ^ (I & H),
              u =
                ((B >>> 28) | (C << 4)) ^
                ((B << 30) | (C >>> 2)) ^
                ((B << 25) | (C >>> 7)),
              l =
                ((C >>> 28) | (B << 4)) ^
                ((C << 30) | (B >>> 2)) ^
                ((C << 25) | (B >>> 7)),
              p =
                ((z >>> 14) | (D << 18)) ^
                ((z >>> 18) | (D << 14)) ^
                ((z << 23) | (D >>> 9)),
              d =
                ((D >>> 14) | (z << 18)) ^
                ((D >>> 18) | (z << 14)) ^
                ((D << 23) | (z >>> 9)),
              f = st[n],
              y = f.high,
              b = f.low;
            let w = U + d,
              _ = L + p + (w >>> 0 < U >>> 0 ? 1 : 0);
            (w += c),
              (_ = _ + i + (w >>> 0 < c >>> 0 ? 1 : 0)),
              (w += b),
              (_ = _ + y + (w >>> 0 < b >>> 0 ? 1 : 0)),
              (w += r),
              (_ = _ + s + (w >>> 0 < r >>> 0 ? 1 : 0));
            const g = l + h;
            (L = N),
              (U = F),
              (N = M),
              (F = j),
              (M = z),
              (j = D),
              (D = (R + w) | 0),
              (z = (P + _ + (D >>> 0 < R >>> 0 ? 1 : 0)) | 0),
              (P = A),
              (R = H),
              (A = O),
              (H = I),
              (O = B),
              (I = C),
              (C = (w + g) | 0),
              (B =
                (_ +
                  (u + a + (g >>> 0 < l >>> 0 ? 1 : 0)) +
                  (C >>> 0 < w >>> 0 ? 1 : 0)) |
                0);
          }
          (r.low = p + C),
            (p = r.low),
            (r.high = l + B + (p >>> 0 < C >>> 0 ? 1 : 0)),
            (s.low = f + I),
            (f = s.low),
            (s.high = d + O + (f >>> 0 < I >>> 0 ? 1 : 0)),
            (o.low = b + H),
            (b = o.low),
            (o.high = y + A + (b >>> 0 < H >>> 0 ? 1 : 0)),
            (i.low = _ + R),
            (_ = i.low),
            (i.high = w + P + (_ >>> 0 < R >>> 0 ? 1 : 0)),
            (c.low = v + D),
            (v = c.low),
            (c.high = g + z + (v >>> 0 < D >>> 0 ? 1 : 0)),
            (a.low = S + j),
            (S = a.low),
            (a.high = m + M + (S >>> 0 < j >>> 0 ? 1 : 0)),
            (h.low = k + F),
            (k = h.low),
            (h.high = E + N + (k >>> 0 < F >>> 0 ? 1 : 0)),
            (u.low = T + U),
            (T = u.low),
            (u.high = x + L + (T >>> 0 < U >>> 0 ? 1 : 0));
        }
        _doFinalize() {
          const t = this._data,
            e = t.words,
            n = 8 * this._nDataBytes,
            r = 8 * t.sigBytes;
          return (
            (e[r >>> 5] |= 128 << (24 - (r % 32))),
            (e[30 + (((r + 128) >>> 10) << 5)] = Math.floor(n / 4294967296)),
            (e[31 + (((r + 128) >>> 10) << 5)] = n),
            (t.sigBytes = 4 * e.length),
            this._process(),
            this._hash.toX32()
          );
        }
        clone() {
          const t = super.clone.call(this);
          return (t._hash = this._hash.clone()), t;
        }
      }
      const ct = u._createHelper(it),
        at = u._createHmacHelper(it);
      class ht extends it {
        _doReset() {
          this._hash = new f([
            new d(3418070365, 3238371032),
            new d(1654270250, 914150663),
            new d(2438529370, 812702999),
            new d(355462360, 4144912697),
            new d(1731405415, 4290775857),
            new d(2394180231, 1750603025),
            new d(3675008525, 1694076839),
            new d(1203062813, 3204075428),
          ]);
        }
        _doFinalize() {
          const t = super._doFinalize.call(this);
          return (t.sigBytes -= 16), t;
        }
      }
      const ut = it._createHelper(ht),
        lt = it._createHmacHelper(ht),
        pt = [],
        dt = [],
        ft = [];
      let yt = 1,
        bt = 0;
      for (let t = 0; t < 24; t += 1) {
        pt[yt + 5 * bt] = (((t + 1) * (t + 2)) / 2) % 64;
        const e = (2 * yt + 3 * bt) % 5;
        (yt = bt % 5), (bt = e);
      }
      for (let t = 0; t < 5; t += 1)
        for (let e = 0; e < 5; e += 1)
          dt[t + 5 * e] = e + ((2 * t + 3 * e) % 5) * 5;
      let wt = 1;
      for (let t = 0; t < 24; t += 1) {
        let e = 0,
          n = 0;
        for (let t = 0; t < 7; t += 1) {
          if (1 & wt) {
            const r = (1 << t) - 1;
            r < 32 ? (n ^= 1 << r) : (e ^= 1 << (r - 32));
          }
          128 & wt ? (wt = (wt << 1) ^ 113) : (wt <<= 1);
        }
        ft[t] = d.create(e, n);
      }
      const _t = [];
      for (let t = 0; t < 25; t += 1) _t[t] = d.create();
      class gt extends u {
        constructor(t) {
          super(Object.assign({ outputLength: 512 }, t));
        }
        _doReset() {
          this._state = [];
          const t = this._state;
          for (let e = 0; e < 25; e += 1) t[e] = new d();
          this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
        }
        _doProcessBlock(t, e) {
          const n = this._state,
            r = this.blockSize / 2;
          for (let s = 0; s < r; s += 1) {
            let r = t[e + 2 * s],
              o = t[e + 2 * s + 1];
            (r =
              (16711935 & ((r << 8) | (r >>> 24))) |
              (4278255360 & ((r << 24) | (r >>> 8)))),
              (o =
                (16711935 & ((o << 8) | (o >>> 24))) |
                (4278255360 & ((o << 24) | (o >>> 8))));
            const i = n[s];
            (i.high ^= o), (i.low ^= r);
          }
          for (let t = 0; t < 24; t += 1) {
            for (let t = 0; t < 5; t += 1) {
              let e = 0,
                r = 0;
              for (let s = 0; s < 5; s += 1) {
                const o = n[t + 5 * s];
                (e ^= o.high), (r ^= o.low);
              }
              const s = _t[t];
              (s.high = e), (s.low = r);
            }
            for (let t = 0; t < 5; t += 1) {
              const e = _t[(t + 4) % 5],
                r = _t[(t + 1) % 5],
                s = r.high,
                o = r.low,
                i = e.high ^ ((s << 1) | (o >>> 31)),
                c = e.low ^ ((o << 1) | (s >>> 31));
              for (let e = 0; e < 5; e += 1) {
                const r = n[t + 5 * e];
                (r.high ^= i), (r.low ^= c);
              }
            }
            for (let t = 1; t < 25; t += 1) {
              let e, r;
              const s = n[t],
                o = s.high,
                i = s.low,
                c = pt[t];
              c < 32
                ? ((e = (o << c) | (i >>> (32 - c))),
                  (r = (i << c) | (o >>> (32 - c))))
                : ((e = (i << (c - 32)) | (o >>> (64 - c))),
                  (r = (o << (c - 32)) | (i >>> (64 - c))));
              const a = _t[dt[t]];
              (a.high = e), (a.low = r);
            }
            const e = _t[0],
              r = n[0];
            (e.high = r.high), (e.low = r.low);
            for (let t = 0; t < 5; t += 1)
              for (let e = 0; e < 5; e += 1) {
                const r = t + 5 * e,
                  s = n[r],
                  o = _t[r],
                  i = _t[((t + 1) % 5) + 5 * e],
                  c = _t[((t + 2) % 5) + 5 * e];
                (s.high = o.high ^ (~i.high & c.high)),
                  (s.low = o.low ^ (~i.low & c.low));
              }
            const s = n[0],
              o = ft[t];
            (s.high ^= o.high), (s.low ^= o.low);
          }
        }
        _doFinalize() {
          const t = this._data,
            e = t.words,
            n = 8 * t.sigBytes,
            r = 32 * this.blockSize;
          (e[n >>> 5] |= 1 << (24 - (n % 32))),
            (e[((Math.ceil((n + 1) / r) * r) >>> 5) - 1] |= 128),
            (t.sigBytes = 4 * e.length),
            this._process();
          const s = this._state,
            i = this.cfg.outputLength / 8,
            c = i / 8,
            a = [];
          for (let t = 0; t < c; t += 1) {
            const e = s[t];
            let n = e.high,
              r = e.low;
            (n =
              (16711935 & ((n << 8) | (n >>> 24))) |
              (4278255360 & ((n << 24) | (n >>> 8)))),
              (r =
                (16711935 & ((r << 8) | (r >>> 24))) |
                (4278255360 & ((r << 24) | (r >>> 8)))),
              a.push(r),
              a.push(n);
          }
          return new o(a, i);
        }
        clone() {
          const t = super.clone.call(this);
          t._state = this._state.slice(0);
          const e = t._state;
          for (let t = 0; t < 25; t += 1) e[t] = e[t].clone();
          return t;
        }
      }
      const vt = u._createHelper(gt),
        mt = u._createHmacHelper(gt),
        St = o.create([
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10,
          6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7,
          0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5,
          6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13,
        ]),
        Et = o.create([
          5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0,
          13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8,
          12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10,
          14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11,
        ]),
        kt = o.create([
          11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13,
          11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13,
          15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5,
          6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5,
          6,
        ]),
        xt = o.create([
          8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7,
          12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14,
          12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9,
          12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11,
        ]),
        Tt = o.create([0, 1518500249, 1859775393, 2400959708, 2840853838]),
        Bt = o.create([1352829926, 1548603684, 1836072691, 2053994217, 0]),
        Ct = (t, e, n) => t ^ e ^ n,
        Ot = (t, e, n) => (t & e) | (~t & n),
        It = (t, e, n) => (t | ~e) ^ n,
        At = (t, e, n) => (t & n) | (e & ~n),
        Ht = (t, e, n) => t ^ (e | ~n),
        Pt = (t, e) => (t << e) | (t >>> (32 - e));
      class Rt extends u {
        _doReset() {
          this._hash = o.create([
            1732584193, 4023233417, 2562383102, 271733878, 3285377520,
          ]);
        }
        _doProcessBlock(t, e) {
          const n = t;
          for (let t = 0; t < 16; t += 1) {
            const r = e + t,
              s = n[r];
            n[r] =
              (16711935 & ((s << 8) | (s >>> 24))) |
              (4278255360 & ((s << 24) | (s >>> 8)));
          }
          const r = this._hash.words,
            s = Tt.words,
            o = Bt.words,
            i = St.words,
            c = Et.words,
            a = kt.words,
            h = xt.words;
          let u,
            l = r[0],
            p = r[1],
            d = r[2],
            f = r[3],
            y = r[4],
            b = r[0],
            w = r[1],
            _ = r[2],
            g = r[3],
            v = r[4];
          for (let t = 0; t < 80; t += 1)
            (u = (l + n[e + i[t]]) | 0),
              (u +=
                t < 16
                  ? Ct(p, d, f) + s[0]
                  : t < 32
                    ? Ot(p, d, f) + s[1]
                    : t < 48
                      ? It(p, d, f) + s[2]
                      : t < 64
                        ? At(p, d, f) + s[3]
                        : Ht(p, d, f) + s[4]),
              (u |= 0),
              (u = Pt(u, a[t])),
              (u = (u + y) | 0),
              (l = y),
              (y = f),
              (f = Pt(d, 10)),
              (d = p),
              (p = u),
              (u = (b + n[e + c[t]]) | 0),
              (u +=
                t < 16
                  ? Ht(w, _, g) + o[0]
                  : t < 32
                    ? At(w, _, g) + o[1]
                    : t < 48
                      ? It(w, _, g) + o[2]
                      : t < 64
                        ? Ot(w, _, g) + o[3]
                        : Ct(w, _, g) + o[4]),
              (u |= 0),
              (u = Pt(u, h[t])),
              (u = (u + v) | 0),
              (b = v),
              (v = g),
              (g = Pt(_, 10)),
              (_ = w),
              (w = u);
          (u = (r[1] + d + g) | 0),
            (r[1] = (r[2] + f + v) | 0),
            (r[2] = (r[3] + y + b) | 0),
            (r[3] = (r[4] + l + w) | 0),
            (r[4] = (r[0] + p + _) | 0),
            (r[0] = u);
        }
        _doFinalize() {
          const t = this._data,
            e = t.words,
            n = 8 * this._nDataBytes,
            r = 8 * t.sigBytes;
          (e[r >>> 5] |= 128 << (24 - (r % 32))),
            (e[14 + (((r + 64) >>> 9) << 4)] =
              (16711935 & ((n << 8) | (n >>> 24))) |
              (4278255360 & ((n << 24) | (n >>> 8)))),
            (t.sigBytes = 4 * (e.length + 1)),
            this._process();
          const s = this._hash,
            o = s.words;
          for (let t = 0; t < 5; t += 1) {
            const e = o[t];
            o[t] =
              (16711935 & ((e << 8) | (e >>> 24))) |
              (4278255360 & ((e << 24) | (e >>> 8)));
          }
          return s;
        }
        clone() {
          const t = super.clone.call(this);
          return (t._hash = this._hash.clone()), t;
        }
      }
      const zt = u._createHelper(Rt),
        Dt = u._createHmacHelper(Rt);
      class Mt extends s {
        constructor(t) {
          super(),
            (this.cfg = Object.assign(
              new s(),
              { keySize: 4, hasher: U, iterations: 1 },
              t,
            ));
        }
        compute(t, e) {
          const { cfg: n } = this,
            r = l.create(n.hasher, t),
            s = o.create(),
            i = o.create([1]),
            c = s.words,
            a = i.words,
            { keySize: h, iterations: u } = n;
          for (; c.length < h; ) {
            const t = r.update(e).finalize(i);
            r.reset();
            const n = t.words,
              o = n.length;
            let c = t;
            for (let t = 1; t < u; t += 1) {
              (c = r.finalize(c)), r.reset();
              const t = c.words;
              for (let e = 0; e < o; e += 1) n[e] ^= t[e];
            }
            s.concat(t), (a[0] += 1);
          }
          return (s.sigBytes = 4 * h), s;
        }
      }
      const jt = [],
        Nt = [],
        Ft = [],
        Lt = [],
        Ut = [],
        Kt = [],
        Vt = [],
        $t = [],
        Wt = [],
        qt = [],
        Xt = [];
      for (let t = 0; t < 256; t += 1)
        Xt[t] = t < 128 ? t << 1 : (t << 1) ^ 283;
      let Yt = 0,
        Gt = 0;
      for (let t = 0; t < 256; t += 1) {
        let t = Gt ^ (Gt << 1) ^ (Gt << 2) ^ (Gt << 3) ^ (Gt << 4);
        (t = (t >>> 8) ^ (255 & t) ^ 99), (jt[Yt] = t), (Nt[t] = Yt);
        const e = Xt[Yt],
          n = Xt[e],
          r = Xt[n];
        let s = (257 * Xt[t]) ^ (16843008 * t);
        (Ft[Yt] = (s << 24) | (s >>> 8)),
          (Lt[Yt] = (s << 16) | (s >>> 16)),
          (Ut[Yt] = (s << 8) | (s >>> 24)),
          (Kt[Yt] = s),
          (s = (16843009 * r) ^ (65537 * n) ^ (257 * e) ^ (16843008 * Yt)),
          (Vt[t] = (s << 24) | (s >>> 8)),
          ($t[t] = (s << 16) | (s >>> 16)),
          (Wt[t] = (s << 8) | (s >>> 24)),
          (qt[t] = s),
          Yt
            ? ((Yt = e ^ Xt[Xt[Xt[r ^ e]]]), (Gt ^= Xt[Xt[Gt]]))
            : ((Gt = 1), (Yt = Gt));
      }
      const Qt = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
      class Zt extends A {
        _doReset() {
          let t;
          if (this._nRounds && this._keyPriorReset === this._key) return;
          this._keyPriorReset = this._key;
          const e = this._keyPriorReset,
            n = e.words,
            r = e.sigBytes / 4;
          this._nRounds = r + 6;
          const s = 4 * (this._nRounds + 1);
          this._keySchedule = [];
          const o = this._keySchedule;
          for (let e = 0; e < s; e += 1)
            e < r
              ? (o[e] = n[e])
              : ((t = o[e - 1]),
                e % r
                  ? r > 6 &&
                    e % r == 4 &&
                    (t =
                      (jt[t >>> 24] << 24) |
                      (jt[(t >>> 16) & 255] << 16) |
                      (jt[(t >>> 8) & 255] << 8) |
                      jt[255 & t])
                  : ((t = (t << 8) | (t >>> 24)),
                    (t =
                      (jt[t >>> 24] << 24) |
                      (jt[(t >>> 16) & 255] << 16) |
                      (jt[(t >>> 8) & 255] << 8) |
                      jt[255 & t]),
                    (t ^= Qt[(e / r) | 0] << 24)),
                (o[e] = o[e - r] ^ t));
          this._invKeySchedule = [];
          const i = this._invKeySchedule;
          for (let e = 0; e < s; e += 1) {
            const n = s - e;
            (t = e % 4 ? o[n] : o[n - 4]),
              (i[e] =
                e < 4 || n <= 4
                  ? t
                  : Vt[jt[t >>> 24]] ^
                    $t[jt[(t >>> 16) & 255]] ^
                    Wt[jt[(t >>> 8) & 255]] ^
                    qt[jt[255 & t]]);
          }
        }
        encryptBlock(t, e) {
          this._doCryptBlock(t, e, this._keySchedule, Ft, Lt, Ut, Kt, jt);
        }
        decryptBlock(t, e) {
          const n = t;
          let r = n[e + 1];
          (n[e + 1] = n[e + 3]),
            (n[e + 3] = r),
            this._doCryptBlock(n, e, this._invKeySchedule, Vt, $t, Wt, qt, Nt),
            (r = n[e + 1]),
            (n[e + 1] = n[e + 3]),
            (n[e + 3] = r);
        }
        _doCryptBlock(t, e, n, r, s, o, i, c) {
          const a = t,
            h = this._nRounds;
          let u = a[e] ^ n[0],
            l = a[e + 1] ^ n[1],
            p = a[e + 2] ^ n[2],
            d = a[e + 3] ^ n[3],
            f = 4;
          for (let t = 1; t < h; t += 1) {
            const t =
              r[u >>> 24] ^
              s[(l >>> 16) & 255] ^
              o[(p >>> 8) & 255] ^
              i[255 & d] ^
              n[f];
            f += 1;
            const e =
              r[l >>> 24] ^
              s[(p >>> 16) & 255] ^
              o[(d >>> 8) & 255] ^
              i[255 & u] ^
              n[f];
            f += 1;
            const c =
              r[p >>> 24] ^
              s[(d >>> 16) & 255] ^
              o[(u >>> 8) & 255] ^
              i[255 & l] ^
              n[f];
            f += 1;
            const a =
              r[d >>> 24] ^
              s[(u >>> 16) & 255] ^
              o[(l >>> 8) & 255] ^
              i[255 & p] ^
              n[f];
            (f += 1), (u = t), (l = e), (p = c), (d = a);
          }
          const y =
            ((c[u >>> 24] << 24) |
              (c[(l >>> 16) & 255] << 16) |
              (c[(p >>> 8) & 255] << 8) |
              c[255 & d]) ^
            n[f];
          f += 1;
          const b =
            ((c[l >>> 24] << 24) |
              (c[(p >>> 16) & 255] << 16) |
              (c[(d >>> 8) & 255] << 8) |
              c[255 & u]) ^
            n[f];
          f += 1;
          const w =
            ((c[p >>> 24] << 24) |
              (c[(d >>> 16) & 255] << 16) |
              (c[(u >>> 8) & 255] << 8) |
              c[255 & l]) ^
            n[f];
          f += 1;
          const _ =
            ((c[d >>> 24] << 24) |
              (c[(u >>> 16) & 255] << 16) |
              (c[(l >>> 8) & 255] << 8) |
              c[255 & p]) ^
            n[f];
          (f += 1), (a[e] = y), (a[e + 1] = b), (a[e + 2] = w), (a[e + 3] = _);
        }
      }
      Zt.keySize = 8;
      const Jt = A._createHelper(Zt),
        te = [
          57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51,
          43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7,
          62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20,
          12, 4,
        ],
        ee = [
          14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16,
          7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44,
          49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32,
        ],
        ne = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28],
        re = [
          {
            0: 8421888,
            268435456: 32768,
            536870912: 8421378,
            805306368: 2,
            1073741824: 512,
            1342177280: 8421890,
            1610612736: 8389122,
            1879048192: 8388608,
            2147483648: 514,
            2415919104: 8389120,
            2684354560: 33280,
            2952790016: 8421376,
            3221225472: 32770,
            3489660928: 8388610,
            3758096384: 0,
            4026531840: 33282,
            134217728: 0,
            402653184: 8421890,
            671088640: 33282,
            939524096: 32768,
            1207959552: 8421888,
            1476395008: 512,
            1744830464: 8421378,
            2013265920: 2,
            2281701376: 8389120,
            2550136832: 33280,
            2818572288: 8421376,
            3087007744: 8389122,
            3355443200: 8388610,
            3623878656: 32770,
            3892314112: 514,
            4160749568: 8388608,
            1: 32768,
            268435457: 2,
            536870913: 8421888,
            805306369: 8388608,
            1073741825: 8421378,
            1342177281: 33280,
            1610612737: 512,
            1879048193: 8389122,
            2147483649: 8421890,
            2415919105: 8421376,
            2684354561: 8388610,
            2952790017: 33282,
            3221225473: 514,
            3489660929: 8389120,
            3758096385: 32770,
            4026531841: 0,
            134217729: 8421890,
            402653185: 8421376,
            671088641: 8388608,
            939524097: 512,
            1207959553: 32768,
            1476395009: 8388610,
            1744830465: 2,
            2013265921: 33282,
            2281701377: 32770,
            2550136833: 8389122,
            2818572289: 514,
            3087007745: 8421888,
            3355443201: 8389120,
            3623878657: 0,
            3892314113: 33280,
            4160749569: 8421378,
          },
          {
            0: 1074282512,
            16777216: 16384,
            33554432: 524288,
            50331648: 1074266128,
            67108864: 1073741840,
            83886080: 1074282496,
            100663296: 1073758208,
            117440512: 16,
            134217728: 540672,
            150994944: 1073758224,
            167772160: 1073741824,
            184549376: 540688,
            201326592: 524304,
            218103808: 0,
            234881024: 16400,
            251658240: 1074266112,
            8388608: 1073758208,
            25165824: 540688,
            41943040: 16,
            58720256: 1073758224,
            75497472: 1074282512,
            92274688: 1073741824,
            109051904: 524288,
            125829120: 1074266128,
            142606336: 524304,
            159383552: 0,
            176160768: 16384,
            192937984: 1074266112,
            209715200: 1073741840,
            226492416: 540672,
            243269632: 1074282496,
            260046848: 16400,
            268435456: 0,
            285212672: 1074266128,
            301989888: 1073758224,
            318767104: 1074282496,
            335544320: 1074266112,
            352321536: 16,
            369098752: 540688,
            385875968: 16384,
            402653184: 16400,
            419430400: 524288,
            436207616: 524304,
            452984832: 1073741840,
            469762048: 540672,
            486539264: 1073758208,
            503316480: 1073741824,
            520093696: 1074282512,
            276824064: 540688,
            293601280: 524288,
            310378496: 1074266112,
            327155712: 16384,
            343932928: 1073758208,
            360710144: 1074282512,
            377487360: 16,
            394264576: 1073741824,
            411041792: 1074282496,
            427819008: 1073741840,
            444596224: 1073758224,
            461373440: 524304,
            478150656: 0,
            494927872: 16400,
            511705088: 1074266128,
            528482304: 540672,
          },
          {
            0: 260,
            1048576: 0,
            2097152: 67109120,
            3145728: 65796,
            4194304: 65540,
            5242880: 67108868,
            6291456: 67174660,
            7340032: 67174400,
            8388608: 67108864,
            9437184: 67174656,
            10485760: 65792,
            11534336: 67174404,
            12582912: 67109124,
            13631488: 65536,
            14680064: 4,
            15728640: 256,
            524288: 67174656,
            1572864: 67174404,
            2621440: 0,
            3670016: 67109120,
            4718592: 67108868,
            5767168: 65536,
            6815744: 65540,
            7864320: 260,
            8912896: 4,
            9961472: 256,
            11010048: 67174400,
            12058624: 65796,
            13107200: 65792,
            14155776: 67109124,
            15204352: 67174660,
            16252928: 67108864,
            16777216: 67174656,
            17825792: 65540,
            18874368: 65536,
            19922944: 67109120,
            20971520: 256,
            22020096: 67174660,
            23068672: 67108868,
            24117248: 0,
            25165824: 67109124,
            26214400: 67108864,
            27262976: 4,
            28311552: 65792,
            29360128: 67174400,
            30408704: 260,
            31457280: 65796,
            32505856: 67174404,
            17301504: 67108864,
            18350080: 260,
            19398656: 67174656,
            20447232: 0,
            21495808: 65540,
            22544384: 67109120,
            23592960: 256,
            24641536: 67174404,
            25690112: 65536,
            26738688: 67174660,
            27787264: 65796,
            28835840: 67108868,
            29884416: 67109124,
            30932992: 67174400,
            31981568: 4,
            33030144: 65792,
          },
          {
            0: 2151682048,
            65536: 2147487808,
            131072: 4198464,
            196608: 2151677952,
            262144: 0,
            327680: 4198400,
            393216: 2147483712,
            458752: 4194368,
            524288: 2147483648,
            589824: 4194304,
            655360: 64,
            720896: 2147487744,
            786432: 2151678016,
            851968: 4160,
            917504: 4096,
            983040: 2151682112,
            32768: 2147487808,
            98304: 64,
            163840: 2151678016,
            229376: 2147487744,
            294912: 4198400,
            360448: 2151682112,
            425984: 0,
            491520: 2151677952,
            557056: 4096,
            622592: 2151682048,
            688128: 4194304,
            753664: 4160,
            819200: 2147483648,
            884736: 4194368,
            950272: 4198464,
            1015808: 2147483712,
            1048576: 4194368,
            1114112: 4198400,
            1179648: 2147483712,
            1245184: 0,
            1310720: 4160,
            1376256: 2151678016,
            1441792: 2151682048,
            1507328: 2147487808,
            1572864: 2151682112,
            1638400: 2147483648,
            1703936: 2151677952,
            1769472: 4198464,
            1835008: 2147487744,
            1900544: 4194304,
            1966080: 64,
            2031616: 4096,
            1081344: 2151677952,
            1146880: 2151682112,
            1212416: 0,
            1277952: 4198400,
            1343488: 4194368,
            1409024: 2147483648,
            1474560: 2147487808,
            1540096: 64,
            1605632: 2147483712,
            1671168: 4096,
            1736704: 2147487744,
            1802240: 2151678016,
            1867776: 4160,
            1933312: 2151682048,
            1998848: 4194304,
            2064384: 4198464,
          },
          {
            0: 128,
            4096: 17039360,
            8192: 262144,
            12288: 536870912,
            16384: 537133184,
            20480: 16777344,
            24576: 553648256,
            28672: 262272,
            32768: 16777216,
            36864: 537133056,
            40960: 536871040,
            45056: 553910400,
            49152: 553910272,
            53248: 0,
            57344: 17039488,
            61440: 553648128,
            2048: 17039488,
            6144: 553648256,
            10240: 128,
            14336: 17039360,
            18432: 262144,
            22528: 537133184,
            26624: 553910272,
            30720: 536870912,
            34816: 537133056,
            38912: 0,
            43008: 553910400,
            47104: 16777344,
            51200: 536871040,
            55296: 553648128,
            59392: 16777216,
            63488: 262272,
            65536: 262144,
            69632: 128,
            73728: 536870912,
            77824: 553648256,
            81920: 16777344,
            86016: 553910272,
            90112: 537133184,
            94208: 16777216,
            98304: 553910400,
            102400: 553648128,
            106496: 17039360,
            110592: 537133056,
            114688: 262272,
            118784: 536871040,
            122880: 0,
            126976: 17039488,
            67584: 553648256,
            71680: 16777216,
            75776: 17039360,
            79872: 537133184,
            83968: 536870912,
            88064: 17039488,
            92160: 128,
            96256: 553910272,
            100352: 262272,
            104448: 553910400,
            108544: 0,
            112640: 553648128,
            116736: 16777344,
            120832: 262144,
            124928: 537133056,
            129024: 536871040,
          },
          {
            0: 268435464,
            256: 8192,
            512: 270532608,
            768: 270540808,
            1024: 268443648,
            1280: 2097152,
            1536: 2097160,
            1792: 268435456,
            2048: 0,
            2304: 268443656,
            2560: 2105344,
            2816: 8,
            3072: 270532616,
            3328: 2105352,
            3584: 8200,
            3840: 270540800,
            128: 270532608,
            384: 270540808,
            640: 8,
            896: 2097152,
            1152: 2105352,
            1408: 268435464,
            1664: 268443648,
            1920: 8200,
            2176: 2097160,
            2432: 8192,
            2688: 268443656,
            2944: 270532616,
            3200: 0,
            3456: 270540800,
            3712: 2105344,
            3968: 268435456,
            4096: 268443648,
            4352: 270532616,
            4608: 270540808,
            4864: 8200,
            5120: 2097152,
            5376: 268435456,
            5632: 268435464,
            5888: 2105344,
            6144: 2105352,
            6400: 0,
            6656: 8,
            6912: 270532608,
            7168: 8192,
            7424: 268443656,
            7680: 270540800,
            7936: 2097160,
            4224: 8,
            4480: 2105344,
            4736: 2097152,
            4992: 268435464,
            5248: 268443648,
            5504: 8200,
            5760: 270540808,
            6016: 270532608,
            6272: 270540800,
            6528: 270532616,
            6784: 8192,
            7040: 2105352,
            7296: 2097160,
            7552: 0,
            7808: 268435456,
            8064: 268443656,
          },
          {
            0: 1048576,
            16: 33555457,
            32: 1024,
            48: 1049601,
            64: 34604033,
            80: 0,
            96: 1,
            112: 34603009,
            128: 33555456,
            144: 1048577,
            160: 33554433,
            176: 34604032,
            192: 34603008,
            208: 1025,
            224: 1049600,
            240: 33554432,
            8: 34603009,
            24: 0,
            40: 33555457,
            56: 34604032,
            72: 1048576,
            88: 33554433,
            104: 33554432,
            120: 1025,
            136: 1049601,
            152: 33555456,
            168: 34603008,
            184: 1048577,
            200: 1024,
            216: 34604033,
            232: 1,
            248: 1049600,
            256: 33554432,
            272: 1048576,
            288: 33555457,
            304: 34603009,
            320: 1048577,
            336: 33555456,
            352: 34604032,
            368: 1049601,
            384: 1025,
            400: 34604033,
            416: 1049600,
            432: 1,
            448: 0,
            464: 34603008,
            480: 33554433,
            496: 1024,
            264: 1049600,
            280: 33555457,
            296: 34603009,
            312: 1,
            328: 33554432,
            344: 1048576,
            360: 1025,
            376: 34604032,
            392: 33554433,
            408: 34603008,
            424: 0,
            440: 34604033,
            456: 1049601,
            472: 1024,
            488: 33555456,
            504: 1048577,
          },
          {
            0: 134219808,
            1: 131072,
            2: 134217728,
            3: 32,
            4: 131104,
            5: 134350880,
            6: 134350848,
            7: 2048,
            8: 134348800,
            9: 134219776,
            10: 133120,
            11: 134348832,
            12: 2080,
            13: 0,
            14: 134217760,
            15: 133152,
            2147483648: 2048,
            2147483649: 134350880,
            2147483650: 134219808,
            2147483651: 134217728,
            2147483652: 134348800,
            2147483653: 133120,
            2147483654: 133152,
            2147483655: 32,
            2147483656: 134217760,
            2147483657: 2080,
            2147483658: 131104,
            2147483659: 134350848,
            2147483660: 0,
            2147483661: 134348832,
            2147483662: 134219776,
            2147483663: 131072,
            16: 133152,
            17: 134350848,
            18: 32,
            19: 2048,
            20: 134219776,
            21: 134217760,
            22: 134348832,
            23: 131072,
            24: 0,
            25: 131104,
            26: 134348800,
            27: 134219808,
            28: 134350880,
            29: 133120,
            30: 2080,
            31: 134217728,
            2147483664: 131072,
            2147483665: 2048,
            2147483666: 134348832,
            2147483667: 133152,
            2147483668: 32,
            2147483669: 134348800,
            2147483670: 134217728,
            2147483671: 134219808,
            2147483672: 134350880,
            2147483673: 134217760,
            2147483674: 134219776,
            2147483675: 0,
            2147483676: 133120,
            2147483677: 2080,
            2147483678: 131104,
            2147483679: 134350848,
          },
        ],
        se = [
          4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504,
          2147483679,
        ];
      function oe(t, e) {
        const n = ((this._lBlock >>> t) ^ this._rBlock) & e;
        (this._rBlock ^= n), (this._lBlock ^= n << t);
      }
      function ie(t, e) {
        const n = ((this._rBlock >>> t) ^ this._lBlock) & e;
        (this._lBlock ^= n), (this._rBlock ^= n << t);
      }
      class ce extends A {
        _doReset() {
          const t = this._key.words,
            e = [];
          for (let n = 0; n < 56; n += 1) {
            const r = te[n] - 1;
            e[n] = (t[r >>> 5] >>> (31 - (r % 32))) & 1;
          }
          this._subKeys = [];
          const n = this._subKeys;
          for (let t = 0; t < 16; t += 1) {
            n[t] = [];
            const r = n[t],
              s = ne[t];
            for (let t = 0; t < 24; t += 1)
              (r[(t / 6) | 0] |= e[(ee[t] - 1 + s) % 28] << (31 - (t % 6))),
                (r[4 + ((t / 6) | 0)] |=
                  e[28 + ((ee[t + 24] - 1 + s) % 28)] << (31 - (t % 6)));
            r[0] = (r[0] << 1) | (r[0] >>> 31);
            for (let t = 1; t < 7; t += 1) r[t] >>>= 4 * (t - 1) + 3;
            r[7] = (r[7] << 5) | (r[7] >>> 27);
          }
          this._invSubKeys = [];
          const r = this._invSubKeys;
          for (let t = 0; t < 16; t += 1) r[t] = n[15 - t];
        }
        encryptBlock(t, e) {
          this._doCryptBlock(t, e, this._subKeys);
        }
        decryptBlock(t, e) {
          this._doCryptBlock(t, e, this._invSubKeys);
        }
        _doCryptBlock(t, e, n) {
          const r = t;
          (this._lBlock = t[e]),
            (this._rBlock = t[e + 1]),
            oe.call(this, 4, 252645135),
            oe.call(this, 16, 65535),
            ie.call(this, 2, 858993459),
            ie.call(this, 8, 16711935),
            oe.call(this, 1, 1431655765);
          for (let t = 0; t < 16; t += 1) {
            const e = n[t],
              r = this._lBlock,
              s = this._rBlock;
            let o = 0;
            for (let t = 0; t < 8; t += 1)
              o |= re[t][((s ^ e[t]) & se[t]) >>> 0];
            (this._lBlock = s), (this._rBlock = r ^ o);
          }
          const s = this._lBlock;
          (this._lBlock = this._rBlock),
            (this._rBlock = s),
            oe.call(this, 1, 1431655765),
            ie.call(this, 8, 16711935),
            ie.call(this, 2, 858993459),
            oe.call(this, 16, 65535),
            oe.call(this, 4, 252645135),
            (r[e] = this._lBlock),
            (r[e + 1] = this._rBlock);
        }
      }
      (ce.keySize = 2), (ce.ivSize = 2), (ce.blockSize = 2);
      const ae = A._createHelper(ce);
      class he extends A {
        _doReset() {
          const t = this._key.words;
          if (2 !== t.length && 4 !== t.length && t.length < 6)
            throw new Error(
              "Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.",
            );
          const e = t.slice(0, 2),
            n = t.length < 4 ? t.slice(0, 2) : t.slice(2, 4),
            r = t.length < 6 ? t.slice(0, 2) : t.slice(4, 6);
          (this._des1 = ce.createEncryptor(o.create(e))),
            (this._des2 = ce.createEncryptor(o.create(n))),
            (this._des3 = ce.createEncryptor(o.create(r)));
        }
        encryptBlock(t, e) {
          this._des1.encryptBlock(t, e),
            this._des2.decryptBlock(t, e),
            this._des3.encryptBlock(t, e);
        }
        decryptBlock(t, e) {
          this._des3.decryptBlock(t, e),
            this._des2.encryptBlock(t, e),
            this._des1.decryptBlock(t, e);
        }
      }
      (he.keySize = 6), (he.ivSize = 2), (he.blockSize = 2);
      const ue = A._createHelper(he),
        le = [],
        pe = [],
        de = [];
      function fe() {
        const t = this._X,
          e = this._C;
        for (let t = 0; t < 8; t += 1) pe[t] = e[t];
        (e[0] = (e[0] + 1295307597 + this._b) | 0),
          (e[1] = (e[1] + 3545052371 + (e[0] >>> 0 < pe[0] >>> 0 ? 1 : 0)) | 0),
          (e[2] = (e[2] + 886263092 + (e[1] >>> 0 < pe[1] >>> 0 ? 1 : 0)) | 0),
          (e[3] = (e[3] + 1295307597 + (e[2] >>> 0 < pe[2] >>> 0 ? 1 : 0)) | 0),
          (e[4] = (e[4] + 3545052371 + (e[3] >>> 0 < pe[3] >>> 0 ? 1 : 0)) | 0),
          (e[5] = (e[5] + 886263092 + (e[4] >>> 0 < pe[4] >>> 0 ? 1 : 0)) | 0),
          (e[6] = (e[6] + 1295307597 + (e[5] >>> 0 < pe[5] >>> 0 ? 1 : 0)) | 0),
          (e[7] = (e[7] + 3545052371 + (e[6] >>> 0 < pe[6] >>> 0 ? 1 : 0)) | 0),
          (this._b = e[7] >>> 0 < pe[7] >>> 0 ? 1 : 0);
        for (let n = 0; n < 8; n += 1) {
          const r = t[n] + e[n],
            s = 65535 & r,
            o = r >>> 16,
            i = ((((s * s) >>> 17) + s * o) >>> 15) + o * o,
            c = (((4294901760 & r) * r) | 0) + (((65535 & r) * r) | 0);
          de[n] = i ^ c;
        }
        (t[0] =
          (de[0] +
            ((de[7] << 16) | (de[7] >>> 16)) +
            ((de[6] << 16) | (de[6] >>> 16))) |
          0),
          (t[1] = (de[1] + ((de[0] << 8) | (de[0] >>> 24)) + de[7]) | 0),
          (t[2] =
            (de[2] +
              ((de[1] << 16) | (de[1] >>> 16)) +
              ((de[0] << 16) | (de[0] >>> 16))) |
            0),
          (t[3] = (de[3] + ((de[2] << 8) | (de[2] >>> 24)) + de[1]) | 0),
          (t[4] =
            (de[4] +
              ((de[3] << 16) | (de[3] >>> 16)) +
              ((de[2] << 16) | (de[2] >>> 16))) |
            0),
          (t[5] = (de[5] + ((de[4] << 8) | (de[4] >>> 24)) + de[3]) | 0),
          (t[6] =
            (de[6] +
              ((de[5] << 16) | (de[5] >>> 16)) +
              ((de[4] << 16) | (de[4] >>> 16))) |
            0),
          (t[7] = (de[7] + ((de[6] << 8) | (de[6] >>> 24)) + de[5]) | 0);
      }
      class ye extends T {
        constructor(...t) {
          super(...t), (this.blockSize = 4), (this.ivSize = 2);
        }
        _doReset() {
          const t = this._key.words,
            { iv: e } = this.cfg;
          for (let e = 0; e < 4; e += 1)
            t[e] =
              (16711935 & ((t[e] << 8) | (t[e] >>> 24))) |
              (4278255360 & ((t[e] << 24) | (t[e] >>> 8)));
          this._X = [
            t[0],
            (t[3] << 16) | (t[2] >>> 16),
            t[1],
            (t[0] << 16) | (t[3] >>> 16),
            t[2],
            (t[1] << 16) | (t[0] >>> 16),
            t[3],
            (t[2] << 16) | (t[1] >>> 16),
          ];
          const n = this._X;
          this._C = [
            (t[2] << 16) | (t[2] >>> 16),
            (4294901760 & t[0]) | (65535 & t[1]),
            (t[3] << 16) | (t[3] >>> 16),
            (4294901760 & t[1]) | (65535 & t[2]),
            (t[0] << 16) | (t[0] >>> 16),
            (4294901760 & t[2]) | (65535 & t[3]),
            (t[1] << 16) | (t[1] >>> 16),
            (4294901760 & t[3]) | (65535 & t[0]),
          ];
          const r = this._C;
          this._b = 0;
          for (let t = 0; t < 4; t += 1) fe.call(this);
          for (let t = 0; t < 8; t += 1) r[t] ^= n[(t + 4) & 7];
          if (e) {
            const t = e.words,
              n = t[0],
              s = t[1],
              o =
                (16711935 & ((n << 8) | (n >>> 24))) |
                (4278255360 & ((n << 24) | (n >>> 8))),
              i =
                (16711935 & ((s << 8) | (s >>> 24))) |
                (4278255360 & ((s << 24) | (s >>> 8))),
              c = (o >>> 16) | (4294901760 & i),
              a = (i << 16) | (65535 & o);
            (r[0] ^= o),
              (r[1] ^= c),
              (r[2] ^= i),
              (r[3] ^= a),
              (r[4] ^= o),
              (r[5] ^= c),
              (r[6] ^= i),
              (r[7] ^= a);
            for (let t = 0; t < 4; t += 1) fe.call(this);
          }
        }
        _doProcessBlock(t, e) {
          const n = t,
            r = this._X;
          fe.call(this),
            (le[0] = r[0] ^ (r[5] >>> 16) ^ (r[3] << 16)),
            (le[1] = r[2] ^ (r[7] >>> 16) ^ (r[5] << 16)),
            (le[2] = r[4] ^ (r[1] >>> 16) ^ (r[7] << 16)),
            (le[3] = r[6] ^ (r[3] >>> 16) ^ (r[1] << 16));
          for (let t = 0; t < 4; t += 1)
            (le[t] =
              (16711935 & ((le[t] << 8) | (le[t] >>> 24))) |
              (4278255360 & ((le[t] << 24) | (le[t] >>> 8)))),
              (n[e + t] ^= le[t]);
        }
      }
      const be = T._createHelper(ye),
        we = [],
        _e = [],
        ge = [];
      function ve() {
        const t = this._X,
          e = this._C;
        for (let t = 0; t < 8; t += 1) _e[t] = e[t];
        (e[0] = (e[0] + 1295307597 + this._b) | 0),
          (e[1] = (e[1] + 3545052371 + (e[0] >>> 0 < _e[0] >>> 0 ? 1 : 0)) | 0),
          (e[2] = (e[2] + 886263092 + (e[1] >>> 0 < _e[1] >>> 0 ? 1 : 0)) | 0),
          (e[3] = (e[3] + 1295307597 + (e[2] >>> 0 < _e[2] >>> 0 ? 1 : 0)) | 0),
          (e[4] = (e[4] + 3545052371 + (e[3] >>> 0 < _e[3] >>> 0 ? 1 : 0)) | 0),
          (e[5] = (e[5] + 886263092 + (e[4] >>> 0 < _e[4] >>> 0 ? 1 : 0)) | 0),
          (e[6] = (e[6] + 1295307597 + (e[5] >>> 0 < _e[5] >>> 0 ? 1 : 0)) | 0),
          (e[7] = (e[7] + 3545052371 + (e[6] >>> 0 < _e[6] >>> 0 ? 1 : 0)) | 0),
          (this._b = e[7] >>> 0 < _e[7] >>> 0 ? 1 : 0);
        for (let n = 0; n < 8; n += 1) {
          const r = t[n] + e[n],
            s = 65535 & r,
            o = r >>> 16,
            i = ((((s * s) >>> 17) + s * o) >>> 15) + o * o,
            c = (((4294901760 & r) * r) | 0) + (((65535 & r) * r) | 0);
          ge[n] = i ^ c;
        }
        (t[0] =
          (ge[0] +
            ((ge[7] << 16) | (ge[7] >>> 16)) +
            ((ge[6] << 16) | (ge[6] >>> 16))) |
          0),
          (t[1] = (ge[1] + ((ge[0] << 8) | (ge[0] >>> 24)) + ge[7]) | 0),
          (t[2] =
            (ge[2] +
              ((ge[1] << 16) | (ge[1] >>> 16)) +
              ((ge[0] << 16) | (ge[0] >>> 16))) |
            0),
          (t[3] = (ge[3] + ((ge[2] << 8) | (ge[2] >>> 24)) + ge[1]) | 0),
          (t[4] =
            (ge[4] +
              ((ge[3] << 16) | (ge[3] >>> 16)) +
              ((ge[2] << 16) | (ge[2] >>> 16))) |
            0),
          (t[5] = (ge[5] + ((ge[4] << 8) | (ge[4] >>> 24)) + ge[3]) | 0),
          (t[6] =
            (ge[6] +
              ((ge[5] << 16) | (ge[5] >>> 16)) +
              ((ge[4] << 16) | (ge[4] >>> 16))) |
            0),
          (t[7] = (ge[7] + ((ge[6] << 8) | (ge[6] >>> 24)) + ge[5]) | 0);
      }
      class me extends T {
        constructor(...t) {
          super(...t), (this.blockSize = 4), (this.ivSize = 2);
        }
        _doReset() {
          const t = this._key.words,
            { iv: e } = this.cfg;
          this._X = [
            t[0],
            (t[3] << 16) | (t[2] >>> 16),
            t[1],
            (t[0] << 16) | (t[3] >>> 16),
            t[2],
            (t[1] << 16) | (t[0] >>> 16),
            t[3],
            (t[2] << 16) | (t[1] >>> 16),
          ];
          const n = this._X;
          this._C = [
            (t[2] << 16) | (t[2] >>> 16),
            (4294901760 & t[0]) | (65535 & t[1]),
            (t[3] << 16) | (t[3] >>> 16),
            (4294901760 & t[1]) | (65535 & t[2]),
            (t[0] << 16) | (t[0] >>> 16),
            (4294901760 & t[2]) | (65535 & t[3]),
            (t[1] << 16) | (t[1] >>> 16),
            (4294901760 & t[3]) | (65535 & t[0]),
          ];
          const r = this._C;
          this._b = 0;
          for (let t = 0; t < 4; t += 1) ve.call(this);
          for (let t = 0; t < 8; t += 1) r[t] ^= n[(t + 4) & 7];
          if (e) {
            const t = e.words,
              n = t[0],
              s = t[1],
              o =
                (16711935 & ((n << 8) | (n >>> 24))) |
                (4278255360 & ((n << 24) | (n >>> 8))),
              i =
                (16711935 & ((s << 8) | (s >>> 24))) |
                (4278255360 & ((s << 24) | (s >>> 8))),
              c = (o >>> 16) | (4294901760 & i),
              a = (i << 16) | (65535 & o);
            (r[0] ^= o),
              (r[1] ^= c),
              (r[2] ^= i),
              (r[3] ^= a),
              (r[4] ^= o),
              (r[5] ^= c),
              (r[6] ^= i),
              (r[7] ^= a);
            for (let t = 0; t < 4; t += 1) ve.call(this);
          }
        }
        _doProcessBlock(t, e) {
          const n = t,
            r = this._X;
          ve.call(this),
            (we[0] = r[0] ^ (r[5] >>> 16) ^ (r[3] << 16)),
            (we[1] = r[2] ^ (r[7] >>> 16) ^ (r[5] << 16)),
            (we[2] = r[4] ^ (r[1] >>> 16) ^ (r[7] << 16)),
            (we[3] = r[6] ^ (r[3] >>> 16) ^ (r[1] << 16));
          for (let t = 0; t < 4; t += 1)
            (we[t] =
              (16711935 & ((we[t] << 8) | (we[t] >>> 24))) |
              (4278255360 & ((we[t] << 24) | (we[t] >>> 8)))),
              (n[e + t] ^= we[t]);
        }
      }
      const Se = T._createHelper(me);
      function Ee() {
        const t = this._S;
        let e = this._i,
          n = this._j,
          r = 0;
        for (let s = 0; s < 4; s += 1) {
          (e = (e + 1) % 256), (n = (n + t[e]) % 256);
          const o = t[e];
          (t[e] = t[n]),
            (t[n] = o),
            (r |= t[(t[e] + t[n]) % 256] << (24 - 8 * s));
        }
        return (this._i = e), (this._j = n), r;
      }
      class ke extends T {
        _doReset() {
          const t = this._key,
            e = t.words,
            n = t.sigBytes;
          this._S = [];
          const r = this._S;
          for (let t = 0; t < 256; t += 1) r[t] = t;
          for (let t = 0, s = 0; t < 256; t += 1) {
            const o = t % n,
              i = (e[o >>> 2] >>> (24 - (o % 4) * 8)) & 255;
            s = (s + r[t] + i) % 256;
            const c = r[t];
            (r[t] = r[s]), (r[s] = c);
          }
          (this._j = 0), (this._i = this._j);
        }
        _doProcessBlock(t, e) {
          t[e] ^= Ee.call(this);
        }
      }
      (ke.keySize = 8), (ke.ivSize = 0);
      const xe = T._createHelper(ke);
      class Te extends ke {
        constructor(...t) {
          super(...t), Object.assign(this.cfg, { drop: 192 });
        }
        _doReset() {
          super._doReset.call(this);
          for (let t = this.cfg.drop; t > 0; t -= 1) Ee.call(this);
        }
      }
      const Be = T._createHelper(Te);
      function Ce(t, e, n, r) {
        const s = t;
        let o;
        const i = this._iv;
        i ? ((o = i.slice(0)), (this._iv = void 0)) : (o = this._prevBlock),
          r.encryptBlock(o, 0);
        for (let t = 0; t < n; t += 1) s[e + t] ^= o[t];
      }
      class Oe extends B {}
      (Oe.Encryptor = class extends Oe {
        processBlock(t, e) {
          const n = this._cipher,
            { blockSize: r } = n;
          Ce.call(this, t, e, r, n), (this._prevBlock = t.slice(e, e + r));
        }
      }),
        (Oe.Decryptor = class extends Oe {
          processBlock(t, e) {
            const n = this._cipher,
              { blockSize: r } = n,
              s = t.slice(e, e + r);
            Ce.call(this, t, e, r, n), (this._prevBlock = s);
          }
        });
      class Ie extends B {}
      (Ie.Encryptor = class extends Ie {
        processBlock(t, e) {
          const n = t,
            r = this._cipher,
            { blockSize: s } = r,
            o = this._iv;
          let i = this._counter;
          o &&
            ((this._counter = o.slice(0)),
            (i = this._counter),
            (this._iv = void 0));
          const c = i.slice(0);
          r.encryptBlock(c, 0), (i[s - 1] = (i[s - 1] + 1) | 0);
          for (let t = 0; t < s; t += 1) n[e + t] ^= c[t];
        }
      }),
        (Ie.Decryptor = Ie.Encryptor);
      const Ae = (t) => {
        let e = t;
        if (255 == ((t >> 24) & 255)) {
          let n = (t >> 16) & 255,
            r = (t >> 8) & 255,
            s = 255 & t;
          255 === n
            ? ((n = 0),
              255 === r ? ((r = 0), 255 === s ? (s = 0) : (s += 1)) : (r += 1))
            : (n += 1),
            (e = 0),
            (e += n << 16),
            (e += r << 8),
            (e += s);
        } else e += 1 << 24;
        return e;
      };
      class He extends B {}
      (He.Encryptor = class extends He {
        processBlock(t, e) {
          const n = t,
            r = this._cipher,
            { blockSize: s } = r,
            o = this._iv;
          let i = this._counter;
          o &&
            ((this._counter = o.slice(0)),
            (i = this._counter),
            (this._iv = void 0)),
            ((t) => {
              const e = t;
              (e[0] = Ae(e[0])), 0 === e[0] && (e[1] = Ae(e[1]));
            })(i);
          const c = i.slice(0);
          r.encryptBlock(c, 0);
          for (let t = 0; t < s; t += 1) n[e + t] ^= c[t];
        }
      }),
        (He.Decryptor = He.Encryptor);
      class Pe extends B {}
      (Pe.Encryptor = class extends Pe {
        processBlock(t, e) {
          this._cipher.encryptBlock(t, e);
        }
      }),
        (Pe.Decryptor = class extends Pe {
          processBlock(t, e) {
            this._cipher.decryptBlock(t, e);
          }
        });
      class Re extends B {}
      (Re.Encryptor = class extends Re {
        processBlock(t, e) {
          const n = t,
            r = this._cipher,
            { blockSize: s } = r,
            o = this._iv;
          let i = this._keystream;
          o &&
            ((this._keystream = o.slice(0)),
            (i = this._keystream),
            (this._iv = void 0)),
            r.encryptBlock(i, 0);
          for (let t = 0; t < s; t += 1) n[e + t] ^= i[t];
        }
      }),
        (Re.Decryptor = Re.Encryptor);
      const ze = {
          pad(t, e) {
            const n = 4 * e,
              r = n - (t.sigBytes % n);
            t.concat(o.random(r - 1)).concat(o.create([r << 24], 1));
          },
          unpad(t) {
            const e = t,
              n = 255 & e.words[(e.sigBytes - 1) >>> 2];
            e.sigBytes -= n;
          },
        },
        De = {
          pad(t, e) {
            const n = t,
              r = 4 * e;
            n.clamp(), (n.sigBytes += r - (t.sigBytes % r || r));
          },
          unpad(t) {
            const e = t,
              n = e.words;
            for (let t = e.sigBytes - 1; t >= 0; t -= 1)
              if ((n[t >>> 2] >>> (24 - (t % 4) * 8)) & 255) {
                e.sigBytes = t + 1;
                break;
              }
          },
        },
        Me = {
          pad(t, e) {
            t.concat(o.create([2147483648], 1)), De.pad(t, e);
          },
          unpad(t) {
            const e = t;
            De.unpad(e), (e.sigBytes -= 1);
          },
        },
        je = {
          stringify: (t) => t.ciphertext.toString(i),
          parse(t) {
            const e = i.parse(t);
            return H.create({ ciphertext: e });
          },
        },
        Ne = {
          lib: {
            Base: s,
            WordArray: o,
            BufferedBlockAlgorithm: h,
            Hasher: u,
            Cipher: x,
            StreamCipher: T,
            BlockCipherMode: B,
            BlockCipher: A,
            CipherParams: H,
            SerializableCipher: R,
            PasswordBasedCipher: D,
          },
          x64: { Word: d, WordArray: f },
          enc: {
            Hex: i,
            Latin1: c,
            Utf8: a,
            Utf16: N,
            Utf16BE: j,
            Utf16LE: F,
            Base64: y,
          },
          algo: {
            HMAC: l,
            MD5: m,
            SHA1: U,
            SHA224: et,
            SHA256: Z,
            SHA384: ht,
            SHA512: it,
            SHA3: gt,
            RIPEMD160: Rt,
            PBKDF2: Mt,
            EvpKDF: k,
            AES: Zt,
            DES: ce,
            TripleDES: he,
            Rabbit: ye,
            RabbitLegacy: me,
            RC4: ke,
            RC4Drop: Te,
          },
          mode: { CBC: O, CFB: Oe, CTR: Ie, CTRGladman: He, ECB: Pe, OFB: Re },
          pad: {
            Pkcs7: I,
            AnsiX923: {
              pad(t, e) {
                const n = t,
                  r = n.sigBytes,
                  s = 4 * e,
                  o = s - (r % s),
                  i = r + o - 1;
                n.clamp(),
                  (n.words[i >>> 2] |= o << (24 - (i % 4) * 8)),
                  (n.sigBytes += o);
              },
              unpad(t) {
                const e = t,
                  n = 255 & e.words[(e.sigBytes - 1) >>> 2];
                e.sigBytes -= n;
              },
            },
            Iso10126: ze,
            Iso97971: Me,
            NoPadding: { pad() {}, unpad() {} },
            ZeroPadding: De,
          },
          format: { OpenSSL: P, Hex: je },
          kdf: { OpenSSL: z },
          MD5: S,
          HmacMD5: E,
          SHA1: K,
          HmacSHA1: V,
          SHA224: nt,
          HmacSHA224: rt,
          SHA256: J,
          HmacSHA256: tt,
          SHA384: ut,
          HmacSHA384: lt,
          SHA512: ct,
          HmacSHA512: at,
          SHA3: vt,
          HmacSHA3: mt,
          RIPEMD160: zt,
          HmacRIPEMD160: Dt,
          PBKDF2: (t, e, n) => Mt.create(n).compute(t, e),
          EvpKDF: (t, e, n) => k.create(n).compute(t, e),
          AES: Jt,
          DES: ae,
          TripleDES: ue,
          Rabbit: be,
          RabbitLegacy: Se,
          RC4: xe,
          RC4Drop: Be,
        };
      let Fe = (t = 21) =>
        crypto
          .getRandomValues(new Uint8Array(t))
          .reduce(
            (t, e) =>
              t +
              ((e &= 63) < 36
                ? e.toString(36)
                : e < 62
                  ? (e - 26).toString(36).toUpperCase()
                  : e > 62
                    ? "-"
                    : "_"),
            "",
          );
      var Le = function (t, e) {
        return (
          (Le =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, e) {
                t.__proto__ = e;
              }) ||
            function (t, e) {
              for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
            }),
          Le(t, e)
        );
      };
      function Ue(t, e) {
        function n() {
          this.constructor = t;
        }
        Le(t, e),
          (t.prototype =
            null === e
              ? Object.create(e)
              : ((n.prototype = e.prototype), new n()));
      }
      function Ke(t) {
        return "function" == typeof t;
      }
      var Ve = !1,
        $e = {
          Promise: void 0,
          set useDeprecatedSynchronousErrorHandling(t) {
            t && new Error().stack, (Ve = t);
          },
          get useDeprecatedSynchronousErrorHandling() {
            return Ve;
          },
        };
      function We(t) {
        setTimeout(function () {
          throw t;
        }, 0);
      }
      var qe = {
          closed: !0,
          next: function (t) {},
          error: function (t) {
            if ($e.useDeprecatedSynchronousErrorHandling) throw t;
            We(t);
          },
          complete: function () {},
        },
        Xe = (function () {
          return (
            Array.isArray ||
            function (t) {
              return t && "number" == typeof t.length;
            }
          );
        })();
      function Ye(t) {
        return null !== t && "object" == typeof t;
      }
      var Ge = (function () {
          function t(t) {
            return (
              Error.call(this),
              (this.message = t
                ? t.length +
                  " errors occurred during unsubscription:\n" +
                  t
                    .map(function (t, e) {
                      return e + 1 + ") " + t.toString();
                    })
                    .join("\n  ")
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = t),
              this
            );
          }
          return (t.prototype = Object.create(Error.prototype)), t;
        })(),
        Qe = (function () {
          function t(t) {
            (this.closed = !1),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              t && ((this._ctorUnsubscribe = !0), (this._unsubscribe = t));
          }
          return (
            (t.prototype.unsubscribe = function () {
              var e;
              if (!this.closed) {
                var n = this,
                  r = n._parentOrParents,
                  s = n._ctorUnsubscribe,
                  o = n._unsubscribe,
                  i = n._subscriptions;
                if (
                  ((this.closed = !0),
                  (this._parentOrParents = null),
                  (this._subscriptions = null),
                  r instanceof t)
                )
                  r.remove(this);
                else if (null !== r)
                  for (var c = 0; c < r.length; ++c) r[c].remove(this);
                if (Ke(o)) {
                  s && (this._unsubscribe = void 0);
                  try {
                    o.call(this);
                  } catch (t) {
                    e = t instanceof Ge ? Ze(t.errors) : [t];
                  }
                }
                if (Xe(i)) {
                  c = -1;
                  for (var a = i.length; ++c < a; ) {
                    var h = i[c];
                    if (Ye(h))
                      try {
                        h.unsubscribe();
                      } catch (t) {
                        (e = e || []),
                          t instanceof Ge
                            ? (e = e.concat(Ze(t.errors)))
                            : e.push(t);
                      }
                  }
                }
                if (e) throw new Ge(e);
              }
            }),
            (t.prototype.add = function (e) {
              var n = e;
              if (!e) return t.EMPTY;
              switch (typeof e) {
                case "function":
                  n = new t(e);
                case "object":
                  if (
                    n === this ||
                    n.closed ||
                    "function" != typeof n.unsubscribe
                  )
                    return n;
                  if (this.closed) return n.unsubscribe(), n;
                  if (!(n instanceof t)) {
                    var r = n;
                    (n = new t())._subscriptions = [r];
                  }
                  break;
                default:
                  throw new Error(
                    "unrecognized teardown " + e + " added to Subscription.",
                  );
              }
              var s = n._parentOrParents;
              if (null === s) n._parentOrParents = this;
              else if (s instanceof t) {
                if (s === this) return n;
                n._parentOrParents = [s, this];
              } else {
                if (-1 !== s.indexOf(this)) return n;
                s.push(this);
              }
              var o = this._subscriptions;
              return null === o ? (this._subscriptions = [n]) : o.push(n), n;
            }),
            (t.prototype.remove = function (t) {
              var e = this._subscriptions;
              if (e) {
                var n = e.indexOf(t);
                -1 !== n && e.splice(n, 1);
              }
            }),
            (t.EMPTY = (function (t) {
              return (t.closed = !0), t;
            })(new t())),
            t
          );
        })();
      function Ze(t) {
        return t.reduce(function (t, e) {
          return t.concat(e instanceof Ge ? e.errors : e);
        }, []);
      }
      var Je = (function () {
          return "function" == typeof Symbol
            ? Symbol("rxSubscriber")
            : "@@rxSubscriber_" + Math.random();
        })(),
        tn = (function (t) {
          function e(n, r, s) {
            var o = t.call(this) || this;
            switch (
              ((o.syncErrorValue = null),
              (o.syncErrorThrown = !1),
              (o.syncErrorThrowable = !1),
              (o.isStopped = !1),
              arguments.length)
            ) {
              case 0:
                o.destination = qe;
                break;
              case 1:
                if (!n) {
                  o.destination = qe;
                  break;
                }
                if ("object" == typeof n) {
                  n instanceof e
                    ? ((o.syncErrorThrowable = n.syncErrorThrowable),
                      (o.destination = n),
                      n.add(o))
                    : ((o.syncErrorThrowable = !0),
                      (o.destination = new en(o, n)));
                  break;
                }
              default:
                (o.syncErrorThrowable = !0),
                  (o.destination = new en(o, n, r, s));
            }
            return o;
          }
          return (
            Ue(e, t),
            (e.prototype[Je] = function () {
              return this;
            }),
            (e.create = function (t, n, r) {
              var s = new e(t, n, r);
              return (s.syncErrorThrowable = !1), s;
            }),
            (e.prototype.next = function (t) {
              this.isStopped || this._next(t);
            }),
            (e.prototype.error = function (t) {
              this.isStopped || ((this.isStopped = !0), this._error(t));
            }),
            (e.prototype.complete = function () {
              this.isStopped || ((this.isStopped = !0), this._complete());
            }),
            (e.prototype.unsubscribe = function () {
              this.closed ||
                ((this.isStopped = !0), t.prototype.unsubscribe.call(this));
            }),
            (e.prototype._next = function (t) {
              this.destination.next(t);
            }),
            (e.prototype._error = function (t) {
              this.destination.error(t), this.unsubscribe();
            }),
            (e.prototype._complete = function () {
              this.destination.complete(), this.unsubscribe();
            }),
            (e.prototype._unsubscribeAndRecycle = function () {
              var t = this._parentOrParents;
              return (
                (this._parentOrParents = null),
                this.unsubscribe(),
                (this.closed = !1),
                (this.isStopped = !1),
                (this._parentOrParents = t),
                this
              );
            }),
            e
          );
        })(Qe),
        en = (function (t) {
          function e(e, n, r, s) {
            var o,
              i = t.call(this) || this;
            i._parentSubscriber = e;
            var c = i;
            return (
              Ke(n)
                ? (o = n)
                : n &&
                  ((o = n.next),
                  (r = n.error),
                  (s = n.complete),
                  n !== qe &&
                    (Ke((c = Object.create(n)).unsubscribe) &&
                      i.add(c.unsubscribe.bind(c)),
                    (c.unsubscribe = i.unsubscribe.bind(i)))),
              (i._context = c),
              (i._next = o),
              (i._error = r),
              (i._complete = s),
              i
            );
          }
          return (
            Ue(e, t),
            (e.prototype.next = function (t) {
              if (!this.isStopped && this._next) {
                var e = this._parentSubscriber;
                $e.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
                  ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
                  : this.__tryOrUnsub(this._next, t);
              }
            }),
            (e.prototype.error = function (t) {
              if (!this.isStopped) {
                var e = this._parentSubscriber,
                  n = $e.useDeprecatedSynchronousErrorHandling;
                if (this._error)
                  n && e.syncErrorThrowable
                    ? (this.__tryOrSetError(e, this._error, t),
                      this.unsubscribe())
                    : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
                else if (e.syncErrorThrowable)
                  n
                    ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0))
                    : We(t),
                    this.unsubscribe();
                else {
                  if ((this.unsubscribe(), n)) throw t;
                  We(t);
                }
              }
            }),
            (e.prototype.complete = function () {
              var t = this;
              if (!this.isStopped) {
                var e = this._parentSubscriber;
                if (this._complete) {
                  var n = function () {
                    return t._complete.call(t._context);
                  };
                  $e.useDeprecatedSynchronousErrorHandling &&
                  e.syncErrorThrowable
                    ? (this.__tryOrSetError(e, n), this.unsubscribe())
                    : (this.__tryOrUnsub(n), this.unsubscribe());
                } else this.unsubscribe();
              }
            }),
            (e.prototype.__tryOrUnsub = function (t, e) {
              try {
                t.call(this._context, e);
              } catch (t) {
                if (
                  (this.unsubscribe(), $e.useDeprecatedSynchronousErrorHandling)
                )
                  throw t;
                We(t);
              }
            }),
            (e.prototype.__tryOrSetError = function (t, e, n) {
              if (!$e.useDeprecatedSynchronousErrorHandling)
                throw new Error("bad call");
              try {
                e.call(this._context, n);
              } catch (e) {
                return $e.useDeprecatedSynchronousErrorHandling
                  ? ((t.syncErrorValue = e), (t.syncErrorThrown = !0), !0)
                  : (We(e), !0);
              }
              return !1;
            }),
            (e.prototype._unsubscribe = function () {
              var t = this._parentSubscriber;
              (this._context = null),
                (this._parentSubscriber = null),
                t.unsubscribe();
            }),
            e
          );
        })(tn),
        nn = (function () {
          return (
            ("function" == typeof Symbol && Symbol.observable) || "@@observable"
          );
        })();
      function rn(t) {
        return t;
      }
      var sn = (function () {
        function t(t) {
          (this._isScalar = !1), t && (this._subscribe = t);
        }
        return (
          (t.prototype.lift = function (e) {
            var n = new t();
            return (n.source = this), (n.operator = e), n;
          }),
          (t.prototype.subscribe = function (t, e, n) {
            var r = this.operator,
              s = (function (t, e, n) {
                if (t) {
                  if (t instanceof tn) return t;
                  if (t[Je]) return t[Je]();
                }
                return t || e || n ? new tn(t, e, n) : new tn(qe);
              })(t, e, n);
            if (
              (r
                ? s.add(r.call(s, this.source))
                : s.add(
                    this.source ||
                      ($e.useDeprecatedSynchronousErrorHandling &&
                        !s.syncErrorThrowable)
                      ? this._subscribe(s)
                      : this._trySubscribe(s),
                  ),
              $e.useDeprecatedSynchronousErrorHandling &&
                s.syncErrorThrowable &&
                ((s.syncErrorThrowable = !1), s.syncErrorThrown))
            )
              throw s.syncErrorValue;
            return s;
          }),
          (t.prototype._trySubscribe = function (t) {
            try {
              return this._subscribe(t);
            } catch (e) {
              $e.useDeprecatedSynchronousErrorHandling &&
                ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
                (function (t) {
                  for (; t; ) {
                    var e = t,
                      n = e.closed,
                      r = e.destination,
                      s = e.isStopped;
                    if (n || s) return !1;
                    t = r && r instanceof tn ? r : null;
                  }
                  return !0;
                })(t)
                  ? t.error(e)
                  : console.warn(e);
            }
          }),
          (t.prototype.forEach = function (t, e) {
            var n = this;
            return new (e = on(e))(function (e, r) {
              var s;
              s = n.subscribe(
                function (e) {
                  try {
                    t(e);
                  } catch (t) {
                    r(t), s && s.unsubscribe();
                  }
                },
                r,
                e,
              );
            });
          }),
          (t.prototype._subscribe = function (t) {
            var e = this.source;
            return e && e.subscribe(t);
          }),
          (t.prototype[nn] = function () {
            return this;
          }),
          (t.prototype.pipe = function () {
            for (var t = [], e = 0; e < arguments.length; e++)
              t[e] = arguments[e];
            return 0 === t.length
              ? this
              : (0 === (n = t).length
                  ? rn
                  : 1 === n.length
                    ? n[0]
                    : function (t) {
                        return n.reduce(function (t, e) {
                          return e(t);
                        }, t);
                      })(this);
            var n;
          }),
          (t.prototype.toPromise = function (t) {
            var e = this;
            return new (t = on(t))(function (t, n) {
              var r;
              e.subscribe(
                function (t) {
                  return (r = t);
                },
                function (t) {
                  return n(t);
                },
                function () {
                  return t(r);
                },
              );
            });
          }),
          (t.create = function (e) {
            return new t(e);
          }),
          t
        );
      })();
      function on(t) {
        if ((t || (t = $e.Promise || Promise), !t))
          throw new Error("no Promise impl found");
        return t;
      }
      var cn = (function () {
          function t() {
            return (
              Error.call(this),
              (this.message = "object unsubscribed"),
              (this.name = "ObjectUnsubscribedError"),
              this
            );
          }
          return (t.prototype = Object.create(Error.prototype)), t;
        })(),
        an = (function (t) {
          function e(e, n) {
            var r = t.call(this) || this;
            return (r.subject = e), (r.subscriber = n), (r.closed = !1), r;
          }
          return (
            Ue(e, t),
            (e.prototype.unsubscribe = function () {
              if (!this.closed) {
                this.closed = !0;
                var t = this.subject,
                  e = t.observers;
                if (
                  ((this.subject = null),
                  e && 0 !== e.length && !t.isStopped && !t.closed)
                ) {
                  var n = e.indexOf(this.subscriber);
                  -1 !== n && e.splice(n, 1);
                }
              }
            }),
            e
          );
        })(Qe),
        hn = (function (t) {
          function e(e) {
            var n = t.call(this, e) || this;
            return (n.destination = e), n;
          }
          return Ue(e, t), e;
        })(tn),
        un = (function (t) {
          function e() {
            var e = t.call(this) || this;
            return (
              (e.observers = []),
              (e.closed = !1),
              (e.isStopped = !1),
              (e.hasError = !1),
              (e.thrownError = null),
              e
            );
          }
          return (
            Ue(e, t),
            (e.prototype[Je] = function () {
              return new hn(this);
            }),
            (e.prototype.lift = function (t) {
              var e = new ln(this, this);
              return (e.operator = t), e;
            }),
            (e.prototype.next = function (t) {
              if (this.closed) throw new cn();
              if (!this.isStopped)
                for (
                  var e = this.observers, n = e.length, r = e.slice(), s = 0;
                  s < n;
                  s++
                )
                  r[s].next(t);
            }),
            (e.prototype.error = function (t) {
              if (this.closed) throw new cn();
              (this.hasError = !0),
                (this.thrownError = t),
                (this.isStopped = !0);
              for (
                var e = this.observers, n = e.length, r = e.slice(), s = 0;
                s < n;
                s++
              )
                r[s].error(t);
              this.observers.length = 0;
            }),
            (e.prototype.complete = function () {
              if (this.closed) throw new cn();
              this.isStopped = !0;
              for (
                var t = this.observers, e = t.length, n = t.slice(), r = 0;
                r < e;
                r++
              )
                n[r].complete();
              this.observers.length = 0;
            }),
            (e.prototype.unsubscribe = function () {
              (this.isStopped = !0),
                (this.closed = !0),
                (this.observers = null);
            }),
            (e.prototype._trySubscribe = function (e) {
              if (this.closed) throw new cn();
              return t.prototype._trySubscribe.call(this, e);
            }),
            (e.prototype._subscribe = function (t) {
              if (this.closed) throw new cn();
              return this.hasError
                ? (t.error(this.thrownError), Qe.EMPTY)
                : this.isStopped
                  ? (t.complete(), Qe.EMPTY)
                  : (this.observers.push(t), new an(this, t));
            }),
            (e.prototype.asObservable = function () {
              var t = new sn();
              return (t.source = this), t;
            }),
            (e.create = function (t, e) {
              return new ln(t, e);
            }),
            e
          );
        })(sn),
        ln = (function (t) {
          function e(e, n) {
            var r = t.call(this) || this;
            return (r.destination = e), (r.source = n), r;
          }
          return (
            Ue(e, t),
            (e.prototype.next = function (t) {
              var e = this.destination;
              e && e.next && e.next(t);
            }),
            (e.prototype.error = function (t) {
              var e = this.destination;
              e && e.error && this.destination.error(t);
            }),
            (e.prototype.complete = function () {
              var t = this.destination;
              t && t.complete && this.destination.complete();
            }),
            (e.prototype._subscribe = function (t) {
              return this.source ? this.source.subscribe(t) : Qe.EMPTY;
            }),
            e
          );
        })(un);
      function pn(t, e) {
        return function (n) {
          if ("function" != typeof t)
            throw new TypeError(
              "argument is not a function. Are you looking for `mapTo()`?",
            );
          return n.lift(new dn(t, e));
        };
      }
      var dn = (function () {
          function t(t, e) {
            (this.project = t), (this.thisArg = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new fn(t, this.project, this.thisArg));
            }),
            t
          );
        })(),
        fn = (function (t) {
          function e(e, n, r) {
            var s = t.call(this, e) || this;
            return (s.project = n), (s.count = 0), (s.thisArg = r || s), s;
          }
          return (
            Ue(e, t),
            (e.prototype._next = function (t) {
              var e;
              try {
                e = this.project.call(this.thisArg, t, this.count++);
              } catch (t) {
                return void this.destination.error(t);
              }
              this.destination.next(e);
            }),
            e
          );
        })(tn);
      function yn(t, e, n, r) {
        return (
          Ke(n) && ((r = n), (n = void 0)),
          r
            ? yn(t, e, n).pipe(
                pn(function (t) {
                  return Xe(t) ? r.apply(void 0, t) : r(t);
                }),
              )
            : new sn(function (r) {
                bn(
                  t,
                  e,
                  function (t) {
                    arguments.length > 1
                      ? r.next(Array.prototype.slice.call(arguments))
                      : r.next(t);
                  },
                  r,
                  n,
                );
              })
        );
      }
      function bn(t, e, n, r, s) {
        var o;
        if (
          (function (t) {
            return (
              t &&
              "function" == typeof t.addEventListener &&
              "function" == typeof t.removeEventListener
            );
          })(t)
        ) {
          var i = t;
          t.addEventListener(e, n, s),
            (o = function () {
              return i.removeEventListener(e, n, s);
            });
        } else if (
          (function (t) {
            return t && "function" == typeof t.on && "function" == typeof t.off;
          })(t)
        ) {
          var c = t;
          t.on(e, n),
            (o = function () {
              return c.off(e, n);
            });
        } else if (
          (function (t) {
            return (
              t &&
              "function" == typeof t.addListener &&
              "function" == typeof t.removeListener
            );
          })(t)
        ) {
          var a = t;
          t.addListener(e, n),
            (o = function () {
              return a.removeListener(e, n);
            });
        } else {
          if (!t || !t.length) throw new TypeError("Invalid event target");
          for (var h = 0, u = t.length; h < u; h++) bn(t[h], e, n, r, s);
        }
        r.add(o);
      }
      var wn = (function (t) {
          function e(e, n) {
            var r = t.call(this, e, n) || this;
            return (r.scheduler = e), (r.work = n), (r.pending = !1), r;
          }
          return (
            Ue(e, t),
            (e.prototype.schedule = function (t, e) {
              if ((void 0 === e && (e = 0), this.closed)) return this;
              this.state = t;
              var n = this.id,
                r = this.scheduler;
              return (
                null != n && (this.id = this.recycleAsyncId(r, n, e)),
                (this.pending = !0),
                (this.delay = e),
                (this.id = this.id || this.requestAsyncId(r, this.id, e)),
                this
              );
            }),
            (e.prototype.requestAsyncId = function (t, e, n) {
              return (
                void 0 === n && (n = 0), setInterval(t.flush.bind(t, this), n)
              );
            }),
            (e.prototype.recycleAsyncId = function (t, e, n) {
              if (
                (void 0 === n && (n = 0),
                null !== n && this.delay === n && !1 === this.pending)
              )
                return e;
              clearInterval(e);
            }),
            (e.prototype.execute = function (t, e) {
              if (this.closed) return new Error("executing a cancelled action");
              this.pending = !1;
              var n = this._execute(t, e);
              if (n) return n;
              !1 === this.pending &&
                null != this.id &&
                (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
            }),
            (e.prototype._execute = function (t, e) {
              var n = !1,
                r = void 0;
              try {
                this.work(t);
              } catch (t) {
                (n = !0), (r = (!!t && t) || new Error(t));
              }
              if (n) return this.unsubscribe(), r;
            }),
            (e.prototype._unsubscribe = function () {
              var t = this.id,
                e = this.scheduler,
                n = e.actions,
                r = n.indexOf(this);
              (this.work = null),
                (this.state = null),
                (this.pending = !1),
                (this.scheduler = null),
                -1 !== r && n.splice(r, 1),
                null != t && (this.id = this.recycleAsyncId(e, t, null)),
                (this.delay = null);
            }),
            e
          );
        })(
          (function (t) {
            function e(e, n) {
              return t.call(this) || this;
            }
            return (
              Ue(e, t),
              (e.prototype.schedule = function (t, e) {
                return void 0 === e && (e = 0), this;
              }),
              e
            );
          })(Qe),
        ),
        _n = (function () {
          function t(e, n) {
            void 0 === n && (n = t.now),
              (this.SchedulerAction = e),
              (this.now = n);
          }
          return (
            (t.prototype.schedule = function (t, e, n) {
              return (
                void 0 === e && (e = 0),
                new this.SchedulerAction(this, t).schedule(n, e)
              );
            }),
            (t.now = function () {
              return Date.now();
            }),
            t
          );
        })(),
        gn = new ((function (t) {
          function e(n, r) {
            void 0 === r && (r = _n.now);
            var s =
              t.call(this, n, function () {
                return e.delegate && e.delegate !== s ? e.delegate.now() : r();
              }) || this;
            return (s.actions = []), (s.active = !1), (s.scheduled = void 0), s;
          }
          return (
            Ue(e, t),
            (e.prototype.schedule = function (n, r, s) {
              return (
                void 0 === r && (r = 0),
                e.delegate && e.delegate !== this
                  ? e.delegate.schedule(n, r, s)
                  : t.prototype.schedule.call(this, n, r, s)
              );
            }),
            (e.prototype.flush = function (t) {
              var e = this.actions;
              if (this.active) e.push(t);
              else {
                var n;
                this.active = !0;
                do {
                  if ((n = t.execute(t.state, t.delay))) break;
                } while ((t = e.shift()));
                if (((this.active = !1), n)) {
                  for (; (t = e.shift()); ) t.unsubscribe();
                  throw n;
                }
              }
            }),
            e
          );
        })(_n))(wn);
      function vn(t) {
        return !Xe(t) && t - parseFloat(t) + 1 >= 0;
      }
      function mn(t) {
        return t && "function" == typeof t.schedule;
      }
      function Sn(t) {
        var e = t.index,
          n = t.period,
          r = t.subscriber;
        if ((r.next(e), !r.closed)) {
          if (-1 === n) return r.complete();
          (t.index = e + 1), this.schedule(t, n);
        }
      }
      var En = function (t) {
        return function (e) {
          for (var n = 0, r = t.length; n < r && !e.closed; n++) e.next(t[n]);
          e.complete();
        };
      };
      function kn() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      }
      var xn = kn(),
        Tn = function (t) {
          return t && "number" == typeof t.length && "function" != typeof t;
        };
      function Bn(t) {
        return (
          !!t && "function" != typeof t.subscribe && "function" == typeof t.then
        );
      }
      var Cn = function (t) {
        if (t && "function" == typeof t[nn])
          return (
            (r = t),
            function (t) {
              var e = r[nn]();
              if ("function" != typeof e.subscribe)
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable",
                );
              return e.subscribe(t);
            }
          );
        if (Tn(t)) return En(t);
        if (Bn(t))
          return (
            (n = t),
            function (t) {
              return (
                n
                  .then(
                    function (e) {
                      t.closed || (t.next(e), t.complete());
                    },
                    function (e) {
                      return t.error(e);
                    },
                  )
                  .then(null, We),
                t
              );
            }
          );
        if (t && "function" == typeof t[xn])
          return (
            (e = t),
            function (t) {
              for (var n = e[xn](); ; ) {
                var r = void 0;
                try {
                  r = n.next();
                } catch (e) {
                  return t.error(e), t;
                }
                if (r.done) {
                  t.complete();
                  break;
                }
                if ((t.next(r.value), t.closed)) break;
              }
              return (
                "function" == typeof n.return &&
                  t.add(function () {
                    n.return && n.return();
                  }),
                t
              );
            }
          );
        var e,
          n,
          r,
          s = Ye(t) ? "an invalid object" : "'" + t + "'";
        throw new TypeError(
          "You provided " +
            s +
            " where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.",
        );
      };
      function On(t, e) {
        return new sn(function (n) {
          var r = new Qe(),
            s = 0;
          return (
            r.add(
              e.schedule(function () {
                s !== t.length
                  ? (n.next(t[s++]), n.closed || r.add(this.schedule()))
                  : n.complete();
              }),
            ),
            r
          );
        });
      }
      var In = (function (t) {
          function e(e) {
            var n = t.call(this) || this;
            return (n.parent = e), n;
          }
          return (
            Ue(e, t),
            (e.prototype._next = function (t) {
              this.parent.notifyNext(t);
            }),
            (e.prototype._error = function (t) {
              this.parent.notifyError(t), this.unsubscribe();
            }),
            (e.prototype._complete = function () {
              this.parent.notifyComplete(), this.unsubscribe();
            }),
            e
          );
        })(tn),
        An = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            Ue(e, t),
            (e.prototype.notifyNext = function (t) {
              this.destination.next(t);
            }),
            (e.prototype.notifyError = function (t) {
              this.destination.error(t);
            }),
            (e.prototype.notifyComplete = function () {
              this.destination.complete();
            }),
            e
          );
        })(tn);
      function Hn(t, e, n) {
        return (
          void 0 === n && (n = Number.POSITIVE_INFINITY),
          "function" == typeof e
            ? function (r) {
                return r.pipe(
                  Hn(function (n, r) {
                    return ((s = t(n, r)),
                    s instanceof sn ? s : new sn(Cn(s))).pipe(
                      pn(function (t, s) {
                        return e(n, t, r, s);
                      }),
                    );
                    var s;
                  }, n),
                );
              }
            : ("number" == typeof e && (n = e),
              function (e) {
                return e.lift(new Pn(t, n));
              })
        );
      }
      var Pn = (function () {
          function t(t, e) {
            void 0 === e && (e = Number.POSITIVE_INFINITY),
              (this.project = t),
              (this.concurrent = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new Rn(t, this.project, this.concurrent));
            }),
            t
          );
        })(),
        Rn = (function (t) {
          function e(e, n, r) {
            void 0 === r && (r = Number.POSITIVE_INFINITY);
            var s = t.call(this, e) || this;
            return (
              (s.project = n),
              (s.concurrent = r),
              (s.hasCompleted = !1),
              (s.buffer = []),
              (s.active = 0),
              (s.index = 0),
              s
            );
          }
          return (
            Ue(e, t),
            (e.prototype._next = function (t) {
              this.active < this.concurrent
                ? this._tryNext(t)
                : this.buffer.push(t);
            }),
            (e.prototype._tryNext = function (t) {
              var e,
                n = this.index++;
              try {
                e = this.project(t, n);
              } catch (t) {
                return void this.destination.error(t);
              }
              this.active++, this._innerSub(e);
            }),
            (e.prototype._innerSub = function (t) {
              var e = new In(this),
                n = this.destination;
              n.add(e);
              var r = (function (t, e) {
                if (!e.closed) {
                  if (t instanceof sn) return t.subscribe(e);
                  var n;
                  try {
                    n = Cn(t)(e);
                  } catch (t) {
                    e.error(t);
                  }
                  return n;
                }
              })(t, e);
              r !== e && n.add(r);
            }),
            (e.prototype._complete = function () {
              (this.hasCompleted = !0),
                0 === this.active &&
                  0 === this.buffer.length &&
                  this.destination.complete(),
                this.unsubscribe();
            }),
            (e.prototype.notifyNext = function (t) {
              this.destination.next(t);
            }),
            (e.prototype.notifyComplete = function () {
              var t = this.buffer;
              this.active--,
                t.length > 0
                  ? this._next(t.shift())
                  : 0 === this.active &&
                    this.hasCompleted &&
                    this.destination.complete();
            }),
            e
          );
        })(An);
      const zn = {
          ethereum: {
            1: "main",
            5: "goerli",
            100: "xdai",
            137: "matic-main",
            80001: "matic-mumbai",
          },
        },
        Dn = [2, 3, 4, 42, 56, 250],
        Mn = { points: 150, duration: 1 };
      function jn(t) {
        const {
          name: e,
          value: n,
          type: r,
          optional: s,
          customValidation: o,
        } = t;
        if (!s && void 0 === n) throw new Error(`"${e}" is required`);
        if (void 0 !== n && ("array" === r ? Array.isArray(r) : typeof n !== r))
          throw new Error(
            `"${e}" must be of type: ${r}, received type: ${typeof n} from value: ${n}`,
          );
        if (void 0 !== n && o && !o(n))
          throw new Error(`"${n}" is not a valid "${e}"`);
      }
      function Nn(t) {
        return !!zn[t];
      }
      function Fn() {
        return {
          listeners: {},
          on: function (t, e) {
            switch (t) {
              case "txSent":
              case "txPool":
              case "txConfirmed":
              case "txSpeedUp":
              case "txCancel":
              case "txFailed":
              case "txDropped":
              case "txRequest":
              case "nsfFail":
              case "txRepeat":
              case "txAwaitingApproval":
              case "txConfirmReminder":
              case "txSendFail":
              case "txError":
              case "txUnderPriced":
              case "txPoolSimulation":
              case "all":
                break;
              default:
                throw new Error(
                  `${t} is not a valid event code, for a list of valid event codes see: https://docs.blocknative.com/notify-sdk#event-codes`,
                );
            }
            if ("function" != typeof e)
              throw new Error("Listener must be a function");
            this.listeners[t] = e;
          },
          off: function (t) {
            delete this.listeners[t];
          },
          emit: function (t) {
            return this.listeners[t.eventCode]
              ? this.listeners[t.eventCode](t)
              : this.listeners.all
                ? this.listeners.all(t)
                : void 0;
          },
        };
      }
      function Ln(t, e) {
        return zn[t][e];
      }
      function Un(t) {
        return new Promise((e) => {
          setTimeout(e, t);
        });
      }
      const Kn = (t, e) => (void 0 === e ? "undefined" : e);
      function Vn() {
        if ("undefined" != typeof window && "localStorage" in window) {
          const t = "__testLocalStorage";
          try {
            return (
              window.localStorage.setItem(t, "1"),
              window.localStorage.removeItem(t),
              !0
            );
          } catch (t) {
            return !1;
          }
        }
        return !1;
      }
      function $n(t, e) {
        if (this._destroyed)
          throw new Error(
            "The WebSocket instance has been destroyed, re-initialize to continue making requests.",
          );
        const n = Date.now(),
          r = Fn(),
          s = "txSent";
        this.watchedTransactions.push({ hash: t, emitter: r });
        const o = {
            ...("ethereum" === this._system ? { hash: t } : { txid: t }),
            id: e || t,
            startTime: n,
            status: "sent",
          },
          i = { ...o, eventCode: s };
        this._sendMessage({
          eventCode: s,
          categoryCode: "activeTransaction",
          transaction: o,
        });
        const c = { details: i, emitter: r };
        return (
          setTimeout(
            function () {
              const t = r.emit(i);
              this._transactionHandlers.forEach((e) =>
                e({ transaction: i, emitterResult: t }),
              );
            }.bind(this),
            5,
          ),
          c
        );
      }
      function Wn(t) {
        if (this._destroyed)
          throw new Error(
            "The WebSocket instance has been destroyed, re-initialize to continue making requests.",
          );
        t = "ethereum" === this._system ? t.toLowerCase() : t;
        const e = Fn(),
          n = this.watchedAccounts.find((e) => e.address === t);
        return (
          n
            ? n.emitters.push(e)
            : this.watchedAccounts.push({ address: t, emitters: [e] }),
          this._sendMessage({
            eventCode: "watch",
            categoryCode: "accountAddress",
            account: { address: t },
          }),
          { emitter: e, details: { address: t } }
        );
      }
      function qn(t) {
        if (this._destroyed)
          throw new Error(
            "The WebSocket instance has been destroyed, re-initialize to continue making requests.",
          );
        this._sendMessage(t);
      }
      var Xn = function (t, e) {
        return (
          (Xn =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, e) {
                t.__proto__ = e;
              }) ||
            function (t, e) {
              for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
            }),
          Xn(t, e)
        );
      };
      function Yn(t, e) {
        function n() {
          this.constructor = t;
        }
        Xn(t, e),
          (t.prototype =
            null === e
              ? Object.create(e)
              : ((n.prototype = e.prototype), new n()));
      }
      function Gn(t) {
        return "function" == typeof t;
      }
      var Qn = !1,
        Zn = {
          Promise: void 0,
          set useDeprecatedSynchronousErrorHandling(t) {
            t && new Error().stack, (Qn = t);
          },
          get useDeprecatedSynchronousErrorHandling() {
            return Qn;
          },
        };
      function Jn(t) {
        setTimeout(function () {
          throw t;
        }, 0);
      }
      var tr = {
          closed: !0,
          next: function (t) {},
          error: function (t) {
            if (Zn.useDeprecatedSynchronousErrorHandling) throw t;
            Jn(t);
          },
          complete: function () {},
        },
        er = (function () {
          return (
            Array.isArray ||
            function (t) {
              return t && "number" == typeof t.length;
            }
          );
        })();
      function nr(t) {
        return null !== t && "object" == typeof t;
      }
      var rr = (function () {
          function t(t) {
            return (
              Error.call(this),
              (this.message = t
                ? t.length +
                  " errors occurred during unsubscription:\n" +
                  t
                    .map(function (t, e) {
                      return e + 1 + ") " + t.toString();
                    })
                    .join("\n  ")
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = t),
              this
            );
          }
          return (t.prototype = Object.create(Error.prototype)), t;
        })(),
        sr = (function () {
          function t(t) {
            (this.closed = !1),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              t && ((this._ctorUnsubscribe = !0), (this._unsubscribe = t));
          }
          return (
            (t.prototype.unsubscribe = function () {
              var e;
              if (!this.closed) {
                var n = this,
                  r = n._parentOrParents,
                  s = n._ctorUnsubscribe,
                  o = n._unsubscribe,
                  i = n._subscriptions;
                if (
                  ((this.closed = !0),
                  (this._parentOrParents = null),
                  (this._subscriptions = null),
                  r instanceof t)
                )
                  r.remove(this);
                else if (null !== r)
                  for (var c = 0; c < r.length; ++c) r[c].remove(this);
                if (Gn(o)) {
                  s && (this._unsubscribe = void 0);
                  try {
                    o.call(this);
                  } catch (t) {
                    e = t instanceof rr ? or(t.errors) : [t];
                  }
                }
                if (er(i)) {
                  c = -1;
                  for (var a = i.length; ++c < a; ) {
                    var h = i[c];
                    if (nr(h))
                      try {
                        h.unsubscribe();
                      } catch (t) {
                        (e = e || []),
                          t instanceof rr
                            ? (e = e.concat(or(t.errors)))
                            : e.push(t);
                      }
                  }
                }
                if (e) throw new rr(e);
              }
            }),
            (t.prototype.add = function (e) {
              var n = e;
              if (!e) return t.EMPTY;
              switch (typeof e) {
                case "function":
                  n = new t(e);
                case "object":
                  if (
                    n === this ||
                    n.closed ||
                    "function" != typeof n.unsubscribe
                  )
                    return n;
                  if (this.closed) return n.unsubscribe(), n;
                  if (!(n instanceof t)) {
                    var r = n;
                    (n = new t())._subscriptions = [r];
                  }
                  break;
                default:
                  throw new Error(
                    "unrecognized teardown " + e + " added to Subscription.",
                  );
              }
              var s = n._parentOrParents;
              if (null === s) n._parentOrParents = this;
              else if (s instanceof t) {
                if (s === this) return n;
                n._parentOrParents = [s, this];
              } else {
                if (-1 !== s.indexOf(this)) return n;
                s.push(this);
              }
              var o = this._subscriptions;
              return null === o ? (this._subscriptions = [n]) : o.push(n), n;
            }),
            (t.prototype.remove = function (t) {
              var e = this._subscriptions;
              if (e) {
                var n = e.indexOf(t);
                -1 !== n && e.splice(n, 1);
              }
            }),
            (t.EMPTY = (function (t) {
              return (t.closed = !0), t;
            })(new t())),
            t
          );
        })();
      function or(t) {
        return t.reduce(function (t, e) {
          return t.concat(e instanceof rr ? e.errors : e);
        }, []);
      }
      var ir = (function () {
          return "function" == typeof Symbol
            ? Symbol("rxSubscriber")
            : "@@rxSubscriber_" + Math.random();
        })(),
        cr = (function (t) {
          function e(n, r, s) {
            var o = t.call(this) || this;
            switch (
              ((o.syncErrorValue = null),
              (o.syncErrorThrown = !1),
              (o.syncErrorThrowable = !1),
              (o.isStopped = !1),
              arguments.length)
            ) {
              case 0:
                o.destination = tr;
                break;
              case 1:
                if (!n) {
                  o.destination = tr;
                  break;
                }
                if ("object" == typeof n) {
                  n instanceof e
                    ? ((o.syncErrorThrowable = n.syncErrorThrowable),
                      (o.destination = n),
                      n.add(o))
                    : ((o.syncErrorThrowable = !0),
                      (o.destination = new ar(o, n)));
                  break;
                }
              default:
                (o.syncErrorThrowable = !0),
                  (o.destination = new ar(o, n, r, s));
            }
            return o;
          }
          return (
            Yn(e, t),
            (e.prototype[ir] = function () {
              return this;
            }),
            (e.create = function (t, n, r) {
              var s = new e(t, n, r);
              return (s.syncErrorThrowable = !1), s;
            }),
            (e.prototype.next = function (t) {
              this.isStopped || this._next(t);
            }),
            (e.prototype.error = function (t) {
              this.isStopped || ((this.isStopped = !0), this._error(t));
            }),
            (e.prototype.complete = function () {
              this.isStopped || ((this.isStopped = !0), this._complete());
            }),
            (e.prototype.unsubscribe = function () {
              this.closed ||
                ((this.isStopped = !0), t.prototype.unsubscribe.call(this));
            }),
            (e.prototype._next = function (t) {
              this.destination.next(t);
            }),
            (e.prototype._error = function (t) {
              this.destination.error(t), this.unsubscribe();
            }),
            (e.prototype._complete = function () {
              this.destination.complete(), this.unsubscribe();
            }),
            (e.prototype._unsubscribeAndRecycle = function () {
              var t = this._parentOrParents;
              return (
                (this._parentOrParents = null),
                this.unsubscribe(),
                (this.closed = !1),
                (this.isStopped = !1),
                (this._parentOrParents = t),
                this
              );
            }),
            e
          );
        })(sr),
        ar = (function (t) {
          function e(e, n, r, s) {
            var o,
              i = t.call(this) || this;
            i._parentSubscriber = e;
            var c = i;
            return (
              Gn(n)
                ? (o = n)
                : n &&
                  ((o = n.next),
                  (r = n.error),
                  (s = n.complete),
                  n !== tr &&
                    (Gn((c = Object.create(n)).unsubscribe) &&
                      i.add(c.unsubscribe.bind(c)),
                    (c.unsubscribe = i.unsubscribe.bind(i)))),
              (i._context = c),
              (i._next = o),
              (i._error = r),
              (i._complete = s),
              i
            );
          }
          return (
            Yn(e, t),
            (e.prototype.next = function (t) {
              if (!this.isStopped && this._next) {
                var e = this._parentSubscriber;
                Zn.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
                  ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
                  : this.__tryOrUnsub(this._next, t);
              }
            }),
            (e.prototype.error = function (t) {
              if (!this.isStopped) {
                var e = this._parentSubscriber,
                  n = Zn.useDeprecatedSynchronousErrorHandling;
                if (this._error)
                  n && e.syncErrorThrowable
                    ? (this.__tryOrSetError(e, this._error, t),
                      this.unsubscribe())
                    : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
                else if (e.syncErrorThrowable)
                  n
                    ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0))
                    : Jn(t),
                    this.unsubscribe();
                else {
                  if ((this.unsubscribe(), n)) throw t;
                  Jn(t);
                }
              }
            }),
            (e.prototype.complete = function () {
              var t = this;
              if (!this.isStopped) {
                var e = this._parentSubscriber;
                if (this._complete) {
                  var n = function () {
                    return t._complete.call(t._context);
                  };
                  Zn.useDeprecatedSynchronousErrorHandling &&
                  e.syncErrorThrowable
                    ? (this.__tryOrSetError(e, n), this.unsubscribe())
                    : (this.__tryOrUnsub(n), this.unsubscribe());
                } else this.unsubscribe();
              }
            }),
            (e.prototype.__tryOrUnsub = function (t, e) {
              try {
                t.call(this._context, e);
              } catch (t) {
                if (
                  (this.unsubscribe(), Zn.useDeprecatedSynchronousErrorHandling)
                )
                  throw t;
                Jn(t);
              }
            }),
            (e.prototype.__tryOrSetError = function (t, e, n) {
              if (!Zn.useDeprecatedSynchronousErrorHandling)
                throw new Error("bad call");
              try {
                e.call(this._context, n);
              } catch (e) {
                return Zn.useDeprecatedSynchronousErrorHandling
                  ? ((t.syncErrorValue = e), (t.syncErrorThrown = !0), !0)
                  : (Jn(e), !0);
              }
              return !1;
            }),
            (e.prototype._unsubscribe = function () {
              var t = this._parentSubscriber;
              (this._context = null),
                (this._parentSubscriber = null),
                t.unsubscribe();
            }),
            e
          );
        })(cr),
        hr = (function () {
          return (
            ("function" == typeof Symbol && Symbol.observable) || "@@observable"
          );
        })();
      function ur(t) {
        return t;
      }
      var lr = (function () {
        function t(t) {
          (this._isScalar = !1), t && (this._subscribe = t);
        }
        return (
          (t.prototype.lift = function (e) {
            var n = new t();
            return (n.source = this), (n.operator = e), n;
          }),
          (t.prototype.subscribe = function (t, e, n) {
            var r = this.operator,
              s = (function (t, e, n) {
                if (t) {
                  if (t instanceof cr) return t;
                  if (t[ir]) return t[ir]();
                }
                return t || e || n ? new cr(t, e, n) : new cr(tr);
              })(t, e, n);
            if (
              (r
                ? s.add(r.call(s, this.source))
                : s.add(
                    this.source ||
                      (Zn.useDeprecatedSynchronousErrorHandling &&
                        !s.syncErrorThrowable)
                      ? this._subscribe(s)
                      : this._trySubscribe(s),
                  ),
              Zn.useDeprecatedSynchronousErrorHandling &&
                s.syncErrorThrowable &&
                ((s.syncErrorThrowable = !1), s.syncErrorThrown))
            )
              throw s.syncErrorValue;
            return s;
          }),
          (t.prototype._trySubscribe = function (t) {
            try {
              return this._subscribe(t);
            } catch (e) {
              Zn.useDeprecatedSynchronousErrorHandling &&
                ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
                (function (t) {
                  for (; t; ) {
                    var e = t,
                      n = e.closed,
                      r = e.destination,
                      s = e.isStopped;
                    if (n || s) return !1;
                    t = r && r instanceof cr ? r : null;
                  }
                  return !0;
                })(t)
                  ? t.error(e)
                  : console.warn(e);
            }
          }),
          (t.prototype.forEach = function (t, e) {
            var n = this;
            return new (e = pr(e))(function (e, r) {
              var s;
              s = n.subscribe(
                function (e) {
                  try {
                    t(e);
                  } catch (t) {
                    r(t), s && s.unsubscribe();
                  }
                },
                r,
                e,
              );
            });
          }),
          (t.prototype._subscribe = function (t) {
            var e = this.source;
            return e && e.subscribe(t);
          }),
          (t.prototype[hr] = function () {
            return this;
          }),
          (t.prototype.pipe = function () {
            for (var t, e = [], n = 0; n < arguments.length; n++)
              e[n] = arguments[n];
            return 0 === e.length
              ? this
              : (0 === (t = e).length
                  ? ur
                  : 1 === t.length
                    ? t[0]
                    : function (e) {
                        return t.reduce(function (t, e) {
                          return e(t);
                        }, e);
                      })(this);
          }),
          (t.prototype.toPromise = function (t) {
            var e = this;
            return new (t = pr(t))(function (t, n) {
              var r;
              e.subscribe(
                function (t) {
                  return (r = t);
                },
                function (t) {
                  return n(t);
                },
                function () {
                  return t(r);
                },
              );
            });
          }),
          (t.create = function (e) {
            return new t(e);
          }),
          t
        );
      })();
      function pr(t) {
        if ((t || (t = Promise), !t)) throw new Error("no Promise impl found");
        return t;
      }
      function dr() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      }
      var fr = dr(),
        yr = (function (t) {
          function e(e) {
            var n = t.call(this) || this;
            return (n.parent = e), n;
          }
          return (
            Yn(e, t),
            (e.prototype._next = function (t) {
              this.parent.notifyNext(t);
            }),
            (e.prototype._error = function (t) {
              this.parent.notifyError(t), this.unsubscribe();
            }),
            (e.prototype._complete = function () {
              this.parent.notifyComplete(), this.unsubscribe();
            }),
            e
          );
        })(cr),
        br = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            Yn(e, t),
            (e.prototype.notifyNext = function (t) {
              this.destination.next(t);
            }),
            (e.prototype.notifyError = function (t) {
              this.destination.error(t);
            }),
            (e.prototype.notifyComplete = function () {
              this.destination.complete();
            }),
            e
          );
        })(cr),
        wr = (function (t) {
          function e(e, n) {
            var r = t.call(this, e, n) || this;
            return (r.scheduler = e), (r.work = n), (r.pending = !1), r;
          }
          return (
            Yn(e, t),
            (e.prototype.schedule = function (t, e) {
              if ((void 0 === e && (e = 0), this.closed)) return this;
              this.state = t;
              var n = this.id,
                r = this.scheduler;
              return (
                null != n && (this.id = this.recycleAsyncId(r, n, e)),
                (this.pending = !0),
                (this.delay = e),
                (this.id = this.id || this.requestAsyncId(r, this.id, e)),
                this
              );
            }),
            (e.prototype.requestAsyncId = function (t, e, n) {
              return (
                void 0 === n && (n = 0), setInterval(t.flush.bind(t, this), n)
              );
            }),
            (e.prototype.recycleAsyncId = function (t, e, n) {
              if (
                (void 0 === n && (n = 0),
                null !== n && this.delay === n && !1 === this.pending)
              )
                return e;
              clearInterval(e);
            }),
            (e.prototype.execute = function (t, e) {
              if (this.closed) return new Error("executing a cancelled action");
              this.pending = !1;
              var n = this._execute(t, e);
              if (n) return n;
              !1 === this.pending &&
                null != this.id &&
                (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
            }),
            (e.prototype._execute = function (t, e) {
              var n = !1,
                r = void 0;
              try {
                this.work(t);
              } catch (t) {
                (n = !0), (r = (!!t && t) || new Error(t));
              }
              if (n) return this.unsubscribe(), r;
            }),
            (e.prototype._unsubscribe = function () {
              var t = this.id,
                e = this.scheduler,
                n = e.actions,
                r = n.indexOf(this);
              (this.work = null),
                (this.state = null),
                (this.pending = !1),
                (this.scheduler = null),
                -1 !== r && n.splice(r, 1),
                null != t && (this.id = this.recycleAsyncId(e, t, null)),
                (this.delay = null);
            }),
            e
          );
        })(
          (function (t) {
            function e(e, n) {
              return t.call(this) || this;
            }
            return (
              Yn(e, t),
              (e.prototype.schedule = function (t, e) {
                return this;
              }),
              e
            );
          })(sr),
        ),
        _r = (function () {
          function t(e, n) {
            void 0 === n && (n = t.now),
              (this.SchedulerAction = e),
              (this.now = n);
          }
          return (
            (t.prototype.schedule = function (t, e, n) {
              return (
                void 0 === e && (e = 0),
                new this.SchedulerAction(this, t).schedule(n, e)
              );
            }),
            (t.now = function () {
              return Date.now();
            }),
            t
          );
        })(),
        gr = new ((function (t) {
          function e(n, r) {
            void 0 === r && (r = _r.now);
            var s =
              t.call(this, n, function () {
                return e.delegate && e.delegate !== s ? e.delegate.now() : r();
              }) || this;
            return (s.actions = []), (s.active = !1), (s.scheduled = void 0), s;
          }
          return (
            Yn(e, t),
            (e.prototype.schedule = function (n, r, s) {
              return (
                void 0 === r && (r = 0),
                e.delegate && e.delegate !== this
                  ? e.delegate.schedule(n, r, s)
                  : t.prototype.schedule.call(this, n, r, s)
              );
            }),
            (e.prototype.flush = function (t) {
              var e = this.actions;
              if (this.active) e.push(t);
              else {
                var n;
                this.active = !0;
                do {
                  if ((n = t.execute(t.state, t.delay))) break;
                } while ((t = e.shift()));
                if (((this.active = !1), n)) {
                  for (; (t = e.shift()); ) t.unsubscribe();
                  throw n;
                }
              }
            }),
            e
          );
        })(_r))(wr),
        vr = new lr(function (t) {
          return t.complete();
        });
      var mr = (function () {
        function t() {
          return (
            Error.call(this),
            (this.message = "argument out of range"),
            (this.name = "ArgumentOutOfRangeError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      function Sr(t, e) {
        return function (n) {
          return n.lift(new Er(t, e));
        };
      }
      var Er = (function () {
          function t(t, e) {
            (this.predicate = t), (this.thisArg = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new kr(t, this.predicate, this.thisArg));
            }),
            t
          );
        })(),
        kr = (function (t) {
          function e(e, n, r) {
            var s = t.call(this, e) || this;
            return (s.predicate = n), (s.thisArg = r), (s.count = 0), s;
          }
          return (
            Yn(e, t),
            (e.prototype._next = function (t) {
              var e;
              try {
                e = this.predicate.call(this.thisArg, t, this.count++);
              } catch (t) {
                return void this.destination.error(t);
              }
              e && this.destination.next(t);
            }),
            e
          );
        })(cr);
      function xr(t) {
        return function (e) {
          return 0 === t
            ? n
              ? (function (t) {
                  return new lr(function (e) {
                    return t.schedule(function () {
                      return e.complete();
                    });
                  });
                })(n)
              : vr
            : e.lift(new Tr(t));
          var n;
        };
      }
      var Tr = (function () {
          function t(t) {
            if (((this.total = t), this.total < 0)) throw new mr();
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new Br(t, this.total));
            }),
            t
          );
        })(),
        Br = (function (t) {
          function e(e, n) {
            var r = t.call(this, e) || this;
            return (r.total = n), (r.count = 0), r;
          }
          return (
            Yn(e, t),
            (e.prototype._next = function (t) {
              var e = this.total,
                n = ++this.count;
              n <= e &&
                (this.destination.next(t),
                n === e && (this.destination.complete(), this.unsubscribe()));
            }),
            e
          );
        })(cr);
      function Cr(t) {
        return function (e) {
          return e.lift(new Or(t));
        };
      }
      var Or = (function () {
          function t(t) {
            this.callback = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new Ir(t, this.callback));
            }),
            t
          );
        })(),
        Ir = (function (t) {
          function e(e, n) {
            var r = t.call(this, e) || this;
            return r.add(new sr(n)), r;
          }
          return Yn(e, t), e;
        })(cr),
        Ar = (function () {
          function t(t, e) {
            (this.predicate = t), (this.inclusive = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new Hr(t, this.predicate, this.inclusive));
            }),
            t
          );
        })(),
        Hr = (function (t) {
          function e(e, n, r) {
            var s = t.call(this, e) || this;
            return (s.predicate = n), (s.inclusive = r), (s.index = 0), s;
          }
          return (
            Yn(e, t),
            (e.prototype._next = function (t) {
              var e,
                n = this.destination;
              try {
                e = this.predicate(t, this.index++);
              } catch (t) {
                return void n.error(t);
              }
              this.nextOrComplete(t, e);
            }),
            (e.prototype.nextOrComplete = function (t, e) {
              var n = this.destination;
              Boolean(e)
                ? n.next(t)
                : (this.inclusive && n.next(t), n.complete());
            }),
            e
          );
        })(cr),
        Pr = (function () {
          function t() {
            return (
              Error.call(this),
              (this.message = "Timeout has occurred"),
              (this.name = "TimeoutError"),
              this
            );
          }
          return (t.prototype = Object.create(Error.prototype)), t;
        })();
      var Rr = (function () {
          function t(t, e, n, r) {
            (this.waitFor = t),
              (this.absoluteTimeout = e),
              (this.withObservable = n),
              (this.scheduler = r);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(
                new zr(
                  t,
                  this.absoluteTimeout,
                  this.waitFor,
                  this.withObservable,
                  this.scheduler,
                ),
              );
            }),
            t
          );
        })(),
        zr = (function (t) {
          function e(e, n, r, s, o) {
            var i = t.call(this, e) || this;
            return (
              (i.absoluteTimeout = n),
              (i.waitFor = r),
              (i.withObservable = s),
              (i.scheduler = o),
              i.scheduleTimeout(),
              i
            );
          }
          return (
            Yn(e, t),
            (e.dispatchTimeout = function (t) {
              var e = t.withObservable;
              t._unsubscribeAndRecycle(),
                t.add(
                  (function (t, e) {
                    if (!e.closed)
                      return t instanceof lr
                        ? t.subscribe(e)
                        : (function (t) {
                            if (t && "function" == typeof t[hr])
                              return (
                                (s = t),
                                function (t) {
                                  var e = s[hr]();
                                  if ("function" != typeof e.subscribe)
                                    throw new TypeError(
                                      "Provided object does not correctly implement Symbol.observable",
                                    );
                                  return e.subscribe(t);
                                }
                              );
                            if (
                              (function (t) {
                                return (
                                  t &&
                                  "number" == typeof t.length &&
                                  "function" != typeof t
                                );
                              })(t)
                            )
                              return (
                                (r = t),
                                function (t) {
                                  for (
                                    var e = 0, n = r.length;
                                    e < n && !t.closed;
                                    e++
                                  )
                                    t.next(r[e]);
                                  t.complete();
                                }
                              );
                            if (
                              (function (t) {
                                return (
                                  !!t &&
                                  "function" != typeof t.subscribe &&
                                  "function" == typeof t.then
                                );
                              })(t)
                            )
                              return (
                                (n = t),
                                function (t) {
                                  return (
                                    n
                                      .then(
                                        function (e) {
                                          t.closed || (t.next(e), t.complete());
                                        },
                                        function (e) {
                                          return t.error(e);
                                        },
                                      )
                                      .then(null, Jn),
                                    t
                                  );
                                }
                              );
                            if (t && "function" == typeof t[fr])
                              return (
                                (e = t),
                                function (t) {
                                  for (var n = e[fr](); ; ) {
                                    var r = void 0;
                                    try {
                                      r = n.next();
                                    } catch (e) {
                                      return t.error(e), t;
                                    }
                                    if (r.done) {
                                      t.complete();
                                      break;
                                    }
                                    if ((t.next(r.value), t.closed)) break;
                                  }
                                  return (
                                    "function" == typeof n.return &&
                                      t.add(function () {
                                        n.return && n.return();
                                      }),
                                    t
                                  );
                                }
                              );
                            var e,
                              n,
                              r,
                              s,
                              o = nr(t) ? "an invalid object" : "'" + t + "'";
                            throw new TypeError(
                              "You provided " +
                                o +
                                " where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.",
                            );
                          })(t)(e);
                  })(e, new yr(t)),
                );
            }),
            (e.prototype.scheduleTimeout = function () {
              var t = this.action;
              t
                ? (this.action = t.schedule(this, this.waitFor))
                : this.add(
                    (this.action = this.scheduler.schedule(
                      e.dispatchTimeout,
                      this.waitFor,
                      this,
                    )),
                  );
            }),
            (e.prototype._next = function (e) {
              this.absoluteTimeout || this.scheduleTimeout(),
                t.prototype._next.call(this, e);
            }),
            (e.prototype._unsubscribe = function () {
              (this.action = void 0),
                (this.scheduler = null),
                (this.withObservable = null);
            }),
            e
          );
        })(br);
      function Dr(t, e) {
        return (
          void 0 === e && (e = gr),
          (function (t, e, n) {
            return (
              void 0 === n && (n = gr),
              function (r) {
                var s,
                  o = (s = t) instanceof Date && !isNaN(+s),
                  i = o ? +t - n.now() : Math.abs(t);
                return r.lift(new Rr(i, o, e, n));
              }
            );
          })(
            t,
            ((n = new Pr()),
            new lr(function (t) {
              return t.error(n);
            })),
            e,
          )
        );
        var n;
      }
      const Mr = new un();
      function jr(t, e, n) {
        if (this._destroyed)
          throw new Error(
            "The WebSocket instance has been destroyed, re-initialize to continue making requests.",
          );
        const r = Fe();
        return (
          this._sendMessage({
            categoryCode: "simulate",
            eventCode: "txSimulation",
            eventId: r,
            transaction: n,
          }),
          new Promise((t, e) => {
            Mr.pipe(
              Sr(({ eventId: t }) => t === r),
              xr(1),
            ).subscribe({
              next: ({ transaction: e }) => t(e),
              error: ({ error: t }) => e(t.message),
            });
          })
        );
      }
      function Nr(t) {
        if (this._destroyed)
          throw new Error(
            "The WebSocket instance has been destroyed, re-initialize to continue making requests.",
          );
        const e = Fe();
        return (
          this._sendMessage({
            categoryCode: "simulate",
            eventCode: "txSimulation",
            eventId: e,
            transaction: t,
          }),
          new Promise((t, n) => {
            Mr.pipe(
              Sr(({ eventId: t }) => t === e),
              xr(1),
            ).subscribe({
              next: ({ transaction: e }) => t(e),
              error: ({ error: t }) => n(t.message),
            });
          })
        );
      }
      function Fr(t) {
        if (this._destroyed)
          throw new Error(
            "The WebSocket instance has been destroyed, re-initialize to continue making requests.",
          );
        const e = (function (t, e) {
            switch (t) {
              case "ethereum":
                return 42 === e.length;
              case "bitcoin":
                return 64 !== e.length;
              default:
                return !1;
            }
          })(this._system, t),
          n = (function (t, e) {
            switch (t) {
              case "ethereum":
                return 66 === e.length;
              case "bitcoin":
                return 64 === e.length;
              default:
                return !1;
            }
          })(this._system, t);
        if (e) {
          const e = "ethereum" === this._system ? t.toLowerCase() : t;
          (this.watchedAccounts = this.watchedAccounts.filter(
            (t) => t.address !== e,
          )),
            this.configurations.delete(e),
            this._sendMessage({
              categoryCode: "accountAddress",
              eventCode: "unwatch",
              account: { address: e },
            });
        } else {
          if (!n)
            throw new Error(
              `Error trying to unsubscribe ${t}: not a valid address or transaction id/hash`,
            );
          {
            this.watchedTransactions = this.watchedTransactions.filter(
              (e) => e.hash !== t,
            );
            const e = {
              ...("ethereum" === this._system ? { hash: t } : { txid: t }),
              id: t,
              status: "unsubscribed",
            };
            this._sendMessage({
              categoryCode: "activeTransaction",
              eventCode: "unwatch",
              transaction: e,
            });
          }
        }
      }
      function Lr(t) {
        if (this._destroyed)
          throw new Error(
            "The WebSocket instance has been destroyed, re-initialize to continue making requests.",
          );
        const e = "ethereum" === this._system ? t.scope.toLowerCase() : t.scope,
          n = this.configurations.get(e);
        n && n.subscription && n.subscription.next();
        const r = new un(),
          s = t.watchAddress ? { emitter: Fn() } : {};
        return (
          this.configurations.set(e, { ...t, ...s, subscription: r }),
          this._sendMessage({
            categoryCode: "configs",
            eventCode: "put",
            config: t,
          }),
          new Promise((e, n) => {
            r.pipe(xr(1), Dr(5e3)).subscribe({
              next: () => e({ ...s, details: { config: t } }),
              error: (r) => {
                const s =
                  "Timeout has occurred" === r.message
                    ? `Configuration with scope: ${t.scope} has been sent to the Blocknative server, but has not received a reply within 5 seconds.`
                    : r.message;
                this._onerror
                  ? (this._onerror({ message: s }), e(`Error: ${s}`))
                  : n(s);
              },
            });
          })
        );
      }
      function Ur(t) {
        const { id: e, chainId: n, type: r } = t;
        if (!Ln("ethereum", parseInt(n, 16)))
          throw new Error(`chainId: ${n} is an unsupported network`);
        this.connections[n] ||
          (this.connections[n] = new this.Blocknative({
            system: "ethereum",
            networkId: parseInt(n, 16),
            dappId: this.apiKey,
            ws: this.ws,
            apiUrl: this.apiUrl,
            transactionHandlers: [
              ({ transaction: t }) => {
                this.onTransaction$.next(t);
              },
            ],
            onerror: (t) => this.errors$.next(t),
          }));
        const s = this.connections[n];
        if ("account" === r) {
          const { filters: r = [], abi: o } = t;
          return (
            s.configuration({
              scope: e,
              filters: r,
              ...(o ? { abi: o } : {}),
              watchAddress: !0,
            }),
            this.transactions$.pipe(
              Sr(({ watchedAddress: t }) => t === e),
              Cr(() => {
                this.unsubscribe({ id: e, chainId: n });
              }),
            )
          );
        }
        {
          const { emitter: t } = s.transaction(e);
          return yn(t, "all").pipe(
            ((o = ({ status: t }) =>
              "confirmed" !== t && "failed" !== t && "dropped" !== t),
            void 0 === (i = !0) && (i = !1),
            function (t) {
              return t.lift(new Ar(o, i));
            }),
            Cr(() => {
              this.unsubscribe({ id: e, chainId: n });
            }),
          );
        }
        var o, i;
      }
      function Kr(t) {
        const { id: e, chainId: n, timeout: r = 0 } = t,
          s = (function (t, e, n) {
            void 0 === t && (t = 0);
            var r = -1;
            return (
              vn(e) ? (r = Number(e) < 1 ? 1 : Number(e)) : mn(e) && (n = e),
              mn(n) || (n = gn),
              new sn(function (e) {
                var s = vn(t) ? t : +t - n.now();
                return n.schedule(Sn, s, {
                  index: 0,
                  period: r,
                  subscriber: e,
                });
              })
            );
          })(r);
        (function () {
          for (var t = [], e = 0; e < arguments.length; e++)
            t[e] = arguments[e];
          var n = Number.POSITIVE_INFINITY,
            r = null,
            s = t[t.length - 1];
          return (
            mn(s)
              ? ((r = t.pop()),
                t.length > 1 &&
                  "number" == typeof t[t.length - 1] &&
                  (n = t.pop()))
              : "number" == typeof s && (n = t.pop()),
            null === r && 1 === t.length && t[0] instanceof sn
              ? t[0]
              : (function (t) {
                  return (
                    void 0 === t && (t = Number.POSITIVE_INFINITY), Hn(rn, t)
                  );
                })(n)(
                  (function (t, e) {
                    return e ? On(t, e) : new sn(En(t));
                  })(t, r),
                )
          );
        })(
          this.transactions$.pipe(
            Sr(({ hash: t, watchedAddress: n }) => t === e || n === e),
          ),
          s,
        )
          .pipe(xr(1))
          .subscribe((r) => {
            "number" == typeof r
              ? Object.entries(this.connections)
                  .filter(([t, e]) => null !== e)
                  .forEach(([t, r]) => {
                    (n && t !== n) ||
                      (r.unsubscribe(e),
                      r.watchedAccounts.length ||
                        r.watchedTransactions.length ||
                        r.configurations.size ||
                        (r.destroy(), (this.connections[t] = null)));
                  })
              : this.unsubscribe(t);
          });
      }
      class Vr {
        constructor(t, e) {
          const { ws: n } = t,
            { apiKey: r } = t,
            { apiUrl: s } = t;
          (this.apiKey = r),
            (this.apiUrl = s),
            (this.ws = n),
            (this.connections = {}),
            (this.onTransaction$ = new un()),
            (this.transactions$ = this.onTransaction$.asObservable()),
            (this.errors$ = new un()),
            (this.Blocknative = e),
            (this.subscribe = Ur.bind(this)),
            (this.unsubscribe = Kr.bind(this));
        }
      }
      var $r = "4.6.7";
      function Wr(t) {
        if (this._queuedMessages.length > 1e4)
          throw new Error("Queue limit of 10000 messages has been reached.");
        this._queuedMessages.push(Yr.bind(this)(t)),
          this._processingQueue || this._processQueue();
      }
      async function qr() {
        for (
          this._processingQueue = !0,
            this._connected || (await Gr.bind(this)());
          this._queuedMessages.length > 0;

        ) {
          await Un(1),
            null !== this._waitToRetry &&
              (await this._waitToRetry, (this._waitToRetry = null));
          const t = this._queuedMessages.shift(),
            e = (this._limitRules.duration / this._limitRules.points) * 1e3;
          await Un(e), this._socket.send(t);
        }
        (this._processingQueue = !1), (this._limitRules = Mn);
      }
      function Xr(t) {
        const {
          status: e,
          reason: n,
          event: r,
          connectionId: s,
          serverVersion: o,
          retryMs: i,
          limitRules: c,
          blockedMsg: a,
          dispatchTimestamp: h,
        } = JSON.parse(t.data);
        if (
          (s &&
            (Vn() && window.localStorage.setItem(this._storageKey, s),
            (this._connectionId = s)),
          "error" === e)
        ) {
          if (
            n.includes("ratelimit") &&
            !n.match(/IP (PendingSimulation|Notification) ratelimit reached/)
          )
            return (
              (this._waitToRetry = Un(i)),
              (this._limitRules = c),
              void (a && this._queuedMessages.unshift(a))
            );
          if (n.includes("upgrade your plan")) {
            if (this._onerror) return void this._onerror({ message: n });
            throw new Error(n);
          }
          if (n.includes("not a valid API key")) {
            if (this._onerror) return void this._onerror({ message: n });
            throw new Error(n);
          }
          if (n.includes("network not supported")) {
            if (this._onerror) return void this._onerror({ message: n });
            throw new Error(n);
          }
          if (n.includes("maximum allowed amount")) {
            if (this._onerror) return void this._onerror({ message: n });
            throw new Error(n);
          }
          if (n.includes("invalid txid")) {
            const t = `${r.transaction.txid} is an invalid txid`;
            if (this._onerror)
              return void this._onerror({
                message: t,
                transaction: r.transaction.txid,
              });
            throw new Error(t);
          }
          if (n.includes("invalid hash")) {
            const t = `${r.transaction.hash} is an invalid transaction hash`;
            if (this._onerror)
              return void this._onerror({
                message: t,
                transaction: r.transaction.hash,
              });
            throw new Error(t);
          }
          if (n.includes("invalid address")) {
            const t = `${r.account.address} is an invalid address`;
            if (this._onerror)
              return void this._onerror({
                message: t,
                account: r.account.address,
              });
            throw new Error(t);
          }
          if (n.includes("not a valid Bitcoin")) {
            if (this._onerror)
              return void this._onerror({
                message: n,
                account: r.account.address,
              });
            throw new Error(n);
          }
          if (n.includes("not a valid Ethereum")) {
            if (this._onerror)
              return void this._onerror({
                message: n,
                account: r.account.address,
              });
            throw new Error(n);
          }
          if (r && "simulate" === r.categoryCode)
            return void Mr.error({ eventId: r.eventId, error: { message: n } });
          if (r && r.config) {
            const t = this.configurations.get(r.config.scope);
            return void (
              t &&
              t.subscription &&
              t.subscription.error({ message: n })
            );
          }
          if (this._onerror) return void this._onerror({ message: n });
          throw new Error(n);
        }
        if (r && r.config) {
          const t =
              "ethereum" === this._system
                ? r.config.scope.toLowerCase()
                : r.config.scope,
            e = this.configurations.get(t);
          e && e.subscription && e.subscription.next();
        }
        if (r && r.transaction) {
          const {
              eventId: t,
              transaction: e,
              eventCode: n,
              contractCall: s,
              timeStamp: i,
              blockchain: { system: c, network: a },
            } = r,
            u =
              "ethereum" === this._system
                ? {
                    ...e,
                    serverVersion: o,
                    eventCode: n,
                    timeStamp: i,
                    dispatchTimestamp: h,
                    system: c,
                    network: a,
                    contractCall: s,
                  }
                : {
                    ...e,
                    serverVersion: o,
                    eventCode: n,
                    timeStamp: i,
                    dispatchTimestamp: h,
                    system: c,
                    network: a,
                  };
          if (
            (function (t) {
              switch (t) {
                case "txRequest":
                case "nsfFail":
                case "txRepeat":
                case "txAwaitingApproval":
                case "txConfirmReminder":
                case "txSendFail":
                case "txError":
                case "txUnderPriced":
                case "txSent":
                  return !0;
                default:
                  return !1;
              }
            })(n) ||
            "unsubscribed" === e.status
          )
            return;
          if (
            (u.originalHash &&
              ((u.replaceHash = u.hash),
              (u.hash = u.originalHash),
              delete u.originalHash),
            "txSpeedUp" === n &&
              "speedup" !== u.status &&
              (u.status = "speedup"),
            "txCancel" === n && "cancel" !== u.status && (u.status = "cancel"),
            ("txSpeedUp" !== n && "txCancel" !== n) ||
              (this.watchedTransactions = this.watchedTransactions.map(
                (t) => (
                  t.hash === u.replaceHash && (t.hash = e.hash || e.txid), t
                ),
              )),
            r && "simulate" === r.categoryCode)
          )
            return (
              (u.contractCall = r.transaction.contractCall),
              delete u.dispatchTimestamp,
              void Mr.next({ eventId: t, transaction: u })
            );
          const l =
            e.watchedAddress && "ethereum" === this._system
              ? e.watchedAddress.toLowerCase()
              : e.watchedAddress;
          if (l) {
            const t = this.watchedAccounts.find((t) => t.address === l),
              e = !!t && t.emitters.map((t) => t.emit(u)).reverse()[0],
              n = this.configurations.get(l),
              r = (n && n.emitter && n.emitter.emit(u)) || e;
            this._transactionHandlers.forEach((t) =>
              t({ transaction: u, emitterResult: r }),
            );
          } else {
            const t = this.watchedTransactions.find(
                (t) => t.hash === u.hash || u.txid,
              ),
              e = t && t.emitter.emit(u);
            this._transactionHandlers.forEach((t) =>
              t({ transaction: u, emitterResult: e }),
            ),
              ("speedup" !== u.status && "cancel" !== u.status) ||
                (this.watchedTransactions = this.watchedTransactions.map((t) =>
                  t.hash === u.hash || u.txid
                    ? { ...t, hash: u.replaceHash }
                    : t,
                ));
          }
        }
      }
      function Yr(t) {
        return JSON.stringify(
          {
            timeStamp: new Date().toISOString(),
            dappId: this._dappId,
            version: $r,
            appName: this._appName,
            appVersion: this._appVersion,
            blockchain: {
              system: this._system,
              network: Ln(this._system, this._networkId) || "local",
            },
            ...t,
          },
          "configs" === t.categoryCode ? Kn : void 0,
        );
      }
      function Gr() {
        return new Promise((t) => {
          const e = setInterval(() => {
            this._connected && (setTimeout(t, 100), clearInterval(e));
          });
        });
      }
      const Qr = "unknown",
        Zr = "unknown",
        Jr = "ethereum";
      function ts(t) {
        this._connected = !0;
        const e = {
          categoryCode: "initialize",
          eventCode: "checkDappId",
          connectionId: this._connectionId,
        };
        this._socket.send(Yr.bind(this)(e)),
          this._heartbeat && this._heartbeat(),
          t && t();
      }
      function es(t, e) {
        (this._connected = !1),
          t && t(e),
          this._pingTimeout && clearTimeout(this._pingTimeout);
      }
      async function ns(t) {
        this._connected = !0;
        const e = {
          categoryCode: "initialize",
          eventCode: "checkDappId",
          connectionId: this._connectionId,
        };
        this._socket.send(Yr.bind(this)(e));
        const n = Array.from(this.configurations.values()),
          r = this.configurations.get("global");
        if (r)
          try {
            const { emitter: t, subscription: e, ...n } = r;
            await this.configuration(n);
          } catch (t) {
            console.warn(
              "Error re-sending global configuration upon reconnection:",
              t,
            );
          }
        n
          .filter(({ scope: t }) => "global" !== t)
          .forEach((t) => {
            const { emitter: e, subscription: n, ...r } = t;
            this._sendMessage({
              categoryCode: "configs",
              eventCode: "put",
              config: r,
            });
          }),
          this.watchedAccounts.forEach((t) => {
            this._sendMessage({
              eventCode: "accountAddress",
              categoryCode: "watch",
              account: { address: t.address },
            });
          }),
          t && t(),
          this._socket.ws &&
            this._socket.ws.on &&
            (this._socket.ws.on("ping", () => {
              this._heartbeat && this._heartbeat();
            }),
            this._heartbeat());
      }
      const rs = class {
        constructor(t) {
          !(function (t) {
            jn({ name: "sdk options", value: t, type: "object" });
            const {
              dappId: e,
              system: n,
              name: r,
              appVersion: s,
              networkId: o,
              transactionHandlers: i,
              apiUrl: c,
              ws: a,
              onopen: h,
              ondown: u,
              onreopen: l,
              onerror: p,
              onclose: d,
              ...f
            } = t;
            !(function (t, e, n) {
              const r = Object.keys(t);
              if (r.length > 0)
                throw new Error(
                  `${r[0]} is not a valid parameter for Initialization Options, must be one of the following valid parameters: ${["dappId", "system", "name", "appVersion", "networkId", "transactionHandlers", "apiUrl", "ws", "onopen", "ondown", "onreopen", "onerror", "onclose"].join(", ")}`,
                );
            })(f),
              jn({ name: "dappId", value: e, type: "string", optional: !0 }),
              jn({
                name: "system",
                value: n,
                type: "string",
                optional: !0,
                customValidation: Nn,
              }),
              jn({ name: "name", value: r, type: "string", optional: !0 }),
              jn({
                name: "appVersion",
                value: s,
                type: "string",
                optional: !0,
              }),
              jn({ name: "networkId", value: o, type: "number" }),
              Dn.includes(o) &&
                console.error(
                  `Blocknative SDK: Network with ID: ${o} has been deprecated and you will no longer receive transaction events on this network.`,
                ),
              jn({
                name: "transactionHandler",
                value: i,
                type: "array",
                optional: !0,
              }),
              i &&
                i.forEach((t) =>
                  jn({
                    name: "transactionHandler",
                    value: t,
                    type: "function",
                  }),
                ),
              jn({ name: "apiUrl", value: c, type: "string", optional: !0 }),
              jn({ name: "ws", value: a, type: "function", optional: !0 }),
              jn({ name: "onopen", value: h, type: "function", optional: !0 }),
              jn({ name: "ondown", value: u, type: "function", optional: !0 }),
              jn({
                name: "onreopen",
                value: l,
                type: "function",
                optional: !0,
              }),
              jn({ name: "onerror", value: p, type: "function", optional: !0 }),
              jn({ name: "onclose", value: d, type: "function", optional: !0 });
          })(t);
          const {
              system: e = Jr,
              name: n = Qr,
              appVersion: s = Zr,
              networkId: o,
              transactionHandlers: i = [],
              ws: c,
              onopen: a,
              ondown: h,
              onreopen: u,
              onerror: l,
              onclose: p,
            } = t,
            { apiUrl: d } = t,
            { dappId: f } = t,
            y = { connectTimeout: 1e4 },
            b = new r.Z(
              d || "wss://api.blocknative.com/v0",
              c ? { wsConstructor: c, ...y } : { ...y },
            );
          (b.onopen = ts.bind(this, a)),
            (b.ondown = es.bind(this, h)),
            (b.onreopen = ns.bind(this, u)),
            (b.onmessage = Xr.bind(this)),
            (b.onerror = (t) =>
              l && l({ message: "There was a WebSocket error", error: t })),
            (b.onclose = () => {
              this._pingTimeout && clearInterval(this._pingTimeout), p && p();
            });
          const w = Ne.SHA1(`${f} - ${n}`).toString(),
            _ = Vn() && window.localStorage.getItem(w);
          (this._storageKey = w),
            (this._connectionId = _ || void 0),
            (this._dappId = f),
            (this._system = e),
            (this._networkId = o),
            (this._appName = n),
            (this._appVersion = s),
            (this._transactionHandlers = i),
            (this._socket = b),
            (this._connected = !1),
            (this._sendMessage = Wr.bind(this)),
            (this._pingTimeout = void 0),
            (this._destroyed = !1),
            (this._onerror = l),
            (this._queuedMessages = []),
            (this._limitRules = Mn),
            (this._waitToRetry = null),
            (this._processingQueue = !1),
            (this._processQueue = qr.bind(this)),
            this._socket.ws.on &&
              ((this._heartbeat = () => {
                this._pingTimeout && clearTimeout(this._pingTimeout),
                  (this._pingTimeout = setTimeout(() => {
                    this._socket.ws.terminate();
                  }, 31e3));
              }),
              this._socket.ws.on("ping", () => {
                this._heartbeat && this._heartbeat();
              })),
            (this.watchedTransactions = []),
            (this.watchedAccounts = []),
            (this.configurations = new Map()),
            (this.transaction = $n.bind(this)),
            (this.account = Wn.bind(this)),
            (this.event = qn.bind(this)),
            (this.simulate = jr.bind(this)),
            (this.multiSim = Nr.bind(this)),
            (this.unsubscribe = Fr.bind(this)),
            (this.configuration = Lr.bind(this)),
            (this.destroy = () => {
              this._socket.close(),
                (this._destroyed = !0),
                this._socket.onclose();
            });
        }
        static multichain(t) {
          return new Vr(t, this);
        }
      };
    },
    55402: (t) => {
      var e = 9007199254740991,
        n = "[object Function]",
        r = "[object GeneratorFunction]",
        s = /^(?:0|[1-9]\d*)$/;
      function o(t, e, n) {
        switch (n.length) {
          case 0:
            return t.call(e);
          case 1:
            return t.call(e, n[0]);
          case 2:
            return t.call(e, n[0], n[1]);
          case 3:
            return t.call(e, n[0], n[1], n[2]);
        }
        return t.apply(e, n);
      }
      var i = Object.prototype,
        c = i.hasOwnProperty,
        a = i.toString,
        h = i.propertyIsEnumerable,
        u = Math.max;
      function l(t, e, n, r) {
        return void 0 === t || (y(t, i[n]) && !c.call(r, n)) ? e : t;
      }
      function p(t, e, n) {
        var r = t[e];
        (c.call(t, e) && y(r, n) && (void 0 !== n || e in t)) || (t[e] = n);
      }
      function d(t, e) {
        return (
          (e = u(void 0 === e ? t.length - 1 : e, 0)),
          function () {
            for (
              var n = arguments, r = -1, s = u(n.length - e, 0), i = Array(s);
              ++r < s;

            )
              i[r] = n[e + r];
            r = -1;
            for (var c = Array(e + 1); ++r < e; ) c[r] = n[r];
            return (c[e] = i), o(t, this, c);
          }
        );
      }
      function f(t, n) {
        return (
          !!(n = null == n ? e : n) &&
          ("number" == typeof t || s.test(t)) &&
          t > -1 &&
          t % 1 == 0 &&
          t < n
        );
      }
      function y(t, e) {
        return t === e || (t != t && e != e);
      }
      var b = Array.isArray;
      function w(t) {
        return (
          null != t &&
          (function (t) {
            return "number" == typeof t && t > -1 && t % 1 == 0 && t <= e;
          })(t.length) &&
          !(function (t) {
            var e = _(t) ? a.call(t) : "";
            return e == n || e == r;
          })(t)
        );
      }
      function _(t) {
        var e = typeof t;
        return !!t && ("object" == e || "function" == e);
      }
      var g,
        v =
          ((g = function (t, e, n, r) {
            !(function (t, e, n, r) {
              n || (n = {});
              for (var s = -1, o = e.length; ++s < o; ) {
                var i = e[s],
                  c = r ? r(n[i], t[i], i, n, t) : void 0;
                p(n, i, void 0 === c ? t[i] : c);
              }
            })(
              e,
              (function (t) {
                return w(t)
                  ? (function (t, e) {
                      var n =
                          b(t) ||
                          (function (t) {
                            return (
                              (function (t) {
                                return (
                                  (function (t) {
                                    return !!t && "object" == typeof t;
                                  })(t) && w(t)
                                );
                              })(t) &&
                              c.call(t, "callee") &&
                              (!h.call(t, "callee") ||
                                "[object Arguments]" == a.call(t))
                            );
                          })(t)
                            ? (function (t, e) {
                                for (var n = -1, r = Array(t); ++n < t; )
                                  r[n] = e(n);
                                return r;
                              })(t.length, String)
                            : [],
                        r = n.length,
                        s = !!r;
                      for (var o in t)
                        (!e && !c.call(t, o)) ||
                          (s && ("length" == o || f(o, r))) ||
                          n.push(o);
                      return n;
                    })(t, !0)
                  : (function (t) {
                      if (!_(t))
                        return (function (t) {
                          var e = [];
                          if (null != t) for (var n in Object(t)) e.push(n);
                          return e;
                        })(t);
                      var e,
                        n,
                        r =
                          ((n = (e = t) && e.constructor),
                          e === (("function" == typeof n && n.prototype) || i)),
                        s = [];
                      for (var o in t)
                        ("constructor" != o || (!r && c.call(t, o))) &&
                          s.push(o);
                      return s;
                    })(t);
              })(e),
              t,
              r,
            );
          }),
          d(function (t, e) {
            var n = -1,
              r = e.length,
              s = r > 1 ? e[r - 1] : void 0,
              o = r > 2 ? e[2] : void 0;
            for (
              s = g.length > 3 && "function" == typeof s ? (r--, s) : void 0,
                o &&
                  (function (t, e, n) {
                    if (!_(n)) return !1;
                    var r = typeof e;
                    return (
                      !!("number" == r
                        ? w(n) && f(e, n.length)
                        : "string" == r && (e in n)) && y(n[e], t)
                    );
                  })(e[0], e[1], o) &&
                  ((s = r < 3 ? void 0 : s), (r = 1)),
                t = Object(t);
              ++n < r;

            ) {
              var i = e[n];
              i && g(t, i, 0, s);
            }
            return t;
          })),
        m = d(function (t) {
          return t.push(void 0, l), o(v, void 0, t);
        });
      t.exports = m;
    },
    54178: (t, e, n) => {
      "use strict";
      var r = n(55402),
        s = (function () {
          function t(e, n, s) {
            if (
              ((this.url = e),
              (this.onclose = null),
              (this.onerror = null),
              (this.onmessage = null),
              (this.onopen = null),
              (this.ondown = null),
              (this.onreopen = null),
              (this.CONNECTING = t.CONNECTING),
              (this.OPEN = t.OPEN),
              (this.CLOSING = t.CLOSING),
              (this.CLOSED = t.CLOSED),
              (this.hasBeenOpened = !1),
              (this.isClosed = !1),
              (this.messageBuffer = []),
              (this.nextRetryTime = 0),
              (this.reconnectCount = 0),
              (this.lastKnownExtensions = ""),
              (this.lastKnownProtocol = ""),
              (this.listeners = {}),
              null == n || "string" == typeof n || Array.isArray(n)
                ? (this.protocols = n)
                : (s = n),
              (this.options = r({}, s, t.DEFAULT_OPTIONS)),
              !this.options.wsConstructor)
            ) {
              if ("undefined" == typeof WebSocket)
                throw new Error(
                  "WebSocket not present in global scope and no wsConstructor option was provided.",
                );
              this.options.wsConstructor = WebSocket;
            }
            this.openNewWebSocket();
          }
          return (
            Object.defineProperty(t.prototype, "binaryType", {
              get: function () {
                return this.binaryTypeInternal || "blob";
              },
              set: function (t) {
                (this.binaryTypeInternal = t),
                  this.ws && (this.ws.binaryType = t);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "bufferedAmount", {
              get: function () {
                var t = this.ws ? this.ws.bufferedAmount : 0,
                  e = !1;
                return (
                  this.messageBuffer.forEach(function (n) {
                    var r = (function (t) {
                      return "string" == typeof t
                        ? 2 * t.length
                        : t instanceof ArrayBuffer
                          ? t.byteLength
                          : t instanceof Blob
                            ? t.size
                            : void 0;
                    })(n);
                    null != r ? (t += r) : (e = !0);
                  }),
                  e &&
                    this.debugLog(
                      "Some buffered data had unknown length. bufferedAmount() return value may be below the correct amount.",
                    ),
                  t
                );
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "extensions", {
              get: function () {
                return this.ws ? this.ws.extensions : this.lastKnownExtensions;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "protocol", {
              get: function () {
                return this.ws ? this.ws.protocol : this.lastKnownProtocol;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "readyState", {
              get: function () {
                return this.isClosed ? t.CLOSED : t.OPEN;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.close = function (t, e) {
              this.ws && this.ws.close(t, e),
                this.shutdown(),
                this.debugLog("WebSocket permanently closed by client.");
            }),
            (t.prototype.send = function (t) {
              this.ws && this.ws.readyState === this.OPEN
                ? this.ws.send(t)
                : this.messageBuffer.push(t);
            }),
            (t.prototype.addEventListener = function (t, e) {
              this.listeners[t] || (this.listeners[t] = []),
                this.listeners[t].push(e);
            }),
            (t.prototype.dispatchEvent = function (t) {
              return this.dispatchEventOfType(t.type, t);
            }),
            (t.prototype.removeEventListener = function (t, e) {
              this.listeners[t] &&
                (this.listeners[t] = this.listeners[t].filter(function (t) {
                  return t !== e;
                }));
            }),
            (t.prototype.openNewWebSocket = function () {
              var t = this;
              if (!this.isClosed) {
                var e = this.options,
                  n = e.connectTimeout,
                  r = e.wsConstructor;
                this.debugLog("Opening new WebSocket to " + this.url + ".");
                var s = new r(this.url, this.protocols);
                (s.onclose = function (e) {
                  return t.handleClose(e);
                }),
                  (s.onerror = function (e) {
                    return t.handleError(e);
                  }),
                  (s.onmessage = function (e) {
                    return t.handleMessage(e);
                  }),
                  (s.onopen = function (e) {
                    return t.handleOpen(e);
                  }),
                  (this.connectTimeoutId = setTimeout(function () {
                    t.clearConnectTimeout(), s.close();
                  }, n)),
                  (this.ws = s);
              }
            }),
            (t.prototype.handleOpen = function (t) {
              var e = this;
              if (this.ws && !this.isClosed) {
                var n = this.options.allClearResetTime;
                this.debugLog("WebSocket opened."),
                  null != this.binaryTypeInternal
                    ? (this.ws.binaryType = this.binaryTypeInternal)
                    : (this.binaryTypeInternal = this.ws.binaryType),
                  this.clearConnectTimeout(),
                  this.hasBeenOpened
                    ? this.dispatchEventOfType("reopen", t)
                    : (this.dispatchEventOfType("open", t),
                      (this.hasBeenOpened = !0)),
                  this.messageBuffer.forEach(function (t) {
                    return e.send(t);
                  }),
                  (this.messageBuffer = []),
                  (this.allClearTimeoutId = setTimeout(function () {
                    e.clearAllClearTimeout(),
                      (e.nextRetryTime = 0),
                      (e.reconnectCount = 0);
                    var t = (n / 1e3) | 0;
                    e.debugLog(
                      "WebSocket remained open for " +
                        t +
                        " seconds. Resetting retry time and count.",
                    );
                  }, n));
              }
            }),
            (t.prototype.handleMessage = function (t) {
              this.isClosed || this.dispatchEventOfType("message", t);
            }),
            (t.prototype.handleClose = function (t) {
              var e = this;
              if (!this.isClosed) {
                var n = this.options,
                  r = n.maxReconnectAttempts,
                  s = n.shouldReconnect;
                if (
                  (this.clearConnectTimeout(),
                  this.clearAllClearTimeout(),
                  this.ws &&
                    ((this.lastKnownExtensions = this.ws.extensions),
                    (this.lastKnownProtocol = this.ws.protocol),
                    (this.ws = void 0)),
                  this.dispatchEventOfType("down", t),
                  this.reconnectCount >= r)
                )
                  this.stopReconnecting(
                    t,
                    this.getTooManyFailedReconnectsMessage(),
                  );
                else {
                  var o = s(t);
                  "boolean" == typeof o
                    ? this.handleWillReconnect(
                        o,
                        t,
                        "Provided shouldReconnect() returned false. Closing permanently.",
                      )
                    : o.then(function (n) {
                        e.isClosed ||
                          e.handleWillReconnect(
                            n,
                            t,
                            "Provided shouldReconnect() resolved to false. Closing permanently.",
                          );
                      });
                }
              }
            }),
            (t.prototype.handleError = function (t) {
              this.dispatchEventOfType("error", t),
                this.debugLog("WebSocket encountered an error.");
            }),
            (t.prototype.handleWillReconnect = function (t, e, n) {
              t ? this.reconnect() : this.stopReconnecting(e, n);
            }),
            (t.prototype.reconnect = function () {
              var t = this,
                e = this.options,
                n = e.minReconnectDelay,
                r = e.maxReconnectDelay,
                s = e.reconnectBackoffFactor;
              this.reconnectCount++;
              var o = this.nextRetryTime;
              (this.nextRetryTime = Math.max(
                n,
                Math.min(this.nextRetryTime * s, r),
              )),
                setTimeout(function () {
                  return t.openNewWebSocket();
                }, o);
              var i = (o / 1e3) | 0;
              this.debugLog(
                "WebSocket was closed. Re-opening in " + i + " seconds.",
              );
            }),
            (t.prototype.stopReconnecting = function (t, e) {
              this.debugLog(e),
                this.shutdown(),
                this.dispatchEventOfType("close", t);
            }),
            (t.prototype.shutdown = function () {
              (this.isClosed = !0),
                this.clearAllTimeouts(),
                (this.messageBuffer = []);
            }),
            (t.prototype.clearAllTimeouts = function () {
              this.clearConnectTimeout(), this.clearAllClearTimeout();
            }),
            (t.prototype.clearConnectTimeout = function () {
              null != this.connectTimeoutId &&
                (clearTimeout(this.connectTimeoutId),
                (this.connectTimeoutId = void 0));
            }),
            (t.prototype.clearAllClearTimeout = function () {
              null != this.allClearTimeoutId &&
                (clearTimeout(this.allClearTimeoutId),
                (this.allClearTimeoutId = void 0));
            }),
            (t.prototype.dispatchEventOfType = function (t, e) {
              var n = this;
              switch (t) {
                case "close":
                  this.onclose && this.onclose(e);
                  break;
                case "error":
                  this.onerror && this.onerror(e);
                  break;
                case "message":
                  this.onmessage && this.onmessage(e);
                  break;
                case "open":
                  this.onopen && this.onopen(e);
                  break;
                case "down":
                  this.ondown && this.ondown(e);
                  break;
                case "reopen":
                  this.onreopen && this.onreopen(e);
              }
              return (
                t in this.listeners &&
                  this.listeners[t].slice().forEach(function (t) {
                    return n.callListener(t, e);
                  }),
                !e || !e.defaultPrevented
              );
            }),
            (t.prototype.callListener = function (t, e) {
              "function" == typeof t
                ? t.call(this, e)
                : t.handleEvent.call(this, e);
            }),
            (t.prototype.debugLog = function (t) {
              this.options.debug && console.log(t);
            }),
            (t.prototype.getTooManyFailedReconnectsMessage = function () {
              var t,
                e = this.options.maxReconnectAttempts;
              return (
                "Failed to reconnect after " +
                e +
                " " +
                ((t = "attempt"),
                (1 === e ? t : t + "s") + ". Closing permanently.")
              );
            }),
            (t.DEFAULT_OPTIONS = {
              allClearResetTime: 5e3,
              connectTimeout: 5e3,
              debug: !1,
              minReconnectDelay: 1e3,
              maxReconnectDelay: 3e4,
              maxReconnectAttempts: Number.POSITIVE_INFINITY,
              reconnectBackoffFactor: 1.5,
              shouldReconnect: function () {
                return !0;
              },
              wsConstructor: void 0,
            }),
            (t.CONNECTING = 0),
            (t.OPEN = 1),
            (t.CLOSING = 2),
            (t.CLOSED = 3),
            t
          );
        })();
      e.Z = s;
    },
  },
]);

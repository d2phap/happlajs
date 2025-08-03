/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pt = globalThis, Tt = pt.ShadowRoot && (pt.ShadyCSS === void 0 || pt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Rt = Symbol(), le = /* @__PURE__ */ new WeakMap();
let ve = class {
  constructor(t, i, o) {
    if (this._$cssResult$ = !0, o !== Rt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Tt && t === void 0) {
      const o = i !== void 0 && i.length === 1;
      o && (t = le.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), o && le.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const cn = (n) => new ve(typeof n == "string" ? n : n + "", void 0, Rt), un = (n, ...t) => {
  const i = n.length === 1 ? n[0] : t.reduce((o, r, h) => o + ((l) => {
    if (l._$cssResult$ === !0) return l.cssText;
    if (typeof l == "number") return l;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + l + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + n[h + 1], n[0]);
  return new ve(i, n, Rt);
}, dn = (n, t) => {
  if (Tt) n.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const o = document.createElement("style"), r = pt.litNonce;
    r !== void 0 && o.setAttribute("nonce", r), o.textContent = i.cssText, n.appendChild(o);
  }
}, ce = Tt ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const o of t.cssRules) i += o.cssText;
  return cn(i);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: pn, defineProperty: fn, getOwnPropertyDescriptor: _n, getOwnPropertyNames: gn, getOwnPropertySymbols: mn, getPrototypeOf: yn } = Object, gt = globalThis, ue = gt.trustedTypes, bn = ue ? ue.emptyScript : "", $n = gt.reactiveElementPolyfillSupport, k = (n, t) => n, ft = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? bn : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let i = n;
  switch (t) {
    case Boolean:
      i = n !== null;
      break;
    case Number:
      i = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(n);
      } catch {
        i = null;
      }
  }
  return i;
} }, zt = (n, t) => !pn(n, t), de = { attribute: !0, type: String, converter: ft, reflect: !1, useDefault: !1, hasChanged: zt };
Symbol.metadata ??= Symbol("metadata"), gt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let L = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = de) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const o = Symbol(), r = this.getPropertyDescriptor(t, o, i);
      r !== void 0 && fn(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, i, o) {
    const { get: r, set: h } = _n(this.prototype, t) ?? { get() {
      return this[i];
    }, set(l) {
      this[i] = l;
    } };
    return { get: r, set(l) {
      const d = r?.call(this);
      h?.call(this, l), this.requestUpdate(t, d, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? de;
  }
  static _$Ei() {
    if (this.hasOwnProperty(k("elementProperties"))) return;
    const t = yn(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(k("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(k("properties"))) {
      const i = this.properties, o = [...gn(i), ...mn(i)];
      for (const r of o) this.createProperty(r, i[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [o, r] of i) this.elementProperties.set(o, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, o] of this.elementProperties) {
      const r = this._$Eu(i, o);
      r !== void 0 && this._$Eh.set(r, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const o = new Set(t.flat(1 / 0).reverse());
      for (const r of o) i.unshift(ce(r));
    } else t !== void 0 && i.push(ce(t));
    return i;
  }
  static _$Eu(t, i) {
    const o = i.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const o of i.keys()) this.hasOwnProperty(o) && (t.set(o, this[o]), delete this[o]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return dn(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, i, o) {
    this._$AK(t, o);
  }
  _$ET(t, i) {
    const o = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, o);
    if (r !== void 0 && o.reflect === !0) {
      const h = (o.converter?.toAttribute !== void 0 ? o.converter : ft).toAttribute(i, o.type);
      this._$Em = t, h == null ? this.removeAttribute(r) : this.setAttribute(r, h), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const o = this.constructor, r = o._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const h = o.getPropertyOptions(r), l = typeof h.converter == "function" ? { fromAttribute: h.converter } : h.converter?.fromAttribute !== void 0 ? h.converter : ft;
      this._$Em = r;
      const d = l.fromAttribute(i, h.type);
      this[r] = d ?? this._$Ej?.get(r) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, i, o) {
    if (t !== void 0) {
      const r = this.constructor, h = this[t];
      if (o ??= r.getPropertyOptions(t), !((o.hasChanged ?? zt)(h, i) || o.useDefault && o.reflect && h === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, o)))) return;
      this.C(t, i, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: o, reflect: r, wrapped: h }, l) {
    o && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, l ?? i ?? this[t]), h !== !0 || l !== void 0) || (this._$AL.has(t) || (this.hasUpdated || o || (i = void 0), this._$AL.set(t, i)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [r, h] of this._$Ep) this[r] = h;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [r, h] of o) {
        const { wrapped: l } = h, d = this[r];
        l !== !0 || this._$AL.has(r) || d === void 0 || this.C(r, void 0, h, d);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), this._$EO?.forEach((o) => o.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((i) => this._$ET(i, this[i])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
L.elementStyles = [], L.shadowRootOptions = { mode: "open" }, L[k("elementProperties")] = /* @__PURE__ */ new Map(), L[k("finalized")] = /* @__PURE__ */ new Map(), $n?.({ ReactiveElement: L }), (gt.reactiveElementVersions ??= []).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Dt = globalThis, _t = Dt.trustedTypes, pe = _t ? _t.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Ae = "$lit$", R = `lit$${Math.random().toFixed(9).slice(2)}$`, xe = "?" + R, vn = `<${xe}>`, N = document, tt = () => N.createComment(""), et = (n) => n === null || typeof n != "object" && typeof n != "function", Ut = Array.isArray, An = (n) => Ut(n) || typeof n?.[Symbol.iterator] == "function", St = `[ 	
\f\r]`, K = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, fe = /-->/g, _e = />/g, H = RegExp(`>|${St}(?:([^\\s"'>=/]+)(${St}*=${St}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ge = /'/g, me = /"/g, Ee = /^(?:script|style|textarea|title)$/i, xn = (n) => (t, ...i) => ({ _$litType$: n, strings: t, values: i }), En = xn(1), B = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), ye = /* @__PURE__ */ new WeakMap(), j = N.createTreeWalker(N, 129);
function we(n, t) {
  if (!Ut(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return pe !== void 0 ? pe.createHTML(t) : t;
}
const wn = (n, t) => {
  const i = n.length - 1, o = [];
  let r, h = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", l = K;
  for (let d = 0; d < i; d++) {
    const u = n[d];
    let $, v, g = -1, M = 0;
    for (; M < u.length && (l.lastIndex = M, v = l.exec(u), v !== null); ) M = l.lastIndex, l === K ? v[1] === "!--" ? l = fe : v[1] !== void 0 ? l = _e : v[2] !== void 0 ? (Ee.test(v[2]) && (r = RegExp("</" + v[2], "g")), l = H) : v[3] !== void 0 && (l = H) : l === H ? v[0] === ">" ? (l = r ?? K, g = -1) : v[1] === void 0 ? g = -2 : (g = l.lastIndex - v[2].length, $ = v[1], l = v[3] === void 0 ? H : v[3] === '"' ? me : ge) : l === me || l === ge ? l = H : l === fe || l === _e ? l = K : (l = H, r = void 0);
    const O = l === H && n[d + 1].startsWith("/>") ? " " : "";
    h += l === K ? u + vn : g >= 0 ? (o.push($), u.slice(0, g) + Ae + u.slice(g) + R + O) : u + R + (g === -2 ? d : O);
  }
  return [we(n, h + (n[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), o];
};
class it {
  constructor({ strings: t, _$litType$: i }, o) {
    let r;
    this.parts = [];
    let h = 0, l = 0;
    const d = t.length - 1, u = this.parts, [$, v] = wn(t, i);
    if (this.el = it.createElement($, o), j.currentNode = this.el.content, i === 2 || i === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (r = j.nextNode()) !== null && u.length < d; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const g of r.getAttributeNames()) if (g.endsWith(Ae)) {
          const M = v[l++], O = r.getAttribute(g).split(R), Z = /([.?@])?(.*)/.exec(M);
          u.push({ type: 1, index: h, name: Z[2], strings: O, ctor: Z[1] === "." ? Mn : Z[1] === "?" ? On : Z[1] === "@" ? Pn : mt }), r.removeAttribute(g);
        } else g.startsWith(R) && (u.push({ type: 6, index: h }), r.removeAttribute(g));
        if (Ee.test(r.tagName)) {
          const g = r.textContent.split(R), M = g.length - 1;
          if (M > 0) {
            r.textContent = _t ? _t.emptyScript : "";
            for (let O = 0; O < M; O++) r.append(g[O], tt()), j.nextNode(), u.push({ type: 2, index: ++h });
            r.append(g[M], tt());
          }
        }
      } else if (r.nodeType === 8) if (r.data === xe) u.push({ type: 2, index: h });
      else {
        let g = -1;
        for (; (g = r.data.indexOf(R, g + 1)) !== -1; ) u.push({ type: 7, index: h }), g += R.length - 1;
      }
      h++;
    }
  }
  static createElement(t, i) {
    const o = N.createElement("template");
    return o.innerHTML = t, o;
  }
}
function W(n, t, i = n, o) {
  if (t === B) return t;
  let r = o !== void 0 ? i._$Co?.[o] : i._$Cl;
  const h = et(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== h && (r?._$AO?.(!1), h === void 0 ? r = void 0 : (r = new h(n), r._$AT(n, i, o)), o !== void 0 ? (i._$Co ??= [])[o] = r : i._$Cl = r), r !== void 0 && (t = W(n, r._$AS(n, t.values), r, o)), t;
}
class Cn {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i }, parts: o } = this._$AD, r = (t?.creationScope ?? N).importNode(i, !0);
    j.currentNode = r;
    let h = j.nextNode(), l = 0, d = 0, u = o[0];
    for (; u !== void 0; ) {
      if (l === u.index) {
        let $;
        u.type === 2 ? $ = new nt(h, h.nextSibling, this, t) : u.type === 1 ? $ = new u.ctor(h, u.name, u.strings, this, t) : u.type === 6 && ($ = new Sn(h, this, t)), this._$AV.push($), u = o[++d];
      }
      l !== u?.index && (h = j.nextNode(), l++);
    }
    return j.currentNode = N, r;
  }
  p(t) {
    let i = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(t, o, i), i += o.strings.length - 2) : o._$AI(t[i])), i++;
  }
}
class nt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, o, r) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = o, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && t?.nodeType === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = W(this, t, i), et(t) ? t === A || t == null || t === "" ? (this._$AH !== A && this._$AR(), this._$AH = A) : t !== this._$AH && t !== B && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : An(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== A && et(this._$AH) ? this._$AA.nextSibling.data = t : this.T(N.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: o } = t, r = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = it.createElement(we(o.h, o.h[0]), this.options)), o);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const h = new Cn(r, this), l = h.u(this.options);
      h.p(i), this.T(l), this._$AH = h;
    }
  }
  _$AC(t) {
    let i = ye.get(t.strings);
    return i === void 0 && ye.set(t.strings, i = new it(t)), i;
  }
  k(t) {
    Ut(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let o, r = 0;
    for (const h of t) r === i.length ? i.push(o = new nt(this.O(tt()), this.O(tt()), this, this.options)) : o = i[r], o._$AI(h), r++;
    r < i.length && (this._$AR(o && o._$AB.nextSibling, r), i.length = r);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const o = t.nextSibling;
      t.remove(), t = o;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class mt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, o, r, h) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t, this.name = i, this._$AM = r, this.options = h, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = A;
  }
  _$AI(t, i = this, o, r) {
    const h = this.strings;
    let l = !1;
    if (h === void 0) t = W(this, t, i, 0), l = !et(t) || t !== this._$AH && t !== B, l && (this._$AH = t);
    else {
      const d = t;
      let u, $;
      for (t = h[0], u = 0; u < h.length - 1; u++) $ = W(this, d[o + u], i, u), $ === B && ($ = this._$AH[u]), l ||= !et($) || $ !== this._$AH[u], $ === A ? t = A : t !== A && (t += ($ ?? "") + h[u + 1]), this._$AH[u] = $;
    }
    l && !r && this.j(t);
  }
  j(t) {
    t === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Mn extends mt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === A ? void 0 : t;
  }
}
class On extends mt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== A);
  }
}
class Pn extends mt {
  constructor(t, i, o, r, h) {
    super(t, i, o, r, h), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = W(this, t, i, 0) ?? A) === B) return;
    const o = this._$AH, r = t === A && o !== A || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, h = t !== A && (o === A || r);
    r && this.element.removeEventListener(this.name, this, o), h && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Sn {
  constructor(t, i, o) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    W(this, t);
  }
}
const Tn = Dt.litHtmlPolyfillSupport;
Tn?.(it, nt), (Dt.litHtmlVersions ??= []).push("3.3.1");
const Rn = (n, t, i) => {
  const o = i?.renderBefore ?? t;
  let r = o._$litPart$;
  if (r === void 0) {
    const h = i?.renderBefore ?? null;
    o._$litPart$ = r = new nt(t.insertBefore(tt(), h), h, void 0, i ?? {});
  }
  return r._$AI(n), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ht = globalThis;
class Q extends L {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Rn(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return B;
  }
}
Q._$litElement$ = !0, Q.finalized = !0, Ht.litElementHydrateSupport?.({ LitElement: Q });
const zn = Ht.litElementPolyfillSupport;
zn?.({ LitElement: Q });
(Ht.litElementVersions ??= []).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Dn = (n) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(n, t);
  }) : customElements.define(n, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Un = { attribute: !0, type: String, converter: ft, reflect: !1, hasChanged: zt }, Hn = (n = Un, t, i) => {
  const { kind: o, metadata: r } = i;
  let h = globalThis.litPropertyMetadata.get(r);
  if (h === void 0 && globalThis.litPropertyMetadata.set(r, h = /* @__PURE__ */ new Map()), o === "setter" && ((n = Object.create(n)).wrapped = !0), h.set(i.name, n), o === "accessor") {
    const { name: l } = i;
    return { set(d) {
      const u = t.get.call(this);
      t.set.call(this, d), this.requestUpdate(l, u, n);
    }, init(d) {
      return d !== void 0 && this.C(l, void 0, n, d), d;
    } };
  }
  if (o === "setter") {
    const { name: l } = i;
    return function(d) {
      const u = this[l];
      t.call(this, d), this.requestUpdate(l, u, n);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function jn(n) {
  return (t, i) => typeof i == "object" ? Hn(n, t, i) : ((o, r, h) => {
    const l = r.hasOwnProperty(h);
    return r.constructor.createProperty(h, o), l ? Object.getOwnPropertyDescriptor(r, h) : void 0;
  })(n, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function C(n) {
  return jn({ ...n, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Nn = (n, t, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(n, t, i), i);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function jt(n, t) {
  return (i, o, r) => {
    const h = (l) => l.renderRoot?.querySelector(n) ?? null;
    return Nn(i, o, { get() {
      return h(this);
    } });
  };
}
var dt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Zn(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var J = { exports: {} };
J.exports;
var be;
function Fn() {
  return be || (be = 1, function(n, t) {
    var i = 200, o = "__lodash_hash_undefined__", r = 800, h = 16, l = 9007199254740991, d = "[object Arguments]", u = "[object Array]", $ = "[object AsyncFunction]", v = "[object Boolean]", g = "[object Date]", M = "[object Error]", O = "[object Function]", Z = "[object GeneratorFunction]", Ce = "[object Map]", Me = "[object Number]", Oe = "[object Null]", Zt = "[object Object]", Pe = "[object Proxy]", Se = "[object RegExp]", Te = "[object Set]", Re = "[object String]", ze = "[object Undefined]", De = "[object WeakMap]", Ue = "[object ArrayBuffer]", He = "[object DataView]", je = "[object Float32Array]", Ne = "[object Float64Array]", Ze = "[object Int8Array]", Fe = "[object Int16Array]", Ie = "[object Int32Array]", Le = "[object Uint8Array]", Be = "[object Uint8ClampedArray]", We = "[object Uint16Array]", qe = "[object Uint32Array]", Ye = /[\\^$.*+?()[\]{}|]/g, Ve = /^\[object .+?Constructor\]$/, Ge = /^(?:0|[1-9]\d*)$/, m = {};
    m[je] = m[Ne] = m[Ze] = m[Fe] = m[Ie] = m[Le] = m[Be] = m[We] = m[qe] = !0, m[d] = m[u] = m[Ue] = m[v] = m[He] = m[g] = m[M] = m[O] = m[Ce] = m[Me] = m[Zt] = m[Se] = m[Te] = m[Re] = m[De] = !1;
    var Ft = typeof dt == "object" && dt && dt.Object === Object && dt, Xe = typeof self == "object" && self && self.Object === Object && self, q = Ft || Xe || Function("return this")(), It = t && !t.nodeType && t, Y = It && !0 && n && !n.nodeType && n, Lt = Y && Y.exports === It, yt = Lt && Ft.process, Bt = function() {
      try {
        var e = Y && Y.require && Y.require("util").types;
        return e || yt && yt.binding && yt.binding("util");
      } catch {
      }
    }(), Wt = Bt && Bt.isTypedArray;
    function Ke(e, s, a) {
      switch (a.length) {
        case 0:
          return e.call(s);
        case 1:
          return e.call(s, a[0]);
        case 2:
          return e.call(s, a[0], a[1]);
        case 3:
          return e.call(s, a[0], a[1], a[2]);
      }
      return e.apply(s, a);
    }
    function Je(e, s) {
      for (var a = -1, c = Array(e); ++a < e; )
        c[a] = s(a);
      return c;
    }
    function ke(e) {
      return function(s) {
        return e(s);
      };
    }
    function Qe(e, s) {
      return e?.[s];
    }
    function ti(e, s) {
      return function(a) {
        return e(s(a));
      };
    }
    var ei = Array.prototype, ii = Function.prototype, st = Object.prototype, bt = q["__core-js_shared__"], ot = ii.toString, T = st.hasOwnProperty, qt = function() {
      var e = /[^.]+$/.exec(bt && bt.keys && bt.keys.IE_PROTO || "");
      return e ? "Symbol(src)_1." + e : "";
    }(), Yt = st.toString, ni = ot.call(Object), si = RegExp(
      "^" + ot.call(T).replace(Ye, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), rt = Lt ? q.Buffer : void 0, Vt = q.Symbol, Gt = q.Uint8Array;
    rt && rt.allocUnsafe;
    var Xt = ti(Object.getPrototypeOf, Object), Kt = Object.create, oi = st.propertyIsEnumerable, ri = ei.splice, z = Vt ? Vt.toStringTag : void 0, at = function() {
      try {
        var e = At(Object, "defineProperty");
        return e({}, "", {}), e;
      } catch {
      }
    }(), ai = rt ? rt.isBuffer : void 0, Jt = Math.max, hi = Date.now, kt = At(q, "Map"), V = At(Object, "create"), li = /* @__PURE__ */ function() {
      function e() {
      }
      return function(s) {
        if (!U(s))
          return {};
        if (Kt)
          return Kt(s);
        e.prototype = s;
        var a = new e();
        return e.prototype = void 0, a;
      };
    }();
    function D(e) {
      var s = -1, a = e == null ? 0 : e.length;
      for (this.clear(); ++s < a; ) {
        var c = e[s];
        this.set(c[0], c[1]);
      }
    }
    function ci() {
      this.__data__ = V ? V(null) : {}, this.size = 0;
    }
    function ui(e) {
      var s = this.has(e) && delete this.__data__[e];
      return this.size -= s ? 1 : 0, s;
    }
    function di(e) {
      var s = this.__data__;
      if (V) {
        var a = s[e];
        return a === o ? void 0 : a;
      }
      return T.call(s, e) ? s[e] : void 0;
    }
    function pi(e) {
      var s = this.__data__;
      return V ? s[e] !== void 0 : T.call(s, e);
    }
    function fi(e, s) {
      var a = this.__data__;
      return this.size += this.has(e) ? 0 : 1, a[e] = V && s === void 0 ? o : s, this;
    }
    D.prototype.clear = ci, D.prototype.delete = ui, D.prototype.get = di, D.prototype.has = pi, D.prototype.set = fi;
    function S(e) {
      var s = -1, a = e == null ? 0 : e.length;
      for (this.clear(); ++s < a; ) {
        var c = e[s];
        this.set(c[0], c[1]);
      }
    }
    function _i() {
      this.__data__ = [], this.size = 0;
    }
    function gi(e) {
      var s = this.__data__, a = ht(s, e);
      if (a < 0)
        return !1;
      var c = s.length - 1;
      return a == c ? s.pop() : ri.call(s, a, 1), --this.size, !0;
    }
    function mi(e) {
      var s = this.__data__, a = ht(s, e);
      return a < 0 ? void 0 : s[a][1];
    }
    function yi(e) {
      return ht(this.__data__, e) > -1;
    }
    function bi(e, s) {
      var a = this.__data__, c = ht(a, e);
      return c < 0 ? (++this.size, a.push([e, s])) : a[c][1] = s, this;
    }
    S.prototype.clear = _i, S.prototype.delete = gi, S.prototype.get = mi, S.prototype.has = yi, S.prototype.set = bi;
    function F(e) {
      var s = -1, a = e == null ? 0 : e.length;
      for (this.clear(); ++s < a; ) {
        var c = e[s];
        this.set(c[0], c[1]);
      }
    }
    function $i() {
      this.size = 0, this.__data__ = {
        hash: new D(),
        map: new (kt || S)(),
        string: new D()
      };
    }
    function vi(e) {
      var s = ct(this, e).delete(e);
      return this.size -= s ? 1 : 0, s;
    }
    function Ai(e) {
      return ct(this, e).get(e);
    }
    function xi(e) {
      return ct(this, e).has(e);
    }
    function Ei(e, s) {
      var a = ct(this, e), c = a.size;
      return a.set(e, s), this.size += a.size == c ? 0 : 1, this;
    }
    F.prototype.clear = $i, F.prototype.delete = vi, F.prototype.get = Ai, F.prototype.has = xi, F.prototype.set = Ei;
    function I(e) {
      var s = this.__data__ = new S(e);
      this.size = s.size;
    }
    function wi() {
      this.__data__ = new S(), this.size = 0;
    }
    function Ci(e) {
      var s = this.__data__, a = s.delete(e);
      return this.size = s.size, a;
    }
    function Mi(e) {
      return this.__data__.get(e);
    }
    function Oi(e) {
      return this.__data__.has(e);
    }
    function Pi(e, s) {
      var a = this.__data__;
      if (a instanceof S) {
        var c = a.__data__;
        if (!kt || c.length < i - 1)
          return c.push([e, s]), this.size = ++a.size, this;
        a = this.__data__ = new F(c);
      }
      return a.set(e, s), this.size = a.size, this;
    }
    I.prototype.clear = wi, I.prototype.delete = Ci, I.prototype.get = Mi, I.prototype.has = Oi, I.prototype.set = Pi;
    function Si(e, s) {
      var a = wt(e), c = !a && Et(e), p = !a && !c && ne(e), _ = !a && !c && !p && oe(e), y = a || c || p || _, f = y ? Je(e.length, String) : [], b = f.length;
      for (var P in e)
        y && // Safari 9 has enumerable `arguments.length` in strict mode.
        (P == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        p && (P == "offset" || P == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        _ && (P == "buffer" || P == "byteLength" || P == "byteOffset") || // Skip index properties.
        ee(P, b)) || f.push(P);
      return f;
    }
    function $t(e, s, a) {
      (a !== void 0 && !ut(e[s], a) || a === void 0 && !(s in e)) && vt(e, s, a);
    }
    function Ti(e, s, a) {
      var c = e[s];
      (!(T.call(e, s) && ut(c, a)) || a === void 0 && !(s in e)) && vt(e, s, a);
    }
    function ht(e, s) {
      for (var a = e.length; a--; )
        if (ut(e[a][0], s))
          return a;
      return -1;
    }
    function vt(e, s, a) {
      s == "__proto__" && at ? at(e, s, {
        configurable: !0,
        enumerable: !0,
        value: a,
        writable: !0
      }) : e[s] = a;
    }
    var Ri = qi();
    function lt(e) {
      return e == null ? e === void 0 ? ze : Oe : z && z in Object(e) ? Yi(e) : ki(e);
    }
    function Qt(e) {
      return G(e) && lt(e) == d;
    }
    function zi(e) {
      if (!U(e) || Ki(e))
        return !1;
      var s = Mt(e) ? si : Ve;
      return s.test(nn(e));
    }
    function Di(e) {
      return G(e) && se(e.length) && !!m[lt(e)];
    }
    function Ui(e) {
      if (!U(e))
        return Ji(e);
      var s = ie(e), a = [];
      for (var c in e)
        c == "constructor" && (s || !T.call(e, c)) || a.push(c);
      return a;
    }
    function te(e, s, a, c, p) {
      e !== s && Ri(s, function(_, y) {
        if (p || (p = new I()), U(_))
          Hi(e, s, y, a, te, c, p);
        else {
          var f = c ? c(xt(e, y), _, y + "", e, s, p) : void 0;
          f === void 0 && (f = _), $t(e, y, f);
        }
      }, re);
    }
    function Hi(e, s, a, c, p, _, y) {
      var f = xt(e, a), b = xt(s, a), P = y.get(b);
      if (P) {
        $t(e, a, P);
        return;
      }
      var w = _ ? _(f, b, a + "", e, s, y) : void 0, X = w === void 0;
      if (X) {
        var Ot = wt(b), Pt = !Ot && ne(b), he = !Ot && !Pt && oe(b);
        w = b, Ot || Pt || he ? wt(f) ? w = f : sn(f) ? w = Li(f) : Pt ? (X = !1, w = Zi(b)) : he ? (X = !1, w = Ii(b)) : w = [] : on(b) || Et(b) ? (w = f, Et(f) ? w = rn(f) : (!U(f) || Mt(f)) && (w = Vi(b))) : X = !1;
      }
      X && (y.set(b, w), p(w, b, c, _, y), y.delete(b)), $t(e, a, w);
    }
    function ji(e, s) {
      return tn(Qi(e, s, ae), e + "");
    }
    var Ni = at ? function(e, s) {
      return at(e, "toString", {
        configurable: !0,
        enumerable: !1,
        value: hn(s),
        writable: !0
      });
    } : ae;
    function Zi(e, s) {
      return e.slice();
    }
    function Fi(e) {
      var s = new e.constructor(e.byteLength);
      return new Gt(s).set(new Gt(e)), s;
    }
    function Ii(e, s) {
      var a = Fi(e.buffer);
      return new e.constructor(a, e.byteOffset, e.length);
    }
    function Li(e, s) {
      var a = -1, c = e.length;
      for (s || (s = Array(c)); ++a < c; )
        s[a] = e[a];
      return s;
    }
    function Bi(e, s, a, c) {
      var p = !a;
      a || (a = {});
      for (var _ = -1, y = s.length; ++_ < y; ) {
        var f = s[_], b = void 0;
        b === void 0 && (b = e[f]), p ? vt(a, f, b) : Ti(a, f, b);
      }
      return a;
    }
    function Wi(e) {
      return ji(function(s, a) {
        var c = -1, p = a.length, _ = p > 1 ? a[p - 1] : void 0, y = p > 2 ? a[2] : void 0;
        for (_ = e.length > 3 && typeof _ == "function" ? (p--, _) : void 0, y && Gi(a[0], a[1], y) && (_ = p < 3 ? void 0 : _, p = 1), s = Object(s); ++c < p; ) {
          var f = a[c];
          f && e(s, f, c, _);
        }
        return s;
      });
    }
    function qi(e) {
      return function(s, a, c) {
        for (var p = -1, _ = Object(s), y = c(s), f = y.length; f--; ) {
          var b = y[++p];
          if (a(_[b], b, _) === !1)
            break;
        }
        return s;
      };
    }
    function ct(e, s) {
      var a = e.__data__;
      return Xi(s) ? a[typeof s == "string" ? "string" : "hash"] : a.map;
    }
    function At(e, s) {
      var a = Qe(e, s);
      return zi(a) ? a : void 0;
    }
    function Yi(e) {
      var s = T.call(e, z), a = e[z];
      try {
        e[z] = void 0;
        var c = !0;
      } catch {
      }
      var p = Yt.call(e);
      return c && (s ? e[z] = a : delete e[z]), p;
    }
    function Vi(e) {
      return typeof e.constructor == "function" && !ie(e) ? li(Xt(e)) : {};
    }
    function ee(e, s) {
      var a = typeof e;
      return s = s ?? l, !!s && (a == "number" || a != "symbol" && Ge.test(e)) && e > -1 && e % 1 == 0 && e < s;
    }
    function Gi(e, s, a) {
      if (!U(a))
        return !1;
      var c = typeof s;
      return (c == "number" ? Ct(a) && ee(s, a.length) : c == "string" && s in a) ? ut(a[s], e) : !1;
    }
    function Xi(e) {
      var s = typeof e;
      return s == "string" || s == "number" || s == "symbol" || s == "boolean" ? e !== "__proto__" : e === null;
    }
    function Ki(e) {
      return !!qt && qt in e;
    }
    function ie(e) {
      var s = e && e.constructor, a = typeof s == "function" && s.prototype || st;
      return e === a;
    }
    function Ji(e) {
      var s = [];
      if (e != null)
        for (var a in Object(e))
          s.push(a);
      return s;
    }
    function ki(e) {
      return Yt.call(e);
    }
    function Qi(e, s, a) {
      return s = Jt(s === void 0 ? e.length - 1 : s, 0), function() {
        for (var c = arguments, p = -1, _ = Jt(c.length - s, 0), y = Array(_); ++p < _; )
          y[p] = c[s + p];
        p = -1;
        for (var f = Array(s + 1); ++p < s; )
          f[p] = c[p];
        return f[s] = a(y), Ke(e, this, f);
      };
    }
    function xt(e, s) {
      if (!(s === "constructor" && typeof e[s] == "function") && s != "__proto__")
        return e[s];
    }
    var tn = en(Ni);
    function en(e) {
      var s = 0, a = 0;
      return function() {
        var c = hi(), p = h - (c - a);
        if (a = c, p > 0) {
          if (++s >= r)
            return arguments[0];
        } else
          s = 0;
        return e.apply(void 0, arguments);
      };
    }
    function nn(e) {
      if (e != null) {
        try {
          return ot.call(e);
        } catch {
        }
        try {
          return e + "";
        } catch {
        }
      }
      return "";
    }
    function ut(e, s) {
      return e === s || e !== e && s !== s;
    }
    var Et = Qt(/* @__PURE__ */ function() {
      return arguments;
    }()) ? Qt : function(e) {
      return G(e) && T.call(e, "callee") && !oi.call(e, "callee");
    }, wt = Array.isArray;
    function Ct(e) {
      return e != null && se(e.length) && !Mt(e);
    }
    function sn(e) {
      return G(e) && Ct(e);
    }
    var ne = ai || ln;
    function Mt(e) {
      if (!U(e))
        return !1;
      var s = lt(e);
      return s == O || s == Z || s == $ || s == Pe;
    }
    function se(e) {
      return typeof e == "number" && e > -1 && e % 1 == 0 && e <= l;
    }
    function U(e) {
      var s = typeof e;
      return e != null && (s == "object" || s == "function");
    }
    function G(e) {
      return e != null && typeof e == "object";
    }
    function on(e) {
      if (!G(e) || lt(e) != Zt)
        return !1;
      var s = Xt(e);
      if (s === null)
        return !0;
      var a = T.call(s, "constructor") && s.constructor;
      return typeof a == "function" && a instanceof a && ot.call(a) == ni;
    }
    var oe = Wt ? ke(Wt) : Di;
    function rn(e) {
      return Bi(e, re(e));
    }
    function re(e) {
      return Ct(e) ? Si(e) : Ui(e);
    }
    var an = Wi(function(e, s, a) {
      te(e, s, a);
    });
    function hn(e) {
      return function() {
        return e;
      };
    }
    function ae(e) {
      return e;
    }
    function ln() {
      return !1;
    }
    n.exports = an;
  }(J, J.exports)), J.exports;
}
var In = Fn();
const Ln = /* @__PURE__ */ Zn(In), $e = (n, t) => new Promise((i) => {
  setTimeout(() => i(t), n);
});
class Nt {
  constructor(t = 0, i = 0, o = 0, r = 0) {
    this.left = 0, this.right = 0, this.top = 0, this.bottom = 0, this.left = t, this.top = i, this.right = o, this.bottom = r, this.multiply = this.multiply.bind(this);
  }
  get horizontal() {
    return this.left + this.right;
  }
  get vertical() {
    return this.top + this.bottom;
  }
  multiply(t) {
    return t < 0 ? this : new Nt(
      this.left * t,
      this.top * t,
      this.right * t,
      this.bottom * t
    );
  }
}
var Bn = Object.defineProperty, Wn = Object.getOwnPropertyDescriptor, E = (n, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Wn(t, i) : t, h = n.length - 1, l; h >= 0; h--)
    (l = n[h]) && (r = (o ? l(t, i, r) : l(r)) || r);
  return o && r && Bn(t, i, r), r;
};
let x = class extends Q {
  constructor() {
    super(...arguments), this._isPointerDown = !1, this._domMatrix = new DOMMatrix(), this._contentDOMObserver = null, this._resizeObserver = null, this._isContentElDOMChanged = !1, this._pointerLocation = {}, this._panningAnimationFrame = NaN, this._zoomingAnimationFrame = NaN, this._isPanning = !1, this._isZooming = !1, this._isManualZooming = !1, this._options = {}, this._defaultOptions = {
      allowZoom: !0,
      zoomFactor: 1,
      minZoom: 0.01,
      maxZoom: 100,
      allowPan: !0,
      panOffset: new DOMPoint(0, 0),
      imageRendering: "auto",
      scaleRatio: 1,
      // window.devicePixelRatio,
      padding: new Nt()
    };
  }
  get options() {
    return this._options;
  }
  get pointerLocation() {
    return this._pointerLocation || {};
  }
  get imageRendering() {
    return this._options.imageRendering;
  }
  set imageRendering(n) {
    this._options.imageRendering = n, this.updateImageRendering();
  }
  get scaleRatio() {
    return this._options.scaleRatio;
  }
  set scaleRatio(n) {
    this._options.scaleRatio = n;
  }
  get padding() {
    return this._options.padding;
  }
  set padding(n) {
    this._options.padding = n;
  }
  /** Gets zoom factor after computing device ratio (DPI) */
  get zoomFactor() {
    return this._options.zoomFactor * this._options.scaleRatio;
  }
  render() {
    return En`
    <div tabindex="0" class="hp-box" @wheel=${this.onMouseWheel}
      @pointerenter=${this.onPointerEnter}
      @pointerleave=${this.onPointerLeave}
      @pointerdown=${this.onPointerDown}
      @pointerup=${this.onPointerUp}
      @pointermove=${this.onPointerMove}>
      <div class="hp-box-wrapper">
        <div class="hp-box-content">
          <slot></slot>
        </div>
      </div>
    </div>
    `;
  }
  async connectedCallback() {
    super.connectedCallback(), await this.updateComplete, this.initialize(), this.enable();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.disable();
  }
  onContentElDOMChanged(n) {
    let t = !1;
    n.forEach((i) => {
      i.type === "childList" && (t = !0);
    }), this._isContentElDOMChanged = t;
  }
  async onResizing() {
    if (this.checkIfNeedRecenter()) {
      await this.recenter(), this._isManualZooming || await this.setZoomMode();
      const n = this._boxContentEl.getBoundingClientRect();
      this.dispatchEvent(new CustomEvent("contentSizeChanged", {
        detail: n
      }));
    }
    this.dispatchEvent(new CustomEvent("resizing"));
  }
  onMouseWheel(n) {
    if (n.deltaY !== 0 && (this.dispatchEvent(new WheelEvent("wheel", n)), !n.defaultPrevented)) {
      const t = n.deltaY < 0 ? "up" : "down", i = 1 + Math.abs(n.deltaY) / 300, o = t === "up" ? i : 1 / i;
      this.zoomByDelta(o, n.clientX, n.clientY, !0);
    }
  }
  onPointerEnter(n) {
    this._pointerLocation = { x: n.pageX, y: n.pageY };
  }
  onPointerLeave(n) {
    this._pointerLocation = {}, this.onPointerUp(n);
  }
  onPointerDown(n) {
    n.button === 0 && (this._boxEl.setPointerCapture(n.pointerId), this._isPointerDown = !0, this._options.panOffset.x = n.clientX, this._options.panOffset.y = n.clientY);
  }
  async onPointerMove(n) {
    this._pointerLocation = { x: n.pageX, y: n.pageY }, this._isPointerDown && (await this.panToDistance(
      n.clientX - this._options.panOffset.x,
      n.clientY - this._options.panOffset.y
    ), this._options.panOffset.x = n.clientX, this._options.panOffset.y = n.clientY);
  }
  onPointerUp(n) {
    this._isPointerDown && (this._boxEl.releasePointerCapture(n.pointerId), this._isPointerDown = !1, this._options.panOffset.x += n.clientX - this._options.panOffset.x, this._options.panOffset.y += n.clientY - this._options.panOffset.y, this.dispatchEvent(new CustomEvent("afterPanned", {
      detail: { x: this._domMatrix.e, y: this._domMatrix.f }
    })));
  }
  //#region Private Methods
  initialize(n) {
    this._options = Ln({}, this._defaultOptions, n), this._options.zoomFactor /= this._options.scaleRatio, this.setZoomMode("AutoZoom"), this._domMatrix = new DOMMatrix().scaleSelf(this.dpi(this.zoomFactor)).translateSelf(this._options.panOffset.x, this._options.panOffset.y), this._contentDOMObserver = new MutationObserver((t) => this.onContentElDOMChanged(t)), this._resizeObserver = new ResizeObserver(() => this.onResizing()), this.disable(), this.onResizing(), this.dispatchEvent(new CustomEvent("beforeContentReady"));
  }
  dpi(n) {
    return n / this._options.scaleRatio;
  }
  updateImageRendering() {
    switch (this.imageRendering) {
      case "auto":
        this.zoomFactor <= 1 ? this._boxContentEl.style.imageRendering = "auto" : this._boxContentEl.style.imageRendering = "pixelated";
        break;
      default:
        this._boxContentEl.style.imageRendering = this.imageRendering;
        break;
    }
  }
  getCenterPoint(n) {
    const t = this._boxContentEl.scrollWidth * n, i = this._boxContentEl.scrollHeight * n, o = this.padding.multiply(1 / this.scaleRatio), r = (this._boxEl.offsetWidth - t) / 2 + o.left / 2 - o.right / 2, h = (this._boxEl.offsetHeight - i) / 2 + o.top / 2 - o.bottom / 2;
    return new DOMPoint(r, h);
  }
  checkIfNeedRecenter() {
    const n = this._boxEl.getBoundingClientRect(), t = this._boxContentEl.getBoundingClientRect();
    return t.left >= n.left || t.top >= n.top || t.right <= n.right || t.bottom <= n.bottom;
  }
  async animatePanning(n, t = 20) {
    const i = this.dpi(t || 20);
    let o = 0, r = 0;
    n === "left" ? o = i : n === "right" && (o = -i), n === "up" ? r = i : n === "down" && (r = -i), await this.panToDistance(o, r), this._panningAnimationFrame = requestAnimationFrame(() => this.animatePanning(n, t));
  }
  async animateZooming(n, t = 20) {
    const o = (n ? -20 : 20) / (501 - t);
    let r = this._options.zoomFactor;
    n ? r = this._options.zoomFactor / (1 - o) : r = this._options.zoomFactor * (1 + o);
    const h = r / this._options.zoomFactor, l = this.pointerLocation.x ?? -1, d = this.pointerLocation.y ?? -1;
    await this.zoomByDelta(h, l, d, !0), this._zoomingAnimationFrame = requestAnimationFrame(() => this.animateZooming(n, t));
  }
  //#endregion Private Methods
  //#region Public Methods
  async loadHtmlContent(n) {
    for (this._isContentElDOMChanged = !1, this._boxContentEl.innerHTML = n; !this._isContentElDOMChanged; )
      await $e(10);
    const t = this._boxContentEl.querySelectorAll("img"), i = Array.from(t);
    for (; i.some((o) => !o.complete); )
      await $e(10);
    this.dispatchEvent(new CustomEvent("contentReady"));
  }
  async startPanningAnimation(n, t = 20) {
    this._isPanning || (this._isPanning = !0, this.animatePanning(n, t));
  }
  stopPanningAnimation() {
    cancelAnimationFrame(this._panningAnimationFrame), this._isPanning = !1;
  }
  async startZoomingAnimation(n, t = 20) {
    this._isZooming || (this._isZooming = !0, this.animateZooming(n, t));
  }
  stopZoomingAnimation() {
    cancelAnimationFrame(this._zoomingAnimationFrame), this._isZooming = !1;
  }
  async recenter(n) {
    const { x: t, y: i } = this.getCenterPoint(this._options.zoomFactor);
    this._domMatrix.e = t, this._domMatrix.f = i, await this.applyTransform(n);
  }
  panToDistance(n = 0, t = 0, i) {
    const o = this._domMatrix.e + n, r = this._domMatrix.f + t;
    return this.panTo(o, r, i);
  }
  async panTo(n, t, i) {
    const o = this._boxEl.getBoundingClientRect(), r = this._boxContentEl.getBoundingClientRect();
    let h = n, l = t;
    const d = this.padding.multiply(1 / this.scaleRatio);
    h > d.left && (h = d.left), h + r.width < o.right - d.right && (h = this._domMatrix.e), l > d.top && (l = d.top), l + r.height < o.bottom - d.bottom && (l = this._domMatrix.f), this._domMatrix.e = h, this._domMatrix.f = l, this.dispatchEvent(new CustomEvent("panning", {
      detail: { x: h, y: l }
    })), await this.applyTransform(i);
  }
  async zoomByDelta(n, t, i, o = !1, r = 0) {
    if (!this._options.allowZoom) return;
    const l = this._options.zoomFactor * this.scaleRatio * n, d = (t ?? this._boxEl.offsetLeft) - this._boxEl.offsetLeft, u = (i ?? this._boxEl.offsetTop) - this._boxEl.offsetTop;
    return this.zoomToPoint(l, {
      x: d,
      y: u,
      duration: r,
      isManualZoom: o,
      useDelta: !0,
      isZoomModeChanged: !1
    });
  }
  async setZoomMode(n = "AutoZoom", t = -1, i = 0) {
    const o = this._boxContentEl.scrollWidth / this.scaleRatio, r = this._boxContentEl.scrollHeight / this.scaleRatio;
    if (o === 0 || r === 0) return;
    const h = this.padding.multiply(1 / this.scaleRatio), l = (this._boxEl.clientWidth - h.horizontal) / o, d = (this._boxEl.clientHeight - h.vertical) / r;
    let u = 1;
    n === "ScaleToWidth" ? u = l : n === "ScaleToHeight" ? u = d : n === "ScaleToFit" ? u = Math.min(l, d) : n === "ScaleToFill" ? u = Math.max(l, d) : n === "LockZoom" ? u = t > 0 ? t : this.zoomFactor : l >= 1 && d >= 1 ? u = 1 : u = Math.min(l, d), this.zoomToCenter(u, {
      isManualZoom: !1,
      duration: i,
      isZoomModeChanged: !0
    });
  }
  async zoomToCenter(n, t = {}) {
    const i = this._boxContentEl.scrollWidth / this.scaleRatio * n, o = this._boxContentEl.scrollHeight / this.scaleRatio * n, r = this.padding.multiply(1 / this.scaleRatio), h = (this._boxEl.offsetWidth - i) / 2 + r.left / 2 - r.right / 2, l = (this._boxEl.offsetHeight - o) / 2 + r.top / 2 - r.bottom / 2;
    this.zoomToPoint(n, {
      x: h,
      y: l,
      duration: t.duration,
      isManualZoom: t.isManualZoom,
      isZoomModeChanged: t.isZoomModeChanged
    });
  }
  async zoomToPoint(n, t) {
    let { x: i, y: o } = t, r = this.dpi(n);
    const h = this._options.zoomFactor, l = this.checkIfNeedRecenter(), d = !(t.useDelta ?? !0);
    if (this._isManualZooming = t.isManualZoom ?? !1, r = Math.min(
      Math.max(this._options.minZoom, r),
      this._options.maxZoom
    ), this.dispatchEvent(new CustomEvent("beforeZoomChanged", {
      detail: {
        zoomFactor: this.zoomFactor,
        x: this._domMatrix.e,
        y: this._domMatrix.f,
        isManualZoom: this._isManualZooming,
        isZoomModeChanged: t.isZoomModeChanged ?? !1
      }
    })), l) {
      const v = this.getCenterPoint(r);
      i = v.x, o = v.y;
    }
    const u = r / h;
    this._options.zoomFactor = r, (d || l) && (this._domMatrix.e = i, this._domMatrix.f = o), this._domMatrix = new DOMMatrix().translateSelf(i, o).scaleSelf(u).translateSelf(-i, -o).multiplySelf(this._domMatrix), this.updateImageRendering(), await this.applyTransform(t.duration), this.dispatchEvent(new CustomEvent("afterZoomChanged", {
      detail: {
        zoomFactor: this.zoomFactor,
        x: this._domMatrix.e,
        y: this._domMatrix.f,
        isManualZoom: this._isManualZooming,
        isZoomModeChanged: t.isZoomModeChanged ?? !1
      }
    }));
    const $ = this._boxContentEl.getBoundingClientRect();
    this.dispatchEvent(new CustomEvent("contentSizeChanged", {
      detail: $
    }));
  }
  async applyTransform(n = 0) {
    await new Promise((t) => {
      if (this._boxContentEl.style.transform = `${this._domMatrix.toString()}`, n > 0) {
        const i = `transform ${n}ms ease, opacity ${n}ms ease`;
        this._boxContentEl.style.transition = i, setTimeout(t, n);
      } else
        this._boxContentEl.style.transition = "", t(void 0);
    }), this.dispatchEvent(new CustomEvent("afterTransformed", {
      detail: this._domMatrix
    }));
  }
  enable() {
    this.applyTransform(), this._resizeObserver?.observe(this._boxEl), this._contentDOMObserver?.observe(this._boxContentEl, {
      attributes: !1,
      childList: !0
    });
  }
  disable() {
    this._resizeObserver?.disconnect(), this._contentDOMObserver?.disconnect();
  }
  //#endregion Public Methods
};
x.styles = [
  un`
      :host {
        display: block;
      }
      :host * {
        -webkit-user-drag: none;
        user-select: none;
      }

      .hp-box {
        margin: auto;
        max-width: 100vw;
        max-height: 100vh;
        width: 100vw;
        height: 100vh;

        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      .hp-box:focus,
      .hp-box:focus-visible {
        outline: none;
      }

      :host([checkerboard=true i]) .hp-box {
        background-size: 1.5rem 1.5rem;
        background-image: conic-gradient(
          rgb(255 255 255 / 0.1) 25%,
          rgb(0 0 0 / 0.1) 0 50%,
          rgb(255 255 255 / 0.1) 0 75%,
          rgb(0 0 0 / 0.1) 0
        );
      }

      .hp-box-wrapper {
        width: 100%;
        height: 100%;
        transition: all 100ms ease;
      }

      .hp-box-content {
        display: inline-flex;
        transform-origin: top left;
      }
    `
];
E([
  C()
], x.prototype, "_isPointerDown", 2);
E([
  C()
], x.prototype, "_domMatrix", 2);
E([
  C()
], x.prototype, "_contentDOMObserver", 2);
E([
  C()
], x.prototype, "_resizeObserver", 2);
E([
  C()
], x.prototype, "_isContentElDOMChanged", 2);
E([
  C()
], x.prototype, "_pointerLocation", 2);
E([
  C()
], x.prototype, "_panningAnimationFrame", 2);
E([
  C()
], x.prototype, "_zoomingAnimationFrame", 2);
E([
  C()
], x.prototype, "_isPanning", 2);
E([
  C()
], x.prototype, "_isZooming", 2);
E([
  C()
], x.prototype, "_isManualZooming", 2);
E([
  C()
], x.prototype, "_options", 2);
E([
  jt(".hp-box")
], x.prototype, "_boxEl", 2);
E([
  jt(".hp-box-wrapper")
], x.prototype, "_boxWrapperEl", 2);
E([
  jt(".hp-box-content")
], x.prototype, "_boxContentEl", 2);
x = E([
  Dn("happla-viewer")
], x);
export {
  x as HapplaViewer
};

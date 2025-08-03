import { LitElement, html, css } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import merge from 'lodash.merge';

import { pause } from '../helpers';
import { DOMPadding } from '../helpers/DOMPadding';


@customElement('happla-viewer')
export class HapplaViewer extends LitElement {
  @state() _isPointerDown = false;
  @state() _domMatrix = new DOMMatrix();

  @state() _contentDOMObserver: MutationObserver | null = null;
  @state() _resizeObserver: ResizeObserver | null = null;

  @state() _isContentElDOMChanged = false;
  @state() _pointerLocation: { x?: number, y?: number } = {};

  @state() _panningAnimationFrame = NaN;
  @state() _zoomingAnimationFrame = NaN;
  @state() _isPanning = false;
  @state() _isZooming = false;
  @state() _isManualZooming = false;

  @state() _options = {} as THapplaBoxOptions;
  private _defaultOptions: THapplaBoxOptions = {
    allowZoom: true,
    zoomFactor: 1,
    minZoom: 0.01,
    maxZoom: 100,

    allowPan: true,
    panOffset: new DOMPoint(0, 0),

    imageRendering: 'auto',
    scaleRatio: 1, // window.devicePixelRatio,
    padding: new DOMPadding(),
  };

  @query('.hp-box') _boxEl!: HTMLElement;
  @query('.hp-box-wrapper') _boxWrapperEl!: HTMLElement;
  @query('.hp-box-content') _boxContentEl!: HTMLElement;


  get options() {
    return this._options;
  }

  get pointerLocation(): { x?: number, y?: number } {
    return this._pointerLocation || {};
  }

  get imageRendering() {
    return this._options.imageRendering;
  }

  set imageRendering(value: TInterpolationMode) {
    this._options.imageRendering = value;

    this.updateImageRendering();
  }

  get scaleRatio() {
    return this._options.scaleRatio;
  }

  set scaleRatio(value: number) {
    this._options.scaleRatio = value;
  }

  get padding() {
    return this._options.padding;
  }

  set padding(value: DOMPadding) {
    this._options.padding = value;
  }

  /** Gets zoom factor after computing device ratio (DPI) */
  get zoomFactor() {
    return this._options.zoomFactor * this._options.scaleRatio;
  }


  static styles = [
    css`
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

  render() {
    return html`
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
    super.connectedCallback();

    await this.updateComplete;
    this.initialize();

    this.enable();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.disable();
  }


  private onContentElDOMChanged(mutations: MutationRecord[]) {
    let isContentElDOMChanged = false;

    mutations.forEach(m => {
      if (m.type === 'childList') {
        isContentElDOMChanged = true;
      }
    });

    this._isContentElDOMChanged = isContentElDOMChanged;
  }

  private async onResizing() {
    if (this.checkIfNeedRecenter()) {
      await this.recenter();

      if (!this._isManualZooming) {
        await this.setZoomMode();
      }

      // raise event contentSizeChanged
      const bound = this._boxContentEl.getBoundingClientRect();
      this.dispatchEvent(new CustomEvent<DOMRect>('contentSizeChanged', {
        detail: bound,
      }));
    }

    // emit event resizing
    this.dispatchEvent(new CustomEvent<null>('resizing'));
  }

  private onMouseWheel(e: WheelEvent) {
    // ignore horizontal scroll events
    if (e.deltaY === 0) return;

    // emit event wheel
    this.dispatchEvent(new WheelEvent('wheel', e));

    if (!e.defaultPrevented) {
      const direction = e.deltaY < 0 ? 'up' : 'down';
      const normalizedDeltaY = 1 + Math.abs(e.deltaY) / 300; // speed
      const delta = direction === 'up' ? normalizedDeltaY : 1 / normalizedDeltaY;

      this.zoomByDelta(delta, e.clientX, e.clientY, true);
    }
  }

  private onPointerEnter(e: PointerEvent) {
    this._pointerLocation = { x: e.pageX, y: e.pageY };
  }

  private onPointerLeave(e: PointerEvent) {
    this._pointerLocation = {};
    this.onPointerUp(e);
  }

  private onPointerDown(e: PointerEvent) {
    // ignore right clicks
    if (e.button !== 0) return;

    this._boxEl.setPointerCapture(e.pointerId);
    this._isPointerDown = true;

    // We get the pointer position on click so we can get the value once the user starts to drag
    this._options.panOffset.x = e.clientX;
    this._options.panOffset.y = e.clientY;
  }

  private async onPointerMove(e: PointerEvent) {
    this._pointerLocation = { x: e.pageX, y: e.pageY };

    // Only run this function if the pointer is down
    if (!this._isPointerDown) return;

    await this.panToDistance(
      e.clientX - this._options.panOffset.x,
      e.clientY - this._options.panOffset.y,
    );

    this._options.panOffset.x = e.clientX;
    this._options.panOffset.y = e.clientY;
  }

  private onPointerUp(e: PointerEvent) {
    if (!this._isPointerDown) {
      return;
    }

    this._boxEl.releasePointerCapture(e.pointerId);
    this._isPointerDown = false;

    this._options.panOffset.x += e.clientX - this._options.panOffset.x;
    this._options.panOffset.y += e.clientY - this._options.panOffset.y;

    // emit event afterPanned
    this.dispatchEvent(new CustomEvent<TPanningEventArgs>('afterPanned', {
      detail: { x: this._domMatrix.e, y: this._domMatrix.f },
    }));
  }


  //#region Private Methods

  private initialize(options?: Partial<THapplaBoxOptions>) {
    this._options = merge({}, this._defaultOptions, options);

    // correct zoomFactor after calculating scaleRatio
    this._options.zoomFactor /= this._options.scaleRatio;
    this.setZoomMode('AutoZoom');

    this._domMatrix = new DOMMatrix()
      .scaleSelf(this.dpi(this.zoomFactor))
      .translateSelf(this._options.panOffset.x, this._options.panOffset.y);

    // create content DOM observer
    this._contentDOMObserver = new MutationObserver((mutations: MutationRecord[]) => this.onContentElDOMChanged(mutations));
    this._resizeObserver = new ResizeObserver(() => this.onResizing());

    this.disable();
    this.onResizing();

    // emit event beforeContentReady
    this.dispatchEvent(new CustomEvent<null>('beforeContentReady'));
  }

  private dpi(value: number) {
    return value / this._options.scaleRatio;
  }

  private updateImageRendering() {
    switch (this.imageRendering) {
      case 'auto':
        if (this.zoomFactor <= 1.0) {
          this._boxContentEl.style.imageRendering = 'auto';
        }
        else {
          this._boxContentEl.style.imageRendering = 'pixelated';
        }
        break;

      default:
        this._boxContentEl.style.imageRendering = this.imageRendering;
        break;
    }
  }

  private getCenterPoint(zoomFactor: number) {
    const fullW = this._boxContentEl.scrollWidth * zoomFactor;
    const fullH = this._boxContentEl.scrollHeight * zoomFactor;
    const scaledPadding = this.padding.multiply(1 / this.scaleRatio);

    // center point
    const x = (this._boxEl.offsetWidth - fullW) / 2 + scaledPadding.left / 2 - scaledPadding.right / 2;
    const y = (this._boxEl.offsetHeight - fullH) / 2 + scaledPadding.top / 2 - scaledPadding.bottom / 2;

    return new DOMPoint(x, y);
  }

  private checkIfNeedRecenter() {
    const boxBounds = this._boxEl.getBoundingClientRect();
    const contentBounds = this._boxContentEl.getBoundingClientRect();
    const isInsideBox = contentBounds.left >= boxBounds.left
      || contentBounds.top >= boxBounds.top
      || contentBounds.right <= boxBounds.right
      || contentBounds.bottom <= boxBounds.bottom;

    return isInsideBox;
  }

  private async animatePanning(direction: TPanDirection, panSpeed = 20) {
    const speed = this.dpi(panSpeed || 20);
    let x = 0;
    let y = 0;

    if (direction === 'left') {
      x = speed;
    }
    else if (direction === 'right') {
      x = -speed;
    }

    if (direction === 'up') {
      y = speed;
    }
    else if (direction === 'down') {
      y = -speed;
    }

    await this.panToDistance(x, y);

    this._panningAnimationFrame = requestAnimationFrame(() => this.animatePanning(direction, panSpeed));
  }

  private async animateZooming(isZoomOut: boolean, zoomSpeed = 20) {
    const zoomDelta = isZoomOut ? -20 : 20;
    const speed = zoomDelta / (501 - zoomSpeed);
    let newZoomFactor = this._options.zoomFactor;

    // zoom out
    if (isZoomOut) {
      newZoomFactor = this._options.zoomFactor / (1 - speed);
    }
    // zoom in
    else {
      newZoomFactor = this._options.zoomFactor * (1 + speed);
    }

    const newDelta = newZoomFactor / this._options.zoomFactor;
    const x = this.pointerLocation.x ?? -1;
    const y = this.pointerLocation.y ?? -1;

    await this.zoomByDelta(newDelta, x, y, true);

    this._zoomingAnimationFrame = requestAnimationFrame(() => this.animateZooming(isZoomOut, zoomSpeed));
  }

  //#endregion Private Methods


  //#region Public Methods
  public async loadHtmlContent(html: string) {
    this._isContentElDOMChanged = false;
    this._boxContentEl.innerHTML = html;

    while (!this._isContentElDOMChanged) {
      await pause(10);
    }

    const list = this._boxContentEl.querySelectorAll('img');
    const imgs = Array.from(list);

    while (imgs.some((i) => !i.complete)) {
      await pause(10);
    }

    // emit event contentReady
    this.dispatchEvent(new CustomEvent<null>('contentReady'));
  }

  public async startPanningAnimation(direction: TPanDirection, panSpeed = 20) {
    if (this._isPanning) return;

    this._isPanning = true;
    this.animatePanning(direction, panSpeed);
  }

  public stopPanningAnimation() {
    cancelAnimationFrame(this._panningAnimationFrame);
    this._isPanning = false;
  }

  public async startZoomingAnimation(isZoomOut: boolean, zoomSpeed = 20) {
    if (this._isZooming) return;

    this._isZooming = true;
    this.animateZooming(isZoomOut, zoomSpeed);
  }

  public stopZoomingAnimation() {
    cancelAnimationFrame(this._zoomingAnimationFrame);
    this._isZooming = false;
  }

  public async recenter(duration?: number) {
    const { x, y } = this.getCenterPoint(this._options.zoomFactor);
    this._domMatrix.e = x;
    this._domMatrix.f = y;

    await this.applyTransform(duration);
  }

  public panToDistance(dx = 0, dy = 0, duration?: number) {
    const x = this._domMatrix.e + dx;
    const y = this._domMatrix.f + dy;

    return this.panTo(x, y, duration);
  }

  public async panTo(x: number, y: number, duration?: number) {
    const boxBounds = this._boxEl.getBoundingClientRect();
    const contentBounds = this._boxContentEl.getBoundingClientRect();
    let newX = x;
    let newY = y;

    const scaledPadding = this.padding.multiply(1 / this.scaleRatio);

    // left bound
    if (newX > scaledPadding.left) newX = scaledPadding.left;

    // right bound
    if (newX + contentBounds.width < boxBounds.right - scaledPadding.right) newX = this._domMatrix.e;

    // top bound
    if (newY > scaledPadding.top) newY = scaledPadding.top;

    // bottom bound
    if (newY + contentBounds.height < boxBounds.bottom - scaledPadding.bottom) newY = this._domMatrix.f;

    this._domMatrix.e = newX;
    this._domMatrix.f = newY;

    // emit event panning
    this.dispatchEvent(new CustomEvent<TPanningEventArgs>('panning', {
      detail: { x: newX, y: newY },
    }));
    await this.applyTransform(duration);
  }

  public async zoomByDelta(
    delta: number, // zoom in: delta > 1, zoom out: delta < 1
    pageX?: number,
    pageY?: number,
    isManualZoom = false,
    duration: number = 0,
  ) {
    if (!this._options.allowZoom) return;

    const oldZoom = this._options.zoomFactor * this.scaleRatio;
    const newZoom = oldZoom * delta;

    const x = (pageX ?? this._boxEl.offsetLeft) - this._boxEl.offsetLeft;
    const y = (pageY ?? this._boxEl.offsetTop) - this._boxEl.offsetTop;

    return this.zoomToPoint(newZoom, {
      x, y,
      duration,
      isManualZoom,
      useDelta: true,
      isZoomModeChanged: false,
    });
  }

  public async setZoomMode(mode: TZoomMode = 'AutoZoom', zoomLockFactor = -1, duration = 0) {
    const fullW = this._boxContentEl.scrollWidth / this.scaleRatio;
    const fullH = this._boxContentEl.scrollHeight / this.scaleRatio;
    if (fullW === 0 || fullH === 0) return;

    const scaledPadding = this.padding.multiply(1 / this.scaleRatio);
    const widthScale = (this._boxEl.clientWidth - scaledPadding.horizontal) / fullW;
    const heightScale = (this._boxEl.clientHeight - scaledPadding.vertical) / fullH;
    let zoomFactor = 1;

    if (mode === 'ScaleToWidth') {
      zoomFactor = widthScale;
    }
    else if (mode === 'ScaleToHeight') {
      zoomFactor = heightScale;
    }
    else if (mode === 'ScaleToFit') {
      zoomFactor = Math.min(widthScale, heightScale);
    }
    else if (mode === 'ScaleToFill') {
      zoomFactor = Math.max(widthScale, heightScale);
    }
    else if (mode === 'LockZoom') {
      zoomFactor = zoomLockFactor > 0 ? zoomLockFactor : this.zoomFactor;
    }
    // AutoZoom
    else {
      // viewport size >= content size
      if (widthScale >= 1 && heightScale >= 1) {
        zoomFactor = 1; // show original size
      }
      else {
        zoomFactor = Math.min(widthScale, heightScale);
      }
    }

    this.zoomToCenter(zoomFactor, {
      isManualZoom: false,
      duration,
      isZoomModeChanged: true,
    });
  }

  public async zoomToCenter(factor: number, options: {
    isManualZoom?: boolean,
    duration?: number,
    isZoomModeChanged?: boolean,
  } = {}) {
    const fullW = this._boxContentEl.scrollWidth / this.scaleRatio * factor;
    const fullH = this._boxContentEl.scrollHeight / this.scaleRatio * factor;
    const scaledPadding = this.padding.multiply(1 / this.scaleRatio);

    // center point
    const x = (this._boxEl.offsetWidth - fullW) / 2 + scaledPadding.left / 2 - scaledPadding.right / 2;
    const y = (this._boxEl.offsetHeight - fullH) / 2 + scaledPadding.top / 2 - scaledPadding.bottom / 2;

    // change zoom factor
    this.zoomToPoint(factor, {
      x, y,
      duration: options.duration,
      isManualZoom: options.isManualZoom,
      isZoomModeChanged: options.isZoomModeChanged,
    });
  }

  public async zoomToPoint(factor: number, options: {
    x: number,
    y: number,
    duration?: number,
    useDelta?: boolean,
    isManualZoom?: boolean,
    isZoomModeChanged?: boolean,
  }) {
    let { x, y } = options;
    let newZoomFactor = this.dpi(factor);
    const oldZoomFactor = this._options.zoomFactor;
    const needRecenter = this.checkIfNeedRecenter();

    // when useDelta = false, we must set an init location for the matrix
    const setInitLocation = !(options.useDelta ?? true);
    this._isManualZooming = options.isManualZoom ?? false;

    // restrict the zoom factor
    newZoomFactor = Math.min(
      Math.max(this._options.minZoom, newZoomFactor),
      this._options.maxZoom,
    );

    // raise event beforeZoomChanged
    this.dispatchEvent(new CustomEvent<TZoomEventArgs>('beforeZoomChanged', {
      detail: {
        zoomFactor: this.zoomFactor,
        x: this._domMatrix.e,
        y: this._domMatrix.f,
        isManualZoom: this._isManualZooming,
        isZoomModeChanged: options.isZoomModeChanged ?? false,
      },
    }));

    // recenter the content
    if (needRecenter) {
      const center = this.getCenterPoint(newZoomFactor);
      x = center.x;
      y = center.y;
    }

    // use delta to transform the matrix
    const delta = newZoomFactor / oldZoomFactor;
    this._options.zoomFactor = newZoomFactor;

    if (setInitLocation || needRecenter) {
      this._domMatrix.e = x;
      this._domMatrix.f = y;
    }

    // apply scale and translate value using zoom delta value
    this._domMatrix = new DOMMatrix()
      .translateSelf(x, y)
      .scaleSelf(delta)
      .translateSelf(-x, -y)
      .multiplySelf(this._domMatrix);

    this.updateImageRendering();
    await this.applyTransform(options.duration);

    // raise event afterZoomChanged
    this.dispatchEvent(new CustomEvent<TZoomEventArgs>('afterZoomChanged', {
      detail: {
        zoomFactor: this.zoomFactor,
        x: this._domMatrix.e,
        y: this._domMatrix.f,
        isManualZoom: this._isManualZooming,
        isZoomModeChanged: options.isZoomModeChanged ?? false,
      },
    }));

    // raise event contentSizeChanged
    const bound = this._boxContentEl.getBoundingClientRect();
    this.dispatchEvent(new CustomEvent<DOMRect>('contentSizeChanged', {
      detail: bound,
    }));
  }

  public async applyTransform(duration = 0) {
    await new Promise((resolve) => {
      this._boxContentEl.style.transform = `${this._domMatrix.toString()}`;

      // apply animation
      if (duration > 0) {
        const transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
        this._boxContentEl.style.transition = transition;

        setTimeout(resolve, duration);
      }
      else {
        this._boxContentEl.style.transition = '';
        resolve(undefined);
      }
    });

    // raise event afterTransformed
    this.dispatchEvent(new CustomEvent<DOMMatrix>('afterTransformed', {
      detail: this._domMatrix,
    }));
  }

  public enable() {
    this.applyTransform();

    this._resizeObserver?.observe(this._boxEl);
    this._contentDOMObserver?.observe(this._boxContentEl, {
      attributes: false,
      childList: true,
    });
  }

  public disable() {
    this._resizeObserver?.disconnect();
    this._contentDOMObserver?.disconnect();
  }
  //#endregion Public Methods

}


declare global {
  interface HTMLElementTagNameMap {
    'happla-viewer': HapplaViewer;
  }
}

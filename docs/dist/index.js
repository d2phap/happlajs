/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../dist/main.js":
/*!***********************!*\
  !*** ../dist/main.js ***!
  \***********************/
/***/ (function(module) {

/*! 
  JavaScript library for zooming and panning v0.0.1
  ----------------------------------------
  Copyright (c) 2021 Duong Dieu Phap.
  Homepage: https://github.com/d2phap/happla
  Released under the MIT License.

  License information can be found in LICENSE.txt.
 */
!function (t, o) {
   true ? module.exports = o() : 0;
}(this, function () {
  return (() => {
    "use strict";

    var t = {
      d: (o, i) => {
        for (var n in i) t.o(i, n) && !t.o(o, n) && Object.defineProperty(o, n, {
          enumerable: !0,
          get: i[n]
        });
      },
      o: (t, o) => Object.prototype.hasOwnProperty.call(t, o),
      r: t => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(t, "__esModule", {
          value: !0
        });
      }
    },
        o = {};
    t.r(o), t.d(o, {
      Board: () => s,
      InterpolationMode: () => i
    });

    var i,
        n = function () {
      return (n = Object.assign || function (t) {
        for (var o, i = 1, n = arguments.length; i < n; i++) for (var e in o = arguments[i]) Object.prototype.hasOwnProperty.call(o, e) && (t[e] = o[e]);

        return t;
      }).apply(this, arguments);
    },
        e = function (t, o, i, n) {
      return new (i || (i = Promise))(function (e, r) {
        function s(t) {
          try {
            h(n.next(t));
          } catch (t) {
            r(t);
          }
        }

        function a(t) {
          try {
            h(n.throw(t));
          } catch (t) {
            r(t);
          }
        }

        function h(t) {
          var o;
          t.done ? e(t.value) : (o = t.value, o instanceof i ? o : new i(function (t) {
            t(o);
          })).then(s, a);
        }

        h((n = n.apply(t, o || [])).next());
      });
    },
        r = function (t, o) {
      var i,
          n,
          e,
          r,
          s = {
        label: 0,
        sent: function () {
          if (1 & e[0]) throw e[1];
          return e[1];
        },
        trys: [],
        ops: []
      };
      return r = {
        next: a(0),
        throw: a(1),
        return: a(2)
      }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
        return this;
      }), r;

      function a(r) {
        return function (a) {
          return function (r) {
            if (i) throw new TypeError("Generator is already executing.");

            for (; s;) try {
              if (i = 1, n && (e = 2 & r[0] ? n.return : r[0] ? n.throw || ((e = n.return) && e.call(n), 0) : n.next) && !(e = e.call(n, r[1])).done) return e;

              switch (n = 0, e && (r = [2 & r[0], e.value]), r[0]) {
                case 0:
                case 1:
                  e = r;
                  break;

                case 4:
                  return s.label++, {
                    value: r[1],
                    done: !1
                  };

                case 5:
                  s.label++, n = r[1], r = [0];
                  continue;

                case 7:
                  r = s.ops.pop(), s.trys.pop();
                  continue;

                default:
                  if (!(e = s.trys, (e = e.length > 0 && e[e.length - 1]) || 6 !== r[0] && 2 !== r[0])) {
                    s = 0;
                    continue;
                  }

                  if (3 === r[0] && (!e || r[1] > e[0] && r[1] < e[3])) {
                    s.label = r[1];
                    break;
                  }

                  if (6 === r[0] && s.label < e[1]) {
                    s.label = e[1], e = r;
                    break;
                  }

                  if (e && s.label < e[2]) {
                    s.label = e[2], s.ops.push(r);
                    break;
                  }

                  e[2] && s.ops.pop(), s.trys.pop();
                  continue;
              }

              r = o.call(t, s);
            } catch (t) {
              r = [6, t], n = 0;
            } finally {
              i = e = 0;
            }

            if (5 & r[0]) throw r[1];
            return {
              value: r[0] ? r[1] : void 0,
              done: !0
            };
          }([r, a]);
        };
      }
    };

    !function (t) {
      t.Pixelated = "pixelated", t.Auto = "auto", t.CrispEdges = "crisp-edges";
    }(i || (i = {}));

    var s = function () {
      function t(t, o, e) {
        this.isPointerDown = !1, this.moving = !1, this.arrowLeftDown = !1, this.arrowRightDown = !1, this.arrowUpDown = !1, this.arrowDownDown = !1, this.defaultOptions = {
          imageRendering: i.Pixelated,
          allowZoom: !0,
          minZoom: .05,
          maxZoom: 1e4,
          zoomFactor: 1,
          panOffset: {
            x: 0,
            y: 0
          },
          allowPan: !0,
          onBeforeZoomChanged: function () {
            return {};
          },
          onAfterZoomChanged: function () {
            return {};
          },
          onAfterTransformed: function () {
            return {};
          },
          onAfterPanOffsetChanged: function () {
            return {};
          }
        }, this.elBoard = t, this.elBoardContent = o, this.options = n(n({}, this.defaultOptions), e || {}), this.domMatrix = new DOMMatrix(), this.domMatrix.a = this.options.zoomFactor, this.domMatrix.d = this.options.zoomFactor, this.domMatrix.e = this.options.panOffset.x, this.domMatrix.f = this.options.panOffset.y, this.zoomDistance = this.zoomDistance.bind(this), this.moveDistance = this.moveDistance.bind(this), this.startMoving = this.startMoving.bind(this), this.stopMoving = this.stopMoving.bind(this), this.enable = this.enable.bind(this), this.disable = this.disable.bind(this), this.zoomTo = this.zoomTo.bind(this), this.panTo = this.panTo.bind(this), this.applyTransform = this.applyTransform.bind(this), this.waitForContentReady = this.waitForContentReady.bind(this), this.onMouseWheel = this.onMouseWheel.bind(this), this.onPointerDown = this.onPointerDown.bind(this), this.onPointerUp = this.onPointerUp.bind(this), this.onPointerMove = this.onPointerMove.bind(this), this.onKeyDown = this.onKeyDown.bind(this), this.onKeyUp = this.onKeyUp.bind(this), this.disable(), this.elBoardContent.style.transformOrigin = "top left", this.elBoard.style.touchAction = "none", this.elBoard.style.overflow = "hidden";
      }

      return Object.defineProperty(t.prototype, "imageRendering", {
        get: function () {
          return this.options.imageRendering;
        },
        set: function (t) {
          this.options.imageRendering = t, this.elBoardContent.style.imageRendering = t;
        },
        enumerable: !1,
        configurable: !0
      }), t.prototype.applyTransform = function (t) {
        var o = this;
        return void 0 === t && (t = 0), new Promise(function (i) {
          if (o.elBoardContent.style.transform = "" + o.domMatrix.toString(), t > 0) {
            var n = "transform " + t + "ms ease, opacity " + t + "ms ease";
            o.elBoardContent.style.transition = n, setTimeout(function () {
              o.options.onAfterTransformed(o.domMatrix), i(void 0);
            }, t);
          } else o.elBoardContent.style.transition = "", o.options.onAfterTransformed(o.domMatrix), i(void 0);
        });
      }, t.prototype.onMouseWheel = function (t) {
        if (0 !== t.deltaY) {
          var o = t.deltaY < 0 ? "up" : "down",
              i = 1 + Math.abs(t.deltaY) / 300,
              n = "up" === o ? i : 1 / i;
          this.zoomDistance(n, t.clientX, t.clientY);
        }
      }, t.prototype.onPointerDown = function (t) {
        0 === t.button && (this.isPointerDown = !0, this.options.panOffset.x = t.clientX, this.options.panOffset.y = t.clientY);
      }, t.prototype.onPointerMove = function (t) {
        this.isPointerDown && (this.moveDistance(t.clientX - this.options.panOffset.x, t.clientY - this.options.panOffset.y), this.options.panOffset.x = t.clientX, this.options.panOffset.y = t.clientY);
      }, t.prototype.onPointerUp = function (t) {
        this.isPointerDown && (this.isPointerDown = !1, this.options.panOffset.x += t.clientX - this.options.panOffset.x, this.options.panOffset.y += t.clientY - this.options.panOffset.y, this.options.onAfterPanOffsetChanged({
          x: this.domMatrix.e,
          y: this.domMatrix.f
        }));
      }, t.prototype.onKeyDown = function (t) {
        switch (t.key) {
          case "ArrowLeft":
            this.arrowLeftDown = !0, this.moving || (this.moving = !0, this.startMoving());
            break;

          case "ArrowUp":
            this.arrowUpDown = !0, this.moving || (this.moving = !0, this.startMoving());
            break;

          case "ArrowRight":
            this.arrowRightDown = !0, this.moving || (this.moving = !0, this.startMoving());
            break;

          case "ArrowDown":
            this.arrowDownDown = !0, this.moving || (this.moving = !0, this.startMoving());
        }
      }, t.prototype.onKeyUp = function (t) {
        switch (t.key) {
          case "ArrowLeft":
            this.arrowLeftDown = !1;
            break;

          case "ArrowUp":
            this.arrowUpDown = !1;
            break;

          case "ArrowRight":
            this.arrowRightDown = !1;
            break;

          case "ArrowDown":
            this.arrowDownDown = !1;
        }

        [this.arrowLeftDown, this.arrowUpDown, this.arrowRightDown, this.arrowDownDown].every(function (t) {
          return !t;
        }) && this.stopMoving();
      }, t.prototype.moveDistance = function (t, o) {
        void 0 === t && (t = 0), void 0 === o && (o = 0), this.domMatrix.e += t, this.domMatrix.f += o, this.applyTransform();
      }, t.prototype.zoomDistance = function (t, o, i, n) {
        if (this.options.allowZoom) {
          this.options.zoomFactor *= t, this.options.zoomFactor = Math.min(Math.max(this.options.minZoom, this.options.zoomFactor), this.options.maxZoom), this.options.onBeforeZoomChanged(this.options.zoomFactor, {
            x: this.domMatrix.e,
            y: this.domMatrix.f
          });
          var e = (null != o ? o : this.elBoard.offsetLeft) - this.elBoard.offsetLeft,
              r = (null != i ? i : this.elBoard.offsetTop) - this.elBoard.offsetTop;
          this.domMatrix = new DOMMatrix().translateSelf(e, r).scaleSelf(t).translateSelf(-e, -r).multiplySelf(this.domMatrix), this.options.onAfterZoomChanged(this.options.zoomFactor, {
            x: this.domMatrix.e,
            y: this.domMatrix.f
          }), this.applyTransform(n);
        }
      }, t.prototype.startMoving = function () {
        var t = Math.ceil(this.elBoardContent.clientWidth / 100),
            o = 0,
            i = 0;
        this.arrowLeftDown && !this.arrowRightDown ? o = t : !this.arrowLeftDown && this.arrowRightDown && (o = -t), this.arrowUpDown && !this.arrowDownDown ? i = t : !this.arrowUpDown && this.arrowDownDown && (i = -t), this.moveDistance(o, i), this.animationFrame = requestAnimationFrame(this.startMoving);
      }, t.prototype.stopMoving = function () {
        cancelAnimationFrame(this.animationFrame), this.moving = !1;
      }, t.prototype.panTo = function (t, o) {
        return e(this, void 0, void 0, function () {
          return r(this, function (i) {
            switch (i.label) {
              case 0:
                return this.domMatrix.e = t, this.domMatrix.f = o, [4, this.applyTransform(300)];

              case 1:
                return i.sent(), [2];
            }
          });
        });
      }, t.prototype.zoomTo = function (t, o, i, n) {
        return e(this, void 0, void 0, function () {
          return r(this, function (e) {
            switch (e.label) {
              case 0:
                return this.options.zoomFactor = Math.min(Math.max(this.options.minZoom, t), this.options.maxZoom), this.options.onBeforeZoomChanged(this.options.zoomFactor, {
                  x: this.domMatrix.e,
                  y: this.domMatrix.f
                }), this.domMatrix.a = this.options.zoomFactor, this.domMatrix.d = this.options.zoomFactor, this.domMatrix.e = o || 0, this.domMatrix.f = i || 0, this.options.onAfterZoomChanged(this.options.zoomFactor, {
                  x: this.domMatrix.e,
                  y: this.domMatrix.f
                }), [4, this.applyTransform(n)];

              case 1:
                return e.sent(), [2];
            }
          });
        });
      }, t.prototype.enable = function () {
        this.applyTransform(), this.elBoard.addEventListener("wheel", this.onMouseWheel, {
          passive: !0
        }), this.elBoard.addEventListener("pointerdown", this.onPointerDown), this.elBoard.addEventListener("pointerup", this.onPointerUp), this.elBoard.addEventListener("pointerleave", this.onPointerUp), this.elBoard.addEventListener("pointermove", this.onPointerMove), this.elBoard.addEventListener("keydown", this.onKeyDown), this.elBoard.addEventListener("keyup", this.onKeyUp);
      }, t.prototype.disable = function () {
        this.elBoard.removeEventListener("mousewheel", this.onMouseWheel), this.elBoard.removeEventListener("pointerdown", this.onPointerDown), this.elBoard.removeEventListener("pointerup", this.onPointerUp), this.elBoard.removeEventListener("pointerleave", this.onPointerUp), this.elBoard.removeEventListener("pointermove", this.onPointerMove), this.elBoard.removeEventListener("keydown", this.onKeyDown), this.elBoard.removeEventListener("keyup", this.onKeyUp);
      }, t.prototype.waitForContentReady = function () {
        return e(this, void 0, void 0, function () {
          var t, o;
          return r(this, function (i) {
            switch (i.label) {
              case 0:
                this.elBoardContent.style.opacity = "0", t = this.elBoardContent.querySelectorAll("img"), o = Array.from(t), i.label = 1;

              case 1:
                return o.some(function (t) {
                  return !t.complete;
                }) ? [4, (n = 10, new Promise(function (t) {
                  return setTimeout(t, n);
                }))] : [3, 3];

              case 2:
                return i.sent(), [3, 1];

              case 3:
                return this.elBoardContent.style.opacity = "1", [2];
            }

            var n;
          });
        });
      }, t;
    }();

    return o;
  })();
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _d2phap_happla__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @d2phap/happla */ "../dist/main.js");
/* harmony import */ var _d2phap_happla__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_d2phap_happla__WEBPACK_IMPORTED_MODULE_0__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// @ts-nocheck

var elBoard = document.getElementById('board');
var elBoardContent = document.getElementById('boardContent');
var board = new _d2phap_happla__WEBPACK_IMPORTED_MODULE_0__.Board(elBoard, elBoardContent, {
//
});
board.imageRendering = _d2phap_happla__WEBPACK_IMPORTED_MODULE_0__.InterpolationMode.Pixelated;
board.waitForContentReady()
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    var w, h, widthScale, heightScale, scale, x, y;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                board.enable();
                w = elBoardContent.scrollWidth;
                h = elBoardContent.scrollHeight;
                widthScale = elBoard.clientWidth / w;
                heightScale = elBoard.clientHeight / h;
                scale = Math.min(widthScale, heightScale);
                x = (elBoard.offsetWidth - (w * scale)) / 2;
                y = (elBoard.offsetHeight - (h * scale)) / 2;
                console.log(x + ", " + y);
                return [4 /*yield*/, board.zoomTo(scale, x, y)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// const img = document.getElementById('img');
// var poll = new Promise((resolve) => {
//   setInterval(function () {
//     if (img.naturalWidth) {
//       clearInterval(poll);
//       resolve({
//         width: img.naturalWidth,
//         height: img.naturalHeight,
//       });
//     }
//   }, 5);
// });
// poll.then(async ({ width, height }) => {
//   board.imageRendering = InterpolationMode.Pixelated;
//   console.log(board.imageRendering);
//   board.enable();
//   const w = elBoardContent.scrollWidth;
//   const h = elBoardContent.scrollHeight;
//   const widthScale = elBoard.clientWidth / w;
//   const heightScale = elBoard.clientHeight / h;
//   const scale = Math.min(widthScale, heightScale);
//   const x = (elBoard.offsetWidth - (w * scale)) / 2;
//   const y = (elBoard.offsetHeight - (h * scale)) / 2;
//   console.log(`${x}, ${y}`);
//   await board.zoomTo(scale, x, y);
//   // board.panTo(0, 0);
// });

})();

/******/ })()
;
//# sourceMappingURL=index.js.map
/*!
 * MIT License
 *
 * Copyright (c) 2021 Phap Dieu Duong
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("@d2phap/happla", [], factory);
	else if(typeof exports === 'object')
		exports["@d2phap/happla"] = factory();
	else
		root["@d2phap/happla"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/Board.ts":
/*!******************************!*\
  !*** ./src/modules/Board.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InterpolationMode": () => (/* binding */ InterpolationMode),
/* harmony export */   "Board": () => (/* binding */ Board)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./src/modules/helpers.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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

var InterpolationMode;
(function (InterpolationMode) {
    InterpolationMode["Pixelated"] = "pixelated";
    InterpolationMode["Auto"] = "auto";
    InterpolationMode["CrispEdges"] = "-webkit-optimize-contrast";
})(InterpolationMode || (InterpolationMode = {}));
var Board = /** @class */ (function () {
    function Board(board, boardContent, options) {
        this.isPointerDown = false;
        this.isMoving = false;
        this.arrowLeftDown = false;
        this.arrowRightDown = false;
        this.arrowUpDown = false;
        this.arrowDownDown = false;
        this.defaultOptions = {
            imageRendering: InterpolationMode.Pixelated,
            allowZoom: true,
            minZoom: 0.1,
            maxZoom: 150,
            zoomFactor: 1,
            panOffset: { x: 0, y: 0 },
            allowPan: true,
            scaleRatio: window.devicePixelRatio,
            onBeforeContentReady: function () { },
            onContentReady: function () { },
            onBeforeZoomChanged: function () { },
            onAfterZoomChanged: function () { },
            onAfterTransformed: function () { },
            onPanning: function () { },
            onAfterPanned: function () { },
        };
        this.elBoard = board;
        this.elBoardContent = boardContent;
        this.options = __assign(__assign({}, this.defaultOptions), options || {});
        this.domMatrix = new DOMMatrix()
            .scaleSelf(this.options.zoomFactor)
            .translateSelf(this.options.panOffset.x, this.options.panOffset.y);
        this.zoomDistance = this.zoomDistance.bind(this);
        this.moveDistance = this.moveDistance.bind(this);
        this.startMoving = this.startMoving.bind(this);
        this.stopMoving = this.stopMoving.bind(this);
        this.dpi = this.dpi.bind(this);
        this.updateImageRendering = this.updateImageRendering.bind(this);
        this.enable = this.enable.bind(this);
        this.disable = this.disable.bind(this);
        this.zoomTo = this.zoomTo.bind(this);
        this.panTo = this.panTo.bind(this);
        this.applyTransform = this.applyTransform.bind(this);
        this.waitForContentReady = this.waitForContentReady.bind(this);
        this.onMouseWheel = this.onMouseWheel.bind(this);
        this.onPointerDown = this.onPointerDown.bind(this);
        this.onPointerUp = this.onPointerUp.bind(this);
        this.onPointerMove = this.onPointerMove.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.disable();
        this.elBoardContent.style.transformOrigin = 'top left';
        this.elBoard.style.touchAction = 'none';
        this.elBoard.style.overflow = 'hidden';
        // emit event onBeforeContentReady
        this.options.onBeforeContentReady();
    }
    Object.defineProperty(Board.prototype, "imageRendering", {
        // #region Getters & Setters
        get: function () {
            return this.options.imageRendering;
        },
        set: function (value) {
            this.options.imageRendering = value;
            // this.elBoardContent.style.imageRendering = value;
            this.updateImageRendering();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Board.prototype, "scaleRatio", {
        get: function () {
            return this.options.scaleRatio;
        },
        set: function (value) {
            this.options.scaleRatio = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Board.prototype, "zoomFactor", {
        /**
         * Gets zoom factor after computing device ratio (DPI)
         *
         * @readonly
         * @memberof Board
         */
        get: function () {
            return this.options.zoomFactor * this.options.scaleRatio;
        },
        enumerable: false,
        configurable: true
    });
    // #endregion
    // #region Private functions
    Board.prototype.onMouseWheel = function (e) {
        // ignore horizontal scroll events
        if (e.deltaY === 0) {
            return;
        }
        var direction = e.deltaY < 0 ? 'up' : 'down';
        var normalizedDeltaY = 1 + Math.abs(e.deltaY) / 300; // speed
        var delta = direction === 'up' ? normalizedDeltaY : 1 / normalizedDeltaY;
        this.zoomDistance(delta, e.clientX, e.clientY);
    };
    Board.prototype.onPointerDown = function (e) {
        // ignore right clicks
        if (e.button !== 0) {
            return;
        }
        this.elBoard.setPointerCapture(e.pointerId);
        this.isPointerDown = true;
        // We get the pointer position on click so we can get the value once the user starts to drag
        this.options.panOffset.x = e.clientX;
        this.options.panOffset.y = e.clientY;
    };
    Board.prototype.onPointerMove = function (event) {
        // Only run this function if the pointer is down
        if (!this.isPointerDown) {
            return;
        }
        this.moveDistance(event.clientX - this.options.panOffset.x, event.clientY - this.options.panOffset.y);
        this.options.panOffset.x = event.clientX;
        this.options.panOffset.y = event.clientY;
        this.options.onPanning(this.domMatrix.e, this.domMatrix.f);
    };
    Board.prototype.onPointerUp = function (e) {
        if (!this.isPointerDown) {
            return;
        }
        this.elBoard.releasePointerCapture(e.pointerId);
        this.isPointerDown = false;
        this.options.panOffset.x += e.clientX - this.options.panOffset.x;
        this.options.panOffset.y += e.clientY - this.options.panOffset.y;
        this.options.onAfterPanned(this.domMatrix.e, this.domMatrix.f);
    };
    Board.prototype.onKeyDown = function (event) {
        switch (event.key) {
            case 'ArrowLeft':
                this.arrowLeftDown = true;
                if (!this.isMoving) {
                    this.isMoving = true;
                    this.startMoving();
                }
                break;
            case 'ArrowUp':
                this.arrowUpDown = true;
                if (!this.isMoving) {
                    this.isMoving = true;
                    this.startMoving();
                }
                break;
            case 'ArrowRight':
                this.arrowRightDown = true;
                if (!this.isMoving) {
                    this.isMoving = true;
                    this.startMoving();
                }
                break;
            case 'ArrowDown':
                this.arrowDownDown = true;
                if (!this.isMoving) {
                    this.isMoving = true;
                    this.startMoving();
                }
                break;
            default:
                break;
        }
    };
    Board.prototype.onKeyUp = function (event) {
        switch (event.key) {
            case 'ArrowLeft':
                this.arrowLeftDown = false;
                break;
            case 'ArrowUp':
                this.arrowUpDown = false;
                break;
            case 'ArrowRight':
                this.arrowRightDown = false;
                break;
            case 'ArrowDown':
                this.arrowDownDown = false;
                break;
            default:
                break;
        }
        if ([
            this.arrowLeftDown,
            this.arrowUpDown,
            this.arrowRightDown,
            this.arrowDownDown,
        ].every(function (keyDown) { return !keyDown; })) {
            this.stopMoving();
        }
    };
    Board.prototype.dpi = function (value) {
        return value / this.options.scaleRatio;
    };
    Board.prototype.updateImageRendering = function () {
        switch (this.imageRendering) {
            case InterpolationMode.Auto:
                if (this.zoomFactor <= 1.0) {
                    this.elBoardContent.style.imageRendering = InterpolationMode.CrispEdges;
                }
                else {
                    this.elBoardContent.style.imageRendering = InterpolationMode.Pixelated;
                }
                break;
            default:
                this.elBoardContent.style.imageRendering = this.imageRendering;
                break;
        }
    };
    Board.prototype.moveDistance = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        // Update the transform coordinates with the distance from origin and current position
        this.domMatrix.e += x;
        this.domMatrix.f += y;
        this.options.onPanning(this.domMatrix.e, this.domMatrix.f);
        this.applyTransform();
    };
    Board.prototype.zoomDistance = function (delta, dx, dy, duration) {
        if (!this.options.allowZoom) {
            return;
        }
        // update the current zoom factor
        this.options.zoomFactor = this.domMatrix.a;
        var oldZoom = this.options.zoomFactor;
        var newZoom = oldZoom * delta;
        // raise event onBeforeZoomChanged
        this.options.onBeforeZoomChanged(this.zoomFactor, this.domMatrix.e, this.domMatrix.f);
        // restrict the zoom factor
        this.options.zoomFactor = Math.min(Math.max(this.options.minZoom, newZoom), this.options.maxZoom);
        var newX = (dx !== null && dx !== void 0 ? dx : this.elBoard.offsetLeft) - this.elBoard.offsetLeft;
        var newY = (dy !== null && dy !== void 0 ? dy : this.elBoard.offsetTop) - this.elBoard.offsetTop;
        var newDelta = delta;
        // check zoom -> maxZoom
        if (newZoom * this.options.scaleRatio > this.options.maxZoom) {
            newDelta = this.dpi(this.options.maxZoom) / oldZoom;
            this.options.zoomFactor = this.dpi(this.options.maxZoom);
        }
        // check zoom -> minZoom
        else if (newZoom * this.options.scaleRatio < this.options.minZoom) {
            newDelta = this.dpi(this.options.minZoom) / oldZoom;
            this.options.zoomFactor = this.dpi(this.options.minZoom);
        }
        this.domMatrix = new DOMMatrix()
            .translateSelf(newX, newY)
            .scaleSelf(newDelta)
            .translateSelf(-newX, -newY)
            .multiplySelf(this.domMatrix);
        // raise event onAfterZoomChanged
        this.options.onAfterZoomChanged(this.zoomFactor, this.domMatrix.e, this.domMatrix.f);
        this.updateImageRendering();
        this.applyTransform(duration);
    };
    Board.prototype.startMoving = function () {
        var speed = 20;
        var x = 0;
        var y = 0;
        if (this.arrowLeftDown && !this.arrowRightDown) {
            x = speed;
        }
        else if (!this.arrowLeftDown && this.arrowRightDown) {
            x = -speed;
        }
        if (this.arrowUpDown && !this.arrowDownDown) {
            y = speed;
        }
        else if (!this.arrowUpDown && this.arrowDownDown) {
            y = -speed;
        }
        this.moveDistance(x, y);
        this.animationFrame = requestAnimationFrame(this.startMoving);
    };
    Board.prototype.stopMoving = function () {
        cancelAnimationFrame(this.animationFrame);
        this.isMoving = false;
    };
    // #endregion
    // #region Public functions
    Board.prototype.panTo = function (x, y, duration) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.domMatrix.e = x;
                        this.domMatrix.f = y;
                        return [4 /*yield*/, this.applyTransform(duration)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Board.prototype.zoomTo = function (factor, x, y, duration) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // restrict the zoom factor
                        this.options.zoomFactor = Math.min(Math.max(this.options.minZoom, this.dpi(factor)), this.options.maxZoom);
                        // raise event onBeforeZoomChanged
                        this.options.onBeforeZoomChanged(this.zoomFactor, this.domMatrix.e, this.domMatrix.f);
                        // apply scale and translate value
                        this.domMatrix.a = this.options.zoomFactor;
                        this.domMatrix.d = this.options.zoomFactor;
                        this.domMatrix.e = x || 0;
                        this.domMatrix.f = y || 0;
                        // raise event onAfterZoomChanged
                        this.options.onAfterZoomChanged(this.zoomFactor, this.domMatrix.e, this.domMatrix.f);
                        return [4 /*yield*/, this.applyTransform(duration)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Board.prototype.applyTransform = function (duration) {
        var _this = this;
        if (duration === void 0) { duration = 0; }
        return new Promise(function (resolve) {
            _this.elBoardContent.style.transform = "" + _this.domMatrix.toString();
            // apply animation
            if (duration > 0) {
                var transition = "transform " + duration + "ms ease, opacity " + duration + "ms ease";
                _this.elBoardContent.style.transition = transition;
                setTimeout(resolve, duration);
            }
            else {
                _this.elBoardContent.style.transition = '';
                resolve(undefined);
            }
        })
            .then(function () {
            // raise event
            _this.options.onAfterTransformed(_this.domMatrix);
        });
    };
    Board.prototype.enable = function () {
        this.applyTransform();
        this.elBoard.addEventListener('wheel', this.onMouseWheel, { passive: true });
        this.elBoard.addEventListener('pointerdown', this.onPointerDown);
        this.elBoard.addEventListener('pointerup', this.onPointerUp);
        this.elBoard.addEventListener('pointerleave', this.onPointerUp);
        this.elBoard.addEventListener('pointermove', this.onPointerMove);
        this.elBoard.addEventListener('keydown', this.onKeyDown);
        this.elBoard.addEventListener('keyup', this.onKeyUp);
    };
    Board.prototype.disable = function () {
        this.elBoard.removeEventListener('mousewheel', this.onMouseWheel);
        this.elBoard.removeEventListener('pointerdown', this.onPointerDown);
        this.elBoard.removeEventListener('pointerup', this.onPointerUp);
        this.elBoard.removeEventListener('pointerleave', this.onPointerUp);
        this.elBoard.removeEventListener('pointermove', this.onPointerMove);
        this.elBoard.removeEventListener('keydown', this.onKeyDown);
        this.elBoard.removeEventListener('keyup', this.onKeyUp);
    };
    Board.prototype.waitForContentReady = function () {
        return __awaiter(this, void 0, void 0, function () {
            var list, imgs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        list = this.elBoardContent.querySelectorAll('img');
                        imgs = Array.from(list);
                        _a.label = 1;
                    case 1:
                        if (!imgs.some(function (i) { return !i.complete; })) return [3 /*break*/, 3];
                        // eslint-disable-next-line
                        return [4 /*yield*/, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.pause)(10)];
                    case 2:
                        // eslint-disable-next-line
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3:
                        // emit event onContentReady
                        this.options.onContentReady();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Board;
}());



/***/ }),

/***/ "./src/modules/helpers.ts":
/*!********************************!*\
  !*** ./src/modules/helpers.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pause": () => (/* binding */ pause),
/* harmony export */   "checkRectanglesIntersection": () => (/* binding */ checkRectanglesIntersection)
/* harmony export */ });
var pause = function (duration) { return new Promise(function (resolve) { return setTimeout(resolve, duration); }); };
var checkRectanglesIntersection = function (rectangle1, rectangle2) { return !(rectangle2.left > rectangle1.right
    || rectangle2.right < rectangle1.left
    || rectangle2.top > rectangle1.bottom
    || rectangle2.bottom < rectangle1.top); };


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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Board": () => (/* reexport safe */ _modules_Board__WEBPACK_IMPORTED_MODULE_0__.Board),
/* harmony export */   "InterpolationMode": () => (/* reexport safe */ _modules_Board__WEBPACK_IMPORTED_MODULE_0__.InterpolationMode)
/* harmony export */ });
/* harmony import */ var _modules_Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Board */ "./src/modules/Board.ts");


})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=main.js.map
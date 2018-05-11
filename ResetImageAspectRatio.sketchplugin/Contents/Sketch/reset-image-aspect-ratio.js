var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/reset-image-aspect-ratio.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/reset-image-aspect-ratio.js":
/*!*****************************************!*\
  !*** ./src/reset-image-aspect-ratio.js ***!
  \*****************************************/
/*! exports provided: onReset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onReset", function() { return onReset; });
var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui"),
    DOM = __webpack_require__(/*! sketch/dom */ "sketch/dom");

function onReset(context) {
  var document = DOM.getSelectedDocument(),
      selectedLayers = document.selectedLayers.layers;

  if (selectedLayers.length > 0) {
    var bitmaps = selectedLayers.filter(function (layer) {
      return layer.type === 'Image';
    });
    var rectangles = selectedLayers.filter(function (layer) {
      return isRectangle(layer) && hasPatternFill(layer);
    });
    bitmaps.forEach(function (layer) {
      var originalSize = layer.image.nsimage.size();
      resetAspectRatio(layer, originalSize);
    });
    rectangles.forEach(function (layer) {
      var originalSize = layer.style.fills[0].sketchObject.image().NSImage().size();
      resetAspectRatio(layer, originalSize);
    });
    var imageCount = bitmaps.length + rectangles.length;

    switch (imageCount) {
      case 0:
        UI.message('No images were found');
        break;

      case 1:
        UI.message('1 image reset');
        break;

      default:
        UI.message("".concat(imageCount, " images reset"));
    }
  } else {
    UI.message('Select one or more images');
  }
}

function hasPatternFill(layer) {
  var patternFills = layer.style.fills.filter(function (fill) {
    return fill.fill === 'Pattern' && fill.enabled;
  });
  return patternFills.length === 1;
}

function isRectangle(layer) {
  if (layer.type === 'Shape') {
    var layerCount = layer.sketchObject.layers().count();
    var layerClass = layer.sketchObject.layers()[0].class();

    if (layerCount === 1 && layerClass === MSRectangleShape) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function resetAspectRatio(layer, originalSize) {
  var currentAspectRatio = layer.frame.width / layer.frame.height;
  var originalAspectRatio = originalSize.width / originalSize.height;
  layer.sketchObject.setConstrainProportions(0);

  if (currentAspectRatio > originalAspectRatio) {
    layer.frame = layer.frame.scale(1, currentAspectRatio / originalAspectRatio);
  } else {
    layer.frame = layer.frame.scale(originalAspectRatio / currentAspectRatio, 1);
  }

  layer.sketchObject.setConstrainProportions(1);
}

/***/ }),

/***/ "sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ }),

/***/ "sketch/ui":
/*!****************************!*\
  !*** external "sketch/ui" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/ui");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onReset'] = __skpm_run.bind(this, 'onReset');
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=reset-image-aspect-ratio.js.map
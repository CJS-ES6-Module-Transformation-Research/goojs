Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderSvgToCanvas = undefined;

var _PromiseUtils = require("../util/PromiseUtils");

var PromiseUtils = _interopRequireWildcard(_PromiseUtils);

var _ObjectUtils = require("../util/ObjectUtils");

var ObjectUtils = _interopRequireWildcard(_ObjectUtils);

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

var functionObject_svgDataToImage;
var functionObject_getMatrixFromCanvas;
var functionObject_renderSvgToCanvas;
var functionObject_loadCanvasFromPath;

// TODO: make promise based instead of sending callbacks

/**
 * Provides useful canvas-related methods
 */
function CanvasUtils() {}

functionObject_loadCanvasFromPath = function functionObject_loadCanvasFromPath(canvasPath, callback) {
    var options = {};
    if (arguments.length === 3) {
        // Called with loadCanvasFromPath(path, options, callback)
        options = arguments[1];
        callback = arguments[2];
    }

    // have the image load
    var img = new Image();
    img.onerror = function () {
        console.error("Failed to load svg!");
        callback();
    };
    img.src = canvasPath;

    // create an off screen canvas
    var canvas = document.createElement("canvas");

    // get its context
    var context = canvas.getContext("2d");

    img.onload = function () {
        // when ready, paint the image on the canvas

        if (img.width === 0 && img.height === 0) {
            // Could not load
            return callback();
        }

        ObjectUtils.defaults(options, {
            // Canvas size
            width: img.width,

            height: img.height,

            // Clipping window size & position
            sourceX: 0,

            sourceY: 0,
            sourceWidth: img.width,
            sourceHeight: img.height,

            // Destination window size & position
            destX: 0,

            destY: 0
        });

        ObjectUtils.defaults(options, {
            destWidth: options.width,
            destHeight: options.height
        });

        if (options.resizeToFit) {
            // preserve aspect ratio of input image and center it
            var ratio = options.sourceWidth / options.sourceHeight;
            if (ratio > 1) {
                options.destHeight = options.destWidth / ratio;
                options.destY = (options.height - options.destHeight) * 0.5;
            } else if (ratio < 1) {
                options.destWidth = options.destHeight * ratio;
                options.destX = (options.width - options.destWidth) * 0.5;
            }
        }

        // Set dimensions
        canvas.width = options.width;
        canvas.height = options.height;

        // Render to canvas
        context.drawImage(img, options.sourceX, options.sourceY, options.sourceWidth, options.sourceHeight, options.destX, options.destY, options.destWidth, options.destHeight);

        callback(canvas);
    };
};

exports.renderSvgToCanvas = functionObject_renderSvgToCanvas = function functionObject_renderSvgToCanvas(svgSource, options, callback) {
    var url = "data:image/svg+xml;base64," + btoa(svgSource);

    functionObject_loadCanvasFromPath(url, options, callback);
};

functionObject_getMatrixFromCanvas = function functionObject_getMatrixFromCanvas(canvas) {
    var context = canvas.getContext("2d");

    var getAt = function getAt(x, y) {
        if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) {
            return 0;
        } else {
            return context.getImageData(x, y, 1, 1).data[0] / 255;
        }
    };

    var matrix = [];
    for (var i = 0; i < canvas.width; i++) {
        matrix.push([]);
        for (var j = 0; j < canvas.height; j++) {
            matrix[i].push(getAt(i, canvas.height - (j + 1)));
        }
    }
    return matrix;
};

functionObject_svgDataToImage = function functionObject_svgDataToImage(data) {
    var DOMURL = window.URL || window.webkitURL || window;

    var svg = new Blob([data], {
        type: "image/svg+xml;charset=utf-8"
    });

    var img = new Image();
    img.src = DOMURL.createObjectURL(svg);

    return PromiseUtils.createPromise(function (resolve, reject) {
        img.onload = function () {
            resolve(img);
        };
        img.onerror = function () {
            reject("Could not load SVG image.");
        };
    });
};

exports.renderSvgToCanvas = functionObject_renderSvgToCanvas;

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getGLBlendParam = exports.getGLDepthFunc = exports.getGLIndexMode = exports.getGLBufferUsage = exports.getGLCubeMapFace = exports.getGLByteSize = exports.getGLArrayType = exports.getGLBufferTarget = exports.getGLMinFilter = exports.getGLMagFilter = exports.getFilterFallback = exports.getGLDataType = exports.getGLInternalFormat = exports.getGLWrap = exports.getGLType = exports.scaleImage = exports.getBlankImage = exports.clone = exports.getByteSize = undefined;

var _ObjectUtils = require("../util/ObjectUtils");

var ObjectUtils = _interopRequireWildcard(_ObjectUtils);

var _MathUtils = require("../math/MathUtils");

var MathUtils = _interopRequireWildcard(_MathUtils);

var _Capabilities = require("../renderer/Capabilities");

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

var functionObject_getGLBlendParam;
var functionObject_getGLDepthFunc;
var functionObject_getGLIndexMode;
var functionObject_getGLBufferUsage;
var functionObject_getGLCubeMapFace;
var functionObject_getGLByteSize;
var functionObject_getGLArrayType;
var functionObject_getGLBufferTarget;
var functionObject_getGLMinFilter;
var functionObject_getGLMagFilter;
var functionObject_getFilterFallback;
var functionObject_getGLDataType;
var functionObject_getGLPixelDataType;
var functionObject_getGLInternalFormat;
var functionObject_getGLWrap;
var functionObject_getGLType;
var functionObject_scaleImage;
var functionObject_getBlankImage;
var functionObject__blankImages;
var functionObject_clone;
var functionObject_nearestPowerOfTwo;
var functionObject_isPowerOfTwo;
var functionObject_checkGLError;
var functionObject_getByteSize;

/**
 * Renderer-related utilities
 */
function RendererUtils() {}

exports.getByteSize = functionObject_getByteSize = function functionObject_getByteSize(type) {
    var byteSize;

    switch (type) {
        case "Byte":
        case "UnsignedByte":
            byteSize = 1;
            break;
        case "Short":
        case "UnsignedShort":
        case "HalfFloat":
            byteSize = 2;
            break;
        case "Int":
        case "Float":
            byteSize = 4;
            break;
        case "Double":
            byteSize = 8;
            break;
        default:
            throw new Error("Unknown type: " + type);
    }

    return byteSize;
};

functionObject_checkGLError = function functionObject_checkGLError(gl) {
    var error = gl.getError();
    var wasError = false;
    while (error !== gl.NO_ERROR) {
        wasError = true;
        if (error === gl.INVALID_ENUM) {
            console.error("An unacceptable value is specified for an enumerated argument. The offending command is ignored and has no other side effect than to set the error flag.");
        } else if (error === gl.INVALID_VALUE) {
            console.error("A numeric argument is out of range. The offending command is ignored and has no other side effect than to set the error flag.");
        } else if (error === gl.INVALID_OPERATION) {
            console.error("The specified operation is not allowed in the current state. The offending command is ignored and has no other side effect than to set the error flag.");
        } else if (error === gl.FRAMEBUFFER_COMPLETE) {
            console.error("The command is trying to render to or read from the framebuffer while the currently bound framebuffer is not framebuffer complete (i.e. the return value from glCheckFramebufferStatus is not GL_FRAMEBUFFER_COMPLETE). The offending command is ignored and has no other side effect than to set the error flag.");
        } else if (error === gl.OUT_OF_MEMORY) {
            throw new Error("There is not enough memory left to execute the command. The state of the GL is undefined, except for the state of the error flags, after this error is recorded.");
        }
        error = gl.getError();
    }

    if (wasError) {
        throw new Error("Stopping due to error");
    }
};

functionObject_isPowerOfTwo = MathUtils.isPowerOfTwo;
functionObject_nearestPowerOfTwo = MathUtils.nearestPowerOfTwo;
exports.clone = functionObject_clone = ObjectUtils.deepClone;
functionObject__blankImages = {};

exports.getBlankImage = functionObject_getBlankImage = function functionObject_getBlankImage(texture, color, width, height, maxSize, index) {
    var newWidth = MathUtils.nearestPowerOfTwo(width);
    var newHeight = MathUtils.nearestPowerOfTwo(height);
    newWidth = Math.min(newWidth, maxSize);
    newHeight = Math.min(newHeight, maxSize);

    var strColor = color.length === 4 ? "rgba(" + Number(color[0] * 255).toFixed(0) + "," + Number(color[1] * 255).toFixed(0) + "," + Number(color[2] * 255).toFixed(0) + "," + Number(color[3]).toFixed(2) + ")" : "rgb(" + Number(color[0] * 255).toFixed(0) + "," + Number(color[1] * 255).toFixed(0) + "," + Number(color[2] * 255).toFixed(0) + ")";
    var cacheKey = strColor + newWidth + "x" + newHeight;
    var canvas = functionObject__blankImages[cacheKey];
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.rect(0, 0, newWidth, newHeight);
        ctx.fillStyle = strColor;
        ctx.fill();
        functionObject__blankImages[cacheKey] = canvas;
    }
    if (index === undefined) {
        texture.image = canvas;
    } else {
        texture.image.isData = false;
        texture.image.data[index] = canvas;
    }
};

function getImage(data, width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    var context = canvas.getContext('2d');

    var imageData = context.createImageData(width, height);
    imageData.data.set(data);
    context.putImageData(imageData, 0, 0);

    return canvas;
}

exports.scaleImage = functionObject_scaleImage = function functionObject_scaleImage(texture, image, width, height, maxSize, index) {
    var newWidth = MathUtils.nearestPowerOfTwo(width);
    var newHeight = MathUtils.nearestPowerOfTwo(height);
    newWidth = Math.min(newWidth, maxSize);
    newHeight = Math.min(newHeight, maxSize);

    if (image.width !== newWidth || image.height !== newHeight) {
        var canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;
        if (image.getAttribute) {
            canvas.setAttribute("data-ref", image.getAttribute("data-ref"));
        }
        var ctx = canvas.getContext("2d");

        if (image.data) {
            // putImageData directly on this canvas will not resize
            // have to putImageData on another canvas and drawImage that afterwards
            ctx.drawImage(getImage(image.data, image.width, image.height), 0, 0, image.width, image.height, 0, 0, newWidth, newHeight);
        } else {
            //! AT: this will choke if fed with a manually created texture ([0, 0, 0, 255, ...])
            ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, newWidth, newHeight);
        }
        //document.body.appendChild(canvas);
        canvas.dataReady = true;
        canvas.src = image.src;
        canvas.originalWidth = width;
        canvas.originalHeight = height;
        if (index === undefined) {
            texture.image = canvas;
        } else {
            texture.image.data[index] = canvas;
        }
        //canvas.parentNode.removeChild(canvas);
    }
};

exports.getGLType = functionObject_getGLType = function functionObject_getGLType(context, type) {
    var glType;

    switch (type) {
        case "2D":
            glType = context.TEXTURE_2D;
            break;
        case "CUBE":
            glType = context.TEXTURE_CUBE_MAP;
            break;
        default:
            throw new Error("Invalid texture type: " + type);
    }

    return glType;
};

exports.getGLWrap = functionObject_getGLWrap = function functionObject_getGLWrap(context, wrap) {
    var glWrap;

    switch (wrap) {
        case "Repeat":
            glWrap = context.REPEAT;
            break;
        case "MirroredRepeat":
            glWrap = context.MIRRORED_REPEAT;
            break;
        case "EdgeClamp":
            glWrap = context.CLAMP_TO_EDGE;
            break;
        default:
            throw new Error("Invalid WrapMode type: " + wrap);
    }

    return glWrap;
};

exports.getGLInternalFormat = functionObject_getGLInternalFormat = function functionObject_getGLInternalFormat(context, format) {
    var glInternalFormat;

    switch (format) {
        case "RGBA":
            glInternalFormat = context.RGBA;
            break;
        case "RGB":
            glInternalFormat = context.RGB;
            break;
        case "Alpha":
            glInternalFormat = context.ALPHA;
            break;
        case "Luminance":
            glInternalFormat = context.LUMINANCE;
            break;
        case "LuminanceAlpha":
            glInternalFormat = context.LUMINANCE_ALPHA;
            break;
        default:
            throw new Error("Unsupported format: " + format);
    }

    return glInternalFormat;
};

functionObject_getGLPixelDataType = function functionObject_getGLPixelDataType(context, type) {
    return functionObject_getGLDataType(context, type);
};

exports.getGLDataType = functionObject_getGLDataType = function functionObject_getGLDataType(context, type) {
    var glDataType;

    switch (type) {
        case "Float":
        case "Double":
            glDataType = context.FLOAT;
            break;
        case "Byte":
            glDataType = context.BYTE;
            break;
        case "UnsignedByte":
            glDataType = context.UNSIGNED_BYTE;
            break;
        case "Short":
            glDataType = context.SHORT;
            break;
        case "UnsignedShort":
            glDataType = context.UNSIGNED_SHORT;
            break;
        case "Int":
            glDataType = context.INT;
            break;
        case "UnsignedInt":
            glDataType = context.UNSIGNED_INT;
            break;
        case "UnsignedShort565":
            glDataType = context.UNSIGNED_SHORT_5_6_5;
            break;
        case "UnsignedShort4444":
            glDataType = context.UNSIGNED_SHORT_4_4_4_4;
            break;
        case "UnsignedShort5551":
            glDataType = context.UNSIGNED_SHORT_5_5_5_1;
            break;
        case "HalfFloat":
            glDataType = _Capabilities.Capabilities.TextureHalfFloat.HALF_FLOAT_OES;
            break;
        default:
            throw new Error("Unknown datatype: " + type);
    }

    return glDataType;
};

exports.getFilterFallback = functionObject_getFilterFallback = function functionObject_getFilterFallback(filter) {
    var filterFallback;

    switch (filter) {
        case "NearestNeighborNoMipMaps":
        case "NearestNeighborNearestMipMap":
        case "NearestNeighborLinearMipMap":
            filterFallback = "NearestNeighborNoMipMaps";
            break;
        case "BilinearNoMipMaps":
        case "Trilinear":
        case "BilinearNearestMipMap":
            filterFallback = "BilinearNoMipMaps";
            break;
        default:
            filterFallback = "NearestNeighborNoMipMaps";
            break;
    }

    return filterFallback;
};

exports.getGLMagFilter = functionObject_getGLMagFilter = function functionObject_getGLMagFilter(context, filter) {
    var glMagFilter;

    switch (filter) {
        case "Bilinear":
            glMagFilter = context.LINEAR;
            break;
        case "NearestNeighbor":
            glMagFilter = context.NEAREST;
            break;
        default:
            throw new Error("Invalid MagnificationFilter type: " + filter);
    }

    return glMagFilter;
};

exports.getGLMinFilter = functionObject_getGLMinFilter = function functionObject_getGLMinFilter(context, filter) {
    var glMinFilter;

    switch (filter) {
        case "BilinearNoMipMaps":
            glMinFilter = context.LINEAR;
            break;
        case "Trilinear":
            glMinFilter = context.LINEAR_MIPMAP_LINEAR;
            break;
        case "BilinearNearestMipMap":
            glMinFilter = context.LINEAR_MIPMAP_NEAREST;
            break;
        case "NearestNeighborNoMipMaps":
            glMinFilter = context.NEAREST;
            break;
        case "NearestNeighborNearestMipMap":
            glMinFilter = context.NEAREST_MIPMAP_NEAREST;
            break;
        case "NearestNeighborLinearMipMap":
            glMinFilter = context.NEAREST_MIPMAP_LINEAR;
            break;
        default:
            throw new Error("Invalid MinificationFilter type: " + filter);
    }

    return glMinFilter;
};

exports.getGLBufferTarget = functionObject_getGLBufferTarget = function functionObject_getGLBufferTarget(context, target) {
    if (target === "ElementArrayBuffer") {
        return context.ELEMENT_ARRAY_BUFFER;
    }

    return context.ARRAY_BUFFER;
};

exports.getGLArrayType = functionObject_getGLArrayType = function functionObject_getGLArrayType(context, indices) {
    var glArrayType = null;

    if (indices instanceof Uint8Array) {
        glArrayType = context.UNSIGNED_BYTE;
    } else if (indices instanceof Uint16Array) {
        glArrayType = context.UNSIGNED_SHORT;
    } else if (indices instanceof Uint32Array) {
        glArrayType = context.UNSIGNED_INT;
    } else if (indices instanceof Int8Array) {
        glArrayType = context.UNSIGNED_BYTE;
    } else if (indices instanceof Int16Array) {
        glArrayType = context.UNSIGNED_SHORT;
    } else if (indices instanceof Int32Array) {
        glArrayType = context.UNSIGNED_INT;
    }

    return glArrayType;
};

exports.getGLByteSize = functionObject_getGLByteSize = function functionObject_getGLByteSize(indices) {
    return indices.BYTES_PER_ELEMENT || 1;
};

exports.getGLCubeMapFace = functionObject_getGLCubeMapFace = function functionObject_getGLCubeMapFace(context, face) {
    var glCubeMapFace;

    switch (face) {
        case "PositiveX":
            glCubeMapFace = context.TEXTURE_CUBE_MAP_POSITIVE_X;
            break;
        case "NegativeX":
            glCubeMapFace = context.TEXTURE_CUBE_MAP_NEGATIVE_X;
            break;
        case "PositiveY":
            glCubeMapFace = context.TEXTURE_CUBE_MAP_POSITIVE_Y;
            break;
        case "NegativeY":
            glCubeMapFace = context.TEXTURE_CUBE_MAP_NEGATIVE_Y;
            break;
        case "PositiveZ":
            glCubeMapFace = context.TEXTURE_CUBE_MAP_POSITIVE_Z;
            break;
        case "NegativeZ":
            glCubeMapFace = context.TEXTURE_CUBE_MAP_NEGATIVE_Z;
            break;
        default:
            throw new Error("Invalid cubemap face: " + face);
    }

    return glCubeMapFace;
};

exports.getGLBufferUsage = functionObject_getGLBufferUsage = function functionObject_getGLBufferUsage(context, usage) {
    var glMode;

    switch (usage) {
        case "StaticDraw":
            glMode = context.STATIC_DRAW;
            break;
        case "DynamicDraw":
            glMode = context.DYNAMIC_DRAW;
            break;
        case "StreamDraw":
            glMode = context.STREAM_DRAW;
            break;
        default:
            glMode = context.STATIC_DRAW;
            break;
    }

    return glMode;
};

exports.getGLIndexMode = functionObject_getGLIndexMode = function functionObject_getGLIndexMode(context, indexMode) {
    var glMode;

    switch (indexMode) {
        case "Triangles":
            glMode = context.TRIANGLES;
            break;
        case "TriangleStrip":
            glMode = context.TRIANGLE_STRIP;
            break;
        case "TriangleFan":
            glMode = context.TRIANGLE_FAN;
            break;
        case "Lines":
            glMode = context.LINES;
            break;
        case "LineStrip":
            glMode = context.LINE_STRIP;
            break;
        case "LineLoop":
            glMode = context.LINE_LOOP;
            break;
        case "Points":
            glMode = context.POINTS;
            break;
        default:
            glMode = context.TRIANGLES;
            break;
    }

    return glMode;
};

exports.getGLDepthFunc = functionObject_getGLDepthFunc = function functionObject_getGLDepthFunc(context, depthFunc) {
    var glDepthFunc;

    switch (depthFunc) {
        case "Never":
            glDepthFunc = context.NEVER;
            break;
        case "Always":
            glDepthFunc = context.ALWAYS;
            break;
        case "Less":
            glDepthFunc = context.LESS;
            break;
        case "LessEqual":
            glDepthFunc = context.LEQUAL;
            break;
        case "Equal":
            glDepthFunc = context.EQUAL;
            break;
        case "GreaterEqual":
            glDepthFunc = context.GEQUAL;
            break;
        case "Greater":
            glDepthFunc = context.GREATER;
            break;
        case "NotEqual":
            glDepthFunc = context.NOTEQUAL;
            break;
        default:
            glDepthFunc = context.LEQUAL;
            break;
    }

    return glDepthFunc;
};

exports.getGLBlendParam = functionObject_getGLBlendParam = function functionObject_getGLBlendParam(context, param) {
    var glBlendParam;

    switch (param) {
        case "AddEquation":
            glBlendParam = context.FUNC_ADD;
            break;
        case "SubtractEquation":
            glBlendParam = context.FUNC_SUBTRACT;
            break;
        case "ReverseSubtractEquation":
            glBlendParam = context.FUNC_REVERSE_SUBTRACT;
            break;
        case "ZeroFactor":
            glBlendParam = context.ZERO;
            break;
        case "OneFactor":
            glBlendParam = context.ONE;
            break;
        case "SrcColorFactor":
            glBlendParam = context.SRC_COLOR;
            break;
        case "OneMinusSrcColorFactor":
            glBlendParam = context.ONE_MINUS_SRC_COLOR;
            break;
        case "SrcAlphaFactor":
            glBlendParam = context.SRC_ALPHA;
            break;
        case "OneMinusSrcAlphaFactor":
            glBlendParam = context.ONE_MINUS_SRC_ALPHA;
            break;
        case "DstAlphaFactor":
            glBlendParam = context.DST_ALPHA;
            break;
        case "OneMinusDstAlphaFactor":
            glBlendParam = context.ONE_MINUS_DST_ALPHA;
            break;
        case "DstColorFactor":
            glBlendParam = context.DST_COLOR;
            break;
        case "OneMinusDstColorFactor":
            glBlendParam = context.ONE_MINUS_DST_COLOR;
            break;
        case "SrcAlphaSaturateFactor":
            glBlendParam = context.SRC_ALPHA_SATURATE;
            break;
        default:
            throw new Error("Unknown blend param: " + param);
    }

    return glBlendParam;
};

exports.getByteSize = functionObject_getByteSize;
exports.clone = functionObject_clone;
exports.getBlankImage = functionObject_getBlankImage;
exports.scaleImage = functionObject_scaleImage;
exports.getGLType = functionObject_getGLType;
exports.getGLWrap = functionObject_getGLWrap;
exports.getGLInternalFormat = functionObject_getGLInternalFormat;
exports.getGLDataType = functionObject_getGLDataType;
exports.getFilterFallback = functionObject_getFilterFallback;
exports.getGLMagFilter = functionObject_getGLMagFilter;
exports.getGLMinFilter = functionObject_getGLMinFilter;
exports.getGLBufferTarget = functionObject_getGLBufferTarget;
exports.getGLArrayType = functionObject_getGLArrayType;
exports.getGLByteSize = functionObject_getGLByteSize;
exports.getGLCubeMapFace = functionObject_getGLCubeMapFace;
exports.getGLBufferUsage = functionObject_getGLBufferUsage;
exports.getGLIndexMode = functionObject_getGLIndexMode;
exports.getGLDepthFunc = functionObject_getGLDepthFunc;
exports.getGLBlendParam = functionObject_getGLBlendParam;

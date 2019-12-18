import * as ObjectUtils from "../util/ObjectUtils";
import * as MathUtils from "../math/MathUtils";
import { Capabilities } from "../renderer/Capabilities";
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

functionObject_getByteSize = function(type) {
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

functionObject_checkGLError = function(gl) {
    var error = gl.getError();
    var wasError = false;
    while (error !== gl.NO_ERROR) {
        wasError = true;
        if (error === gl.INVALID_ENUM) {
            console.error(
                "An unacceptable value is specified for an enumerated argument. The offending command is ignored and has no other side effect than to set the error flag."
            );
        } else if (error === gl.INVALID_VALUE) {
            console.error(
                "A numeric argument is out of range. The offending command is ignored and has no other side effect than to set the error flag."
            );
        } else if (error === gl.INVALID_OPERATION) {
            console.error(
                "The specified operation is not allowed in the current state. The offending command is ignored and has no other side effect than to set the error flag."
            );
        } else if (error === gl.FRAMEBUFFER_COMPLETE) {
            console.error(
                "The command is trying to render to or read from the framebuffer while the currently bound framebuffer is not framebuffer complete (i.e. the return value from glCheckFramebufferStatus is not GL_FRAMEBUFFER_COMPLETE). The offending command is ignored and has no other side effect than to set the error flag."
            );
        } else if (error === gl.OUT_OF_MEMORY) {
            throw new Error(
                "There is not enough memory left to execute the command. The state of the GL is undefined, except for the state of the error flags, after this error is recorded."
            );
        }
        error = gl.getError();
    }

    if (wasError) {
        throw new Error("Stopping due to error");
    }
};

functionObject_isPowerOfTwo = MathUtils.isPowerOfTwo;
functionObject_nearestPowerOfTwo = MathUtils.nearestPowerOfTwo;
functionObject_clone = ObjectUtils.deepClone;
functionObject__blankImages = {};

functionObject_getBlankImage = function(texture, color, width, height, maxSize, index) {
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

functionObject_scaleImage = function(texture, image, width, height, maxSize, index) {
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
            ctx.drawImage(
                getImage(image.data, image.width, image.height),
                0,
                0,
                image.width,
                image.height,
                0,
                0,
                newWidth,
                newHeight
            );
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

functionObject_getGLType = function(context, type) {
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

functionObject_getGLWrap = function(context, wrap) {
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

functionObject_getGLInternalFormat = function(context, format) {
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

functionObject_getGLPixelDataType = function(context, type) {
    return functionObject_getGLDataType(context, type);
};

functionObject_getGLDataType = function(context, type) {
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
        glDataType = Capabilities.TextureHalfFloat.HALF_FLOAT_OES;
        break;
    default:
        throw new Error("Unknown datatype: " + type);
    }

    return glDataType;
};

functionObject_getFilterFallback = function(filter) {
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

functionObject_getGLMagFilter = function(context, filter) {
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

functionObject_getGLMinFilter = function(context, filter) {
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

functionObject_getGLBufferTarget = function(context, target) {
    if (target === "ElementArrayBuffer") {
        return context.ELEMENT_ARRAY_BUFFER;
    }

    return context.ARRAY_BUFFER;
};

functionObject_getGLArrayType = function(context, indices) {
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

functionObject_getGLByteSize = function(indices) {
    return indices.BYTES_PER_ELEMENT || 1;
};

functionObject_getGLCubeMapFace = function(context, face) {
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

functionObject_getGLBufferUsage = function(context, usage) {
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

functionObject_getGLIndexMode = function(context, indexMode) {
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

functionObject_getGLDepthFunc = function(context, depthFunc) {
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

functionObject_getGLBlendParam = function(context, param) {
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

export { functionObject_getByteSize as getByteSize, functionObject_clone as clone, functionObject_getBlankImage as getBlankImage, functionObject_scaleImage as scaleImage, functionObject_getGLType as getGLType, functionObject_getGLWrap as getGLWrap, functionObject_getGLInternalFormat as getGLInternalFormat, functionObject_getGLDataType as getGLDataType, functionObject_getFilterFallback as getFilterFallback, functionObject_getGLMagFilter as getGLMagFilter, functionObject_getGLMinFilter as getGLMinFilter, functionObject_getGLBufferTarget as getGLBufferTarget, functionObject_getGLArrayType as getGLArrayType, functionObject_getGLByteSize as getGLByteSize, functionObject_getGLCubeMapFace as getGLCubeMapFace, functionObject_getGLBufferUsage as getGLBufferUsage, functionObject_getGLIndexMode as getGLIndexMode, functionObject_getGLDepthFunc as getGLDepthFunc, functionObject_getGLBlendParam as getGLBlendParam };

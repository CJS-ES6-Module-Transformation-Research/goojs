'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.BufferUtils = exports.cloneTypedArray = exports.browserType = exports.createIndexBuffer = undefined;

var _Capabilities = require('../renderer/Capabilities');

var BufferUtils_cloneTypedArray;
var browserType;
var BufferUtils_createIndexBuffer;

/**
 * Utility for creating index buffers of appropriate type
 */
function BufferUtils() {}

/**
 * Creates an index buffer of a type appropriate to store the supplied number of vertices
 * @param {number} indexCount Number of indices
 * @param {number} vertexCount Number of vertices
 * @returns {TypedArray} Index buffer
 */
exports.createIndexBuffer = BufferUtils_createIndexBuffer = function BufferUtils_createIndexBuffer(indexCount, vertexCount) {
	var indices;
	if (vertexCount <= 256) {
		// 2^8
		if (browserType === 'Trident') {
			// IE 11 case
			indices = new Uint16Array(indexCount);
		} else {
			indices = new Uint8Array(indexCount);
		}
	} else if (vertexCount <= 65536) {
		// 2^16
		indices = new Uint16Array(indexCount);
	} else if (_Capabilities.Capabilities.ElementIndexUInt) {
		// 2^32
		indices = new Uint32Array(indexCount);
	} else {
		throw new Error('Maximum number of vertices is 65536. Got: ' + vertexCount);
	}
	return indices;
};

function storeBrowserType() {
	var aKeys = ['Trident', 'MSIE', 'Firefox', 'Safari', 'Chrome', 'Opera'],
	    sUsrAg = typeof navigator !== 'undefined' && navigator.userAgent || '',
	    nIdx = aKeys.length - 1;
	for (nIdx; nIdx > -1 && sUsrAg.indexOf(aKeys[nIdx]) === -1; nIdx--) {
		// nothing
	}
	exports.browserType = browserType = aKeys[nIdx];
}

storeBrowserType();

/**
 * Returns a clone of the supplied typed array
 * @param {TypedArray} source
 * @returns {TypedArray}
 */
exports.cloneTypedArray = BufferUtils_cloneTypedArray = function BufferUtils_cloneTypedArray(source) {
	return new source.constructor(source);
};

exports.createIndexBuffer = BufferUtils_createIndexBuffer;
exports.browserType = browserType;
exports.cloneTypedArray = BufferUtils_cloneTypedArray;
exports.BufferUtils = BufferUtils;
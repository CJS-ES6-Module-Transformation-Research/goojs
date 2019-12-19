import { Capabilities } from "../renderer/Capabilities";
var functionObject_cloneTypedArray;
var functionObject_browserType;
var functionObject_createIndexBuffer;

/**
 * Utility for creating index buffers of appropriate type
 */
function BufferUtils() {}

functionObject_createIndexBuffer = function(indexCount, vertexCount) {
    var indices;
    if (vertexCount <= 256) {
        // 2^8
        if (functionObject_browserType === "Trident") {
            // IE 11 case
            indices = new Uint16Array(indexCount);
        } else {
            indices = new Uint8Array(indexCount);
        }
    } else if (vertexCount <= 65536) {
        // 2^16
        indices = new Uint16Array(indexCount);
    } else if (Capabilities.ElementIndexUInt) {
        // 2^32
        indices = new Uint32Array(indexCount);
    } else {
        throw new Error("Maximum number of vertices is 65536. Got: " + vertexCount);
    }
    return indices;
};

function storeBrowserType() {
	var aKeys = ['Trident', 'MSIE', 'Firefox', 'Safari', 'Chrome', 'Opera'],
		sUsrAg = typeof(navigator) !== 'undefined' && navigator.userAgent || '',
		nIdx = aKeys.length - 1;
	for (nIdx; nIdx > -1 && sUsrAg.indexOf(aKeys[nIdx]) === -1; nIdx--) {
		// nothing
	}
	functionObject_browserType = aKeys[nIdx];
}

storeBrowserType();

functionObject_cloneTypedArray = function(source) {
    return new source.constructor(source);
};

export { functionObject_createIndexBuffer as createIndexBuffer, functionObject_browserType as browserType, functionObject_cloneTypedArray as cloneTypedArray };
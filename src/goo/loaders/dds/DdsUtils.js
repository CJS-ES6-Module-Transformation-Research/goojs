'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DdsUtils = exports.flipDXT = exports.getComponents = exports.getIntFromBytes = exports.getIntFromString = exports.isSet = exports.shiftCount = undefined;

var _Capabilities = require('../../renderer/Capabilities');

var DdsUtils_flipUInt24;
var ThreeBitMask;
var DdsUtils_getBytesFromUInt24;
var DdsUtils_getUInt24;
var DdsUtils_flipDXT;
var DdsUtils_getComponents;
var DdsUtils_getIntFromBytes;
var DdsUtils_getIntFromString;
var DdsUtils_isSet;
var DdsUtils_shiftCount;
var DdsUtils_isSupported;

function DdsUtils() {}

DdsUtils_isSupported = function DdsUtils_isSupported() {
	return !!_Capabilities.Capabilities.CompressedTextureS3TC;
};

/**
 * Get the necessary bit shifts needed to align mask with 0.
 * @param mask the bit mask to test
 * @returns number of bits to shift to the right to align mask with 0.
 */
exports.shiftCount = DdsUtils_shiftCount = function DdsUtils_shiftCount(mask) {
	if (mask === 0) {
		return 0;
	}

	var i = 0;
	while ((mask & 0x1) === 0) {
		mask >>= 1;
		i++;
		if (i > 32) {
			throw new Error('invalid mask!');
		}
	}

	return i;
};

/**
 * Check a value against a bit mask to see if it is set.
 * @param value the value to check
 * @param bitMask our mask
 * @returns true if the mask passes
 */
exports.isSet = DdsUtils_isSet = function DdsUtils_isSet(value, bitMask) {
	return (value & bitMask) === bitMask;
};

/**
 * Get the string as a dword int value.
 * @param string our string... should only be 1-4 chars long. Expected to be 1 byte chars.
 * @returns the int value
 */
exports.getIntFromString = DdsUtils_getIntFromString = function DdsUtils_getIntFromString(string) {
	var bytes = [];
	for (var i = 0; i < string.length; i++) {
		bytes[i] = string.charCodeAt(i);
	}
	return DdsUtils_getIntFromBytes(bytes);
};

/**
 * Get the byte array as a dword int value.
 * @param bytes our array... should only be 1-4 bytes long.
 * @returns the int value
 */
exports.getIntFromBytes = DdsUtils_getIntFromBytes = function DdsUtils_getIntFromBytes(bytes) {
	var rVal = 0;
	rVal |= (bytes[0] & 0xff) << 0;
	if (bytes.length > 1) {
		rVal |= (bytes[1] & 0xff) << 8;
	}
	if (bytes.length > 2) {
		rVal |= (bytes[2] & 0xff) << 16;
	}
	if (bytes.length > 3) {
		rVal |= (bytes[3] & 0xff) << 24;
	}
	return rVal;
};

exports.getComponents = DdsUtils_getComponents = function DdsUtils_getComponents(format) {
	switch (format) {
		case 'Alpha':
			return 1;
		case 'RGB':
			return 3;
		case 'RGBA':
			return 4;
		case 'Luminance':
			return 1;
		case 'LuminanceAlpha':
			return 2;
		case 'PrecompressedDXT1':
			return 1;
		case 'PrecompressedDXT1A':
			return 1;
		case 'PrecompressedDXT3':
			return 2;
		case 'PrecompressedDXT5':
			return 2;
	}
	return 0;
};

/**
 * Flip a dxt mipmap/image. Inspired by similar code in opentk and the nvidia sdk.
 * @param rawData our unflipped image as raw bytes
 * @param width our image's width
 * @param height our image's height
 * @param format our image's format
 * @returns the flipped image as raw bytes.
 */
exports.flipDXT = DdsUtils_flipDXT = function DdsUtils_flipDXT(rawData, width, height, format) {
	var returnData = new Uint8Array(rawData.length);

	var blocksPerColumn = width + 3 >> 2;
	var blocksPerRow = height + 3 >> 2;
	var bytesPerBlock = DdsUtils_getComponents(format) * 8;

	for (var sourceRow = 0; sourceRow < blocksPerRow; sourceRow++) {
		var targetRow = blocksPerRow - sourceRow - 1;
		for (var column = 0; column < blocksPerColumn; column++) {
			var target = (targetRow * blocksPerColumn + column) * bytesPerBlock;
			var source = (sourceRow * blocksPerColumn + column) * bytesPerBlock;
			switch (format) {
				case 'PrecompressedDXT1':
				case 'PrecompressedDXT1A':
					// case PrecompressedLATC_L:
					returnData[target + 0] = rawData[source + 0];
					returnData[target + 1] = rawData[source + 1];
					returnData[target + 2] = rawData[source + 2];
					returnData[target + 3] = rawData[source + 3];
					returnData[target + 4] = rawData[source + 7];
					returnData[target + 5] = rawData[source + 6];
					returnData[target + 6] = rawData[source + 5];
					returnData[target + 7] = rawData[source + 4];
					break;
				case 'PrecompressedDXT3':
					// Alpha
					returnData[target + 0] = rawData[source + 6];
					returnData[target + 1] = rawData[source + 7];
					returnData[target + 2] = rawData[source + 4];
					returnData[target + 3] = rawData[source + 5];
					returnData[target + 4] = rawData[source + 2];
					returnData[target + 5] = rawData[source + 3];
					returnData[target + 6] = rawData[source + 0];
					returnData[target + 7] = rawData[source + 1];
					// Color
					returnData[target + 8] = rawData[source + 8];
					returnData[target + 9] = rawData[source + 9];
					returnData[target + 10] = rawData[source + 10];
					returnData[target + 11] = rawData[source + 11];
					returnData[target + 12] = rawData[source + 15];
					returnData[target + 13] = rawData[source + 14];
					returnData[target + 14] = rawData[source + 13];
					returnData[target + 15] = rawData[source + 12];
					break;
				case 'PrecompressedDXT5':
					// Alpha, the first 2 bytes remain
					returnData[target + 0] = rawData[source + 0];
					returnData[target + 1] = rawData[source + 1];

					// extract 3 bits each and flip them
					DdsUtils_getBytesFromUInt24(returnData, target + 5, DdsUtils_flipUInt24(DdsUtils_getUInt24(rawData, source + 2)));
					DdsUtils_getBytesFromUInt24(returnData, target + 2, DdsUtils_flipUInt24(DdsUtils_getUInt24(rawData, source + 5)));

					// Color
					returnData[target + 8] = rawData[source + 8];
					returnData[target + 9] = rawData[source + 9];
					returnData[target + 10] = rawData[source + 10];
					returnData[target + 11] = rawData[source + 11];
					returnData[target + 12] = rawData[source + 15];
					returnData[target + 13] = rawData[source + 14];
					returnData[target + 14] = rawData[source + 13];
					returnData[target + 15] = rawData[source + 12];
					break;
				// case PrecompressedLATC_LA:
				// // alpha
				// System.arraycopy(rawData, source, returnData, target, 4);
				// returnData[target + 4] = rawData[source + 7];
				// returnData[target + 5] = rawData[source + 6];
				// returnData[target + 6] = rawData[source + 5];
				// returnData[target + 7] = rawData[source + 4];
				//
				// // Color
				// System.arraycopy(rawData, source + 8, returnData, target + 8, 4);
				// returnData[target + 12] = rawData[source + 15];
				// returnData[target + 13] = rawData[source + 14];
				// returnData[target + 14] = rawData[source + 13];
				// returnData[target + 15] = rawData[source + 12];
				// break;
			}
		}
	}
	return returnData;
};

// DXT5 Alpha block flipping, inspired by code from Evan Hart (nVidia SDK)
DdsUtils_getUInt24 = function DdsUtils_getUInt24(input, offset) {
	var result = 0;
	result |= (input[offset + 0] & 0xff) << 0;
	result |= (input[offset + 1] & 0xff) << 8;
	result |= (input[offset + 2] & 0xff) << 16;
	return result;
};

DdsUtils_getBytesFromUInt24 = function DdsUtils_getBytesFromUInt24(input, offset, uint24) {
	input[offset + 0] = uint24 & 0x000000ff;
	input[offset + 1] = (uint24 & 0x0000ff00) >> 8;
	input[offset + 2] = (uint24 & 0x00ff0000) >> 16;
};

ThreeBitMask = 0x7;

DdsUtils_flipUInt24 = function DdsUtils_flipUInt24(uint24) {
	var threeBits = [];
	for (var i = 0; i < 2; i++) {
		threeBits.push([0, 0, 0, 0]);
	}

	// extract 3 bits each into the array
	threeBits[0][0] = uint24 & ThreeBitMask;
	uint24 >>= 3;
	threeBits[0][1] = uint24 & ThreeBitMask;
	uint24 >>= 3;
	threeBits[0][2] = uint24 & ThreeBitMask;
	uint24 >>= 3;
	threeBits[0][3] = uint24 & ThreeBitMask;
	uint24 >>= 3;
	threeBits[1][0] = uint24 & ThreeBitMask;
	uint24 >>= 3;
	threeBits[1][1] = uint24 & ThreeBitMask;
	uint24 >>= 3;
	threeBits[1][2] = uint24 & ThreeBitMask;
	uint24 >>= 3;
	threeBits[1][3] = uint24 & ThreeBitMask;

	// stuff 8x 3bits into 3 bytes
	var result = 0;
	result |= threeBits[1][0] << 0;
	result |= threeBits[1][1] << 3;
	result |= threeBits[1][2] << 6;
	result |= threeBits[1][3] << 9;
	result |= threeBits[0][0] << 12;
	result |= threeBits[0][1] << 15;
	result |= threeBits[0][2] << 18;
	result |= threeBits[0][3] << 21;
	return result;
};

exports.shiftCount = DdsUtils_shiftCount;
exports.isSet = DdsUtils_isSet;
exports.getIntFromString = DdsUtils_getIntFromString;
exports.getIntFromBytes = DdsUtils_getIntFromBytes;
exports.getComponents = DdsUtils_getComponents;
exports.flipDXT = DdsUtils_flipDXT;
exports.DdsUtils = DdsUtils;
import { Capabilities } from "../../renderer/Capabilities";
var functionObject_flipUInt24;
var functionObject_ThreeBitMask;
var functionObject_getBytesFromUInt24;
var functionObject_getUInt24;
var functionObject_flipDXT;
var functionObject_getComponents;
var functionObject_getIntFromBytes;
var functionObject_getIntFromString;
var functionObject_isSet;
var functionObject_shiftCount;
var functionObject_isSupported;

function DdsUtils() {}

functionObject_isSupported = function() {
    return !!Capabilities.CompressedTextureS3TC;
};

functionObject_shiftCount = function(mask) {
    if (mask === 0) {
        return 0;
    }

    var i = 0;
    while ((mask & 1) === 0) {
        mask >>= 1;
        i++;
        if (i > 32) {
            throw new Error("invalid mask!");
        }
    }

    return i;
};

functionObject_isSet = function(value, bitMask) {
    return (value & bitMask) === bitMask;
};

functionObject_getIntFromString = function(string) {
    var bytes = [];
    for (var i = 0; i < string.length; i++) {
        bytes[i] = string.charCodeAt(i);
    }
    return functionObject_getIntFromBytes(bytes);
};

functionObject_getIntFromBytes = function(bytes) {
    var rVal = 0;
    rVal |= (bytes[0] & 255) << 0;
    if (bytes.length > 1) {
        rVal |= (bytes[1] & 255) << 8;
    }
    if (bytes.length > 2) {
        rVal |= (bytes[2] & 255) << 16;
    }
    if (bytes.length > 3) {
        rVal |= (bytes[3] & 255) << 24;
    }
    return rVal;
};

functionObject_getComponents = function(format) {
    switch (format) {
    case "Alpha":
        return 1;
    case "RGB":
        return 3;
    case "RGBA":
        return 4;
    case "Luminance":
        return 1;
    case "LuminanceAlpha":
        return 2;
    case "PrecompressedDXT1":
        return 1;
    case "PrecompressedDXT1A":
        return 1;
    case "PrecompressedDXT3":
        return 2;
    case "PrecompressedDXT5":
        return 2;
    }
    return 0;
};

functionObject_flipDXT = function(rawData, width, height, format) {
    var returnData = new Uint8Array(rawData.length);

    var blocksPerColumn = width + 3 >> 2;
    var blocksPerRow = height + 3 >> 2;
    var bytesPerBlock = functionObject_getComponents(format) * 8;

    for (var sourceRow = 0; sourceRow < blocksPerRow; sourceRow++) {
        var targetRow = blocksPerRow - sourceRow - 1;
        for (var column = 0; column < blocksPerColumn; column++) {
            var target = (targetRow * blocksPerColumn + column) * bytesPerBlock;
            var source = (sourceRow * blocksPerColumn + column) * bytesPerBlock;
            switch (format) {
            case "PrecompressedDXT1":
            case "PrecompressedDXT1A":
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
            case "PrecompressedDXT3":
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
            case "PrecompressedDXT5":
                // Alpha, the first 2 bytes remain
                returnData[target + 0] = rawData[source + 0];
                returnData[target + 1] = rawData[source + 1];

                // extract 3 bits each and flip them
                functionObject_getBytesFromUInt24(
                    returnData,
                    target + 5,
                    functionObject_flipUInt24(functionObject_getUInt24(rawData, source + 2))
                );
                functionObject_getBytesFromUInt24(
                    returnData,
                    target + 2,
                    functionObject_flipUInt24(functionObject_getUInt24(rawData, source + 5))
                );

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
            }
        }
    }
    return returnData;
};

functionObject_getUInt24 = function(input, offset) {
    var result = 0;
    result |= (input[offset + 0] & 255) << 0;
    result |= (input[offset + 1] & 255) << 8;
    result |= (input[offset + 2] & 255) << 16;
    return result;
};

functionObject_getBytesFromUInt24 = function(input, offset, uint24) {
    input[offset + 0] = uint24 & 255;
    input[offset + 1] = (uint24 & 65280) >> 8;
    input[offset + 2] = (uint24 & 16711680) >> 16;
};

functionObject_ThreeBitMask = 7;

functionObject_flipUInt24 = function(uint24) {
    var threeBits = [];
    for (var i = 0; i < 2; i++) {
        threeBits.push([0, 0, 0, 0]);
    }

    // extract 3 bits each into the array
    threeBits[0][0] = uint24 & functionObject_ThreeBitMask;
    uint24 >>= 3;
    threeBits[0][1] = uint24 & functionObject_ThreeBitMask;
    uint24 >>= 3;
    threeBits[0][2] = uint24 & functionObject_ThreeBitMask;
    uint24 >>= 3;
    threeBits[0][3] = uint24 & functionObject_ThreeBitMask;
    uint24 >>= 3;
    threeBits[1][0] = uint24 & functionObject_ThreeBitMask;
    uint24 >>= 3;
    threeBits[1][1] = uint24 & functionObject_ThreeBitMask;
    uint24 >>= 3;
    threeBits[1][2] = uint24 & functionObject_ThreeBitMask;
    uint24 >>= 3;
    threeBits[1][3] = uint24 & functionObject_ThreeBitMask;

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

export { functionObject_shiftCount as shiftCount, functionObject_isSet as isSet, functionObject_getIntFromString as getIntFromString, functionObject_getIntFromBytes as getIntFromBytes, functionObject_getComponents as getComponents, functionObject_flipDXT as flipDXT };
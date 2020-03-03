import { Box as Boxjs } from "../shapes/Box";
import { Quad as Quadjs } from "../shapes/Quad";
import { Sphere as Spherejs } from "../shapes/Sphere";
import { Cylinder as Cylinderjs } from "../shapes/Cylinder";
import { Torus as Torusjs } from "../shapes/Torus";
import { Disk as Diskjs } from "../shapes/Disk";
import { Cone as Conejs } from "../shapes/Cone";
import { ObjectUtils as ObjectUtil_ObjectUtilsjs } from "../util/ObjectUtil";
var ShapeCreatorMemoized_clearCache;
var ShapeCreatorMemoized_createCone;
var ShapeCreatorMemoized_createDisk;
var ShapeCreatorMemoized_createTorus;
var ShapeCreatorMemoized_createCylinder;
var ShapeCreatorMemoized_createSphere;
var ShapeCreatorMemoized_createBox;
var ShapeCreatorMemoized_createQuad;

/**
 * Factory for shape creation.
 * Only used to define the class. Should never be instantiated.
 */
function ShapeCreatorMemoized() {}

var _cacheQueue = [];
var _cacheMap = new Map();
var cacheLimit = 100;

function computeHash(name, options) {
	var keys = Object.keys(options);
	var optionsStr = keys.map(function (key) {
		return key + '' + options[key];
	}).join('');
	return name + optionsStr;
}

function cacheOrCreate(name, options, createShape) {
	var hash = computeHash(name, options);

	var shape = _cacheMap.get(hash);
	if (shape) {
		return shape;
	} else {
		shape = createShape();
		_cacheQueue.push(hash);
		_cacheMap.set(hash, shape);
		if (_cacheQueue.length > cacheLimit) {
			var hash = _cacheQueue.shift();
			_cacheMap.delete(hash);
		}
		return shape;
	}
}

ShapeCreatorMemoized_createQuad = function(options, oldMeshData) {
    var width = 1, height = 1, tileX = 1, tileY = 1;
    if (!oldMeshData || width !== oldMeshData.xExtent || height !== oldMeshData.yExtent || tileX !== oldMeshData.tileX || tileY !== oldMeshData.tileY) {
        return cacheOrCreate("quad", {}, function() {
            return new Quadjs(width, height, tileX, tileY);
        });
    } else {
        return oldMeshData;
    }
};;

ShapeCreatorMemoized_createBox = function(options, oldMeshData) {
    options = options || {};
    ObjectUtil_ObjectUtilsjs.defaults(options, {
        textureMode: "Uniform"
    });

    var width = 1, height = 1, length = 1, tileX = 1, tileY = 1;
    if (!oldMeshData || width !== oldMeshData.xExtent || height !== oldMeshData.yExtent || length !== oldMeshData.zExtent || tileX !== oldMeshData.tileX || tileY !== oldMeshData.tileY || options.textureMode !== oldMeshData.textureMode.name) {
        return cacheOrCreate("box", options, function() {
            return new Boxjs(width, height, length, tileX, tileY, options.textureMode);
        });
    } else {
        return oldMeshData;
    }
};;

ShapeCreatorMemoized_createSphere = function(options, oldMeshData) {
    options = options || {};
    ObjectUtil_ObjectUtilsjs.defaults(options, {
        zSamples: 8,
        radialSamples: 8,
        textureMode: "Projected",
        radius: 1
    });

    if (!oldMeshData || options.zSamples !== oldMeshData.zSamples - 1 || options.radialSamples !== oldMeshData.radialSamples || options.textureMode !== oldMeshData.textureMode.name || options.radius !== oldMeshData.radius) {
        return cacheOrCreate("sphere", options, function() {
            return new Spherejs(
                options.zSamples,
                options.radialSamples,
                options.radius,
                options.textureMode
            );
        });
    } else {
        return oldMeshData;
    }
};;

ShapeCreatorMemoized_createCylinder = function(options, oldMeshData) {
    options = options || {};
    ObjectUtil_ObjectUtilsjs.defaults(options, {
        radialSamples: 8,
        radius: 1
    });

    if (!oldMeshData || options.radialSamples !== oldMeshData.radialSamples || options.radius !== oldMeshData.radius) {
        return cacheOrCreate("cylinder", options, function() {
            return new Cylinderjs(options.radialSamples, options.radius);
        });
    } else {
        return oldMeshData;
    }
};;

ShapeCreatorMemoized_createTorus = function(options, oldMeshData) {
    options = options || {};
    ObjectUtil_ObjectUtilsjs.defaults(options, {
        radialSamples: 8,
        circleSamples: 12,
        tubeRadius: 0.2,
        centerRadius: 1
    });

    if (!oldMeshData || options.radialSamples !== oldMeshData._radialSamples || options.circleSamples !== oldMeshData._circleSamples || options.tubeRadius !== oldMeshData._tubeRadius || options.centerRadius !== oldMeshData._centerRadius) {
        return cacheOrCreate("torus", options, function() {
            // cannot cache torus because of real typed tubeRadius
            return new Torusjs(
                options.circleSamples,
                options.radialSamples,
                options.tubeRadius,
                options.centerRadius
            );
        });
    } else {
        return oldMeshData;
    }
};;

ShapeCreatorMemoized_createDisk = function(options, oldMeshData) {
    options = options || {};
    ObjectUtil_ObjectUtilsjs.defaults(options, {
        radialSamples: 8,
        pointiness: 0,
        radius: 1
    });

    if (!oldMeshData || options.radialSamples !== oldMeshData.nSegments || options.pointiness !== oldMeshData.pointiness || options.radius !== oldMeshData.radius) {
        if (options.pointiness === Math.floor(options.pointiness)) {
            return cacheOrCreate("disk", options, function() {
                return new Diskjs(options.radialSamples, options.radius, options.pointiness);
            });
        } else {
            return new Diskjs(options.radialSamples, options.radius, options.pointiness);
        }
    } else {
        return oldMeshData;
    }
};;

ShapeCreatorMemoized_createCone = function(options, oldMeshData) {
    options = options || {};
    ObjectUtil_ObjectUtilsjs.defaults(options, {
        radialSamples: 8,
        height: 0,
        radius: 1
    });

    if (!oldMeshData || options.radialSamples !== oldMeshData.radialSamples || options.height !== oldMeshData.height || options.radius !== oldMeshData.radius) {
        if (options.height === Math.floor(options.height)) {
            return cacheOrCreate("cone", options, function() {
                return new Conejs(options.radialSamples, options.radius, options.height);
            });
        } else {
            return new Conejs(options.radialSamples, options.radius, options.height);
        }
    } else {
        return oldMeshData;
    }
};;

ShapeCreatorMemoized_clearCache = function(context) {
    if (context) {
        _cacheMap.forEach(function(value) {
            value.destroy(context);
        });
    }
    _cacheQueue.length = 0;
    _cacheMap.clear();
};;

export { ShapeCreatorMemoized_clearCache as clearCache, ShapeCreatorMemoized };
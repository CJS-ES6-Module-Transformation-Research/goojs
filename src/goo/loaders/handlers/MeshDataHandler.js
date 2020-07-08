var MeshDataHandler_MeshDataHandler = MeshDataHandler;

import {
    ConfigHandler as loadershandlersConfigHandler_ConfigHandlerjs,
    _registerClass as ConfigHandlerjs__registerClass,
} from "../../loaders/handlers/ConfigHandler";

import { MeshData as rendererMeshData_MeshDatajs } from "../../renderer/MeshData";
import { browserType as BufferUtilsjs_browserType } from "../../renderer/BufferUtils";
import { Capabilities as rendererCapabilities_Capabilitiesjs } from "../../renderer/Capabilities";
import { PromiseUtils as utilPromiseUtils_PromiseUtilsjs } from "../../util/PromiseUtils";
import { getTypedArray as ArrayUtilsjs_getTypedArray } from "../../util/ArrayUtils";

var WEIGHTS_PER_VERT = 4;

function MeshDataHandler() {
	loadershandlersConfigHandler_ConfigHandlerjs.apply(this, arguments);
}

MeshDataHandler.prototype = Object.create(loadershandlersConfigHandler_ConfigHandlerjs.prototype);
MeshDataHandler.prototype.constructor = MeshDataHandler;
ConfigHandlerjs__registerClass('mesh', MeshDataHandler);

/**
 * Removes the meshdata from the objects config
 * @param {string} ref
 */
MeshDataHandler.prototype._remove = function (ref) {
	var meshData = this._objects.get(ref);
	if (meshData && this.world.gooRunner) {
		meshData.destroy(this.world.gooRunner.renderer.context);
	}
	this._objects.delete(ref);
};

/**
 * Creates a MeshData once, then reuses that one without updating
 * @param {string} ref
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} Resolves with the Meshdata or null if removed
 */
MeshDataHandler.prototype._update = function (ref, config, options) {
	// Don't call ConfigHandler.prototype.update, since we don't want to do ._create in the normal way
	if (!config) {
		this._remove(ref);
		return utilPromiseUtils_PromiseUtilsjs.resolve();
	}

	var meshData = this._objects.get(ref);
	if (meshData) {
		return utilPromiseUtils_PromiseUtilsjs.resolve(meshData);
	}

	return this.loadObject(config.binaryRef, options).then(function (bindata) {
		if (!bindata) {
			throw new Error('Binary mesh data was empty');
		}
		var meshData = this._createMeshData(config, bindata);
		this._fillMeshData(meshData, config, bindata);

		this._objects.set(ref, meshData);
		return meshData;
	}.bind(this));
};

/**
 * Creates a MeshData object with attributeMap according to config
 * @param {Object} config
 * @returns {MeshData}
 * @private
 */
MeshDataHandler.prototype._createMeshData = function (config) {
	var skinned = config.type === 'SkinnedMesh';
	var vertexCount = config.vertexCount;
	if (vertexCount === 0) {
		return null;
	}

	var indexCount = 0;
	if (config.indexLengths) {
		indexCount = config.indexLengths.reduce(function (store, val) { return store + val; });
	} else if (config.indices) {
		indexCount = config.indices.wordLength;
	}

	var typeMatch = {
		'float32': 'Float',
		'uint8': 'UnsignedByte',
		'uint16': 'UnsignedShort',
		// Not yet supported
		'uint32': 'UnsignedInt'
	};

	if (BufferUtilsjs_browserType === 'Trident') {
		typeMatch.uint8 = 'UnsignedShort';
	}

	var attributeMap = {};
	for (var key in config.attributes) {
		var map = config.attributes[key];
		var type = map.value[2];
		attributeMap[key] = rendererMeshData_MeshDatajs.createAttribute(map.dimensions, typeMatch[type]);
	}

	var meshData = new rendererMeshData_MeshDatajs(attributeMap, vertexCount, indexCount);
	meshData.type = skinned ? rendererMeshData_MeshDatajs.SKINMESH : rendererMeshData_MeshDatajs.MESH;
	return meshData;
};

/**
 * Fills MeshData object from config
 * @param {MeshData} meshData
 * @param {Object} config
 * @param {ArrayBuffer} bindata
 * @returns {MeshData}
 * @private
 */
MeshDataHandler.prototype._fillMeshData = function (meshData, config, bindata) {
	var skinned = meshData.type === rendererMeshData_MeshDatajs.SKINMESH;

	for (var key in config.attributes) {
		if (key === 'JOINTIDS') {
			//Special handling later
			continue;
		}
		var data = config.attributes[key].value;
		meshData.getAttributeBuffer(key).set(ArrayUtilsjs_getTypedArray(bindata, data));
	}

	/**Remapping the joints. This will enable us to have skeleton with hundreds of joints even
	 * though meshes can only have ~70
	 */
	if (skinned && config.attributes.JOINTIDS) {
		var buffer = meshData.getAttributeBuffer(rendererMeshData_MeshDatajs.JOINTIDS);
		var jointData = ArrayUtilsjs_getTypedArray(bindata, config.attributes.JOINTIDS.value);

		// Map skeleton joint index local joint index
		var localJointMap = [];

		var localIndex = 0;
		for (var idx = 0; idx < jointData.length; idx++) {
			var jointIndex = jointData[idx];
			if (localJointMap[jointIndex] === undefined) {
				// If vertex has joint index, add to localmap
				localJointMap[jointIndex] = localIndex++;
			}
			// Set vertex joint index to local index
			buffer.set([localJointMap[jointIndex]], idx);
		}
		// Make a reverse map from local joint to skeleton joint
		// We will use this later in animation shader code
		var localMap = [];
		for (var jointIndex = 0; jointIndex < localJointMap.length; jointIndex++) {
			var localIndex = localJointMap[jointIndex];
			if (localIndex !== null) {
				localMap[localIndex] = jointIndex;
			}
		}
		meshData.paletteMap = localMap;
		meshData.weightsPerVertex = WEIGHTS_PER_VERT;
	}

	meshData.getIndexBuffer().set(ArrayUtilsjs_getTypedArray(bindata, config.indices));
	meshData.indexModes = config.indexModes.slice();
	meshData.indexLengths = config.indexLengths.slice();

	// TODO Put somewhere else
	if (config.boundingVolume) {
		if (config.boundingVolume.type === 'BoundingBox') {
			meshData.boundingBox = { min: config.boundingVolume.min, max: config.boundingVolume.max };
		} else {
			throw new Error('Bounding volume was not BoundingBox');
		}
	}

	if (!rendererCapabilities_Capabilitiesjs.ElementIndexUInt && meshData.vertexCount > 65536) {
		meshData.deIndex();
	}

	return meshData;
};

/**
 * Handler for meshdata. Will not update, only create once
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 * @private
 */
export { MeshDataHandler_MeshDataHandler as MeshDataHandler };

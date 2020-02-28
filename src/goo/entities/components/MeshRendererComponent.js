var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MeshRendererComponent = undefined;

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
	return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _Component = require("../../entities/components/Component");

var _Material = require("../../renderer/Material");

function MeshRendererComponent(materials) {
	_Component.Component.apply(this, arguments);

	this.type = 'MeshRendererComponent';

	//! schteppe: Don't chain or nest ternary operators as it hard to read and confusing
	/** Materials to use when rendering
  * @type {Array<Material>}
  */
	this.materials = Array.isArray(materials) ? materials : materials ? [materials] : [];
	/** Worldspace bounding considering entity transformations
  * @type {BoundingVolume}
  */
	this.worldBound = null;

	this._worldBoundDirty = true;
	this._transformUpdatedListener = null;

	/** Culling mode. Other valid values: 'Never'
  * @type {string}
  * @default
  */
	this.cullMode = 'Dynamic'; //'Dynamic', 'Never'
	/**
  * @type {boolean}
  * @default
  */
	this.castShadows = true;
	/**
  * @type {boolean}
  * @default
  */
	this.receiveShadows = true;

	/**
  * @type {boolean}
  * @default
  */
	this.isPickable = true;

	/**
  * @type {boolean}
  * @default
  */
	this.isReflectable = true;

	/**
  * @type {boolean}
  * @default
  */
	this.hidden = false;

	this._renderDistance = 0;

	// @ifdef DEBUG
	Object.seal(this);
	// @endif
}

MeshRendererComponent.type = 'MeshRendererComponent';

MeshRendererComponent.prototype = Object.create(_Component.Component.prototype);
MeshRendererComponent.prototype.constructor = MeshRendererComponent;

MeshRendererComponent.prototype.api = {
	setDiffuse: function setDiffuse() {
		var material = this.meshRendererComponent.materials[0];
		if (!material.uniforms.materialDiffuse) {
			material.uniforms.materialDiffuse = [0, 0, 0, 1];
		}
		var diffuse = material.uniforms.materialDiffuse;

		//! AT: need to search for a pattern matching library; this is just ugly and unmaintainable
		if (arguments.length >= 3) {
			diffuse[0] = arguments[0];
			diffuse[1] = arguments[1];
			diffuse[2] = arguments[2];
			diffuse[3] = arguments.length === 3 ? 1 : arguments[3];
		} else {
			var arg = arguments[0];
			if (arg instanceof Array) {
				diffuse[0] = arg[0];
				diffuse[1] = arg[1];
				diffuse[2] = arg[2];
				diffuse[3] = arg.length === 3 ? 1 : arg[3];
			} else if (arg.r !== undefined && arg.g !== undefined && _typeof(arg.b) !== undefined) {
				diffuse[0] = arg.r;
				diffuse[1] = arg.g;
				diffuse[2] = arg.b;
				diffuse[3] = arg.a === undefined ? 1 : arg.a;
			}
		}
	},
	getDiffuse: function getDiffuse() {
		return this.meshRendererComponent.materials[0].uniforms.materialDiffuse;
	}
};

MeshRendererComponent.entitySelectionAPI = {
	setDiffuse: MeshRendererComponent.prototype.api.setDiffuse
};

MeshRendererComponent.prototype.attached = function () {
	var that = this;
	this.entity.on('transformUpdated', this._transformUpdatedListener = function () {
		that._worldBoundDirty = true;
	});
};

MeshRendererComponent.prototype.detached = function () {
	this.entity.off('transformUpdated', this._transformUpdatedListener);
};

/**
 * Update world bounding
 *
 * @param {BoundingVolume} bounding Bounding volume in local space
 * @param {Transform} transform Transform to apply to local bounding -> world bounding
 */
MeshRendererComponent.prototype.updateBounds = function (bounding, transform) {
	this.worldBound = bounding.transform(transform, this.worldBound);
	this._worldBoundDirty = false;
};

/**
 * Returns a clone of this mesh renderer component
 * @param {Object} [options]
 * @param {boolean} [options.shareMaterials=false] Cloning this component clones the materials by default
 * @returns {MeshRendererComponent}
 */
MeshRendererComponent.prototype.clone = function (options) {
	options = options || {};

	var clonedMaterials;

	if (options.shareMaterials) {
		clonedMaterials = this.materials;
	} else {
		clonedMaterials = this.materials.map(function (material) {
			return material.clone(options);
		});
	}

	var clone = new MeshRendererComponent(clonedMaterials);

	clone.cullMode = this.cullMode;
	clone.castShadows = this.castShadows;
	clone.receiveShadows = this.receiveShadows;
	clone.isPickable = this.isPickable;
	clone.isReflectable = this.isReflectable;

	return clone;
};

MeshRendererComponent.applyOnEntity = function (obj, entity) {
	var meshRendererComponent = entity.meshRendererComponent;

	if (!meshRendererComponent) {
		meshRendererComponent = new MeshRendererComponent();
	}

	// or a texture
	// or a {r, g, b} object
	var matched = false;
	if (obj instanceof _Material.Material) {
		meshRendererComponent.materials.push(obj);
		matched = true;
	}

	if (matched) {
		entity.setComponent(meshRendererComponent);
		return true;
	}
};

var exported_MeshRendererComponent = MeshRendererComponent;

/**
 * Defines the appearance of a mesh, through materials. Using several materials results in multi-pass rendering.
 * @example-link http://code.gooengine.com/latest/examples/goo/entities/components/MeshRendererComponent/MeshRendererComponent-example.html Working example
 * @extends Component
 */
exports.MeshRendererComponent = exported_MeshRendererComponent;

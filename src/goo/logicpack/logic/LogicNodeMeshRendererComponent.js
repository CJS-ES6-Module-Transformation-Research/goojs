"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeMeshRendererComponent = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var _Vector = require("../../math/Vector3");

var mod_LogicNodeMeshRendererComponent = LogicNodeMeshRendererComponent;

/**
 * Logic node that connects to the MeshRendererComponent of an entity.
 * @private
 */
function LogicNodeMeshRendererComponent() {
	_LogicNode.LogicNode.call(this);
	this.logicInterface = LogicNodeMeshRendererComponent.logicInterface;
	this.type = 'MeshRendererComponent';
}

LogicNodeMeshRendererComponent.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeMeshRendererComponent.editorName = 'MeshRendererComponent';

LogicNodeMeshRendererComponent.prototype.onConfigure = function (config) {
	this.entityRef = config.entityRef;
};

LogicNodeMeshRendererComponent.prototype.onInputChanged = function (instDesc, portID, value) {
	var entity = _LogicLayer.LogicLayer.resolveEntityRef(instDesc, this.entityRef);
	var comp = entity.meshRendererComponent;

	if (portID === LogicNodeMeshRendererComponent.inportAmbient && comp.materials.length > 0) {
		comp.meshRendererComponent.materials[0].uniforms.materialAmbient[0] = value[0];
		comp.materials[0].uniforms.materialAmbient[1] = value[1];
		comp.materials[0].uniforms.materialAmbient[2] = value[2];
	}
};

LogicNodeMeshRendererComponent.prototype.onEvent = function (instDesc, event) {
	var entity = _LogicLayer.LogicLayer.resolveEntityRef(instDesc, this.entityRef);
	var comp = entity.meshRendererComponent;

	if (event === LogicNodeMeshRendererComponent.inportShadows) {
		comp.castShadows = !comp.castShadows;
	} else if (event === LogicNodeMeshRendererComponent.inportHidden) {
		comp.hidden = !comp.hidden;
	}
};

LogicNodeMeshRendererComponent.logicInterface = new _LogicInterface.LogicInterface('Material');
LogicNodeMeshRendererComponent.inportShadows = LogicNodeMeshRendererComponent.logicInterface.addInputEvent('toggle-shadows');
LogicNodeMeshRendererComponent.inportHidden = LogicNodeMeshRendererComponent.logicInterface.addInputEvent('toggle-hidden');
LogicNodeMeshRendererComponent.inportAmbient = LogicNodeMeshRendererComponent.logicInterface.addInputProperty('ambient', 'Vector3', new _Vector.Vector3(0.5, 0.0, 0.0));
LogicNodeMeshRendererComponent.logicInterface.addConfigEntry({
	name: 'entityRef',
	type: 'entityRef',
	label: 'Entity'
});
_LogicNodes.LogicNodes.registerType('MeshRendererComponent', LogicNodeMeshRendererComponent);

/**
 * Logic node that connects to the MeshRendererComponent of an entity.
 * @private
 */
exports.LogicNodeMeshRendererComponent = mod_LogicNodeMeshRendererComponent;
Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeMeshRendererComponent = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var _Vector = require("../../math/Vector3");

var LogicNodeMeshRendererComponent_inportAmbient;
var LogicNodeMeshRendererComponent_inportHidden;
var LogicNodeMeshRendererComponent_inportShadows;
var LogicNodeMeshRendererComponent_editorName;
var LogicNodeMeshRendererComponent_logicInterface;
function LogicNodeMeshRendererComponent() {
	_LogicNode.LogicNode.call(this);
	LogicNodeMeshRendererComponent_logicInterface = LogicNodeMeshRendererComponent_logicInterface;;
	this.type = 'MeshRendererComponent';
}

LogicNodeMeshRendererComponent.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeMeshRendererComponent_editorName = "MeshRendererComponent";;

LogicNodeMeshRendererComponent.prototype.onConfigure = function (config) {
	this.entityRef = config.entityRef;
};

LogicNodeMeshRendererComponent.prototype.onInputChanged = function (instDesc, portID, value) {
	var entity = (0, _LogicLayer.resolveEntityRef)(instDesc, this.entityRef);
	var comp = entity.meshRendererComponent;

	if (portID === LogicNodeMeshRendererComponent_inportAmbient && comp.materials.length > 0) {
		comp.meshRendererComponent.materials[0].uniforms.materialAmbient[0] = value[0];
		comp.materials[0].uniforms.materialAmbient[1] = value[1];
		comp.materials[0].uniforms.materialAmbient[2] = value[2];
	}
};

LogicNodeMeshRendererComponent.prototype.onEvent = function (instDesc, event) {
	var entity = (0, _LogicLayer.resolveEntityRef)(instDesc, this.entityRef);
	var comp = entity.meshRendererComponent;

	if (event === LogicNodeMeshRendererComponent_inportShadows) {
		comp.castShadows = !comp.castShadows;
	} else if (event === LogicNodeMeshRendererComponent_inportHidden) {
		comp.hidden = !comp.hidden;
	}
};

LogicNodeMeshRendererComponent_logicInterface = new _LogicInterface.LogicInterface('Material');
LogicNodeMeshRendererComponent_inportShadows = LogicNodeMeshRendererComponent_logicInterface.addInputEvent("toggle-shadows");;
LogicNodeMeshRendererComponent_inportHidden = LogicNodeMeshRendererComponent_logicInterface.addInputEvent("toggle-hidden");;
LogicNodeMeshRendererComponent_inportAmbient = LogicNodeMeshRendererComponent_logicInterface.addInputProperty("ambient", "Vector3", new _Vector.Vector3(0.5, 0.0, 0.0));;
LogicNodeMeshRendererComponent.logicInterface.addConfigEntry({
	name: 'entityRef',
	type: 'entityRef',
	label: 'Entity'
});
(0, _LogicNodes.registerType)('MeshRendererComponent', LogicNodeMeshRendererComponent);

var exported_LogicNodeMeshRendererComponent = LogicNodeMeshRendererComponent;

/**
 * Logic node that connects to the MeshRendererComponent of an entity.
 * @private
 */
exports.LogicNodeMeshRendererComponent = exported_LogicNodeMeshRendererComponent;

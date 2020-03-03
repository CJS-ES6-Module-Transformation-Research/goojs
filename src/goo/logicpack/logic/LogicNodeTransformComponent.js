Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeTransformComponent = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var _Vector = require("../../math/Vector3");

var _Matrix = require("../../math/Matrix3");

var LogicNodeTransformComponent_outportRot;
var LogicNodeTransformComponent_outportPos;
var LogicNodeTransformComponent_inportScale;
var LogicNodeTransformComponent_inportRot;
var LogicNodeTransformComponent_inportPos;
var LogicNodeTransformComponent_editorName;
var LogicNodeTransformComponent_logicInterface;
function LogicNodeTransformComponent() {
	_LogicNode.LogicNode.call(this);
	LogicNodeTransformComponent_logicInterface = LogicNodeTransformComponent_logicInterface;;
	this.type = 'TransformComponent';
}

LogicNodeTransformComponent.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeTransformComponent_editorName = "TransformComponent";;

LogicNodeTransformComponent.prototype.onConfigure = function (config) {
	this.entityRef = config.entityRef; //
};

LogicNodeTransformComponent.prototype.onInputChanged = function (instDesc, portID, value) {
	var entity = (0, _LogicLayer.resolveEntityRef)(instDesc, this.entityRef);
	var transformComponent = entity.transformComponent;

	if (portID === LogicNodeTransformComponent_inportPos) {
		transformComponent.setTranslation(value);
	} else if (portID === LogicNodeTransformComponent_inportRot) {
		transformComponent.setRotation(value[0], value[1], value[2]);
	} else if (portID === LogicNodeTransformComponent_inportScale) {
		transformComponent.setScale(value);
	}
	(0, _LogicLayer.writeValue)(this.logicInstance, LogicNodeTransformComponent_outportPos, entity.transformComponent.transform.translation.clone());
	(0, _LogicLayer.writeValue)(this.logicInstance, LogicNodeTransformComponent_outportRot, entity.transformComponent.transform.rotation.clone());
};

LogicNodeTransformComponent_logicInterface = new _LogicInterface.LogicInterface('Transform');
LogicNodeTransformComponent_inportPos = LogicNodeTransformComponent_logicInterface.addInputProperty("position", "Vector3", new _Vector.Vector3(0, 0, 0));;
LogicNodeTransformComponent_inportRot = LogicNodeTransformComponent_logicInterface.addInputProperty("rotation", "Vector3", new _Vector.Vector3(0, 0, 0));;
LogicNodeTransformComponent_inportScale = LogicNodeTransformComponent_logicInterface.addInputProperty("scale", "Vector3", new _Vector.Vector3(1, 1, 1));;
LogicNodeTransformComponent_outportPos = LogicNodeTransformComponent_logicInterface.addOutputProperty("outpos", "Vector3", new _Vector.Vector3());;
LogicNodeTransformComponent_outportRot = LogicNodeTransformComponent_logicInterface.addOutputProperty("rotmat", "Matrix3", new _Matrix.Matrix3());;
LogicNodeTransformComponent.logicInterface.addConfigEntry({
	name: 'entityRef',
	type: 'entityRef',
	label: 'Entity'
});

(0, _LogicNodes.registerType)('TransformComponent', LogicNodeTransformComponent);

var exported_LogicNodeTransformComponent = LogicNodeTransformComponent;

/**
 * Logic node that connects to the transform component of an entity.
 * @private
 */
exports.LogicNodeTransformComponent = exported_LogicNodeTransformComponent;

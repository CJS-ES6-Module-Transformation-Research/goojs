Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LogicNodeTransformComponent;

var _LogicLayer = require("./LogicLayer");

var _LogicLayer2 = _interopRequireDefault(_LogicLayer);

var _LogicNode = require("./LogicNode");

var _LogicNode2 = _interopRequireDefault(_LogicNode);

var _LogicNodes = require("./LogicNodes");

var _LogicNodes2 = _interopRequireDefault(_LogicNodes);

var _LogicInterface = require("./LogicInterface");

var _LogicInterface2 = _interopRequireDefault(_LogicInterface);

var _Vector = require("../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

var _Matrix = require("../../math/Matrix3");

var _Matrix2 = _interopRequireDefault(_Matrix);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Logic node that connects to the transform component of an entity.
 * @private
 */
function LogicNodeTransformComponent() {
	_LogicNode2.default.call(this);
	this.logicInterface = LogicNodeTransformComponent.logicInterface;
	this.type = 'TransformComponent';
}

LogicNodeTransformComponent.prototype = Object.create(_LogicNode2.default.prototype);
LogicNodeTransformComponent.editorName = 'TransformComponent';

LogicNodeTransformComponent.prototype.onConfigure = function (config) {
	this.entityRef = config.entityRef; //
};

LogicNodeTransformComponent.prototype.onInputChanged = function (instDesc, portID, value) {
	var entity = _LogicLayer2.default.resolveEntityRef(instDesc, this.entityRef);
	var transformComponent = entity.transformComponent;

	if (portID === LogicNodeTransformComponent.inportPos) {
		transformComponent.setTranslation(value);
	} else if (portID === LogicNodeTransformComponent.inportRot) {
		transformComponent.setRotation(value[0], value[1], value[2]);
	} else if (portID === LogicNodeTransformComponent.inportScale) {
		transformComponent.setScale(value);
	}
	_LogicLayer2.default.writeValue(this.logicInstance, LogicNodeTransformComponent.outportPos, entity.transformComponent.transform.translation.clone());
	_LogicLayer2.default.writeValue(this.logicInstance, LogicNodeTransformComponent.outportRot, entity.transformComponent.transform.rotation.clone());
};

LogicNodeTransformComponent.logicInterface = new _LogicInterface2.default('Transform');
LogicNodeTransformComponent.inportPos = LogicNodeTransformComponent.logicInterface.addInputProperty('position', 'Vector3', new _Vector2.default(0, 0, 0));
LogicNodeTransformComponent.inportRot = LogicNodeTransformComponent.logicInterface.addInputProperty('rotation', 'Vector3', new _Vector2.default(0, 0, 0));
LogicNodeTransformComponent.inportScale = LogicNodeTransformComponent.logicInterface.addInputProperty('scale', 'Vector3', new _Vector2.default(1, 1, 1));
LogicNodeTransformComponent.outportPos = LogicNodeTransformComponent.logicInterface.addOutputProperty('outpos', 'Vector3', new _Vector2.default());
LogicNodeTransformComponent.outportRot = LogicNodeTransformComponent.logicInterface.addOutputProperty('rotmat', 'Matrix3', new _Matrix2.default());
LogicNodeTransformComponent.logicInterface.addConfigEntry({
	name: 'entityRef',
	type: 'entityRef',
	label: 'Entity'
});

_LogicNodes2.default.registerType('TransformComponent', LogicNodeTransformComponent);
module.exports = exports.default;

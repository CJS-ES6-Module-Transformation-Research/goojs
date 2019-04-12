Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LogicComponentHandler;

var _ComponentHandler = require("../loaders/handlers/ComponentHandler");

var _ComponentHandler2 = _interopRequireDefault(_ComponentHandler);

var _LogicComponent = require("./LogicComponent");

var _LogicComponent2 = _interopRequireDefault(_LogicComponent);

var _PromiseUtils = require("../util/PromiseUtils");

var _PromiseUtils2 = _interopRequireDefault(_PromiseUtils);

require("./logic/LogicNodeEntityProxy");

require("./logic/LogicNodeTransformComponent");

require("./logic/LogicNodeMeshRendererComponent");

require("./logic/LogicNodeLightComponent");

require("./logic/LogicNodeDebug");

require("./logic/LogicNodeRandom");

require("./logic/LogicNodeTime");

require("./logic/LogicNodeSine");

require("./logic/LogicNodeVec3");

require("./logic/LogicNodeMultiply");

require("./logic/LogicNodeWASD");

require("./logic/LogicNodeWASD2");

require("./logic/LogicNodeMouse");

require("./logic/LogicNodeAdd");

require("./logic/LogicNodeSub");

require("./logic/LogicNodeFloat");

require("./logic/LogicNodeApplyMatrix");

require("./logic/LogicNodeConstVec3");

require("./logic/LogicNodeVec3Add");

require("./logic/LogicNodeRotationMatrix");

require("./logic/LogicNodeMultiplyFloat");

require("./logic/LogicNodeMax");

require("./logic/LogicNodeInt");

require("./logic/LogicNodeInput");

require("./logic/LogicNodeOutput");

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
* 	* @private
*/
function LogicComponentHandler() {
	_ComponentHandler2.default.apply(this, arguments);
}

LogicComponentHandler.prototype = Object.create(_ComponentHandler2.default.prototype);
LogicComponentHandler.prototype.constructor = LogicComponentHandler;
_ComponentHandler2.default._registerClass('logic', LogicComponentHandler);

LogicComponentHandler.prototype._create = function (entity, config) {
	var c = new _LogicComponent2.default(entity);
	c.configure(config);
	entity.setComponent(c);
	return c;
};

LogicComponentHandler.prototype.update = function (entity, config) {
	var component = _ComponentHandler2.default.prototype.update.call(this, entity, config);
	component.configure(config);
	return _PromiseUtils2.default.resolve(component);
};
module.exports = exports.default;

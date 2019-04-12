Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LogicComponent;

var _LogicLayer = require("./logic/LogicLayer");

var _LogicLayer2 = _interopRequireDefault(_LogicLayer);

var _LogicNodes = require("./logic/LogicNodes");

var _LogicNodes2 = _interopRequireDefault(_LogicNodes);

var _Component = require("../entities/components/Component");

var _Component2 = _interopRequireDefault(_Component);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * A component that embeds a LogicLayer and processes it every frame.
 * @private
 */
function LogicComponent(entity) {
	_Component2.default.call(this);

	this.type = 'LogicComponent';
	this.parent = null;
	this.logicInstance = null;

	// these used to be global but aren't any longer.
	this.logicLayer = null;
	this.nodes = {};

	this._entity = entity;
}

LogicComponent.prototype = Object.create(_Component2.default.prototype);

LogicComponent.prototype.configure = function (conf) {
	// cleanup.
	for (var x in this.nodes) {
		if (this.nodes[x].onSystemStopped !== undefined) {
			this.nodes[x].onSystemStopped(false);
		}
	}

	this.logicLayer = new _LogicLayer2.default(this._entity);

	this.nodes = {};

	for (var k in conf.logicNodes) {
		var ln = conf.logicNodes[k];
		var Fn = _LogicNodes2.default.getClass(ln.type);
		var obj = new Fn();

		obj.configure(ln);
		obj.addToLogicLayer(this.logicLayer, ln.id);

		this.nodes[k] = obj;
	}
};

LogicComponent.prototype.process = function (tpf) {
	if (this.logicLayer !== null) {
		this.logicLayer.process(tpf);
	}
};
module.exports = exports.default;

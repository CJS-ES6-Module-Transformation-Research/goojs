Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Box2DComponent;

var _Component = require("../../../entities/components/Component");

var _Component2 = _interopRequireDefault(_Component);

var _ObjectUtil = require("../../../util/ObjectUtil");

var _ObjectUtil2 = _interopRequireDefault(_ObjectUtil);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Box2DComponent
 * @extends Component
 * @example-link http://code.gooengine.com/latest/visual-test/goo/components/Box2DComponent/Box2DComponent-vtest.html Working example
 */
function Box2DComponent(options) {
	_Component2.default.apply(this, arguments);

	this.type = 'Box2DComponent';

	this.body = null;
	this.world = null;
	this.mass = 1;

	_ObjectUtil2.default.copyOptions(this, options, {
		shape: 'box',
		width: 1,
		height: 1,
		radius: 1,
		vertices: [0, 1, 2, 2, 0, 2],
		movable: true,
		friction: 1,
		restitution: 0,
		offsetX: 0,
		offsetY: 0
	});
}

Box2DComponent.prototype = Object.create(_Component2.default.prototype);
Box2DComponent.prototype.constructor = Box2DComponent;
module.exports = exports.default;

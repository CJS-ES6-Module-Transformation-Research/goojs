Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Box2DComponent = undefined;

var _Component = require("../../../entities/components/Component");

var _ObjectUtil = require("../../../util/ObjectUtil");

function Box2DComponent(options) {
	_Component.Component.apply(this, arguments);

	this.type = 'Box2DComponent';

	this.body = null;
	this.world = null;
	this.mass = 1;

	_ObjectUtil.ObjectUtils.copyOptions(this, options, {
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

Box2DComponent.prototype = Object.create(_Component.Component.prototype);
Box2DComponent.prototype.constructor = Box2DComponent;

var exported_Box2DComponent = Box2DComponent;

/**
 * Box2DComponent
 * @extends Component
 * @example-link http://code.gooengine.com/latest/visual-test/goo/components/Box2DComponent/Box2DComponent-vtest.html Working example
 */
exports.Box2DComponent = exported_Box2DComponent;

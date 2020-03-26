import { Component as entitiescomponentsComponent_Componentjs } from "../../../entities/components/Component";
import { ObjectUtils as utilObjectUtil_ObjectUtilsjs } from "../../../util/ObjectUtil";
function Box2DComponent(options) {
	entitiescomponentsComponent_Componentjs.apply(this, arguments);

	this.type = 'Box2DComponent';

	this.body = null;
	this.world = null;
	this.mass = 1;

	utilObjectUtil_ObjectUtilsjs(this, options, {
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

Box2DComponent.prototype = Object.create(entitiescomponentsComponent_Componentjs.prototype);
Box2DComponent.prototype.constructor = Box2DComponent;

var exported_Box2DComponent = Box2DComponent;

/**
 * Box2DComponent
 * @extends Component
 * @example-link http://code.gooengine.com/latest/visual-test/goo/components/Box2DComponent/Box2DComponent-vtest.html Working example
 */
export { exported_Box2DComponent as Box2DComponent };
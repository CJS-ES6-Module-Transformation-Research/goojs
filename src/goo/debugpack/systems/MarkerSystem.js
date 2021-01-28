var mod_MarkerSystem = MarkerSystem;
import { System as System_System } from "../../entities/systems/System";
import { Material as Material_Material } from "../../renderer/Material";
import { ShaderLib as ShaderLib_ShaderLib } from "../../renderer/shaders/ShaderLib";
import { Renderer as Renderer_Renderer } from "../../renderer/Renderer";
import { Transform as Transform_Transform } from "../../math/Transform";

/**
 * Processes all entities with a marker component
 * @extends System
 */
function MarkerSystem(goo) {
	System_System.call(this, 'MarkerSystem', ['MarkerComponent']);

	this.material = new Material_Material(ShaderLib_ShaderLib.simpleColored);
	this.material.depthState.enabled = false;
	this.material.shader.uniforms.color = [0.0, 1.0, 0.0];

	this.goo = goo;
	this.renderer = this.goo.renderer;

	this.entities = [];

	// drawing needs to be performed AFTER the render system completes its execution
	this.goo.callbacks.push(function () {
		for (var i = 0; i < this.entities.length; i++) {
			var entity = this.entities[i];
			if (entity.hasComponent('MarkerComponent')) {
				var transform = new Transform_Transform();
				transform.copy(entity.transformComponent.sync().worldTransform);
				transform.setRotationXYZ(0, 0, 0);
				transform.scale.setDirect(1, 1, 1);
				transform.update();

				var renderableMarker = {
					meshData: entity.markerComponent.meshData,
					materials: [this.material],
					transform: transform
				};

				this.goo.renderer.render(renderableMarker, Renderer_Renderer.mainCamera, [], null, false);
			}
		}
	}.bind(this));
}

MarkerSystem.prototype = Object.create(System_System.prototype);

MarkerSystem.prototype.process = function (entities) {
	this.entities = entities;
};

/**
 * Processes all entities with a marker component
 * @extends System
 */
export { mod_MarkerSystem as MarkerSystem };
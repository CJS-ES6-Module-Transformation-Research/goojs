var MarkerSystem_MarkerSystem = MarkerSystem;
import { System as entitiessystemsSystem_Systemjs } from "../../entities/systems/System";
import { Material as rendererMaterial_Materialjs } from "../../renderer/Material";
import { ShaderLib as renderershadersShaderLib_ShaderLibjs } from "../../renderer/shaders/ShaderLib";
import { Renderer as rendererRenderer_Rendererjs } from "../../renderer/Renderer";
import { Transform as mathTransform_Transformjs } from "../../math/Transform";
function MarkerSystem(goo) {
	entitiessystemsSystem_Systemjs.call(this, 'MarkerSystem', ['MarkerComponent']);

	this.material = new rendererMaterial_Materialjs(renderershadersShaderLib_ShaderLibjs.simpleColored);
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
				var transform = new mathTransform_Transformjs();
				transform.copy(entity.transformComponent.sync().worldTransform);
				transform.setRotationXYZ(0, 0, 0);
				transform.scale.setDirect(1, 1, 1);
				transform.update();

				var renderableMarker = {
					meshData: entity.markerComponent.meshData,
					materials: [this.material],
					transform: transform
				};

				this.goo.renderer.render(renderableMarker, rendererRenderer_Rendererjs.mainCamera, [], null, false);
			}
		}
	}.bind(this));
}

MarkerSystem.prototype = Object.create(entitiessystemsSystem_Systemjs.prototype);

MarkerSystem.prototype.process = function (entities) {
	this.entities = entities;
};

/**
 * Processes all entities with a marker component
 * @extends System
 */
export { MarkerSystem_MarkerSystem as MarkerSystem };
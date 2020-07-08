var TextSystem_TextSystem = TextSystem;
import { System as entitiessystemsSystem_Systemjs } from "../../entities/systems/System";
import { TextureGrid as shapesTextureGrid_TextureGridjs } from "../../shapes/TextureGrid";
import {     MeshDataComponent as entitiescomponentsMeshDataComponent_MeshDataComponentjs, } from "../../entities/components/MeshDataComponent";
function TextSystem() {
	entitiessystemsSystem_Systemjs.call(this, 'TextSystem', ['TextComponent']);
}

TextSystem.prototype = Object.create(entitiessystemsSystem_Systemjs.prototype);
TextSystem.prototype.constructor = TextSystem;

TextSystem.prototype.process = function (entities) {
	for (var i = 0; i < entities.length; i++) {
		var entity = entities[i];
		var textComponent = entity.textComponent;
		if (textComponent.dirty) {
			if (entity.hasComponent('MeshDataComponent')) {
				entity.getComponent('MeshDataComponent').meshData = shapesTextureGrid_TextureGridjs.fromString(textComponent.text);
			}
			else {
				var meshData = shapesTextureGrid_TextureGridjs.fromString(textComponent.text);
				var meshDataComponent = new entitiescomponentsMeshDataComponent_MeshDataComponentjs(meshData);
				entity.setComponent(meshDataComponent);
			}
			this.dirty = false;
		}
	}
};

/**
 * Processes all entities with a text component<br>
 * @example-link http://code.gooengine.com/latest/visual-test/goo/entities/components/TextComponent/TextComponent-vtest.html Working example
 * @extends System
 */
export { TextSystem_TextSystem as TextSystem };
var mod_TextSystem = TextSystem;
import { System as System_System } from "../../entities/systems/System";
import { fromString as TextureGridjs_fromString } from "../../shapes/TextureGrid";
import { MeshDataComponent as MeshDataComponent_MeshDataComponent } from "../../entities/components/MeshDataComponent";

/**
 * Processes all entities with a text component<br>
 * @example-link http://code.gooengine.com/latest/visual-test/goo/entities/components/TextComponent/TextComponent-vtest.html Working example
 * @extends System
 */
function TextSystem() {
	System_System.call(this, 'TextSystem', ['TextComponent']);
}

TextSystem.prototype = Object.create(System_System.prototype);
TextSystem.prototype.constructor = TextSystem;

TextSystem.prototype.process = function (entities) {
	for (var i = 0; i < entities.length; i++) {
		var entity = entities[i];
		var textComponent = entity.textComponent;
		if (textComponent.dirty) {
			if (entity.hasComponent('MeshDataComponent')) {
				entity.getComponent('MeshDataComponent').meshData = TextureGridjs_fromString(textComponent.text);
			}
			else {
				var meshData = TextureGridjs_fromString(textComponent.text);
				var meshDataComponent = new MeshDataComponent_MeshDataComponent(meshData);
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
export { mod_TextSystem as TextSystem };
import { System } from "../../entities/systems/System";
import { TextureGrid } from "../../shapes/TextureGrid";
import { MeshDataComponent } from "../../entities/components/MeshDataComponent";
var exported_TextSystem = TextSystem;
function TextSystem() {
	System.call(this, 'TextSystem', ['TextComponent']);
}

TextSystem.prototype = Object.create(System.prototype);
TextSystem.prototype.constructor = TextSystem;

TextSystem.prototype.process = function (entities) {
	for (var i = 0; i < entities.length; i++) {
		var entity = entities[i];
		var textComponent = entity.textComponent;
		if (textComponent.dirty) {
			if (entity.hasComponent('MeshDataComponent')) {
				entity.getComponent('MeshDataComponent').meshData = TextureGrid.fromString(textComponent.text);
			}
			else {
				var meshData = TextureGrid.fromString(textComponent.text);
				var meshDataComponent = new MeshDataComponent(meshData);
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
export { exported_TextSystem as TextSystem };
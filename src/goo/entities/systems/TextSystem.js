"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TextSystem = undefined;

var _System = require("../../entities/systems/System");

var _TextureGrid = require("../../shapes/TextureGrid");

var _MeshDataComponent = require("../../entities/components/MeshDataComponent");

var mod_TextSystem = TextSystem;

/**
 * Processes all entities with a text component<br>
 * @example-link http://code.gooengine.com/latest/visual-test/goo/entities/components/TextComponent/TextComponent-vtest.html Working example
 * @extends System
 */
function TextSystem() {
	_System.System.call(this, 'TextSystem', ['TextComponent']);
}

TextSystem.prototype = Object.create(_System.System.prototype);
TextSystem.prototype.constructor = TextSystem;

TextSystem.prototype.process = function (entities) {
	for (var i = 0; i < entities.length; i++) {
		var entity = entities[i];
		var textComponent = entity.textComponent;
		if (textComponent.dirty) {
			if (entity.hasComponent('MeshDataComponent')) {
				entity.getComponent('MeshDataComponent').meshData = _TextureGrid.TextureGrid.fromString(textComponent.text);
			} else {
				var meshData = _TextureGrid.TextureGrid.fromString(textComponent.text);
				var meshDataComponent = new _MeshDataComponent.MeshDataComponent(meshData);
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
exports.TextSystem = mod_TextSystem;
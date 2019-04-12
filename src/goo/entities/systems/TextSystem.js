Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = TextSystem;

var _System = require("../../entities/systems/System");

var _System2 = _interopRequireDefault(_System);

var _TextureGrid = require("../../shapes/TextureGrid");

var _TextureGrid2 = _interopRequireDefault(_TextureGrid);

var _MeshDataComponent = require("../../entities/components/MeshDataComponent");

var _MeshDataComponent2 = _interopRequireDefault(_MeshDataComponent);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Processes all entities with a text component<br>
 * @example-link http://code.gooengine.com/latest/visual-test/goo/entities/components/TextComponent/TextComponent-vtest.html Working example
 * @extends System
 */
function TextSystem() {
	_System2.default.call(this, 'TextSystem', ['TextComponent']);
}

TextSystem.prototype = Object.create(_System2.default.prototype);
TextSystem.prototype.constructor = TextSystem;

TextSystem.prototype.process = function (entities) {
	for (var i = 0; i < entities.length; i++) {
		var entity = entities[i];
		var textComponent = entity.textComponent;
		if (textComponent.dirty) {
			if (entity.hasComponent('MeshDataComponent')) {
				entity.getComponent('MeshDataComponent').meshData = _TextureGrid2.default.fromString(textComponent.text);
			} else {
				var meshData = _TextureGrid2.default.fromString(textComponent.text);
				var meshDataComponent = new _MeshDataComponent2.default(meshData);
				entity.setComponent(meshDataComponent);
			}
			this.dirty = false;
		}
	}
};
module.exports = exports.default;

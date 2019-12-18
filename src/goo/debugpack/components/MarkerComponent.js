Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MarkerComponent = undefined;

var _Component = require("../../entities/components/Component");

var _BoundingVolumeMeshBuilder = require("../../debugpack/BoundingVolumeMeshBuilder");

var BoundingVolumeMeshBuilder = _interopRequireWildcard(_BoundingVolumeMeshBuilder);

function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			}
		}newObj.default = obj;return newObj;
	}
}

function MarkerComponent(hostEntity) {
	_Component.Component.apply(this, arguments);

	this.type = 'MarkerComponent';

	var hostModelBound = hostEntity.meshRendererComponent.worldBound;
	//this.meshData = ShapeCreator.createBox(hostModelBound.radius * 2, hostModelBound.radius * 2, hostModelBound.radius * 2);
	this.meshData = BoundingVolumeMeshBuilder.build(hostModelBound);
}

MarkerComponent.prototype = Object.create(_Component.Component.prototype);
MarkerComponent.prototype.constructor = MarkerComponent;

var exported_MarkerComponent = MarkerComponent;

/**
 * Holds the necessary data for a marker
 * @param {Entity} entity The entity this component is attached to
 * @extends Component
 */
exports.MarkerComponent = exported_MarkerComponent;

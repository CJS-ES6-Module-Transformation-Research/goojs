Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = MarkerComponent;

var _Component = require("../../entities/components/Component");

var _Component2 = _interopRequireDefault(_Component);

var _BoundingVolumeMeshBuilder = require("../../debugpack/BoundingVolumeMeshBuilder");

var _BoundingVolumeMeshBuilder2 = _interopRequireDefault(_BoundingVolumeMeshBuilder);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Holds the necessary data for a marker
 * @param {Entity} entity The entity this component is attached to
 * @extends Component
 */
function MarkerComponent(hostEntity) {
	_Component2.default.apply(this, arguments);

	this.type = 'MarkerComponent';

	var hostModelBound = hostEntity.meshRendererComponent.worldBound;
	//this.meshData = ShapeCreator.createBox(hostModelBound.radius * 2, hostModelBound.radius * 2, hostModelBound.radius * 2);
	this.meshData = _BoundingVolumeMeshBuilder2.default.build(hostModelBound);
}

MarkerComponent.prototype = Object.create(_Component2.default.prototype);
MarkerComponent.prototype.constructor = MarkerComponent;
module.exports = exports.default;

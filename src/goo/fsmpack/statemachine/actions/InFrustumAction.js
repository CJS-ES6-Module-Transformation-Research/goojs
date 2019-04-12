Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = InFrustumAction /*id, settings*/;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _Action2 = _interopRequireDefault(_Action);

var _Camera = require("../../../renderer/Camera");

var _Camera2 = _interopRequireDefault(_Camera);

var _BoundingSphere = require("../../../renderer/bounds/BoundingSphere");

var _BoundingSphere2 = _interopRequireDefault(_BoundingSphere);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function InFrustumAction() {
	_Action2.default.apply(this, arguments);
}

InFrustumAction.prototype = Object.create(_Action2.default.prototype);
InFrustumAction.prototype.constructor = InFrustumAction;

InFrustumAction.external = {
	key: 'In Frustum',
	name: 'In View',
	type: 'camera',
	description: 'Performs a transition based on whether the entity is in a camera\'s frustum or not.',
	canTransition: true,
	parameters: [{
		name: 'Current camera',
		key: 'current',
		type: 'boolean',
		description: 'Check this to always use the current camera.',
		'default': true
	}, {
		name: 'Camera',
		key: 'cameraEntityRef',
		type: 'camera',
		description: 'Other camera; Will be ignored if the previous option is checked.',
		'default': null
	}, {
		name: 'On every frame',
		key: 'everyFrame',
		type: 'boolean',
		description: 'Repeat this action every frame.',
		'default': true
	}],
	transitions: [{
		key: 'inside',
		description: 'State to transition to if entity is in the frustum.'
	}, {
		key: 'outside',
		description: 'State to transition to if entity is outside the frustum.'
	}]
};

var labels = {
	inside: 'On Inside Frustum',
	outside: 'On Outside Frustum'
};

InFrustumAction.getTransitionLabel = function (transitionKey /*, actionConfig*/) {
	return labels[transitionKey];
};

InFrustumAction.prototype.checkFrustum = function (fsm) {
	var entity = fsm.getOwnerEntity();

	if (this.current) {
		if (entity.isVisible) {
			fsm.send(this.transitions.inside);
		} else {
			fsm.send(this.transitions.outside);
		}
	} else {
		var boundingVolume = entity.meshRendererComponent ? entity.meshRendererComponent.worldBound : new _BoundingSphere2.default(entity.transformComponent.sync().worldTransform.translation, 0.001);
		if (this.camera.contains(boundingVolume) === _Camera2.default.Outside) {
			fsm.send(this.transitions.outside);
		} else {
			fsm.send(this.transitions.inside);
		}
	}
};

InFrustumAction.prototype.enter = function (fsm) {
	if (!this.current) {
		var world = fsm.getOwnerEntity()._world;
		var cameraEntity = world.entityManager.getEntityById(this.cameraEntityRef);
		this.camera = cameraEntity.cameraComponent.camera;
	}

	if (!this.everyFrame) {
		this.checkFrustum(fsm);
	}
};

InFrustumAction.prototype.update = function (fsm) {
	if (this.everyFrame) {
		this.checkFrustum(fsm);
	}
};
module.exports = exports.default;

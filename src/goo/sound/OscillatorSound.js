Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.OscillatorSound = undefined;

var _AudioContext = require("../sound/AudioContext");

var _MathUtils = require("../math/MathUtils");

var MathUtils = _interopRequireWildcard(_MathUtils);

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

function OscillatorSound() {
	// Settings
	this.id = null;
	this._volume = 1.0;
	this._frequency = 440;
	this._type = 'sine';

	// Nodes
	this._outNode = _AudioContext.anonymus.getContext().createGain();

	this.connectTo();
}

OscillatorSound.prototype.stop = function () {
	this._oscNode.stop();
	this._oscNode = null;
};

OscillatorSound.prototype.play = function () {
	this._oscNode = _AudioContext.anonymus.getContext().createOscillator();
	this._oscNode.connect(this._outNode);
	this._oscNode.frequency.value = this._frequency;
	this._oscNode.type = this._type;

	this._oscNode.start();
};

OscillatorSound.prototype.update = function (config) {
	if (config.volume !== undefined) {
		this._volume = MathUtils.clamp(config.volume, 0, 1);
		this._outNode.gain.value = this._volume;
	}
	if (config.frequency !== undefined) {
		this._frequency = config.frequency;
		if (this._oscNode) {
			this._oscNode.frequency.value = this._frequency;
		}
	}
	if (config.type !== undefined && OscillatorSound.TYPES.indexOf(config.type) !== -1) {
		this._type = config.type;
		if (this._oscNode) {
			this._oscNode.type = this._type;
		}
	}
};

/**
 * Connect output of sound to audionodes
 * @param {(Array<AudioNode> | AudioNode)} nodes
 */
OscillatorSound.prototype.connectTo = function (nodes) {
	if (!_AudioContext.anonymus.isSupported()) {
		console.warn('WebAudio not supported');
		return;
	}
	this._outNode.disconnect();
	if (!nodes) {
		return;
	}
	if (!(nodes instanceof Array)) {
		nodes = [nodes];
	}
	for (var i = 0; i < nodes.length; i++) {
		this._outNode.connect(nodes[i]);
	}
};

OscillatorSound.TYPES = ['sine', 'square', 'sawtooth', 'triangle', 'custom'];

var exported_OscillatorSound = OscillatorSound;
exports.OscillatorSound = exported_OscillatorSound;

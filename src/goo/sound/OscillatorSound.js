import { AudioContextjs as AudioContext_AudioContextjsjs } from "../sound/AudioContext";
import { MathUtils as MathUtils_MathUtilsjs } from "../math/MathUtils";
var OscillatorSound_TYPES;

function OscillatorSound() {
	// Settings
	this.id = null;
	this._volume = 1.0;
	this._frequency = 440;
	this._type = 'sine';

	// Nodes
	this._outNode = AudioContext_AudioContextjsjs.getContext().createGain();

	this.connectTo();
}

OscillatorSound.prototype.stop = function () {
	this._oscNode.stop();
	this._oscNode = null;
};

OscillatorSound.prototype.play = function () {
	this._oscNode = AudioContext_AudioContextjsjs.getContext().createOscillator();
	this._oscNode.connect(this._outNode);
	this._oscNode.frequency.value = this._frequency;
	this._oscNode.type = this._type;

	this._oscNode.start();
};

OscillatorSound.prototype.update = function (config) {
	if (config.volume !== undefined) {
		this._volume = MathUtils_MathUtilsjs.clamp(config.volume, 0, 1);
		this._outNode.gain.value = this._volume;
	}
	if (config.frequency !== undefined) {
		this._frequency = config.frequency;
		if (this._oscNode) {
			this._oscNode.frequency.value = this._frequency;
		}
	}
	if (config.type !== undefined && OscillatorSound_TYPES.indexOf(config.type) !== -1) {
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
	if (!AudioContext_AudioContextjsjs.isSupported()) {
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

OscillatorSound_TYPES = ["sine", "square", "sawtooth", "triangle", "custom"];;

var exported_OscillatorSound = OscillatorSound;
export { exported_OscillatorSound as OscillatorSound };
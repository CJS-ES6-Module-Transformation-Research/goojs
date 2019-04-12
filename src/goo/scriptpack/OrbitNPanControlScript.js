Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = OrbitNPan;

var _Scripts = require("../scripts/Scripts");

var _Scripts2 = _interopRequireDefault(_Scripts);

var _OrbitCamControlScript = require("../scripts/OrbitCamControlScript");

var _OrbitCamControlScript2 = _interopRequireDefault(_OrbitCamControlScript);

var _PanCamScript = require("../scriptpack/PanCamScript");

var _PanCamScript2 = _interopRequireDefault(_PanCamScript);

var _ObjectUtils = require("../util/ObjectUtils");

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function OrbitNPan() {
	var orbitScript = _Scripts2.default.create(_OrbitCamControlScript2.default);
	var panScript = _Scripts2.default.create(_PanCamScript2.default);
	function setup(parameters, environment, goo) {
		parameters.touchMode = 'Double'; // should alaways be 2 touch mode for panning
		orbitScript.setup(parameters, environment, goo);
		panScript.setup(parameters, environment, goo);
	}
	function update(parameters, environment, goo) {
		panScript.update(parameters, environment, goo);
		orbitScript.update(parameters, environment, goo);
	}
	function cleanup(parameters, environment, goo) {
		panScript.cleanup(parameters, environment, goo);
		orbitScript.cleanup(parameters, environment, goo);
	}
	function argsUpdated(parameters, environment, goo) {
		panScript.argsUpdated(parameters, environment, goo);
		orbitScript.argsUpdated(parameters, environment, goo);
	}

	return {
		setup: setup,
		cleanup: cleanup,
		update: update,
		argsUpdated: argsUpdated
	};
}

var orbitParams = _OrbitCamControlScript2.default.externals.parameters;
var panParams = _PanCamScript2.default.externals.parameters;

// Make sure we don't change parameters for the other scripts
var params = _ObjectUtils2.default.deepClone(orbitParams.concat(panParams.slice(1)));

// Remove the panSpeed and touchMode parameters
for (var i = params.length - 1; i >= 0; i--) {
	var param = params[i];
	if (param.key === 'panSpeed' || param.key === 'touchMode') {
		params.splice(i, 1);
	}
}

for (var i = 0; i < params.length; i++) {
	var param = params[i];
	switch (param.key) {
		case 'dragButton':
			param.default = 'Left';
			break;
		case 'panButton':
			param.default = 'Right';
			break;
		case 'panSpeed':
			param.default = 1;
			break;
		case 'touchMode':
			param.default = 'Double';
			break;
	}
}

OrbitNPan.externals = {
	key: 'OrbitNPanControlScript',
	name: 'Orbit and Pan Control',
	description: 'This is a combo of orbitcamcontrolscript and pancamcontrolscript',
	parameters: params
};
module.exports = exports.default;

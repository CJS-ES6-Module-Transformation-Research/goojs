var _Scripts = require("../scripts/Scripts");

var Scripts = _interopRequireWildcard(_Scripts);

var _OrbitCamControlScript = require("../scripts/OrbitCamControlScript");

var _PanCamScript = require("../scriptpack/PanCamScript");

var PanCamControlScript = _interopRequireWildcard(_PanCamScript);

var _ObjectUtils = require("../util/ObjectUtils");

var ObjectUtils = _interopRequireWildcard(_ObjectUtils);

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

var functionObject_externals;

function OrbitNPan() {
	var orbitScript = Scripts.create(_OrbitCamControlScript.OrbitCamControlScript);
	var panScript = Scripts.create(PanCamControlScript);
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

var orbitParams = _OrbitCamControlScript.OrbitCamControlScript.externals.parameters;
var panParams = PanCamControlScript.externals.parameters;

// Make sure we don't change parameters for the other scripts
var params = ObjectUtils.deepClone(orbitParams.concat(panParams.slice(1)));

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

functionObject_externals = {
	key: "OrbitNPanControlScript",
	name: "Orbit and Pan Control",
	description: "This is a combo of orbitcamcontrolscript and pancamcontrolscript",
	parameters: params
};

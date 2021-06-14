var mod_OrbitNPan = OrbitNPan;
import { create as Scriptsjs_create } from "../scripts/Scripts";
import { OrbitCamControlScript as OrbitCamControlScript_OrbitCamControlScript } from "../scripts/OrbitCamControlScript";
import { PanCamScript as PanCamControlScript } from "../scriptpack/PanCamScript";
import { ObjectUtils as ObjectUtils_ObjectUtils } from "../util/ObjectUtils";

function OrbitNPan() {
	var orbitScript = Scriptsjs_create(OrbitCamControlScript_OrbitCamControlScript);
	var panScript = Scriptsjs_create(PanCamControlScript);
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

var orbitParams = OrbitCamControlScript_OrbitCamControlScript.externals.parameters;
var panParams = PanCamControlScript.externals.parameters;

// Make sure we don't change parameters for the other scripts
var params = ObjectUtils_ObjectUtils.deepClone(orbitParams.concat(panParams.slice(1)));

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
	parameters:	params
};

export { mod_OrbitNPan as OrbitNPan };
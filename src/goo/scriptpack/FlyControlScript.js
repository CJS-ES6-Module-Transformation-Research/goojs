var mod_FlyControlScript = FlyControlScript;
import { Scripts as Scripts_Scripts } from "../scripts/Scripts";
import { WasdControlScript as WasdControlScript_WasdControlScript } from "../scriptpack/WasdControlScript";
import { MouseLookControlScript as MouseLookControlScript_MouseLookControlScript } from "../scriptpack/MouseLookControlScript";

function FlyControlScript() {
	var wasdScript = Scripts_Scripts.create(WasdControlScript_WasdControlScript);
	var lookScript = Scripts_Scripts.create(MouseLookControlScript_MouseLookControlScript);

	function setup(parameters, environment) {
		lookScript.setup(parameters, environment);
		wasdScript.setup(parameters, environment);
	}

	function update(parameters, environment) {
		lookScript.update(parameters, environment);
		wasdScript.update(parameters, environment);
	}

	function cleanup(parameters, environment) {
		lookScript.cleanup(parameters, environment);
		wasdScript.cleanup(parameters, environment);
	}

	return {
		setup: setup,
		cleanup: cleanup,
		update: update
	};
}

var wasdParams = WasdControlScript_WasdControlScript.externals.parameters;
var mouseLookParams = MouseLookControlScript_MouseLookControlScript.externals.parameters;
var params = wasdParams.concat(mouseLookParams.slice(1));

FlyControlScript.externals = {
	key: 'FlyControlScript',
	name: 'Fly Control',
	description: 'This is a combo of the Wasd script and the MouseLook script',
	parameters: params
};

export { mod_FlyControlScript as FlyControlScript };
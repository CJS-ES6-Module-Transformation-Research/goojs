import {
    WasdControlScript as WasdControlScript_WasdControlScriptjs,
    externals as WasdControlScriptjs_externals,
} from "../scriptpack/WasdControlScript";

import {
    MouseLookControlScript as MouseLookControlScript_MouseLookControlScriptjs,
    externals as MouseLookControlScriptjs_externals,
} from "../scriptpack/MouseLookControlScript";

var FlyControlScript_externals;

function FlyControlScript() {
	var wasdScript = Scripts.create(WasdControlScript_WasdControlScriptjs);
	var lookScript = Scripts.create(MouseLookControlScript_MouseLookControlScriptjs);

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

var wasdParams = WasdControlScriptjs_externals.parameters;
var mouseLookParams = MouseLookControlScriptjs_externals.parameters;
var params = wasdParams.concat(mouseLookParams.slice(1));

FlyControlScript_externals = {
    key: "FlyControlScript",
    name: "Fly Control",
    description: "This is a combo of the Wasd script and the MouseLook script",
    parameters: params
};;

export { FlyControlScript };
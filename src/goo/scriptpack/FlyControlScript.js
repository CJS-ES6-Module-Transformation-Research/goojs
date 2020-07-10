var FlyControlScript_FlyControlScript = FlyControlScript;
import { create as Scriptsjs_create } from "../scripts/Scripts";
import { WasdControlScript as scriptpackWasdControlScript_WasdControlScriptjs } from "../scriptpack/WasdControlScript";
import {     MouseLookControlScript as scriptpackMouseLookControlScript_MouseLookControlScriptjs, } from "../scriptpack/MouseLookControlScript";

function FlyControlScript() {
	var wasdScript = Scriptsjs_create(scriptpackWasdControlScript_WasdControlScriptjs);
	var lookScript = Scriptsjs_create(scriptpackMouseLookControlScript_MouseLookControlScriptjs);

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

var wasdParams = scriptpackWasdControlScript_WasdControlScriptjs.externals.parameters;
var mouseLookParams = scriptpackMouseLookControlScript_MouseLookControlScriptjs.externals.parameters;
var params = wasdParams.concat(mouseLookParams.slice(1));

FlyControlScript.externals = {
	key: 'FlyControlScript',
	name: 'Fly Control',
	description: 'This is a combo of the Wasd script and the MouseLook script',
	parameters: params
};

export { FlyControlScript_FlyControlScript as FlyControlScript };
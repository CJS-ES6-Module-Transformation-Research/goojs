import { Scripts as scriptsScripts_Scriptsjs } from "../scripts/Scripts";
import { WasdControlScript as scriptpackWasdControlScript_WasdControlScriptjs } from "../scriptpack/WasdControlScript";
import {     MouseLookControlScript as scriptpackMouseLookControlScript_MouseLookControlScriptjs, } from "../scriptpack/MouseLookControlScript";

function FlyControlScript() {
	var wasdScript = scriptsScripts_Scriptsjs.create(scriptpackWasdControlScript_WasdControlScriptjs);
	var lookScript = scriptsScripts_Scriptsjs.create(scriptpackMouseLookControlScript_MouseLookControlScriptjs);

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

var exported_FlyControlScript = FlyControlScript;
export { exported_FlyControlScript as FlyControlScript };
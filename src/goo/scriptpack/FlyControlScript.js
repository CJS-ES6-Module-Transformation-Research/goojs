Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FlyControlScript = undefined;

var _WasdControlScript = require("../scriptpack/WasdControlScript");

var _MouseLookControlScript = require("../scriptpack/MouseLookControlScript");

var FlyControlScript_externals;

function FlyControlScript() {
	var wasdScript = Scripts.create(_WasdControlScript.WasdControlScript);
	var lookScript = Scripts.create(_MouseLookControlScript.MouseLookControlScript);

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

var wasdParams = _WasdControlScript.externals.parameters;
var mouseLookParams = _MouseLookControlScript.externals.parameters;
var params = wasdParams.concat(mouseLookParams.slice(1));

FlyControlScript_externals = {
	key: "FlyControlScript",
	name: "Fly Control",
	description: "This is a combo of the Wasd script and the MouseLook script",
	parameters: params
};;

exports.FlyControlScript = FlyControlScript;

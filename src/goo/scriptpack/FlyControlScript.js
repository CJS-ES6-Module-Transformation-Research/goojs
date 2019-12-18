var _Scripts = require("../scripts/Scripts");

var Scripts = _interopRequireWildcard(_Scripts);

var _WasdControlScript = require("../scriptpack/WasdControlScript");

var WasdControlScript = _interopRequireWildcard(_WasdControlScript);

var _MouseLookControlScript = require("../scriptpack/MouseLookControlScript");

var MouseLookControlScript = _interopRequireWildcard(_MouseLookControlScript);

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

function FlyControlScript() {
	var wasdScript = Scripts.create(WasdControlScript);
	var lookScript = Scripts.create(MouseLookControlScript);

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

var wasdParams = WasdControlScript.externals.parameters;
var mouseLookParams = MouseLookControlScript.externals.parameters;
var params = wasdParams.concat(mouseLookParams.slice(1));

functionObject_externals = {
	key: "FlyControlScript",
	name: "Fly Control",
	description: "This is a combo of the Wasd script and the MouseLook script",
	parameters: params
};

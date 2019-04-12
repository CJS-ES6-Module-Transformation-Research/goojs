Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = FlyControlScript;

var _Scripts = require("../scripts/Scripts");

var _Scripts2 = _interopRequireDefault(_Scripts);

var _WasdControlScript = require("../scriptpack/WasdControlScript");

var _WasdControlScript2 = _interopRequireDefault(_WasdControlScript);

var _MouseLookControlScript = require("../scriptpack/MouseLookControlScript");

var _MouseLookControlScript2 = _interopRequireDefault(_MouseLookControlScript);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function FlyControlScript() {
	var wasdScript = _Scripts2.default.create(_WasdControlScript2.default);
	var lookScript = _Scripts2.default.create(_MouseLookControlScript2.default);

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

var wasdParams = _WasdControlScript2.default.externals.parameters;
var mouseLookParams = _MouseLookControlScript2.default.externals.parameters;
var params = wasdParams.concat(mouseLookParams.slice(1));

FlyControlScript.externals = {
	key: 'FlyControlScript',
	name: 'Fly Control',
	description: 'This is a combo of the Wasd script and the MouseLook script',
	parameters: params
};
module.exports = exports.default;

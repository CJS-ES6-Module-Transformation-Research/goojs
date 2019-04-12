Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LogicNodeTime;

var _LogicLayer = require("./LogicLayer");

var _LogicLayer2 = _interopRequireDefault(_LogicLayer);

var _LogicNode = require("./LogicNode");

var _LogicNode2 = _interopRequireDefault(_LogicNode);

var _LogicInterface = require("./LogicInterface");

var _LogicInterface2 = _interopRequireDefault(_LogicInterface);

var _LogicNodes = require("./LogicNodes");

var _LogicNodes2 = _interopRequireDefault(_LogicNodes);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Logic node implementing a time counter. Processed every frame and time is increased. Output
 * can be read through the 'Time' port
 * @private
 */
function LogicNodeTime() {
	_LogicNode2.default.call(this);
	this.wantsProcessCall = true;
	this.logicInterface = LogicNodeTime.logicInterface;
	this.type = 'LogicNodeTime';
	this._time = 0;
	this._running = true;
}

// Logic interface set-up
LogicNodeTime.prototype = Object.create(_LogicNode2.default.prototype);

LogicNodeTime.editorName = 'Time';
LogicNodeTime.logicInterface = new _LogicInterface2.default();

// ports
LogicNodeTime.outPropTime = LogicNodeTime.logicInterface.addOutputProperty('Time', 'float');

// events
LogicNodeTime.outEventReached1 = LogicNodeTime.logicInterface.addOutputEvent('>1');
LogicNodeTime.inEventStart = LogicNodeTime.logicInterface.addInputEvent('Start');
LogicNodeTime.inEventStop = LogicNodeTime.logicInterface.addInputEvent('Stop');
LogicNodeTime.inEventReset = LogicNodeTime.logicInterface.addInputEvent('Reset');

LogicNodeTime.prototype.onConfigure = function () {
	this._time = 0;
	this._running = true;
};

// Process
LogicNodeTime.prototype.processLogic = function (tpf) {
	if (this._running) {
		var old = this._time;
		this._time += tpf;
		_LogicLayer2.default.writeValue(this.logicInstance, LogicNodeTime.outPropTime, this._time);

		if (old < 1 && this._time >= 1) {
			_LogicLayer2.default.fireEvent(this.logicInstance, LogicNodeTime.outEventReached1);
		}
	}
};

// should they have args too?
LogicNodeTime.prototype.onEvent = function (instDesc, event) {
	if (event === LogicNodeTime.inEventStart) {
		this._running = true;
	} else if (event === LogicNodeTime.inEventStop) {
		this._running = false;
	} else if (event === LogicNodeTime.inEventReset) {
		this._time = 0;
		_LogicLayer2.default.writeValue(this.logicInstance, LogicNodeTime.outPropTime, 0);
	}
};

_LogicNodes2.default.registerType('LogicNodeTime', LogicNodeTime);
module.exports = exports.default;

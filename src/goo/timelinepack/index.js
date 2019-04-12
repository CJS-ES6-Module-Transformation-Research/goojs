Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AbstractTimelineChannel = require("./AbstractTimelineChannel");

var _AbstractTimelineChannel2 = _interopRequireDefault(_AbstractTimelineChannel);

var _EventChannel = require("./EventChannel");

var _EventChannel2 = _interopRequireDefault(_EventChannel);

var _TimelineComponent = require("./TimelineComponent");

var _TimelineComponent2 = _interopRequireDefault(_TimelineComponent);

var _TimelineComponentHandler = require("./TimelineComponentHandler");

var _TimelineComponentHandler2 = _interopRequireDefault(_TimelineComponentHandler);

var _TimelineSystem = require("./TimelineSystem");

var _TimelineSystem2 = _interopRequireDefault(_TimelineSystem);

var _ValueChannel = require("./ValueChannel");

var _ValueChannel2 = _interopRequireDefault(_ValueChannel);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
	AbstractTimelineChannel: _AbstractTimelineChannel2.default,
	EventChannel: _EventChannel2.default,
	TimelineComponent: _TimelineComponent2.default,
	TimelineComponentHandler: _TimelineComponentHandler2.default,
	TimelineSystem: _TimelineSystem2.default,
	ValueChannel: _ValueChannel2.default
};
;
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
module.exports = exports.default;

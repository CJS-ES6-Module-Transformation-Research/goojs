var _StringUtils = require('../../../src/goo/util/StringUtils');

var StringUtils = _interopRequireWildcard(_StringUtils);

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

describe('StringUtils', function () {
	it('parses URLs', function () {
		var url = 'http://example.com:1234/images/goo.png?param=1#fragment';
		var parts = StringUtils.parseURL(url);
		expect(parts.scheme).toEqual('http');
		expect(parts.domain).toEqual('example.com');
		expect(parts.user_info).toBeFalsy();
		expect(parts.port).toEqual('1234');
		expect(parts.path).toEqual('/images/goo.png');
		expect(parts.query_data).toEqual('param=1');
		expect(parts.fragment).toEqual('fragment');
	});
});

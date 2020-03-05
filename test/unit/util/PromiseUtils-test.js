'use strict';

var _PromiseUtils = require('../../../src/goo/util/PromiseUtils');

describe('PromiseUtils', function () {
	describe('delay', function () {
		it('resolves asynchronously', function (done) {
			var resolved = false;
			_PromiseUtils.PromiseUtils.delay('asd', 200).then(function () {
				resolved = true;
				done();
			});

			expect(resolved).toBe(false);
		});
	});
});

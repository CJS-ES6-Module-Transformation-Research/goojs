import { delay as PromiseUtilsjs_delay } from "../../../src/goo/util/PromiseUtils";

describe('PromiseUtils', function () {
	describe('delay', function () {
		it('resolves asynchronously', function (done) {
			var resolved = false;
			PromiseUtilsjs_delay('asd', 200).then(function () {
				resolved = true;
				done();
			});

			expect(resolved).toBe(false);
		});
	});
});

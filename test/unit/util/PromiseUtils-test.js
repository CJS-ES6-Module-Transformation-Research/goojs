import { PromiseUtils as srcgooutilPromiseUtils_PromiseUtilsjs } from "../../../src/goo/util/PromiseUtils";

describe('PromiseUtils', function () {
	describe('delay', function () {
		it('resolves asynchronously', function (done) {
			var resolved = false;
			srcgooutilPromiseUtils_PromiseUtilsjs.delay('asd', 200).then(function () {
				resolved = true;
				done();
			});

			expect(resolved).toBe(false);
		});
	});
});

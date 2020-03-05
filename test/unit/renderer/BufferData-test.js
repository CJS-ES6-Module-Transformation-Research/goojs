import { CustomMatchers as CustomMatchers_CustomMatchersjs } from "../../../test/unit/CustomMatchers";
import { BufferData as BufferData_BufferDatajs } from "../../../src/goo/renderer/BufferData";

describe('BufferData', function () {
	beforeEach(function () {
		jasmine.addMatchers(CustomMatchers_CustomMatchersjs);
	});

	describe('copy', function () {
		it('can copy everything from another plane', function () {
			var original = new BufferData_BufferDatajs(new Uint8Array([11, 22, 33]), 'ArrayBuffer');
			var copy = new BufferData_BufferDatajs(new Uint8Array([44, 55, 66]), 'ElementArrayBuffer');
			copy.copy(original);

			expect(copy).toBeCloned(original);
		});
	});

	describe('clone', function () {
		it('can clone a plane', function () {
			var original = new BufferData_BufferDatajs(new Uint8Array([11, 22, 33]), 'ArrayBuffer');
			var clone = original.clone();

			expect(clone).toBeCloned(original);
		});
	});
});

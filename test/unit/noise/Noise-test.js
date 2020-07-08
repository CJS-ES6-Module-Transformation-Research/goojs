import { fractal2d as Noisejs_fractal2d } from "../../../src/goo/noise/Noise";
import { ValueNoise as srcgoonoiseValueNoise_ValueNoisejs } from "../../../src/goo/noise/ValueNoise";

describe('Noise.fractal2d', function () {
	it('Contains correctly generated values', function () {
		var N = 2;
		var noiseValues = [0x00, 0x10, 0x0B, 0x12];

		for (var y = 0; y < N; y++) {
			for (var x = 0; x < N; x++) {
				var offset = (y * N + x);
				var value = Math.floor(Noisejs_fractal2d(x, y, 256.0, 16, 0.75, 2.0, srcgoonoiseValueNoise_ValueNoisejs) * 255.0);

				expect(value).toEqual(noiseValues[offset]);
			}
		}
	});
});

"use strict";

var _ValueChannel = require("../../../src/goo/timelinepack/ValueChannel");

var _TransformComponent = require("../../../src/goo/entities/components/TransformComponent");

var _MathUtils = require("../../../src/goo/math/MathUtils");

var _Matrix = require("../../../src/goo/math/Matrix3");

var _Entity = require("../../../src/goo/entities/Entity");

var _CustomMatchers = require("../../../test/unit/CustomMatchers");

describe('ValueChannel', function () {
	var channel;
	beforeEach(function () {
		channel = new _ValueChannel.ValueChannel();
		jasmine.addMatchers(_CustomMatchers.CustomMatchers);
	});

	describe('addKeyframe', function () {
		it('can insert an entry in a 0 entry channel', function () {
			channel.addKeyframe('', 10);

			expect(channel.keyframes.length).toEqual(1);
			expect(channel.keyframes[0].time).toEqual(10);
		});

		it('can insert an entry before any other entry', function () {
			// setup
			channel.addKeyframe('', 100).addKeyframe('', 200).addKeyframe('', 300).addKeyframe('', 400);

			// inserting an entry before any existing entries
			channel.addKeyframe('', 10);

			expect(channel.keyframes.length).toEqual(5);
			expect(channel.keyframes[0].time).toEqual(10);
		});

		it('can insert an entry after any other entry', function () {
			// setup
			channel.addKeyframe('', 100).addKeyframe('', 200).addKeyframe('', 300).addKeyframe('', 400);

			// inserting an entry before any existing entries
			channel.addKeyframe('', 500);

			expect(channel.keyframes.length).toEqual(5);
			expect(channel.keyframes[4].time).toEqual(500);
		});

		it('can insert an entry and maintain the set of entries sorted', function () {
			// setup
			channel.addKeyframe('', 100).addKeyframe('', 200).addKeyframe('', 300).addKeyframe('', 400);

			// inserting an entry before any existing entries
			channel.addKeyframe('', 250);

			expect(channel.keyframes.length).toEqual(5);
			expect(channel.keyframes[2].time).toEqual(250);
		});
	});

	describe('update', function () {
		it('calls the update callback with the correct value when updating before all keyframes', function () {
			var data0 = 0;
			channel.callbackUpdate = function (time, value) {
				data0 = value;
			};

			channel.addKeyframe('', 100, 1, function (progress) {
				return progress;
			}).addKeyframe('', 200, 2, function () {});

			channel.update(50);
			expect(data0).toEqual(1);
		});

		it('calls the update callback with the correct value when updating between 2 keyframes', function () {
			var data0 = 0;
			channel.callbackUpdate = function (time, value) {
				data0 = value;
			};

			channel.addKeyframe('', 100, 1, function (progress) {
				return progress;
			}).addKeyframe('', 200, 2, function () {});

			channel.update(150);
			expect(data0).toEqual(1.5);
		});

		it('calls the update callback with the correct value when updating after all keyframes', function () {
			var data0 = 0;
			channel.callbackUpdate = function (time, value) {
				data0 = value;
			};

			channel.addKeyframe('', 100, 1, function (progress) {
				return progress;
			}).addKeyframe('', 200, 2, function () {});

			channel.update(250);
			expect(data0).toEqual(2);
		});

		it('does nothing when called on a disabled channel', function () {
			var data0 = 0;
			channel.callbackUpdate = function (time, value) {
				data0 = value;
			};

			channel.enabled = false;

			channel.addKeyframe('', 100, 1, function (progress) {
				return progress;
			}).addKeyframe('', 200, 2, function () {});

			channel.update(150);
			expect(data0).toEqual(0);
		});

		it('does nothing when called on an empty channel', function () {
			var data0 = 0;
			channel.callbackUpdate = function (time, value) {
				data0 = value;
			};

			channel.update(150);
			expect(data0).toEqual(0);
		});
	});
});

describe('tweener factories', function () {
	var entity;
	var resolver = function resolver() {
		return entity;
	};
	beforeEach(function () {
		entity = new _Entity.Entity();
		entity.setComponent(new _TransformComponent.TransformComponent());
		jasmine.addMatchers(_CustomMatchers.CustomMatchers);
	});

	describe('getSimpleTransformTweener', function () {
		it('gets a translation tweener that alters the translation of the resolved entity', function () {
			var tweener = _ValueChannel.ValueChannel.getSimpleTransformTweener('translation', 'y', '', resolver);
			tweener(0, 123);
			expect(entity.transformComponent.transform.translation.y).toEqual(123);
		});

		it('gets a scale tweener that alters the scale of the resolved entity', function () {
			var tweener = _ValueChannel.ValueChannel.getSimpleTransformTweener('scale', 'z', '', resolver);
			tweener(0, 123);
			expect(entity.transformComponent.transform.scale.z).toEqual(123);
		});
	});

	describe('getRotationTweener', function () {
		it('gets a rotation tweener that alters the rotation of the resolved entity', function () {
			var tweener = _ValueChannel.ValueChannel.getRotationTweener(0, '', resolver, [0, 0, 0]);
			tweener(0, 123 * _MathUtils.RAD_TO_DEG);
			var expectedRotation = new _Matrix.Matrix3().fromAngles(123, 0, 0);
			expect(entity.transformComponent.transform.rotation).toBeCloseToMatrix(expectedRotation);
		});
	});
});
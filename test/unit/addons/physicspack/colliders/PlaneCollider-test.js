"use strict";

var _PlaneCollider = require("../../../../../src/goo/addons/physicspack/colliders/PlaneCollider");

var _Transform = require("../../../../../src/goo/math/Transform");

describe('PlaneCollider', function () {
				it('can clone', function () {
								var collider = new _PlaneCollider.PlaneCollider();
								var clone = collider.clone();
								expect(collider).toEqual(clone);
				});

				it('can transform', function () {
								var collider = new _PlaneCollider.PlaneCollider();
								var collider2 = new _PlaneCollider.PlaneCollider();
								var transform = new _Transform.Transform();
								collider.transform(transform, collider2);
								expect(collider).toEqual(collider2);
				});
});
import { CylinderCollider as CylinderCollider_CylinderColliderjs } from "../../../../../src/goo/addons/physicspack/colliders/CylinderCollider";
import { Transform as Transform_Transformjs } from "../../../../../src/goo/math/Transform";
describe('CylinderCollider', function () {

	var CylinderCollider = CylinderCollider_CylinderColliderjs;
	var Transform = Transform_Transformjs;

	it('can clone', function () {
		var collider = new CylinderCollider_CylinderColliderjs({
			radius: 123,
			height: 456
		});
		var clone = collider.clone();
		expect(collider).toEqual(clone);
	});

	it('can transform', function () {
		var collider = new CylinderCollider_CylinderColliderjs({
			radius: 2,
			height: 3
		});
		var transform = new Transform_Transformjs();
		transform.scale.setDirect(1, 2, 3);
		collider.transform(transform, collider);
		expect(collider.radius).toEqual(4);
		expect(collider.height).toEqual(9);
	});
});

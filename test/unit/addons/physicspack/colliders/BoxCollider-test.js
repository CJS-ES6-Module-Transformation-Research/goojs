import { BoxCollider as BoxCollider_BoxColliderjs } from "../../../../../src/goo/addons/physicspack/colliders/BoxCollider";
import { Vector3 as Vector3_Vector3js } from "../../../../../src/goo/math/Vector3";
import { Transform as Transform_Transformjs } from "../../../../../src/goo/math/Transform";
describe('BoxCollider', function () {

	var BoxCollider = BoxCollider_BoxColliderjs;
	var Vector3 = Vector3_Vector3js;
	var Transform = Transform_Transformjs;

	it('can clone', function () {
		var collider = new BoxCollider_BoxColliderjs({
			halfExtents: new Vector3_Vector3js(1, 2, 3)
		});
		var clone = collider.clone();
		expect(collider).toEqual(clone);
	});

	it('can transform', function () {
		var collider = new BoxCollider_BoxColliderjs({
			halfExtents: new Vector3_Vector3js(1, 2, 3)
		});
		var transform = new Transform_Transformjs();
		transform.scale.setDirect(1, 2, 3);
		collider.transform(transform, collider);
		expect(collider.halfExtents).toEqual(new Vector3_Vector3js(1, 4, 9));
	});
});
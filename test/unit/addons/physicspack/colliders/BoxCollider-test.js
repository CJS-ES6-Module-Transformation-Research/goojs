import { BoxCollider as BoxColliderjs } from "../../../../../src/goo/addons/physicspack/colliders/BoxCollider";
import { Vector3 as Vector3js } from "../../../../../src/goo/math/Vector3";
import { Transform as Transformjs } from "../../../../../src/goo/math/Transform";
describe('BoxCollider', function () {

	var BoxCollider = BoxColliderjs;
	var Vector3 = Vector3js;
	var Transform = Transformjs;

	it('can clone', function () {
		var collider = new BoxColliderjs({
			halfExtents: new Vector3js(1, 2, 3)
		});
		var clone = collider.clone();
		expect(collider).toEqual(clone);
	});

	it('can transform', function () {
		var collider = new BoxColliderjs({
			halfExtents: new Vector3js(1, 2, 3)
		});
		var transform = new Transformjs();
		transform.scale.setDirect(1, 2, 3);
		collider.transform(transform, collider);
		expect(collider.halfExtents).toEqual(new Vector3js(1, 4, 9));
	});
});
import { BoxCollider } from "./colliders/BoxCollider";
import { Collider } from "./colliders/Collider";
import { CylinderCollider } from "./colliders/CylinderCollider";
import { MeshCollider } from "./colliders/MeshCollider";
import { PlaneCollider } from "./colliders/PlaneCollider";
import { SphereCollider } from "./colliders/SphereCollider";
import { AbstractColliderComponent } from "./components/AbstractColliderComponent";
import { AbstractRigidBodyComponent } from "./components/AbstractRigidBodyComponent";
import { ColliderComponent } from "./components/ColliderComponent";
import { RigidBodyComponent } from "./components/RigidBodyComponent";
import { ColliderComponentHandler } from "./handlers/ColliderComponentHandler";
import { RigidBodyComponentHandler } from "./handlers/RigidBodyComponentHandler";
import { BallJoint } from "./joints/BallJoint";
import { HingeJoint } from "./joints/HingeJoint";
import { PhysicsJoint } from "./joints/PhysicsJoint";
import { PhysicsMaterial } from "./PhysicsMaterial";
import { RaycastResult } from "./RaycastResult";
import { PhysicsBoxDebugShape } from "./shapes/PhysicsBoxDebugShape";
import { PhysicsCylinderDebugShape } from "./shapes/PhysicsCylinderDebugShape";
import { PhysicsPlaneDebugShape } from "./shapes/PhysicsPlaneDebugShape";
import { PhysicsSphereDebugShape } from "./shapes/PhysicsSphereDebugShape";
import { AbstractPhysicsSystem } from "./systems/AbstractPhysicsSystem";
import { ColliderSystem } from "./systems/ColliderSystem";
import { PhysicsDebugRenderSystem } from "./systems/PhysicsDebugRenderSystem";
import { PhysicsSystem } from "./systems/PhysicsSystem";
import { Pool } from "./util/Pool";
module.exports = {
	BoxCollider: BoxCollider,
	Collider: Collider,
	CylinderCollider: CylinderCollider,
	MeshCollider: MeshCollider,
	PlaneCollider: PlaneCollider,
	SphereCollider: SphereCollider,
	AbstractColliderComponent: AbstractColliderComponent,
	AbstractRigidBodyComponent: AbstractRigidBodyComponent,
	ColliderComponent: ColliderComponent,
	RigidBodyComponent: RigidBodyComponent,
	ColliderComponentHandler: ColliderComponentHandler,
	RigidBodyComponentHandler: RigidBodyComponentHandler,
	BallJoint: BallJoint,
	HingeJoint: HingeJoint,
	PhysicsJoint: PhysicsJoint,
	PhysicsMaterial: PhysicsMaterial,
	RaycastResult: RaycastResult,
	PhysicsBoxDebugShape: PhysicsBoxDebugShape,
	PhysicsCylinderDebugShape: PhysicsCylinderDebugShape,
	PhysicsPlaneDebugShape: PhysicsPlaneDebugShape,
	PhysicsSphereDebugShape: PhysicsSphereDebugShape,
	AbstractPhysicsSystem: AbstractPhysicsSystem,
	ColliderSystem: ColliderSystem,
	PhysicsDebugRenderSystem: PhysicsDebugRenderSystem,
	PhysicsSystem: PhysicsSystem,
	Pool: Pool
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
import collidersBoxCollider_moduleDefault from "./colliders/BoxCollider";
import collidersCollider_moduleDefault from "./colliders/Collider";
import collidersCylinderCollider_moduleDefault from "./colliders/CylinderCollider";
import collidersMeshCollider_moduleDefault from "./colliders/MeshCollider";
import collidersPlaneCollider_moduleDefault from "./colliders/PlaneCollider";
import collidersSphereCollider_moduleDefault from "./colliders/SphereCollider";
import componentsAbstractColliderComponent_moduleDefault from "./components/AbstractColliderComponent";
import componentsAbstractRigidBodyComponent_moduleDefault from "./components/AbstractRigidBodyComponent";
import componentsColliderComponent_moduleDefault from "./components/ColliderComponent";
import componentsRigidBodyComponent_moduleDefault from "./components/RigidBodyComponent";
import handlersColliderComponentHandler_moduleDefault from "./handlers/ColliderComponentHandler";
import handlersRigidBodyComponentHandler_moduleDefault from "./handlers/RigidBodyComponentHandler";
import jointsBallJoint_moduleDefault from "./joints/BallJoint";
import jointsHingeJoint_moduleDefault from "./joints/HingeJoint";
import jointsPhysicsJoint_moduleDefault from "./joints/PhysicsJoint";
import PhysicsMaterial_moduleDefault from "./PhysicsMaterial";
import RaycastResult_moduleDefault from "./RaycastResult";
import shapesPhysicsBoxDebugShape_moduleDefault from "./shapes/PhysicsBoxDebugShape";
import shapesPhysicsCylinderDebugShape_moduleDefault from "./shapes/PhysicsCylinderDebugShape";
import shapesPhysicsPlaneDebugShape_moduleDefault from "./shapes/PhysicsPlaneDebugShape";
import shapesPhysicsSphereDebugShape_moduleDefault from "./shapes/PhysicsSphereDebugShape";
import systemsAbstractPhysicsSystem_moduleDefault from "./systems/AbstractPhysicsSystem";
import systemsColliderSystem_moduleDefault from "./systems/ColliderSystem";
import systemsPhysicsDebugRenderSystem_moduleDefault from "./systems/PhysicsDebugRenderSystem";
import systemsPhysicsSystem_moduleDefault from "./systems/PhysicsSystem";
import utilPool_moduleDefault from "./util/Pool";
export default {
	BoxCollider: collidersBoxCollider_moduleDefault,
	Collider: collidersCollider_moduleDefault,
	CylinderCollider: collidersCylinderCollider_moduleDefault,
	MeshCollider: collidersMeshCollider_moduleDefault,
	PlaneCollider: collidersPlaneCollider_moduleDefault,
	SphereCollider: collidersSphereCollider_moduleDefault,
	AbstractColliderComponent: componentsAbstractColliderComponent_moduleDefault,
	AbstractRigidBodyComponent: componentsAbstractRigidBodyComponent_moduleDefault,
	ColliderComponent: componentsColliderComponent_moduleDefault,
	RigidBodyComponent: componentsRigidBodyComponent_moduleDefault,
	ColliderComponentHandler: handlersColliderComponentHandler_moduleDefault,
	RigidBodyComponentHandler: handlersRigidBodyComponentHandler_moduleDefault,
	BallJoint: jointsBallJoint_moduleDefault,
	HingeJoint: jointsHingeJoint_moduleDefault,
	PhysicsJoint: jointsPhysicsJoint_moduleDefault,
	PhysicsMaterial: PhysicsMaterial_moduleDefault,
	RaycastResult: RaycastResult_moduleDefault,
	PhysicsBoxDebugShape: shapesPhysicsBoxDebugShape_moduleDefault,
	PhysicsCylinderDebugShape: shapesPhysicsCylinderDebugShape_moduleDefault,
	PhysicsPlaneDebugShape: shapesPhysicsPlaneDebugShape_moduleDefault,
	PhysicsSphereDebugShape: shapesPhysicsSphereDebugShape_moduleDefault,
	AbstractPhysicsSystem: systemsAbstractPhysicsSystem_moduleDefault,
	ColliderSystem: systemsColliderSystem_moduleDefault,
	PhysicsDebugRenderSystem: systemsPhysicsDebugRenderSystem_moduleDefault,
	PhysicsSystem: systemsPhysicsSystem_moduleDefault,
	Pool: utilPool_moduleDefault
};;

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
import { BoxColliderjs as collidersBoxCollider_BoxColliderjs } from "./colliders/BoxCollider";
import { Colliderjs as collidersCollider_Colliderjs } from "./colliders/Collider";
import { CylinderColliderjs as collidersCylinderCollider_CylinderColliderjs } from "./colliders/CylinderCollider";
import { MeshColliderjs as collidersMeshCollider_MeshColliderjs } from "./colliders/MeshCollider";
import { PlaneColliderjs as collidersPlaneCollider_PlaneColliderjs } from "./colliders/PlaneCollider";
import { SphereColliderjs as collidersSphereCollider_SphereColliderjs } from "./colliders/SphereCollider";
import {     AbstractColliderComponentjs as componentsAbstractColliderComponent_AbstractColliderComponentjs, } from "./components/AbstractColliderComponent";
import {     AbstractRigidBodyComponentjs as componentsAbstractRigidBodyComponent_AbstractRigidBodyComponentjs, } from "./components/AbstractRigidBodyComponent";
import { ColliderComponentjs as componentsColliderComponent_ColliderComponentjs } from "./components/ColliderComponent";
import { RigidBodyComponentjs as componentsRigidBodyComponent_RigidBodyComponentjs } from "./components/RigidBodyComponent";
import {     ColliderComponentHandlerjs as handlersColliderComponentHandler_ColliderComponentHandlerjs, } from "./handlers/ColliderComponentHandler";
import {     RigidBodyComponentHandlerjs as handlersRigidBodyComponentHandler_RigidBodyComponentHandlerjs, } from "./handlers/RigidBodyComponentHandler";
import { BallJointjs as jointsBallJoint_BallJointjs } from "./joints/BallJoint";
import { HingeJointjs as jointsHingeJoint_HingeJointjs } from "./joints/HingeJoint";
import { PhysicsJointjs as jointsPhysicsJoint_PhysicsJointjs } from "./joints/PhysicsJoint";
import { PhysicsMaterialjs as PhysicsMaterial_PhysicsMaterialjs } from "./PhysicsMaterial";
import { RaycastResultjs as RaycastResult_RaycastResultjs } from "./RaycastResult";
import {     PhysicsBoxDebugShapejs as shapesPhysicsBoxDebugShape_PhysicsBoxDebugShapejs, } from "./shapes/PhysicsBoxDebugShape";
import {     PhysicsCylinderDebugShapejs as shapesPhysicsCylinderDebugShape_PhysicsCylinderDebugShapejs, } from "./shapes/PhysicsCylinderDebugShape";
import {     PhysicsPlaneDebugShapejs as shapesPhysicsPlaneDebugShape_PhysicsPlaneDebugShapejs, } from "./shapes/PhysicsPlaneDebugShape";
import {     PhysicsSphereDebugShapejs as shapesPhysicsSphereDebugShape_PhysicsSphereDebugShapejs, } from "./shapes/PhysicsSphereDebugShape";
import {     AbstractPhysicsSystemjs as systemsAbstractPhysicsSystem_AbstractPhysicsSystemjs, } from "./systems/AbstractPhysicsSystem";
import { ColliderSystemjs as systemsColliderSystem_ColliderSystemjs } from "./systems/ColliderSystem";
import {     PhysicsDebugRenderSystemjs as systemsPhysicsDebugRenderSystem_PhysicsDebugRenderSystemjs, } from "./systems/PhysicsDebugRenderSystem";
import { PhysicsSystemjs as systemsPhysicsSystem_PhysicsSystemjs } from "./systems/PhysicsSystem";
import { Pooljs as utilPool_Pooljs } from "./util/Pool";
var indexjs;
indexjs = {
	BoxCollider: collidersBoxCollider_BoxColliderjs,
	Collider: collidersCollider_Colliderjs,
	CylinderCollider: collidersCylinderCollider_CylinderColliderjs,
	MeshCollider: collidersMeshCollider_MeshColliderjs,
	PlaneCollider: collidersPlaneCollider_PlaneColliderjs,
	SphereCollider: collidersSphereCollider_SphereColliderjs,
	AbstractColliderComponent: componentsAbstractColliderComponent_AbstractColliderComponentjs,
	AbstractRigidBodyComponent: componentsAbstractRigidBodyComponent_AbstractRigidBodyComponentjs,
	ColliderComponent: componentsColliderComponent_ColliderComponentjs,
	RigidBodyComponent: componentsRigidBodyComponent_RigidBodyComponentjs,
	ColliderComponentHandler: handlersColliderComponentHandler_ColliderComponentHandlerjs,
	RigidBodyComponentHandler: handlersRigidBodyComponentHandler_RigidBodyComponentHandlerjs,
	BallJoint: jointsBallJoint_BallJointjs,
	HingeJoint: jointsHingeJoint_HingeJointjs,
	PhysicsJoint: jointsPhysicsJoint_PhysicsJointjs,
	PhysicsMaterial: PhysicsMaterial_PhysicsMaterialjs,
	RaycastResult: RaycastResult_RaycastResultjs,
	PhysicsBoxDebugShape: shapesPhysicsBoxDebugShape_PhysicsBoxDebugShapejs,
	PhysicsCylinderDebugShape: shapesPhysicsCylinderDebugShape_PhysicsCylinderDebugShapejs,
	PhysicsPlaneDebugShape: shapesPhysicsPlaneDebugShape_PhysicsPlaneDebugShapejs,
	PhysicsSphereDebugShape: shapesPhysicsSphereDebugShape_PhysicsSphereDebugShapejs,
	AbstractPhysicsSystem: systemsAbstractPhysicsSystem_AbstractPhysicsSystemjs,
	ColliderSystem: systemsColliderSystem_ColliderSystemjs,
	PhysicsDebugRenderSystem: systemsPhysicsDebugRenderSystem_PhysicsDebugRenderSystemjs,
	PhysicsSystem: systemsPhysicsSystem_PhysicsSystemjs,
	Pool: utilPool_Pooljs
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
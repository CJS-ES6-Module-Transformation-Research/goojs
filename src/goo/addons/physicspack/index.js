import { BoxCollider as collidersBoxCollider_BoxCollider } from "./colliders/BoxCollider";
import { Collider as collidersCollider_Collider } from "./colliders/Collider";
import { CylinderCollider as collidersCylinderCollider_CylinderCollider } from "./colliders/CylinderCollider";
import { MeshCollider as collidersMeshCollider_MeshCollider } from "./colliders/MeshCollider";
import { PlaneCollider as collidersPlaneCollider_PlaneCollider } from "./colliders/PlaneCollider";
import { SphereCollider as collidersSphereCollider_SphereCollider } from "./colliders/SphereCollider";
import {     AbstractColliderComponent as componentsAbstractColliderComponent_AbstractColliderComponent, } from "./components/AbstractColliderComponent";
import {     AbstractRigidBodyComponent as componentsAbstractRigidBodyComponent_AbstractRigidBodyComponent, } from "./components/AbstractRigidBodyComponent";
import { ColliderComponent as componentsColliderComponent_ColliderComponent } from "./components/ColliderComponent";
import { RigidBodyComponent as componentsRigidBodyComponent_RigidBodyComponent } from "./components/RigidBodyComponent";
import {     ColliderComponentHandler as handlersColliderComponentHandler_ColliderComponentHandler, } from "./handlers/ColliderComponentHandler";
import {     RigidBodyComponentHandler as handlersRigidBodyComponentHandler_RigidBodyComponentHandler, } from "./handlers/RigidBodyComponentHandler";
import { BallJoint as jointsBallJoint_BallJoint } from "./joints/BallJoint";
import { HingeJoint as jointsHingeJoint_HingeJoint } from "./joints/HingeJoint";
import { PhysicsJoint as jointsPhysicsJoint_PhysicsJoint } from "./joints/PhysicsJoint";
import { PhysicsMaterial as PhysicsMaterial_PhysicsMaterial } from "./PhysicsMaterial";
import { RaycastResult as RaycastResult_RaycastResult } from "./RaycastResult";
import { PhysicsBoxDebugShape as shapesPhysicsBoxDebugShape_PhysicsBoxDebugShape } from "./shapes/PhysicsBoxDebugShape";
import {     PhysicsCylinderDebugShape as shapesPhysicsCylinderDebugShape_PhysicsCylinderDebugShape, } from "./shapes/PhysicsCylinderDebugShape";
import {     PhysicsPlaneDebugShape as shapesPhysicsPlaneDebugShape_PhysicsPlaneDebugShape, } from "./shapes/PhysicsPlaneDebugShape";
import {     PhysicsSphereDebugShape as shapesPhysicsSphereDebugShape_PhysicsSphereDebugShape, } from "./shapes/PhysicsSphereDebugShape";
import {     AbstractPhysicsSystem as systemsAbstractPhysicsSystem_AbstractPhysicsSystem, } from "./systems/AbstractPhysicsSystem";
import { ColliderSystem as systemsColliderSystem_ColliderSystem } from "./systems/ColliderSystem";
import {     PhysicsDebugRenderSystem as systemsPhysicsDebugRenderSystem_PhysicsDebugRenderSystem, } from "./systems/PhysicsDebugRenderSystem";
import { PhysicsSystem as systemsPhysicsSystem_PhysicsSystem } from "./systems/PhysicsSystem";
import { Pool as utilPool_Pool } from "./util/Pool";
var indexjs;
indexjs = {
	BoxCollider: collidersBoxCollider_BoxCollider,
	Collider: collidersCollider_Collider,
	CylinderCollider: collidersCylinderCollider_CylinderCollider,
	MeshCollider: collidersMeshCollider_MeshCollider,
	PlaneCollider: collidersPlaneCollider_PlaneCollider,
	SphereCollider: collidersSphereCollider_SphereCollider,
	AbstractColliderComponent: componentsAbstractColliderComponent_AbstractColliderComponent,
	AbstractRigidBodyComponent: componentsAbstractRigidBodyComponent_AbstractRigidBodyComponent,
	ColliderComponent: componentsColliderComponent_ColliderComponent,
	RigidBodyComponent: componentsRigidBodyComponent_RigidBodyComponent,
	ColliderComponentHandler: handlersColliderComponentHandler_ColliderComponentHandler,
	RigidBodyComponentHandler: handlersRigidBodyComponentHandler_RigidBodyComponentHandler,
	BallJoint: jointsBallJoint_BallJoint,
	HingeJoint: jointsHingeJoint_HingeJoint,
	PhysicsJoint: jointsPhysicsJoint_PhysicsJoint,
	PhysicsMaterial: PhysicsMaterial_PhysicsMaterial,
	RaycastResult: RaycastResult_RaycastResult,
	PhysicsBoxDebugShape: shapesPhysicsBoxDebugShape_PhysicsBoxDebugShape,
	PhysicsCylinderDebugShape: shapesPhysicsCylinderDebugShape_PhysicsCylinderDebugShape,
	PhysicsPlaneDebugShape: shapesPhysicsPlaneDebugShape_PhysicsPlaneDebugShape,
	PhysicsSphereDebugShape: shapesPhysicsSphereDebugShape_PhysicsSphereDebugShape,
	AbstractPhysicsSystem: systemsAbstractPhysicsSystem_AbstractPhysicsSystem,
	ColliderSystem: systemsColliderSystem_ColliderSystem,
	PhysicsDebugRenderSystem: systemsPhysicsDebugRenderSystem_PhysicsDebugRenderSystem,
	PhysicsSystem: systemsPhysicsSystem_PhysicsSystem,
	Pool: utilPool_Pool
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
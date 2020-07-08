import * as srcgooutilAjax_Ajax from "./src/goo/util/Ajax";
import { ArrayUtils as srcgooutilArrayUtil_ArrayUtils } from "./src/goo/util/ArrayUtil";
import * as srcgooutilArrayUtils_ArrayUtils from "./src/goo/util/ArrayUtils";
import { AtlasNode as srcgooutilcombineAtlasNode_AtlasNode } from "./src/goo/util/combine/AtlasNode";
import { AudioContextjs as srcgoosoundAudioContext_AudioContextjs } from "./src/goo/sound/AudioContext";
import { BoundingBox as srcgoorendererboundsBoundingBox_BoundingBox } from "./src/goo/renderer/bounds/BoundingBox";
import * as srcgoorendererboundsBoundingPicker_BoundingPicker from "./src/goo/renderer/bounds/BoundingPicker";
import { BoundingSphere as srcgoorendererboundsBoundingSphere_BoundingSphere } from "./src/goo/renderer/bounds/BoundingSphere";
import * as srcgoopickingBoundingTree_BoundingTree from "./src/goo/picking/BoundingTree";
import {     BoundingUpdateSystem as srcgooentitiessystemsBoundingUpdateSystem_BoundingUpdateSystem, } from "./src/goo/entities/systems/BoundingUpdateSystem";
import * as srcgoorendererboundsBoundingVolume_BoundingVolume from "./src/goo/renderer/bounds/BoundingVolume";
import { Box as srcgooshapesBox_Box } from "./src/goo/shapes/Box";
import { BufferData as srcgoorendererBufferData_BufferData } from "./src/goo/renderer/BufferData";
import * as srcgoorendererBufferUtils_BufferUtils from "./src/goo/renderer/BufferUtils";
import { Bus as srcgooentitiesBus_Bus } from "./src/goo/entities/Bus";
import { Camera as srcgoorendererCamera_Camera } from "./src/goo/renderer/Camera";
import { CameraComponent as srcgooentitiescomponentsCameraComponent_CameraComponent } from "./src/goo/entities/components/CameraComponent";
import {     CameraComponentHandler as srcgooloadershandlersCameraComponentHandler_CameraComponentHandler, } from "./src/goo/loaders/handlers/CameraComponentHandler";
import { CameraSystem as srcgooentitiessystemsCameraSystem_CameraSystem } from "./src/goo/entities/systems/CameraSystem";
import * as srcgooutilCanvasUtils_CanvasUtils from "./src/goo/util/CanvasUtils";
import { Capabilities as srcgoorendererCapabilities_Capabilities } from "./src/goo/renderer/Capabilities";
import { Component as srcgooentitiescomponentsComponent_Component } from "./src/goo/entities/components/Component";
import * as srcgooloadershandlersComponentHandler_ComponentHandler from "./src/goo/loaders/handlers/ComponentHandler";
import { Composer as srcgoorendererpassComposer_Composer } from "./src/goo/renderer/pass/Composer";
import { Cone as srcgooshapesCone_Cone } from "./src/goo/shapes/Cone";
import * as srcgooloadershandlersConfigHandler_ConfigHandler from "./src/goo/loaders/handlers/ConfigHandler";
import { CrunchLoader as srcgooloaderscrunchCrunchLoader_CrunchLoader } from "./src/goo/loaders/crunch/CrunchLoader";
import {     CssTransformComponent as srcgooentitiescomponentsCssTransformComponent_CssTransformComponent, } from "./src/goo/entities/components/CssTransformComponent";
import {     CssTransformSystem as srcgooentitiessystemsCssTransformSystem_CssTransformSystem, } from "./src/goo/entities/systems/CssTransformSystem";
import { Cylinder as srcgooshapesCylinder_Cylinder } from "./src/goo/shapes/Cylinder";
import { DdsLoader as srcgooloadersddsDdsLoader_DdsLoader } from "./src/goo/loaders/dds/DdsLoader";
import * as srcgooloadersddsDdsUtils_DdsUtils from "./src/goo/loaders/dds/DdsUtils";
import { DirectionalLight as srcgoorendererlightDirectionalLight_DirectionalLight } from "./src/goo/renderer/light/DirectionalLight";
import { Disk as srcgooshapesDisk_Disk } from "./src/goo/shapes/Disk";
import { Dom3dComponent as srcgooentitiescomponentsDom3dComponent_Dom3dComponent } from "./src/goo/entities/components/Dom3dComponent";
import {     Dom3dComponentHandler as srcgooloadershandlersDom3dComponentHandler_Dom3dComponentHandler, } from "./src/goo/loaders/handlers/Dom3dComponentHandler";
import { Dom3dSystem as srcgooentitiessystemsDom3dSystem_Dom3dSystem } from "./src/goo/entities/systems/Dom3dSystem";
import * as srcgooloadersDynamicLoader_DynamicLoader from "./src/goo/loaders/DynamicLoader";
import * as srcgooutilEasing_Easing from "./src/goo/util/Easing";
import { Entity as srcgooentitiesEntity_Entity } from "./src/goo/entities/Entity";
import { EntityCombiner as srcgooutilcombineEntityCombiner_EntityCombiner } from "./src/goo/util/combine/EntityCombiner";
import { EntityHandler as srcgooloadershandlersEntityHandler_EntityHandler } from "./src/goo/loaders/handlers/EntityHandler";
import * as srcgooentitiesmanagersEntityManager_EntityManager from "./src/goo/entities/managers/EntityManager";
import { EntitySelection as srcgooentitiesEntitySelection_EntitySelection } from "./src/goo/entities/EntitySelection";
import * as srcgooentitiesEntityUtils_EntityUtils from "./src/goo/entities/EntityUtils";
import {     EnvironmentHandler as srcgooloadershandlersEnvironmentHandler_EnvironmentHandler, } from "./src/goo/loaders/handlers/EnvironmentHandler";
import { EventTarget as srcgooutilEventTarget_EventTarget } from "./src/goo/util/EventTarget";
import { FullscreenPass as srcgoorendererpassFullscreenPass_FullscreenPass } from "./src/goo/renderer/pass/FullscreenPass";
import { FullscreenUtils as srcgoorendererpassFullscreenUtil_FullscreenUtils } from "./src/goo/renderer/pass/FullscreenUtil";
import * as srcgoorendererpassFullscreenUtils_FullscreenUtils from "./src/goo/renderer/pass/FullscreenUtils";
import * as srcgooutilGameUtils_GameUtils from "./src/goo/util/GameUtils";
import { GooRunner as srcgooentitiesGooRunner_GooRunner } from "./src/goo/entities/GooRunner";
import { Grid as srcgooshapesGrid_Grid } from "./src/goo/shapes/Grid";
import { GridRenderSystem as srcgooentitiessystemsGridRenderSystem_GridRenderSystem } from "./src/goo/entities/systems/GridRenderSystem";
import { HtmlComponent as srcgooentitiescomponentsHtmlComponent_HtmlComponent } from "./src/goo/entities/components/HtmlComponent";
import {     HtmlComponentHandler as srcgooloadershandlersHtmlComponentHandler_HtmlComponentHandler, } from "./src/goo/loaders/handlers/HtmlComponentHandler";
import { HtmlSystem as srcgooentitiessystemsHtmlSystem_HtmlSystem } from "./src/goo/entities/systems/HtmlSystem";
import { JsonHandler as srcgooloadershandlersJsonHandler_JsonHandler } from "./src/goo/loaders/handlers/JsonHandler";
import { Light as srcgoorendererlightLight_Light } from "./src/goo/renderer/light/Light";
import { LightComponent as srcgooentitiescomponentsLightComponent_LightComponent } from "./src/goo/entities/components/LightComponent";
import {     LightComponentHandler as srcgooloadershandlersLightComponentHandler_LightComponentHandler, } from "./src/goo/loaders/handlers/LightComponentHandler";
import { LightingSystem as srcgooentitiessystemsLightingSystem_LightingSystem } from "./src/goo/entities/systems/LightingSystem";
import * as srcgooutilLogo_Logo from "./src/goo/util/Logo";
import { Manager as srcgooentitiesmanagersManager_Manager } from "./src/goo/entities/managers/Manager";
import { Material as srcgoorendererMaterial_Material } from "./src/goo/renderer/Material";
import { MaterialHandler as srcgooloadershandlersMaterialHandler_MaterialHandler } from "./src/goo/loaders/handlers/MaterialHandler";
import * as srcgoomathMathUtils_MathUtils from "./src/goo/math/MathUtils";
import { Matrix2 as srcgoomathMatrix2_Matrix2 } from "./src/goo/math/Matrix2";
import { Matrix2x2 as srcgoomathMatrix2x2_Matrix2x2 } from "./src/goo/math/Matrix2x2";
import { Matrix3 as srcgoomathMatrix3_Matrix3 } from "./src/goo/math/Matrix3";
import { Matrix3x3 as srcgoomathMatrix3x3_Matrix3x3 } from "./src/goo/math/Matrix3x3";
import { Matrix4 as srcgoomathMatrix4_Matrix4 } from "./src/goo/math/Matrix4";
import { Matrix4x4 as srcgoomathMatrix4x4_Matrix4x4 } from "./src/goo/math/Matrix4x4";
import { Matrix as srcgoomathMatrix_Matrix } from "./src/goo/math/Matrix";
import { MeshBuilder as srcgooutilMeshBuilder_MeshBuilder } from "./src/goo/util/MeshBuilder";
import { MeshData as srcgoorendererMeshData_MeshData } from "./src/goo/renderer/MeshData";
import {     MeshDataComponent as srcgooentitiescomponentsMeshDataComponent_MeshDataComponent, } from "./src/goo/entities/components/MeshDataComponent";
import {     MeshDataComponentHandler as srcgooloadershandlersMeshDataComponentHandler_MeshDataComponentHandler, } from "./src/goo/loaders/handlers/MeshDataComponentHandler";
import { MeshDataHandler as srcgooloadershandlersMeshDataHandler_MeshDataHandler } from "./src/goo/loaders/handlers/MeshDataHandler";
import {     MeshRendererComponent as srcgooentitiescomponentsMeshRendererComponent_MeshRendererComponent, } from "./src/goo/entities/components/MeshRendererComponent";
import {     MeshRendererComponentHandler as srcgooloadershandlersMeshRendererComponentHandler_MeshRendererComponentHandler, } from "./src/goo/loaders/handlers/MeshRendererComponentHandler";
import {     MovementComponent as srcgooentitiescomponentsMovementComponent_MovementComponent, } from "./src/goo/entities/components/MovementComponent";
import { MovementSystem as srcgooentitiessystemsMovementSystem_MovementSystem } from "./src/goo/entities/systems/MovementSystem";
import * as srcgoonoiseNoise_Noise from "./src/goo/noise/Noise";
import { ObjectUtils as srcgooutilObjectUtil_ObjectUtils } from "./src/goo/util/ObjectUtil";
import { ObjectUtils as srcgooutilObjectUtils_ObjectUtils } from "./src/goo/util/ObjectUtils";
import {     OrbitCamControlScript as srcgooscriptsOrbitCamControlScript_OrbitCamControlScript, } from "./src/goo/scripts/OrbitCamControlScript";
import * as srcgoosoundOscillatorSound_OscillatorSound from "./src/goo/sound/OscillatorSound";
import { Particle as srcgooparticlesParticle_Particle } from "./src/goo/particles/Particle";
import {     ParticleComponent as srcgooentitiescomponentsParticleComponent_ParticleComponent, } from "./src/goo/entities/components/ParticleComponent";
import * as srcgooparticlesParticleEmitter_ParticleEmitter from "./src/goo/particles/ParticleEmitter";
import { ParticleInfluence as srcgooparticlesParticleInfluence_ParticleInfluence } from "./src/goo/particles/ParticleInfluence";
import * as srcgooparticlesParticleLib_ParticleLib from "./src/goo/particles/ParticleLib";
import { ParticlesSystem as srcgooentitiessystemsParticlesSystem_ParticlesSystem } from "./src/goo/entities/systems/ParticlesSystem";
import * as srcgooutilParticleSystemUtils_ParticleSystemUtils from "./src/goo/util/ParticleSystemUtils";
import * as srcgooparticlesParticleUtils_ParticleUtils from "./src/goo/particles/ParticleUtils";
import { Pass as srcgoorendererpassPass_Pass } from "./src/goo/renderer/pass/Pass";
import { PickingSystem as srcgooentitiessystemsPickingSystem_PickingSystem } from "./src/goo/entities/systems/PickingSystem";
import { PipRenderSystem as srcgooentitiessystemsPipRenderSystem_PipRenderSystem } from "./src/goo/entities/systems/PipRenderSystem";
import * as srcgoomathPlane_Plane from "./src/goo/math/Plane";
import { PointLight as srcgoorendererlightPointLight_PointLight } from "./src/goo/renderer/light/PointLight";
import { PortalComponent as srcgooentitiescomponentsPortalComponent_PortalComponent } from "./src/goo/entities/components/PortalComponent";
import { PortalSystem as srcgooentitiessystemsPortalSystem_PortalSystem } from "./src/goo/entities/systems/PortalSystem";
import { PrimitivePickLogic as srcgoopickingPrimitivePickLogic_PrimitivePickLogic } from "./src/goo/picking/PrimitivePickLogic";
import { ProjectHandler as srcgooloadershandlersProjectHandler_ProjectHandler } from "./src/goo/loaders/handlers/ProjectHandler";
import { PromiseUtils as srcgooutilPromiseUtil_PromiseUtils } from "./src/goo/util/PromiseUtil";
import { PromiseUtils as srcgooutilPromiseUtils_PromiseUtils } from "./src/goo/util/PromiseUtils";
import { Quad as srcgooshapesQuad_Quad } from "./src/goo/shapes/Quad";
import { Quaternion as srcgoomathQuaternion_Quaternion } from "./src/goo/math/Quaternion";
import { Ray as srcgoomathRay_Ray } from "./src/goo/math/Ray";
import { Rc4Random as srcgooutilRc4Random_Rc4Random } from "./src/goo/util/Rc4Random";
import { Rectangle as srcgooutilcombineRectangle_Rectangle } from "./src/goo/util/combine/Rectangle";
import * as srcgoorendererRenderer_Renderer from "./src/goo/renderer/Renderer";
import { RendererRecord as srcgoorendererRendererRecord_RendererRecord } from "./src/goo/renderer/RendererRecord";
import * as srcgoorendererRendererUtils_RendererUtils from "./src/goo/renderer/RendererUtils";
import { RenderInfo as srcgoorendererRenderInfo_RenderInfo } from "./src/goo/renderer/RenderInfo";
import { RenderPass as srcgoorendererpassRenderPass_RenderPass } from "./src/goo/renderer/pass/RenderPass";
import * as srcgoorendererRenderQueue_RenderQueue from "./src/goo/renderer/RenderQueue";
import { RenderStats as srcgoorendererRenderStats_RenderStats } from "./src/goo/renderer/RenderStats";
import { RenderSystem as srcgooentitiessystemsRenderSystem_RenderSystem } from "./src/goo/entities/systems/RenderSystem";
import { RenderTarget as srcgoorendererpassRenderTarget_RenderTarget } from "./src/goo/renderer/pass/RenderTarget";
import * as srcgooutilrsvp_rsvpjs from "./src/goo/util/rsvp";
import { SceneHandler as srcgooloadershandlersSceneHandler_SceneHandler } from "./src/goo/loaders/handlers/SceneHandler";
import { ScriptComponent as srcgooentitiescomponentsScriptComponent_ScriptComponent } from "./src/goo/entities/components/ScriptComponent";
import * as srcgooscriptsScripts_Scripts from "./src/goo/scripts/Scripts";
import { ScriptSystem as srcgooentitiessystemsScriptSystem_ScriptSystem } from "./src/goo/entities/systems/ScriptSystem";
import * as srcgooscriptsScriptUtils_ScriptUtils from "./src/goo/scripts/ScriptUtils";
import { Selection as srcgooentitiesSelection_Selection } from "./src/goo/entities/Selection";
import { Shader as srcgoorendererShader_Shader } from "./src/goo/renderer/Shader";
import * as srcgoorenderershadersShaderBuilder_ShaderBuilder from "./src/goo/renderer/shaders/ShaderBuilder";
import { ShaderCall as srcgoorendererShaderCall_ShaderCall } from "./src/goo/renderer/ShaderCall";
import * as srcgoorenderershadersShaderFragment_ShaderFragment from "./src/goo/renderer/shaders/ShaderFragment";
import { ShaderHandler as srcgooloadershandlersShaderHandler_ShaderHandler } from "./src/goo/loaders/handlers/ShaderHandler";
import * as srcgoorenderershadersShaderLib_ShaderLib from "./src/goo/renderer/shaders/ShaderLib";
import { ShadowHandler as srcgoorenderershadowShadowHandler_ShadowHandler } from "./src/goo/renderer/shadow/ShadowHandler";
import * as srcgooutilShapeCreatorMemoized_ShapeCreatorMemoized from "./src/goo/util/ShapeCreatorMemoized";
import { SimpleBox as srcgooshapesSimpleBox_SimpleBox } from "./src/goo/shapes/SimpleBox";
import { SimplePartitioner as srcgoorendererSimplePartitioner_SimplePartitioner } from "./src/goo/renderer/SimplePartitioner";
import * as srcgooutilSkybox_Skybox from "./src/goo/util/Skybox";
import { SkyboxHandler as srcgooloadershandlersSkyboxHandler_SkyboxHandler } from "./src/goo/loaders/handlers/SkyboxHandler";
import { Snow as srcgooutilSnow_Snow } from "./src/goo/util/Snow";
import { Sound as srcgoosoundSound_Sound } from "./src/goo/sound/Sound";
import { SoundComponent as srcgooentitiescomponentsSoundComponent_SoundComponent } from "./src/goo/entities/components/SoundComponent";
import {     SoundComponentHandler as srcgooloadershandlersSoundComponentHandler_SoundComponentHandler, } from "./src/goo/loaders/handlers/SoundComponentHandler";
import { SoundCreator as srcgooutilSoundCreator_SoundCreator } from "./src/goo/util/SoundCreator";
import { SoundHandler as srcgooloadershandlersSoundHandler_SoundHandler } from "./src/goo/loaders/handlers/SoundHandler";
import { SoundSystem as srcgooentitiessystemsSoundSystem_SoundSystem } from "./src/goo/entities/systems/SoundSystem";
import { Sphere as srcgooshapesSphere_Sphere } from "./src/goo/shapes/Sphere";
import * as srcgoomathsplinesSpline_Spline from "./src/goo/math/splines/Spline";
import { SplineWalker as srcgoomathsplinesSplineWalker_SplineWalker } from "./src/goo/math/splines/SplineWalker";
import { SpotLight as srcgoorendererlightSpotLight_SpotLight } from "./src/goo/renderer/light/SpotLight";
import { Stats as srcgooutilStats_Stats } from "./src/goo/util/Stats";
import { StringUtils as srcgooutilStringUtil_StringUtils } from "./src/goo/util/StringUtil";
import * as srcgooutilStringUtils_StringUtils from "./src/goo/util/StringUtils";
import { System as srcgooentitiessystemsSystem_System } from "./src/goo/entities/systems/System";
import { SystemBusjs as srcgooentitiesSystemBus_SystemBusjs } from "./src/goo/entities/SystemBus";
import * as srcgooutilTangentGenerator_TangentGenerator from "./src/goo/util/TangentGenerator";
import * as srcgoorendererTaskScheduler_TaskScheduler from "./src/goo/renderer/TaskScheduler";
import { TextComponent as srcgooentitiescomponentsTextComponent_TextComponent } from "./src/goo/entities/components/TextComponent";
import { TextSystem as srcgooentitiessystemsTextSystem_TextSystem } from "./src/goo/entities/systems/TextSystem";
import { Texture as srcgoorendererTexture_Texture } from "./src/goo/renderer/Texture";
import * as srcgoorendererTextureCreator_TextureCreator from "./src/goo/renderer/TextureCreator";
import { TextureGrid as srcgooshapesTextureGrid_TextureGrid } from "./src/goo/shapes/TextureGrid";
import { TextureHandler as srcgooloadershandlersTextureHandler_TextureHandler } from "./src/goo/loaders/handlers/TextureHandler";
import { TgaLoader as srcgooloaderstgaTgaLoader_TgaLoader } from "./src/goo/loaders/tga/TgaLoader";
import { Torus as srcgooshapesTorus_Torus } from "./src/goo/shapes/Torus";
import { Transform as srcgoomathTransform_Transform } from "./src/goo/math/Transform";
import {     TransformComponent as srcgooentitiescomponentsTransformComponent_TransformComponent, } from "./src/goo/entities/components/TransformComponent";
import {     TransformComponentHandler as srcgooloadershandlersTransformComponentHandler_TransformComponentHandler, } from "./src/goo/loaders/handlers/TransformComponentHandler";
import { TransformSystem as srcgooentitiessystemsTransformSystem_TransformSystem } from "./src/goo/entities/systems/TransformSystem";
import { ValueNoise as srcgoonoiseValueNoise_ValueNoise } from "./src/goo/noise/ValueNoise";
import { Vector2 as srcgoomathVector2_Vector2 } from "./src/goo/math/Vector2";
import { Vector3 as srcgoomathVector3_Vector3 } from "./src/goo/math/Vector3";
import { Vector4 as srcgoomathVector4_Vector4 } from "./src/goo/math/Vector4";
import { Vector as srcgoomathVector_Vector } from "./src/goo/math/Vector";
import { World as srcgooentitiesWorld_World } from "./src/goo/entities/World";
import "./tools/MapSetPolyfill";
if (typeof window !== 'undefined') {}

indexjs_indexjs = {
	Ajax: srcgooutilAjax_Ajax,
	ArrayUtil: srcgooutilArrayUtil_ArrayUtils,
	ArrayUtils: srcgooutilArrayUtils_ArrayUtils,
	AtlasNode: srcgooutilcombineAtlasNode_AtlasNode,
	AudioContext: srcgoosoundAudioContext_AudioContextjs,
	BoundingBox: srcgoorendererboundsBoundingBox_BoundingBox,
	BoundingPicker: srcgoorendererboundsBoundingPicker_BoundingPicker,
	BoundingSphere: srcgoorendererboundsBoundingSphere_BoundingSphere,
	BoundingTree: srcgoopickingBoundingTree_BoundingTree,
	BoundingUpdateSystem: srcgooentitiessystemsBoundingUpdateSystem_BoundingUpdateSystem,
	BoundingVolume: srcgoorendererboundsBoundingVolume_BoundingVolume,
	Box: srcgooshapesBox_Box,
	BufferData: srcgoorendererBufferData_BufferData,
	BufferUtils: srcgoorendererBufferUtils_BufferUtils,
	Bus: srcgooentitiesBus_Bus,
	Camera: srcgoorendererCamera_Camera,
	CameraComponent: srcgooentitiescomponentsCameraComponent_CameraComponent,
	CameraComponentHandler: srcgooloadershandlersCameraComponentHandler_CameraComponentHandler,
	CameraSystem: srcgooentitiessystemsCameraSystem_CameraSystem,
	CanvasUtils: srcgooutilCanvasUtils_CanvasUtils,
	Capabilities: srcgoorendererCapabilities_Capabilities,
	Component: srcgooentitiescomponentsComponent_Component,
	ComponentHandler: srcgooloadershandlersComponentHandler_ComponentHandler,
	Composer: srcgoorendererpassComposer_Composer,
	Cone: srcgooshapesCone_Cone,
	ConfigHandler: srcgooloadershandlersConfigHandler_ConfigHandler,
	ContextLost: {},
	CrunchLoader: srcgooloaderscrunchCrunchLoader_CrunchLoader,
	CssTransformComponent: srcgooentitiescomponentsCssTransformComponent_CssTransformComponent,
	CssTransformSystem: srcgooentitiessystemsCssTransformSystem_CssTransformSystem,
	Cylinder: srcgooshapesCylinder_Cylinder,
	DdsLoader: srcgooloadersddsDdsLoader_DdsLoader,
	DdsUtils: srcgooloadersddsDdsUtils_DdsUtils,
	DirectionalLight: srcgoorendererlightDirectionalLight_DirectionalLight,
	Disk: srcgooshapesDisk_Disk,
	Dom3dComponent: srcgooentitiescomponentsDom3dComponent_Dom3dComponent,
	Dom3dComponentHandler: srcgooloadershandlersDom3dComponentHandler_Dom3dComponentHandler,
	Dom3dSystem: srcgooentitiessystemsDom3dSystem_Dom3dSystem,
	DynamicLoader: srcgooloadersDynamicLoader_DynamicLoader,
	Easing: srcgooutilEasing_Easing,
	Entity: srcgooentitiesEntity_Entity,
	EntityCombiner: srcgooutilcombineEntityCombiner_EntityCombiner,
	EntityHandler: srcgooloadershandlersEntityHandler_EntityHandler,
	EntityManager: srcgooentitiesmanagersEntityManager_EntityManager,
	EntitySelection: srcgooentitiesEntitySelection_EntitySelection,
	EntityUtils: srcgooentitiesEntityUtils_EntityUtils,
	EnvironmentHandler: srcgooloadershandlersEnvironmentHandler_EnvironmentHandler,
	EventTarget: srcgooutilEventTarget_EventTarget,
	FullscreenPass: srcgoorendererpassFullscreenPass_FullscreenPass,
	FullscreenUtil: srcgoorendererpassFullscreenUtil_FullscreenUtils,
	FullscreenUtils: srcgoorendererpassFullscreenUtils_FullscreenUtils,
	GameUtils: srcgooutilGameUtils_GameUtils,
	GooRunner: srcgooentitiesGooRunner_GooRunner,
	Grid: srcgooshapesGrid_Grid,
	GridRenderSystem: srcgooentitiessystemsGridRenderSystem_GridRenderSystem,
	HtmlComponent: srcgooentitiescomponentsHtmlComponent_HtmlComponent,
	HtmlComponentHandler: srcgooloadershandlersHtmlComponentHandler_HtmlComponentHandler,
	HtmlSystem: srcgooentitiessystemsHtmlSystem_HtmlSystem,
	JsonHandler: srcgooloadershandlersJsonHandler_JsonHandler,
	Light: srcgoorendererlightLight_Light,
	LightComponent: srcgooentitiescomponentsLightComponent_LightComponent,
	LightComponentHandler: srcgooloadershandlersLightComponentHandler_LightComponentHandler,
	LightingSystem: srcgooentitiessystemsLightingSystem_LightingSystem,
	Logo: srcgooutilLogo_Logo,
	Manager: srcgooentitiesmanagersManager_Manager,
	Material: srcgoorendererMaterial_Material,
	MaterialHandler: srcgooloadershandlersMaterialHandler_MaterialHandler,
	MathUtils: srcgoomathMathUtils_MathUtils,
	Matrix2: srcgoomathMatrix2_Matrix2,
	Matrix2x2: srcgoomathMatrix2x2_Matrix2x2,
	Matrix3: srcgoomathMatrix3_Matrix3,
	Matrix3x3: srcgoomathMatrix3x3_Matrix3x3,
	Matrix4: srcgoomathMatrix4_Matrix4,
	Matrix4x4: srcgoomathMatrix4x4_Matrix4x4,
	Matrix: srcgoomathMatrix_Matrix,
	MeshBuilder: srcgooutilMeshBuilder_MeshBuilder,
	MeshData: srcgoorendererMeshData_MeshData,
	MeshDataComponent: srcgooentitiescomponentsMeshDataComponent_MeshDataComponent,
	MeshDataComponentHandler: srcgooloadershandlersMeshDataComponentHandler_MeshDataComponentHandler,
	MeshDataHandler: srcgooloadershandlersMeshDataHandler_MeshDataHandler,
	MeshRendererComponent: srcgooentitiescomponentsMeshRendererComponent_MeshRendererComponent,
	MeshRendererComponentHandler: srcgooloadershandlersMeshRendererComponentHandler_MeshRendererComponentHandler,
	MovementComponent: srcgooentitiescomponentsMovementComponent_MovementComponent,
	MovementSystem: srcgooentitiessystemsMovementSystem_MovementSystem,
	Noise: srcgoonoiseNoise_Noise,
	ObjectUtil: srcgooutilObjectUtil_ObjectUtils,
	ObjectUtils: srcgooutilObjectUtils_ObjectUtils,
	OrbitCamControlScript: srcgooscriptsOrbitCamControlScript_OrbitCamControlScript,
	OscillatorSound: srcgoosoundOscillatorSound_OscillatorSound,
	Particle: srcgooparticlesParticle_Particle,
	ParticleComponent: srcgooentitiescomponentsParticleComponent_ParticleComponent,
	ParticleEmitter: srcgooparticlesParticleEmitter_ParticleEmitter,
	ParticleInfluence: srcgooparticlesParticleInfluence_ParticleInfluence,
	ParticleLib: srcgooparticlesParticleLib_ParticleLib,
	ParticlesSystem: srcgooentitiessystemsParticlesSystem_ParticlesSystem,
	ParticleSystemUtils: srcgooutilParticleSystemUtils_ParticleSystemUtils,
	ParticleUtils: srcgooparticlesParticleUtils_ParticleUtils,
	Pass: srcgoorendererpassPass_Pass,
	PickingSystem: srcgooentitiessystemsPickingSystem_PickingSystem,
	PipRenderSystem: srcgooentitiessystemsPipRenderSystem_PipRenderSystem,
	Plane: srcgoomathPlane_Plane,
	PointLight: srcgoorendererlightPointLight_PointLight,
	PortalComponent: srcgooentitiescomponentsPortalComponent_PortalComponent,
	PortalSystem: srcgooentitiessystemsPortalSystem_PortalSystem,
	PrimitivePickLogic: srcgoopickingPrimitivePickLogic_PrimitivePickLogic,
	ProjectHandler: srcgooloadershandlersProjectHandler_ProjectHandler,
	PromiseUtil: srcgooutilPromiseUtil_PromiseUtils,
	PromiseUtils: srcgooutilPromiseUtils_PromiseUtils,
	Quad: srcgooshapesQuad_Quad,
	Quaternion: srcgoomathQuaternion_Quaternion,
	Ray: srcgoomathRay_Ray,
	Rc4Random: srcgooutilRc4Random_Rc4Random,
	Rectangle: srcgooutilcombineRectangle_Rectangle,
	Renderer: srcgoorendererRenderer_Renderer,
	RendererRecord: srcgoorendererRendererRecord_RendererRecord,
	RendererUtils: srcgoorendererRendererUtils_RendererUtils,
	RenderInfo: srcgoorendererRenderInfo_RenderInfo,
	RenderPass: srcgoorendererpassRenderPass_RenderPass,
	RenderQueue: srcgoorendererRenderQueue_RenderQueue,
	RenderStats: srcgoorendererRenderStats_RenderStats,
	RenderSystem: srcgooentitiessystemsRenderSystem_RenderSystem,
	RenderTarget: srcgoorendererpassRenderTarget_RenderTarget,
	rsvp: srcgooutilrsvp_rsvpjs,
	SceneHandler: srcgooloadershandlersSceneHandler_SceneHandler,
	ScriptComponent: srcgooentitiescomponentsScriptComponent_ScriptComponent,
	Scripts: srcgooscriptsScripts_Scripts,
	ScriptSystem: srcgooentitiessystemsScriptSystem_ScriptSystem,
	ScriptUtils: srcgooscriptsScriptUtils_ScriptUtils,
	Selection: srcgooentitiesSelection_Selection,
	Shader: srcgoorendererShader_Shader,
	ShaderBuilder: srcgoorenderershadersShaderBuilder_ShaderBuilder,
	ShaderCall: srcgoorendererShaderCall_ShaderCall,
	ShaderFragment: srcgoorenderershadersShaderFragment_ShaderFragment,
	ShaderHandler: srcgooloadershandlersShaderHandler_ShaderHandler,
	ShaderLib: srcgoorenderershadersShaderLib_ShaderLib,
	ShadowHandler: srcgoorenderershadowShadowHandler_ShadowHandler,
	ShapeCreatorMemoized: srcgooutilShapeCreatorMemoized_ShapeCreatorMemoized,
	SimpleBox: srcgooshapesSimpleBox_SimpleBox,
	SimplePartitioner: srcgoorendererSimplePartitioner_SimplePartitioner,
	Skybox: srcgooutilSkybox_Skybox,
	SkyboxHandler: srcgooloadershandlersSkyboxHandler_SkyboxHandler,
	Snow: srcgooutilSnow_Snow,
	Sound: srcgoosoundSound_Sound,
	SoundComponent: srcgooentitiescomponentsSoundComponent_SoundComponent,
	SoundComponentHandler: srcgooloadershandlersSoundComponentHandler_SoundComponentHandler,
	SoundCreator: srcgooutilSoundCreator_SoundCreator,
	SoundHandler: srcgooloadershandlersSoundHandler_SoundHandler,
	SoundSystem: srcgooentitiessystemsSoundSystem_SoundSystem,
	Sphere: srcgooshapesSphere_Sphere,
	Spline: srcgoomathsplinesSpline_Spline,
	SplineWalker: srcgoomathsplinesSplineWalker_SplineWalker,
	SpotLight: srcgoorendererlightSpotLight_SpotLight,
	Stats: srcgooutilStats_Stats,
	StringUtil: srcgooutilStringUtil_StringUtils,
	StringUtils: srcgooutilStringUtils_StringUtils,
	System: srcgooentitiessystemsSystem_System,
	SystemBus: srcgooentitiesSystemBus_SystemBusjs,
	TangentGenerator: srcgooutilTangentGenerator_TangentGenerator,
	TaskScheduler: srcgoorendererTaskScheduler_TaskScheduler,
	TextComponent: srcgooentitiescomponentsTextComponent_TextComponent,
	TextSystem: srcgooentitiessystemsTextSystem_TextSystem,
	Texture: srcgoorendererTexture_Texture,
	TextureCreator: srcgoorendererTextureCreator_TextureCreator,
	TextureGrid: srcgooshapesTextureGrid_TextureGrid,
	TextureHandler: srcgooloadershandlersTextureHandler_TextureHandler,
	TgaLoader: srcgooloaderstgaTgaLoader_TgaLoader,
	Torus: srcgooshapesTorus_Torus,
	Transform: srcgoomathTransform_Transform,
	TransformComponent: srcgooentitiescomponentsTransformComponent_TransformComponent,
	TransformComponentHandler: srcgooloadershandlersTransformComponentHandler_TransformComponentHandler,
	TransformSystem: srcgooentitiessystemsTransformSystem_TransformSystem,
	ValueNoise: srcgoonoiseValueNoise_ValueNoise,
	Vector2: srcgoomathVector2_Vector2,
	Vector3: srcgoomathVector3_Vector3,
	Vector4: srcgoomathVector4_Vector4,
	Vector: srcgoomathVector_Vector,
	World: srcgooentitiesWorld_World
};

if (typeof(window) !== 'undefined') {
	window.goo = indexjs_indexjs;
}
var indexjs_indexjs;
export { indexjs_indexjs as indexjs };
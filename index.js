import { Ajax } from "./src/goo/util/Ajax";
import { ArrayUtils as ArrayUtil } from "./src/goo/util/ArrayUtil";
import * as ArrayUtils from "./src/goo/util/ArrayUtils";
import { AtlasNode } from "./src/goo/util/combine/AtlasNode";
import * as AudioContext from "./src/goo/sound/AudioContext";
import { BoundingBox } from "./src/goo/renderer/bounds/BoundingBox";
import * as BoundingPicker from "./src/goo/renderer/bounds/BoundingPicker";
import { BoundingSphere } from "./src/goo/renderer/bounds/BoundingSphere";
import { BoundingTree } from "./src/goo/picking/BoundingTree";
import { BoundingUpdateSystem } from "./src/goo/entities/systems/BoundingUpdateSystem";
import { BoundingVolume } from "./src/goo/renderer/bounds/BoundingVolume";
import { Box } from "./src/goo/shapes/Box";
import { BufferData } from "./src/goo/renderer/BufferData";
import * as BufferUtils from "./src/goo/renderer/BufferUtils";
import { Bus } from "./src/goo/entities/Bus";
import { Camera } from "./src/goo/renderer/Camera";
import { CameraComponent } from "./src/goo/entities/components/CameraComponent";
import { CameraComponentHandler } from "./src/goo/loaders/handlers/CameraComponentHandler";
import { CameraSystem } from "./src/goo/entities/systems/CameraSystem";
import * as CanvasUtils from "./src/goo/util/CanvasUtils";
import { Capabilities } from "./src/goo/renderer/Capabilities";
import { Component } from "./src/goo/entities/components/Component";
import { ComponentHandler } from "./src/goo/loaders/handlers/ComponentHandler";
import { Composer } from "./src/goo/renderer/pass/Composer";
import { Cone } from "./src/goo/shapes/Cone";
import { ConfigHandler } from "./src/goo/loaders/handlers/ConfigHandler";
import * as RendererContextLost from "./src/goo/renderer/Renderer+ContextLost";
import { CrunchLoader } from "./src/goo/loaders/crunch/CrunchLoader";
import { CssTransformComponent } from "./src/goo/entities/components/CssTransformComponent";
import { CssTransformSystem } from "./src/goo/entities/systems/CssTransformSystem";
import { Cylinder } from "./src/goo/shapes/Cylinder";
import { DdsLoader } from "./src/goo/loaders/dds/DdsLoader";
import * as DdsUtils from "./src/goo/loaders/dds/DdsUtils";
import { DirectionalLight } from "./src/goo/renderer/light/DirectionalLight";
import { Disk } from "./src/goo/shapes/Disk";
import { Dom3dComponent } from "./src/goo/entities/components/Dom3dComponent";
import { Dom3dComponentHandler } from "./src/goo/loaders/handlers/Dom3dComponentHandler";
import { Dom3dSystem } from "./src/goo/entities/systems/Dom3dSystem";
import { DynamicLoader } from "./src/goo/loaders/DynamicLoader";
import * as Easing from "./src/goo/util/Easing";
import { Entity } from "./src/goo/entities/Entity";
import { EntityCombiner } from "./src/goo/util/combine/EntityCombiner";
import { EntityHandler } from "./src/goo/loaders/handlers/EntityHandler";
import { EntityManager } from "./src/goo/entities/managers/EntityManager";
import { EntitySelection } from "./src/goo/entities/EntitySelection";
import * as EntityUtils from "./src/goo/entities/EntityUtils";
import { EnvironmentHandler } from "./src/goo/loaders/handlers/EnvironmentHandler";
import { EventTarget } from "./src/goo/util/EventTarget";
import { FullscreenPass } from "./src/goo/renderer/pass/FullscreenPass";
import { FullscreenUtils as FullscreenUtil } from "./src/goo/renderer/pass/FullscreenUtil";
import * as FullscreenUtils from "./src/goo/renderer/pass/FullscreenUtils";
import * as GameUtils from "./src/goo/util/GameUtils";
import { GooRunner } from "./src/goo/entities/GooRunner";
import { Grid } from "./src/goo/shapes/Grid";
import { GridRenderSystem } from "./src/goo/entities/systems/GridRenderSystem";
import { HtmlComponent } from "./src/goo/entities/components/HtmlComponent";
import { HtmlComponentHandler } from "./src/goo/loaders/handlers/HtmlComponentHandler";
import { HtmlSystem } from "./src/goo/entities/systems/HtmlSystem";
import { JsonHandler } from "./src/goo/loaders/handlers/JsonHandler";
import { Light } from "./src/goo/renderer/light/Light";
import { LightComponent } from "./src/goo/entities/components/LightComponent";
import { LightComponentHandler } from "./src/goo/loaders/handlers/LightComponentHandler";
import { LightingSystem } from "./src/goo/entities/systems/LightingSystem";
import * as Logo from "./src/goo/util/Logo";
import { Manager } from "./src/goo/entities/managers/Manager";
import { Material } from "./src/goo/renderer/Material";
import { MaterialHandler } from "./src/goo/loaders/handlers/MaterialHandler";
import * as MathUtils from "./src/goo/math/MathUtils";
import { Matrix2 } from "./src/goo/math/Matrix2";
import { Matrix2x2 } from "./src/goo/math/Matrix2x2";
import { Matrix3 } from "./src/goo/math/Matrix3";
import { Matrix3x3 } from "./src/goo/math/Matrix3x3";
import { Matrix4 } from "./src/goo/math/Matrix4";
import { Matrix4x4 } from "./src/goo/math/Matrix4x4";
import { Matrix } from "./src/goo/math/Matrix";
import { MeshBuilder } from "./src/goo/util/MeshBuilder";
import { MeshData } from "./src/goo/renderer/MeshData";
import { MeshDataComponent } from "./src/goo/entities/components/MeshDataComponent";
import { MeshDataComponentHandler } from "./src/goo/loaders/handlers/MeshDataComponentHandler";
import { MeshDataHandler } from "./src/goo/loaders/handlers/MeshDataHandler";
import { MeshRendererComponent } from "./src/goo/entities/components/MeshRendererComponent";
import { MeshRendererComponentHandler } from "./src/goo/loaders/handlers/MeshRendererComponentHandler";
import { MovementComponent } from "./src/goo/entities/components/MovementComponent";
import { MovementSystem } from "./src/goo/entities/systems/MovementSystem";
import * as Noise from "./src/goo/noise/Noise";
import { ObjectUtils as ObjectUtil } from "./src/goo/util/ObjectUtil";
import * as ObjectUtils from "./src/goo/util/ObjectUtils";
import { OrbitCamControlScript } from "./src/goo/scripts/OrbitCamControlScript";
import { OscillatorSound } from "./src/goo/sound/OscillatorSound";
import { Particle } from "./src/goo/particles/Particle";
import { ParticleComponent } from "./src/goo/entities/components/ParticleComponent";
import { ParticleEmitter } from "./src/goo/particles/ParticleEmitter";
import { ParticleInfluence } from "./src/goo/particles/ParticleInfluence";
import * as ParticleLib from "./src/goo/particles/ParticleLib";
import { ParticlesSystem } from "./src/goo/entities/systems/ParticlesSystem";
import * as ParticleSystemUtils from "./src/goo/util/ParticleSystemUtils";
import * as ParticleUtils from "./src/goo/particles/ParticleUtils";
import { Pass } from "./src/goo/renderer/pass/Pass";
import { PickingSystem } from "./src/goo/entities/systems/PickingSystem";
import { PipRenderSystem } from "./src/goo/entities/systems/PipRenderSystem";
import { Plane } from "./src/goo/math/Plane";
import { PointLight } from "./src/goo/renderer/light/PointLight";
import { PortalComponent } from "./src/goo/entities/components/PortalComponent";
import { PortalSystem } from "./src/goo/entities/systems/PortalSystem";
import { PrimitivePickLogic } from "./src/goo/picking/PrimitivePickLogic";
import { ProjectHandler } from "./src/goo/loaders/handlers/ProjectHandler";
import { PromiseUtils as PromiseUtil } from "./src/goo/util/PromiseUtil";
import * as PromiseUtils from "./src/goo/util/PromiseUtils";
import { Quad } from "./src/goo/shapes/Quad";
import { Quaternion } from "./src/goo/math/Quaternion";
import { Ray } from "./src/goo/math/Ray";
import { Rc4Random } from "./src/goo/util/Rc4Random";
import { Rectangle } from "./src/goo/util/combine/Rectangle";
import { Renderer } from "./src/goo/renderer/Renderer";
import { RendererRecord } from "./src/goo/renderer/RendererRecord";
import * as RendererUtils from "./src/goo/renderer/RendererUtils";
import { RenderInfo } from "./src/goo/renderer/RenderInfo";
import { RenderPass } from "./src/goo/renderer/pass/RenderPass";
import { RenderQueue } from "./src/goo/renderer/RenderQueue";
import { RenderStats } from "./src/goo/renderer/RenderStats";
import { RenderSystem } from "./src/goo/entities/systems/RenderSystem";
import { RenderTarget } from "./src/goo/renderer/pass/RenderTarget";
import * as rsvp from "./src/goo/util/rsvp";
import { SceneHandler } from "./src/goo/loaders/handlers/SceneHandler";
import { ScriptComponent } from "./src/goo/entities/components/ScriptComponent";
import * as Scripts from "./src/goo/scripts/Scripts";
import { ScriptSystem } from "./src/goo/entities/systems/ScriptSystem";
import * as ScriptUtils from "./src/goo/scripts/ScriptUtils";
import { Selection } from "./src/goo/entities/Selection";
import { Shader } from "./src/goo/renderer/Shader";
import * as ShaderBuilder from "./src/goo/renderer/shaders/ShaderBuilder";
import { ShaderCall } from "./src/goo/renderer/ShaderCall";
import * as ShaderFragment from "./src/goo/renderer/shaders/ShaderFragment";
import { ShaderHandler } from "./src/goo/loaders/handlers/ShaderHandler";
import * as ShaderLib from "./src/goo/renderer/shaders/ShaderLib";
import { ShadowHandler } from "./src/goo/renderer/shadow/ShadowHandler";
import * as ShapeCreatorMemoized from "./src/goo/util/ShapeCreatorMemoized";
import { SimpleBox } from "./src/goo/shapes/SimpleBox";
import { SimplePartitioner } from "./src/goo/renderer/SimplePartitioner";
import { Skybox } from "./src/goo/util/Skybox";
import { SkyboxHandler } from "./src/goo/loaders/handlers/SkyboxHandler";
import { Snow } from "./src/goo/util/Snow";
import { Sound } from "./src/goo/sound/Sound";
import { SoundComponent } from "./src/goo/entities/components/SoundComponent";
import { SoundComponentHandler } from "./src/goo/loaders/handlers/SoundComponentHandler";
import { SoundCreator } from "./src/goo/util/SoundCreator";
import { SoundHandler } from "./src/goo/loaders/handlers/SoundHandler";
import { SoundSystem } from "./src/goo/entities/systems/SoundSystem";
import { Sphere } from "./src/goo/shapes/Sphere";
import { Spline } from "./src/goo/math/splines/Spline";
import { SplineWalker } from "./src/goo/math/splines/SplineWalker";
import { SpotLight } from "./src/goo/renderer/light/SpotLight";
import { Stats } from "./src/goo/util/Stats";
import { StringUtils as StringUtil } from "./src/goo/util/StringUtil";
import * as StringUtils from "./src/goo/util/StringUtils";
import { System } from "./src/goo/entities/systems/System";
import { anonymus as SystemBus } from "./src/goo/entities/SystemBus";
import * as TangentGenerator from "./src/goo/util/TangentGenerator";
import * as TaskScheduler from "./src/goo/renderer/TaskScheduler";
import { TextComponent } from "./src/goo/entities/components/TextComponent";
import { TextSystem } from "./src/goo/entities/systems/TextSystem";
import { Texture } from "./src/goo/renderer/Texture";
import { TextureCreator } from "./src/goo/renderer/TextureCreator";
import { TextureGrid } from "./src/goo/shapes/TextureGrid";
import { TextureHandler } from "./src/goo/loaders/handlers/TextureHandler";
import { TgaLoader } from "./src/goo/loaders/tga/TgaLoader";
import { Torus } from "./src/goo/shapes/Torus";
import { Transform } from "./src/goo/math/Transform";
import { TransformComponent } from "./src/goo/entities/components/TransformComponent";
import { TransformComponentHandler } from "./src/goo/loaders/handlers/TransformComponentHandler";
import { TransformSystem } from "./src/goo/entities/systems/TransformSystem";
import { ValueNoise } from "./src/goo/noise/ValueNoise";
import { Vector2 } from "./src/goo/math/Vector2";
import { Vector3 } from "./src/goo/math/Vector3";
import { Vector4 } from "./src/goo/math/Vector4";
import { Vector } from "./src/goo/math/Vector";
import { World } from "./src/goo/entities/World";
import "./tools/MapSetPolyfill";
if (typeof window !== 'undefined') {}

module.exports = {
	Ajax: Ajax,
	ArrayUtil: ArrayUtil,
	ArrayUtils: ArrayUtils,
	AtlasNode: AtlasNode,
	AudioContext: AudioContext,
	BoundingBox: BoundingBox,
	BoundingPicker: BoundingPicker,
	BoundingSphere: BoundingSphere,
	BoundingTree: BoundingTree,
	BoundingUpdateSystem: BoundingUpdateSystem,
	BoundingVolume: BoundingVolume,
	Box: Box,
	BufferData: BufferData,
	BufferUtils: BufferUtils,
	Bus: Bus,
	Camera: Camera,
	CameraComponent: CameraComponent,
	CameraComponentHandler: CameraComponentHandler,
	CameraSystem: CameraSystem,
	CanvasUtils: CanvasUtils,
	Capabilities: Capabilities,
	Component: Component,
	ComponentHandler: ComponentHandler,
	Composer: Composer,
	Cone: Cone,
	ConfigHandler: ConfigHandler,
	ContextLost: RendererContextLost,
	CrunchLoader: CrunchLoader,
	CssTransformComponent: CssTransformComponent,
	CssTransformSystem: CssTransformSystem,
	Cylinder: Cylinder,
	DdsLoader: DdsLoader,
	DdsUtils: DdsUtils,
	DirectionalLight: DirectionalLight,
	Disk: Disk,
	Dom3dComponent: Dom3dComponent,
	Dom3dComponentHandler: Dom3dComponentHandler,
	Dom3dSystem: Dom3dSystem,
	DynamicLoader: DynamicLoader,
	Easing: Easing,
	Entity: Entity,
	EntityCombiner: EntityCombiner,
	EntityHandler: EntityHandler,
	EntityManager: EntityManager,
	EntitySelection: EntitySelection,
	EntityUtils: EntityUtils,
	EnvironmentHandler: EnvironmentHandler,
	EventTarget: EventTarget,
	FullscreenPass: FullscreenPass,
	FullscreenUtil: FullscreenUtil,
	FullscreenUtils: FullscreenUtils,
	GameUtils: GameUtils,
	GooRunner: GooRunner,
	Grid: Grid,
	GridRenderSystem: GridRenderSystem,
	HtmlComponent: HtmlComponent,
	HtmlComponentHandler: HtmlComponentHandler,
	HtmlSystem: HtmlSystem,
	JsonHandler: JsonHandler,
	Light: Light,
	LightComponent: LightComponent,
	LightComponentHandler: LightComponentHandler,
	LightingSystem: LightingSystem,
	Logo: Logo,
	Manager: Manager,
	Material: Material,
	MaterialHandler: MaterialHandler,
	MathUtils: MathUtils,
	Matrix2: Matrix2,
	Matrix2x2: Matrix2x2,
	Matrix3: Matrix3,
	Matrix3x3: Matrix3x3,
	Matrix4: Matrix4,
	Matrix4x4: Matrix4x4,
	Matrix: Matrix,
	MeshBuilder: MeshBuilder,
	MeshData: MeshData,
	MeshDataComponent: MeshDataComponent,
	MeshDataComponentHandler: MeshDataComponentHandler,
	MeshDataHandler: MeshDataHandler,
	MeshRendererComponent: MeshRendererComponent,
	MeshRendererComponentHandler: MeshRendererComponentHandler,
	MovementComponent: MovementComponent,
	MovementSystem: MovementSystem,
	Noise: Noise,
	ObjectUtil: ObjectUtil,
	ObjectUtils: ObjectUtils,
	OrbitCamControlScript: OrbitCamControlScript,
	OscillatorSound: OscillatorSound,
	Particle: Particle,
	ParticleComponent: ParticleComponent,
	ParticleEmitter: ParticleEmitter,
	ParticleInfluence: ParticleInfluence,
	ParticleLib: ParticleLib,
	ParticlesSystem: ParticlesSystem,
	ParticleSystemUtils: ParticleSystemUtils,
	ParticleUtils: ParticleUtils,
	Pass: Pass,
	PickingSystem: PickingSystem,
	PipRenderSystem: PipRenderSystem,
	Plane: Plane,
	PointLight: PointLight,
	PortalComponent: PortalComponent,
	PortalSystem: PortalSystem,
	PrimitivePickLogic: PrimitivePickLogic,
	ProjectHandler: ProjectHandler,
	PromiseUtil: PromiseUtil,
	PromiseUtils: PromiseUtils,
	Quad: Quad,
	Quaternion: Quaternion,
	Ray: Ray,
	Rc4Random: Rc4Random,
	Rectangle: Rectangle,
	Renderer: Renderer,
	RendererRecord: RendererRecord,
	RendererUtils: RendererUtils,
	RenderInfo: RenderInfo,
	RenderPass: RenderPass,
	RenderQueue: RenderQueue,
	RenderStats: RenderStats,
	RenderSystem: RenderSystem,
	RenderTarget: RenderTarget,
	rsvp: rsvp,
	SceneHandler: SceneHandler,
	ScriptComponent: ScriptComponent,
	Scripts: Scripts,
	ScriptSystem: ScriptSystem,
	ScriptUtils: ScriptUtils,
	Selection: Selection,
	Shader: Shader,
	ShaderBuilder: ShaderBuilder,
	ShaderCall: ShaderCall,
	ShaderFragment: ShaderFragment,
	ShaderHandler: ShaderHandler,
	ShaderLib: ShaderLib,
	ShadowHandler: ShadowHandler,
	ShapeCreatorMemoized: ShapeCreatorMemoized,
	SimpleBox: SimpleBox,
	SimplePartitioner: SimplePartitioner,
	Skybox: Skybox,
	SkyboxHandler: SkyboxHandler,
	Snow: Snow,
	Sound: Sound,
	SoundComponent: SoundComponent,
	SoundComponentHandler: SoundComponentHandler,
	SoundCreator: SoundCreator,
	SoundHandler: SoundHandler,
	SoundSystem: SoundSystem,
	Sphere: Sphere,
	Spline: Spline,
	SplineWalker: SplineWalker,
	SpotLight: SpotLight,
	Stats: Stats,
	StringUtil: StringUtil,
	StringUtils: StringUtils,
	System: System,
	SystemBus: SystemBus,
	TangentGenerator: TangentGenerator,
	TaskScheduler: TaskScheduler,
	TextComponent: TextComponent,
	TextSystem: TextSystem,
	Texture: Texture,
	TextureCreator: TextureCreator,
	TextureGrid: TextureGrid,
	TextureHandler: TextureHandler,
	TgaLoader: TgaLoader,
	Torus: Torus,
	Transform: Transform,
	TransformComponent: TransformComponent,
	TransformComponentHandler: TransformComponentHandler,
	TransformSystem: TransformSystem,
	ValueNoise: ValueNoise,
	Vector2: Vector2,
	Vector3: Vector3,
	Vector4: Vector4,
	Vector: Vector,
	World: World
};

if (typeof(window) !== 'undefined') {
	window.goo = module.exports;
}
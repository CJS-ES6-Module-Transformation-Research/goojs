Object.defineProperty(exports, "__esModule", {
				value: true
});
exports.attachChild = exports.component = exports.entity = undefined;

var _ObjectUtil = require('../../../../src/goo/util/ObjectUtil');

var EntityConfigjs = {
				entity: function entity(components) {
								components = components || ['transform'];
								var entity = this.gooObject('entity', 'Dummy');
								entity.components = {};
								for (var i = 0; i < components.length; i++) {
												entity.components[components[i]] = this.component[components[i]]();
								}
								this.addToBundle(entity);
								return entity;
				},
				component: {
								transform: function transform(translation, rotation, scale) {
												translation = translation ? translation.slice() : [0, 0, 0];
												rotation = rotation ? rotation.slice() : [0, 0, 0];
												scale = scale ? scale.slice() : [1, 1, 1];

												return {
																translation: translation,
																rotation: rotation,
																scale: scale
												};
								},
								camera: function camera(aspect, lockedRatio, far, fov, near) {
												return {
																aspect: aspect || 1,
																lockedRatio: !!lockedRatio,
																far: far || 1000,
																fov: fov || 45,
																near: near || 1
												};
								},
								light: function light(type, options) {
												var config = _ObjectUtil.ObjectUtils.copyOptions({}, options, {
																type: type || 'PointLight',
																color: [1, 1, 1],
																intensity: 1,
																shadowCaster: false,
																specularIntensity: 1
												});
												if (type !== 'DirectionalLight') {
																config.range = config.range || 1000;
												}
												if (type === 'SpotLight') {
																config.angle = config.angle || 55;
												}
												if (config.shadowCaster) {
																config.shadowSettings = config.shadowSettings || {};
																_ObjectUtil.ObjectUtils.defaults(config.shadowSettings, {
																				type: 'Blur',
																				projection: config.type === 'DirectionalLight' ? 'Parallel' : 'Perspective',
																				near: 1,
																				far: 1000,
																				resolution: [512, 512],
																				upVector: [0, 1, 0],
																				darkness: 0.5
																});
												}
												return config;
								},
								animation: function animation() {
												return {
																layersRef: this.animation().id,
																poseRef: this.skeleton().id
												};
								},
								particleSystem: function particleSystem() {
												function particleCurve() {
																return [{
																				type: 'linear',
																				offset: 0,
																				options: {
																								m: 0,
																								k: 1
																				}
																}];
												}
												return {
																seed: -1,
																shapeType: 'cone',
																sphereRadius: 1,
																sphereEmitFromShell: false,
																randomDirection: false,
																coneEmitFrom: 'base',
																boxExtents: [1, 1, 1],
																coneRadius: 1,
																coneAngle: 10,
																coneLength: 1,
																startColorR: particleCurve(),
																startColorG: particleCurve(),
																startColorB: particleCurve(),
																startColorA: particleCurve(),
																colorR: particleCurve(),
																colorG: particleCurve(),
																colorB: particleCurve(),
																colorA: particleCurve(),
																duration: 5,
																localSpace: true,
																startSpeed: particleCurve(),
																localVelocityX: particleCurve(),
																localVelocityY: particleCurve(),
																localVelocityZ: particleCurve(),
																worldVelocityX: particleCurve(),
																worldVelocityY: particleCurve(),
																worldVelocityZ: particleCurve(),
																maxParticles: 100,
																emissionRate: particleCurve(),
																startLifeTime: 5,
																renderQueue: 3010,
																alphakill: 0.5,
																loop: false,
																blending: 'TransparencyBlending',
																depthWrite: true,
																depthTest: true,
																textureTilesX: 1,
																textureTilesY: 1,
																textureAnimationSpeed: 1,
																startSize: particleCurve(),
																sortMode: 'none',
																billboard: true,
																sizeCurve: particleCurve(),
																startAngle: particleCurve(),
																rotationSpeed: particleCurve(),
																textureRef: this.texture().id
												};
								},
								meshRenderer: function meshRenderer() {
												var config = {
																cullMode: 'Dynamic',
																castShadows: true,
																receiveShadow: true,
																reflectable: true,
																materials: {}
												};
												for (var i = 2; i >= 0; i--) {
																var material = this.material();
																config.materials[material.id] = {
																				sortValue: Math.random(),
																				materialRef: material.id
																};
												}
												return config;
								},
								meshData: function meshData(shape, options) {
												if (shape) {
																return {
																				shape: shape,
																				shadeOptions: options
																};
												}
												return {
																meshRef: this.mesh().id,
																poseRef: this.skeleton().id
												};
								},
								timeline: function timeline() {
												return {
																channels: {
																				'c1': {
																								id: 'c1',
																								sortValue: 0,
																								propertyKey: 'scaleX',
																								keyframes: {
																												'k1': {
																																time: 10,
																																value: 20,
																																easing: 'Linear.None'
																												},
																												'k2': {
																																time: 100,
																																value: 50,
																																easing: 'Linear.None'
																												},
																												'k3': {
																																time: 200,
																																value: 50,
																																easing: 'Linear.None'
																												}
																								}
																				},
																				'c2': {
																								id: 'c2',
																								sortValue: 1,
																								propertyKey: 'translationY',
																								keyframes: {
																												'k1': {
																																time: 200,
																																value: 20,
																																easing: 'Linear.None'
																												},
																												'k2': {
																																time: 100,
																																value: 50,
																																easing: 'Linear.None'
																												}
																								}
																				}
																},
																loop: {
																				enabled: false
																}
												};
								},
								quad: function quad() {
												return {
																materialRef: this.material().id
												};
								},
								html: function html() {
												return {
																innerHTML: 'some html'
												};
								},
								collider: function collider(type) {
												return _ObjectUtil.ObjectUtils.defaults({}, {
																shape: type || 'Box', // Box, Cylinder, Plane, Sphere
																isTrigger: false,
																friction: 0.3,
																restitution: 0.0,
																shapeOptions: {
																				halfExtents: [1, 1, 1], // Box
																				radius: 0.5, // Sphere, Cylinder
																				height: 1 // Cylinder
																}
												});
								},
								rigidBody: function rigidBody() {
												return {
																mass: 1,
																isKinematic: false,
																velocity: [0, 0, 0],
																angularVelocity: [0, 0, 0],
																linearDrag: 0,
																angularDrag: 0
												};
								}
				},
				attachChild: function attachChild(parent, child) {
								if (!parent.components.transform.children) {
												parent.components.transform.children = {};
								}
								var size = Object.keys(parent.components.transform.children).length;
								parent.components.transform.children[child.id] = {
												entityRef: child.id,
												sortValue: size
								};
				}
};

var EntityConfigjs_entity = function EntityConfigjs_entity(components) {
				components = components || ["transform"];
				var entity = this.gooObject("entity", "Dummy");
				entity.components = {};
				for (var i = 0; i < components.length; i++) {
								entity.components[components[i]] = this.component[components[i]]();
				}
				this.addToBundle(entity);
				return entity;
};

var EntityConfigjs_component = {
				transform: function transform(translation, rotation, scale) {
								translation = translation ? translation.slice() : [0, 0, 0];
								rotation = rotation ? rotation.slice() : [0, 0, 0];
								scale = scale ? scale.slice() : [1, 1, 1];

								return {
												translation: translation,
												rotation: rotation,
												scale: scale
								};
				},

				camera: function camera(aspect, lockedRatio, far, fov, near) {
								return {
												aspect: aspect || 1,
												lockedRatio: !!lockedRatio,
												far: far || 1000,
												fov: fov || 45,
												near: near || 1
								};
				},

				light: function light(type, options) {
								var config = _ObjectUtil.ObjectUtils.copyOptions({}, options, {
												type: type || "PointLight",
												color: [1, 1, 1],
												intensity: 1,
												shadowCaster: false,
												specularIntensity: 1
								});
								if (type !== "DirectionalLight") {
												config.range = config.range || 1000;
								}
								if (type === "SpotLight") {
												config.angle = config.angle || 55;
								}
								if (config.shadowCaster) {
												config.shadowSettings = config.shadowSettings || {};
												_ObjectUtil.ObjectUtils.defaults(config.shadowSettings, {
																type: "Blur",
																projection: config.type === "DirectionalLight" ? "Parallel" : "Perspective",
																near: 1,
																far: 1000,
																resolution: [512, 512],
																upVector: [0, 1, 0],
																darkness: 0.5
												});
								}
								return config;
				},

				animation: function animation() {
								return {
												layersRef: this.animation().id,
												poseRef: this.skeleton().id
								};
				},

				particleSystem: function particleSystem() {
								function particleCurve() {
												return [{
																type: "linear",
																offset: 0,

																options: {
																				m: 0,
																				k: 1
																}
												}];
								}
								return {
												seed: -1,
												shapeType: "cone",
												sphereRadius: 1,
												sphereEmitFromShell: false,
												randomDirection: false,
												coneEmitFrom: "base",
												boxExtents: [1, 1, 1],
												coneRadius: 1,
												coneAngle: 10,
												coneLength: 1,
												startColorR: particleCurve(),
												startColorG: particleCurve(),
												startColorB: particleCurve(),
												startColorA: particleCurve(),
												colorR: particleCurve(),
												colorG: particleCurve(),
												colorB: particleCurve(),
												colorA: particleCurve(),
												duration: 5,
												localSpace: true,
												startSpeed: particleCurve(),
												localVelocityX: particleCurve(),
												localVelocityY: particleCurve(),
												localVelocityZ: particleCurve(),
												worldVelocityX: particleCurve(),
												worldVelocityY: particleCurve(),
												worldVelocityZ: particleCurve(),
												maxParticles: 100,
												emissionRate: particleCurve(),
												startLifeTime: 5,
												renderQueue: 3010,
												alphakill: 0.5,
												loop: false,
												blending: "TransparencyBlending",
												depthWrite: true,
												depthTest: true,
												textureTilesX: 1,
												textureTilesY: 1,
												textureAnimationSpeed: 1,
												startSize: particleCurve(),
												sortMode: "none",
												billboard: true,
												sizeCurve: particleCurve(),
												startAngle: particleCurve(),
												rotationSpeed: particleCurve(),
												textureRef: this.texture().id
								};
				},

				meshRenderer: function meshRenderer() {
								var config = {
												cullMode: "Dynamic",
												castShadows: true,
												receiveShadow: true,
												reflectable: true,
												materials: {}
								};
								for (var i = 2; i >= 0; i--) {
												var material = this.material();
												config.materials[material.id] = {
																sortValue: Math.random(),
																materialRef: material.id
												};
								}
								return config;
				},

				meshData: function meshData(shape, options) {
								if (shape) {
												return {
																shape: shape,
																shadeOptions: options
												};
								}
								return {
												meshRef: this.mesh().id,
												poseRef: this.skeleton().id
								};
				},

				timeline: function timeline() {
								return {
												channels: {
																"c1": {
																				id: "c1",
																				sortValue: 0,
																				propertyKey: "scaleX",

																				keyframes: {
																								"k1": {
																												time: 10,
																												value: 20,
																												easing: "Linear.None"
																								},

																								"k2": {
																												time: 100,
																												value: 50,
																												easing: "Linear.None"
																								},

																								"k3": {
																												time: 200,
																												value: 50,
																												easing: "Linear.None"
																								}
																				}
																},

																"c2": {
																				id: "c2",
																				sortValue: 1,
																				propertyKey: "translationY",

																				keyframes: {
																								"k1": {
																												time: 200,
																												value: 20,
																												easing: "Linear.None"
																								},

																								"k2": {
																												time: 100,
																												value: 50,
																												easing: "Linear.None"
																								}
																				}
																}
												},

												loop: {
																enabled: false
												}
								};
				},

				quad: function quad() {
								return {
												materialRef: this.material().id
								};
				},

				html: function html() {
								return {
												innerHTML: "some html"
								};
				},

				collider: function collider(type) {
								return _ObjectUtil.ObjectUtils.defaults({}, {
												// Box, Cylinder, Plane, Sphere
												shape: type || "Box",

												isTrigger: false,
												friction: 0.3,
												restitution: 0.0,

												shapeOptions: {
																// Box
																halfExtents: [1, 1, 1],

																// Sphere, Cylinder
																radius: 0.5,

																// Cylinder
																height: 1
												}
								});
				},

				rigidBody: function rigidBody() {
								return {
												mass: 1,
												isKinematic: false,
												velocity: [0, 0, 0],
												angularVelocity: [0, 0, 0],
												linearDrag: 0,
												angularDrag: 0
								};
				}
};

var EntityConfigjs_attachChild = function EntityConfigjs_attachChild(parent, child) {
				if (!parent.components.transform.children) {
								parent.components.transform.children = {};
				}
				var size = Object.keys(parent.components.transform.children).length;
				parent.components.transform.children[child.id] = {
								entityRef: child.id,
								sortValue: size
				};
};

exports.entity = EntityConfigjs_entity;
exports.component = EntityConfigjs_component;
exports.attachChild = EntityConfigjs_attachChild;

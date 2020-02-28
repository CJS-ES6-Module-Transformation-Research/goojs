var _DirectionalLight = require("../../../src/goo/renderer/light/DirectionalLight");

var _Texture = require("../../../src/goo/renderer/Texture");

var _Camera = require("../../../src/goo/renderer/Camera");

var _Box = require("../../../src/goo/shapes/Box");

var _Material = require("../../../src/goo/renderer/Material");

var _MeshData = require("../../../src/goo/renderer/MeshData");

var _Shader = require("../../../src/goo/renderer/Shader");

var _ShaderLib = require("../../../src/goo/renderer/shaders/ShaderLib");

var _ShaderCall = require("../../../src/goo/renderer/ShaderCall");

var _RendererRecord = require("../../../src/goo/renderer/RendererRecord");

var _ObjectUtils = require("../../../src/goo/util/ObjectUtils");

(function () {
	describe('Shader', function () {
		describe('DefineKey', function () {
			var shader;
			beforeEach(function () {
				shader = new _Shader.Shader('TestName', (0, _ObjectUtils.clone)(_ShaderLib.simple));
			});

			it('can generate define key when no defines', function () {
				var defineIndices = [];
				var key = shader.getDefineKey(defineIndices);
				expect(key).toEqual('Key:TestName');
				expect(defineIndices).toEqual([]);
			});

			it('can generate define key with one define', function () {
				var defineIndices = [];

				shader.setDefine('TEST_DEFINE', true);

				var key = shader.getDefineKey(defineIndices);
				expect(key).toEqual('Key:TestName_0:true');
				expect(defineIndices).toEqual(['TEST_DEFINE']);
			});

			it('can generate define key with various define types (added)', function () {
				var defineIndices = [];

				shader.setDefine('TEST_DEFINE1', true);
				shader.setDefine('TEST_DEFINE2', 5);

				var key = shader.getDefineKey(defineIndices);
				expect(key).toEqual('Key:TestName_0:true_1:5');
				expect(defineIndices).toEqual(['TEST_DEFINE1', 'TEST_DEFINE2']);
			});

			it('can generate define key with various define types (added+removed)', function () {
				var defineIndices = [];

				shader.setDefine('TEST_DEFINE1', true);
				shader.setDefine('TEST_DEFINE2', 5);
				shader.removeDefine('TEST_DEFINE1');

				var key = shader.getDefineKey(defineIndices);
				expect(key).toEqual('Key:TestName_0:5');
				expect(defineIndices).toEqual(['TEST_DEFINE2']);
			});

			it('only re-generate key when dirty', function () {
				var defineIndices = [];

				shader.defineKey = 'unset';

				shader.setDefine('TEST_DEFINE1', true);

				var key = shader.getDefineKey(defineIndices);

				expect(key).toEqual('Key:TestName_0:true');

				shader.defineKey = 'unset';

				key = shader.getDefineKey(defineIndices);

				expect(key).toEqual('unset');
			});
		});

		describe('ShaderCall', function () {
			var context;

			beforeEach(function () {
				context = createContext();
			});

			var testSingleCall = function testSingleCall(shaderCall, method, value) {
				shaderCall.call(value);
				expect(method).toHaveBeenCalled();
				var args = method.calls.mostRecent().args;
				expect(args[args.length - 1]).toEqual(value);
			};

			var testShaderCall = function testShaderCall(context, method, type, value1, value2) {
				var shaderCall = new _ShaderCall.ShaderCall(context, {}, type);
				spyOn(context, method);

				// check that methods are correctly called for value1
				testSingleCall(shaderCall, context[method], value1);

				context[method].calls.reset();

				// check that no methods are called due to same value opt
				shaderCall.call(value1);
				expect(context[method]).not.toHaveBeenCalled();

				context[method].calls.reset();

				// check that methods are correctly called for value2
				testSingleCall(shaderCall, context[method], value2);
			};

			it('can optimize calls to ShaderCall uniforms', function () {
				testShaderCall(context, 'uniform1f', 'float', 2.3, 5.5);
				testShaderCall(context, 'uniform1i', 'int', 5, 8);

				// arrays
				testShaderCall(context, 'uniform1iv', 'intarray', [1, 2], [3, 4]);
				testShaderCall(context, 'uniform2iv', 'ivec2', [1, 2], [3, 4]);
				testShaderCall(context, 'uniform3iv', 'ivec3', [1, 2, 3], [3, 4, 5]);
				testShaderCall(context, 'uniform4iv', 'ivec4', [1, 2, 3, 4], [3, 4, 5, 6]);

				testShaderCall(context, 'uniform1fv', 'floatarray', [1.2, 2.3], [3.4, 4.5]);
				testShaderCall(context, 'uniform2fv', 'vec2', [1.2, 2.3], [3.4, 4.5]);
				testShaderCall(context, 'uniform3fv', 'vec3', [1.2, 2.3, 3.4], [3.4, 4.5, 5.6]);
				testShaderCall(context, 'uniform4fv', 'vec4', [1.2, 2.3, 3.4, 4.5], [3.4, 4.5, 5.6, 6.7]);

				testShaderCall(context, 'uniformMatrix2fv', 'mat2', [1.2, 2.3, 3.4, 4.5], [3.4, 4.5, 5.6, 6.7]);
				testShaderCall(context, 'uniformMatrix3fv', 'mat3', [1, 2, 3, 4, 5, 6, 7, 8, 9], [1.1, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1, 8.1, 9.1]);
				testShaderCall(context, 'uniformMatrix4fv', 'mat4', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], [1.1, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1, 8.1, 9.1, 10.1, 11.1, 12.1, 13.1, 14.1, 15.1, 16.1]);
			});
		});
		describe('Build and compile shader', function () {
			var createRenderer = function createRenderer() {
				return {
					context: createContext(),
					bindVertexAttribute: function bindVertexAttribute() {},
					rendererRecord: new _RendererRecord.RendererRecord()
				};
			};

			var createShaderInfo = function createShaderInfo(shaderDefinition) {
				var material = new _Material.Material('test', shaderDefinition);
				material.setTexture(Shaderjs_DIFFUSE_MAP, new _Texture.Texture());
				var renderer = createRenderer(shaderDefinition);
				return {
					meshData: new _Box.Box(),
					material: material,
					lights: [new _DirectionalLight.DirectionalLight()],
					camera: new _Camera.Camera(),
					renderer: renderer
				};
			};

			var updateShader = function updateShader(shaderInfo) {
				var shader = shaderInfo.material.shader;
				shader.updateProcessors(shaderInfo);
				if (shader.builder) {
					shader.builder(shader, shaderInfo);
				}
				shader.apply(shaderInfo, shaderInfo.renderer);
			};

			it('has applied the correct mappings to simple shader (simple)', function () {
				var shaderDefinition = miniShaderDefinition();
				var shaderInfo = createShaderInfo(shaderDefinition);
				updateShader(shaderInfo);

				spyOn(shaderInfo.renderer.context, 'uniform1i').and.callThrough();
				spyOn(shaderInfo.renderer.context, 'uniform1f').and.callThrough();
				spyOn(shaderInfo.renderer.context, 'uniformMatrix4fv').and.callThrough();

				var shader = shaderInfo.material.shader;

				expect(shader.attributes).toEqual(shaderDefinition.attributes);

				// all matched uniforms should equal the shader definition uniforms
				expect(shader.matchedUniforms).toContain('viewProjectionMatrix');
				expect(shader.matchedUniforms).toContain('worldMatrix');

				// textures should be zero even though material has a texture since the shader does not
				expect(shader.textureSlots.length).toEqual(0);

				// add a uniform that does not exist in shader (and should not be matched)
				shader.uniforms.doesNotExist = 1;
				shader.rebuild();
				updateShader(shaderInfo);

				expect(shader.matchedUniforms).not.toContain('doesNotExist');

				// check that the ShaderCalls have been executed
				expect(shaderInfo.renderer.context.uniform1i.calls.count()).toEqual(0);
				expect(shaderInfo.renderer.context.uniform1f.calls.count()).toEqual(0);
				expect(shaderInfo.renderer.context.uniformMatrix4fv.calls.count()).toEqual(2);

				// add a uniform that does exist in shader (and should be matched)
				shader.uniforms.doesExist = 1;
				shader.rebuild();
				updateShader(shaderInfo);

				expect(shader.matchedUniforms).toContain('doesExist');

				// check that the ShaderCalls have been executed
				expect(shaderInfo.renderer.context.uniform1i.calls.count()).toEqual(0);
				expect(shaderInfo.renderer.context.uniform1f.calls.count()).toEqual(1);
				expect(shaderInfo.renderer.context.uniform1f).toHaveBeenCalledWith({ value: 1 }, 1);
				expect(shaderInfo.renderer.context.uniformMatrix4fv.calls.count()).toEqual(4);
			});

			it('has applied the correct mappings to complex shader (uber)', function () {
				var shaderDefinition = _ShaderLib.uber;
				var shaderInfo = createShaderInfo(shaderDefinition);

				spyOn(shaderInfo.renderer.context, 'uniform1i').and.callThrough();
				spyOn(shaderInfo.renderer.context, 'uniform1f').and.callThrough();
				spyOn(shaderInfo.renderer.context, 'uniform4fv').and.callThrough();
				spyOn(shaderInfo.renderer.context, 'uniformMatrix3fv').and.callThrough();
				spyOn(shaderInfo.renderer.context, 'uniformMatrix4fv').and.callThrough();

				updateShader(shaderInfo);
				var shader = shaderInfo.material.shader;

				expect(shader.attributes).toEqual(shaderDefinition.attributes);

				// all matched uniforms should equal the shader definition uniforms
				expect(shader.matchedUniforms).toContain('viewProjectionMatrix');
				expect(shader.matchedUniforms).toContain('worldMatrix');

				// 10 sample2d slots in uber shader
				expect(shader.textureSlots.length).toEqual(10);

				// check that the ShaderCalls have been executed
				expect(shaderInfo.renderer.context.uniform1i.calls.count()).toEqual(10);
				expect(shaderInfo.renderer.context.uniform1f.calls.count()).toEqual(9);
				expect(shaderInfo.renderer.context.uniform4fv.calls.count()).toEqual(2);
				expect(shaderInfo.renderer.context.uniformMatrix3fv.calls.count()).toEqual(1);
				expect(shaderInfo.renderer.context.uniformMatrix4fv.calls.count()).toEqual(2);
			});
		});

		describe('investigateShader', function () {
			var target;

			beforeEach(function () {
				target = {
					uniforms: {},
					attributeMapping: {},
					uniformMapping: {},
					textureSlots: [],
					textureSlotsNaming: {}
				};
			});

			it('can parse a uniform declaration', function () {
				var source = 'uniform vec3 foo;';
				Shaderjs_investigateShader(source, target);
				expect(target.uniformMapping).toEqual({
					foo: {
						format: 'vec3'
					}
				});
			});

			it('can parse an attribute declaration', function () {
				var source = 'attribute float foo;';
				Shaderjs_investigateShader(source, target);
				expect(target.attributeMapping).toEqual({
					foo: {
						format: 'float'
					}
				});
			});

			it('can parse a texture sampler', function () {
				var source = 'uniform sampler2D tex;';
				Shaderjs_investigateShader(source, target);
				expect(target.uniformMapping).toEqual({
					tex: {
						format: 'sampler2D'
					}
				});
				expect(target.textureSlots).toEqual([{
					format: 'sampler2D',
					name: 'tex',
					mapping: undefined,
					index: 0
				}]);
			});
		});
	});

	function createContext() {
		return {
			createShader: function createShader() /*type*/{
				return {};
			},
			shaderSource: function shaderSource() /*shader, source*/{},
			compileShader: function compileShader() /*shader*/{},
			getShaderParameter: function getShaderParameter() /*shader, parameter*/{
				return true;
			},
			getProgramParameter: function getProgramParameter() /*shader, parameter*/{
				return true;
			},
			getShaderInfoLog: function getShaderInfoLog() /*shader*/{
				return '';
			},
			getProgramInfoLog: function getProgramInfoLog() /*shader*/{
				return '';
			},
			createProgram: function createProgram() /*shader*/{
				return {};
			},
			getError: function getError() {
				return 0;
			},
			attachShader: function attachShader() /*program, source*/{},
			linkProgram: function linkProgram() /*program*/{},
			useProgram: function useProgram() /*program*/{},

			getAttribLocation: function getAttribLocation() /*program, key*/{
				return {};
			},
			getUniformLocation: function getUniformLocation() /*program, key*/{
				return {};
			},

			uniform1f: function uniform1f() /*location, v0*/{},
			uniform1i: function uniform1i() /*location, v0*/{},
			uniform2f: function uniform2f() /*location, v0, v1*/{},
			uniform2i: function uniform2i() /*location, v0, v1*/{},
			uniform3f: function uniform3f() /*location, v0, v1, v2*/{},
			uniform3i: function uniform3i() /*location, v0, v1, v2*/{},
			uniform4f: function uniform4f() /*location, v0, v1, v2, v3*/{},
			uniform4i: function uniform4i() /*location, v0, v1, v2, v3*/{},

			uniform1iv: function uniform1iv() /*location, values*/{},
			uniform2iv: function uniform2iv() /*location, values*/{},
			uniform3iv: function uniform3iv() /*location, values*/{},
			uniform4iv: function uniform4iv() /*location, values*/{},

			uniform1fv: function uniform1fv() /*location, values*/{},
			uniform2fv: function uniform2fv() /*location, values*/{},
			uniform3fv: function uniform3fv() /*location, values*/{},
			uniform4fv: function uniform4fv() /*location, values*/{},

			uniformMatrix2fv: function uniformMatrix2fv() /*location, transpose, data*/{},
			uniformMatrix3fv: function uniformMatrix3fv() /*location, transpose, data*/{},
			uniformMatrix4fv: function uniformMatrix4fv() /*location, transpose, data*/{}
		};
	}

	function miniShaderDefinition() {
		return {
			attributes: {
				vertexPosition: MeshDatajs_POSITION
			},
			uniforms: {
				viewProjectionMatrix: Shaderjs_VIEW_PROJECTION_MATRIX,
				worldMatrix: Shaderjs_WORLD_MATRIX
			},
			vshader: ['attribute vec3 vertexPosition;', 'uniform mat4 viewProjectionMatrix;', 'uniform mat4 worldMatrix;', 'uniform float doesExist;', 'varying float test;', 'void main(void) {', 'gl_Position = viewProjectionMatrix * worldMatrix * vec4(vertexPosition, 1.0);', '}'].join('\n'),
			fshader: ['varying float test;', 'void main(void)', '{', 'gl_FragColor = vec4(test);', '}'].join('\n')
		};
	}
})();

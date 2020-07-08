import { MeshData as rendererMeshData_MeshDatajs } from "../../renderer/MeshData";
import { Shader as rendererShader_Shaderjs } from "../../renderer/Shader";
import { methods as ShaderFragmentjs_methods } from "../../renderer/shaders/ShaderFragment";

import {
    uber as ShaderBuilderjs_uber,
    light as ShaderBuilderjs_light,
    animation as ShaderBuilderjs_animation,
} from "../../renderer/shaders/ShaderBuilder";

var ShaderLib_pickingShader;
var ShaderLib_lightDepth;
var ShaderLib_downsample;
var ShaderLib_point;
var ShaderLib_normalmap;
var ShaderLib_particles;
var ShaderLib_showNormals;
var ShaderLib_convolution;
var ShaderLib_texturedLit;
var ShaderLib_textured;
var ShaderLib_simpleLit;
var ShaderLib_simpleColored;
var ShaderLib_simple;
var ShaderLib_copyPure;
var ShaderLib_copy;
var ShaderLib_screenCopy;
var ShaderLib_uber;

/**
 * Collection of useful shaders<br>
 * Details of each can be printed like this for example: console.log(ShaderLib.texturedLit).<br>
 * There are more special purpose shaders in {@link ShaderLibExtra}
 */
function ShaderLib() {}

/**
 * The uber shader is the default Goo shader supporting the most common realistic render features.
 * It supports lights, animations, reflective materials, normal, diffuse, AO and light textures, transparency, fog and shadows.
 */
ShaderLib_uber = {
    processors: [
        ShaderBuilderjs_uber.processor,
        ShaderBuilderjs_light.processor,
        ShaderBuilderjs_animation.processor
    ],

    attributes: {
        vertexPosition: rendererMeshData_MeshDatajs.POSITION,
        vertexNormal: rendererMeshData_MeshDatajs.NORMAL,
        vertexTangent: rendererMeshData_MeshDatajs.TANGENT,
        vertexColor: rendererMeshData_MeshDatajs.COLOR,
        vertexUV0: rendererMeshData_MeshDatajs.TEXCOORD0,
        vertexUV1: rendererMeshData_MeshDatajs.TEXCOORD1,
        vertexJointIDs: rendererMeshData_MeshDatajs.JOINTIDS,
        vertexWeights: rendererMeshData_MeshDatajs.WEIGHTS
    },

    uniforms: {
        viewProjectionMatrix: rendererShader_Shaderjs.VIEW_PROJECTION_MATRIX,
        worldMatrix: rendererShader_Shaderjs.WORLD_MATRIX,
        normalMatrix: rendererShader_Shaderjs.NORMAL_MATRIX,
        cameraPosition: rendererShader_Shaderjs.CAMERA,
        diffuseMap: rendererShader_Shaderjs.DIFFUSE_MAP,
        offsetRepeat: [0, 0, 1, 1],
        normalMap: rendererShader_Shaderjs.NORMAL_MAP,
        normalMultiplier: 1.0,
        specularMap: rendererShader_Shaderjs.SPECULAR_MAP,
        emissiveMap: rendererShader_Shaderjs.EMISSIVE_MAP,
        aoMap: rendererShader_Shaderjs.AO_MAP,
        lightMap: rendererShader_Shaderjs.LIGHT_MAP,
        environmentCube: "ENVIRONMENT_CUBE",
        environmentSphere: "ENVIRONMENT_SPHERE",
        reflectionMap: "REFLECTION_MAP",
        transparencyMap: "TRANSPARENCY_MAP",
        opacity: 1.0,
        reflectivity: 0.0,
        refractivity: 0.0,
        etaRatio: -0.5,
        fresnel: 0.0,
        discardThreshold: -0.01,
        fogSettings: [0, 10000],
        fogColor: [1, 1, 1],
        vertexColorAmount: 1.0,
        lodBias: 0.0,
        wrapSettings: [0.5, 0.0]
    },

    builder: function(shader, shaderInfo) {
        ShaderBuilderjs_light.builder(shader, shaderInfo);
    },

    vshader: function() {
        return [
            "attribute vec3 vertexPosition;",
            "#ifdef NORMAL",
            "attribute vec3 vertexNormal;",
            "#endif",
            "#ifdef TANGENT",
            "attribute vec4 vertexTangent;",
            "#endif",
            "#ifdef COLOR",
            "attribute vec4 vertexColor;",
            "#endif",
            "#ifdef TEXCOORD0",
            "attribute vec2 vertexUV0;",
            "uniform vec4 offsetRepeat;",
            "varying vec2 texCoord0;",
            "#endif",
            "#ifdef TEXCOORD1",
            "attribute vec2 vertexUV1;",
            "varying vec2 texCoord1;",
            "#endif",
            "uniform mat4 viewProjectionMatrix;",
            "uniform mat4 worldMatrix;",
            "uniform mat3 normalMatrix;",
            "uniform vec3 cameraPosition;",
            "varying vec3 vWorldPos;",
            "varying vec3 viewPosition;",
            "#ifdef NORMAL",
            "varying vec3 normal;",
            "#endif",
            "#ifdef TANGENT",
            "varying vec3 binormal;",
            "varying vec3 tangent;",
            "#endif",
            "#ifdef COLOR",
            "varying vec4 color;",
            "#endif",
            ShaderBuilderjs_light.prevertex,
            ShaderBuilderjs_animation.prevertex,
            "void main(void) {",
            "mat4 wMatrix = worldMatrix;",
            "#ifdef NORMAL",
            "mat3 nMatrix = normalMatrix;",
            "#endif",
            ShaderBuilderjs_animation.vertex,
            "vec4 worldPos = wMatrix * vec4(vertexPosition, 1.0);",
            "vWorldPos = worldPos.xyz;",
            "gl_Position = viewProjectionMatrix * worldPos;",
            "viewPosition = cameraPosition - worldPos.xyz;",
            "#ifdef NORMAL",
            "\tnormal = normalize(nMatrix * vertexNormal);",
            "#endif",
            "#ifdef TANGENT",
            "\ttangent = normalize(nMatrix * vertexTangent.xyz);",
            "\tbinormal = cross(normal, tangent) * vec3(vertexTangent.w);",
            "#endif",
            "#ifdef COLOR",
            "\tcolor = vertexColor;",
            "#endif",
            "#ifdef TEXCOORD0",
            "\ttexCoord0 = vertexUV0 * offsetRepeat.zw + offsetRepeat.xy;",
            "#endif",
            "#ifdef TEXCOORD1",
            "\ttexCoord1 = vertexUV1;",
            "#endif",
            ShaderBuilderjs_light.vertex,
            "}"
        ].join("\n");
    },

    fshader: function() {
        return [
            "uniform float lodBias;",
            "#ifdef DIFFUSE_MAP",
            "uniform sampler2D diffuseMap;",
            "#endif",
            "#ifdef NORMAL_MAP",
            "uniform sampler2D normalMap;",
            "uniform float normalMultiplier;",
            "#endif",
            "#ifdef SPECULAR_MAP",
            "uniform sampler2D specularMap;",
            "#endif",
            "#ifdef EMISSIVE_MAP",
            "uniform sampler2D emissiveMap;",
            "#endif",
            "#ifdef AO_MAP",
            "uniform sampler2D aoMap;",
            "#endif",
            "#ifdef LIGHT_MAP",
            "uniform sampler2D lightMap;",
            "#endif",
            "#ifdef TRANSPARENCY_MAP",
            "uniform sampler2D transparencyMap;",
            "#endif",
            "#ifdef REFLECTIVE",
            "#ifdef ENVIRONMENT_CUBE",
            "uniform samplerCube environmentCube;",
            "#elif defined(ENVIRONMENT_SPHERE)",
            "uniform sampler2D environmentSphere;",
            "#endif",
            "uniform vec4 clearColor;",
            "uniform float reflectivity;",
            "uniform float fresnel;",
            "uniform float refractivity;",
            "uniform float etaRatio;",
            "#ifdef REFLECTION_MAP",
            "uniform sampler2D reflectionMap;",
            "#endif",
            "#endif",
            "#ifdef OPACITY",
            "uniform float opacity;",
            "#endif",
            "#ifdef DISCARD",
            "uniform float discardThreshold;",
            "#endif",
            "#ifdef FOG",
            "uniform vec2 fogSettings;",
            "uniform vec3 fogColor;",
            "#endif",
            "varying vec3 vWorldPos;",
            "varying vec3 viewPosition;",
            "#ifdef NORMAL",
            "varying vec3 normal;",
            "#endif",
            "#ifdef TANGENT",
            "varying vec3 binormal;",
            "varying vec3 tangent;",
            "#endif",
            "#ifdef COLOR",
            "varying vec4 color;",
            "uniform float vertexColorAmount;",
            "#endif",
            "#ifdef TEXCOORD0",
            "varying vec2 texCoord0;",
            "#endif",
            "#ifdef TEXCOORD1",
            "varying vec2 texCoord1;",
            "#endif",
            "#define M_PI 3.14159265358979323846264338328",
            ShaderBuilderjs_light.prefragment,
            "void main(void)",
            "{",
            "vec4 final_color = vec4(1.0);",
            "#if defined(DIFFUSE_MAP) && defined(TEXCOORD0)",
            "final_color *= texture2D(diffuseMap, texCoord0, lodBias);",
            "#endif",
            "#ifdef COLOR",
            "final_color *= mix(vec4(1.0), color, vertexColorAmount);",
            "#endif",
            "#if defined(TRANSPARENCY_MAP) && defined(TEXCOORD0)",
            "#ifdef TRANSPARENCY_BW",
            "final_color.a = texture2D(transparencyMap, texCoord0).r;",
            "#else",
            "final_color.a = texture2D(transparencyMap, texCoord0).a;",
            "#endif",
            "#endif",
            "#ifdef OPACITY",
            "final_color.a *= opacity;",
            "#endif",
            "#ifdef DISCARD",
            "if (final_color.a < discardThreshold) discard;",
            "#endif",
            "#ifdef AO_MAP",
            "#ifdef TEXCOORD1",
            "final_color.rgb *= texture2D(aoMap, texCoord1).rgb;",
            "#elif defined(TEXCOORD0)",
            "final_color.rgb *= texture2D(aoMap, texCoord0).rgb;",
            "#endif",
            "#endif",
            "#ifdef LIGHT_MAP",
            "#ifdef TEXCOORD1",
            "final_color.rgb *= texture2D(lightMap, texCoord1).rgb * 2.0;",
            "#elif defined(TEXCOORD0)",
            "final_color.rgb *= texture2D(lightMap, texCoord0).rgb * 2.0;",
            "#endif",
            "#else",
            "vec3 N = vec3(0.0, 1.0, 0.0);",
            // Do nasty doublework for IE compliance
            "#if defined(NORMAL)",
            "N = normalize(normal);",
            "#endif",
            "#if defined(TANGENT) && defined(NORMAL_MAP) && defined(TEXCOORD0)",
            "mat3 tangentToWorld = mat3(tangent, binormal, normal);",
            "vec3 tangentNormal = texture2D(normalMap, texCoord0, lodBias).xyz * vec3(2.0) - vec3(1.0);",
            "tangentNormal = mix(vec3(0.0, 0.0, 1.0), tangentNormal, normalMultiplier);",
            "vec3 worldNormal = (tangentToWorld * tangentNormal);",
            "N = normalize(worldNormal);",
            "#endif",
            "N = N * (-1.0 + 2.0 * float(gl_FrontFacing));",
            ShaderBuilderjs_light.fragment,
            "#endif",
            "#ifdef REFLECTIVE",
            "if (refractivity > 0.0) {",
            "vec4 environment = vec4(0.0);",
            "#ifdef ENVIRONMENT_CUBE",
            "vec3 refractionVector = refract(normalize(viewPosition), N, etaRatio);",
            "refractionVector.x = -refractionVector.x;",
            "environment = textureCube(environmentCube, refractionVector);",
            "#elif defined(ENVIRONMENT_SPHERE)",
            "vec3 refractionVector = refract(normalize(viewPosition), N, etaRatio);",
            "refractionVector = -refractionVector;",
            "float xx = (atan(refractionVector.z, refractionVector.x) + M_PI) / (2.0 * M_PI);",
            "float yy = refractionVector.y * 0.5 + 0.5;",
            "environment = texture2D(environmentSphere, vec2(xx, yy));",
            "#endif",
            "environment.rgb = mix(clearColor.rgb, environment.rgb, environment.a);",
            "final_color.rgb = mix(final_color.rgb, environment.rgb, refractivity);",
            "}",
            "if (reflectivity > 0.0) {",
            "vec4 environment = vec4(0.0);",
            "#ifdef ENVIRONMENT_CUBE",
            "vec3 reflectionVector = reflect(normalize(viewPosition), N);",
            "reflectionVector.yz = -reflectionVector.yz;",
            "environment = textureCube(environmentCube, reflectionVector);",
            "#elif defined(ENVIRONMENT_SPHERE)",
            "vec3 reflectionVector = reflect(normalize(viewPosition), N);",
            "float xx = (atan(reflectionVector.z, reflectionVector.x) + M_PI) / (2.0 * M_PI);",
            "float yy = reflectionVector.y * 0.5 + 0.5;",
            "environment = texture2D(environmentSphere, vec2(xx, yy));",
            "#endif",
            "environment.rgb = mix(clearColor.rgb, environment.rgb, environment.a);",
            "float reflectionAmount = reflectivity;",
            "#if defined(REFLECTION_MAP) && defined(TEXCOORD0)",
            "reflectionAmount *= texture2D(reflectionMap, texCoord0).r;",
            "#endif",
            "float fresnelVal = pow(1.0 - abs(dot(normalize(viewPosition), N)), fresnel * 4.0);",
            "reflectionAmount *= fresnelVal;",
            "#if REFLECTION_TYPE == 0",
            "final_color.rgb = mix(final_color.rgb, environment.rgb, reflectionAmount);",
            "#elif REFLECTION_TYPE == 1",
            "final_color.rgb += environment.rgb * reflectionAmount;",
            "#elif REFLECTION_TYPE == 2",
            "final_color.rgb *= environment.rgb * reflectionAmount;",
            "#endif",
            "final_color.a = min(final_color.a + reflectionAmount, 1.0);",
            "}",
            "#endif",
            "#ifndef LIGHT_MAP",
            "final_color.rgb += totalSpecular;",
            "final_color.a = min(final_color.a + length(totalSpecular) / 3.0, 1.0);",
            "#endif",
            "#ifdef FOG",
            "float d = pow(smoothstep(fogSettings.x, fogSettings.y, length(viewPosition)), 1.0);",
            "final_color.rgb = mix(final_color.rgb, fogColor, d);",
            "#endif",
            "gl_FragColor = final_color;",
            "}"
        ].join("\n");
    }
};;

// only terrain depends on this
ShaderLib_screenCopy = {
    attributes: {
        vertexPosition: rendererMeshData_MeshDatajs.POSITION,
        vertexUV0: rendererMeshData_MeshDatajs.TEXCOORD0
    },

    uniforms: {
        diffuseMap: rendererShader_Shaderjs.DIFFUSE_MAP
    },

    vshader: [
        "attribute vec3 vertexPosition;",
        "attribute vec2 vertexUV0;",
        "varying vec2 texCoord0;",
        "void main(void) {",
        "texCoord0 = vertexUV0;",
        "gl_Position = vec4(vertexPosition, 1.0);",
        "}"
    ].join("\n"),

    fshader: [
        "uniform sampler2D diffuseMap;",
        "varying vec2 texCoord0;",
        "void main(void)",
        "{",
        "gl_FragColor = texture2D(diffuseMap, texCoord0);",
        "}"
    ].join("\n")
};;

ShaderLib_copy = {
    attributes: {
        vertexPosition: rendererMeshData_MeshDatajs.POSITION,
        vertexUV0: rendererMeshData_MeshDatajs.TEXCOORD0
    },

    uniforms: {
        viewProjectionMatrix: rendererShader_Shaderjs.VIEW_PROJECTION_MATRIX,
        worldMatrix: rendererShader_Shaderjs.WORLD_MATRIX,
        opacity: 1.0,
        diffuseMap: rendererShader_Shaderjs.DIFFUSE_MAP
    },

    vshader: [
        "attribute vec3 vertexPosition;",
        "attribute vec2 vertexUV0;",
        "uniform mat4 viewProjectionMatrix;",
        "uniform mat4 worldMatrix;",
        "varying vec2 texCoord0;",
        "void main(void) {",
        "texCoord0 = vertexUV0;",
        "gl_Position = viewProjectionMatrix * (worldMatrix * vec4(vertexPosition, 1.0));",
        "}"
    ].join("\n"),

    fshader: [
        "uniform sampler2D diffuseMap;",
        "uniform float opacity;",
        "varying vec2 texCoord0;",
        "void main(void)",
        "{",
        "gl_FragColor = vec4(texture2D(diffuseMap, texCoord0).rgb, opacity);",
        "}"
    ].join("\n")
};;

ShaderLib_copyPure = {
    attributes: {
        vertexPosition: rendererMeshData_MeshDatajs.POSITION,
        vertexUV0: rendererMeshData_MeshDatajs.TEXCOORD0
    },

    uniforms: {
        viewProjectionMatrix: rendererShader_Shaderjs.VIEW_PROJECTION_MATRIX,
        worldMatrix: rendererShader_Shaderjs.WORLD_MATRIX,
        opacity: 1.0,
        diffuseMap: rendererShader_Shaderjs.DIFFUSE_MAP
    },

    vshader: [
        "attribute vec3 vertexPosition;",
        "attribute vec2 vertexUV0;",
        "uniform mat4 viewProjectionMatrix;",
        "uniform mat4 worldMatrix;",
        "varying vec2 texCoord0;",
        "void main(void) {",
        "texCoord0 = vertexUV0;",
        "gl_Position = viewProjectionMatrix * (worldMatrix * vec4(vertexPosition, 1.0));",
        "}"
    ].join("\n"),

    fshader: [
        "uniform sampler2D diffuseMap;",
        "uniform float opacity;",
        "varying vec2 texCoord0;",
        "void main(void)",
        "{",
        "vec4 col = texture2D(diffuseMap, texCoord0);",
        "gl_FragColor = vec4(col.rgb, col.a * opacity);",
        "}"
    ].join("\n")
};;

ShaderLib_simple = {
    attributes: {
        vertexPosition: rendererMeshData_MeshDatajs.POSITION
    },

    uniforms: {
        viewProjectionMatrix: rendererShader_Shaderjs.VIEW_PROJECTION_MATRIX,
        worldMatrix: rendererShader_Shaderjs.WORLD_MATRIX
    },

    vshader: [
        "attribute vec3 vertexPosition;",
        "uniform mat4 viewProjectionMatrix;",
        "uniform mat4 worldMatrix;",
        "void main(void) {",
        "gl_Position = viewProjectionMatrix * (worldMatrix * vec4(vertexPosition, 1.0));",
        "}"
    ].join("\n"),

    fshader: ["void main(void)", "{", "gl_FragColor = vec4(1.0);", "}"].join("\n")
};;

ShaderLib_simpleColored = {
    attributes: {
        vertexPosition: rendererMeshData_MeshDatajs.POSITION
    },

    uniforms: {
        viewProjectionMatrix: rendererShader_Shaderjs.VIEW_PROJECTION_MATRIX,
        worldMatrix: rendererShader_Shaderjs.WORLD_MATRIX,
        color: [1.0, 1.0, 1.0],
        opacity: 1.0
    },

    vshader: [
        "attribute vec3 vertexPosition;",
        "uniform mat4 viewProjectionMatrix;",
        "uniform mat4 worldMatrix;",
        "void main(void) {",
        "gl_Position = viewProjectionMatrix * (worldMatrix * vec4(vertexPosition, 1.0));",
        "}"
    ].join("\n"),

    fshader: [
        "uniform vec3 color;",
        "uniform float opacity;",
        "void main(void)",
        "{",
        "if (opacity == 0.0) {",
        "discard;",
        "}",
        "gl_FragColor = vec4(color, opacity);",
        "}"
    ].join("\n")
};;

ShaderLib_simpleLit = {
    processors: [ShaderBuilderjs_light.processor],

    defines: {
        NORMAL: true
    },

    attributes: {
        vertexPosition: rendererMeshData_MeshDatajs.POSITION,
        vertexNormal: rendererMeshData_MeshDatajs.NORMAL
    },

    uniforms: {
        viewProjectionMatrix: rendererShader_Shaderjs.VIEW_PROJECTION_MATRIX,
        worldMatrix: rendererShader_Shaderjs.WORLD_MATRIX,
        cameraPosition: rendererShader_Shaderjs.CAMERA,
        opacity: 1.0
    },

    builder: function(shader, shaderInfo) {
        ShaderBuilderjs_light.builder(shader, shaderInfo);
    },

    vshader: function() {
        return [
            "attribute vec3 vertexPosition;",
            "attribute vec3 vertexNormal;",
            "uniform mat4 viewProjectionMatrix;",
            "uniform mat4 worldMatrix;",
            "uniform vec3 cameraPosition;",
            ShaderBuilderjs_light.prevertex,
            "varying vec3 normal;",
            "varying vec3 vWorldPos;",
            "varying vec3 viewPosition;",
            "void main(void) {",
            "vec4 worldPos = worldMatrix * vec4(vertexPosition, 1.0);",
            "vWorldPos = worldPos.xyz;",
            "gl_Position = viewProjectionMatrix * worldPos;",
            ShaderBuilderjs_light.vertex,
            "normal = (worldMatrix * vec4(vertexNormal, 0.0)).xyz;",
            "viewPosition = cameraPosition - worldPos.xyz;",
            "}"
        ].join("\n");
    },

    fshader: function() {
        return [
            "#ifdef SPECULAR_MAP",
            "uniform sampler2D specularMap;",
            "#ifdef TEXCOORD0",
            "varying vec2 texCoord0;",
            "#endif",
            "#endif",
            "uniform float opacity;",
            ShaderBuilderjs_light.prefragment,
            "#ifdef NORMAL",
            "varying vec3 normal;",
            "#endif",
            "varying vec3 vWorldPos;",
            "varying vec3 viewPosition;",
            "void main(void)",
            "{",
            "if (opacity == 0.0) {",
            "discard;",
            // 'return;',
            "}",
            "#ifdef NORMAL",
            "vec3 N = normalize(normal);",
            "#else",
            "vec3 N = vec3(0,0,1);",
            "#endif",
            "vec4 final_color = vec4(1.0);",
            ShaderBuilderjs_light.fragment,
            "final_color.a = opacity;",
            "gl_FragColor = final_color;",
            "}"
        ].join("\n");
    }
};;

ShaderLib_textured = {
    defines: {
        TEXCOORD0: true,
        DIFFUSE_MAP: true
    },

    attributes: {
        vertexPosition: rendererMeshData_MeshDatajs.POSITION,
        vertexUV0: rendererMeshData_MeshDatajs.TEXCOORD0
    },

    uniforms: {
        viewProjectionMatrix: rendererShader_Shaderjs.VIEW_PROJECTION_MATRIX,
        worldMatrix: rendererShader_Shaderjs.WORLD_MATRIX,
        diffuseMap: rendererShader_Shaderjs.DIFFUSE_MAP
    },

    vshader: [
        "attribute vec3 vertexPosition;",
        "attribute vec2 vertexUV0;",
        "uniform mat4 viewProjectionMatrix;",
        "uniform mat4 worldMatrix;",
        "varying vec2 texCoord0;",
        "void main(void) {",
        "texCoord0 = vertexUV0;",
        "gl_Position = viewProjectionMatrix * (worldMatrix * vec4(vertexPosition, 1.0));",
        "}"
    ].join("\n"),

    fshader: [
        "#if defined(TEXCOORD0) && defined(DIFFUSE_MAP)",
        "uniform sampler2D diffuseMap;",
        "varying vec2 texCoord0;",
        "#endif",
        "void main(void)",
        "{",
        "#if defined(TEXCOORD0) && defined(DIFFUSE_MAP)",
        "gl_FragColor = texture2D(diffuseMap, texCoord0);",
        "#else",
        "gl_FragColor = vec4(1.0);",
        "#endif",
        "}"
    ].join("\n")
};;

ShaderLib_texturedLit = {
    processors: [ShaderBuilderjs_light.processor],

    attributes: {
        vertexPosition: rendererMeshData_MeshDatajs.POSITION,
        vertexNormal: rendererMeshData_MeshDatajs.NORMAL,
        vertexUV0: rendererMeshData_MeshDatajs.TEXCOORD0
    },

    uniforms: {
        viewProjectionMatrix: rendererShader_Shaderjs.VIEW_PROJECTION_MATRIX,
        worldMatrix: rendererShader_Shaderjs.WORLD_MATRIX,
        cameraPosition: rendererShader_Shaderjs.CAMERA,
        diffuseMap: rendererShader_Shaderjs.DIFFUSE_MAP
    },

    builder: function(shader, shaderInfo) {
        ShaderBuilderjs_light.builder(shader, shaderInfo);
    },

    vshader: function() {
        return [
            "attribute vec3 vertexPosition;",
            "attribute vec3 vertexNormal;",
            "attribute vec2 vertexUV0;",
            "uniform mat4 viewProjectionMatrix;",
            "uniform mat4 worldMatrix;",
            "uniform vec3 cameraPosition;",
            ShaderBuilderjs_light.prevertex,
            "varying vec3 normal;",
            "varying vec3 vWorldPos;",
            "varying vec3 viewPosition;",
            "varying vec2 texCoord0;",
            "void main(void) {",
            "vec4 worldPos = worldMatrix * vec4(vertexPosition, 1.0);",
            "vWorldPos = worldPos.xyz;",
            "gl_Position = viewProjectionMatrix * worldPos;",
            ShaderBuilderjs_light.vertex,
            "normal = (worldMatrix * vec4(vertexNormal, 0.0)).xyz;",
            "texCoord0 = vertexUV0;",
            "viewPosition = cameraPosition - worldPos.xyz;",
            "}"
        ].join("\n");
    },

    fshader: function() {
        return [
            "uniform sampler2D diffuseMap;",
            ShaderBuilderjs_light.prefragment,
            "varying vec3 normal;",
            "varying vec3 vWorldPos;",
            "varying vec3 viewPosition;",
            "varying vec2 texCoord0;",
            "void main(void)",
            "{",
            "vec3 N = normalize(normal);",
            "vec4 final_color = texture2D(diffuseMap, texCoord0);",
            ShaderBuilderjs_light.fragment,
            "gl_FragColor = final_color;",
            "}"
        ].join("\n");
    }
};;

ShaderLib_convolution = {
    defines: {
        KERNEL_SIZE_FLOAT: "25.0",
        KERNEL_SIZE_INT: "25"
    },

    attributes: {
        position: rendererMeshData_MeshDatajs.POSITION,
        uv: rendererMeshData_MeshDatajs.TEXCOORD0
    },

    uniforms: {
        viewMatrix: rendererShader_Shaderjs.VIEW_MATRIX,
        projectionMatrix: rendererShader_Shaderjs.PROJECTION_MATRIX,
        worldMatrix: rendererShader_Shaderjs.WORLD_MATRIX,
        tDiffuse: rendererShader_Shaderjs.DIFFUSE_MAP,
        uImageIncrement: [0.001953125, 0.0],
        cKernel: [],
        size: 1.0
    },

    vshader: [
        "attribute vec3 position;",
        "attribute vec2 uv;",
        "uniform mat4 viewMatrix;",
        "uniform mat4 projectionMatrix;",
        "uniform mat4 worldMatrix;",
        "uniform float size;",
        "uniform vec2 uImageIncrement;",
        "varying vec2 vUv;",
        "void main() {",
        "vUv = uv - ( ( KERNEL_SIZE_FLOAT - 1.0 ) / 2.0 ) * size * uImageIncrement;",
        "gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( position, 1.0 );",
        "}"
    ].join("\n"),

    fshader: [
        "uniform float cKernel[ KERNEL_SIZE_INT ];",
        "uniform sampler2D tDiffuse;",
        "uniform vec2 uImageIncrement;",
        "uniform float size;",
        "varying vec2 vUv;",
        "void main() {",
        "vec2 imageCoord = vUv;",
        "vec4 sum = vec4( 0.0 );",
        // 'for ( int i = 0; i < KERNEL_SIZE_INT; i ++ ) {',
        // 'sum += texture2D( tDiffuse, imageCoord ) * cKernel[ i ];',
        // 'imageCoord += uImageIncrement * size;',
        // '}',
        // Hack for Android, who seems to crash on int looping
        "for (float i = 0.0; i < KERNEL_SIZE_FLOAT; i++) {",
        "sum += texture2D( tDiffuse, imageCoord ) * cKernel[int(i)];",
        "imageCoord += uImageIncrement * size;",
        "}",
        "gl_FragColor = sum;",
        "}"
    ].join("\n"),

    buildKernel: function(sigma) {
        // Ensure no negative values are used; otherwise we get an invalid
        // kernel size.
        sigma = Math.abs(sigma);

        // We lop off the sqrt(2 * pi) * sigma term, since we're going to normalize anyway.
        function gauss(x, sigma) {
            return Math.exp(-(x * x) / (2.0 * sigma * sigma));
        }

        var i, values, sum, halfWidth, kMaxKernelSize = 25, kernelSize = 2 * Math.ceil(sigma * 3.0) + 1;

        if (kernelSize > kMaxKernelSize) {
            kernelSize = kMaxKernelSize;
        }
        halfWidth = (kernelSize - 1) * 0.5;
        values = new Array(kernelSize);
        sum = 0.0;
        for (i = 0; i < kernelSize; ++i) {
            values[i] = gauss(i - halfWidth, sigma);
            sum += values[i];
        }

        // normalize the kernel
        for (i = 0; i < kernelSize; ++i) {
            values[i] /= sum;
        }
        return values;
    }
};;

ShaderLib_showNormals = {
    defines: {
        NORMAL: true
    },

    attributes: {
        vertexPosition: rendererMeshData_MeshDatajs.POSITION,
        vertexNormal: rendererMeshData_MeshDatajs.NORMAL
    },

    uniforms: {
        viewMatrix: rendererShader_Shaderjs.VIEW_MATRIX,
        projectionMatrix: rendererShader_Shaderjs.PROJECTION_MATRIX,
        viewProjectionMatrix: rendererShader_Shaderjs.VIEW_PROJECTION_MATRIX,
        worldMatrix: rendererShader_Shaderjs.WORLD_MATRIX,
        opacity: 1.0
    },

    vshader: [
        "attribute vec3 vertexPosition;",
        "attribute vec3 vertexNormal;",
        "uniform mat4 viewProjectionMatrix;",
        "uniform mat4 worldMatrix;",
        "varying vec3 normal;",
        "void main() {",
        "normal = vec3(worldMatrix * vec4(vertexNormal, 0.0));",
        "gl_Position = viewProjectionMatrix * (worldMatrix * vec4(vertexPosition, 1.0));",
        "}"
    ].join("\n"),

    fshader: [
        "uniform float opacity;",
        "#ifdef NORMAL",
        "varying vec3 normal;",
        "#else",
        "vec3 normal = vec3(0,0,1);",
        "#endif",
        "void main() {",
        "gl_FragColor = vec4( 0.5 * normalize( normal ) + 0.5, opacity );",
        "}"
    ].join("\n")
};;

ShaderLib_particles = {
    attributes: {
        vertexPosition: rendererMeshData_MeshDatajs.POSITION,
        vertexColor: rendererMeshData_MeshDatajs.COLOR,
        vertexUV0: rendererMeshData_MeshDatajs.TEXCOORD0
    },

    uniforms: {
        viewProjectionMatrix: rendererShader_Shaderjs.VIEW_PROJECTION_MATRIX,
        worldMatrix: rendererShader_Shaderjs.WORLD_MATRIX,
        diffuseMap: rendererShader_Shaderjs.DIFFUSE_MAP
    },

    vshader: [
        "attribute vec3 vertexPosition;",
        "attribute vec4 vertexColor;",
        "attribute vec2 vertexUV0;",
        "uniform mat4 viewProjectionMatrix;",
        "uniform mat4 worldMatrix;",
        "varying vec2 texCoord0;",
        "varying vec4 color;",
        "void main(void) {",
        "texCoord0 = vertexUV0;",
        "color = vertexColor;",
        "gl_Position = viewProjectionMatrix * (worldMatrix * vec4(vertexPosition, 1.0));",
        "}"
    ].join("\n"),

    fshader: [
        "uniform sampler2D diffuseMap;",
        "varying vec2 texCoord0;",
        "varying vec4 color;",
        "void main(void)",
        "{",
        "vec4 texCol = texture2D(diffuseMap, texCoord0);",
        "if (color.a == 0.0 || texCol.a == 0.0) discard;",
        "else gl_FragColor = texCol * color;",
        "}"
    ].join("\n")
};;

ShaderLib_normalmap = {
    attributes: {
        vertexPosition: rendererMeshData_MeshDatajs.POSITION,
        vertexUV0: rendererMeshData_MeshDatajs.TEXCOORD0
    },

    uniforms: {
        viewProjectionMatrix: rendererShader_Shaderjs.VIEW_PROJECTION_MATRIX,
        worldMatrix: rendererShader_Shaderjs.WORLD_MATRIX,
        heightMap: rendererShader_Shaderjs.DIFFUSE_MAP,
        resolution: [512, 512],
        height: 0.05
    },

    vshader: [
        "attribute vec3 vertexPosition;",
        "attribute vec2 vertexUV0;",
        "uniform mat4 viewProjectionMatrix;",
        "uniform mat4 worldMatrix;",
        "varying vec2 vUv;",
        "void main() {",
        "vUv = vertexUV0;",
        "gl_Position = viewProjectionMatrix * (worldMatrix * vec4( vertexPosition, 1.0 ));",
        "}"
    ].join("\n"),

    fshader: [
        "uniform float height;",
        "uniform vec2 resolution;",
        "uniform sampler2D heightMap;",
        "varying vec2 vUv;",
        "void main() {",
        "float val = texture2D( heightMap, vUv ).x;",
        "float valU = texture2D( heightMap, vUv + vec2( 1.0 / resolution.x, 0.0 ) ).x;",
        "float valV = texture2D( heightMap, vUv + vec2( 0.0, 1.0 / resolution.y ) ).x;",
        "gl_FragColor = vec4( ( 0.5 * normalize( vec3( val - valU, val - valV, height  ) ) + 0.5 ), 1.0 );",
        "}"
    ].join("\n")
};;

ShaderLib_point = {
    attributes: {
        vertexPosition: rendererMeshData_MeshDatajs.POSITION,
        vertexColor: rendererMeshData_MeshDatajs.COLOR
    },

    uniforms: {
        viewProjectionMatrix: rendererShader_Shaderjs.VIEW_PROJECTION_MATRIX,
        worldMatrix: rendererShader_Shaderjs.WORLD_MATRIX,
        pointSize: 2.0
    },

    vshader: [
        "attribute vec3 vertexPosition;",
        "attribute vec4 vertexColor;",
        "uniform mat4 viewProjectionMatrix;",
        "uniform mat4 worldMatrix;",
        "uniform float pointSize;",
        "varying vec4 color;",
        "void main(void) {",
        "color = vertexColor;",
        "gl_Position = viewProjectionMatrix * (worldMatrix * vec4(vertexPosition, 1.0));",
        "gl_PointSize = pointSize;",
        "}"
    ].join("\n"),

    fshader: [
        "varying vec4 color;",
        "void main(void)",
        "{",
        "gl_FragColor = color;",
        "}"
    ].join("\n")
};;

ShaderLib_downsample = {
    attributes: {
        vertexPosition: rendererMeshData_MeshDatajs.POSITION,
        vertexUV0: rendererMeshData_MeshDatajs.TEXCOORD0
    },

    uniforms: {
        viewMatrix: rendererShader_Shaderjs.VIEW_MATRIX,
        projectionMatrix: rendererShader_Shaderjs.PROJECTION_MATRIX,
        worldMatrix: rendererShader_Shaderjs.WORLD_MATRIX,
        tDiffuse: rendererShader_Shaderjs.DIFFUSE_MAP
    },

    vshader: [
        "attribute vec3 vertexPosition;",
        "attribute vec2 vertexUV0;",
        "uniform mat4 viewMatrix;",
        "uniform mat4 projectionMatrix;",
        "uniform mat4 worldMatrix;",
        "varying vec2 vUv;",
        "void main() {",
        "vUv = vertexUV0;",
        "gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );",
        "}"
    ].join("\n"),

    fshader: [
        "uniform sampler2D tDiffuse;",
        "varying vec2 vUv;",
        "void main() {",
        "gl_FragColor = texture2D( tDiffuse, vUv );",
        "}"
    ].join("\n")
};;

ShaderLib_lightDepth = {
    processors: [ShaderBuilderjs_animation.processor],

    defines: {
        SHADOW_TYPE: 0,
        WEIGHTS: true,
        JOINTIDS: true
    },

    attributes: {
        vertexPosition: rendererMeshData_MeshDatajs.POSITION,
        vertexJointIDs: rendererMeshData_MeshDatajs.JOINTIDS,
        vertexWeights: rendererMeshData_MeshDatajs.WEIGHTS
    },

    uniforms: {
        viewMatrix: rendererShader_Shaderjs.VIEW_MATRIX,
        projectionMatrix: rendererShader_Shaderjs.PROJECTION_MATRIX,
        worldMatrix: rendererShader_Shaderjs.WORLD_MATRIX,
        cameraScale: rendererShader_Shaderjs.MAIN_DEPTH_SCALE
    },

    vshader: [
        "attribute vec3 vertexPosition;",
        "uniform mat4 viewMatrix;",
        "uniform mat4 projectionMatrix;",
        "uniform mat4 worldMatrix;",
        "varying vec4 worldPosition;",
        ShaderBuilderjs_animation.prevertex,
        "void main(void) {",
        "mat4 wMatrix = worldMatrix;",
        ShaderBuilderjs_animation.vertex,
        "worldPosition = viewMatrix * (wMatrix * vec4(vertexPosition, 1.0));",
        "gl_Position = projectionMatrix * worldPosition;",
        "}"
    ].join("\n"),

    fshader: [
        "#if SHADOW_TYPE == 2",
        "uniform float cameraScale;",
        "#endif",
        "varying vec4 worldPosition;",
        ShaderFragmentjs_methods.packDepth,
        "void main(void)",
        "{",
        "#if SHADOW_TYPE == 0",
        "gl_FragColor = packDepth(gl_FragCoord.z);",
        "#elif SHADOW_TYPE == 1",
        "gl_FragColor = packDepth(gl_FragCoord.z);",
        "#elif SHADOW_TYPE == 2",
        "float linearDepth = length(worldPosition) * cameraScale;",
        "gl_FragColor = vec4(linearDepth, linearDepth * linearDepth, 0.0, 0.0);",
        "#endif",
        "}"
    ].join("\n")
};;

ShaderLib_pickingShader = {
    defines: {
        WEIGHTS: true,
        JOINTIDS: true
    },

    attributes: {
        vertexPosition: rendererMeshData_MeshDatajs.POSITION,
        vertexJointIDs: rendererMeshData_MeshDatajs.JOINTIDS,
        vertexWeights: rendererMeshData_MeshDatajs.WEIGHTS,
        vertexNormal: rendererMeshData_MeshDatajs.NORMAL
    },

    uniforms: {
        normalMatrix: rendererShader_Shaderjs.NORMAL_MATRIX,
        viewMatrix: rendererShader_Shaderjs.VIEW_MATRIX,
        projectionMatrix: rendererShader_Shaderjs.PROJECTION_MATRIX,
        worldMatrix: rendererShader_Shaderjs.WORLD_MATRIX,
        cameraFar: rendererShader_Shaderjs.FAR_PLANE,
        thickness: 0.0,

        id: function(shaderInfo) {
            return shaderInfo.renderable._index != null ? shaderInfo.renderable._index + 1 : shaderInfo.renderable.id + 1;
        }
    },

    processors: [// ShaderBuilder.uber.processor,
    ShaderBuilderjs_animation.processor, function(shader) {
        shader.setDefine("NORMAL", true);
    }],

    vshader: [
        "attribute vec3 vertexPosition;",
        "#ifdef NORMAL",
        "attribute vec3 vertexNormal;",
        "#endif",
        "uniform mat4 viewMatrix;",
        "uniform mat4 projectionMatrix;",
        "uniform mat4 worldMatrix;",
        "uniform float cameraFar;",
        "uniform float thickness;",
        "uniform mat3 normalMatrix;",
        ShaderBuilderjs_animation.prevertex,
        "varying float depth;",
        "void main() {",
        "#ifdef NORMAL",
        "mat3 nMatrix = normalMatrix;",
        "#endif",
        "mat4 wMatrix = worldMatrix;",
        ShaderBuilderjs_animation.vertex,
        "#ifdef NORMAL",
        "vec4 mvPosition = viewMatrix * (wMatrix * vec4( vertexPosition + vertexNormal * thickness, 1.0 ));",
        "#else",
        "vec4 mvPosition = viewMatrix * (wMatrix * vec4( vertexPosition, 1.0 ));",
        "#endif",
        "depth = -mvPosition.z / cameraFar;",
        "gl_Position = projectionMatrix * mvPosition;",
        "}"
    ].join("\n"),

    fshader: [
        "uniform float id;",
        "varying float depth;",
        ShaderFragmentjs_methods.packDepth16,
        "void main() {",
        "vec2 packedId = vec2(floor(id/255.0), mod(id, 255.0)) * vec2(1.0/255.0);",
        "vec2 packedDepth = packDepth16(depth);",
        "gl_FragColor = vec4(packedId, packedDepth);",
        "}"
    ].join("\n")
};;

export { ShaderLib_uber as uber, ShaderLib_screenCopy as screenCopy, ShaderLib_copy as copy, ShaderLib_copyPure as copyPure, ShaderLib_simple as simple, ShaderLib_simpleColored as simpleColored, ShaderLib_simpleLit as simpleLit, ShaderLib_textured as textured, ShaderLib_texturedLit as texturedLit, ShaderLib_convolution as convolution, ShaderLib_showNormals as showNormals, ShaderLib_particles as particles, ShaderLib_normalmap as normalmap, ShaderLib_downsample as downsample, ShaderLib_lightDepth as lightDepth, ShaderLib_pickingShader as pickingShader, ShaderLib };

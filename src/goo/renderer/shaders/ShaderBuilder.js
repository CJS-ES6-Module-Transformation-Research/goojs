define([
	'goo/renderer/shaders/ShaderFragment',
	'goo/renderer/MeshData',
	'goo/renderer/light/PointLight',
	'goo/renderer/light/DirectionalLight',
	'goo/renderer/light/SpotLight'
],
/** @lends */
function(
	ShaderFragment,
	MeshData,
	PointLight,
	DirectionalLight,
	SpotLight
) {
	"use strict";

	/**
	 * @class Builds shaders
	 */
	function ShaderBuilder() {
	}

	ShaderBuilder.light = {
		processor: function (shader, shaderInfo) {
			var pointCount = 0;
			shader.uniforms.pointLightColor = shader.uniforms.pointLightColor || [];
			shader.uniforms.pointLight = shader.uniforms.pointLight || [];

			var directionalCount = 0;
			shader.uniforms.directionalLightColor = shader.uniforms.directionalLightColor || [];
			shader.uniforms.directionalLightDirection = shader.uniforms.directionalLightDirection || [];

			var spotCount = 0;
			shader.uniforms.spotLightColor = shader.uniforms.spotLightColor || [];
			shader.uniforms.spotLight = shader.uniforms.spotLight || [];
			shader.uniforms.spotLightDirection = shader.uniforms.spotLightDirection || [];
			shader.uniforms.spotLightAngle = shader.uniforms.spotLightAngle || [];
			shader.uniforms.spotLightExponent = shader.uniforms.spotLightExponent || [];

			for (var i = 0; i < shaderInfo.lights.length; i++) {
				var light = shaderInfo.lights[i];

				if (light instanceof PointLight) {
					shader.uniforms.pointLight[pointCount * 4 + 0] = light.translation.x;
					shader.uniforms.pointLight[pointCount * 4 + 1] = light.translation.y;
					shader.uniforms.pointLight[pointCount * 4 + 2] = light.translation.z;
					shader.uniforms.pointLight[pointCount * 4 + 3] = light.range;

					shader.uniforms.pointLightColor[pointCount * 3 + 0] = light.color.r * light.intensity;
					shader.uniforms.pointLightColor[pointCount * 3 + 1] = light.color.g * light.intensity;
					shader.uniforms.pointLightColor[pointCount * 3 + 2] = light.color.b * light.intensity;

					pointCount++;
				} else if (light instanceof DirectionalLight) {
					shader.uniforms.directionalLightDirection[directionalCount * 3 + 0] = light.direction.x;
					shader.uniforms.directionalLightDirection[directionalCount * 3 + 1] = light.direction.y;
					shader.uniforms.directionalLightDirection[directionalCount * 3 + 2] = light.direction.z;

					shader.uniforms.directionalLightColor[directionalCount * 3 + 0] = light.color.r * light.intensity;
					shader.uniforms.directionalLightColor[directionalCount * 3 + 1] = light.color.g * light.intensity;
					shader.uniforms.directionalLightColor[directionalCount * 3 + 2] = light.color.b * light.intensity;

					directionalCount++;
				} else if (light instanceof SpotLight) {
					shader.uniforms.spotLight[spotCount * 4 + 0] = light.translation.x;
					shader.uniforms.spotLight[spotCount * 4 + 1] = light.translation.y;
					shader.uniforms.spotLight[spotCount * 4 + 2] = light.translation.z;
					shader.uniforms.spotLight[spotCount * 4 + 3] = light.range;

					shader.uniforms.spotLightColor[spotCount * 3 + 0] = light.color.r * light.intensity;
					shader.uniforms.spotLightColor[spotCount * 3 + 1] = light.color.g * light.intensity;
					shader.uniforms.spotLightColor[spotCount * 3 + 2] = light.color.b * light.intensity;

					shader.uniforms.spotLightDirection[spotCount * 3 + 0] = light.direction.x;
					shader.uniforms.spotLightDirection[spotCount * 3 + 1] = light.direction.y;
					shader.uniforms.spotLightDirection[spotCount * 3 + 2] = light.direction.z;

					shader.uniforms.spotLightAngle[spotCount] = light.angle;
					shader.uniforms.spotLightExponent[spotCount] = light.exponent;

					spotCount++;
				}
			}

			if (shader.pointCount !== pointCount) {
				shader.defines = shader.defines || {};
				shader.defines.MAX_POINT_LIGHTS = pointCount;
				shader.uniforms.pointLight.length = pointCount * 4;
				shader.uniforms.pointLightColor.length = pointCount * 3;
				shader.pointCount = pointCount;
				shader.rebuild();
			}
			if (shader.directionalCount !== directionalCount) {
				shader.defines = shader.defines || {};
				shader.defines.MAX_DIRECTIONAL_LIGHTS = directionalCount;
				shader.uniforms.directionalLightDirection.length = directionalCount * 3;
				shader.uniforms.directionalLightColor.length = directionalCount * 3;
				shader.directionalCount = directionalCount;
				shader.rebuild();
			}
			if (shader.spotCount !== spotCount) {
				shader.defines = shader.defines || {};
				shader.defines.MAX_SPOT_LIGHTS = spotCount;
				shader.uniforms.spotLight.length = spotCount * 4;
				shader.uniforms.spotLightColor.length = spotCount * 3;
				shader.uniforms.spotLightDirection.length = spotCount * 3;
				shader.uniforms.spotLightAngle.length = spotCount * 1;
				shader.uniforms.spotLightExponent.length = spotCount * 1;
				shader.spotCount = spotCount;
				shader.rebuild();
			}
		},
		prevertex: [
			'#ifndef MAX_POINT_LIGHTS',
				'#define MAX_POINT_LIGHTS 0',
			"#endif",
			'#ifndef MAX_SPOT_LIGHTS',
				'#define MAX_SPOT_LIGHTS 0',
			"#endif",

			"#if MAX_POINT_LIGHTS > 0",
				"uniform vec4 pointLight[MAX_POINT_LIGHTS];",
				"varying vec4 vPointLight[MAX_POINT_LIGHTS];",
			"#endif",
			"#if MAX_SPOT_LIGHTS > 0",
				"uniform vec4 spotLight[MAX_SPOT_LIGHTS];",
				"varying vec4 vSpotLight[MAX_SPOT_LIGHTS];",
			"#endif"
		].join('\n'),
		vertex: [
			"#if MAX_POINT_LIGHTS > 0",
				"for(int i = 0; i < MAX_POINT_LIGHTS; i++) {",
					'vec3 lightVec = pointLight[i].xyz - worldPos.xyz;',
					"float lightDist = 1.0 - min( ( length( lightVec ) / pointLight[i].w), 1.0 );",
					"vPointLight[i] = vec4( lightVec, lightDist );",
				"}",
			"#endif",
			"#if MAX_SPOT_LIGHTS > 0",
				"for( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {",
					'vec3 lightVec = spotLight[i].xyz - worldPos.xyz;',
					"float lightDist = 1.0 - min( ( length( lightVec ) / spotLight[i].w), 1.0 );",
					"vSpotLight[i] = vec4( lightVec, lightDist );",
				"}",
			"#endif"
		].join('\n'),
		prefragment: [
			'#ifndef MAX_DIRECTIONAL_LIGHTS',
				'#define MAX_DIRECTIONAL_LIGHTS 0',
			"#endif",
			'#ifndef MAX_POINT_LIGHTS',
				'#define MAX_POINT_LIGHTS 0',
			"#endif",
			'#ifndef MAX_SPOT_LIGHTS',
				'#define MAX_SPOT_LIGHTS 0',
			"#endif",

			"#if MAX_DIRECTIONAL_LIGHTS > 0",
				"uniform vec3 directionalLightColor[ MAX_DIRECTIONAL_LIGHTS ];",
				"uniform vec3 directionalLightDirection[ MAX_DIRECTIONAL_LIGHTS ];",
			"#endif",
			"#if MAX_POINT_LIGHTS > 0",
				"uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];",
				"varying vec4 vPointLight[ MAX_POINT_LIGHTS ];",
			"#endif",
			"#if MAX_SPOT_LIGHTS > 0",
				"uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];",
				"uniform vec4 spotLight[ MAX_SPOT_LIGHTS ];",
				"uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];",
				"uniform float spotLightAngle[ MAX_SPOT_LIGHTS ];",
				"uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];",
				"varying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];",
			"#endif"
		].join('\n'),
		fragment: [
			'#ifdef SPECULAR_MAP',
				'float specularStrength = texture2D(specularMap, texCoord0).x;',
			'#else',
				'float specularStrength = 1.0;',
			'#endif',

			"#if MAX_POINT_LIGHTS > 0",
				"vec3 pointDiffuse  = vec3( 0.0 );",
				"vec3 pointSpecular = vec3( 0.0 );",

				"for (int i = 0; i < MAX_POINT_LIGHTS; i++) {",
					"vec3 lVector = normalize( vPointLight[ i ].xyz );",
					"float lDistance = vPointLight[ i ].w;",

					// diffuse
					"float dotProduct = dot( N, lVector );",

					"#ifdef WRAP_AROUND",
						"float pointDiffuseWeightFull = max( dotProduct, 0.0 );",
						"float pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );",

						"vec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );",
					"#else",
						"float pointDiffuseWeight = max( dotProduct, 0.0 );",
					"#endif",

					"pointDiffuse += materialDiffuse.rgb * pointLightColor[ i ] * pointDiffuseWeight * lDistance;",

					// specular
					"vec3 pointHalfVector = normalize( lVector + viewPosition );",
					"float pointDotNormalHalf = max( dot( N, pointHalfVector ), 0.0 );",
					"float pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, materialSpecularPower ), 0.0 );",

					"#ifdef PHYSICALLY_BASED_SHADING",
						// 2.0 => 2.0001 is hack to work around ANGLE bug

						"float specularNormalization = ( materialSpecularPower + 2.0001 ) / 8.0;",

						"vec3 schlick = materialSpecular.rgb + vec3( 1.0 - materialSpecular.rgb ) * pow( 1.0 - dot( lVector, pointHalfVector ), 5.0 );",
						"pointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;",
					"#else",
						"pointSpecular += materialSpecular.rgb * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;",
					"#endif",
				"}",
			"#endif",

			"#if MAX_SPOT_LIGHTS > 0",
				"vec3 spotDiffuse  = vec3( 0.0 );",
				"vec3 spotSpecular = vec3( 0.0 );",

				"for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {",
					"vec3 lVector = normalize( vSpotLight[ i ].xyz );",
					"float lDistance = vSpotLight[ i ].w;",

					// "float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );",
					"float spotEffect = dot( normalize(-spotLightDirection[ i ]), lVector );",

					// 'spotDiffuse = vec3(spotEffect);',

					"if ( spotEffect > spotLightAngle[ i ] ) {",
						"spotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );",

						// diffuse
						"float dotProduct = dot( N, lVector );",

						"#ifdef WRAP_AROUND",
							"float spotDiffuseWeightFull = max( dotProduct, 0.0 );",
							"float spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );",

							"vec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );",
						"#else",
							"float spotDiffuseWeight = max( dotProduct, 0.0 );",
						"#endif",

						"spotDiffuse += materialDiffuse.rgb * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;",

						// specular
						"vec3 spotHalfVector = normalize( lVector + viewPosition );",
						"float spotDotNormalHalf = max( dot( N, spotHalfVector ), 0.0 );",
						"float spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, materialSpecularPower ), 0.0 );",

						"#ifdef PHYSICALLY_BASED_SHADING",
							// 2.0 => 2.0001 is hack to work around ANGLE bug

							"float specularNormalization = ( materialSpecularPower + 2.0001 ) / 8.0;",

							"vec3 schlick = materialSpecular.rgb + vec3( 1.0 - materialSpecular.rgb ) * pow( 1.0 - dot( lVector, spotHalfVector ), 5.0 );",
							"spotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;",
						"#else",
							"spotSpecular += materialSpecular.rgb * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * spotEffect;",
						"#endif",
					"}",
				"}",
			"#endif",

			"#if MAX_DIRECTIONAL_LIGHTS > 0",
				"vec3 dirDiffuse  = vec3( 0.0 );",
				"vec3 dirSpecular = vec3( 0.0 );" ,

				"for( int i = 0; i < MAX_DIRECTIONAL_LIGHTS; i ++ ) {",
					"vec4 lDirection = vec4( directionalLightDirection[ i ], 0.0 );",
					// "vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );",
					"vec3 dirVector = normalize( lDirection.xyz );",

					// diffuse
					"float dotProduct = dot( N, dirVector );",

					"#ifdef WRAP_AROUND",
						"float dirDiffuseWeightFull = max( dotProduct, 0.0 );",
						"float dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );",

						"vec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );",
					"#else",
						"float dirDiffuseWeight = max( dotProduct, 0.0 );",
					"#endif",

					"dirDiffuse  += materialDiffuse.rgb * directionalLightColor[ i ] * dirDiffuseWeight;",

					// specular
					"vec3 dirHalfVector = normalize( dirVector + viewPosition );",
					"float dirDotNormalHalf = max( dot( N, dirHalfVector ), 0.0 );",
					"float dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, materialSpecularPower ), 0.0 );",

					"#ifdef PHYSICALLY_BASED_SHADING",
						// 2.0 => 2.0001 is hack to work around ANGLE bug

						"float specularNormalization = ( materialSpecularPower + 2.0001 ) / 8.0;",
						//"dirSpecular += materialSpecular.rgb * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization * fresnel;",

						"vec3 schlick = materialSpecular.rgb + vec3( 1.0 - materialSpecular.rgb ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );",
						"dirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;",
					"#else",
						"dirSpecular += materialSpecular.rgb * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;",
					"#endif",
				"}",
			"#endif",

			"vec3 totalDiffuse = vec3( 0.0 );",
			"vec3 totalSpecular = vec3( 0.0 );",

			"#if MAX_DIRECTIONAL_LIGHTS > 0",
				"totalDiffuse += dirDiffuse;",
				"totalSpecular += dirSpecular;",
			"#endif",
			"#if MAX_POINT_LIGHTS > 0",
				"totalDiffuse += pointDiffuse;",
				"totalSpecular += pointSpecular;",
			"#endif",
			"#if MAX_SPOT_LIGHTS > 0",
				"totalDiffuse += spotDiffuse;",
				"totalSpecular += spotSpecular;",
			"#endif",

			"vec3 emissive = vec3(0.0, 0.0, 0.0);",
			"vec3 ambientLightColor = vec3(0.0, 0.0, 0.0);",
			"#ifdef METAL",
				"final_color.xyz = final_color.xyz * ( emissive + totalDiffuse + ambientLightColor * materialAmbient.rgb + totalSpecular );",
			"#else",
				"final_color.xyz = final_color.xyz * ( emissive + totalDiffuse + ambientLightColor * materialAmbient.rgb ) + totalSpecular;",
			"#endif"
		].join('\n')
	};

	return ShaderBuilder;
});
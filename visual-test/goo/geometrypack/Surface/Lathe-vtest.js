
	"use strict";
    goo.V.attachToGlobal();

    V.describe('A rotational surface generated by spinning a polyLine around the Y axis');

    var gooRunner = V.initGoo();
    var world = gooRunner.world;

    var section = PolyLine.fromCubicSpline([
			3 + 0, -1, 0,
			3 + 1,  0, 0,
			3 + 1,  1, 0,
			3 + 0,  1, 0,
			3 - 1,  1, 0,
			3 - 1,  2, 0,
			3 + 0,  3, 0
		], 20);

    var latheMeshData = section.lathe(20);

    var material = new Material(ShaderLib.simpleLit);
    world.createEntity(latheMeshData, material).addToWorld();

    var normalsMeshData = latheMeshData.getNormalsMeshData(4);
    var normalsMaterial = new Material(ShaderLib.simpleColored);
    normalsMaterial.uniforms.color = [0.2, 1.0, 0.6];
    world.createEntity(normalsMeshData, normalsMaterial).addToWorld();

    V.addLights();

    V.addOrbitCamera(new Vector3(10, Math.PI / 2, 0));

    V.process();

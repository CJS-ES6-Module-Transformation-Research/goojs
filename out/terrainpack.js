"use strict";

goo.TerrainSurface = function (t, e) {
  "use strict";

  function r(e, r, i, o) {
    for (var a = [], n = 0; n < e.length; n++) {
      for (var s = 0; s < e[n].length; s++) {
        a.push(n * r / (e.length - 1), e[n][s] * i, s * o / (e.length - 1));
      }
    }this.verts = a, this.vertsPerLine = e[0].length;var h = t.defaultMap([t.POSITION, t.NORMAL, t.TEXCOORD0]),
        l = this.verts.length / 3,
        d = l / this.vertsPerLine;t.call(this, h, l, (d - 1) * (this.vertsPerLine - 1) * 6), this.rebuild();
  }return r.prototype = Object.create(t.prototype), r.prototype.rebuild = function () {
    this.getAttributeBuffer(t.POSITION).set(this.verts);for (var r = [], i = [], o = [], a = this.verts.length / 3, n = a / this.vertsPerLine, s = 0; n - 1 > s; s++) {
      for (var h = 0; h < this.vertsPerLine - 1; h++) {
        var l = (s + 0) * this.vertsPerLine + (h + 0),
            d = (s + 1) * this.vertsPerLine + (h + 0),
            u = (s + 1) * this.vertsPerLine + (h + 1),
            c = (s + 0) * this.vertsPerLine + (h + 1);r.push(d, l, c, d, c, u), o = e.getTriangleNormal(this.verts[3 * l + 0], this.verts[3 * l + 1], this.verts[3 * l + 2], this.verts[3 * c + 0], this.verts[3 * c + 1], this.verts[3 * c + 2], this.verts[3 * d + 0], this.verts[3 * d + 1], this.verts[3 * d + 2]), i.push(o[0], o[1], o[2]);
      }i.push(o[0], o[1], o[2]);
    }s--;for (var h = 0; h < this.vertsPerLine - 1; h++) {
      var l = (s + 0) * this.vertsPerLine + (h + 0),
          d = (s + 1) * this.vertsPerLine + (h + 0),
          c = (s + 0) * this.vertsPerLine + (h + 1);o = e.getTriangleNormal(this.verts[3 * l + 0], this.verts[3 * l + 1], this.verts[3 * l + 2], this.verts[3 * c + 0], this.verts[3 * c + 1], this.verts[3 * c + 2], this.verts[3 * d + 0], this.verts[3 * d + 1], this.verts[3 * d + 2]), i.push(o[0], o[1], o[2]);
    }i.push(o[0], o[1], o[2]), this.getAttributeBuffer(t.NORMAL).set(i), this.getIndexBuffer().set(r);for (var p = [], f = this.verts[this.verts.length - 3], g = this.verts[this.verts.length - 1], s = 0; s < this.verts.length; s += 3) {
      var v = this.verts[s + 0] / f,
          m = this.verts[s + 2] / g;p.push(v, m);
    }return this.getAttributeBuffer(t.TEXCOORD0).set(p), this;
  }, r;
}(goo.MeshData, goo.MathUtils), goo.Forrest = function (t, e, r, i, o, a, n, s, h, l, d, u, c, p, f, g, v, m, x, M, y, P, b, w) {
  "use strict";

  function C() {
    this.calcVec = new r(), this.initDone = !1;
  }var T = function T(t, e, r) {
    var i = new g({ world: t, preloadBinaries: !0, rootPath: "res/trees2" });return e.then(function () {
      return console.log("loading bundle ", r), i.load("root.bundle");
    }).then(function (t) {
      for (var e in t) {
        console.log(e);
      }console.error("Config in bundle ", r, " contained no scene?!");
    });
  };C.prototype.init = function (t, e, r, i, o, a) {
    for (var n = new w.Promise(), s = ["fish"], h = 0; h < s.length; h++) {
      n = T(t, n, s[h]);
    }return n.then(function () {
      console.log("loaded forrest", o);
    }, function (t) {
      console.log("Error! ", t);
    }).then(null, function (t) {
      console.log("Error! ", t);
    }), this.loadLODTrees(t, e, r, i, o, a);
  }, C.prototype.loadLODTrees = function (e, r, i, o, a, n) {
    this.terrainQuery = r, this.forrestTypes = a, this.entityMap = n || {}, this.world = e, this.vegetationList = {};for (var s in a) {
      var h = a[s],
          l = this.createBase(h);this.vegetationList[s] = l;
    }var d = new t(D, "vegetation");d.setTexture("DIFFUSE_MAP", i), d.setTexture("NORMAL_MAP", o), d.uniforms.discardThreshold = .6, d.uniforms.materialAmbient = [0, 0, 0, 0], d.uniforms.materialDiffuse = [1, 1, 1, 1], d.uniforms.materialSpecular = [0, 0, 0, 0], d.renderQueue = 2001, this.material = d, this.patchSize = 32, this.patchDensity = 5, this.gridSize = 7, this.minDist = 1.5, this.patchSpacing = this.patchSize / this.patchDensity, this.gridSizeHalf = Math.floor(.5 * this.gridSize), this.grid = [], this.gridState = [];for (var u = this.createForrestPatch(0, 0, 1), c = 0; c < this.gridSize; c++) {
      this.grid[c] = [], this.gridState[c] = [];for (var p = 0; p < this.gridSize; p++) {
        var f = e.createEntity(this.material),
            g = new M(u);g.modelBound.xExtent = this.patchSize, g.modelBound.yExtent = 500, g.modelBound.zExtent = this.patchSize, g.autoCompute = !1, f.set(g), f.addToWorld(), this.grid[c][p] = f, this.gridState[c][p] = { lod: -1, x: -1, z: -1 }, f.meshRendererComponent.hidden = !0;
      }
    }this.currentX = -1e4, this.currentZ = -1e4, this.initDone = !0;
  }, C.prototype.rebuild = function () {
    this.currentX = -1e4, this.currentZ = -1e4;
  };var S = !1;C.prototype.toggle = function () {
    S = !S;for (var t = 0; t < this.gridSize; t++) {
      for (var e = 0; e < this.gridSize; e++) {
        var r = this.grid[t][e];r.skip = S;
      }
    }S || this.rebuild();
  }, C.prototype.update = function (t, e) {
    if (this.initDone && !S) {
      var r = Math.floor(t / this.patchSize),
          i = Math.floor(e / this.patchSize);if (this.currentX !== r || this.currentZ !== i) {
        for (var t = 0; t < this.gridSize; t++) {
          for (var e = 0; e < this.gridSize; e++) {
            var o = r + t,
                a = i + e;o -= this.gridSizeHalf, a -= this.gridSizeHalf;var n = b.moduloPositive(o, this.gridSize),
                s = b.moduloPositive(a, this.gridSize),
                h = this.grid[n][s],
                l = this.gridState[n][s],
                d = Math.abs(t - this.gridSizeHalf),
                u = Math.abs(e - this.gridSizeHalf),
                c = 1;if (d < this.minDist && u < this.minDist && (c = 2), l.lod !== c || l.x !== o || l.z !== a) {
              l.lod = c, l.x = o, l.z = a, o *= this.patchSize, a *= this.patchSize;var p = this.createForrestPatch(o, a, c, h);p && p.vertexCount > 0 ? (h.meshDataComponent.meshData = p, h.meshRendererComponent.hidden = !1) : h.meshRendererComponent.hidden = !0, h.meshRendererComponent.worldBound.center.setDirect(o + .5 * this.patchSize, 0, a + .5 * this.patchSize);
            }
          }
        }this.currentX = r, this.currentZ = i;
      }
    }
  }, C.prototype.determineVegTypeAtPos = function (t) {
    var e = this.terrainQuery.getNormalAt(t);null === e && (e = r.UNIT_Y);var i = e.dot(r.UNIT_Y);return this.terrainQuery.getForrestType(t[0], t[2], i, b.fastRandom());
  }, C.prototype.fetchTreeMesh = function (t) {
    return v.clone(this.world, this.entityMap[t]);
  }, C.prototype.fetchTreeBillboard = function (t, e) {
    var r = this.vegetationList[t],
        i = this.forrestTypes[t],
        o = i.w * e,
        a = i.h * e;return r.getAttributeBuffer("OFFSET").set([.5 * -o, 0, .5 * -o, a, .5 * o, a, .5 * o, 0]), r;
  }, C.prototype.getPointInPatch = function (t, e, r, i, o) {
    var a = [0, 0, 0];return a[0] = r + (t + .75 * b.fastRandom()) * o, a[2] = .5 + i + (e + .75 * b.fastRandom()) * o, a[1] = this.terrainQuery.getHeightAt(a), null === a[1] && (a[1] = 0), a;
  }, C.prototype.addVegMeshToPatch = function (t, e, r, o, a) {
    var n = new i(),
        s = .5 * b.fastRandom() + .75;n.translation.set(e), n.update();var h = a && (2 === o || this.forrestTypes[t].forbidden === !0);if (h && this.entityMap[t]) {
      var l = this.fetchTreeMesh(t);l.transformComponent.transform.scale.scale(s), l.transformComponent.transform.translation.set(e), l.addToWorld(), a.attachChild(l), this.onAddedVegMesh && this.onAddedVegMesh(t, l, e, s);
    } else {
      var d = this.fetchTreeBillboard(t, s);r.addMeshData(d, n);
    }
  }, C.prototype.createForrestPatch = function (t, e, r, i) {
    var o = new u(),
        a = this.patchDensity,
        n = this.patchSpacing;i && i.traverse(function (t, e) {
      e > 0 && t.removeFromWorld();
    }), b.randomSeed = 1e4 * t + e;for (var s = 0; a > s; s++) {
      for (var h = 0; a > h; h++) {
        var l = this.getPointInPatch(s, h, t, e, n),
            d = this.determineVegTypeAtPos(l);d && this.addVegMeshToPatch(d, l, o, r, i);
      }
    }var c = o.build();return 2 === r && new m(this.world, 1, !0, !0)._combineList(i), c[0];
  }, C.prototype.createBase = function (t) {
    var e = n.defaultMap([n.POSITION, n.TEXCOORD0]);e.BASE = n.createAttribute(1, "Float"), e.OFFSET = n.createAttribute(2, "Float");var r = new n(e, 4, 6);return r.getAttributeBuffer(n.POSITION).set([0, .1 * -t.h, 0, 0, .1 * -t.h, 0, 0, .1 * -t.h, 0, 0, .1 * -t.h, 0]), r.getAttributeBuffer(n.TEXCOORD0).set([t.tx, t.ty, t.tx, t.ty + t.th, t.tx + t.tw, t.ty + t.th, t.tx + t.tw, t.ty]), r.getAttributeBuffer("BASE").set([0, t.h, t.h, 0]), r.getAttributeBuffer("OFFSET").set([.5 * -t.w, 0, .5 * -t.w, t.h, .5 * t.w, t.h, .5 * t.w, 0]), r.getIndexBuffer().set([0, 3, 1, 1, 3, 2]), r;
  };var D = { processors: [P.light.processor, function (t) {
      P.USE_FOG ? (t.setDefine("FOG", !0), t.uniforms.fogSettings = P.FOG_SETTINGS, t.uniforms.fogColor = P.FOG_COLOR) : t.removeDefine("FOG");
    }], attributes: { vertexPosition: n.POSITION, vertexUV0: n.TEXCOORD0, base: "BASE", offset: "OFFSET" }, uniforms: { viewProjectionMatrix: s.VIEW_PROJECTION_MATRIX, cameraPosition: s.CAMERA, diffuseMap: s.DIFFUSE_MAP, normalMap: s.NORMAL_MAP, discardThreshold: -.01, fogSettings: function fogSettings() {
        return P.FOG_SETTINGS;
      }, fogColor: function fogColor() {
        return P.FOG_COLOR;
      }, time: s.TIME }, builder: function builder(t, e) {
      P.light.builder(t, e);
    }, vshader: function vshader() {
      return ["attribute vec3 vertexPosition;", "attribute vec2 vertexUV0;", "attribute float base;", "attribute vec2 offset;", "uniform mat4 viewProjectionMatrix;", "uniform vec3 cameraPosition;", "uniform float time;", P.light.prevertex, "varying vec3 normal;", "varying vec3 binormal;", "varying vec3 tangent;", "varying vec3 vWorldPos;", "varying vec3 viewPosition;", "varying vec2 texCoord0;", "void main(void) {", "vec3 swayPos = vertexPosition;", "vec3 nn = cameraPosition - swayPos.xyz;", "nn.y = 0.0;", "normal = normalize(nn);", "tangent = cross(vec3(0.0, 1.0, 0.0), normal);", "binormal = cross(normal, tangent);", "swayPos.xz += tangent.xz * offset.x;", "swayPos.y += offset.y;", "swayPos.x += sin(time * 0.5 + swayPos.x * 0.4) * base * sin(time * 1.5 + swayPos.y * 0.4) * 0.02 + 0.01;", "	vec4 worldPos = vec4(swayPos, 1.0);", "	vWorldPos = worldPos.xyz;", "	gl_Position = viewProjectionMatrix * worldPos;", P.light.vertex, "	texCoord0 = vertexUV0;", "	viewPosition = cameraPosition - worldPos.xyz;", "}"].join("\n");
    }, fshader: function fshader() {
      return ["uniform sampler2D diffuseMap;", "uniform sampler2D normalMap;", "uniform float discardThreshold;", "uniform vec2 fogSettings;", "uniform vec3 fogColor;", P.light.prefragment, "varying vec3 normal;", "varying vec3 binormal;", "varying vec3 tangent;", "varying vec3 vWorldPos;", "varying vec3 viewPosition;", "varying vec2 texCoord0;", "void main(void)", "{", "	vec4 final_color = texture2D(diffuseMap, texCoord0);", "if (final_color.a < discardThreshold) discard;", "mat3 tangentToWorld = mat3(tangent, binormal, normal);", "vec3 tangentNormal = texture2D(normalMap, texCoord0).xyz * vec3(2.0) - vec3(1.0);", "vec3 worldNormal = (tangentToWorld * tangentNormal);", "vec3 N = normalize(worldNormal);", P.light.fragment, "#ifdef FOG", "float d = pow(smoothstep(fogSettings.x, fogSettings.y, length(viewPosition)), 1.0);", "final_color.rgb = mix(final_color.rgb, fogColor, d);", "#endif", "	gl_FragColor = final_color;", "}"].join("\n");
    } };return C;
}(goo.Material, goo.Camera, goo.Vector3, goo.Transform, goo.TextureCreator, goo.Texture, goo.MeshData, goo.Shader, goo.DirectionalLight, goo.CanvasUtils, goo.Ajax, goo.MeshBuilder, goo.Noise, goo.ValueNoise, goo.TerrainSurface, goo.DynamicLoader, goo.EntityUtils, goo.EntityCombiner, goo.TangentGenerator, goo.MeshDataComponent, goo.ScriptComponent, goo.ShaderBuilder, goo.MathUtils, goo.rsvp), goo.Terrain = function (t, e, r, i, o, a, n, s, h, l, d, u, c, p, f, g, v, m, x, M) {
  "use strict";

  function y(t, e, r) {
    this.world = t.world, this.renderer = t.renderer, this.size = e, this.count = r, this.splatMult = 2, this._gridCache = {};var i = new M(2 / e, 2 / e),
        a = this.drawMaterial1 = new s(C);a.blendState.blending = "AdditiveBlending", a.cullState.cullFace = "Front";var n = this.drawMaterial2 = new s(T);n.cullState.cullFace = "Front";var h = this.drawMaterial3 = new s(S);h.uniforms.size = 1 / e, h.cullState.cullFace = "Front";var l = this.drawMaterial4 = new s(D);l.cullState.cullFace = "Front", this.renderable = { meshData: i, materials: [a], transform: new o() }, this.renderable.transform.setRotationXYZ(0, 0, .5 * Math.PI), this.copyPass = new v(d.screenCopy), this.copyPass.material.depthState.enabled = !1, this.upsamplePass = new v(w), this.upsamplePass.material.depthState.enabled = !1, this.normalmapPass = new v(E), this.normalmapPass.material.depthState.enabled = !1, this.normalmapPass.material.uniforms.resolution = [e, e], this.normalmapPass.material.uniforms.height = 10, this.extractFloatPass = new v(z), this.normalMap = new p(e, e), this.textures = [], this.texturesBounce = [];for (var u = 0; r > u; u++) {
      this.textures[u] = new p(e, e, { magFilter: "NearestNeighbor", minFilter: "NearestNeighborNoMipMaps", wrapS: "EdgeClamp", wrapT: "EdgeClamp", generateMipmaps: !1, type: "Float" }), this.texturesBounce[u] = new p(e, e, { magFilter: "NearestNeighbor", minFilter: "NearestNeighborNoMipMaps", wrapS: "EdgeClamp", wrapT: "EdgeClamp", generateMipmaps: !1, type: "Float" }), e *= .5;
    }h.setTexture("HEIGHT_MAP", this.texturesBounce[0]), l.setTexture("HEIGHT_MAP", this.texturesBounce[0]), this.n = 31, this.gridSize = 4 * (this.n + 1) - 1, console.log("grid size: ", this.gridSize), this.splat = new p(this.size * this.splatMult, this.size * this.splatMult, { wrapS: "EdgeClamp", wrapT: "EdgeClamp", generateMipmaps: !1 }), this.splatCopy = new p(this.size * this.splatMult, this.size * this.splatMult, { wrapS: "EdgeClamp", wrapT: "EdgeClamp", generateMipmaps: !1 }), n.setTexture("SPLAT_MAP", this.splatCopy);
  }var P = window.Ammo;y.prototype.init = function (t) {
    var e = this.world,
        r = this.count,
        i = this.terrainRoot = e.createEntity("TerrainRoot");i.addToWorld(), this.clipmaps = [];for (var o = 0; r > o; o++) {
      var a = Math.pow(2, o),
          n = new s(b, "clipmap" + o);n.uniforms.materialAmbient = [0, 0, 0, 1], n.uniforms.materialDiffuse = [1, 1, 1, 1], n.cullState.frontFace = "CW", n.uniforms.resolution = [1, 1 / a, this.size, this.size], n.uniforms.resolutionNorm = [this.size, this.size];var h = this.createClipmapLevel(e, n, o);h.setScale(a, 1, a), i.attachChild(h);var l = new s(_, "terrainPickingMaterial" + o);l.cullState.frontFace = "CW", l.uniforms.resolution = [1, 1 / a, this.size, this.size], l.blendState = { blending: "NoBlending", blendEquation: "AddEquation", blendSrc: "SrcAlphaFactor", blendDst: "OneMinusSrcAlphaFactor" }, this.clipmaps[o] = { clipmapEntity: h, level: o, size: a, currentX: 1e5, currentY: 1e5, currentZ: 1e5, origMaterial: n, terrainPickingMaterial: l };
    }for (var d = this.clipmaps[this.clipmaps.length - 1], o = this.clipmaps.length - 2; o >= 0; o--) {
      var u = this.clipmaps[o];u.parentClipmap = d, d = u;
    }var c = new x();c.shadowSettings.size = 10;var p = this.lightEntity = e.createEntity(c);p.setTranslation(200, 200, 200), p.setRotation(.5 * -Math.PI, 0, 0), p.addToWorld(), this.lightEntity.lightComponent.hidden = !0, this.floatTexture = t.heightMap instanceof f ? t.heightMap : new f(t.heightMap, { magFilter: "NearestNeighbor", minFilter: "NearestNeighborNoMipMaps", wrapS: "EdgeClamp", wrapT: "EdgeClamp", generateMipmaps: !1, format: "Luminance" }, this.size, this.size), this.splatTexture = t.splatMap instanceof f ? t.splatMap : new f(t.splatMap, { magFilter: "NearestNeighbor", minFilter: "NearestNeighborNoMipMaps", wrapS: "EdgeClamp", wrapT: "EdgeClamp", generateMipmaps: !1, flipY: !1 }, this.size * this.splatMult, this.size * this.splatMult);for (var o = 0; o < this.count; o++) {
      var n = this.clipmaps[o].origMaterial,
          g = this.textures[o];n.setTexture("HEIGHT_MAP", g), n.setTexture("NORMAL_MAP", this.normalMap), n.setTexture("DETAIL_MAP", this.detailMap), n.setTexture("SPLAT_MAP", this.splat), n.setTexture("GROUND_MAP1", t.ground1), n.setTexture("GROUND_MAP2", t.ground2), n.setTexture("GROUND_MAP3", t.ground3), n.setTexture("GROUND_MAP4", t.ground4), n.setTexture("GROUND_MAP5", t.ground5), n.setTexture("STONE_MAP", t.stone);var l = this.clipmaps[o].terrainPickingMaterial;l.setTexture("HEIGHT_MAP", g);
    }this.copyPass.render(this.renderer, this.textures[0], this.floatTexture), this.copyPass.render(this.renderer, this.splatCopy, this.splatTexture), this.copyPass.render(this.renderer, this.splat, this.splatTexture), this.updateTextures();
  }, y.prototype.toggleMarker = function () {
    this.lightEntity.lightComponent.hidden = !this.lightEntity.lightComponent.hidden;
  }, y.prototype.setMarker = function (t, e, r, i, o, a) {
    this.lightEntity.lightComponent.light.shadowSettings.size = .5 * e, a.wrapS = "EdgeClamp", a.wrapT = "EdgeClamp", this.lightEntity.lightComponent.light.lightCookie = a, this.lightEntity.setTranslation(r, 200, i);
  }, y.prototype.pick = function (t, e, r, i) {
    var o = [];this.terrainRoot.traverse(function (t) {
      t.meshDataComponent && t.meshRendererComponent.hidden === !1 && o.push(t);
    });for (var a = 0; a < this.clipmaps.length; a++) {
      var n = this.clipmaps[a];n.clipmapEntity.traverse(function (t) {
        t.meshRendererComponent && (t.meshRendererComponent.isPickable = !0, t.meshRendererComponent.materials[0] = n.terrainPickingMaterial);
      });
    }this.renderer.renderToPick(o, g.mainCamera, !0, !1, !1, e, r, null, !0);var s = {};this.renderer.pick(e, r, s, g.mainCamera), t.getWorldPosition(e, r, this.renderer.viewportWidth, this.renderer.viewportHeight, s.depth, i);for (var a = 0; a < this.clipmaps.length; a++) {
      var n = this.clipmaps[a];n.clipmapEntity.traverse(function (t) {
        t.meshRendererComponent && (t.meshRendererComponent.isPickable = !1, t.meshRendererComponent.materials[0] = n.origMaterial);
      });
    }
  }, y.prototype.draw = function (t, e, r, o, a, n, s, l, d) {
    s = i.clamp(s, 0, 1), o = 2 * (o - this.size / 2), n = 2 * (n - this.size / 2), "paint" === t ? (this.renderable.materials[0] = this.drawMaterial2, this.renderable.materials[0].uniforms.opacity = s, "add" === e ? (this.renderable.materials[0].blendState.blendEquationColor = "AddEquation", this.renderable.materials[0].blendState.blendEquationAlpha = "AddEquation") : "sub" === e && (this.renderable.materials[0].blendState.blendEquationColor = "ReverseSubtractEquation", this.renderable.materials[0].blendState.blendEquationAlpha = "ReverseSubtractEquation"), l ? this.renderable.materials[0].setTexture(h.DIFFUSE_MAP, l) : this.renderable.materials[0].setTexture(h.DIFFUSE_MAP, this.defaultBrushTexture), this.renderable.transform.translation.setDirect(o / this.size, n / this.size, 0), this.renderable.transform.scale.setDirect(-r, r, r), this.renderable.transform.update(), this.copyPass.render(this.renderer, this.splatCopy, this.splat), this.renderable.materials[0].uniforms.rgba = d || [1, 1, 1, 1], this.renderer.render(this.renderable, m.camera, [], this.splat, !1)) : "smooth" === t ? (this.renderable.materials[0] = this.drawMaterial3, this.renderable.materials[0].uniforms.opacity = s, l ? this.renderable.materials[0].setTexture(h.DIFFUSE_MAP, l) : this.renderable.materials[0].setTexture(h.DIFFUSE_MAP, this.defaultBrushTexture), this.renderable.transform.translation.setDirect(o / this.size, n / this.size, 0), this.renderable.transform.scale.setDirect(-r, r, r), this.renderable.transform.update(), this.copyPass.render(this.renderer, this.texturesBounce[0], this.textures[0]), this.renderer.render(this.renderable, m.camera, [], this.textures[0], !1)) : "flatten" === t ? (this.renderable.materials[0] = this.drawMaterial4, this.renderable.materials[0].uniforms.opacity = s, this.renderable.materials[0].uniforms.height = a, l ? this.renderable.materials[0].setTexture(h.DIFFUSE_MAP, l) : this.renderable.materials[0].setTexture(h.DIFFUSE_MAP, this.defaultBrushTexture), this.renderable.transform.translation.setDirect(o / this.size, n / this.size, 0), this.renderable.transform.scale.setDirect(-r, r, r), this.renderable.transform.update(), this.copyPass.render(this.renderer, this.texturesBounce[0], this.textures[0]), this.renderer.render(this.renderable, m.camera, [], this.textures[0], !1)) : (this.renderable.materials[0] = this.drawMaterial1, this.renderable.materials[0].uniforms.opacity = s, "add" === e ? this.renderable.materials[0].blendState.blending = "AdditiveBlending" : "sub" === e ? this.renderable.materials[0].blendState.blending = "SubtractiveBlending" : "mul" === e && (this.renderable.materials[0].blendState.blending = "MultiplyBlending"), l ? this.renderable.materials[0].setTexture(h.DIFFUSE_MAP, l) : this.renderable.materials[0].setTexture(h.DIFFUSE_MAP, this.defaultBrushTexture), this.renderable.transform.translation.setDirect(o / this.size, n / this.size, 0), this.renderable.transform.scale.setDirect(-r, r, r), this.renderable.transform.update(), this.renderer.render(this.renderable, m.camera, [], this.textures[0], !1));
  }, y.prototype.getTerrainData = function () {
    var t = new Uint8Array(this.size * this.size * 4);this.extractFloatPass.render(this.renderer, this.texturesBounce[0], this.textures[0]), this.renderer.readPixels(0, 0, this.size, this.size, t);var e = new Float32Array(t.buffer),
        r = new Uint8Array(this.size * this.size * 4);this.normalmapPass.render(this.renderer, this.normalMap, this.textures[0]), this.renderer.readPixels(0, 0, this.size, this.size, r);var i = new Uint8Array(this.size * this.size * 4 * 4);return this.copyPass.render(this.renderer, this.splatCopy, this.splat), this.renderer.readPixels(0, 0, this.size * this.splatMult, this.size * this.splatMult, i), { heights: e, normals: r, splat: i };
  }, y.prototype.updateAmmoBody = function () {
    for (var t = this.getTerrainData().heights, e = this.heightBuffer, r = 0; r < this.size; r++) {
      for (var i = 0; i < this.size; i++) {
        P.setValue(e + 4 * (r * this.size + i), t[(this.size - r - 1) * this.size + i], "float");
      }
    }
  }, y.prototype.setLightmapTexture = function (t) {
    for (var e = 0; e < this.clipmaps.length; e++) {
      var r = this.clipmaps[e];r.clipmapEntity.traverse(function (e) {
        if (e.meshRendererComponent) {
          var r = e.meshRendererComponent.materials[0];t ? (r.setTexture("LIGHT_MAP", t), r.shader.setDefine("LIGHTMAP", !0)) : r.shader.removeDefine("LIGHTMAP");
        }
      });
    }
  }, y.prototype.initAmmoBody = function () {
    var t = this.heightBuffer = P.allocate(4 * this.size * this.size, "float", P.ALLOC_NORMAL);this.updateAmmoBody();var e = 1,
        r = -500,
        i = 500,
        o = 1,
        a = 0,
        n = !1,
        s = new P.btHeightfieldTerrainShape(this.size, this.size, t, e, r, i, o, a, n),
        h = new P.btTransform();h.setIdentity(), h.setOrigin(new P.btVector3(this.size / 2, 0, this.size / 2));var l = new P.btDefaultMotionState(h),
        d = new P.btVector3(0, 0, 0),
        u = 0,
        c = new P.btRigidBodyConstructionInfo(u, l, s, d),
        p = new P.btRigidBody(c);return p.setFriction(1), this.world.getSystem("AmmoSystem").ammoWorld.addRigidBody(p), p;
  }, y.prototype.updateTextures = function () {
    for (var t = 0; t < this.count - 1; t++) {
      var e = this.textures[t],
          r = this.textures[t + 1];e.magFilter = "Bilinear", e.minFilter = "BilinearNoMipMaps", this.copyPass.render(this.renderer, r, e);
    }for (var i = this.size, t = 0; t < this.count; t++) {
      var o = this.texturesBounce[t],
          e = this.textures[t],
          r = this.textures[t + 1];this.upsamplePass.material.setTexture("MAIN_MAP", e), this.upsamplePass.material.uniforms.res = [i, i, 2 / i, 2 / i], r ? (r.magFilter = "NearestNeighbor", r.minFilter = "NearestNeighborNoMipMaps", this.upsamplePass.render(this.renderer, o, r)) : (e.magFilter = "NearestNeighbor", e.minFilter = "NearestNeighborNoMipMaps", this.upsamplePass.render(this.renderer, o, e)), i *= .5;
    }for (var t = 0; t < this.count; t++) {
      this.copyPass.render(this.renderer, this.textures[t], this.texturesBounce[t]);
    }this.normalmapPass.render(this.renderer, this.normalMap, this.textures[0]);
  }, y.prototype.update = function (t) {
    for (var e = t.x, r = t.y, o = t.z, a = 0; a < this.clipmaps.length; a++) {
      var n = this.clipmaps[a],
          s = Math.floor(.5 * e / n.size),
          h = Math.floor(.5 * r / n.size),
          l = Math.floor(.5 * o / n.size);if (h !== n.currentY) {
        n.currentY = h;var d = this.gridSize * n.size * 2;if (n.clipmapEntity._hidden === !1 && r > d) {
          if (n.clipmapEntity.hide(), a < this.clipmaps.length - 1) {
            var u = this.clipmaps[a + 1];u.clipmapEntity.innermost.meshRendererComponent.hidden = !1, u.clipmapEntity.interior1.meshRendererComponent.hidden = !0, u.clipmapEntity.interior2.meshRendererComponent.hidden = !0;
          }continue;
        }if (n.clipmapEntity._hidden === !0 && d >= r && (n.clipmapEntity.show(), a < this.clipmaps.length - 1)) {
          var u = this.clipmaps[a + 1];u.clipmapEntity.innermost.meshRendererComponent.hidden = !0, u.clipmapEntity.interior1.meshRendererComponent.hidden = !1, u.clipmapEntity.interior2.meshRendererComponent.hidden = !1;
        }
      }if (s !== n.currentX || l !== n.currentZ) {
        var c = this.n;if (n.parentClipmap) {
          var p = n.parentClipmap.clipmapEntity.interior1,
              f = n.parentClipmap.clipmapEntity.interior2,
              g = i.moduloPositive(s + 1, 2),
              v = i.moduloPositive(l + 1, 2),
              m = g % 2 === 0 ? -c : c + 1,
              x = v % 2 === 0 ? -c : c + 1;p.setTranslation(-c, 0, x), v = i.moduloPositive(l, 2), x = v % 2 === 0 ? -c : -c + 1, f.setTranslation(m, 0, x);
        }n.clipmapEntity.setTranslation(s * n.size * 2, 0, l * n.size * 2), n.currentX = s, n.currentZ = l;
      }
    }
  }, y.prototype.createClipmapLevel = function (t, e, r) {
    var i = t.createEntity("clipmap" + r);i.addToWorld();var o = this.n;return this.createQuadEntity(t, e, r, i, -2 * o, -2 * o, o, o), this.createQuadEntity(t, e, r, i, -1 * o, -2 * o, o, o), this.createQuadEntity(t, e, r, i, 0 * o, -2 * o, 2, o), this.createQuadEntity(t, e, r, i, 2, -2 * o, o, o), this.createQuadEntity(t, e, r, i, 2 + 1 * o, -2 * o, o, o), this.createQuadEntity(t, e, r, i, -2 * o, -1 * o, o, o), this.createQuadEntity(t, e, r, i, 2 + 1 * o, -1 * o, o, o), this.createQuadEntity(t, e, r, i, -2 * o, 0, o, 2), this.createQuadEntity(t, e, r, i, 2 + 1 * o, 0, o, 2), this.createQuadEntity(t, e, r, i, -2 * o, 2, o, o), this.createQuadEntity(t, e, r, i, 2 + 1 * o, 2, o, o), this.createQuadEntity(t, e, r, i, -2 * o, 2 + 1 * o, o, o), this.createQuadEntity(t, e, r, i, -1 * o, 2 + 1 * o, o, o), this.createQuadEntity(t, e, r, i, 0, 2 + 1 * o, 2, o), this.createQuadEntity(t, e, r, i, 2, 2 + 1 * o, o, o), this.createQuadEntity(t, e, r, i, 2 + 1 * o, 2 + 1 * o, o, o), i.innermost = this.createQuadEntity(t, e, r, i, -o, -o, 2 * o + 2, 2 * o + 2), 0 !== r && (i.innermost.meshRendererComponent.hidden = !0, i.interior1 = this.createQuadEntity(t, e, r, i, -o, -o, 2 * o + 2, 1), i.interior2 = this.createQuadEntity(t, e, r, i, -o, -o, 1, 2 * o + 1)), i;
  }, y.prototype.createQuadEntity = function (t, e, r, i, o, a, n, s) {
    var h = this.createGrid(n, s),
        l = t.createEntity("mesh_" + n + "_" + s, h, e);return l.meshDataComponent.modelBound.xExtent = .5 * n, l.meshDataComponent.modelBound.yExtent = 255, l.meshDataComponent.modelBound.zExtent = .5 * s, l.meshDataComponent.modelBound.center.setDirect(.5 * n, 128, .5 * s), l.meshDataComponent.autoCompute = !1, l.meshRendererComponent.isPickable = !1, l.setTranslation(o, 0, a), i.attachChild(l), l.addToWorld(), l;
  }, y.prototype.createGrid = function (t, e) {
    var r = t + "_" + e;if (this._gridCache[r]) return this._gridCache[r];var i = n.defaultMap([n.POSITION]),
        o = new n(i, (t + 1) * (e + 1), (2 * t + 4) * e);this._gridCache[r] = o, o.indexModes = ["TriangleStrip"];for (var a = o.getAttributeBuffer(n.POSITION), s = o.getIndexBuffer(), h = 0; t + 1 > h; h++) {
      for (var l = 0; e + 1 > l; l++) {
        var d = l * (t + 1) + h;a[3 * d + 0] = h, a[3 * d + 1] = 0, a[3 * d + 2] = l;
      }
    }for (var u = 0, d = 0, l = 0; e > l; l++) {
      s[u++] = l * (t + 1), s[u++] = l * (t + 1);for (var h = 0; t > h; h++) {
        d = l * (t + 1) + h, s[u++] = d + t + 1, s[u++] = d + 1;
      }s[u++] = d + t + 1 + 1, s[u++] = d + t + 1 + 1;
    }return console.log((t + 1) * (e + 1), (2 * t + 4) * e, t * e * 6), o;
  };var b = { defines: { SKIP_SPECULAR: !0 }, processors: [l.light.processor, function (t) {
      l.USE_FOG ? (t.setDefine("FOG", !0), t.uniforms.fogSettings = l.FOG_SETTINGS, t.uniforms.fogColor = l.FOG_COLOR) : t.removeDefine("FOG");
    }], attributes: { vertexPosition: n.POSITION }, uniforms: { viewProjectionMatrix: h.VIEW_PROJECTION_MATRIX, worldMatrix: h.WORLD_MATRIX, cameraPosition: h.CAMERA, heightMap: "HEIGHT_MAP", normalMap: "NORMAL_MAP", detailMap: "DETAIL_MAP", splatMap: "SPLAT_MAP", groundMap1: "GROUND_MAP1", groundMap2: "GROUND_MAP2", groundMap3: "GROUND_MAP3", groundMap4: "GROUND_MAP4", groundMap5: "GROUND_MAP5", stoneMap: "STONE_MAP", lightMap: "LIGHT_MAP", fogSettings: function fogSettings() {
        return l.FOG_SETTINGS;
      }, fogColor: function fogColor() {
        return l.FOG_COLOR;
      }, resolution: [255, 1, 1024, 1024], resolutionNorm: [1024, 1024], col: [0, 0, 0] }, builder: function builder(t, e) {
      l.light.builder(t, e);
    }, vshader: function vshader() {
      return ["attribute vec3 vertexPosition;", "uniform mat4 viewProjectionMatrix;", "uniform mat4 worldMatrix;", "uniform vec3 cameraPosition;", "uniform sampler2D heightMap;", "uniform vec4 resolution;", "varying vec3 vWorldPos;", "varying vec3 viewPosition;", "varying vec4 alphaval;", l.light.prevertex, "const vec2 alphaOffset = vec2(45.0);", "const vec2 oneOverWidth = vec2(1.0 / 16.0);", "void main(void) {", "vec4 worldPos = worldMatrix * vec4(vertexPosition, 1.0);", "vec2 coord = (worldPos.xz + vec2(0.5, 0.5)) / resolution.zw;", "vec4 heightCol = texture2D(heightMap, coord);", "float zf = heightCol.r;", "float zd = heightCol.g;", "vec2 alpha = clamp((abs(worldPos.xz - cameraPosition.xz) * resolution.y - alphaOffset) * oneOverWidth, vec2(0.0), vec2(1.0));", "alpha.x = max(alpha.x, alpha.y);", "float z = mix(zf, zd, alpha.x);", "z = coord.x <= 0.0 || coord.x >= 1.0 || coord.y <= 0.0 || coord.y >= 1.0 ? -2000.0 : z;", "alphaval = vec4(zf, zd, alpha.x, z);", "worldPos.y = z * resolution.x;", "gl_Position = viewProjectionMatrix * worldPos;", "vWorldPos = worldPos.xyz;", "viewPosition = cameraPosition - vWorldPos;", l.light.vertex, "}"].join("\n");
    }, fshader: function fshader() {
      return ["uniform vec3 col;", "uniform sampler2D normalMap;", "uniform sampler2D splatMap;", "uniform sampler2D detailMap;", "uniform sampler2D groundMap1;", "uniform sampler2D groundMap2;", "uniform sampler2D groundMap3;", "uniform sampler2D groundMap4;", "uniform sampler2D groundMap5;", "uniform sampler2D stoneMap;", "uniform sampler2D lightMap;", "uniform vec2 fogSettings;", "uniform vec3 fogColor;", "uniform vec2 resolutionNorm;", "varying vec3 vWorldPos;", "varying vec3 viewPosition;", "varying vec4 alphaval;", l.light.prefragment, "void main(void) {", "if (alphaval.w < -1000.0) discard;", "vec2 mapcoord = vWorldPos.xz / resolutionNorm;", "vec2 coord = mapcoord * 96.0;", "vec4 final_color = vec4(1.0);", "vec3 N = (texture2D(normalMap, mapcoord).xyz * vec3(2.0) - vec3(1.0)).xzy;", "N.y = 0.1;", "N = normalize(N);", "vec4 splat = texture2D(splatMap, mapcoord);", "vec4 g1 = texture2D(groundMap1, coord);", "vec4 g2 = texture2D(groundMap2, coord);", "vec4 g3 = texture2D(groundMap3, coord);", "vec4 g4 = texture2D(groundMap4, coord);", "vec4 g5 = texture2D(groundMap5, coord);", "vec4 stone = texture2D(stoneMap, coord);", "final_color = mix(g1, g2, splat.r);", "final_color = mix(final_color, g3, splat.g);", "final_color = mix(final_color, g4, splat.b);", "final_color = mix(final_color, g5, splat.a);", "float slope = clamp(1.0 - dot(N, vec3(0.0, 1.0, 0.0)), 0.0, 1.0);", "slope = smoothstep(0.15, 0.25, slope);", "final_color = mix(final_color, stone, slope);", "#ifdef LIGHTMAP", "final_color = final_color * texture2D(lightMap, mapcoord);", "#else", l.light.fragment, "#endif", "#ifdef FOG", "float d = pow(smoothstep(fogSettings.x, fogSettings.y, length(viewPosition)), 1.0);", "final_color.rgb = mix(final_color.rgb, fogColor, d);", "#endif", "gl_FragColor = final_color;", "}"].join("\n");
    } },
      w = { attributes: { vertexPosition: n.POSITION, vertexUV0: n.TEXCOORD0 }, uniforms: { diffuseMap: "MAIN_MAP", childMap: h.DIFFUSE_MAP, res: [1, 1, 1, 1] }, vshader: ["attribute vec3 vertexPosition;", "attribute vec2 vertexUV0;", "varying vec2 texCoord0;", "void main(void) {", "	texCoord0 = vertexUV0;", "	gl_Position = vec4(vertexPosition, 1.0);", "}"].join("\n"), fshader: ["uniform sampler2D diffuseMap;", "uniform sampler2D childMap;", "uniform vec4 res;", "varying vec2 texCoord0;", "void main(void)", "{", "	gl_FragColor = texture2D(diffuseMap, texCoord0);", "	vec2 coordMod = mod(floor(texCoord0 * res.xy), 2.0);", "	bvec2 test = equal(coordMod, vec2(0.0));", "	if (all(test)) {", "		gl_FragColor.g = texture2D(childMap, texCoord0).r;", "	} else if (test.x) {", "		gl_FragColor.g = (texture2D(childMap, texCoord0).r + texture2D(childMap, texCoord0 + vec2(0.0, res.w)).r) * 0.5;", "	} else if (test.y) {", "		gl_FragColor.g = (texture2D(childMap, texCoord0).r + texture2D(childMap, texCoord0 + vec2(res.z, 0.0)).r) * 0.5;", "	} else {", "		gl_FragColor.g = (texture2D(childMap, texCoord0).r + texture2D(childMap, texCoord0 + vec2(res.z, res.w)).r) * 0.5;", "	}", "	gl_FragColor.ba = vec2(0.0);", "}"].join("\n") },
      C = { attributes: { vertexPosition: n.POSITION, vertexUV0: n.TEXCOORD0 }, uniforms: { viewProjectionMatrix: h.VIEW_PROJECTION_MATRIX, worldMatrix: h.WORLD_MATRIX, opacity: 1, diffuseMap: h.DIFFUSE_MAP }, vshader: ["attribute vec3 vertexPosition;", "attribute vec2 vertexUV0;", "uniform mat4 viewProjectionMatrix;", "uniform mat4 worldMatrix;", "varying vec2 texCoord0;", "void main(void) {", "	texCoord0 = vertexUV0;", "	gl_Position = viewProjectionMatrix * worldMatrix * vec4(vertexPosition, 1.0);", "}"].join("\n"), fshader: ["uniform sampler2D diffuseMap;", "uniform float opacity;", "varying vec2 texCoord0;", "void main(void)", "{", "	gl_FragColor = texture2D(diffuseMap, texCoord0);", "	gl_FragColor.a *= opacity;", "}"].join("\n") },
      T = { attributes: { vertexPosition: n.POSITION, vertexUV0: n.TEXCOORD0 }, uniforms: { viewProjectionMatrix: h.VIEW_PROJECTION_MATRIX, worldMatrix: h.WORLD_MATRIX, opacity: 1, rgba: [1, 1, 1, 1], diffuseMap: h.DIFFUSE_MAP, splatMap: "SPLAT_MAP" }, vshader: ["attribute vec3 vertexPosition;", "attribute vec2 vertexUV0;", "uniform mat4 viewProjectionMatrix;", "uniform mat4 worldMatrix;", "varying vec2 texCoord0;", "varying vec2 texCoord1;", "void main(void) {", "	vec4 worldPos = worldMatrix * vec4(vertexPosition, 1.0);", "	gl_Position = viewProjectionMatrix * worldPos;", "	texCoord0 = vertexUV0;", "	texCoord1 = worldPos.xy * 0.5 + 0.5;", "}"].join("\n"), fshader: ["uniform sampler2D diffuseMap;", "uniform sampler2D splatMap;", "uniform vec4 rgba;", "uniform float opacity;", "varying vec2 texCoord0;", "varying vec2 texCoord1;", "void main(void)", "{", "	vec4 splat = texture2D(splatMap, texCoord1);", "	vec4 brush = texture2D(diffuseMap, texCoord0);", "	vec4 final = mix(splat, rgba, opacity * length(brush.rgb) * brush.a);", "	gl_FragColor = final;", "}"].join("\n") },
      S = { attributes: { vertexPosition: n.POSITION, vertexUV0: n.TEXCOORD0 }, uniforms: { viewProjectionMatrix: h.VIEW_PROJECTION_MATRIX, worldMatrix: h.WORLD_MATRIX, opacity: 1, size: 1 / 512, diffuseMap: h.DIFFUSE_MAP, heightMap: "HEIGHT_MAP" }, vshader: ["attribute vec3 vertexPosition;", "attribute vec2 vertexUV0;", "uniform mat4 viewProjectionMatrix;", "uniform mat4 worldMatrix;", "varying vec2 texCoord0;", "varying vec2 texCoord1;", "void main(void) {", "	vec4 worldPos = worldMatrix * vec4(vertexPosition, 1.0);", "	gl_Position = viewProjectionMatrix * worldPos;", "	texCoord0 = vertexUV0;", "	texCoord1 = worldPos.xy * 0.5 + 0.5;", "}"].join("\n"), fshader: ["uniform sampler2D diffuseMap;", "uniform sampler2D heightMap;", "uniform float opacity;", "uniform float size;", "varying vec2 texCoord0;", "varying vec2 texCoord1;", "void main(void)", "{", "	float col1 = texture2D(heightMap, texCoord1 + vec2(-size, -size)).r;", "	float col2 = texture2D(heightMap, texCoord1 + vec2(-size, size)).r;", "	float col3 = texture2D(heightMap, texCoord1 + vec2(size, size)).r;", "	float col4 = texture2D(heightMap, texCoord1 + vec2(size, -size)).r;", "	float avg = (col1 + col2 + col3 + col4) * 0.25;", "	gl_FragColor = texture2D(heightMap, texCoord1);", "	vec4 brush = texture2D(diffuseMap, texCoord0);", "	gl_FragColor.r = mix(gl_FragColor.r, avg, brush.r * brush.a * opacity);", "}"].join("\n") },
      D = { attributes: { vertexPosition: n.POSITION, vertexUV0: n.TEXCOORD0 }, uniforms: {
      viewProjectionMatrix: h.VIEW_PROJECTION_MATRIX, worldMatrix: h.WORLD_MATRIX, opacity: 1, height: 0, diffuseMap: h.DIFFUSE_MAP, heightMap: "HEIGHT_MAP" }, vshader: ["attribute vec3 vertexPosition;", "attribute vec2 vertexUV0;", "uniform mat4 viewProjectionMatrix;", "uniform mat4 worldMatrix;", "varying vec2 texCoord0;", "varying vec2 texCoord1;", "void main(void) {", "	vec4 worldPos = worldMatrix * vec4(vertexPosition, 1.0);", "	gl_Position = viewProjectionMatrix * worldPos;", "	texCoord0 = vertexUV0;", "	texCoord1 = worldPos.xy * 0.5 + 0.5;", "}"].join("\n"), fshader: ["uniform sampler2D diffuseMap;", "uniform sampler2D heightMap;", "uniform float opacity;", "uniform float height;", "varying vec2 texCoord0;", "varying vec2 texCoord1;", "void main(void)", "{", "	gl_FragColor = texture2D(heightMap, texCoord1);", "	vec4 brush = texture2D(diffuseMap, texCoord0);", "	gl_FragColor.r = mix(gl_FragColor.r, height, brush.r * brush.a * opacity);", "}"].join("\n") },
      z = { attributes: { vertexPosition: n.POSITION, vertexUV0: n.TEXCOORD0 }, uniforms: { viewProjectionMatrix: h.VIEW_PROJECTION_MATRIX, worldMatrix: h.WORLD_MATRIX, diffuseMap: h.DIFFUSE_MAP }, vshader: ["attribute vec3 vertexPosition;", "attribute vec2 vertexUV0;", "uniform mat4 viewProjectionMatrix;", "uniform mat4 worldMatrix;", "varying vec2 texCoord0;", "void main(void) {", "	texCoord0 = vertexUV0;", "	gl_Position = viewProjectionMatrix * worldMatrix * vec4(vertexPosition, 1.0);", "}"].join("\n"), fshader: ["uniform sampler2D diffuseMap;", "varying vec2 texCoord0;", "float shift_right (float v, float amt) {", "v = floor(v) + 0.5;", "return floor(v / exp2(amt));", "}", "float shift_left (float v, float amt) {", "return floor(v * exp2(amt) + 0.5);", "}", "float mask_last (float v, float bits) {", "return mod(v, shift_left(1.0, bits));", "}", "float extract_bits (float num, float from, float to) {", "from = floor(from + 0.5); to = floor(to + 0.5);", "return mask_last(shift_right(num, from), to - from);", "}", "vec4 encode_float (float val) {", "if (val == 0.0) return vec4(0, 0, 0, 0);", "float sign = val > 0.0 ? 0.0 : 1.0;", "val = abs(val);", "float exponent = floor(log2(val));", "float biased_exponent = exponent + 127.0;", "float fraction = ((val / exp2(exponent)) - 1.0) * 8388608.0;", "float t = biased_exponent / 2.0;", "float last_bit_of_biased_exponent = fract(t) * 2.0;", "float remaining_bits_of_biased_exponent = floor(t);", "float byte4 = extract_bits(fraction, 0.0, 8.0) / 255.0;", "float byte3 = extract_bits(fraction, 8.0, 16.0) / 255.0;", "float byte2 = (last_bit_of_biased_exponent * 128.0 + extract_bits(fraction, 16.0, 23.0)) / 255.0;", "float byte1 = (sign * 128.0 + remaining_bits_of_biased_exponent) / 255.0;", "return vec4(byte4, byte3, byte2, byte1);", "}", "void main(void)", "{", "	gl_FragColor = encode_float(texture2D(diffuseMap, vec2(texCoord0.x, 1.0 - texCoord0.y)).r);", "}"].join("\n") },
      _ = { attributes: { vertexPosition: n.POSITION }, uniforms: { viewMatrix: h.VIEW_MATRIX, projectionMatrix: h.PROJECTION_MATRIX, worldMatrix: h.WORLD_MATRIX, cameraFar: h.FAR_PLANE, cameraPosition: h.CAMERA, heightMap: "HEIGHT_MAP", resolution: [255, 1, 1, 1], id: function id(t) {
        return t.renderable.id + 1;
      } }, vshader: ["attribute vec3 vertexPosition;", "uniform sampler2D heightMap;", "uniform mat4 viewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 worldMatrix;", "uniform float cameraFar;", "uniform vec4 resolution;", "uniform vec3 cameraPosition;", "varying float depth;", "const vec2 alphaOffset = vec2(45.0);", "const vec2 oneOverWidth = vec2(1.0 / 16.0);", "void main(void) {", "vec4 worldPos = worldMatrix * vec4(vertexPosition, 1.0);", "vec2 coord = (worldPos.xz + vec2(0.5, 0.5)) / resolution.zw;", "vec4 heightCol = texture2D(heightMap, coord);", "float zf = heightCol.r;", "float zd = heightCol.g;", "vec2 alpha = clamp((abs(worldPos.xz - cameraPosition.xz) * resolution.y - alphaOffset) * oneOverWidth, vec2(0.0), vec2(1.0));", "alpha.x = max(alpha.x, alpha.y);", "float z = mix(zf, zd, alpha.x);", "worldPos.y = z * resolution.x;", "vec4 mvPosition = viewMatrix * worldPos;", "depth = -mvPosition.z / cameraFar;", "gl_Position = projectionMatrix * mvPosition;", "}"].join("\n"), fshader: ["uniform float id;", "varying float depth;", u.methods.packDepth16, "void main() {", "vec2 packedId = vec2(floor(id/255.0), mod(id, 255.0)) * vec2(1.0/255.0);", "vec2 packedDepth = packDepth16(depth);", "gl_FragColor = vec4(packedId, packedDepth);", "}"].join("\n") },
      E = { attributes: { vertexPosition: n.POSITION, vertexUV0: n.TEXCOORD0 }, uniforms: { viewMatrix: h.VIEW_MATRIX, projectionMatrix: h.PROJECTION_MATRIX, worldMatrix: h.WORLD_MATRIX, heightMap: h.DIFFUSE_MAP, resolution: [512, 512], height: .05 }, vshader: ["attribute vec3 vertexPosition;", "attribute vec2 vertexUV0;", "uniform mat4 viewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 worldMatrix;", "varying vec2 vUv;", "void main() {", "vUv = vertexUV0;", "gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );", "}"].join("\n"), fshader: ["uniform float height;", "uniform vec2 resolution;", "uniform sampler2D heightMap;", "varying vec2 vUv;", "void main() {", "float val = texture2D(heightMap, vUv).x;", "float valU = texture2D(heightMap, vUv + vec2(1.0 / resolution.x, 0.0)).x;", "float valV = texture2D(heightMap, vUv + vec2(0.0, 1.0 / resolution.y)).x;", "vec3 normal = vec3(val - valU, val - valV, height);", "gl_FragColor = vec4((0.5 * normalize(normal) + 0.5), 1.0);", "}"].join("\n") };return y;
}(goo.EntityUtils, goo.MeshDataComponent, goo.MeshRendererComponent, goo.MathUtils, goo.Transform, goo.Vector3, goo.MeshData, goo.Material, goo.Shader, goo.ShaderBuilder, goo.ShaderLib, goo.ShaderFragment, goo.TextureCreator, goo.RenderTarget, goo.Texture, goo.Renderer, goo.FullscreenPass, goo.FullscreenUtils, goo.DirectionalLight, goo.Quad), goo.Vegetation = function (t, e, r, i, o, a, n, s, h, l, d, u, c, p, f, g, v, m, x) {
  "use strict";

  function M() {
    this.calcVec = new o(), this.initDone = !1;
  }M.prototype.init = function (r, i, o, a, n) {
    this.world = r, this.terrainQuery = i, this.vegetationList = {};for (var s in a) {
      var h = a[s],
          l = this.createBase(h);this.vegetationList[s] = l;
    }var d = new e(C, "vegetation");d.setTexture("DIFFUSE_MAP", o), d.cullState.enabled = !1, d.uniforms.discardThreshold = .2, d.blendState.blending = "CustomBlending", d.uniforms.materialAmbient = [0, 0, 0, 0], d.uniforms.materialDiffuse = [1, 1, 1, 1], d.uniforms.materialSpecular = [0, 0, 0, 0], d.renderQueue = 3001, this.material = d, this.patchSize = 15, this.patchDensity = 19, this.gridSize = 7, n && (this.patchSize = n.patchSize || this.patchSize, this.patchDensity = n.patchDensity || this.patchDensity, this.gridSize = n.gridSize || this.gridSize), this.patchSpacing = this.patchSize / this.patchDensity, this.gridSizeHalf = Math.floor(.5 * this.gridSize), this.grid = [];for (var u = this.createPatch(0, 0), c = 0; c < this.gridSize; c++) {
      this.grid[c] = [];for (var p = 0; p < this.gridSize; p++) {
        var f = this.world.createEntity(this.material),
            g = new t(u);g.modelBound.xExtent = this.patchSize, g.modelBound.yExtent = 500, g.modelBound.zExtent = this.patchSize, g.autoCompute = !1, f.set(g), f.addToWorld(), this.grid[c][p] = f, f.meshRendererComponent.cullMode = "Never", f.meshRendererComponent.hidden = !0;
      }
    }d.uniforms.fadeDistMax = this.gridSizeHalf * this.patchSize, d.uniforms.fadeDistMin = .7 * d.uniforms.fadeDistMax, this.currentX = -1e4, this.currentZ = -1e4, this.initDone = !0;
  }, M.prototype.rebuild = function () {
    this.currentX = -1e4, this.currentZ = -1e4;
  };var y = !1;M.prototype.toggle = function () {
    y = !y;for (var t = 0; t < this.gridSize; t++) {
      for (var e = 0; e < this.gridSize; e++) {
        var r = this.grid[t][e];r.skip = y;
      }
    }y || this.rebuild();
  }, M.prototype.update = function (t, e) {
    if (this.initDone && !y) {
      var r = Math.floor(t / this.patchSize),
          o = Math.floor(e / this.patchSize);if (this.currentX !== r || this.currentZ !== o) {
        for (var t = 0; t < this.gridSize; t++) {
          for (var e = 0; e < this.gridSize; e++) {
            var a = r + t,
                n = o + e,
                s = a - this.currentX,
                h = n - this.currentZ;if (!(s >= 0 && s < this.gridSize && h >= 0 && h < this.gridSize)) {
              a -= this.gridSizeHalf, n -= this.gridSizeHalf;var l = i.moduloPositive(a, this.gridSize),
                  d = i.moduloPositive(n, this.gridSize);a *= this.patchSize, n *= this.patchSize;var u = this.grid[l][d],
                  c = this.createPatch(a, n);c ? (u.meshRendererComponent.hidden = !1, u.meshDataComponent.meshData = c, u.meshRendererComponent.worldBound.center.setDirect(a + .5 * this.patchSize, 0, n + .5 * this.patchSize)) : u.meshRendererComponent.hidden = !0;
            }
          }
        }this.currentX = r, this.currentZ = o;
      }
    }
  }, M.prototype.createPatch = function (t, e) {
    for (var r = new p(), i = new a(), n = this.patchDensity, s = this.patchSpacing, l = [0, 10, 0], d = 0; n > d; d++) {
      for (var u = 0; n > u; u++) {
        var c = t + (d + .5 * Math.random()) * s,
            f = e + (u + .5 * Math.random()) * s;l[0] = c, l[2] = f + .5;var g = this.terrainQuery.getHeightAt(l),
            v = this.terrainQuery.getNormalAt(l);null === g && (g = 0), null === v && (v = o.UNIT_Y);var m = v.dot(o.UNIT_Y),
            x = this.terrainQuery.getVegetationType(c, f, m);if (x) {
          var M = .4 * Math.random() + .8;i.scale.setDirect(M, M, M), i.translation.setDirect(0, 0, 0);var y = Math.random() * Math.PI * 2,
              P = Math.sin(y),
              b = Math.cos(y);this.calcVec.setDirect(P, 0, b), this.lookAt(i.rotation, this.calcVec, v), i.translation.setDirect(c, g, f), i.update();var w = this.vegetationList[x];r.addMeshData(w, i);
        }
      }
    }for (var C = r.build(), T = 0; T < C.length; T++) {
      for (var w = C[T], S = w.getAttributeBuffer(h.POSITION), D = w.getAttributeBuffer(h.COLOR), T = 0, z = 0; T < S.length; T += 3, z += 4) {
        var _ = this.terrainQuery.getLightAt([S[T], S[T + 1], S[T + 2]]);D[z] = _, D[z + 1] = _, D[z + 2] = _, D[z + 3] = 1;
      }
    }return C[0];
  };var P = new o(),
      b = new o(),
      w = new o();M.prototype.lookAt = function (t, e, r) {
    var i = P,
        o = b,
        a = w;o.set(r).normalize(), i.set(r).cross(e).normalize(), a.set(o).cross(i);var n = t.data;return n[0] = i.x, n[1] = i.y, n[2] = i.z, n[3] = o.x, n[4] = o.y, n[5] = o.z, n[6] = a.x, n[7] = a.y, n[8] = a.z, this;
  }, M.prototype.createBase = function (t) {
    var e = new m(t.w, t.h, 10, 10);e.attributeMap.BASE = h.createAttribute(1, "Float"), e.attributeMap.COLOR = h.createAttribute(4, "Float"), e.rebuildData(e.vertexCount, e.indexCount, !0), e.getAttributeBuffer(h.NORMAL).set([0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0]), e.getAttributeBuffer(h.TEXCOORD0).set([t.tx, t.ty, t.tx, t.ty + t.th, t.tx + t.tw, t.ty + t.th, t.tx + t.tw, t.ty]), e.getAttributeBuffer("BASE").set([0, t.h, t.h, 0]), e.getAttributeBuffer(h.COLOR).set([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);var r = new p(),
        i = new a();i.translation.y = .5 * t.h - .1 * t.h, i.translation.z = .1 * -t.w, i.update(), r.addMeshData(e, i), i.setRotationXYZ(0, .3 * Math.PI, 0), i.translation.x = .1 * t.w, i.translation.z = .1 * t.w, i.update(), r.addMeshData(e, i), i.setRotationXYZ(0, .3 * -Math.PI, 0), i.translation.x = .1 * -t.w, i.translation.z = .1 * t.w, i.update(), r.addMeshData(e, i);var o = r.build();return o[0];
  };var C = { processors: [x.light.processor, function (t) {
      x.USE_FOG ? (t.setDefine("FOG", !0), t.uniforms.fogSettings = x.FOG_SETTINGS, t.uniforms.fogColor = x.FOG_COLOR) : t.removeDefine("FOG");
    }], attributes: { vertexPosition: h.POSITION, vertexNormal: h.NORMAL, vertexUV0: h.TEXCOORD0, vertexColor: h.COLOR, base: "BASE" }, uniforms: { viewProjectionMatrix: l.VIEW_PROJECTION_MATRIX, worldMatrix: l.WORLD_MATRIX, cameraPosition: l.CAMERA, diffuseMap: l.DIFFUSE_MAP, discardThreshold: -.01, fogSettings: function fogSettings() {
        return x.FOG_SETTINGS;
      }, fogColor: function fogColor() {
        return x.FOG_COLOR;
      }, time: l.TIME, fadeDistMin: 40, fadeDistMax: 50 }, builder: function builder(t, e) {
      x.light.builder(t, e);
    }, vshader: function vshader() {
      return ["attribute vec3 vertexPosition;", "attribute vec3 vertexNormal;", "attribute vec2 vertexUV0;", "attribute vec4 vertexColor;", "attribute float base;", "uniform mat4 viewProjectionMatrix;", "uniform mat4 worldMatrix;", "uniform vec3 cameraPosition;", "uniform float time;", "uniform float fadeDistMin;", "uniform float fadeDistMax;", x.light.prevertex, "varying vec3 normal;", "varying vec3 vWorldPos;", "varying vec3 viewPosition;", "varying vec2 texCoord0;", "varying vec4 color;", "varying float dist;", "void main(void) {", "vec3 swayPos = vertexPosition;", "swayPos.x += sin(time * 1.0 + swayPos.x * 0.5) * base * sin(time * 1.8 + swayPos.y * 0.6) * 0.1 + 0.08;", "vec4 worldPos = worldMatrix * vec4(swayPos, 1.0);", "vWorldPos = worldPos.xyz;", "gl_Position = viewProjectionMatrix * worldPos;", x.light.vertex, "normal = (worldMatrix * vec4(vertexNormal, 0.0)).xyz;", "texCoord0 = vertexUV0;", "color = vertexColor;", "viewPosition = cameraPosition - worldPos.xyz;", "dist = 1.0 - smoothstep(fadeDistMin, fadeDistMax, length(viewPosition.xz));", "}"].join("\n");
    }, fshader: function fshader() {
      return ["uniform sampler2D diffuseMap;", "uniform float discardThreshold;", "uniform vec2 fogSettings;", "uniform vec3 fogColor;", x.light.prefragment, "varying vec3 normal;", "varying vec3 vWorldPos;", "varying vec3 viewPosition;", "varying vec2 texCoord0;", "varying float dist;", "varying vec4 color;", "void main(void)", "{", "vec4 final_color = texture2D(diffuseMap, texCoord0) * color;", "if (final_color.a < discardThreshold) discard;", "final_color.a = min(final_color.a, dist);", "if (final_color.a <= 0.0) discard;", "vec3 N = normalize(normal);", x.light.fragment, "final_color.a = pow(final_color.a, 0.5);", "#ifdef FOG", "float d = pow(smoothstep(fogSettings.x, fogSettings.y, length(viewPosition)), 1.0);", "final_color.rgb = mix(final_color.rgb, fogColor, d);", "#endif", "gl_FragColor = final_color;", "}"].join("\n");
    } };return M;
}(goo.MeshDataComponent, goo.Material, goo.Camera, goo.MathUtils, goo.Vector3, goo.Transform, goo.TextureCreator, goo.Texture, goo.MeshData, goo.Shader, goo.DirectionalLight, goo.CanvasUtils, goo.Ajax, goo.MeshBuilder, goo.Noise, goo.ValueNoise, goo.TerrainSurface, goo.Quad, goo.ShaderBuilder), goo.TerrainHandler = function (t, e, r, i, o, a, n, s, h, l) {
  "use strict";

  function d(o, a, n, s) {
    this.goo = o, this.terrainSize = a, this.resourceFolder = s, this.terrain = new t(o, this.terrainSize, n), this.vegetation = new e(), this.forrest = new r(), this.hidden = !1, this.store = new i(), this.settings = null, this.pick = !0, this.draw = !1, this.eventX = 0, this.eventY = 0, this.vegetationSettings = { gridSize: 7 };
  }d.prototype.isEditing = function () {
    return !this.hidden;
  }, d.prototype.getHeightAt = function (t) {
    return this.terrainQuery ? this.terrainQuery.getHeightAt(t) : 0;
  }, d.prototype.isEditing = function () {
    return !this.hidden;
  }, d.prototype.getHeightAt = function (t) {
    return this.terrainQuery ? this.terrainQuery.getHeightAt(t) : 0;
  };var u = !1,
      c = !1,
      p = function p(t) {
    0 === t.button && (this.eventX = t.clientX, this.eventY = t.clientY, u = !0, c = t.altKey, this.pick = !0, this.draw = !0, console.log("mousedown"));
  },
      f = function f(t) {
    0 === t.button && (u = !1, this.draw = !1, console.log("mouseup"));
  },
      g = function g(t) {
    this.eventX = t.clientX, this.eventY = t.clientY, this.pick = !0, u && (c = t.altKey, this.draw = !0);
  };return d.prototype.toggleEditMode = function () {
    this.terrain.toggleMarker(), this.hidden = !this.hidden, this.hidden ? (this.goo.renderer.domElement.addEventListener("mousedown", p.bind(this), !1), this.goo.renderer.domElement.addEventListener("mouseup", f.bind(this), !1), this.goo.renderer.domElement.addEventListener("mouseout", f.bind(this), !1), this.goo.renderer.domElement.addEventListener("mousemove", g.bind(this), !1)) : (this.goo.renderer.domElement.removeEventListener("mousedown", p), this.goo.renderer.domElement.removeEventListener("mouseup", f), this.goo.renderer.domElement.removeEventListener("mouseout", f), this.goo.renderer.domElement.removeEventListener("mousemove", g), this.terrainInfo = this.terrain.getTerrainData(), this.draw = !1, u = !1), this.forrest.toggle(), this.vegetation.toggle();
  }, d.prototype.initLevel = function (t, e, r) {
    this.settings = e;var i = this.terrainSize,
        o = this._loadData(t.heightMap),
        a = this._loadData(t.splatMap);return l.all([o, a]).then(function (e) {
      var o,
          a = e[0],
          n = e[1];o = a ? new Float32Array(a) : new Float32Array(i * i);var s;return s = n ? new Uint8Array(n) : new Uint8Array(i * i * 4 * 4), this._load(t, o, s, r);
    }.bind(this));
  }, d.prototype._loadData = function (t) {
    var e = new l.Promise(),
        r = new o();return r.get({ url: this.resourceFolder + t, responseType: "arraybuffer" }).then(function (t) {
      e.resolve(t.response);
    }.bind(this), function () {
      e.resolve(null);
    }.bind(this)), e;
  }, d.prototype._textureLoad = function (t) {
    return new h().loadTexture2D(t, { anisotropy: 4 });
  }, d.prototype._load = function (t, e, r, o) {
    var a = [];return a.push(this._textureLoad(this.resourceFolder + t.ground1.texture)), a.push(this._textureLoad(this.resourceFolder + t.ground2.texture)), a.push(this._textureLoad(this.resourceFolder + t.ground3.texture)), a.push(this._textureLoad(this.resourceFolder + t.ground4.texture)), a.push(this._textureLoad(this.resourceFolder + t.ground5.texture)), a.push(this._textureLoad(this.resourceFolder + t.stone.texture)), l.all(a).then(function (a) {
      this.terrain.init({ heightMap: e, splatMap: r, ground1: a[0], ground2: a[1], ground3: a[2], ground4: a[3], ground5: a[4], stone: a[5] }), this.terrainInfo = this.terrain.getTerrainData();var s = this.terrainSize,
          l = new i(),
          d = this.terrainQuery = { getHeightAt: function (t) {
          if (t[0] < 0 || t[0] > s - 1 || t[2] < 0 || t[2] > s - 1) return -1e3;var e = t[0],
              r = s - t[2],
              i = Math.floor(e),
              o = Math.floor(r),
              a = e - i,
              h = r - o,
              l = i + 1,
              d = o + 1;i = n.moduloPositive(i, s), o = n.moduloPositive(o, s), l = n.moduloPositive(l, s), d = n.moduloPositive(d, s);var u = this.terrainInfo.heights[o * s + i],
              c = this.terrainInfo.heights[o * s + l],
              p = this.terrainInfo.heights[d * s + i],
              f = this.terrainInfo.heights[d * s + l];return n.lerp(h, n.lerp(a, u, c), n.lerp(a, p, f));
        }.bind(this), getNormalAt: function (t) {
          var e = t[0],
              r = s - t[2],
              i = Math.floor(e),
              o = Math.floor(r),
              a = i + 1,
              h = o + 1;i = n.moduloPositive(i, s), o = n.moduloPositive(o, s), a = n.moduloPositive(a, s), h = n.moduloPositive(h, s);var d = this.terrainInfo.heights[o * s + i],
              u = this.terrainInfo.heights[o * s + a],
              c = this.terrainInfo.heights[h * s + i];return l.setDirect(d - u, 1, c - d).normalize();
        }.bind(this), getVegetationType: function (e, r, i) {
          var o = Math.random();if (n.smoothstep(.82, .91, i) < o) return null;if (this.terrainInfo) {
            if (e = Math.floor(e), r = Math.floor(r), 0 > e || e > s - 1 || 0 > r || r > s - 1) return null;e *= this.terrain.splatMult, r *= this.terrain.splatMult;var a = 4 * (r * s * this.terrain.splatMult + e),
                h = this.terrainInfo.splat[a + 0] / 255,
                l = this.terrainInfo.splat[a + 1] / 255,
                d = this.terrainInfo.splat[a + 2] / 255,
                u = this.terrainInfo.splat[a + 3] / 255,
                c = h > o ? t.ground2 : l > o ? t.ground3 : d > o ? t.ground4 : u > o ? t.ground5 : t.ground1,
                p = 0;for (var f in c.vegetation) {
              if (p += c.vegetation[f], p > o) return f;
            }return null;
          }return null;
        }.bind(this), getForrestType: function (e, r, i, o) {
          if (n.smoothstep(.8, .88, i) < o) return null;if (this.terrainInfo) {
            if (e = Math.floor(e), r = Math.floor(r), 0 > e || e > s - 1 || 0 > r || r > s - 1) return null;e *= this.terrain.splatMult, r *= this.terrain.splatMult;var a = 4 * (r * s * this.terrain.splatMult + e),
                h = this.terrainInfo.splat[a + 0] / 255,
                l = this.terrainInfo.splat[a + 1] / 255,
                d = this.terrainInfo.splat[a + 2] / 255,
                u = this.terrainInfo.splat[a + 3] / 255,
                c = h > o ? t.ground2 : l > o ? t.ground3 : d > o ? t.ground4 : u > o ? t.ground5 : t.ground1,
                p = 0;for (var f in c.forrest) {
              if (p += c.forrest[f], p > o) return f;
            }return null;
          }return null;
        }.bind(this), getLightAt: function (t) {
          if (t[0] < 0 || t[0] > s - 1 || t[2] < 0 || t[2] > s - 1) return -1e3;if (!this.lightMapData || !this.lightMapSize) return 1;var e = t[0] * this.lightMapSize / s,
              r = (s - t[2]) * this.lightMapSize / s,
              i = Math.floor(e),
              o = Math.floor(r),
              a = e - i,
              h = r - o,
              l = i + 1,
              d = o + 1;i = n.moduloPositive(i, this.lightMapSize), o = n.moduloPositive(o, this.lightMapSize), l = n.moduloPositive(l, this.lightMapSize), d = n.moduloPositive(d, this.lightMapSize);var u = this.lightMapData[o * this.lightMapSize + i],
              c = this.lightMapData[o * this.lightMapSize + l],
              p = this.lightMapData[d * this.lightMapSize + i],
              f = this.lightMapData[d * this.lightMapSize + l];return n.lerp(h, n.lerp(a, u, c), n.lerp(a, p, f)) / 255;
        }.bind(this), getType: function (e, r, i, o) {
          if (n.smoothstep(.8, .88, i) < o) return t.stone;if (this.terrainInfo) {
            if (e = Math.floor(e), r = Math.floor(r), 0 > e || e > s - 1 || 0 > r || r > s - 1) return t.stone;e *= this.terrain.splatMult, r *= this.terrain.splatMult;var a = 4 * (r * s * this.terrain.splatMult + e),
                h = this.terrainInfo.splat[a + 0] / 255,
                l = this.terrainInfo.splat[a + 1] / 255,
                d = this.terrainInfo.splat[a + 2] / 255,
                u = this.terrainInfo.splat[a + 3] / 255,
                c = h > o ? t.ground2 : l > o ? t.ground3 : d > o ? t.ground4 : u > o ? t.ground5 : t.ground1;return c;
          }return t.stone;
        }.bind(this) };return new h().loadTexture2D(this.resourceFolder + t.vegetationAtlas).then(function (e) {
        e.anisotropy = 4;var r = t.vegetationTypes;return new h().loadTexture2D(this.resourceFolder + t.forrestAtlas).then(function (i) {
          return i.anisotropy = 4, new h().loadTexture2D(this.resourceFolder + t.forrestAtlasNormals).then(function (a) {
            var n = t.forrestTypes;this.vegetation.init(this.goo.world, d, e, r, this.vegetationSettings), this.forrest.init(this.goo.world, d, i, a, n, o);
          }.bind(this));
        }.bind(this));
      }.bind(this));
    }.bind(this));
  }, d.prototype.updatePhysics = function () {
    this.terrain.updateAmmoBody();
  }, d.prototype.initPhysics = function () {
    this.ammoBody = this.terrain.initAmmoBody();
  }, d.prototype.useLightmap = function (t, e) {
    if (t) {
      var r = new s(t, { magFilter: "Bilinear", minFilter: "NearestNeighborNoMipMaps", wrapS: "EdgeClamp", wrapT: "EdgeClamp", generateMipmaps: !1, format: "Luminance", type: "UnsignedByte" }, e, e);this.lightMapData = t, this.lightMapSize = e, this.terrain.setLightmapTexture(r);
    } else delete this.lightMapData, delete this.lightMapSize, this.terrain.setLightmapTexture();
  }, d.prototype.useLightmap = function (t, e) {
    if (t) {
      var r = new s(t, { magFilter: "Bilinear", minFilter: "NearestNeighborNoMipMaps", wrapS: "EdgeClamp", wrapT: "EdgeClamp", generateMipmaps: !1, format: "Luminance", type: "UnsignedByte" }, e, e);this.lightMapData = t, this.lightMapSize = e, this.terrain.setLightmapTexture(r);
    } else delete this.lightMapData, delete this.lightMapSize, this.terrain.setLightmapTexture();
  }, d.prototype.update = function (t) {
    var e = t.cameraComponent.camera.translation;if (this.terrain) {
      var r = this.settings;if (this.hidden && this.pick && (this.terrain.pick(t.cameraComponent.camera, this.eventX, this.eventY, this.store), this.terrain.setMarker("add", r.size, this.store.x, this.store.z, r.power, r.brushTexture), this.pick = !1), this.hidden && this.draw) {
        var i = "add";c && (i = "sub");var o = [0, 0, 0, 0];"ground2" === r.rgba ? o = [1, 0, 0, 0] : "ground3" === r.rgba ? o = [0, 1, 0, 0] : "ground4" === r.rgba ? o = [0, 0, 1, 0] : "ground5" === r.rgba && (o = [0, 0, 0, 1]), this.terrain.draw(r.mode, i, r.size, this.store.x, this.store.y, this.store.z, r.power * this.goo.world.tpf * 60 / 100, r.brushTexture, o), this.terrain.updateTextures();
      }this.terrain.update(e);
    }this.vegetation && this.vegetation.update(e.x, e.z), this.forrest && this.forrest.update(e.x, e.z);
  }, d;
}(goo.Terrain, goo.Vegetation, goo.Forrest, goo.Vector3, goo.Ajax, goo.Transform, goo.MathUtils, goo.Texture, goo.TextureCreator, goo.rsvp), "function" == typeof require && (define("goo/addons/terrainpack/TerrainSurface", [], function () {
  return goo.TerrainSurface;
}), define("goo/addons/terrainpack/Forrest", [], function () {
  return goo.Forrest;
}), define("goo/addons/terrainpack/Terrain", [], function () {
  return goo.Terrain;
}), define("goo/addons/terrainpack/Vegetation", [], function () {
  return goo.Vegetation;
}), define("goo/addons/terrainpack/TerrainHandler", [], function () {
  return goo.TerrainHandler;
}));

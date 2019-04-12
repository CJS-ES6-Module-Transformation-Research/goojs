"use strict";

goo.Gizmo = function (t, e, o, i, a, n, r, s, c, l, h, p) {
  "use strict";

  function m(t) {
    this.name = t, this._plane = new s(), this._line = new l(), this._activeHandle = null, this.visible = !1, this.transform = new n(), this.renderables = [], this.onChange = null;
  }m.handleStore = [], m.registerHandle = function (t) {
    var e = m.handleStore.length + 16e3;return m.handleStore.push(t), e;
  }, m.getHandle = function (t) {
    return 16e3 > t ? null : m.handleStore[t - 16e3];
  }, m.prototype.getRenderable = function (t) {
    for (var e = 0; e < this.renderables.length; e++) {
      var o = this.renderables[e];if (o.id === t) return o;
    }
  }, m.prototype.setSnap = function (t) {
    this._snap = t;
  }, m.prototype.activate = function (t) {
    this._activeHandle = t.data, this._activeRenderable = this.getRenderable(t.id), this._activeRenderable.materials[0].uniforms.color = [1, 1, 0];
  }, m.prototype.deactivate = function () {
    if (this._activeRenderable) {
      var t = this._activeRenderable.originalColor;this._activeRenderable.materials[0].uniforms.color = t.slice();
    }
  }, m.prototype.copyTransform = function (t) {
    this.transform.setIdentity(), t && (t.matrix.getTranslation(this.transform.translation), this.transform.rotation.copy(t.rotation), this.updateTransforms());
  }, m.prototype._postProcess = function (t) {
    this.updateTransforms(), this.onChange instanceof Function && this.onChange(t);
  }, m.prototype.updateRenderableTransform = function (t) {
    t.transform.matrix.mul2(this.transform.matrix, t.transform.matrix);
  };var d = 1 / 60;m.prototype.updateTransforms = function () {
    if (a.mainCamera) {
      var t,
          e = a.mainCamera;if (e.projectionMode === h.Perspective) {
        var o = e.translation.distance(this.transform.translation);t = o * d, t *= 2 * Math.tan(e.fov * p.DEG_TO_RAD / 2);
      } else t = (e._frustumTop - e._frustumBottom) / 30;this.transform.scale.setDirect(t, t, t);
    }this.transform.update();for (var i = this.renderables.length - 1; i >= 0; i--) {
      this.renderables[i].transform.update(), this.updateRenderableTransform(this.renderables[i]);
    }
  }, function () {
    var t = new l(),
        e = new l(),
        o = new l(),
        i = new l(),
        n = new l(),
        r = new l(),
        s = new l(),
        c = new l();m.prototype._setPlane = function () {
      var h = this._plane.normal;if ("Plane" === this._activeHandle.type) h.copy([l.UNIT_X, l.UNIT_Y, l.UNIT_Z][this._activeHandle.axis]), h.applyPostVector(this.transform.matrix), h.normalize(), t.copy(l.ZERO), t.applyPostPoint(this.transform.matrix), this._plane.constant = t.dot(h);else {
        switch (t.copy(l.ZERO), t.applyPostPoint(this.transform.matrix), e.copy(l.UNIT_X), e.applyPostPoint(this.transform.matrix), o.copy(l.UNIT_Y), o.applyPostPoint(this.transform.matrix), i.copy(l.UNIT_Z), i.applyPostPoint(this.transform.matrix), a.mainCamera.getScreenCoordinates(t, 1, 1, n), a.mainCamera.getScreenCoordinates(e, 1, 1, r), r.sub(n), a.mainCamera.getScreenCoordinates(o, 1, 1, s), s.sub(n), a.mainCamera.getScreenCoordinates(i, 1, 1, c), c.sub(n), this._activeHandle.axis) {case 0:
            h.copy(s.cross(r).length() > c.cross(r).length() ? i : o);break;case 1:
            h.copy(c.cross(s).length() > r.cross(s).length() ? e : i);break;case 2:
            h.copy(r.cross(c).length() > s.cross(c).length() ? o : e);}h.sub(t).normalize(), this._plane.constant = t.dot(h);
      }
    };
  }(), m.prototype._setLine = function () {
    this._line.copy([l.UNIT_X, l.UNIT_Y, l.UNIT_Z][this._activeHandle.axis]), this._line.applyPostVector(this.transform.matrix), this._line.normalize();
  }, m.prototype.addRenderable = function (t) {
    t.originalColor = t.materials[0].uniforms.color, this.renderables.push(t);
  }, m.buildMaterialForAxis = function (t, e) {
    var o = new i(f, t + "Material");return o.uniforms.color = u[t].slice(), void 0 !== e && 1 > e && (o.blendState.blending = "TransparencyBlending", o.uniforms.opacity = e, o.renderQueue = 3e3), o.cullState.enabled = !1, o;
  };var u = [[1, .1, .3], [.3, 1, .2], [.2, .3, 1], [.8, .8, .8]],
      f = { attributes: { vertexPosition: e.POSITION, vertexNormal: e.NORMAL }, uniforms: { viewProjectionMatrix: o.VIEW_PROJECTION_MATRIX, worldMatrix: o.WORLD_MATRIX, color: [1, 1, 1], opacity: 1 }, vshader: ["attribute vec3 vertexPosition;", "attribute vec3 vertexNormal;", "uniform mat4 viewProjectionMatrix;", "uniform mat4 worldMatrix;", "varying vec3 normal;", "varying vec3 viewPosition;", "void main(void) {", " vec4 worldPos = worldMatrix * vec4(vertexPosition, 1.0);", " gl_Position = viewProjectionMatrix * worldPos;", " normal = vertexNormal;", "}"].join("\n"), fshader: ["varying vec3 normal;", "uniform vec3 color;", "uniform float opacity;", "void main(void)", "{", " vec3 N = normalize(normal);", " vec4 final_color = vec4(color, 1.0);", " vec3 light = vec3(1.0, 1.0, 10.0);", " float dotProduct = dot(N, normalize(light));", " float diffuse = max(dotProduct, 0.0);", " final_color.rgb *= (0.5 * diffuse + 0.5);", " final_color.a = opacity;", " gl_FragColor = final_color;", "}"].join("\n") };return m;
}(goo.ShaderBuilder, goo.MeshData, goo.Shader, goo.Material, goo.Renderer, goo.Transform, goo.Matrix4, goo.Plane, goo.Ray, goo.Vector3, goo.Camera, goo.MathUtils), goo.RotationGizmo = function (t, e, o, i, a, n, r, s, c) {
  "use strict";

  function l() {
    t.call(this, "RotationGizmo"), this._rotation = new a(), this._direction = new i(), this.snap = !1, this._accumulatedRotation = new i(), this._oldAngle = new i(), this.compileRenderables();
  }function h(t, e) {
    return function (o) {
      var i = o % t;return i += 0 > i ? t : 0, e > i ? o - i : i > t - e ? o + t - i : o;
    };
  }function p(e) {
    var o = new n();return o.scale.setDirect(1.2, 1.2, 1.2), { meshData: e, materials: [t.buildMaterialForAxis(3, .6)], transform: new n(), id: t.registerHandle({ type: "Rotate", axis: 3 }) };
  }function m(e, o) {
    var i = new n();return i.scale.setDirect(1.7, 1.7, 1.7), 0 === o ? i.setRotationXYZ(0, c.HALF_PI, 0) : 1 === o && i.setRotationXYZ(c.HALF_PI, 0, 0), { meshData: e, materials: [t.buildMaterialForAxis(o)], transform: i, id: t.registerHandle({ type: "Rotate", axis: o }), thickness: .35 };
  }l.prototype = Object.create(t.prototype), l.prototype.constructor = l;var d = 4;!function () {
    var e = new i(),
        o = new i(),
        a = new i(),
        n = new i(),
        c = new s(),
        h = new i();l.prototype.activate = function (s) {
      if (t.prototype.activate.call(this, s), this._activeHandle.axis < 3) {
        n.copy([i.UNIT_X, i.UNIT_Y, i.UNIT_Z][this._activeHandle.axis]), n.applyPost(this.transform.rotation), e.copy(i.ZERO), e.applyPostPoint(this.transform.matrix), r.mainCamera.getPickRay(s.x, s.y, 1, 1, c), o.copy(c.origin).sub(e);var l = .9 * o.length();o.copy(c.direction).scale(l).add(c.origin), a.copy(o).sub(e), h.copy(n).cross(a), a.copy(h), a.add(o), r.mainCamera.getScreenCoordinates(a, 1, 1, this._direction), this._direction.subDirect(s.x, s.y, 0), this._direction.z = 0, this._direction.normalize();
      }
    };
  }(), l.prototype.process = function (t, e) {
    var o = t.clone().sub(e);3 === this._activeHandle.axis ? this._rotateOnScreen(o) : this._rotateOnAxis(o), this._postProcess(this.transform.rotation);
  }, function () {
    var t = new a(),
        e = new a();l.prototype._rotateOnScreen = function (o) {
      this._rotation.setIdentity(), this._rotation.rotateY(o.x * d), this._rotation.rotateX(o.y * d);var i = r.mainCamera.getViewMatrix();t.copyMatrix4(i), e.set(t).invert(), e.mul(this._rotation), e.mul(t), this.transform.rotation.mul2(e, this.transform.rotation);
    };
  }();var u = h(Math.PI / 4, Math.PI / 16),
      f = function f(t) {
    return t;
  };return l.prototype._applyRotation = function () {
    this.transform.rotation.mul2(this.transform.rotation, this._rotation);
  }, l.prototype._rotateOnAxis = function (t) {
    this._rotation.setIdentity();var e = t.x * this._direction.x + t.y * this._direction.y;e *= d;var o,
        i = this._snap ? u : f;switch (this._activeHandle.axis) {case 0:
        this._accumulatedRotation.x += e, o = i(this._accumulatedRotation.x), this._rotation.rotateX(o - this._oldAngle.x), this._oldAngle.x = o;break;case 1:
        this._accumulatedRotation.y += e, o = i(this._accumulatedRotation.y), this._rotation.rotateY(o - this._oldAngle.y), this._oldAngle.y = o;break;case 2:
        this._accumulatedRotation.z += e, o = i(this._accumulatedRotation.z), this._rotation.rotateZ(o - this._oldAngle.z), this._oldAngle.z = o;}this._applyRotation();
  }, l.prototype.compileRenderables = function () {
    var t = new e(32, 32, 1.1),
        i = new o(64, 8, .1, 2.5);this.addRenderable(p(t)), this.addRenderable(m(i, 0)), this.addRenderable(m(i, 1)), this.addRenderable(m(i, 2));
  }, l;
}(goo.Gizmo, goo.Sphere, goo.Torus, goo.Vector3, goo.Matrix3, goo.Transform, goo.Renderer, goo.Ray, goo.MathUtils), goo.GlobalRotationGizmo = function (t, e, o, i, a, n, r, s, c, l) {
  "use strict";

  function h() {
    t.call(this, "GlobalRotationGizmo"), this._rotation = new n(), this._direction = new a(), this.snap = !1, this._accumulatedRotation = new a(), this._oldAngle = new a(), this.compileRenderables();
  }return h.prototype = Object.create(t.prototype), h.prototype.constructor = h, function () {
    var e = new a(),
        o = new a(),
        i = new a(),
        n = new a(),
        r = new l(),
        s = new a();h.prototype.activate = function (l) {
      if (t.prototype.activate.call(this, l), this._activeHandle.axis < 3) {
        n.copy([a.UNIT_X, a.UNIT_Y, a.UNIT_Z][this._activeHandle.axis]), e.copy(a.ZERO), e.applyPostPoint(this.transform.matrix), c.mainCamera.getPickRay(l.x, l.y, 1, 1, r), o.copy(r.origin).sub(e);var h = .9 * o.length();o.copy(r.direction).scale(h).add(r.origin), i.copy(o).sub(e), s.copy(n).cross(i), i.copy(s), i.add(o), c.mainCamera.getScreenCoordinates(i, 1, 1, this._direction), this._direction.subDirect(l.x, l.y, 0), this._direction.z = 0, this._direction.normalize();
      }
    };
  }(), h.prototype.process = e.prototype.process, h.prototype._rotateOnScreen = e.prototype._rotateOnScreen, h.prototype._applyRotation = function () {
    this.transform.rotation.mul2(this._rotation, this.transform.rotation);
  }, h.prototype._rotateOnAxis = e.prototype._rotateOnAxis, function () {
    var t = new s();h.prototype.updateRenderableTransform = function (e) {
      t.copy(this.transform), t.rotation.setIdentity(), t.update(), e.transform.matrix.mul2(t.matrix, e.transform.matrix);
    };
  }(), h.prototype.compileRenderables = e.prototype.compileRenderables, h;
}(goo.Gizmo, goo.RotationGizmo, goo.Sphere, goo.Torus, goo.Vector3, goo.Matrix3, goo.Matrix4, goo.Transform, goo.Renderer, goo.Ray), goo.TranslationGizmo = function (t, e, o, i, a, n, r, s, c) {
  "use strict";

  function l() {
    t.call(this, "TranslationGizmo"), this.realTranslation = new r(), this._snap = !1, this.compileRenderables();
  }function h(t) {
    t.x = Math.round(t.x), t.y = Math.round(t.y), t.z = Math.round(t.z);
  }function p(e, o, i) {
    var a = new n(),
        r = new n(),
        s = 1;return r.scale.setDirect(s, s, s), 2 === i ? r.translation.setDirect(s, s, 0) : 0 === i ? (r.translation.setDirect(0, s, s), r.setRotationXYZ(0, Math.PI / 2, 0), a.setRotationXYZ(0, Math.PI / 2, 0)) : 1 === i && (r.translation.setDirect(s, 0, s), r.setRotationXYZ(Math.PI / 2, 0, 0), a.setRotationXYZ(3 * Math.PI / 2, 0, 0)), [{ meshData: e, materials: [t.buildMaterialForAxis(i)], transform: a, id: t.registerHandle({ type: "Axis", axis: i }), thickness: .6 }, { meshData: o, materials: [t.buildMaterialForAxis(i, .6)], transform: r, id: t.registerHandle({ type: "Plane", axis: i }) }];
  }function m() {
    var t = new o(),
        a = new i(32, .6, 2.3),
        r = new i(32, .6),
        s = new e(e.defaultMap([e.POSITION]), 2, 2);s.getAttributeBuffer(e.POSITION).set([0, 0, 0, 0, 0, 7]), s.getIndexBuffer().set([0, 1]), s.indexLengths = null, s.indexModes = ["Lines"];var c = new n();c.translation.setDirect(0, 0, 7), c.update(), t.addMeshData(a, c), c.setRotationXYZ(0, Math.PI, 0), c.update(), t.addMeshData(r, c);var c = new n();c.update(), t.addMeshData(s, c);var l = t.build()[0];return l;
  }return l.prototype = Object.create(t.prototype), l.prototype.constructor = l, l.prototype.activate = function (e) {
    t.prototype.activate.call(this, e), this._setPlane(), "Axis" === this._activeHandle.type && this._setLine(), this.realTranslation.copy(this.transform.translation);
  }, l.prototype.copyTransform = function () {
    t.prototype.copyTransform.apply(this, arguments);
  }, l.prototype.setSnap = function (t) {
    this._snap = t;
  }, function () {
    var t = new s(),
        e = new s();l.prototype.process = function (o, i) {
      c.mainCamera.getPickRay(i.x, i.y, 1, 1, t), c.mainCamera.getPickRay(o.x, o.y, 1, 1, e), "Plane" === this._activeHandle.type ? this._moveOnPlane(t, e, this._plane) : "Axis" === this._activeHandle.type && this._moveOnLine(t, e, this._plane, this._line), this._postProcess(this.transform.translation);
    };
  }(), l.prototype._addTranslation = function (t) {
    this.realTranslation.add(t), this.transform.translation.copy(this.realTranslation), this._snap && h(this.transform.translation);
  }, function () {
    var t = new r(),
        e = new r(),
        o = new r();l.prototype._moveOnPlane = function (i, a, n) {
      n.rayIntersect(i, t, !0), n.rayIntersect(a, e, !0), o.copy(e).sub(t), this._addTranslation(o);
    };
  }(), function () {
    var t = new r(),
        e = new r(),
        o = new r();l.prototype._moveOnLine = function (i, a, n, r) {
      n.rayIntersect(i, t, !0), n.rayIntersect(a, e, !0), o.copy(e).sub(t);var s = o.dot(r);o.copy(r).scale(s), this._addTranslation(o);
    };
  }(), l.prototype.compileRenderables = function () {
    var t = m(),
        e = new a(2, 2);p(t, e, 0).forEach(this.addRenderable, this), p(t, e, 1).forEach(this.addRenderable, this), p(t, e, 2).forEach(this.addRenderable, this);
  }, l;
}(goo.Gizmo, goo.MeshData, goo.MeshBuilder, goo.Disk, goo.Quad, goo.Transform, goo.Vector3, goo.Ray, goo.Renderer), goo.GlobalTranslationGizmo = function (t, e, o) {
  "use strict";

  function i() {
    t.call(this, "GlobalTranslationGizmo"), this.realTranslation = new e(), this._snap = !1, this.compileRenderables();
  }return i.prototype = Object.create(t.prototype), i.prototype.constructor = i, i.prototype.activate = o.prototype.activate, i.prototype.process = o.prototype.process, i.prototype.copyTransform = function (e) {
    t.prototype.copyTransform.call(this, e), this.transform.rotation.setIdentity(), this.updateTransforms();
  }, i.prototype.setSnap = o.prototype.setSnap, i.prototype._addTranslation = o.prototype._addTranslation, i.prototype._moveOnPlane = o.prototype._moveOnPlane, i.prototype._moveOnLine = o.prototype._moveOnLine, i.prototype.compileRenderables = o.prototype.compileRenderables, i;
}(goo.Gizmo, goo.Vector3, goo.TranslationGizmo), goo.ScaleGizmo = function (t, e, o, i, a, n, r, s, c) {
  "use strict";

  function l(e) {
    t.call(this, "ScaleGizmo", e), this._transformScale = new r(1, 1, 1), this.compileRenderables();
  }function h(e) {
    return { meshData: e, materials: [t.buildMaterialForAxis(3)], transform: new a(), id: t.registerHandle({ type: "Scale", axis: 3 }) };
  }function p(e, o) {
    var i = new a();return 0 === o ? i.setRotationXYZ(0, Math.PI / 2, 0) : 1 === o && i.setRotationXYZ(3 * Math.PI / 2, 0, 0), { meshData: e, materials: [t.buildMaterialForAxis(o)], transform: i, id: t.registerHandle({ type: "Scale", axis: o }) };
  }function m() {
    var t = new o(),
        n = new i(),
        r = new e(e.defaultMap([e.POSITION]), 2, 2);r.getAttributeBuffer(e.POSITION).set([0, 0, 0, 0, 0, 1]), r.getIndexBuffer().set([0, 1]), r.indexLengths = null, r.indexModes = ["Lines"];var s = new a();s.translation.setDirect(0, 0, 8), s.update(), t.addMeshData(n, s);var s = new a();s.scale.setDirect(1, 1, 8), s.update(), t.addMeshData(r, s);var c = t.build()[0];return c;
  }l.prototype = Object.create(t.prototype), l.prototype.constructor = l;var d = 1;return l.prototype.activate = function (e) {
    t.prototype.activate.call(this, e), 3 !== this._activeHandle.axis && (this._setPlane(), this._setLine());
  }, l.prototype.copyTransform = function (e) {
    t.prototype.copyTransform.call(this, e), this._transformScale.copy(e.scale);
  }, l.prototype.process = function (t, e) {
    3 === this._activeHandle.axis ? this._scaleUniform(t, e) : this._scaleNonUniform(t, e), this._postProcess(this._transformScale);
  }, l.prototype._scaleUniform = function (t, e) {
    var o = Math.pow(1 + t.x + e.y - e.x - t.y, d),
        i = n.mainCamera.translation.distance(this.transform.translation);o += i / 2e5 * c.sign(o - 1), this._transformScale.scale(o);
  }, function () {
    var t = new s(),
        e = new s(),
        o = new r(),
        i = new r(),
        a = new r(),
        c = ["x", "y", "z"];l.prototype._scaleNonUniform = function (r, s) {
      n.mainCamera.getPickRay(s.x, s.y, 1, 1, t), n.mainCamera.getPickRay(r.x, r.y, 1, 1, e), this._plane.rayIntersect(t, o), this._plane.rayIntersect(e, i), a.copy(i).sub(o), a.div(this.transform.scale).scale(.07);var l = a.dot(this._line),
          h = Math.pow(1 + l, d);this._transformScale[c[this._activeHandle.axis]] *= h;
    };
  }(), l.prototype.compileRenderables = function () {
    var t = new i(1.4, 1.4, 1.4),
        e = m();this.addRenderable(h(t)), this.addRenderable(p(e, 0)), this.addRenderable(p(e, 1)), this.addRenderable(p(e, 2));
  }, l;
}(goo.Gizmo, goo.MeshData, goo.MeshBuilder, goo.Box, goo.Transform, goo.Renderer, goo.Vector3, goo.Ray, goo.MathUtils), goo.GizmoRenderSystem = function (t, e, o, i, a, n, r, s, c, l, h, p, m, d, u, f, y) {
  "use strict";

  function v(o) {
    t.call(this, "GizmoRenderSystem", null), this.renderables = [], this.camera = null, this.gizmos = [new m(), new d(), new u(), new f(), new y()], this.active = !1, this.nextGizmo = null, this.setupCallbacks(o), this.activeGizmo = null, this.viewportWidth = 0, this.viewportHeight = 0, this.domElement = null, this.pickingMaterial = i.createEmptyMaterial(g, "pickingMaterial"), this.pickingMaterial.blendState = { blending: "NoBlending", blendEquation: "AddEquation", blendSrc: "SrcAlphaFactor", blendDst: "OneMinusSrcAlphaFactor" }, this._devicePixelRatio = 1, this._mouseState = new c(), this._oldMouseState = new c(), this._dirty = !1, this._mouseMove = function (t) {
      if (this.activeGizmo) {
        var e = void 0 !== t.offsetX ? t.offsetX : t.layerX,
            o = void 0 !== t.offsetY ? t.offsetY : t.layerY;this._mouseState.setDirect(e / (this.viewportWidth / this._devicePixelRatio), o / (this.viewportHeight / this._devicePixelRatio)), this._dirty = !0;
      }
    }.bind(this), e.addListener("goo.setCurrentCamera", function (t) {
      this.camera = t.camera;
    }.bind(this));
  }v.prototype = Object.create(t.prototype), v.prototype.constructor = v, v.prototype.activate = function (t, e, o) {
    this.active = !0;var i = p.getHandle(t);i && this.activeGizmo && (this._oldMouseState.setDirect(e / (this.viewportWidth / this._devicePixelRatio), o / (this.viewportHeight / this._devicePixelRatio)), this.activeGizmo.activate({ id: t, data: i, x: e / (this.viewportWidth / this._devicePixelRatio), y: o / (this.viewportHeight / this._devicePixelRatio) }), this.domElement.addEventListener("mousemove", this._mouseMove));
  }, v.prototype.deactivate = function () {
    this.activeGizmo.deactivate(), this.active = !1, this.domElement.removeEventListener("mousemove", this._mouseMove), null !== this.nextGizmo && (this.setActiveGizmo(this.nextGizmo), this.nextGizmo = null);
  }, v.prototype.getGizmo = function (t) {
    return this.gizmos[t];
  }, v.prototype.show = function (t) {
    this.entity = t, this.activeGizmo && (this.entity ? this.showGizmo(this.activeGizmo) : this.hideGizmo(this.activeGizmo));
  }, v.prototype.showGizmo = function (t) {
    t.copyTransform(this.entity.transformComponent.worldTransform), t.visible || (this.renderables = t.renderables, t.visible = !0);
  }, v.prototype.hideGizmo = function (t) {
    t.visible && (this.renderables = [], t.visible = !1);
  }, v.prototype.setActiveGizmo = function (t) {
    return this.active ? void (this.nextGizmo = t) : (this.activeGizmo && this.hideGizmo(this.activeGizmo), this.activeGizmo = this.gizmos[t] || null, void (this.activeGizmo && this.entity && this.showGizmo(this.activeGizmo)));
  }, v.prototype.setSnap = function (t) {
    this.activeGizmo && this.activeGizmo.setSnap(t);
  }, v.prototype.setupCallbacks = function (t) {
    if (t && 5 === t.length) return this.gizmos[0].onChange = t[0], this.gizmos[1].onChange = t[1], this.gizmos[2].onChange = t[2], this.gizmos[3].onChange = t[3], void (this.gizmos[4].onChange = t[4]);var e = new r(),
        o = new s(),
        i = function (t) {
      if (this.entity) {
        var e = this.entity.transformComponent.transform.translation;e.copy(t), this.entity.transformComponent.parent && (o.copy(this.entity.transformComponent.parent.worldTransform.matrix), o.invert(), e.applyPostPoint(o)), this.entity.transformComponent.setUpdated();
      }
    }.bind(this);this.gizmos[0].onChange = i, this.gizmos[1].onChange = i;var a = function (t) {
      this.entity && (this.entity.transformComponent.transform.rotation.copy(t), this.entity.transformComponent.parent && (e.copy(this.entity.transformComponent.parent.worldTransform.rotation), e.invert(), this.entity.transformComponent.transform.rotation.mul(e)), this.entity.transformComponent.setUpdated());
    }.bind(this);this.gizmos[2].onChange = a, this.gizmos[3].onChange = a, this.gizmos[4].onChange = function (t) {
      if (this.entity) {
        var e = this.entity.transformComponent.transform.scale;e.copy(t), this.entity.transformComponent.parent && e.div(this.entity.transformComponent.parent.worldTransform.scale), this.entity.transformComponent.setUpdated();
      }
    }.bind(this);
  }, v.prototype.inserted = function () {}, v.prototype.deleted = function () {}, v.prototype.process = function () {
    this.activeGizmo && (this._dirty && (this.activeGizmo.process(this._mouseState, this._oldMouseState), this._oldMouseState.copy(this._mouseState), this._dirty = !1), this.activeGizmo.updateTransforms());
  }, v.prototype.render = function (t) {
    t.checkResize(this.camera), this._devicePixelRatio = t._useDevicePixelRatio && window.devicePixelRatio ? window.devicePixelRatio / t.svg.currentScale : 1, this.domElement || (this.domElement = t.domElement), this.viewportHeight = t.viewportHeight, this.viewportWidth = t.viewportWidth, this.camera && t.render(this.renderables, this.camera, this.lights, null, { color: !1, stencil: !0, depth: !0 }, this.overrideMaterials);
  }, v.prototype.invalidateHandles = function (t) {
    t.invalidateMaterial(this.pickingMaterial), this.gizmos.forEach(function (e) {
      e.renderables.forEach(function (e) {
        e.materials.forEach(function (e) {
          t.invalidateMaterial(e);
        }), t.invalidateMeshData(e.meshData);
      });
    });
  }, v.prototype.renderToPick = function (t, e) {
    for (var o = 0; o < this.renderables.length; o++) {
      var i = this.renderables[o];void 0 !== i.thickness && (i.materials[0].uniforms.thickness = i.thickness);
    }t.renderToPick(this.renderables, this.camera, { color: !1, stencil: !0, depth: !0 }, e, void 0, void 0, void 0, this.pickingMaterial);for (var o = 0; o < this.renderables.length; o++) {
      var i = this.renderables[o];i.thickness && (i.materials[0].uniforms.thickness = 0);
    }
  };var g = { attributes: { vertexPosition: l.POSITION, vertexNormal: l.NORMAL }, processors: [function (t, e) {
      var o = e.meshData.attributeMap;t.defines = t.defines || {};for (var i in o) {
        t.setDefine(i, !0);
      }
    }], uniforms: { viewMatrix: h.VIEW_MATRIX, projectionMatrix: h.PROJECTION_MATRIX, worldMatrix: h.WORLD_MATRIX, cameraFar: h.FAR_PLANE, thickness: 0, id: function id(t) {
        return t.renderable.id + 1;
      } }, vshader: ["attribute vec3 vertexPosition;", "#ifdef NORMAL", "attribute vec3 vertexNormal;", "#endif", "uniform mat4 viewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 worldMatrix;", "uniform float cameraFar;", "uniform float thickness;", "varying float depth;", "void main() {", "#ifdef NORMAL", "vec4 mvPosition = viewMatrix * worldMatrix * vec4( vertexPosition + vertexNormal * thickness, 1.0 );", "#else", "vec4 mvPosition = viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );", "#endif", "depth = length(mvPosition.xyz) / cameraFar;", "gl_Position = projectionMatrix * mvPosition;", "}"].join("\n"), fshader: ["uniform float id;", "varying float depth;", n.methods.packDepth16, "void main() {", "vec2 packedId = vec2(floor(id/255.0), mod(id, 255.0)) * vec2(1.0/255.0);", "vec2 packedDepth = packDepth16(depth);", "gl_FragColor = vec4(packedId, packedDepth);", "}"].join("\n") };return v;
}(goo.System, goo.SystemBus, goo.SimplePartitioner, goo.Material, goo.ShaderLib, goo.ShaderFragment, goo.Matrix3, goo.Matrix4, goo.Vector2, goo.MeshData, goo.Shader, goo.Gizmo, goo.TranslationGizmo, goo.GlobalTranslationGizmo, goo.RotationGizmo, goo.GlobalRotationGizmo, goo.ScaleGizmo), "function" == typeof require && (define("goo/util/gizmopack/Gizmo", [], function () {
  return goo.Gizmo;
}), define("goo/util/gizmopack/RotationGizmo", [], function () {
  return goo.RotationGizmo;
}), define("goo/util/gizmopack/GlobalRotationGizmo", [], function () {
  return goo.GlobalRotationGizmo;
}), define("goo/util/gizmopack/TranslationGizmo", [], function () {
  return goo.TranslationGizmo;
}), define("goo/util/gizmopack/GlobalTranslationGizmo", [], function () {
  return goo.GlobalTranslationGizmo;
}), define("goo/util/gizmopack/ScaleGizmo", [], function () {
  return goo.ScaleGizmo;
}), define("goo/util/gizmopack/GizmoRenderSystem", [], function () {
  return goo.GizmoRenderSystem;
}));

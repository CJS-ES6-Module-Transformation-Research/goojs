"use strict";

goo.ParticleData = function (t) {
  "use strict";

  function e(e) {
    this.component = e, this.index = 0, this.lifeTime = 1, this.emitTime = 0, this.active = 1, this.startPosition = new t(), this.startDirection = new t(), this.startAngle = 0, this.startSize = 1, this.sortValue = 0, this.emitRandom = 0, this.loopAfter = 0;
  }var i = new t(),
      o = new t(),
      r = new t(),
      n = new t();return e.prototype.getWorldPosition = function (t) {
    if (!this.active) return t;var e = this.component,
        a = e.time - this.emitTime;if (e.loop && (a %= this.loopAfter), i.copy(this.startDirection).scale(a), o.copy(e.localSpace ? e._localGravity : e.gravity).scale(a * a * .5), t.copy(this.startPosition).add(i).add(o), e.localVelocityOverLifetime) {
      var s = a / this.loopAfter;e.localVelocityOverLifetime.getVec3IntegralValueAt(s, this.emitRandom, r), r.applyPost(e._localToWorldRotation), t.add(r);
    }if (e.worldVelocityOverLifetime) {
      var s = a / this.loopAfter;e.worldVelocityOverLifetime.getVec3IntegralValueAt(s, this.emitRandom, n), n.applyPost(e._worldToLocalRotation), t.add(n);
    }if (e.localSpace) {
      var l = e.entity.transformComponent.worldTransform;t.applyPost(l.rotation), t.add(l.translation);
    }return t;
  }, e;
}(goo.Vector3), goo.Curve = function () {
  "use strict";

  function t(t) {
    t = t || {}, this.type = t.type || "float", this.timeOffset = t.timeOffset || 0;
  }return t.numberToGLSL = function (t) {
    return -1 === (t + "").indexOf(".") ? t + ".0" : t + "";
  }, t.prototype = { toGLSL: function toGLSL() {
      return "0.0";
    }, getValueAt: function getValueAt() {
      return 0;
    }, getVec4ValueAt: function getVec4ValueAt() {}, getIntegralValueAt: function getIntegralValueAt() {
      return 0;
    }, getVec4IntegralValueAt: function getVec4IntegralValueAt() {}, clone: function clone() {
      return new this.constructor(this);
    } }, t;
}(), goo.ConstantCurve = function (t) {
  "use strict";

  function e(e) {
    e = e || {}, t.call(this, e), this.value = void 0 !== e.value ? e.value : 1;
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.prototype.toGLSL = function () {
    return t.numberToGLSL(this.value);
  }, e.prototype.integralToGLSL = function (e) {
    var i = t.numberToGLSL(this.value);return "(" + i + "*" + e + ")";
  }, e.prototype.getValueAt = function () {
    return this.value;
  }, e.prototype.getIntegralValueAt = function (t) {
    return this.value * t;
  }, e;
}(goo.Curve), goo.LerpCurve = function (t, e) {
  "use strict";

  function i(t) {
    t = t || {}, e.call(this, t), this.curveA = void 0 !== t.curveA ? t.curveA.clone() : null, this.curveB = void 0 !== t.curveB ? t.curveB.clone() : null;
  }return i.prototype = Object.create(e.prototype), i.prototype.constructor = i, i.prototype.toGLSL = function (t, e) {
    return "mix(" + this.curveA.toGLSL(t, e) + "," + this.curveB.toGLSL(t, e) + "," + e + ")";
  }, i.prototype.integralToGLSL = function (t, e) {
    return "mix(" + this.curveA.integralToGLSL(t, e) + "," + this.curveB.integralToGLSL(t, e) + "," + e + ")";
  }, i.prototype.getValueAt = function (e, i) {
    return t.lerp(i, this.curveA.getValueAt(e, i), this.curveB.getValueAt(e, i));
  }, i.prototype.getIntegralValueAt = function (e, i) {
    return t.lerp(i, this.curveA.getIntegralValueAt(e, i), this.curveB.getIntegralValueAt(e, i));
  }, i;
}(goo.MathUtils, goo.Curve), goo.Vector3Curve = function (t, e, i) {
  "use strict";

  function o(o) {
    if (o = o || {}, o = i.clone(o), o.type = "vec3", e.call(this, o), this.x = o.x ? o.x.clone() : new t(), this.y = o.y ? o.y.clone() : new t(), this.z = o.z ? o.z.clone() : new t(), "float" !== this.x.type || "float" !== this.y.type || "float" !== this.z.type) throw new Error("Vector3Curve must have scalar components.");
  }return o.prototype = Object.create(e.prototype), o.prototype.constructor = o, o.prototype.toGLSL = function (t, e) {
    return "vec3(" + [this.x, this.y, this.z].map(function (i) {
      return i.toGLSL(t, e);
    }).join(",") + ")";
  }, o.prototype.integralToGLSL = function (t, e) {
    return "vec3(" + [this.x, this.y, this.z].map(function (i) {
      return i.integralToGLSL(t, e);
    }).join(",") + ")";
  }, o.prototype.getVec3ValueAt = function (t, e, i) {
    i.setDirect(this.x.getValueAt(t, e), this.y.getValueAt(t, e), this.z.getValueAt(t, e));
  }, o.prototype.getVec3IntegralValueAt = function (t, e, i) {
    i.setDirect(this.x.getIntegralValueAt(t, e), this.y.getIntegralValueAt(t, e), this.z.getIntegralValueAt(t, e));
  }, o;
}(goo.ConstantCurve, goo.Curve, goo.ObjectUtils), goo.PolyCurve = function (t) {
  "use strict";

  function e(e) {
    e = e || {}, t.call(this, e), this.segments = e.segments ? e.segments.map(function (t) {
      return t.clone();
    }) : [];
  }return e.prototype = { clone: function clone() {
      return new e(this);
    }, addSegment: function addSegment(t) {
      this.segments.push(t), this.sort();
    }, removeSegment: function removeSegment(t) {
      this.segments.splice(t, 1);
    }, sort: function sort() {
      this.segments = this.segments.sort(function (t, e) {
        return t.timeOffset - e.timeOffset;
      });
    }, toGLSL: function toGLSL(e, i) {
      for (var o = this.segments, r = [], n = 0; n < o.length; n++) {
        var a = o[n],
            s = t.numberToGLSL(a.timeOffset),
            l = "1.0";n < o.length - 1 && (l = t.numberToGLSL(o[n + 1].timeOffset)), r.push("step(" + s + ",t)*step(-" + l + ",-t)*" + a.toGLSL(e, i));
      }return r.join("+");
    }, integralToGLSL: function integralToGLSL(e, i) {
      for (var o = this.segments, r = [], n = 0; n < o.length; n++) {
        var a = o[n],
            s = t.numberToGLSL(a.timeOffset),
            l = "1.0";n < o.length - 1 && (l = t.numberToGLSL(o[n + 1].timeOffset)), r.push(a.integralToGLSL("clamp(" + e + "," + s + "," + l + ")", i));
      }return r.join("+");
    }, getValueAt: function getValueAt(t, e) {
      for (var i = this.segments, o = 0; o < i.length - 1; o++) {
        var r = i[o],
            n = i[o + 1];if (r.timeOffset <= t && n.timeOffset > t) return this.segments[o].getValueAt(t, e);
      }return this.segments[i.length - 1].getValueAt(t, e);
    }, getIntegralValueAt: function getIntegralValueAt(t, e) {
      for (var i = this.segments, o = 0, r = 0; r < i.length; r++) {
        var n = i[r],
            a = 1;if (r < i.length - 1 && (a = i[r + 1].timeOffset), n.timeOffset <= t && a > t) {
          o += this.segments[r].getIntegralValueAt(t, e);break;
        }o += this.segments[r].getIntegralValueAt(a, e);
      }return o;
    } }, e;
}(goo.Curve), goo.LinearCurve = function (t) {
  "use strict";

  function e(e) {
    e = e || {}, t.call(this, e), this.k = void 0 !== e.k ? e.k : 1, this.m = e.m || 0;
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.prototype.fromStartEnd = function (t, e) {
    this.m = t, this.k = e - t;
  }, e.prototype.toGLSL = function (e) {
    return "(" + t.numberToGLSL(this.k) + "*" + e + "+" + t.numberToGLSL(this.m) + ")";
  }, e.prototype.integralToGLSL = function (e) {
    var i = t.numberToGLSL(this.k),
        o = t.numberToGLSL(this.m);return "(" + i + "*" + e + "*" + e + "*0.5+" + o + "*" + e + ")";
  }, e.prototype.getValueAt = function (t) {
    return this.k * (t - this.timeOffset) + this.m;
  }, e.prototype.getIntegralValueAt = function (t) {
    var e = t - this.timeOffset,
        i = this.k,
        o = this.m;return .5 * i * e * e + o * e;
  }, e;
}(goo.Curve), goo.ParticleDebugRenderSystem = function (t, e, i, o, r, n, a, s, l) {
  "use strict";

  function c() {
    e.call(this, "ParticleDebugRenderSystem", ["ParticleSystemComponent"]), this.priority = 3, this.renderList = [], this.camera = null, i.addListener("goo.setCurrentCamera", function (t) {
      this.camera = t.camera;
    }.bind(this)), this.renderAll = !0, this.selection = new t();var c = new r(n.simpleColored);c.uniforms.color = [0, 1, 0], this.sphereRenderable = { materials: [c], transform: new o(), meshData: new a(12, 12, 1) }, this.boxRenderable = { materials: [c], transform: new o(), meshData: new s(1, 1, 1) }, this.coneRenderable = { materials: [c], transform: new o(), meshData: new l(16, 1, 1, 1) }, this.offsetTransform = new o();
  }return c.prototype = Object.create(e.prototype), c.prototype.constructor = c, c.prototype.process = function (t) {
    for (var e = 0; e < t.length; e++) {
      var i = t[e],
          o = i.particleSystemComponent.meshEntity;o && (i.isVisiblyHidden() ? o.meshRendererComponent.hidden = !0 : o.meshRendererComponent.hidden = !this._shouldRenderDebugForEntity(i));
    }
  }, c.prototype._shouldRenderDebugForEntity = function (t) {
    return !this.passive && (this.renderAll || this.selection.contains(t));
  }, c.prototype.render = function (t) {
    if (this.camera && !this.passive) {
      t.checkResize(this.camera);for (var e = this._activeEntities, i = 0, o = e.length; i !== o; i++) {
        var r = e[i];if (this.renderAll || this.selection.contains(r)) {
          var n;switch (r.particleSystemComponent.shapeType) {case "sphere":
              n = this.sphereRenderable;var a = r.particleSystemComponent.sphereRadius;n.transform.scale.setDirect(a, a, a), this.offsetTransform.setIdentity();break;case "box":
              n = this.boxRenderable, n.transform.scale.copy(r.particleSystemComponent.boxExtents), this.offsetTransform.setIdentity();break;case "cone":
              var s = r.particleSystemComponent.coneRadius;n = this.coneRenderable, this.offsetTransform.setIdentity(), n.meshData.radiusTop = s + Math.tan(r.particleSystemComponent.coneAngle) * r.particleSystemComponent.coneLength, n.meshData.radiusBottom = s, n.meshData.height = r.particleSystemComponent.coneLength, n.meshData.rebuild(), n.meshData.setVertexDataUpdated(), this.offsetTransform.translation.set(0, 0, .5 * r.particleSystemComponent.coneLength), this.offsetTransform.rotation.rotateX(3 * Math.PI / 2);}if (n) {
            n.meshData.indexModes = ["Lines"];var l = n.transform,
                c = r.transformComponent.worldTransform;l.rotation.copy(this.offsetTransform.rotation), l.rotation.mul(c.rotation), this.offsetTransform.translation.applyPost(l.rotation), l.translation.copy(this.offsetTransform.translation).add(c.translation), l.update(), t.render(n, this.camera, null, null, !1);
          }
        }
      }
    }
  }, c.prototype.cleanup = function () {}, c.prototype.update = function () {
    for (var t = this._activeEntities, e = t.length; e--;) {
      var i = t[e];this._shouldRenderDebugForEntity(i) ? i.particleSystemComponent.play() : i.particleSystemComponent.stop();
    }this.process(this._activeEntities);
  }, c;
}(goo.EntitySelection, goo.System, goo.SystemBus, goo.Transform, goo.Material, goo.ShaderLib, goo.Sphere, goo.Box, goo.Cylinder), goo.Vector4Curve = function (t, e, i) {
  "use strict";

  function o(o) {
    if (o = o || {}, o = i.clone(o), o.type = "vec4", e.call(this, o), this.x = o.x ? o.x.clone() : new t(), this.y = o.y ? o.y.clone() : new t(), this.z = o.z ? o.z.clone() : new t(), this.w = o.w ? o.w.clone() : new t({ value: 1 }), "float" !== this.x.type || "float" !== this.y.type || "float" !== this.z.type || "float" !== this.w.type) throw new Error("Vector4Curve must have scalar components.");
  }return o.prototype = Object.create(e.prototype), o.prototype.constructor = o, o.prototype.toGLSL = function (t, e) {
    return "vec4(" + [this.x, this.y, this.z, this.w].map(function (i) {
      return i.toGLSL(t, e);
    }).join(",") + ")";
  }, o.prototype.integralToGLSL = function (t, e) {
    return "vec4(" + [this.x, this.y, this.z, this.w].map(function (i) {
      return i.integralToGLSL(t, e);
    }).join(",") + ")";
  }, o.prototype.getVec4ValueAt = function (t, e, i) {
    i.setDirect(this.x.getValueAt(t, e), this.y.getValueAt(t, e), this.z.getValueAt(t, e), this.w.getValueAt(t, e));
  }, o.prototype.getVec4IntegralValueAt = function (t, e, i) {
    i.setDirect(this.x.getIntegralValueAt(t, e), this.y.getIntegralValueAt(t, e), this.z.getIntegralValueAt(t, e), this.w.getIntegralValueAt(t, e));
  }, o;
}(goo.ConstantCurve, goo.Curve, goo.ObjectUtils), goo.ParticleSystemComponent = function (t, e, i, o, r, n, a, s, l, c, u, h, m, f) {
  "use strict";

  function d(t, e) {
    return (t % e + e) % e;
  }function p(n) {
    n = n || {}, a.apply(this, arguments), this.type = "ParticleSystemComponent", this.material = new r({ defines: f.clone(g), attributes: { vertexPosition: o.POSITION, timeInfo: "TIME_INFO", startPos: "START_POS", startDir: "START_DIR", vertexUV0: o.TEXCOORD0 }, uniforms: { viewMatrix: s.VIEW_MATRIX, projectionMatrix: s.PROJECTION_MATRIX, viewProjectionMatrix: s.VIEW_PROJECTION_MATRIX, worldMatrix: s.WORLD_MATRIX, cameraPosition: s.CAMERA, textureTileInfo: [1, 1, 1, 0], invWorldRotation: [1, 0, 0, 0, 1, 0, 0, 0, 1], worldRotation: [1, 0, 0, 0, 1, 0, 0, 0, 1], particleTexture: "PARTICLE_TEXTURE", time: 0, duration: 5, gravity: [0, 0, 0], discardThreshold: 0, uColor: [1, 1, 1, 1], uStartSize: 1, uStartAngle: 1, uRotationSpeed: 1 }, vshader: ["attribute vec3 vertexPosition;", "attribute vec2 vertexUV0;", "attribute vec4 timeInfo;", "attribute vec4 startPos;", "attribute vec4 startDir;", "uniform vec4 textureTileInfo;", "uniform mat4 viewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewProjectionMatrix;", "uniform mat4 worldMatrix;", "uniform mat3 invWorldRotation;", "uniform mat3 worldRotation;", "uniform vec3 cameraPosition;", "uniform float time;", "uniform float duration;", "uniform vec3 gravity;", "uniform vec4 uColor;", "uniform float uStartSize;", "uniform float uStartAngle;", "uniform float uRotationSpeed;", "varying vec4 color;", "varying vec2 coords;", "vec3 getVelocityCurveIntegral(float t, float emitRandom) {", "    return VELOCITY_CURVE_CODE;", "}", "vec3 getWorldVelocityCurveIntegral(float t, float emitRandom) {", "    return WORLD_VELOCITY_CURVE_CODE;", "}", "vec3 getPosition(mat3 invWorldRotation, mat3 worldRotation, float t, vec3 pos, vec3 vel, vec3 g, float emitRandom, float duration) {", "    return pos + vel * t + 0.5 * t * t * g + worldRotation * getVelocityCurveIntegral(t / duration, emitRandom) + invWorldRotation * getWorldVelocityCurveIntegral(t / duration, emitRandom);", "}", "float getScale(float t, float emitRandom) {", "    return SIZE_CURVE_CODE;", "}", "float getStartSize(float t, float emitRandom) {", "    return START_SIZE_CODE;", "}", "float getTextureFrame(float t, float emitRandom) {", "    return TEXTURE_FRAME_CODE;", "}", "float getAngle(float t, float emitRandom) {", "    return ROTATION_CURVE_CODE;", "}", "vec4 getColor(float t, float emitRandom) {", "    return COLOR_CURVE_CODE;", "}", "vec4 getStartColor(float t, float emitRandom) {", "    return START_COLOR_CODE;", "}", "float getStartAngle(float t, float emitRandom) {", "    return START_ROTATION_CURVE_CODE;", "}", "mat4 rotationMatrix(vec3 axis, float angle) {", "    axis = normalize(axis);", "    float s = sin(angle);", "    float c = cos(angle);", "    float x = axis.x;", "    float y = axis.y;", "    float z = axis.z;", "    float oc = 1.0 - c;", "    return mat4(oc * x * x + c, oc * x * y - z * s,  oc * z * x + y * s,  0.0,", "    oc * x * y + z * s, oc * y * y + c, oc * y * z - x * s, 0.0,", "    oc * z * x - y * s, oc * y * z + x * s,  oc * z * z + c, 0.0,", "    0.0, 0.0, 0.0, 1.0);", "}", "void main(void) {", "    float active = timeInfo.y;", "    float emitTime = timeInfo.w;", "    float age = time - emitTime;", "    float ageNoMod = age;", "    float loopAfter = startDir.w;", "    #ifdef LOOP", "    age = mod(age, loopAfter);", "    emitTime = mod(emitTime, loopAfter);", "    #endif", "    float unitEmitTime = mod(emitTime / duration, 1.0);", "    float emitRandom = timeInfo.z;", "    float startSize = uStartSize * getStartSize(unitEmitTime, emitRandom);", "    float lifeTime = timeInfo.x;", "    float startAngle = uStartAngle * getStartAngle(unitEmitTime, emitRandom);", "    float unitAge = age / lifeTime;", "    color = uColor * getStartColor(unitAge, emitRandom) * getColor(unitAge, emitRandom);", "    float textureAnimationCycles = textureTileInfo.z;", "    float tileX = floor(mod(textureTileInfo.x * textureTileInfo.y * getTextureFrame(unitAge, emitRandom) * textureAnimationCycles, textureTileInfo.x));", "    float tileY = floor(mod(-textureTileInfo.y * getTextureFrame(unitAge, emitRandom) * textureAnimationCycles, textureTileInfo.y));", "    vec2 texOffset = vec2(tileX, tileY) / textureTileInfo.xy;", "    coords = (vertexUV0 / textureTileInfo.xy + texOffset);", "    float rotation = uRotationSpeed * getAngle(unitAge, emitRandom) + startAngle;", "    float c = cos(rotation);", "    float s = sin(rotation);", "    mat3 spinMatrix = mat3(c, s, 0, -s, c, 0, 0, 0, 1);", "    active *= step(-lifeTime, -age);", "    #ifdef HIDE_IF_EMITTED_BEFORE_ZERO", "    active *= step(0.0, ageNoMod) * step(0.0, age);", "    #endif", "    vec3 position = getPosition(invWorldRotation, worldRotation, age, startPos.xyz, startDir.xyz, gravity, emitRandom, duration);", "    #ifdef BILLBOARD", "    vec2 offset = ((spinMatrix * vertexPosition)).xy * startSize * getScale(unitAge, emitRandom) * active;", "    mat4 matPos = worldMatrix * mat4(vec4(0),vec4(0),vec4(0),vec4(position,0));", "    gl_Position = viewProjectionMatrix * (worldMatrix + matPos) * vec4(0, 0, 0, 1) + projectionMatrix * vec4(offset.xy, 0, 0);", "    #else", "    mat4 rot = rotationMatrix(normalize(vec3(sin(emitTime*5.0),cos(emitTime*1234.0),sin(emitTime))),rotation);", "    gl_Position = viewProjectionMatrix * worldMatrix * (rot * vec4(startSize * getScale(unitAge, emitRandom) * active * vertexPosition, 1.0) + vec4(position,0.0));", "    #endif", "}"].join("\n"), fshader: ["uniform sampler2D particleTexture;", "uniform float discardThreshold;", "varying vec4 color;", "varying vec2 coords;", "void main(void) {", "#ifdef PARTICLE_TEXTURE", "    vec4 col = color * texture2D(particleTexture, coords);", "#else", "    vec4 col = color;", "#endif", "    if (col.a < discardThreshold) discard;", "    gl_FragColor = col;", "}"].join("\n") }), this.material.cullState.enabled = !1, this.material.uniforms.textureTileInfo = [1, 1, 1, 0], f.extend(this.material.uniforms, { textureTileInfo: [1, 1, 1, 0], invWorldRotation: [1, 0, 0, 0, 1, 0, 0, 0, 1], worldRotation: [1, 0, 0, 0, 1, 0, 0, 0, 1], gravity: [0, 0, 0], uColor: [1, 1, 1, 1] }), this._nextEmitParticleIndex = 0, this._localGravity = new e(), this._lastTime = this.time, this._worldToLocalRotation = new t(), this._localToWorldRotation = new t(), this.entity = null, this.paused = void 0 !== n.paused ? n.paused : !1, this.autoPlay = void 0 !== n.autoPlay ? n.autoPlay : !0, this.particles = [], this.particlesSorted = [], this.time = n.time || 0, this.gravity = n.gravity ? n.gravity.clone() : new e(), this.boxExtents = n.boxExtents ? n.boxExtents.clone() : new e(1, 1, 1), this.startColorScale = n.startColorScale ? n.startColorScale.clone() : new i(1, 1, 1, 1), this.emissionRate = n.emissionRate ? n.emissionRate.clone() : new m({ value: 10 }), this.preWarm = void 0 !== n.preWarm ? n.preWarm : !1, this._initSeed = this._seed = this.seed = void 0 !== n.seed && n.seed > 0 ? n.seed : Math.floor(32768 * Math.random()), this.shapeType = n.shapeType || "cone", this.sphereRadius = void 0 !== n.sphereRadius ? n.sphereRadius : 1, this.sphereEmitFromShell = n.sphereEmitFromShell || !1, this.randomDirection = n.randomDirection || !1, this.coneEmitFrom = n.coneEmitFrom || "base", this.coneRadius = void 0 !== n.coneRadius ? n.coneRadius : 1, this.coneAngle = void 0 !== n.coneAngle ? n.coneAngle : Math.PI / 8, this.coneLength = void 0 !== n.coneLength ? n.coneLength : 1, this.startColor = n.startColor ? n.startColor.clone() : null, this.colorOverLifetime = n.colorOverLifetime ? n.colorOverLifetime.clone() : null, this.duration = void 0 !== n.duration ? n.duration : 5, this.localSpace = void 0 !== n.localSpace ? n.localSpace : !0, this.startSpeed = n.startSpeed ? n.startSpeed.clone() : new m({ value: 5 }), this.localVelocityOverLifetime = n.localVelocityOverLifetime ? n.localVelocityOverLifetime.clone() : null, this.worldVelocityOverLifetime = n.worldVelocityOverLifetime ? n.worldVelocityOverLifetime.clone() : null, this._maxParticles = void 0 !== n.maxParticles ? n.maxParticles : 100, this.startLifetime = n.startLifetime ? n.startLifetime.clone() : new m({ value: 5 }), this.renderQueue = void 0 !== n.renderQueue ? n.renderQueue : 3010, this.discardThreshold = n.discardThreshold || 0, this.loop = void 0 !== n.loop ? n.loop : !0, this.blending = n.blending || "NoBlending", this.depthWrite = void 0 !== n.depthWrite ? n.depthWrite : !0, this.depthTest = void 0 !== n.depthTest ? n.depthTest : !0, this.textureTilesX = void 0 !== n.textureTilesX ? n.textureTilesX : 1, this.textureTilesY = void 0 !== n.textureTilesY ? n.textureTilesY : 1, this.textureAnimationCycles = void 0 !== n.textureAnimationCycles ? n.textureAnimationCycles : 1, this.textureFrameOverLifetime = n.textureFrameOverLifetime ? n.textureFrameOverLifetime.clone() : null, this.startSize = n.startSize ? n.startSize.clone() : null, this.sortMode = void 0 !== n.sortMode ? n.sortMode : p.SORT_NONE, this.mesh = n.mesh ? n.mesh : new h(), this.billboard = void 0 !== n.billboard ? n.billboard : !0, this.sizeOverLifetime = n.sizeOverLifetime ? n.sizeOverLifetime.clone() : null, this.startAngle = n.startAngle ? n.startAngle.clone() : null, this.rotationSpeedOverLifetime = n.rotationSpeedOverLifetime ? n.rotationSpeedOverLifetime.clone() : null, this.texture = n.texture ? n.texture : null, this.boundsRadius = void 0 !== n.boundsRadius ? n.boundsRadius : Number.MAX_VALUE;
  }function v(t, e) {
    t.rotation.copy(e.rotation), t.translation.copy(e.translation), t.update();
  }var g = { START_LIFETIME_CODE: "5.0", START_SIZE_CODE: "1.0", START_ROTATION_CURVE_CODE: "0.0", START_COLOR_CODE: "vec4(1.0)", SIZE_CURVE_CODE: "1.0", ROTATION_CURVE_CODE: "0.0", COLOR_CURVE_CODE: "vec4(1.0)", VELOCITY_CURVE_CODE: "vec3(0.0)", WORLD_VELOCITY_CURVE_CODE: "vec3(0.0)", TEXTURE_FRAME_CODE: "t" };p.prototype = Object.create(a.prototype), p.prototype.constructor = p, p.type = "ParticleSystemComponent", p.SORT_NONE = 1, p.SORT_CAMERA_DISTANCE = 2, Object.defineProperties(p.prototype, { billboard: { get: function get() {
        return this.material.shader.hasDefine("BILLBOARD");
      }, set: function set(t) {
        var e = this.material.shader;t ? e.setDefine("BILLBOARD", !0) : e.removeDefine("BILLBOARD");
      } }, blending: { get: function get() {
        return this.material.blendState.blending;
      }, set: function set(t) {
        this.material.blendState.blending = t;
      } }, colorOverLifetime: { get: function get() {
        return this._colorOverLifetime;
      }, set: function set(t) {
        this._colorOverLifetime = t, this.material.shader.setDefine("COLOR_CURVE_CODE", t ? t.toGLSL("t", "emitRandom") : g.COLOR_CURVE_CODE);
      } }, coneAngle: { get: function get() {
        return this._coneAngle;
      }, set: function set(t) {
        this._coneAngle = t, this._vertexDataDirty = !0;
      } }, coneEmitFrom: { get: function get() {
        return this._coneEmitFrom;
      }, set: function set(t) {
        this._coneEmitFrom = t, this._vertexDataDirty = !0;
      } }, coneLength: { get: function get() {
        return this._coneLength;
      }, set: function set(t) {
        this._coneLength = t, this._vertexDataDirty = !0;
      } }, coneRadius: { get: function get() {
        return this._coneRadius;
      }, set: function set(t) {
        this._coneRadius = t, this._vertexDataDirty = !0;
      } }, depthTest: { get: function get() {
        return this.material.depthState.enabled;
      }, set: function set(t) {
        this.material.depthState.enabled = t;
      } }, depthWrite: { get: function get() {
        return this.material.depthState.write;
      }, set: function set(t) {
        this.material.depthState.write = t;
      } }, discardThreshold: { get: function get() {
        return this.material.uniforms.discardThreshold;
      }, set: function set(t) {
        this.material.uniforms.discardThreshold = t;
      } }, duration: { get: function get() {
        return this.material.uniforms.duration;
      }, set: function set(t) {
        this.material.uniforms.duration = t, this._vertexDataDirty = !0;
      } }, emissionRate: { get: function get() {
        return this._emissionRate;
      }, set: function set(t) {
        this._emissionRate = t, this._vertexDataDirty = !0;
      } }, localSpace: { get: function get() {
        return this._localSpace;
      }, set: function set(t) {
        if (this._localSpace = t, this.meshEntity) {
          var e = this.meshEntity.transformComponent;e.transform.setIdentity(), e.setUpdated();
        }
      } }, localVelocityOverLifetime: { get: function get() {
        return this._localVelocityOverLifetime;
      }, set: function set(t) {
        this._localVelocityOverLifetime = t, this.material.shader.setDefine("VELOCITY_CURVE_CODE", t ? t.integralToGLSL("t", "emitRandom") : g.VELOCITY_CURVE_CODE);
      } }, loop: { get: function get() {
        return this._loop;
      }, set: function set(t) {
        this._loop = t, this._vertexDataDirty = !0;
      } }, maxParticles: { get: function get() {
        return this._maxParticles;
      }, set: function set(t) {
        this._maxParticles = t;var e = this.mesh,
            i = this.meshData;t * e.vertexCount !== i.vertexCount && (i.vertexCount = t * e.vertexCount, i.indexCount = t * e.indexCount, i.rebuildData(i.vertexCount, i.indexCount), this._syncParticleDataArrays(), this._updateVertexData(), this._updateIndexBuffer(this.particles), this._vertexDataDirty = !0);
      } }, mesh: { get: function get() {
        return this._mesh;
      }, set: function set(t) {
        this._mesh = t;var e = this.meshData;e && (e.vertexCount = this.maxParticles * t.vertexCount, e.indexCount = this.maxParticles * t.indexCount, e.rebuildData(e.vertexCount, e.indexCount), this._vertexDataDirty = !0);
      } }, preWarm: { get: function get() {
        return this._preWarm;
      }, set: function set(t) {
        this._preWarm = t, this._vertexDataDirty = !0;
      } }, randomDirection: { get: function get() {
        return this._randomDirection;
      }, set: function set(t) {
        this._randomDirection = t, this._vertexDataDirty = !0;
      } }, renderQueue: { get: function get() {
        return this.material.renderQueue;
      }, set: function set(t) {
        this.material.renderQueue = t;
      } }, rotationSpeedOverLifetime: { get: function get() {
        return this._rotationSpeedOverLifetime;
      }, set: function set(t) {
        this._rotationSpeedOverLifetime = t, this.material.shader.setDefine("ROTATION_CURVE_CODE", t ? t.integralToGLSL("t", "emitRandom") : g.ROTATION_CURVE_CODE);
      } }, rotationSpeedScale: { get: function get() {
        return this.material.uniforms.uRotationSpeed;
      }, set: function set(t) {
        this.material.uniforms.uRotationSpeed = t;
      } }, seed: { get: function get() {
        return this._initSeed;
      }, set: function set(t) {
        t !== this._initSeed && (this._initSeed = t, this._vertexDataDirty = !0);
      } }, shapeType: { get: function get() {
        return this._shapeType;
      }, set: function set(t) {
        this._shapeType = t, this._vertexDataDirty = !0;
      } }, sizeOverLifetime: { get: function get() {
        return this._sizeOverLifetime;
      }, set: function set(t) {
        this._sizeOverLifetime = t, this.material.shader.setDefine("SIZE_CURVE_CODE", t ? t.toGLSL("t", "emitRandom") : g.SIZE_CURVE_CODE);
      } }, sortMode: { get: function get() {
        return this._sortMode;
      }, set: function set(t) {
        this._sortMode = t;var e = this.meshData,
            i = this.mesh;e && i && this._updateIndexBuffer(this.particles);
      } }, sphereEmitFromShell: { get: function get() {
        return this._sphereEmitFromShell;
      }, set: function set(t) {
        this._sphereEmitFromShell = t, this._vertexDataDirty = !0;
      } }, startAngle: { get: function get() {
        return this._startAngle;
      }, set: function set(t) {
        this._startAngle = t, this.material.shader.setDefine("START_ROTATION_CURVE_CODE", t ? t.toGLSL("t", "emitRandom") : g.START_ROTATION_CURVE_CODE);
      } }, startAngleScale: { get: function get() {
        return this.material.uniforms.uStartAngle;
      }, set: function set(t) {
        this.material.uniforms.uStartAngle = t;
      } }, startColor: { get: function get() {
        return this._startColor;
      }, set: function set(t) {
        this._startColor = t, this.material.shader.setDefine("START_COLOR_CODE", t ? t.toGLSL("t", "emitRandom") : g.START_COLOR_CODE);
      } }, startLifetime: { get: function get() {
        return this._startLifetime;
      }, set: function set(t) {
        this._startLifetime = t, this.material.shader.setDefine("START_LIFETIME_CODE", t ? t.toGLSL("t", "emitRandom") : g.START_LIFETIME_CODE);
      } }, startSize: { get: function get() {
        return this._startSize;
      }, set: function set(t) {
        this._startSize = t, this.material.shader.setDefine("START_SIZE_CODE", t ? t.toGLSL("t", "emitRandom") : g.START_SIZE_CODE);
      } }, startSizeScale: { get: function get() {
        return this.material.uniforms.uStartSize;
      }, set: function set(t) {
        this.material.uniforms.uStartSize = t;
      } }, startSpeed: { get: function get() {
        return this._startSpeed;
      }, set: function set(t) {
        this._startSpeed = t, this._vertexDataDirty = !0;
      } }, texture: { get: function get() {
        return this.material.getTexture("PARTICLE_TEXTURE");
      }, set: function set(t) {
        var e = this.material,
            i = e.shader;t ? (e.setTexture("PARTICLE_TEXTURE", t), i.setDefine("PARTICLE_TEXTURE", !0)) : (e.removeTexture("PARTICLE_TEXTURE"), i.removeDefine("PARTICLE_TEXTURE"));
      } }, textureAnimationCycles: { get: function get() {
        return this.material.uniforms.textureTileInfo[2];
      }, set: function set(t) {
        this.material.uniforms.textureTileInfo[2] = t;
      } }, textureFrameOverLifetime: { get: function get() {
        return this._textureFrameOverLifetime;
      }, set: function set(t) {
        this._textureFrameOverLifetime = t, this.material.shader.setDefine("TEXTURE_FRAME_CODE", t ? t.toGLSL("t", "emitRandom") : g.TEXTURE_FRAME_CODE);
      } }, textureTilesX: { get: function get() {
        return this.material.uniforms.textureTileInfo[0];
      }, set: function set(t) {
        this.material.uniforms.textureTileInfo[0] = t;
      } }, textureTilesY: { get: function get() {
        return this.material.uniforms.textureTileInfo[1];
      }, set: function set(t) {
        this.material.uniforms.textureTileInfo[1] = t;
      } }, worldVelocityOverLifetime: { get: function get() {
        return this._worldVelocityOverLifetime;
      }, set: function set(t) {
        this._worldVelocityOverLifetime = t, this.material.shader.setDefine("WORLD_VELOCITY_CURVE_CODE", t ? t.integralToGLSL("t", "emitRandom") : g.WORLD_VELOCITY_CURVE_CODE);
      } } }), p.prototype.setBoxExtents = function (t) {
    this.boxExtents.copy(t), this._vertexDataDirty = !0;
  }, p.prototype._random = function () {
    var t = 1e5 * Math.sin(this._seed++);return t - Math.floor(t);
  }, p.prototype._updateUniforms = function () {
    var e = this.material.uniforms,
        i = this._worldToLocalRotation,
        o = this._localToWorldRotation;this.localSpace ? (i.copy(this.meshEntity.transformComponent.worldTransform.rotation).invert(), o.copy(t.IDENTITY)) : (i.copy(t.IDENTITY), o.copy(this.entity.transformComponent.worldTransform.rotation));var r = this._localGravity;r.copy(this.gravity), r.applyPost(i);var n = e.gravity;n[0] = r.x, n[1] = r.y, n[2] = r.z;for (var a = 0; 9 > a; a++) {
      e.invWorldRotation[a] = i.data[a], e.worldRotation[a] = o.data[a];
    }e.time = this.time;var s = e.uColor,
        l = this.startColorScale;s[0] = l.x, s[1] = l.y, s[2] = l.z, s[3] = l.w;
  }, p.prototype._updateIndexBuffer = function (t) {
    var e = this.mesh,
        i = this.meshData,
        o = e.getIndexBuffer(),
        r = i.getIndexBuffer();i.getIndexData().setDataNeedsRefresh();for (var n = e.vertexCount, a = 0; a < t.length; a++) {
      for (var s = 0; s < o.length; s++) {
        r[a * o.length + s] = o[s] + t[a].index * n;
      }
    }
  }, p.prototype.pause = function () {
    this.paused = !0;
  }, p.prototype.resume = function () {
    this.play();
  }, p.prototype.play = function () {
    this.paused = !1;
  }, p.prototype.stop = function () {
    this.pause(), this.time = 0, this._seed = this._initSeed, this._nextEmitParticleIndex = 0, this._syncParticleDataArrays(), this._updateVertexData();var t = this.meshData;t.rebuildData(t.vertexCount, t.indexCount), this._vertexDataDirty = !0, this._updateIndexBuffer(this.particles), this._updateUniforms();
  }, p.prototype._syncParticleDataArrays = function () {
    for (var t = this.particlesSorted, e = this.particles, i = this.maxParticles; t.length < i;) {
      var o = new c(this);o.index = t.length, o.loopAfter = this.duration, t.push(o), e.push(o);
    }for (; t.length > i;) {
      var o = e.pop();t.splice(t.indexOf(o), 1);
    }
  }, p.prototype._updateVertexData = function () {
    var t,
        e,
        i = this.meshData,
        r = this.maxParticles,
        n = this.particles,
        a = this.duration,
        s = this.material,
        l = i.getAttributeBuffer(o.TEXCOORD0),
        c = i.getAttributeBuffer(o.POSITION),
        u = i.getIndexBuffer(),
        h = this.mesh,
        m = h.getIndexBuffer(),
        f = h.getAttributeBuffer(o.POSITION),
        p = h.getAttributeBuffer(o.TEXCOORD0),
        v = h.vertexCount;for (t = 0; r > t; t++) {
      for (var e = 0; e < p.length; e++) {
        l[t * p.length + e] = p[e];
      }for (var e = 0; e < f.length; e++) {
        c[t * f.length + e] = f[e];
      }for (var e = 0; e < m.length; e++) {
        u[t * m.length + e] = m[e] + t * v;
      }
    }i.setAttributeDataUpdated(o.TEXCOORD0), i.setAttributeDataUpdated(o.POSITION), this.localSpace && this._loop ? s.shader.setDefine("LOOP", !0) : s.shader.removeDefine("LOOP"), this.preWarm ? s.shader.removeDefine("HIDE_IF_EMITTED_BEFORE_ZERO") : s.shader.setDefine("HIDE_IF_EMITTED_BEFORE_ZERO", !0);var g = i.getAttributeBuffer("TIME_INFO"),
        y = this.emissionRate;if (this.localSpace) {
      for (var T = Math.min(Math.ceil(60 * a), 1e5), _ = 0, x = 0, S = 0, C = y.getIntegralValueAt(1), t = 0; r > _ && T > t; t++) {
        var R = (Math.floor(t / T) * C + y.getIntegralValueAt(t / T % 1)) * a,
            O = Math.floor(R - _);for (x = R, _ += O; _ > S && r > S;) {
          n[S++].emitTime = t / T * a;
        }if (S >= r) break;
      }for (; r > S;) {
        var E = n[S];E.emitTime = 2 * a, E.active = 0, S++;
      }
    }var L = this.preWarm,
        D = this.loop;for (t = 0; r > t; t++) {
      var E = n[t],
          A = E.emitRandom = this._random(),
          I = d(E.emitTime / a, 1);if (E.lifeTime = this.startLifetime.getValueAt(I, this._random()), this.localSpace) {
        if (L && D && (E.emitTime -= a), D) {
          var P = E.emitTime;(!L && P >= 0 || L) && (0 >= P && L || a >= P && !L) ? E.active = 1 : E.active = 0, E.loopAfter = Math.max(a, E.lifeTime);
        }
      } else E.emitTime = -2 * E.lifeTime, E.active = 0;for (e = 0; v > e; e++) {
        g[4 * v * t + 4 * e + 0] = E.lifeTime, g[4 * v * t + 4 * e + 1] = E.active, g[4 * v * t + 4 * e + 2] = A, g[4 * v * t + 4 * e + 3] = E.emitTime;
      }
    }i.setAttributeDataUpdated("TIME_INFO");var V = i.getAttributeBuffer("START_POS"),
        b = i.getAttributeBuffer("START_DIR");for (t = 0; r > t; t++) {
      var E = n[t],
          c = E.startPosition,
          w = E.startDirection,
          I = E.emitTime / a % 1;for (this._generateLocalPositionAndDirection(c, w, I), e = 0; v > e; e++) {
        V[4 * v * t + 4 * e + 0] = c.x, V[4 * v * t + 4 * e + 1] = c.y, V[4 * v * t + 4 * e + 2] = c.z, V[4 * v * t + 4 * e + 3] = 0, b[4 * v * t + 4 * e + 0] = w.x, b[4 * v * t + 4 * e + 1] = w.y, b[4 * v * t + 4 * e + 2] = w.z, b[4 * v * t + 4 * e + 3] = E.loopAfter;
      }
    }i.setAttributeDataUpdated("START_POS"), i.setAttributeDataUpdated("START_DIR");
  }, p.prototype._generateLocalPositionAndDirection = function (t, e, i) {
    var o = this.shapeType,
        r = Math.cos,
        n = Math.sin,
        a = Math.PI;if ("sphere" === o) {
      var s = Math.acos(2 * this._random() - 1),
          l = 2 * a * this._random(),
          c = this.sphereRadius;this.sphereEmitFromShell || (c *= Math.cbrt(this._random())), t.setDirect(c * r(l) * n(s), c * r(s), c * n(l) * n(s)), e.setDirect(r(l) * n(s), r(s), n(l) * n(s));
    } else if ("cone" === o) {
      var l = 2 * a * this._random();switch (this.coneEmitFrom) {case "base":
          var u = Math.sqrt(this._random()),
              c = this.coneRadius * u;t.setDirect(c * r(l), 0, c * n(l));var h = (this.coneRadius + this.coneLength * Math.tan(this.coneAngle)) * u;e.setDirect(h * r(l), this.coneLength, h * n(l)).sub(t);break;case "volume":
          var u = Math.sqrt(this._random()),
              c = this.coneRadius * u;t.setDirect(c * r(l), 0, c * n(l));var h = (this.coneRadius + this.coneLength * Math.tan(this.coneAngle)) * u;e.setDirect(h * r(l), this.coneLength, h * n(l)).sub(t), e.setDirect(h * r(l), this.coneLength, h * n(l)), t.lerp(e, this._random()), e.sub(t);break;case "volumeshell":
          var c = this.coneRadius;t.setDirect(c * r(l), 0, c * n(l));var h = this.coneRadius + this.coneLength * Math.tan(this.coneAngle);e.setDirect(h * r(l), this.coneLength, h * n(l)), t.lerp(e, this._random()), e.sub(t);}
    } else t.setDirect(this._random() - .5, this._random() - .5, this._random() - .5).mul(this.boxExtents), e.setDirect(0, 1, 0);if (this.randomDirection) {
      var s = Math.acos(2 * this._random() - 1),
          l = 2 * a * this._random();e.setDirect(r(l) * n(s), r(s), n(l) * n(s));
    }var m = this.startSpeed.getValueAt(i, this._random());e.normalize().scale(m);
  }, p.prototype.emitOne = function (t, e) {
    var i = this.meshData,
        o = i.getAttributeBuffer("START_POS"),
        r = i.getAttributeBuffer("START_DIR"),
        n = i.getAttributeBuffer("TIME_INFO"),
        a = this._nextEmitParticleIndex;this._nextEmitParticleIndex = (this._nextEmitParticleIndex + 1) % this.maxParticles;var s = this.particles[a],
        l = s.startPosition,
        c = s.startDirection;s.emitTime = this.time, l.copy(t), c.copy(e), s.active = 1;for (var u = this.mesh.vertexCount, h = s.emitRandom = this._random(), m = 0; u > m; m++) {
      n[4 * u * a + 4 * m + 0] = s.lifeTime, n[4 * u * a + 4 * m + 1] = s.active, n[4 * u * a + 4 * m + 2] = h, n[4 * u * a + 4 * m + 3] = s.emitTime, o[4 * u * a + 4 * m + 0] = l.x, o[4 * u * a + 4 * m + 1] = l.y, o[4 * u * a + 4 * m + 2] = l.z, o[4 * u * a + 4 * m + 3] = 0, r[4 * u * a + 4 * m + 0] = c.x, r[4 * u * a + 4 * m + 1] = c.y, r[4 * u * a + 4 * m + 2] = c.z, r[4 * u * a + 4 * m + 3] = s.loopAfter;
    }i.setAttributeDataUpdated("START_POS"), i.setAttributeDataUpdated("START_DIR"), i.setAttributeDataUpdated("TIME_INFO");
  }, p.prototype._updateBounds = function () {
    if (this.meshEntity && this.meshEntity.meshRendererComponent.worldBound) {
      var t = this.meshEntity.meshRendererComponent.worldBound;t.center.copy(this.entity.transformComponent.worldTransform.translation);var e = this.boundsRadius;t.xExtent = t.yExtent = t.zExtent = 2 * e;
    }
  };var y = new e();p.prototype._sortParticles = function () {
    if (this.sortMode !== p.SORT_NONE) {
      for (var t = this.particlesSorted, e = t.length; e--;) {
        var i = t[e];i.sortValue = -i.getWorldPosition(y).dot(u.mainCamera._direction);
      }for (var o = t, r = 1, e = o.length; e > r; r++) {
        for (var n = o[r], a = r - 1; a >= 0 && !(o[a].sortValue <= n.sortValue); a--) {
          o[a + 1] = o[a];
        }o[a + 1] = n;
      }this._updateIndexBuffer(t);
    }
  };var T = new e(),
      _ = new e();return p.prototype.process = function (t) {
    if (this._vertexDataDirty && (this._updateVertexData(), this._vertexDataDirty = !1), this.meshEntity.meshRendererComponent.hidden = this.entity.isVisiblyHidden(), !this.paused) {
      this._lastTime = this.time, this.time += t;var e = this.time,
          i = this.entity,
          o = i.transformComponent.worldTransform,
          r = this.particles;if (this.localSpace) {
        var n = this.meshEntity;v(n.transformComponent.transform, i.transformComponent.transform), v(n.transformComponent.worldTransform, i.transformComponent.worldTransform);
      } else {
        var a = this.emissionRate,
            s = this.loop,
            l = this.duration,
            c = d(e / l, 1),
            u = Math.floor(e * a.getValueAt(c, this._random())) - Math.floor(this._lastTime * a.getValueAt(c, this._random()));!s && e > l && (u = 0);for (var h = 0; u > h; h++) {
          if (s) {
            var m = this._findGoodParticle();if (!m) continue;this._nextEmitParticleIndex = m.index;
          } else {
            var m = r[this._nextEmitParticleIndex];if (m.active) continue;
          }this._generateLocalPositionAndDirection(T, _, c), T.applyPostPoint(o.matrix), _.applyPost(o.rotation), this.emitOne(T, _);
        }
      }this._updateUniforms(), this._sortParticles(), this._updateBounds();
    }
  }, p.prototype._findGoodParticle = function () {
    for (var t = this.time, e = this.particles, i = this._nextEmitParticleIndex; i < this._nextEmitParticleIndex + e.length; i++) {
      var o = e[i % e.length],
          r = t - o.emitTime;if (r > o.lifeTime) return o;
    }
  }, p.prototype.attached = function (t) {
    this.entity = t, this._syncParticleDataArrays();var e = o.defaultMap([o.POSITION, o.TEXCOORD0]);e.TIME_INFO = o.createAttribute(4, "Float"), e.START_POS = o.createAttribute(4, "Float"), e.START_DIR = o.createAttribute(4, "Float");var i = this.maxParticles,
        r = new o(e, i * this.mesh.vertexCount, i * this.mesh.indexCount);r.vertexData.setDataUsage("DynamicDraw"), this.meshData = r;var a = new n(this.material);a.castShadows = a.receiveShadows = a.isPickable = a.isReflectable = !1, this.meshEntity = this.entity._world.createEntity(r, "ParticleSystemComponentMesh").set(a).addToWorld(), this.localSpace = this._localSpace, this._vertexDataDirty = !0;
  }, p.prototype.detached = function () {
    this.meshEntity.clearComponent("MeshDataComponent"), this.particles.length = this.particlesSorted.length = 0, this.meshEntity.removeFromWorld(), this.entity = this.meshEntity = null;
  }, p.applyOnEntity = function (t, e) {
    t instanceof p && e.setComponent(t);
  }, p.prototype.clone = function () {
    return new p(this);
  }, p;
}(goo.Matrix3, goo.Vector3, goo.Vector4, goo.MeshData, goo.Material, goo.MeshRendererComponent, goo.Component, goo.Shader, goo.Transform, goo.ParticleData, goo.Renderer, goo.Quad, goo.ConstantCurve, goo.ObjectUtils), goo.ParticleSystemComponentHandler = function (t, e, i, o, r, n, a, s, l, c, u, h, m) {
  "use strict";

  function f() {
    t.apply(this, arguments), this._cachedPresetTextures = {}, this._type = "ParticleSystemComponent";
  }function d(t) {
    return [{ type: "constant", offset: 0, value: t }];
  }function p(t, e) {
    return [{ type: "linear", offset: 0, k: t, m: e }];
  }function v(t, e) {
    e = void 0 !== e ? e : 1;for (var n = new r(), a = 0; a < t.length; a++) {
      var l = t[a];switch (l.type) {case "linear":
          n.addSegment(new i({ timeOffset: l.offset, k: l.k * e, m: l.m * e }));break;case "constant":
          n.addSegment(new o({ timeOffset: l.offset, value: l.value * e }));break;case "lerp":
          n.addSegment(new s({ timeOffset: l.offset, curveA: v(l.curveA, e), curveB: v(l.curveB, e) }));}
    }return n;
  }function g(t) {
    return new n({ x: v(t[0]), y: v(t[1]), z: v(t[2]) });
  }function y(t) {
    return new a({ x: v(t[0]), y: v(t[1]), z: v(t[2]), w: v(t[3]) });
  }return f.prototype = Object.create(t.prototype), f.prototype.constructor = f, t._registerClass("particleSystem", f), f.prototype._prepare = function (t) {
    return c.defaults(t, { gravity: [0, 0, 0], seed: -1, shapeType: "cone", sphereRadius: 1, sphereEmitFromShell: !1, randomDirection: !1, coneEmitFrom: "base", boxExtents: [1, 1, 1], coneRadius: 1, coneAngle: 10, coneLength: 1, startColor: [d(1), d(1), d(1), d(1)], colorOverLifetime: [d(1), d(1), d(1), d(1)], duration: 5, localSpace: !0, startSpeed: d(5), localVelocityOverLifetime: [d(0), d(0), d(0)], worldVelocityOverLifetime: [d(0), d(0), d(0)], maxParticles: 100, emissionRate: d(10), startLifetime: d(5), renderQueue: 3010, discardThreshold: 0, loop: !1, preWarm: !0, blending: "NoBlending", depthWrite: !0, depthTest: !0, textureTilesX: 1, textureTilesY: 1, textureAnimationCycles: 1, textureFrameOverLifetime: p(1, 0), startSize: d(1), sortMode: "none", billboard: !0, sizeOverLifetime: d(1), startAngle: d(0), rotationSpeedOverLifetime: d(0), texturePreset: "Custom", textureRef: null });
  }, f.prototype._create = function () {
    return new e();
  }, f.prototype._remove = function (t) {
    t.clearComponent("ParticleSystemComponent");
  }, f.prototype.update = function (i, o, r) {
    var n = this;return t.prototype.update.call(this, i, o, r).then(function (t) {
      if (t) {
        t.gravity.setArray(o.gravity), t.seed = o.seed, t.shapeType = o.shapeType, t.sphereRadius = o.sphereRadius, t.sphereEmitFromShell = o.sphereEmitFromShell, t.randomDirection = o.randomDirection, t.coneEmitFrom = o.coneEmitFrom, t.setBoxExtents(new u(o.boxExtents)), t.coneRadius = o.coneRadius, t.coneAngle = o.coneAngle * h.DEG_TO_RAD, t.coneLength = o.coneLength, t.startColor = y(o.startColor), t.colorOverLifetime = y(o.colorOverLifetime), t.duration = o.duration, t.localSpace = o.localSpace, t.startSpeed = v(o.startSpeed), t.localVelocityOverLifetime = g(o.localVelocityOverLifetime), t.worldVelocityOverLifetime = g(o.worldVelocityOverLifetime), t.maxParticles = o.maxParticles, t.emissionRate = v(o.emissionRate), t.startLifetime = v(o.startLifetime), t.renderQueue = o.renderQueue, t.discardThreshold = o.discardThreshold, t.loop = o.loop, t.preWarm = o.preWarm, t.blending = o.blending, t.depthWrite = o.depthWrite, t.depthTest = o.depthTest, t.textureTilesX = o.textureTilesX, t.textureTilesY = o.textureTilesY, t.textureFrameOverLifetime = v(o.textureFrameOverLifetime), t.textureAnimationCycles = o.textureAnimationCycles, t.startSize = v(o.startSize), t.sortMode = { none: e.SORT_NONE, camera_distance: e.SORT_CAMERA_DISTANCE }[o.sortMode], t.billboard = o.billboard, t.sizeOverLifetime = v(o.sizeOverLifetime), t.startAngle = v(o.startAngle, h.DEG_TO_RAD), t.rotationSpeedOverLifetime = v(o.rotationSpeedOverLifetime, h.DEG_TO_RAD), t.autoPlay = o.autoPlay, t.paused || t.stop(), t.autoPlay && t.play();var i = [],
            a = n._cachedPresetTextures,
            s = o.texture && o.texture.enabled && o.texture.textureRef;return s && "Custom" === o.texturePreset ? i.push(n._load(s, r).then(function (e) {
          return t.texture = e, t;
        }).then(null, function (t) {
          throw new Error("Error loading texture: " + s + " - " + t);
        })) : "Flare" === o.texturePreset ? (a.Flare = a.Flare || m.createFlareTexture(32), t.texture = a.Flare) : "Splash" === o.texturePreset ? (a.Splash = a.Splash || m.createSplashTexture(32), t.texture = a.Splash) : "Plankton" === o.texturePreset ? (a.Plankton = a.Plankton || m.createPlanktonTexture(32), t.texture = a.Plankton) : "Snowflake" === o.texturePreset ? (a.Snowflake = a.Snowflake || m.createSnowflakeTexture(32), t.texture = a.Snowflake) : t.texture = null, i.length ? l.all(i).then(function () {
          return t;
        }) : t;
      }
    });
  }, f;
}(goo.ComponentHandler, goo.ParticleSystemComponent, goo.LinearCurve, goo.ConstantCurve, goo.PolyCurve, goo.Vector3Curve, goo.Vector4Curve, goo.LerpCurve, goo.rsvp, goo.ObjectUtils, goo.Vector3, goo.MathUtils, goo.ParticleSystemUtils), goo.ParticleSystemSystem = function (t) {
  "use strict";

  function e() {
    t.call(this, "ParticleSystemSystem", ["ParticleSystemComponent", "TransformComponent"]), this.priority = 1;
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.prototype.process = function (t, e) {
    for (var i = 0; i < t.length; i++) {
      t[i].particleSystemComponent.process(e);
    }
  }, e.prototype.inserted = function () {}, e.prototype.deleted = function () {}, e.prototype.removedComponent = function () {}, e.prototype.pause = function () {
    for (var t = this._activeEntities, e = 0; e < t.length; e++) {
      t[e].particleSystemComponent.pause();
    }
  }, e.prototype.resume = function () {
    for (var t = this._activeEntities, e = 0; e < t.length; e++) {
      t[e].particleSystemComponent.resume();
    }
  }, e.prototype.play = function () {
    for (var t = this._activeEntities, e = 0; e < t.length; e++) {
      var i = t[e].particleSystemComponent;i.autoPlay && i.play();
    }
  }, e.prototype.stop = function () {
    this.pause();for (var t = this._activeEntities, e = 0; e < t.length; e++) {
      t[e].particleSystemComponent.stop();
    }
  }, e;
}(goo.System), "function" == typeof require && (define("goo/addons/particlepack/ParticleData", [], function () {
  return goo.ParticleData;
}), define("goo/addons/particlepack/curves/Curve", [], function () {
  return goo.Curve;
}), define("goo/addons/particlepack/curves/ConstantCurve", [], function () {
  return goo.ConstantCurve;
}), define("goo/addons/particlepack/curves/LerpCurve", [], function () {
  return goo.LerpCurve;
}), define("goo/addons/particlepack/curves/Vector3Curve", [], function () {
  return goo.Vector3Curve;
}), define("goo/addons/particlepack/curves/PolyCurve", [], function () {
  return goo.PolyCurve;
}), define("goo/addons/particlepack/curves/LinearCurve", [], function () {
  return goo.LinearCurve;
}), define("goo/addons/particlepack/systems/ParticleDebugRenderSystem", [], function () {
  return goo.ParticleDebugRenderSystem;
}), define("goo/addons/particlepack/curves/Vector4Curve", [], function () {
  return goo.Vector4Curve;
}), define("goo/addons/particlepack/components/ParticleSystemComponent", [], function () {
  return goo.ParticleSystemComponent;
}), define("goo/addons/particlepack/handlers/ParticleSystemComponentHandler", [], function () {
  return goo.ParticleSystemComponentHandler;
}), define("goo/addons/particlepack/systems/ParticleSystemSystem", [], function () {
  return goo.ParticleSystemSystem;
}));

"use strict";

goo.PhysicsMaterial = function () {
  "use strict";

  function t(t) {
    t = t || {}, this.friction = void 0 !== t.friction ? t.friction : .3, this.restitution = void 0 !== t.restitution ? t.restitution : 0;
  }return t;
}(), goo.RaycastResult = function (t) {
  "use strict";

  function o(o) {
    o = o || {}, this.point = o.point ? new t(o.point) : new t(), this.normal = o.normal ? new t(o.normal) : new t(), this.entity = o.entity || null, this.distance = o.distance || -1;
  }return o.prototype.reset = function () {
    this.entity = null, this.distance = -1;
  }, o;
}(goo.Vector3), goo.Collider = function () {
  "use strict";

  function t() {}return t.prototype.clone = function () {
    return new t();
  }, t.prototype.transform = function () {}, t;
}(), goo.CylinderCollider = function (t) {
  "use strict";

  function o(o) {
    o = o || {}, this.radius = void 0 !== o.radius ? o.radius : .5, this.height = void 0 !== o.height ? o.height : 1, t.call(this);
  }return o.prototype = Object.create(t.prototype), o.prototype.constructor = o, o.prototype.transform = function (t, o) {
    var e = t.scale;o.radius = Math.max(e.x, e.y) * this.radius, o.height = e.z * this.height;
  }, o.prototype.clone = function () {
    return new o({ radius: this.radius, height: this.height });
  }, o;
}(goo.Collider), goo.BoxCollider = function (t, o) {
  "use strict";

  function e(e) {
    e = e || {}, this.halfExtents = e.halfExtents ? new t(e.halfExtents) : new t(.5, .5, .5), o.call(this);
  }return e.prototype = Object.create(o.prototype), e.prototype.constructor = e, e.prototype.transform = function (t, o) {
    o.halfExtents.set(t.scale).mul(this.halfExtents);
  }, e.prototype.clone = function () {
    return new e({ halfExtents: this.halfExtents });
  }, e;
}(goo.Vector3, goo.Collider), goo.MeshCollider = function (t, o) {
  "use strict";

  function e(e) {
    e = e || {}, this.meshData = e.meshData, this.scale = void 0 !== e.scale ? new o(e.scale) : new o(1, 1, 1), t.call(this);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.prototype.transform = function (t, o) {
    o.scale.set(this.scale).mul(t.scale);
  }, e.prototype.clone = function () {
    return new e({ meshData: this.meshData, scale: this.scale });
  }, e;
}(goo.Collider, goo.Vector3), goo.PlaneCollider = function (t) {
  "use strict";

  function o() {
    t.call(this);
  }return o.prototype = Object.create(t.prototype), o.prototype.constructor = o, o.prototype.transform = function () {}, o.prototype.clone = function () {
    return new o();
  }, o;
}(goo.Collider), goo.SphereCollider = function (t) {
  "use strict";

  function o(o) {
    o = o || {}, this.radius = void 0 !== o.radius ? o.radius : .5, t.call(this);
  }return o.prototype = Object.create(t.prototype), o.prototype.constructor = o, o.prototype.transform = function (t, o) {
    var e = t.scale;o.radius = this.radius * Math.max(Math.abs(e.x), Math.abs(e.y), Math.abs(e.z));
  }, o.prototype.clone = function () {
    return new o({ radius: this.radius });
  }, o;
}(goo.Collider), goo.AbstractColliderComponent = function (t, o) {
  "use strict";

  function e(o) {
    t.apply(this), o = o || {}, this.entity = null, this.collider = o.collider || null, this.worldCollider = this.collider ? this.collider.clone() : null, this.isTrigger = void 0 !== o.isTrigger ? o.isTrigger : !1, this.bodyEntity = null, this.material = void 0 !== o.material ? o.material : null;
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.prototype.getBodyEntity = function () {
    var t;return this.entity.traverseUp(function (o) {
      return o.rigidBodyComponent ? (t = o, !1) : void 0;
    }), t;
  }, e.prototype.updateWorldCollider = function () {
    var t = [];this.entity.traverseUp(function (o) {
      t.unshift(o);
    });for (var o = t.length, e = 0; e !== o; e++) {
      var n = t[e],
          i = n.transformComponent;i.updateTransform(), i.updateWorldTransform();
    }this.collider.transform(this.entity.transformComponent.worldTransform, this.worldCollider);
  }, e.prototype.attached = function (t) {
    this.entity = t, this.system = t._world.getSystem("PhysicsSystem");
  }, e.prototype.detached = function () {
    this.entity = null;
  }, e.applyOnEntity = function (t, n) {
    return t instanceof o ? (n.setComponent(new e({ collider: t })), !0) : void 0;
  }, e.prototype.api = {}, e;
}(goo.Component, goo.Collider), goo.AbstractRigidBodyComponent = function (t, o, e, n, i) {
  "use strict";

  function r() {
    t.call(this, arguments), this.joints = [];
  }var s = new e();r.prototype = Object.create(t.prototype), r.prototype.constructor = r, r.prototype.addJoint = function (t) {
    this.joints.push(t);
  }, r.prototype.removeJoint = function (t) {
    var o = this.joints,
        e = o.indexOf(t);-1 !== e && o.splice(e, 1);
  }, r.initializedEvent = { entity: null }, r.prototype.emitInitialized = function (t) {
    var o = r.initializedEvent;o.entity = t, i.emit("goo.physics.initialized", o), o.entity = null;
  }, r.prototype.initialize = function () {}, r.prototype.destroy = function () {}, r.prototype.initializeJoint = function () {}, r.prototype.destroyJoint = function () {};var a = new n(),
      c = new n(),
      l = new n();return r.prototype.traverseColliders = function (t, o) {
    t.transformComponent.updateTransform(), t.transformComponent.updateWorldTransform();var e = t.transformComponent.worldTransform;a.copy(e), a.invert(a);for (var i = [t]; i.length;) {
      var r = i.pop(),
          p = r.colliderComponent;if (p) {
        r.transformComponent.updateTransform(), r.transformComponent.updateWorldTransform(), c.copy(r.transformComponent.worldTransform), n.combine(a, c, l);var d = l.translation,
            h = l.rotation;s.fromRotationMatrix(h), o.call(this, r, p.collider, d, s);
      }for (var u = r.transformComponent.children, y = 0; y < u.length; y++) {
        var g = u[y].entity;g.rigidBodyComponent || i.push(g);
      }
    }
  }, r.prototype.attached = function () {}, r.prototype.detached = function () {
    this._entity = null, this._system = null;
  }, r;
}(goo.Component, goo.Vector3, goo.Quaternion, goo.Transform, goo.SystemBus), goo.ColliderComponent = function (t, o, e, n, i, r, s, a, c) {
  "use strict";

  function l(o) {
    t.apply(this, arguments), this.type = "ColliderComponent", o = o || {}, this.cannonBody = null, this.cannonShape = null;
  }var p = new c();return l.prototype = Object.create(t.prototype), l.prototype.constructor = l, l.type = "ColliderComponent", l.prototype.initialize = function () {
    var t = null;this.material && (t = new CANNON.Material(), t.friction = this.material.friction, t.restitution = this.material.restitution), this.updateWorldCollider();var i = this.cannonShape = l.getCannonShape(this.worldCollider);i.material = t, i.collisionResponse = !this.isTrigger;var r = this.entity,
        s = r.transformComponent.worldTransform,
        a = new CANNON.Vec3(),
        c = new CANNON.Quaternion();a.copy(s.translation), p.fromRotationMatrix(s.rotation), c.copy(p);var d = new CANNON.Body({ mass: 0, position: a, quaternion: c });this.system.cannonWorld.addBody(d), this.cannonBody = d, this.system._shapeIdToColliderEntityMap.set(i.id, r);var h = this.worldCollider;if (h instanceof e) i.radius = h.radius;else if (h instanceof o) i.halfExtents.copy(h.halfExtents), i.updateConvexPolyhedronRepresentation();else if (h instanceof n) {
      var u = new CANNON.Vec3();u.copy(h.scale), i.setScale(u);
    }i.updateBoundingSphereRadius(), d.computeAABB(), d.addShape(i), d.aabbNeedsUpdate = !0;
  }, l.prototype.destroy = function () {
    var t = this.cannonBody;t.shapes.forEach(function (t) {
      this.system._shapeIdToColliderEntityMap["delete"](t.id);
    }.bind(this)), this.system.cannonWorld.removeBody(t), this.cannonBody = null, this.cannonShape = null;
  }, l.numCylinderSegments = 10, l.getCannonShape = function (t) {
    var s;if (t instanceof o) {
      var c = new CANNON.Vec3();c.copy(t.halfExtents), s = new CANNON.Box(c);
    } else if (t instanceof e) s = new CANNON.Sphere(t.radius);else if (t instanceof i) s = new CANNON.Plane();else if (t instanceof r) {
      s = new CANNON.Cylinder(t.radius, t.radius, t.height, l.numCylinderSegments);var p = new CANNON.Quaternion();p.setFromAxisAngle(new a(0, 0, 1), -Math.PI / 2), s.transformAllPoints(new a(), p), s.computeEdges(), s.updateBoundingSphereRadius();
    } else if (t instanceof n) {
      if ("Triangles" !== t.meshData.indexModes[0]) throw new Error("MeshCollider data must be a triangle mesh!");s = new CANNON.Trimesh(t.meshData.getAttributeBuffer("POSITION"), t.meshData.getIndexBuffer());
    } else console.warn("Unhandled collider: ", t);return s;
  }, l.applyOnEntity = function (t, o) {
    return t instanceof s ? (o.setComponent(new l({ collider: t })), !0) : void 0;
  }, l;
}(goo.AbstractColliderComponent, goo.BoxCollider, goo.SphereCollider, goo.MeshCollider, goo.PlaneCollider, goo.CylinderCollider, goo.Collider, goo.Vector3, goo.Quaternion), goo.PhysicsJoint = function () {
  "use strict";

  function t(t) {
    t = t || {}, this.connectedEntity = t.connectedEntity || null, this.collideConnected = void 0 !== t.collideConnected ? t.collideConnected : !1;
  }return t;
}(), goo.BallJoint = function (t, o) {
  "use strict";

  function e(e) {
    e = e || {}, t.call(this, e), this.localPivot = e.localPivot ? o.fromAny(e.localPivot) : new o(0, .5, 0), this.autoConfigureConnectedPivot = e.autoConfigureConnectedPivot ? e.autoConfigureConnectedPivot : !0, this.connectedLocalPivot = e.connectedLocalPivot ? o.fromAny(e.connectedLocalPivot) : new o(0, .5, 0);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e;
}(goo.PhysicsJoint, goo.Vector3), goo.HingeJoint = function (t, o) {
  "use strict";

  function e(e) {
    e = e || {}, t.call(this, e), this.localPivot = e.localPivot ? new o(e.localPivot) : new o(0, .5, 0), this.autoConfigureConnectedPivot = e.autoConfigureConnectedPivot ? e.autoConfigureConnectedPivot : !0, this.connectedLocalPivot = e.connectedLocalPivot ? new o(e.connectedLocalPivot) : new o(), this.localAxis = e.localAxis ? new o(e.localAxis) : new o(1, 0, 0);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e;
}(goo.PhysicsJoint, goo.Vector3), goo.RigidBodyComponent = function (t, o, e, n, i, r, s, a, c, l, p, d) {
  "use strict";

  function h(e) {
    e = e || {}, t.apply(this, arguments), this.type = "RigidBodyComponent", this.cannonBody = null, this._dirty = !0, this._isKinematic = !!e.isKinematic, this._mass = void 0 !== e.mass ? e.mass : 1, this._isKinematic ? this._mass = 0 : 0 === this._mass && (this._isKinematic = !0), this._initialized = !1, this._velocity = e.velocity ? e.velocity.clone() : new o(), this._angularVelocity = e.angularVelocity ? e.angularVelocity.clone() : new o(), this._linearDamping = void 0 !== e.linearDamping ? e.linearDamping : .01, this._angularDamping = void 0 !== e.angularDamping ? e.angularDamping : .05, this._sleepingThreshold = void 0 !== e.sleepingThreshold ? e.sleepingThreshold : .2, this._sleepingTimeLimit = void 0 !== e.sleepingTimeLimit ? e.sleepingTimeLimit : 1, u || (u = new CANNON.Vec3(), y = new CANNON.Vec3()), this._colliderEntities = [], this.interpolation = h.INTERPOLATE, this._constraints = h.FREEZE_NONE;
  }var u,
      y,
      g = new e();return h.prototype = Object.create(t.prototype), h.prototype.constructor = h, h.type = "RigidBodyComponent", h.FREEZE_NONE = 0, h.FREEZE_POSITION_X = 1, h.FREEZE_POSITION_Y = 2, h.FREEZE_POSITION_Z = 4, h.FREEZE_ROTATION_X = 8, h.FREEZE_ROTATION_Y = 16, h.FREEZE_ROTATION_Z = 32, h.FREEZE_POSITION = h.FREEZE_POSITION_X | h.FREEZE_POSITION_Y | h.FREEZE_POSITION_Z, h.FREEZE_ROTATION = h.FREEZE_ROTATION_X | h.FREEZE_ROTATION_Y | h.FREEZE_ROTATION_Z, h.FREEZE_ALL = h.FREEZE_POSITION | h.FREEZE_ROTATION, h.NONE = 1, h.INTERPOLATE = 2, h.numCylinderSegments = 10, h.prototype.setTransformFromEntity = function (t) {
    var o = t.transformComponent.worldTransform,
        e = this.cannonBody;e.position.copy(o.translation), e.previousPosition.copy(o.translation), e.interpolatedPosition.copy(o.translation), g.fromRotationMatrix(o.rotation), e.quaternion.copy(g), e.previousQuaternion.copy(g), e.interpolatedQuaternion.copy(g);
  }, h.prototype.applyForceWorld = function (t, o) {
    var e = u;e.copy(t);var n = y;n.copy(o), n.vsub(this.cannonBody.position, n), this.cannonBody.applyForce(e, n);
  }, h.prototype.applyForceLocal = function (t, o) {
    var e = u;e.copy(t);var n = CANNON.Vec3.ZERO;o && (n = y, n.copy(o));var i = this.cannonBody;i.vectorToWorldFrame(e, e), i.vectorToWorldFrame(n, n), i.applyForce(e, n);
  }, h.prototype.applyForce = function (t, o) {
    var e = u;e.copy(t);var n = CANNON.Vec3.ZERO;o && (n = y, n.copy(o)), this.cannonBody.applyForce(e, n);
  }, h.prototype.applyTorque = function (t) {
    u.copy(t), this.cannonBody.torque.vadd(u, this.cannonBody.torque);
  }, h.prototype.applyTorqueLocal = function (t) {
    var o = u;o.copy(t), this.cannonBody.vectorToWorldFrame(o, o), this.cannonBody.torque.vadd(o, this.cannonBody.torque);
  }, h.prototype.applyImpulse = function (t, o) {
    u.copy(t), y.copy(o), this.cannonBody.applyImpulse(u, y);
  }, h.prototype.applyImpulseLocal = function (t, o) {
    u.copy(t), y.copy(o), this.cannonBody.applyLocalImpulse(u, y);
  }, h.prototype.setVelocity = function (t) {
    this.cannonBody && this.cannonBody.velocity.copy(t), this._velocity.set(t);
  }, h.prototype.getVelocity = function (t) {
    var o = this.cannonBody,
        e = o ? o.velocity : this._velocity;t.setDirect(e.x, e.y, e.z);
  }, h.prototype.setAngularVelocity = function (t) {
    this.cannonBody && this.cannonBody.angularVelocity.copy(t), this._angularVelocity.set(t);
  }, h.prototype.getAngularVelocity = function (t) {
    var o = this.cannonBody,
        e = o ? o.angularVelocity : this._angularVelocity;t.setDirect(e.x, e.y, e.z);
  }, h.prototype.setPosition = function (t) {
    this.cannonBody && this.cannonBody.position.copy(t);
  }, h.prototype.getPosition = function (t) {
    if (this.cannonBody) {
      var o = this.cannonBody.position;t.setDirect(o.x, o.y, o.z);
    }
  }, h.prototype.getInterpolatedPosition = function (t) {
    if (this.cannonBody) {
      var o = this.cannonBody.interpolatedPosition;t.setDirect(o.x, o.y, o.z);
    }
  }, h.prototype.setQuaternion = function (t) {
    this.cannonBody && this.cannonBody.quaternion.copy(t);
  }, h.prototype.getQuaternion = function (t) {
    if (this.cannonBody) {
      var o = this.cannonBody.quaternion;t.setDirect(o.x, o.y, o.z, o.w);
    }
  }, h.prototype.getInterpolatedQuaternion = function (t) {
    if (this.cannonBody) {
      var o = this.cannonBody.interpolatedQuaternion;t.setDirect(o.x, o.y, o.z, o.w);
    }
  }, Object.defineProperties(h.prototype, { linearDamping: { get: function get() {
        return this._linearDamping;
      }, set: function set(t) {
        this.cannonBody && (this.cannonBody.linearDamping = t), this._linearDamping = t;
      } }, angularDamping: { get: function get() {
        return this._angularDamping;
      }, set: function set(t) {
        this.cannonBody && (this.cannonBody.angularDamping = t), this._angularDamping = t;
      } }, isKinematic: { get: function get() {
        return this._isKinematic;
      }, set: function set(t) {
        this._isKinematic = t, this.cannonBody && (this.cannonBody.type = t ? CANNON.Body.KINEMATIC : CANNON.Body.DYNAMIC, this.cannonBody.updateMassProperties());
      } }, sleepingThreshold: { get: function get() {
        return this._sleepingThreshold;
      }, set: function set(t) {
        this._sleepingThreshold = t, this.cannonBody && (this.cannonBody.sleepSpeedLimit = t);
      } }, mass: { get: function get() {
        return this._mass;
      }, set: function set(t) {
        this._mass = t, this.cannonBody && (this.cannonBody.mass = t, this.cannonBody.updateMassProperties());
      } }, sleepingTimeLimit: { get: function get() {
        return this._sleepingTimeLimit;
      }, set: function set(t) {
        this._sleepingTimeLimit = t, this.cannonBody && (this.cannonBody.sleepTimeLimit = t);
      } }, constraints: { get: function get() {
        return this._constraints;
      }, set: function set(t) {
        this._constraints = t;var o = this.cannonBody;o && h.constraintsToCannonFactors(t, o.linearFactor, o.angularFactor);
      } } }), h.prototype.destroy = function () {
    var t = this.cannonBody;t && (t.world.removeBody(t), delete this._system._entities[t.id], t.shapes.forEach(function (t) {
      this._system._shapeIdToColliderEntityMap["delete"](t.id);
    }.bind(this)), this.cannonBody = null);for (var o = 0; o < this._colliderEntities.length; o++) {
      this._colliderEntities[o].bodyEntity = null;
    }this._colliderEntities.length = 0;
  }, h.constraintsToCannonFactors = function (t, o, e) {
    o.set(t & h.FREEZE_POSITION_X ? 0 : 1, t & h.FREEZE_POSITION_Y ? 0 : 1, t & h.FREEZE_POSITION_Z ? 0 : 1), e.set(t & h.FREEZE_ROTATION_X ? 0 : 1, t & h.FREEZE_ROTATION_Y ? 0 : 1, t & h.FREEZE_ROTATION_Z ? 0 : 1);
  }, h.prototype.initialize = function () {
    this.destroy();var t = this.cannonBody = new CANNON.Body({ mass: this._mass, linearDamping: this._linearDamping, angularDamping: this._angularDamping, sleepSpeedLimit: this._sleepingThreshold, sleepTimeLimit: this._sleepingTimeLimit });h.constraintsToCannonFactors(this.constraints, t.linearFactor, t.angularFactor), this._system.cannonWorld.addBody(t), this._system._entities[t.id] = this._entity, this._initialized || (t.velocity.copy(this._velocity), t.angularVelocity.copy(this._angularVelocity)), this.traverseColliders(this._entity, function (t, o, e, n) {
      this.addCollider(t, e, n), t.colliderComponent.bodyEntity = this._entity;
    }), this._isKinematic && (t.type = CANNON.Body.KINEMATIC), this.setTransformFromEntity(this._entity), t.aabbNeedsUpdate = !0, this.emitInitialized(this._entity);
  }, h.prototype.initializeJoint = function (t) {
    var o,
        e = this.cannonBody,
        n = (t.connectedEntity.rigidBodyComponent || t.connectedEntity.colliderComponent).cannonBody;if (t instanceof l) {
      var i = t.localPivot.clone();i.mul(this._entity.transformComponent.transform.scale);var r = new CANNON.Vec3(),
          s = new CANNON.Vec3();if (r.copy(i), t.autoConfigureConnectedPivot) e.pointToWorldFrame(r, s), n.pointToLocalFrame(s, s);else {
        var a = t.connectedLocalPivot.clone();a.mul(t.connectedEntity.transformComponent.transform.scale), s.copy(a);
      }o = new CANNON.PointToPointConstraint(e, r, n, s);
    } else if (t instanceof p) {
      var r = new CANNON.Vec3(),
          s = new CANNON.Vec3(),
          c = new CANNON.Vec3(),
          d = new CANNON.Vec3(),
          i = t.localPivot.clone();if (i.mul(this._entity.transformComponent.transform.scale), r.copy(i), c.copy(t.localAxis), t.autoConfigureConnectedPivot) e.pointToWorldFrame(r, s), n.pointToLocalFrame(s, s);else {
        var a = t.connectedLocalPivot.clone();a.mul(t.connectedEntity.transformComponent.transform.scale), s.copy(a);
      }d.copy(t.localAxis), e.vectorToWorldFrame(t.localAxis, d), n.vectorToLocalFrame(d, d), o = new CANNON.HingeConstraint(e, n, { pivotA: r, pivotB: s, axisA: c, axisB: d, collideConnected: t.collideConnected });
    } else console.warn("Unhandled joint: ", t);o && (e.world.addConstraint(o), t.cannonJoint = o);
  }, h.copyScaleFromColliderToCannonShape = function (t, o) {
    if (o instanceof r) t.radius = o.radius;else if (o instanceof i) t.halfExtents.copy(o.halfExtents), t.updateConvexPolyhedronRepresentation(), t.updateBoundingSphereRadius();else if (o instanceof c) {
      var e;u || (u = new CANNON.Vec3()), e = u, e.copy(o.scale), t.setScale(e);
    }t.updateBoundingSphereRadius();
  }, h.prototype.destroyJoint = function (t) {
    var o = this.cannonBody;o && t.cannonJoint && (o.world.removeConstraint(t.cannonJoint), t.cannonJoint = null);
  }, h.prototype.addCollider = function (t, o, e) {
    var n = this.cannonBody,
        i = t.colliderComponent;i.updateWorldCollider(!0);var r = i.worldCollider,
        s = i.cannonShape = d.getCannonShape(r);this._system._shapeIdToColliderEntityMap.set(s.id, t);var a = new CANNON.Material();a.friction = i.material ? i.material.friction : -1, a.restitution = i.material ? i.material.restitution : -1, s.material = a, s.collisionResponse = !i.isTrigger;var c = new CANNON.Vec3();o && c.copy(o);var l = new CANNON.Quaternion();o && l.copy(e), n.addShape(s, c, l), this._colliderEntities.push(t);
  }, h.prototype.clone = function () {
    return new h({ isKinematic: this._isKinematic, mass: this._mass, velocity: this._velocity, angularVelocity: this._angularVelocity, linearDamping: this._linearDamping, angularDamping: this._angularDamping, sleepingThreshold: this._sleepingThreshold, sleepingTimeLimit: this._sleepingTimeLimit });
  }, h.prototype.attached = function (t) {
    this._entity = t, this._system = t._world.getSystem("PhysicsSystem");
  }, h.prototype.api = {}, h;
}(goo.AbstractRigidBodyComponent, goo.Vector3, goo.Quaternion, goo.Transform, goo.BoxCollider, goo.SphereCollider, goo.CylinderCollider, goo.PlaneCollider, goo.MeshCollider, goo.BallJoint, goo.HingeJoint, goo.ColliderComponent), goo.ColliderComponentHandler = function (t, o, e, n, i, r, s, a, c, l, p) {
  "use strict";

  function d() {
    t.apply(this, arguments), this._type = "ColliderComponent";
  }return d.prototype = Object.create(t.prototype), d.prototype.constructor = d, t._registerClass("collider", d), d.prototype._prepare = function (t) {
    return r.defaults(t, { shape: "Box", shapeOptions: { halfExtents: [1, 1, 1], radius: .5, height: 1 }, isTrigger: !1, friction: .3, restitution: 0 });
  }, d.prototype._create = function () {
    return new o({ material: new p() });
  }, d.prototype._remove = function (t) {
    t.clearComponent("ColliderComponent");
  }, d.prototype.update = function (o, e, n) {
    return t.prototype.update.call(this, o, e, n).then(function (t) {
      if (t) {
        switch (e.shape) {default:case "Box":
            t.collider = new a(e.shapeOptions), t.worldCollider = new a();break;case "Sphere":
            t.collider = new s(e.shapeOptions), t.worldCollider = new s();break;case "Plane":
            t.collider = new c(), t.worldCollider = new c();break;case "Cylinder":
            t.collider = new l(e.shapeOptions), t.worldCollider = new l();}return t.material.friction = e.friction, t.material.restitution = e.restitution, t.isTrigger = e.isTrigger, t;
      }
    });
  }, d;
}(goo.ComponentHandler, goo.ColliderComponent, goo.BoundingBox, goo.ShapeCreatorMemoized, goo.rsvp, goo.ObjectUtils, goo.SphereCollider, goo.BoxCollider, goo.PlaneCollider, goo.CylinderCollider, goo.PhysicsMaterial), goo.RigidBodyComponentHandler = function (t, o, e, n, i, r, s) {
  "use strict";

  function a() {
    t.apply(this, arguments), this._type = "RigidBodyComponent";
  }return a.prototype = Object.create(t.prototype), a.prototype.constructor = a, t._registerClass("rigidBody", a), a.prototype._prepare = function (t) {
    return r.defaults(t, { mass: 1, isKinematic: !1, velocity: [0, 0, 0], angularVelocity: [0, 0, 0], linearDrag: 0, angularDrag: 0 });
  }, a.prototype._create = function () {
    return new o();
  }, a.prototype._remove = function (t) {
    t.clearComponent("RigidBodyComponent");
  }, a.prototype.update = function (o, e, n) {
    return t.prototype.update.call(this, o, e, n).then(function (t) {
      return t ? (t.mass = e.mass, t.isKinematic = e.isKinematic, t.setVelocity(new s(e.velocity)), t.setAngularVelocity(new s(e.angularVelocity)), t.linearDamping = e.linearDrag, t.angularDamping = e.angularDrag, t) : void 0;
    });
  }, a;
}(goo.ComponentHandler, goo.RigidBodyComponent, goo.BoundingBox, goo.ShapeCreatorMemoized, goo.rsvp, goo.ObjectUtils, goo.Vector3), goo.PhysicsCylinderDebugShape = function (t) {
  "use strict";

  function o(o) {
    o = o || 32;var e = t.defaultMap([t.POSITION]);this.numSegments = o, t.call(this, e, 6 * o + 24, 4 * o + 16), this.indexModes[0] = "Lines", this.rebuild();
  }return o.prototype = Object.create(t.prototype), o.prototype.constructor = o, o.prototype.buildWireframeData = function () {
    return new o();
  }, o.prototype.rebuild = function () {
    for (var o = [], e = [], n = this.numSegments, i = 0; n > i; i++) {
      o.push(Math.cos(2 * Math.PI * i / n), Math.sin(2 * Math.PI * i / n), .5), e.push(i, (i + 1) % n);
    }for (var i = 0; n > i; i++) {
      o.push(Math.cos(2 * Math.PI * i / n), Math.sin(2 * Math.PI * i / n), -.5), e.push(n + i, n + (i + 1) % n);
    }return o.push(Math.cos(1 * Math.PI / 2), Math.sin(1 * Math.PI / 2), -.5, Math.cos(1 * Math.PI / 2), Math.sin(1 * Math.PI / 2), .5, Math.cos(2 * Math.PI / 2), Math.sin(2 * Math.PI / 2), -.5, Math.cos(2 * Math.PI / 2), Math.sin(2 * Math.PI / 2), .5, Math.cos(3 * Math.PI / 2), Math.sin(3 * Math.PI / 2), -.5, Math.cos(3 * Math.PI / 2), Math.sin(3 * Math.PI / 2), .5, Math.cos(4 * Math.PI / 2), Math.sin(4 * Math.PI / 2), -.5, Math.cos(4 * Math.PI / 2), Math.sin(4 * Math.PI / 2), .5), e.push(2 * n + 0, 2 * n + 1, 2 * n + 2, 2 * n + 3, 2 * n + 4, 2 * n + 5, 2 * n + 6, 2 * n + 7), this.getAttributeBuffer(t.POSITION).set(o), this.getIndexBuffer().set(e), this;
  }, o;
}(goo.MeshData), goo.PhysicsPlaneDebugShape = function (t) {
  "use strict";

  function o() {
    var o = t.defaultMap([t.POSITION]);t.call(this, o, 10, 14), this.indexModes[0] = "Lines", this.rebuild();
  }return o.prototype = Object.create(t.prototype), o.prototype.constructor = o, o.prototype.buildWireframeData = function () {
    return new o();
  }, o.prototype.rebuild = function () {
    var o = [],
        e = [];return o.push(-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0, -2, 0, 0, 2, 0, 0, 0, -2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1), e.push(0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 6, 7, 8, 9), this.getAttributeBuffer(t.POSITION).set(o), this.getIndexBuffer().set(e), this;
  }, o;
}(goo.MeshData), goo.PhysicsBoxDebugShape = function (t) {
  "use strict";

  function o() {
    var o = t.defaultMap([t.POSITION]);t.call(this, o, 24, 24), this.indexModes[0] = "Lines", this.rebuild();
  }return o.prototype = Object.create(t.prototype), o.prototype.constructor = o, o.prototype.buildWireframeData = function () {
    return new o();
  }, o.prototype.rebuild = function () {
    var o = [],
        e = [];return o.push(-.5, -.5, -.5, -.5, -.5, .5, -.5, .5, .5, -.5, .5, -.5, .5, -.5, -.5, .5, -.5, .5, .5, .5, .5, .5, .5, -.5), e.push(0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7), this.getAttributeBuffer(t.POSITION).set(o), this.getIndexBuffer().set(e), this;
  }, o;
}(goo.MeshData), goo.PhysicsSphereDebugShape = function (t) {
  "use strict";

  function o(o) {
    o = o || 32;var e = t.defaultMap([t.POSITION]);this.numSegments = o, t.call(this, e, 9 * o, 6 * o), this.indexModes[0] = "Lines", this.rebuild();
  }return o.prototype = Object.create(t.prototype), o.prototype.constructor = o, o.prototype.buildWireframeData = function () {
    return new o();
  }, o.prototype.rebuild = function () {
    for (var o = [], e = [], n = this.numSegments, i = 0; n > i; i++) {
      o.push(0, Math.cos(2 * Math.PI * i / n), Math.sin(2 * Math.PI * i / n)), e.push(i, (i + 1) % n);
    }for (var i = 0; n > i; i++) {
      o.push(Math.cos(2 * Math.PI * i / n), 0, Math.sin(2 * Math.PI * i / n)), e.push(n + i, n + (i + 1) % n);
    }for (var i = 0; n > i; i++) {
      o.push(Math.cos(2 * Math.PI * i / n), Math.sin(2 * Math.PI * i / n), 0), e.push(2 * n + i, 2 * n + (i + 1) % n);
    }return this.getAttributeBuffer(t.POSITION).set(o), this.getIndexBuffer().set(e), this;
  }, o;
}(goo.MeshData), goo.ColliderSystem = function (t, o) {
  "use strict";

  function e() {
    t.call(this, "ColliderSystem", ["ColliderComponent", "TransformComponent"]), this.priority = 1;
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.prototype.process = function () {}, e.prototype.inserted = function (t) {
    o.emit("goo.collider.inserted", { entity: t });
  }, e.prototype.deleted = function (t) {
    o.emit("goo.collider.deleted", { entity: t });
  }, e.prototype.removedComponent = function (t, e) {
    o.emit("goo.collider.deletedComponent", { entity: t, component: e });
  }, e;
}(goo.System, goo.SystemBus), goo.AbstractPhysicsSystem = function (t, o) {
  "use strict";

  function e() {
    t.apply(this, arguments), this.priority = -1, this._activeColliderEntities = [], this._colliderInsertedListener = function (t) {
      this._activeColliderEntities.push(t.entity), this._colliderInserted(t.entity);
    }.bind(this), this._colliderDeletedListener = function (t) {
      var o = this._activeColliderEntities,
          e = o.indexOf(t.entity);-1 !== e && this._activeColliderEntities.splice(e, 1), this._colliderDeleted(t.entity);
    }.bind(this), this._colliderDeletedComponentListener = function (t) {
      this._colliderDeletedComponent(t.entity, t.component);
    }.bind(this), o.addListener("goo.collider.inserted", this._colliderInsertedListener), o.addListener("goo.collider.deleted", this._colliderDeletedListener), o.addListener("goo.collider.deletedComponent", this._colliderDeletedComponentListener);
  }e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.prototype.setGravity = function () {};var n = { entityA: null, entityB: null };return e.prototype.emitSubStepEvent = function () {
    o.emit("goo.physics.substep");
  }, e.prototype.emitBeginContact = function (t, o) {
    this._emitEvent("goo.physics.beginContact", t, o);
  }, e.prototype.emitDuringContact = function (t, o) {
    this._emitEvent("goo.physics.duringContact", t, o);
  }, e.prototype.emitEndContact = function (t, o) {
    this._emitEvent("goo.physics.endContact", t, o);
  }, e.prototype.emitTriggerEnter = function (t, o) {
    this._emitEvent("goo.physics.triggerEnter", t, o);
  }, e.prototype.emitTriggerStay = function (t, o) {
    this._emitEvent("goo.physics.triggerStay", t, o);
  }, e.prototype.emitTriggerExit = function (t, o) {
    this._emitEvent("goo.physics.triggerExit", t, o);
  }, e.prototype._emitEvent = function (t, e, i) {
    n.entityA = e, n.entityB = i, o.emit(t, n), n.entityA = null, n.entityB = null;
  }, e.prototype._colliderInserted = function () {}, e.prototype._colliderDeleted = function () {}, e.prototype._colliderDeletedComponent = function () {}, e;
}(goo.System, goo.SystemBus), goo.Pool = function () {
  "use strict";

  function t(t) {
    t = t || {}, this._objects = [], this._init = t.init || function () {}, this._create = t.create || function () {}, this._destroy = t.destroy || function () {};
  }return t.prototype.resize = function (t) {
    for (var o = this._objects; o.length > t;) {
      this._destroy(o.pop());
    }for (; o.length < t;) {
      o.push(this._create());
    }return this;
  }, t.prototype.get = function () {
    var t = this._objects,
        o = t.length ? t.pop() : this._create();return this._init.apply(o, arguments), o;
  }, t.prototype.release = function (t) {
    return this._destroy(t), this._objects.push(t), this;
  }, t;
}(), goo.PhysicsDebugRenderSystem = function (t, o, e, n, i, r, s, a, c, l, p, d, h, u, y, g, f, m, C, v, _) {
  "use strict";

  function E() {
    o.call(this, "PhysicsDebugRenderSystem", ["TransformComponent"]), this.priority = 3, this.renderList = [], this.camera = null, e.addListener("goo.setCurrentCamera", function (t) {
      this.camera = t.camera;
    }.bind(this)), this.renderAll = !0, this.selection = new t(), this.sphereMeshData = new c(32), this.boxMeshData = new l(), this.cylinderMeshData = new a(32), this.planeMeshData = new s(), this.material = new C(v.simpleColored), this.material.uniforms.color = [0, 1, 0], this.material.wireframe = !0, this.renderablePool = new _({ create: function create() {
        return { meshData: null, transform: new m(), materials: [] };
      }, init: function init(t, o) {
        this.meshData = t, this.materials[0] = o;
      }, destroy: function destroy(t) {
        t.meshData = null, t.materials.length = 0;
      } });
  }return E.prototype = Object.create(o.prototype), E.prototype.constructor = E, E.prototype.process = function (t) {
    if (this.clear(), !this.passive) for (var o = 0, e = t.length; o !== e; o++) {
      var n = t[o];if ((this.renderAll || this.selection.contains(n)) && n.colliderComponent) {
        n.colliderComponent.updateWorldCollider();var i = n.colliderComponent.worldCollider,
            r = this.getMeshData(i),
            s = this.renderablePool.get(r, this.material);this.getWorldTransform(n, i, s.transform), s.transform.update(), this.renderList.push(s);
      }
    }
  }, E.prototype.getWorldTransform = function (t, o, e) {
    if (e.copy(t.transformComponent.worldTransform), o instanceof p) {
      var n = o.radius;e.scale.set(n, n, n);
    } else o instanceof d ? e.scale.copy(o.halfExtents).scale(2) : o instanceof h ? e.scale.set(o.radius, o.radius, o.height) : o instanceof u ? e.scale.set(1, 1, 1) : o instanceof y && e.scale.set(o.scale);
  }, E.prototype.getMeshData = function (t) {
    var o;return t instanceof p ? o = this.sphereMeshData : t instanceof d ? o = this.boxMeshData : t instanceof h ? o = this.cylinderMeshData : t instanceof u ? o = this.planeMeshData : t instanceof y && (o = t.meshData), o;
  }, E.prototype.render = function (t) {
    t.checkResize(this.camera), this.camera && t.render(this.renderList, this.camera, null, null, !1);
  }, E.prototype.clear = function () {
    for (var t = 0, o = this.renderList.length; t !== o; t++) {
      this.renderablePool.release(this.renderList[t]);
    }this.renderList.length = 0;
  }, E.prototype.cleanup = function () {
    this.clear();
  }, E;
}(goo.EntitySelection, goo.System, goo.SystemBus, goo.Sphere, goo.Box, goo.Cylinder, goo.PhysicsPlaneDebugShape, goo.PhysicsCylinderDebugShape, goo.PhysicsSphereDebugShape, goo.PhysicsBoxDebugShape, goo.SphereCollider, goo.BoxCollider, goo.CylinderCollider, goo.PlaneCollider, goo.MeshCollider, goo.Quaternion, goo.Vector3, goo.Transform, goo.Material, goo.ShaderLib, goo.Pool), goo.PhysicsSystem = function (t, o, e, n, i, r, s) {
  "use strict";

  function a(o) {
    o = o || {}, this.cannonWorld = new CANNON.World({ broadphase: new CANNON.SAPBroadphase() }), this.cannonWorld.addEventListener("beginShapeContact", function (t) {
      var o = this._shapeIdToColliderEntityMap,
          e = o.get(t.shapeA.id),
          n = o.get(t.shapeB.id);if (e && n) {
        var i = e.colliderComponent,
            r = n.colliderComponent;i.isTrigger || r.isTrigger ? (this.emitTriggerEnter(e, n), this._stayingEntities.push(e, n)) : (i.getBodyEntity() && !i.getBodyEntity().rigidBodyComponent.isKinematic || r.getBodyEntity() && !r.getBodyEntity().rigidBodyComponent.isKinematic) && (this.emitBeginContact(e, n), this._stayingEntities.push(e, n));
      }
    }.bind(this)), this.cannonWorld.addEventListener("endShapeContact", function (t) {
      for (var o = this._shapeIdToColliderEntityMap, e = o.get(t.shapeA.id), n = o.get(t.shapeB.id), i = this._stayingEntities, r = 0; r < i.length; r += 2) {
        if (i[r] === e && i[r + 1] === n || i[r] === n && i[r + 1] === e) {
          i.splice(r, 2);break;
        }
      }e.colliderComponent.isTrigger || n.colliderComponent.isTrigger ? this.emitTriggerExit(e, n) : this.emitEndContact(e, n);
    }.bind(this)), this.cannonWorld.addEventListener("postStep", function () {
      this.emitSubStepEvent();for (var t = this._stayingEntities, o = 0; o < t.length; o += 2) {
        var e = t[o],
            n = t[o + 1];e.colliderComponent.isTrigger || n.colliderComponent.isTrigger ? this.emitTriggerStay(e, n) : this.emitDuringContact(e, n);
      }
    }.bind(this)), this._stayingEntities = [], this._entities = {}, this._shapeIdToColliderEntityMap = new Map(), c || (c = new CANNON.Vec3(), l = new CANNON.Vec3(), p = new CANNON.RaycastResult()), this.setGravity(o.gravity || new n(0, -10, 0)), this.stepFrequency = void 0 !== o.stepFrequency ? o.stepFrequency : 60, this.maxSubSteps = void 0 !== o.maxSubSteps ? o.maxSubSteps : 10, this.initialized = !1, t.call(this, "PhysicsSystem", ["RigidBodyComponent"]);
  }var c,
      l,
      p,
      d = new i(),
      h = new n(),
      u = new s();a.prototype = Object.create(t.prototype), a.prototype.constructor = a, a.prototype.setGravity = function (t) {
    this.cannonWorld.gravity.copy(t);
  }, a.prototype.getGravity = function (t) {
    var o = this.cannonWorld.gravity;t.x = o.x, t.y = o.y, t.z = o.z;
  }, a.prototype.step = function (t) {
    var o = this.cannonWorld,
        e = 1 / this.stepFrequency,
        n = this.maxSubSteps;n ? o.step(e, t, n) : o.step(t);
  };var y = {};a.prototype._getCannonRaycastOptions = function (t) {
    return y.collisionFilterMask = void 0 !== t.collisionMask ? t.collisionMask : -1, y.collisionFilterGroup = void 0 !== t.collisionGroup ? t.collisionGroup : -1, y.skipBackfaces = void 0 !== t.skipBackfaces ? t.skipBackfaces : !0, y;
  }, a.prototype._copyCannonRaycastResultToGoo = function (t, o, e) {
    if (t.hasHit) {
      o.entity = this._shapeIdToColliderEntityMap.get(t.shape.id);var n = t.hitPointWorld,
          i = t.hitNormalWorld;o.point.setDirect(n.x, n.y, n.z), o.normal.setDirect(i.x, i.y, i.z), o.distance = e.distance(o.point);
    }return t.hasHit;
  }, a.prototype._getCannonStartEnd = function (t, o, e, n, i) {
    n.copy(t), i.copy(o), i.scale(e, i), i.vadd(t, i);
  }, a.prototype.raycastAny = function (t, e, n, i, r) {
    i instanceof o && (r = i, i = {}), i = i || {}, r = r || new o();var s = c,
        a = l;return this._getCannonStartEnd(t, e, n, s, a), this.cannonWorld.raycastAny(s, a, this._getCannonRaycastOptions(i), p), this._copyCannonRaycastResultToGoo(p, r, t);
  }, a.prototype.raycastClosest = function (t, e, n, i, r) {
    i instanceof o && (r = i, i = {}), i = i || {}, r = r || new o();var s = c,
        a = l;return this._getCannonStartEnd(t, e, n, s, a), this.cannonWorld.raycastClosest(s, a, this._getCannonRaycastOptions(i), p), this._copyCannonRaycastResultToGoo(p, r, t);
  };var g = new o();return a.prototype.raycastAll = function (t, o, e, n, i) {
    "function" == typeof n && (i = n, n = {}), i = i || function () {};var r = c,
        s = l;this._getCannonStartEnd(t, o, e, r, s);
    var a = this,
        p = !1;return this.cannonWorld.raycastAll(r, s, this._getCannonRaycastOptions(n), function (o) {
      var e = a._copyCannonRaycastResultToGoo(o, g, t);e && (p = !0), i(g) === !1 && o.abort();
    }), p;
  }, a.prototype.play = function () {
    this.passive = !1, this.initialize();
  }, a.prototype.pause = function () {
    this.passive = !0;
  }, a.prototype.resume = function () {
    this.passive = !1;
  }, a.prototype.stop = function () {
    this.pause(), this.destroy();
  }, a.prototype.initialize = function (t) {
    t = t || this._activeEntities;for (var o = t.length, e = 0; e !== o; e++) {
      var n = t[e],
          i = n.rigidBodyComponent;i.initialize();
    }for (var r = this._activeColliderEntities, e = 0; e !== r.length; e++) {
      var s = r[e];s.colliderComponent && (s.colliderComponent.getBodyEntity() || s.colliderComponent.cannonBody || s.colliderComponent.initialize());
    }for (var e = 0; e !== o; e++) {
      for (var n = t[e], a = n.rigidBodyComponent.joints, c = 0; c < a.length; c++) {
        var l = a[c];n.rigidBodyComponent.initializeJoint(l, n, this);
      }
    }this.initialized = !0;
  }, a.prototype.destroy = function (t) {
    t = t || this._activeEntities;var o = t.length;this._shapeIdToColliderEntityMap.forEach(function (t) {
      this._shapeIdToColliderEntityMap["delete"](t);
    }.bind(this)), this._stayingEntities.length = 0;for (var e = 0; e !== o; e++) {
      for (var n = t[e], i = n.rigidBodyComponent.joints, r = 0; r < i.length; r++) {
        var s = i[r];n.rigidBodyComponent.destroyJoint(s, n, this);
      }
    }for (var e = 0; e !== this._activeColliderEntities.length; e++) {
      var a = this._activeColliderEntities[e];a.colliderComponent && a.colliderComponent.cannonBody && a.colliderComponent.destroy();
    }for (var e = 0; e !== o; e++) {
      var n = t[e],
          c = n.rigidBodyComponent;c.destroy();
    }this.initialized = !1;
  }, a.prototype.process = function (t, o) {
    this.initialized || this.initialize(), 0 !== t.length && (this.step(o), this.syncTransforms(t));
  }, a.prototype.syncTransforms = function (t) {
    for (var o = t.length, n = [], i = 0; i !== o; i++) {
      var r = t[i],
          a = r.rigidBodyComponent;a._updated = !1, r.transformComponent.parent ? n.unshift(r) : n.push(r);
    }for (; n.length;) {
      var r = n.pop(),
          a = r.rigidBodyComponent,
          c = r.transformComponent,
          l = c.transform;if (!a._updated) {
        a._updated = !0, a.interpolation === e.INTERPOLATE ? (a.getInterpolatedPosition(h), a.getInterpolatedQuaternion(d)) : (a.getPosition(h), a.getQuaternion(d)), l.translation.set(h), l.rotation.copyQuaternion(d), c.updateTransform(), c.updateWorldTransform();var p = c.parent;p && (p.entity.transformComponent.worldTransform.invert(u), s.combine(u, l, u), l.rotation.copy(u.rotation), l.translation.copy(u.translation), c.updateTransform(), c.updateWorldTransform()), c.setUpdated();
      }
    }
  }, a;
}(goo.AbstractPhysicsSystem, goo.RaycastResult, goo.RigidBodyComponent, goo.Vector3, goo.Quaternion, goo.EntityUtils, goo.Transform), "function" == typeof require && (define("goo/addons/physicspack/PhysicsMaterial", [], function () {
  return goo.PhysicsMaterial;
}), define("goo/addons/physicspack/RaycastResult", [], function () {
  return goo.RaycastResult;
}), define("goo/addons/physicspack/colliders/Collider", [], function () {
  return goo.Collider;
}), define("goo/addons/physicspack/colliders/CylinderCollider", [], function () {
  return goo.CylinderCollider;
}), define("goo/addons/physicspack/colliders/BoxCollider", [], function () {
  return goo.BoxCollider;
}), define("goo/addons/physicspack/colliders/MeshCollider", [], function () {
  return goo.MeshCollider;
}), define("goo/addons/physicspack/colliders/PlaneCollider", [], function () {
  return goo.PlaneCollider;
}), define("goo/addons/physicspack/colliders/SphereCollider", [], function () {
  return goo.SphereCollider;
}), define("goo/addons/physicspack/components/AbstractColliderComponent", [], function () {
  return goo.AbstractColliderComponent;
}), define("goo/addons/physicspack/components/AbstractRigidBodyComponent", [], function () {
  return goo.AbstractRigidBodyComponent;
}), define("goo/addons/physicspack/components/ColliderComponent", [], function () {
  return goo.ColliderComponent;
}), define("goo/addons/physicspack/joints/PhysicsJoint", [], function () {
  return goo.PhysicsJoint;
}), define("goo/addons/physicspack/joints/BallJoint", [], function () {
  return goo.BallJoint;
}), define("goo/addons/physicspack/joints/HingeJoint", [], function () {
  return goo.HingeJoint;
}), define("goo/addons/physicspack/components/RigidBodyComponent", [], function () {
  return goo.RigidBodyComponent;
}), define("goo/addons/physicspack/handlers/ColliderComponentHandler", [], function () {
  return goo.ColliderComponentHandler;
}), define("goo/addons/physicspack/handlers/RigidBodyComponentHandler", [], function () {
  return goo.RigidBodyComponentHandler;
}), define("goo/addons/physicspack/shapes/PhysicsCylinderDebugShape", [], function () {
  return goo.PhysicsCylinderDebugShape;
}), define("goo/addons/physicspack/shapes/PhysicsPlaneDebugShape", [], function () {
  return goo.PhysicsPlaneDebugShape;
}), define("goo/addons/physicspack/shapes/PhysicsBoxDebugShape", [], function () {
  return goo.PhysicsBoxDebugShape;
}), define("goo/addons/physicspack/shapes/PhysicsSphereDebugShape", [], function () {
  return goo.PhysicsSphereDebugShape;
}), define("goo/addons/physicspack/systems/ColliderSystem", [], function () {
  return goo.ColliderSystem;
}), define("goo/addons/physicspack/systems/AbstractPhysicsSystem", [], function () {
  return goo.AbstractPhysicsSystem;
}), define("goo/addons/physicspack/util/Pool", [], function () {
  return goo.Pool;
}), define("goo/addons/physicspack/systems/PhysicsDebugRenderSystem", [], function () {
  return goo.PhysicsDebugRenderSystem;
}), define("goo/addons/physicspack/systems/PhysicsSystem", [], function () {
  return goo.PhysicsSystem;
}));

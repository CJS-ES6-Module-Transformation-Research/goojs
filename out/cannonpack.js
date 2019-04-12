"use strict";

goo.CannonBoxColliderComponent = function (n, o, t) {
  "use strict";

  function e(o) {
    n.apply(this, arguments), this.type = "CannonBoxColliderComponent", o = o || {};var e = this.halfExtents = o.halfExtents || new t(.5, .5, .5);this.cannonShape = new CANNON.Box(new CANNON.Vec3(e.x, e.y, e.z)), this.isTrigger = "undefined" != typeof o.isTrigger ? o.isTrigger : !1;
  }return e.prototype = Object.create(n.prototype), e.constructor = e, e;
}(goo.Component, goo.Box, goo.Vector3), goo.CannonCylinderColliderComponent = function (n) {
  "use strict";

  function o(o) {
    n.apply(this, arguments), o = o || {}, this.type = "CannonCylinderColliderComponent";var t = "number" == typeof o.radiusTop ? o.radiusTop : .5,
        e = "number" == typeof o.radiusBottom ? o.radiusBottom : .5,
        i = "number" == typeof o.height ? o.height : 1,
        r = "number" == typeof o.numSegments ? o.numSegments : 10;this.cannonShape = new CANNON.Cylinder(t, e, i, r);
  }return o.prototype = Object.create(n.prototype), o.constructor = o, o;
}(goo.Component), goo.CannonDistanceJointComponent = function (n, o) {
  "use strict";

  function t(t) {
    n.apply(this, arguments), t = t || {}, this.type = "CannonDistanceJointComponent", o.defaults(t, { distance: 1, connectedBody: null }), this.distance = t.distance, this.connectedBody = t.connectedBody, this.cannonConstraint = null;
  }return t.prototype = Object.create(n.prototype), t.constructor = t, t.prototype.createConstraint = function (n) {
    var o = n.cannonRigidbodyComponent.body,
        t = this.connectedBody.body;return this.cannonConstraint = new CANNON.DistanceConstraint(o, t, this.distance), this.cannonConstraint;
  }, t;
}(goo.Component, goo.ObjectUtils), goo.CannonPlaneColliderComponent = function (n) {
  "use strict";

  function o(o) {
    n.apply(this, arguments), this.type = "CannonPlaneColliderComponent", o = o || {}, this.cannonShape = new CANNON.Plane();
  }return o.prototype = Object.create(n.prototype), o.constructor = o, o;
}(goo.Component), goo.CannonSphereColliderComponent = function (n) {
  "use strict";

  function o(o) {
    n.apply(this, arguments), o = o || {}, this.type = "CannonSphereColliderComponent", this.radius = o.radius || .5, this.cannonShape = new CANNON.Sphere(this.radius);
  }return o.prototype = Object.create(n.prototype), o.constructor = o, o;
}(goo.Component), goo.CannonRigidbodyComponent = function (n, o, t, e, i, r, a, s) {
  "use strict";

  function p(o) {
    n.apply(this, arguments), o = o || {}, this.type = "CannonRigidbodyComponent", s.defaults(o, { mass: 1, velocity: new t() }), this.mass = o.mass, this._initialPosition = null, this._initialVelocity = new t(), this._initialVelocity.set(o.velocity), this.body = null, this.centerOfMassOffset = new t();
  }p.prototype = Object.create(n.prototype), p.constructor = p, p.prototype.api = { setForce: function setForce(n) {
      p.prototype.setForce.call(this.cannonRigidbodyComponent, n);
    }, setVelocity: function setVelocity(n) {
      p.prototype.setVelocity.call(this.cannonRigidbodyComponent, n);
    }, setPosition: function setPosition(n) {
      p.prototype.setPosition.call(this.cannonRigidbodyComponent, n);
    }, setAngularVelocity: function setAngularVelocity(n) {
      p.prototype.setAngularVelocity.call(this.cannonRigidbodyComponent, n);
    } };var c = new o();return p.prototype.setForce = function (n) {
    this.body.force.set(n.x, n.y, n.z);
  }, p.prototype.setVelocity = function (n) {
    this.body.velocity.set(n.x, n.y, n.z);
  }, p.prototype.setPosition = function (n) {
    this.body ? this.body.position.set(n.x, n.y, n.z) : this._initialPosition = new t(n);
  }, p.prototype.setAngularVelocity = function (n) {
    this.body.angularVelocity.set(n.x, n.y, n.z);
  }, p.getCollider = function (n) {
    return n.cannonBoxColliderComponent || n.cannonPlaneColliderComponent || n.cannonSphereColliderComponent || n.cannonTerrainColliderComponent || n.cannonCylinderColliderComponent || null;
  }, p.prototype.addShapesToBody = function (n) {
    var o = n.cannonRigidbodyComponent.body,
        t = p.getCollider(n);if (t) o.addShape(t.cannonShape);else {
      var i = n.transformComponent.worldTransform,
          r = new e();r.copy(i), r.invert(r);var a = new e(),
          s = this.centerOfMassOffset;n.traverse(function (n) {
        var t = p.getCollider(n);if (t) {
          a.copy(n.transformComponent.worldTransform);var i = new e();e.combine(r, a, i), i.update();var d = i.translation,
              l = i.rotation,
              C = new CANNON.Vec3(d.x, d.y, d.z),
              y = c;y.fromRotationMatrix(l);var u = new CANNON.Quaternion(y.x, y.y, y.z, y.w);C.vadd(s, C), t.isTrigger && (t.cannonShape.collisionResponse = !1), o.addShape(t.cannonShape, C, u);
        }
      });
    }
  }, p;
}(goo.Component, goo.Quaternion, goo.Vector3, goo.Transform, goo.Box, goo.Sphere, goo.Quad, goo.ObjectUtils), goo.CannonSystem = function (n, o, t, e, i, r, a) {
  "use strict";

  function s(o) {
    n.call(this, "CannonSystem", ["CannonRigidbodyComponent", "TransformComponent"]), o = o || {}, a.defaults(o, { gravity: new r(0, -10, 0), stepFrequency: 60, broadphase: "naive" }), this.priority = 1;var t = this.world = new CANNON.World();t.gravity.x = o.gravity.x, t.gravity.y = o.gravity.y, t.gravity.z = o.gravity.z, this.setBroadphaseAlgorithm(o.broadphase), this.stepFrequency = o.stepFrequency, this.maxSubSteps = o.maxSubSteps || 0;
  }var p = new e();s.prototype = Object.create(n.prototype), s.prototype.constructor = s, s.prototype.reset = function () {
    for (var n = 0; n < this._activeEntities.length; n++) {
      var o = this._activeEntities[n];if (o.cannonRigidbodyComponent.added) {
        var t = o.cannonRigidbodyComponent.body,
            i = o.transformComponent.worldTransform.translation,
            r = new e();r.fromRotationMatrix(o.transformComponent.worldTransform.rotation), t.position.set(i.x, i.y, i.z), t.quaternion.set(r.x, r.y, r.z, r.w), t.velocity.set(0, 0, 0), t.angularVelocity.set(0, 0, 0);
      }
    }
  }, s.prototype.inserted = function (n) {
    var o = n.cannonRigidbodyComponent;o.body = null;
  }, s.prototype.deleted = function (n) {
    var o = n.cannonRigidbodyComponent;o && o.body && (this.world.remove(o.body), o.body = null);
  };var c = new r();return s.prototype.process = function (n) {
    for (var o = this.world, t = 0; t < n.length; t++) {
      var e = n[t],
          i = e.cannonRigidbodyComponent;if (!i || !i.added) {
        var r = e.transformComponent,
            a = new CANNON.Body({ mass: i.mass });if (i.body = a, i.addShapesToBody(e), a.shapes.length) {
          i._initialPosition ? e.setPosition(i._initialPosition) : e.setPosition(r.transform.translation), e.setVelocity(i._initialVelocity);var s = p;s.fromRotationMatrix(r.transform.rotation), a.quaternion.set(s.x, s.y, s.z, s.w), o.add(a);var d = e.cannonDistanceJointComponent;d && o.addConstraint(d.createConstraint(e)), i.added = !0;
        } else e.clearComponent("CannonRigidbodyComponent");
      }
    }var l = 1 / this.stepFrequency,
        C = this.maxSubSteps;if (C) {
      var y = performance.now() / 1e3;this._lastTime || (this._lastTime = y);var u = y - this._lastTime;this._lastTime = y, o.step(l, u, C);
    } else o.step(l);for (var t = 0; t < n.length; t++) {
      var e = n[t],
          m = e.cannonRigidbodyComponent;if (m) {
        m.body.computeAABB();var h = m.body.quaternion,
            g = m.body.position;h.vmult(m.centerOfMassOffset, c), g.vadd(c, c), e.transformComponent.setTranslation(c.x, c.y, c.z), p.setDirect(h.x, h.y, h.z, h.w), e.transformComponent.transform.rotation.copyQuaternion(p), e.transformComponent.setUpdated();
      }
    }
  }, s.prototype.setBroadphaseAlgorithm = function (n) {
    var o = this.world;switch (n) {case "naive":
        o.broadphase = new CANNON.NaiveBroadphase();break;case "sap":
        o.broadphase = new CANNON.SAPBroadphase(o);break;default:
        throw new Error("Broadphase not supported: " + n);}
  }, s;
}(goo.System, goo.BoundingBox, goo.BoundingSphere, goo.Quaternion, goo.Transform, goo.Vector3, goo.ObjectUtils), goo.CannonTerrainColliderComponent = function (n) {
  "use strict";

  function o(o) {
    n.apply(this, arguments), this.type = "CannonTerrainColliderComponent", o = o || { data: [], shapeOptions: {} }, this.cannonShape = new CANNON.Heightfield(o.data, o.shapeOptions);
  }return o.prototype = Object.create(n.prototype), o.constructor = o, o;
}(goo.Component), "function" == typeof require && (define("goo/addons/cannonpack/CannonBoxColliderComponent", [], function () {
  return goo.CannonBoxColliderComponent;
}), define("goo/addons/cannonpack/CannonCylinderColliderComponent", [], function () {
  return goo.CannonCylinderColliderComponent;
}), define("goo/addons/cannonpack/CannonDistanceJointComponent", [], function () {
  return goo.CannonDistanceJointComponent;
}), define("goo/addons/cannonpack/CannonPlaneColliderComponent", [], function () {
  return goo.CannonPlaneColliderComponent;
}), define("goo/addons/cannonpack/CannonSphereColliderComponent", [], function () {
  return goo.CannonSphereColliderComponent;
}), define("goo/addons/cannonpack/CannonRigidbodyComponent", [], function () {
  return goo.CannonRigidbodyComponent;
}), define("goo/addons/cannonpack/CannonSystem", [], function () {
  return goo.CannonSystem;
}), define("goo/addons/cannonpack/CannonTerrainColliderComponent", [], function () {
  return goo.CannonTerrainColliderComponent;
}));

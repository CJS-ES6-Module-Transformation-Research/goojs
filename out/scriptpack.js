"use strict";

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

goo.AxisAlignedCamControlScript = function (e, t, n) {
  "use strict";

  function o() {
    function t(t, r) {
      r.axis = e.UNIT_Z.clone(), r.upAxis = e.UNIT_Y.clone(), o(t, r, t.view), r.currentView = t.view, r.lookAtPoint = new e(), r.distance = t.distance, r.smoothness = Math.pow(n.clamp(t.smoothness, 0, 1), .3), r.axisAlignedDirty = !0;
    }function o(t, n, o) {
      if (n.currentView !== o) {
        switch (n.currentView = o, o) {case "XY":
            n.axis.set(e.UNIT_Z), n.upAxis.set(e.UNIT_Y);break;case "ZY":
            n.axis.set(e.UNIT_X), n.upAxis.set(e.UNIT_Y);}n.axisAlignedDirty = !0;
      }
    }function r(e, t) {
      if (e.view !== t.currentView && (t.axisAlignedDirty = !0), t.axisAlignedDirty) {
        var n = t.entity,
            o = n.transformComponent.transform;o.translation.set(t.axis).scale(t.distance).add(t.lookAtPoint), o.lookAt(t.lookAtPoint, t.upAxis), n.transformComponent.setUpdated(), t.axisAlignedDirty = !1;
      }
    }function i() {}return { setup: t, update: r, cleanup: i };
  }return o.externals = { key: "AxisAlignedCamControlScript", name: "Axis-aligned Camera Control", description: "Aligns a camera along an axis, and enables switching between them.", parameters: [{ key: "whenUsed", name: "When Camera Used", description: "Script only runs when the camera to which it is added is being used.", "default": !0, type: "boolean" }, { key: "distance", name: "Distance", type: "float", description: "Camera distance from lookat point", control: "slider", "default": 1, min: 1, max: 1e3 }, { key: "view", type: "string", "default": "XY", control: "select", options: ["XY", "ZY"] }] }, o;
}(goo.Vector3, goo.ScriptUtils, goo.MathUtils), goo.BasicControlScript = function (e, t) {
  "use strict";

  function n(n) {
    n = n || {}, this.domElement = void 0 === n.domElement ? null : n.domElement.domElement || n.domElement, this.name = "BasicControlScript", this.movementSpeed = 10, this.rollSpeed = 2, this.movementSpeedMultiplier = 1, this.mouseStatus = 0, this.moveState = { up: 0, down: 0, left: 0, right: 0, forward: 0, back: 0, pitchUp: 0, pitchDown: 0, yawLeft: 0, yawRight: 0, rollLeft: 0, rollRight: 0 }, this.moveVector = new e(0, 0, 0), this.rotationVector = new e(0, 0, 0), this.multiplier = new e(1, 1, 1), this.rotationMatrix = new t(), this.tmpVec = new e(), this.handleEvent = function (e) {
      "function" == typeof this[e.type] && this[e.type](e);
    }, this.keydown = function (e) {
      if (!e.altKey) {
        switch (e.keyCode) {case 16:
            this.movementSpeedMultiplier = .1;break;case 87:
            this.moveState.forward = 1;break;case 83:
            this.moveState.back = 1;break;case 65:
            this.moveState.left = 1;break;case 68:
            this.moveState.right = 1;break;case 82:
            this.moveState.up = 1;break;case 70:
            this.moveState.down = 1;break;case 38:
            this.moveState.pitchUp = 1;break;case 40:
            this.moveState.pitchDown = 1;break;case 37:
            this.moveState.yawLeft = 1;break;case 39:
            this.moveState.yawRight = 1;break;case 81:
            this.moveState.rollLeft = 1;break;case 69:
            this.moveState.rollRight = 1;}this.updateMovementVector(), this.updateRotationVector();
      }
    }, this.keyup = function (e) {
      switch (e.keyCode) {case 16:
          this.movementSpeedMultiplier = 1;break;case 87:
          this.moveState.forward = 0;break;case 83:
          this.moveState.back = 0;break;case 65:
          this.moveState.left = 0;break;case 68:
          this.moveState.right = 0;break;case 82:
          this.moveState.up = 0;break;case 70:
          this.moveState.down = 0;break;case 38:
          this.moveState.pitchUp = 0;break;case 40:
          this.moveState.pitchDown = 0;break;case 37:
          this.moveState.yawLeft = 0;break;case 39:
          this.moveState.yawRight = 0;break;case 81:
          this.moveState.rollLeft = 0;break;case 69:
          this.moveState.rollRight = 0;}this.updateMovementVector(), this.updateRotationVector();
    }, this.mousedown = function (e) {
      this.domElement !== document && this.domElement.focus(), e.preventDefault(), e = e.touches && 1 === e.touches.length ? e.touches[0] : e, this.mouseDownX = e.pageX, this.mouseDownY = e.pageY, this.mouseStatus = 1, document.addEventListener("mousemove", this.mousemove, !1), document.addEventListener("mouseup", this.mouseup, !1), document.addEventListener("touchmove", this.mousemove, !1), document.addEventListener("touchend", this.mouseup, !1);
    }.bind(this), this.mousemove = function (e) {
      this.mouseStatus > 0 && (e = e.touches && 1 === e.touches.length ? e.touches[0] : e, this.moveState.yawLeft = e.pageX - this.mouseDownX, this.moveState.pitchDown = e.pageY - this.mouseDownY, this.updateRotationVector(), this.mouseDownX = e.pageX, this.mouseDownY = e.pageY);
    }.bind(this), this.mouseup = function (e) {
      this.mouseStatus && (e.preventDefault(), this.mouseStatus = 0, this.moveState.yawLeft = this.moveState.pitchDown = 0, this.updateRotationVector(), document.removeEventListener("mousemove", this.mousemove), document.removeEventListener("mouseup", this.mouseup), document.removeEventListener("touchmove", this.mousemove), document.removeEventListener("touchend", this.mouseup));
    }.bind(this), this.updateMovementVector = function () {
      var e = this.moveState.forward || this.autoForward && !this.moveState.back ? 1 : 0;this.moveVector.x = -this.moveState.left + this.moveState.right, this.moveVector.y = -this.moveState.down + this.moveState.up, this.moveVector.z = -e + this.moveState.back;
    }, this.updateRotationVector = function () {
      this.rotationVector.x = -this.moveState.pitchDown + this.moveState.pitchUp, this.rotationVector.y = -this.moveState.yawRight + this.moveState.yawLeft, this.rotationVector.z = -this.moveState.rollRight + this.moveState.rollLeft;
    }, this.getContainerDimensions = function () {
      return this.domElement !== document ? { size: [this.domElement.offsetWidth, this.domElement.offsetHeight], offset: [this.domElement.offsetLeft, this.domElement.offsetTop] } : { size: [window.innerWidth, window.innerHeight], offset: [0, 0] };
    }, this.domElement && this.setupMouseControls(), this.updateMovementVector(), this.updateRotationVector();
  }return n.prototype.setupMouseControls = function () {
    this.domElement.setAttribute("tabindex", -1), this.domElement.addEventListener("mousedown", this.mousedown, !1), this.domElement.addEventListener("touchstart", this.mousedown, !1), this.domElement.addEventListener("keydown", this.keydown.bind(this), !1), this.domElement.addEventListener("keyup", this.keyup.bind(this), !1);
  }, n.prototype.externals = function () {
    return [{ variable: "movementSpeed", type: "number" }, { variable: "rollSpeed", type: "number" }];
  }, n.prototype.run = function (t, n, o) {
    o && !this.domElement && o.domElement && (this.domElement = o.domElement, this.setupMouseControls());var r = t.transformComponent,
        i = r.transform,
        a = t._world.tpf,
        s = a * this.movementSpeed * this.movementSpeedMultiplier,
        c = a * this.rollSpeed * this.movementSpeedMultiplier;(!this.moveVector.equals(e.ZERO) || !this.rotationVector.equals(e.ZERO) || this.mouseStatus > 0) && (i.translation.x += this.moveVector.x * s, i.translation.y += this.moveVector.y * s, i.translation.z += this.moveVector.z * s, this.tmpVec.x += -this.rotationVector.x * c * this.multiplier.x, this.tmpVec.y += this.rotationVector.y * c * this.multiplier.y, this.tmpVec.z += this.rotationVector.z * c * this.multiplier.z, i.rotation.fromAngles(this.tmpVec.x, this.tmpVec.y, this.tmpVec.z), this.mouseStatus > 0 && (this.moveState.yawLeft = 0, this.moveState.pitchDown = 0, this.updateRotationVector()), r.setUpdated());
  }, n;
}(goo.Vector3, goo.Matrix3), goo.ButtonScript = function (e, t, n, o, r) {
  "use strict";

  function i() {
    function e(e, n) {
      n.button = ["Any", "Left", "Middle", "Right"].indexOf(e.button) - 1, n.button < -1 && (n.button = -1), n.renderToPickHandler = function () {
        n.skipUpdateBuffer = !0;
      }, r.addListener("ButtonScript.renderToPick", n.renderToPickHandler, !1), n.mouseState = { x: 0, y: 0, down: !1, downOnEntity: !1, overEntity: !1 }, n.listeners = { mousedown: function mousedown(o) {
          if (e.whenUsed) {
            var r = i(o);(r === n.button || -1 === n.button) && (n.mouseState.down = !0, t(e, n, o), a(e, n, "mousedown"));
          }
        }, mouseup: function mouseup(o) {
          if (e.whenUsed) {
            var r = i(o);(r === n.button || -1 === n.button) && (n.mouseState.down = !1, t(e, n, o), n.mouseState.downOnEntity && a(e, n, "click"), a(e, n, "mouseup"));
          }
        }, dblclick: function dblclick(o) {
          if (e.whenUsed) {
            var r = i(o);(r === n.button || -1 === n.button) && (n.mouseState.down = !1, t(e, n, o), a(e, n, "dblclick"));
          }
        }, mousemove: function mousemove(o) {
          e.whenUsed && e.enableOnMouseMove && (n.mouseState.down = !1, t(e, n, o), a(e, n, "mousemove"));
        }, touchstart: function touchstart(t) {
          if (e.whenUsed) {
            n.mouseState.down = !0;var o = t.targetTouches,
                r = n.domElement.getBoundingClientRect();n.mouseState.x = o[0].pageX - r.left, n.mouseState.y = o[0].pageY - r.top, a(e, n, "touchstart");
          }
        }, touchend: function touchend(t) {
          e.whenUsed && (t.preventDefault(), t.stopPropagation(), n.mouseState.down = !1, a(e, n, "touchend"));
        } };for (var o in n.listeners) {
        n.domElement.addEventListener(o, n.listeners[o]);
      }
    }function t(e, t, n) {
      var o = t.domElement.getBoundingClientRect();t.mouseState.x = n.pageX - o.left, t.mouseState.y = n.pageY - o.top;
    }function n(e, t) {
      t.skipUpdateBuffer = !1;
    }function o(e, t) {
      for (var n in t.listeners) {
        t.domElement.removeEventListener(n, t.listeners[n]);
      }r.removeListener("ButtonScript.renderToPick", t.renderToPickHandler);
    }function i(e) {
      var t = e.button;return 0 === t && (e.altKey ? t = 2 : e.shiftKey && (t = 1)), t;
    }function a(e, t, n) {
      var o = t.entity._world.gooRunner,
          i = o.pickSync(t.mouseState.x, t.mouseState.y, t.skipUpdateBuffer);t.skipUpdateBuffer || r.emit("ButtonScript.renderToPick");var a = o.world.entityManager.getEntityByIndex(i.id);t.mouseState.downOnEntity = !1, a === t.entity && (r.emit(e.channel + "." + n, { type: n, entity: a }), ("mousedown" === n || "touchstart" === n) && (t.mouseState.downOnEntity = !0), !e.linkUrl || "click" !== n && "touchend" !== n || window.open(e.linkUrl, e.linkTarget)), "mousemove" !== n || t.mouseState.overEntity || a !== t.entity || r.emit(e.channel + ".mouseover", { type: "mouseover", entity: a }), "mousemove" === n && t.mouseState.overEntity && a !== t.entity && r.emit(e.channel + ".mouseout", { type: "mouseout", entity: a }), t.mouseState.overEntity = a === t.entity;
    }return { setup: e, update: n, cleanup: o };
  }return i.externals = { key: "ButtonScript", name: "Button", description: "Enables an entity to be interacted with using click or touch.", parameters: [{ key: "whenUsed", type: "boolean", "default": !0 }, { key: "button", name: "button", description: "Only interact with this mouse button.", type: "string", control: "select", "default": "Any", options: ["Any", "Left", "Middle", "Right"] }, { key: "linkUrl", name: "linkUrl", description: "URL to open when clicking the entity. Leave this field empty to disable.", type: "string", "default": "" }, { key: "linkTarget", name: "linkTarget", description: "The window to open the link in.", type: "string", "default": "_blank" }, { key: "channel", name: "channel", description: "Event channel to emit to. Will emit channel.click, .mousedown, .mouseup, .mouseover, .mouseout, .dblclick, .touchstart, .touchend", type: "string", "default": "button" }, { key: "enableOnMouseMove", name: "enableOnMouseMove", description: "Enables .mousemove, .mouseover, and .mouseout events. For larger scenes, this might be worth turning off, for better performance.", type: "boolean", "default": !0 }] }, i;
}(goo.Vector3, goo.Scripts, goo.ScriptUtils, goo.Renderer, goo.SystemBus), goo.CannonPickScript = function (e, t, n, o, r) {
  "use strict";

  function i() {
    function t(e) {
      var t = e[0].clientX,
          n = e[0].clientY,
          o = e[1].clientX,
          r = e[1].clientY,
          i = (t + o) / 2,
          a = (n + r) / 2;return [i, a];
    }function n(e, n) {
      d = ["Any", "Left", "Middle", "Right"].indexOf(e.pickButton) - 1, -1 > d && (d = -1), m = n.world.getSystem("CannonSystem");var o = new a.Sphere(.1),
          r = n.jointBody = new a.RigidBody(0, o);r.collisionFilterGroup = 2, r.collisionFilterMask = 2, m.world.add(r), p = { x: 0, y: 0, ox: 0, oy: 0, dx: 0, dy: 0, down: !1 };var i = n.listeners = { mousedown: function mousedown(t) {
          if (!e.whenUsed || n.entity === n.activeCameraEntity) {
            var o = t.button;0 === o && (t.altKey ? o = 2 : t.shiftKey && (o = 1)), (o === d || -1 === d) && (p.down = !0, p.ox = p.x = t.clientX, p.oy = p.y = t.clientY);
          }
        }, mouseup: function mouseup(e) {
          var t = e.button;0 === t && (e.altKey ? t = 2 : e.shiftKey && (t = 1)), (t === d || -1 === d) && (p.down = !1, p.dx = p.dy = 0);
        }, mousemove: function mousemove(t) {
          e.whenUsed && n.entity !== n.activeCameraEntity || p.down && (p.x = t.clientX, p.y = t.clientY, n.dirty = !0);
        }, mouseleave: function mouseleave() {
          p.down = !1, p.ox = p.x, p.oy = p.y;
        }, touchstart: function touchstart(o) {
          if (!e.whenUsed || n.entity === n.activeCameraEntity) {
            if (p.down = 2 === o.targetTouches.length, !p.down) return;var r = t(o.targetTouches);p.ox = p.x = r[0], p.oy = p.y = r[1];
          }
        }, touchmove: function touchmove(o) {
          if (!e.whenUsed || n.entity === n.activeCameraEntity) {
            if (!p.down) return;var r = t(o.targetTouches);p.x = r[0], p.y = r[1];
          }
        }, touchend: function touchend() {
          p.down = !1, p.ox = p.x, p.oy = p.y;
        } };for (var s in i) {
        n.domElement.addEventListener(s, i[s]);
      }n.dirty = !0;
    }function i(t, n) {
      p.dx = p.x - p.ox, p.dy = p.y - p.oy, p.ox = p.x, p.oy = p.y;var r = o.mainCamera;if (r && p.down && !n.mouseConstraint) {
        for (var i = [], s = n.world.by.system("CannonSystem").toArray(), d = 0; d < s.length; d++) {
          var m = s[d].cannonRigidbodyComponent.body;m && m.shape instanceof a.Box && m.motionstate === a.Body.DYNAMIC && i.push(m);
        }var h = r.getPickRay(p.x, p.y, window.innerWidth, window.innerHeight),
            y = new a.Vec3(h.origin.x, h.origin.y, h.origin.z),
            g = new a.Vec3(h.direction.x, h.direction.y, h.direction.z),
            v = new a.Ray(y, g),
            S = v.intersectBodies(i);if (S.length) {
          var m = S[0].body,
              w = S[0].point;c(t, n, w.x, w.y, w.z, m, h.direction.scale(-1));
        }
      } else if (r && p.down && n.mouseConstraint && (0 !== p.dx || 0 !== p.dy)) {
        var r = o.mainCamera,
            h = r.getPickRay(p.x, p.y, window.innerWidth, window.innerHeight),
            x = new e();f.rayIntersect(h, x, !0), u(t, n, x);
      } else p.down || l(t, n);
    }function s(e, t) {
      for (var n in t.listeners) {
        t.domElement.removeEventListener(n, t.listeners[n]);
      }
    }function c(t, n, o, r, i, s, c) {
      n.constrainedBody = s;var u = new a.Vec3(o, r, i).vsub(n.constrainedBody.position),
          l = n.constrainedBody.quaternion.inverse(),
          d = l.vmult(u);n.jointBody.position.set(o, r, i), n.mouseConstraint = new a.PointToPointConstraint(n.constrainedBody, d, n.jointBody, new a.Vec3(0, 0, 0)), m.world.addConstraint(n.mouseConstraint);var p = new e(o, r, i);f.constant = p.dot(c), f.normal.set(c);
    }function u(e, t, n) {
      t.jointBody.position.set(n.x, n.y, n.z), t.mouseConstraint.update();
    }function l(e, t) {
      m.world.removeConstraint(t.mouseConstraint), t.mouseConstraint = !1;
    }var d,
        p,
        m,
        f = new r();return { setup: n, update: i, cleanup: s };
  }var a = window.CANNON;return i.externals = { key: "CannonPickScript", name: "Cannon.js Body Pick", description: "Enables the user to physically pick a Cannon.js physics body and drag it around.", parameters: [{ key: "whenUsed", type: "boolean", "default": !0 }, { key: "pickButton", name: "Pan button", description: "Pick with this button", type: "string", control: "select", "default": "Any", options: ["Any", "Left", "Middle", "Right"] }, { key: "useForceNormal", name: "Use force normal", type: "boolean", "default": !1 }, { key: "forceNormal", name: "Force normal", "default": [0, 0, 1], type: "vec3" }] }, i;
}(goo.Vector3, goo.Scripts, goo.ScriptUtils, goo.Renderer, goo.Plane), goo.WasdControlScript = function (e, t, n) {
  "use strict";

  function o() {
    function t() {
      y.x = m.strafeLeft - m.strafeRight, y.z = m.forward - m.back;
    }function o(e) {
      if (!e.altKey) switch (n.keyForCode(e.keyCode)) {case p.crawlKey:
          m.speed = p.crawlSpeed;break;case p.forwardKey:
          m.forward = 1, t();break;case p.backKey:
          m.back = 1, t();break;case p.strafeLeftKey:
          m.strafeLeft = 1, t();break;case p.strafeRightKey:
          m.strafeRight = 1, t();}
    }function r(e) {
      if (!e.altKey) switch (n.keyForCode(e.keyCode)) {case p.crawlKey:
          m.speed = p.walkSpeed;break;case p.forwardKey:
          m.forward = 0, t();break;case p.backKey:
          m.back = 0, t();break;case p.strafeLeftKey:
          m.strafeLeft = 0, t();break;case p.strafeRightKey:
          m.strafeRight = 0, t();}
    }function i(e) {
      e.setAttribute("tabindex", -1), e.addEventListener("keydown", o, !1), e.addEventListener("keyup", r, !1);
    }function a(e, t) {
      p = e, t.moveState = m = { strafeLeft: 0, strafeRight: 0, forward: 0, back: 0, crawling: !1, speed: e.walkSpeed }, u = t.entity, l = u.transformComponent, d = l.transform, i(t.domElement);
    }function s(t, n) {
      if (!(y.equals(e.ZERO) || t.whenUsed && n.entity !== n.activeCameraEntity)) {
        g.setDirect(f.x * y.z + h.x * y.x, f.y * y.z + h.y * y.x, f.z * y.z + h.z * y.x), g.normalize();var o = n.world.tpf * m.speed;g.scale(o);var r = d.rotation;g.applyPost(r), d.translation.add(g), l.setUpdated();
      }
    }function c(e, t) {
      t.domElement.removeEventListener("keydown", o, !1), t.domElement.removeEventListener("keyup", r, !1);
    }var u,
        l,
        d,
        p,
        m,
        f = new e(0, 0, -1),
        h = new e(-1, 0, 0),
        y = new e(),
        g = new e();return { setup: a, update: s, cleanup: c };
  }return o.externals = { key: "WASD", name: "WASD Control", description: "Enables moving via the WASD keys", parameters: [{ key: "whenUsed", type: "boolean", name: "When Camera Used", description: "Script only runs when the camera to which it is added is being used.", "default": !0 }, { key: "crawlKey", type: "string", control: "key", "default": "Shift" }, { key: "forwardKey", type: "string", control: "key", "default": "W" }, { key: "backKey", type: "string", control: "key", "default": "S" }, { key: "strafeLeftKey", type: "string", control: "key", "default": "A" }, { key: "strafeRightKey", type: "string", control: "key", "default": "D" }, { key: "walkSpeed", type: "int", control: "slider", "default": 10, min: 1, max: 100, exponential: !0 }, { key: "crawlSpeed", control: "slider", type: "int", "default": 1, min: .1, max: 10, exponential: !0 }] }, o;
}(goo.Vector3, goo.Scripts, goo.ScriptUtils), goo.MouseLookControlScript = function (e, t, n, o) {
  "use strict";

  function r() {
    function e(e) {
      f.whenUsed && m.entity !== m.activeCameraEntity || (-1 === p || e.button === p) && (y = !0, g = S = e.clientX, v = w = e.clientY);
    }function r() {
      document.pointerLockElement || o.requestPointerLock();
    }function i(e) {
      f.whenUsed && m.entity !== m.activeCameraEntity || y && (void 0 !== e.movementX ? (S += e.movementX, w += e.movementY) : (S = e.clientX, w = e.clientY));
    }function a() {
      y = !1;
    }function s() {
      y = !!document.pointerLockElement, document.pointerLockElement ? m.domElement.removeEventListener("mousedown", r) : m.domElement.addEventListener("mousedown", r);
    }function c(n, c) {
      m = c, f = n, p = ["Any", "Left", "Middle", "Right", "None"].indexOf(n.button) - 1, -1 > p && (p = -1);var u = c.domElement;3 === p ? (document.addEventListener("pointerlockchange", s), document.addEventListener("mousemove", i), u.addEventListener("mousedown", r), o.requestPointerLock()) : (u.addEventListener("mousedown", e), u.addEventListener("mouseup", a), u.addEventListener("mouseleave", a), u.addEventListener("mousemove", i)), d = new t();var l = c.entity.transformComponent.transform.rotation;l.toAngles(d), h = d.y;
    }function u(e, t) {
      if (S !== g || w !== v) {
        var o = S - g,
            r = w - v,
            i = t.entity,
            a = i.transformComponent.transform.rotation;a.toAngles(d);var s = d.x,
            c = d.y,
            u = e.maxAscent * n.DEG_TO_RAD,
            l = e.minAscent * n.DEG_TO_RAD;s = n.clamp(s - r * e.speed / 200, l, u);var p = e.maxAzimuth * n.DEG_TO_RAD - h,
            m = e.minAzimuth * n.DEG_TO_RAD - h;c -= o * e.speed / 200, e.clampAzimuth && (c = n.radialClamp(c, m, p)), a.fromAngles(s, c, 0), i.transformComponent.setUpdated(), g = S, v = w;
      }
    }function l(t, n) {
      var c = n.domElement;3 === p ? (o.exitPointerLock(), document.removeEventListener("mousemove", i), c.removeEventListener("mousedown", r), document.removeEventListener("pointerlockchange", s)) : (c.removeEventListener("mousemove", i), c.removeEventListener("mousedown", e), c.removeEventListener("mouseup", a), c.removeEventListener("mouseleave", a));
    }var d,
        p,
        m,
        f,
        h,
        y = !1,
        g = 0,
        v = 0,
        S = 0,
        w = 0;return { setup: c, update: u, cleanup: l };
  }return r.externals = { key: "MouseLookScript", name: "Mouse Look Control", description: "Click and drag to change rotation of entity, usually a camera", parameters: [{ key: "whenUsed", type: "boolean", name: "When Camera Used", description: "Script only runs when the camera to which it is added is being used.", "default": !0 }, { key: "button", name: "Mouse button", type: "string", control: "select", "default": "Left", options: ["Any", "Left", "Middle", "Right", "None"] }, { key: "speed", name: "Turn Speed", type: "float", control: "slider", "default": 1, min: -10, max: 10, scale: .1 }, { key: "maxAscent", name: "Max Ascent", type: "float", control: "slider", "default": 89.95, min: -89.95, max: 89.95 }, { key: "minAscent", name: "Min Ascent", type: "float", control: "slider", "default": -89.95, min: -89.95, max: 89.95 }, { key: "clampAzimuth", "default": !1, type: "boolean" }, { key: "minAzimuth", description: "Maximum arc the camera can reach clockwise of the target point", "default": -90, type: "int", control: "slider", min: -180, max: 0 }, { key: "maxAzimuth", description: "Maximum arc the camera can reach counter-clockwise of the target point", "default": 90, type: "int", control: "slider", min: 0, max: 180 }] }, r;
}(goo.Scripts, goo.Vector3, goo.MathUtils, goo.GameUtils), goo.FlyControlScript = function (e, t, n) {
  "use strict";

  function o() {
    function o(e, t) {
      s.setup(e, t), a.setup(e, t);
    }function r(e, t) {
      s.update(e, t), a.update(e, t);
    }function i(e, t) {
      s.cleanup(e, t), a.cleanup(e, t);
    }var a = e.create(t),
        s = e.create(n);return { setup: o, cleanup: i, update: r };
  }var r = t.externals.parameters,
      i = n.externals.parameters,
      a = r.concat(i.slice(1));return o.externals = { key: "FlyControlScript", name: "Fly Control", description: "This is a combo of the Wasd script and the MouseLook script", parameters: a }, o;
}(goo.Scripts, goo.WasdControlScript, goo.MouseLookControlScript), goo.GroundBoundMovementScript = function (e) {
  "use strict";

  function t(t) {
    t = t || {};for (var n in o) {
      "boolean" == typeof o[n] ? this[n] = void 0 !== t[n] ? t[n] === !0 : o[n] : isNaN(o[n]) ? o[n] instanceof e ? this[n] = t[n] ? new e(t[n]) : new e().set(o[n]) : this[n] = t[n] || o[n] : this[n] = isNaN(t[n]) ? o[n] : t[n];
    }this.groundContact = 1, this.targetVelocity = new e(), this.targetHeading = new e(), this.acceleration = new e(), this.torque = new e(), this.groundHeight = 0, this.groundNormal = new e(), this.controlState = { run: 0, strafe: 0, jump: 0, yaw: 0, roll: 0, pitch: 0 };
  }var n = new e(),
      o = { gravity: -9.81, worldFloor: -(1 / 0), jumpImpulse: 95, accLerp: .1, rotLerp: .1, modForward: 1, modStrafe: .7, modBack: .4, modTurn: .3 };return t.prototype.setTerrainSystem = function (e) {
    this.terrainScript = e;
  }, t.prototype.getTerrainSystem = function () {
    return this.terrainScript;
  }, t.prototype.getTerrainHeight = function (e) {
    var t = this.getTerrainSystem().getTerrainHeightAt(e);return null === t && (t = this.worldFloor), t;
  }, t.prototype.getTerrainNormal = function (e) {
    return this.getTerrainSystem().getTerrainNormalAt(e);
  }, t.prototype.applyForward = function (e) {
    this.controlState.run = e;
  }, t.prototype.applyStrafe = function (e) {
    this.controlState.strafe = e;
  }, t.prototype.applyJump = function (e) {
    this.controlState.jump = e;
  }, t.prototype.applyTurn = function (e) {
    this.controlState.yaw = e;
  }, t.prototype.applyJumpImpulse = function (e) {
    return this.groundContact && (this.controlState.jump ? (e = this.jumpImpulse, this.controlState.jump = 0) : e = 0), e;
  }, t.prototype.applyDirectionalModulation = function (e, t, n) {
    e *= this.modStrafe, n *= n > 0 ? this.modForward : this.modBack, this.targetVelocity.setDirect(e, this.applyJumpImpulse(t), n);
  }, t.prototype.applyTorqueModulation = function (e, t, n) {
    this.targetHeading.setDirect(e, t * this.modTurn, n);
  }, t.prototype.applyGroundNormalInfluence = function () {
    var e = Math.abs(Math.cos(this.groundNormal.x)),
        t = Math.abs(Math.cos(this.groundNormal.z));this.targetVelocity.x *= e, this.targetVelocity.z *= t;
  }, t.prototype.updateTargetVectors = function (e) {
    this.applyDirectionalModulation(this.controlState.strafe, this.gravity, this.controlState.run), this.targetVelocity.applyPost(e.rotation), this.applyGroundNormalInfluence(), this.applyTorqueModulation(this.controlState.pitch, this.controlState.yaw, this.controlState.roll);
  }, t.prototype.computeAcceleration = function (e, t, o) {
    return n.set(o), n.applyPost(e.transformComponent.transform.rotation), n.sub(t), n.lerp(o, this.accLerp), n.y = o.y, n;
  }, t.prototype.computeTorque = function (e, t) {
    return n.set(t), n.sub(e), n.lerp(t, this.rotLerp), n;
  }, t.prototype.updateVelocities = function (e) {
    var t = e.movementComponent.getVelocity(),
        n = e.movementComponent.getRotationVelocity();this.acceleration.set(this.computeAcceleration(e, t, this.targetVelocity)), this.torque.set(this.computeTorque(n, this.targetHeading));
  }, t.prototype.applyAccelerations = function (e) {
    e.movementComponent.addVelocity(this.acceleration), e.movementComponent.addRotationVelocity(this.torque);
  }, t.prototype.updateGroundNormal = function (e) {
    this.groundNormal.set(this.getTerrainNormal(e.translation));
  }, t.prototype.checkGroundContact = function (e, t) {
    this.groundHeight = this.getTerrainHeight(t.translation), t.translation.y <= this.groundHeight ? (this.groundContact = 1, this.updateGroundNormal(t)) : this.groundContact = 0;
  }, t.prototype.applyGroundContact = function (e, t) {
    this.groundHeight >= t.translation.y && (t.translation.y = this.groundHeight, e.movementComponent.velocity.y < 0 && (e.movementComponent.velocity.y = 0));
  }, t.prototype.run = function (e) {
    var t = e.transformComponent.transform;this.checkGroundContact(e, t), this.updateTargetVectors(t), this.updateVelocities(e), this.applyAccelerations(e), this.applyGroundContact(e, t);
  }, t;
}(goo.Vector3), goo.HeightMapBoundingScript = function (e) {
  "use strict";

  function t(e) {
    this.matrixData = e, this.width = e.length - 1;
  }return t.prototype.getMatrixData = function () {
    return this.matrixData;
  }, t.prototype.getPointInMatrix = function (e, t) {
    return this.matrixData[e][t];
  }, t.prototype.getAt = function (e, t) {
    return 0 > e || e > this.width || 0 > t || t > this.width ? 0 : this.getPointInMatrix(e, t);
  }, t.prototype.getInterpolated = function (e, t) {
    var n = this.getAt(Math.ceil(e), Math.ceil(t)),
        o = this.getAt(Math.ceil(e), Math.floor(t)),
        r = this.getAt(Math.floor(e), Math.ceil(t)),
        i = this.getAt(Math.floor(e), Math.floor(t)),
        a = e - Math.floor(e),
        s = t - Math.floor(t),
        c = n * a + r * (1 - a),
        u = o * a + i * (1 - a),
        l = c * s + u * (1 - s);return l;
  }, t.prototype.getTriangleAt = function (e, t) {
    var n,
        o = Math.ceil(e),
        r = Math.floor(e),
        i = Math.ceil(t),
        a = Math.floor(t),
        s = e - r,
        c = t - a,
        u = { x: r, y: i, z: this.getAt(r, i) },
        l = { x: o, y: a, z: this.getAt(o, a) };return n = 1 - c > s ? { x: r, y: a, z: this.getAt(r, a) } : { x: o, y: i, z: this.getAt(o, i) }, [u, l, n];
  }, t.prototype.getPreciseHeight = function (t, n) {
    var o = this.getTriangleAt(t, n),
        r = e.barycentricInterpolation(o[0], o[1], o[2], { x: t, y: n, z: 0 });return r.z;
  }, t.prototype.run = function (e) {
    var t = e.transformComponent.transform.translation;t.y = this.getInterpolated(t.z, t.x);
  }, t;
}(goo.MathUtils), goo.LensFlareScript = function (e, t, n, o, r, i) {
  "use strict";

  function a() {
    function e(e) {
      S.size = e, S.splash = t.createSplashTexture(512, { trailStartRadius: 25, trailEndRadius: 0 }), S.ring = t.createFlareTexture(e, { steps: w.ring, startRadius: e / 4, endRadius: e / 2 }), S.dot = t.createFlareTexture(e, { steps: w.dot, startRadius: 0, endRadius: e / 2 }), S.bell = t.createFlareTexture(e, { steps: w.bell, startRadius: 0, endRadius: e / 2 }), S["default"] = t.createFlareTexture(e, { steps: w.none, startRadius: 0, endRadius: e / 2 });
    }function n(e, t, n, o, r) {
      for (var i = 0; i < e.length; i++) {
        var a = e[i];g.push(new c(t, a.tx, a.displace, a.size, a.intensity * h, n, o, r, S, d));
      }return g;
    }function o(e) {
      for (var t = 0; t < e.length; t++) {
        e[t].quad.removeFromWorld();
      }
    }function r(t, n) {
      h = t.intensity, y = new s(100 * t.edgeRelevance);var o = v;t.highRes && (o *= 4), S.size !== o && e(o), g = [], l = n.entity, d = n.world, p = !1, f = [t.color[0], t.color[1], t.color[2], 1], m = [{ size: 2.53, tx: "bell", intensity: .7, displace: 1 }, { size: .53, tx: "dot", intensity: .7, displace: 1 }, { size: .83, tx: "bell", intensity: .2, displace: .8 }, { size: .4, tx: "ring", intensity: .1, displace: .6 }, { size: .3, tx: "bell", intensity: .1, displace: .4 }, { size: .6, tx: "bell", intensity: .1, displace: .3 }, { size: .3, tx: "dot", intensity: .1, displace: .15 }, { size: .22, tx: "ring", intensity: .03, displace: -.25 }, { size: .36, tx: "dot", intensity: .05, displace: -.5 }, { size: .8, tx: "ring", intensity: .1, displace: -.8 }, { size: .86, tx: "bell", intensity: .2, displace: -1.1 }, { size: 1.3, tx: "ring", intensity: .05, displace: -1.5 }], n.bounds = new i(n.entity.transformComponent.worldTransform.translation, 0);
    }function a() {
      o(g), g = [];
    }function u(e, t) {
      if (t.bounds.center.copy(t.entity.transformComponent.worldTransform.translation), t.activeCameraEntity.cameraComponent.camera.contains(t.bounds)) {
        y.updateFrameGeometry(l, t.activeCameraEntity), p || (g = n(m, f, e.scale, e.edgeDampen, e.edgeScaling), p = !0);for (var r = 0; r < g.length; r++) {
          g[r].updatePosition(y);
        }
      } else p && (o(g), p = !1);
    }var l,
        d,
        p,
        m,
        f,
        h,
        y,
        g = [],
        v = 64,
        S = {},
        w = { splash: { trailStartRadius: 25, trailEndRadius: 0 }, ring: [{ fraction: 0, value: 0 }, { fraction: .7, value: 0 }, { fraction: .92, value: 1 }, { fraction: .98, value: 0 }], dot: [{ fraction: 0, value: 1 }, { fraction: .3, value: .75 }, { fraction: .5, value: .45 }, { fraction: .65, value: .21 }, { fraction: .75, value: .1 }, { fraction: .98, value: 0 }], bell: [{ fraction: 0, value: 1 }, { fraction: .15, value: .75 }, { fraction: .3, value: .5 }, { fraction: .4, value: .25 }, { fraction: .75, value: .05 }, { fraction: .98, value: 0 }], none: [{ fraction: 0, value: 1 }, { fraction: 1, value: 0 }] };return { setup: r, update: u, cleanup: a };
  }function s(t) {
    this.camRot = null, this.distance = 0, this.offset = 0, this.centerRatio = 0, this.positionVector = new e(), this.distanceVector = new e(), this.centerVector = new e(), this.displacementVector = new e(), this.edgeRelevance = t;
  }function c(t, i, a, s, c, u, l, d, p, m) {
    this.sizeVector = new e(s, s, s), this.sizeVector.scale(u), this.positionVector = new e(), this.flareVector = new e(), this.intensity = c, this.displace = a, this.color = [t[0] * c, t[1] * c, t[2] * c, 1], this.edgeDampen = l, this.edgeScaling = d;var f = new n(o.uber, "flareShader");f.uniforms.materialEmissive = this.color, f.uniforms.materialDiffuse = [0, 0, 0, 1], f.uniforms.materialAmbient = [0, 0, 0, 1], f.uniforms.materialSpecular = [0, 0, 0, 1];var h = p[i];f.setTexture("DIFFUSE_MAP", h), f.setTexture("EMISSIVE_MAP", h), f.blendState.blending = "AdditiveBlending", f.blendState.blendEquation = "AddEquation", f.blendState.blendSrc = "OneFactor", f.blendState.blendDst = "OneFactor", f.depthState.enabled = !1, f.depthState.write = !1, f.cullState.enabled = !1;var y = new r(1, 1),
        g = m.createEntity(y, f);g.meshRendererComponent.cullMode = "Never", g.addToWorld(), this.material = f, this.quad = g;
  }return a.externals = { key: "LensFlareScript", name: "Lens Flare Script", description: "Makes an entity shine with some lensflare effect.", parameters: [{ key: "scale", name: "Scale", type: "float", description: "Scale of flare quads", control: "slider", "default": 1, min: .01, max: 2 }, { key: "intensity", name: "Intensity", type: "float", description: "Intensity of Effect", control: "slider", "default": 1, min: .01, max: 2 }, { key: "edgeRelevance", name: "Edge Relevance", type: "float", description: "How much the effect cares about being centered or not", control: "slider", "default": 0, min: 0, max: 2 }, { key: "edgeDampen", name: "Edge Dampening", type: "float", description: "Intensity adjustment by distance from center", control: "slider", "default": .2, min: 0, max: 1 }, { key: "edgeScaling", name: "Edge Scaling", type: "float", description: "Scale adjustment by distance from center", control: "slider", "default": 0, min: -2, max: 2 }, { key: "color", name: "Color", type: "vec3", description: "Effect Color", control: "color", "default": [.8, .75, .7] }, { key: "highRes", name: "High Resolution", type: "boolean", description: "Intensity of Effect", control: "checkbox", "default": !1 }] }, s.prototype.updateFrameGeometry = function (e, t) {
    this.camRot = t.transformComponent.transform.rotation, this.centerVector.set(t.cameraComponent.camera.translation), this.displacementVector.set(e.transformComponent.worldTransform.translation), this.displacementVector.sub(this.centerVector), this.distance = this.displacementVector.length(), this.distanceVector.setDirect(0, 0, -this.distance), this.distanceVector.applyPost(this.camRot), this.centerVector.add(this.distanceVector), this.positionVector.set(this.centerVector), this.displacementVector.set(e.transformComponent.worldTransform.translation), this.displacementVector.sub(this.positionVector), this.offset = this.displacementVector.length();var n = this.positionVector.length();n ? this.centerRatio = 1 - this.offset * this.edgeRelevance / this.positionVector.length() : this.centerRatio = 1 - this.offset * this.edgeRelevance, this.centerRatio = Math.max(0, this.centerRatio);
  }, c.prototype.updatePosition = function (e) {
    this.flareVector.set(e.displacementVector), this.positionVector.set(e.positionVector), this.flareVector.scale(this.displace), this.positionVector.add(this.flareVector), this.material.uniforms.materialEmissive = [this.color[0] * e.centerRatio * this.edgeDampen, this.color[1] * e.centerRatio * this.edgeDampen, this.color[2] * e.centerRatio * this.edgeDampen, 1];var t = e.distance + e.distance * e.centerRatio * this.edgeScaling,
        n = this.quad.transformComponent.transform;n.scale.set(this.sizeVector), n.scale.scale(t), n.rotation.set(e.camRot), n.translation.set(this.positionVector), this.quad.transformComponent.updateTransform(), this.quad.transformComponent.updateWorldTransform();
  }, a;
}(goo.Vector3, goo.ParticleSystemUtils, goo.Material, goo.ShaderLib, goo.Quad, goo.BoundingSphere), goo.PanCamScript = function (e, t, n, o, r, i) {
  "use strict";

  function a() {
    function t(e) {
      var t = 0,
          n = 0,
          o = e[0].clientX,
          r = e[0].clientY;if (e.length >= 2) {
        var i = e[1].clientX,
            a = e[1].clientY;t = (o + i) / 2, n = (r + a) / 2;
      } else t = o, n = r;return [t, n];
    }function n(n, o) {
      p = ["Any", "Left", "Middle", "Right"].indexOf(n.panButton) - 1, -1 > p && (p = -1), m = o.goingToLookAt, c = e.UNIT_Y.clone(), u = e.UNIT_X.clone().negate(), l = new e(), d = new e();var r = o.world.gooRunner.renderer;o.devicePixelRatio = r._useDevicePixelRatio && window.devicePixelRatio ? window.devicePixelRatio / r.svg.currentScale : 1, f = { x: 0, y: 0, ox: 0, oy: 0, dx: 0, dy: 0, down: !1 }, h = { mousedown: function mousedown(e) {
          if (!n.whenUsed || o.entity === o.activeCameraEntity) {
            var t = e.button;if (0 === t && (e.altKey ? t = 2 : e.shiftKey && (t = 1)), t === p || -1 === p) {
              f.down = !0;var r = void 0 !== e.offsetX ? e.offsetX : e.layerX,
                  i = void 0 !== e.offsetY ? e.offsetY : e.layerY;f.ox = f.x = r, f.oy = f.y = i;
            }
          }
        }, mouseup: function mouseup(e) {
          var t = e.button;0 === t && (e.altKey ? t = 2 : e.shiftKey && (t = 1)), f.down = !1, f.dx = f.dy = 0;
        }, mousemove: function mousemove(e) {
          if ((!n.whenUsed || o.entity === o.activeCameraEntity) && f.down) {
            var t = void 0 !== e.offsetX ? e.offsetX : e.layerX,
                r = void 0 !== e.offsetY ? e.offsetY : e.layerY;f.x = t, f.y = r, o.dirty = !0;
          }
        }, mouseleave: function mouseleave() {
          f.down = !1, f.ox = f.x, f.oy = f.y;
        }, touchstart: function touchstart(e) {
          if (!n.whenUsed || o.entity === o.activeCameraEntity) {
            if (f.down = "Any" === n.touchMode || "Single" === n.touchMode && 1 === e.targetTouches.length || "Double" === n.touchMode && 2 === e.targetTouches.length, !f.down) return;var r = t(e.targetTouches);f.ox = f.x = r[0], f.oy = f.y = r[1];
          }
        }, touchmove: function touchmove(e) {
          if (!n.whenUsed || o.entity === o.activeCameraEntity) {
            if (!f.down) return;var r = t(e.targetTouches);f.x = r[0], f.y = r[1], o.dirty = !0;
          }
        }, touchend: function touchend() {
          f.down = !1, f.ox = f.x, f.oy = f.y;
        } };for (var i in h) {
        o.domElement.addEventListener(i, h[i]);
      }o.dirty = !0;
    }function a(e, t) {
      if (t.dirty) {
        if (f.dx = f.x - f.ox, f.dy = f.y - f.oy, 0 === f.dx && 0 === f.dy) return void (t.dirty = !!t.lookAtPoint);e.invertX && (f.dx = -f.dx), e.invertY && (f.dy = -f.dy), f.ox = f.x, f.oy = f.y;var n = o.mainCamera,
            a = t.entity,
            s = a.transformComponent.transform,
            p = a.cameraComponent.camera;if (m && n) {
          if (m.equals(n.translation)) return;var h = t.viewportWidth / t.devicePixelRatio,
              y = t.viewportHeight / t.devicePixelRatio;n.getScreenCoordinates(m, h, y, l), l.subDirect(f.dx, f.dy, 0), n.getWorldCoordinates(l.x, l.y, h, y, l.z, l), m.set(l);
        } else {
          if (l.set(c).scale(f.dy), d.set(u).scale(f.dx), a.cameraComponent && a.cameraComponent.camera) {
            var p = a.cameraComponent.camera;l.scale((p._frustumTop - p._frustumBottom) / t.viewportHeight), d.scale((p._frustumRight - p._frustumLeft) / t.viewportWidth);
          }l.add(d), l.applyPost(s.rotation), p.projectionMode === i.Perspective ? l.scale(20 * e.panSpeed) : l.scale(e.panSpeed), a.transformComponent.transform.translation.add(l), a.transformComponent.setUpdated(), t.dirty = !1;
        }r.emit("goo.cameraPositionChanged", { translation: s.translation.toArray(), lookAtPoint: m ? m.toArray() : null, id: a.id });
      }
    }function s(e, t) {
      for (var n in h) {
        t.domElement.removeEventListener(n, h[n]);
      }
    }var c, u, l, d, p, m, f, h;return { setup: n, update: a, cleanup: s };
  }return a.externals = { key: "PanCamControlScript", name: "PanCamera Control", description: "Enables camera to pan around a point in 3D space using the mouse", parameters: [{ key: "whenUsed", type: "boolean", name: "When Camera Used", description: "Script only runs when the camera to which it is added is being used.", "default": !0 }, { key: "panButton", name: "Pan button", description: "Only pan with this button", type: "string", control: "select", "default": "Any", options: ["Any", "Left", "Middle", "Right"] }, { key: "touchMode", description: "Number of fingers needed to trigger panning.", type: "string", control: "select", "default": "Double", options: ["Any", "Single", "Double"] }, { key: "panSpeed", type: "float", "default": 1, scale: .01 }] }, a;
}(goo.Vector3, goo.Scripts, goo.ScriptUtils, goo.Renderer, goo.SystemBus, goo.Camera), goo.OrbitNPanControlScript = function (e, t, n, o) {
  "use strict";

  function r() {
    function o(e, t, n) {
      e.touchMode = "Double", a.setup(e, t, n), s.setup(e, t, n);
    }function r(e, t, n) {
      s.update(e, t, n), a.update(e, t, n);
    }function i(e, t, n) {
      s.cleanup(e, t, n), a.cleanup(e, t, n);
    }var a = e.create(t),
        s = e.create(n);return { setup: o, cleanup: i, update: r };
  }for (var i = t.externals.parameters, a = n.externals.parameters, s = o.deepClone(i.concat(a.slice(1))), c = s.length - 1; c >= 0; c--) {
    var u = s[c];("panSpeed" === u.key || "touchMode" === u.key) && s.splice(c, 1);
  }for (var c = 0; c < s.length; c++) {
    var u = s[c];switch (u.key) {case "dragButton":
        u["default"] = "Left";break;case "panButton":
        u["default"] = "Right";break;case "panSpeed":
        u["default"] = 1;break;case "touchMode":
        u["default"] = "Double";}
  }return r.externals = { key: "OrbitNPanControlScript", name: "Orbit and Pan Control", description: "This is a combo of orbitcamcontrolscript and pancamcontrolscript", parameters: s }, r;
}(goo.Scripts, goo.OrbitCamControlScript, goo.PanCamScript, goo.ObjectUtils), goo.PickAndRotateScript = function () {
  "use strict";

  function e() {
    function e(e) {
      var t = e.button;return 0 === t && (e.altKey ? t = 2 : e.shiftKey && (t = 1)), t;
    }function t(t) {
      if (!l.disable) {
        var o = e(t.domEvent);o !== d.dragButton && -1 !== d.dragButton || !t.entity || (u = !1, t.entity.traverseUp(function (e) {
          return e === d.entity ? (u = !0, !1) : void 0;
        }), u && n(t));
      }
    }function n(e) {
      p.x = e.x, p.y = e.y, p.oldX = p.x, p.oldY = p.y, p.down = !0;
    }function o(e) {
      if (p.oldX = p.x, p.oldY = p.y, p.x = e.clientX || e.touches[0].clientX, p.y = e.clientY || e.touches[0].clientY, u && p.down) {
        var t = p.x - p.oldX,
            n = p.y - p.oldY;p.ax += t, p.ay += n, d.entity.transformComponent.transform.rotation.setIdentity(), d.entity.transformComponent.transform.rotation.rotateX(p.ay / 300 * l.yMultiplier), d.entity.transformComponent.transform.rotation.rotateY(p.ax / 200 * l.xMultiplier), d.entity.transformComponent.setUpdated();
      }
    }function r(e) {
      p.down = !1;
    }function i(e, n, i) {
      l = e, d = n, d.dragButton = ["Any", "Left", "Middle", "Right"].indexOf(l.dragButton) - 1, d.dragButton < -1 && (d.dragButton = -1), c = d.world.gooRunner, c.addEventListener("mousedown", t), c.addEventListener("touchstart", t), c.renderer.domElement.addEventListener("mousemove", o), c.renderer.domElement.addEventListener("touchmove", o), c.renderer.domElement.addEventListener("mouseup", r), c.renderer.domElement.addEventListener("touchend", r), p = { down: !1, x: 0, y: 0, oldX: 0, oldY: 0, ax: 0, ay: 0 };
    }function a(e, t, n) {}function s(e, n, i) {
      n.domElement.removeEventListener("mousemove", o), n.domElement.removeEventListener("touchmove", o), n.domElement.removeEventListener("mouseup", r), n.domElement.removeEventListener("touchend", r), c.removeEventListener("mousedown", t), c.removeEventListener("touchstart", t);
    }var c, u, l, d, p;return { setup: i, update: a, cleanup: s };
  }return e.externals = { key: "PickAndRotateScript", name: "Pick and Rotate", description: "Enables pick-drag-rotating entities", parameters: [{ key: "disable", description: "Prevent rotation. For preventing this script programmatically.", type: "boolean", "default": !1 }, { key: "dragButton", description: "Button to enable dragging", "default": "Any", options: ["Any", "Left", "Middle", "Right"], type: "string", control: "select" }, { key: "xMultiplier", description: "Horizontal rotation multiplier", "default": 1, type: "float", control: "slider", min: -4, max: 4 }, { key: "yMultiplier", description: "Vertical rotation multiplier", "default": 1, type: "float", control: "slider", min: -4, max: 4 }] }, e;
}(), goo.PolyBoundingScript = function () {
  "use strict";

  function e(e) {
    this.collidables = e || [];
  }return e.prototype.addCollidable = function (e) {
    this.collidables.push(e);
  }, e.prototype.removeAllAt = function (e, t, n) {
    this.collidables = this.collidables.filter(function (o) {
      return o.bottom <= n && o.top >= n ? !window.PolyK.ContainsPoint(o.poly, e, t) : void 0;
    });
  }, e.prototype.inside = function (e, t, n) {
    for (var o = 0; o < this.collidables.length; o++) {
      var r = this.collidables[o];if (r.bottom <= t && r.top >= t && window.PolyK.ContainsPoint(r.poly, e, n)) return window.PolyK.ClosestEdge(r.poly, e, n);
    }
  }, e.prototype.run = function (e) {
    for (var t = e.transformComponent, n = t.transform.translation, o = 0; o < this.collidables.length; o++) {
      var r = this.collidables[o];if (r.bottom <= n.y && r.top >= n.y && window.PolyK.ContainsPoint(r.poly, n.x, n.z)) {
        var i = window.PolyK.ClosestEdge(r.poly, n.x, n.z);return n.x = i.point.x, n.z = i.point.y, void t.setUpdated();
      }
    }
  }, e;
}(), goo.RotationScript = function () {
  "use strict";

  function e() {
    function e(e, t) {
      r = { x: 0, y: 0 }, i = { x: 0, y: 0 }, a = t.entity, document.addEventListener("mousemove", n);
    }function t(e) {
      i.x += (r.x - i.x) * e.fraction, i.y += (r.y - i.y) * e.fraction, a.setRotation(i.y / 200, i.x / 200, 0);
    }function n(e) {
      r.x = e.x, r.y = e.y;
    }function o() {
      document.removeEventListener("mousemove", n);
    }var r, i, a;return { setup: e, update: t, cleanup: o };
  }return e.externals = { key: "RotationScript", name: "Mouse Rotation", description: "", parameters: [{ key: "fraction", name: "Speed", "default": .01, type: "float", control: "slider", min: .01, max: 1 }] }, e;
}(), goo.ScriptComponentHandler = function (e, t, n, o, r, i, a, s) {
  "use strict";

  function c() {
    e.apply(this, arguments), this._type = "ScriptComponent";
  }return c.prototype = Object.create(e.prototype), c.prototype.constructor = c, e._registerClass("script", c), c.ENGINE_SCRIPT_PREFIX = "GOO_ENGINE_SCRIPTS/", c.prototype._prepare = function () {}, c.prototype._create = function () {
    return new t();
  }, c.prototype.update = function (t, r, i) {
    var a = this;return e.prototype.update.call(this, t, r, i).then(function (e) {
      return e ? n.all(o.map(r.scripts, function (e) {
        return a._updateScriptInstance(e, i);
      }, null, "sortValue")).then(function (t) {
        return e.scripts = t, e;
      }) : void 0;
    });
  }, c.prototype._updateScriptInstance = function (e, t) {
    var n = this;return this._createOrLoadScript(e).then(function (r) {
      var i = e.options || {};r.parameters && o.defaults(i, r.parameters), r.externals && r.externals.parameters && s.fillDefaultValues(i, r.externals.parameters);var a = Object.create(r);return a.parameters = {}, a.enabled = !1, n._setParameters(a.parameters, i, r.externals, t).then(o.constant(a));
    });
  }, c.prototype._createOrLoadScript = function (e) {
    var t = e.scriptRef,
        n = c.ENGINE_SCRIPT_PREFIX,
        o = 0 === t.indexOf(n);return o ? this._createEngineScript(t.slice(n.length)) : this._load(t, { reload: !0 });
  }, c.prototype._createEngineScript = function (e) {
    var t = a.create(e);if (!t) throw new Error("Unrecognized script name");return t.id = c.ENGINE_SCRIPT_PREFIX + e, t.enabled = !1, i.emit("goo.scriptExternals", { id: t.id, externals: t.externals }), r.resolve(t);
  }, c.prototype._setParameters = function (e, t, o, i) {
    var a = this;if (!o || !o.parameters) return r.resolve();var s = o.parameters.map(function (n) {
      return a._setParameter(e, t[n.key], n, i);
    });return e.enabled = t.enabled !== !1, n.all(s);
  }, c.prototype._setParameter = function (e, t, n, i) {
    function a(t) {
      return e[d] = t, r.resolve();
    }function c() {
      return void 0 === n["default"] ? o.deepClone(s.DEFAULTS_BY_TYPE[p]) : o.deepClone(n["default"]);
    }function u() {
      if (!t || t.enabled === !1) return a(null);var e = t[p + "Ref"] || t;return l._load(e, i).then(a);
    }var l = this,
        d = n.key,
        p = n.type;return s.TYPE_VALIDATORS[p](t) ? "entity" === p ? (u(), Promise.resolve()) : s.isRefType(p) ? u() : a(o.clone(t)) : a(c());
  }, c;
}(goo.ComponentHandler, goo.ScriptComponent, goo.rsvp, goo.ObjectUtils, goo.PromiseUtils, goo.SystemBus, goo.Scripts, goo.ScriptUtils), goo.ScriptHandler = function (e, t, n, o, r, i, a, s, c, u, l, d, p) {
  "use strict";

  function m() {
    e.apply(this, arguments), this._scriptElementsByURL = new Map(), this._bodyCache = {}, this._dependencyPromises = {}, this._currentScriptLoading = null, this._addGlobalErrorListener();
  }function f(e, t) {
    if (!e.scriptRefs) return void (e.scriptRefs = [t]);var n = e.scriptRefs.indexOf(t);-1 === n && e.scriptRefs.push(t);
  }function h(e, t) {
    e.scriptRefs && u.remove(e.scriptRefs, t);
  }function y(e) {
    return e.scriptRefs && e.scriptRefs.length > 0;
  }function g(e, t) {
    return e.scriptRefs && e.scriptRefs.indexOf(t) > -1;
  }function v(e) {
    for (var t = [], n = document.querySelectorAll("script"), o = 0; o < n.length; ++o) {
      var r = n[o];g(r, e) && t.push(r);
    }return t;
  }function S(e) {
    return Boolean(e.className);
  }function w(e) {
    return !S(e) && void 0 !== e.body;
  }function x() {
    for (var e = document.querySelectorAll("script"), t = 0; t < e.length; ++t) {
      var n = e[t];n.isDependency && !y(n) && n.parentNode && n.parentNode.removeChild(n);
    }
  }function b(e, t, n) {
    return s.createPromise(function (o, r) {
      function i(r) {
        var i = { message: r, file: n };k(e, i), t.parentNode && t.parentNode.removeChild(t), o();
      }var a,
          s = !1;t.onload = function () {
        o(), a && clearTimeout(a);
      }, t.onerror = function (e) {
        s = !0, a && clearTimeout(a), console.error(e), i("Could not load dependency " + n);
      }, s || (s = !0, a = setTimeout(function () {
        i("Loading dependency " + n + " failed (time out)");
      }, E));
    });
  }function k(e, t) {
    if (t.file) {
      var n = t.message;t.line && (n += " - on line " + t.line), e.dependencyErrors = e.dependencyErrors || {}, e.dependencyErrors[t.file] = t;
    } else {
      e.errors = e.errors || [];var n = t.message;t.line && (n += " - on line " + t.line), e.errors.push(t), e.setup = null, e.update = null, e.run = null, e.cleanup = null, e.enter = null, e.exit = null, e.parameters = {}, e.enabled = !1;
    }
  }var E = 6e3;m.prototype = Object.create(e.prototype), m.prototype.constructor = m, e._registerClass("script", m), m.prototype._create = function () {
    return { externals: {}, setup: null, update: null, run: null, cleanup: null, parameters: {}, name: null };
  }, m.prototype._remove = function (e) {
    var t = this._objects.get(e);if (t && t.cleanup && t.context) try {
      t.cleanup(t.parameters, t.context, window.goo);
    } catch (n) {}this._objects["delete"](e), delete this._bodyCache[e];
  };var C = 1;m.prototype._updateFromCustom = function (e, t) {
    if (this._bodyCache[t.id] === t.body) return e;delete e.errors, this._bodyCache[t.id] = t.body;var n = document.getElementById(m.DOM_ID_PREFIX + t.id);n && n.parentNode.removeChild(n), window._gooScriptFactories || (window._gooScriptFactories = {});var o = ["//# sourceURL=goo://goo-custom-scripts/" + encodeURIComponent(t.name.replace(" ", "_")) + ".js?v=" + C++, "", "// " + t.name, "", "// <![CDATA[", "window._gooScriptFactories['" + t.id + "'] = function () {", t.body, " var obj = {", "  externals: {}", " };", ' if (typeof parameters !== "undefined") {', "  obj.externals.parameters = parameters;", " }", ' if (typeof setup !== "undefined") {', "  obj.setup = setup;", " }", ' if (typeof cleanup !== "undefined") {', "  obj.cleanup = cleanup;", " }", ' if (typeof update !== "undefined") {', "  obj.update = update;", " }", ' if (typeof enter !== "undefined") {', "  obj.enter = enter;", " }", ' if (typeof exit !== "undefined") {', "  obj.exit = exit;", " }", " return obj;", "};", "// ]]>"].join("\n"),
        r = document.createElement("script");r.id = m.DOM_ID_PREFIX + t.id, r.innerHTML = o, r.async = !1, this._currentScriptLoading = t.id;var i = this.world.gooRunner.renderer.domElement.parentElement || document.body;i.appendChild(r);var a = window._gooScriptFactories[t.id];if (a) {
      try {
        var s = a();e.id = t.id, m.validateParameters(s, e), e.setup = s.setup, e.update = s.update, e.cleanup = s.cleanup, e.enter = s.enter, e.exit = s.exit, e.parameters = {}, e.enabled = !1;
      } catch (c) {
        var u = { message: c.toString() };if (c instanceof Error) {
          var l = c.stack.split("\n")[1].match(/(\d+):\d+\)$/);l && (u.line = parseInt(l[1], 10) - 1);
        }k(e, u);
      }this._currentScriptLoading = null;
    }return e.externals && d.fillDefaultNames(e.externals.parameters), e;
  }, m.prototype._updateFromClass = function (e, t) {
    if (!e.externals || e.externals.name !== t.className) {
      var n = p.create(t.className);if (!n) throw new Error("Unrecognized script name");e.id = t.id, e.externals = n.externals, e.setup = n.setup, e.update = n.update, e.run = n.run, e.cleanup = n.cleanup, e.enter = n.enter, e.exit = n.exit, e.parameters = n.parameters || {}, e.enabled = !1, d.fillDefaultNames(e.externals.parameters);
    }return e;
  }, m.prototype._addDependency = function (e, t, n) {
    var o = this,
        r = document.querySelector('script[src="' + t + '"]');if (r) return f(r, n), this._dependencyPromises[t] || s.resolve();r = document.createElement("script"), r.src = t, r.setAttribute("data-script-id", n), r.isDependency = !0, r.async = !1, this._scriptElementsByURL.set(t, r), f(r, n);var i = b(e, r, t).then(function () {
      delete o._dependencyPromises[t];
    });return this._dependencyPromises[t] = i, i;
  }, m.prototype._update = function (n, o, r) {
    var i = this;return e.prototype._update.call(this, n, o, r).then(function (e) {
      if (e) {
        var a = [];if (w(o) && o.dependencies) {
          delete e.dependencyErrors;var s = v(o.id);c.forEach(o.dependencies, function (t) {
            var n = t.url,
                r = u.find(s, function (e) {
              return e.src === n;
            });r && u.remove(s, r), a.push(i._addDependency(e, n, o.id));
          }, null, "sortValue"), c.forEach(s, function (e) {
            h(e, o.id);
          });
        }var d = i.world.gooRunner.renderer.domElement.parentElement || document.body;return c.forEach(o.dependencies, function (e) {
          var t = i._scriptElementsByURL.get(e.url);t && d.appendChild(t);
        }, null, "sortValue"), t.all(a).then(function () {
          return S(o) ? i._updateFromClass(e, o, r) : w(o) && i._updateFromCustom(e, o, r), o.body && l.emit("goo.scriptExternals", { id: o.id, externals: e.externals }), e.name = o.name, e.errors || e.dependencyErrors ? (l.emit("goo.scriptError", { id: n, errors: e.errors, dependencyErrors: e.dependencyErrors }), e) : (l.emit("goo.scriptError", { id: n, errors: null }), c.extend(e.parameters, o.options), x(), e);
        });
      }
    });
  }, m.prototype._addGlobalErrorListener = function () {
    var e = this;window.addEventListener("error", function (t) {
      if (t.filename) {
        var n = document.querySelector('script[src="' + t.filename + '"]');if (n) {
          var o = n.getAttribute("data-script-id"),
              r = e._objects.get(o);if (r) {
            var i = { message: t.message, line: t.lineno, file: t.filename };k(r, i);
          }n.parentNode.removeChild(n);
        }
      }if (e._currentScriptLoading) {
        var a = document.getElementById(m.DOM_ID_PREFIX + e._currentScriptLoading);a && a.parentNode.removeChild(a), delete window._gooScriptFactories[e._currentScriptLoading];var r = e._objects.get(e._currentScriptLoading),
            i = { message: t.message, line: t.lineno - 1 };k(r, i), e._currentScriptLoading = null;
      }
    });
  };var R = ["string", "int", "float", "vec2", "vec3", "vec4", "boolean", "texture", "sound", "camera", "entity", "animation"],
      L = function () {
    var e = { string: ["key"], "int": ["spinner", "slider", "jointSelector"], "float": ["spinner", "slider"], vec2: [], vec3: ["color"], vec4: ["color"], "boolean": ["checkbox"], texture: [], image: [], sound: [], camera: [], entity: [], animation: [] };for (var t in e) {
      Array.prototype.push.apply(e[t], ["dropdown", "select"]);
    }return e;
  }(),
      A = { string: function string(e, t) {
      return "string" != typeof t || 0 === t.length ? { message: 'Property "' + e + '" must be a non-empty string' } : void 0;
    }, number: function number(e, t) {
      return "number" != typeof t ? { message: 'Property "' + e + '" must be a number' } : void 0;
    }, "boolean": function boolean(e, t) {
      return "boolean" != typeof t ? { message: 'Property "' + e + '" must be a boolean' } : void 0;
    }, array: function array(e, t) {
      return t instanceof Array ? void 0 : { message: 'Property "' + e + '" must be an array' };
    } },
      M = [{ name: "key", validator: A.string }, { name: "name", validator: A.string }, { name: "control", validator: A.string }, { name: "min", validator: A.number }, { name: "max", validator: A.number }, { name: "scale", validator: A.number }, { name: "decimals", validator: A.number }, { name: "precision", validator: A.number }, { name: "exponential", validator: A["boolean"] }];return m.validateParameter = function (e) {
    if ("string" != typeof e.key || 0 === e.key.length) return { message: 'Property "key" must be a non-empty string' };for (var t = 0; t < M.length; t++) {
      var n = M[t];if ("undefined" != typeof e[n.name]) {
        var o = n.validator(n.name, e[n.name]);if (o) return o;
      }
    }if (-1 === R.indexOf(e.type)) return { message: 'Property "type" must be one of: ' + R.join(", ") };var r = L[e.type];return void 0 !== e.control && -1 === r.indexOf(e.control) ? { message: 'Property "control" must be one of: ' + r.join(", ") } : void 0;
  }, m.validateParameters = function (e, t) {
    var n = e.errors || [];if ("object" != _typeof(e.externals)) return void (t.externals = {});var o = e.externals;if (!o.parameters || o.parameters instanceof Array || n.push("externals.parameters must be an array"), n.length) return void (t.errors = n);if (o.parameters) {
      t.externals.parameters = [];for (var r = {}, i = 0; i < o.parameters.length; i++) {
        var a = o.parameters[i],
            s = m.validateParameter(a);s && n.push(s), (null === a["default"] || void 0 === a["default"]) && (a["default"] = d.DEFAULTS_BY_TYPE[a.type]), a.key && r[a.key] && n.push({ message: 'Duplicate parameter key: "' + a.key + '"' }), r[a.key] = !0, t.externals.parameters.push(a);
      }n.length && (t.errors = n);
    }
  }, m.DOM_ID_PREFIX = "_script_", m;
}(goo.ConfigHandler, goo.rsvp, goo.OrbitCamControlScript, goo.OrbitNPanControlScript, goo.FlyControlScript, goo.WasdControlScript, goo.BasicControlScript, goo.PromiseUtils, goo.ObjectUtils, goo.ArrayUtils, goo.SystemBus, goo.ScriptUtils, goo.Scripts), goo.ScriptRegister = function (e) {
  "use strict";

  for (var t = 1; t < arguments.length; t++) {
    e.register(arguments[t]);
  }
}(goo.Scripts, goo.OrbitCamControlScript, goo.OrbitNPanControlScript, goo.FlyControlScript, goo.AxisAlignedCamControlScript, goo.PanCamScript, goo.MouseLookControlScript, goo.WasdControlScript, goo.ButtonScript, goo.PickAndRotateScript, goo.LensFlareScript), goo.ScriptHandlers = function () {}(goo.ScriptHandler, goo.ScriptComponentHandler), goo.SparseHeightMapBoundingScript = function () {
  "use strict";

  function e(e) {
    this.elevationData = e;
  }return e.prototype.getClosest = function (e, t) {
    for (var n = Number.MAX_VALUE, o = -1, r = 0; r < this.elevationData.length; r += 3) {
      var i = Math.pow(this.elevationData[r + 0] - e, 2) + Math.pow(this.elevationData[r + 2] - t, 2);n > i && (n = i, o = r);
    }return this.elevationData[o + 1];
  }, e.prototype.run = function (e) {
    var t = e.transformComponent.transform.translation,
        n = this.getClosest(t.x, t.z),
        o = t.y - n;t.y -= .1 * o;
  }, e;
}(), goo.WorldFittedTerrainScript = function (e, t) {
  "use strict";

  function n(e, t) {
    if (e.minX > e.maxX) throw new Error({ name: "Terrain Exception", message: "minX is larger than maxX" });if (e.minY > e.maxY) throw new Error({ name: "Terrain Exception", message: "minY is larger than maxY" });if (e.minZ > e.maxZ) throw new Error({ name: "Terrain Exception", message: "minZ is larger than maxZ" });if (!t) throw new Error({ name: "Terrain Exception", message: "No heightmap data specified" });if (t.length !== t[0].length) throw new Error({ name: "Terrain Exception", message: "Heightmap data is not a square" });return !0;
  }function o(t, o, r) {
    o = o || s, n(o, t, r);var i = { dimensions: o, sideQuadCount: t.length - 1, script: new e(t) };return i;
  }function r() {
    this.heightMapData = [], this.yMargin = 1;
  }var i = new t(),
      a = new t(),
      s = { minX: 0, maxX: 100, minY: 0, maxY: 50, minZ: 0, maxZ: 100 };return r.prototype.addHeightData = function (e, t) {
    var n = o(e, t, this.heightMapData);return this.heightMapData.push(n), n;
  }, r.prototype.getHeightDataForPosition = function (e) {
    for (var t = 0; t < this.heightMapData.length; t++) {
      var n = this.heightMapData[t].dimensions;if (e.x <= n.maxX && e.x >= n.minX && e.y < n.maxY + this.yMargin && e.y > n.minY - this.yMargin && e.z <= n.maxZ && e.z >= n.minZ) return this.heightMapData[t];
    }return null;
  }, r.prototype.displaceAxisDimensions = function (e, t, n, o) {
    var r = e - t;return o * r / (n - t);
  }, r.prototype.returnToWorldDimensions = function (e, t, n, o) {
    var r = (n - t) / o,
        i = e * r;return t + i;
  }, r.prototype.getTerrainHeightAt = function (e) {
    var t = this.getHeightDataForPosition(e);if (null === t) return null;var n = t.dimensions,
        o = this.displaceAxisDimensions(e.x, n.minX, n.maxX, t.sideQuadCount),
        r = this.displaceAxisDimensions(e.z, n.minZ, n.maxZ, t.sideQuadCount),
        i = t.script.getPreciseHeight(o, r);return i * (n.maxY - n.minY) + n.minY;
  }, r.prototype.getTerrainNormalAt = function (e) {
    var t = this.getHeightDataForPosition(e);if (!t) return null;for (var n = t.dimensions, o = this.displaceAxisDimensions(e.x, n.minX, n.maxX, t.sideQuadCount), r = this.displaceAxisDimensions(e.z, n.minZ, n.maxZ, t.sideQuadCount), s = t.script.getTriangleAt(o, r), c = 0; c < s.length; c++) {
      s[c].x = this.returnToWorldDimensions(s[c].x, n.minX, n.maxX, t.sideQuadCount), s[c].z = this.returnToWorldDimensions(s[c].z, n.minY, n.maxY, 1), s[c].y = this.returnToWorldDimensions(s[c].y, n.minZ, n.maxZ, t.sideQuadCount);
    }return i.setDirect(s[1].x - s[0].x, s[1].z - s[0].z, s[1].y - s[0].y), a.setDirect(s[2].x - s[0].x, s[2].z - s[0].z, s[2].y - s[0].y), i.cross(a), i.y < 0 && i.scale(-1), i.normalize(), i;
  }, r;
}(goo.HeightMapBoundingScript, goo.Vector3), "function" == typeof require && (define("goo/scriptpack/AxisAlignedCamControlScript", [], function () {
  return goo.AxisAlignedCamControlScript;
}), define("goo/scriptpack/BasicControlScript", [], function () {
  return goo.BasicControlScript;
}), define("goo/scriptpack/ButtonScript", [], function () {
  return goo.ButtonScript;
}), define("goo/scriptpack/CannonPickScript", [], function () {
  return goo.CannonPickScript;
}), define("goo/scriptpack/WasdControlScript", [], function () {
  return goo.WasdControlScript;
}), define("goo/scriptpack/MouseLookControlScript", [], function () {
  return goo.MouseLookControlScript;
}), define("goo/scriptpack/FlyControlScript", [], function () {
  return goo.FlyControlScript;
}), define("goo/scriptpack/GroundBoundMovementScript", [], function () {
  return goo.GroundBoundMovementScript;
}), define("goo/scriptpack/HeightMapBoundingScript", [], function () {
  return goo.HeightMapBoundingScript;
}), define("goo/scriptpack/LensFlareScript", [], function () {
  return goo.LensFlareScript;
}), define("goo/scriptpack/PanCamScript", [], function () {
  return goo.PanCamScript;
}), define("goo/scriptpack/OrbitNPanControlScript", [], function () {
  return goo.OrbitNPanControlScript;
}), define("goo/scriptpack/PickAndRotateScript", [], function () {
  return goo.PickAndRotateScript;
}), define("goo/scriptpack/PolyBoundingScript", [], function () {
  return goo.PolyBoundingScript;
}), define("goo/scriptpack/RotationScript", [], function () {
  return goo.RotationScript;
}), define("goo/scriptpack/ScriptComponentHandler", [], function () {
  return goo.ScriptComponentHandler;
}), define("goo/scriptpack/ScriptHandler", [], function () {
  return goo.ScriptHandler;
}), define("goo/scriptpack/ScriptRegister", [], function () {
  return goo.ScriptRegister;
}), define("goo/scriptpack/ScriptHandlers", [], function () {
  return goo.ScriptHandlers;
}), define("goo/scriptpack/SparseHeightMapBoundingScript", [], function () {
  return goo.SparseHeightMapBoundingScript;
}), define("goo/scriptpack/WorldFittedTerrainScript", [], function () {
  return goo.WorldFittedTerrainScript;
}));

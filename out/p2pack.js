"use strict";

goo.P2System = function (o) {
  "use strict";

  function t(t) {
    o.call(this, "P2System", ["P2Component", "TransformComponent"]), t = t || {}, this.world = new n.World({ gravity: t.gravity || [0, -9.82] }), this.stepFrequency = t.stepFrequency || 60;
  }function e(o, t) {
    var e = t.body.position,
        n = t.scale;o.transform.translation.setDirect(e[0] * n, e[1] * n, 0), o.transform.rotation.fromAngles(t.offsetAngleX, t.offsetAngleY, t.offsetAngleZ + t.body.angle), o.setUpdated();
  }var n = window.p2;return t.prototype = Object.create(o.prototype), t.prototype.constructor = t, t.prototype.inserted = function (o) {
    for (var t = o.p2Component, r = o.transformComponent, s = new n.Body({ mass: t.mass, damping: t.damping, angularDamping: t.angularDamping }), s = t.body = new n.Body({ mass: t.mass, position: [r.transform.translation.x, r.transform.translation.y] }), a = 0; a < t.shapes.length; a++) {
      var p,
          i = t.shapes[a];switch (i.type) {case "box":
          p = new n.Rectangle(i.width, i.height);break;case "circle":
          p = new n.Circle(i.radius);break;case "plane":
          p = new n.Plane();break;default:
          throw new Error("p2 shape '" + i.type + "' not recognized");}s.addShape(p, i.offset, i.angle);
    }t.body = s, e(r, t), this.world.addBody(s);
  }, t.prototype.deleted = function (o) {
    var t = o.p2Component;t && this.world.removeBody(t.body);
  }, t.prototype.process = function (o) {
    this.world.step(1 / this.stepFrequency);for (var t = 0; t < o.length; t++) {
      var n = o[t],
          r = n.p2Component;e(n.transformComponent, r);
    }
  }, t;
}(goo.System), goo.P2Component = function (o, t) {
  "use strict";

  function e(e) {
    o.apply(this, arguments), this.type = "P2Component", t.copyOptions(this, e, { mass: 0, linearDamping: 0, angularDamping: 0, shapes: [], scale: 1, offsetX: 0, offsetY: 0, offsetZ: 0, offsetAngleX: 0, offsetAngleY: 0, offsetAngleZ: 0 });
  }return e.prototype = Object.create(o.prototype), e.prototype.constructor = e, e;
}(goo.Component, goo.ObjectUtil), "function" == typeof require && (define("goo/addons/p2pack/P2System", [], function () {
  return goo.P2System;
}), define("goo/addons/p2pack/P2Component", [], function () {
  return goo.P2Component;
}));

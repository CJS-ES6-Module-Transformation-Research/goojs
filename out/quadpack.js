"use strict";

goo.DoubleQuad = function (t) {
  "use strict";

  function e(e, o, i, n) {
    if (1 === arguments.length && arguments[0] instanceof Object) {
      var r = arguments[0];e = r.width, o = r.height, i = r.tileX, n = r.tileY;
    }this.xExtent = void 0 !== e ? .5 * e : .5, this.yExtent = void 0 !== o ? .5 * o : .5, this.tileX = i || 1, this.tileY = n || 1;var s = t.defaultMap([t.POSITION, t.NORMAL, t.TEXCOORD0]);t.call(this, s, 8, 12), this.rebuild();
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.prototype.rebuild = function () {
    var e = this.xExtent,
        o = this.yExtent,
        i = this.tileX,
        n = this.tileY;return this.getAttributeBuffer(t.POSITION).set([-e, -o, 0, -e, o, 0, e, o, 0, e, -o, 0, -e, -o, 0, -e, o, 0, e, o, 0, e, -o, 0]), this.getAttributeBuffer(t.NORMAL).set([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1]), this.getAttributeBuffer(t.TEXCOORD0).set([0, 0, 0, n, i, n, i, 0, 0, 0, 0, n, i, n, i, 0]), this.getIndexBuffer().set([0, 3, 1, 1, 3, 2, 7, 4, 5, 7, 5, 6]), this;
  }, e;
}(goo.MeshData), goo.QuadComponent = function (t, e, o, i, n, r, s, a) {
  "use strict";

  function h(h, p) {
    t.apply(this, arguments), p = p || {};var d = { width: 1, height: 1, tileX: 1, tileY: 1, preserveAspectRatio: !0 };s.defaults(p, d), this.type = "QuadComponent", this.width = p.width, this.oldWidth = 0, this.height = p.height, this.oldHeight = 0, this.tileX = p.tileX, this.oldTileX = 0, this.tileY = p.tileY, this.oldTileY = 0, this.preserveAspectRatio = p.preserveAspectRatio, this.meshRendererComponent = new i(), this.material = new r(n.uber, "QuadComponent default material"), this.meshData = new e(p.width, p.height, p.tileX, p.tileY), this.meshDataComponent = new o(this.meshData);var u = this.material;if (u.blendState.blending = "TransparencyBlending", u.renderQueue = 2e3, u.uniforms.discardThreshold = .1, this.setMaterial(u), h) {
      var l = new a(h);l.anisotropy = 16, l.wrapS = "EdgeClamp", l.wrapT = "EdgeClamp", u.setTexture("DIFFUSE_MAP", l);
    }this.rebuildMeshData();
  }return h.prototype = Object.create(t.prototype), h.prototype.constructor = h, h.prototype.attached = function (t) {
    t.setComponent(t.quadComponent.meshRendererComponent), t.setComponent(t.quadComponent.meshDataComponent);
  }, h.prototype.detached = function (t) {
    t.clearComponent("meshRendererComponent"), t.clearComponent("meshDataComponent");
  }, h.prototype.destroy = function (t) {
    this.meshData.destroy(t);
  }, h.prototype.setMaterial = function (t) {
    this.material = t, this.meshRendererComponent.materials = [t];
  }, h.prototype.rebuildMeshData = function () {
    var t = this.material,
        e = t.getTexture("DIFFUSE_MAP");if (e) {
      var o = e.image;if (o) {
        if (this.preserveAspectRatio && o) {
          var i = o.originalWidth || o.svgWidth || o.width,
              n = o.originalHeight || o.svgHeight || o.height;this.width = i / 100, this.height = n / 100;
        }if (this.width !== this.oldWidth || this.height !== this.oldHeight || this.tileX !== this.oldTileX || this.tileY !== this.oldTileY) {
          this.oldWidth = this.width, this.oldHeight = this.height, this.oldTileX = this.tileX, this.oldTileY = this.tileY;var r = this.meshData;r.xExtent = .5 * this.width, r.yExtent = .5 * this.height, r.tileX = this.tileX, r.tileY = this.tileY, r.rebuild(), r.setVertexDataUpdated();
        }
      }
    }
  }, h;
}(goo.Component, goo.DoubleQuad, goo.MeshDataComponent, goo.MeshRendererComponent, goo.ShaderLib, goo.Material, goo.ObjectUtils, goo.Texture), goo.QuadComponentHandler = function (t, e, o, i, n) {
  "use strict";

  function r() {
    t.apply(this, arguments), this._type = "QuadComponent";
  }return r.prototype = Object.create(t.prototype), r.prototype.constructor = r, t._registerClass("quad", r), r.prototype._create = function () {
    return new n();
  }, r.prototype._remove = function (t) {
    this.world && this.world.gooRunner && t.quadComponent.destroy(this.world.gooRunner.renderer.context), t.clearComponent("quadComponent");
  }, r.prototype.update = function (e, o, i) {
    var n = this;return t.prototype.update.call(this, e, o, i).then(function (t) {
      return t ? n._load(o.materialRef, i).then(function (o) {
        return o.cullState.enabled = !0, e.meshRendererComponent !== t.meshRendererComponent && e.setComponent(t.meshRendererComponent), e.meshDataComponent !== t.meshDataComponent && e.setComponent(t.meshDataComponent), t.setMaterial(o), t.rebuildMeshData(), t.meshDataComponent.autoCompute = !0, t;
      }) : void 0;
    });
  }, r;
}(goo.ComponentHandler, goo.rsvp, goo.PromiseUtils, goo.ObjectUtils, goo.QuadComponent), "function" == typeof require && (define("goo/quadpack/DoubleQuad", [], function () {
  return goo.DoubleQuad;
}), define("goo/quadpack/QuadComponent", [], function () {
  return goo.QuadComponent;
}), define("goo/quadpack/QuadComponentHandler", [], function () {
  return goo.QuadComponentHandler;
}));

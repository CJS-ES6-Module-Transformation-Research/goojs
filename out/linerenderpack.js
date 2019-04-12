"use strict";

goo.LineRenderer = function (e, t, r, n, i) {
  "use strict";

  function o(r) {
    this.world = r, this._material = new e(o.COLORED_LINE_SHADER), this._meshData = new t(o.ATTRIBUTE_MAP, 2 * o.MAX_NUM_LINES), this._meshData.indexModes = ["Lines"], this._positions = this._meshData.getAttributeBuffer("POSITION"), this._colors = this._meshData.getAttributeBuffer("RGB_COLOR"), this._renderObject = { meshData: this._meshData, transform: new i(), materials: [this._material] }, this._rendering = !1, this._numRenderingLines = 0, this._meshData.vertexCount = 0, this._meshData.vertexData.setDataUsage("DynamicDraw");
  }return o.ATTRIBUTE_MAP = { POSITION: t.createAttribute(3, "Float"), RGB_COLOR: t.createAttribute(3, "Float") }, o.COLORED_LINE_SHADER = { attributes: { vertexPosition: "POSITION", vertexColor: "RGB_COLOR" }, uniforms: { viewProjectionMatrix: n.VIEW_PROJECTION_MATRIX }, vshader: ["attribute vec3 vertexPosition;", "attribute vec3 vertexColor;", "uniform mat4 viewProjectionMatrix;", "varying vec3 color;", "void main(void) {", "gl_Position = viewProjectionMatrix * vec4(vertexPosition, 1.0);", "color = vertexColor;", "}"].join("\n"), fshader: ["varying vec3 color;", "void main(void)", "{", "gl_FragColor = vec4(color, 1.0);", "}"].join("\n") }, o.MAX_NUM_LINES = 65536, o.prototype._updateVertexData = function () {
    (0 !== this._numRenderingLines || 0 !== this._meshData.vertexCount) && (this._meshData.vertexCount = 2 * Math.min(this._numRenderingLines, o.MAX_NUM_LINES), this._meshData.setAttributeDataUpdated("POSITION"), this._meshData.setAttributeDataUpdated("RGB_COLOR"));
  }, o.prototype._clear = function () {
    this._numRenderingLines = 0;
  }, o.prototype._manageRenderList = function (e) {
    this._rendering || 0 === this._numRenderingLines ? this._rendering && 0 === this._numRenderingLines && (e.splice(e.indexOf(this._renderObject), 1), this._rendering = !1) : (e.push(this._renderObject), this._rendering = !0);
  }, o.prototype._remove = function () {
    this._meshData.destroy(this.world.gooRunner.renderer.context);
  }, o.prototype._addLine = function (e, t, r) {
    if (this._numRenderingLines >= o.MAX_NUM_LINES) return void console.warn("MAX_NUM_LINES has been exceeded in the LineRenderer.");for (var n = 6 * this._numRenderingLines, i = 0; 3 > i; i++) {
      var s = n + i,
          a = n + 3 + i;this._positions[s] = e.getComponent(i), this._positions[a] = t.getComponent(i), this._colors[s] = r.getComponent(i), this._colors[a] = r.getComponent(i);
    }this._numRenderingLines++;
  }, o;
}(goo.Material, goo.MeshData, goo.ShaderLib, goo.Shader, goo.Transform), goo.LineRenderSystem = function (e, t, r, n) {
  "use strict";

  function i(n) {
    e.call(this, "LineRenderSystem", []), this._lineRenderers = [], this.world = n, this._lineRenderers.push(new r(this.world)), this.camera = null, this.renderList = [], t.addListener("goo.setCurrentCamera", function (e) {
      this.camera = e.camera;
    }.bind(this));
  }i.prototype = Object.create(e.prototype), i.prototype.constructor = i;var o = new n(),
      s = new n(),
      a = new n();return i.axis = ["x", "y", "z"], i.prototype.WHITE = new n(1, 1, 1), i.prototype.RED = new n(1, 0, 0), i.prototype.GREEN = new n(0, 1, 0), i.prototype.BLUE = new n(0, 0, 1), i.prototype.AQUA = new n(0, 1, 1), i.prototype.MAGENTA = new n(1, 0, 1), i.prototype.YELLOW = new n(1, 1, 0), i.prototype.BLACK = new n(0, 0, 0), i.prototype.drawLine = function (e, t, r) {
    var n = this._lineRenderers[0];n._addLine(e, t, r);
  }, i.prototype._drawAxisLine = function (e, t, r, n, o, d, h, _) {
    var c = i.axis[r],
        p = i.axis[n],
        u = s.set(e);u[c] += t[c] * o;var m = a.set(u);m[p] += t[p] * d, void 0 !== _ && (u.applyPostPoint(_), m.applyPostPoint(_)), this.drawLine(u, m, h);
  }, i.prototype.drawAABox = function (e, t, r, n) {
    for (var i = o.set(t).sub(e), s = 0; 3 > s; s++) {
      for (var a = 0; 3 > a; a++) {
        a !== s && this._drawAxisLine(e, i, s, a, 1, 1, r, n);
      }this._drawAxisLine(t, i, s, s, -1, 1, r, n), this._drawAxisLine(e, i, s, s, 1, -1, r, n);
    }
  }, i.prototype.drawCross = function (e, t, r) {
    r = r || .05;var n = o.set(e).addDirect(-r, 0, -r),
        i = s.set(e).addDirect(r, 0, r);this.drawLine(n, i, t), n = o.set(e).addDirect(r, 0, -r), i = s.set(e).addDirect(-r, 0, r), this.drawLine(n, i, t), n = o.set(e).addDirect(0, -r, 0), i = s.set(e).addDirect(0, r, 0), this.drawLine(n, i, t);
  }, i.prototype.render = function (e) {
    for (var t = 0; t < this._lineRenderers.length; t++) {
      var r = this._lineRenderers[t];r._updateVertexData(), r._manageRenderList(this.renderList), r._clear();
    }e.checkResize(this.camera), this.camera && e.render(this.renderList, this.camera, null, null, !1);
  }, i.prototype.clear = function () {
    for (var e = 0; e < this._lineRenderers.length; e++) {
      var t = this._lineRenderers[e];t._remove();
    }delete this._lineRenderers, this.world.gooRunner.renderer.clearShaderCache();
  }, i;
}(goo.System, goo.SystemBus, goo.LineRenderer, goo.Vector3), "function" == typeof require && (define("goo/addons/linerenderpack/LineRenderer", [], function () {
  return goo.LineRenderer;
}), define("goo/addons/linerenderpack/LineRenderSystem", [], function () {
  return goo.LineRenderSystem;
}));

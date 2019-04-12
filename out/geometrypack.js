"use strict";

goo.FilledPolygon = function (t, e) {
  "use strict";

  function r(e, r) {
    this.verts = e, this.indices = r ? r : n(e);var i = t.defaultMap([t.POSITION, t.NORMAL, t.TEXCOORD0]);t.call(this, i, this.verts.length / 3, this.indices.length), this.rebuild();
  }function n(t) {
    var e = t.length / 3;if (3 > e) return [];for (var r = [], n = [], s = 0; e > s; s++) {
      n.push(s);
    }for (var s = 0, a = e; a > 3;) {
      var h = n[(s + 0) % a],
          u = n[(s + 1) % a],
          c = n[(s + 2) % a],
          l = t[3 * h],
          f = t[3 * h + 1],
          v = t[3 * u],
          p = t[3 * u + 1],
          g = t[3 * c],
          d = t[3 * c + 1],
          m = !1;if (o(l, f, v, p, g, d)) {
        m = !0;for (var y = 0; a > y; y++) {
          var x = n[y];if (x !== h && x !== u && x !== c && i(t[3 * x], t[3 * x + 1], l, f, v, p, g, d)) {
            m = !1;break;
          }
        }
      }if (m) r.push(h, u, c), n.splice((s + 1) % a, 1), a--, s = 0;else if (s++ > 3 * a) break;
    }return r.push(n[0], n[1], n[2]), r;
  }function i(t, e, r, n, i, o, s, a) {
    var h = s - r,
        u = a - n,
        c = i - r,
        l = o - n,
        f = t - r,
        v = e - n,
        p = h * h + u * u,
        g = h * c + u * l,
        d = h * f + u * v,
        m = c * c + l * l,
        y = c * f + l * v,
        x = 1 / (p * m - g * g),
        P = (m * d - g * y) * x,
        b = (p * y - g * d) * x;return P >= 0 && b >= 0 && 1 > P + b;
  }function o(t, e, r, n, i, o) {
    return (e - n) * (i - r) + (r - t) * (o - n) >= 0;
  }function s(t) {
    for (var e = t[0], r = t[0], n = t[1], i = t[1], o = 3; o < t.length; o += 3) {
      e = e < t[o + 0] ? e : t[o + 0], r = r > t[o + 0] ? r : t[o + 0], n = n < t[o + 1] ? n : t[o + 1], i = i > t[o + 1] ? i : t[o + 1];
    }return { minX: e, maxX: r, minY: n, maxY: i };
  }return r.prototype = Object.create(t.prototype), r.prototype.rebuild = function () {
    this.getAttributeBuffer(t.POSITION).set(this.verts);for (var r = [], n = 0; n < this.indices.length; n += 3) {
      var i = e.getTriangleNormal(this.verts[3 * this.indices[n + 0] + 0], this.verts[3 * this.indices[n + 0] + 1], this.verts[3 * this.indices[n + 0] + 2], this.verts[3 * this.indices[n + 1] + 0], this.verts[3 * this.indices[n + 1] + 1], this.verts[3 * this.indices[n + 1] + 2], this.verts[3 * this.indices[n + 2] + 0], this.verts[3 * this.indices[n + 2] + 1], this.verts[3 * this.indices[n + 2] + 2]);r[3 * this.indices[n + 0] + 0] = i[0], r[3 * this.indices[n + 0] + 1] = i[1], r[3 * this.indices[n + 0] + 2] = i[2], r[3 * this.indices[n + 1] + 0] = i[0], r[3 * this.indices[n + 1] + 1] = i[1], r[3 * this.indices[n + 1] + 2] = i[2], r[3 * this.indices[n + 2] + 0] = i[0], r[3 * this.indices[n + 2] + 1] = i[1], r[3 * this.indices[n + 2] + 2] = i[2];
    }this.getAttributeBuffer(t.NORMAL).set(r), this.getIndexBuffer().set(this.indices);for (var o = [], a = s(this.verts), h = a.maxX - a.minX, u = a.maxY - a.minY, n = 0; n < this.verts.length; n += 3) {
      var c = (this.verts[n + 0] - a.minX) / h,
          l = (this.verts[n + 1] - a.minY) / u;o.push(c, l);
    }return this.getAttributeBuffer(t.TEXCOORD0).set(o), this;
  }, r;
}(goo.MeshData, goo.MathUtils), goo.Surface = function (t, e) {
  "use strict";

  function r(e, r, n) {
    this.verts = e, this.vertsPerLine = r || 2, this.verticallyClosed = !!n;var i = t.defaultMap([t.POSITION, t.NORMAL, t.TEXCOORD0]),
        o = this.verts.length / 3,
        s = o / this.vertsPerLine;t.call(this, i, o, (s - 1) * (this.vertsPerLine - 1) * 6), this.rebuild();
  }function n(t) {
    for (var e = t[0], r = t[0], n = t[2], i = t[2], o = 3; o < t.length; o += 3) {
      e = e < t[o + 0] ? e : t[o + 0], r = r > t[o + 0] ? r : t[o + 0], n = n < t[o + 2] ? n : t[o + 2], i = i > t[o + 2] ? i : t[o + 2];
    }return { minX: e, maxX: r, minY: n, maxY: i };
  }return r.prototype = Object.create(t.prototype), r.prototype.constructor = r, r.prototype.rebuild = function () {
    this.getAttributeBuffer(t.POSITION).set(this.verts);for (var r = [], i = [], o = [], s = this.verts.length / 3, a = s / this.vertsPerLine, h = 0; a - 1 > h; h++) {
      for (var u = 0; u < this.vertsPerLine - 1; u++) {
        var c = (h + 0) * this.vertsPerLine + (u + 0),
            l = (h + 1) * this.vertsPerLine + (u + 0),
            f = (h + 1) * this.vertsPerLine + (u + 1),
            v = (h + 0) * this.vertsPerLine + (u + 1);r.push(c, l, v, v, l, f), o = e.getTriangleNormal(this.verts[3 * c + 0], this.verts[3 * c + 1], this.verts[3 * c + 2], this.verts[3 * l + 0], this.verts[3 * l + 1], this.verts[3 * l + 2], this.verts[3 * v + 0], this.verts[3 * v + 1], this.verts[3 * v + 2]), i.push(o[0], o[1], o[2]);
      }if (this.verticallyClosed) {
        var c = (h + 0) * this.vertsPerLine + 0,
            l = (h + 1) * this.vertsPerLine + 0,
            v = (h + 0) * this.vertsPerLine + 1;o = e.getTriangleNormal(this.verts[3 * c + 0], this.verts[3 * c + 1], this.verts[3 * c + 2], this.verts[3 * l + 0], this.verts[3 * l + 1], this.verts[3 * l + 2], this.verts[3 * v + 0], this.verts[3 * v + 1], this.verts[3 * v + 2]), i.push(o[0], o[1], o[2]);
      } else i.push(o[0], o[1], o[2]);
    }h--;for (var u = 0; u < this.vertsPerLine - 1; u++) {
      var c = (h + 0) * this.vertsPerLine + (u + 0),
          l = (h + 1) * this.vertsPerLine + (u + 0),
          v = (h + 0) * this.vertsPerLine + (u + 1);o = e.getTriangleNormal(this.verts[3 * c + 0], this.verts[3 * c + 1], this.verts[3 * c + 2], this.verts[3 * l + 0], this.verts[3 * l + 1], this.verts[3 * l + 2], this.verts[3 * v + 0], this.verts[3 * v + 1], this.verts[3 * v + 2]), i.push(o[0], o[1], o[2]);
    }i.push(o[0], o[1], o[2]), this.getAttributeBuffer(t.NORMAL).set(i), this.getIndexBuffer().set(r);for (var p = [], g = n(this.verts), d = g.maxX - g.minX, m = g.maxY - g.minY, h = 0; h < this.verts.length; h += 3) {
      var y = (this.verts[h + 0] - g.minX) / d,
          x = (this.verts[h + 2] - g.minY) / m;p.push(y, x);
    }return this.getAttributeBuffer(t.TEXCOORD0).set(p), this;
  }, r.createFromHeightMap = function (t, e, n, i) {
    e = e || 1, n = n || 1, i = i || 1;for (var o = [], s = 0; s < t.length; s++) {
      for (var a = 0; a < t[s].length; a++) {
        o.push(a * e, t[s][a] * n, s * i);
      }
    }return new r(o, t[0].length);
  }, r.createTessellatedFlat = function (t, e, n, i) {
    for (var o = [], s = 0; i > s; s++) {
      for (var a = 0; n > a; a++) {
        o.push(a * t / n - .5 * t, 0, s * e / i - .5 * e);
      }
    }return new r(o, n);
  }, r;
}(goo.MeshData, goo.MathUtils), goo.PolyLine = function (t, e, r, n) {
  "use strict";

  function i(e, r) {
    this.verts = e, this.closed = !!r;var n = t.defaultMap([t.POSITION]);t.call(this, n, this.verts.length / 3, this.verts.length / 3), this.closed ? this.indexModes = ["LineLoop"] : this.indexModes = ["LineStrip"], this.rebuild();
  }return i.prototype = Object.create(t.prototype), i.prototype.rebuild = function () {
    this.getAttributeBuffer(t.POSITION).set(this.verts);for (var e = [], r = this.verts.length / 3, n = 0; r > n; n++) {
      e.push(n);
    }return this.getIndexBuffer().set(e), this;
  }, i.prototype.mul = function (t) {
    if (t instanceof i) {
      for (var r = t.verts.length / 3, n = [], o = 0; o < this.verts.length; o += 3) {
        for (var s = 0; s < t.verts.length; s += 3) {
          n.push(this.verts[o + 0] + t.verts[s + 0], this.verts[o + 1] + t.verts[s + 1], this.verts[o + 2] + t.verts[s + 2]);
        }
      }return new e(n, r);
    }
  }, function () {
    function t(t, e, r, i) {
      var o, s;e >= t.length / 3 - 1 ? (o = e - 1, s = e) : (o = e, s = e + 1);var a = new n(t[3 * s + 0] - t[3 * o + 0], t[3 * s + 1] - t[3 * o + 1], t[3 * s + 2] - t[3 * o + 2]);a.normalize(), i.lookAt(a, r);
    }var o = n.UNIT_Z;i.prototype.pipe = function (i, s) {
      s = s || {};for (var a, h = i.verts.length / 3, u = [], c = new n(), l = n.UNIT_Y.clone(), f = new n(), v = new r(), p = new r(), g = 0; g < this.verts.length; g += 3) {
        t(this.verts, g / 3, l, v);var d = g / (this.verts.length - 1);s.twist && (p.fromAngles(0, 0, s.twist(d)), v.mul(p)), a = s.scale ? s.scale(d) : 1, c.copy(o), c.applyPost(v), f.copy(c).cross(l).normalize(), l.copy(f).cross(c);for (var m = 0; m < i.verts.length; m += 3) {
          var y = new n(i.verts[m + 0], i.verts[m + 1], i.verts[m + 2]);y.applyPost(v), y.scale(a), y.addDirect(this.verts[g + 0], this.verts[g + 1], this.verts[g + 2]), u.push(y.x, y.y, y.z);
        }
      }return new e(u, h);
    };
  }(), i.prototype.lathe = function (t) {
    t = t || 8;for (var r = 2 * Math.PI / t, n = [], i = 0; i < this.verts.length; i += 3) {
      for (var o = 0, s = 0; t >= o; o++, s += r) {
        n.push(Math.cos(s) * this.verts[i + 0], this.verts[i + 1], Math.sin(s) * this.verts[i + 0]);
      }
    }return new e(n, t + 1, !0);
  }, i.prototype.concat = function (t, e) {
    var r = this.verts.length - 1;return this.verts[r - 2] === t.verts[0] && this.verts[r - 1] === t.verts[1] && this.verts[r - 0] === t.verts[2] ? new i(this.verts.slice(0, -3).concat(t.verts), e) : new i(this.verts.concat(t.verts), e);
  }, i.fromCubicBezier = function (t, e, r) {
    if (12 !== t.length) return void console.error("PolyLine.fromCubicBezier takes an array of exactly 12 coordinates");e = e || 16, r = r || 0;for (var n = [], o = [], s = [], a = [], h = [], u = [], c = [], l = r; e >= l; l++) {
      var f = l / e;o[0] = t[0] + (t[3] - t[0]) * f, o[1] = t[1] + (t[4] - t[1]) * f, o[2] = t[2] + (t[5] - t[2]) * f, s[0] = t[3] + (t[6] - t[3]) * f, s[1] = t[4] + (t[7] - t[4]) * f, s[2] = t[5] + (t[8] - t[5]) * f, a[0] = t[6] + (t[9] - t[6]) * f, a[1] = t[7] + (t[10] - t[7]) * f, a[2] = t[8] + (t[11] - t[8]) * f, h[0] = o[0] + (s[0] - o[0]) * f, h[1] = o[1] + (s[1] - o[1]) * f, h[2] = o[2] + (s[2] - o[2]) * f, u[0] = s[0] + (a[0] - s[0]) * f, u[1] = s[1] + (a[1] - s[1]) * f, u[2] = s[2] + (a[2] - s[2]) * f, c[0] = h[0] + (u[0] - h[0]) * f, c[1] = h[1] + (u[1] - h[1]) * f, c[2] = h[2] + (u[2] - h[2]) * f, n.push(c[0], c[1], c[2]);
    }return n = t.slice(0, 3).concat(n), new i(n);
  }, i.fromQuadraticSpline = function (t, e, r) {
    if (t.length % 3 !== 0 && t.length / 3 % 2 !== 0) return void console.error("Wrong number of coordinates supplied in first argument to PolyLine.fromQuadraticSpline");for (var n = [], o = 0; o < t.length - 6; o += 6) {
      var s = t.slice(o, o + 3),
          a = t.slice(o + 3, o + 6),
          h = t.slice(o + 6, o + 9);n.push.apply(n, [s[0], s[1], s[2], s[0] + 2 / 3 * (a[0] - s[0]), s[1] + 2 / 3 * (a[1] - s[1]), s[2] + 2 / 3 * (a[2] - s[2]), h[0] + 2 / 3 * (a[0] - h[0]), h[1] + 2 / 3 * (a[1] - h[1]), h[2] + 2 / 3 * (a[2] - h[2])]);
    }return n.push.apply(n, t.slice(t.length - 3, t.length)), i.fromCubicSpline(n, e, r);
  }, i.fromCubicSpline = function (t, e, r) {
    if (r) {
      if (t.length % 3 !== 0 && t.length / 3 % 3 !== 0) return void console.error("Wrong number of coordinates supplied in first argument to PolyLine.fromCubicSpline");for (var n = t.length / 3, o = n / 3, s = i.fromCubicBezier(t.slice(0, 12), e, 1), a = 1; o - 1 > a; a++) {
        var h = i.fromCubicBezier(t.slice(3 * a * 3, 3 * a * 3 + 12), e, 1);s = s.concat(h);
      }var h = i.fromCubicBezier(t.slice(3 * a * 3, 3 * a * 3 + 9).concat(t.slice(0, 3)), e, 1);return s = s.concat(h);
    }if (t.length % 3 !== 0 && t.length / 3 % 3 !== 1) return void console.error("Wrong number of coordinates supplied in first argument to PolyLine.fromCubicSpline");for (var n = t.length / 3, o = (n - 1) / 3, s = i.fromCubicBezier(t.slice(0, 12), e, 1), a = 1; o > a; a++) {
      var h = i.fromCubicBezier(t.slice(3 * a * 3, 3 * a * 3 + 12), e, 1);s = s.concat(h);
    }return s;
  }, i;
}(goo.MeshData, goo.Surface, goo.Matrix3, goo.Vector3), goo.RegularPolygon = function (t, e) {
  "use strict";

  function r(t, r) {
    this.nSegments = t || 5, this.radius = r || 1;for (var n = [], i = 2 * Math.PI / t, o = 0, s = 0; o < this.nSegments; o++, s += i) {
      n.push(Math.cos(s) * this.radius, Math.sin(s) * this.radius, 0);
    }e.call(this, n, !0), this.rebuild();
  }return r.prototype = Object.create(e.prototype), r;
}(goo.MeshData, goo.PolyLine), goo.Triangle = function (t, e) {
  "use strict";

  function r(e) {
    this.verts = e;var r = t.defaultMap([t.POSITION, t.NORMAL]);t.call(this, r, 3, 3), this.rebuild();
  }return r.prototype = Object.create(t.prototype), r.prototype.constructor = r, r.prototype.rebuild = function () {
    this.getAttributeBuffer(t.POSITION).set(this.verts);var r = e.getTriangleNormal(this.verts[0], this.verts[1], this.verts[2], this.verts[3], this.verts[4], this.verts[5], this.verts[6], this.verts[7], this.verts[8]);return this.getAttributeBuffer(t.NORMAL).set([r[0], r[1], r[2], r[0], r[1], r[2], r[0], r[1], r[2]]), this.getIndexBuffer().set([0, 1, 2]), this;
  }, r;
}(goo.MeshData, goo.MathUtils), goo.TextMeshGenerator = function (t, e, r, n, i) {
  "use strict";

  function o(t) {
    var e = t.type;return void 0 !== t.x2 && (e += " " + t.x2), void 0 !== t.y2 && (e += " " + t.y2), void 0 !== t.x1 && (e += " " + t.x1), void 0 !== t.y1 && (e += " " + t.y1), void 0 !== t.x && (e += " " + t.x), void 0 !== t.y && (e += " " + t.y), e;
  }function s(t, e) {
    var r = document.createElementNS("http://www.w3.org/2000/svg", "path");r.setAttribute("d", t);for (var n = r.getTotalLength(), i = [], o = 0; n > o; o += e) {
      var s = r.getPointAtLength(o);i.push({ x: s.x, y: s.y });
    }return i;
  }function a(t, e) {
    return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
  }function h(t, e) {
    var r = [],
        n = [];n.push(t[0]);for (var i = 1; i < t.length; i++) {
      var o = t[i - 1],
          s = t[i],
          h = a(o, s);h > e + .1 && (r.push(n), n = []), n.push(s);
    }return r.push(n), r;
  }function u(t) {
    var e = [];e.push(t[0]);for (var r = 1; r < t.length - 1; r++) {
      var n = t[r - 1].x - t[r].x,
          i = t[r - 1].y - t[r].y,
          o = t[r].x - t[r + 1].x,
          s = t[r].y - t[r + 1].y,
          a = Math.atan2(i, n),
          h = Math.atan2(s, o);Math.abs(a - h) > b && e.push(t[r]);
    }return e.push(t[r]), e;
  }function c(e) {
    for (var r = new t(e[0].x, e[0].y), n = r.clone(), i = 1; i < e.length; i++) {
      var o = e[i];o.x < r.x ? r.x = o.x : o.x > n.x && (n.x = o.x), o.y < r.y ? r.y = o.y : o.y > n.y && (n.y = o.y);
    }return { min: r, max: n };
  }function l(t, e) {
    return t.min.x < e.min.x && t.max.x > e.max.x && t.min.y < e.min.y && t.max.y > e.max.y;
  }function f(e, r) {
    return { min: new t(Math.min(e.min.x, r.min.x), Math.min(e.min.y, r.min.y)), max: new t(Math.max(e.max.x, r.max.x), Math.max(e.max.y, r.max.y)) };
  }function v(t) {
    for (var e = t.map(function (t) {
      return { polygon: t, boundingVolume: c(t), parent: null, children: [] };
    }), r = e[0].boundingVolume, n = 1; n < e.length; n++) {
      var i = e[n];r = f(r, i.boundingVolume);
    }for (var n = 0; n < e.length; n++) {
      for (var o = e[n], s = 0; s < e.length; s++) {
        var a = e[s];l(o.boundingVolume, a.boundingVolume) && (o.children.push(a), a.parent = o);
      }
    }var h = e.filter(function (t) {
      return !t.parent;
    });return h.forEach(function (t) {
      t.children.forEach(function (t) {
        Array.prototype.push.apply(h, t.children);
      });
    }), { topLevel: h.map(function (t) {
        return { polygon: t.polygon, holes: t.children };
      }), boundingVolume: r };
  }function p(t) {
    for (var e = new Array(t.length), r = 0; r < t.length; r += 3) {
      e[r + 0] = t[r + 0], e[r + 1] = t[r + 2], e[r + 2] = t[r + 1];
    }return e;
  }function g(t) {
    var e = 0;t.forEach(function (t) {
      t.forEach(function (t) {
        t._index = e, e++;
      });
    });
  }function d(t) {
    var e = [];return t.forEach(function (t) {
      e.push(t.getPoint(0)._index, t.getPoint(1)._index, t.getPoint(2)._index);
    }), e;
  }function m(t) {
    t.sort(function (t, e) {
      return t._index - e._index;
    });var e = [];return t.forEach(function (t) {
      e.push(t.x, t.y, 0);
    }), e;
  }function y(t, e) {
    var r = new poly2tri.SweepContext(t.slice(0));e.forEach(function (t) {
      r.addHole(t.polygon.slice(0));
    }), r.triangulate();var n = r.getTriangles();return d(n);
  }function x(t, e) {
    e = e || {}, e.simplifyPaths = e.simplifyPaths !== !1;var r = t.getPath(0, 0, e.fontSize),
        n = r.commands.map(o).reduce(function (t, e) {
      return t + e;
    }, ""),
        i = s(n, e.stepLength),
        a = h(i, e.stepLength);e.simplifyPaths && (a = a.map(u)), g(a);var c = v(a),
        l = [];a.forEach(function (t) {
      var e = m(t);Array.prototype.push.apply(l, e);
    });var f = [];return c.topLevel.forEach(function (t) {
      var e = y(t.polygon, t.holes);Array.prototype.push.apply(f, e);
    }), { surfaceIndices: f, surfaceVerts: l, extrusions: a, boundingVolume: c.boundingVolume };
  }function P(t, o, s) {
    function a(t, r, o, s) {
      function a() {
        var i = new n(t.surfaceVerts, t.surfaceIndices),
            a = new e();a.translation.setDirect(r, o, -s.extrusion / 2), a.scale.setDirect(1, -1, 1), a.update(), u.addMeshData(i, a);
      }function h() {
        var i = new n(t.surfaceVerts, p(t.surfaceIndices)),
            a = new e();a.translation.setDirect(r, o, s.extrusion / 2), a.scale.setDirect(1, -1, 1), a.update(), u.addMeshData(i, a);
      }a(), h(), s.extrusion && t.extrusions.forEach(function (t) {
        var n = m(t);n.push(n[0], n[1], n[2]);var a = new i(n, !0),
            h = new i([0, 0, -s.extrusion / 2, 0, 0, s.extrusion / 2]),
            c = a.mul(h),
            l = new e();l.translation.setDirect(r, o, 0), l.scale.setDirect(1, -1, -1), l.update(), u.addMeshData(c, l);
      });
    }s = s || {}, s.extrusion = void 0 !== s.extrusion ? s.extrusion : 4, s.stepLength = s.stepLength || 1, s.fontSize = s.fontSize || 48;var h = [];o.forEachGlyph(t, 0, 0, s.fontSize, {}, function (t, e, r) {
      t.path.commands.length > 0 && h.push({ data: x(t, s), x: e, y: r });
    });var u = new r(),
        c = h[0],
        l = c.data.boundingVolume.min.x,
        f = h[h.length - 1],
        v = f.data.boundingVolume.max.x + f.x,
        g = (l + v) / 2;return h.forEach(function (t) {
      a(t.data, t.x - g, 0, s);
    }), u.build();
  }var b = .001;return { meshesForText: P };
}(goo.Vector2, goo.Transform, goo.MeshBuilder, goo.FilledPolygon, goo.PolyLine), goo.TextComponent = function (t, e, r) {
  "use strict";

  function n() {
    t.apply(this, arguments), this.type = "TextComponent", this._font = null, this._entity = null;
  }return n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.type = "TextComponent", n.prototype.attached = function (t) {
    this._entity = t;
  }, n.prototype.detached = function () {
    this._entity.clearComponent("MeshDataComponent"), this._entity = null;
  }, n.prototype.setFont = function (t) {
    return this._font = t, this;
  }, n.prototype.setText = function (t, n) {
    this._entity.clearComponent("MeshDataComponent");var i = r.meshesForText(t, this._font, n)[0],
        o = new e(i);return this._entity.setComponent(o), this;
  }, n;
}(goo.Component, goo.MeshDataComponent, goo.TextMeshGenerator), goo.TextComponentHandler = function (t, e, r) {
  "use strict";

  function n() {
    t.apply(this, arguments), this._type = "TextComponent";
  }return n.prototype = Object.create(t.prototype), n.prototype.constructor = n, t._registerClass("text", n), n.prototype._create = function () {
    return new e();
  }, n.prototype._remove = function (t) {
    t.clearComponent("TextComponent");
  }, n.prototype.update = function (e, n, i) {
    return t.prototype.update.call(this, e, n, i).then(function (t) {
      return t ? r.createPromise(function (e, r) {
        opentype.load(n.font.fontRef, function (r, i) {
          if (r) return console.error(r), void e(t);var o = 1,
              s = function s(t, e) {
            return (.08 * (1 - e) + .01) * t;
          };t.setFont(i), t.setText(n.text, { extrusion: n.extrusion, fontSize: o, stepLength: s(o, n.smoothness), simplifyPaths: !0 }), e(t);
        });
      }) : void 0;
    });
  }, n;
}(goo.ComponentHandler, goo.TextComponent, goo.PromiseUtils), "function" == typeof require && (define("goo/geometrypack/FilledPolygon", [], function () {
  return goo.FilledPolygon;
}), define("goo/geometrypack/Surface", [], function () {
  return goo.Surface;
}), define("goo/geometrypack/PolyLine", [], function () {
  return goo.PolyLine;
}), define("goo/geometrypack/RegularPolygon", [], function () {
  return goo.RegularPolygon;
}), define("goo/geometrypack/Triangle", [], function () {
  return goo.Triangle;
}), define("goo/geometrypack/text/TextMeshGenerator", [], function () {
  return goo.TextMeshGenerator;
}), define("goo/geometrypack/text/TextComponent", [], function () {
  return goo.TextComponent;
}), define("goo/geometrypack/text/TextComponentHandler", [], function () {
  return goo.TextComponentHandler;
}));

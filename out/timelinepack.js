"use strict";

goo.AbstractTimelineChannel = function () {
  "use strict";

  function e(e) {
    this.id = e, this.enabled = !0, this.keyframes = [], this.lastTime = 0;
  }return e.prototype._find = function (e, t) {
    var n = 0,
        i = e.length - 1,
        o = e[e.length - 1].time;if (t > o) return i;for (; i - n > 1;) {
      var r = Math.floor((i + n) / 2),
          a = e[r].time;t > a ? n = r : i = r;
    }return n;
  }, e.prototype.sort = function () {
    return this.keyframes.sort(function (e, t) {
      return e.time - t.time;
    }), this.lastTime = this.keyframes[this.keyframes.length - 1].time, this;
  }, e;
}(), goo.EventChannel = function (e) {
  "use strict";

  function t(t) {
    e.call(this, t), this.oldTime = 0, this.callbackIndex = 0;
  }return t.prototype = Object.create(e.prototype), t.prototype.constructor = e, t.prototype.addCallback = function (e, t, n) {
    var i = { id: e, time: t, callback: n },
        o = this.keyframes;if (t > this.lastTime) o.push(i), this.lastTime = t;else if (!o.length || t < o[0].time) o.unshift(i);else {
      var r = this._find(o, t) + 1;o.splice(r, 0, i);
    }return this;
  }, t.prototype.update = function (e) {
    if (!this.enabled) return this;var t = this.keyframes;if (!t.length) return this;if (e < this.oldTime) {
      for (; this.callbackIndex < t.length;) {
        t[this.callbackIndex].callback(), this.callbackIndex++;
      }this.callbackIndex = 0;
    }for (; this.callbackIndex < t.length && e >= t[this.callbackIndex].time && e !== this.oldTime;) {
      t[this.callbackIndex].callback(), this.callbackIndex++;
    }return this.oldTime = e, this;
  }, t.prototype.setTime = function (e) {
    return this.enabled && this.keyframes.length ? (e <= this.keyframes[0].time ? this.callbackIndex = 0 : this.callbackIndex = this._find(this.keyframes, e) + 1, this.oldTime = e, this) : this;
  }, t;
}(goo.AbstractTimelineChannel), goo.TimelineComponent = function (e) {
  "use strict";

  function t() {
    e.apply(this, arguments), this.type = "TimelineComponent", this.channels = [], this.time = 0, this.duration = 0, this.loop = !1, this.playing = !0;
  }return t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.prototype.addChannel = function (e) {
    return this.channels.push(e), this;
  }, t.prototype.update = function (e) {
    if (this.playing) {
      var t = this.time + e;if (t > this.duration && (this.loop ? t %= this.duration : t = this.duration), t === this.time) return this;this.time = t;for (var n = 0; n < this.channels.length; n++) {
        var i = this.channels[n];i.update(this.time);
      }
    }
  }, t.prototype.start = function () {
    this.playing = !0;
  }, t.prototype.resume = t.prototype.start, t.prototype.pause = function () {
    this.playing = !1;
  }, t.prototype.stop = function () {
    this.playing = !1, this.setTime(0);
  }, t.prototype.setTime = function (e) {
    this.time = e;for (var t = 0; t < this.channels.length; t++) {
      var n = this.channels[t];n.setTime(this.time);
    }return this;
  }, t.prototype.getValues = function () {
    for (var e = {}, t = 0; t < this.channels.length; t++) {
      var n = this.channels[t];"undefined" != typeof n.value && n.keyframes.length && (e[n.id] = n.value);
    }return e;
  }, t;
}(goo.Component), goo.ValueChannel = function (e, t) {
  "use strict";

  function n(t, n) {
    e.call(this, t), this.value = 0, n = n || {}, this.callbackUpdate = n.callbackUpdate, this.callbackEnd = n.callbackEnd;
  }return n.prototype = Object.create(e.prototype), n.prototype.constructor = n, n.prototype.addKeyframe = function (e, t, n, i) {
    var o = { id: e, time: t, value: n, easingFunction: i };if (t > this.lastTime) this.keyframes.push(o), this.lastTime = t;else if (!this.keyframes.length || t < this.keyframes[0].time) this.keyframes.unshift(o);else {
      var r = this._find(this.keyframes, t) + 1;this.keyframes.splice(r, 0, o);
    }return this;
  }, n.prototype.update = function (e) {
    if (!this.enabled) return this.value;if (!this.keyframes.length) return this.value;var n, i;if (e <= this.keyframes[0].time) n = this.keyframes[0].value;else if (e >= this.keyframes[this.keyframes.length - 1].time) n = this.keyframes[this.keyframes.length - 1].value;else {
      i = this._find(this.keyframes, e);var o = this.keyframes[i],
          r = this.keyframes[i + 1],
          a = (e - o.time) / (r.time - o.time),
          s = o.easingFunction(a);n = t.lerp(s, o.value, r.value);
    }return this.value = n, this.callbackUpdate(e, this.value, i), this;
  }, n.prototype.setTime = n.prototype.update, n.getSimpleTransformTweener = function (e, t, n, i) {
    var o;return function (r, a) {
      o || (o = i(n)), o && (o.transformComponent.transform[e][t] = a, o.transformComponent.setUpdated());
    };
  }, n.getRotationTweener = function (e, n, i, o) {
    var r,
        a = function a(o, s) {
      if (r || (r = i(n)), r) {
        var l = a.rotation;l[e] = s * t.DEG_TO_RAD, r.transformComponent.transform.rotation.fromAngles(l[0], l[1], l[2]), r.transformComponent.setUpdated();
      }
    };return a.rotation = o, a;
  }, n;
}(goo.AbstractTimelineChannel, goo.MathUtils), goo.TimelineComponentHandler = function (e, t, n, i, o, r, a, s) {
  "use strict";

  function l() {
    e.apply(this, arguments), this._type = "TimelineComponent";
  }function u(e) {
    if (!e) return s.Easing.Linear.None;var t = e.indexOf("."),
        n = e.substr(0, t),
        i = e.substr(t + 1);return s.Easing[n][i];
  }function h(e, t, n) {
    var i = !1,
        r = o.find(n.keyframes, function (e) {
      return e.id === t;
    }),
        a = u(e.easing);return r ? (r.time !== +e.time && (i = !0), r.time = +e.time, r.value = +e.value, r.easingFunction = a) : n.addKeyframe(t, e.time, e.value, a), { needsResorting: i };
  }function p(e, t, n, i) {
    var a = !1,
        s = o.find(n.keyframes, function (e) {
      return e.id === t;
    }),
        l = function l() {
      r.emit(i.eventName, e.value);
    };return s ? (s.time !== +e.time && (a = !0), s.time = +e.time, s.callback = l) : n.addCallback(t, e.time, l), { needsResorting: a };
  }function c(e, t, r, a, s) {
    var u = o.find(r.channels, function (e) {
      return e.id === t;
    });if (u) {
      if (e.entityId && u.callbackUpdate && u.callbackUpdate.rotation) {
        var c = s[e.entityId] = u.callbackUpdate.rotation;c[0] = 0, c[1] = 0, c[2] = 0;
      }
    } else {
      var m = e.propertyKey;if (m) {
        var f = e.entityId;f && !s[f] && (s[f] = [0, 0, 0]);var d = l.tweenMap[m](f, a, s[f]);u = new n(t, { callbackUpdate: d });
      } else u = new i(t);r.channels.push(u);
    }u.enabled = e.enabled !== !1, u.keyframes = u.keyframes.filter(function (t) {
      return !!e.keyframes[t.id];
    });var y = !1;if (e.propertyKey) for (var g in e.keyframes) {
      var k = e.keyframes[g],
          v = h(k, g, u, e);y = y || v.needsResorting;
    } else for (var g in e.keyframes) {
      var k = e.keyframes[g],
          v = p(k, g, u, e);y = y || v.needsResorting;
    }y && u.sort();
  }return l.prototype = Object.create(e.prototype), l.prototype.constructor = l, e._registerClass("timeline", l), l.prototype._prepare = function () {}, l.prototype._create = function () {
    return new t();
  }, l.tweenMap = { translationX: n.getSimpleTransformTweener.bind(null, "translation", "x"), translationY: n.getSimpleTransformTweener.bind(null, "translation", "y"), translationZ: n.getSimpleTransformTweener.bind(null, "translation", "z"), scaleX: n.getSimpleTransformTweener.bind(null, "scale", "x"), scaleY: n.getSimpleTransformTweener.bind(null, "scale", "y"), scaleZ: n.getSimpleTransformTweener.bind(null, "scale", "z"), rotationX: n.getRotationTweener.bind(null, 0), rotationY: n.getRotationTweener.bind(null, 1), rotationZ: n.getRotationTweener.bind(null, 2) }, l.prototype.update = function (t, n, i) {
    var o = this;return e.prototype.update.call(this, t, n, i).then(function (e) {
      if (e) {
        isNaN(n.duration) || (e.duration = +n.duration), e.loop = n.loop.enabled === !0, e.channels = e.channels.filter(function (e) {
          return !!n.channels[e.id];
        });var t = function t(e) {
          return o.world.entityManager.getEntityById(e);
        },
            i = {};return a.forEach(n.channels, function (n) {
          c(n, n.id, e, t, i);
        }, null, "sortValue"), e;
      }
    });
  }, l;
}(goo.ComponentHandler, goo.TimelineComponent, goo.ValueChannel, goo.EventChannel, goo.ArrayUtils, goo.SystemBus, goo.ObjectUtils, goo.TWEEN), goo.TimelineSystem = function (e, t) {
  "use strict";

  function n() {
    e.call(this, "TimelineSystem", ["TimelineComponent"]);
  }return n.prototype = Object.create(e.prototype), n.prototype.constructor = n, n.prototype.process = function (e, n) {
    if (this.resetRequest) {
      var i;this.resetRequest = !1;for (var o = 0; o < e.length; o++) {
        i = e[o].timelineComponent, i.setTime(0);
      }return this.time = 0, t.removeAll(), void (this.passive = !0);
    }for (var o = 0; o < this._activeEntities.length; o++) {
      var r = this._activeEntities[o];r.timelineComponent.update(n);
    }
  }, n.prototype.play = function () {
    this.passive = !1, this.paused || (this.entered = !0), this.paused = !1;
  }, n.prototype.pause = function () {
    this.passive = !0, this.paused = !0;
  }, n.prototype.resume = n.prototype.play, n.prototype.stop = function () {
    this.passive = !1, this.resetRequest = !0, this.paused = !1;
  }, n;
}(goo.System, goo.TWEEN), "function" == typeof require && (define("goo/timelinepack/AbstractTimelineChannel", [], function () {
  return goo.AbstractTimelineChannel;
}), define("goo/timelinepack/EventChannel", [], function () {
  return goo.EventChannel;
}), define("goo/timelinepack/TimelineComponent", [], function () {
  return goo.TimelineComponent;
}), define("goo/timelinepack/ValueChannel", [], function () {
  return goo.ValueChannel;
}), define("goo/timelinepack/TimelineComponentHandler", [], function () {
  return goo.TimelineComponentHandler;
}), define("goo/timelinepack/TimelineSystem", [], function () {
  return goo.TimelineSystem;
}));

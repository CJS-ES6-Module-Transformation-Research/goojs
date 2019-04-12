"use strict";

goo.Joint = function (t) {
  "use strict";

  function e(n) {
    this._name = n, this._index = 0, this._parentIndex = e.NO_PARENT, this._inverseBindPose = new t();
  }return e.NO_PARENT = -32768, e;
}(goo.Transform), goo.Skeleton = function (t) {
  "use strict";

  function e(t, e) {
    this._name = t, this._joints = e;
  }return e.prototype.clone = function () {
    for (var n = this._name, o = this._joints, i = [], r = 0, a = o.length; a > r; r++) {
      var s = o[r],
          c = s._name,
          p = new t(c);p._index = s._index, p._parentIndex = s._parentIndex, p._inverseBindPose.copy(s._inverseBindPose), p._inverseBindPose.update(), i[r] = p;
    }return new e(n, i);
  }, e;
}(goo.Joint), goo.SkeletonPose = function (t, e, n) {
  "use strict";

  function o(e) {
    this._skeleton = e, this._localTransforms = [], this._globalTransforms = [], this._matrixPalette = [], this._poseListeners = [];for (var o = this._skeleton._joints.length, i = 0; o > i; i++) {
      this._localTransforms[i] = new t();
    }for (var i = 0; o > i; i++) {
      this._globalTransforms[i] = new t();
    }for (var i = 0; o > i; i++) {
      this._matrixPalette[i] = new n();
    }this.setToBindPose();
  }return o.prototype.setToBindPose = function () {
    for (var t = 0; t < this._localTransforms.length; t++) {
      this._localTransforms[t].matrix.copy(this._skeleton._joints[t]._inverseBindPose.matrix).invert();var n = this._skeleton._joints[t]._parentIndex;n !== e.NO_PARENT && this._localTransforms[t].matrix.mul2(this._skeleton._joints[n]._inverseBindPose.matrix, this._localTransforms[t].matrix);
    }this.updateTransforms();
  }, o.prototype.updateTransforms = function () {
    for (var t = this._skeleton._joints, n = 0, o = t.length; o > n; n++) {
      var i = t[n]._parentIndex;i !== e.NO_PARENT ? this._globalTransforms[n].matrix.mul2(this._globalTransforms[i].matrix, this._localTransforms[n].matrix) : this._globalTransforms[n].matrix.copy(this._localTransforms[n].matrix), this._matrixPalette[n].mul2(this._globalTransforms[n].matrix, t[n]._inverseBindPose.matrix);
    }this.firePoseUpdated();
  }, o.prototype.firePoseUpdated = function () {
    for (var t = this._poseListeners.length - 1; t >= 0; t--) {
      this._poseListeners[t].poseUpdated(this);
    }
  }, o.prototype.clone = function () {
    return new o(this._skeleton);
  }, o;
}(goo.Transform, goo.Joint, goo.Matrix4), goo.TransformData = function (t, e) {
  "use strict";

  function n(n) {
    this._rotation = new t().copy(n ? n._rotation : t.IDENTITY), this._scale = new e().copy(n ? n._scale : e.ONE), this._translation = new e().copy(n ? n._translation : e.ZERO);
  }return n.prototype.applyTo = function (t) {
    t.rotation.copyQuaternion(this._rotation), t.scale.set(this._scale), t.translation.set(this._translation), t.update();
  }, n.prototype.set = function (t) {
    this._rotation.copy(t._rotation), this._scale.copy(t._scale), this._translation.copy(t._translation);
  }, n.prototype.blend = function (e, o, i) {
    var r = i ? i : new n();return r._translation.set(this._translation).lerp(e._translation, o), r._scale.set(this._scale).lerp(e._scale, o), t.slerp(this._rotation, e._rotation, o, r._rotation), r;
  }, n;
}(goo.Quaternion, goo.Vector3), goo.Source = function () {
  "use strict";

  function t() {}return t.prototype.getSourceData = function () {}, t.prototype.setTime = function (t) {
    return !0;
  }, t.prototype.resetClips = function (t) {}, t.prototype.shiftClipTime = function (t) {}, t.prototype.setTimeScale = function (t) {}, t.prototype.isActive = function () {
    return !0;
  }, t.prototype.clone = function () {}, t;
}(), goo.BinaryLerpSource = function (t, e, n) {
  "use strict";

  function o(t, e, o) {
    n.call(this), this._sourceA = t ? t : null, this._sourceB = e ? e : null, this.blendWeight = o ? o : null;
  }return o.prototype = Object.create(n.prototype), o.prototype.constructor = o, o.prototype.getSourceData = function () {
    var t = this._sourceA ? this._sourceA.getSourceData() : null,
        e = this._sourceB ? this._sourceB.getSourceData() : null;return o.combineSourceData(t, e, this.blendWeight);
  }, o.prototype.setTime = function (t) {
    var e = !1,
        n = !1;return this._sourceA && (e = this._sourceA.setTime(t)), this._sourceB && (n = this._sourceB.setTime(t)), e || n;
  }, o.prototype.resetClips = function (t) {
    this._sourceA && this._sourceA.resetClips(t), this._sourceB && this._sourceB.resetClips(t);
  }, o.prototype.shiftClipTime = function (t) {
    this._sourceA && this._sourceA.shiftClipTime(t), this._sourceB && this._sourceB.shiftClipTime(t);
  }, o.prototype.setTimeScale = function (t) {
    this._sourceA.setTimeScale(t), this._sourceB.setTimeScale(t);
  }, o.prototype.isActive = function () {
    var t = !1;return this._sourceA && (t = t || this._sourceA.isActive()), this._sourceB && (t = t || this._sourceB.isActive()), t;
  }, o.combineSourceData = function (t, n, i, r) {
    if (!n) return t;if (!t) return n;var a = r ? r : {};for (var s in t) {
      var c = t[s],
          p = n[s];isNaN(c) ? c instanceof e ? p ? a[s] = c.blend(p, i, a[s]) : a[s] ? a[s].set(c) : a[s] = new c.constructor(c) : a[s] = c : o.blendFloatValues(a, s, i, c, p);
    }for (var s in n) {
      a[s] || (a[s] = n[s]);
    }return a;
  }, o.blendFloatValues = function (e, n, o, i, r) {
    isNaN(r) ? e[n] = i : e[n] = t.lerp(o, i[0], r[0]);
  }, o.prototype.clone = function () {
    return new o(this._sourceA, this._sourceB, this._blendWeight);
  }, o;
}(goo.MathUtils, goo.TransformData, goo.Source), goo.AnimationClipInstance = function (t) {
  "use strict";

  function e() {
    this._active = !0, this._loopCount = 0, this._timeScale = 1, this._startTime = 0, this._prevClockTime = 0, this._prevUnscaledClockTime = 0, this._clipStateObjects = {};
  }return e.prototype.setTimeScale = function (e, n) {
    if (n = "undefined" != typeof n ? n : t.time, this._active && this._timeScale !== e) if (0 !== this._timeScale && 0 !== e) {
      var o = n,
          i = o - this._startTime;i *= this._timeScale, i /= e, this._startTime = o - i;
    } else if (0 === this._timeScale) {
      var o = n;this._startTime = o - this._prevUnscaledClockTime;
    }this._timeScale = e;
  }, e.prototype.getApplyTo = function (t) {
    var e = t._channelName,
        n = this._clipStateObjects[e];return n || (n = t.createStateDataObject(), this._clipStateObjects[e] = n), n;
  }, e.prototype.clone = function () {
    var t = new e();return t._active = this._active, t._loopCount = this._loopCount, t._timeScale = this._timeScale, t;
  }, e;
}(goo.World), goo.ClipSource = function (t, e, n) {
  "use strict";

  function o(t, o, i) {
    n.call(this), this._clip = t, this._clipInstance = new e(), this._filterChannels = {}, this._filter = null, this.setFilter(o, i), this._startTime = -(1 / 0), this._endTime = 1 / 0, this.currentLoop = 0;
  }return o.prototype = Object.create(n.prototype), o.prototype.constructor = o, o.prototype.setFilter = function (t, e) {
    if (t && e) {
      this._filter = ["Exclude", "Include"].indexOf(t) > -1 ? t : null;for (var n = 0; n < e.length; n++) {
        this._filterChannels[e[n]] = !0;
      }
    } else this._filter = null;
  }, o.prototype.setTime = function (e) {
    var n = this._clipInstance;"number" != typeof n._startTime && (n._startTime = e);var o, i;if (n._active) {
      0 !== n._timeScale ? (n._prevUnscaledClockTime = e - n._startTime, o = n._timeScale * n._prevUnscaledClockTime, n._prevClockTime = o) : o = n._prevClockTime;var r = Math.min(this._clip._maxTime, this._endTime),
          a = Math.max(this._startTime, 0);if (i = r - a, -1 === r) return !1;0 !== r && (this.currentLoop = Math.floor(o / i), -1 === n._loopCount ? (0 > o ? (o *= -1, o %= i, o = i - o) : o %= i, o += a) : n._loopCount > 0 && i * n._loopCount >= Math.abs(o) && (0 > o ? (o *= -1, o %= i, o = i - o) : o %= i, o += a), (o > r || a > o) && (o = t.clamp(o, a, r), n._active = !1)), this._clip.update(o, n);
    }return n._active;
  }, o.prototype.resetClips = function (t) {
    this._clipInstance._startTime = "undefined" != typeof t ? t : 0, this._clipInstance._active = !0;
  }, o.prototype.shiftClipTime = function (t) {
    this._clipInstance._startTime += t, this._clipInstance._active = !0;
  }, o.prototype.setTimeScale = function (t) {
    this._clipInstance.setTimeScale(t);
  }, o.prototype.isActive = function () {
    return this._clipInstance._active && -1 !== this._clip._maxTime;
  }, o.prototype.getSourceData = function () {
    if (!this._filter || !this._filterChannels) return this._clipInstance._clipStateObjects;var t = this._clipInstance._clipStateObjects,
        e = {},
        n = "Include" === this._filter;for (var o in t) {
      void 0 !== this._filterChannels[o] === n && (e[o] = t[o]);
    }return e;
  }, o.prototype.clone = function () {
    var t = new o(this._clip);t._clipInstance = this._clipInstance.clone(), t._filter = this._filter;for (var e in this._filterChannels) {
      t._filterChannels[e] = this._filterChannels[e];
    }return t._startTime = this._startTime, t._endTime = this._endTime, t;
  }, o;
}(goo.MathUtils, goo.AnimationClipInstance, goo.Source), goo.AbstractAnimationChannel = function (t) {
  "use strict";

  function e(t, n, o) {
    this._blendType = o || e.BLENDTYPES.LINEAR, this._channelName = t, (n instanceof Array || n instanceof Float32Array) && n.length ? this._times = new Float32Array(n) : this._times = [], this._lastStartFrame = 0;
  }return e.BLENDTYPES = {}, e.BLENDTYPES.LINEAR = "Linear", e.BLENDTYPES.CUBIC = "SCurve3", e.BLENDTYPES.QUINTIC = "SCurve5", e.prototype.getSampleCount = function () {
    return this._times.length;
  }, e.prototype.getMaxTime = function () {
    return this._times.length ? this._times[this._times.length - 1] : 0;
  }, e.prototype.updateSample = function (n, o) {
    var i = this._times.length;if (i) {
      var r = i - 1;if (0 > n || 1 === i) this.setCurrentSample(0, 0, o);else if (n >= this._times[r]) this.setCurrentSample(r, 0, o);else {
        var a = 0;if (n >= this._times[this._lastStartFrame]) {
          a = this._lastStartFrame;for (var s = this._lastStartFrame; i - 1 > s && !(this._times[s] >= n); s++) {
            a = s;
          }
        } else for (var s = 0; s < this._lastStartFrame && !(this._times[s] >= n); s++) {
          a = s;
        }var c = (n - this._times[a]) / (this._times[a + 1] - this._times[a]);switch (this._blendType) {case e.BLENDTYPES.CUBIC:
            c = t.scurve3(c);break;case e.BLENDTYPES.QUINTIC:
            c = t.scurve5(c);}this.setCurrentSample(a, c, o), this._lastStartFrame = a;
      }
    }
  }, e;
}(goo.MathUtils), goo.TransformChannel = function (t, e, n) {
  "use strict";

  function o(e, n, o, i, r, a) {
    if (t.call(this, e, n, a), o.length / 4 !== n.length || i.length / 3 !== n.length || r.length / 3 !== n.length) throw new Error("All provided arrays must be the same length (accounting for type)! Channel: " + e);this._rotations = new Float32Array(o), this._translations = new Float32Array(i), this._scales = new Float32Array(r);
  }var i = new n(),
      r = new n();return o.prototype = Object.create(t.prototype), o.prototype.createStateDataObject = function () {
    return new e();
  }, o.prototype.setCurrentSample = function (t, e, o) {
    var a = o,
        s = 4 * t,
        c = 3 * t,
        p = 4 * (t + 1),
        l = 3 * (t + 1);return 0 === e ? (a._rotation.x = this._rotations[s + 0], a._rotation.y = this._rotations[s + 1], a._rotation.z = this._rotations[s + 2], a._rotation.w = this._rotations[s + 3], a._translation.x = this._translations[c + 0], a._translation.y = this._translations[c + 1], a._translation.z = this._translations[c + 2], a._scale.x = this._scales[c + 0], a._scale.y = this._scales[c + 1], void (a._scale.z = this._scales[c + 2])) : 1 === e ? (a._rotation.x = this._rotations[p + 0], a._rotation.y = this._rotations[p + 1], a._rotation.z = this._rotations[p + 2], a._rotation.w = this._rotations[p + 3], a._translation.x = this._translations[l + 0], a._translation.y = this._translations[l + 1], a._translation.z = this._translations[l + 2], a._scale.x = this._scales[l + 0], a._scale.y = this._scales[l + 1], void (a._scale.z = this._scales[l + 2])) : (a._rotation.x = this._rotations[s + 0], a._rotation.y = this._rotations[s + 1], a._rotation.z = this._rotations[s + 2], a._rotation.w = this._rotations[s + 3], i.x = this._rotations[p + 0], i.y = this._rotations[p + 1], i.z = this._rotations[p + 2], i.w = this._rotations[p + 3], a._rotation.equals(i) || (n.slerp(a._rotation, i, e, r), a._rotation.set(r)), a._translation.setDirect((1 - e) * this._translations[c + 0] + e * this._translations[l + 0], (1 - e) * this._translations[c + 1] + e * this._translations[l + 1], (1 - e) * this._translations[c + 2] + e * this._translations[l + 2]), void a._scale.setDirect((1 - e) * this._scales[c + 0] + e * this._scales[l + 0], (1 - e) * this._scales[c + 1] + e * this._scales[l + 1], (1 - e) * this._scales[c + 2] + e * this._scales[l + 2]));
  }, o.prototype.getData = function (t, n) {
    var o = n ? n : new e();return this.setCurrentSample(t, 0, o), o;
  }, o;
}(goo.AbstractAnimationChannel, goo.TransformData, goo.Quaternion), goo.JointData = function (t) {
  "use strict";

  function e(e) {
    t.call(this, e), this._jointIndex = e ? e._jointIndex : 0;
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.prototype.set = function (e) {
    t.prototype.set.call(this, e), this._jointIndex = e._jointIndex;
  }, e.prototype.blend = function (n, o, i) {
    var r = i;return r ? r instanceof e && (r._jointIndex = this._jointIndex) : (r = new e(), r._jointIndex = this._jointIndex), t.prototype.blend.call(this, n, o, r);
  }, e.prototype.clone = function () {
    return new e(this);
  }, e;
}(goo.TransformData), goo.JointChannel = function (t, e) {
  "use strict";

  function n(e, n, o, i, r, a, s) {
    t.call(this, n, o, i, r, a, s), this._jointName = n, this._jointIndex = e;
  }return n.prototype = Object.create(t.prototype), n.JOINT_CHANNEL_NAME = "_jnt", n.prototype.createStateDataObject = function () {
    return new e();
  }, n.prototype.setCurrentSample = function (e, n, o) {
    t.prototype.setCurrentSample.call(this, e, n, o), o._jointIndex = this._jointIndex;
  }, n.prototype.getData = function (n, o) {
    var i = o ? o : new e();return t.prototype.getData.call(this, n, i), i._jointIndex = this._jointIndex, i;
  }, n;
}(goo.TransformChannel, goo.JointData), goo.ManagedTransformSource = function (t, e, n, o, i, r, a) {
  "use strict";

  function s(t) {
    a.call(this), this._sourceName = t ? t : null, this._data = {};
  }return s.prototype = Object.create(a.prototype), s.prototype.constructor = s, s.prototype.setTranslation = function (t, e) {
    var n = this._data[t];n instanceof o && n._translation.set(e);
  }, s.prototype.getTranslation = function (t, e) {
    var n = this._data[t];return n instanceof o && (e = e || new i(), e.set(n._translation)), e;
  }, s.prototype.setScale = function (t, e) {
    var n = this._data[t];n instanceof o && n._scale.set(e);
  }, s.prototype.getScale = function (t, e) {
    var n = this._data[t];return n instanceof o && (e = e || new i(), e.set(n._scale)), e;
  }, s.prototype.setRotation = function (t, e) {
    var n = this._data[t];n instanceof o && n._rotation.set(e);
  }, s.prototype.getRotation = function (t, e) {
    var n = this._data[t];return n instanceof o && (e = e || new r(), e.set(n._rotation)), e;
  }, s.prototype.initFromClip = function (t, e, n) {
    if ("Include" === e && n && n.length) for (var o = 0, i = n.length; i > o; o++) {
      var r = n[o],
          a = t.findChannelByName(r);if (a) {
        var s = a.getData(0);this._data[r] = s;
      } else console.error("Channel not in clip: " + r);
    } else for (var o = 0, i = t._channels.length; i > o; o++) {
      var a = t._channels[o],
          r = a._channelName;if ("Exclude" === e && n && n.length && n.indexOf(r) > -1) {
        var s = a.getData(0);this._data[r] = s;
      }
    }
  }, s.prototype.getChannelData = function (t) {
    return this._data[t];
  }, s.prototype.getSourceData = function () {
    return this._data;
  }, s.prototype.clone = function () {
    var t = {};for (var e in this._data) {
      t[e] = this._data[e].clone();
    }return new s(this._sourceName, t);
  }, s;
}(goo.JointChannel, goo.JointData, goo.JointChannel, goo.JointData, goo.Vector3, goo.Quaternion, goo.Source), goo.FrozenClipSource = function (t) {
  "use strict";

  function e(e, n) {
    t.call(this), this._source = e, this._time = n;
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.prototype.getSourceData = function () {
    return this._source.getSourceData();
  }, e.prototype.resetClips = function () {
    this._source.resetClips(0);
  }, e.prototype.setTime = function () {
    return this._source.setTime(this._time), !0;
  }, e.prototype.clone = function () {
    var t = new e(this._source.clone(), this._time);return t;
  }, e;
}(goo.Source), goo.AnimationClip = function () {
  "use strict";

  function t(t, e) {
    this._name = t, this._channels = e || [], this._maxTime = -1, this.updateMaxTimeIndex();
  }return t.prototype.update = function (t, e) {
    for (var n = 0, o = this._channels.length; o > n; ++n) {
      var i = this._channels[n],
          r = e.getApplyTo(i);i.updateSample(t, r);
    }
  }, t.prototype.addChannel = function (t) {
    this._channels.push(t), this.updateMaxTimeIndex();
  }, t.prototype.removeChannel = function (t) {
    var e = this._channels.indexOf(t);return e >= 0 ? (this._channels.splice(e, 1), this.updateMaxTimeIndex(), !0) : !1;
  }, t.prototype.findChannelByName = function (t) {
    for (var e = 0, n = this._channels.length; n > e; ++e) {
      var o = this._channels[e];if (t === o._channelName) return o;
    }return null;
  }, t.prototype.updateMaxTimeIndex = function () {
    this._maxTime = -1;for (var t, e = 0; e < this._channels.length; e++) {
      var n = this._channels[e];t = n.getMaxTime(), t > this._maxTime && (this._maxTime = t);
    }
  }, t.prototype.toString = function () {
    return this._name + ": " + this._channels.map(function (t) {
      return t._channelName;
    });
  }, t;
}(), goo.InterpolatedFloatChannel = function (t, e) {
  "use strict";

  function n(e, n, o, i) {
    t.call(this, e, n, i), this._values = o ? o.slice(0) : null;
  }return n.prototype = Object.create(t.prototype), n.prototype.createStateDataObject = function () {
    return [0];
  }, n.prototype.setCurrentSample = function (t, n, o) {
    o[0] = e.lerp(n, this._values[t], this._values[t + 1]);
  }, n.prototype.getData = function (t, e) {
    var n = e || [];return n[0] = this._values[t], n;
  }, n;
}(goo.AbstractAnimationChannel, goo.MathUtils), goo.TriggerData = function () {
  "use strict";

  function t() {
    this._currentTriggers = [], this._currentIndex = -1, this.armed = !1;
  }return t.prototype.arm = function (t, e) {
    if (null === e || 0 === e.length) this._currentTriggers.length = 0, this.armed = !1;else if (t !== this._currentIndex) {
      this._currentTriggers.length = 0;for (var n = 0, o = e.length; o > n; n++) {
        e[n] && "" !== e[n] && this._currentTriggers.push(e[n]);
      }this.armed = !0;
    }this._currentIndex = t;
  }, t;
}(), goo.TriggerChannel = function (t, e) {
  "use strict";

  function n(e, n, o, i) {
    t.call(this, e, n, i), this._keys = o ? o.slice(0) : null, this.guarantee = !1;
  }return n.prototype = Object.create(t.prototype), n.prototype.createStateDataObject = function () {
    return new e();
  }, n.prototype.setCurrentSample = function (t, e, n) {
    var o = n._currentIndex,
        i = 1 !== e ? t : t + 1;if (o !== i && this.guarantee) {
      var r = [];if (o > i) {
        for (var a = o + 1; a < this._keys.length; a++) {
          r.push(this._keys[a]);
        }o = -1;
      }for (var a = o + 1; i >= a; a++) {
        r.push(this._keys[a]);
      }n.arm(i, r);
    } else n.arm(i, [this._keys[i]]);
  }, n;
}(goo.AbstractAnimationChannel, goo.TriggerData), goo.AbstractState = function () {
  "use strict";

  function t() {
    this._globalStartTime = 0, this.onFinished = null;
  }return t.prototype.update = function () {}, t.prototype.postUpdate = function () {}, t.prototype.getCurrentSourceData = function () {}, t.prototype.resetClips = function (t) {
    this._globalStartTime = t;
  }, t.prototype.shiftClipTime = function (t) {
    this._globalStartTime += t;
  }, t;
}(), goo.AbstractTransitionState = function (t, e, n) {
  "use strict";

  function o() {
    t.call(this), this._sourceState = null, this._targetState = null, this._percent = 0, this._sourceData = null, this._fadeTime = 0, this._blendType = o.BLENDTYPES.LINEAR;
  }return o.prototype = Object.create(t.prototype), o.prototype.constructor = o, o.BLENDTYPES = {}, o.BLENDTYPES.LINEAR = "Linear", o.BLENDTYPES.CUBIC = "SCurve3", o.BLENDTYPES.QUINTIC = "SCurve5", o.prototype.getCurrentLoop = function () {
    return 0;
  }, o.prototype.update = function (t) {
    var e = t - this._globalStartTime;if (e > this._fadeTime && this.onFinished) return void this.onFinished();var i = e / this._fadeTime;switch (this._blendType) {case o.BLENDTYPES.CUBIC:
        this._percent = n.scurve3(i);break;case o.BLENDTYPES.QUINTIC:
        this._percent = n.scurve5(i);break;default:
        this._percent = i;}
  }, o.prototype.readFromConfig = function (t) {
    t && (void 0 !== t.fadeTime && (this._fadeTime = t.fadeTime), void 0 !== t.blendType && (this._blendType = t.blendType));
  }, o.prototype.getCurrentSourceData = function () {
    var t = this._sourceState ? this._sourceState.getCurrentSourceData() : null,
        n = this._targetState ? this._targetState.getCurrentSourceData() : null;return this._sourceData || (this._sourceData = {}), e.combineSourceData(t, n, this._percent, this._sourceData);
  }, o.prototype.isValid = function (t, e) {
    var n = e - this._sourceState._globalStartTime,
        o = t[0],
        i = t[1];return 0 >= o ? 0 >= i ? !0 : i >= n : 0 >= i ? n >= o : i >= o ? n >= o && i >= n : n >= o || i >= n;
  }, o.prototype.resetClips = function (e) {
    t.prototype.resetClips.call(this, e), this._percent = 0;
  }, o.prototype.shiftClipTime = function (e) {
    t.prototype.shiftClipTime.call(this, e);
  }, o.prototype.setTimeScale = function (t) {
    this._sourceState && this._sourceState.setTimeScale(t), this._targetState && this._targetState.setTimeScale(t);
  }, o;
}(goo.AbstractState, goo.BinaryLerpSource, goo.MathUtils), goo.FadeTransitionState = function (t) {
  "use strict";

  function e() {
    t.call(this);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.prototype.update = function (e) {
    t.prototype.update.call(this, e), this._sourceState && this._sourceState.update(e), this._targetState && this._targetState.update(e);
  }, e.prototype.getCurrentLoop = function () {
    return this._targetState.getCurrentLoop();
  }, e.prototype.postUpdate = function () {
    this._sourceState && this._sourceState.postUpdate(), this._targetState && this._targetState.postUpdate();
  }, e.prototype.resetClips = function (e) {
    t.prototype.resetClips.call(this, e), this._targetState && this._targetState.resetClips(e);
  }, e.prototype.shiftClipTime = function (e) {
    t.prototype.shiftClipTime.call(this, e), this._targetState && this._targetState.shiftClipTime(e), this._sourceState && this._sourceState.shiftClipTime(e);
  }, e;
}(goo.AbstractTransitionState), goo.SyncFadeTransitionState = function (t) {
  "use strict";

  function e() {
    t.call(this);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.prototype.resetClips = function (e) {
    t.prototype.resetClips.call(this, e), this._targetState.resetClips(this._sourceState._globalStartTime);
  }, e.prototype.shiftClipTime = function (e) {
    t.prototype.shiftClipTime.call(this, e), this._targetState.shiftClipTime(this._sourceState._globalStartTime + e), this._sourceState.shiftClipTime(e);
  }, e;
}(goo.FadeTransitionState), goo.FrozenTransitionState = function (t) {
  "use strict";

  function e() {
    t.call(this);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.prototype.update = function (e) {
    t.prototype.update.call(this, e), this._targetState && this._targetState.update(e);
  }, e.prototype.postUpdate = function () {
    this._targetState && this._targetState.postUpdate();
  }, e.prototype.resetClips = function (e) {
    t.prototype.resetClips.call(this, e), this._targetState.resetClips(e);
  }, e.prototype.shiftClipTime = function (e) {
    t.prototype.shiftClipTime.call(this, e), this._targetState.shiftClipTime(e);
  }, e;
}(goo.AbstractTransitionState), goo.SteadyState = function (t) {
  "use strict";

  function e(e) {
    t.call(this), this.id = null, this._name = e, this._transitions = {}, this._sourceTree = null;
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.prototype.setClipSource = function (t) {
    this._sourceTree = t;
  }, e.prototype.update = function (t) {
    this._sourceTree.setTime(t) || this.onFinished && this.onFinished();
  }, e.prototype.getCurrentSourceData = function () {
    return this._sourceTree.getSourceData();
  }, e.prototype.getCurrentLoop = function () {
    return this._sourceTree.currentLoop;
  }, e.prototype.resetClips = function (e) {
    t.prototype.resetClips.call(this, e), this._sourceTree.resetClips(e);
  }, e.prototype.shiftClipTime = function (e) {
    t.prototype.shiftClipTime.call(this, e), this._sourceTree.shiftClipTime(e);
  }, e.prototype.setTimeScale = function (t) {
    this._sourceTree.setTimeScale(t);
  }, e.prototype.clone = function () {
    var t = new e(this._name);for (var n in this._transitions) {
      t._transitions[n] = this._transitions[n];
    }return t._sourceTree = this._sourceTree.clone(), t;
  }, e;
}(goo.AbstractState), goo.LayerLerpBlender = function (t) {
  "use strict";

  function e() {
    this._blendWeight = null, this._layerA = null, this._layerB = null;
  }return e.prototype.getBlendedSourceData = function () {
    var e = this._layerA.getCurrentSourceData(),
        n = this._layerB._currentState ? this._layerB._currentState.getCurrentSourceData() : null;return t.combineSourceData(e, n, this._blendWeight);
  }, e;
}(goo.BinaryLerpSource), goo.AnimationLayer = function (t, e, n, o, i, r, a) {
  "use strict";

  function s(t, e) {
    this.id = e, this._name = t, this._steadyStates = {}, this._currentState = null, this._layerBlender = new i(), this._transitions = {}, this._transitionStates = {};
  }return s.BASE_LAYER_NAME = "-BASE_LAYER-", s.prototype.getStates = function () {
    return Object.keys(this._steadyStates);
  }, s.prototype.setState = function (t, e) {
    this._steadyStates[t] = e;
  }, s.prototype.setBlendWeight = function (t) {
    this._layerBlender && (this._layerBlender._blendWeight = a.clamp(t, 0, 1));
  }, s.prototype.getTransitions = function () {
    var t;if (t = this._currentState ? Object.keys(this._currentState._transitions) : [], this._transitions) for (var e in this._transitions) {
      -1 === t.indexOf(e) && t.push(e);
    }return t.sort(), t;
  }, s.prototype.update = function (t) {
    this._currentState && this._currentState.update("undefined" != typeof t ? t : r.time);
  }, s.prototype.postUpdate = function () {
    this._currentState && this._currentState.postUpdate();
  }, s.prototype.transitionTo = function (t, e, n) {
    e = "undefined" != typeof e ? e : r.time;var i,
        a = this._currentState;if (this._steadyStates[t] === a) return !1;if (!this._steadyStates[t]) return !1;if (a && a._transitions && (i = a._transitions[t] || a._transitions["*"]), !i && this._transitions && (i = this._transitions[t] || this._transitions["*"]), a instanceof o && i) {
      var s = this._getTransitionByType(i.type);return this._doTransition(s, a, this._steadyStates[t], i, e, n), !0;
    }if (!a && (i = this._transitions[t])) {
      var s = this._getTransitionByType(i.type);if (s) return this._doTransition(s, null, this._steadyStates[t], i, e, n), !0;
    }return !1;
  }, s.prototype._doTransition = function (t, e, n, o, i, r) {
    if (e) {
      t._sourceState = e;var a = o.timeWindow || [-1, -1];if (!t.isValid(a, i)) return void console.warn("State not in allowed time window");e.onFinished = null;
    }t._targetState = n, t.readFromConfig(o), this.setCurrentState(t, !0, i, r);
  }, s.prototype.setCurrentState = function (t, e, n, i) {
    n = "undefined" != typeof n ? n : r.time, this._currentState = t, t && (e && t.resetClips(n), t.onFinished = function () {
      this.setCurrentState(t._targetState || null, !1, void 0, i), t instanceof o && i instanceof Function && i(), this.update();
    }.bind(this));
  }, s.prototype.getCurrentState = function () {
    return this._currentState;
  }, s.prototype.setCurrentStateById = function (t, e, n, o) {
    var i = this.getStateById(t);this.setCurrentState(i, e, n, o);
  }, s.prototype.getStateById = function (t) {
    return this._steadyStates[t];
  }, s.prototype.getStateByName = function (t) {
    for (var e in this._steadyStates) {
      var n = this._steadyStates[e];if (n._name === t) return this._steadyStates[e];
    }
  }, s.prototype.setCurrentStateByName = function (t, e, n) {
    if (t) {
      var o = this.getStateByName(t);if (o) return this.setCurrentState(o, e, n), !0;console.warn("unable to find SteadyState named: " + t);
    }return !1;
  }, s.prototype.getCurrentSourceData = function () {
    return this._layerBlender ? this._layerBlender.getBlendedSourceData() : this._currentState ? this._currentState.getCurrentSourceData() : null;
  }, s.prototype.updateLayerBlending = function (t) {
    this._layerBlender && (this._layerBlender._layerA = t, this._layerBlender._layerB = this);
  }, s.prototype.clearCurrentState = function () {
    this.setCurrentState(null);
  }, s.prototype.resetClips = function (t) {
    this._currentState && this._currentState.resetClips("undefined" != typeof t ? t : r.time);
  }, s.prototype.shiftClipTime = function (t) {
    this._currentState && this._currentState.shiftClipTime("undefined" != typeof t ? t : 0);
  }, s.prototype.setTimeScale = function (t) {
    this._currentState && this._currentState.setTimeScale(t);
  }, s.prototype._getTransitionByType = function (o) {
    if (this._transitionStates[o]) return this._transitionStates[o];var i;switch (o) {case "Fade":
        i = new t();break;case "SyncFade":
        i = new e();break;case "Frozen":
        i = new n();break;default:
        console.log("Defaulting to frozen transition type"), i = new n();}return this._transitionStates[o] = i;
  }, s.prototype.clone = function () {
    var t = new s(this._name);for (var e in this._steadyStates) {
      t._steadyStates[e] = this._steadyStates[e].clone(), this._steadyStates[e] === this._currentState && (t._currentState = t._steadyStates[e]);
    }for (var e in this._transitions) {
      t._transitions[e] = this._transitions[e];
    }for (var e in this._transitionStates) {
      t._transitionStates[e] = new this._transitionStates[e].constructor();
    }return t;
  }, s;
}(goo.FadeTransitionState, goo.SyncFadeTransitionState, goo.FrozenTransitionState, goo.SteadyState, goo.LayerLerpBlender, goo.World, goo.MathUtils), goo.AnimationComponent = function (t, e, n, o, i, r) {
  "use strict";

  function a(e) {
    t.apply(this, arguments), this.type = "AnimationComponent", this.layers = [], this.floats = {}, this._updateRate = 1 / 60, this._lastUpdate = 0, this._triggerCallbacks = {};var o = new n(n.BASE_LAYER_NAME);this.layers.push(o), this._skeletonPose = e, this.paused = !1, this.lastTimeOfPause = -1;
  }return a.type = "AnimationComponent", a.prototype = Object.create(t.prototype), a.prototype.constructor = a, a.prototype.transitionTo = function (t, e, n) {
    return this.layers[0].transitionTo(t, void 0, n) ? !0 : e ? this.layers[0].setCurrentStateById(t, !0, void 0, n) : !1;
  }, a.prototype.getStates = function () {
    return this.layers[0].getStates();
  }, a.prototype.getCurrentState = function () {
    return this.layers[0].getCurrentState();
  }, a.prototype.getTransitions = function () {
    return this.layers[0].getTransitions();
  }, a.prototype.update = function (t) {
    if (!this.paused) {
      if (t = "undefined" != typeof t ? t : e.time, 0 !== this._updateRate) {
        if (t > this._lastUpdate && t - this._lastUpdate < this._updateRate) return;this._lastUpdate = t - (t - this._lastUpdate) % this._updateRate;
      }for (var n = 0, o = this.layers.length; o > n; n++) {
        this.layers[n].update(t);
      }
    }
  }, a.prototype.apply = function (t) {
    var e = this.getCurrentSourceData();if (e) {
      for (var n = this._skeletonPose, a = Object.keys(e), s = 0, c = a.length; c > s; s++) {
        var p = a[s],
            l = e[p];if (l instanceof o) n && l._jointIndex >= 0 && l.applyTo(n._localTransforms[l._jointIndex]);else if (l instanceof i) t && (l.applyTo(t.transform), t.updateTransform(), this._updateWorldTransform(t));else if (l instanceof r) {
          if (l.armed) {
            for (var s = 0, u = l._currentTriggers.length; u > s; s++) {
              var h = this._triggerCallbacks[l._currentTriggers[s]];if (h && h.length) for (var _ = 0, f = h.length; f > _; _++) {
                h[_]();
              }
            }l.armed = !1;
          }
        } else l instanceof Array && (this.floats[p] = l[0]);
      }n && n.updateTransforms();
    }
  }, a.prototype._updateWorldTransform = function (t) {
    t.updateWorldTransform();for (var e = 0; e < t.children.length; e++) {
      this._updateWorldTransform(t.children[e]);
    }
  }, a.prototype.postUpdate = function () {
    for (var t = 0, e = this.layers.length; e > t; t++) {
      this.layers[t].postUpdate();
    }
  }, a.prototype.getCurrentSourceData = function () {
    if (0 === this.layers.length) return [];var t = this.layers.length - 1;this.layers[0]._layerBlender = null;for (var e = 0; t > e; e++) {
      this.layers[e + 1].updateLayerBlending(this.layers[e]);
    }return this.layers[t].getCurrentSourceData();
  }, a.prototype.addLayer = function (t, e) {
    isNaN(e) ? this.layers.push(t) : this.layers.splice(e, 0, t);
  }, a.prototype.resetClips = function (t) {
    for (var e = 0; e < this.layers.length; e++) {
      this.layers[e].resetClips(t);
    }
  }, a.prototype.shiftClipTime = function (t) {
    for (var e = 0; e < this.layers.length; e++) {
      this.layers[e].shiftClipTime(t);
    }
  }, a.prototype.setTimeScale = function (t) {
    for (var e = 0; e < this.layers.length; e++) {
      this.layers[e].setTimeScale(t);
    }
  }, a.prototype.pause = function () {
    this.paused || (this.lastTimeOfPause = e.time, this.paused = !0);
  }, a.prototype.stop = function () {
    this._skeletonPose && this._skeletonPose.setToBindPose(), this.paused = !0, this.lastTimeOfPause = -1;
  }, a.prototype.resume = function () {
    (this.paused || -1 === this.lastTimeOfPause) && (-1 === this.lastTimeOfPause ? this.resetClips(e.time) : this.shiftClipTime(e.time - this.lastTimeOfPause)), this.paused = !1;
  }, a.prototype.clone = function () {
    var t = new a();return t.layers = this.layers.map(function (t) {
      return t.clone();
    }), t;
  }, a;
}(goo.Component, goo.World, goo.AnimationLayer, goo.JointData, goo.TransformData, goo.TriggerData), goo.AnimationClipHandler = function (t, e, n, o, i, r, a) {
  "use strict";

  function s() {
    t.apply(this, arguments);
  }return s.prototype = Object.create(t.prototype), s.prototype.constructor = s, t._registerClass("clip", s), s.prototype._create = function () {
    return new e();
  }, s.prototype._update = function (e, n, o) {
    var i = this;return t.prototype._update.call(this, e, n, o).then(function (t) {
      return t ? i.loadObject(n.binaryRef, o).then(function (e) {
        if (!e) throw new Error("Binary clip data was empty");return i._updateAnimationClip(n, e, t);
      }) : t;
    });
  }, s.prototype._updateAnimationClip = function (t, e, s) {
    if (s._channels = [], t.channels) for (var c = Object.keys(t.channels), p = 0; p < c.length; p++) {
      var l,
          u = t.channels[c[p]],
          h = a.getTypedArray(e, u.times),
          _ = u.blendType,
          f = u.type;switch (f) {case "Joint":case "Transform":
          var y, d, m;y = a.getTypedArray(e, u.rotationSamples), d = a.getTypedArray(e, u.translationSamples), m = a.getTypedArray(e, u.scaleSamples), l = "Joint" === f ? new n(u.jointIndex, u.name, h, y, d, m, _) : new o(u.name, h, y, d, m, _);break;case "FloatLERP":
          l = new i(u.name, h, u.values, _);break;case "Trigger":
          l = new r(u.name, h, u.keys), l.guarantee = !!u.guarantee;break;default:
          console.warn("Unhandled channel type: " + u.type);continue;}s.addChannel(l);
    }return s;
  }, s;
}(goo.ConfigHandler, goo.AnimationClip, goo.JointChannel, goo.TransformChannel, goo.InterpolatedFloatChannel, goo.TriggerChannel, goo.ArrayUtils), goo.AnimationComponentHandler = function (t, e, n) {
  "use strict";

  function o() {
    t.apply(this, arguments), this._type = "AnimationComponent";
  }return o.prototype = Object.create(t.prototype), o.prototype.constructor = o, t._registerClass("animation", o), o.prototype._create = function () {
    return new e();
  }, o.prototype.update = function (e, o, i) {
    var r = this;return t.prototype.update.call(this, e, o, i).then(function (t) {
      if (t) {
        var e,
            a = [],
            s = o.poseRef;s && (e = r._load(s, i).then(function (e) {
          t._skeletonPose = e;
        }), a.push(e));var c = o.layersRef;return c && (e = r._load(c, i).then(function (e) {
          t.layers = e, t._layersId = c;
        }), a.push(e)), n.all(a).then(function () {
          return t;
        });
      }
    });
  }, o;
}(goo.ComponentHandler, goo.AnimationComponent, goo.rsvp), goo.AnimationLayersHandler = function (t, e, n, o, i, r, a) {
  "use strict";

  function s() {
    t.apply(this, arguments);
  }return s.prototype = Object.create(t.prototype), s.prototype.constructor = s, t._registerClass("animation", s), s.prototype._create = function (t) {
    var e = [];return this._objects.set(t, e), e;
  }, s.prototype._setInitialState = function (t, e) {
    if (e) {
      var n = t.getStateById(e);t._currentState !== n && t.setCurrentStateById(e, !0);
    } else t.setCurrentState();
  }, s.prototype._update = function (e, n, o) {
    var i = this;return t.prototype._update.call(this, e, n, o).then(function (t) {
      if (t) {
        var e = [],
            s = 0;return a.forEach(n.layers, function (n) {
          e.push(i._parseLayer(n, t[s++], o));
        }, null, "sortValue"), r.all(e).then(function (e) {
          t.length = e.length;for (var n = 0; n < e.length; n++) {
            t[n] = e[n];
          }return t;
        });
      }
    });
  }, s.prototype._parseLayer = function (t, n, o) {
    var i = this;n ? n._name = t.name : n = new e(t.name), n.id = t.id, n._transitions = a.deepClone(t.transitions), n._layerBlender && (void 0 !== t.blendWeight ? n._layerBlender._blendWeight = t.blendWeight : n._layerBlender._blendWeight = 1);var s = [];return a.forEach(t.states, function (t) {
      s.push(i.loadObject(t.stateRef, o).then(function (t) {
        n.setState(t.id, t);
      }));
    }, null, "sortValue"), r.all(s).then(function () {
      return i._setInitialState(n, t.initialStateRef), n;
    });
  }, s;
}(goo.ConfigHandler, goo.AnimationLayer, goo.FadeTransitionState, goo.SyncFadeTransitionState, goo.FrozenTransitionState, goo.rsvp, goo.ObjectUtils), goo.AnimationStateHandler = function (t, e, n, o, i, r, a, s, c) {
  "use strict";

  function p() {
    t.apply(this, arguments);
  }return p.prototype = Object.create(t.prototype), p.prototype.constructor = p, t._registerClass("animstate", p), p.prototype._create = function (t) {
    var n = new e();return this._objects.set(t, n), n;
  }, p.prototype._update = function (e, n, o) {
    var i = this;return t.prototype._update.call(this, e, n, o).then(function (t) {
      return t ? (t._name = n.name, t.id = n.id, t._transitions = c.deepClone(n.transitions), i._parseClipSource(n.clipSource, t._sourceTree, o).then(function (e) {
        return t._sourceTree = e, t;
      })) : void 0;
    });
  }, p.prototype._parseClipSource = function (t, e, c) {
    switch (t.type) {case "Clip":
        return this.loadObject(t.clipRef, c).then(function (o) {
          e && e instanceof n ? (e._clip = o, e.setFilter(t.filter, t.channels)) : e = new n(o, t.filter, t.channels), void 0 !== t.loopCount && (e._clipInstance._loopCount = +t.loopCount), void 0 !== t.timeScale && (e._clipInstance._timeScale = t.timeScale), e._startTime = t.startTime || 0;for (var i = 1 / 0, r = 0; r < o._channels.length; r++) {
            for (var a = o._channels[r], s = 0; s < a._times.length; s++) {
              var c = a._times[s];i > c && (i = c);
            }
          }return e._startTime = Math.max(e._startTime, i), e;
        });case "Managed":
        return e && e instanceof o || (e = new o()), t.clipRef ? this.loadObject(t.clipRef, c).then(function (n) {
          return e.initFromClip(n, t.filter, t.channels), e;
        }) : s.resolve(e);case "Lerp":
        var p = [this._parseClipSource(t.clipSourceA, null, c), this._parseClipSource(t.clipSourceB, null, c)];return a.all(p).then(function (n) {
          return e = new i(n[0], n[1]), t.blendWeight && (e.blendWeight = t.blendWeight), e;
        });case "Frozen":
        return this._parseClipSource(t.clipSource).then(function (n) {
          return e && e instanceof r ? (e._source = n, e._time = t.frozenTime || 0) : e = new r(n, t.frozenTime || 0), e;
        });default:
        return console.error("Unable to parse clip source"), s.resolve();}
  }, p;
}(goo.ConfigHandler, goo.SteadyState, goo.ClipSource, goo.ManagedTransformSource, goo.BinaryLerpSource, goo.FrozenClipSource, goo.rsvp, goo.PromiseUtils, goo.ObjectUtils), goo.SkeletonHandler = function (t, e, n, o, i, r) {
  "use strict";

  function a() {
    t.apply(this, arguments);
  }return a.prototype = Object.create(t.prototype), a.prototype.constructor = a, t._registerClass("skeleton", a), a.prototype._update = function (t, a) {
    if (!this._objects.has(t)) {
      if (!a) return i.resolve();var s = [];r.forEach(a.joints, function (t) {
        var n = new e(t.name);n._index = t.index, n._parentIndex = t.parentIndex, n._inverseBindPose.matrix.data.set(t.inverseBindPose), s.push(n);
      }, null, "index");var c = new n(a.name, s),
          p = new o(c);p.setToBindPose(), this._objects.set(t, p);
    }return i.resolve(this._objects.get(t));
  }, a;
}(goo.ConfigHandler, goo.Joint, goo.Skeleton, goo.SkeletonPose, goo.PromiseUtils, goo.ObjectUtils), goo.AnimationHandlers = function () {}(goo.AnimationClipHandler, goo.AnimationComponentHandler, goo.AnimationLayersHandler, goo.AnimationStateHandler, goo.SkeletonHandler), goo.AnimationSystem = function (t, e) {
  "use strict";

  function n() {
    t.call(this, "AnimationSystem", ["AnimationComponent"]);
  }return n.prototype = Object.create(t.prototype), n.prototype.process = function () {
    for (var t = 0; t < this._activeEntities.length; t++) {
      var n = this._activeEntities[t],
          o = n.animationComponent;o.update(e.time), o.apply(n.transformComponent), o.postUpdate();
    }
  }, n.prototype.pause = function () {
    this.passive = !0;for (var t = 0; t < this._activeEntities.length; t++) {
      this._activeEntities[t].animationComponent.pause();
    }
  }, n.prototype.resume = function () {
    this.passive = !1;for (var t = 0; t < this._activeEntities.length; t++) {
      var e = this._activeEntities[t];e.animationComponent.resume();
    }
  }, n.prototype.play = n.prototype.resume, n.prototype.stop = function () {
    this.passive = !0;for (var t = 0; t < this._activeEntities.length; t++) {
      var e = this._activeEntities[t];e.animationComponent.stop();
    }
  }, n;
}(goo.System, goo.World), "function" == typeof require && (define("goo/animationpack/Joint", [], function () {
  return goo.Joint;
}), define("goo/animationpack/Skeleton", [], function () {
  return goo.Skeleton;
}), define("goo/animationpack/SkeletonPose", [], function () {
  return goo.SkeletonPose;
}), define("goo/animationpack/clip/TransformData", [], function () {
  return goo.TransformData;
}), define("goo/animationpack/blendtree/Source", [], function () {
  return goo.Source;
}), define("goo/animationpack/blendtree/BinaryLerpSource", [], function () {
  return goo.BinaryLerpSource;
}), define("goo/animationpack/clip/AnimationClipInstance", [], function () {
  return goo.AnimationClipInstance;
}), define("goo/animationpack/blendtree/ClipSource", [], function () {
  return goo.ClipSource;
}), define("goo/animationpack/clip/AbstractAnimationChannel", [], function () {
  return goo.AbstractAnimationChannel;
}), define("goo/animationpack/clip/TransformChannel", [], function () {
  return goo.TransformChannel;
}), define("goo/animationpack/clip/JointData", [], function () {
  return goo.JointData;
}), define("goo/animationpack/clip/JointChannel", [], function () {
  return goo.JointChannel;
}), define("goo/animationpack/blendtree/ManagedTransformSource", [], function () {
  return goo.ManagedTransformSource;
}), define("goo/animationpack/blendtree/FrozenClipSource", [], function () {
  return goo.FrozenClipSource;
}), define("goo/animationpack/clip/AnimationClip", [], function () {
  return goo.AnimationClip;
}), define("goo/animationpack/clip/InterpolatedFloatChannel", [], function () {
  return goo.InterpolatedFloatChannel;
}), define("goo/animationpack/clip/TriggerData", [], function () {
  return goo.TriggerData;
}), define("goo/animationpack/clip/TriggerChannel", [], function () {
  return goo.TriggerChannel;
}), define("goo/animationpack/state/AbstractState", [], function () {
  return goo.AbstractState;
}), define("goo/animationpack/state/AbstractTransitionState", [], function () {
  return goo.AbstractTransitionState;
}), define("goo/animationpack/state/FadeTransitionState", [], function () {
  return goo.FadeTransitionState;
}), define("goo/animationpack/state/SyncFadeTransitionState", [], function () {
  return goo.SyncFadeTransitionState;
}), define("goo/animationpack/state/FrozenTransitionState", [], function () {
  return goo.FrozenTransitionState;
}), define("goo/animationpack/state/SteadyState", [], function () {
  return goo.SteadyState;
}), define("goo/animationpack/layer/LayerLerpBlender", [], function () {
  return goo.LayerLerpBlender;
}), define("goo/animationpack/layer/AnimationLayer", [], function () {
  return goo.AnimationLayer;
}), define("goo/animationpack/components/AnimationComponent", [], function () {
  return goo.AnimationComponent;
}), define("goo/animationpack/handlers/AnimationClipHandler", [], function () {
  return goo.AnimationClipHandler;
}), define("goo/animationpack/handlers/AnimationComponentHandler", [], function () {
  return goo.AnimationComponentHandler;
}), define("goo/animationpack/handlers/AnimationLayersHandler", [], function () {
  return goo.AnimationLayersHandler;
}), define("goo/animationpack/handlers/AnimationStateHandler", [], function () {
  return goo.AnimationStateHandler;
}), define("goo/animationpack/handlers/SkeletonHandler", [], function () {
  return goo.SkeletonHandler;
}), define("goo/animationpack/handlers/AnimationHandlers", [], function () {
  return goo.AnimationHandlers;
}), define("goo/animationpack/systems/AnimationSystem", [], function () {
  return goo.AnimationSystem;
}));

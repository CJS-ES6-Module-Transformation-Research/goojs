"use strict";

goo.SoundManager2Component = function (n) {
  "use strict";

  function o(n) {
    this.type = "SoundManager2Component", this.settings = n || {}, this.sounds = {};
  }return o.prototype = Object.create(n.prototype), o.prototype.addSound = function (n, o) {
    this.sounds[n] = o;
  }, o.prototype.playSound = function (n) {
    this.sounds[n].soundObject.play();
  }, o;
}(goo.Component), goo.SoundManager2System = function (n) {
  "use strict";

  function o(o) {
    n.call(this, "SoundManager2System", ["SoundManager2Component", "TransformComponent"]), o = o || {}, this.isReady = !1, window.soundManager ? window.soundManager.bind(this).setup({ url: "swf", onready: function onready() {
        this.isReady = !0;
      }, ontimeout: function ontimeout() {
        console.warn("Failed to load soundmanager");
      } }) : console.warn("SoundManager2System: soundManager global not found");
  }return o.prototype = Object.create(n.prototype), o.prototype.inserted = function (n) {
    for (var o = n.soundManager2Component, t = 0; t < o.sounds.length; t++) {
      var e = o.sounds[t],
          a = window.soundManager.createSound(e);e.soundObject = a;
    }
  }, o.prototype.deleted = function () {}, o.prototype.process = function () {}, o;
}(goo.System), "function" == typeof require && (define("goo/addons/soundmanager2pack/components/SoundManager2Component", [], function () {
  return goo.SoundManager2Component;
}), define("goo/addons/soundmanager2pack/systems/SoundManager2System", [], function () {
  return goo.SoundManager2System;
}));

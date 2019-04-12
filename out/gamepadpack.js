"use strict";

goo.GamepadComponent = function (t) {
  "use strict";

  function a(a) {
    t.apply(this, arguments), this.type = "GamepadComponent", this.buttonDownFunctions = {}, this.buttonUpFunctions = {}, this.buttonPressedFunctions = {}, this.leftStickFunction = null, this.rightStickFunction = null, this.gamepadIndex = a || 0;
  }return a.prototype = Object.create(t.prototype), a.prototype.constructor = a, a.prototype.setButtonDownFunction = function (t, a) {
    this.buttonDownFunctions[t] = a;
  }, a.prototype.setButtonUpFunction = function (t, a) {
    this.buttonUpFunctions[t] = a;
  }, a.prototype.setButtonPressedFunction = function (t, a) {
    this.buttonPressedFunctions[t] = a;
  }, a.prototype.setLeftStickFunction = function (t) {
    this.leftStickFunction = t;
  }, a.prototype.setRightStickFunction = function (t) {
    this.rightStickFunction = t;
  }, a;
}(goo.Component), goo.GamepadData = function (t, a) {
  "use strict";

  function n() {
    this.leftStickDirection = new t(), this.rightStickDirection = new t(), this.buttonData = {};for (var a = 20, n = 0; a > n; n++) {
      this.buttonData[n] = { pressed: !1, down: !1, value: 0 };
    }this.leftAmount = 0, this.rightAmount = 0;
  }return n.prototype.recalculateData = function (t) {
    this.recalculateSticks(t), this.recalculateButtons(t);
  }, n.prototype.resetData = function (t) {
    for (var a = t.buttons.length, n = 0; a > n; n++) {
      this.buttonData[n].pressed = !1;
    }
  }, n.prototype.recalculateButtons = function (t) {
    for (var a = t.buttons, n = a.length, e = 0; n > e; e++) {
      var o = a[e];1 === o ? this.buttonData[e].down = !0 : (this.buttonData[e].down === !0 && (this.buttonData[e].pressed = !0), this.buttonData[e].down = !1), this.buttonData[e].value = o;
    }
  }, n.prototype.recalculateSticks = function (t) {
    var a = t.axes,
        n = a[0],
        e = a[1];this.calculateStickDirection(this.leftStickDirection, n, e), this.leftAmount = this.calculateStickAmount(n, e);var o = a[2],
        i = a[3];this.calculateStickDirection(this.rightStickDirection, o, i), this.rightAmount = this.calculateStickAmount(o, i);
  }, n.prototype.calculateStickDirection = function (t, n, e) {
    t.setDirect(n, e);var o = t.length();o > a.EPSILON && t.scale(1 / o);
  }, n.prototype.calculateStickAmount = function (t, a) {
    return Math.max(Math.abs(t), Math.abs(a));
  }, n;
}(goo.Vector2, goo.MathUtils), goo.GamepadSystem = function (t, a) {
  "use strict";

  function n() {
    t.call(this, "GamepadSystem", ["GamepadComponent"]), this.gamepads = [], this.gamepadData = [];for (var n = 4, e = 0; n > e; e++) {
      this.gamepadData[e] = new a();
    }navigator.webkitGetGamepads ? this.updateGamepads = this.chromeGamepadUpdate : (this.updateGamepads = function () {}, window.addEventListener("gamepadconnected", function (t) {
      this.mozGamepadHandler(t, !0);
    }.bind(this), !1), window.addEventListener("gamepaddisconnected", function (t) {
      this.mozGamepadHandler(t, !1);
    }.bind(this), !1));
  }return n.prototype.checkGamepadMapping = function (t) {
    t.mapping ? "standard" !== t.mapping && console.warn("Non-standard mapping set on gamepad #" + t.index) : console.warn("No mapping set on gamepad #" + t.index);
  }, n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.prototype.mozGamepadHandler = function (t, a) {
    var n = t.gamepad;a ? (this.gamepads[n.index] = n, this.checkGamepadMapping(n)) : delete this.gamepads[n.index];
  }, n.prototype.chromeGamepadUpdate = function () {
    for (var t = navigator.webkitGetGamepads(), a = t.length, n = 0; a > n; n++) {
      var e = t[n];e && (this.gamepads[e.index] = e);
    }
  }, n.prototype.updateGamepadData = function () {
    this.updateGamepads();for (var t = this.gamepads.length, a = 0; t > a; a++) {
      var n = this.gamepads[a];n && this.gamepadData[n.index].recalculateData(n);
    }
  }, n.prototype.resetGamepadData = function () {
    for (var t = this.gamepads.length, a = 0; t > a; a++) {
      var n = this.gamepads[a];n && this.gamepadData[n.index].resetData(n);
    }
  }, n.prototype._processEntity = function (t) {
    var a = t.gamepadComponent,
        n = a.gamepadIndex,
        e = this.gamepadData[n],
        o = this.gamepads[n];if (o) {
      var i, s, p;a.leftStickFunction && (i = o.axes[0], s = o.axes[1], p = [i, s], a.leftStickFunction(t, e.leftStickDirection, e.leftAmount, p)), a.rightStickFunction && (i = o.axes[2], s = o.axes[3], p = [i, s], a.rightStickFunction(t, e.rightStickDirection, e.rightAmount, p));var c, r;for (c in a.buttonDownFunctions) {
        r = e.buttonData[c], r.down === !0 && a.buttonDownFunctions[c](t, r.value);
      }for (c in a.buttonUpFunctions) {
        r = e.buttonData[c], r.down === !1 && a.buttonUpFunctions[c](t, r.value);
      }for (c in a.buttonPressedFunctions) {
        r = e.buttonData[c], r.pressed === !0 && a.buttonPressedFunctions[c](t, r.value);
      }
    }
  }, n.prototype.process = function (t) {
    this.updateGamepadData();for (var a = t.length, n = 0; a > n; n++) {
      this._processEntity(t[n]);
    }this.resetGamepadData();
  }, n;
}(goo.System, goo.GamepadData), "function" == typeof require && (define("goo/addons/gamepadpack/GamepadComponent", [], function () {
  return goo.GamepadComponent;
}), define("goo/addons/gamepadpack/GamepadData", [], function () {
  return goo.GamepadData;
}), define("goo/addons/gamepadpack/GamepadSystem", [], function () {
  return goo.GamepadSystem;
}));

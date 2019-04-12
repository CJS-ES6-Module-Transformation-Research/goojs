"use strict";

goo.State = function (t, e) {
  "use strict";

  function n(t) {
    this.uuid = t, this._fsm = null, this.parent = null, this._actions = [], this._machines = [], this._transitions = {}, this.vars = {}, this.depth = 0, this.proxy = { getInputState: function (t) {
        return this._fsm.system.getInputState(t);
      }.bind(this), getTpf: function () {
        return this._fsm.entity._world.tpf;
      }.bind(this), getWorld: function () {
        return this._fsm.entity._world;
      }.bind(this), getTime: function () {
        return this._fsm.system.time;
      }.bind(this), getState: function () {
        return this;
      }.bind(this), getFsm: function () {
        return this._fsm;
      }.bind(this), getOwnerEntity: function () {
        return this._fsm && this._fsm.entity;
      }.bind(this), getEntityById: function (t) {
        return this._fsm.entity._world.by.id(t).first();
      }.bind(this), send: function (t) {
        t && "string" == typeof t && this._transitions[t] && this.requestTransition(this._transitions[t]);
      }.bind(this), addListener: function (t, e) {
        this._fsm._bus.addListener(t, e);
      }.bind(this), removeListener: function (t, e) {
        this._fsm._bus.removeListener(t, e);
      }.bind(this), defineVariable: function (t, e) {
        this.vars[t] = e;
      }.bind(this), removeVariable: function (t) {
        delete this.vars[t];
      }.bind(this), getVariable: function (t) {
        return void 0 !== this.vars[t] ? this.vars[t] : this._fsm.getVariable(t);
      }.bind(this), applyOnVariable: function (t, e) {
        void 0 !== this.vars[t] ? this.vars[t] = e(this.vars[t]) : this._fsm.applyOnVariable(t, e);
      }.bind(this), getEvalProxy: function () {
        return this._fsm.system.evalProxy;
      }.bind(this) };
  }return n.prototype.setRefs = function (t) {
    this._fsm = t;for (var e = 0; e < this._machines.length; e++) {
      var n = this._machines[e];n.setRefs(t);
    }
  }, n.prototype.resetDepth = function () {
    this.depth = 0;
  }, n.prototype.isCurrentState = function () {
    return this === this.parent.getCurrentState();
  }, n.prototype.requestTransition = function (t) {
    if (this.isCurrentState()) if (this.parent.asyncMode) this.transitionTarget = t;else {
      this.depth++;var n = this._fsm;if (this.depth > this.parent.maxLoopDepth) {
        var o = { entityId: n && n.entity ? n.entity.id : "", entityName: n && n.entity ? n.entity.name : "", machineName: this.parent ? this.parent.name : "", stateId: this.uuid, stateName: this.name };return o.error = "Exceeded max loop depth (" + this.parent.maxLoopDepth + ') in "' + [o.entityName, o.machineName, o.stateName].join('" / "') + '"', console.warn(o.error), void e.emit("goo.fsm.error", o);
      }t && this.parent.contains(t) && (this.parent.currentState.kill(), this.parent.setState(this.parent._states[t]));
    }
  }, n.prototype.setTransition = function (t, e) {
    this._transitions[t] = e;
  }, n.prototype.clearTransition = function (t) {
    delete this._transitions[t];
  }, n.prototype.enter = function () {
    e.emit("goo.fsm.enter", { entityId: this._fsm && this._fsm.entity ? this._fsm.entity.id : "", machineName: this.parent ? this.parent.name : "", stateId: this.uuid, stateName: this.name });for (var t = this.depth, n = 0; n < this._actions.length; n++) {
      if (this._actions[n].enter(this.proxy), this.depth > t) return;
    }for (var n = 0; n < this._machines.length; n++) {
      this._machines[n].enter();
    }
  }, n.prototype.update = function () {
    e.emit("goo.fsm.update", { entityId: this._fsm && this._fsm.entity ? this._fsm.entity.id : "", machineName: this.parent ? this.parent.name : "", stateId: this.uuid, stateName: this.name });var t = this.depth;if (this.parent.asyncMode) {
      for (var n = 0; n < this._actions.length; n++) {
        if (this._actions[n].update(this.proxy), this.transitionTarget) {
          var o = this.transitionTarget;return this.transitionTarget = null, o;
        }
      }for (var i, n = 0; n < this._machines.length; n++) {
        var r = this._machines[n];if (i = r.update()) return i;
      }
    } else {
      for (var n = 0; n < this._actions.length; n++) {
        if (this._actions[n].update(this.proxy), this.depth > t) return;
      }for (var n = 0; n < this._machines.length; n++) {
        this._machines[n].update();
      }
    }
  }, n.prototype.kill = function () {
    e.emit("goo.fsm.exit", { entityId: this._fsm && this._fsm.entity ? this._fsm.entity.id : "", machineName: this.parent ? this.parent.name : "", stateId: this.uuid, stateName: this.name });for (var t = 0; t < this._machines.length; t++) {
      this._machines[t].kill();
    }for (var t = 0; t < this._actions.length; t++) {
      this._actions[t].exit(this.proxy);
    }
  }, n.prototype.reset = function () {
    for (var t = 0; t < this._machines.length; t++) {
      this._machines[t].reset();
    }
  }, n.prototype.ready = function () {
    for (var t = 0; t < this._machines.length; t++) {
      this._machines[t].ready();
    }for (var t = 0; t < this._actions.length; t++) {
      this._actions[t].ready(this.proxy);
    }
  }, n.prototype.cleanup = function () {
    for (var t = 0; t < this._machines.length; t++) {
      this._machines[t].cleanup();
    }for (var t = 0; t < this._actions.length; t++) {
      this._actions[t].cleanup(this.proxy);
    }
  }, n.prototype.getAction = function (t) {
    if (!this._actions) return void 0;for (var e = 0; e < this._actions.length; e++) {
      var n = this._actions[e];if (void 0 !== t && n.id === t) return n;
    }return void 0;
  }, n.prototype.addAction = function (t) {
    this._actions[t.id] || (t.onCreate && t.onCreate(this.proxy), this._actions.push(t));
  }, n.prototype.recursiveRemove = function () {
    this.removeAllActions();for (var t = 0; t < this._machines.length; t++) {
      this._machines[t].recursiveRemove();
    }this._machines = [];
  }, n.prototype.removeAllActions = function () {
    for (var t = 0; t < this._actions.length; t++) {
      var e = this._actions[t];e.onDestroy && e.onDestroy(this.proxy);
    }this._actions = [];
  }, n.prototype.removeAction = function (e) {
    e.onDestroy && e.onDestroy(this.proxy), t.remove(this._actions, e);
  }, n.prototype.addMachine = function (t) {
    var e = this._machines.indexOf(t);-1 === e && (t._fsm = this._fsm, t.parent = this, this._machines.push(t));
  }, n.prototype.removeMachine = function (e) {
    e.recursiveRemove(), t.remove(this._machines, e);
  }, n;
}(goo.ArrayUtils, goo.SystemBus), goo.Machine = function () {
  "use strict";

  function t(t, e) {
    this.id = t, this.name = e, this._states = {}, this._fsm = null, this.initialState = "entry", this.currentState = null, this.parent = null, this.maxLoopDepth = 100, this.asyncMode = !1;
  }return t.prototype.setRefs = function (t) {
    this._fsm = t;for (var e = Object.keys(this._states), n = 0; n < e.length; n++) {
      var o = this._states[e[n]];o.setRefs(t);
    }
  }, t.prototype.contains = function (t) {
    return !!this._states[t];
  }, t.prototype.setState = function (t) {
    this.currentState = t, this.currentState.reset(), this.currentState.enter();
  }, t.prototype.reset = function () {
    this.currentState = this._states[this.initialState], this.currentState && this.currentState.reset();
  }, t.prototype.ready = function () {
    for (var t = Object.keys(this._states), e = 0; e < t.length; e++) {
      var n = this._states[t[e]];n.ready();
    }
  }, t.prototype.cleanup = function () {
    for (var t = Object.keys(this._states), e = 0; e < t.length; e++) {
      var n = this._states[t[e]];n.cleanup();
    }
  }, t.prototype.enter = function () {
    for (var t = Object.keys(this._states), e = 0; e < t.length; e++) {
      var n = this._states[t[e]];n.resetDepth();
    }this.currentState && this.currentState.enter();
  }, t.prototype.update = function () {
    for (var t = Object.keys(this._states), e = 0; e < t.length; e++) {
      var n = this._states[t[e]];n.resetDepth();
    }if (this.currentState) {
      if (this.asyncMode) {
        var o = this.currentState.update();return o && this.contains(o) && (this.currentState.kill(), this.setState(this._states[o])), o;
      }this.currentState.update();
    }
  }, t.prototype.kill = function () {
    this.currentState && this.currentState.kill();
  }, t.prototype.getCurrentState = function () {
    return this.currentState;
  }, t.prototype.addState = function (t) {
    0 === Object.keys(this._states).length && (this.initialState = t.uuid), t.parent = this, t._fsm = this._fsm, this._states[t.uuid] = t;
  }, t.prototype.removeFromParent = function () {
    this.parent && this.parent.removeMachine(this);
  }, t.prototype.recursiveRemove = function () {
    for (var t = Object.keys(this._states), e = 0; e < t.length; e++) {
      var n = this._states[t[e]];n.recursiveRemove();
    }this._states = {};
  }, t.prototype.removeState = function (t) {
    if (this._states[t]) {
      if (this.initialState === t) throw new Error("Cannot remove initial state");this.currentState === this._states[t] && this.reset(), delete this._states[t];
    }
  }, t.prototype.setInitialState = function (t) {
    this.initialState = t;
  }, t;
}(), goo.FsmUtils = function () {
  "use strict";

  function t() {}function e(t) {
    for (var e = [], n = Object.keys(t), o = 0; o < n.length; o++) {
      e[t[n[o]]] = n[o];
    }return e;
  }t.setParameters = function (t, e) {
    for (var n = 0; n < e.length; n++) {
      var o = e[n],
          i = o.key;"undefined" != typeof t[i] ? this[i] = t[i] : this[i] = o["default"];
    }
  }, t.setTransitions = function (t, e) {
    for (var n = 0; n < e.length; n++) {
      var o = e[n],
          i = o.key;this.transitions = this.transitions || {}, this.transitions[i] = t.transitions[i];
    }
  }, t.getKey = function (e) {
    return t.keys[e] ? t.keys[e] : e.charCodeAt(0);
  }, t.keys = { Backspace: 8, Tab: 9, Enter: 13, Shift: 16, Ctrl: 17, Alt: 18, Pause: 19, Capslock: 20, Esc: 27, Space: 32, Pageup: 33, Pagedown: 34, End: 35, Home: 36, Leftarrow: 37, Uparrow: 38, Rightarrow: 39, Downarrow: 40, Insert: 45, Delete: 46, 0: 48, 1: 49, 2: 50, 3: 51, 4: 52, 5: 53, 6: 54, 7: 55, 8: 56, 9: 57, a: 65, b: 66, c: 67, d: 68, e: 69, f: 70, g: 71, h: 72, i: 73, j: 74, k: 75, l: 76, m: 77, n: 78, o: 79, p: 80, q: 81, r: 82, s: 83, t: 84, u: 85, v: 86, w: 87, x: 88, y: 89, z: 90, A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90, "0numpad": 96, "1numpad": 97, "2numpad": 98, "3numpad": 99, "4numpad": 100, "5numpad": 101, "6numpad": 102, "7numpad": 103, "8numpad": 104, "9numpad": 105, Multiply: 106, Plus: 107, Minus: 109, Dot: 110, Slash1: 111, F1: 112, F2: 113, F3: 114, F4: 115, F5: 116, F6: 117, F7: 118, F8: 119, F9: 120, F10: 121, F11: 122, F12: 123, Equals: 187, Comma: 188, Slash: 191, Backslash: 220 }, t.keyInverse = [], t.keyInverse = e(t.keys), t.keyForCode = function (e) {
    return t.keyInverse[e] ? t.keyInverse[e] : "FsmUtils.keyForCode: key not found for code " + e;
  };var n = function n() {
    return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
  };return t.guid = function () {
    return n() + n() + "-" + n() + "-" + n() + "-" + n() + "-" + n() + n() + n();
  }, t.getValue = function (t, e) {
    return "number" == typeof t ? t : e.getVariable(t);
  }, t;
}(), goo.Action = function (t) {
  "use strict";

  function e(t, e) {
    this.id = t, this.configure(e || {});
  }return e.prototype.configure = function (e) {
    t.setParameters.call(this, e, this.constructor.external.parameters), t.setTransitions.call(this, e, this.constructor.external.transitions);
  }, e.prototype.enter = function () {}, e.prototype.update = function () {}, e.prototype.exit = function () {}, e.prototype.ready = function () {}, e.prototype.cleanup = function () {}, e;
}(goo.FsmUtils), goo.ArrowsAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }var n = { 38: "up", 37: "left", 40: "down", 39: "right" };e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.prototype.configure = function (t) {
    this.targets = t.transitions;
  }, e.external = { key: "Arrow Keys Listener", name: "Arrow Keys", type: "controls", description: "Transitions to other states when arrow keys are pressed (keydown).", canTransition: !0, parameters: [], transitions: [{ key: "up", description: "On key up pressed." }, { key: "left", description: "On key left pressed." }, { key: "down", description: "On key down pressed." }, { key: "right", description: "On key right pressed." }] };var o = { up: "On key UP", left: "On key LEFT", down: "On key DOWN", right: "On key RIGHT" };return e.getTransitionLabel = function (t) {
    return o[t];
  }, e.prototype.enter = function (t) {
    this.eventListener = function (e) {
      var o = n[e.which],
          i = this.targets[o];i && t.send(i);
    }.bind(this), document.addEventListener("keydown", this.eventListener);
  }, e.prototype.exit = function () {
    document.removeEventListener("keydown", this.eventListener);
  }, e;
}(goo.Action), goo.MouseUpAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Mouse Up / Touch end", name: "Mouse Up / Touch end", type: "controls", description: "Listens for a mouseup event (or touchend) on the canvas and performs a transition.", canTransition: !0, parameters: [], transitions: [{ key: "mouseLeftUp", description: "State to transition to when the left mouse button is released." }, { key: "middleMouseUp", description: "State to transition to when the middle mouse button is released." }, { key: "rightMouseUp", description: "State to transition to when the right mouse button is released." }, { key: "touchUp", description: "State to transition to when the touch event ends." }] };var n = { mouseLeftUp: "On left mouse up", middleMouseUp: "On middle mouse up", rightMouseUp: "On right mouse up", touchUp: "On touch end" };return e.getTransitionLabel = function (t) {
    return n[t];
  }, e.prototype.enter = function (t) {
    var e = function (e) {
      "touch" === e ? t.send(this.transitions.touchUp) : t.send([this.transitions.mouseLeftUp, this.transitions.middleMouseUp, this.transitions.rightMouseUp][e]);
    }.bind(this);this.mouseEventListener = function (t) {
      e(t.button);
    }.bind(this), this.touchEventListener = function () {
      e("touch");
    }.bind(this), document.addEventListener("mouseup", this.mouseEventListener), document.addEventListener("touchend", this.touchEventListener);
  }, e.prototype.exit = function () {
    document.removeEventListener("mouseup", this.mouseEventListener), document.removeEventListener("touchend", this.touchEventListener);
  }, e;
}(goo.Action), goo.MouseDownAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Mouse Down / Touch Start", name: "Mouse Down / Touch Start", type: "controls", description: "Listens for a mousedown event (or touchstart) on the canvas and performs a transition.", canTransition: !0, parameters: [], transitions: [{ key: "mouseLeftDown", description: "State to transition to when the left mouse button is pressed." }, { key: "middleMouseDown", description: "State to transition to when the middle mouse button is pressed." }, { key: "rightMouseDown", description: "State to transition to when the right mouse button is pressed." }, { key: "touchDown", description: "State to transition to when the touch event begins." }] };var n = { mouseLeftDown: "On left mouse down", middleMouseDown: "On middle mouse down", rightMouseDown: "On right mouse down", touchDown: "On touch start" };return e.getTransitionLabel = function (t) {
    return n[t];
  }, e.prototype.enter = function (t) {
    var e = function (e) {
      "touch" === e ? t.send(this.transitions.touchDown) : t.send([this.transitions.mouseLeftDown, this.transitions.middleMouseDown, this.transitions.rightMouseDown][e]);
    }.bind(this);this.mouseEventListener = function (t) {
      e(t.button);
    }.bind(this), this.touchEventListener = function () {
      e("touch");
    }.bind(this), document.addEventListener("mousedown", this.mouseEventListener), document.addEventListener("touchstart", this.touchEventListener);
  }, e.prototype.exit = function () {
    document.removeEventListener("mousedown", this.mouseEventListener), document.removeEventListener("touchstart", this.touchEventListener);
  }, e;
}(goo.Action), goo.MouseMoveAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Mouse / Touch Move", name: "Mouse / Touch Move", type: "controls", description: "Listens for mouse movement (mousemove) or touch movement (touchmove) on the canvas and performs a transition.", canTransition: !0, parameters: [], transitions: [{ key: "mousemove", description: "State to transition to on mouse movement." }, { key: "touchmove", description: "State to transition to on touch movement." }] };var n = { mousemove: "On mouse move", touchmove: "On touch move" };return e.getTransitionLabel = function (t) {
    return n[t];
  }, e.prototype.enter = function (t) {
    var e = function (e) {
      "mouse" === e ? t.send(this.transitions.mousemove) : t.send(this.transitions.touchmove);
    }.bind(this);this.mouseEventListener = function () {
      e("mouse");
    }.bind(this), this.touchEventListener = function () {
      e("touch");
    }.bind(this), document.addEventListener("mousemove", this.mouseEventListener), document.addEventListener("touchmove", this.touchEventListener);
  }, e.prototype.exit = function () {
    document.removeEventListener("mousemove", this.mouseEventListener), document.removeEventListener("touchmove", this.touchEventListener);
  }, e;
}(goo.Action), goo.MousePressedAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Mouse Button Pressed", name: "Mouse Button Pressed", type: "controls", description: "Listens for a mouse button press event and performs a transition. Works over transition boundaries..", canTransition: !0, parameters: [{ name: "Button", key: "button", type: "string", control: "dropdown", description: "Mouse Button to listen for.", "default": "Left", options: ["Left", "Middle", "Right"] }], transitions: [{ key: "mousedown", description: "State to transition to when the mouse button is pressed." }] };var n = { mousedown: "Mouse Button Pressed" };return e.getTransitionLabel = function (t, e) {
    return n[t] ? "On " + e.options.button + " " + n[t] : void 0;
  }, e.prototype.enter = function (t) {
    t.getInputState(this.button) && t.send(this.transitions.mousedown);
  }, e.prototype.update = function (t) {
    t.getInputState(this.button) && t.send(this.transitions.mousedown);
  }, e;
}(goo.Action), goo.KeyUpAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments);
  }return n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.external = { key: "Key Up", name: "Key Up", type: "controls", description: "Listens for a key release and performs a transition.", canTransition: !0, parameters: [{ name: "Key", key: "key", type: "string", control: "key", description: "Key to listen for.", "default": "A" }], transitions: [{ key: "keyup", description: "State to transition to when the key is released." }] }, n.getTransitionLabel = function (t, e) {
    return "On Key " + (e.options.key || "") + " up";
  }, n.prototype.configure = function (t) {
    this.key = t.key ? e.getKey(t.key) : null, this.transitions = { keyup: t.transitions.keyup };
  }, n.prototype.enter = function (t) {
    this.eventListener = function (e) {
      this.key && e.which !== +this.key || t.send(this.transitions.keyup);
    }.bind(this), document.addEventListener("keyup", this.eventListener);
  }, n.prototype.exit = function () {
    document.removeEventListener("keyup", this.eventListener);
  }, n;
}(goo.Action, goo.FsmUtils), goo.KeyDownAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments);
  }return n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.external = { key: "Key Down", name: "Key Down", type: "controls", description: "Listens for a key press and performs a transition.", canTransition: !0, parameters: [{ name: "Key", key: "key", type: "string", control: "key", description: "Key to listen for.", "default": "A" }], transitions: [{ key: "keydown", description: "State to transition to when the key is pressed." }] }, n.getTransitionLabel = function (t, e) {
    return "On Key " + (e.options.key || "") + " down";
  }, n.prototype.configure = function (t) {
    this.key = t.key ? e.getKey(t.key) : null, this.transitions = { keydown: t.transitions.keydown };
  }, n.prototype.enter = function (t) {
    this.eventListener = function (e) {
      this.key && e.which === +this.key && t.send(this.transitions.keydown);
    }.bind(this), document.addEventListener("keydown", this.eventListener);
  }, n.prototype.exit = function () {
    document.removeEventListener("keydown", this.eventListener);
  }, n;
}(goo.Action, goo.FsmUtils), goo.KeyPressedAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments);
  }return n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.external = { key: "Key Pressed", name: "Key Pressed", type: "controls", description: "Listens for a key press event and performs a transition. Works over transition boundaries.", canTransition: !0, parameters: [{ name: "Key", key: "key", type: "string", control: "key", description: "Key to listen for.", "default": "A" }], transitions: [{ key: "keydown", description: "State to transition to when the key is pressed." }] }, n.getTransitionLabel = function (t, e) {
    return "On Key " + (e.options.key || "") + " pressed";
  }, n.prototype.configure = function (t) {
    this.key = t.key ? e.getKey(t.key) : null, this.transitions = { keydown: t.transitions.keydown };
  }, n.prototype.enter = function (t) {
    t.getInputState(this.key) && t.send(this.transitions.keydown);
  }, n.prototype.update = function (t) {
    t.getInputState(this.key) && t.send(this.transitions.keydown);
  }, n;
}(goo.Action, goo.FsmUtils), goo.PickAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Pick", name: "Pick", type: "controls", description: "Listens for a picking event on the entity and performs a transition.", canTransition: !0, parameters: [], transitions: [{ key: "pick", name: "Pick", description: "State to transition to when entity is picked." }] };var n = { pick: "On pick entity" };return e.getTransitionLabel = function (t) {
    return n[t];
  }, e.prototype.enter = function (t) {
    this.ownerEntity = t.getOwnerEntity(), this.goo = this.ownerEntity._world.gooRunner;var e = this;this.eventListener = function (n) {
      var o,
          i,
          r = e.goo.renderer.domElement;if ("touchstart" === n.type || "touchend" === n.type || "touchmove" === n.type) o = n.changedTouches[0].pageX - r.getBoundingClientRect().left, i = n.changedTouches[0].pageY - r.getBoundingClientRect().top;else {
        var s = r.getBoundingClientRect();o = n.clientX - s.left, i = n.clientY - s.top;
      }var a = e.goo.pickSync(o, i),
          c = e.goo.world.entityManager.getEntityByIndex(a.id);c && c.traverseUp(function (n) {
        return n === e.ownerEntity ? (t.send(e.transitions.pick), !1) : void 0;
      });
    }, document.addEventListener("click", this.eventListener), document.addEventListener("touchstart", this.eventListener);
  }, e.prototype.exit = function () {
    document.removeEventListener("click", this.eventListener), document.removeEventListener("touchstart", this.eventListener);
  }, e;
}(goo.Action), goo.PickAndExitAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments), this.eventListener = function (t) {
      t.stopPropagation(), t.preventDefault();var e = this.ownerEntity.getComponent("HtmlComponent"),
          n = e && e.domElement.contains(t.target);if (n) return void this.handleExit();if (t.target === this.canvasElement) {
        var o, i;t.touches && t.touches.length ? (o = t.touches[0].clientX, i = t.touches[0].clientY) : t.changedTouches && t.changedTouches.length ? (o = t.changedTouches[0].pageX, i = t.changedTouches[0].pageY) : (o = t.offsetX, i = t.offsetY);var r = this.goo.pickSync(o, i);if (-1 !== r.id) {
          var s = this.goo.world.entityManager.getEntityByIndex(r.id),
              a = [];this.ownerEntity.traverse(a.push.bind(a)), -1 !== a.indexOf(s) && this.handleExit();
        }
      }
    }.bind(this);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Pick and Exit", name: "Pick and Exit", type: "controls", description: "Listens for a picking event on the entity and opens a new browser window.", canTransition: !0, parameters: [{ name: "URL", key: "url", type: "string", description: "URL to open.", "default": "http://www.goocreate.com/" }, { name: "Exit name", key: "exitName", type: "string", description: "Name of the exit, used to track this exit in Ads.", "default": "clickEntityExit" }], transitions: [] }, e.prototype.enter = function (t) {
    this.ownerEntity = t.getOwnerEntity(), this.goo = this.ownerEntity._world.gooRunner, this.canvasElement = this.goo.renderer.domElement, this.domElement = this.canvasElement.parentNode, this.domElement.addEventListener("click", this.eventListener, !1), this.domElement.addEventListener("touchend", this.eventListener, !1);
  }, e.prototype.handleExit = function () {
    var t = window.gooHandleExit || function (t) {
      window.open(t, "_blank");
    };t(this.url, this.exitName);
  }, e.prototype.exit = function () {
    this.domElement && (this.domElement.removeEventListener("click", this.eventListener), this.domElement.removeEventListener("touchend", this.eventListener));
  }, e;
}(goo.Action), goo.ClickAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments), this.selected = !1, this.x = 0, this.y = 0;
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Click/Tap", name: "Click/Tap on entity", type: "controls", description: "Listens for a click/tap event on the entity and performs a transition.", canTransition: !0, parameters: [], transitions: [{ key: "click", description: "State to transition to when entity is clicked." }] }, e.getTransitionLabel = function () {
    return "On Click/Tap Entity";
  }, e.prototype.enter = function (t) {
    var e = this;this.downListener = function (t) {
      var n,
          o,
          i = e.gooRunner,
          r = i.renderer.domElement;if ("touchstart" === t.type || "touchend" === t.type) n = t.changedTouches[0].pageX - r.getBoundingClientRect().left, o = t.changedTouches[0].pageY - r.getBoundingClientRect().top;else {
        var s = r.getBoundingClientRect();n = t.clientX - s.left, o = t.clientY - s.top;
      }var a = i.pickSync(n, o),
          c = i.world.entityManager.getEntityByIndex(a.id);c && c.traverseUp(function (t) {
        return t === e.ownerEntity ? (e.x = n, e.y = o, e.selected = !0, !1) : void 0;
      });
    }, this.upListener = function (n) {
      if (e.selected) {
        e.selected = !1;var o,
            i,
            r = e.gooRunner,
            s = r.renderer.domElement,
            a = s.getBoundingClientRect();"touchstart" === n.type || "touchend" === n.type ? (o = n.changedTouches[0].pageX - a.left, i = n.changedTouches[0].pageY - a.top) : (o = n.clientX - a.left, i = n.clientY - a.top);var c = e.x - o,
            p = e.y - i;if (!(Math.abs(c) > 10 || Math.abs(p) > 10)) {
          var u = r.pickSync(o, i),
              m = r.world.entityManager.getEntityByIndex(u.id);m && m.traverseUp(function (n) {
            return n === e.ownerEntity ? (t.send(e.transitions.click), !1) : void 0;
          });
        }
      }
    }, this.ownerEntity = t.getOwnerEntity(), this.gooRunner = this.ownerEntity._world.gooRunner, document.addEventListener("mousedown", this.downListener), document.addEventListener("touchstart", this.downListener), document.addEventListener("mouseup", this.upListener), document.addEventListener("touchend", this.upListener), this.selected = !1;
  }, e.prototype.exit = function () {
    document.removeEventListener("mousedown", this.downListener), document.removeEventListener("touchstart", this.downListener), document.removeEventListener("mouseup", this.upListener), document.removeEventListener("touchend", this.upListener);
  }, e;
}(goo.Action), goo.HoverEnterAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments), this.first = !0, this.hit = !1;
  }return n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.types = { fast: "Bounding (Fast)", slow: "Per pixel (Slow)" }, n.external = { key: "Hover Enter", name: "Entity Hover Enter", type: "controls", description: "Listens for a hover enter event on the entity and performs a transition.", canTransition: !0, parameters: [{ name: "Accuracy", key: "type", type: "string", control: "dropdown", description: "Hover accuracy/performance selection.", "default": n.types.fast, options: [n.types.fast, n.types.slow] }], transitions: [{ key: "enter", description: "State to transition to when entity is entered." }] }, n.getTransitionLabel = function () {
    return "On Entity Hover Enter";
  }, n.prototype.enter = function (t) {
    var o = this,
        i = function i(t) {
      if (!t) return !1;var e = !1;return t.traverseUp(function (t) {
        return t === o.ownerEntity ? (e = !0, !1) : void 0;
      }), e;
    },
        r = function r(e) {
      var n = i(e);!o.first && o.hit || !n || t.send(o.transitions.enter), o.first = !1, o.hit = n;
    };this.moveListener = function (t) {
      var i,
          s,
          a = o.goo.renderer.domElement;if ("touchstart" === t.type || "touchend" === t.type || "touchmove" === t.type) {
        var c = a.getBoundingClientRect();i = t.changedTouches[0].pageX - c.left, s = t.changedTouches[0].pageY - c.top;
      } else {
        var c = a.getBoundingClientRect();i = t.clientX - c.left, s = t.clientY - c.top;
      }var p = o.goo.renderSystem.camera,
          u = null;if (o.type === n.types.slow) {
        var m = o.goo.pickSync(i, s);u = o.goo.world.entityManager.getEntityByIndex(m.id);
      } else {
        var l = e.pick(o.goo.world, p, i, s);l.length > 0 && (u = l[0].entity);
      }r(u);
    }, this.ownerEntity = t.getOwnerEntity(), this.goo = this.ownerEntity._world.gooRunner, document.addEventListener("mousemove", this.moveListener), document.addEventListener("touchmove", this.moveListener), this.first = !0, this.hit = !1;
  }, n.prototype.exit = function () {
    document.removeEventListener("mousemove", this.moveListener), document.removeEventListener("touchmove", this.moveListener);
  }, n;
}(goo.Action, goo.BoundingPicker), goo.HoverExitAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments), this.first = !0, this.hit = !1;
  }return n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.types = { fast: "Bounding (Fast)", slow: "Per pixel (Slow)" }, n.external = { key: "Hover Exit", name: "Entity Hover Exit", type: "controls", description: "Listens for a hover exit event on the entity and performs a transition.", canTransition: !0, parameters: [{ name: "Accuracy", key: "type", type: "string", control: "dropdown", description: "Hover accuracy/performance selection.", "default": n.types.fast, options: [n.types.fast, n.types.slow] }], transitions: [{ key: "exit", description: "State to transition to when entity is exited." }] }, n.getTransitionLabel = function () {
    return "On Entity Hover Exit";
  }, n.prototype.enter = function (t) {
    var o = this,
        i = function i(t) {
      if (!t) return !1;var e = !1;return t.traverseUp(function (t) {
        return t === o.ownerEntity ? (e = !0, !1) : void 0;
      }), e;
    },
        r = function r(e) {
      var n = i(e);!o.first && !o.hit || n || t.send(o.transitions.exit), o.hit = n, o.first = !1;
    };this.moveListener = function (t) {
      var i,
          s,
          a = o.goo.renderer.domElement;if ("touchstart" === t.type || "touchend" === t.type || "touchmove" === t.type) i = t.changedTouches[0].pageX - a.getBoundingClientRect().left, s = t.changedTouches[0].pageY - a.getBoundingClientRect().top;else {
        var c = a.getBoundingClientRect();i = t.clientX - c.left, s = t.clientY - c.top;
      }var p = o.goo.renderSystem.camera,
          u = null;if (o.type === n.types.slow) {
        var m = o.goo.pickSync(i, s);u = o.goo.world.entityManager.getEntityByIndex(m.id);
      } else {
        var l = e.pick(o.goo.world, p, i, s);l.length > 0 && (u = l[0].entity);
      }r(u);
    }, this.ownerEntity = t.getOwnerEntity(), this.goo = this.ownerEntity._world.gooRunner, document.addEventListener("mousemove", this.moveListener), document.addEventListener("touchmove", this.moveListener), this.first = !0, this.hit = !1;
  }, n.prototype.exit = function () {
    document.removeEventListener("mousemove", this.moveListener), document.removeEventListener("touchmove", this.moveListener);
  }, n;
}(goo.Action, goo.BoundingPicker), goo.WasdAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.prototype.configure = function (t) {
    this.targets = t.transitions;
  };var n = { 87: "w", 65: "a", 83: "s", 68: "d" };e.external = function () {
    var t = [];for (var e in n) {
      var o = n[e];t.push({ key: o, name: "On key " + o.toUpperCase(), description: "On key '" + o + "' pressed." });
    }return { key: "WASD Keys Listener", name: "WASD Keys", type: "controls", description: "Transitions to other states when the WASD keys are pressed.", canTransition: !0, parameters: [], transitions: t };
  }();var o = { w: "On Key W Pressed", a: "On Key A Pressed", s: "On Key S Pressed", d: "On Key D Pressed" };return e.getTransitionLabel = function (t) {
    return o[t];
  }, e.prototype.enter = function (t) {
    this.eventListener = function (e) {
      var o = n[e.which];if (o) {
        var i = this.targets[o];"string" == typeof i && t.send(i);
      }
    }.bind(this), document.addEventListener("keydown", this.eventListener);
  }, e.prototype.exit = function () {
    document.removeEventListener("keydown", this.eventListener);
  }, e;
}(goo.Action), goo.MoveAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments);
  }return n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.external = { key: "Move", name: "Move", type: "animation", description: "Moves the entity.", parameters: [{ name: "Translation", key: "translation", type: "position", description: "Move.", "default": [0, 0, 0] }, { name: "Oriented", key: "oriented", type: "boolean", description: "If true translate with rotation.", "default": !0 }, { name: "Relative", key: "relative", type: "boolean", description: "If true add to current translation.", "default": !0 }, { name: "On every frame", key: "everyFrame", type: "boolean", description: "Repeat this action every frame.", "default": !0 }], transitions: [] }, n.prototype.enter = function (t) {
    var n = t.getOwnerEntity(),
        o = n.transformComponent.transform;this.forward = e.fromArray(this.translation);var i = o.rotation;this.forward.applyPost(i), this.everyFrame || this.applyMove(t);
  }, n.prototype.update = function (t) {
    this.everyFrame && this.applyMove(t);
  }, n.prototype.applyMove = function (t) {
    var n = t.getOwnerEntity(),
        o = n.transformComponent.transform,
        i = o.translation;if (this.oriented) {
      if (this.relative) {
        var r = e.fromArray(this.translation),
            s = o.rotation;r.applyPost(s), this.everyFrame ? (r.scale(t.getTpf()), i.add(r)) : i.add(r);
      } else i.set(this.forward);
    } else if (this.relative) {
      if (this.everyFrame) {
        var a = t.getTpf();i.addDirect(this.translation[0] * a, this.translation[1] * a, this.translation[2] * a);
      } else i.addDirect(this.translation[0], this.translation[1], this.translation[2]);
    } else i.setDirect(this.translation[0], this.translation[1], this.translation[2]);n.transformComponent.setUpdated();
  }, n;
}(goo.Action, goo.Vector3), goo.RotateAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments);
  }n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.external = { key: "Rotate", name: "Rotate", type: "animation", description: "Rotates the entity with the set angles (in degrees).", parameters: [{ name: "Rotation", key: "rotation", type: "rotation", description: "Rotatation.", "default": [0, 0, 0] }, { name: "Relative", key: "relative", type: "boolean", description: "If true add to current rotation.", "default": !0 }, { name: "On every frame", key: "everyFrame", type: "boolean", description: "Repeat this action every frame.", "default": !0 }], transitions: [] };var o = e.DEG_TO_RAD;return n.prototype.applyRotation = function (t) {
    var e = t.getOwnerEntity(),
        n = e.transformComponent.transform,
        i = this.rotation[0],
        r = this.rotation[1],
        s = this.rotation[2];if (this.relative) {
      var a = n.rotation;if (this.everyFrame) {
        var c = t.getTpf();a.rotateX(i * o * c), a.rotateY(r * o * c), a.rotateZ(s * o * c);
      } else a.rotateX(i * o), a.rotateY(r * o), a.rotateZ(s * o);
    } else if (this.everyFrame) {
      var c = t.getTpf();n.setRotationXYZ(i * o * c, r * o * c, s * o * c);
    } else n.setRotationXYZ(i * o, r * o, s * o);e.transformComponent.setUpdated();
  }, n.prototype.enter = function (t) {
    this.everyFrame || this.applyRotation(t);
  }, n.prototype.update = function (t) {
    this.everyFrame && this.applyRotation(t);
  }, n;
}(goo.Action, goo.MathUtils), goo.ScaleAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Scale", name: "Scale", type: "animation", description: "Scales the entity.", parameters: [{ name: "Scale", key: "scale", type: "position", description: "Scale.", "default": [0, 0, 0] }, { name: "Relative", key: "relative", type: "boolean", description: "If true, add/multiply the current scaling.", "default": !0 }, { name: "Multiply", key: "multiply", type: "boolean", description: "If true multiply, otherwise add.", "default": !1 }, { name: "On every frame", key: "everyFrame", type: "boolean", description: "Repeat this action every frame.", "default": !1 }], transitions: [] }, e.prototype.applyScale = function (t) {
    var e = t.getOwnerEntity(),
        n = e.transformComponent.transform;if (this.relative) {
      if (this.multiply) {
        if (this.everyFrame) {
          var o = 10 * t.getTpf();n.scale.x *= this.scale[0] * o, n.scale.y *= this.scale[1] * o, n.scale.z *= this.scale[2] * o;
        } else n.scale.mulDirect(this.scale[0], this.scale[1], this.scale[2]);
      } else if (this.everyFrame) {
        var o = 10 * t.getTpf();n.scale.x += this.scale[0] * o, n.scale.y += this.scale[1] * o, n.scale.z += this.scale[2] * o;
      } else n.scale.addDirect(this.scale[0], this.scale[1], this.scale[2]);
    } else n.scale.setArray(this.scale);e.transformComponent.setUpdated();
  }, e.prototype.enter = function (t) {
    this.everyFrame || this.applyScale(t);
  }, e.prototype.update = function (t) {
    this.everyFrame && this.applyScale(t);
  }, e;
}(goo.Action), goo.LookAtAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments);
  }return n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.external = { key: "Look At", name: "Look At", type: "animation", description: "Reorients an entity so that it's facing a specific point.", parameters: [{ name: "Look at", key: "lookAt", type: "position", description: "Position to look at.", "default": [0, 0, 0] }, { name: "On every frame", key: "everyFrame", type: "boolean", description: "Repeat this action every frame.", "default": !0 }], transitions: [] }, n.prototype.doLookAt = function (t) {
    var n = t.getOwnerEntity(),
        o = n.transformComponent;o.transform.lookAt(new e(this.lookAt), e.UNIT_Y), o.setUpdated();
  }, n.prototype.enter = function (t) {
    this.everyFrame || this.doLookAt(t);
  }, n.prototype.update = function (t) {
    this.everyFrame && this.doLookAt(t);
  }, n;
}(goo.Action, goo.Vector3), goo.TweenMoveAction = function (t, e, n) {
  "use strict";

  function o() {
    t.apply(this, arguments), this.fromPos = new e(), this.toPos = new e(), this.completed = !1;
  }return o.prototype = Object.create(t.prototype), o.prototype.constructor = o, o.external = { key: "Tween Move", name: "Tween Move", type: "animation", description: "Transition to the set location.", canTransition: !0, parameters: [{ name: "Translation", key: "to", type: "position", description: "Move.", "default": [0, 0, 0] }, { name: "Relative", key: "relative", type: "boolean", description: "If true add, otherwise set.", "default": !0 }, { name: "Time (ms)", key: "time", type: "float", description: "Time it takes for this movement to complete.", "default": 1e3 }, { name: "Easing type", key: "easing1", type: "string", control: "dropdown", description: "Easing type.", "default": "Linear", options: ["Linear", "Quadratic", "Exponential", "Circular", "Elastic", "Back", "Bounce"] }, { name: "Direction", key: "easing2", type: "string", control: "dropdown", description: "Easing direction.", "default": "In", options: ["In", "Out", "InOut"] }], transitions: [{ key: "complete", description: "State to transition to when the movement completes." }] }, o.getTransitionLabel = function (t) {
    return "complete" === t ? "On Tween Move Complete" : void 0;
  }, o.prototype.ready = function () {
    "Linear" === this.easing1 ? this.easing = n.Easing.Linear.None : this.easing = n.Easing[this.easing1][this.easing2];
  }, o.prototype.enter = function (t) {
    var e = t.getOwnerEntity().transformComponent;this.fromPos.set(e.transform.translation), this.toPos.setDirect(this.to[0], this.to[1], this.to[2]), this.relative && this.toPos.add(this.fromPos), this.startTime = t.getTime(), this.completed = !1;
  }, o.prototype.update = function (t) {
    if (!this.completed) {
      var e = t.getOwnerEntity().transformComponent,
          n = Math.min(1e3 * (t.getTime() - this.startTime) / this.time, 1),
          o = this.easing(n);e.transform.translation.set(this.fromPos).lerp(this.toPos, o), e.setUpdated(), n >= 1 && (t.send(this.transitions.complete), this.completed = !0);
    }
  }, o;
}(goo.Action, goo.Vector3, goo.TWEEN), goo.TweenRotationAction = function (t, e, n, o, i) {
  "use strict";

  function r() {
    t.apply(this, arguments), this.quatFrom = new e(), this.quatTo = new e(), this.quatFinal = new e(), this.completed = !1;
  }return r.prototype = Object.create(t.prototype), r.prototype.constructor = r, r.external = { key: "Tween Rotation", name: "Tween Rotate", type: "animation", description: "Transition to the set rotation, in angles.", canTransition: !0, parameters: [{ name: "Rotation", key: "to", type: "rotation", description: "Rotation.", "default": [0, 0, 0] }, { name: "Relative", key: "relative", type: "boolean", description: "If true add, otherwise set.", "default": !0 }, { name: "Time (ms)", key: "time", type: "float", description: "Time it takes for this movement to complete.", "default": 1e3 }, { name: "Easing type", key: "easing1", type: "string", control: "dropdown", description: "Easing type.", "default": "Linear", options: ["Linear", "Quadratic", "Exponential", "Circular", "Elastic", "Back", "Bounce"] }, { name: "Direction", key: "easing2", type: "string", control: "dropdown", description: "Easing direction.", "default": "In", options: ["In", "Out", "InOut"] }], transitions: [{ key: "complete", description: "State to transition to when the rotation completes." }] }, r.getTransitionLabel = function (t) {
    return "complete" === t ? "On Tween Rotation Complete" : void 0;
  }, r.prototype.ready = function () {
    "Linear" === this.easing1 ? this.easing = i.Easing.Linear.None : this.easing = i.Easing[this.easing1][this.easing2];
  }, r.prototype.enter = function (t) {
    var e = t.getOwnerEntity(),
        i = e.transformComponent;this.startTime = t.getTime(), this.quatFrom.fromRotationMatrix(i.transform.rotation), this.quatTo.fromRotationMatrix(new n().fromAngles(this.to[0] * o.DEG_TO_RAD, this.to[1] * o.DEG_TO_RAD, this.to[2] * o.DEG_TO_RAD)), this.relative && this.quatTo.mul(this.quatFrom), this.completed = !1;
  }, r.prototype.update = function (t) {
    if (!this.completed) {
      var n = t.getOwnerEntity(),
          o = n.transformComponent.transform,
          i = Math.min(1e3 * (t.getTime() - this.startTime) / this.time, 1),
          r = this.easing(i);e.slerp(this.quatFrom, this.quatTo, r, this.quatFinal), this.quatFinal.toRotationMatrix(o.rotation), n.transformComponent.setUpdated(), i >= 1 && (t.send(this.transitions.complete), this.completed = !0);
    }
  }, r;
}(goo.Action, goo.Quaternion, goo.Matrix3, goo.MathUtils, goo.TWEEN), goo.TweenScaleAction = function (t, e, n) {
  "use strict";

  function o() {
    t.apply(this, arguments), this.fromScale = new e(), this.toScale = new e(), this.completed = !1;
  }return o.prototype = Object.create(t.prototype), o.prototype.constructor = o, o.external = { key: "Tween Scale", name: "Tween Scale", type: "animation", description: "Transition to the set scale.", canTransition: !0, parameters: [{ name: "Scale", key: "to", type: "position", description: "Scale.", "default": [0, 0, 0] }, { name: "Relative", key: "relative", type: "boolean", description: "If true add, otherwise set.", "default": !0 }, { name: "Time (ms)", key: "time", type: "float", description: "Time it takes for this movement to complete.", "default": 1e3 }, { name: "Easing type", key: "easing1", type: "string", control: "dropdown", description: "Easing type.", "default": "Linear", options: ["Linear", "Quadratic", "Exponential", "Circular", "Elastic", "Back", "Bounce"] }, { name: "Direction", key: "easing2", type: "string", control: "dropdown", description: "Easing direction.", "default": "In", options: ["In", "Out", "InOut"] }], transitions: [{ key: "complete", description: "State to transition to when the scaling completes." }] }, o.getTransitionLabel = function (t) {
    return "complete" === t ? "On Tween Scale Complete" : void 0;
  }, o.prototype.ready = function () {
    "Linear" === this.easing1 ? this.easing = n.Easing.Linear.None : this.easing = n.Easing[this.easing1][this.easing2];
  }, o.prototype.enter = function (t) {
    var e = t.getOwnerEntity().transformComponent;this.fromScale.set(e.transform.scale), this.toScale.setDirect(this.to[0], this.to[1], this.to[2]), this.relative && this.toScale.mul(this.fromScale), this.startTime = t.getTime(), this.completed = !1;
  }, o.prototype.update = function (t) {
    if (!this.completed) {
      var e = t.getOwnerEntity().transformComponent,
          n = Math.min(1e3 * (t.getTime() - this.startTime) / this.time, 1),
          o = this.easing(n);e.transform.scale.set(this.fromScale).lerp(this.toScale, o), e.setUpdated(), n >= 1 && (t.send(this.transitions.complete), this.completed = !0);
    }
  }, o;
}(goo.Action, goo.Vector3, goo.TWEEN), goo.TweenLookAtAction = function (t, e, n, o) {
  "use strict";

  function i() {
    t.apply(this, arguments), this.quatFrom = new n(), this.quatTo = new n(), this.quatFinal = new n(), this.completed = !1;
  }return i.prototype = Object.create(t.prototype), i.prototype.constructor = i, i.external = { key: "Tween Look At", name: "Tween Look At", type: "animation", description: "Transition the entity's rotation to face the set position.", canTransition: !0, parameters: [{ name: "Position", key: "to", type: "position", description: "Look at point.", "default": [0, 0, 0] }, { name: "Time (ms)", key: "time", type: "float", description: "Time it takes for this movement to complete.", "default": 1e3 }, { name: "Easing type", key: "easing1", type: "string", control: "dropdown", description: "Easing type.", "default": "Linear", options: ["Linear", "Quadratic", "Exponential", "Circular", "Elastic", "Back", "Bounce"] }, { name: "Direction", key: "easing2", type: "string", control: "dropdown", description: "Easing direction.", "default": "In", options: ["In", "Out", "InOut"] }], transitions: [{ key: "complete", description: "State to transition to when the transition completes." }] }, i.getTransitionLabel = function (t) {
    return "complete" === t ? "On Tween LookAt Complete" : void 0;
  }, i.prototype.ready = function () {
    "Linear" === this.easing1 ? this.easing = o.Easing.Linear.None : this.easing = o.Easing[this.easing1][this.easing2];
  }, i.prototype.enter = function (t) {
    var n = t.getOwnerEntity(),
        o = n.transformComponent.transform;this.startTime = t.getTime(), this.quatFrom.fromRotationMatrix(o.rotation);var i = e.fromArray(this.to).sub(o.translation);this.rot = o.rotation.clone(), this.rot.lookAt(i, e.UNIT_Y), this.quatTo.fromRotationMatrix(this.rot), this.completed = !1;
  }, i.prototype.update = function (t) {
    if (!this.completed) {
      var e = t.getOwnerEntity(),
          o = e.transformComponent.transform,
          i = Math.min(1e3 * (t.getTime() - this.startTime) / this.time, 1),
          r = this.easing(i);n.slerp(this.quatFrom, this.quatTo, r, this.quatFinal), this.quatFinal.toRotationMatrix(o.rotation), e.transformComponent.setUpdated(), i >= 1 && (t.send(this.transitions.complete), this.completed = !0);
    }
  }, i;
}(goo.Action, goo.Vector3, goo.Quaternion, goo.TWEEN), goo.ShakeAction = function (t, e, n, o) {
  "use strict";

  function i() {
    t.apply(this, arguments), this.oldVal = new n(), this.target = new n(), this.vel = new n(), this.completed = !1;
  }i.prototype = Object.create(t.prototype), i.prototype.constructor = i, i.external = { key: "Shake", name: "Shake", type: "animation", description: "Shakes the entity. Optionally performs a transition.", canTransition: !0, parameters: [{ name: "Start level", key: "startLevel", type: "float", description: "Shake amount at start.", "default": 0 }, { name: "End level", key: "endLevel", type: "float", description: "Shake amount at the end.", "default": 10 }, { name: "Time (ms)", key: "time", type: "float", description: "Shake time amount.", "default": 1e3 }, { name: "Speed", key: "speed", type: "string", control: "dropdown", description: "Speed of shaking.", "default": "Fast", options: ["Fast", "Medium", "Slow"] }], transitions: [{ key: "complete", description: "State to transition to when the shake completes." }] };var r = { complete: "On Shake Complete" };return i.getTransitionLabel = function (t) {
    return r[t];
  }, i.prototype.configure = function (t) {
    this.startLevel = t.startLevel, this.endLevel = t.endLevel, this.time = t.time, this.speed = { Fast: 1, Medium: 2, Slow: 4 }[t.speed], this.easing = o.Easing.Quadratic.InOut, this.eventToEmit = t.transitions.complete;
  }, i.prototype.enter = function (t) {
    this.oldVal.set(n.ZERO), this.target.set(n.ZERO), this.vel.set(n.ZERO), this.iter = 0, this.startTime = t.getTime(), this.completed = !1;
  }, i.prototype.update = function (t) {
    if (!this.completed) {
      var n = t.getOwnerEntity(),
          o = n.transformComponent,
          i = o.transform.translation,
          r = Math.min(1e3 * (t.getTime() - this.startTime) / this.time, 1),
          s = this.easing(r),
          a = e.lerp(s, this.startLevel, this.endLevel);this.iter++, this.iter > this.speed && (this.iter = 0, this.target.setDirect(-this.oldVal.x + (Math.random() - .5) * a * 2, -this.oldVal.y + (Math.random() - .5) * a * 2, -this.oldVal.z + (Math.random() - .5) * a * 2)), this.vel.setDirect(.98 * this.vel.x + .1 * this.target.x, .98 * this.vel.y + .1 * this.target.y, .98 * this.vel.z + .1 * this.target.z), i.add(this.vel).sub(this.oldVal), this.oldVal.copy(this.vel), o.setUpdated(), r >= 1 && (i.sub(this.oldVal), o.setUpdated(), t.send(this.eventToEmit), this.completed = !0);
    }
  }, i;
}(goo.Action, goo.MathUtils, goo.Vector3, goo.TWEEN), goo.PauseAnimationAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Pause Animation", name: "Pause Animation", type: "animation", description: "Pauses skeleton animations.", parameters: [{ name: "On all entities", key: "onAll", type: "boolean", description: "Pause animation on all entities or just one.", "default": !1 }], transitions: [] }, e.prototype.enter = function (t) {
    if (this.onAll) {
      var e = t.getWorld(),
          n = e.getSystem("AnimationSystem");n.pause();
    } else {
      var o = t.getOwnerEntity();o.animationComponent && o.animationComponent.pause();
    }
  }, e;
}(goo.Action), goo.ResumeAnimationAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Resume Animation", name: "Resume Animation", type: "animation", description: "Continues playing a skeleton animation.", parameters: [{ name: "On all entities", key: "onAll", type: "boolean", description: "Resume animation on all entities or just one.", "default": !1 }], transitions: [] }, e.prototype.enter = function (t) {
    if (this.onAll) {
      var e = t.getWorld(),
          n = e.getSystem("AnimationSystem");n.resume();
    } else {
      var o = t.getOwnerEntity();o.animationComponent && o.animationComponent.resume();
    }
  }, e;
}(goo.Action), goo.SetAnimationAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments), this._transitioned = !1, this._loopAtStart = null, this._previousLoop = 0;
  }e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Set Animation", name: "Set Animation", type: "animation", description: "Transitions to a selected animation.", parameters: [{ name: "Animation", key: "animation", type: "animation" }, { name: "Loops", key: "loops", description: "How many times to loop before transitioning.", type: "int", min: 1, "default": 1 }], transitions: [{ key: "complete", description: "State to transition to when the target animation completes. If the animation loops forever, the transition will be done when the next loop starts." }] };var n = { complete: "On animation complete" };return e.getTransitionLabel = function (t) {
    return n[t];
  }, e.prototype.enter = function () {
    this._transitioned = !1, this._loopAtStart = null, this._previousLoop = 0;
  }, e.prototype.update = function (t) {
    if (!this._transitioned) {
      var e = t.getOwnerEntity(),
          n = this;if (this.animation && e.animationComponent) {
        var o;null === this._loopAtStart && (e.animationComponent.transitionTo(this.animation, !0), o = e.animationComponent.getCurrentState(), o && (this._loopAtStart = o.getCurrentLoop())), o = e.animationComponent.getCurrentState();var i = !1;o ? (i = i || o.getCurrentLoop() - this._loopAtStart === this.loops, this._previousLoop = o.getCurrentLoop()) : i = i || this._previousLoop === this.loops - 1, i && (t.send(n.transitions.complete), this._transitioned = !0);
      }
    }
  }, e.prototype.exit = function () {
    this._transitioned = !1, this._loopAtStart = null, this._previousLoop = 0;
  }, e;
}(goo.Action), goo.SetTimeScale = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments), this.everyFrame = !1;
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Set Animation Time Scale", name: "Set Animation Time Scale", type: "animation", description: "Sets the time scale for the current animation.", parameters: [{ name: "Scale", key: "scale", type: "float", description: "Scale factor for the animation timer.", "default": 1 }], transitions: [] }, e.prototype.enter = function (t) {
    var e = t.getOwnerEntity();e.animationComponent && e.animationComponent.setTimeScale(this.scale);
  }, e;
}(goo.Action), goo.WaitAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments), this.currentTime = 0, this.totalWait = 0;
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Wait", name: "Wait", type: "animation", description: "Performs a transition after a specified amount of time. A random time can be set, this will add between 0 and the set random time to the specified wait time.", canTransition: !0, parameters: [{ name: "Time (ms)", key: "waitTime", type: "float", description: "Base time in milliseconds before transition fires.", "default": 5e3 }, { name: "Random (ms)", key: "randomTime", type: "float", description: "A random number of milliseconds (between 0 and this value) will be added to the base wait time.", "default": 0 }], transitions: [{ key: "timeUp", description: "State to transition to when time up." }] }, e.getTransitionLabel = function (t) {
    return "timeUp" === t ? "On Wait End" : void 0;
  }, e.prototype.enter = function () {
    this.currentTime = 0, this.totalWait = parseFloat(this.waitTime) + Math.random() * parseFloat(this.randomTime);
  }, e.prototype.update = function (t) {
    this.currentTime += 1e3 * t.getTpf(), this.currentTime >= this.totalWait && t.send(this.transitions.timeUp);
  }, e;
}(goo.Action), goo.TransitionAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Transition", name: "Transition", type: "transitions", description: "Transition to a selected state.", canTransition: !0, parameters: [], transitions: [{ key: "transition", description: "State to transition to." }] };var n = { transition: "On Enter" };return e.getTransitionLabel = function (t) {
    return n[t];
  }, e.prototype.enter = function (t) {
    t.send(this.transitions.transition);
  }, e;
}(goo.Action), goo.NextFrameAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "transitionOnNextFrame", name: "Transition on next frame", type: "transitions", description: "Transition to a selected state on the next frame.", canTransition: !0, parameters: [], transitions: [{ key: "transition", name: "On Next Frame", description: "State to transition to on next frame." }] };var n = { transition: "On Next Frame" };return e.getTransitionLabel = function (t) {
    return n[t];
  }, e.prototype.update = function (t) {
    t.send(this.transitions.transition);
  }, e;
}(goo.Action), goo.RandomTransitionAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Random Transition", name: "Random Transition", type: "transitions", description: "Performs a random transition. Will choose one of the two transitions randomly and transition immediately.", canTransition: !0, parameters: [{ name: "Probability A", key: "skewness", type: "float", control: "slider", min: 0, max: 1, description: "The probability that the first destination is chosen over the second.", "default": .5 }], transitions: [{ key: "transition1", description: "First choice." }, { key: "transition2", description: "Second choice." }] };var n = { transition1: "On random outcome A", transition2: "On random outcome B" };return e.getTransitionLabel = function (t) {
    return n[t];
  }, e.prototype.enter = function (t) {
    var e = this.transitions,
        n = e.transition1,
        o = e.transition2,
        i = Math.random() < this.skewness ? n : o;t.send(i);
  }, e;
}(goo.Action), goo.EmitAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments);
  }return n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.external = { key: "Emit message", name: "Emit Message", type: "transitions", description: "Emits a message (event) to a channel on the bus. Messages can be listened to by the Listen action, or by scripts using the SystemBus.addListener(channel, callback) function.", parameters: [{ name: "Channel", key: "channel", type: "string", description: "Channel to transmit a message (event) on.", "default": "" }], transitions: [] }, n.prototype.enter = function () {
    e.emit(this.channel, this.data);
  }, n;
}(goo.Action, goo.SystemBus), goo.TransitionOnMessageAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments);
  }return n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.external = { key: "Transition on Message", name: "Listen", type: "transitions", description: "Performs a transition on receiving a system bus message (event) on a specific channel.", canTransition: !0, parameters: [{ name: "Message channel", key: "channel", type: "string", description: "Channel to listen to.", "default": "" }], transitions: [{ key: "transition", description: "State to transition to." }] }, n.getTransitionLabel = function (t, e) {
    var n = e.options.channel ? '"' + e.options.channel + '"' : "";return "transition" === t ? "On " + n + " event" : "On Message";
  }, n.prototype.enter = function (t) {
    this.eventListener = function () {
      t.send(this.transitions.transition);
    }.bind(this), e.addListener(this.channel, this.eventListener, !1);
  }, n.prototype.exit = function () {
    e.removeListener(this.channel, this.eventListener);
  }, n;
}(goo.Action, goo.SystemBus), goo.EvalAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments), this.expressionFunction = null;
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Eval", name: "Eval", description: "Evaluates a JS expression.", parameters: [{ name: "expression", key: "expression", type: "string", description: "JavaScript expression to evaluate.", "default": "" }], transitions: [] }, e.prototype.enter = function () {
    this.expressionFunction = new Function("goo", this.expression);
  }, e.prototype.update = function (t) {
    if (this.expressionFunction) try {
      this.expressionFunction(t.getEvalProxy());
    } catch (e) {
      console.warn("Eval code error: " + e.message);
    }
  }, e;
}(goo.Action), goo.HideAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Hide", name: "Hide", type: "display", description: "Hides an entity and its children.", parameters: [], transitions: [] }, e.prototype.enter = function (t) {
    var e = t.getOwnerEntity();e.hide();
  }, e;
}(goo.Action), goo.ShowAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Show", name: "Show", type: "display", description: "Makes an entity visible.", parameters: [], transitions: [] }, e.prototype.enter = function (t) {
    var e = t.getOwnerEntity();e.show();
  }, e;
}(goo.Action), goo.RemoveAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Remove", name: "Remove", type: "display", description: "Removes the entity from the world.", parameters: [{ name: "Recursive", key: "recursive", type: "boolean", description: "Remove children too.", "default": !1 }], transitions: [] }, e.prototype.enter = function (t) {
    var e = t.getOwnerEntity();e.removeFromWorld(this.recursive);
  }, e;
}(goo.Action), goo.AddLightAction = function (t, e, n, o, i) {
  "use strict";

  function r() {
    t.apply(this, arguments);
  }return r.prototype = Object.create(t.prototype), r.prototype.constructor = r, r.external = { key: "Add Light", name: "Add Light", description: "Adds a point light to the entity.", type: "light", parameters: [{ name: "Color", key: "color", type: "vec3", control: "color", description: "Color of the light.", "default": [1, 1, 1] }, { name: "Light type", key: "type", type: "string", control: "dropdown", description: "Light type.", "default": "Point", options: ["Point", "Directional", "Spot"] }, { name: "Range", key: "range", type: "float", control: "slider", min: 0, max: 1e3, description: "Range of the light.", "default": 200 }, { name: "Cone Angle", key: "angle", type: "float", control: "slider", min: 1, max: 170, description: "Cone angle (applies only to spot lights).", "default": 30 }, { name: "Penumbra", key: "penumbra", type: "float", control: "slider", min: 0, max: 170, description: "Penumbra (applies only to spot lights).", "default": 30 }], transitions: [] }, r.prototype.enter = function (t) {
    var r = t.getOwnerEntity();if (r.lightComponent) return void (this._untouched = !0);var s;"Directional" === this.type ? s = new o() : "Spot" === this.type ? (s = new i(), s.range = +this.range, s.angle = +this.angle, s.penumbra = +this.penumbra) : (s = new n(), s.range = +this.range), s.color.setDirect(this.color[0], this.color[1], this.color[2]), r.setComponent(new e(s));
  }, r.prototype.cleanup = function (t) {
    if (!this._untouched) {
      var e = t.getOwnerEntity();e && e.clearComponent("LightComponent");
    }
  }, r;
}(goo.Action, goo.LightComponent, goo.PointLight, goo.DirectionalLight, goo.SpotLight), goo.RemoveLightAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Remove Light", name: "Remove Light", type: "light", description: "Removes the light attached to the entity.", parameters: [], transitions: [] }, e.prototype.enter = function (t) {
    var e = t.getOwnerEntity();e.hasComponent("LightComponent") && e.clearComponent("LightComponent");
  }, e;
}(goo.Action), goo.SetLightPropertiesAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Set Light Properties", name: "Set Light Properties", description: "Sets various properties of a light.", parameters: [{ name: "Entity (optional)", key: "entity", type: "entity", description: "Entity that has a light." }, { name: "Color", key: "color", type: "vec3", control: "color", description: "Light color.", "default": [1, 1, 1] }, { name: "Intensity", key: "intensity", type: "float", description: "Light intensity.", "default": 1 }, { name: "Specular Intensity", key: "specularIntensity", type: "float", description: "Specular light intensity.", "default": 1 }, { name: "Range", key: "range", type: "float", description: "Light range (for point/spot lights).", "default": 100 }], transitions: [] }, e.prototype.enter = function (t) {
    var e = this.entity && t.getEntityById(this.entity.entityRef) || t.getOwnerEntity();e && e.lightComponent && e.lightComponent.light && (e.lightComponent.light.color.setDirect(this.color[0], this.color[1], this.color[2]), e.lightComponent.light.intensity = this.intensity, e.lightComponent.light.specularIntensity = this.specularIntensity, e.lightComponent.light.range = this.range);
  }, e;
}(goo.Action), goo.TweenLightColorAction = function (t, e, n) {
  "use strict";

  function o() {
    t.apply(this, arguments), this.fromCol = new e(), this.toCol = new e(), this.completed = !1;
  }return o.prototype = Object.create(t.prototype), o.prototype.constructor = o, o.external = { key: "Tween Light Color", name: "Tween Light", type: "light", description: "Tweens the color of the light.", parameters: [{ name: "Color", key: "to", type: "vec3", control: "color", description: "Color of the light.", "default": [1, 1, 1] }, { name: "Time (ms)", key: "time", type: "float", description: "Time it takes for the transition to complete.", "default": 1e3 }, { name: "Easing type", key: "easing1", type: "string", control: "dropdown", description: "Easing type.", "default": "Linear", options: ["Linear", "Quadratic", "Exponential", "Circular", "Elastic", "Back", "Bounce"] }, { name: "Direction", key: "easing2", type: "string", control: "dropdown", description: "Easing direction.", "default": "In", options: ["In", "Out", "InOut"] }], transitions: [{ key: "complete", description: "State to transition to when the light tween was completed." }] }, o.getTransitionLabel = function (t) {
    return "complete" === t ? "On Tween Light Complete" : void 0;
  }, o.prototype.ready = function () {
    "Linear" === this.easing1 ? this.easing = n.Easing.Linear.None : this.easing = n.Easing[this.easing1][this.easing2];
  }, o.prototype.enter = function (t) {
    var e = t.getOwnerEntity();e.lightComponent && (this.fromCol.set(e.lightComponent.light.color), this.toCol.setDirect(this.to[0], this.to[1], this.to[2]), this.startTime = t.getTime(), this.completed = !1);
  }, o.prototype.update = function (t) {
    if (!this.completed) {
      var e = t.getOwnerEntity();if (e.lightComponent) {
        var n = Math.min(1e3 * (t.getTime() - this.startTime) / this.time, 1),
            o = this.easing(n),
            i = e.lightComponent.light.color;i.set(this.fromCol).lerp(this.toCol, o), n >= 1 && (t.send(this.transitions.complete), this.completed = !0);
      }
    }
  }, o;
}(goo.Action, goo.Vector3, goo.TWEEN), goo.SetClearColorAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Set Clear Color", name: "Background Color", description: "Sets the clear color.", parameters: [{ name: "Color", key: "color", type: "vec4", control: "color", description: "Color.", "default": [1, 1, 1, 1] }], transitions: [] }, e.prototype.enter = function (t) {
    var e = t.getOwnerEntity(),
        n = this.color;e._world.gooRunner.renderer.setClearColor(n[0], n[1], n[2], n[3]);
  }, e;
}(goo.Action), goo.SwitchCameraAction = function (t, e, n) {
  "use strict";

  function o() {
    t.apply(this, arguments), this._camera = null;
  }return o.prototype = Object.create(t.prototype), o.prototype.constructor = o, o.external = { key: "Switch Camera", name: "Switch Camera", type: "camera", description: "Switches to a selected camera.", parameters: [{ name: "Camera", key: "cameraEntityRef", type: "camera", description: "Camera to switch to.", "default": null }], transitions: [] }, o.prototype.ready = function () {
    this._camera = n.mainCamera;
  }, o.prototype.enter = function (t) {
    var n = t.getOwnerEntity()._world,
        o = n.entityManager.getEntityById(this.cameraEntityRef);o && o.cameraComponent && e.emit("goo.setCurrentCamera", { camera: o.cameraComponent.camera, entity: o });
  }, o;
}(goo.Action, goo.SystemBus, goo.Renderer), goo.InFrustumAction = function (t, e, n) {
  "use strict";

  function o() {
    t.apply(this, arguments);
  }o.prototype = Object.create(t.prototype), o.prototype.constructor = o, o.external = { key: "In Frustum", name: "In View", type: "camera", description: "Performs a transition based on whether the entity is in a camera's frustum or not.", canTransition: !0, parameters: [{ name: "Current camera", key: "current", type: "boolean", description: "Check this to always use the current camera.", "default": !0 }, { name: "Camera", key: "cameraEntityRef", type: "camera", description: "Other camera; Will be ignored if the previous option is checked.", "default": null }, { name: "On every frame", key: "everyFrame", type: "boolean", description: "Repeat this action every frame.", "default": !0 }], transitions: [{ key: "inside", description: "State to transition to if entity is in the frustum." }, { key: "outside", description: "State to transition to if entity is outside the frustum." }] };var i = { inside: "On Inside Frustum", outside: "On Outside Frustum" };return o.getTransitionLabel = function (t) {
    return i[t];
  }, o.prototype.checkFrustum = function (t) {
    var o = t.getOwnerEntity();if (this.current) o.isVisible ? t.send(this.transitions.inside) : t.send(this.transitions.outside);else {
      var i = o.meshRendererComponent ? o.meshRendererComponent.worldBound : new n(o.transformComponent.worldTransform.translation, .001);this.camera.contains(i) === e.Outside ? t.send(this.transitions.outside) : t.send(this.transitions.inside);
    }
  }, o.prototype.enter = function (t) {
    if (!this.current) {
      var e = t.getOwnerEntity()._world,
          n = e.entityManager.getEntityById(this.cameraEntityRef);this.camera = n.cameraComponent.camera;
    }this.everyFrame || this.checkFrustum(t);
  }, o.prototype.update = function (t) {
    this.everyFrame && this.checkFrustum(t);
  }, o;
}(goo.Action, goo.Camera, goo.BoundingSphere), goo.DollyZoomAction = function (t, e, n, o) {
  "use strict";

  function i() {
    t.apply(this, arguments), this.from = new n(), this.to = new n(), this.completed = !1;
  }return i.prototype = Object.create(t.prototype), i.prototype.constructor = i, i.external = { key: "Dolly Zoom", name: "Dolly Zoom", type: "camera", description: "Performs dolly zoom.", parameters: [{ name: "Forward", key: "forward", type: "float", description: "Number of units to move towards the focus point. Enter negative values to move away.", "default": 100 }, { name: "Focus point", key: "lookAt", type: "position", description: "Point to focus on while transitioning.", "default": [0, 0, 0] }, { name: "Time (ms)", key: "time", type: "float", description: "Time.", "default": 1e4 }, { name: "Easing type", key: "easing1", type: "string", control: "dropdown", description: "Easing.", "default": "Linear", options: ["Linear", "Quadratic", "Exponential", "Circular", "Elastic", "Back", "Bounce"] }, { name: "Direction", key: "easing2", type: "string", control: "dropdown", description: "Easing direction.", "default": "In", options: ["In", "Out", "InOut"] }], transitions: [{ key: "complete", description: "State to transition to when the transition completes." }] }, i.getTransitionLabel = function () {
    return "On Dolly Zoom Complete";
  }, i.prototype.ready = function () {
    "Linear" === this.easing1 ? this.easing = o.Easing.Linear.None : this.easing = o.Easing[this.easing1][this.easing2];
  }, i.prototype.enter = function (t) {
    var e = t.getOwnerEntity();
    if (this.completed = !1, e.cameraComponent && e.cameraComponent.camera) {
      var o = e.transformComponent,
          i = o.transform.translation,
          r = e.cameraComponent.camera;this.fromDistance = new n(this.lookAt).distance(r.translation), this.toDistance = this.fromDistance - this.forward, this.eyeTargetScale = Math.tan(r.fov * (Math.PI / 180) / 2) * this.fromDistance;var s = new n().copy(i),
          a = n.fromArray(this.lookAt).sub(s).normalize().scale(this.forward).add(s);this.from.set(s.x, s.y, s.z), this.to.setDirect(a.x, a.y, a.z), this.startTime = t.getTime();
    } else this.eyeTargetScale = null;
  }, i.prototype.update = function (t) {
    if (!this.completed && this.eyeTargetScale) {
      var n = t.getOwnerEntity(),
          o = n.transformComponent,
          i = n.cameraComponent.camera,
          r = Math.min(1e3 * (t.getTime() - this.startTime) / this.time, 1),
          s = this.easing(r);o.transform.translation.set(this.from).lerp(this.to, s), o.setUpdated();var a = e.lerp(s, this.fromDistance, this.toDistance),
          c = 180 / Math.PI * 2 * Math.atan(this.eyeTargetScale / a);i.setFrustumPerspective(c), r >= 1 && (t.send(this.transitions.complete), this.completed = !0);
    }
  }, i;
}(goo.Action, goo.MathUtils, goo.Vector3, goo.TWEEN), goo.InBoxAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }function n(t, e, n) {
    var o = !1,
        i = function i(t, e, n) {
      if (e > n) {
        if (e > t && t > n) return !0;
      } else if (n > e) {
        if (n > t && t > e) return !0;
      } else if (t === n) return !0;return !1;
    },
        r = i(t[0], e[0], n[0]),
        s = i(t[1], e[1], n[1]),
        a = i(t[2], e[2], n[2]);return r && s && a && (o = !0), o;
  }e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "In Box", name: "In Box", type: "collision", description: "Performs a transition based on whether an entity is inside a user defined box volume or not. The volume is defined by setting two points which, when connected, form a diagonal through the box volume.", canTransition: !0, parameters: [{ name: "Point1", key: "point1", type: "position", description: "First box point.", "default": [-1, -1, -1] }, { name: "Point2", key: "point2", type: "position", description: "Second box point.", "default": [1, 1, 1] }, { name: "On every frame", key: "everyFrame", type: "boolean", description: "Repeat this action every frame.", "default": !0 }], transitions: [{ key: "inside", description: "State to transition to if the entity is inside the box." }, { key: "outside", description: "State to transition to if the entity is outside the box." }] };var o = { inside: "On Inside Box", outside: "On Outside Box" };return e.getTransitionLabel = function (t) {
    return o[t];
  }, e.prototype.checkInside = function (t) {
    var e = t.getOwnerEntity(),
        o = e.transformComponent.worldTransform.translation,
        i = n([o.x, o.y, o.z], this.point1, this.point2);i ? t.send(this.transitions.inside) : t.send(this.transitions.outside);
  }, e.prototype.enter = function (t) {
    this.everyFrame || this.checkInside(t);
  }, e.prototype.update = function (t) {
    this.everyFrame && this.checkInside(t);
  }, e;
}(goo.Action), goo.CompareDistanceAction = function (t, e, n) {
  "use strict";

  function o() {
    t.apply(this, arguments);
  }o.prototype = Object.create(t.prototype), o.prototype.constructor = o, o.external = { key: "Compare Distance", name: "Camera Distance", type: "collision", description: "Performs a transition based on the distance to the main camera or to a location.", canTransition: !0, parameters: [{ name: "Current camera", key: "camera", type: "boolean", description: "Measure the distance to the current camera or to an arbitrary point.", "default": !0 }, { name: "Position", key: "position", type: "position", description: "Position to measure the distance to; Will be ignored if previous option is selected.", "default": [0, 0, 0] }, { name: "Value", key: "value", type: "float", description: "Value to compare to.", "default": 0 }, { name: "Tolerance", key: "tolerance", type: "float", "default": 0 }, { name: "Type", key: "distanceType", type: "string", control: "dropdown", description: "The type of distance.", "default": "Euclidean", options: ["Euclidean", "Manhattan"] }, { name: "On every frame", key: "everyFrame", type: "boolean", description: "Repeat this action every frame.", "default": !0 }], transitions: [{ key: "less", description: "State to transition to if the measured distance is smaller than the specified value." }, { key: "equal", description: "State to transition to if the measured distance is about the same as the specified value." }, { key: "greater", description: "State to transition to if the measured distance is greater than the specified value." }] };var i = { less: "On camera distance < X", equal: "On camera distance == X", greater: "On camera distance > X" };return o.getTransitionLabel = function (t) {
    return i[t];
  }, o.prototype.compare = function (t) {
    var e,
        o = t.getOwnerEntity(),
        i = o.transformComponent.worldTransform.translation;e = this.camera ? i.clone().sub(n.mainCamera.translation) : i.clone().subDirect(this.position[0], this.position[1], this.position[2]);var r;r = "Euclidean" === this.type ? e.length() : Math.abs(e.x) + Math.abs(e.y) + Math.abs(e.z);var s = this.value - r;Math.abs(s) <= this.tolerance ? t.send(this.transitions.equal) : s > 0 ? t.send(this.transitions.less) : t.send(this.transitions.greater);
  }, o.prototype.enter = function (t) {
    this.everyFrame || this.compare(t);
  }, o.prototype.update = function (t) {
    this.everyFrame && this.compare(t);
  }, o;
}(goo.Action, goo.Vector3, goo.Renderer), goo.ProximitySystem = function (t, e, n) {
  "use strict";

  function o() {
    t.call(this, "ProximitySystem", ["ProximityComponent"]), this.collections = { Red: { name: "Red", collection: [] }, Blue: { name: "Blue", collection: [] }, Green: { name: "Green", collection: [] }, Yellow: { name: "Yellow", collection: [] } };
  }function i(t) {
    return n.capitalize(t);
  }return o.prototype = Object.create(t.prototype), o.prototype._collides = function (t, n) {
    for (var o = 0; o < t.collection.length; o++) {
      for (var i = t.collection[o], r = 0; r < n.collection.length; r++) {
        var s = n.collection[r];i.meshRendererComponent.worldBound.intersects(s.meshRendererComponent.worldBound) && e.send("collides." + t.name + "." + n.name);
      }
    }
  }, o.prototype.getFor = function (t) {
    return t = i(t), this.collections[t] ? this.collections[t].collection : [];
  }, o.prototype.add = function (t, e) {
    e = i(e), this.collections[e] || (this.collections[e] = { name: e, collection: [] }), this.collections[e].collection.push(t);
  }, o.prototype.remove = function (t, e) {
    e = i(e);var n = this.collections[e].collection,
        o = n.indexOf(t);n.splice(o, 1);
  }, o.prototype.process = function () {}, o;
}(goo.System, goo.SystemBus, goo.StringUtils), goo.CollidesAction = function (t, e, n) {
  "use strict";

  function o() {
    e.apply(this, arguments);
  }o.prototype = Object.create(e.prototype), o.prototype.constructor = o, o.external = { key: "Collides", name: "Collision (Bounding volume intersection)", type: "collision", description: "Checks for collisions or non-collisions with other entities. Collisions are based on the entities' bounding volumes. Before using collisions you first need to tag your entities.", canTransition: !0, parameters: [{ name: "Tag", key: "tag", type: "string", description: "Checks for collisions with other objects having this tag.", "default": "red" }], transitions: [{ key: "collides", description: "State to transition to when a collision occurs." }, { key: "notCollides", description: "State to transition to when a collision is not occurring." }] };var i = { collides: "On bounds Overlap", notCollides: "On bounds Separate" };return o.getTransitionLabel = function (t) {
    return i[t];
  }, o.prototype.ready = function (t) {
    var e = t.getOwnerEntity(),
        o = e._world;o.getSystem("ProximitySystem") || o.setSystem(new n());
  }, o.prototype.update = function (e) {
    var n = e.getOwnerEntity(),
        o = n._world,
        i = o.getSystem("ProximitySystem"),
        r = new t(i.getFor(this.tag)).and(o.by.tag(this.tag)).toArray(),
        s = !1;n.traverse(function (t) {
      if (!t.meshRendererComponent || t.particleComponent) return !1;for (var e = t.meshRendererComponent.worldBound, n = 0; n < r.length; n++) {
        if (r[n].traverse(function (t) {
          if (!t.meshRendererComponent || t.particleComponent) return !0;var n = t.meshRendererComponent.worldBound;return n && e.intersects(n) ? (s = !0, !1) : void 0;
        }), s) return !1;
      }
    }), e.send(s ? this.transitions.collides : this.transitions.notCollides);
  }, o;
}(goo.EntitySelection, goo.Action, goo.ProximitySystem), goo.ProximityComponent = function (t) {
  "use strict";

  function e(e) {
    t.apply(this, arguments), this.type = "ProximityComponent", Object.defineProperty(this, "tag", { value: e || "red", writable: !1 });
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.prototype.attached = function (t) {
    var e = t._world;if (e) {
      var n = e.getSystem("ProximitySystem");n && n.add(t, this.tag);
    }
  }, e.prototype.detached = function (t) {
    var e = t._world;if (e) {
      var n = e.getSystem("ProximitySystem");n && n.remove(t, this.tag);
    }
  }, e;
}(goo.Component), goo.TagAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments);
  }return n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.external = { key: "Tag", name: "Tag", type: "collision", description: "Sets a tag on the entity. Use tags to be able to capture collision events with the 'Collides' action.", parameters: [{ name: "Tag", key: "tag", type: "string", control: "dropdown", description: "Checks for collisions with other objects having this tag.", "default": "red", options: ["red", "blue", "green", "yellow"] }], transitions: [] }, n.prototype.enter = function (t) {
    var n = t.getOwnerEntity();n.proximityComponent ? n.proximityComponent.tag !== this.tag && (n.clearComponent("ProximityComponent"), n.setComponent(new e(this.tag))) : n.setComponent(new e(this.tag));
  }, n.prototype.cleanup = function (t) {
    var e = t.getOwnerEntity();e && e.clearComponent("ProximityComponent");
  }, n;
}(goo.Action, goo.ProximityComponent), goo.SmokeAction = function (t, e, n, o, i, r) {
  "use strict";

  function s() {
    t.apply(this, arguments), this.smokeEntity = null;
  }return s.material = null, s.prototype = Object.create(t.prototype), s.prototype.constructor = s, s.external = { key: "Smoke", name: "Smoke FX", type: "fx", description: 'Makes the entity emit smoke. To cancel the smoke emitter use the "Remove Particles" action.', parameters: [{ name: "Color", key: "color", type: "vec3", control: "color", description: "Smoke color.", "default": [0, 0, 0] }], transitions: [] }, s.prototype.enter = function (t) {
    var o = t.getOwnerEntity();if (!this.smokeEntity || -1 === o.transformComponent.children.indexOf(this.smokeEntity.transformComponent)) {
      var a = o._world.gooRunner;if (!s.material) {
        s.material = new e(n.particles);var c = r.createFlareTexture();c.generateMipmaps = !0, s.material.setTexture("DIFFUSE_MAP", c), s.material.blendState.blending = "TransparencyBlending", s.material.cullState.enabled = !1, s.material.depthState.write = !1, s.material.renderQueue = 2001;
      }var p = o.transformComponent.worldTransform.scale,
          u = (p.x + p.y + p.z) / 3;this.smokeEntity = r.createParticleSystemEntity(a.world, i.getSmoke({ scale: u, color: this.color }), s.material), this.smokeEntity.meshRendererComponent.isPickable = !1, this.smokeEntity.meshRendererComponent.castShadows = !1, this.smokeEntity.meshRendererComponent.receiveShadows = !1, this.smokeEntity.name = "_ParticleSystemSmoke", o.transformComponent.attachChild(this.smokeEntity.transformComponent), this.smokeEntity.addToWorld();
    }
  }, s.prototype.cleanup = function () {
    this.smokeEntity && (this.smokeEntity.removeFromWorld(), this.smokeEntity = null);
  }, s;
}(goo.Action, goo.Material, goo.ShaderLib, goo.TextureCreator, goo.ParticleLib, goo.ParticleSystemUtils), goo.FireAction = function (t, e, n, o, i) {
  "use strict";

  function r() {
    t.apply(this, arguments), this.fireEntity = null;
  }return r.material = null, r.prototype = Object.create(t.prototype), r.prototype.constructor = r, r.external = { key: "Fire", name: "Fire FX", type: "fx", description: 'Makes the entity emit fire. To "extinguish" the fire use the "Remove Particles" action.', parameters: [{ name: "Start Color", key: "startColor", type: "vec3", control: "color", description: "Flame color at source.", "default": [1, 1, 0] }, { name: "End color", key: "endColor", type: "vec3", control: "color", description: "Color near the end of a flame's life.", "default": [1, 0, 0] }], transitions: [] }, r.prototype.enter = function (t) {
    var s = t.getOwnerEntity();if (!this.fireEntity || -1 === s.transformComponent.children.indexOf(this.fireEntity.transformComponent)) {
      var a = s._world.gooRunner;if (!r.material) {
        r.material = new e(n.particles);var c = i.createFlareTexture();c.generateMipmaps = !0, r.material.setTexture("DIFFUSE_MAP", c), r.material.blendState.blending = "AdditiveBlending", r.material.cullState.enabled = !1, r.material.depthState.write = !1, r.material.renderQueue = 2002;
      }var p = s.transformComponent.worldTransform.scale,
          u = (p.x + p.y + p.z) / 3;this.fireEntity = i.createParticleSystemEntity(a.world, o.getFire({ scale: u, startColor: this.startColor, endColor: this.endColor }), r.material), this.fireEntity.meshRendererComponent.isPickable = !1, this.fireEntity.meshRendererComponent.castShadows = !1, this.fireEntity.meshRendererComponent.receiveShadows = !1, this.fireEntity.name = "_ParticleSystemFire", s.transformComponent.attachChild(this.fireEntity.transformComponent), this.fireEntity.addToWorld();
    }
  }, r.prototype.cleanup = function () {
    this.fireEntity && (this.fireEntity.removeFromWorld(), this.fireEntity = null);
  }, r;
}(goo.Action, goo.Material, goo.ShaderLib, goo.ParticleLib, goo.ParticleSystemUtils), goo.RemoveParticlesAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Remove Particles", name: "Remove Particles", type: "fx", description: "Removes any particle emitter attached to the entity.", parameters: [], transitions: [] }, e.prototype.enter = function (t) {
    var e = t.getOwnerEntity();e.children().each(function (t) {
      -1 !== t.name.indexOf("_ParticleSystem") && t.hasComponent("ParticleComponent") && t.removeFromWorld();
    });
  }, e;
}(goo.Action), goo.TogglePostFxAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Toggle Post FX", name: "Toggle Post FX", type: "fx", description: "Enabled/disables post fx globally.", parameters: [{ name: "Set Post FX state", key: "enabled", type: "boolean", description: "Set Post FX on/off.", "default": !0 }], transitions: [] }, e.prototype.enter = function (t) {
    var e = t.getWorld().gooRunner.renderSystem;e && e.enableComposers(this.enabled);
  }, e;
}(goo.Action), goo.ToggleFullscreenAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments);
  }return n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.external = { key: "Toggle Fullscreen", name: "Toggle Fullscreen", type: "display", description: "Toggles fullscreen on/off.", parameters: [], transitions: [] }, n.prototype.enter = function () {
    e.toggleFullScreen();
  }, n;
}(goo.Action, goo.GameUtils), goo.PlaySoundAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments);
  }n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.external = { key: "Play Sound", name: "Play Sound", type: "sound", description: "Plays a sound. NOTE: On iOS devices, you need to play the first sound inside a touchend event (for example using the MouseUpAction).", canTransition: !0, parameters: [{ name: "Sound", key: "sound", type: "sound", description: "Sound to play." }], transitions: [{ key: "complete", description: "State to transition to when the sound finishes playing." }] };var o = { complete: "On Sound End" };return n.getTransitionLabel = function (t) {
    return o[t];
  }, n.prototype.enter = function (t) {
    var n = t.getOwnerEntity();if (n.hasComponent("SoundComponent")) {
      var o = n.soundComponent.getSoundById(this.sound);if (o) {
        var i;try {
          i = o.play();
        } catch (r) {
          console.warn("Could not play sound: " + r), i = e.resolve();
        }i.then(function () {
          t.send(this.transitions.complete);
        }.bind(this));
      }
    }
  }, n;
}(goo.Action, goo.PromiseUtil), goo.PauseSoundAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Pause Sound", name: "Pause Sound", type: "sound", description: "Pauses a sound.", canTransition: !1, parameters: [{ name: "Sound", key: "sound", type: "sound", description: "Sound to pause." }], transitions: [] }, e.prototype.enter = function (t) {
    var e = t.getOwnerEntity();if (e.hasComponent("SoundComponent")) {
      var n = e.soundComponent.getSoundById(this.sound);n && n.pause();
    }
  }, e;
}(goo.Action), goo.StopSoundAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Stop Sound", name: "Stop Sound", type: "sound", description: "Stops a sound.", canTransition: !1, parameters: [{ name: "Sound", key: "sound", type: "sound", description: "Sound to stop." }], transitions: [] }, e.prototype.enter = function (t) {
    var e = t.getOwnerEntity();if (e.hasComponent("SoundComponent")) {
      var n = e.soundComponent.getSoundById(this.sound);n && n.stop();
    }
  }, e;
}(goo.Action), goo.SoundFadeInAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments);
  }n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.external = { key: "Sound Fade In", name: "Sound Fade In", type: "sound", description: "Fades in a sound. NOTE: On iOS devices, you need to play the first sound inside a touchend event (for example using the MouseUpAction).", canTransition: !0, parameters: [{ name: "Sound", key: "sound", type: "sound", description: "Sound to fade." }, { name: "Time (ms)", key: "time", type: "float", description: "Time it takes for the fading to complete.", "default": 1e3 }, { name: "On Sound End", key: "onSoundEnd", type: "boolean", description: "Whether to transition when the sound finishes playing, regardless of the specified transition time.", "default": !1 }], transitions: [{ key: "complete", description: "State to transition to when the time expires or when the sound finishes playing." }] };var o = { complete: "On Sound Fade In Complete" };return n.getTransitionLabel = function (t) {
    return o[t];
  }, n.prototype.enter = function (t) {
    var n = t.getOwnerEntity();if (n.hasComponent("SoundComponent")) {
      var o = n.soundComponent.getSoundById(this.sound);if (o) {
        var i;try {
          i = o.fadeIn(this.time / 1e3), this.onSoundEnd && (i = o.play());
        } catch (r) {
          console.warn("Could not play sound: " + r), i = e.resolve();
        }i.then(function () {
          t.send(this.transitions.complete);
        }.bind(this));
      }
    }
  }, n;
}(goo.Action, goo.PromiseUtil), goo.SoundFadeOutAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Sound Fade Out", name: "Sound Fade Out", type: "sound", description: "Fades out a sound and stops it.", canTransition: !0, parameters: [{ name: "Sound", key: "sound", type: "sound", description: "Sound to fade out." }, { name: "Time (ms)", key: "time", type: "float", description: "Time it takes for the fading to complete.", "default": 1e3 }], transitions: [{ key: "complete", description: "State to transition to when the sound fade completes." }] };var n = { complete: "On Sound Fade Out Complete" };return e.getTransitionLabel = function (t) {
    return n[t];
  }, e.prototype.enter = function (t) {
    var e = t.getOwnerEntity();if (e.hasComponent("SoundComponent")) {
      var n = e.soundComponent.getSoundById(this.sound);n && n.fadeOut(this.time / 1e3).then(function () {
        t.send(this.transitions.complete);
      }.bind(this));
    }
  }, e;
}(goo.Action), goo.SetRenderTargetAction = function (t, e, n, o, i, r, s, a) {
  "use strict";

  function c() {
    t.apply(this, arguments);
  }return c.prototype = Object.create(t.prototype), c.prototype.constructor = c, c.external = { key: "Set Render Target", name: "Set Render Target", type: "texture", description: "Renders what a camera sees on the current entity's texture.", parameters: [{ name: "Camera", key: "cameraEntityRef", type: "camera", description: "Camera to use as source.", "default": null }], transitions: [] }, c.prototype.ready = function (t) {
    var e = t.getOwnerEntity(),
        o = e._world;if (!o.getSystem("PortalSystem")) {
      var i = o.getSystem("RenderSystem"),
          r = o.gooRunner.renderer;o.setSystem(new n(r, i));
    }
  }, c.prototype.enter = function (t) {
    var n = t.getOwnerEntity(),
        o = n._world,
        i = o.entityManager.getEntityById(this.cameraEntityRef);if (i && i.cameraComponent && i.cameraComponent.camera) {
      var r = i.cameraComponent.camera,
          c = new s(a.textured);if (n.meshRendererComponent) {
        this.oldMaterials = n.meshRendererComponent.materials, n.meshRendererComponent.materials = [c];var p = new e(r, 500, { preciseRecursion: !0 });n.setComponent(p);
      }
    }
  }, c.prototype.cleanup = function (t) {
    var e = t.getOwnerEntity();e && (this.oldMaterials && e.meshRendererComponent && (e.meshRendererComponent.materials = this.oldMaterials), e.clearComponent("portalComponent")), this.oldMaterials = null;
  }, c;
}(goo.Action, goo.PortalComponent, goo.PortalSystem, goo.Vector3, goo.CameraComponent, goo.Camera, goo.Material, goo.ShaderLib), goo.TweenTextureOffsetAction = function (t, e, n) {
  "use strict";

  function o() {
    t.apply(this, arguments), this.fromOffset = new e(), this.toOffset = new e(), this.completed = !1;
  }return o.prototype = Object.create(t.prototype), o.prototype.constructor = o, o.external = { key: "Tween Texture Offset", name: "Tween Texture Offset", type: "texture", description: "Smoothly changes the texture offset of the entity.", canTransition: !0, parameters: [{ name: "X Offset", key: "toX", type: "float", control: "slider", min: 0, max: 1, description: "X Offset.", "default": 1 }, { name: "Y Offset", key: "toY", type: "float", control: "slider", min: 0, max: 1, description: "Y Offset.", "default": 1 }, { name: "Time (ms)", key: "time", type: "float", description: "Time it takes for this transition to complete.", "default": 1e3 }, { name: "Easing type", key: "easing1", type: "string", control: "dropdown", description: "Easing type.", "default": "Linear", options: ["Linear", "Quadratic", "Exponential", "Circular", "Elastic", "Back", "Bounce"] }, { name: "Direction", key: "easing2", type: "string", control: "dropdown", description: "Easing direction.", "default": "In", options: ["In", "Out", "InOut"] }], transitions: [{ key: "complete", description: "State to transition to when the transition completes." }] }, o.getTransitionLabel = function (t) {
    return "complete" === t ? "On UV Tween Complete" : void 0;
  }, o.prototype.ready = function () {
    "Linear" === this.easing1 ? this.easing = n.Easing.Linear.None : this.easing = n.Easing[this.easing1][this.easing2];
  }, o.prototype.enter = function (t) {
    var e = t.getOwnerEntity(),
        n = e.meshRendererComponent;if (this.texture = null, n && 0 !== n.materials.length) {
      var o = n.materials[0];this.texture = o.getTexture("DIFFUSE_MAP"), this.texture && (this.fromOffset.set(this.texture.offset), this.toOffset.setDirect(this.toX, this.toY), this.relative && this.toOffset.add(this.fromOffset), this.startTime = t.getTime(), this.completed = !1);
    }
  }, o.prototype.update = function (t) {
    if (!this.completed && this.texture) {
      var e = Math.min(1e3 * (t.getTime() - this.startTime) / this.time, 1),
          n = this.easing(e);this.texture.offset.set(this.fromOffset).lerp(this.toOffset, n), e >= 1 && (t.send(this.transitions.complete), this.completed = !0);
    }
  }, o;
}(goo.Action, goo.Vector2, goo.TWEEN), goo.SetMaterialColorAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Set Material Color", name: "Set Material Color", type: "texture", description: "Sets the color of a material.", parameters: [{ name: "Entity (optional)", key: "entity", type: "entity", description: "Entity that has a materia.l" }, { name: "Color type", key: "type", type: "string", control: "dropdown", description: "Color type.", "default": "Diffuse", options: ["Diffuse", "Emissive", "Specular", "Ambient"] }, { name: "Color", key: "color", type: "vec3", control: "color", description: "Color.", "default": [1, 1, 1] }], transitions: [] };var n = { Diffuse: "materialDiffuse", Emissive: "materialEmissive", Specular: "materialSpecular", Ambient: "materialAmbient" };return e.prototype.enter = function (t) {
    var e = this.entity && t.getEntityById(this.entity.entityRef) || t.getOwnerEntity();if (e && e.meshRendererComponent) {
      var o = e.meshRendererComponent.materials[0],
          i = n[this.type];o.uniforms[i] = o.uniforms[i] || [1, 1, 1, 1];var r = o.uniforms[i];r[0] = this.color[0], r[1] = this.color[1], r[2] = this.color[2];
    }
  }, e;
}(goo.Action), goo.LogMessageAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Log Message", name: "Log Message", description: "Prints a message in the debug console of your browser.", parameters: [{ name: "Message", key: "message", type: "string", description: "Message to print.", "default": "hello" }, { name: "On every frame", key: "everyFrame", type: "boolean", description: "Repeat this action every frame.", "default": !1 }], transitions: [] }, e.prototype.enter = function () {
    this.everyFrame || console.log(this.message);
  }, e.prototype.update = function () {
    this.everyFrame && console.log(this.message);
  }, e;
}(goo.Action), goo.TweenOpacityAction = function (t, e, n) {
  "use strict";

  function o() {
    t.apply(this, arguments), this.completed = !1;
  }return o.prototype = Object.create(t.prototype), o.prototype.constructor = o, o.external = { key: "Tween Opacity", name: "Tween Material Opacity", type: "texture", description: "Tweens the opacity of a material.", parameters: [{ name: "Opacity", key: "to", type: "float", control: "spinner", description: "Opacity.", "default": 1 }, { name: "Time (ms)", key: "time", type: "float", control: "spinner", description: "Time it takes for the transition to complete.", "default": 1e3 }, { name: "Easing type", key: "easing1", type: "string", control: "dropdown", description: "Easing type.", "default": "Linear", options: ["Linear", "Quadratic", "Exponential", "Circular", "Elastic", "Back", "Bounce"] }, { name: "Direction", key: "easing2", type: "string", control: "dropdown", description: "Easing direction.", "default": "In", options: ["In", "Out", "InOut"] }], transitions: [{ key: "complete", description: "State to transition to when the transition completes." }] }, o.getTransitionLabel = function (t) {
    return "complete" === t ? "On Tween Opacity Complete" : void 0;
  }, o.prototype.ready = function () {
    "Linear" === this.easing1 ? this.easing = n.Easing.Linear.None : this.easing = n.Easing[this.easing1][this.easing2];
  }, o.prototype.enter = function (t) {
    var e = t.getOwnerEntity(),
        n = e.meshRendererComponent;n && (this.startTime = t.getTime(), this.material = n.materials[0], "NoBlending" === this.material.blendState.blending && (this.material.blendState.blending = "TransparencyBlending"), this.material.renderQueue < 2e3 && (this.material.renderQueue = 2e3), void 0 === this.material.uniforms.opacity && (this.material.uniforms.opacity = 1), this.uniforms = this.material.uniforms, this.from = this.uniforms.opacity, this.completed = !1);
  }, o.prototype.update = function (t) {
    if (!this.completed) {
      var n = t.getOwnerEntity(),
          o = n.meshRendererComponent;if (o) {
        var i = Math.min(1e3 * (t.getTime() - this.startTime) / this.time, 1),
            r = this.easing(i);this.uniforms.opacity = e.lerp(r, this.from, this.to), i >= 1 && (t.send(this.transitions.complete), this.completed = !0);
      }
    }
  }, o;
}(goo.Action, goo.MathUtils, goo.TWEEN), goo.HtmlAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "HTMLPick", name: "HTMLPick", type: "controls", description: "Listens for a picking event and performs a transition. Can only be used on HTML entities.", canTransition: !0, parameters: [], transitions: [{ key: "pick", description: "State to transition to when the HTML entity is picked." }] }, e.getTransitionLabel = function () {
    return "On HTML Pick";
  }, e.prototype.enter = function (t) {
    var e = t.getOwnerEntity();e.htmlComponent && (this.eventListener = function () {
      t.send(this.transitions.pick);
    }.bind(this), this.domElement = e.htmlComponent.domElement, this.domElement.addEventListener("click", this.eventListener));
  }, e.prototype.exit = function (t) {
    var e = t.getOwnerEntity();e.htmlComponent && this.domElement && this.domElement.removeEventListener("click", this.eventListener);
  }, e;
}(goo.Action), goo.CopyJointTransformAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments), this.everyFrame = !0;
  }function n(t) {
    t.updateWorldTransform();var e = t.entity;e && e.meshDataComponent && e.meshRendererComponent && e.meshRendererComponent.updateBounds(e.meshDataComponent.modelBound, t.worldTransform);for (var o = 0; o < t.children.length; o++) {
      n(t.children[o]);
    }
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Copy Joint Transform", name: "Copy Joint Transform", type: "animation", description: "Copies a joint's transform from another entity, and applies it to this entity. This entity must be a child of an entity with an animation component.", parameters: [{ name: "Joint", key: "jointIndex", type: "int", control: "jointSelector", "default": null, description: "Joint transform to copy." }], transitions: [] }, e.prototype.update = function (t) {
    if (null !== this.jointIndex) {
      var e = t.getOwnerEntity(),
          o = e.transformComponent.parent;if (o && (o = o.entity, o.animationComponent && o.animationComponent._skeletonPose)) {
        var i = o.animationComponent._skeletonPose,
            r = i._globalTransforms[this.jointIndex];r && (e.transformComponent.transform.matrix.copy(r.matrix), r.matrix.getTranslation(e.transformComponent.transform.translation), r.matrix.getScale(e.transformComponent.transform.scale), r.matrix.getRotation(e.transformComponent.transform.rotation), n(e.transformComponent), e.transformComponent._dirty = !0);
      }
    }
  }, e;
}(goo.Action), goo.TriggerEnterAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments), this.entity = null;
  }return n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.external = { key: "TriggerEnter", name: "TriggerEnter", type: "collision", description: "Transitions when the trigger collider is entered. This action only works if the entity has a Collider Component.", canTransition: !0, parameters: [], transitions: [{ key: "enter", description: "State to transition to when enter occurs." }] }, n.getTransitionLabel = function (t) {
    return "enter" === t ? "On Trigger Enter" : void 0;
  }, n.prototype.enter = function (t) {
    this.entity = t.getOwnerEntity();var n = this;this.listener = function (e) {
      (n.entity && e.entityA === n.entity || e.entityB === n.entity) && (n.entity = null, t.send(n.transitions.enter));
    }, e.addListener("goo.physics.triggerEnter", this.listener);
  }, n.prototype.exit = function () {
    e.removeListener("goo.physics.triggerEnter", this.listener), this.entity = null;
  }, n;
}(goo.Action, goo.SystemBus), goo.TriggerLeaveAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments), this.entity = null;
  }return n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.external = { key: "TriggerLeave", name: "TriggerLeave", type: "collision", description: "Transitions when a collider is leaving the entity trigger collider. This action only works if the entity has a Collider Component.", canTransition: !0, parameters: [], transitions: [{ key: "leave", description: "State to transition to when leave occurs." }] }, n.getTransitionLabel = function (t) {
    return "leave" === t ? "On Trigger Leave" : void 0;
  }, n.prototype.enter = function (t) {
    this.entity = t.getOwnerEntity();var n = this;this.listener = function (e) {
      (n.entity && e.entityA === n.entity || e.entityB === n.entity) && (n.entity = null, t.send(n.transitions.leave));
    }, e.addListener("goo.physics.triggerExit", this.listener);
  }, n.prototype.exit = function () {
    e.removeListener("goo.physics.triggerExit", this.listener), this.entity = null;
  }, n;
}(goo.Action, goo.SystemBus), goo.ApplyImpulseAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments);
  }n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.external = { key: "ApplyImpulse", name: "Apply impulse on rigid body", type: "physics", description: "Apply an impulse to the attached rigid body.", canTransition: !1, parameters: [{ name: "Impulse", key: "impulse", type: "position", description: "Impulse to apply to the body.", "default": [0, 0, 0] }, { name: "Apply point", key: "point", type: "position", description: "Where on the body to apply the impulse, relative to the center of mass.", "default": [0, 0, 0] }, { name: "Space", key: "space", type: "string", control: "dropdown", description: "The space where the impulse and apply point are defined.", "default": "World", options: ["World", "Local"] }], transitions: [] };var o = new e(),
      i = new e();return n.prototype.enter = function (t) {
    var e = t.getOwnerEntity();e.rigidBodyComponent && (o.setArray(this.impulse), i.setArray(this.point), "World" === this.space ? e.rigidBodyComponent.applyImpulse(o, i) : e.rigidBodyComponent.applyImpulseLocal(o, i));
  }, n;
}(goo.Action, goo.Vector3), goo.ApplyForceAction = function (t, e, n) {
  "use strict";

  function o() {
    t.apply(this, arguments);
  }o.prototype = Object.create(t.prototype), o.prototype.constructor = o, o.external = { key: "ApplyForce", name: "Apply force on rigid body", type: "physics", description: "Apply a force to the attached rigid body.", canTransition: !1, parameters: [{ name: "Force", key: "force", type: "position", description: "Force to apply to the body.", "default": [0, 0, 0] }, { name: "Apply point", key: "point", type: "position", description: "Where on the body to apply the force, relative to the center of mass.", "default": [0, 0, 0] }, { name: "Space", key: "space", type: "string", control: "dropdown", description: "The space where the force and apply point are defined.", "default": "World", options: ["World", "Local"] }], transitions: [] };var i = new e(),
      r = new e();return o.prototype.enter = function (t) {
    n.addListener("goo.physics.substep", this.substepListener = function () {
      var e = t.getOwnerEntity();e && e.rigidBodyComponent && (i.setArray(this.force), r.setArray(this.point), "World" === this.space ? e.rigidBodyComponent.applyForce(i, r) : e.rigidBodyComponent.applyForceLocal(i, r));
    }.bind(this));
  }, o.prototype.exit = function () {
    n.removeListener("goo.physics.substep", this.substepListener);
  }, o;
}(goo.Action, goo.Vector3, goo.SystemBus), goo.ApplyTorqueAction = function (t, e, n) {
  "use strict";

  function o() {
    t.apply(this, arguments);
  }o.prototype = Object.create(t.prototype), o.prototype.constructor = o, o.external = { key: "ApplyTorque", name: "Apply torque on rigid body", type: "physics", description: "Apply a torque to the attached rigid body.", canTransition: !1, parameters: [{ name: "Torque", key: "torque", type: "position", description: "Torque to apply to the body.", "default": [0, 0, 0] }, { name: "Space", key: "space", type: "string", control: "dropdown", description: "Whether to apply the torque in local or world space.", "default": "World", options: ["World", "Local"] }], transitions: [] };var i = new e();return o.prototype.enter = function (t) {
    n.addListener("goo.physics.substep", this.substepListener = function () {
      var e = t.getOwnerEntity();e && e.rigidBodyComponent && (i.setArray(this.torque), "World" === this.space ? e.rigidBodyComponent.applyTorque(i) : e.rigidBodyComponent.applyTorqueLocal(i));
    }.bind(this));
  }, o.prototype.exit = function () {
    n.removeListener("goo.physics.substep", this.substepListener);
  }, o;
}(goo.Action, goo.Vector3, goo.SystemBus), goo.SetRigidBodyPositionAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments);
  }n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.external = { key: "Set Rigid Body Position", name: "Set Rigid Body Position", type: "physics", description: "Set the position of the rigid body.", canTransition: !1, parameters: [{ name: "Position", key: "position", type: "position", description: "Absolute world position to set.", "default": [0, 0, 0] }], transitions: [] };var o = new e();return n.prototype.enter = function (t) {
    var e = t.getOwnerEntity();e && e.rigidBodyComponent && (o.setArray(this.position), e.rigidBodyComponent.setPosition(o));
  }, n;
}(goo.Action, goo.Vector3), goo.SetRigidBodyVelocityAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments);
  }n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.external = { key: "Set Rigid Body Velocity", name: "Set Rigid Body Velocity", type: "physics", description: "Set the linear velocity of the rigid body component.", canTransition: !1, parameters: [{ name: "Velocity", key: "velocity", type: "position", description: "Velocity to set.", "default": [0, 0, 0] }], transitions: [] };var o = new e();return n.prototype.enter = function (t) {
    var e = t.getOwnerEntity();e && e.rigidBodyComponent && (o.setArray(this.velocity), e.rigidBodyComponent.setVelocity(o));
  }, n;
}(goo.Action, goo.Vector3), goo.SetRigidBodyAngularVelocityAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments);
  }n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.external = { key: "Set Rigid Body Angular Velocity", name: "Set Rigid Body Angular Velocity", type: "physics", description: "Set the angular velocity of the rigid body component.", canTransition: !1, parameters: [{ name: "Angular velocity", key: "velocity", type: "position", description: "Angular velocity to set.", "default": [0, 0, 0] }], transitions: [] };var o = new e();return n.prototype.enter = function (t) {
    var e = t.getOwnerEntity();e && e.rigidBodyComponent && (o.setArray(this.velocity), e.rigidBodyComponent.setAngularVelocity(o));
  }, n;
}(goo.Action, goo.Vector3), goo.CompareCounterAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Compare Counter", name: "Compare Counter", type: "transitions", description: "Compares a counter with a value.", canTransition: !0, parameters: [{ name: "Name", key: "name", type: "string", description: "Counter name." }, { name: "Value", key: "value", type: "float", description: "Value to compare the counter with.", "default": 0 }, { name: "On every frame", key: "everyFrame", type: "boolean", description: "Repeat this action every frame.", "default": !0 }], transitions: [{ key: "less", description: "State to transition to if the counter is smaller than the specified value." }, { key: "equal", description: "State to transition to if the counter is the same as the specified value." }, { key: "greater", description: "State to transition to if the counter is greater than the specified value." }] };var n = { less: " < X", equal: " == X", greater: " > X" };return e.getTransitionLabel = function (t, e) {
    return n[t] ? "On " + (e.options.name || "Counter") + n[t] : void 0;
  }, e.prototype.compare = function (t) {
    var e = t.getFsm().getVariable(this.name);if (void 0 !== e) {
      var n = this.value;e > n ? t.send(this.transitions.greater) : e === n ? t.send(this.transitions.equal) : t.send(this.transitions.less);
    }
  }, e.prototype.enter = function (t) {
    this.everyFrame || this.compare(t);
  }, e.prototype.update = function (t) {
    this.everyFrame && this.compare(t);
  }, e;
}(goo.Action), goo.CompareCountersAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Compare 2 Counters", name: "Compare 2 Counters", type: "transitions", description: "Compares the value of 2 counters.", canTransition: !0, parameters: [{ name: "First counter", key: "name1", type: "string", description: "First counter name." }, { name: "Second counter", key: "name2", type: "string", description: "Second counter name." }, { name: "On every frame", key: "everyFrame", type: "boolean", description: "Repeat this action every frame.", "default": !0 }], transitions: [{ key: "less", description: "State to transition to if the first counter is smaller than the second counter." }, { key: "equal", description: "State to transition to if the first counter is the same as the second counter." }, { key: "greater", description: "State to transition to if the first counter is greater than the second counter." }] };var n = { less: "<", equal: "==", greater: ">" };return e.getTransitionLabel = function (t, e) {
    return n[t] ? "On " + (e.options.name1 || "Counter1") + " " + n[t] + " " + (e.options.name2 || "counter2") : void 0;
  }, e.prototype.compare = function (t) {
    var e = t.getFsm().getVariable(this.name1),
        n = t.getFsm().getVariable(this.name2);void 0 !== e && void 0 !== n && (e > n ? t.send(this.transitions.greater) : e === n ? t.send(this.transitions.equal) : t.send(this.transitions.less));
  }, e.prototype.enter = function (t) {
    this.everyFrame || this.compare(t);
  }, e.prototype.update = function (t) {
    this.everyFrame && this.compare(t);
  }, e;
}(goo.Action), goo.SetCounterAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Set Counter", name: "Set Counter", type: "transitions", description: "Sets a counter to a value.", parameters: [{ name: "Name", key: "name", type: "string", description: "Counter name." }, { name: "Value", key: "value", type: "float", description: "Value to set the counter to.", "default": 0 }], transitions: [] }, e.prototype.enter = function (t) {
    t.getFsm().defineVariable(this.name, +this.value);
  }, e.prototype.cleanup = function (t) {
    t.getFsm().removeVariable(this.name);
  }, e;
}(goo.Action), goo.IncrementCounterAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Increment Counter", name: "Increment Counter", type: "transitions", description: "Increments a counter with a value.", parameters: [{ name: "Name", key: "name", type: "string", description: "Counter name." }, { name: "Increment", key: "increment", type: "float", description: "Value to increment the counter with.", "default": 1 }, { name: "On every frame", key: "everyFrame", type: "boolean", description: "Repeat this action every frame.", "default": !0 }], transitions: [] }, e.prototype.incrementCounter = function (t) {
    var e = +this.increment;return void 0 === t.getFsm().vars[this.name] ? void t.getFsm().defineVariable(this.name, e) : void t.getFsm().applyOnVariable(this.name, function (t) {
      return t + e;
    });
  }, e.prototype.enter = function (t) {
    this.everyFrame || this.incrementCounter(t);
  }, e.prototype.update = function (t) {
    this.everyFrame && this.incrementCounter(t);
  }, e.prototype.cleanup = function (t) {
    t.getFsm().removeVariable(this.name);
  }, e;
}(goo.Action), goo.MuteAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Mute sounds", name: "Mute sounds", type: "sound", description: "Mute all sounds globally.", canTransition: !1, parameters: [], transitions: [] }, e.prototype.enter = function (t) {
    var e = t.getWorld();if (e) {
      var n = e.getSystem("SoundSystem");n && n.mute();
    }
  }, e;
}(goo.Action), goo.UnmuteAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Unmute sounds", name: "Unmute sounds", type: "sound", description: "Unmute all sounds globally.", canTransition: !1, parameters: [], transitions: [] }, e.prototype.enter = function (t) {
    var e = t.getWorld();if (e) {
      var n = e.getSystem("SoundSystem");n && n.unmute();
    }
  }, e;
}(goo.Action), goo.ToggleMuteAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Toggle mute sounds", name: "Toggle mute sounds", type: "sound", description: "Toggles mute of all sounds globally.", canTransition: !1, parameters: [], transitions: [] }, e.prototype.enter = function (t) {
    var e = t.getWorld();if (e) {
      var n = e.getSystem("SoundSystem");n && (n.muted ? n.unmute() : n.mute());
    }
  }, e;
}(goo.Action), goo.StartTimelineAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Start Timeline", name: "Start Timeline", type: "timeline", description: "Starts or resumes the timeline.", canTransition: !0, parameters: [], transitions: [] }, e.prototype.enter = function (t) {
    var e = t.getOwnerEntity();e.hasComponent("TimelineComponent") && e.timelineComponent.start();
  }, e;
}(goo.Action), goo.PauseTimelineAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Pause Timeline", name: "Pause Timeline", type: "timeline", description: "Pauses the timeline.", canTransition: !0, parameters: [], transitions: [] }, e.prototype.enter = function (t) {
    var e = t.getOwnerEntity();e.hasComponent("TimelineComponent") && e.timelineComponent.pause();
  }, e;
}(goo.Action), goo.StopTimelineAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Stop Timeline", name: "Stop Timeline", type: "timeline", description: "Stops the timeline.", canTransition: !0, parameters: [], transitions: [] }, e.prototype.enter = function (t) {
    var e = t.getOwnerEntity();e.hasComponent("TimelineComponent") && e.timelineComponent.stop();
  }, e;
}(goo.Action), goo.SetTimelineTimeAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Set Timeline Time", name: "Set Timeline Time", type: "timeline", description: "Sets the current time of the timeline.", canTransition: !0, parameters: [{ name: "Time", key: "time", type: "float", description: "Timeline time to set.", "default": 0 }], transitions: [] }, e.prototype.enter = function (t) {
    var e = t.getOwnerEntity();e.hasComponent("TimelineComponent") && e.timelineComponent.setTime(this.time);
  }, e;
}(goo.Action), goo.SetHtmlTextAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Set Html Text", name: "Set Html Text", type: "fx", description: "Sets the contents of an HTML element.", parameters: [{ name: "Entity (optional)", key: "entity", type: "entity", description: "Entity that has an HTML component." }, { name: "Html element selector", key: "selector", type: "string", description: "Element selector to set text on.", "default": "p" }, { name: "Content", key: "content", type: "string", description: "Content to set.", "default": "Hello" }, { name: "Allow HTML", key: "html", type: "boolean", description: "Set to true if the content contains HTML. This will make the action use .innerHTML instead of .innerText.", "default": !1 }], transitions: [] }, e.prototype.enter = function (t) {
    var e = this.entity && t.getEntityById(this.entity.entityRef) || t.getOwnerEntity();if (e && e.htmlComponent && this.selector.length > 0) for (var n = e.htmlComponent.domElement.querySelectorAll(this.selector), o = 0; o < n.length; o++) {
      var i = n[o];this.html ? i.innerHTML = this.content : i.innerText = this.content;
    }
  }, e;
}(goo.Action), goo.Actions = function (t) {
  "use strict";

  function e(t) {
    for (var e = 0, n = e; n < t.length; n++) {
      var i = t[n];o.register(i.external.key, i);
    }
  }var n = {},
      o = {},
      i = ["Eval", "HTMLPick", "Remove", "Collides", "Tag"];return o.register = function (t, e) {
    n[t] = e;
  }, o.actionForType = function (t) {
    return n[t];
  }, o.allActions = function () {
    for (var t = {}, e = Object.keys(n), o = 0; o < e.length; o++) {
      var r = e[o];-1 === i.indexOf(r) && (t[r] = n[r]);
    }return t;
  }, o.allActionsArray = function () {
    for (var t = [], e = Object.keys(n), o = 0; o < e.length; o++) {
      var i = e[o];"Eval" !== i && "HTMLPick" !== i && "Remove" !== i && t.push(n[i]);
    }return t;
  }, e(arguments), o;
}(goo.ArrowsAction, goo.MouseUpAction, goo.MouseDownAction, goo.MouseMoveAction, goo.MousePressedAction, goo.KeyUpAction, goo.KeyDownAction, goo.KeyPressedAction, goo.PickAction, goo.PickAndExitAction, goo.ClickAction, goo.HoverEnterAction, goo.HoverExitAction, goo.WasdAction, goo.MoveAction, goo.RotateAction, goo.ScaleAction, goo.LookAtAction, goo.TweenMoveAction, goo.TweenRotationAction, goo.TweenScaleAction, goo.TweenLookAtAction, goo.ShakeAction, goo.PauseAnimationAction, goo.ResumeAnimationAction, goo.SetAnimationAction, goo.SetTimeScale, goo.WaitAction, goo.TransitionAction, goo.NextFrameAction, goo.RandomTransitionAction, goo.EmitAction, goo.TransitionOnMessageAction, goo.EvalAction, goo.HideAction, goo.ShowAction, goo.RemoveAction, goo.AddLightAction, goo.RemoveLightAction, goo.SetLightPropertiesAction, goo.TweenLightColorAction, goo.SetClearColorAction, goo.SwitchCameraAction, goo.InFrustumAction, goo.DollyZoomAction, goo.InBoxAction, goo.CompareDistanceAction, goo.CollidesAction, goo.TagAction, goo.SmokeAction, goo.FireAction, goo.RemoveParticlesAction, goo.TogglePostFxAction, goo.ToggleFullscreenAction, goo.PlaySoundAction, goo.PauseSoundAction, goo.StopSoundAction, goo.SoundFadeInAction, goo.SoundFadeOutAction, goo.SetRenderTargetAction, goo.TweenTextureOffsetAction, goo.SetMaterialColorAction, goo.LogMessageAction, goo.TweenOpacityAction, goo.HtmlAction, goo.CopyJointTransformAction, goo.TweenOpacityAction, goo.TriggerEnterAction, goo.TriggerLeaveAction, goo.ApplyImpulseAction, goo.ApplyForceAction, goo.ApplyTorqueAction, goo.SetRigidBodyPositionAction, goo.SetRigidBodyVelocityAction, goo.SetRigidBodyAngularVelocityAction, goo.CompareCounterAction, goo.CompareCountersAction, goo.SetCounterAction, goo.IncrementCounterAction, goo.MuteAction, goo.UnmuteAction, goo.ToggleMuteAction, goo.StartTimelineAction, goo.PauseTimelineAction, goo.StopTimelineAction, goo.SetTimelineTimeAction, goo.SetHtmlTextAction), goo.MachineHandler = function (t, e, n, o, i, r) {
  "use strict";

  function s() {
    t.apply(this, arguments);
  }return s.prototype = Object.create(t.prototype), s.prototype.constructor = s, t._registerClass("machine", s), s.prototype._create = function () {
    return new o();
  }, s.prototype._prepare = function (t) {
    e.defaults(t, { maxLoopDepth: 100, asyncMode: !0 });
  }, s.prototype._update = function (e, n, o) {
    var i = this;return t.prototype._update.call(this, e, n, o).then(function (t) {
      if (t) {
        t.id = e, t.name = n.name, t.maxLoopDepth = n.maxLoopDepth, t.asyncMode = n.asyncMode;for (var s in t._states) {
          n.states[s] || t.removeState(s);
        }var a = [];for (var s in n.states) {
          a.push(i._updateState(t, n.states[s], o));
        }return r.all(a).then(function () {
          return t.setInitialState(n.initialState), t;
        });
      }
    });
  }, s.prototype._updateActions = function (t, n) {
    for (var o = 0; o < t._actions.length; o++) {
      var r = t._actions[o];n.actions && n.actions[r.id] || (t.removeAction(r), o--);
    }var s = [];e.forEach(n.actions, function (e) {
      var n = t.getAction(e.id);if (n) n.configure(e.options);else {
        var o = i.actionForType(e.type);n = new o(e.id, e.options), n.onCreate && n.onCreate(t.proxy);
      }s.push(n);
    }, null, "sortValue"), t._actions = s;
  }, s.prototype._updateTransitions = function (t, e) {
    t._transitions = {};for (var n in e.transitions) {
      var o = e.transitions[n];t.setTransition(o.id, o.targetState);
    }
  }, s.prototype._updateState = function (t, e, o) {
    var i;t._states && t._states[e.id] ? i = t._states[e.id] : (i = new n(e.id), t.addState(i)), i.name = e.name, this._updateActions(i, e), this._updateTransitions(i, e);for (var s = 0; s < i._machines; s++) {
      var a = i._machines[s];e.childMachines[a.id] || (i.removeMachine(a), s--);
    }var c = [];for (var p in e.childMachines) {
      c.push(this._load(e.childMachines[p].machineRef, o));
    }return r.all(c).then(function (t) {
      for (var e = 0; t > e; e++) {
        i.addMachine(t[e]);
      }return i;
    });
  }, s;
}(goo.ConfigHandler, goo.ObjectUtils, goo.State, goo.Machine, goo.Actions, goo.rsvp), goo.StateMachineComponent = function (t, e, n) {
  "use strict";

  function o() {
    t.apply(this, arguments), this.type = "StateMachineComponent", this._machines = [], this._machinesById = {}, this.entity = null, this.vars = {}, this.system = null, this.time = 0, this.entered = !1, this.active = !0;
  }return o.prototype = Object.create(t.prototype), o.vars = {}, o.getVariable = function (t) {
    return o.vars[t];
  }, o.prototype.getVariable = function (t) {
    return void 0 !== this.vars[t] ? this.vars[t] : o.getVariable(t);
  }, o.applyOnVariable = function (t, e) {
    o.vars[t] = e(o.vars[t]);
  }, o.prototype.applyOnVariable = function (t, e) {
    void 0 !== this.vars[t] ? this.vars[t] = e(this.vars[t]) : o.applyOnVariable(t, e);
  }, o.prototype.defineVariable = function (t, e) {
    this.vars[t] = e;
  }, o.prototype.removeVariable = function (t) {
    delete this.vars[t];
  }, o.applyOnVariable = function (t, e) {
    this.vars[t] ? this.vars[t] = e(this.vars[t]) : o.vars[t] && o.applyOnVariable(t, e);
  }, o.prototype.addMachine = function (t) {
    t.parent = this, t.setRefs(this), this._machines.push(t), this._machinesById[t.id] = t;
  }, o.prototype.removeMachine = function (t) {
    t.recursiveRemove(), e.remove(this._machines, t), delete this._machinesById[t.id];
  }, o.prototype.getMachineById = function (t) {
    return this._machinesById[t] || null;
  }, o.prototype.init = function () {
    for (var t = 0; t < this._machines.length; t++) {
      var e = this._machines[t];e.setRefs(this), e.reset(), e.ready();
    }
  }, o.prototype.doEnter = function () {
    for (var t = 0; t < this._machines.length; t++) {
      var e = this._machines[t];e.enter();
    }
  }, o.prototype.kill = function () {
    for (var t = 0; t < this._machines.length; t++) {
      var e = this._machines[t];e.kill();
    }
  }, o.prototype.cleanup = function () {
    for (var t = 0; t < this._machines.length; t++) {
      var e = this._machines[t];e.cleanup();
    }
  }, o.prototype.update = function () {
    if (this.active) for (var t = 0; t < this._machines.length; t++) {
      var e = this._machines[t];e.update();
    }
  }, o.prototype.pause = function () {
    this.active = !1, n.emit("goo.entity." + this.entity.name + ".fsm.pause");
  }, o.prototype.play = function () {
    this.active = !0, n.emit("goo.entity." + this.entity.name + ".fsm.play");
  }, o;
}(goo.Component, goo.ArrayUtils, goo.SystemBus), goo.StateMachineComponentHandler = function (t, e, n, o) {
  "use strict";

  function i() {
    t.apply(this, arguments), this._type = "StateMachineComponent";
  }return i.prototype = Object.create(t.prototype), i.prototype.constructor = i, t._registerClass("stateMachine", i), i.prototype._create = function () {
    return new e();
  }, i.prototype._remove = function (t) {
    var e = t.stateMachineComponent;if (e) {
      for (var n = e._machines.length - 1; n >= 0; n--) {
        var o = e._machines[n];o.cleanup(), e.removeMachine(o);
      }e.cleanup();
    }t.clearComponent(this._type);
  }, i.prototype.update = function (e, i, r) {
    var s = this;return r = r || {}, r.reload = !0, r.instantiate = !0, t.prototype.update.call(this, e, i, r).then(function (t) {
      if (t) {
        var e = [];return o.forEach(i.machines, function (t) {
          e.push(s._load(t.machineRef, r));
        }, null, "sortValue"), n.all(e).then(function (e) {
          for (var n = 0; n < e.length; n++) {
            -1 === t._machines.indexOf(e[n]) && t.addMachine(e[n]);
          }for (var n = t._machines.length - 1; n >= 0; n--) {
            -1 === e.indexOf(t._machines[n]) && t.removeMachine(t._machines[n]);
          }return t;
        });
      }
    });
  }, i;
}(goo.ComponentHandler, goo.StateMachineComponent, goo.rsvp, goo.ObjectUtils), goo.StateMachineHandlers = function () {}(goo.StateMachineComponentHandler, goo.MachineHandler), goo.FSMUtil = function (t) {
  return t;
}(goo.FsmUtils), goo.StateMachineSystem = function (t, e) {
  "use strict";

  function n(e) {
    t.call(this, "StateMachineSystem", ["StateMachineComponent"]), this.engine = e, this.resetRequest = !1, this.passive = !1, this.paused = !1, this.time = 0, this.evalProxy = { test: function test() {
        console.log("test");
      } }, this.priority = 1e3;var n = ["Left", "Middle", "Right"];this._inputStates = new Set(), this._listeners = { keydown: function (t) {
        this._inputStates.add(t.which);
      }.bind(this), keyup: function (t) {
        this._inputStates["delete"](t.which);
      }.bind(this), mousedown: function (t) {
        this._inputStates.add(n[t.button]);
      }.bind(this), mouseup: function (t) {
        this._inputStates["delete"](n[t.button]);
      }.bind(this) };
  }return n.prototype = Object.create(t.prototype), n.prototype.getInputState = function (t) {
    return this._inputStates.has(t);
  }, n.prototype.process = function (t, n) {
    var o;if (this.resetRequest) {
      this.resetRequest = !1;for (var i = 0; i < t.length; i++) {
        o = t[i].stateMachineComponent, o.kill(), o.cleanup();
      }return this.time = 0, e.removeAll(), void (this.passive = !0);
    }this.time += n;for (var i = 0; i < t.length; i++) {
      o = t[i].stateMachineComponent, o.entered || (o.doEnter(), o.entered = !0);
    }e.update(1e3 * this.engine.world.time);for (var i = 0; i < t.length; i++) {
      o = t[i].stateMachineComponent, o.update(n);
    }
  }, n.prototype.inserted = function (t) {
    var e = t.stateMachineComponent;e.entity = t, e.system = this, e.init();
  }, n.prototype.play = function () {
    if (this.passive = !1, !this.paused) {
      for (var t = this._activeEntities, e = 0; e < t.length; e++) {
        var n = t[e].stateMachineComponent;n.entered = !1;
      }for (var o in this._listeners) {
        document.addEventListener(o, this._listeners[o]);
      }this._inputStates.clear();
    }this.paused = !1;
  }, n.prototype.pause = function () {
    this.passive = !0, this.paused = !0;
  }, n.prototype.resume = n.prototype.play, n.prototype.stop = function () {
    this.passive = !1, this.resetRequest = !0, this.paused = !1;for (var t in this._listeners) {
      document.removeEventListener(t, this._listeners[t]);
    }
  }, n;
}(goo.System, goo.TWEEN, goo.Actions), goo.AddPositionAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments);
  }return n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.external = { parameters: [{ name: "Entity", key: "entity", type: "entity", description: "Entity to move." }, { name: "Amount X", key: "amountX", type: "float", description: "Amount to move on the X axis.", "default": 0 }, { name: "Amount Y", key: "amountY", type: "float", description: "Amount to move on the Y axis.", "default": 0 }, { name: "Amount Z", key: "amountZ", type: "float", description: "Amount to move on the Z axis.", "default": 0 }, { name: "Speed", key: "speed", type: "float", description: "Speed to multiply.", "default": 1 }, { name: "On every frame", key: "everyFrame", type: "boolean", description: "Repeat this action every frame.", "default": !0 }], transitions: [] }, n.prototype.addPosition = function (t) {
    if (null !== this.entity) {
      var n = t.getTpf(),
          o = e.getValue(this.amountX, t),
          i = e.getValue(this.amountY, t),
          r = e.getValue(this.amountZ, t);this.entity.transformComponent.transform.translation.addDirect(o * this.speed * n, i * this.speed * n, r * this.speed * n), this.entity.transformComponent.setUpdated();
    }
  }, n.prototype.enter = function (t) {
    this.everyFrame || this.addPosition(t);
  }, n.prototype.update = function (t) {
    this.everyFrame && this.addPosition(t);
  }, n;
}(goo.Action, goo.FsmUtils), goo.AddVariableAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments);
  }return n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.external = { key: "Add Variable", name: "Add Variable", type: "variables", description: "", parameters: [{ name: "Variable", key: "variable", type: "identifier" }, { name: "Amount", key: "amount", type: "float" }, { name: "On every frame", key: "everyFrame", type: "boolean", description: "Repeat this action every frame.", "default": !1 }], transitions: [] }, n.prototype.add = function (t) {
    t.applyOnVariable(this.variable, function (n) {
      return n + e.getValue(this.amount, t);
    }.bind(this));
  }, n.prototype.enter = function (t) {
    this.everyFrame || this.add(t);
  }, n.prototype.update = function (t) {
    this.everyFrame && this.add(t);
  }, n;
}(goo.Action, goo.FsmUtils), goo.CopyVariableAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments);
  }return n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.external = { key: "Copy Variable", name: "Copy Variable", type: "variables", description: "", parameters: [{ name: "Variable Target", key: "variableTarget", type: "identifier" }, { name: "Variable Source", key: "variableSource", type: "identifier" }, { name: "Value", key: "value", type: "float" }, { name: "On every frame", key: "everyFrame", type: "boolean", description: "Repeat this action every frame.", "default": !1 }], transitions: [] }, n.prototype.enter = function (t) {
    this.everyFrame || this.copy(t);
  }, n.prototype.update = function (t) {
    this.everyFrame && this.copy(t);
  }, n.prototype.copy = function (t) {
    var n = t.getOwnerEntity();if (this.variableTarget && n) try {
      var o;o = this.variableSource ? e.getValue(this.variableSource, t) : e.getValue(this.value, t), n[this.variableTarget] = o;
    } catch (i) {
      console.warn(i);
    }
  }, n;
}(goo.Action, goo.FsmUtils), goo.GetPositionAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.prototype.configure = function (t) {
    this.everyFrame = t.everyFrame !== !1, this.entity = t.entity || null, this.variableX = t.variableX || null, this.variableY = t.variableY || null, this.variableZ = t.variableZ || null;
  }, e.external = { parameters: [{ name: "VariableX", key: "variableX", type: "identifier" }, { name: "VariableY", key: "variableY", type: "identifier" }, { name: "VariableZ", key: "variableZ", type: "identifier" }, { name: "On every frame", key: "everyFrame", type: "boolean", description: "Repeat this action every frame.", "default": !0 }], transitions: [] }, e.prototype.update = function (t) {
    var e = this.entity.transformComponent.transform.translation;null !== this.entity && (this.variableX && t.applyOnVariable(this.variableX, function () {
      return e.x;
    }), this.variableY && t.applyOnVariable(this.variableY, function () {
      return e.y;
    }), this.variableZ && t.applyOnVariable(this.variableZ, function () {
      return e.z;
    }));
  }, e;
}(goo.Action), goo.MultiplyVariableAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments);
  }return n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.external = { key: "Multiply Variable", name: "Multiply Variable", type: "variables", description: "", parameters: [{ name: "Variable", key: "variable", type: "identifier" }, { name: "Amount", key: "amount", type: "float" }, { name: "On every frame", key: "everyFrame", type: "boolean", description: "Repeat this action every frame", "default": !1 }], transitions: [] }, n.prototype.update = function (t) {
    t.applyOnVariable(this.variable, function (n) {
      return n * e.getValue(this.amount, t);
    }.bind(this));
  }, n;
}(goo.Action, goo.FsmUtils), goo.NumberCompareAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments);
  }n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.prototype.configure = function (t) {
    this.everyFrame = t.everyFrame !== !1, this.leftHand = t.leftHand || 0, this.rightHand = t.rightHand || 0, this.tolerance = t.tolerance || 1e-4, this.lessThanEvent = { channel: t.transitions.less }, this.equalEvent = { channel: t.transitions.equal }, this.greaterThanEvent = { channel: t.transitions.greater };
  }, n.external = { parameters: [{ name: "Left hand value", key: "leftHand", type: "float" }, { name: "Right hand value", key: "rightHand", type: "float" }, { name: "Tolerance", key: "tolerance", type: "float", "default": .001 }, { name: "On every frame", key: "everyFrame", type: "boolean", description: "Repeat this action every frame.", "default": !0 }], transitions: [{ key: "less", description: "Event fired if left hand argument is smaller than right hand argument." }, { key: "equal", description: "Event fired if both sides are approximately equal." }, { key: "greater", description: "Event fired if left hand argument is greater than right hand argument." }] };var o = { less: "On X < Y", equal: "On X == Y", greater: "On X > Y" };return n.getTransitionLabel = function (t) {
    return o[t];
  }, n.prototype.compare = function (t) {
    var n = e.getValue(this.leftHand, t),
        o = e.getValue(this.rightHand, t),
        i = o - n;Math.abs(i) <= this.tolerance ? this.equalEvent.channel && t.send(this.equalEvent.channel) : i > 0 ? this.lessThanEvent.channel && t.send(this.lessThanEvent.channel) : this.greaterThanEvent.channel && t.send(this.greaterThanEvent.channel);
  }, n.prototype.enter = function (t) {
    this.everyFrame || this.compare(t);
  }, n.prototype.update = function (t) {
    this.everyFrame && this.compare(t);
  }, n;
}(goo.Action, goo.FsmUtils), goo.ScriptAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.external = { key: "Script", name: "Script Action", type: "fx", description: "Runs a script.", parameters: [{ name: "Script Name", key: "scriptName", type: "string", "default": "" }], transitions: [] }, e.prototype.ready = function (t) {
    for (var e = t.getWorld().by.component("ScriptComponent").toArray(), n = 0; n < e.length; n++) {
      for (var o = e[n], i = 0; i < o.scriptComponent.scripts.length; i++) {
        var r = o.scriptComponent.scripts[i];if (r.name === this.scriptName) {
          this.script = r;break;
        }
      }if (this.script) break;
    }this.args = {}, this.ctx = { entity: t.getOwnerEntity(), world: t.getWorld(), fsm: t }, this.script && this.script.setup && this.script.setup(this.args, this.ctx);
  }, e.prototype.cleanup = function () {
    this.script && this.script.cleanup && (this.script.cleanup(this.args, this.ctx), this.script = null);
  }, e.prototype.enter = function () {
    this.script && this.script.enter && this.script.enter(this.args, this.ctx);
  }, e.prototype.update = function () {
    this.script && this.script.update && this.script.update(this.args, this.ctx);
  }, e.prototype.exit = function () {
    this.script && this.script.exit && this.script.exit(this.args, this.ctx);
  }, e.prototype.onDestroy = function () {}, e;
}(goo.Action), goo.SetLightRangeAction = function (t) {
  "use strict";

  function e() {
    t.apply(this, arguments);
  }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.prototype.configure = function (t) {
    this.everyFrame = !!t.everyFrame, this.entity = t.entity || null, this.range = t.range || 100;
  }, e.external = { key: "Set Light Range", name: "Set Light Range", description: "Sets the range of a light.", parameters: [{ name: "Entity", key: "entity", type: "entity", description: "Light entity." }, { name: "Range", key: "range", type: "real", description: "Light range.", "default": 100, min: 0 }, { name: "On every frame", key: "everyFrame", type: "boolean", description: "Repeat this action every frame.", "default": !0 }], transitions: [] }, e.prototype.enter = function () {
    var t = this.entity;t && t.lightComponent && t.lightComponent.light && (t.lightComponent.light.range = this.range);
  }, e;
}(goo.Action), goo.SetPositionAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments);
  }return n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.prototype.configure = function (t) {
    this.everyFrame = !!t.everyFrame, this.entity = t.entity || null, this.amountX = t.amountX || 0, this.amountY = t.amountY || 0, this.amountZ = t.amountZ || 0;
  }, n.external = { parameters: [{ name: "Entity", key: "entity", type: "entity", description: "Entity to move." }, { name: "Amount X", key: "amountX", type: "float", description: "Position on the X axis.", "default": 0 }, { name: "Amount Y", key: "amountY", type: "float", description: "Position on the Y axis.", "default": 0 }, { name: "Amount Z", key: "amountZ", type: "float", description: "Position on the Z axis.", "default": 0 }, { name: "On every frame", key: "everyFrame", type: "boolean", description: "Repeat this action every frame.", "default": !0 }], transitions: [] }, n.prototype.update = function (t) {
    null !== this.entity && (this.entity.transformComponent.transform.translation.setDirect(e.getValue(this.amountX, t), e.getValue(this.amountY, t), e.getValue(this.amountZ, t)), this.entity.transformComponent.setUpdated());
  }, n;
}(goo.Action, goo.FsmUtils), goo.SetRotationAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments);
  }return n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.prototype.configure = function (t) {
    this.everyFrame = !!t.everyFrame, this.entity = t.entity || null, this.amountX = t.amountX || 0, this.amountY = t.amountY || 0, this.amountZ = t.amountZ || 0;
  }, n.external = { parameters: [{ name: "Entity", key: "entity", type: "entity", description: "Entity to move." }, { name: "Amount X", key: "amountX", type: "float", description: "Amount to rotate on the X axis.", "default": 0 }, { name: "Amount Y", key: "amountY", type: "float", description: "Amount to rotate on the Y axis.", "default": 0 }, { name: "Amount Z", key: "amountZ", type: "float", description: "Amount to rotate on the Z axis.", "default": 0 }, { name: "On every frame", key: "everyFrame", type: "boolean", description: "Repeat this action every frame.", "default": !0 }], transitions: [] }, n.prototype.setRotation = function (t) {
    null !== this.entity && (this.entity.transformComponent.transform.setRotationXYZ(e.getValue(this.amountX, t), e.getValue(this.amountY, t), e.getValue(this.amountZ, t)), this.entity.transformComponent.setUpdated());
  }, n.prototype.enter = function (t) {
    this.everyFrame || this.setRotation(t);
  }, n.prototype.update = function (t) {
    this.everyFrame && this.setRotation(t);
  }, n;
}(goo.Action, goo.FsmUtils), goo.SetVariableAction = function (t, e) {
  "use strict";

  function n() {
    t.apply(this, arguments);
  }return n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.external = { key: "Set Variable", name: "Set Variable", type: "variables", description: "", parameters: [{ name: "Variable name", key: "variable", type: "identifier" }, { name: "Value", key: "amount", type: "float" }, { name: "On every frame", key: "everyFrame", type: "boolean", description: "Repeat this action every frame.", "default": !1 }], transitions: [] }, n.prototype.enter = function (t) {
    this.variable && t.applyOnVariable(this.variable, function () {
      return e.getValue(this.amount, t);
    }.bind(this));
  }, n;
}(goo.Action, goo.FsmUtils), "function" == typeof require && (define("goo/fsmpack/statemachine/State", [], function () {
  return goo.State;
}), define("goo/fsmpack/statemachine/Machine", [], function () {
  return goo.Machine;
}), define("goo/fsmpack/statemachine/FsmUtils", [], function () {
  return goo.FsmUtils;
}), define("goo/fsmpack/statemachine/actions/Action", [], function () {
  return goo.Action;
}), define("goo/fsmpack/statemachine/actions/ArrowsAction", [], function () {
  return goo.ArrowsAction;
}), define("goo/fsmpack/statemachine/actions/MouseUpAction", [], function () {
  return goo.MouseUpAction;
}), define("goo/fsmpack/statemachine/actions/MouseDownAction", [], function () {
  return goo.MouseDownAction;
}), define("goo/fsmpack/statemachine/actions/MouseMoveAction", [], function () {
  return goo.MouseMoveAction;
}), define("goo/fsmpack/statemachine/actions/MousePressedAction", [], function () {
  return goo.MousePressedAction;
}), define("goo/fsmpack/statemachine/actions/KeyUpAction", [], function () {
  return goo.KeyUpAction;
}), define("goo/fsmpack/statemachine/actions/KeyDownAction", [], function () {
  return goo.KeyDownAction;
}), define("goo/fsmpack/statemachine/actions/KeyPressedAction", [], function () {
  return goo.KeyPressedAction;
}), define("goo/fsmpack/statemachine/actions/PickAction", [], function () {
  return goo.PickAction;
}), define("goo/fsmpack/statemachine/actions/PickAndExitAction", [], function () {
  return goo.PickAndExitAction;
}), define("goo/fsmpack/statemachine/actions/ClickAction", [], function () {
  return goo.ClickAction;
}), define("goo/fsmpack/statemachine/actions/HoverEnterAction", [], function () {
  return goo.HoverEnterAction;
}), define("goo/fsmpack/statemachine/actions/HoverExitAction", [], function () {
  return goo.HoverExitAction;
}), define("goo/fsmpack/statemachine/actions/WasdAction", [], function () {
  return goo.WasdAction;
}), define("goo/fsmpack/statemachine/actions/MoveAction", [], function () {
  return goo.MoveAction;
}), define("goo/fsmpack/statemachine/actions/RotateAction", [], function () {
  return goo.RotateAction;
}), define("goo/fsmpack/statemachine/actions/ScaleAction", [], function () {
  return goo.ScaleAction;
}), define("goo/fsmpack/statemachine/actions/LookAtAction", [], function () {
  return goo.LookAtAction;
}), define("goo/fsmpack/statemachine/actions/TweenMoveAction", [], function () {
  return goo.TweenMoveAction;
}), define("goo/fsmpack/statemachine/actions/TweenRotationAction", [], function () {
  return goo.TweenRotationAction;
}), define("goo/fsmpack/statemachine/actions/TweenScaleAction", [], function () {
  return goo.TweenScaleAction;
}), define("goo/fsmpack/statemachine/actions/TweenLookAtAction", [], function () {
  return goo.TweenLookAtAction;
}), define("goo/fsmpack/statemachine/actions/ShakeAction", [], function () {
  return goo.ShakeAction;
}), define("goo/fsmpack/statemachine/actions/PauseAnimationAction", [], function () {
  return goo.PauseAnimationAction;
}), define("goo/fsmpack/statemachine/actions/ResumeAnimationAction", [], function () {
  return goo.ResumeAnimationAction;
}), define("goo/fsmpack/statemachine/actions/SetAnimationAction", [], function () {
  return goo.SetAnimationAction;
}), define("goo/fsmpack/statemachine/actions/SetTimeScale", [], function () {
  return goo.SetTimeScale;
}), define("goo/fsmpack/statemachine/actions/WaitAction", [], function () {
  return goo.WaitAction;
}), define("goo/fsmpack/statemachine/actions/TransitionAction", [], function () {
  return goo.TransitionAction;
}), define("goo/fsmpack/statemachine/actions/NextFrameAction", [], function () {
  return goo.NextFrameAction;
}), define("goo/fsmpack/statemachine/actions/RandomTransitionAction", [], function () {
  return goo.RandomTransitionAction;
}), define("goo/fsmpack/statemachine/actions/EmitAction", [], function () {
  return goo.EmitAction;
}), define("goo/fsmpack/statemachine/actions/TransitionOnMessageAction", [], function () {
  return goo.TransitionOnMessageAction;
}), define("goo/fsmpack/statemachine/actions/EvalAction", [], function () {
  return goo.EvalAction;
}), define("goo/fsmpack/statemachine/actions/HideAction", [], function () {
  return goo.HideAction;
}), define("goo/fsmpack/statemachine/actions/ShowAction", [], function () {
  return goo.ShowAction;
}), define("goo/fsmpack/statemachine/actions/RemoveAction", [], function () {
  return goo.RemoveAction;
}), define("goo/fsmpack/statemachine/actions/AddLightAction", [], function () {
  return goo.AddLightAction;
}), define("goo/fsmpack/statemachine/actions/RemoveLightAction", [], function () {
  return goo.RemoveLightAction;
}), define("goo/fsmpack/statemachine/actions/SetLightPropertiesAction", [], function () {
  return goo.SetLightPropertiesAction;
}), define("goo/fsmpack/statemachine/actions/TweenLightColorAction", [], function () {
  return goo.TweenLightColorAction;
}), define("goo/fsmpack/statemachine/actions/SetClearColorAction", [], function () {
  return goo.SetClearColorAction;
}), define("goo/fsmpack/statemachine/actions/SwitchCameraAction", [], function () {
  return goo.SwitchCameraAction;
}), define("goo/fsmpack/statemachine/actions/InFrustumAction", [], function () {
  return goo.InFrustumAction;
}), define("goo/fsmpack/statemachine/actions/DollyZoomAction", [], function () {
  return goo.DollyZoomAction;
}), define("goo/fsmpack/statemachine/actions/InBoxAction", [], function () {
  return goo.InBoxAction;
}), define("goo/fsmpack/statemachine/actions/CompareDistanceAction", [], function () {
  return goo.CompareDistanceAction;
}), define("goo/fsmpack/proximity/ProximitySystem", [], function () {
  return goo.ProximitySystem;
}), define("goo/fsmpack/statemachine/actions/CollidesAction", [], function () {
  return goo.CollidesAction;
}), define("goo/fsmpack/proximity/ProximityComponent", [], function () {
  return goo.ProximityComponent;
}), define("goo/fsmpack/statemachine/actions/TagAction", [], function () {
  return goo.TagAction;
}), define("goo/fsmpack/statemachine/actions/SmokeAction", [], function () {
  return goo.SmokeAction;
}), define("goo/fsmpack/statemachine/actions/FireAction", [], function () {
  return goo.FireAction;
}), define("goo/fsmpack/statemachine/actions/RemoveParticlesAction", [], function () {
  return goo.RemoveParticlesAction;
}), define("goo/fsmpack/statemachine/actions/TogglePostFxAction", [], function () {
  return goo.TogglePostFxAction;
}), define("goo/fsmpack/statemachine/actions/ToggleFullscreenAction", [], function () {
  return goo.ToggleFullscreenAction;
}), define("goo/fsmpack/statemachine/actions/PlaySoundAction", [], function () {
  return goo.PlaySoundAction;
}), define("goo/fsmpack/statemachine/actions/PauseSoundAction", [], function () {
  return goo.PauseSoundAction;
}), define("goo/fsmpack/statemachine/actions/StopSoundAction", [], function () {
  return goo.StopSoundAction;
}), define("goo/fsmpack/statemachine/actions/SoundFadeInAction", [], function () {
  return goo.SoundFadeInAction;
}), define("goo/fsmpack/statemachine/actions/SoundFadeOutAction", [], function () {
  return goo.SoundFadeOutAction;
}), define("goo/fsmpack/statemachine/actions/SetRenderTargetAction", [], function () {
  return goo.SetRenderTargetAction;
}), define("goo/fsmpack/statemachine/actions/TweenTextureOffsetAction", [], function () {
  return goo.TweenTextureOffsetAction;
}), define("goo/fsmpack/statemachine/actions/SetMaterialColorAction", [], function () {
  return goo.SetMaterialColorAction;
}), define("goo/fsmpack/statemachine/actions/LogMessageAction", [], function () {
  return goo.LogMessageAction;
}), define("goo/fsmpack/statemachine/actions/TweenOpacityAction", [], function () {
  return goo.TweenOpacityAction;
}), define("goo/fsmpack/statemachine/actions/HtmlAction", [], function () {
  return goo.HtmlAction;
}), define("goo/fsmpack/statemachine/actions/CopyJointTransformAction", [], function () {
  return goo.CopyJointTransformAction;
}), define("goo/fsmpack/statemachine/actions/TriggerEnterAction", [], function () {
  return goo.TriggerEnterAction;
}), define("goo/fsmpack/statemachine/actions/TriggerLeaveAction", [], function () {
  return goo.TriggerLeaveAction;
}), define("goo/fsmpack/statemachine/actions/ApplyImpulseAction", [], function () {
  return goo.ApplyImpulseAction;
}), define("goo/fsmpack/statemachine/actions/ApplyForceAction", [], function () {
  return goo.ApplyForceAction;
}), define("goo/fsmpack/statemachine/actions/ApplyTorqueAction", [], function () {
  return goo.ApplyTorqueAction;
}), define("goo/fsmpack/statemachine/actions/SetRigidBodyPositionAction", [], function () {
  return goo.SetRigidBodyPositionAction;
}), define("goo/fsmpack/statemachine/actions/SetRigidBodyVelocityAction", [], function () {
  return goo.SetRigidBodyVelocityAction;
}), define("goo/fsmpack/statemachine/actions/SetRigidBodyAngularVelocityAction", [], function () {
  return goo.SetRigidBodyAngularVelocityAction;
}), define("goo/fsmpack/statemachine/actions/CompareCounterAction", [], function () {
  return goo.CompareCounterAction;
}), define("goo/fsmpack/statemachine/actions/CompareCountersAction", [], function () {
  return goo.CompareCountersAction;
}), define("goo/fsmpack/statemachine/actions/SetCounterAction", [], function () {
  return goo.SetCounterAction;
}), define("goo/fsmpack/statemachine/actions/IncrementCounterAction", [], function () {
  return goo.IncrementCounterAction;
}), define("goo/fsmpack/statemachine/actions/MuteAction", [], function () {
  return goo.MuteAction;
}), define("goo/fsmpack/statemachine/actions/UnmuteAction", [], function () {
  return goo.UnmuteAction;
}), define("goo/fsmpack/statemachine/actions/ToggleMuteAction", [], function () {
  return goo.ToggleMuteAction;
}), define("goo/fsmpack/statemachine/actions/StartTimelineAction", [], function () {
  return goo.StartTimelineAction;
}), define("goo/fsmpack/statemachine/actions/PauseTimelineAction", [], function () {
  return goo.PauseTimelineAction;
}), define("goo/fsmpack/statemachine/actions/StopTimelineAction", [], function () {
  return goo.StopTimelineAction;
}), define("goo/fsmpack/statemachine/actions/SetTimelineTimeAction", [], function () {
  return goo.SetTimelineTimeAction;
}), define("goo/fsmpack/statemachine/actions/SetHtmlTextAction", [], function () {
  return goo.SetHtmlTextAction;
}), define("goo/fsmpack/statemachine/actions/Actions", [], function () {
  return goo.Actions;
}), define("goo/fsmpack/MachineHandler", [], function () {
  return goo.MachineHandler;
}), define("goo/fsmpack/statemachine/StateMachineComponent", [], function () {
  return goo.StateMachineComponent;
}), define("goo/fsmpack/StateMachineComponentHandler", [], function () {
  return goo.StateMachineComponentHandler;
}), define("goo/fsmpack/StateMachineHandlers", [], function () {
  return goo.StateMachineHandlers;
}), define("goo/fsmpack/statemachine/FSMUtil", [], function () {
  return goo.FSMUtil;
}), define("goo/fsmpack/statemachine/StateMachineSystem", [], function () {
  return goo.StateMachineSystem;
}), define("goo/fsmpack/statemachine/actions/AddPositionAction", [], function () {
  return goo.AddPositionAction;
}), define("goo/fsmpack/statemachine/actions/AddVariableAction", [], function () {
  return goo.AddVariableAction;
}), define("goo/fsmpack/statemachine/actions/CopyVariableAction", [], function () {
  return goo.CopyVariableAction;
}), define("goo/fsmpack/statemachine/actions/GetPositionAction", [], function () {
  return goo.GetPositionAction;
}), define("goo/fsmpack/statemachine/actions/MultiplyVariableAction", [], function () {
  return goo.MultiplyVariableAction;
}), define("goo/fsmpack/statemachine/actions/NumberCompareAction", [], function () {
  return goo.NumberCompareAction;
}), define("goo/fsmpack/statemachine/actions/ScriptAction", [], function () {
  return goo.ScriptAction;
}), define("goo/fsmpack/statemachine/actions/SetLightRangeAction", [], function () {
  return goo.SetLightRangeAction;
}), define("goo/fsmpack/statemachine/actions/SetPositionAction", [], function () {
  return goo.SetPositionAction;
}), define("goo/fsmpack/statemachine/actions/SetRotationAction", [], function () {
  return goo.SetRotationAction;
}), define("goo/fsmpack/statemachine/actions/SetVariableAction", [], function () {
  return goo.SetVariableAction;
}));

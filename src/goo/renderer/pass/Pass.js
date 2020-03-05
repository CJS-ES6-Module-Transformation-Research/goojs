"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function Pass() {}

Pass.prototype.destroy = function () /* renderer */{};

Pass.prototype.render = function () /* renderer, writeBuffer, readBuffer, delta, maskActive, camera, lights, clearColor */{};

Pass.prototype.updateSize = function () /* size, renderer */{};

Pass.prototype.invalidateHandles = function () /* renderer */{};

var exported_Pass = Pass;

/**
 * Base pass class
 */
exports.Pass = exported_Pass;

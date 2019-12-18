Object.defineProperty(exports, "__esModule", {
  value: true
});
var exported_Pass = Pass;
function Pass() {}

Pass.prototype.destroy = function () /* renderer */{};

Pass.prototype.render = function () /* renderer, writeBuffer, readBuffer, delta, maskActive, camera, lights, clearColor */{};

Pass.prototype.updateSize = function () /* size, renderer */{};

Pass.prototype.invalidateHandles = function () /* renderer */{};

/**
 * Base pass class
 */
exports.Pass = exported_Pass;

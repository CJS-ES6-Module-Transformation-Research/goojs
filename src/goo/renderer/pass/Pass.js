var mod_Pass = Pass;
/**
 * Base pass class
 */
function Pass() {}

Pass.prototype.destroy = function (/* renderer */) {};

Pass.prototype.render = function (/* renderer, writeBuffer, readBuffer, delta, maskActive, camera, lights, clearColor */) {};

Pass.prototype.updateSize = function (/* size, renderer */) {};

Pass.prototype.invalidateHandles = function (/* renderer */) {};

/**
 * Base pass class
 */
export { mod_Pass as Pass };
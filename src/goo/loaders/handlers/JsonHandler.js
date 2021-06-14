var mod_JsonHandler = JsonHandler;

import {
    ConfigHandler as ConfigHandler_ConfigHandler,
    _registerClass as ConfigHandlerjs__registerClass,
} from "../../loaders/handlers/ConfigHandler";

import { PromiseUtils as PromiseUtils_PromiseUtils } from "../../util/PromiseUtils";

/**
 * Handler for loading json objects.
 *
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 *
 * @extends ConfigHandler
 * @private
 */
function JsonHandler() {
	ConfigHandler_ConfigHandler.apply(this, arguments);
}

JsonHandler.prototype = Object.create(ConfigHandler_ConfigHandler.prototype);
JsonHandler.prototype.constructor = JsonHandler;
ConfigHandlerjs__registerClass('json', JsonHandler);

/**
 * Adds/updates/removes a json data object.
 *
 * @param {string} ref
 * @param {Object} config
 * @returns {RSVP.Promise} Resolves with the updated shader or null if removed
 */
JsonHandler.prototype._update = function (ref, config) {
	if (!config) {
		this._remove(ref);
		return PromiseUtils_PromiseUtils.resolve();
	}

	var data;
	try {
		data = JSON.parse(config.body);
	} catch (error) {
		data = {};
	}

	return PromiseUtils_PromiseUtils.resolve(data);
};

/**
 * Handler for loading json objects.
 *
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 *
 * @extends ConfigHandler
 * @private
 */
export { mod_JsonHandler as JsonHandler };

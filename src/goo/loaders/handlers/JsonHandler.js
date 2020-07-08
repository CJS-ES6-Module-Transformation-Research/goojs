var JsonHandler_JsonHandler = JsonHandler;

import {
    ConfigHandler as loadershandlersConfigHandler_ConfigHandlerjs,
    _registerClass as ConfigHandlerjs__registerClass,
} from "../../loaders/handlers/ConfigHandler";

import { PromiseUtils as utilPromiseUtils_PromiseUtilsjs } from "../../util/PromiseUtils";
function JsonHandler() {
	loadershandlersConfigHandler_ConfigHandlerjs.apply(this, arguments);
}

JsonHandler.prototype = Object.create(loadershandlersConfigHandler_ConfigHandlerjs.prototype);
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
		return utilPromiseUtils_PromiseUtilsjs.resolve();
	}

	var data;
	try {
		data = JSON.parse(config.body);
	} catch (error) {
		data = {};
	}

	return utilPromiseUtils_PromiseUtilsjs.resolve(data);
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
export { JsonHandler_JsonHandler as JsonHandler };

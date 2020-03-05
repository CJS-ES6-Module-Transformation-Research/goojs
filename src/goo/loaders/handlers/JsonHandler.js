import { ConfigHandler as ConfigHandler_ConfigHandlerjs } from "../../loaders/handlers/ConfigHandler";
import { PromiseUtils as PromiseUtils_PromiseUtilsjs } from "../../util/PromiseUtils";
function JsonHandler() {
	ConfigHandler_ConfigHandlerjs.apply(this, arguments);
}

JsonHandler.prototype = Object.create(ConfigHandler_ConfigHandlerjs.prototype);
JsonHandler.prototype.constructor = JsonHandler;
ConfigHandler_ConfigHandlerjs._registerClass('json', JsonHandler);

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
		return PromiseUtils_PromiseUtilsjs.resolve();
	}

	var data;
	try {
		data = JSON.parse(config.body);
	} catch (error) {
		data = {};
	}

	return PromiseUtils_PromiseUtilsjs.resolve(data);
};

var exported_JsonHandler = JsonHandler;

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
export { exported_JsonHandler as JsonHandler };

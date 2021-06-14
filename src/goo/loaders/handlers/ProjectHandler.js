var mod_ProjectHandler = ProjectHandler;

import {
    ConfigHandler as ConfigHandler_ConfigHandler,
    _registerClass as ConfigHandlerjs__registerClass,
} from "../../loaders/handlers/ConfigHandler";

/**
 * Handler for loading project into engine (actually loading mainScene)
 * @private
 * @extends ConfigHandler
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 */
function ProjectHandler() {
	ConfigHandler_ConfigHandler.apply(this, arguments);
	/**
	this._skybox = null;
	this._skyboxTexture = null;
	this._skyboxGeographic = false;

	this._composer = null;
	this._passes = [];
	this.weatherState = {};
	*/
}

ProjectHandler.prototype = Object.create(ConfigHandler_ConfigHandler.prototype);
ProjectHandler.prototype.constructor = ProjectHandler;
ConfigHandlerjs__registerClass('project', ProjectHandler);

/**
 * Removes project from engine, i e removes mainScene, i e removes scene entities from world
 * @param {string} ref}
 * @param {Object} options
 */
ProjectHandler.prototype._remove = function (ref, options) {
	var project = this._objects.get(ref);
	if (project) {
		this.updateObject(project.mainScene.id, null, options);
	}
};

/**
 * Creates an empty project object
 * @returns {Object}
 * @private
 */
ProjectHandler.prototype._create = function () {
	return {
		mainScene: null
	};
};

/**
 * Creates/updates/removes a project
 * @param {string} ref
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} Resolves with the updated scene or null if removed
 */
ProjectHandler.prototype._update = function (ref, config, options) {
	var that = this;
	return ConfigHandler_ConfigHandler.prototype._update.call(this, ref, config, options).then(function (project) {
		if (!project) { return; }
		function loadPromise() {
			return that._load(config.mainSceneRef, options).then(function (scene) {
				project.mainScene = scene;
				return project;
			});
		}

		if (project.mainScene && config.mainSceneRef !== project.mainScene.id) {
			return that.updateObject(project.mainScene.id, null, options).then(loadPromise);
		} else {
			return loadPromise();
		}
	});
};

/**
 * Handler for loading project into engine (actually loading mainScene)
 * @private
 * @extends ConfigHandler
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 */
export { mod_ProjectHandler as ProjectHandler };

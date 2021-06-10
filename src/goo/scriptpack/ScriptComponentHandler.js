var mod_ScriptComponentHandler = ScriptComponentHandler;
import { ComponentHandler as ComponentHandler_ComponentHandler } from "../loaders/handlers/ComponentHandler";
import { ScriptComponent as ScriptComponent_ScriptComponent } from "../entities/components/ScriptComponent";
import { rsvpjs as RSVP } from "../util/rsvp";
import { ObjectUtils as ObjectUtils_ObjectUtils } from "../util/ObjectUtils";
import { PromiseUtils as PromiseUtils_PromiseUtils } from "../util/PromiseUtils";
import { SystemBusjs as SystemBus } from "../entities/SystemBus";
import { Scripts as Scripts_Scripts } from "../scripts/Scripts";
import { ScriptUtils as ScriptUtils_ScriptUtils } from "../scripts/ScriptUtils";

/**
 * @hidden
 */
function ScriptComponentHandler() {
	ComponentHandler_ComponentHandler.apply(this, arguments);
	this._type = 'ScriptComponent';
}

ScriptComponentHandler.prototype = Object.create(ComponentHandler_ComponentHandler.prototype);
ScriptComponentHandler.prototype.constructor = ScriptComponentHandler;
ComponentHandler_ComponentHandler._registerClass('script', ScriptComponentHandler);

ScriptComponentHandler.ENGINE_SCRIPT_PREFIX = 'GOO_ENGINE_SCRIPTS/';

ScriptComponentHandler.prototype._prepare = function (/*config*/) {};

ScriptComponentHandler.prototype._create = function () {
	return new ScriptComponent_ScriptComponent();
};

ScriptComponentHandler.prototype.update = function (entity, config, options) {
	var that = this;

	return ComponentHandler_ComponentHandler.prototype.update.call(this, entity, config, options)
	.then(function (component) {
		if (!component) { return; }

		return RSVP.all(ObjectUtils_ObjectUtils.map(config.scripts, function (instanceConfig) {
			return that._updateScriptInstance(component, instanceConfig, options);
		}, null, 'sortValue'))
		.then(function (scripts) {
			component.scripts = scripts;
			return component;
		});
	});
};

ScriptComponentHandler.prototype._updateScriptInstance = function (component, instanceConfig, options) {
	var that = this;

	return this._createOrLoadScript(component, instanceConfig)
	.then(function (script) {
		var newParameters = instanceConfig.options || {};
		if (script.parameters) {
			ObjectUtils_ObjectUtils.defaults(newParameters, script.parameters);
		}

		if (script.externals && script.externals.parameters) {
			ScriptUtils_ScriptUtils.fillDefaultValues(newParameters, script.externals.parameters);
		}

		var newScript = null;
		if (script.context) {
			newScript = script;
			if (newScript.parameters) {
				// Re-use the parameters object, but clean it before updating it.
				var keys = Object.keys(newScript.parameters);
				for (var i=0; i<keys.length; i++) {
					delete newScript.parameters[keys[i]];
				}
			} else {
				newScript.parameters = {};
			}
		} else {
			// We need to duplicate the script so we can have multiple
			// similar scripts with different parameters.
			newScript = Object.create(script);
			newScript.instanceId = instanceConfig.id;
			newScript.parameters = {};
			newScript.enabled = false;
		}

		return that._setParameters(
			newScript.parameters,
			newParameters,
			script.externals,
			options
		)
		.then(function () {
			if (newScript.argsUpdated && newScript.context) {
				newScript.argsUpdated(newScript.parameters, newScript.context, window.goo);
			}
		})
		.then(ObjectUtils_ObjectUtils.constant(newScript));
	});
};

/**
 * Depending on the reference specified in the script instance, creates an
 * engine script or loads the referenced script.
 *
 * @param {object} instanceConfig
 *        JSON configuration of the script instance. Should contain the
 *        "scriptRef" property which refers to the script which is to be
 *        loaded.
 *
 * @returns {Promise}
 *         A promise which is resolved with the referenced script.
 *
 * @private
 */
ScriptComponentHandler.prototype._createOrLoadScript = function (component, instanceConfig) {
	var ref = instanceConfig.scriptRef;
	var isEngineScript = ref.indexOf(ScriptComponentHandler.ENGINE_SCRIPT_PREFIX) === 0;

	if (isEngineScript) {
		return this._createOrLoadEngineScript(component, instanceConfig);
	} else {
		return this._createOrLoadCustomScript(component, instanceConfig);
	}
};

/**
 * Creates or loads an engine script. If the component already has an instance
 * of that script, it will be returned.
 *
 * @param {ScriptComponent} component
 * @param {object} instanceConfig
 *
 * @return {Promise}
 * @private
 */
ScriptComponentHandler.prototype._createOrLoadEngineScript = function (component, instanceConfig) {
	var existingScript = this._findScriptInstance(component, instanceConfig.id);
	var prefix = ScriptComponentHandler.ENGINE_SCRIPT_PREFIX;

	if (existingScript) {
		return PromiseUtils_PromiseUtils.resolve(existingScript);
	}

	return this._createEngineScript(instanceConfig.scriptRef.slice(prefix.length));
};

/**
 * Creates or loads a custom script. If the component already has an instance
 * of that script with the same body, it will be returned.
 *
 * @param {ScriptComponent} component
 * @param {object} instanceConfig
 *
 * @return {Promise}
 * @private
 */
ScriptComponentHandler.prototype._createOrLoadCustomScript = function (component, instanceConfig) {
	var that = this;
	var ref = instanceConfig.scriptRef;

	// Need to load the script (note that we are not reloading yet) so we
	// can compare the new body with the old one.
	return this._load(ref).then(function (script) {
		var existingScript = that._findScriptInstance(component, instanceConfig.id);

		if (existingScript && existingScript.body === script.body) {
			return existingScript;
		}

		// New script or the body was changed so reload the script.
		return that._load(ref, { reload: true });
	});
};

/**
 * Searches the specified component to try to find the specified script instance.
 *
 * @param {ScriptComponent} component
 *        The component which is to be searched.
 * @param {string} instanceId
 *        The identifier of the script instance which is to be found.
 *
 * @return {object} The script which was found, or undefined if none was found.
 * @private
 */
ScriptComponentHandler.prototype._findScriptInstance = function (component, instanceId) {
	return ObjectUtils_ObjectUtils.find(component.scripts, function (script) {
		return script.instanceId === instanceId;
	});
};

/**
 * Creates a new instance of one of the default scripts provided by the
 * engine.
 *
 * @param {Object} scriptName
 *		The name of the script which is to be created.
	*
	* @returns {RSVP.Promise}
	*		A promise which is resolved with the new script.
	*
	* @private
	*/
ScriptComponentHandler.prototype._createEngineScript = function (scriptName) {
	var script = Scripts_Scripts.create(scriptName);
	if (!script) {
		throw new Error('Unrecognized script name');
	}

	script.id = ScriptComponentHandler.ENGINE_SCRIPT_PREFIX + scriptName;
	script.enabled = false;

	SystemBus.emit('goo.scriptExternals', {
		id: script.id,
		externals: script.externals
	});

	return PromiseUtils_PromiseUtils.resolve(script);
};

/**
 * Sets the parameters of a script instance from the json configuration.
 *
 * @param {object} parameters
 *        Parameters of the new script instance which are to be filled
 *        out according to the json config and the script externals.
 * @param {object}
 *        json configuration from which the parameter values are to be
 *        extracted.
 * @param {object} externals
 *        Parameter descriptor as defined in a script's external.parameters
 *        object.
 * @param options
 *        DynamicLoader options.
 *
 * @returns {Promise}
 *
 * @private
 */
ScriptComponentHandler.prototype._setParameters = function (parameters, config, externals, options) {
	var that = this;

	// is externals ever falsy?
	if (!externals || !externals.parameters) {
		return PromiseUtils_PromiseUtils.resolve();
	}

	var promises = externals.parameters.map(function (external) {
		return that._setParameter(parameters, config[external.key], external, options);
	});

	parameters.enabled = config.enabled !== false;

	return RSVP.all(promises);
};

/**
 * Sets a script parameter from the json configuration.
 *
 * @param {object} parameters
 *        Script parameters object on which the parameter is to be set.
 * @param {object} config
 *        JSON configuration from which the parameter values are to be
 *        extracted.
 * @param {object} external
 *        Parameter descriptor (type, key, etc).
 * @param {object} options
 *        DynamicLoader options.
 *
 * @returns {Promise}
 *          A promise which is resolved when the parameter has been set.
 *
 * @private
 */
ScriptComponentHandler.prototype._setParameter = function (parameters, config, external, options) {
	var that = this;
	var key = external.key;
	var type = external.type;

	function setParam(value) {
		parameters[key] = value;
		return PromiseUtils_PromiseUtils.resolve();
	}

	function getInvalidParam() {
		if (external.default === undefined) {
			return ObjectUtils_ObjectUtils.deepClone(ScriptUtils_ScriptUtils.DEFAULTS_BY_TYPE[type]);
		} else {
			return ObjectUtils_ObjectUtils.deepClone(external.default);
		}
	}

	function setRefParam() {
		if (!config || config.enabled === false) {
			return setParam(null);
		}

		// Get wrapped ref (i.e. entityRef) and if none exists it is because
		// we got a direct ref.
		var ref = config[type + 'Ref'] || config;

		return that._load(ref, options).then(setParam);
	}

	if (!ScriptUtils_ScriptUtils.TYPE_VALIDATORS[type](config)) {
		return setParam(getInvalidParam());
	} else if (type === 'entity') {
		// For entities, because they can depend on themselves, we don't
		// wait for the load to be completed. It will eventually resolve
		// and the parameter will be set.
		setRefParam();
		return PromiseUtils_PromiseUtils.resolve();
	} else if (ScriptUtils_ScriptUtils.isRefType(type)) {
		return setRefParam();
	} else {
		return setParam(ObjectUtils_ObjectUtils.clone(config));
	}
};

/**
 * @hidden
 */
export { mod_ScriptComponentHandler as ScriptComponentHandler };

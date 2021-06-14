"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ScriptComponentHandler = undefined;

var _ComponentHandler = require("../loaders/handlers/ComponentHandler");

var _ScriptComponent = require("../entities/components/ScriptComponent");

var _rsvp = require("../util/rsvp");

var _ObjectUtils = require("../util/ObjectUtils");

var _PromiseUtils = require("../util/PromiseUtils");

var _SystemBus = require("../entities/SystemBus");

var _Scripts = require("../scripts/Scripts");

var _ScriptUtils = require("../scripts/ScriptUtils");

var mod_ScriptComponentHandler = ScriptComponentHandler;

/**
 * @hidden
 */
function ScriptComponentHandler() {
	_ComponentHandler.ComponentHandler.apply(this, arguments);
	this._type = 'ScriptComponent';
}

ScriptComponentHandler.prototype = Object.create(_ComponentHandler.ComponentHandler.prototype);
ScriptComponentHandler.prototype.constructor = ScriptComponentHandler;
(0, _ComponentHandler._registerClass)('script', ScriptComponentHandler);

ScriptComponentHandler.ENGINE_SCRIPT_PREFIX = 'GOO_ENGINE_SCRIPTS/';

ScriptComponentHandler.prototype._prepare = function () /*config*/{};

ScriptComponentHandler.prototype._create = function () {
	return new _ScriptComponent.ScriptComponent();
};

ScriptComponentHandler.prototype.update = function (entity, config, options) {
	var that = this;

	return _ComponentHandler.ComponentHandler.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) {
			return;
		}

		return _rsvp.rsvpjs.all(_ObjectUtils.ObjectUtils.map(config.scripts, function (instanceConfig) {
			return that._updateScriptInstance(component, instanceConfig, options);
		}, null, 'sortValue')).then(function (scripts) {
			component.scripts = scripts;
			return component;
		});
	});
};

ScriptComponentHandler.prototype._updateScriptInstance = function (component, instanceConfig, options) {
	var that = this;

	return this._createOrLoadScript(component, instanceConfig).then(function (script) {
		var newParameters = instanceConfig.options || {};
		if (script.parameters) {
			_ObjectUtils.ObjectUtils.defaults(newParameters, script.parameters);
		}

		if (script.externals && script.externals.parameters) {
			(0, _ScriptUtils.fillDefaultValues)(newParameters, script.externals.parameters);
		}

		var newScript = null;
		if (script.context) {
			newScript = script;
			if (newScript.parameters) {
				// Re-use the parameters object, but clean it before updating it.
				var keys = Object.keys(newScript.parameters);
				for (var i = 0; i < keys.length; i++) {

					// delete newScript.parameters[keys[i]];
					newScript.parameters[keys[i]] = null;
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

		return that._setParameters(newScript.parameters, newParameters, script.externals, options).then(function () {
			if (newScript.argsUpdated && newScript.context) {
				newScript.argsUpdated(newScript.parameters, newScript.context, window.goo);
			}
		}).then(_ObjectUtils.ObjectUtils.constant(newScript));
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
		return _PromiseUtils.PromiseUtils.resolve(existingScript);
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
	return _ObjectUtils.ObjectUtils.find(component.scripts, function (script) {
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
	var script = (0, _Scripts.create)(scriptName);
	if (!script) {
		throw new Error('Unrecognized script name');
	}

	script.id = ScriptComponentHandler.ENGINE_SCRIPT_PREFIX + scriptName;
	script.enabled = false;

	_SystemBus.SystemBusjs.emit('goo.scriptExternals', {
		id: script.id,
		externals: script.externals
	});

	return _PromiseUtils.PromiseUtils.resolve(script);
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
		return _PromiseUtils.PromiseUtils.resolve();
	}

	var promises = externals.parameters.map(function (external) {
		return that._setParameter(parameters, config[external.key], external, options);
	});

	parameters.enabled = config.enabled !== false;

	return _rsvp.rsvpjs.all(promises);
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
		return _PromiseUtils.PromiseUtils.resolve();
	}

	function getInvalidParam() {
		if (external.default === undefined) {
			return _ObjectUtils.ObjectUtils.deepClone(_ScriptUtils.DEFAULTS_BY_TYPE[type]);
		} else {
			return _ObjectUtils.ObjectUtils.deepClone(external.default);
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

	if (!_ScriptUtils.TYPE_VALIDATORS[type](config)) {
		return setParam(getInvalidParam());
	} else if (type === 'entity') {
		// For entities, because they can depend on themselves, we don't
		// wait for the load to be completed. It will eventually resolve
		// and the parameter will be set.
		setRefParam();
		return _PromiseUtils.PromiseUtils.resolve();
	} else if ((0, _ScriptUtils.isRefType)(type)) {
		return setRefParam();
	} else {
		return setParam(_ObjectUtils.ObjectUtils.clone(config));
	}
};

/**
 * @hidden
 */
exports.ScriptComponentHandler = mod_ScriptComponentHandler;
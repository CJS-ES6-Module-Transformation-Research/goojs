// jshint node:true
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var definitionsCounter = 0;

var serializers = {
	'primitive': function primitive(node) {
		return node.name.data === 'boolean' ? 'bool' : node.name.data;
	},
	'any': function any(node) {
		return '?';
	},
	'class': function _class(node, definitions) {
		// general generic types are not supported by tern (yet), only arrays for now
		if (node.name.data === 'Array') {
			return '[' + (node.parameters.length === 1 ? serialize(node.parameters[0], definitions) : '?') + ']';
		}

		return node.name.data[0] === '_' ? node.name.data : '+' + node.name.data;
	},
	'list-item': function listItem(node, definitions) {
		var name = node.name;

		// serializing both as '?'
		var decoratedName = name.nullable || name.optional ? name.data + '?' : name.data;

		return decoratedName + ': ' + (node.type ? serialize(node.type, definitions) : '?');
	},
	'object': function object(node, definitions) {
		var name = '_t_' + definitionsCounter;
		definitionsCounter++;

		definitions[name] = node.members.reduce(function (definition, member) {
			definition[member.name.data] = member.type ? serialize(member.type, definitions) : '?';
			return definition;
		}, {});

		return name;
	},
	'function': function _function(node, definitions) {
		var fun = 'fn(' + node.parameters.map(function (parameter) {
			return serialize(parameter, definitions);
		}).join(', ') + ')';

		return node.return ? fun + ' -> ' + serialize(node.return, definitions) : fun;
	},
	'either': function either(node, definitions) {
		// might need parens
		// tern doesn't mention parens but without them the expression can be ambiguous
		return node.choices.map(function (parameter) {
			return serialize(parameter, definitions);
		}).join('|');
	}
};

var serialize = function serialize(node, definitions) {
	return serializers[node.nodeType](node, definitions);
};

var _serialize = function _serialize(node, options) {
	if (options && typeof options._forceCounter === 'number') {
		definitionsCounter = options._forceCounter;
	}

	var definitions = {};
	var serialized = serialize(node, definitions);
	return {
		definitions: definitions,
		serialized: serialized
	};
};

var serialize_serialize;

exports.serialize = serialize_serialize = _serialize;
exports.serialize = serialize_serialize;
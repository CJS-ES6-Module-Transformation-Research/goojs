// jshint node:true
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var serializers = {
	'primitive': function primitive(node) {
		return node.name.data;
	},
	'any': function any(node) {
		return '*';
	},
	'class': function _class(node) {
		// general generic types are not supported by tern (yet), only arrays for now
		if (node.name.data === 'Array') {
			return node.parameters.length === 1 ? serialize(node.parameters[0]) + '[]' : 'Array';
		}

		return node.name.data;
	},
	'list-item': function listItem(node, definitions) {
		var name = node.name;

		// serializing both as '?'
		var decoratedName = name.nullable || name.optional ? name.data + '?' : name.data;

		return decoratedName + ': ' + (node.type ? serialize(node.type, definitions) : '?');
	},
	'object': function object(node) {
		var list = node.members.map(function (member) {
			return member.name.data + (member.type ? serialize(member.type) : '?');
		}).join(', ');

		return '{ ' + list + ' }';
	},
	'function': function _function(node, definitions) {
		var fun = 'function (' + node.parameters.map(function (parameter) {
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

var serialize = function serialize(node) {
	return serializers[node.nodeType](node);
};

exports.serialize = serialize_serialize = serialize;
var serialize_serialize;
exports.serialize = serialize_serialize;
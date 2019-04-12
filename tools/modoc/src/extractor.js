"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.extract = undefined;

var _esprima = require("../lib/esprima");

var esprima = _interopRequireWildcard(_esprima);

var _estraverse = require("estraverse");

var _estraverse2 = _interopRequireDefault(_estraverse);

var _util = require("./util");

var util = _interopRequireWildcard(_util);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			}
		}newObj.default = obj;return newObj;
	}
}

// jshint node:true
'use strict';

var getFirstJSDoc = function getFirstJSDoc(comments) {
	for (var i = 0; i < comments.length; i++) {
		var comment = comments[i];
		if (comment.type === 'Block' && comment.value[0] === '*') {
			return comment.value;
		}
	}
};

var extractTree = function extractTree(tree, fileName, options) {
	var extractors = {
		constructor: {
			match: function match(node, fileName) {
				return node.type === 'FunctionDeclaration' && node.id.name === fileName;
			},
			extract: function extract(node) {
				var params = node.params.map(function (param) {
					return param.name;
				});

				var comment;
				var leadingComments = node.leadingComments || node.id.leadingComments;
				if (leadingComments) {
					comment = getFirstJSDoc(leadingComments);
				}

				return {
					name: node.id.name,
					params: params,
					rawComment: comment
				};
			}
		},
		method: {
			match: function match(node, fileName) {
				return node.type === 'AssignmentExpression' && node.operator === '=' && node.left.type === 'MemberExpression' && node.left.object.type === 'MemberExpression' && node.left.object.property.name === 'prototype' && node.left.object.object.name === fileName && node.right.type === 'FunctionExpression' && options.nameFilter(node.left.property.name);
			},
			extract: function extract(node) {
				var params = node.right.params.map(function (param) {
					return param.name;
				});

				var comment;
				var leadingComments = node.leadingComments || node.left.leadingComments;

				if (leadingComments) {
					comment = getFirstJSDoc(leadingComments);
				}

				return {
					name: node.left.property.name,
					params: params,
					rawComment: comment
				};
			}
		},
		staticMethod: {
			match: function match(node, fileName) {
				return node.type === 'AssignmentExpression' && node.operator === '=' && node.left.type === 'MemberExpression' && node.left.object.name === fileName && node.right.type === 'FunctionExpression' && options.nameFilter(node.left.property.name);
			},
			extract: function extract(node) {
				var params = node.right.params.map(function (param) {
					return param.name;
				});

				var comment;
				var leadingComments = node.leadingComments || node.left.leadingComments;

				if (leadingComments) {
					comment = getFirstJSDoc(leadingComments);
				}

				return {
					name: node.left.property.name,
					params: params,
					rawComment: comment
				};
			}
		},
		staticMember: {
			match: function match(node, parent, fileName) {
				return node.type === 'AssignmentExpression' && node.operator === '=' && node.left.type === 'MemberExpression' && node.left.object.name === fileName && node.right.type !== 'FunctionExpression' && parent.leadingComments && getFirstJSDoc(parent.leadingComments) && options.nameFilter(node.left.property.name);
			},
			extract: function extract(node, parent) {
				var comment;
				var leadingComments = parent.leadingComments;

				if (leadingComments) {
					comment = getFirstJSDoc(leadingComments);
				}

				return {
					name: node.left.property.name,
					rawComment: comment
				};
			}
		},
		member: {
			match: function match(node, parent, fileName) {
				if (node.type === 'AssignmentExpression' && node.operator === '=' && node.left.type === 'MemberExpression' && node.left.object.type === 'ThisExpression' && options.nameFilter(node.left.property.name)) {
					var comments;
					if (parent.leadingComments) {
						comments = parent.leadingComments;
					} else if (node.left.leadingComments) {
						comments = node.left.leadingComments;
					}

					return comments && getFirstJSDoc(comments);
				}
				return false;
			},
			extract: function extract(node, parent) {
				var comment = getFirstJSDoc(parent.leadingComments || node.left.leadingComments);

				return {
					name: node.left.property.name,
					rawComment: comment
				};
			}
		}
	};

	var constructor,
	    staticMethods = [],
	    methods = [],
	    members,
	    staticMembers = [];

	var collectMembers = function collectMembers(node) {
		var members = [];
		_estraverse2.default.traverse(node, {
			enter: function enter(node, parent) {
				if (extractors.member.match(node, parent, fileName)) {
					members.push(extractors.member.extract(node, parent));
				}
			}
		});
		return members;
	};

	_estraverse2.default.traverse(tree, {
		enter: function enter(node, parent) {
			if (extractors.constructor.match(node, fileName)) {
				constructor = extractors.constructor.extract(node);
				members = collectMembers(node.body);
			} else if (extractors.method.match(node, fileName)) {
				methods.push(extractors.method.extract(node));
			} else if (extractors.staticMethod.match(node, fileName)) {
				staticMethods.push(extractors.staticMethod.extract(node));
			} else if (extractors.staticMember.match(node, parent, fileName)) {
				staticMembers.push(extractors.staticMember.extract(node, parent));
			}
		}
	});

	var extraComments = tree.comments.filter(function (comment) {
		return comment.value[0] === '*' && comment.type === 'Block' && comment.value.indexOf('@target-class') !== -1;
	}).map(function (comment) {
		return comment.value;
	});

	return {
		constructor: constructor,
		staticMethods: staticMethods,
		staticMembers: staticMembers,
		methods: methods,
		members: members,
		extraComments: extraComments
	};
};

var extract = exports.extract = function extract(source, file, options) {
	options = options || {};
	options.nameFilter = function (name) {
		return name[0] !== '_'; // skip 'private' methods
	};

	var fileName = util.getFileName(file);

	var parseOptions = { attachComment: true };
	var tree = esprima.parse(source, parseOptions);

	return extractTree(tree, fileName, options);
};

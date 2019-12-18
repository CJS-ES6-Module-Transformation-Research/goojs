"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.all = exports.compileComment = exports.link = undefined;

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _jsdocParser = require("./jsdoc-parser");

var jsdocParser = _interopRequireWildcard(_jsdocParser);

var _typeParser = require("./type-expressions/type-parser");

var typeParser = _interopRequireWildcard(_typeParser);

var _jsdocSerializer = require("./type-expressions/jsdoc-serializer");

var jsdocSerializer = _interopRequireWildcard(_jsdocSerializer);

var _util = require("./util");

var util = _interopRequireWildcard(_util);

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

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

// jshint node:true
'use strict';

// regex compilation for `[]()` links, `@link` and types (big mess)
var typesRegex;
var compileTypesRegex = function compileTypesRegex(types) {
	var typesRegexStr = '\\b(' + types.join('|') + ')\\b';
	typesRegex = new RegExp(typesRegexStr, 'g');

	var urlRegex2Str = '\\{@link\\s(' + types.join('|') + ')\\}';
	urlRegex2 = new RegExp(urlRegex2Str, 'g');
};

var linkTypes = function linkTypes(string) {
	return string.replace(typesRegex, '<a href="#$1" class-name="$1">$1</a>');
};

var urlRegex1 = /\[(.+?)]\{@link (.+?)}/g;
var urlRegex2;
var linkUrls = function linkUrls(string) {
	var tmp = string;
	tmp = tmp.replace(urlRegex1, '<a href="$2" target="_blank">$1</a>');
	tmp = tmp.replace(urlRegex2, '<a href="#$1" class-name="$1">$1</a>');
	return tmp;
};
// ---

// just concerned about < and > which might appear in type expressions
var escapeType = function escapeType(string) {
	return string.replace('>', '&gt;').replace('<', '&lt;');
};

var warningRegex = /\(!\)/g;
var expandIcons = function expandIcons(string) {
	return string.replace(warningRegex, '<span class="icon-warning-yellow"></span>');
};

var translateType = function translateType(closureType) {
	if (closureType.trim().length > 0) {
		try {
			var parsed = typeParser.parse(closureType);
			var jsdocType = jsdocSerializer.serialize(parsed);
			return jsdocType;
		} catch (e) {
			console.warn(e);
			return closureType;
		}
	} else {
		return '';
	}
};

var processType = _underscore2.default.compose(linkTypes, escapeType, translateType);

var link = function link(comment) {
	if (!comment) {
		return;
	}
	comment.description = linkUrls(expandIcons(comment.description));

	if (comment.param) {
		comment.param.forEach(function (param) {
			param.rawType = param.type;
			param.type = processType(param.type);
			param.description = linkUrls(param.description);
		});
	}

	if (comment.returns) {
		comment.returns.rawType = comment.returns.type;
		comment.returns.type = processType(comment.returns.type);
		comment.returns.description = linkUrls(comment.returns.description);
	}

	if (comment.type) {
		comment.type.rawType = comment.type.type;
		comment.type.type = processType(comment.type.type);
	}
};

var exported_link = link;

var hasParamData = function hasParamData(params) {
	return params.some(function (param) {
		return !!param.description || !!param.type;
	});
};

var tagAndIdentifier = function tagAndIdentifier(tag) {
	return {
		tag: tag,
		identifier: util.tagToIdentifier(tag)
	};
};

var copyTags = ['@returns', '@example', '@example-link', '@property', '@default', '@type', '@deprecated', '@extends', '@target-class', '@group', '@require-path'].map(tagAndIdentifier);

var booleanTags = ['@virtual', '@readonly', '@hidden', '@private'].map(tagAndIdentifier);

var compileComment = function compileComment(rawComment) {
	// parse the raw comment
	var parsed = jsdocParser.extract(rawComment);

	var comment = {};
	comment.description = parsed.description;

	// this should stay in the presentation
	if (parsed['@param']) {
		comment.param = parsed['@param'];

		// if there's nothing interesting then don't bother
		if (!hasParamData(comment.param)) {
			comment.param = [];
		}

		for (var pkey in comment.param) {
			var param = comment.param[pkey];
			if (param.name.indexOf('.') === -1) {
				param.isTop = true;
			}
		}
	}

	copyTags.forEach(function (copyTag) {
		if (parsed[copyTag.tag]) {
			comment[copyTag.identifier] = parsed[copyTag.tag];
		}
	});

	booleanTags.forEach(function (booleanTag) {
		if (parsed[booleanTag.tag]) {
			comment[booleanTag.identifier] = true;
		}
	});

	return comment;
};

var exported_compileComment = compileComment;

var inject = function inject(data) {
	if (!data.rawComment) {
		return;
	}

	data.comment = compileComment(data.rawComment);
};

var all = function all(jsData, files) {
	if (!typesRegex) {
		var types = files.map(util.getFileName);
		compileTypesRegex(types);
	}

	inject(jsData.constructor);
	jsData.methods.forEach(inject);
	jsData.staticMethods.forEach(inject);
	jsData.staticMembers.forEach(inject);
	jsData.members.forEach(inject);

	// jsData.extraComments

	link(jsData.constructor.comment);
	jsData.methods.forEach(function (method) {
		link(method.comment);
	});
	jsData.staticMethods.forEach(function (staticMethod) {
		link(staticMethod.comment);
	});
	jsData.staticMembers.forEach(function (staticMember) {
		link(staticMember.comment);
	});
	jsData.members.forEach(function (member) {
		link(member.comment);
	});
};

var exported_all = all;
exports.link = exported_link;
exports.compileComment = exported_compileComment;
exports.all = exported_all;

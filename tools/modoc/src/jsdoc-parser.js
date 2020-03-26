'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.extract = undefined;

var _util = require('./util');

var util_utiljsjs = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// jshint node:true
'use strict';

var SUPPORTED_TAGS = ['description', '@param', '@returns', '@example', '@example-link', '@readonly', '@type', '@default', '@deprecated', '@property', '@extends', '@hidden', '@private', '@virtual', '@target-class', '@group', '@require-path'];

var stripStars = function stripStars(string) {
	var stripped = string.replace(/^[ \t\n\r]*\*?[ \t\n\r]*|[ \t\n\r]+$/g, '');
	return stripped.replace(/^[ \t]*\* ?/gm, '');
};

var partition = function partition(doc) {
	var tags = { description: [] };

	var currentTag = 'description';

	var lines = doc.split(/\r?\n/);

	var partial = [];
	lines.forEach(function (line) {
		// line = line.trim();
		// if (line.length === 0) {
		// 	return;
		// }
		if (line[0] === '@') {
			tags[currentTag].push(partial);

			var indexOfSpace = line.indexOf(' ');
			if (indexOfSpace > -1) {
				currentTag = util.stringUntil(line, ' ');
				partial = [util.stringFrom(line, ' ')];
			} else {
				currentTag = line;
				partial = [];
			}

			if (!tags[currentTag]) {
				tags[currentTag] = [];
			}
		} else {
			partial.push(line);
		}
	});

	tags[currentTag].push(partial);

	Object.keys(tags).forEach(function (tagName) {
		tags[tagName] = tags[tagName].map(function (lines) {
			return lines.join('\n');
		});
	});

	return tags;
};

var warnOnRogueTags = function warnOnRogueTags(tags) {
	for (var i = 0; i < tags.length; i++) {
		var tag = tags[i];
		if (SUPPORTED_TAGS.indexOf(tag) === -1) {
			console.warn('Unsupported tag ' + tag);
		}
	}
};

var indexOfMatchingParen = function indexOfMatchingParen(string, offset, openParen, closeParen) {
	var i = offset;
	var parens = 1;

	while (i < string.length) {
		i++;
		if (string[i] === openParen) {
			parens++;
		} else if (string[i] === closeParen) {
			parens--;
			if (parens === 0) {
				return i;
			}
		}
	}

	return -1;
};

var extractType = function extractType(string, offset) {
	var i = string.indexOf('{', offset);
	if (i === -1) {
		return { type: '', end: offset };
	}

	var end = indexOfMatchingParen(string, i, '{', '}');

	return {
		end: end + 1,
		type: string.substring(i + 1, end)
	};
};

var isSpace = function isSpace(char) {
	return char === ' ' || char === '\t';
};

var firstSpace = function firstSpace(string, offset) {
	var i = offset;
	while (!isSpace(string[i])) {
		i++;
		if (i >= string.length) {
			return -1;
		}
	}
	return i;
};

var firstNonSpace = function firstNonSpace(string, offset) {
	var i = offset;
	while (isSpace(string[i])) {
		i++;
		if (i >= string.length) {
			return -1;
		}
	}
	return i;
};

var extractName = function extractName(string, offset) {
	var i = firstNonSpace(string, offset);

	var name,
	    default_,
	    optional = false,
	    end;
	if (string[i] === '[') {
		optional = true;
		var endParen = indexOfMatchingParen(string, i, '[', ']');
		end = endParen;
		var equals = string.indexOf('=', i);

		if (equals !== -1 && equals < endParen) {
			name = string.substring(i + 1, equals);
			default_ = string.substring(equals + 1, endParen);
		} else {
			name = string.substring(i + 1, endParen);
		}
		end += 2;
	} else {
		var space = firstSpace(string, i + 1);
		var newLine = string.length;

		end = space !== -1 ? space : newLine;
		name = string.substring(i, end);
		end += 1;
	}

	return {
		name: name,
		default_: default_,
		optional: optional,
		end: end
	};
};

var extractDescription = function extractDescription(string, offset) {
	var i = firstNonSpace(string, offset);

	return {
		description: i === -1 ? '' : string.substring(i),
		end: string.length
	};
};

var extractUntilSpace = function extractUntilSpace(string, offset) {
	var i = firstNonSpace(string, offset);

	var limit = firstSpace(string, i);

	return {
		string: string.substring(i, limit),
		end: limit
	};
};

var extractTagParam = function extractTagParam(param) {
	var typeData = extractType(param, 0);
	var type = typeData.type;
	var offset = typeData.end;

	var nameData = extractName(param, offset);
	var name = nameData.name;
	var offset = nameData.end;
	var default_ = nameData.default_;
	var optional = nameData.optional;

	var descriptionData = extractDescription(param, offset);
	var description = descriptionData.description;

	return {
		type: type,
		name: name,
		default_: default_,
		optional: optional,
		description: description
	};
};

var extractTagProperty = extractTagParam; // same for now

var extractTagReturn = function extractTagReturn(returns) {
	var typeData = extractType(returns, 0);
	var type = typeData.type;
	var offset = typeData.end;

	var descriptionData = extractDescription(returns, offset);
	var description = descriptionData.description;

	return {
		type: type,
		description: description
	};
};

var extractTagType = function extractTagType(type) {
	var typeData = extractType(type, 0);

	return {
		type: typeData.type
	};
};

var extractTagDefault = function extractTagDefault(default_) {
	// no processing required
	return {
		default_: default_
	};
};

var extractTagDeprecated = function extractTagDeprecated(deprecated) {
	// no processing required
	return {
		description: deprecated
	};
};

var extractTagExtends = function extractTagExtends(extends_) {
	// no processing required
	return {
		base: extends_
	};
};

var extractTagExampleLink = function extractTagExampleLink(exampleLink) {
	var linkData = extractUntilSpace(exampleLink, 0);
	var link = linkData.string;
	var offset = linkData.end;

	var textData = extractDescription(exampleLink, offset);

	var text = textData.description;

	return {
		link: link,
		text: text
	};
};

var extractTagTargetClass = function extractTagTargetClass(targetClass) {
	// @target-class <class> <name> method|member|static-member|static-method
	var match = targetClass.match(/^\s*(\w+)\s+(\w+)\s+(method|member|static-method|static-member|constructor)/);
	if (!match) {
		throw new Error('malformed @target-class; got ' + targetClass);
	}
	return {
		className: match[1],
		itemName: match[2],
		itemType: match[3]
	};
};

var extractTagGroup = function extractTagGroup(group) {
	// no processing required
	return {
		group: group
	};
};

var extractTagRequirePath = function extractTagRequirePath(requirePath) {
	// no processing required
	return {
		requirePath: requirePath
	};
};

var tagExtractors = function () {
	var mapping = {
		'description': function description(tag) {
			return tag[0];
		},
		'@param': function param(tag) {
			return tag.map(extractTagParam);
		},
		'@returns': function returns(tag) {
			return extractTagReturn(tag[0]);
		},
		'@example': function example(tag) {
			return tag[0];
		},
		'@example-link': function exampleLink(tag) {
			return extractTagExampleLink(tag[0]);
		},
		'@type': function type(tag) {
			return extractTagType(tag[0]);
		},
		'@default': function _default(tag) {
			return extractTagDefault(tag[0]);
		},
		'@deprecated': function deprecated(tag) {
			return extractTagDeprecated(tag[0]);
		},
		'@property': function property(tag) {
			return tag.map(extractTagProperty);
		},
		'@extends': function _extends(tag) {
			return extractTagExtends(tag[0]);
		},
		'@target-class': function targetClass(tag) {
			return extractTagTargetClass(tag[0]);
		},
		'@group': function group(tag) {
			return extractTagGroup(tag[0]);
		},
		'@require-path': function requirePath(tag) {
			return extractTagRequirePath(tag[0]);
		}
	};

	return Object.keys(mapping).map(function (tagName) {
		return {
			name: tagName,
			extractor: mapping[tagName]
		};
	});
}();

var extract = function extract(doc) {
	var stripped = stripStars(doc);

	var tags = partition(stripped);

	warnOnRogueTags(Object.keys(tags));

	tagExtractors.forEach(function (tagExtractor) {
		if (tags[tagExtractor.name]) {
			tags[tagExtractor.name] = tagExtractor.extractor(tags[tagExtractor.name]);
		}
	});

	return tags;
};

var _partition;

_partition = partition;
var _extractType;
_extractType = extractType;
var _extractName;
_extractName = extractName;
var _extractDescription;
_extractDescription = extractDescription;
var _extractTagParam;
_extractTagParam = extractTagParam;
var _extractTagReturn;
_extractTagReturn = extractTagReturn;
var _extractTagType;
_extractTagType = extractTagType;
var _extractTagExtends;
_extractTagExtends = extractTagExtends;
var _extractTagTargetClass;
_extractTagTargetClass = extractTagTargetClass;
var extract_extract = extract;
exports.extract = extract_extract;

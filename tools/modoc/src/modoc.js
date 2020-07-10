"use strict";

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _child_process = require("child_process");

var _child_process2 = _interopRequireDefault(_child_process);

var _handlebars = require("handlebars");

var _handlebars2 = _interopRequireDefault(_handlebars);

var _marked = require("marked");

var _marked2 = _interopRequireDefault(_marked);

var _indexBuilder = require("./index-builder");

var indexbuilder_getIndexjs = _interopRequireWildcard(_indexBuilder);

var _util = require("./util");

var _trunk = require("./trunk");

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

// handlebars.registerHelper("debug", function(optionalValue) {
//   console.log("Current Context");
//   console.log("====================");
//   console.log(this);

//   if (optionalValue) {
//     console.log("Value");
//     console.log("====================");
//     console.log(optionalValue);
//   }
// });

function processArguments() {
	if (process.argv.length < 6) {
		console.log('Usage: node modoc.js <sourcePath> <templatesPath> <staticsPath> <outPath>');
	}

	var sourcePath = process.argv[2];
	var templatesPath = process.argv[3];
	var staticsPath = process.argv[4];
	var outPath = process.argv[5];

	return {
		sourcePath: sourcePath,
		templatesPath: templatesPath,
		staticsPath: staticsPath,
		outPath: outPath
	};
}

function copyStaticFiles(callback) {
	_child_process2.default.exec('cp -r ' + args.staticsPath + '/. ' + args.outPath, function (error, stdout, stderr) {
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if (error !== null) {
			console.log('exec error: ' + error);
		}
		callback();
	});
}

function resolveRequirePaths(classes, index) {
	index.forEach(function (group) {
		group.classes.forEach(function (entry) {
			var className = entry.name;
			var class_ = classes[className];

			if (!class_.requirePath) {
				class_.requirePath = entry.requirePath;
			}
		});
	});
}

function resolvePacks(classes, index) {
	index.forEach(function (group) {
		group.classes.forEach(function (entry) {
			var className = entry.name;
			var class_ = classes[className];

			if (!class_.pack) {
				var m = entry.requirePath.match(/([a-zA-Z\d]+pack)\//);
				if (m && m.length >= 2) {
					class_.pack = m[1];
				}
			}
		});
	});
}

function buildClasses(classes) {
	var classTemplate = _fs2.default.readFileSync(args.templatesPath + _util.PATH_SEPARATOR + 'class.handlebars', { encoding: 'utf8' });

	var classesArray = Object.keys(classes).map(function (className) {
		return classes[className];
	});

	var result = _handlebars2.default.compile(classTemplate)({ classes: classesArray });

	_fs2.default.writeFileSync(args.outPath + _util.PATH_SEPARATOR + 'everything.html', result);
}

function buildIndex(index) {
	var navTemplate = _fs2.default.readFileSync(args.templatesPath + _util.PATH_SEPARATOR + 'nav.handlebars', { encoding: 'utf8' });

	var result = _handlebars2.default.compile(navTemplate)({ index: index });

	_fs2.default.writeFileSync(args.outPath + _util.PATH_SEPARATOR + 'index.html', result);
}

function buildChangelog(file) {
	var changelog = _fs2.default.readFileSync(file, { encoding: 'utf8' });
	var formatted = (0, _marked2.default)(changelog);

	var changelogTemplate = _fs2.default.readFileSync(args.templatesPath + _util.PATH_SEPARATOR + 'changelog.handlebars', { encoding: 'utf8' });

	var result = _handlebars2.default.compile(changelogTemplate)({ content: formatted });

	_fs2.default.writeFileSync(args.outPath + _util.PATH_SEPARATOR + 'changelog.html', result);
}

function compileDeprecated(classes) {
	var constructors = [],
	    methods = [],
	    staticMethods = [],
	    members = [],
	    staticMembers = [];

	Object.keys(classes).forEach(function (className) {
		var class_ = classes[className];

		var getEntry = function getEntry(item) {
			return {
				class_: className,
				item: item
			};
		};

		if (!class_.constructor || !class_.constructor.comment) {
			return;
		}

		if (class_.constructor.comment.deprecated) {
			constructors.push(getEntry(class_.constructor));
		}

		class_.methods.forEach(function (method) {
			if (method.comment && method.comment.deprecated) {
				methods.push(getEntry(method));
			}
		});

		class_.staticMethods.forEach(function (staticMethod) {
			if (staticMethod.comment && staticMethod.comment.deprecated) {
				staticMethods.push(getEntry(staticMethod));
			}
		});

		class_.members.forEach(function (member) {
			if (member.comment && member.comment.deprecated) {
				members.push(getEntry(member));
			}
		});

		class_.staticMembers.forEach(function (staticMember) {
			if (staticMember.comment && staticMember.comment.deprecated) {
				staticMembers.push(getEntry(staticMember));
			}
		});
	});

	return {
		constructors: constructors,
		hasConstructors: constructors.length > 0,
		methods: methods,
		hasMethods: methods.length > 0,
		staticMethods: staticMethods,
		hasStaticMethods: staticMethods.length > 0,
		members: members,
		hasMembers: members.length > 0,
		staticMembers: staticMembers,
		hasStaticMembers: staticMembers.length > 0
	};
}

function buildDeprecated(classes) {
	var deprecatedTemplate = _fs2.default.readFileSync(args.templatesPath + _util.PATH_SEPARATOR + 'deprecated.handlebars', { encoding: 'utf8' });

	var data = compileDeprecated(classes);

	var result = _handlebars2.default.compile(deprecatedTemplate)(data);

	_fs2.default.writeFileSync(args.outPath + _util.PATH_SEPARATOR + 'deprecated.html', result);
}

var args = processArguments();

var IGNORE_FILES = ['goo.js', 'pack.js', 'logicpack', 'soundmanager', '+'];

copyStaticFiles(function () {
	var files = (0, _trunk.trunkjs)(args.sourcePath, IGNORE_FILES);

	var classes = (0, _trunk.trunkjs)(files);
	var index = indexbuilder_getIndexjs.getIndex(classes, 'goo');
	resolveRequirePaths(classes, index);
	resolvePacks(classes, index);

	buildClasses(classes);
	buildIndex(index);

	buildChangelog('CHANGES');
	buildDeprecated(classes);

	console.log('documentation built');
});
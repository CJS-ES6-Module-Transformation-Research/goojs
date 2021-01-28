import ext_fs_fs from "fs";
import ext_childProcess from "child_process";
import ext_handlebars_handlebars from "handlebars";
import ext_marked_marked from "marked";
import { getIndex as indexbuilder_getIndex } from "./index-builder";
import { utiljs as util } from "./util";
import { trunkjs as trunk } from "./trunk";
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
	ext_childProcess.exec(
		'cp -r ' + args.staticsPath + '/. ' + args.outPath,
		function (error, stdout, stderr) {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (error !== null) {
				console.log('exec error: ' + error);
			}
			callback();
		}
	);
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
				if(m && m.length >= 2){
					class_.pack = m[1];
				}
			}
		});
	});
}

function buildClasses(classes) {
	var classTemplate = ext_fs_fs.readFileSync(
		args.templatesPath + util + 'class.handlebars', { encoding: 'utf8' });

	var classesArray = Object.keys(classes).map(function (className) {
		return classes[className];
	});

	var result = ext_handlebars_handlebars.compile(classTemplate)({ classes: classesArray });

	ext_fs_fs.writeFileSync(args.outPath + util + 'everything.html', result);
}

function buildIndex(index) {
	var navTemplate = ext_fs_fs.readFileSync(
		args.templatesPath + util + 'nav.handlebars', { encoding: 'utf8' });

	var result = ext_handlebars_handlebars.compile(navTemplate)({ index: index });

	ext_fs_fs.writeFileSync(args.outPath + util + 'index.html', result);
}

function buildChangelog(file) {
	var changelog = ext_fs_fs.readFileSync(file, { encoding: 'utf8' });
	var formatted = ext_marked_marked(changelog);

	var changelogTemplate = ext_fs_fs.readFileSync(args.templatesPath + util + 'changelog.handlebars', { encoding: 'utf8' });

	var result = ext_handlebars_handlebars.compile(changelogTemplate)({ content: formatted });

	ext_fs_fs.writeFileSync(args.outPath + util + 'changelog.html', result);
}

function compileDeprecated(classes) {
	var constructors = [], methods = [], staticMethods = [], members = [], staticMembers = [];

	Object.keys(classes).forEach(function (className) {
		var class_ = classes[className];

		var getEntry = function (item) {
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
	var deprecatedTemplate = ext_fs_fs.readFileSync(
		args.templatesPath + util + 'deprecated.handlebars', { encoding: 'utf8' });

	var data = compileDeprecated(classes);

	var result = ext_handlebars_handlebars.compile(deprecatedTemplate)(data);

	ext_fs_fs.writeFileSync(args.outPath + util + 'deprecated.html', result);
}


var args = processArguments();

var IGNORE_FILES = ['goo.js', 'pack.js', 'logicpack', 'soundmanager', '+'];

copyStaticFiles(function () {
	var files = trunk(args.sourcePath, IGNORE_FILES);

	var classes = trunk(files);
	var index = indexbuilder_getIndex(classes, 'goo');
	resolveRequirePaths(classes, index);
	resolvePacks(classes, index);

	buildClasses(classes);
	buildIndex(index);


	buildChangelog('CHANGES');
	buildDeprecated(classes);

	console.log('documentation built');
});
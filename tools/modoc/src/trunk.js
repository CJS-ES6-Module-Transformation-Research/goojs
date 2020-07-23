import ext_fs_fs from "fs";
import ext_glob_glob from "glob";
import ext_underscore__ from "underscore";
import { extract as extractor_extractjs } from "./extractor";
import { jsdocprocessorjs as jsdocprocessor_jsdocprocessorjsjs } from "./jsdoc-processor";
import { getFileName as util_getFileNamejs } from "./util";
// jshint node:true
'use strict';


function getFiles(sourcePath, ignore) {
	if (/\.js$/.test(sourcePath)) {
		return [sourcePath];
	}

	return ext_glob_glob.sync(sourcePath + '/**/*.js').filter(function (file) {
		return ignore.every(function (term) {
			return file.indexOf(term) === -1;
		});
	});
}

function filterPrivates(class_) {
	var isPrivateOrHidden = function (entry) {
		return !entry.comment || !(entry.comment.private || entry.comment.hidden);
	};

	class_.members = class_.members.filter(isPrivateOrHidden);
	class_.staticMembers = class_.staticMembers.filter(isPrivateOrHidden);
	class_.methods = class_.methods.filter(isPrivateOrHidden);
	class_.staticMethods = class_.staticMethods.filter(isPrivateOrHidden);

	class_.hasMembers = class_.members.length > 0 || (class_.constructor.comment && class_.constructor.comment.property);
	class_.hasStaticMethods = class_.staticMethods.length > 0;
	class_.hasStaticMembers = class_.staticMembers.length > 0;
	class_.hasMethods = class_.methods.length > 0;
}

function compileDoc(files) {
	var classes = {};
	var extraComments = [];

	// extract information from classes
	files.forEach(function (file) {
		console.log('compiling doc for ' + util_getFileNamejs);

		var source = ext_fs_fs.readFileSync(file, { encoding: 'utf8' });

		var class_ = extractor_extractjs(source, file);

		Array.prototype.push.apply(extraComments, class_.extraComments);

		if (class_.constructor) {
			jsdocprocessor_jsdocprocessorjsjs(class_, files);

			filterPrivates(class_);

			class_.file = file;

			classes[class_.constructor.name] = class_;
		}
	});

	// --- should stay elsewhere
	var constructorFromComment = function (comment) {
		jsdocprocessor_jsdocprocessorjsjs(comment);
		return {
			name: comment.targetClass.itemName,
			params: ext_underscore__.pluck(comment.param, 'name'),
			comment: comment
		};
	};

	var memberFromComment = function (comment) {
		jsdocprocessor_jsdocprocessorjsjs(comment);
		return {
			name: comment.targetClass.itemName,
			comment: comment
		};
	};

	var methodFromComment = constructorFromComment;
	var staticMethodFromComment = constructorFromComment;
	var staticMemberFromComment = memberFromComment;
	// ---

	// copy over the extra info from other classes
	// adding extras mentioned in @target-class
	extraComments.map(jsdocprocessor_jsdocprocessorjsjs)
		.forEach(function (extraComment) {
			var targetClassName = extraComment.targetClass.className;
			var targetClass = classes[targetClassName];

			if (!targetClass) {
				targetClass = {
					constructor: null,
					staticMethods: [],
					staticMembers: [],
					methods: [],
					members: []
				};
				classes[targetClassName] = targetClass;
			}

			switch (extraComment.targetClass.itemType) {
				case 'constructor':
					targetClass.constructor = constructorFromComment(extraComment);
					//! schteppe: had to comment out this, to make it work for commonjs. Require paths still sort of works though?
					targetClass.requirePath = '';//extraComment.requirePath.requirePath;
					targetClass.group = extraComment.group.group;
					break;
				case 'member':
					targetClass.members.push(memberFromComment(extraComment));
					break;
				case 'method':
					targetClass.methods.push(methodFromComment(extraComment));
					break;
				case 'static-member':
					targetClass.staticMembers.push(staticMemberFromComment(extraComment));
					break;
				case 'static-method':
					targetClass.staticMethods.push(staticMethodFromComment(extraComment));
					break;
			}
		});

	return classes;
}

getFiles_getFiles = getFiles;
var filterPrivates;
filterPrivates = filterPrivates;
compileDoc_compileDoc = compileDoc;
var getFiles_getFiles;
export { getFiles_getFiles as getFiles };
var compileDoc_compileDoc;
export { compileDoc_compileDoc as compileDoc };
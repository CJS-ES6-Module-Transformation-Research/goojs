import fs from "fs";
import glob from "glob";
import _ from "underscore";
import { extract as extractor_extractjs } from "./extractor";
import * as jsdocprocessor_jsdocprocessorjsjs from "./jsdoc-processor";
import * as util_getFileNamejs from "./util";
// jshint node:true
'use strict';


function getFiles(sourcePath, ignore) {
	if (/\.js$/.test(sourcePath)) {
		return [sourcePath];
	}

	return glob.sync(sourcePath + '/**/*.js').filter(function (file) {
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
		console.log('compiling doc for ' + util_getFileNamejs(file));

		var source = fs.readFileSync(file, { encoding: 'utf8' });

		var class_ = extractor_extractjs(source, file);

		Array.prototype.push.apply(extraComments, class_.extraComments);

		if (class_.constructor) {
			jsdocProcessor.all(class_, files);

			filterPrivates(class_);

			class_.file = file;

			classes[class_.constructor.name] = class_;
		}
	});

	// --- should stay elsewhere
	var constructorFromComment = function (comment) {
		jsdocProcessor.link(comment);
		return {
			name: comment.targetClass.itemName,
			params: _.pluck(comment.param, 'name'),
			comment: comment
		};
	};

	var memberFromComment = function (comment) {
		jsdocProcessor.link(comment);
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
	extraComments.map(jsdocProcessor.compileComment)
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

var getFiles_getFiles = getFiles;
var filterPrivates;
filterPrivates = filterPrivates;
var compileDoc_compileDoc = compileDoc;
export { getFiles_getFiles as getFiles };
export { compileDoc_compileDoc as compileDoc };
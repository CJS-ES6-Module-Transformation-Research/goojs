fs = require('fs')
path = require('path')

# Minifying files

doClosure = (fileIn, fileOut, deleteAfter) ->
	command = 'java -jar buildengine/compiler.jar ' + 
		'--compilation_level=SIMPLE_OPTIMIZATIONS --language_in ECMASCRIPT5_STRICT ' +
		#'--jscomp_warning=checkTypes ' +
		'--jscomp_off=internetExplorerChecks --js ' + fileIn + ' ' +
		#'--formatting=pretty_print --externs newbuild/externs.js --externs newbuild/jquery-1.8.js ' +
		'--js_output_file ' + fileOut
		
	exec = require('child_process').exec;
	exec command,
		maxBuffer: 5*1024*1024
	, (error, stdout, stderr) ->
		#console.log('stdout: ' + stdout);
		#console.log('stderr: ' + stderr);
		if deleteAfter
			fs.unlink fileIn
		if error?
			console.log('closure error: ' + error);
		else
			console.log('Minify complete')

handleRequire = (fileIn, fileOut, deleteAfter) ->

	absroot = path.resolve('src')
	filePathIn = path.relative(absroot, fileIn).slice(0,-3)

	base = path.dirname(fileIn)
	fileIn = path.basename(fileIn, '.js')
	tempClosure = "#{absroot}/clos_temp.js"
	
	requirejs = require('requirejs')
	config =
		baseUrl: absroot
		#useStrict : true
		out: tempClosure
		name: filePathIn
		optimize: 'none'
		#should fix this in a better way
		paths:
			'goo/lib' : '../lib'
		# Uncomment to exclude library from build
		#excludeShallow: [
		#	'goo/lib/rsvp.amd'
		#]
	
	requirejs.optimize config, (buildResponse) ->
		if deleteAfter
			fs.unlink "#{absroot}/#{fileIn}.js"
		doClosure tempClosure, fileOut, true
		console.log buildResponse
		console.log tempClosure
	, (err) ->
		console.log err



minify = (sourcePath, targetFile, bundle, includefile) ->

	if bundle
		absroot = path.resolve('src')
		if includefile
			fs.readFile includefile, 'utf-8', (err, data) ->
				if err then return console.log err
				lines = data.split("\n")
				if lines.length > 1
					pattern = '{'+lines.join(',')+'}'
				else
					pattern = lines[0]
				if /^(\{[\s,]*\}|\s*)$/.test pattern
					return console.log 'No files to include'
		
				glob = require('glob')
				glob pattern, {root: absroot}, (err, files) ->
					for f,idx in files
						files[idx] = "\""+f.slice(absroot.length+1, f.lastIndexOf('.'))+"\""
	
	
					str = "require([#{files}]);\n"
					console.log files
					tempRequire = 'req_temp'
					tempClosure = "#{absroot}/clos_temp.js"
	
					fs.writeFile "#{absroot}/#{tempRequire}.js", str, ->
						handleRequire "#{absroot}/#{tempRequire}.js", targetFile, true
		else
			handleRequire path.resolve(sourcePath), targetFile, false
	else
		doClosure sourcePath, targetFile, false
			
exports.minify = minify
			
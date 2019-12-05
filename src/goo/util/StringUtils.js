var functionObject_parseURL;
var functionObject_escapeHtmlEntities;
var functionObject_getUniqueId;
var functionObject_hashCode;
var functionObject_toAscii;
var functionObject_getUniqueName;
var functionObject_getIndexedName;
var functionObject_getFrom;
var functionObject_getAfterLast;
var functionObject_getUntil;
var functionObject_createUniqueId;
var functionObject_uncapitalize;
var functionObject_capitalize;
var functionObject_startsWith;
var functionObject_endsWith;
/**
 * Provides string manipulation methods
 */
function StringUtils() {}

functionObject_endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

functionObject_startsWith = function(str, prefix) {
    return str.indexOf(prefix) === 0;
};

functionObject_capitalize = function(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
};

functionObject_uncapitalize = function(str) {
    return str.charAt(0).toLowerCase() + str.substring(1);
};

functionObject_createUniqueId = function(type) {
    var date = Date.now();
    var uuid = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        // | 0 is a hack to floor a number, so this is a random number between 0 and 15
        var randomNumber = (date + Math.random() * 16) % 16 | 0;
        if (c === "x") {
            return randomNumber.toString(16);
        } else {
            // Set bit 6 and 7 to 0 and 1
            return (randomNumber & 3 | 8).toString(16);
        }
    });
    if (type === undefined) {
        return uuid;
    }
    return uuid + "." + type;
};

functionObject_getUntil = function(string, stopString) {
    var stopIndex = string.indexOf(stopString);
    if (stopIndex === -1) {
        return string;
    } else {
        return string.slice(0, stopIndex);
    }
};

functionObject_getAfterLast = function(string, stopString) {
    var stopIndex = string.lastIndexOf(stopString);
    if (stopIndex === -1) {
        return string;
    } else {
        return string.slice(stopIndex + stopString.length, string.length);
    }
};

functionObject_getFrom = function(string, startString) {
    var startIndex = string.indexOf(startString);
    if (startIndex === -1) {
        return "";
    } else {
        // Adding offset equal to the length of the start string,
        // to not include the start string in the returned string.
        return string.slice(startIndex + startString.length, string.length);
    }
};

functionObject_getIndexedName = function(base, takenNames, separator) {
    if (!separator) {
        separator = "_";
    }

    var re = new RegExp(base + "(" + separator + "\\d+)?");
    var i;
    var index = 0;
    for (i in takenNames) {
        var name = takenNames[i];
        var m = re.exec(name);
        if (m) {
            if (m.length > 1 && m[1]) {
                var nidx = parseInt(m[1].substring(separator.length), 10);
                if (nidx >= index) {
                    index = nidx + 1;
                }
            } else {
                index = 1;
            }
        }
    }

    return base + separator + index;
};

functionObject_getUniqueName = function(desiredName, takenNames, separator) {
    if (takenNames.indexOf(desiredName) === -1) {
        return desiredName;
    }

    return functionObject_getIndexedName(desiredName, takenNames, separator);
};

functionObject_toAscii = function(input) {
    return input.replace(/([^\x00-\x7F])/g, "x");
};

functionObject_hashCode = function(str) {
    var hash = 0;

    if (str.length === 0) {
        return hash;
    }

    for (var i = 0; i < str.length; i++) {
        var character = str.charCodeAt(i);
        hash = (hash << 5) - hash + character;
        hash &= hash; // Convert to 32bit integer
    }

    return btoa(hash).replace("/", "_").replace("+", "-");
};

// REVIEW: idCounter is only updated on declaration, same session will always have the same seed
// used in generating ids
var idCounter = Date.now();

functionObject_getUniqueId = function() {
    idCounter++;
    var stringedArguments = Array.prototype.slice.call(arguments, 0).join("");
    return functionObject_hashCode(idCounter + "" + stringedArguments);
};

functionObject_escapeHtmlEntities = function(text) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(text));

    // Any edge cases that are not escaped by the browser.
    var edgeCases = {
        34: "quot"
    };

    return div.innerHTML.replace(/[\u00A0-\u2666\"\']/g, function(c) {
        var entityName = edgeCases[c.charCodeAt(0)];
        return "&" + (entityName || "#" + c.charCodeAt(0)) + ";";
    });
};

/**
 * Parses an URL
 * @param {string} url
 * @example
 *     var url = 'http://example.com:1234/images/goo.png?param=1#fragment';
 *     var parts = Ajax.parseURL(url);
 *     parts.scheme			// 'http'
 *     parts.domain			// 'example.com'
 *     parts.user_info		// undefined
 *     parts.port			// '1234'
 *     parts.path			// '/images/goo.png'
 *     parts.query_data		// 'param=1'
 *     parts.fragment		// 'fragment'
 */

//! AT: this does far too much and is used only to get the extension of whatever the uri is
// write a faster one instead

// let's save it ourselves if the browser doesn't automagically do it
/**
 * @private
 */
var splitRegExp = new RegExp(
	'^' +
	'(?:' +
	'([^:/?#.]+)' +                         // scheme - ignore special characters
	// used by other URL parts such as :,
	// ?, /, #, and .
	':)?' +
	'(?://' +
	'(?:([^/?#]*)@)?' +                     // userInfo
	'([\\w\\d\\-\\u0100-\\uffff.%]*)' +     // domain - restrict to letters,
	// digits, dashes, dots, percent
	// escapes, and unicode characters.
	'(?::([0-9]+))?' +                      // port
	')?' +
	'([^?#]+)?' +                           // path
	'(?:\\?([^#]*))?' +                     // query
	'(?:#(.*))?' +                          // fragment
	'$');

functionObject_parseURL = function(uri) {
    var split = uri.match(splitRegExp);
    return {
        "scheme": split[1],
        "user_info": split[2],
        "domain": split[3],
        "port": split[4],
        "path": split[5],
        "query_data": split[6],
        "fragment": split[7]
    };
};

export { functionObject_endsWith as endsWith, functionObject_capitalize as capitalize, functionObject_uncapitalize as uncapitalize, functionObject_createUniqueId as createUniqueId, functionObject_getAfterLast as getAfterLast, functionObject_parseURL as parseURL };

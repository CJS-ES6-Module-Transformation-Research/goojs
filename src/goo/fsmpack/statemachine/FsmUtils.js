Object.defineProperty(exports, "__esModule", {
    value: true
});
var FsmUtils_getValue;
var FsmUtils_guid;
var FsmUtils_keyForCode;
var FsmUtils_keyInverse;
var FsmUtils_keys;
var FsmUtils_getKey;
var FsmUtils_setTransitions;
var FsmUtils_setParameters;
function FsmUtils() {}

exports.setParameters = FsmUtils_setParameters = function FsmUtils_setParameters(settings, externalParameters) {
    for (var i = 0; i < externalParameters.length; i++) {
        var externalParameter = externalParameters[i];
        var key = externalParameter.key;

        if (typeof settings[key] !== "undefined") {
            this[key] = settings[key];
        } else {
            this[key] = externalParameter["default"];
        }
    }
};;

exports.setTransitions = FsmUtils_setTransitions = function FsmUtils_setTransitions(settings, externalTransitions) {
    for (var i = 0; i < externalTransitions.length; i++) {
        var externalTransition = externalTransitions[i];
        var key = externalTransition.key;

        this.transitions = this.transitions || {};
        this.transitions[key] = settings.transitions[key];
    }
};;

exports.getKey = FsmUtils_getKey = function FsmUtils_getKey(str) {
    if (FsmUtils_keys[str]) {
        return FsmUtils_keys[str];
    } else {
        return str.charCodeAt(0);
    }
};;

FsmUtils_keys = {
    "Backspace": 8,
    "Tab": 9,
    "Enter": 13,
    "Shift": 16,
    "Ctrl": 17,
    "Alt": 18,
    "Pause": 19,
    "Capslock": 20,
    "Esc": 27,
    "Space": 32,
    "Pageup": 33,
    "Pagedown": 34,
    "End": 35,
    "Home": 36,
    "Leftarrow": 37,
    "Uparrow": 38,
    "Rightarrow": 39,
    "Downarrow": 40,
    "Insert": 45,
    "Delete": 46,
    "0": 48,
    "1": 49,
    "2": 50,
    "3": 51,
    "4": 52,
    "5": 53,
    "6": 54,
    "7": 55,
    "8": 56,
    "9": 57,
    "a": 65,
    "b": 66,
    "c": 67,
    "d": 68,
    "e": 69,
    "f": 70,
    "g": 71,
    "h": 72,
    "i": 73,
    "j": 74,
    "k": 75,
    "l": 76,
    "m": 77,
    "n": 78,
    "o": 79,
    "p": 80,
    "q": 81,
    "r": 82,
    "s": 83,
    "t": 84,
    "u": 85,
    "v": 86,
    "w": 87,
    "x": 88,
    "y": 89,
    "z": 90,
    "A": 65,
    "B": 66,
    "C": 67,
    "D": 68,
    "E": 69,
    "F": 70,
    "G": 71,
    "H": 72,
    "I": 73,
    "J": 74,
    "K": 75,
    "L": 76,
    "M": 77,
    "N": 78,
    "O": 79,
    "P": 80,
    "Q": 81,
    "R": 82,
    "S": 83,
    "T": 84,
    "U": 85,
    "V": 86,
    "W": 87,
    "X": 88,
    "Y": 89,
    "Z": 90,
    "0numpad": 96,
    "1numpad": 97,
    "2numpad": 98,
    "3numpad": 99,
    "4numpad": 100,
    "5numpad": 101,
    "6numpad": 102,
    "7numpad": 103,
    "8numpad": 104,
    "9numpad": 105,
    "Multiply": 106,
    "Plus": 107,
    "Minus": 109,
    "Dot": 110,
    "Slash1": 111,
    "F1": 112,
    "F2": 113,
    "F3": 114,
    "F4": 115,
    "F5": 116,
    "F6": 117,
    "F7": 118,
    "F8": 119,
    "F9": 120,
    "F10": 121,
    "F11": 122,
    "F12": 123,
    "Equals": 187,
    "Comma": 188,
    "Slash": 191,
    "Backslash": 220
};;

FsmUtils_keyInverse = [];;

function buildKeyInverse(assoc) {
    var inverseAssoc = [];

    var keys = Object.keys(assoc);
    for (var i = 0; i < keys.length; i++) {
        inverseAssoc[assoc[keys[i]]] = keys[i];
    }

    return inverseAssoc;
}

FsmUtils_keyInverse = buildKeyInverse(FsmUtils_keys);

FsmUtils_keyForCode = function FsmUtils_keyForCode(code) {
    if (FsmUtils_keyInverse[code]) {
        return FsmUtils_keyInverse[code];
    }
    return "FsmUtils.keyForCode: key not found for code " + code;
};;

var s4 = function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};

// Random unique id
FsmUtils_guid = function FsmUtils_guid() {
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
};;

exports.getValue = FsmUtils_getValue = function FsmUtils_getValue(par, fsm) {
    if (typeof par === "number") {
        return par;
    } else {
        return fsm.getVariable(par);
    }
};;

exports.setParameters = FsmUtils_setParameters;
exports.setTransitions = FsmUtils_setTransitions;
exports.getKey = FsmUtils_getKey;
exports.getValue = FsmUtils_getValue;
exports.FsmUtils = FsmUtils;

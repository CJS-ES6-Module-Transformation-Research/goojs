var supported = true;

var AudioContext = typeof(window) !== 'undefined' && (window.AudioContext || window.webkitAudioContext);
if (!AudioContext) {
	// warn once
	console.warn('WebAudio not supported');
	supported = false;
}

var context;

let anonymus = {
	getContext: function () {
		// try to get a context if it's supposedly supported or not cached
		if (!context && supported) {
			try {
				// even if window.AudioContext is available something might go wrong
				context = new AudioContext();
			} catch (e) {
				console.warn(e.message);
				supported = false;
			}
		}
		return context;
	},
	isSupported: function () {
		return supported;
	}
};

var exported_getContext = function() {
    // try to get a context if it's supposedly supported or not cached
    if (!context && supported) {
        try {
            // even if window.AudioContext is available something might go wrong
            context = new AudioContext();
        } catch (e) {
            console.warn(e.message);
            supported = false;
        }
    }
    return context;
};

var exported_isSupported = function() {
    return supported;
};

export { exported_getContext as getContext, exported_isSupported as isSupported };

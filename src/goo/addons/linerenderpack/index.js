var _LineRenderer = require("./LineRenderer");

var _LineRenderSystem = require("./LineRenderSystem");

module.exports = {
	LineRenderer: _LineRenderer.LineRenderer,
	LineRenderSystem: _LineRenderSystem.LineRenderSystem
};

if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}

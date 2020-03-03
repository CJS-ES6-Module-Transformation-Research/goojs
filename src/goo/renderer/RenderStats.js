Object.defineProperty(exports, "__esModule", {
	value: true
});
function RenderStats() {
	this.reset();
}

RenderStats.prototype.reset = function () {
	this.calls = 0;
	this.vertices = 0;
	this.indices = 0;
};

RenderStats.prototype.toString = function () {
	return 'Calls: ' + this.calls + '<br/>Vertices: ' + this.vertices + '<br/>Indices: ' + this.indices;
};

var exported_RenderStats = RenderStats;
exports.RenderStats = exported_RenderStats;

Object.defineProperty(exports, "__esModule", {
	value: true
});
var exported_RenderStats = RenderStats;
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

exports.RenderStats = exported_RenderStats;

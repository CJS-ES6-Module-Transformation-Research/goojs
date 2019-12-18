var _ObjectUtil = require('../../../../src/goo/util/ObjectUtil');

module.exports = {
	posteffects: function posteffects() {
		var config = this.gooObject('posteffects', 'Dummy');
		_ObjectUtil.ObjectUtils.extend(config, {
			posteffects: {
				myBloomEffect: {
					name: 'Bloom',
					type: 'Bloom',
					sortValue: 1,
					id: 'myBloomEffect',
					enabled: true,
					options: {}
				}
			}
		});
		return config;
	}
};

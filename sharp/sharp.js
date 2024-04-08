module.exports = function(RED) {
	"use strict";
	const sharp = require("sharp");

	function SharpConversionNode(config) {
		RED.nodes.createNode(this,config);

		this.width = config.width;
		this.height = config.height;
		this.fit = config.fit;

		var node = this;
		node.on('input', function(msg) {
			const width = parseInt(config.width);
			const height = parseInt(config.height);
			const fit = config.fit;

			sharp(msg.payload)
				.resize(width, height, {
					fit: fit,
					position: 'center'
				})
				.toBuffer()
				.then(resizedImageBuffer => {
					msg.payload = resizedImageBuffer;
					node.send(msg);
				})
				.catch(err => {
					node.error('Error resizing image:', err);
				});
		});
	}
	RED.nodes.registerType("sharp",SharpConversionNode);
}

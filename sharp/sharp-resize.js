module.exports = function(RED) {
	"use strict";
	const sharp = require("sharp");

	function SharpResizeNode(config) {
		RED.nodes.createNode(this,config);

		this.width = config.width;
		this.height = config.height;
		this.fit = config.fit;
		this.position = config.position;

		var node = this;
		node.on('input', function(msg) {
			const width = msg.sharpWidth || parseInt(config.width);
			const height = msg.sharpHeight || parseInt(config.height);
			const fit = msg.sharpFit || config.fit || 'centre';
			const position = msg.sharpPosition || config.position || 'centre';

			sharp(msg.payload)
				.resize(width, height, {
					fit: fit,
					position: position
				})
				.toBuffer()
				.then(resizedImageBuffer => {
					msg.payload = resizedImageBuffer;
					node.send(msg);
				})
				.catch(err => {
					node.error('[sb-sharp] Error resizing image:', err);
				});
		});
	}
	RED.nodes.registerType("sharp-resize",SharpResizeNode);
}

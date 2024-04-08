module.exports = function (RED) {
	"use strict";
	const sharp = require("sharp");

	function SharpConvertNode(config) {
		RED.nodes.createNode(this, config);

		this.format = config.format;

		var node = this;
		node.on('input', function (msg) {
			const format = msg.sharpFormat || config.format || 'jpeg';
			const options = msg.sharpOptions || {};

			if (Buffer.isBuffer(msg.payload)) {
				sharp(msg.payload)
					.toFormat(format, options)
					.toBuffer()
					.then(imageBuffer => {
						msg.payload = imageBuffer;
						node.send(msg);
					})
					.catch(err => {
						node.error('[sb-sharp] Error converting image:', err);
					});
			} else {
				node.error('[sb-sharp] The payload was not an image buffer.');
			}
		});
	}
	RED.nodes.registerType("sharp-convert", SharpConvertNode);
}

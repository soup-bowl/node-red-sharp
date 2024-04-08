module.exports = function (RED) {
	"use strict";
	const sharp = require("sharp");

	function SharpResizeNode(config) {
		RED.nodes.createNode(this, config);

		this.width = config.width;
		this.height = config.height;
		this.fit = config.fit;
		this.position = config.position;

		var node = this;
		node.on('input', function (msg) {
			const width = msg.sharp?.width ?? config.width;
			const height = msg.sharp?.height ?? config.height;
			const fit = msg.sharp?.fit ?? config.fit ?? 'centre';
			const position = msg.sharp?.position ?? config.position ?? 'centre';

			if (Buffer.isBuffer(msg.payload)) {
				sharp(msg.payload)
					.resize(parseInt(width), parseInt(height), {
						fit: fit,
						position: position
					})
					.toBuffer()
					.then(imageBuffer => {
						msg.payload = imageBuffer;
						node.send(msg);
					})
					.catch(err => {
						node.error('[sb-sharp] Error resizing image:', err);
					});
			} else {
				node.error('[sb-sharp] The payload was not an image buffer.');
			}
		});
	}
	RED.nodes.registerType("sharp-resize", SharpResizeNode);
}

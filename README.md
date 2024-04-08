# Sharp in Node-RED

A gradual attempt to add [Sharp][#] functionality into Node-RED.

⚠️ **This is very early stages and should be considered pre-alpha - do not use in production systems and expect changes to procedures.**

## Nodes

Node arguments can be specified by the flow, or input directly to the node.

### `sharp-convert`

Input a `msg.payload` of an image buffer object, and you can convert an image.

supported configuration:

* Format
* Options (as `msg.sharpOptions`, supporting the `options` [from the docs](https://sharp.pixelplumbing.com/api-output#jpeg))

### `sharp-resize`

Input a `msg.payload` of an image buffer object, and it will attempt to resize the image.

Supported configuration:

* Dimensions (width & height)
* Fill type (fit & position)

[#]: https://sharp.pixelplumbing.com/

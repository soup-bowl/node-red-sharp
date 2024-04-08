# Sharp in Node-RED

A gradual attempt to add [Sharp][#] functionality into Node-RED.

## Nodes

Node arguments can be specified by the flow, or input directly to the node.

### `sharp-resize`

Input a `msg.payload` of an image buffer object, and it will attempt to resize the image.

Supported configuration:

* Dimensions (width & height)
* Fill type (fit & position)

[#]: https://sharp.pixelplumbing.com/

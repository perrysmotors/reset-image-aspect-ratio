var UI = require('sketch/ui'),
    DOM = require('sketch/dom');

export function onReset(context) {
  var document = DOM.getSelectedDocument(),
      selection = document.selectedLayers,
      images = selection.layers.filter(layer => layer.type === 'Image');

  images.forEach(layer => {

    layer.sketchObject.setConstrainProportions(0);

    let originalSize = layer.image.nsimage.size();
    let currentAspectRatio = layer.frame.width / layer.frame.height;
    let originalAspectRatio = originalSize.width / originalSize.height;

    if (currentAspectRatio > originalAspectRatio) {
      layer.frame = layer.frame.scale(1, currentAspectRatio / originalAspectRatio);
    } else {
      layer.frame = layer.frame.scale(originalAspectRatio / currentAspectRatio, 1);
    }

    layer.sketchObject.setConstrainProportions(1);

  });

  if (images.length === 0) {
    UI.message('Select one or more images');
  }

}

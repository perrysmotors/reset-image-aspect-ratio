var UI = require('sketch/ui'),
    DOM = require('sketch/dom');

export function onReset(context) {
  var document = DOM.getSelectedDocument(),
      selectedLayers = document.selectedLayers.layers;

  if (selectedLayers.length > 0) {

    let bitmaps = selectedLayers.filter(layer => layer.type === 'Image');
    let rectangles = selectedLayers.filter(layer => isRectangle(layer) && hasPatternFill(layer));

    bitmaps.forEach(layer => {
      let originalSize = layer.image.nsimage.size();
      resetBitmap(layer, originalSize);
    });

    rectangles.forEach(layer => {
      let originalSize = layer.style.fills[0].sketchObject.image().NSImage().size();
      resetRectangle(layer, originalSize);
    });

    let imageCount = bitmaps.length + rectangles.length;
    switch (imageCount) {
      case 0:
        UI.message('No images were found');
        break;
      case 1:
        UI.message('1 image reset');
        break;
      default:
        UI.message(`${imageCount} images reset`);
    }

  } else {
    UI.message('Select one or more images');
  }

}

function hasPatternFill(layer) {
  let patternFills = layer.style.fills.filter(fill => fill.fill === 'Pattern' && fill.enabled);
  return (patternFills.length === 1);
}

function isRectangle(layer) {
  if (layer.type === 'Shape') {
    let layerCount = layer.sketchObject.layers().count();
    let layerClass = layer.sketchObject.layers()[0].class();

    if (layerCount === 1 && layerClass === MSRectangleShape) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function resetBitmap(layer, originalSize) {

  let currentAspectRatio = layer.frame.width / layer.frame.height;
  let originalAspectRatio = originalSize.width / originalSize.height;

  layer.sketchObject.setConstrainProportions(0);

  if (currentAspectRatio > originalAspectRatio) {
    layer.frame = layer.frame.scale(1, currentAspectRatio / originalAspectRatio);
  } else {
    layer.frame = layer.frame.scale(originalAspectRatio / currentAspectRatio, 1);
  }

  layer.sketchObject.setConstrainProportions(1);

}

function resetRectangle(layer, originalSize) {

  let currentAspectRatio = layer.frame.width / layer.frame.height;
  let originalAspectRatio = originalSize.width / originalSize.height;

  layer.sketchObject.setConstrainProportions(0);

  let frame = layer.frame;

  if (currentAspectRatio > originalAspectRatio) {
    frame.width = Math.round(frame.width);
    frame.height = Math.round(frame.width / originalAspectRatio);
  } else {
    frame.height = Math.round(frame.height);
    frame.width = Math.round(frame.height * originalAspectRatio);
  }

  layer.frame = frame;

  layer.sketchObject.setConstrainProportions(1);

}

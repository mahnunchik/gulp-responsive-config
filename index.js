'use strict';

var fs = require('fs');
var path = require('path');
var globby = require('globby');
var dimensions = require('parse-image-dimensions');

var filepathRegex = '(?:\\([ ]*)*(?:\'|\"|\\(|\\s)((?!\\s)[ a-z0-9_@\\-\\/\\.]{2,}\\.';


module.exports = function responsiveConfig(patterns, opts) {
  opts = opts || {};
  var imageExtensions = opts.extensions || ['jpg', 'jpeg', 'png'];
  var regex = new RegExp(filepathRegex + '(' + imageExtensions.join('|')+ '))', 'ig');

  var sources = globby.sync(patterns, opts);
  var imagePaths = [];

  sources.forEach(function(source) {
    var content = fs.readFileSync(source, {encoding: 'utf8'});
    var result;
    while ((result = regex.exec(content))) {
      imagePaths.push(result[1]);
    }
  });

  var config = imagePaths.map(function(imagePath) {
    var extname = path.extname(imagePath);
    var basename = path.basename(imagePath, extname);
    var dirname = opts.fullPath ? path.dirname(imagePath) : '';
    
    var imageDimensions = dimensions(basename);
    var width;
    var height;

    if (imageDimensions.width) {
      if (imageDimensions.scale) {
        width = imageDimensions.width * imageDimensions.scale;
      } else {
        width = imageDimensions.width;
      }
    }

    if (imageDimensions.height) {
      if (imageDimensions.scale) {
        height = imageDimensions.height * imageDimensions.scale;
      } else {
        height = imageDimensions.height;
      }
    }

    return {
      name: path.join(dirname, imageDimensions.name + extname),
      width: width,
      height: height,
      rename: path.join(dirname, basename + extname)
    };
  });

  return config;
};

/*
 * skeeliv
 * https://github.com/chrisenytc/skeeliv
 *
 * Copyright (c) 2013 Christopher EnyTC
 * Licensed under the MIT license.
 */

'use strict';

/**
* Module Dependencies
*/

var _ = require('underscore');
var path = require('path');
var fs = require('fs');
require('colors');

/*
* Private Methods
*/

//ReadFile
var readFile = function(filepath) {
  var path = filepath.replace(/\.livia/, '');
  //Read and return this file
  return fs.readFileSync(path+'.livia', 'utf-8');
};

//Parser
var parser = function(filepath, options) {
  //Get Data of file
  var string = readFile(filepath);

  //Parse options to template
  _.each(options, function(val, key) {
    var pattern = '{:' + key + ':}';
    var re = new RegExp(pattern, 'g');
    string = string.replace(re, val);
  });
  //Return Parsed result
  return string;
};

//Repeater
var repeater = function(model, options) {
  //Storages
  var modelData = '';
  var modelStorage = '';
  //Create Model
  _.each(options, function(val) {
      var value = val.split(':');
      //Create Regex Pattern
      var pattern = '{:name:}';
      var re = new RegExp(pattern, 'g');
      modelStorage = model.replace(re, value[0]);
      //Create Regex Pattern
      pattern = '{:type:}';
      re = new RegExp(pattern, 'g');
      modelStorage = modelStorage.replace(re, value[1]);
      //Make Model
      modelStorage += '\n';
      modelData += modelStorage;
  });

  //Return All Models
  return modelData;
};


/*
* Public Methods
*/

exports.generate = function(fn) {
  //Create Function
  fn = fn || function() {};

  /*
  * Prototypes
  */

  //Copy File
  fn.prototype.copy = function(oldPath, newPath) {
    fs.renameSync(oldPath, newPath);
    console.log('Create '.green + newPath);
  };
  //Create Dir
  fn.prototype.mkdir = function(path) {
    fs.mkdirSync(path);
    console.log('Create '.green + path);
  };
  //Copy Directory
  fn.prototype.make = function(path, templatePath, options) {
    //
    options = options || {};
    //
    fs.writeFileSync(path, exports.compile(templatePath, options));
    console.log('Create '.green + path);
  };
  //Call to callback
  fn.call(fn.prototype);
};

//Parse and Repeat template in file
exports.compileMultiple = function(template, model, options, methods) {
  //Parse options to parser
  options.repeat = repeater(model, methods);
  //Return Parsed Template
  return parser(template, options);
};

//Compile template in a file
exports.compile = function(template, options) {
  //Compile and Return Parsed Template
  return parser(template, options);
};

//Get Version
exports.version = function() {
  var gPackage = require(path.join(__dirname, '..', 'package.json'));
  return gPackage.version;
};

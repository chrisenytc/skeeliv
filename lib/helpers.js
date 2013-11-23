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

var fs = require('fs-extra');


//Check if this path exists
exports.exists = function(path) {
  return fs.existsSync(path);
};

//Read and return this file content
exports.read = function(path) {
  return fs.readFileSync(path, 'utf-8');
};

//Delete this directory of file
exports.remove = function(path) {
  return fs.removeSync(path);
};

'use strict';

var skeeliv = require('../lib/skeeliv.js');
var helpers = require('../lib/helpers.js');
var path = require('path');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['compile'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'no args': function(test) {
    test.expect(1);
    // tests here
    test.equal(skeeliv.compile(path.join(__dirname, 'fixtures', 'controller.livia'), {name: 'index'}), helpers.read(path.join(__dirname, 'expected', 'controller.js')), 'should be equal to expected/controller.js.');
    test.done();
  },
};

exports['compileMultiple'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'no args': function(test) {
    test.expect(2);
    // model
    var model = '/**\n * Action blueprints:\n *    `/{:name:}`\n */\n {:name:}: function (req, res) {\n\n  // Send a JSON response\n  return res.json({\n    hello: \'world\'\n  });\n},\n';
    //tests here
    //Testing CompileMultiple with Repeat
    test.equal(skeeliv.compileMultiple(path.join(__dirname, 'fixtures', 'repeatCtrl.livia'), model, {name: 'index'} ,['index', 'make', 'remove']), helpers.read(path.join(__dirname, 'expected/repeatCtrl.js')), 'should be equal to expected/repeatCtrl.js.');
    //Testing CompileMultiple with Repeat and Options
    model = '\t{:name:}: {\n\t\t type: {:type:}\n\t},';
    //tests here
    test.equal(skeeliv.compileMultiple(path.join(__dirname, 'fixtures', 'model.livia'), model, {name: 'Article'} ,['create:String', 'remove:Boolean']), helpers.read(path.join(__dirname, 'expected', 'model.js')), 'should be equal to expected/model.js.');
    test.done();
  },
};

exports['generate'] = {
  setUp: function(done) {
    //Remove Temp Directory
    helpers.remove(path.join(__dirname, 'tmp'));
    //Log
    console.log();
    //Generate
    skeeliv.generate(function() {
      this.mkdir(path.join(__dirname, 'tmp'));
      this.make(path.join(__dirname, 'tmp', 'make.bella'), path.join(__dirname, 'fixtures', 'controller.livia'), {name: 'index'});
      this.copy(path.join(__dirname, 'tmp', 'make.bella'), path.join(__dirname, 'tmp', 'makeExample.js'));
    });
    done();
  },
  'no args': function(test) {
    test.expect(3);
    // tests here
    test.ok(helpers.exists(path.join(__dirname, 'tmp')));
    test.ok(helpers.exists(path.join(__dirname, 'tmp', 'makeExample.js')));
    test.equal(helpers.read(path.join(__dirname, 'tmp', 'makeExample.js')), helpers.read(path.join(__dirname, 'expected', 'controller.js')), 'should be equal to expected/controller.js.');
    test.done();
  },
};

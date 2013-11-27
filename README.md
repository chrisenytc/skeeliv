# Skeeliv [![Build Status](https://travis-ci.org/chrisenytc/skeeliv.png?branch=master)](https://travis-ci.org/chrisenytc/skeeliv) [![Dependency Status](https://gemnasium.com/chrisenytc/skeeliv.png)](https://gemnasium.com/chrisenytc/skeeliv) [![NPM version](https://badge-me.herokuapp.com/api/npm/skeeliv.png)](http://badges.enytc.com/for/npm/skeeliv) [![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/chrisenytc/skeeliv/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
> Create Sckeleton Templates

A skeleton builder for create files with template

## Getting Started
Install the module with: `npm install skeeliv`

```javascript
var skeeliv = require('skeeliv');

skeeliv.generate(function() {
  //methods here
});
```

## Documentation

#### .generate(fn)

**Parameter**: `fn`
**Type**: `Function`

**Options**

###### this.copy(oldPath, newPath)
###### this.mkdir(path)
###### this.make(filePath, template, options)

The 'generate' method is responsible for create directories, copy files and make files with templates

How to use this method

```javascript

skeeliv.generate(function() {
  this.mkdir('tmp'); // Create Dir
  this.make('tmp/myFile.js', 'templates/example.livia', {name: 'index'}); //Create File
  this.copy('tmp/myFile.js', 'tmp/myNewFile.js'); //Copy File
});
```

#### .compile(templatePath, options)

**Parameter**: `template`
**Type**: `String`

**Example**

Path Example: `templates/controller.livia`

```
 /**
 * {:propertyName:}Controller
 *    `/{:propertyName:}`
 */

exports.{:propertyName:} = function(req, res) {
    //
    res.view();
};

```

**Parameter**: `options`
**Type**: `JSON Object`
**Example**: `{propertyName: 'index'}`

The 'compile' method is responsible for making dynamic files based on templates.

All templates must have the `.livia` extension.

How to use this method

```javascript
skeeliv.compile('templates/controller.livia', {propertyName: 'index'});
```

This method return a compiled string

```javascript
 /**
 * indexController
 *    `/index`
 */

exports.index = function(req, res) {
    //
    res.view();
};

```

#### .compileMultiple(templatePath, model, options, methods)

**Parameter**: `template`
**Type**: `String`

**Example**

Path Example: `templates/model.livia`

```
 /**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


 /**
 * {:propertyName:} Schema
 */
var {:propertyName:}Schema = new Schema({
{:repeat:}
});

mongoose.model('{:propertyName:}', {:propertyName:}Schema);

```

**Parameter**: `model`
**Type**: `String`
**Example**: `\t{:propertyName:}: {\n\t\t type: {:type:}\n\t},`

**Parameter**: `options`
**Type**: `JSON Object`
**Example**: `{propertyName: 'index'}`

**Parameter**: `methods`
**Type**: `Array`
**Example**: `['create', 'remove']`


The 'compileMultiple' method is responsible for making dynamic files based on templates.
With the difference that the 'compileMultiple' generates dynamical methods based on a model using the string of the parameter 'methods'.

The '{: repeat:}' will be replaced by methods.

All templates must have the `.livia` extension.

How to use this method

```javascript
var model = '\t{:propertyName:}: {\n\t\t type: {:secondPropertyName:}\n\t},';

skeeliv.compileMultiple('templates/model.livia', model, {propertyName: 'Article'}, ['create:String', 'remove:Boolean']);
```

This method return a compiled string

```javascript
 /**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


 /**
 * Article Schema
 */
var ArticleSchema = new Schema({
  create: {
     type: String
  },
  remove: {
     type: Boolean
  },

});

mongoose.model('Article', ArticleSchema);


```

#### .version()

Return current version


## Contributing

Please submit all issues and pull requests to the [chrisenytc/skeeliv](http://github.com/chrisenytc/skeeliv) repository!

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/chrisenytc/skeeliv/issues).

## License
Copyright (c) 2013 Christopher EnyTC

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

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

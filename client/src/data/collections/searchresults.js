var Backbone = require('backbone');
var SearchResultModel = require('../models/searchResult.js');

var SearchResultsCollection = Backbone.Collection.extend({
  model: SearchResultModel
});

module.exports = SearchResultsCollection;
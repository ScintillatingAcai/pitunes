var Backbone = require('backbone');
var SearchResultModel = require('../models/searchResult.js');

// Search Results Collection
var SearchResultsCollection = Backbone.Collection.extend({
  model: SearchResultModel
});

module.exports = SearchResultsCollection;
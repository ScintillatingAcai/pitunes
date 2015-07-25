var mediasController = require('./mediasController.js');
var utility = require('../utility');

module.exports = function(app) {

  app.param('media_id', mediasController.attachMedia);

  app.post('/', utility.checkUserSession, mediasController.addMedia); //add a media
  app.get('/', mediasController.getTopMedias); //get top 10 medias listen to

  app.get('/:media_id', mediasController.getMedia); //get one media
  app.put('/:media_id', utility.checkUserSession, mediasController.updateMedia); //update a media
};


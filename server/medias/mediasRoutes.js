var mediasController = require('./mediasController.js');

module.exports = function(app) {

  app.param('media_id', mediasController.attachMedia);

  app.post('/', mediasController.addMedia); //add a media
  app.get('/top/10', mediasController.getTopMedias); //get top 10 medias listen to

  app.get('/:media_id', mediasController.getMedia); //get one media
  app.put('/:media_id', mediasController.updateMedia); //update a media
};


var mediasController = require('./mediasController.js');

module.exports = function(app) {

  app.post('/', mediasController.addMedia); //add a media

  app.get('/:media', mediasController.getMedia); //get one media
  app.put('/:media', mediasController.updateMedia); //update a media
};


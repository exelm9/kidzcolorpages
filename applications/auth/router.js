const Authentication = require('./authentication');
module.exports = function(app) {
  app.post('/signup', Authentication.signup);

  
}

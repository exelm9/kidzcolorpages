const Authentication = require('./authentication');
const passportService = require('./passport');
module.exports = function(app) {
  app.post('/signup', Authentication.signup);


}

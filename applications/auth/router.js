const Authentication = require('./authentication');
const passportService = require('./passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'success'});
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);


}

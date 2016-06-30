const jwt = require('jwt-simple');
const User = require('./user');
const config = require('./configSecret');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat:timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
  // res.send({ success: 'true'});
  // console.log(req.body);
  const email = req.body.email;
  const username = req.body.username
  const password = req.body.password;

//if the user has not entered an email, password or username
  if (!email || !password || !username) {
    return res.status(422).send({ error: 'You must provide email, password, and username '});
  }
  // check database to see if user email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    //if it does, return errors
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use'});
    }
    //if not, create and save user record
    const user = new User({
      email: email,
      username: username,
      password: password
    });

    user.save(function(err) {
      if (err) { return next(err); }
      //respond to request indicating user was created
      res.json({ token: tokenForUser(user) });
    });



  });




}

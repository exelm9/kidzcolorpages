const passport = require('passport');
const User = require('./user');
const config = require('./configSecret');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//local strategy
const localOptions = { usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {

//verify email and password

  User.findOne({ email: email }, function(err, user) {
    if (err) { return done(err); }
    //if no user
    if (!user) { return done(null, false); }

    // compare passwords
    user.comparePassword(password, function(err, isMatch){
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    });
  });
});

//options for strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

//new strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
//check if payload userID exists in database
  User.findById(payload.sub, function(err, user){
    if (err) { return done(err, false); }
    //if yes
    if (user) {
      done(null , user);
    } else { //if no
      done(null, false);
    }

  });
});

passport.use(jwtLogin);
passport.use(localLogin);

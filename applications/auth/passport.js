const passport = require('passport');
const User = require('./user');
const config = require('./configSecret');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

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

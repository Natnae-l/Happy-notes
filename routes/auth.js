const express =require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/userModel')

require('dotenv').config()

const router = express.Router();

passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL
  },
  async function(accessToken, refreshToken, profile, done) {
    const newUser = {
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      profileImage: profile.photos[0].value
    };
    try{
       let user = await User.findOne({googleId: profile.id});
       if (user) done(null, user);
       else {
          user = new User(newUser)
          let saved = user.save()
          console.log(saved)

              
          done(null, saved)
       }
    }catch(e){
      console.log(e.message)
    }
  }
));

router.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/',
    successRedirect: '/dashboard'
 }),
);
passport.serializeUser(function(user, done) {
  return done(null, user.id)
});

passport.deserializeUser(async function(id, done) {
 let user = await User.findById(id);
  return done(null, user)
});

module.exports = router;

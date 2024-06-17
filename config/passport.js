const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        //takes in an object with the clientID, clientSecret, and callbackURL
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, callback) => {
        // console.log(profile); // { id: '1234567890', displayName: 'John Doe', name: { familyName: 'Doe', givenName: 'John' }, photos: [ { value: 'https://lh3.googleusercontent.com/.../photo.jpg' } ]
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };

        try {
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            callback(null, user);
          } else {
            user = await User.create(newUser);
            callback(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((user, callback) => {
    callback(null, user.id);
  });

  //   passport.deserializeUser((id, callback) => {
  //     User.findById(id, (err, user) => callback(err, user));
  //   });
  passport.deserializeUser(async (id, callback) => { //This is an asynchronous function that takes in an id and a callback function that will be called with an error and a user object. It will find the user by id and return the user object.
    callback(null, await User.findById(id));
  });
};

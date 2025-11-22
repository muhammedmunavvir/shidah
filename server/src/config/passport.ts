import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Usermodel from "../models/usermodel.js";
import dotenv from "dotenv";
dotenv.config();


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL:  process.env.GOOGLE_CALLBACK_URL!,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        // Find existing user
        let user = await Usermodel.findOne({ googleId: profile.id });
        if (!user) {
          // Create new user
          user = await Usermodel.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0].value,
            avatar: profile.photos?.[0].value,
          });
        }
        done(null, user);
      } catch (err) {
        done(err as Error, undefined);
      }
    }
  )
);

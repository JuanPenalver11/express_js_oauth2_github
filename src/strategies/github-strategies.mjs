import passport from "passport";
import { Strategy } from "passport-github2";
import { CLIENTID, CLIENTSECRET } from "../env/github.mjs";
import { GitHubModel } from "../mongoose/schema/github-model.mjs";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await GitHubModel.findById(id);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(
    {
      clientID: CLIENTID,
      clientSecret: CLIENTSECRET,
      callbackURL: "https://l4rnrz4l-3000.asse.devtunnels.ms/api/github/redirect",
      scope: "",
    },
    async (accessToken, refreshToken, profile, done) => {
      let findUser;
      try {
        findUser = await GitHubModel.findOne({ githubID: profile.id });
      } catch (err) {
        done(err, null);
      }
      try {
        if (!findUser) {
          const newUser = new GitHubModel({
            username: profile.username,
            githubID: profile.id,
          });
          const newSaveUser = await newUser.save();
          return done(null, newSaveUser);
        }
        return done(null, findUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

import { Router } from "express";
import createHttpError from "http-errors";
import * as dotenv from "dotenv";
import { verifyAccessToken } from "../utils/jwt-helper.js";
import { TokensStorage } from "../models/tokens.js";
dotenv.config();

const router = Router();

//Get User's consent from spotify authorization page
router.get("/authorize", (req, res, next) => {
  try {
    const redirect_uri =
      req.protocol + "://" + req.get("host") + "spotify/redirect";
    console.log(redirect_uri);

    res.redirect(
      "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          response_type: "code",
          client_id: process.env.Client_ID,
          scope: scope,
          redirect_uri,
          state: state,
        })
    );
  } catch (err) {
    next(err);
  }
});

//Redirected from spotify authorization page and deep link to Veronica app
router.get("/redirect", (req, res, next) => {
  try {
    const code = req.query.code || null;
    const state = req.query.state || null;

    if (!state || !code) {
      throw createHttpError.InternalServerError;
    } else {
      const appDeepLink = `veronica://spotifyauth/?code=${code}`;
      res.redirect(appDeepLink);
    }
  } catch (err) {
    next(err);
  }
});

//Save the Authorization code
router.post("/save", verifyAccessToken, async (req, res, next) => {
  try {
    const authCode = req.body.code;
    const userId = req.payload.aud;

    if (!authCode) {
      throw createHttpError.BadRequest;
    }

    const authToken = new TokensStorage({ userId, token: authCode, type: 0 });
    await authToken.save();

    res.json({ token: authToken.token });
  } catch (err) {
    next(err);
  }
});

export { router as spotifyRouter };

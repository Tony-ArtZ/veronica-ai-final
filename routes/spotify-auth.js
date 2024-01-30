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
      req.protocol + "://" + req.get("host") + "/spotify/redirect";
    console.log(redirect_uri);

    res.redirect(
      "https://accounts.spotify.com/authorize?" + "response_type=code"+"&client_id="+process.env.Client_ID+"&redirect_uri="+redirect_uri
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

    if (!code) {
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

//Send Authorization code to get Access Token
router.post("/getaccesstokenfromauhtorization", async (req, res, next) => {
  try {
    const authCode = req.body.code;
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(
          process.env.Client_ID + ":" + process.env.Client_Secret
        )}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: authCode,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

//Send Refresh Token to get Access Token
router.post("/getaccesstokenfromrefresh", async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(
          process.env.Client_ID + ":" + process.env.Client_Secret
        )}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    next(err);
  }
});
export { router as spotifyRouter };

import { Router } from "express";
import createHttpError from "http-errors";
import * as dotenv from "dotenv";
dotenv.config();

const router = Router();

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

router.get("/redirect", (req, res, next) => {
  var code = req.query.code || null;
  var state = req.query.state || null;

  if (!state || !code) {
    next(createHttpError.InternalServerError);
  } else {
    const appDeepLink = `veronica://spotifyauth/?code=${code}`;
    res.redirect(appDeepLink);
  }
});

export { router as spotifyRouter };

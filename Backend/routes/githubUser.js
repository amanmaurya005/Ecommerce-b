import express from "express";
import { githubCallback } from "../controllers/githubAuth.js";

const router = express.Router();

/**
 * STEP 1: Redirect user to GitHub
 */
router.get("/github", (req, res) => {
  const githubAuthURL =
    "https://github.com/login/oauth/authorize" +
    `?client_id=${process.env.GITHUB_CLIENT_ID}` +
    "&scope=user:email";

  res.redirect(githubAuthURL);
});

/**
 * STEP 2: GitHub redirects here
 */
router.get("/github/callback", githubCallback);

export default router;

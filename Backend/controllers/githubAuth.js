import axios from "axios";
import jwt from "jsonwebtoken";
import Auth from "../models/models_auth.js";


export const githubCallback = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) return res.redirect("/login?error=github");

    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: "application/json" } }
    );

    const accessToken = tokenRes.data.access_token;

    const userRes = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const emailRes = await axios.get("https://api.github.com/user/emails", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const primaryEmail = emailRes.data.find(e => e.primary)?.email;
    if (!primaryEmail) {
      return res.redirect("http://localhost:5173/login?error=email");
    }

    let user = await Auth.findOne({ email: primaryEmail });

    if (!user) {
      user = await Auth.create({
        name: userRes.data.name || "GitHub User",
        email: primaryEmail,
        githubId: userRes.data.id,
        image: userRes.data.avatar_url,
        authProvider: "github",
        role: "user",
        isVerified: true,
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.redirect("http://localhost:5173/login?github=success");
  } catch (err) {
    console.error(err);
    res.redirect("http://localhost:5173/login?error=github");
  }
};



// export const githubCallback = async (req, res) => {
//   try {
//     const { code } = req.query;

//     if (!code) {
//       return res.status(400).json({ message: "No code received from GitHub" });
//     }

//     // Exchange code → access token
//     const tokenRes = await axios.post(
//       "https://github.com/login/oauth/access_token",
//       {
//         client_id: process.env.GITHUB_CLIENT_ID,
//         client_secret: process.env.GITHUB_CLIENT_SECRET,
//         code,
//       },
//       { headers: { Accept: "application/json" } }
//     );

//     const accessToken = tokenRes.data.access_token;

//     // Get GitHub user
//     const userRes = await axios.get("https://api.github.com/user", {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });

//     const { id, name, avatar_url } = userRes.data;

//     // Get user email
//     const emailRes = await axios.get("https://api.github.com/user/emails", {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });

//     const primaryEmail = emailRes.data.find(e => e.primary)?.email;
//     if (!primaryEmail) {
//       return res.status(400).json({
//         message: "GitHub email not found. Please make email public."
//       });
//     }

//     let user = await Auth.findOne({ email: primaryEmail });

//     if (!user) {
//       user = await Auth.create({
//         name: name || "GitHub User",
//         email: primaryEmail,
//         githubId: id,
//         image: avatar_url,
//         authProvider: "github",
//       });
//     }

//     // Create JWT
//     const authToken = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.cookie("auth_token", authToken, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "lax",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     // Redirect back to frontend
//     res.redirect("http://localhost:5173/login?github=success");

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

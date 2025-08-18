import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
app.use(express.json());

const FRONTEND_URL = process.env.FRONTEND_URL || "*";
app.use(cors({
  origin: FRONTEND_URL === "*" ? true : FRONTEND_URL,
  credentials: true
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, index: true },
  picture: String,
  googleId: String,
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.post("/auth/google", async (req, res) => {
  console.log("POST /auth/google received. body keys:", Object.keys(req.body));
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Token is required" });

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload || !payload.email) return res.status(400).json({ message: "Invalid token payload" });

    let user = await User.findOne({ email: payload.email });
    if (!user) {
      user = await User.create({
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        googleId: payload.sub,
      });
      console.log("Created new user:", user.email);
    } else {
      console.log("Existing user found:", user.email);
    }

    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ user, token: jwtToken });
  } catch (err) {
    console.error("Google login error:", err);
    return res.status(401).json({ message: "Invalid Google token", error: String(err) });
  }
});

app.get("/", (req, res) => res.send("API ok"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

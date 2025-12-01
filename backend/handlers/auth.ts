import { Request, Response } from "express";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

export const airtableLogin = async (req: Request, res: Response) => {
    try {
        const { airtableId, email, accessToken, refreshToken } = req.body;

        if (!airtableId || !email || !accessToken || !refreshToken) {
            return res.status(400).json({ error: "Missing fields" });
        }

        const user = await User.findOneAndUpdate(
            { airtableId },
            { email, accessToken, refreshToken, loginAt: new Date() },
            { upsert: true, new: true }
        );

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || "secret",
            { expiresIn: "24h" }
        );

        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ error: "Login failed", details: err });
    }
};

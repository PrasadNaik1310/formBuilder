// backend/handlers/auth.ts
import { Request, Response } from "express";
import axios from "axios";
import User from "../models/user";

export async function airtableOAuthCallback(req: Request, res: Response) {
    try {
        const { code } = req.query;
        if (!code) {
            console.log("No code provided in query");
            return res.status(400).json({ error: "Missing OAuth code" });
        }

        console.log("Received OAuth code:", code);

        const response = await axios.post("https://airtable.com/oauth2/token", {
            code,
            grant_type: "authorization_code",
            client_id: process.env.AIRTABLE_CLIENT_ID,
            client_secret: process.env.AIRTABLE_CLIENT_SECRET,
            redirect_uri: process.env.AIRTABLE_REDIRECT_URI
        });

        const data = response.data;
        console.log("Received token from Airtable:", data.access_token?.slice(0, 10) + "...");

        // Upsert user in DB
        const user = await User.findOneAndUpdate(
            { airtableUserId: data.user_id },
            {
                airtableUserId: data.user_id,
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
                lastLogin: new Date()
            },
            { new: true, upsert: true }
        );

        return res.json({ message: "User logged in successfully", user });
    } catch (err: any) {
        console.log("OAuth callback error:", err.message);
        return res.status(500).json({ error: "Failed to process OAuth callback" });
    }
}

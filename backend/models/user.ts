import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    airtableId: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    loginAt: Date;
}

const userSchema = new Schema<IUser>({
    airtableId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    loginAt: { type: Date, default: Date.now }
});

export const User = model<IUser>("User", userSchema);

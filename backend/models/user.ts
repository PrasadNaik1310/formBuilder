import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    airtableUserId: string;
    accessToken: string;
    refreshToken?: string;
    lastLogin: Date;
}

const UserSchema = new Schema<IUser>({
    airtableUserId: { type: String, required: true, unique: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String },
    lastLogin: { type: Date, default: Date.now }
});

export default model<IUser>("User", UserSchema);

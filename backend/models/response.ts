import { Schema, model, Document, Types } from "mongoose";

export interface IResponse extends Document {
    formId: Types.ObjectId;
    airtableRecordId?: string;
    answers: Record<string, any>;
    deletedInAirtable?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const responseSchema = new Schema<IResponse>({
    formId: { type: Schema.Types.ObjectId, ref: "Form", required: true },
    airtableRecordId: { type: String },
    answers: { type: Object, required: true },
    deletedInAirtable: { type: Boolean, default: false },
}, { timestamps: true });

export const Response = model<IResponse>("Response", responseSchema);

import { Schema, model, Document, Types } from "mongoose";

interface ICondition {
    questionKey: string;
    operator: "equals" | "notEquals" | "contains";
    value: any;
}

interface IConditionalRules {
    logic: "AND" | "OR";
    conditions: ICondition[];
}

interface IQuestion {
    questionKey: string;
    fieldId: string;
    label: string;
    type: "short_text" | "long_text" | "single_select" | "multi_select" | "attachment";
    required?: boolean;
    conditionalRules?: IConditionalRules | null;
}

export interface IForm extends Document {
    owner: Types.ObjectId;
    airtableBaseId: string;
    airtableTableId: string;
    questions: IQuestion[];
    createdAt: Date;
    updatedAt: Date;
}

const formSchema = new Schema<IForm>({
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    airtableBaseId: { type: String, required: true },
    airtableTableId: { type: String, required: true },
    questions: [{ type: Object, required: true }],
}, { timestamps: true });

export const Form = model<IForm>("Form", formSchema);

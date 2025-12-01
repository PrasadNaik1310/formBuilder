import { Schema, model, Document, Types } from "mongoose";

// Condition for conditional logic
interface ICondition {
    questionKey: string;
    operator: "equals" | "notEquals" | "contains";
    value: any;
}


interface IConditionalRules {
    logic: "AND" | "OR";
    conditions: ICondition[];
}


export interface IQuestion {
    questionKey: string;
    airtableFieldId: string;
    label: string;
    type: "short_text" | "long_text" | "single_select" | "multi_select" | "attachment";
    required: boolean;
    conditionalRules: IConditionalRules | null;
}

// Form document interface
export interface IForm extends Document {
    owner: Types.ObjectId; 
    airtableBaseId: string;
    airtableTableId: string;
    questions: IQuestion[];
    createdAt: Date;
    updatedAt: Date;
}

// Question Schema
const QuestionSchema = new Schema<IQuestion>({
    questionKey: { type: String, required: true },
    airtableFieldId: { type: String, required: true },
    label: { type: String, required: true },
    type: { 
        type: String, 
        enum: ["short_text","long_text","single_select","multi_select","attachment"], 
        required: true 
    },
    required: { type: Boolean, default: false },
    conditionalRules: { type: Object, default: null }
});

// Form Schema
const FormSchema = new Schema<IForm>({
    owner: { type: Types.ObjectId, ref: "User", required: true }, 
    airtableBaseId: { type: String, required: true },
    airtableTableId: { type: String, required: true },
    questions: [QuestionSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Export default model
export default model<IForm>("Form", FormSchema);

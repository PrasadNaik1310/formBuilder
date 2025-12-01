import { Request, Response } from "express";
import { Response as ResponseModel } from "../models/response";
import { Form } from "../models/form";

// Submit a response to a form
export const submitForm = async (req: Request, res: Response) => {
    try {
        const { formId } = req.params;
        const { answers } = req.body;

        if (!answers) return res.status(400).json({ error: "Answers required" });

        const form = await Form.findById(formId);
        if (!form) return res.status(404).json({ error: "Form not found" });

        // TODO: Validate required fields and conditional logic

        const responseDoc = await ResponseModel.create({
            formId,
            answers
        });

        res.status(201).json({ message: "Response submitted", response: responseDoc });
    } catch (err) {
        res.status(500).json({ error: "Failed to submit response", details: err });
    }
};

// List all responses for a form
export const listResponses = async (req: Request, res: Response) => {
    try {
        const { formId } = req.params;
        const responses = await ResponseModel.find({ formId }).sort({ createdAt: -1 });

        res.json({ responses });
    } catch (err) {
        res.status(500).json({ error: "Failed to list responses", details: err });
    }
};

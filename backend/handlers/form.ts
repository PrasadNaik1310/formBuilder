import { Request, Response } from "express";
import { Form } from "../models/form";

// Create a new form
export const createForm = async (req: Request & { user?: { userId: string } }, res: Response) => {
    try {
        const { airtableBaseId, airtableTableId, questions } = req.body;
        if (!airtableBaseId || !airtableTableId || !questions) {
            return res.status(400).json({ error: "Missing fields" });
        }

        if (!req.user || !req.user.userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const form = await Form.create({
            owner: req.user.userId,
            airtableBaseId,
            airtableTableId,
            questions
        });

        res.status(201).json({ message: "Form created", form });
    } catch (err) {
        res.status(500).json({ error: "Failed to create form", details: err });
    }
};

// Get form by ID
export const getForm = async (req: Request, res: Response) => {
    try {
        const { formId } = req.params;
        const form = await Form.findById(formId);
        if (!form) return res.status(404).json({ error: "Form not found" });

        res.json({ form });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch form", details: err });
    }
};

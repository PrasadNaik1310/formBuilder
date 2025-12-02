import { Request, Response } from "express";
import { Form } from "../models/form";

// Create a new form
export const createForm = async (req: Request & { user?: { userId: string } }, res: Response) => {
    try {
        // Accept both naming conventions
        const { airtableBaseId, airtableTableId, baseId, tableId, questions } = req.body;
        const finalBaseId = airtableBaseId || baseId;
        const finalTableId = airtableTableId || tableId;
        
        if (!finalBaseId || !finalTableId || !questions) {
            console.log("Missing fields:", { finalBaseId, finalTableId, questions: !!questions });
            return res.status(400).json({ error: "Missing fields: baseId, tableId, and questions required" });
        }

        // Require authentication
        if (!req.user?.userId) {
            return res.status(401).json({ error: "Unauthorized - please login" });
        }

        const form = await Form.create({
            owner: req.user.userId,
            airtableBaseId: finalBaseId,
            airtableTableId: finalTableId,
            questions
        });

        res.status(201).json({ message: "Form created", form });
    } catch (err: any) {
        console.error("Error creating form:", err);
        res.status(500).json({ error: "Failed to create form", details: err.message });
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

// List all forms for authenticated user
export const listForms = async (req: Request & { user?: { userId: string } }, res: Response) => {
    try {
        if (!req.user?.userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const forms = await Form.find({ owner: req.user.userId }).sort({ createdAt: -1 });
        res.json({ forms });
    } catch (err: any) {
        console.error("Error listing forms:", err);
        res.status(500).json({ error: "Failed to list forms", details: err.message });
    }
};

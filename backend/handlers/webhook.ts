import { Request, Response } from "express";
import { Response as ResponseModel } from "../models/response";

// Handle Airtable webhook events
export const airtableWebhook = async (req: Request, res: Response) => {
    try {
        const { eventType, recordId, fields } = req.body;

        if (!eventType || !recordId) {
            return res.status(400).json({ error: "Invalid webhook payload" });
        }

        if (eventType === "update") {
            await ResponseModel.updateOne(
                { airtableRecordId: recordId },
                { answers: fields }
            );
        } else if (eventType === "delete") {
            await ResponseModel.updateOne(
                { airtableRecordId: recordId },
                { deletedInAirtable: true }
            );
        }

        res.json({ message: "Webhook processed" });
    } catch (err) {
        res.status(500).json({ error: "Failed to process webhook", details: err });
    }
};

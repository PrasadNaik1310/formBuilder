import { Router } from "express";
import { login } from "../handlers/auth";
import { createForm, getForm } from "../handlers/form";
import { submitForm, listResponses } from "../handlers/response";
import { airtableWebhook } from "../handlers/webhook";
import { requireAuth } from "../middleware/auth";


const router = Router();

// Auth
router.post("/auth/login", login);

// Forms
router.post("/forms", requireAuth, createForm);
router.get("/forms/:formId", requireAuth, getForm);

// Responses
router.post("/forms/:formId/responses", requireAuth, submitForm);
router.get("/forms/:formId/responses", requireAuth, listResponses);

// Webhook
router.post("/webhooks/airtable", airtableWebhook);

export default router;

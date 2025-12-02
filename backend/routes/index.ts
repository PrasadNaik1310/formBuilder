import { Router } from "express";
import { login, register } from "../handlers/auth";
import { createForm, getForm, listForms } from "../handlers/form";
import { submitForm, listResponses } from "../handlers/response";
import { listBases, listTables, listFields } from "../handlers/airTable"; // <-- airtable handlers....!!!!!!!!!!!!!!1
import { airtableWebhook } from "../handlers/webhook";
import { requireAuth } from "../middleware/auth";

const router = Router();

// Auth
router.post("/auth/register", register);
router.post("/auth/login", login);

// Forms
router.get("/forms", requireAuth, listForms);
router.post("/forms", requireAuth, createForm);
router.get("/forms/:formId", requireAuth, getForm);

// Responses
router.post("/forms/:formId/responses", requireAuth, submitForm);
router.get("/forms/:formId/responses", requireAuth, listResponses);

// Airtable API
router.get("/airtable/test", async (req, res) => {
  try {
    const pat = process.env.AIRTABLE_PAT;
    res.json({ 
      hasToken: !!pat, 
      tokenLength: pat?.length,
      tokenPreview: pat?.substring(0, 10) + "..."
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/airtable/bases", listBases);
router.get("/airtable/tables", listTables);
router.get("/airtable/fields", listFields);

// Webhook
router.post("/webhooks/airtable", airtableWebhook);

export default router;

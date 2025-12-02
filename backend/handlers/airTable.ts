import { Request, Response } from "express";
import { airtableClient } from "../utils/airTableClient";

export const listBases = async (req: Request, res: Response) => {
  try {
    console.log("Fetching Airtable bases...");
    const response = await airtableClient.get("meta/bases");
    console.log("Airtable response:", response.data);
    // Airtable meta returns bases array
    const bases = response.data.bases.map((b: any) => ({ id: b.id, name: b.name }));
    res.json(bases);
  } catch (err: any) {
    console.error("Error fetching bases:");
    console.error("Status:", err.response?.status);
    console.error("Data:", err.response?.data);
    console.error("Message:", err.message);
    res.status(500).json({ error: "Failed to fetch bases" });
  }
};

export const listTables = async (req: Request, res: Response) => {
  const { baseId } = req.query;
  if (!baseId) return res.status(400).json({ error: "baseId is required" });

  try {
    const response = await airtableClient.get(`meta/bases/${baseId}/tables`);
    const tables = response.data.tables.map((t: any) => ({ id: t.id, name: t.name }));
    res.json(tables);
  } catch (err: any) {
    console.error("Error fetching tables:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch tables" });
  }
};

export const listFields = async (req: Request, res: Response) => {
  const { baseId, tableId } = req.query;
  if (!baseId || !tableId) return res.status(400).json({ error: "baseId and tableId are required" });

  try {
    console.log(`Fetching fields for base ${baseId}, table ${tableId}...`);
    const response = await airtableClient.get(`meta/bases/${baseId}/tables`);
    console.log("Tables response:", JSON.stringify(response.data, null, 2));
    
    // Find the specific table
    const table = response.data.tables.find((t: any) => t.id === tableId);
    if (!table) {
      return res.status(404).json({ error: "Table not found" });
    }
    
    const fields = table.fields.map((f: any) => ({
      id: f.id,
      name: f.name,
      type: f.type,
    }));
    res.json(fields);
  } catch (err: any) {
    console.error("Error fetching fields:");
    console.error("Status:", err.response?.status);
    console.error("Data:", err.response?.data);
    console.error("Message:", err.message);
    res.status(500).json({ error: "Failed to fetch fields" });
  }
};

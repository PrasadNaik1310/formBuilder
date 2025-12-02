// src/pages/FormBuilder.tsx
import React, { useEffect, useState } from "react";
import api from "../api";

// Frontend copy of conditional types
export type Operator = "equals" | "notEquals" | "contains";

export interface Condition {
  questionKey: string;
  operator: Operator;
  value: any;
}

export interface ConditionalRules {
  logic: "AND" | "OR";
  conditions: Condition[];
}

interface Field {
  id: string;
  name: string;
  type: string;
}

interface FormField {
  fieldId: string;
  label: string;
  required: boolean;
  conditionalRules: ConditionalRules | null;
}

export default function FormBuilder() {
  const [bases, setBases] = useState<{ id: string; name: string }[]>([]);
  const [tables, setTables] = useState<{ id: string; name: string }[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [formFields, setFormFields] = useState<FormField[]>([]);

  const [selectedBase, setSelectedBase] = useState<string>("");
  const [selectedTable, setSelectedTable] = useState<string>("");

  // Fetch Airtable bases
  useEffect(() => {
    console.log("Fetching bases...");
    api
      .get("/airtable/bases")
      .then((res) => {
        console.log("Bases response:", res.data);
        const data = Array.isArray(res.data) ? res.data : [];
        setBases(data);
      })
      .catch((err) => {
        console.error("Failed to fetch bases:", err);
        console.error("Error response:", err.response?.data);
        // Dummy options if API fails
        setBases([
          { id: "base1", name: "Demo Base 1" },
          { id: "base2", name: "Demo Base 2" },
        ]);
      });
  }, []);

  // Fetch tables for selected base
  useEffect(() => {
    if (!selectedBase) {
      setTables([]);
      return;
    }

    api
      .get(`/airtable/tables?baseId=${selectedBase}`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setTables(data);
      })
      .catch((err) => {
        console.error("Failed to fetch tables:", err);
        setTables([
          { id: "table1", name: "Demo Table 1" },
          { id: "table2", name: "Demo Table 2" },
        ]);
      });
  }, [selectedBase]);

  // Fetch fields for selected table
  useEffect(() => {
    if (!selectedTable) {
      setFields([]);
      setFormFields([]);
      return;
    }

    api
      .get(`/airtable/fields?baseId=${selectedBase}&tableId=${selectedTable}`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setFields(data);

        const initialFormFields = data.map((f: Field) => ({
          fieldId: f.id,
          label: f.name,
          required: false,
          conditionalRules: null,
        }));
        setFormFields(initialFormFields);
      })
      .catch((err) => {
        console.error("Failed to fetch fields:", err);
        setFields([]);
        setFormFields([]);
      });
  }, [selectedTable]);

  const handleFieldChange = (index: number, key: keyof FormField, value: any) => {
    setFormFields((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBase || !selectedTable) {
      alert("Select a base and table first!");
      return;
    }

    api
      .post("/forms", {
        baseId: selectedBase,
        tableId: selectedTable,
        questions: formFields,
      })
      .then(() => alert("Form saved successfully"))
      .catch((err) => {
        console.error("Failed to save form:", err);
        alert("Failed to save form. Check console.");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Form Builder</h2>

      {/* Base selection */}
      <div>
        <label>Base: </label>
        <select value={selectedBase} onChange={(e) => setSelectedBase(e.target.value)}>
          <option value="">Select Base</option>
          {Array.isArray(bases) &&
            bases.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
        </select>
      </div>

      {/* Table selection */}
      
        <div style={{ marginTop: "10px" }}>
          <label>Table: </label>
          <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)}>
            <option value="">Select Table</option>
            {Array.isArray(tables) &&
              tables.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
          </select>
        </div>
      

      {/* Form Fields */}
      
        <form onSubmit={handleSubmit} style={{ marginTop: "15px" }}>
          {formFields.map((f, index) => (
            <div key={f.fieldId} style={{ marginBottom: "10px" }}>
              <label>Label: </label>
              <input
                type="text"
                value={f.label}
                onChange={(e) => handleFieldChange(index, "label", e.target.value)}
              />
              <label style={{ marginLeft: "10px" }}>
                Required:
                <input
                  type="checkbox"
                  checked={f.required}
                  onChange={(e) => handleFieldChange(index, "required", e.target.checked)}
                />
              </label>
            </div>
          ))}

          <button type="submit" style={{ marginTop: "15px" }}>
            Save Form
          </button>
        </form>
      
    </div>
  );
}

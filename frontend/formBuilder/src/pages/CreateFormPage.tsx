// src/pages/CreateFormPage.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import type { ConditionalRules } from "../../../../backend/utils/conditionals";

interface Field {
  id: string;
  name: string;
  type: string;
  required: boolean;
  conditionalRules?: ConditionalRules | null;
}

export default function CreateFormPage() {
  const [fields, setFields] = useState<Field[]>([]);
  const [selectedFields, setSelectedFields] = useState<Field[]>([]);
  const [formName, setFormName] = useState("");
  const token = localStorage.getItem("token");

  const handleAddConditionalRule = (fieldId: string) => {
    const question = selectedFields.find((f) => f.id === fieldId);
    if (!question) return;

    const newRules: ConditionalRules = {
      logic: "AND",
      conditions: [
        {
          questionKey: "", // fill in later
          operator: "equals",
          value: "",
        },
      ],
    };

    question.conditionalRules = newRules;
    setSelectedFields([...selectedFields]);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/forms",
        {
          name: formName,
          questions: selectedFields.map((f) => ({
            questionKey: f.id,
            label: f.name,
            type: f.type,
            required: f.required,
            conditionalRules: f.conditionalRules || null,
          })),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Form created!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Form</h2>
      <div>
        <label>Form Name:</label>
        <input value={formName} onChange={(e) => setFormName(e.target.value)} />
      </div>

      {/* Fields selection UI simplified */}
      {fields.map((f) => (
        <div key={f.id}>
          <input
            type="checkbox"
            checked={selectedFields.includes(f)}
            onChange={(e) => {
              if (e.target.checked) setSelectedFields([...selectedFields, f]);
              else setSelectedFields(selectedFields.filter((x) => x.id !== f.id));
            }}
          />
          {f.name} ({f.type})
          <button onClick={() => handleAddConditionalRule(f.id)}>Add Logic</button>
        </div>
      ))}

      <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
        Create Form
      </button>
    </div>
  );
}

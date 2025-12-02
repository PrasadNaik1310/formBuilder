// src/pages/SubmitResponsePage.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { shouldShowQuestion } from "../../../../backend/utils/conditionals";

export default function SubmitResponsePage() {
  const { formId } = useParams<{ formId: string }>();
  const [form, setForm] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/forms/${formId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchForm();
  }, [formId]);

  const handleSubmit = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/forms/${formId}/responses`,
        { answers },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Response submitted!");
    } catch (err) {
      console.error(err);
    }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Submit Response for {form.name}</h2>
      {form.questions.map((q: any) => {
        const visible = shouldShowQuestion(q.conditionalRules || null, answers);
        if (!visible) return null;

        return (
          <div key={q.questionKey} style={{ marginBottom: "10px" }}>
            <label>{q.label}</label>
            <input
              type="text"
              value={answers[q.questionKey] || ""}
              onChange={(e) =>
                setAnswers({ ...answers, [q.questionKey]: e.target.value })
              }
              required={q.required}
            />
          </div>
        );
      })}
      <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
        Submit
      </button>
    </div>
  );
}

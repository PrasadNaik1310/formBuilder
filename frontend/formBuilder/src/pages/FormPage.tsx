// src/pages/FormPage.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function FormPage() {
  const { formId } = useParams<{ formId: string }>();
  const [form, setForm] = useState<any>(null);
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

  if (!form) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{form.name}</h2>
      {form.questions.map((q: any) => (
        <div key={q.questionKey}>
          <label>{q.label}</label>
          <input type="text" disabled />
        </div>
      ))}
    </div>
  );
}

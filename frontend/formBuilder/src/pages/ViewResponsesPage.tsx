// src/pages/ViewResponsesPage.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ViewResponsesPage() {
  const { formId } = useParams<{ formId: string }>();
  const [responses, setResponses] = useState<any[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/forms/${formId}/responses`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setResponses(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResponses();
  }, [formId]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Responses</h2>
      {responses.map((r) => (
        <pre key={r._id}>{JSON.stringify(r.answers, null, 2)}</pre>
      ))}
    </div>
  );
}

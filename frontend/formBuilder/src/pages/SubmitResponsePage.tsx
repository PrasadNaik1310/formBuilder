import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function SubmitResponsePage() {
  const { formId } = useParams();
  const [jsonInput, setJsonInput] = useState("");

  async function submit() {
    try {
      const token = localStorage.getItem("token");
      const data = JSON.parse(jsonInput);

      await axios.post(`/api/forms/${formId}/responses`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Submitted");
    } catch (err) {
      alert("Invalid JSON or failed request");
    }
  }

  return (
    <div>
      <h3>Submit Response</h3>

      <textarea
        rows={8}
        cols={40}
        value={jsonInput}
        placeholder="Enter JSON { }"
        onChange={(e) => setJsonInput(e.target.value)}
      />

      <br />
      <button onClick={submit}>Submit</button>
    </div>
  );
}

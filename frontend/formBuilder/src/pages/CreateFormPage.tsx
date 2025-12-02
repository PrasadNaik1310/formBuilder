import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateFormPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  async function createForm() {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post("/api/forms",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate(`/forms/${res.data._id}`);
    } catch (err) {
      console.log(err);
      alert("Failed to create form");
    }
  }

  return (
    <div>
      <h2>Create Form</h2>

      <input
        placeholder="Form Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br />

      <button onClick={createForm}>Create</button>
    </div>
  );
}

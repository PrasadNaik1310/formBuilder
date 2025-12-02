import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ViewResponsesPage() {
  const { formId } = useParams();
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const token = localStorage.getItem("token");
    const res = await axios.get(`/api/forms/${formId}/responses`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setResponses(res.data);
  }

  return (
    <div>
      <h3>Responses</h3>

      {responses.map((r: any, i) => (
        <pre key={i}>{JSON.stringify(r, null, 2)}</pre>
      ))}
    </div>
  );
}

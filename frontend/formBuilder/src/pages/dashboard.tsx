import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

interface Form {
  _id: string;
  airtableBaseId: string;
  airtableTableId: string;
  questions: any[];
  createdAt: string;
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await api.get("/forms");
        setForms(res.data.forms || []);
      } catch (err) {
        console.error("Failed to fetch forms:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Welcome, {user?.email}</h2>
      <button onClick={handleLogout}>Logout</button>

      <div style={{ marginTop: 20 }}>
        <a href="/builder" style={{ fontSize: 18, fontWeight: "bold" }}>
          + Create New Form
        </a>
      </div>

      <div style={{ marginTop: 30 }}>
        <h3>Your Forms</h3>
        {loading ? (
          <p>Loading...</p>
        ) : forms.length === 0 ? (
          <p>No forms yet. Create one to get started!</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {forms.map((form) => (
              <li key={form._id} style={{ marginBottom: 15, padding: 10, border: "1px solid #ddd" }}>
                <div>
                  <strong>Form ID:</strong> {form._id}
                </div>
                <div>
                  <strong>Base:</strong> {form.airtableBaseId}
                </div>
                <div>
                  <strong>Table:</strong> {form.airtableTableId}
                </div>
                <div>
                  <strong>Questions:</strong> {form.questions.length}
                </div>
                <div>
                  <strong>Created:</strong> {new Date(form.createdAt).toLocaleDateString()}
                </div>
                <div style={{ marginTop: 10 }}>
                  <a href={`/forms/${form._id}`} style={{ marginRight: 10 }}>
                    View Form
                  </a>
                  <a href={`/forms/${form._id}/responses`}>View Responses</a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

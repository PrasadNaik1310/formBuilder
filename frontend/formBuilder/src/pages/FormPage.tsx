import { useNavigate, useParams } from "react-router-dom";

export default function FormPage() {
  const { formId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Form Page</h2>
      <p>Form ID: {formId}</p>

      <button onClick={() => navigate(`/forms/${formId}/submit`)}>
        Submit Response
      </button>

      <button onClick={() => navigate(`/forms/${formId}/responses`)}>
        View Responses
      </button>
    </div>
  );
}

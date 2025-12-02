
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

export function shouldShowQuestion(
  rules: ConditionalRules | null,
  answersSoFar: Record<string, any>
): boolean {
  if (!rules) return true;
  const results = rules.conditions.map((cond) => {
    const answer = answersSoFar[cond.questionKey];
    switch (cond.operator) {
      case "equals":
        return answer === cond.value;
      case "notEquals":
        return answer !== cond.value;
      case "contains":
        return Array.isArray(answer) && answer.includes(cond.value);
      default:
        return true;
    }
  });
  return rules.logic === "AND" ? results.every(Boolean) : results.some(Boolean);
}

// Form Field interface
interface FormField {
  fieldId: string;
  label: string;
  required: boolean;
  type?: string;
  conditionalRules: ConditionalRules | null;
}

export default function FormPage() {
  const { formId } = useParams<{ formId: string }>();
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!formId) return;
    axios
      .get(`/api/forms/${formId}`)
      .then((res) => {
        setFormFields(res.data.questions || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch form:", err);
        setLoading(false);
      });
  }, [formId]);

  const handleChange = (fieldId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    for (const field of formFields) {
      if (field.required && shouldShowQuestion(field.conditionalRules, answers)) {
        if (!answers[field.fieldId] || answers[field.fieldId].length === 0) {
          alert(`Field "${field.label}" is required`);
          return;
        }
      }
    }

    axios
      .post(`/api/forms/${formId}/responses`, { answers })
      .then(() => alert("Response submitted successfully"))
      .catch((err) => {
        console.error("Failed to submit response:", err);
        alert("Submission failed. Check console.");
      });
  };

  if (loading) return <div>Loading form...</div>;
  if (!formFields.length) return <div>No fields to display</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Form Viewer</h2>
      <form onSubmit={handleSubmit}>
        {formFields.map((field) => {
          if (!shouldShowQuestion(field.conditionalRules, answers)) return null;

          return (
            <div key={field.fieldId} style={{ marginBottom: "10px" }}>
              <label>{field.label}: </label>
              {field.type === "longText" ? (
                <textarea
                  value={answers[field.fieldId] || ""}
                  onChange={(e) => handleChange(field.fieldId, e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  value={answers[field.fieldId] || ""}
                  onChange={(e) => handleChange(field.fieldId, e.target.value)}
                />
              )}
            </div>
          );
        })}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

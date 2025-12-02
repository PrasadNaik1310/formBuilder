import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/home";
import CreateFormPage from "./pages/CreateFormPage";
import FormPage from "./pages/FormPage";
import SubmitResponsePage from "./pages/SubmitResponsePage";
import ViewResponsesPage from "./pages/ViewResponsesPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/forms/create" element={<CreateFormPage />} />
      <Route path="/forms/:formId" element={<FormPage />} />
      <Route path="/forms/:formId/submit" element={<SubmitResponsePage />} />
      <Route path="/forms/:formId/responses" element={<ViewResponsesPage />} />
    </Routes>
  );
}

import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/dashboard";
import HomePage from "./pages/home";
import FormBuilder from "./pages/FormBuilder";
import FormViewer from "./pages/FormViewer";
import CreateFormPage from "./pages/CreateFormPage";
import FormPage from "./pages/FormPage";
import SubmitResponsePage from "./pages/SubmitResponsePage";
import ViewResponsesPage from "./pages/ViewResponsesPage";
import Responses from "./pages/Responses";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/builder" element={<FormBuilder />} />
      <Route path="/viewer" element={<FormViewer />} />
      <Route path="/responses" element={<Responses />} />
      <Route path="/forms/create" element={<CreateFormPage />} />
      <Route path="/forms/:formId" element={<FormPage />} />
      <Route path="/forms/:formId/submit" element={<SubmitResponsePage />} />
      <Route path="/forms/:formId/responses" element={<ViewResponsesPage />} />
    </Routes>
  );
}

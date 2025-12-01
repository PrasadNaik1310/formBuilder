import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import FormBuilder from "./pages/FormBuilder";
import FormViewer from "./pages/FormViewer";
//import Responses from "./pages/Responses";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form-builder" element={<FormBuilder />} />
        <Route path="/form/:formId" element={<FormViewer />} />
        {/* <Route path="/forms/:formId/responses" element={<Responses />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

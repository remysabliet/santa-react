import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SantaLetterPage } from "./pages/santaLetterPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SantaLetterPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;

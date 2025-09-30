import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ModeSelection from './pages/ModeSelection';
import ClinicalCaseSelection from './pages/ClinicalCaseSelection';
import BasicCases from './pages/BasicCases';
import ClinicalCases from './pages/ClinicalCases';
import SpecialtyCases from './pages/SpecialtyCases';
import QuestionsBank from './pages/QuestionsBank';
import QuestionSolver from './pages/QuestionSolver';
import './styles/themes.css';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/study" element={<ModeSelection />} />
          <Route path="/clinical-cases" element={<ClinicalCaseSelection />} />
          <Route path="/clinical-cases/basic" element={<BasicCases />} />
          <Route path="/clinical-cases/clinical" element={<ClinicalCases />} />
          <Route path="/clinical-cases/specialties" element={<SpecialtyCases />} />
          <Route path="/questions" element={<QuestionsBank />} />
          <Route path="/question/:id" element={<QuestionSolver />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ExplanationsProvider } from './contexts/ExplanationsContext';
import { LoadingProvider } from './contexts/LoadingContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ModeSelection from './pages/modeSelection/ModeSelection';
import ClinicalCases from './pages/clinicalCases/ClinicalCases';
import QuestionSolver from './pages/QuestionSolver';
import QuestionsBank from './pages/questionsBank/QuestionsBank';
import './styles/themes.css';

export default function App() {
  return (
    <ThemeProvider>
      <ExplanationsProvider>
        <LoadingProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/study" element={<ModeSelection />} />
              <Route path="/clinical-cases" element={<ClinicalCases />} />
              <Route path="/questions" element={<QuestionsBank />} />
              <Route path="/question/:id" element={<QuestionSolver />} />
            </Routes>
          </Router>
        </LoadingProvider>
      </ExplanationsProvider>
    </ThemeProvider>
  );
}

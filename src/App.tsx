import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ExplanationsProvider } from './contexts/ExplanationsContext';
import { LoadingProvider } from './contexts/LoadingContext';
// Removendo TooltipProvider - não é mais necessário
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ModeSelection from './pages/ModeSelection';
import ClinicalCaseSelection from './pages/ClinicalCaseSelection';
import BasicCases from './pages/BasicCases';
import ClinicalCases from './pages/ClinicalCases';
import SpecialtyCases from './pages/SpecialtyCases';
import QuestionSolver from './pages/QuestionSolver';
import QuestionsAdmin from './pages/QuestionsAdmin';
import { AdminPage } from './pages/AdminPage';
import ExplanationTest from './pages/ExplanationTest';
import TestTooltips from './pages/TestTooltips';
import SimpleTooltipTest from './pages/SimpleTooltipTest';
import TestAllQuestions from './pages/TestAllQuestions';
import DebugTooltips from './pages/DebugTooltips';
import TestFlowPage from './pages/TestFlowPage';
import TestQuestion1 from './pages/TestQuestion1';
import TestQuestion10 from './pages/TestQuestion10';
import TestRedirect from './pages/TestRedirect';
import TestPage from './pages/TestPage';
import UniversalQuestionsBank from './pages/UniversalQuestionsBank';
import { 
  UniversalDrSkodaQuestion, 
  UniversalExamQuestion
} from './pages/UniversalQuestionPages';
import XPSystemExample from './examples/XPSystemExample';
import MethodologyXPSystemExample from './pages/MethodologyXPSystemExample';
import AdminInitialization from './pages/AdminInitialization';
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
              <Route path="/clinical-cases" element={<ClinicalCaseSelection />} />
              <Route path="/clinical-cases/basic" element={<BasicCases />} />
              <Route path="/clinical-cases/clinical" element={<ClinicalCases />} />
              <Route path="/clinical-cases/specialties" element={<SpecialtyCases />} />
              <Route path="/questions" element={<UniversalQuestionsBank />} />
              <Route path="/question/:id" element={<QuestionSolver />} />
              
              {/* Rotas Simplificadas para Questões */}
              <Route path="/question/dr-skoda/:id" element={<UniversalDrSkodaQuestion />} />
              <Route path="/exam/question/:id" element={<UniversalExamQuestion />} />
              
              {/* Rota padrão para questão redireciona para Dr. Skoda */}
              <Route path="/question/:id" element={<QuestionSolver />} />
              
              <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/questions" element={<QuestionsAdmin />} />
            <Route path="/admin/initialization" element={<AdminInitialization />} />
            <Route path="/test/explanations" element={<ExplanationTest />} />
            <Route path="/test/tooltips" element={<TestTooltips />} />
            <Route path="/test/simple" element={<SimpleTooltipTest />} />
            <Route path="/test/all-questions" element={<TestAllQuestions />} />
            <Route path="/test/debug" element={<DebugTooltips />} />
            <Route path="/test/flow" element={<TestFlowPage />} />
            <Route path="/test/question1" element={<TestQuestion1 />} />
            <Route path="/test/question10" element={<TestQuestion10 />} />
            <Route path="/test/redirect" element={<TestRedirect />} />
            <Route path="/test/universal" element={<TestPage />} />
            <Route path="/xp-system" element={<XPSystemExample />} />
            <Route path="/methodology-xp" element={<MethodologyXPSystemExample />} />
          </Routes>
        </Router>
        </LoadingProvider>
      </ExplanationsProvider>
    </ThemeProvider>
  );
}

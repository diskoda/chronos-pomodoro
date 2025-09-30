import type { Question } from '../types/Question';
import { uspSp2025Questions } from './usp-sp-2025';

// Todas as questões da plataforma
export const allQuestions: Question[] = [
  ...uspSp2025Questions
];

// Questões por exame
export const questionsByExam = {
  'USP-SP 2025': uspSp2025Questions
};

// Função para extrair categorias únicas dinamicamente
const extractUniqueCategories = (): string[] => {
  const categories = new Set<string>();
  
  allQuestions.forEach(question => {
    if (Array.isArray(question.category)) {
      question.category.forEach(cat => categories.add(cat));
    } else {
      categories.add(question.category);
    }
  });
  
  return Array.from(categories).sort();
};

// Categorias disponíveis (atualizadas dinamicamente)
export const availableCategories = [
  "Todas",
  ...extractUniqueCategories()
];

// Níveis de dificuldade
export const availableDifficulties = [
  "Todas", 
  "Fácil", 
  "Médio", 
  "Difícil"
];

// Exames disponíveis
export const availableExams = [
  "Todas", 
  "USP-SP 2025"
];

// Função para buscar questão por ID
export const getQuestionById = (id: number): Question | undefined => {
  return allQuestions.find(question => question.id === id);
};

// Função para buscar questões por categoria
export const getQuestionsByCategory = (category: string): Question[] => {
  if (category === 'Todas') return allQuestions;
  return allQuestions.filter(question => {
    if (Array.isArray(question.category)) {
      return question.category.includes(category);
    }
    return question.category === category;
  });
};

// Função para buscar questões por exame
export const getQuestionsByExam = (exam: string): Question[] => {
  if (exam === 'Todas') return allQuestions;
  return allQuestions.filter(question => question.exam === exam);
};

// Função para buscar questões por dificuldade
export const getQuestionsByDifficulty = (difficulty: string): Question[] => {
  if (difficulty === 'Todas') return allQuestions;
  return allQuestions.filter(question => question.difficulty === difficulty);
};
// Índice das questões USP-SP 2025 Especialidades Pediátricas
// Centraliza as importações e exportações das questões organizadas por arquivo

import { question17FlowData } from './question17';
import { question18FlowData } from './question18';
import { question19FlowData } from './question19';
import { question20FlowData } from './question20';
import { question21FlowData } from './question21';
import { question22FlowData } from './question22';
import { question23FlowData } from './question23';
import { question24FlowData } from './question24';
import { question25FlowData } from './question25';
import { question26FlowData } from './question26';
import { question27FlowData } from './question27';
import { question28FlowData } from './question28';
import { question29FlowData } from './question29';
import { question30FlowData } from './question30';
import { question31FlowData } from './question31';
import { question32FlowData } from './question32';
import { question33FlowData } from './question33';
import { question34FlowData } from './question34';
import { question35FlowData } from './question35';

// Exportar todas as questões
export {
  question17FlowData,
  question18FlowData,
  question19FlowData,
  question20FlowData,
  question21FlowData,
  question22FlowData,
  question23FlowData,
  question24FlowData,
  question25FlowData,
  question26FlowData,
  question27FlowData,
  question28FlowData,
  question29FlowData,
  question30FlowData,
  question31FlowData,
  question32FlowData,
  question33FlowData,
  question34FlowData,
  question35FlowData
};

// Array com todas as questões para facilitar iteração
export const especialidadesPediatricasQuestions = [
  { id: 17, data: question17FlowData },
  { id: 18, data: question18FlowData },
  { id: 19, data: question19FlowData },
  { id: 20, data: question20FlowData },
  { id: 21, data: question21FlowData },
  { id: 22, data: question22FlowData },
  { id: 23, data: question23FlowData },
  { id: 24, data: question24FlowData },
  { id: 25, data: question25FlowData },
  { id: 26, data: question26FlowData },
  { id: 27, data: question27FlowData },
  { id: 28, data: question28FlowData },
  { id: 29, data: question29FlowData },
  { id: 30, data: question30FlowData },
  { id: 31, data: question31FlowData },
  { id: 32, data: question32FlowData },
  { id: 33, data: question33FlowData },
  { id: 34, data: question34FlowData },
  { id: 35, data: question35FlowData }
];

// Metadados do conjunto de questões
export const especialidadesPediatricasMetadata = {
  examType: 'USP-SP 2025',
  subtype: 'Especialidades Pediátricas',
  totalQuestions: 19,
  questionsRange: '17-35',
  specialties: [
    'Imunizações',
    'Desenvolvimento',
    'Cardiologia',
    'Pneumologia',
    'Neurologia',
    'Gastroenterologia',
    'Hematologia',
    'Nefrologia',
    'Endocrinologia',
    'Cirurgia Pediátrica',
    'Ortopedia Pediátrica',
    'Dermatologia Pediátrica',
    'Reumatologia Pediátrica',
    'Oftalmologia Pediátrica',
    'Oncologia Pediátrica',
    'Infectologia Pediátrica',
    'Genética Médica',
    'Neonatologia'
  ],
  difficultyDistribution: {
    easy: 1,
    medium: 17,
    hard: 1
  },
  topics: {
    'Imunizações': ['Vacina pneumocócica', 'Grupos de risco'],
    'Desenvolvimento': ['Marcos neuromotor', 'Avaliação pediátrica'],
    'Cardiologia': ['Sopros cardíacos', 'Ausculta pediátrica'],
    'Pneumologia': ['Bronquiolite', 'Asma', 'Manejo respiratório'],
    'Neurologia': ['Convulsão febril', 'Emergências neurológicas'],
    'Gastroenterologia': ['Diarreia aguda', 'Desidratação', 'SRO'],
    'Hematologia': ['Anemia ferropriva', 'Deficiência ferro'],
    'Nefrologia': ['ITU', 'Cateterismo vesical', 'Métodos coleta'],
    'Endocrinologia': ['Diabetes tipo 1', 'Cetoacidose diabética'],
    'Cirurgia Pediátrica': ['Atresia de esôfago', 'Fístula traqueoesofágica', 'Emergências neonatais'],
    'Ortopedia Pediátrica': ['DDQ', 'Displasia quadril', 'Redução aberta'],
    'Dermatologia Pediátrica': ['Varicela', 'Viroses exantemáticas', 'Isolamento'],
    'Reumatologia Pediátrica': ['AIJ sistêmica', 'Artrite juvenil', 'AINEs'],
    'Oftalmologia Pediátrica': ['Estrabismo', 'Esotropia acomodativa', 'Correção refrativa'],
    'Oncologia Pediátrica': ['Tumor de Wilms', 'Massas abdominais', 'Estadiamento'],
    'Infectologia Pediátrica': ['Epiglotite aguda', 'Emergências respiratórias', 'Obstrução supraglótica'],
    'Genética Médica': ['Síndrome X frágil', 'Deficiência intelectual', 'Herança ligada ao X'],
    'Neonatologia': ['Síndrome aspiração meconial', 'Pneumotórax neonatal', 'Emergências respiratórias']
  }
};

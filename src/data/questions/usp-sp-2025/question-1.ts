import type { Question } from '../../types/Question';

export const question1: Question = {
  id: 1,
  title: "Abordagem motivacional no tabagismo",
  category: "Pediatria Geral",
  difficulty: "Médio",
  exam: "USP-SP 2025",
  completed: false,
  correctRate: 0,
  timeEstimate: 3,
  tags: ["Asma", "Tabagismo", "Entrevista motivacional", "UBS"],
  statement: "Criança, do sexo masculino, 4 anos de idade, com diagnóstico prévio de asma, está com uma crise de broncoespasmo atual na UBS. Enquanto você prescrevia a medicação, percebeu que o pai cheirava a cigarro. Após confirmar que o pai é tabagista, assinale a alternativa com a próxima pergunta que deve ser realizada, considerando a abordagem motivacional.",
  alternatives: [
    "(A) Você já pensou em parar de fumar?",
    "(B) Você já pensou nos riscos de fumar?",
    "(C) Você fuma quantos cigarros por dia?",
    "(D) Você sabe que o tabagismo pode piorar a asma?"
  ]
};
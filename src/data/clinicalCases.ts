export type DifficultyLevel = 'basic' | 'intermediate' | 'advanced';

export const clinicalCases = [
  {
    id: "basic-case-1",
    title: "Febre em lactente de 2 meses",
    description: "Lactente de 2 meses apresenta febre há 24 horas",
    difficulty: "basic" as DifficultyLevel,
    estimatedTime: 45,
    specialties: ["Pediatria", "Infectologia"],
    objectives: [
      "Avaliar febre em lactente jovem",
      "Identificar sinais de alarme",
      "Definir investigação apropriada",
      "Estabelecer conduta adequada"
    ],
    content: {
      presentation: {
        patientId: {
          name: "João Silva",
          age: "2 meses",
          gender: "Masculino",
          weight: "4,5 kg",
          birthDate: "15/10/2024"
        },
        chiefComplaint: "Febre há 24 horas",
        historyOfPresentIllness: [
          "Lactente de 2 meses levado ao pronto-socorro pelos pais devido a febre há 24 horas",
          "Febre iniciou ontem à noite, com temperatura máxima de 38,5°C",
          "Criança apresenta-se irritada e com choro persistente",
          "Diminuição da aceitação alimentar nas últimas 12 horas",
          "Sem vômitos ou diarreia",
          "Sem sintomas respiratórios evidentes",
          "Pais negam contato com pessoas doentes"
        ],
        pastMedicalHistory: [
          "Nascimento a termo (39 semanas)",
          "Parto normal sem intercorrências",
          "Peso ao nascimento: 3,2 kg",
          "Aleitamento materno exclusivo",
          "Vacinação em dia conforme calendário"
        ],
        familyHistory: [
          "Mãe: 28 anos, hígida",
          "Pai: 30 anos, hígido",
          "Sem antecedentes familiares relevantes"
        ],
        socialHistory: [
          "Residem em área urbana",
          "Condições de moradia adequadas",
          "Água tratada e saneamento básico"
        ],
        reviewOfSystems: {
          general: "Febre, irritabilidade",
          respiratory: "Sem tosse ou dificuldade respiratória",
          gastrointestinal: "Diminuição da aceitação alimentar",
          genitourinary: "Diurese normal",
          neurological: "Irritabilidade, choro persistente",
          skin: "Sem exantemas"
        },
        physicalExam: {
          generalState: "Lactente irritado, choroso, febril",
          vitalSigns: {
            heartRate: "140 bpm",
            respiratoryRate: "40 ipm",
            bloodPressure: "80/50 mmHg",
            temperature: "38,3°C",
            oxygenSaturation: "98% em ar ambiente"
          },
          headNeck: "Fontanela anterior normotensa, sem sinais meníngeos",
          chest: "Expansibilidade simétrica, sem tiragem",
          cardiovascular: "Ritmo regular, bulhas normofonéticas, sem sopros",
          abdomen: "Plano, flácido, sem visceromegalias",
          extremities: "Perfusão periférica adequada, sem edemas",
          neurological: "Irritado, reflexos presentes e simétricos",
          skin: "Sem exantemas, boa perfusão"
        },
        complementaryExams: [
          "Hemograma: Leucócitos 15.000/mm³ (neutrófilos 70%)",
          "Proteína C reativa: 25 mg/L (VR < 3,0)",
          "Urocultura: Solicitada, resultado pendente",
          "Hemocultura: Solicitada, resultado pendente"
        ],
        diagnosticHypotheses: [
          "Síndrome febril em lactente jovem",
          "Infecção bacteriana grave (a descartar)",
          "Infecção do trato urinário",
          "Sepse neonatal tardia"
        ],
        initialConduct: [
          "Internação hospitalar para investigação",
          "Antibioticoterapia empírica (ampicilina + gentamicina)",
          "Monitorização contínua",
          "Coleta de culturas (sangue, urina, LCR se indicado)",
          "Controle rigoroso da temperatura"
        ],
        evolution: "Após 48h de antibioticoterapia, paciente apresentou melhora clínica significativa com resolução da febre. Hemocultura negativa, urocultura mostrou E. coli sensível à ampicilina. Completou 7 dias de antibioticoterapia com boa evolução."
      },
      knowledgeDiagnosis: {
        questions: [
          {
            id: "kd-1",
            question: "Qual é a principal preocupação em lactentes com menos de 3 meses que apresentam febre?",
            options: [
              "Desidratação",
              "Convulsão febril",
              "Infecção bacteriana grave",
              "Reação vacinal"
            ],
            correctAnswer: 2,
            explanation: "Em lactentes jovens (< 3 meses), o sistema imunológico ainda é imaturo, aumentando o risco de infecções bacterianas graves como sepse, meningite e infecção urinária."
          }
        ]
      },
      learningQuestions: [
        {
          id: "lq-1",
          question: "Baseado no caso apresentado, qual seria a conduta mais apropriada para este lactente?",
          options: [
            "Alta hospitalar com antitérmico",
            "Observação domiciliar por 24h",
            "Internação e investigação completa",
            "Apenas exames laboratoriais ambulatoriais"
          ],
          correctAnswer: 2,
          explanation: "Lactentes com menos de 3 meses e febre requerem internação e investigação completa devido ao alto risco de infecção bacteriana grave."
        }
      ],
      activeStudy: {
        materials: [
          {
            type: "article",
            title: "Febre em lactentes: abordagem diagnóstica",
            content: "Revisão sobre avaliação de febre em lactentes jovens..."
          }
        ]
      },
      conclusion: {
        keyPoints: [
          "Febre em lactentes < 3 meses é emergência pediátrica",
          "Investigação completa sempre necessária",
          "Antibioticoterapia empírica deve ser iniciada",
          "Hospitalização é mandatória"
        ],
        competenciesAchieved: [
          "Reconhecimento de sinais de alarme",
          "Tomada de decisão em emergência pediátrica",
          "Prescrição de antibioticoterapia empírica"
        ]
      }
    }
  }
];

export type CaseData = typeof clinicalCases[0];
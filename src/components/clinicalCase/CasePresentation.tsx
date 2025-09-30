import { FileText, User, Clock, Target, Stethoscope, Activity, TestTube, Brain, CheckCircle } from 'lucide-react';
import { useState } from 'react';

// Definindo o tipo localmente para evitar problemas de importação
interface CaseData {
  id: string;
  title: string;
  description: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  estimatedTime: number;
  specialties: string[];
  objectives: string[];
  content: {
    presentation: {
      patientId: {
        name: string;
        age: string;
        gender: string;
        weight: string;
        birthDate: string;
      };
      chiefComplaint: string;
      historyOfPresentIllness: string[];
      pastMedicalHistory: string[];
      familyHistory: string[];
      socialHistory: string[];
      reviewOfSystems?: {
        general?: string;
        respiratory?: string;
        gastrointestinal?: string;
        genitourinary?: string;
        neurological?: string;
        skin?: string;
      };
      physicalExam?: {
        generalState?: string;
        vitalSigns?: Record<string, string>;
        [key: string]: string | Record<string, string> | undefined;
      };
      complementaryExams?: string[];
      diagnosticHypotheses?: string[];
      initialConduct?: string[];
      evolution?: string;
    };
  };
}

interface CasePresentationProps {
  caseData: CaseData;
  isCompleted?: boolean;
  onComplete?: () => void;
}

export function CasePresentation({ caseData, isCompleted = false, onComplete }: CasePresentationProps) {
  const [hasReadCase, setHasReadCase] = useState(false);

  return (
    <div className="space-y-8">
      {/* Case Overview */}
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 mb-8 border border-blue-400/30">
        <div className="flex items-center space-x-3 mb-4">
          <FileText className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">Apresentação do Caso</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-gray-400 text-sm">Tempo Estimado</div>
            <div className="text-cyan-300 font-bold">{caseData.estimatedTime} min</div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 text-sm">Dificuldade</div>
            <div className="text-purple-300 font-bold capitalize">{caseData.difficulty}</div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 text-sm">Especialidades</div>
            <div className="text-lime-300 font-bold">{caseData.specialties.join(', ')}</div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 text-sm">Objetivos</div>
            <div className="text-orange-300 font-bold">{caseData.objectives.length}</div>
          </div>
        </div>
        
        <p className="text-blue-200 leading-relaxed text-sm">
          {caseData.description}
        </p>
      </div>

      {/* Patient Information */}
      <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-600">
        <div className="flex items-center space-x-3 mb-4">
          <User className="w-6 h-6 text-green-400" />
          <h3 className="text-lg font-semibold text-white">Identificação do Paciente</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <div className="text-green-300 text-sm">Nome</div>
            <div className="text-white font-semibold">{caseData.content.presentation.patientId.name}</div>
          </div>
          <div>
            <div className="text-green-300 text-sm">Idade</div>
            <div className="text-white font-semibold">{caseData.content.presentation.patientId.age}</div>
          </div>
          <div>
            <div className="text-green-300 text-sm">Sexo</div>
            <div className="text-white font-semibold">{caseData.content.presentation.patientId.gender}</div>
          </div>
          <div>
            <div className="text-green-300 text-sm">Peso</div>
            <div className="text-white font-semibold">{caseData.content.presentation.patientId.weight}</div>
          </div>
          <div>
            <div className="text-green-300 text-sm">Data de Nascimento</div>
            <div className="text-white font-semibold">{caseData.content.presentation.patientId.birthDate}</div>
          </div>
        </div>
      </div>

      {/* Chief Complaint */}
      <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-600">
        <div className="flex items-center space-x-3 mb-4">
          <Activity className="w-6 h-6 text-red-400" />
          <h3 className="text-lg font-semibold text-white">Queixa Principal</h3>
        </div>
        <p className="text-red-200 text-lg font-medium">
          {caseData.content.presentation.chiefComplaint}
        </p>
      </div>

      {/* History of Present Illness */}
      <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-600">
        <div className="flex items-center space-x-3 mb-4">
          <Clock className="w-6 h-6 text-amber-400" />
          <h3 className="text-lg font-semibold text-white">História da Doença Atual</h3>
        </div>
        <div className="space-y-3">
          {caseData.content.presentation.historyOfPresentIllness.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-300 leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Past Medical History */}
      <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-600">
        <div className="flex items-center space-x-3 mb-4">
          <FileText className="w-6 h-6 text-gray-400" />
          <h3 className="text-lg font-semibold text-white">Antecedentes Pessoais</h3>
        </div>
        <div className="space-y-2">
          {caseData.content.presentation.pastMedicalHistory.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Family History */}
      <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-600">
        <div className="flex items-center space-x-3 mb-4">
          <User className="w-6 h-6 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Antecedentes Familiares</h3>
        </div>
        <div className="space-y-2">
          {caseData.content.presentation.familyHistory.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Social History */}
      <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-600">
        <div className="flex items-center space-x-3 mb-4">
          <Target className="w-6 h-6 text-green-400" />
          <h3 className="text-lg font-semibold text-white">História Social</h3>
        </div>
        <div className="space-y-2">
          {caseData.content.presentation.socialHistory.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review of Systems */}
      {caseData.content.presentation.reviewOfSystems && (
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-600">
          <div className="flex items-center space-x-3 mb-4">
            <Stethoscope className="w-6 h-6 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Revisão de Sistemas</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(caseData.content.presentation.reviewOfSystems).map(([system, description]) => (
              <div key={system} className="bg-gray-700/50 rounded-lg p-4">
                <div className="text-yellow-300 font-semibold mb-2 capitalize">
                  {system === 'general' ? 'Geral' :
                   system === 'respiratory' ? 'Respiratório' :
                   system === 'gastrointestinal' ? 'Gastrointestinal' :
                   system === 'genitourinary' ? 'Genitourinário' :
                   system === 'neurological' ? 'Neurológico' :
                   system === 'skin' ? 'Pele' : system}
                </div>
                <div className="text-gray-300">{description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Physical Exam */}
      {caseData.content.presentation.physicalExam && (
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-600">
          <div className="flex items-center space-x-3 mb-4">
            <Stethoscope className="w-6 h-6 text-pink-400" />
            <h3 className="text-lg font-semibold text-white">Exame Físico</h3>
          </div>
          <div className="space-y-4">
            {caseData.content.presentation.physicalExam.generalState && (
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="text-pink-300 font-semibold mb-2">Estado geral</div>
                <div className="text-gray-300">{caseData.content.presentation.physicalExam.generalState}</div>
              </div>
            )}
            
            {caseData.content.presentation.physicalExam.vitalSigns && (
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="text-pink-300 font-semibold mb-3">Sinais vitais</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Object.entries(caseData.content.presentation.physicalExam.vitalSigns).map(([sign, value]) => (
                    <div key={sign}>
                      <span className="text-gray-400 text-sm">
                        {sign === 'heartRate' ? 'FC' :
                         sign === 'respiratoryRate' ? 'FR' :
                         sign === 'bloodPressure' ? 'PA' :
                         sign === 'temperature' ? 'Temp' :
                         sign === 'oxygenSaturation' ? 'SatO₂' : sign}:
                      </span>
                      <span className="text-white ml-2">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              {Object.entries(caseData.content.presentation.physicalExam)
                .filter(([key]) => key !== 'generalState' && key !== 'vitalSigns')
                .map(([system, description]) => (
                  <div key={system} className="bg-gray-700/50 rounded-lg p-4">
                    <div className="text-pink-300 font-semibold mb-2 capitalize">
                      {system === 'headNeck' ? 'Cabeça e pescoço' :
                       system === 'chest' ? 'Tórax' :
                       system === 'cardiovascular' ? 'Cardiovascular' :
                       system === 'abdomen' ? 'Abdome' :
                       system === 'extremities' ? 'Extremidades' :
                       system === 'neurological' ? 'Neurológico' :
                       system === 'skin' ? 'Pele' : system}
                    </div>
                    <div className="text-gray-300">{typeof description === 'string' ? description : ''}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Complementary Exams */}
      {caseData.content.presentation.complementaryExams && (
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-600">
          <div className="flex items-center space-x-3 mb-4">
            <TestTube className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">Exames Complementares</h3>
          </div>
          <div className="space-y-3">
            {caseData.content.presentation.complementaryExams.map((exam, index) => (
              <div key={index} className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-400/30">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-emerald-200 text-sm leading-relaxed">{exam}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Diagnostic Hypotheses */}
      {caseData.content.presentation.diagnosticHypotheses && (
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-600">
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="w-6 h-6 text-indigo-400" />
            <h3 className="text-lg font-semibold text-white">Hipóteses Diagnósticas</h3>
          </div>
          <ul className="space-y-2">
            {caseData.content.presentation.diagnosticHypotheses.map((hypothesis, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">{hypothesis}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Initial Conduct */}
      {caseData.content.presentation.initialConduct && (
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-600">
          <div className="flex items-center space-x-3 mb-4">
            <Activity className="w-6 h-6 text-teal-400" />
            <h3 className="text-lg font-semibold text-white">Conduta Inicial</h3>
          </div>
          <div className="space-y-3">
            {caseData.content.presentation.initialConduct.map((conduct, index) => (
              <div key={index} className="bg-teal-500/10 rounded-lg p-3 border border-teal-400/30">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-teal-200 text-sm leading-relaxed">{conduct}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Evolution and Outcome */}
      {caseData.content.presentation.evolution && (
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-6 mb-8 border border-green-400/30">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-semibold text-white">Evolução e Desfecho</h3>
          </div>
          <p className="text-green-200 leading-relaxed text-sm">
            {caseData.content.presentation.evolution}
          </p>
        </div>
      )}

      {/* Learning Objectives */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 mb-8 border border-purple-400/30">
        <div className="flex items-center space-x-3 mb-4">
          <Target className="w-6 h-6 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Objetivos de Aprendizagem</h3>
        </div>
        <div className="space-y-3">
          {caseData.objectives.map((objective, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {index + 1}
              </div>
              <span className="text-purple-200 leading-relaxed">{objective}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      {onComplete && (
        <div className="text-center py-8">
          <button
            onClick={() => {
              setHasReadCase(true);
              onComplete();
            }}
            disabled={isCompleted}
            className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all ${
              isCompleted
                ? 'bg-green-600 text-white cursor-not-allowed'
                : hasReadCase
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-600 text-gray-300 cursor-not-allowed'
            }`}
          >
            {isCompleted ? '✓ Caso Lido' : hasReadCase ? 'Próxima Etapa' : 'Leia o caso para continuar'}
          </button>
        </div>
      )}
    </div>
  );
}
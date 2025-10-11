import { BookOpen, Target, Clock, Award } from 'lucide-react';

export default function InfoPanel() {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Metodologia */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <BookOpen className="h-5 w-5 text-blue-400" />
            <h3 className="text-xl font-bold text-white">Metodologia ABP</h3>
          </div>
          <p className="text-slate-300 mb-4">
            Os casos clínicos utilizam a metodologia de Aprendizagem Baseada em Problemas (ABP), 
            promovendo o desenvolvimento do raciocínio clínico através de cenários reais.
          </p>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
              <p className="text-slate-300 text-sm">Análise sistemática do caso</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
              <p className="text-slate-300 text-sm">Formulação de hipóteses diagnósticas</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
              <p className="text-slate-300 text-sm">Decisão terapêutica fundamentada</p>
            </div>
          </div>
        </div>

        {/* Objetivos */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Target className="h-5 w-5 text-green-400" />
            <h3 className="text-xl font-bold text-white">Objetivos de Aprendizagem</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Clock className="h-4 w-4 text-yellow-400" />
              <p className="text-slate-300 text-sm">Desenvolver raciocínio clínico eficiente</p>
            </div>
            <div className="flex items-center space-x-3">
              <Award className="h-4 w-4 text-purple-400" />
              <p className="text-slate-300 text-sm">Aprimorar tomada de decisão médica</p>
            </div>
            <div className="flex items-center space-x-3">
              <Target className="h-4 w-4 text-green-400" />
              <p className="text-slate-300 text-sm">Integrar conhecimentos multidisciplinares</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-700/50">
            <p className="text-blue-300 text-sm">
              💡 <strong>Dica:</strong> Cada caso foi desenvolvido por especialistas e segue 
              diretrizes clínicas atualizadas para maximizar seu aprendizado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
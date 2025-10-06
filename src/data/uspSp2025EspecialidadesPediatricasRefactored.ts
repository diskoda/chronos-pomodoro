import { 
  registerQuestionFlowData,
  initializeFlowDataSystem 
} from './universalFlowDataManager';
import { 
  especialidadesPediatricasQuestions,
  especialidadesPediatricasMetadata
} from './questions/uspSp2025EspecialidadesPediatricas';

// ==========================================
// SISTEMA DE INICIALIZAÇÃO ESPECIALIDADES PEDIÁTRICAS
// ==========================================

/**
 * Inicializar sistema USP-SP 2025 Especialidades Pediátricas
 */
async function initializeUSPSP2025EspecialidadesPediatricasSystem(): Promise<void> {
  try {
    console.log('🏥 Inicializando sistema USP-SP 2025 Especialidades Pediátricas...');
    
    // Aguardar inicialização do sistema base
    await initializeFlowDataSystem();
    
    // Registrar dados das especialidades pediátricas
    registerEspecialidadesPediatricasFlowData();
    
    // Mostrar estatísticas
    console.log('📊 Questões de Especialidades Pediátricas carregadas:', {
      total: especialidadesPediatricasMetadata.totalQuestions,
      range: especialidadesPediatricasMetadata.questionsRange,
      specialties: especialidadesPediatricasMetadata.specialties.length,
      difficulty: especialidadesPediatricasMetadata.difficultyDistribution
    });
    
    console.log('✅ Sistema USP-SP 2025 Especialidades Pediátricas inicializado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inicializar sistema USP-SP 2025 Especialidades Pediátricas:', error);
    throw error;
  }
}

function registerEspecialidadesPediatricasFlowData() {
  // Registrar questões específicas de Especialidades Pediátricas
  console.log('📚 Registrando dados de fluxo para Especialidades Pediátricas...');
  
  // Iterar sobre todas as questões e registrar
  especialidadesPediatricasQuestions.forEach(({ id, data }) => {
    registerQuestionFlowData(id, data);
  });
  
  console.log(`✅ ${especialidadesPediatricasMetadata.totalQuestions} questões de Especialidades Pediátricas registradas!`);
}

export {
  especialidadesPediatricasQuestions,
  especialidadesPediatricasMetadata,
  initializeUSPSP2025EspecialidadesPediatricasSystem,
  registerEspecialidadesPediatricasFlowData
};

// Auto-inicializar quando o módulo for importado
initializeUSPSP2025EspecialidadesPediatricasSystem().catch(console.error);
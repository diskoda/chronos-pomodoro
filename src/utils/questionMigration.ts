import { questionsService } from '../services/questionsService';
import { allQuestions } from '../data/questions';
import type { Question } from '../data/types/Question';

/**
 * Utilitário para migrar questões locais para Firebase
 * Execute esta função apenas uma vez para migrar os dados
 */
export class QuestionnMigration {
  
  /**
   * Executa a migração completa das questões locais para Firebase
   */
  static async migrateAllQuestions(): Promise<void> {
    try {
      console.log('🚀 Iniciando migração das questões para Firebase...');
      console.log(`📊 Total de questões a migrar: ${allQuestions.length}`);

      // Verificar se já existem questões no Firebase
      const existingQuestions = await questionsService.getAllQuestions();
      
      if (existingQuestions.length > 0) {
        console.warn('⚠️ Já existem questões no Firebase. Deseja continuar? Isso pode duplicar dados.');
        const confirmation = confirm(
          `Já existem ${existingQuestions.length} questões no Firebase. ` +
          'Continuar com a migração pode duplicar dados. Deseja prosseguir?'
        );
        
        if (!confirmation) {
          console.log('❌ Migração cancelada pelo usuário');
          return;
        }
      }

      // Executar migração
      await questionsService.migrateLocalQuestions(allQuestions);
      
      console.log('✅ Migração concluída com sucesso!');
      console.log(`📈 ${allQuestions.length} questões foram migradas para Firebase`);
      
      // Verificar se a migração foi bem-sucedida
      const migratedQuestions = await questionsService.getAllQuestions();
      console.log(`🔍 Verificação: ${migratedQuestions.length} questões encontradas no Firebase`);
      
    } catch (error) {
      console.error('❌ Erro durante a migração:', error);
      throw error;
    }
  }

  /**
   * Migra questões específicas por exame
   */
  static async migrateQuestionsByExam(exam: string): Promise<void> {
    try {
      const questionsToMigrate = allQuestions.filter(q => q.exam === exam);
      
      if (questionsToMigrate.length === 0) {
        console.warn(`⚠️ Nenhuma questão encontrada para o exame: ${exam}`);
        return;
      }

      console.log(`🚀 Migrando questões do exame: ${exam}`);
      console.log(`📊 Total de questões: ${questionsToMigrate.length}`);

      await questionsService.migrateLocalQuestions(questionsToMigrate);
      
      console.log(`✅ Questões do exame ${exam} migradas com sucesso!`);
    } catch (error) {
      console.error(`❌ Erro ao migrar questões do exame ${exam}:`, error);
      throw error;
    }
  }

  /**
   * Limpa todas as questões do Firebase (use com cuidado!)
   */
  static async clearAllQuestions(): Promise<void> {
    try {
      const confirmation = confirm(
        '⚠️ ATENÇÃO: Esta ação irá deletar TODAS as questões do Firebase. ' +
        'Esta ação é irreversível. Deseja continuar?'
      );
      
      if (!confirmation) {
        console.log('❌ Operação cancelada pelo usuário');
        return;
      }

      console.log('🗑️ Removendo todas as questões do Firebase...');
      
      const existingQuestions = await questionsService.getAllQuestions();
      
      for (const question of existingQuestions) {
        await questionsService.deleteQuestion(question.id);
      }
      
      console.log(`✅ ${existingQuestions.length} questões foram removidas do Firebase`);
    } catch (error) {
      console.error('❌ Erro ao limpar questões:', error);
      throw error;
    }
  }

  /**
   * Verifica a integridade dos dados migrados
   */
  static async verifyMigration(): Promise<{
    localCount: number;
    firebaseCount: number;
    isValid: boolean;
    missingQuestions: number[];
  }> {
    try {
      console.log('🔍 Verificando integridade da migração...');
      
      const localQuestions = allQuestions;
      const firebaseQuestions = await questionsService.getAllQuestions();
      
      const firebaseIds = new Set(firebaseQuestions.map(q => q.id));
      
      const missingQuestions = localQuestions
        .filter(q => !firebaseIds.has(q.id))
        .map(q => q.id);
      
      const result = {
        localCount: localQuestions.length,
        firebaseCount: firebaseQuestions.length,
        isValid: missingQuestions.length === 0,
        missingQuestions
      };
      
      console.log(`📊 Questões locais: ${result.localCount}`);
      console.log(`📊 Questões no Firebase: ${result.firebaseCount}`);
      console.log(`✅ Migração válida: ${result.isValid ? 'Sim' : 'Não'}`);
      
      if (result.missingQuestions.length > 0) {
        console.warn(`⚠️ Questões faltando no Firebase: ${result.missingQuestions.join(', ')}`);
      }
      
      return result;
    } catch (error) {
      console.error('❌ Erro na verificação:', error);
      throw error;
    }
  }

  /**
   * Exibe estatísticas comparativas entre dados locais e Firebase
   */
  static async getComparisonStats(): Promise<void> {
    try {
      const localQuestions = allQuestions;
      const firebaseQuestions = await questionsService.getAllQuestions();
      
      console.log('\n📈 ESTATÍSTICAS COMPARATIVAS:');
      console.log('=====================================');
      
      // Contagens totais
      console.log(`📊 Total Local: ${localQuestions.length}`);
      console.log(`📊 Total Firebase: ${firebaseQuestions.length}`);
      
      // Por dificuldade
      const localDifficulty = this.countByProperty(localQuestions, 'difficulty');
      const firebaseDifficulty = this.countByProperty(firebaseQuestions, 'difficulty');
      
      console.log('\n🎯 Por Dificuldade:');
      Object.keys(localDifficulty).forEach(diff => {
        console.log(`  ${diff}: Local(${localDifficulty[diff]}) | Firebase(${firebaseDifficulty[diff] || 0})`);
      });
      
      // Por exame
      const localExams = this.countByProperty(localQuestions, 'exam');
      const firebaseExams = this.countByProperty(firebaseQuestions, 'exam');
      
      console.log('\n📝 Por Exame:');
      Object.keys(localExams).forEach(exam => {
        console.log(`  ${exam}: Local(${localExams[exam]}) | Firebase(${firebaseExams[exam] || 0})`);
      });
      
    } catch (error) {
      console.error('❌ Erro ao obter estatísticas:', error);
      throw error;
    }
  }

  /**
   * Utilitário para contar propriedades
   */
  private static countByProperty(questions: Question[], property: keyof Question): Record<string, number> {
    return questions.reduce((acc, question) => {
      const value = question[property];
      const key = Array.isArray(value) ? value.join(', ') : String(value);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }
}

// Funções de conveniência para uso direto
export const migrateAllQuestions = () => QuestionnMigration.migrateAllQuestions();
export const migrateQuestionsByExam = (exam: string) => QuestionnMigration.migrateQuestionsByExam(exam);
export const verifyMigration = () => QuestionnMigration.verifyMigration();
export const clearAllQuestions = () => QuestionnMigration.clearAllQuestions();
export const getComparisonStats = () => QuestionnMigration.getComparisonStats();
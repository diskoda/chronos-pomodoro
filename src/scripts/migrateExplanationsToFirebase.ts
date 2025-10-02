import { collection, doc, writeBatch } from 'firebase/firestore';
import { db } from '../config/firebase';
import { explanationsDatabase } from '../data/explanations';

// Função para migrar explicações para o Firebase
export const migrateExplanationsToFirebase = async () => {
  try {
    console.log('🚀 Iniciando migração de explicações para Firebase...');
    console.log(`📊 Total de explicações a migrar: ${Object.keys(explanationsDatabase).length}`);
    
    const batch = writeBatch(db);
    const explanationsRef = collection(db, 'explanations');
    
    // Converter cada explicação para documento do Firebase
    Object.entries(explanationsDatabase).forEach(([id, explanation]) => {
      const docRef = doc(explanationsRef, id);
      batch.set(docRef, {
        ...explanation,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: '1.0',
        source: 'migration'
      });
    });
    
    console.log('📝 Executando batch write no Firestore...');
    
    // Executar batch write
    await batch.commit();
    
    console.log(`✅ Migração concluída! ${Object.keys(explanationsDatabase).length} explicações enviadas.`);
    
    // Criar documento de metadados
    const metadataRef = doc(db, 'metadata', 'explanations');
    const metadataBatch = writeBatch(db);
    
    metadataBatch.set(metadataRef, {
      totalExplanations: Object.keys(explanationsDatabase).length,
      lastUpdated: new Date(),
      version: '1.0',
      migrationDate: new Date(),
      categories: Array.from(new Set(
        Object.values(explanationsDatabase)
          .map(exp => exp.category)
          .filter(Boolean)
      )).sort(),
      types: Array.from(new Set(
        Object.values(explanationsDatabase).map(exp => exp.type)
      )).sort(),
      difficulties: Array.from(new Set(
        Object.values(explanationsDatabase)
          .map(exp => exp.difficulty)
          .filter(Boolean)
      )).sort()
    });
    
    await metadataBatch.commit();
    
    console.log('✅ Metadados criados com sucesso!');
    console.log('🎉 Migração finalizada com sucesso!');
    
    return {
      success: true,
      totalMigrated: Object.keys(explanationsDatabase).length,
      timestamp: new Date()
    };
    
  } catch (error) {
    console.error('❌ Erro na migração:', error);
    throw error;
  }
};

// Executar migração se for chamado diretamente
const runMigration = async () => {
  try {
    await migrateExplanationsToFirebase();
    console.log('� Processo de migração finalizado!');
  } catch (error) {
    console.error('💥 Falha na migração:', error);
  }
};

// Exportar função para uso direto
export { runMigration };
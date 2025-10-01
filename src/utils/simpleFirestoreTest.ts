import { db } from '../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

/**
 * Teste simples e direto do Firestore
 */
export async function simpleFirestoreTest() {
  try {
    console.log('🔥 Teste simples do Firestore...');

    // Tentar criar um documento muito simples
    const testData = {
      message: 'Hello Firestore!',
      timestamp: new Date().toISOString(),
      test: true
    };

    console.log('📝 Tentando escrever documento...');
    await setDoc(doc(db, 'system_test', 'simple_test'), testData);
    console.log('✅ Documento escrito com sucesso!');

    console.log('📖 Tentando ler documento...');
    const docRef = doc(db, 'system_test', 'simple_test');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('✅ Documento lido com sucesso!');
      console.log('📄 Dados encontrados:', docSnap.data());
      return { success: true, data: docSnap.data() };
    } else {
      console.log('❌ Documento não encontrado após criação');
      return { success: false, error: 'Document not found after creation' };
    }

  } catch (error: any) {
    console.error('❌ Erro no teste simples:', error);
    
    let errorMessage = 'Erro desconhecido';
    let solution = 'Verifique a configuração';

    switch (error?.code) {
      case 'permission-denied':
        errorMessage = 'Permissão negada - problema nas regras de segurança';
        solution = 'Verifique as regras do Firestore no console';
        break;
      case 'failed-precondition':
        errorMessage = 'Firestore não foi inicializado no projeto';
        solution = 'Ative o Firestore no console Firebase';
        break;
      case 'unavailable':
        errorMessage = 'Serviço indisponível - problema de rede';
        solution = 'Verifique sua conexão com a internet';
        break;
      case 'invalid-argument':
        errorMessage = 'Argumento inválido na configuração';
        solution = 'Verifique a configuração do Firebase';
        break;
      default:
        errorMessage = error?.message || 'Erro desconhecido';
        solution = 'Consulte os logs detalhados';
    }

    return { 
      success: false, 
      error: errorMessage,
      solution: solution,
      code: error?.code
    };
  }
}
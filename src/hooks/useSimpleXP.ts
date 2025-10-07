import { useState } from 'react';
import { giveQuestionCompletionXP, shouldGiveXP } from '../services/simpleXPService';

// ==========================================
// SIMPLE XP HOOK - NO CONTEXT NEEDED
// ==========================================

interface UseSimpleXPReturn {
  isGivingXP: boolean;
  giveXPForQuestion: (questionId: number) => Promise<boolean>;
}

/**
 * Simple hook for XP system
 * No context dependencies - can be used anywhere
 */
export function useSimpleXP(): UseSimpleXPReturn {
  const [isGivingXP, setIsGivingXP] = useState(false);

  const giveXPForQuestion = async (questionId: number): Promise<boolean> => {
    // Check if should give XP (can be extended with rules)
    if (!shouldGiveXP(questionId)) {
      return false;
    }

    setIsGivingXP(true);
    
    try {
      const result = await giveQuestionCompletionXP(questionId);
      
      if (result) {
        console.log(`✅ XP Given: +${result.xpGained} XP for question ${questionId}`);
        if (result.leveledUp) {
          console.log(`🎊 Level Up! New level: ${result.newLevel}`);
        }
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error giving XP:', error);
      return false;
    } finally {
      setIsGivingXP(false);
    }
  };

  return {
    isGivingXP,
    giveXPForQuestion
  };
}

/**
 * Simple function to give XP - no hook needed
 * Can be called directly from any component
 */
export async function giveXPForQuestionCompletion(questionId: number): Promise<void> {
  try {
    if (shouldGiveXP(questionId)) {
      const result = await giveQuestionCompletionXP(questionId);
      if (result) {
        console.log(`✅ Question ${questionId} completed: +${result.xpGained} XP`);
      }
    }
  } catch (error) {
    console.error('Error giving XP for question completion:', error);
  }
}
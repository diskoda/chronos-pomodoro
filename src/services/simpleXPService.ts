import { XPService } from './xpService';
import { auth } from '../config/firebase';

// ==========================================
// SIMPLE XP SYSTEM - QUESTION COMPLETION
// ==========================================

interface XPReward {
  xpGained: number;
  leveledUp: boolean;
  newLevel?: number;
}

/**
 * Simple XP system - gives XP when user finishes a question
 * No matter if correct or incorrect, user gets XP for completing
 */
export async function giveQuestionCompletionXP(questionId: number): Promise<XPReward | null> {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.warn('❌ No user logged in for XP reward');
      return null;
    }

    console.log('🎯 Dando XP para questão:', { userId: user.uid, questionId });

    // Always give XP for question completion (regardless of correctness)
    const result = await XPService.recordActivity(
      user.uid, 
      'quiz_completed', // Use existing activity type
      {
        questionId: questionId.toString(),
        source: 'question_completion',
        timestamp: new Date().toISOString()
      }
    );
    
    console.log('✅ XP registrado com sucesso:', result);
    
    // Disparar evento para atualizar UI em tempo real
    window.dispatchEvent(new CustomEvent('xpGained', { 
      detail: {
        xpGained: result.xpGained,
        leveledUp: result.leveledUp,
        newLevel: result.newLevel,
        totalXP: result.totalXP
      }
    }));
    
    // Show visual notification
    showXPNotification(result.xpGained, result.leveledUp, result.newLevel);
    
    return {
      xpGained: result.xpGained,
      leveledUp: result.leveledUp,
      newLevel: result.newLevel
    };
    
  } catch (error) {
    console.error('❌ Error giving question completion XP:', error);
    return null;
  }
}

/**
 * Show simple XP notification in the UI
 */
function showXPNotification(xpGained: number, leveledUp: boolean, newLevel?: number): void {
  // Remove any existing notification
  const existingNotification = document.getElementById('xp-notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement('div');
  notification.id = 'xp-notification';
  notification.innerHTML = `
    <div style="
      position: fixed; 
      top: 20px; 
      right: 20px; 
      background: linear-gradient(135deg, #10B981, #059669); 
      color: white; 
      padding: 16px 24px; 
      border-radius: 12px; 
      box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3); 
      z-index: 10000;
      font-weight: 600;
      font-size: 14px;
      animation: slideInXP 0.4s ease-out;
      border: 1px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
    ">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 18px;">🎉</span>
        <div>
          <div style="font-size: 16px; margin-bottom: 2px;">+${xpGained} XP</div>
          <div style="font-size: 12px; opacity: 0.9;">Questão finalizada!</div>
          ${leveledUp ? `<div style="font-size: 12px; color: #FCD34D; font-weight: bold; margin-top: 4px;">🎊 LEVEL UP! Nível ${newLevel}</div>` : ''}
        </div>
      </div>
    </div>
  `;
  
  // Add animation CSS if not exists
  if (!document.getElementById('xp-animation-style')) {
    const style = document.createElement('style');
    style.id = 'xp-animation-style';
    style.textContent = `
      @keyframes slideInXP {
        from { 
          transform: translateX(100%) scale(0.8); 
          opacity: 0; 
        }
        to { 
          transform: translateX(0) scale(1); 
          opacity: 1; 
        }
      }
      @keyframes slideOutXP {
        from { 
          transform: translateX(0) scale(1); 
          opacity: 1; 
        }
        to { 
          transform: translateX(100%) scale(0.8); 
          opacity: 0; 
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notification);
  
  // Auto remove after 4 seconds with animation
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOutXP 0.3s ease-in forwards';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }
  }, 4000);
}

/**
 * Simple utility to check if user should get XP
 * Can be extended later for cooldowns, limits, etc.
 */
export function shouldGiveXP(_questionId: number): boolean {
  // For now, always give XP
  // Can add logic later for:
  // - Daily limits
  // - Question cooldowns  
  // - User level restrictions
  return true;
}

/**
 * Get XP amount for question completion
 * Simple flat rate for now
 */
export function getQuestionXPAmount(): number {
  return 10; // Simple flat 10 XP per question
}
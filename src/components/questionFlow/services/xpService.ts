import { XPService } from '../../../services/xpService';
import { auth } from '../../../config/firebase';

// ==========================================
// XP SERVICE INTEGRATION
// ==========================================

export async function recordQuestionXP(
  questionId: number, 
  selectedAlternative: string, 
  isCorrect: boolean
): Promise<void> {
  try {
    const user = auth.currentUser;
    if (!user) return;

    const result = await XPService.recordActivity(
      user.uid, 
      isCorrect ? 'question_correct' : 'question_incorrect',
      {
        questionId: questionId.toString(),
        selectedAlternative,
        isCorrect
      }
    );
    
    // Show visual notification
    showXPNotification(result.xpGained, isCorrect, result.leveledUp);
  } catch (error) {
    // Silent error to not break user experience
  }
}

function showXPNotification(xpGained: number, isCorrect: boolean, leveledUp: boolean): void {
  const notification = document.createElement('div');
  notification.innerHTML = `
    <div style="
      position: fixed; 
      top: 20px; 
      right: 20px; 
      background: ${isCorrect ? '#10B981' : '#F59E0B'}; 
      color: white; 
      padding: 15px 20px; 
      border-radius: 8px; 
      box-shadow: 0 4px 15px rgba(0,0,0,0.2); 
      z-index: 9999;
      font-weight: bold;
      animation: slideIn 0.3s ease-out;
    ">
      ${isCorrect ? '🎉' : '📚'} +${xpGained} XP ${isCorrect ? '(Correto!)' : '(Prática!)'}<br>
      <small>Questão respondida${leveledUp ? ' - LEVEL UP! 🎊' : ''}</small>
    </div>
  `;
  
  // Add animation CSS if not exists
  if (!document.getElementById('xp-animation-style')) {
    const style = document.createElement('style');
    style.id = 'xp-animation-style';
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notification);
  
  // Remove after 4 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 4000);
}
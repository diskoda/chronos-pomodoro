import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface SubmissionFeedbackProps {
  isVisible: boolean;
  message?: string;
  type?: 'success' | 'error' | 'warning';
}

export default function SubmissionFeedback({ 
  isVisible, 
  message = "Resposta enviada!", 
  type = 'success' 
}: SubmissionFeedbackProps) {
  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          textColor: 'text-green-700 dark:text-green-300',
          Icon: CheckCircle
        };
      case 'error':
        return {
          textColor: 'text-red-700 dark:text-red-300',
          Icon: XCircle
        };
      case 'warning':
        return {
          textColor: 'text-yellow-700 dark:text-yellow-300',
          Icon: AlertCircle
        };
      default:
        return {
          textColor: 'text-green-700 dark:text-green-300',
          Icon: CheckCircle
        };
    }
  };

  const { textColor, Icon } = getTypeStyles();

  return (
    <div className={`flex items-center space-x-2 ${textColor} font-medium`}>
      <Icon className="h-5 w-5" />
      <span>{message}</span>
    </div>
  );
}
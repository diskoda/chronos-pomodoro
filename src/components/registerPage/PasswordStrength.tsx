import { Check, X } from 'lucide-react';

interface PasswordStrengthProps {
  password: string;
  show: boolean;
}

export default function PasswordStrength({ password, show }: PasswordStrengthProps) {
  const requirements = [
    { text: 'Pelo menos 6 caracteres', met: password.length >= 6 },
    { text: 'Contém letra maiúscula', met: /[A-Z]/.test(password) },
    { text: 'Contém letra minúscula', met: /[a-z]/.test(password) },
    { text: 'Contém número', met: /\d/.test(password) }
  ];

  if (!show || !password) return null;

  return (
    <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <p className="text-sm font-medium theme-text-primary mb-2">Força da senha:</p>
      <div className="space-y-1">
        {requirements.map((req, index) => (
          <div key={index} className="flex items-center space-x-2">
            {req.met ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <X className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-xs ${req.met ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {req.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
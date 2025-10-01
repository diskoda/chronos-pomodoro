import { Clock, Target, BookOpen } from 'lucide-react';

interface CaseInfoProps {
  estimatedTime: number;
  specialties: string[];
  objectivesCount: number;
}

export default function CaseInfo({ estimatedTime, specialties, objectivesCount }: CaseInfoProps) {
  return (
    <div className="space-y-3 mb-6">
      <div className="flex items-center space-x-2 text-gray-300">
        <Clock className="w-4 h-4 text-blue-400" />
        <span className="text-sm">{estimatedTime} minutos</span>
      </div>

      <div className="flex items-center space-x-2 text-gray-300">
        <Target className="w-4 h-4 text-green-400" />
        <span className="text-sm">{specialties.join(', ')}</span>
      </div>

      <div className="flex items-center space-x-2 text-gray-300">
        <BookOpen className="w-4 h-4 text-purple-400" />
        <span className="text-sm">{objectivesCount} objetivos</span>
      </div>
    </div>
  );
}
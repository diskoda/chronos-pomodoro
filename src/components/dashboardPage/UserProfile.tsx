import { User, Mail, MapPin, Calendar, Award, Clock } from 'lucide-react';

export default function UserProfile() {
  return (
    <div className="theme-card rounded-lg">
      <div className="p-6 border-b theme-border">
        <h3 className="font-semibold theme-text-primary">Perfil do Usuário</h3>
      </div>
      <div className="p-6">
        {/* Avatar and Basic Info */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h4 className="text-lg font-semibold theme-text-primary">Dr. Samuel Silva</h4>
            <p className="text-sm theme-text-secondary">Residente em Pediatria</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4 theme-text-tertiary" />
            <span className="text-sm theme-text-secondary">samuel.silva@hospital.med.br</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-4 h-4 theme-text-tertiary" />
            <span className="text-sm theme-text-secondary">Hospital Pediátrico - São Paulo</span>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="w-4 h-4 theme-text-tertiary" />
            <span className="text-sm theme-text-secondary">Membro desde Jan 2024</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 theme-bg-secondary rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-2xl font-bold theme-text-primary">247h</p>
            <p className="text-xs theme-text-secondary">Total de Estudo</p>
          </div>
          <div className="text-center p-3 theme-bg-secondary rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Award className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            </div>
            <p className="text-2xl font-bold theme-text-primary">15</p>
            <p className="text-xs theme-text-secondary">Conquistas</p>
          </div>
        </div>

        {/* Specialization Progress */}
        <div className="space-y-3">
          <h5 className="font-medium theme-text-primary text-sm">Especialização</h5>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs theme-text-secondary">Pediatria Geral</span>
              <span className="text-xs font-medium text-green-600 dark:text-green-400">Avançado</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div className="bg-green-500 h-1.5 rounded-full" style={{width: '85%'}}></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs theme-text-secondary">Emergências</span>
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Intermediário</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div className="bg-blue-500 h-1.5 rounded-full" style={{width: '72%'}}></div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-4 border-t theme-border">
          <button className="w-full theme-bg-secondary theme-text-primary py-2 px-4 rounded-lg font-medium hover:theme-bg-tertiary transition-colors text-sm">
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
  );
}
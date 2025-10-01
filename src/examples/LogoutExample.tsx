import { useAuth } from '../contexts/AuthContext';
import { LogoutButton, UserMenu } from '../components/common';

export default function SimpleLogoutExample() {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header com menu do usuário */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold">Minha Aplicação</h1>
            
            {/* Menu do usuário com logout */}
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Bem-vindo!</h2>
          
          {currentUser && (
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                Logado como: <strong>{currentUser.email}</strong>
              </p>
              {currentUser.displayName && (
                <p className="text-gray-600 dark:text-gray-400">
                  Nome: <strong>{currentUser.displayName}</strong>
                </p>
              )}
            </div>
          )}

          <div className="space-y-4">
            <h3 className="font-medium">Opções de Logout:</h3>
            
            {/* Diferentes variações do botão de logout */}
            <div className="flex flex-wrap gap-4">
              <LogoutButton variant="primary" />
              <LogoutButton variant="secondary" />
              <LogoutButton variant="text" />
            </div>

            <div className="flex flex-wrap gap-4">
              <LogoutButton variant="primary" size="sm" />
              <LogoutButton variant="secondary" size="md" />
              <LogoutButton variant="text" size="lg" />
            </div>

            <div className="flex flex-wrap gap-4">
              <LogoutButton variant="primary" showIcon={false} />
              <LogoutButton variant="secondary" showIcon={true} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
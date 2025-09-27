import ThemeSelector from '../common/ThemeSelector';

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div className="min-h-screen theme-bg-secondary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Theme Selector */}
      <div className="absolute top-4 right-4">
        <ThemeSelector />
      </div>
      
      <div className="max-w-md w-full space-y-8">
        {children}
      </div>
    </div>
  );
}
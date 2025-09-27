import ThemeSelector from '../common/ThemeSelector';

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div className="page-container relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-screen login-background">
      {/* Theme Selector */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeSelector />
      </div>
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        {children}
      </div>
    </div>
  );
}
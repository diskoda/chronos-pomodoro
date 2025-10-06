interface LoginLayoutProps {
  children: React.ReactNode;
  updatesSlider?: React.ReactNode;
}

export default function LoginLayout({ children, updatesSlider }: LoginLayoutProps) {
  return (
    <div className="page-container relative min-h-screen login-background">
      {/* Main Container */}
      <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Login Form Side */}
          <div className="max-w-md w-full mx-auto space-y-8 relative z-10">
            {children}
          </div>

          {/* Updates Slider Side */}
          {updatesSlider && (
            <div className="hidden lg:block">
              <div className="max-w-lg mx-auto">
                {updatesSlider}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import type { ReactNode } from 'react';
import ThemeSelector from '../common/ThemeSelector';

interface RegisterLayoutProps {
  children: ReactNode;
  updatesSlider?: ReactNode;
}

export default function RegisterLayout({ children, updatesSlider }: RegisterLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 relative">
      {/* Theme Selector */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeSelector />
      </div>
      
      {/* Main Container */}
      <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Register Form Side */}
          <div className="max-w-md w-full mx-auto">
            <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
              {children}
            </div>
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
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Shield } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="gov-header sticky top-0 z-50 w-full border-b border-white/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-lg backdrop-blur-sm">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                {t('social_support')}
              </h1>
              <p className="text-sm text-white/80 hidden sm:block">
                Government Financial Assistance Portal
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-white/80">
              <FileText className="w-4 h-4" />
              <span className="text-sm">Application Form</span>
            </div>
            
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
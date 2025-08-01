import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, CheckCircle2, Home } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useToast } from '../hooks/use-toast';
import Header from './Header';
import ProgressBar from './ProgressBar';
import PersonalInfoForm from './forms/PersonalInfoForm';
import FamilyFinancialForm from './forms/FamilyFinancialForm';
import SituationDescriptionsForm from './forms/SituationDescriptionsForm';
import { FormProvider, useForm } from '../contexts/FormContext';

const SocialSupportAppContent: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { state, setCurrentStep, saveProgress, loadSavedData, resetForm } = useForm();
  const { currentStep } = state.data;
const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Check for saved data on mount
    const savedData = localStorage.getItem('social_support_form_data');
    if (savedData) {
      loadSavedData();
      toast({
        title: t('data_loaded'),
        description: "Your previous progress has been restored.",
      });
    }
  }, []);

  const handleNext = () => {
    saveProgress();
    setCurrentStep(currentStep + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleComplete = () => {
    setShowSuccess(true);
    // Clear saved data after successful submission
    localStorage.removeItem('social_support_form_data');
  };

  const handleSaveProgress = () => {
    saveProgress();
    toast({
      title: t('progress_saved'),
      description: "Your progress has been saved successfully.",
    });
  };

  const handleStartOver = () => {
    resetForm();
    setShowSuccess(false);
    setCurrentStep(1);
    toast({
      title: "Form Reset",
      description: "You can now start a new application.",
    });
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-light/10 to-accent/5">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center p-8 gov-card">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-status-success/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-status-success" />
                </div>
                <CardTitle className="text-2xl text-status-success">
                  {t('application_submitted')}
                </CardTitle>
                <CardDescription className="text-lg mt-2">
                  Thank you for submitting your application for social support assistance.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">What happens next?</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 text-left">
                    <li>• You will receive a confirmation email within 24 hours</li>
                    <li>• Our team will review your application within 5-7 business days</li>
                    <li>• You may be contacted for additional information if needed</li>
                    <li>• Final decision will be communicated via email and mail</li>
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={handleStartOver}
                    variant="outline"
                    className="focus-ring"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Submit Another Application
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/10 to-accent/5">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ProgressBar />
          
          {/* Save Progress Button */}
          <div className="flex justify-end mb-6">
            <Button
              variant="outline"
              onClick={handleSaveProgress}
              className="focus-ring"
              disabled={state.isLoading}
            >
              <Save className="w-4 h-4 mr-2" />
              {t('save_progress')}
            </Button>
          </div>

          {/* Form Steps */}
          <div className="space-y-6">
            {currentStep === 1 && (
              <PersonalInfoForm onNext={handleNext} />
            )}
            
            {currentStep === 2 && (
              <FamilyFinancialForm
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            )}
            
            {currentStep === 3 && (
              <SituationDescriptionsForm
                onPrevious={handlePrevious}
                onComplete={handleComplete}
              />
            )}
          </div>

          {/* Help Section */}
          <div className="mt-12 max-w-2xl mx-auto">
            <Card className="bg-accent/5 border-accent/20">
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
                <CardDescription>
                  If you have questions about this application or need assistance, please contact us.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Phone Support:</strong><br />
                    1-800-SUPPORT (1-800-786-7678)<br />
                    Mon-Fri: 8:00 AM - 6:00 PM
                  </div>
                  <div>
                    <strong>Email Support:</strong><br />
                    support@socialassistance.gov<br />
                    Response within 24 hours
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Accessibility Notice */}
          <div className="mt-8 text-center text-xs text-muted-foreground">
            <p>
              This application is designed to be accessible. If you need assistance or alternative formats,
              please contact our support team.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

const SocialSupportApp: React.FC = () => {
  return (
    <FormProvider>
      <SocialSupportAppContent />
    </FormProvider>
  );
};

export default SocialSupportApp;
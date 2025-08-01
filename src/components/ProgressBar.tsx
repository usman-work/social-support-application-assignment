import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Circle } from 'lucide-react';
import { useForm } from '../contexts/FormContext';

const ProgressBar: React.FC = () => {
  const { t } = useTranslation();
  const { state, setCurrentStep } = useForm();
  const { currentStep, completedSteps } = state.data;

  const steps = [
    { number: 1, title: t('personal_information') },
    { number: 2, title: t('family_financial_info') },
    { number: 3, title: t('situation_descriptions') },
  ];

  const getStepStatus = (stepNumber: number) => {
    if (completedSteps.includes(stepNumber)) return 'completed';
    if (stepNumber === currentStep) return 'active';
    return 'inactive';
  };

  const handleStepClick = (stepNumber: number) => {
    setCurrentStep(stepNumber);
  };

  const progressPercentage = Math.round(((currentStep - 1) / (steps.length - 1)) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 px-4">
      {/* Progress Title */}
      <div className="mb-6 text-center">
        <h2 className="text-lg font-semibold text-foreground mb-2">
          {t('step')} {currentStep} {t('of')} {steps.length}
        </h2>
        <div className="text-sm text-muted-foreground" aria-live="polite">
          {t('form_progress', { percent: Math.round((completedSteps.length / steps.length) * 100) })}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={t('form_progress', { percent: progressPercentage })}
          />
        </div>
      </div>

      {/* Step Indicators - Desktop */}
      <div className="hidden sm:flex justify-center items-center gap-2 md:gap-8">
        {steps.map((step, index) => {
          const status = getStepStatus(step.number);
          const isLast = index === steps.length - 1;

          return (
            <div key={step.number} className="flex items-center">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <button
                  className={`step-indicator ${status} cursor-pointer hover:scale-110 transition-transform`}
                  onClick={() => handleStepClick(step.number)}
                  role="button"
                  aria-label={
                    status === 'completed' 
                      ? t('step_completed')
                      : status === 'active'
                      ? t('step_current')
                      : t('step_pending')
                  }
                >
                  {status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>
                
                {/* Step Title */}
                <div className="mt-3 text-center max-w-[80px] md:max-w-[120px]">
                  <div
                    className={`text-xs md:text-sm font-medium ${
                      status === 'active' 
                        ? 'text-primary' 
                        : status === 'completed'
                        ? 'text-accent'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {step.title}
                  </div>
                </div>
              </div>

              {/* Connecting Line */}
              {!isLast && (
                <div 
                  className={`w-8 md:w-16 h-0.5 mx-2 md:mx-4 ${
                    step.number < currentStep || completedSteps.includes(step.number + 1)
                      ? 'bg-primary' 
                      : 'bg-border'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Step Indicator */}
      <div className="sm:hidden mt-4 flex justify-center space-x-3">
        {steps.map((step) => (
          <button
            key={step.number}
            onClick={() => handleStepClick(step.number)}
            className={`w-3 h-3 rounded-full transition-all ${
              getStepStatus(step.number) === 'completed'
                ? 'bg-accent'
                : getStepStatus(step.number) === 'active'
                ? 'bg-primary'
                : 'bg-border'
            }`}
            aria-label={`${t('step')} ${step.number}: ${step.title}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
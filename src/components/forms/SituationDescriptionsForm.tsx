import React, { useState } from 'react';
import { useForm as useReactHookForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FileText, Bot, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useForm } from '../../contexts/FormContext';
import { SituationDescriptions } from '../../contexts/FormContext';
import { submitApplication, validateFormData } from '../../services/api';
import { useToast } from '../../hooks/use-toast';
import AIAssistanceModal from '../AIAssistanceModal';

interface SituationDescriptionsFormProps {
  onPrevious: () => void;
  onComplete: () => void;
}

const SituationDescriptionsForm: React.FC<SituationDescriptionsFormProps> = ({ onPrevious, onComplete }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { state, updateSituationDescriptions, addCompletedStep, setLoading, setError } = useForm();
  const { situationDescriptions } = state.data;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [currentAiField, setCurrentAiField] = useState<string>('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useReactHookForm<SituationDescriptions>({
    defaultValues: situationDescriptions,
    mode: 'onChange',
  });

  const watchedValues = watch();

  React.useEffect(() => {
    updateSituationDescriptions(watchedValues);
  }, [watchedValues, updateSituationDescriptions]);

  const handleAIAssistance = (fieldType: string) => {
    setCurrentAiField(fieldType);
    setAiModalOpen(true);
  };

  const handleAIAccept = (suggestion: string) => {
    setValue(currentAiField as keyof SituationDescriptions, suggestion);
    setAiModalOpen(false);
  };

  const onSubmit = async (data: SituationDescriptions) => {
    setIsSubmitting(true);
    setLoading(true);
    setError(null);

    try {
      // Update the context with final data
      updateSituationDescriptions(data);
      addCompletedStep(3);

      // Validate the complete form data
      const validation = validateFormData(state.data);
      
      if (!validation.isValid) {
        toast({
          title: "Validation Error",
          description: validation.errors.join(', '),
          variant: "destructive",
        });
        return;
      }

      // Submit the application
      const response = await submitApplication(state.data);

      if (response.success) {
        toast({
          title: "Success!",
          description: response.message,
        });
        onComplete();
      } else {
        throw new Error(response.error || 'Submission failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      toast({
        title: "Submission Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const textFields = [
    {
      id: 'currentFinancialSituation',
      label: t('current_financial_situation'),
      placeholder: t('placeholder_financial_situation'),
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: 'employmentCircumstances',
      label: t('employment_circumstances'),
      placeholder: t('placeholder_employment'),
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: 'reasonForApplying',
      label: t('reason_for_applying'),
      placeholder: t('placeholder_reason'),
      icon: <FileText className="w-4 h-4" />,
    },
  ];

  return (
    <div className="form-slide-in">
      <Card className="gov-form">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-primary" />
            <span>{t('situation_descriptions')}</span>
          </CardTitle>
          <CardDescription>
            Please describe your situation in detail. You can use AI assistance to help write your responses.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {textFields.map((field) => (
              <div key={field.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor={field.id} className="text-sm font-medium flex items-center space-x-2">
                    {field.icon}
                    <span>{field.label} <span className="text-destructive">*</span></span>
                  </Label>
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleAIAssistance(field.id)}
                    className="text-xs ai-pulse focus-ring"
                  >
                    <Bot className="w-3 h-3 mr-1" />
                    {t('help_me_write')}
                  </Button>
                </div>

                <Textarea
                  id={field.id}
                  {...register(field.id as keyof SituationDescriptions, {
                    required: t('field_required'),
                    minLength: { value: 50, message: t('min_length', { count: 50 }) },
                  })}
                  placeholder={field.placeholder}
                  rows={6}
                  className="resize-none focus-ring"
                  aria-invalid={errors[field.id as keyof SituationDescriptions] ? 'true' : 'false'}
                />
                
                {errors[field.id as keyof SituationDescriptions] && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors[field.id as keyof SituationDescriptions]?.message}
                  </p>
                )}

                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Minimum 50 characters required</span>
                  <span>
                    {watchedValues[field.id as keyof SituationDescriptions]?.length || 0} characters
                  </span>
                </div>
              </div>
            ))}

            {/* Form Actions */}
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onPrevious}
                disabled={isSubmitting}
                className="min-w-[120px] focus-ring"
              >
                {t('previous')}
              </Button>
              
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="min-w-[140px] focus-ring"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {t('submit')}
                  </>
                )}
              </Button>
            </div>

            {/* Progress indicator */}
            {isSubmitting && (
              <div className="text-center py-4">
                <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing your application...</span>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      <AIAssistanceModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        fieldType={currentAiField}
        currentValue={watchedValues[currentAiField as keyof SituationDescriptions] || ''}
        onAccept={handleAIAccept}
      />
    </div>
  );
};

export default SituationDescriptionsForm;
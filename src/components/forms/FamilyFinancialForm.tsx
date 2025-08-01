import React from 'react';
import { useForm as useReactHookForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Users, DollarSign, Briefcase, Home } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useForm } from '../../contexts/FormContext';
import { FamilyFinancialInfo } from '../../contexts/FormContext';

interface FamilyFinancialFormProps {
  onNext: () => void;
  onPrevious: () => void;
}

const FamilyFinancialForm: React.FC<FamilyFinancialFormProps> = ({ onNext, onPrevious }) => {
  const { t } = useTranslation();
  const { state, updateFamilyFinancialInfo, addCompletedStep } = useForm();
  const { familyFinancialInfo } = state.data;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useReactHookForm<FamilyFinancialInfo>({
    defaultValues: familyFinancialInfo,
    mode: 'onChange',
  });

  const watchedValues = watch();

  React.useEffect(() => {
    updateFamilyFinancialInfo(watchedValues);
  }, [watchedValues, updateFamilyFinancialInfo]);

  const onSubmit = (data: FamilyFinancialInfo) => {
    updateFamilyFinancialInfo(data);
    addCompletedStep(2);
    onNext();
  };

  const maritalStatusOptions = [
    { value: 'single', label: t('single') },
    { value: 'married', label: t('married') },
    { value: 'divorced', label: t('divorced') },
    { value: 'widowed', label: t('widowed') },
  ];

  const employmentStatusOptions = [
    { value: 'employed', label: t('employed') },
    { value: 'unemployed', label: t('unemployed') },
    { value: 'self_employed', label: t('self_employed') },
    { value: 'retired', label: t('retired') },
    { value: 'student', label: t('student') },
    { value: 'disabled', label: t('disabled') },
  ];

  const housingStatusOptions = [
    { value: 'owned', label: t('owned') },
    { value: 'rented', label: t('rented') },
    { value: 'living_with_family', label: t('living_with_family') },
    { value: 'homeless', label: t('homeless') },
    { value: 'temporary_housing', label: t('temporary_housing') },
  ];

  return (
    <div className="form-slide-in">
      <Card className="gov-form">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-primary" />
            <span>{t('family_financial_info')}</span>
          </CardTitle>
          <CardDescription>
            Please provide information about your family and financial situation.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Family Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-primary">
                <Users className="w-4 h-4" />
                <h3 className="font-medium">Family Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maritalStatus" className="text-sm font-medium">
                    {t('marital_status')} <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={watchedValues.maritalStatus || ''}
                    onValueChange={(value) => setValue('maritalStatus', value)}
                  >
                    <SelectTrigger className="focus-ring" aria-invalid={errors.maritalStatus ? 'true' : 'false'}>
                      <SelectValue placeholder="Select marital status" />
                    </SelectTrigger>
                    <SelectContent>
                      {maritalStatusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.maritalStatus && (
                    <p className="text-sm text-destructive" role="alert">
                      {t('field_required')}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dependents" className="text-sm font-medium">
                    {t('dependents')} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="dependents"
                    type="number"
                    min="0"
                    max="20"
                    {...register('dependents', {
                      required: t('field_required'),
                      min: { value: 0, message: 'Cannot be negative' },
                      max: { value: 20, message: 'Maximum 20 dependents' },
                    })}
                    placeholder="Number of dependents"
                    className="focus-ring"
                    aria-invalid={errors.dependents ? 'true' : 'false'}
                  />
                  {errors.dependents && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors.dependents.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Employment Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-primary">
                <Briefcase className="w-4 h-4" />
                <h3 className="font-medium">Employment Information</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employmentStatus" className="text-sm font-medium">
                  {t('employment_status')} <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={watchedValues.employmentStatus || ''}
                  onValueChange={(value) => setValue('employmentStatus', value)}
                >
                  <SelectTrigger className="focus-ring" aria-invalid={errors.employmentStatus ? 'true' : 'false'}>
                    <SelectValue placeholder="Select employment status" />
                  </SelectTrigger>
                  <SelectContent>
                    {employmentStatusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.employmentStatus && (
                  <p className="text-sm text-destructive" role="alert">
                    {t('field_required')}
                  </p>
                )}
              </div>
            </div>

            {/* Financial Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-primary">
                <DollarSign className="w-4 h-4" />
                <h3 className="font-medium">Financial Information</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyIncome" className="text-sm font-medium">
                  {t('monthly_income')} (USD) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  min="0"
                  step="0.01"
                  {...register('monthlyIncome', {
                    required: t('field_required'),
                    min: { value: 0, message: 'Income cannot be negative' },
                  })}
                  placeholder="Enter your monthly income"
                  className="focus-ring"
                  aria-invalid={errors.monthlyIncome ? 'true' : 'false'}
                />
                {errors.monthlyIncome && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.monthlyIncome.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Include all sources of income (salary, benefits, etc.)
                </p>
              </div>
            </div>

            {/* Housing Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-primary">
                <Home className="w-4 h-4" />
                <h3 className="font-medium">Housing Information</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="housingStatus" className="text-sm font-medium">
                  {t('housing_status')} <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={watchedValues.housingStatus || ''}
                  onValueChange={(value) => setValue('housingStatus', value)}
                >
                  <SelectTrigger className="focus-ring" aria-invalid={errors.housingStatus ? 'true' : 'false'}>
                    <SelectValue placeholder="Select housing status" />
                  </SelectTrigger>
                  <SelectContent>
                    {housingStatusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.housingStatus && (
                  <p className="text-sm text-destructive" role="alert">
                    {t('field_required')}
                  </p>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onPrevious}
                className="min-w-[120px] focus-ring"
              >
                {t('previous')}
              </Button>
              
              <Button
                type="submit"
                disabled={!isValid}
                className="min-w-[120px] focus-ring"
              >
                {t('next')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FamilyFinancialForm;
import React from 'react';
import { useForm as useReactHookForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { User, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useForm } from '../../contexts/FormContext';
import { PersonalInfo } from '../../contexts/FormContext';

interface PersonalInfoFormProps {
  onNext: () => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ onNext }) => {
  const { t } = useTranslation();
  const { state, updatePersonalInfo, addCompletedStep } = useForm();
  const { personalInfo } = state.data;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useReactHookForm<PersonalInfo>({
    defaultValues: personalInfo,
    mode: 'onChange',
  });

  const watchedValues = watch();

  React.useEffect(() => {
    updatePersonalInfo(watchedValues);
  }, [watchedValues, updatePersonalInfo]);

  const onSubmit = (data: PersonalInfo) => {
    updatePersonalInfo(data);
    addCompletedStep(1);
    onNext();
  };

  const genderOptions = [
    { value: 'male', label: t('male') },
    { value: 'female', label: t('female') },
    { value: 'other', label: t('other') },
    { value: 'prefer_not_to_say', label: t('prefer_not_to_say') },
  ];

  return (
    <div className="form-slide-in">
      <Card className="gov-form">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5 text-primary" />
            <span>{t('personal_information')}</span>
          </CardTitle>
          <CardDescription>
            Please provide your personal information to begin your application.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name and National ID Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium">
                  {t('full_name')} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="fullName"
                  {...register('fullName', {
                    required: t('field_required'),
                    minLength: { value: 2, message: t('min_length', { count: 2 }) },
                  })}
                  placeholder={t('placeholder_name')}
                  className="focus-ring"
                  aria-invalid={errors.fullName ? 'true' : 'false'}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="nationalId" className="text-sm font-medium">
                  {t('national_id')} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="nationalId"
                  {...register('nationalId', {
                    required: t('field_required'),
                    minLength: { value: 5, message: t('min_length', { count: 5 }) },
                  })}
                  placeholder="Enter your national ID"
                  className="focus-ring"
                  aria-invalid={errors.nationalId ? 'true' : 'false'}
                />
                {errors.nationalId && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.nationalId.message}
                  </p>
                )}
              </div>
            </div>

            {/* Date of Birth and Gender Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-sm font-medium">
                  {t('date_of_birth')} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  {...register('dateOfBirth', { required: t('field_required') })}
                  className="focus-ring"
                  aria-invalid={errors.dateOfBirth ? 'true' : 'false'}
                />
                {errors.dateOfBirth && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="text-sm font-medium">
                  {t('gender')} <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={watchedValues.gender || ''}
                  onValueChange={(value) => setValue('gender', value)}
                >
                  <SelectTrigger className="focus-ring" aria-invalid={errors.gender ? 'true' : 'false'}>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genderOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-sm text-destructive" role="alert">
                    {t('field_required')}
                  </p>
                )}
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-primary">
                <MapPin className="w-4 h-4" />
                <h3 className="font-medium">Address Information</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium">
                  {t('address')} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="address"
                  {...register('address', { required: t('field_required') })}
                  placeholder={t('placeholder_address')}
                  className="focus-ring"
                  aria-invalid={errors.address ? 'true' : 'false'}
                />
                {errors.address && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-medium">
                    {t('city')} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="city"
                    {...register('city', { required: t('field_required') })}
                    placeholder={t('placeholder_city')}
                    className="focus-ring"
                    aria-invalid={errors.city ? 'true' : 'false'}
                  />
                  {errors.city && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-medium">
                    {t('state')} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="state"
                    {...register('state', { required: t('field_required') })}
                    placeholder="Enter your state"
                    className="focus-ring"
                    aria-invalid={errors.state ? 'true' : 'false'}
                  />
                  {errors.state && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors.state.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country" className="text-sm font-medium">
                    {t('country')} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="country"
                    {...register('country', { required: t('field_required') })}
                    placeholder="Enter your country"
                    className="focus-ring"
                    aria-invalid={errors.country ? 'true' : 'false'}
                  />
                  {errors.country && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-primary">
                <Phone className="w-4 h-4" />
                <h3 className="font-medium">Contact Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    {t('phone')} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register('phone', {
                      required: t('field_required'),
                      pattern: {
                        value: /^[\+]?[1-9][\d]{0,15}$/,
                        message: t('invalid_phone'),
                      },
                    })}
                    placeholder={t('placeholder_phone')}
                    className="focus-ring"
                    aria-invalid={errors.phone ? 'true' : 'false'}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    {t('email')} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: t('field_required'),
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: t('invalid_email'),
                      },
                    })}
                    placeholder={t('placeholder_email')}
                    className="focus-ring"
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end pt-6">
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

export default PersonalInfoForm;
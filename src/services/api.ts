import axios from 'axios';
import { FormData } from '../contexts/FormContext';

export interface SubmissionResponse {
  success: boolean;
  applicationId?: string;
  message: string;
  error?: string;
}

// Mock API service for demonstration
// In a real implementation, this would connect to your backend API
export async function submitApplication(formData: FormData): Promise<SubmissionResponse> {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate random success/failure for demonstration
    const shouldSucceed = Math.random() > 0.1; // 90% success rate

    if (!shouldSucceed) {
      throw new Error('Simulated API error');
    }

    // Generate mock application ID
    const applicationId = `APP-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    // Mock successful response
    return {
      success: true,
      applicationId,
      message: 'Your application has been submitted successfully. You will receive a confirmation email shortly.',
    };

    // Uncomment this section when you have a real backend API
    /*
    const response = await axios.post('/api/applications', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 second timeout
    });

    return {
      success: true,
      applicationId: response.data.applicationId,
      message: response.data.message || 'Application submitted successfully',
    };
    */

  } catch (error) {
    console.error('Application submission error:', error);

    let errorMessage = 'Failed to submit application. Please try again.';

    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please check your connection and try again.';
      } else if (error.response?.status === 400) {
        errorMessage = 'Invalid application data. Please review your information and try again.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
    }

    return {
      success: false,
      message: errorMessage,
      error: errorMessage,
    };
  }
}

// Function to validate form data before submission
export function validateFormData(formData: FormData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate personal information
  const { personalInfo } = formData;
  if (!personalInfo.fullName.trim()) errors.push('Full name is required');
  if (!personalInfo.nationalId.trim()) errors.push('National ID is required');
  if (!personalInfo.dateOfBirth) errors.push('Date of birth is required');
  if (!personalInfo.gender) errors.push('Gender is required');
  if (!personalInfo.address.trim()) errors.push('Address is required');
  if (!personalInfo.city.trim()) errors.push('City is required');
  if (!personalInfo.state.trim()) errors.push('State is required');
  if (!personalInfo.country.trim()) errors.push('Country is required');
  if (!personalInfo.phone.trim()) errors.push('Phone number is required');
  if (!personalInfo.email.trim()) errors.push('Email address is required');

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (personalInfo.email && !emailRegex.test(personalInfo.email)) {
    errors.push('Please enter a valid email address');
  }

  // Validate family and financial information
  const { familyFinancialInfo } = formData;
  if (!familyFinancialInfo.maritalStatus) errors.push('Marital status is required');
  if (!familyFinancialInfo.employmentStatus) errors.push('Employment status is required');
  if (!familyFinancialInfo.housingStatus) errors.push('Housing status is required');

  // Validate situation descriptions
  const { situationDescriptions } = formData;
  if (!situationDescriptions.currentFinancialSituation.trim()) {
    errors.push('Current financial situation description is required');
  }
  if (!situationDescriptions.employmentCircumstances.trim()) {
    errors.push('Employment circumstances description is required');
  }
  if (!situationDescriptions.reasonForApplying.trim()) {
    errors.push('Reason for applying description is required');
  }

  // Check minimum length for text fields
  if (situationDescriptions.currentFinancialSituation.length < 50) {
    errors.push('Financial situation description must be at least 50 characters');
  }
  if (situationDescriptions.employmentCircumstances.length < 50) {
    errors.push('Employment circumstances description must be at least 50 characters');
  }
  if (situationDescriptions.reasonForApplying.length < 50) {
    errors.push('Reason for applying description must be at least 50 characters');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
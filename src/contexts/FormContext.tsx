import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface PersonalInfo {
  fullName: string;
  nationalId: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
}

export interface FamilyFinancialInfo {
  maritalStatus: string;
  dependents: number;
  employmentStatus: string;
  monthlyIncome: number;
  housingStatus: string;
}

export interface SituationDescriptions {
  currentFinancialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
}

export interface FormData {
  personalInfo: PersonalInfo;
  familyFinancialInfo: FamilyFinancialInfo;
  situationDescriptions: SituationDescriptions;
  currentStep: number;
  completedSteps: number[];
}

interface FormState {
  data: FormData;
  isLoading: boolean;
  error: string | null;
}

type FormAction =
  | { type: 'SET_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
  | { type: 'SET_FAMILY_FINANCIAL_INFO'; payload: Partial<FamilyFinancialInfo> }
  | { type: 'SET_SITUATION_DESCRIPTIONS'; payload: Partial<SituationDescriptions> }
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'ADD_COMPLETED_STEP'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOAD_SAVED_DATA'; payload: FormData }
  | { type: 'RESET_FORM' };

const initialFormData: FormData = {
  personalInfo: {
    fullName: '',
    nationalId: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    country: '',
    phone: '',
    email: '',
  },
  familyFinancialInfo: {
    maritalStatus: '',
    dependents: 0,
    employmentStatus: '',
    monthlyIncome: 0,
    housingStatus: '',
  },
  situationDescriptions: {
    currentFinancialSituation: '',
    employmentCircumstances: '',
    reasonForApplying: '',
  },
  currentStep: 1,
  completedSteps: [],
};

const initialState: FormState = {
  data: initialFormData,
  isLoading: false,
  error: null,
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_PERSONAL_INFO':
      return {
        ...state,
        data: {
          ...state.data,
          personalInfo: { ...state.data.personalInfo, ...action.payload },
        },
      };
    case 'SET_FAMILY_FINANCIAL_INFO':
      return {
        ...state,
        data: {
          ...state.data,
          familyFinancialInfo: { ...state.data.familyFinancialInfo, ...action.payload },
        },
      };
    case 'SET_SITUATION_DESCRIPTIONS':
      return {
        ...state,
        data: {
          ...state.data,
          situationDescriptions: { ...state.data.situationDescriptions, ...action.payload },
        },
      };
    case 'SET_CURRENT_STEP':
      return {
        ...state,
        data: { ...state.data, currentStep: action.payload },
      };
    case 'ADD_COMPLETED_STEP':
      return {
        ...state,
        data: {
          ...state.data,
          completedSteps: state.data.completedSteps.includes(action.payload)
            ? state.data.completedSteps
            : [...state.data.completedSteps, action.payload],
        },
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'LOAD_SAVED_DATA':
      return { ...state, data: action.payload };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
}

interface FormContextType {
  state: FormState;
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  updateFamilyFinancialInfo: (data: Partial<FamilyFinancialInfo>) => void;
  updateSituationDescriptions: (data: Partial<SituationDescriptions>) => void;
  setCurrentStep: (step: number) => void;
  addCompletedStep: (step: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  saveProgress: () => void;
  loadSavedData: () => void;
  resetForm: () => void;
  getTotalSteps: () => number;
  getProgressPercentage: () => number;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const STORAGE_KEY = 'social_support_form_data';

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_SAVED_DATA', payload: parsedData });
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    }
  }, []);

  const updatePersonalInfo = (data: Partial<PersonalInfo>) => {
    dispatch({ type: 'SET_PERSONAL_INFO', payload: data });
  };

  const updateFamilyFinancialInfo = (data: Partial<FamilyFinancialInfo>) => {
    dispatch({ type: 'SET_FAMILY_FINANCIAL_INFO', payload: data });
  };

  const updateSituationDescriptions = (data: Partial<SituationDescriptions>) => {
    dispatch({ type: 'SET_SITUATION_DESCRIPTIONS', payload: data });
  };

  const setCurrentStep = (step: number) => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: step });
  };

  const addCompletedStep = (step: number) => {
    dispatch({ type: 'ADD_COMPLETED_STEP', payload: step });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const saveProgress = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const loadSavedData = () => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_SAVED_DATA', payload: parsedData });
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    }
  };

  const resetForm = () => {
    dispatch({ type: 'RESET_FORM' });
    localStorage.removeItem(STORAGE_KEY);
  };

  const getTotalSteps = () => 3;

  const getProgressPercentage = () => {
    return Math.round((state.data.completedSteps.length / getTotalSteps()) * 100);
  };

  const value: FormContextType = {
    state,
    updatePersonalInfo,
    updateFamilyFinancialInfo,
    updateSituationDescriptions,
    setCurrentStep,
    addCompletedStep,
    setLoading,
    setError,
    saveProgress,
    loadSavedData,
    resetForm,
    getTotalSteps,
    getProgressPercentage,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

export function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}
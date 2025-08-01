import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      "social_support": "Social Support Portal",
      "step": "Step",
      "of": "of",
      "next": "Next",
      "previous": "Previous",
      "submit": "Submit Application",
      "save_progress": "Save Progress",
      "continue": "Continue",
      
      // Steps
      "personal_information": "Personal Information",
      "family_financial_info": "Family & Financial Information",
      "situation_descriptions": "Situation Descriptions",
      
      // Personal Information Fields
      "full_name": "Full Name",
      "national_id": "National ID",
      "date_of_birth": "Date of Birth",
      "gender": "Gender",
      "address": "Address",
      "city": "City",
      "state": "State",
      "country": "Country",
      "phone": "Phone Number",
      "email": "Email Address",
      
      // Gender Options
      "male": "Male",
      "female": "Female",
      "other": "Other",
      "prefer_not_to_say": "Prefer not to say",
      
      // Family & Financial Info Fields
      "marital_status": "Marital Status",
      "dependents": "Number of Dependents",
      "employment_status": "Employment Status",
      "monthly_income": "Monthly Income",
      "housing_status": "Housing Status",
      
      // Marital Status Options
      "single": "Single",
      "married": "Married",
      "divorced": "Divorced",
      "widowed": "Widowed",
      
      // Employment Status Options
      "employed": "Employed",
      "unemployed": "Unemployed",
      "self_employed": "Self-employed",
      "retired": "Retired",
      "student": "Student",
      "disabled": "Disabled",
      
      // Housing Status Options
      "owned": "Owned",
      "rented": "Rented",
      "living_with_family": "Living with family",
      "homeless": "Homeless",
      "temporary_housing": "Temporary housing",
      
      // Situation Descriptions
      "current_financial_situation": "Current Financial Situation",
      "employment_circumstances": "Employment Circumstances",
      "reason_for_applying": "Reason for Applying",
      "help_me_write": "Help Me Write",
      "ai_assistance": "AI Assistance",
      "generating_suggestion": "Generating suggestion...",
      "accept": "Accept",
      "edit": "Edit",
      "discard": "Discard",
      
      // Validation Messages
      "field_required": "This field is required",
      "invalid_email": "Please enter a valid email address",
      "invalid_phone": "Please enter a valid phone number",
      "invalid_national_id": "Please enter a valid national ID",
      "min_length": "Minimum {{count}} characters required",
      
      // Success Messages
      "application_submitted": "Application submitted successfully!",
      "progress_saved": "Progress saved successfully",
      "data_loaded": "Previous data loaded",
      
      // Error Messages
      "submission_error": "Failed to submit application. Please try again.",
      "ai_error": "Failed to generate suggestion. Please try again.",
      "network_error": "Network error. Please check your connection.",
      
      // Accessibility
      "step_completed": "Step completed",
      "step_current": "Current step",
      "step_pending": "Step pending",
      "form_progress": "Form progress: {{percent}}% complete",
      
      // Placeholders
      "placeholder_name": "Enter your full name",
      "placeholder_email": "Enter your email address",
      "placeholder_phone": "Enter your phone number",
      "placeholder_address": "Enter your full address",
      "placeholder_city": "Enter your city",
      "placeholder_financial_situation": "Describe your current financial situation, including income, expenses, and any financial hardships...",
      "placeholder_employment": "Describe your employment circumstances, including job status, work history, and any employment challenges...",
      "placeholder_reason": "Explain why you are applying for financial assistance and how it would help your situation...",
    }
  },
  ar: {
    translation: {
      // Navigation
      "social_support": "بوابة الدعم الاجتماعي",
      "step": "الخطوة",
      "of": "من",
      "next": "التالي",
      "previous": "السابق",
      "submit": "تقديم الطلب",
      "save_progress": "حفظ التقدم",
      "continue": "متابعة",
      
      // Steps
      "personal_information": "المعلومات الشخصية",
      "family_financial_info": "معلومات العائلة والوضع المالي",
      "situation_descriptions": "وصف الحالة",
      
      // Personal Information Fields
      "full_name": "الاسم الكامل",
      "national_id": "رقم الهوية الوطنية",
      "date_of_birth": "تاريخ الميلاد",
      "gender": "الجنس",
      "address": "العنوان",
      "city": "المدينة",
      "state": "المحافظة",
      "country": "البلد",
      "phone": "رقم الهاتف",
      "email": "البريد الإلكتروني",
      
      // Gender Options
      "male": "ذكر",
      "female": "أنثى",
      "other": "آخر",
      "prefer_not_to_say": "أفضل عدم الإفصاح",
      
      // Family & Financial Info Fields
      "marital_status": "الحالة الاجتماعية",
      "dependents": "عدد المعالين",
      "employment_status": "حالة العمل",
      "monthly_income": "الدخل الشهري",
      "housing_status": "حالة السكن",
      
      // Marital Status Options
      "single": "أعزب",
      "married": "متزوج",
      "divorced": "مطلق",
      "widowed": "أرمل",
      
      // Employment Status Options
      "employed": "موظف",
      "unemployed": "عاطل عن العمل",
      "self_employed": "يعمل لحسابه الخاص",
      "retired": "متقاعد",
      "student": "طالب",
      "disabled": "معاق",
      
      // Housing Status Options
      "owned": "ملك",
      "rented": "مستأجر",
      "living_with_family": "يعيش مع العائلة",
      "homeless": "بلا مأوى",
      "temporary_housing": "سكن مؤقت",
      
      // Situation Descriptions
      "current_financial_situation": "الوضع المالي الحالي",
      "employment_circumstances": "ظروف العمل",
      "reason_for_applying": "سبب التقديم",
      "help_me_write": "ساعدني في الكتابة",
      "ai_assistance": "المساعدة الذكية",
      "generating_suggestion": "جاري إنشاء الاقتراح...",
      "accept": "قبول",
      "edit": "تعديل",
      "discard": "إلغاء",
      
      // Validation Messages
      "field_required": "هذا الحقل مطلوب",
      "invalid_email": "يرجى إدخال بريد إلكتروني صحيح",
      "invalid_phone": "يرجى إدخال رقم هاتف صحيح",
      "invalid_national_id": "يرجى إدخال رقم هوية وطنية صحيح",
      "min_length": "الحد الأدنى {{count}} أحرف مطلوبة",
      
      // Success Messages
      "application_submitted": "تم تقديم الطلب بنجاح!",
      "progress_saved": "تم حفظ التقدم بنجاح",
      "data_loaded": "تم تحميل البيانات السابقة",
      
      // Error Messages
      "submission_error": "فشل في تقديم الطلب. يرجى المحاولة مرة أخرى.",
      "ai_error": "فشل في إنشاء الاقتراح. يرجى المحاولة مرة أخرى.",
      "network_error": "خطأ في الشبكة. يرجى التحقق من الاتصال.",
      
      // Accessibility
      "step_completed": "تم إكمال الخطوة",
      "step_current": "الخطوة الحالية",
      "step_pending": "خطوة معلقة",
      "form_progress": "تقدم النموذج: {{percent}}% مكتمل",
      
      // Placeholders
      "placeholder_name": "أدخل اسمك الكامل",
      "placeholder_email": "أدخل بريدك الإلكتروني",
      "placeholder_phone": "أدخل رقم هاتفك",
      "placeholder_address": "أدخل عنوانك الكامل",
      "placeholder_city": "أدخل مدينتك",
      "placeholder_financial_situation": "اوصف وضعك المالي الحالي، بما في ذلك الدخل والمصروفات وأي صعوبات مالية...",
      "placeholder_employment": "اوصف ظروف عملك، بما في ذلك حالة الوظيفة وتاريخ العمل وأي تحديات وظيفية...",
      "placeholder_reason": "اشرح سبب تقدمك للحصول على المساعدة المالية وكيف ستساعد حالتك...",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
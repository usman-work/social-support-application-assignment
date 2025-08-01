import axios from 'axios';

export interface AIAssistanceRequest {
  prompt: string;
  context?: string;
}

export interface AIAssistanceResponse {
  suggestion: string;
  success: boolean;
  error?: string;
}

const OPENAI_API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-3.5-turbo';

// For now, we'll simulate the AI response since we don't have an API key
// In a real implementation, you would use the actual OpenAI API
export async function getAIAssistance(request: AIAssistanceRequest): Promise<AIAssistanceResponse> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock responses based on the prompt context
    const mockResponses = {
      financial: [
        "I am currently facing significant financial hardship due to unexpected medical expenses and reduced income. My monthly expenses exceed my current income by approximately $800, making it difficult to afford basic necessities like food, utilities, and housing. I have exhausted my savings and am struggling to maintain stable living conditions for my family.",
        "My family's financial situation has become increasingly challenging following job loss three months ago. Despite actively seeking employment, I have been unable to secure stable work that matches my previous income level. Our household expenses, including rent, utilities, and childcare, continue to accumulate while our income has dropped significantly.",
        "Due to the recent economic downturn, my small business has experienced a severe decline in revenue, resulting in substantial financial losses. I am currently unable to meet basic business expenses and personal financial obligations, putting my family's livelihood at risk."
      ],
      employment: [
        "I have been unemployed for the past six months after my previous employer downsized operations. Despite submitting numerous job applications and attending interviews, I have not been able to secure employment that provides adequate income to support my family's needs. My skills in retail management and customer service have been impacted by the current job market conditions.",
        "As a single parent, I face challenges in maintaining steady employment due to childcare responsibilities and lack of flexible work arrangements. My previous part-time positions have not provided sufficient income or benefits to support my family's basic needs, creating a cycle of financial instability.",
        "I was recently laid off from my manufacturing job due to company restructuring. At 55 years old, I am experiencing age-related barriers in finding new employment, despite having 25 years of experience in the industry. The transition to new technologies and job market requirements has made it difficult to compete with younger candidates."
      ],
      reason: [
        "I am applying for financial assistance to help bridge the gap between my current income and essential living expenses while I work towards achieving financial stability. This support would enable me to maintain housing, provide adequate nutrition for my family, and continue searching for sustainable employment without the immediate pressure of mounting debt.",
        "The financial assistance would provide crucial support during this transitional period, allowing me to focus on job searching and skills development without compromising my family's basic needs. This temporary support would help prevent homelessness and ensure my children can continue their education in a stable environment.",
        "I am seeking financial assistance to help cover immediate necessities while I rebuild my financial foundation. This support would prevent further debt accumulation and provide the stability needed to pursue long-term solutions, including potential career retraining or business recovery strategies."
      ]
    };

    // Determine response category based on prompt content
    let category: keyof typeof mockResponses = 'financial';
    if (request.prompt.toLowerCase().includes('employment') || request.prompt.toLowerCase().includes('work') || request.prompt.toLowerCase().includes('job')) {
      category = 'employment';
    } else if (request.prompt.toLowerCase().includes('reason') || request.prompt.toLowerCase().includes('applying') || request.prompt.toLowerCase().includes('assistance')) {
      category = 'reason';
    }

    const responses = mockResponses[category];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    // OPEN AI section with prompt details
    /* START **/
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    console.log('OPENAI_KEY', apiKey);
    console.log({env: process.env});
    if (!apiKey) {
      return {
        suggestion: randomResponse,
        success: true
      };
      // throw new Error('OpenAI API key is not configured');
    }

    const response = await axios.post(
      OPENAI_API_ENDPOINT,
      {
        model: MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that helps people write clear, professional descriptions for government social support applications. Provide empathetic, honest, and factual responses that help applicants express their situations clearly while maintaining dignity.'
          },
          {
            role: 'user',
            content: request.prompt + (request.context ? ` Context: ${request.context}` : '')
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      }
    );

    const suggestion = response.data.choices[0]?.message?.content?.trim();
    
    if (!suggestion) {
      throw new Error('No suggestion received from AI service');
    }

    return {
      suggestion,
      success: true
    };
    /* END **/
    
  } catch (error) {
    console.error('AI assistance error:', error);
    
    let errorMessage = 'Failed to generate suggestion. Please try again.';
    
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please try again.';
      } else if (error.response?.status === 401) {
        errorMessage = 'API authentication failed. Please check your API key.';
      } else if (error.response?.status === 429) {
        errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
      } else if (error.response?.status >= 500) {
        errorMessage = 'AI service is temporarily unavailable. Please try again later.';
      }
    }

    return {
      suggestion: '',
      success: false,
      error: errorMessage
    };
  }
}

// Function to generate context-aware prompts
export function generatePrompt(fieldType: string, existingText?: string): string {
  const prompts = {
    currentFinancialSituation: `Help me describe my current financial situation for a government assistance application. I need to explain my income, expenses, and any financial hardships I'm facing. ${existingText ? `Current text: "${existingText}"` : 'Please provide a clear, honest description.'}`,
    
    employmentCircumstances: `Help me describe my employment circumstances for a government assistance application. I need to explain my job status, work history, and any employment challenges I'm facing. ${existingText ? `Current text: "${existingText}"` : 'Please provide a clear, professional description.'}`,
    
    reasonForApplying: `Help me explain why I am applying for government financial assistance and how it would help my situation. I need to clearly articulate my need for support. ${existingText ? `Current text: "${existingText}"` : 'Please provide a compelling, honest explanation.'}`
  };

  return prompts[fieldType as keyof typeof prompts] || 'Help me write a clear, professional description for my application.';
}
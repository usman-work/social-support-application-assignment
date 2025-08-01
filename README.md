# Social Support Application with AI Assistance

A comprehensive government social support portal that allows citizens to apply for financial assistance with intelligent AI-powered writing assistance. Built with React, TypeScript, and modern web technologies.

## 🌟 Features

### Core Features
- **Multi-step Form Wizard**: 3-step application process with intuitive navigation
- **AI Writing Assistance**: OpenAI GPT integration to help users write detailed descriptions
- **Responsive Design**: Fully responsive design optimized for mobile, tablet, and desktop
- **Multilingual Support**: English and Arabic (RTL) language support
- **Accessibility**: ARIA roles, keyboard navigation, and screen reader support
- **Progress Persistence**: Local storage saves progress automatically
- **Form Validation**: Comprehensive client-side validation with helpful error messages

### Form Steps
1. **Personal Information**: Name, National ID, Date of Birth, Gender, Address, Contact Info
2. **Family & Financial Info**: Marital Status, Dependents, Employment, Income, Housing
3. **Situation Descriptions**: Financial situation, Employment circumstances, Reason for applying (with AI assistance)

### AI Integration
- **Smart Suggestions**: Context-aware AI assistance for writing detailed descriptions
- **Interactive Modal**: User-friendly interface to review, edit, and accept AI suggestions
- **Error Handling**: Graceful handling of API timeouts, failures, and rate limits
- **Multiple Prompts**: Different AI prompts based on the type of description needed

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm (install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- OpenAI API Key (optional - mock responses provided for demo)

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables (Optional)**
   ```bash
   # Create .env file for OpenAI API integration
   echo "REACT_APP_OPENAI_API_KEY=your_openai_api_key_here" > .env
   ```
   
   **Note**: The application works with mock AI responses by default. OpenAI API key is only needed for real AI integration.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080` to view the application.

## 🔧 OpenAI API Setup

### Option 1: Use Mock Responses (Default)
The application includes intelligent mock responses that simulate AI assistance. No setup required.

### Option 2: Real OpenAI Integration
1. Get an API key from [OpenAI](https://platform.openai.com/api-keys)
2. Add to environment file:
   ```bash
   # .env
   REACT_APP_OPENAI_API_KEY=sk-your-actual-api-key-here
   ```
3. Uncomment the real API implementation in `src/services/openai.ts`

### API Configuration
- **Endpoint**: `https://api.openai.com/v1/chat/completions`
- **Model**: `gpt-3.5-turbo`
- **Timeout**: 10 seconds
- **Max Tokens**: 300 per request

## 🏗️ Architecture & Technical Decisions

### State Management
- **Context API**: Used for global form state management
- **React Hook Form**: Handles individual step validation and form handling
- **Local Storage**: Persists user progress across sessions

### Design System
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Government-appropriate Design**: Professional blue/navy color scheme suitable for government portals
- **CSS Custom Properties**: Semantic color tokens for consistent theming
- **Responsive Grid**: Mobile-first responsive design approach

### Internationalization
- **React-i18next**: Full i18n support with namespace organization
- **RTL Support**: Complete right-to-left language support for Arabic
- **Dynamic Language Switching**: Runtime language switching with proper direction changes

### Accessibility Features
- **ARIA Labels**: Comprehensive ARIA attributes for screen readers
- **Keyboard Navigation**: Full keyboard accessibility support
- **Focus Management**: Proper focus rings and focus management
- **Semantic HTML**: Use of proper HTML5 semantic elements
- **Color Contrast**: WCAG 2.1 AA compliant color combinations

### Performance Optimizations
- **Code Splitting**: Lazy loading of form components
- **Memoization**: Optimized re-renders with React.memo and useMemo
- **Bundle Optimization**: Tree shaking and optimized builds
- **Image Optimization**: Responsive images with proper sizing

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components (shadcn/ui)
│   ├── forms/                 # Form step components
│   │   ├── PersonalInfoForm.tsx
│   │   ├── FamilyFinancialForm.tsx
│   │   └── SituationDescriptionsForm.tsx
│   ├── Header.tsx             # Application header
│   ├── ProgressBar.tsx        # Multi-step progress indicator
│   ├── LanguageSwitcher.tsx   # Language selection component
│   ├── AIAssistanceModal.tsx  # AI assistance modal
│   └── SocialSupportApp.tsx   # Main application component
├── contexts/
│   └── FormContext.tsx        # Global form state management
├── services/
│   ├── openai.ts             # OpenAI API integration
│   └── api.ts                # Backend API calls
├── lib/
│   ├── i18n.ts               # Internationalization setup
│   └── utils.ts              # Utility functions
├── hooks/
│   └── use-toast.ts          # Toast notification hook
└── pages/
    ├── Index.tsx             # Main page
    └── NotFound.tsx          # 404 error page
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Run ESLint
npm run type-check      # Run TypeScript compiler check

# Testing (if implemented)
npm test                # Run unit tests
npm run test:coverage   # Run tests with coverage
```

## 🌐 Technologies Used

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Library | 18.3+ |
| **TypeScript** | Type Safety | 5.0+ |
| **Vite** | Build Tool | 5.0+ |
| **Tailwind CSS** | Styling | 3.4+ |
| **React Hook Form** | Form Management | 7.53+ |
| **React-i18next** | Internationalization | Latest |
| **Axios** | HTTP Client | Latest |
| **Shadcn/ui** | UI Components | Latest |
| **Lucide React** | Icons | Latest |

## 🚀 Deployment

### Option 1: Vercel Platform (Recommended)
1. Open [Vercel Project](https://vercel.com/)
2. Connect your github.com repository with Vercel
3. Select the project
4. Click on Deploy
5. Your app will be deployed automatically

### Option 2: Manual Deployment
```bash
# Build the project
npm run build

# Deploy the dist/ folder to your hosting provider
# (Vercel, Netlify, AWS S3, etc.)
```

## 🔒 Security Considerations

- **Input Validation**: All user inputs are validated both client and server-side
- **XSS Protection**: Proper sanitization of user-generated content
- **API Key Security**: OpenAI API key should be stored securely (environment variables)
- **Data Privacy**: Form data is stored locally and should be transmitted securely in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

- **GitHub Issues**: Create an issue in this repository
- **Documentation**: Check the inline code comments
- **Community**: Join our Discord community

## 🔮 Future Improvements

- [ ] Document upload functionality
- [ ] Email notifications
- [ ] Application status tracking
- [ ] Admin dashboard for application review
- [ ] Advanced analytics and reporting
- [ ] Mobile app companion
- [ ] Offline form completion support
- [ ] Multi-language AI assistance
- [ ] Voice-to-text input support

---

**Built with ❤️ for citizens in need of social support assistance.**

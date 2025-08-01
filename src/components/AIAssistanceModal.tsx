import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bot, X, Copy, Check, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import { getAIAssistance, generatePrompt } from '../services/openai';
import { useToast } from '../hooks/use-toast';

interface AIAssistanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  fieldType: string;
  currentValue: string;
  onAccept: (value: string) => void;
}

const AIAssistanceModal: React.FC<AIAssistanceModalProps> = ({
  isOpen,
  onClose,
  fieldType,
  currentValue,
  onAccept,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [suggestion, setSuggestion] = useState('');
  const [editedSuggestion, setEditedSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (isOpen && !suggestion && !isLoading) {
      generateSuggestion();
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setSuggestion('');
      setEditedSuggestion('');
      setError(null);
      setCopied(false);
    }
  }, [isOpen]);

  const generateSuggestion = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const prompt = generatePrompt(fieldType, currentValue);
      const response = await getAIAssistance({ prompt, context: currentValue });

      if (response.success && response.suggestion) {
        setSuggestion(response.suggestion);
        setEditedSuggestion(response.suggestion);
      } else {
        setError(response.error || t('ai_error'));
      }
    } catch (err) {
      setError(t('ai_error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = () => {
    const finalText = editedSuggestion || suggestion;
    onAccept(finalText);
    onClose();
    
    toast({
      title: "Success",
      description: "AI suggestion has been applied to your form.",
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editedSuggestion || suggestion);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Copied",
        description: "Text copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy text to clipboard.",
        variant: "destructive",
      });
    }
  };

  const getFieldTitle = (fieldType: string) => {
    const titles = {
      currentFinancialSituation: t('current_financial_situation'),
      employmentCircumstances: t('employment_circumstances'),
      reasonForApplying: t('reason_for_applying'),
    };
    return titles[fieldType as keyof typeof titles] || t('ai_assistance');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-primary" />
            <span>{t('ai_assistance')}</span>
          </DialogTitle>
          <DialogDescription>
            {t('ai_assistance')} - {getFieldTitle(fieldType)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{t('generating_suggestion')}</span>
              </div>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {suggestion && !isLoading && (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    AI Suggestion
                  </label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="text-xs"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                
                <Textarea
                  value={editedSuggestion}
                  onChange={(e) => setEditedSuggestion(e.target.value)}
                  rows={8}
                  className="resize-none focus-ring"
                  placeholder="AI suggestion will appear here..."
                  aria-label="Edit AI suggestion"
                />
                
                <p className="text-xs text-muted-foreground">
                  You can edit the suggestion above before accepting it.
                </p>
              </div>

              {currentValue && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Current Text
                  </label>
                  <div className="p-3 bg-muted rounded-lg text-sm text-muted-foreground max-h-24 overflow-y-auto">
                    {currentValue || 'No existing text'}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="focus-ring">
            {t('discard')}
          </Button>
          
          {error && (
            <Button
              variant="outline"
              onClick={generateSuggestion}
              disabled={isLoading}
              className="focus-ring"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                'Try Again'
              )}
            </Button>
          )}
          
          {suggestion && !isLoading && (
            <Button
              onClick={handleAccept}
              disabled={!editedSuggestion.trim()}
              className="focus-ring ai-pulse"
            >
              {t('accept')}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AIAssistanceModal;
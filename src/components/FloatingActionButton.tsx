import { Button } from "@/components/ui/button";
import { Plus, Mic, Sparkles, FileText } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  onCreateNote?: () => void;
  onVoiceNote?: () => void;
  onAIAssist?: () => void;
  onTemplate?: () => void;
}

export const FloatingActionButton = ({
  onCreateNote,
  onVoiceNote,
  onAIAssist,
  onTemplate
}: FloatingActionButtonProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = [
    {
      icon: FileText,
      label: "New Note",
      onClick: onCreateNote,
      className: "bg-primary text-primary-foreground hover:bg-primary/90"
    },
    {
      icon: Mic,
      label: "Voice Note",
      onClick: onVoiceNote,
      className: "bg-accent text-accent-foreground hover:bg-accent/90"
    },
    {
      icon: Sparkles,
      label: "AI Assist",
      onClick: onAIAssist,
      className: "bg-gradient-accent text-accent-foreground hover:opacity-90"
    },
    {
      icon: FileText,
      label: "Template",
      onClick: onTemplate,
      className: "bg-success text-success-foreground hover:bg-success/90"
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Buttons */}
      <div 
        className={cn(
          "flex flex-col space-y-3 transition-all duration-300 origin-bottom",
          isExpanded ? "opacity-100 scale-100 mb-4" : "opacity-0 scale-50 pointer-events-none"
        )}
      >
        {actions.map((action, index) => (
          <div key={index} className="flex items-center space-x-3">
            <span className="bg-card text-foreground px-3 py-2 rounded-lg shadow-soft text-sm font-medium whitespace-nowrap">
              {action.label}
            </span>
            <Button
              size="lg"
              className={cn(
                "h-12 w-12 rounded-full shadow-floating animate-slide-up",
                action.className
              )}
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => {
                action.onClick?.();
                setIsExpanded(false);
              }}
            >
              <action.icon className="h-5 w-5" />
            </Button>
          </div>
        ))}
      </div>

      {/* Main FAB */}
      <Button
        size="lg"
        className={cn(
          "h-14 w-14 rounded-full shadow-floating bg-gradient-primary text-primary-foreground",
          "hover:shadow-xl transition-all duration-300 animate-float",
          isExpanded && "rotate-45"
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};
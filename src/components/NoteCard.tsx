import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MoreVertical, 
  Share2, 
  Star, 
  Users, 
  Calendar,
  Bookmark
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  tags: string[];
  lastModified: Date;
  isShared?: boolean;
  isStarred?: boolean;
  collaborators?: number;
  colorTheme?: 'yellow' | 'blue' | 'green' | 'purple' | 'pink';
  onEdit?: () => void;
  onShare?: () => void;
  onStar?: () => void;
  onDelete?: () => void;
}

export const NoteCard = ({
  id,
  title,
  content,
  tags,
  lastModified,
  isShared = false,
  isStarred = false,
  collaborators = 0,
  colorTheme = 'blue',
  onEdit,
  onShare,
  onStar,
  onDelete
}: NoteCardProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const colorClasses = {
    yellow: 'bg-note-yellow border-l-4 border-l-warning',
    blue: 'bg-note-blue border-l-4 border-l-primary',
    green: 'bg-note-green border-l-4 border-l-success',
    purple: 'bg-note-purple border-l-4 border-l-accent',
    pink: 'bg-note-pink border-l-4 border-l-destructive'
  };

  return (
    <Card 
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:shadow-note hover:-translate-y-1",
        "bg-gradient-card backdrop-blur-sm",
        colorClasses[colorTheme]
      )}
      onClick={onEdit}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-2 flex-1">
            <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {title || "Untitled Note"}
            </h3>
            {isStarred && (
              <Star className="h-4 w-4 text-warning fill-warning flex-shrink-0 mt-1" />
            )}
          </div>
          
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>

            {showMenu && (
              <div 
                className="absolute right-0 mt-1 w-36 bg-card border border-border rounded-lg shadow-note z-20"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => {
                      onStar?.();
                      setShowMenu(false);
                    }}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    {isStarred ? 'Unstar' : 'Star'}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => {
                      onShare?.();
                      setShowMenu(false);
                    }}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start text-destructive"
                    onClick={() => {
                      onDelete?.();
                      setShowMenu(false);
                    }}
                  >
                    <Bookmark className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content Preview */}
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 leading-relaxed">
          {content || "No content"}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs px-2 py-1"
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-1">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(lastModified)}</span>
            </div>
            
            {isShared && collaborators > 0 && (
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>{collaborators}</span>
              </div>
            )}
          </div>

          {isShared && (
            <div className="flex items-center space-x-1 text-primary">
              <Share2 className="h-3 w-3" />
              <span>Shared</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Home, 
  FileText, 
  Share2, 
  Star, 
  Archive, 
  Trash2,
  Settings,
  Users,
  Sparkles,
  Tags
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  activeSection?: string;
  onSectionChange?: (section: string) => void;
  noteStats?: {
    total: number;
    shared: number;
    starred: number;
  };
}

export const Sidebar = ({ 
  isOpen = true, 
  activeSection = "my-notes",
  onSectionChange,
  noteStats = { total: 0, shared: 0, starred: 0 }
}: SidebarProps) => {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard", 
      icon: Home,
      count: noteStats.total
    },
    {
      id: "my-notes",
      label: "My Notes",
      icon: FileText,
      count: noteStats.total
    },
    {
      id: "shared-notes",
      label: "Shared Notes",
      icon: Share2,
      count: noteStats.shared
    },
    {
      id: "starred",
      label: "Starred",
      icon: Star,
      count: noteStats.starred
    },
    {
      id: "tags",
      label: "Tags",
      icon: Tags
    },
  ];

  const aiFeatures = [
    {
      id: "ai-assistant",
      label: "AI Assistant",
      icon: Sparkles
    },
    {
      id: "collaborators",
      label: "Collaborators",
      icon: Users
    },
  ];

  const secondaryItems = [
    {
      id: "archive",
      label: "Archive",
      icon: Archive
    },
    {
      id: "trash",
      label: "Trash",
      icon: Trash2
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings
    },
  ];

  return (
    <aside 
      className={cn(
        "bg-card border-r border-border h-full flex flex-col transition-all duration-300",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="p-4 flex-1">
        {/* Main Navigation */}
        <div className="space-y-1 mb-6">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start transition-all duration-200",
                !isOpen && "justify-center px-2",
                activeSection === item.id && "bg-gradient-to-r from-primary/10 to-transparent border-r-2 border-primary"
              )}
              onClick={() => onSectionChange?.(item.id)}
            >
              <item.icon className={cn(
                "h-5 w-5",
                activeSection === item.id && "text-primary"
              )} />
              {isOpen && (
                <>
                  <span className="ml-3 flex-1 text-left">{item.label}</span>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="ml-auto text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  )}
                </>
              )}
            </Button>
          ))}
        </div>

        {/* AI Features Section */}
        {isOpen && (
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
              AI Features
            </h3>
            <div className="space-y-1">
              {aiFeatures.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    activeSection === item.id && "bg-gradient-accent text-accent-foreground"
                  )}
                  onClick={() => onSectionChange?.(item.id)}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="ml-3">{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Stats */}
        {isOpen && (
          <div className="bg-gradient-card rounded-lg p-4 mb-6 shadow-soft">
            <h3 className="text-sm font-semibold mb-3">Quick Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Notes</span>
                <span className="font-medium">{noteStats.total}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shared</span>
                <span className="font-medium">{noteStats.shared}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Starred</span>
                <span className="font-medium">{noteStats.starred}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Secondary Navigation */}
      <div className="p-4 border-t border-border">
        <div className="space-y-1">
          {secondaryItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                !isOpen && "justify-center px-2"
              )}
              onClick={() => onSectionChange?.(item.id)}
            >
              <item.icon className="h-5 w-5" />
              {isOpen && <span className="ml-3">{item.label}</span>}
            </Button>
          ))}
        </div>
      </div>
    </aside>
  );
};
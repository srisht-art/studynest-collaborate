import { Button } from "@/components/ui/button";
import { Search, Bell, User, Menu, LogOut } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  onMenuToggle?: () => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export const Navbar = ({ onMenuToggle, user }: NavbarProps) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <nav className="bg-card border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={onMenuToggle}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SN</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                StudyNest
              </h1>
            </div>
          </div>

          {/* Center section - Search */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search notes with AI..."
                className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                         transition-all duration-200"
              />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full"></span>
            </Button>

            {user ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-6 w-6 rounded-full"
                    />
                  ) : (
                    <div className="h-6 w-6 bg-gradient-accent rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-accent-foreground" />
                    </div>
                  )}
                  <span className="hidden sm:block text-sm font-medium">{user.name}</span>
                </Button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-note z-50">
                    <div className="p-3 border-b border-border">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="p-1">
                      <Button variant="ghost" size="sm" className="w-full justify-start text-destructive">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Sign In</Button>
                <Button variant="default" size="sm">Sign Up</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { NoteCard } from "@/components/NoteCard";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, SortAsc, Grid, List } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for demonstration
const mockNotes = [
  {
    id: "1",
    title: "Machine Learning Fundamentals",
    content: "Introduction to supervised and unsupervised learning algorithms. Key concepts include linear regression, decision trees, neural networks...",
    tags: ["ML", "AI", "Study"],
    lastModified: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isStarred: true,
    colorTheme: "blue" as const,
    collaborators: 3
  },
  {
    id: "2", 
    title: "React Best Practices",
    content: "Component composition, state management with hooks, performance optimization techniques, and testing strategies...",
    tags: ["React", "Frontend", "JavaScript"],
    lastModified: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    colorTheme: "green" as const,
    isShared: true,
    collaborators: 2
  },
  {
    id: "3",
    title: "Project Planning Meeting Notes",
    content: "Discussed timeline for Q4 deliverables, resource allocation, and key milestones. Action items assigned to team leads...",
    tags: ["Meeting", "Planning", "Work"],
    lastModified: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    colorTheme: "yellow" as const
  },
  {
    id: "4",
    title: "Data Structures & Algorithms",
    content: "Comprehensive study guide covering arrays, linked lists, trees, graphs, sorting algorithms, and time complexity analysis...",
    tags: ["DSA", "Programming", "Study"],
    lastModified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    isStarred: true,
    colorTheme: "purple" as const
  },
  {
    id: "5",
    title: "UX Design Principles",
    content: "User-centered design approach, accessibility guidelines, color theory, typography, and responsive design patterns...",
    tags: ["Design", "UX", "UI"],
    lastModified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    colorTheme: "pink" as const,
    isShared: true,
    collaborators: 5
  }
];

const mockUser = {
  name: "Alex Johnson",
  email: "alex@studynest.com",
  avatar: ""
};

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("my-notes");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const noteStats = {
    total: mockNotes.length,
    shared: mockNotes.filter(note => note.isShared).length,
    starred: mockNotes.filter(note => note.isStarred).length
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case "dashboard": return "Dashboard";
      case "my-notes": return "My Notes";
      case "shared-notes": return "Shared Notes";
      case "starred": return "Starred Notes";
      case "tags": return "Tags";
      default: return "My Notes";
    }
  };

  const getFilteredNotes = () => {
    let filtered = mockNotes;
    
    if (activeSection === "shared-notes") {
      filtered = filtered.filter(note => note.isShared);
    } else if (activeSection === "starred") {
      filtered = filtered.filter(note => note.isStarred);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(note => 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    return filtered;
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <Navbar 
        user={mockUser}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar
          isOpen={sidebarOpen}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          noteStats={noteStats}
        />
        
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-foreground">{getSectionTitle()}</h1>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Search and Filters */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search your notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <SortAsc className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </div>
            </div>

            {/* Notes Grid/List */}
            <div className={cn(
              "transition-all duration-300",
              viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            )}>
              {getFilteredNotes().map((note) => (
                <NoteCard
                  key={note.id}
                  {...note}
                  onEdit={() => console.log("Edit note:", note.id)}
                  onShare={() => console.log("Share note:", note.id)}
                  onStar={() => console.log("Star note:", note.id)}
                  onDelete={() => console.log("Delete note:", note.id)}
                />
              ))}
            </div>

            {/* Empty State */}
            {getFilteredNotes().length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-accent rounded-full flex items-center justify-center">
                  <Search className="h-12 w-12 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No notes found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? "Try adjusting your search terms" : "Start creating your first note!"}
                </p>
                {!searchQuery && (
                  <Button className="bg-gradient-primary text-primary-foreground">
                    Create Your First Note
                  </Button>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      <FloatingActionButton
        onCreateNote={() => console.log("Create note")}
        onVoiceNote={() => console.log("Voice note")}
        onAIAssist={() => console.log("AI assist")}
        onTemplate={() => console.log("Template")}
      />
    </div>
  );
}
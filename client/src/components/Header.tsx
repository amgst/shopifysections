import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, Search, User, ShoppingBag, Bell, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

interface HeaderProps {
  shopName?: string;
  shopDomain?: string;
}

export default function Header({ 
  shopName = "My Shopify Store",
  shopDomain = "demo-fashion-store.myshopify.com" 
}: HeaderProps) {
  const [isDark, setIsDark] = useState(false);

  // Fetch installation count for the shop
  const { data: installations = [] } = useQuery({
    queryKey: ['installations', shopDomain],
    queryFn: async () => {
      const response = await fetch(`/api/installations?shopDomain=${shopDomain}`);
      if (!response.ok) throw new Error('Failed to fetch installations');
      return response.json();
    },
  });

  const installedSectionsCount = installations.length;

  useEffect(() => {
    // Check if dark mode is already set
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    console.log('Theme toggled to:', newIsDark ? 'dark' : 'light');
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark', newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  const handleProfileAction = (action: string) => {
    console.log('Profile action:', action);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo and Shop Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">SF</span>
            </div>
            <div>
              <h1 className="font-semibold text-lg" data-testid="text-app-name">
                Section Factory
              </h1>
              <p className="text-xs text-muted-foreground" data-testid="text-shop-name">
                {shopName}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Search (Desktop) */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Quick search sections..."
              className="pl-10 bg-muted/50"
              data-testid="input-quick-search"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Installed Sections Counter */}
          <Button variant="outline" size="sm" className="hidden sm:flex" data-testid="button-installed-sections">
            <ShoppingBag className="w-4 h-4 mr-2" />
            My Sections
            {installedSectionsCount > 0 && (
              <Badge variant="secondary" className="ml-2 px-1 py-0 text-xs">
                {installedSectionsCount}
              </Badge>
            )}
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" data-testid="button-notifications">
            <Bell className="w-4 h-4" />
          </Button>

          {/* Theme Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          {/* Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" data-testid="button-profile">
                <User className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium" data-testid="text-profile-name">Store Owner</p>
                <p className="text-xs text-muted-foreground" data-testid="text-profile-email">owner@{shopName.toLowerCase().replace(/\s+/g, '')}.myshopify.com</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleProfileAction('sections')} data-testid="menu-my-sections">
                <ShoppingBag className="w-4 h-4 mr-2" />
                My Sections
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleProfileAction('settings')} data-testid="menu-settings">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleProfileAction('help')} data-testid="menu-help">
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleProfileAction('logout')} data-testid="menu-logout">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search sections..."
            className="pl-10"
            data-testid="input-mobile-search"
          />
        </div>
      </div>
    </header>
  );
}
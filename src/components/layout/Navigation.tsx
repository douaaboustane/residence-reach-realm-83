import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Home, Building2, Search, Settings, LogOut, Sun, Moon, Globe, User, Shield, BarChart3, Calculator } from 'lucide-react';
const Navigation: React.FC = () => {
  const {
    t,
    i18n
  } = useTranslation();
  const {
    user,
    logout
  } = useAuth();
  const {
    theme,
    toggleTheme
  } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const getNavLinks = () => {
    if (!user) return [];
    const baseLinks = [{
      href: '/',
      label: t('nav.home'),
      icon: Home
    }];
    switch (user.role) {
      case 'buyer':
        return [...baseLinks, {
          href: '/properties',
          label: t('nav.properties'),
          icon: Building2
        }, {
          href: '/estimate',
          label: 'Estimate',
          icon: Calculator
        }];
      case 'investigator':
        return [...baseLinks, {
          href: '/investigations',
          label: t('nav.investigations'),
          icon: Search
        }, {
          href: '/estimate',
          label: 'Estimate',
          icon: Calculator
        }];
      case 'admin':
        return [...baseLinks, {
          href: '/admin',
          label: t('nav.admin'),
          icon: BarChart3
        }, {
          href: '/estimate',
          label: 'Estimate',
          icon: Calculator
        }];
      default:
        return baseLinks;
    }
  };
  const navLinks = getNavLinks();
  return <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/lovable-uploads/903c5086-f6a7-42aa-a254-a6621d3600bf.png" alt="Logo" className="h-8 w-8" />
          </Link>

          {/* Company Name */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-xl font-bold text-foreground">PropertyEval</h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = location.pathname === link.href;
            return <Link key={link.href} to={link.href} className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>;
          })}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button variant="ghost" size="sm" onClick={toggleTheme} className="h-9 w-9 p-0">
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLanguage('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('fr')}>
                  Français
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('ar')}>
                  العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            {user ? <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      {user.role === 'admin' ? <Shield className="h-4 w-4 text-primary" /> : user.role === 'investigator' ? <Search className="h-4 w-4 text-primary" /> : <User className="h-4 w-4 text-primary" />}
                    </div>
                    <span className="hidden sm:block text-sm font-medium">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild className="flex items-center space-x-2 cursor-pointer">
                    <Link to="/settings">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center space-x-2 text-destructive">
                    <LogOut className="h-4 w-4" />
                    <span>{t('nav.logout')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> : <div className="flex items-center space-x-2">
                <Button asChild variant="ghost">
                  <Link to="/login">{t('nav.login')}</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">{t('nav.signup')}</Link>
                </Button>
              </div>}
          </div>
        </div>
      </div>
    </nav>;
};
export default Navigation;
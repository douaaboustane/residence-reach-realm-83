import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ArrowLeft, Search, MapPin } from 'lucide-react';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
        <CardContent className="p-12 text-center space-y-8">
          {/* 404 Animation */}
          <div className="relative">
            <div className="text-9xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-pulse">
              404
            </div>
            <div className="absolute -top-4 -right-4 text-4xl animate-bounce">
              🏠
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">
              {t('notFound.title', 'Page Not Found')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              {t('notFound.description', 'Sorry, the property you\'re looking for seems to have moved to a different neighborhood.')}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/">
                <Home className="w-5 h-5 mr-2" />
                {t('notFound.goHome', 'Go Home')}
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link to="/properties">
                <Search className="w-5 h-5 mr-2" />
                {t('notFound.browseProperties', 'Browse Properties')}
              </Link>
            </Button>
          </div>

          {/* Quick Links */}
          <div className="pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4">
              {t('notFound.quickLinks', 'Quick Links')}
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">
                  {t('auth.login', 'Login')}
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/signup">
                  {t('auth.signup', 'Sign Up')}
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/investigations">
                  <MapPin className="w-4 h-4 mr-1" />
                  {t('nav.investigations', 'Investigations')}
                </Link>
              </Button>
            </div>
          </div>

          {/* Back Button */}
          <Button
            variant="ghost" 
            onClick={() => window.history.back()}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('notFound.goBack', 'Go Back')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;

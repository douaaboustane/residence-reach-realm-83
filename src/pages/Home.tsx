import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Shield, BarChart3, ArrowRight, CheckCircle, Users, Globe } from 'lucide-react';
import heroImage from '@/assets/hero-home.jpg';
import dynamicHeroImage from '@/assets/dynamic-hero-bg.jpg';
import verificationImage from '@/assets/verification-hero.jpg';
const Home: React.FC = () => {
  const {
    t
  } = useTranslation();
  const [currentBg, setCurrentBg] = React.useState(0);
  const backgrounds = [dynamicHeroImage, heroImage];

  // Auto-rotate background images
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg(prev => (prev + 1) % backgrounds.length);
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, [backgrounds.length]);
  return <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {backgrounds.map((bg, index) => <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentBg ? 'opacity-100' : 'opacity-0'}`}>
              <img src={bg} alt="Luxury real estate background" className="w-full h-full object-cover animate-fade-in" />
            </div>)}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-accent/80" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="flex justify-center mb-8">
              <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/30 hover-scale">
                <Building2 className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t('home.hero.title')}
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t('home.hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg hover-scale">
                <Link to="/properties" className="flex items-center space-x-2">
                  <span>{t('home.hero.ctaBuyer')}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm hover-scale">
                <Link to="/investigations" className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>{t('home.hero.ctaInvestigator')}</span>
                </Link>
              </Button>
              
              <Button asChild variant="secondary" size="lg" className="hover-scale">
                <Link to="/estimate" className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Get Estimate</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t('home.features.title')}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
              <CardContent className="p-8 text-center">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {t('home.features.verification.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('home.features.verification.description')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
              <CardContent className="p-8 text-center">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-secondary/10 to-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {t('home.features.trusted.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('home.features.trusted.description')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
              <CardContent className="p-8 text-center">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {t('home.features.analytics.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('home.features.analytics.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">1,247</div>
              <div className="text-muted-foreground font-medium">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-secondary mb-2">2,834</div>
              <div className="text-muted-foreground font-medium">Properties Listed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-accent mb-2">456</div>
              <div className="text-muted-foreground font-medium">Verified Properties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground font-medium">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Home?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have found their dream properties through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/signup" className="flex items-center space-x-2">
                <span>Get Started Today</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/properties">Browse Properties</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>;
};
export default Home;
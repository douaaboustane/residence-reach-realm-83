import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Building2, Eye, EyeOff, Loader2 } from 'lucide-react';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '' as UserRole | ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.role) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const success = await login(formData.email, formData.password, formData.role);
    
    if (success) {
      toast({
        title: "Success",
        description: t('auth.loginSuccess')
      });
      
      // Navigate based on role
      if (formData.role === 'admin') {
        navigate('/admin');
      } else if (formData.role === 'investigator') {
        navigate('/investigations');
      } else if (formData.role === 'buyer') {
        navigate('/properties');
      } else {
        navigate(from, { replace: true });
      }
    } else {
      toast({
        title: "Error",
        description: t('auth.loginError'),
        variant: "destructive"
      });
    }
  };

  const handleDemoLogin = (role: UserRole) => {
    setFormData({
      email: `${role}@demo.com`,
      password: 'demo123',
      role
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">{t('auth.login')}</CardTitle>
          <CardDescription>
            Welcome back to OpenHome
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.email')}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.password')}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter your password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">{t('auth.role')}</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value as UserRole }))}>
                <SelectTrigger>
                  <SelectValue placeholder={t('auth.selectRole')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buyer">{t('auth.buyer')}</SelectItem>
                  <SelectItem value="investigator">{t('auth.investigator')}</SelectItem>
                  <SelectItem value="admin">{t('auth.admin')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                t('auth.loginButton')
              )}
            </Button>
          </form>
          
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-4">Demo Accounts (password: demo123)</p>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleDemoLogin('buyer')}
                className="text-xs"
              >
                Buyer
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleDemoLogin('investigator')}
                className="text-xs"
              >
                Investigator
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleDemoLogin('admin')}
                className="text-xs"
              >
                Admin
              </Button>
            </div>
          </div>
          
          <div className="text-center text-sm">
            <span className="text-muted-foreground">{t('auth.switchToSignup')} </span>
            <Button variant="link" asChild className="p-0 h-auto">
              <Link to="/signup">{t('auth.signup')}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
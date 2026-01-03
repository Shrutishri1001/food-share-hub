import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';
import AuthInput from '@/components/ui/AuthInput';
import { Button } from '@/components/ui/button';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      const dashboardPaths: Record<UserRole, string> = {
        admin: '/admin',
        donor: '/donor',
        consumer: '/consumer',
        volunteer: '/volunteer',
      };
      navigate(dashboardPaths[user.role]);
    }
  }, [isAuthenticated, user, navigate]);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    
    try {
      const result = await login(email, password);
      
      if (!result.success) {
        toast({
          title: 'Login Failed',
          description: result.error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Welcome back!',
          description: 'You have successfully logged in.',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0tNiA2aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        
        <div className="relative z-10">
          <Logo size="lg" />
        </div>
        
        <div className="relative z-10 space-y-6">
          <h1 className="text-4xl font-bold text-primary-foreground leading-tight">
            Reduce Waste,<br />
            Share Hope
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-md">
            Connect surplus food from donors to those in need. Together, we can build a more sustainable and caring community.
          </p>
          
          <div className="flex items-center gap-8 pt-4">
            <div>
              <div className="text-3xl font-bold text-primary-foreground">500+</div>
              <div className="text-primary-foreground/70 text-sm">Meals Shared</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-foreground">50+</div>
              <div className="text-primary-foreground/70 text-sm">Partner NGOs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-foreground">100+</div>
              <div className="text-primary-foreground/70 text-sm">Volunteers</div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 text-primary-foreground/60 text-sm">
          © 2024 FoodShare. Making a difference, one meal at a time.
        </div>
      </div>
      
      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md animate-slide-up">
          <div className="lg:hidden mb-8 flex justify-center">
            <Logo size="md" />
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">Welcome Back</h2>
            <p className="text-muted-foreground mt-2">Sign in to continue your journey</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <AuthInput
              label="Email Address"
              type="email"
              icon={Mail}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              autoComplete="email"
            />
            
            <AuthInput
              label="Password"
              type="password"
              icon={Lock}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              autoComplete="current-password"
            />
            
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold gradient-primary hover:opacity-90 transition-opacity"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-primary font-semibold hover:underline transition-all"
              >
                Create one now
              </Link>
            </p>
          </div>
          
          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm font-medium text-foreground mb-2">Demo Accounts:</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p><span className="font-medium">Admin:</span> admin@foodshare.com / admin123</p>
              <p><span className="font-medium">Donor:</span> donor@test.com / donor123</p>
              <p><span className="font-medium">Consumer:</span> consumer@test.com / consumer123</p>
              <p><span className="font-medium">Volunteer:</span> volunteer@test.com / volunteer123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

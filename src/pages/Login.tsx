
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import Logo from '@/components/Logo';
import { ArrowLeft, UserCog } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we're coming from the admin login button
    const loginRedirect = localStorage.getItem('loginRedirect');
    if (loginRedirect === 'admin') {
      setIsAdminLogin(true);
      // Pre-fill with admin email to make it clearer
      setEmail('admin@example.com');
      localStorage.removeItem('loginRedirect'); // Clean up
    }
  }, []);

  // Allow login with any email and password
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate that email format is correct and password is not empty
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address.",
      });
      setIsLoading(false);
      return;
    }

    if (!password) {
      toast({
        variant: "destructive",
        title: "Password required",
        description: "Please enter a password.",
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Determine user role based on email domain or pattern
      let userRole = 'user'; // Default role
      
      if (email.includes('admin')) {
        userRole = 'admin';
      } else if (email.includes('superadmin')) {
        userRole = 'superadmin';
      }
      
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('userEmail', email);
      
      toast({
        title: "Login successful",
        description: `Welcome to XpenseS${userRole !== 'user' ? ` ${userRole.charAt(0).toUpperCase() + userRole.slice(1)}` : ''}!`,
      });
      
      // Redirect based on role or isAdminLogin flag
      if (isAdminLogin || userRole === 'admin' || userRole === 'superadmin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    }, 1000);
  };

  const handleGoogleLogin = () => {
    toast({
      title: "Google Sign-In",
      description: "Google Sign-In functionality would be implemented here.",
    });
    // In a real implementation, you would use Firebase Auth or similar service
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-6 px-0">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {isAdminLogin ? 'Admin Login' : 'Login'}
            </CardTitle>
            <CardDescription className="text-center">
              {isAdminLogin 
                ? 'Enter your admin credentials to access the dashboard' 
                : 'Enter your credentials to access your account'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={isAdminLogin ? "admin@example.com" : "name@example.com"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : isAdminLogin ? "Login as Admin" : "Login"}
                </Button>

                {isAdminLogin && (
                  <div className="text-xs text-center space-y-1 mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                    <p className="text-muted-foreground">
                      <strong>Admin Access:</strong> Use any email containing "admin" 
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Superadmin Access:</strong> Use any email containing "superadmin"
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Example:</strong> admin@example.com with any password
                    </p>
                  </div>
                )}
              </div>
            </form>

            {!isAdminLogin && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-background px-2 text-muted-foreground text-sm">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleLogin}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
              </>
            )}
          </CardContent>
          {!isAdminLogin && (
            <CardFooter className="flex justify-center">
              <div className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Login;

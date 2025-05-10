import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate(); // Use useNavigate hook to get the navigation function

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      return; // Basic validation
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await login(username, password);
      if (success) {
        navigate('/dashboard'); // Navigate to dashboard on successful login
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-3">
          {/* Updated Skylet Bank Gradient */}
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-green-500 to-purple-600">
            Skylet Bank Ltd
          </h1>
          <p className="text-gray-400 mt-2">Online Banking Portal</p>
        </div>
        
        <Card className="border-t-4 border-t-blue-500 shadow-lg animate-fade-in bg-card/95 backdrop-blur border-border/30">
          <CardHeader>
            <CardTitle className="text-xl text-center text-foreground">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Please login to your account
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground">Username</Label>
                <Input 
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-background text-foreground border-border/50"
                  autoComplete="username"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-foreground">Password</Label>
                  <a href="#" className="text-xs text-blue-500 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input 
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background text-foreground border-border/50"
                  autoComplete="current-password"
                  required
                />
              </div>
              
              <div className="pt-2">
                {/* Updated Login Button Gradient */}
                <Button 
                  type="submit" 
                  className={cn(
                    "w-full bg-gradient-to-r from-blue-400 via-green-600 to-purple-500 text-white font-medium py-2 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300",
                    isSubmitting && "opacity-70 cursor-not-allowed"
                  )}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </div>
            </CardContent>
          </form>
          
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center w-full">
              {/* Use Link for internal navigation */}
              <Button 
                variant="outline" 
                className="w-full border-border/50 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                asChild
              >
                <Link to="/open-account">Click here to Open new Account</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        <div className="text-center mt-8 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Skylet Bank. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;

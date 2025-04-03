
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

interface AuthModalProps {
  initialTab: 'login' | 'signup';
}

const AuthModal = ({ initialTab }: AuthModalProps) => {
  const [tab, setTab] = useState<'login' | 'signup'>(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would call an authentication API
    toast({
      title: "Login Successful",
      description: "Welcome back to DocTalk!",
    });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would call a registration API
    toast({
      title: "Account Created",
      description: "Welcome to DocTalk! Your account has been created successfully.",
    });
  };

  return (
    <Tabs defaultValue={tab} onValueChange={(value) => setTab(value as 'login' | 'signup')}>
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      
      <TabsContent value="login">
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button variant="link" className="text-xs p-0 h-auto">
                  Forgot password?
                </Button>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">Login</Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-500">Don't have an account?</span>{' '}
          <Button variant="link" className="p-0" onClick={() => setTab('signup')}>
            Sign up
          </Button>
        </div>
      </TabsContent>
      
      <TabsContent value="signup">
        <form onSubmit={handleSignup}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="Your name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input 
                id="signup-email" 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input 
                id="signup-password" 
                type="password" 
                placeholder="Create a password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500">
                Password must be at least 8 characters long and include a number and special character.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="border-gray-300 rounded text-primary focus:ring-primary" 
                  required
                />
                <Label htmlFor="terms" className="text-sm font-normal">
                  I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                </Label>
              </div>
            </div>
            <Button type="submit" className="w-full">Create Account</Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-500">Already have an account?</span>{' '}
          <Button variant="link" className="p-0" onClick={() => setTab('login')}>
            Log in
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default AuthModal;

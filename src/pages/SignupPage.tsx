import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { app } from '../firebaseConfig'; // Import the app object
import { Button } from '@/components/ui/button';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Removed local error state as toast will handle error display
  // const [error, setError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const auth = getAuth(app); // Pass the app object to getAuth
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignUp = async () => {
    // Removed setError(null)
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Signup Successful',
        description: 'Your account has been created.',
      });
      // Optionally redirect after successful signup
      navigate('/'); // Redirect to home or dashboard
    } catch (err: any) {
      toast({
        title: 'Signup Failed',
        description: err.message,
        variant: 'destructive',
      });
      // Removed setError(err.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-hero opacity-20"></div>
      
      <div className="glass-blur-card rounded-2xl p-8 w-full max-w-md relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Sign Up</h2>
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleSignUp(); }}>
          <div>
            <label className="block text-muted-foreground mb-1">Email</label>
            <input
              type="email"
              className="glass-blur-light rounded w-full py-3 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-muted-foreground mb-1">Password</label>
            <input
              type="password"
              className="glass-blur-light rounded w-full py-3 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Button variant="link" type="button" onClick={() => navigate('/login')} className="p-0 h-auto align-baseline text-primary hover:text-primary/80">Login</Button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
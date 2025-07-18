import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import { app } from '../firebaseConfig';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);
  const navigate = useNavigate();
  const { toast } = useToast();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully!');
      toast({
        title: 'Login Successful!',
        description: 'You have been successfully logged in.',
      });
      navigate('/dashboard');
    } catch (err) {
      const firebaseError = err as AuthError;
      toast({
        title: 'Login Failed',
        description: firebaseError.message,
        variant: 'destructive',
      });
      setError(firebaseError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging In...' : 'Login'}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
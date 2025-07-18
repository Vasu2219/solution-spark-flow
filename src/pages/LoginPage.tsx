import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import { app } from '../firebaseConfig';
import { useToast } from '@/components/ui/use-toast';



const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);

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
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
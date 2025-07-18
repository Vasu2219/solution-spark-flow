import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { app } from '../firebaseConfig'; // Import the app object

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Removed local error state as toast will handle error display
  // const [error, setError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const auth = getAuth(app); // Pass the app object to getAuth
  const navigate = useNavigate();

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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {/* Removed local error display */}
      {/* {error && <div className="text-red-500 mb-4">{error}</div>} */}
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          className="border rounded w-full py-2 px-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          className="border rounded w-full py-2 px-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
        onClick={handleSignUp}
        disabled={loading}
      >
        {loading ? 'Signing Up...' : 'Sign Up'}
      </button>
      <p className="mt-4">
        Already have an account?{' '}
        <button
          className="text-blue-500 hover:underline"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default SignupPage;
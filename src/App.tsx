import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import firebaseConfig from "./firebaseConfig";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const queryClient = new QueryClient();

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignup = async () => {
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    setError("");
    try {
      await signOut(auth);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

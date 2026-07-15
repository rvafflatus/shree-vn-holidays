'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; // यहाँ ब्राउज़र क्लाइंट है
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert("Login Failed: " + error.message);
        setLoading(false);
        return;
      }

      // महत्वपूर्ण: ब्राउज़र को बताएं कि लॉगिन हो चुका है
      // और फिर एडमिन पेज पर भेजें
      router.push('/admin/leads');
      router.refresh(); 
    } catch (err) {
      console.error("Unexpected error:", err);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">Admin Login</h2>
        
        <label className="block mb-2 text-sm font-medium">Email</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
          required 
        />
        
        <label className="block mb-2 text-sm font-medium">Password</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-3 mb-6 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
          required 
        />
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-900 text-white p-3 rounded-lg font-bold hover:bg-blue-800 transition-colors"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
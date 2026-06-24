"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (password === 'swoc_admin_2024') {
      localStorage.setItem('admin_auth', 'true');
      router.push('/admin/products');
    } else {
      setError('Wrong password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-sm space-y-5">
        <h1 className="text-2xl font-serif font-bold text-center">Admin Login</h1>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black"
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-3 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors"
        >
          Login
        </button>
      </div>
    </div>
  );
}
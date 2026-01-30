import React, { useState } from 'react';
import { Heart, User, Mail, Lock, Shield } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";


export default function LoginPage({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '', role: 'public' });

  const handleLogin = async () => {
  try {
    if (isRegister) {
      await createUserWithEmailAndPassword(auth, loginData.email, loginData.password);
    } else {
      await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
    }

    onLogin(loginData.role);
  } catch (err) {
    alert(err.message);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl w-full max-w-md p-10 relative z-10 border border-white/20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-500 via-pink-500 to-rose-500 rounded-3xl mb-6 shadow-2xl transform hover:rotate-6 transition-transform duration-300">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-black text-white mb-3 drop-shadow-lg">LifeLine360</h1>
          <div className="flex items-center justify-center gap-2 text-white/90">
            <Shield className="w-5 h-5" />
            <p className="text-lg font-semibold">Saving Lives, One Click Away</p>
          </div>
        </div>

        <div className="space-y-5">
          {isRegister && (
            <div className="transform transition-all">
              <label className="block text-sm font-bold text-white/90 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-4 w-5 h-5 text-white/60" />
                <input type="text" className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-xl border-2 border-white/30 rounded-2xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-white/50 transition" placeholder="John Doe" />
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm font-bold text-white/90 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-4 w-5 h-5 text-white/60" />
              <input type="email" value={loginData.email} onChange={(e) => setLoginData({...loginData, email: e.target.value})} className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-xl border-2 border-white/30 rounded-2xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-white/50 transition" placeholder="your@email.com" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-white/90 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-4 w-5 h-5 text-white/60" />
              <input type="password" value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-xl border-2 border-white/30 rounded-2xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-white/50 transition" placeholder="••••••••" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-white/90 mb-2">Select Your Role</label>
            <select value={loginData.role} onChange={(e) => setLoginData({...loginData, role: e.target.value})} className="w-full px-4 py-4 bg-white/20 backdrop-blur-xl border-2 border-white/30 rounded-2xl text-white font-semibold focus:ring-2 focus:ring-white/50 focus:border-white/50 transition">
              <option value="public" className="bg-purple-600 text-white">👥 Public User</option>
              <option value="hospital" className="bg-purple-600 text-white">🏥 Hospital Admin</option>
              <option value="ambulance" className="bg-purple-600 text-white">🚑 Ambulance Driver</option>
            </select>
          </div>
          <button onClick={handleLogin} type="button" className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-rose-500 text-white py-5 rounded-2xl font-black text-lg shadow-2xl hover:shadow-pink-500/50 hover:scale-105 transition-all transform duration-300">
            {isRegister ? '✨ Create Account' : '🚀 Access Dashboard'}
          </button>
        </div>

        <div className="mt-8 text-center">
          <button onClick={() => setIsRegister(!isRegister)} className="text-white/90 hover:text-white font-bold text-sm">
            {isRegister ? '← Already have an account?' : "New here? Create account →"}
          </button>
        </div>
      </div>
    </div>
  );
}
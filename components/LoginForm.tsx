import React, { useState } from 'react';
import { CREDENTIALS } from '../constants';
import { Leaf, ArrowRight } from 'lucide-react';

interface Props {
  onLogin: (username: string) => void;
}

const LoginForm: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.toLowerCase() === CREDENTIALS.username && password.toLowerCase() === CREDENTIALS.password) {
      onLogin(username);
    } else {
      setError('Invalid credentials. Try "guest" and "zoo"');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Dynamic Nature Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-800 to-teal-900 z-0"></div>
      <div className="absolute inset-0 opacity-20 z-0" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
      
      {/* Decorative Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-zoo-primary rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-zoo-accent rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md p-8 m-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl flex flex-col items-center">
        
        {/* Logo/Icon */}
        <div className="mb-6 p-4 bg-white rounded-full shadow-lg text-zoo-primary animate-bounce-slow">
          <Leaf size={48} fill="currentColor" />
        </div>

        <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight text-center">Houston Zoo</h1>
        <p className="text-green-100 mb-8 font-medium tracking-wide">ACCESS+ COMPANION</p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-6 py-4 bg-black/20 border border-white/10 rounded-2xl text-white placeholder-green-100/50 outline-none focus:bg-black/30 focus:border-zoo-accent transition-all"
              placeholder="Username"
            />
          </div>
          
          <div className="group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-black/20 border border-white/10 rounded-2xl text-white placeholder-green-100/50 outline-none focus:bg-black/30 focus:border-zoo-accent transition-all"
              placeholder="Password"
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-white text-sm py-2 px-4 rounded-xl text-center backdrop-blur-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full group relative bg-white text-zoo-dark font-bold text-lg py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 mt-4"
          >
            <span>Start Adventure</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="mt-8 text-xs text-green-200/60 font-medium">
          A Corporate Social Responsibility Initiative
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
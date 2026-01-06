import React, { useState } from 'react';
import { UserState, AccessibilityProfile } from './types';
import LoginForm from './components/LoginForm';
import AccessibilitySelector from './components/AccessibilitySelector';
import ZooGuide from './components/ZooGuide';
import Assistant from './components/Assistant';
import { ZOO_POIS } from './constants';
import { Settings, LogOut, Menu } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<UserState>({
    isLoggedIn: false,
    username: '',
    profiles: [], // Changed to array
  });

  const handleLogin = (username: string) => {
    setUser({ ...user, isLoggedIn: true, username });
  };

  const handleProfileSelect = (profiles: AccessibilityProfile[]) => {
    setUser({ ...user, profiles });
  };

  const handleLogout = () => {
    setUser({ isLoggedIn: false, username: '', profiles: [] });
  };

  const resetProfile = () => {
    setUser({ ...user, profiles: [] });
  };

  // 1. Not Logged In
  if (!user.isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  // 2. Logged In, No Profile Selected
  if (user.profiles.length === 0) {
    return <AccessibilitySelector onSelect={handleProfileSelect} />;
  }

  // 3. Main Dashboard (Guide View)
  return (
    <div className="h-screen w-full flex flex-col bg-stone-50">
      {/* Premium App Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-stone-200 z-40 px-6 py-4 flex justify-between items-center shadow-sm sticky top-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-zoo-primary rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-green-200">
            H
          </div>
          <div>
            <h1 className="font-bold text-stone-800 leading-none text-lg">Houston Zoo</h1>
            <div className="flex items-center gap-1.5 mt-1">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide truncate max-w-[120px] inline-block align-bottom">
                 {user.profiles.join(' + ')}
               </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={resetProfile}
            className="p-2.5 text-stone-500 hover:text-zoo-primary hover:bg-green-50 rounded-xl transition-all flex items-center gap-2 group"
            title="Change Accessibility Settings"
          >
            <Settings size={22} className="group-hover:rotate-45 transition-transform" />
            <span className="text-sm font-semibold hidden md:inline">Settings</span>
          </button>
          <button 
            onClick={handleLogout}
            className="p-2.5 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
            title="Log Out"
          >
            <LogOut size={22} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden">
        <ZooGuide profiles={user.profiles} />
        <Assistant profiles={user.profiles} pois={ZOO_POIS} />
      </main>
    </div>
  );
};

export default App;
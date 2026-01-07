import React, { useState, useEffect } from 'react';
import { UserState, AccessibilityProfile } from './types';
import AccessibilitySelector from './components/AccessibilitySelector';
import ZooGuide from './components/ZooGuide';
import Assistant from './components/Assistant';
import { ZOO_POIS } from './constants';
import { Settings } from 'lucide-react';

const App: React.FC = () => {
  // Load state from local storage or default
  const [user, setUser] = useState<UserState>(() => {
    try {
      const saved = localStorage.getItem('zoo_user_state');
      if (saved) {
        // Ensure isLoggedIn is true even if loading old state
        const parsed = JSON.parse(saved);
        return { ...parsed, isLoggedIn: true };
      }
      return { isLoggedIn: true, username: 'Guest', profiles: [] };
    } catch (e) {
      return { isLoggedIn: true, username: 'Guest', profiles: [] };
    }
  });

  // Assistant State (Lifted to allow ZooGuide to trigger it)
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantInput, setAssistantInput] = useState('');

  // Persist user state whenever it changes
  useEffect(() => {
    localStorage.setItem('zoo_user_state', JSON.stringify(user));
  }, [user]);

  const handleProfileSelect = (profiles: AccessibilityProfile[]) => {
    setUser({ ...user, profiles });
  };

  const resetProfile = () => {
    setUser({ ...user, profiles: [] });
  };

  const handleGetDirections = (poiName: string) => {
    setAssistantInput(`How do I get to ${poiName} from here?`);
    setIsAssistantOpen(true);
  };

  // 1. No Profile Selected (Onboarding)
  if (user.profiles.length === 0) {
    return <AccessibilitySelector onSelect={handleProfileSelect} />;
  }

  // 2. Main Dashboard
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
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden">
        <ZooGuide 
          profiles={user.profiles} 
          onGetDirections={handleGetDirections}
        />
        <Assistant 
          profiles={user.profiles} 
          pois={ZOO_POIS} 
          isOpen={isAssistantOpen}
          setIsOpen={setIsAssistantOpen}
          externalInput={assistantInput}
          setExternalInput={setAssistantInput}
        />
      </main>
    </div>
  );
};

export default App;
import React, { useState } from 'react';
import { AccessibilityProfile } from '../types';
import { PROFILE_DESCRIPTIONS } from '../constants';
import { Eye, Ear, Accessibility, Brain, Activity, User, CheckCircle2, Plus, ArrowRight, X } from 'lucide-react';

interface Props {
  onSelect: (profiles: AccessibilityProfile[]) => void;
}

const AccessibilitySelector: React.FC<Props> = ({ onSelect }) => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [selectedCustom, setSelectedCustom] = useState<AccessibilityProfile[]>([]);

  const toggleCustomProfile = (profile: AccessibilityProfile) => {
    if (selectedCustom.includes(profile)) {
      setSelectedCustom(selectedCustom.filter(p => p !== profile));
    } else {
      setSelectedCustom([...selectedCustom, profile]);
    }
  };

  const getIcon = (profile: AccessibilityProfile) => {
    switch (profile) {
      case AccessibilityProfile.MOBILITY: return <Accessibility className="w-8 h-8" />;
      case AccessibilityProfile.VISUAL: return <Eye className="w-8 h-8" />;
      case AccessibilityProfile.AUDITORY: return <Ear className="w-8 h-8" />;
      case AccessibilityProfile.SENSORY: return <Activity className="w-8 h-8" />;
      case AccessibilityProfile.COGNITIVE: return <Brain className="w-8 h-8" />;
      default: return <User className="w-8 h-8" />;
    }
  };

  const getTheme = (profile: AccessibilityProfile) => {
    switch (profile) {
      case AccessibilityProfile.MOBILITY: return 'bg-orange-100 text-orange-700 border-orange-200';
      case AccessibilityProfile.VISUAL: return 'bg-blue-100 text-blue-700 border-blue-200';
      case AccessibilityProfile.AUDITORY: return 'bg-purple-100 text-purple-700 border-purple-200';
      case AccessibilityProfile.SENSORY: return 'bg-teal-100 text-teal-700 border-teal-200';
      case AccessibilityProfile.COGNITIVE: return 'bg-pink-100 text-pink-700 border-pink-200';
      default: return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  // Custom Selection Modal/Overlay
  if (isCustomizing) {
    return (
      <div className="min-h-screen bg-zoo-sand flex flex-col items-center justify-center p-6 animate-fade-in">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl max-w-2xl w-full relative">
          <button 
            onClick={() => setIsCustomizing(false)} 
            className="absolute top-6 right-6 p-2 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X size={24} className="text-stone-400" />
          </button>
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-zoo-dark mb-2">Customize Your Access+</h2>
            <p className="text-stone-500">Select all that apply to create your personalized guide.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {Object.values(AccessibilityProfile).filter(p => p !== AccessibilityProfile.NONE).map((profile) => {
              const isSelected = selectedCustom.includes(profile);
              const theme = getTheme(profile);
              
              return (
                <button
                  key={profile}
                  onClick={() => toggleCustomProfile(profile)}
                  className={`
                    flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200
                    ${isSelected 
                      ? `${theme} border-current shadow-md scale-[1.02]` 
                      : 'bg-stone-50 border-stone-100 text-stone-400 hover:border-stone-200'
                    }
                  `}
                >
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${isSelected ? 'bg-white/50' : 'bg-stone-200/50'}
                  `}>
                    {isSelected ? <CheckCircle2 size={20} /> : <div className="w-5 h-5 rounded-full border-2 border-stone-300" />}
                  </div>
                  <span className="font-bold text-lg">{profile}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onSelect(selectedCustom.length > 0 ? selectedCustom : [AccessibilityProfile.NONE])}
            disabled={selectedCustom.length === 0}
            className="w-full bg-zoo-primary hover:bg-zoo-dark disabled:bg-stone-200 disabled:text-stone-400 text-white font-bold text-lg py-4 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex justify-center items-center gap-2"
          >
            Confirm Selection <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // Main Quick Select View
  return (
    <div className="min-h-screen bg-zoo-sand flex flex-col items-center p-6 sm:p-10 animate-fade-in">
      <header className="max-w-4xl w-full text-center mb-10 mt-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-zoo-dark mb-4 tracking-tight">Welcome to the Zoo! 🌿</h1>
        <p className="text-lg text-stone-600 max-w-xl mx-auto">
          Choose a profile tailored for you, or build your own custom experience.
        </p>
      </header>

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Custom Card */}
        <button
          onClick={() => setIsCustomizing(true)}
          className="col-span-1 md:col-span-2 lg:col-span-1 border-2 border-dashed border-zoo-primary/30 bg-white/50 hover:bg-white hover:border-zoo-primary p-6 rounded-[2rem] flex flex-col items-center justify-center text-center transition-all group hover:-translate-y-1 hover:shadow-xl min-h-[240px]"
        >
          <div className="w-16 h-16 rounded-full bg-zoo-primary/10 text-zoo-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Plus size={32} />
          </div>
          <h3 className="text-2xl font-bold text-zoo-dark mb-2">Build Custom Profile</h3>
          <p className="text-stone-500 font-medium">Combine multiple needs (e.g., Mobility + Visual) for a unique guide.</p>
        </button>

        {Object.values(AccessibilityProfile).filter(p => p !== AccessibilityProfile.NONE).map((profile) => {
          const themeClass = getTheme(profile);
          return (
            <button
              key={profile}
              onClick={() => onSelect([profile])}
              className={`
                group relative p-6 rounded-[2rem] text-left transition-all duration-300
                border-2 hover:-translate-y-1 hover:shadow-xl
                flex flex-col h-full min-h-[240px]
                ${themeClass}
                bg-white border-transparent hover:border-current
              `}
            >
              <div className={`
                w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110
                ${themeClass} bg-opacity-30
              `}>
                {getIcon(profile)}
              </div>
              
              <h3 className="text-2xl font-bold mb-2">{profile}</h3>
              <p className="text-sm font-medium opacity-80 leading-relaxed">
                {PROFILE_DESCRIPTIONS[profile]}
              </p>

              <div className="mt-auto pt-4 flex items-center font-bold text-sm uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                Quick Select <CheckCircle2 className="ml-2 w-5 h-5" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AccessibilitySelector;
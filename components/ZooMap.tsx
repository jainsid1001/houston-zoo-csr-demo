import React, { useState } from 'react';
import { AccessibilityProfile, POI } from '../types';
import { ZOO_POIS } from '../constants';
import { MapPin, X, Info, Volume2, ArrowRight } from 'lucide-react';

interface Props {
  profile: AccessibilityProfile;
}

const ZooMap: React.FC<Props> = ({ profile }) => {
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);

  // Helper to close modal
  const closeDetail = () => setSelectedPOI(null);

  return (
    <div className="relative w-full h-full bg-[#E8F5E9] overflow-hidden flex flex-col">
      {/* Scrollable Map Area */}
      <div className="relative flex-1 overflow-auto custom-scrollbar bg-sky-100">
        <div className="relative min-w-[1000px] w-full h-full min-h-[800px] p-20 flex items-center justify-center">
          
          {/* ARTISTIC SVG MAP */}
          <svg viewBox="0 0 1000 800" className="w-full h-full absolute top-0 left-0 drop-shadow-2xl">
            <defs>
              <pattern id="grass" patternUnits="userSpaceOnUse" width="20" height="20">
                <circle cx="2" cy="2" r="1" fill="#4CAF50" opacity="0.1"/>
              </pattern>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.1"/>
              </filter>
            </defs>

            {/* Background (Water) */}
            <rect width="100%" height="100%" fill="#E1F5FE" />

            {/* Landmasses (Islands) */}
            {/* Main Island */}
            <path d="M100,200 Q200,100 400,150 T800,200 T900,500 T600,750 T200,700 T50,500 Z" fill="#DCEDC8" stroke="#AED581" strokeWidth="4" />
            <path d="M100,200 Q200,100 400,150 T800,200 T900,500 T600,750 T200,700 T50,500 Z" fill="url(#grass)" />

            {/* Paths (Dashed lines connecting zones) */}
            <path d="M500,750 C500,600 500,500 500,450" stroke="#8D6E63" strokeWidth="8" strokeLinecap="round" strokeDasharray="10,15" fill="none" />
            <path d="M500,450 C300,450 200,600 200,600" stroke="#8D6E63" strokeWidth="8" strokeLinecap="round" strokeDasharray="10,15" fill="none" />
            <path d="M500,450 C700,450 800,550 800,550" stroke="#8D6E63" strokeWidth="8" strokeLinecap="round" strokeDasharray="10,15" fill="none" />
            <path d="M500,450 C500,350 400,200 300,250" stroke="#8D6E63" strokeWidth="8" strokeLinecap="round" strokeDasharray="10,15" fill="none" />
            <path d="M500,450 C600,350 700,200 700,250" stroke="#8D6E63" strokeWidth="8" strokeLinecap="round" strokeDasharray="10,15" fill="none" />

            {/* Zones Visuals */}
            {/* Entrance Zone (Bottom Center) */}
            <circle cx="500" cy="750" r="40" fill="#FFCC80" filter="url(#shadow)" />
            
            {/* Central Hub (Center) */}
            <circle cx="500" cy="450" r="60" fill="#FFF59D" filter="url(#shadow)" />
            
            {/* Elephant/Giraffe Zone (Top Left) */}
            <path d="M200,200 Q300,150 400,250 T250,350 Z" fill="#FFE0B2" filter="url(#shadow)" />
            
            {/* Primate/Lion Zone (Top Right) */}
            <path d="M600,200 Q700,150 800,250 T650,350 Z" fill="#C8E6C9" filter="url(#shadow)" />

            {/* Trees */}
            <g transform="translate(150, 400)">
               <circle cx="0" cy="0" r="15" fill="#2E7D32" />
               <circle cx="10" cy="-10" r="12" fill="#43A047" />
               <circle cx="-10" cy="-5" r="10" fill="#66BB6A" />
            </g>
            <g transform="translate(850, 400)">
               <circle cx="0" cy="0" r="15" fill="#2E7D32" />
               <circle cx="10" cy="-10" r="12" fill="#43A047" />
               <circle cx="-10" cy="-5" r="10" fill="#66BB6A" />
            </g>
          </svg>
          
          {/* Overlay Grid/Tint based on profile */}
          {profile === AccessibilityProfile.SENSORY && (
            <div className="absolute inset-0 bg-indigo-900/10 pointer-events-none mix-blend-multiply" />
          )}

          {/* Interactive Pins */}
          {ZOO_POIS.map((poi) => (
            <button
              key={poi.id}
              onClick={() => setSelectedPOI(poi)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:z-20 group transition-all duration-500"
              style={{ top: `${poi.y}%`, left: `${poi.x}%` }}
              aria-label={`View details for ${poi.name}`}
            >
              <div className="flex flex-col items-center">
                {/* 3D Pin Effect */}
                <div className={`
                  relative flex items-center justify-center
                  w-14 h-14 rounded-full bg-white shadow-xl
                  border-4 transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-110
                  ${poi.type === 'exit' ? 'border-red-400' : ''}
                  ${poi.type === 'animal' ? 'border-zoo-primary' : ''}
                  ${poi.type === 'amenity' ? 'border-blue-400' : ''}
                  ${profile === AccessibilityProfile.VISUAL ? 'w-20 h-20 border-yellow-400 ring-4 ring-yellow-200' : ''}
                `}>
                  <span className={`${profile === AccessibilityProfile.VISUAL ? 'text-4xl' : 'text-2xl'}`}>
                    {poi.emoji}
                  </span>
                </div>
                
                {/* Floating Label */}
                <span className={`
                  mt-3 px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg
                  bg-white/90 backdrop-blur-sm text-zoo-dark border border-white/50
                  transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all
                  ${profile === AccessibilityProfile.VISUAL || profile === AccessibilityProfile.COGNITIVE ? 'scale-100 opacity-100' : ''}
                `}>
                  {poi.name}
                </span>
                
                {/* Shadow underneath */}
                <div className="w-8 h-2 bg-black/20 rounded-full blur-sm mt-1 transition-all group-hover:w-6 group-hover:opacity-10"></div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modern Bottom Sheet Overlay */}
      {selectedPOI && (
        <>
           {/* Backdrop */}
           <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-20 animate-fade-in" onClick={closeDetail}></div>
           
           {/* Card */}
           <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] shadow-[0_-10px_60px_rgba(0,0,0,0.15)] z-30 animate-slide-up max-h-[70vh] flex flex-col">
              {/* Drag Handle */}
              <div className="w-full flex justify-center pt-3 pb-1" onClick={closeDetail}>
                 <div className="w-12 h-1.5 bg-stone-200 rounded-full"></div>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-zoo-sand rounded-2xl flex items-center justify-center text-5xl shadow-inner">
                      {selectedPOI.emoji}
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-zoo-dark leading-none mb-2">{selectedPOI.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="bg-stone-100 text-stone-500 text-xs px-2 py-1 rounded-md uppercase tracking-wider font-bold">
                          {selectedPOI.type}
                        </span>
                        {/* Audio Button for Visual users */}
                        {(profile === AccessibilityProfile.VISUAL || profile === AccessibilityProfile.AUDITORY) && (
                           <button className="bg-blue-100 text-blue-600 p-1 rounded-full">
                             <Volume2 size={16} />
                           </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={closeDetail}
                    className="p-2 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors"
                  >
                    <X size={24} className="text-stone-500" />
                  </button>
                </div>

                <div className="space-y-6">
                  <p className="text-stone-600 text-lg leading-relaxed font-medium">
                    {selectedPOI.description}
                  </p>

                  <div className={`p-6 rounded-3xl border-2 shadow-sm ${
                    profile === AccessibilityProfile.SENSORY ? 'bg-indigo-50 border-indigo-100' : 
                    profile === AccessibilityProfile.MOBILITY ? 'bg-orange-50 border-orange-100' : 
                    profile === AccessibilityProfile.VISUAL ? 'bg-blue-50 border-blue-100' :
                    'bg-green-50 border-green-100'
                  }`}>
                    <h4 className="font-bold flex items-center gap-2 mb-3 text-lg opacity-90">
                      <Info size={22} className="fill-current" />
                      Access+ {profile} Insight
                    </h4>
                    <p className="text-base font-medium opacity-80 leading-relaxed">
                      {selectedPOI.accessibilityNotes[profile] || selectedPOI.accessibilityNotes[AccessibilityProfile.NONE] || "Standard accessibility applies."}
                    </p>
                  </div>
                </div>
              </div>
           </div>
        </>
      )}
      
      {/* Floating Legend */}
      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 hidden sm:block">
        <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">Map Legend</div>
        <div className="space-y-2 text-sm font-semibold text-stone-600">
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 rounded-full bg-zoo-primary shadow-sm"></div> Animals
          </div>
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 rounded-full bg-blue-400 shadow-sm"></div> Amenities
          </div>
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 rounded-full bg-red-400 shadow-sm"></div> Exits
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZooMap;
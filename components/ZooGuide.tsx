import React, { useState } from 'react';
import { AccessibilityProfile, POI } from '../types';
import { ZOO_POIS } from '../constants';
import { X, Info, Filter } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Props {
  profiles: AccessibilityProfile[];
}

const ZooGuide: React.FC<Props> = ({ profiles }) => {
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);
  const [filter, setFilter] = useState<'all' | 'animal' | 'amenity'>('all');

  const filteredPOIs = ZOO_POIS.filter(poi => {
    if (filter === 'all') return true;
    return poi.type === filter || (filter === 'amenity' && (poi.type === 'dining' || poi.type === 'exit'));
  });

  const getCombinedNotes = (poi: POI) => {
    const notes: string[] = [];
    profiles.forEach(p => {
      if (poi.accessibilityNotes[p]) {
        notes.push(`**${p}:** ${poi.accessibilityNotes[p]}`);
      }
    });
    if (notes.length === 0 && poi.accessibilityNotes[AccessibilityProfile.NONE]) {
      return poi.accessibilityNotes[AccessibilityProfile.NONE];
    }
    return notes.join('\n\n');
  };

  return (
    <div className="w-full h-full bg-stone-50 flex flex-col relative">
      
      {/* Filter Bar */}
      <div className="px-6 py-4 sticky top-0 z-10 bg-stone-50/95 backdrop-blur-sm border-b border-stone-200">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            onClick={() => setFilter('all')}
            className={`px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all ${filter === 'all' ? 'bg-zoo-dark text-white shadow-lg shadow-green-900/20' : 'bg-white text-stone-600 border border-stone-200'}`}
          >
            All Areas
          </button>
          <button 
            onClick={() => setFilter('animal')}
            className={`px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all ${filter === 'animal' ? 'bg-zoo-primary text-white shadow-lg shadow-green-600/20' : 'bg-white text-stone-600 border border-stone-200'}`}
          >
            Animals 🐾
          </button>
          <button 
            onClick={() => setFilter('amenity')}
            className={`px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all ${filter === 'amenity' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-white text-stone-600 border border-stone-200'}`}
          >
            Amenities 🚻
          </button>
        </div>
      </div>

      {/* Grid Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
          {filteredPOIs.map((poi) => (
            <button
              key={poi.id}
              onClick={() => setSelectedPOI(poi)}
              className="bg-white rounded-[2rem] p-6 shadow-sm border border-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`
                  w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-inner
                  ${poi.type === 'animal' ? 'bg-green-50' : 'bg-blue-50'}
                `}>
                  {poi.emoji}
                </div>
                <div className="bg-stone-100 px-3 py-1 rounded-full text-xs font-bold text-stone-500 uppercase tracking-wider">
                  {poi.type}
                </div>
              </div>
              
              <h3 className="text-xl font-extrabold text-zoo-dark mb-2 group-hover:text-zoo-primary transition-colors">
                {poi.name}
              </h3>
              <p className="text-stone-500 text-sm font-medium line-clamp-2 mb-4 flex-grow">
                {poi.description}
              </p>

              {/* Mini Access Badges */}
              <div className="flex gap-2 mt-2">
                {profiles.slice(0, 3).map(p => (
                   <div key={p} className="h-2 w-2 rounded-full bg-zoo-accent/50"></div>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail Overlay */}
      {selectedPOI && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 pointer-events-none">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto transition-opacity" onClick={() => setSelectedPOI(null)}></div>
          
          <div className="bg-white w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 shadow-2xl pointer-events-auto animate-slide-up relative max-h-[85vh] overflow-y-auto">
            
            <button 
              onClick={() => setSelectedPOI(null)}
              className="absolute top-6 right-6 p-2 bg-stone-50 hover:bg-stone-100 rounded-full transition-colors"
            >
              <X size={24} className="text-stone-500" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="text-6xl animate-bounce-slow filter drop-shadow-md">{selectedPOI.emoji}</div>
              <div>
                <h2 className="text-3xl font-extrabold text-zoo-dark leading-tight">{selectedPOI.name}</h2>
                <span className="text-zoo-primary font-bold">{selectedPOI.type.toUpperCase()}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100">
                <p className="text-stone-700 text-lg leading-relaxed font-medium">
                  {selectedPOI.description}
                </p>
              </div>

              <div className="bg-zoo-sand/50 p-6 rounded-3xl border border-zoo-primary/20">
                <h4 className="font-bold flex items-center gap-2 mb-4 text-zoo-dark text-lg">
                  <Info size={22} className="text-zoo-primary" />
                  Access+ Insights
                </h4>
                <div className="text-stone-800 space-y-3 font-medium leading-relaxed">
                  <ReactMarkdown
                     components={{
                        strong: ({node, ...props}) => <span className="font-bold text-zoo-dark" {...props} />,
                        p: ({node, ...props}) => <div className="mb-2" {...props} />
                     }}
                  >
                     {getCombinedNotes(selectedPOI)}
                  </ReactMarkdown>
                </div>
              </div>
              
              <div className="flex justify-center">
                 <p className="text-xs text-stone-400 font-medium italic">Ask ZooBuddy for the best route here!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZooGuide;
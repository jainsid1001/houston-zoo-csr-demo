import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { AccessibilityProfile, ChatMessage, POI } from '../types';
import { generateZooAssistantResponse } from '../services/geminiService';

interface Props {
  profiles: AccessibilityProfile[];
  pois: POI[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  externalInput: string;
  setExternalInput: (val: string) => void;
}

const Assistant: React.FC<Props> = ({ 
  profiles, 
  pois, 
  isOpen, 
  setIsOpen, 
  externalInput, 
  setExternalInput 
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Hello! 🌿 I'm **ZooBuddy**. I see you're customized for: **${profiles.join(', ')}**. I can help you find your way or answer animal questions!`,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Handle auto-focus and external inputs (like directions)
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      if (externalInput) {
        setInput(externalInput);
        setExternalInput(''); // Clear external input so it doesn't persist
      }
    }
  }, [isOpen, externalInput, setExternalInput]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await generateZooAssistantResponse(userMsg.text, profiles, pois);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-zoo-dark hover:bg-zoo-primary text-white p-4 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 z-50 flex items-center gap-3 group animate-bounce-slow"
      >
        <div className="relative">
          <MessageCircle size={28} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-zoo-dark"></span>
        </div>
        <span className="font-bold hidden md:inline text-base tracking-wide">ZooBuddy</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[90vw] md:w-96 bg-white rounded-[2rem] shadow-2xl z-50 flex flex-col border border-stone-100 overflow-hidden transform transition-all animate-slide-up ring-4 ring-black/5" style={{ maxHeight: '600px', height: '80vh' }}>
      
      {/* Header */}
      <div className="bg-white p-5 border-b border-stone-100 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-zoo-primary to-zoo-secondary rounded-full flex items-center justify-center text-white shadow-md">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-extrabold text-stone-800 text-lg leading-tight">ZooBuddy</h3>
            <span className="text-xs font-semibold text-zoo-primary bg-zoo-primary/10 px-2 py-0.5 rounded-full block truncate max-w-[150px]">
              {profiles.length > 2 ? 'Multiple Profiles' : profiles.join(' & ')}
            </span>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-stone-100 p-2 rounded-full transition-colors text-stone-400 hover:text-stone-600">
          <X size={24} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-stone-50 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm relative ${
                msg.role === 'user'
                  ? 'bg-zoo-dark text-white rounded-br-none'
                  : 'bg-white text-stone-700 rounded-bl-none border border-stone-200/60'
              }`}
            >
              {msg.role === 'model' ? (
                <ReactMarkdown
                  components={{
                    p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                    strong: ({node, ...props}) => <span className="font-bold text-inherit" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2" {...props} />,
                    li: ({node, ...props}) => <li className="mb-1" {...props} />,
                    a: ({node, ...props}) => <a className="text-zoo-primary hover:underline" {...props} />
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              ) : (
                msg.text
              )}
              {/* Timestamp tiny */}
              <div className={`text-[10px] mt-2 opacity-60 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none border border-stone-200/60 shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-zoo-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-zoo-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-zoo-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-stone-100">
        <div className="flex items-center gap-2 bg-stone-100 p-2 rounded-[1.5rem] focus-within:ring-2 focus-within:ring-zoo-primary/50 transition-all">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything..."
            className="flex-1 px-4 py-2 bg-transparent outline-none text-stone-800 placeholder-stone-400 font-medium"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-zoo-primary hover:bg-zoo-dark disabled:bg-stone-300 text-white p-3 rounded-full transition-all shadow-md active:scale-95"
          >
            <Send size={18} fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
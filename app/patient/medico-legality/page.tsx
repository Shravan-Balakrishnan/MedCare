'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

type AdvocateState = 'idle' | 'thinking' | 'talking' | 'stern' | 'happy';
type DhamuState = 'confused' | 'nervous' | 'shocked' | 'relieved' | 'listening';

export default function MedicoLegalityPage() {
  const router = useRouter();
  const [userMessage, setUserMessage] = useState('');
  const [dhamuSpeech, setDhamuSpeech] = useState('');
  const [mukkundanSpeech, setMukkandanSpeech] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [advocateState, setAdvocateState] = useState<AdvocateState>('idle');
  const [dhamuState, setDhamuState] = useState<DhamuState>('confused');
  const [hasInteracted, setHasInteracted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserMessage(e.target.value);
    if (e.target.value.trim()) {
      setDhamuSpeech(e.target.value);
      setDhamuState('nervous');
    } else {
      setDhamuSpeech('');
      setDhamuState('confused');
    }
  };

  const sendMessage = async () => {
    const trimmed = userMessage.trim();
    if (!trimmed || isLoading) return;

    setIsLoading(true);
    setHasInteracted(true);
    setAdvocateState('thinking');
    setDhamuState('nervous');
    setMukkandanSpeech('');

    try {
      const res = await fetch('/api/medico-legal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();
      const reply = data.reply || 'Kshaminikku Dhamu...';

      const lowerReply = reply.toLowerCase();
      if (lowerReply.includes('ipc') || lowerReply.includes('criminal') || lowerReply.includes('serious')) {
        setAdvocateState('stern');
        setDhamuState('shocked');
      } else if (lowerReply.includes('right') || lowerReply.includes('win') || lowerReply.includes('good news')) {
        setAdvocateState('happy');
        setDhamuState('relieved');
      } else {
        setAdvocateState('talking');
        setDhamuState('listening');
      }

      // Typewriter effect
      setMukkandanSpeech('');
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < reply.length) {
          setMukkandanSpeech(reply.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typeInterval);
          setAdvocateState('idle');
        }
      }, 18);

      setUserMessage('');
      setDhamuSpeech('');
    } catch {
      setMukkandanSpeech('Kshaminikku Dhamu... server-il oru prasnam. Oru nimisham kude nokkam.');
      setAdvocateState('idle');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') sendMessage();
  };

  const getAdvocateIndicator = () => {
    switch (advocateState) {
      case 'thinking': return { emoji: '🤔', color: 'text-yellow-400' };
      case 'stern': return { emoji: '⚖️', color: 'text-red-400' };
      case 'happy': return { emoji: '✅', color: 'text-green-400' };
      case 'talking': return { emoji: '🗣️', color: 'text-blue-400' };
      default: return { emoji: '👨‍⚖️', color: 'text-gray-400' };
    }
  };

  const getDhamuEmoji = () => {
    switch (dhamuState) {
      case 'nervous': return '😰';
      case 'shocked': return '😱';
      case 'relieved': return '😮‍💨';
      case 'listening': return '🤔';
      default: return '😕';
    }
  };

  const indicator = getAdvocateIndicator();

  const suggestedQuestions = [
    "Hospital bill kooduthal aayaal enthu cheyyam?",
    "Doctor consent ohne operation cheythaal?",
    "Medical records copy kittaan right undо?",
    "Medical negligence case file cheyyaan kazhiyumо?",
  ];

  return (
    <div className="bg-[#0e1117] h-screen text-white font-sans flex flex-col overflow-hidden">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-[#0e1117]/95 backdrop-blur border-b border-white/5 px-6 md:px-10 h-14 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/patient/dashboard')}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center text-sm">⚖️</div>
            <span className="font-bold text-base tracking-tight">MedCare</span>
          </div>
          <span className="text-xs bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full font-semibold">Medico Legality</span>
        </div>
        <button onClick={() => router.push('/')} className="text-xs text-gray-500 hover:text-white transition-colors">Sign Out</button>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col min-h-0 relative">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0e1117] pointer-events-none" />

        <div className="relative flex-1 flex flex-col min-h-0">

          {/* Scene — two characters */}
          <div className="flex-1 flex items-end justify-around px-4 md:px-16 pb-0 gap-2">

            {/* ── Dhamu (left) ── */}
            <div className="flex flex-col items-center gap-2 flex-1 max-w-[280px] self-end pb-2">
              {/* Speech Bubble */}
              <div className="relative w-full min-h-[64px] bg-white rounded-2xl px-4 py-3 shadow-2xl flex items-center">
                {dhamuSpeech ? (
                  <p className="text-gray-800 text-sm leading-relaxed font-medium">{dhamuSpeech}</p>
                ) : (
                  <div className="flex flex-col gap-1 w-full opacity-40">
                    {!hasInteracted && (
                      <>
                        <div className="h-2 bg-gray-300 rounded w-3/4" />
                        <div className="h-2 bg-gray-300 rounded w-1/2" />
                      </>
                    )}
                  </div>
                )}
                {/* Floating question marks */}
                {!hasInteracted && (
                  <div className="absolute -top-7 left-4 flex gap-1.5">
                    {['?','?','?'].map((q, i) => (
                      <span key={i} className="text-blue-400 font-bold animate-bounce" style={{ animationDelay: `${i * 200}ms`, fontSize: `${16 - i * 2}px` }}>{q}</span>
                    ))}
                  </div>
                )}
                {/* Bubble tail */}
                <div className="absolute -bottom-2.5 left-8 border-l-[12px] border-r-[0px] border-t-[12px] border-l-transparent border-t-white" />
              </div>

              {/* Character image */}
              <div className="relative flex flex-col items-center">
                <div className={`relative transition-all duration-500 ${dhamuState === 'shocked' ? 'scale-110' : ''}`}>
                  <img
                    src="/characters/dhamu.jpg"
                    alt="Dashamoolam Dhamu"
                    className="w-32 h-40 md:w-40 md:h-48 object-cover object-top rounded-2xl shadow-2xl border-2 border-white/10"
                  />
                  <div className="absolute -top-3 -right-3 text-2xl">{getDhamuEmoji()}</div>
                </div>
                <p className="text-xs text-gray-400 font-semibold mt-2">Dashamoolam Dhamu</p>
              </div>
            </div>

            {/* Center — scales of justice */}
            <div className="flex flex-col items-center gap-2 shrink-0 pb-16">
              <div className={`text-3xl transition-all duration-500 ${isLoading ? 'animate-spin' : 'animate-pulse'}`}>⚖️</div>
              <div className="w-px h-16 bg-gradient-to-b from-amber-400/60 to-transparent" />
            </div>

            {/* ── Mukundan Unni (right) ── */}
            <div className="flex flex-col items-center gap-2 flex-1 max-w-[280px] self-end pb-2">
              {/* Speech Bubble */}
              <div className={`relative w-full min-h-[64px] rounded-2xl px-4 py-3 shadow-2xl flex items-start transition-all duration-500 ${
                advocateState === 'stern' ? 'bg-[#fff3f3]' :
                advocateState === 'happy' ? 'bg-[#f0fff4]' : 'bg-[#f0f9ff]'
              }`}>
                {isLoading ? (
                  <div className="flex gap-1 items-center h-6">
                    {[0, 150, 300].map((delay) => (
                      <div key={delay} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                    ))}
                  </div>
                ) : mukkundanSpeech ? (
                  <p className="text-gray-800 text-sm leading-relaxed font-medium whitespace-pre-wrap">{mukkundanSpeech}</p>
                ) : (
                  <div className="flex flex-col gap-1 w-full opacity-40">
                    {!hasInteracted && (
                      <>
                        <div className="h-2 bg-gray-400 rounded w-full" />
                        <div className="h-2 bg-gray-400 rounded w-4/5" />
                        <div className="h-2 bg-gray-400 rounded w-3/5" />
                      </>
                    )}
                  </div>
                )}
                {/* Bubble tail */}
                <div className={`absolute -bottom-2.5 right-8 border-r-[12px] border-l-[0px] border-t-[12px] border-r-transparent ${
                  advocateState === 'stern' ? 'border-t-[#fff3f3]' :
                  advocateState === 'happy' ? 'border-t-[#f0fff4]' : 'border-t-[#f0f9ff]'
                }`} />
              </div>

              {/* Character image */}
              <div className="relative flex flex-col items-center">
                <div className={`relative transition-all duration-500 ${
                  advocateState === 'stern' ? 'scale-110' : advocateState === 'happy' ? 'scale-105' : ''
                }`}>
                  <img
                    src="/characters/mukundan.png"
                    alt="Advocate Mukundan Unni"
                    className="w-32 h-40 md:w-40 md:h-48 object-cover object-top rounded-2xl shadow-2xl border-2 border-white/10"
                  />
                  <div className={`absolute -top-3 -left-3 text-2xl ${indicator.color}`}>{indicator.emoji}</div>
                </div>
                <p className="text-xs text-gray-400 font-semibold mt-2">Adv. Mukundan Unni</p>
              </div>
            </div>

          </div>

          {/* Suggested Questions */}
          {!hasInteracted && (
            <div className="relative z-10 px-4 py-2 flex flex-wrap gap-2 justify-center">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setUserMessage(q);
                    setDhamuSpeech(q);
                    setDhamuState('nervous');
                    inputRef.current?.focus();
                  }}
                  className="text-xs bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/20 rounded-full px-3 py-1.5 text-amber-200 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <div className="relative z-10 px-4 md:px-8 py-4 bg-[#0e1117]/80 backdrop-blur border-t border-white/5 shrink-0">
            <div className="max-w-3xl mx-auto flex items-center gap-3 bg-[#1a1d24] rounded-2xl px-4 py-3 border border-white/10 shadow-2xl">
              <span className="text-gray-500 shrink-0">📎</span>
              <input
                ref={inputRef}
                type="text"
                value={userMessage}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your legal question... (Malayalam or English)"
                className="flex-1 bg-transparent text-white placeholder-gray-500 text-sm outline-none"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !userMessage.trim()}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shrink-0 ${
                  userMessage.trim() && !isLoading
                    ? 'bg-teal-500 hover:bg-teal-400 text-white shadow-lg shadow-teal-500/30'
                    : 'bg-white/10 text-gray-600'
                }`}
              >
                {isLoading ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-center text-xs text-gray-600 mt-2">⚠️ Educational purposes only. Consult a licensed lawyer for actual legal advice.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

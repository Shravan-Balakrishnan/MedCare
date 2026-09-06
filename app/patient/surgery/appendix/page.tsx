'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import app1 from './images/app1.png';
import app2 from './images/app2.png';
import app3 from './images/app3.png';
import app4 from './images/app4.png';
import app5 from './images/app5.png';
import app6 from './images/app6.png';
import app7 from './images/app7.png';
import app8 from './images/app8.png';
import appExtra from './images/image.png';

const images = [
  app1.src,
  app2.src,
  app3.src,
  app4.src,
  app5.src,
  app6.src,
  app7.src,
  app8.src,
  appExtra.src,
];

export default function AppendixSurgery() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);

  const goNext = () => {
    if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="bg-[#121212] h-screen overflow-hidden text-white font-sans flex flex-col">
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-40 bg-[#121212]/90 backdrop-blur border-b border-white/5 px-6 md:px-10 h-16 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/patient/surgery')}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            aria-label="Back"
          >
            <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#FAD2E1] flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 110 20A10 10 0 0112 2zm-1 6v5H7l5 5 5-5h-4V8h-2z" />
              </svg>
            </div>
            <span className="font-bold text-base tracking-tight">MedCare</span>
          </div>
          <span className="text-xs bg-[#FAD2E1]/20 text-[#FAD2E1] px-2 py-0.5 rounded-full font-semibold">Appendix Surgery</span>
        </div>
        <button onClick={() => router.push('/')} className="text-xs text-gray-500 hover:text-white transition-colors">
          Sign Out
        </button>
      </header>

      <main className="max-w-6xl mx-auto w-full px-6 md:px-10 py-6 flex flex-col md:flex-row gap-8 flex-1 min-h-0">
        
        {/* Sidebar */}
        {isSidebarOpen && (
          <aside className="w-full md:w-40 shrink-0 flex flex-col gap-4 h-full animate-fadeIn">
            <h2 className="text-base font-bold shrink-0">Procedure Steps</h2>
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto pb-4 md:pb-0 hide-scrollbar flex-1 min-h-0">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative w-24 h-16 md:w-full md:h-24 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    currentIndex === idx ? 'border-[#FAD2E1] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </aside>
        )}

        {/* Main Content */}
        <section className="flex-1 flex flex-col gap-4 overflow-y-auto hide-scrollbar pb-6">
          <div className="flex items-center gap-3 shrink-0">
             <button 
               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
               className="p-2 bg-[#1A1D24] rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
               aria-label="Toggle Sidebar"
             >
               <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
               </svg>
             </button>
             {!isSidebarOpen && <span className="text-sm text-gray-400 font-semibold">Show Sidebar</span>}
          </div>

          <div className="bg-[#1A1D24] rounded-[2rem] p-4 border border-white/5 shadow-xl flex items-center justify-center relative w-full aspect-video md:aspect-auto md:h-[75vh] shrink-0">
            <img
              src={images[currentIndex]}
              alt={`Step ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-xl"
            />
          </div>

          <div className="flex items-center justify-between shrink-0 mt-2">
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base transition-all ${
                currentIndex === 0
                  ? 'bg-white/5 text-gray-600 cursor-not-allowed'
                  : 'bg-white/10 text-white hover:bg-white/15'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            <button
              onClick={() => setIsReadMoreOpen(true)}
              className="text-[#FAD2E1] hover:text-white transition-colors text-base font-semibold underline underline-offset-4"
            >
              Read More
            </button>

            <button
              onClick={goNext}
              disabled={currentIndex === images.length - 1}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base transition-all ${
                currentIndex === images.length - 1
                  ? 'bg-white/5 text-gray-600 cursor-not-allowed'
                  : 'bg-[#FAD2E1] text-gray-900 hover:bg-[#ffdfec]'
              }`}
            >
              Next
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>

      </main>

      {/* Read More Modal */}
      {isReadMoreOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#1A1D24] border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button 
              onClick={() => setIsReadMoreOpen(false)}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-4">
              {/* Malayalam Column */}
              <div className="flex flex-col gap-4 text-gray-300">
                <h2 className="text-2xl font-bold text-[#FAD2E1] mb-2">അപ്പെൻഡിക്സ് ശസ്ത്രക്രിയ — രോഗികൾക്കുള്ള ലളിതമായ ഗൈഡ്</h2>
                <p className="text-sm font-medium">അപ്പെൻഡിക്സ് സംബന്ധമായ പ്രശ്നം കണ്ടെത്തുന്നതു മുതൽ ശസ്ത്രക്രിയയ്ക്കു ശേഷമുള്ള പരിചരണം വരെ, സാധാരണയായി എന്താണ് സംഭവിക്കുന്നതെന്ന് 8 ലളിതമായ ഘട്ടങ്ങളിലൂടെ മനസ്സിലാക്കാം.</p>
                
                <div className="space-y-4 text-sm leading-relaxed mt-2">
                  <div>
                    <h3 className="text-white font-semibold mb-1">1. അപ്പെൻഡിക്സ് എന്താണ്?</h3>
                    <p>അപ്പെൻഡിക്സ് വലിയ കുടലിന്റെ തുടക്കത്തോട് ചേർന്ന് കാണപ്പെടുന്ന ചെറിയ, വിരൽപോലുള്ള ഒരു ഭാഗമാണ്. വയറിന്റെ താഴെ വലതുഭാഗത്താണ് സാധാരണയായി ഇത് സ്ഥിതി ചെയ്യുന്നത്. അപ്പെൻഡിക്സിൽ പ്രശ്നമുണ്ടെന്ന് സംശയിക്കുന്ന സാഹചര്യത്തിൽ ഡോക്ടർ പരിശോധന നടത്തും.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-semibold mb-1">2. അപ്പെൻഡിക്സിലെ വീക്കം പരിശോധിക്കും</h3>
                    <p>വയറുവേദന ഉൾപ്പെടെയുള്ള ലക്ഷണങ്ങൾ ഉണ്ടെങ്കിൽ ഡോക്ടർ ശാരീരിക പരിശോധന നടത്തും. ആവശ്യമായ സാഹചര്യത്തിൽ രക്തപരിശോധനയും imaging പരിശോധനകളും നടത്താം. അപ്പെൻഡിക്സിൽ വീക്കം ഉണ്ടോ എന്നും ശസ്ത്രക്രിയ ആവശ്യമാണോ എന്നും വിലയിരുത്താൻ ഇവ സഹായിക്കും.</p>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-1">3. ശസ്ത്രക്രിയയ്ക്ക് തയ്യാറാക്കും</h3>
                    <p>ശസ്ത്രക്രിയ ആവശ്യമാണെന്ന് തീരുമാനിച്ചാൽ, മെഡിക്കൽ ടീം നടപടിക്ക് മുമ്പുള്ള തയ്യാറെടുപ്പുകൾ നടത്തും. ഇതിൽ ആവശ്യമായ fasting, മരുന്നുകൾ, anesthesia-യ്ക്കുള്ള തയ്യാറെടുപ്പ്, vital signs monitoring തുടങ്ങിയവ ഉൾപ്പെടാം. അനസ്തീഷ്യ നൽകിയ ശേഷം രോഗി ഉറക്കത്തിലായിരിക്കും.</p>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-1">4. ചെറിയ വഴികളിലൂടെ ഉപകരണങ്ങൾ അകത്തേക്ക് കടത്തും</h3>
                    <p>Laparoscopic appendectomy-യിൽ വയറിൽ ചെറിയ access points ഉപയോഗിച്ച് പ്രത്യേക surgical instruments ഉം camera-യും അകത്തേക്ക് കടത്തുന്നു. വലിയ മുറിവിനുപകരം ചെറിയ വഴികളിലൂടെ ശസ്ത്രക്രിയ നടത്താൻ ഈ രീതിക്ക് കഴിയും.</p>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-1">5. Appendix കണ്ടെത്തും</h3>
                    <p>Laparoscopic camera ഉപയോഗിച്ച് വയറിനുള്ളിലെ ഭാഗങ്ങൾ പരിശോധിച്ച് appendix കണ്ടെത്തുന്നു. വീക്കം വന്ന ഭാഗം തിരിച്ചറിയാൻ ഡോക്ടർ ശ്രദ്ധാപൂർവ്വം വിലയിരുത്തും.</p>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-1">6. Appendix ശ്രദ്ധയോടെ നീക്കം ചെയ്യും</h3>
                    <p>വീക്കം വന്ന appendix ചുറ്റുമുള്ള പ്രധാന ഘടനകൾ സംരക്ഷിച്ചുകൊണ്ട് ശ്രദ്ധാപൂർവ്വം വേർതിരിച്ച് നീക്കം ചെയ്യുന്നു. ശസ്ത്രക്രിയയുടെ ലക്ഷ്യം പ്രശ്നമുള്ള appendix സുരക്ഷിതമായി നീക്കം ചെയ്യുക എന്നതാണ്.</p>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-1">7. ശസ്ത്രക്രിയ കഴിഞ്ഞു</h3>
                    <p>ശസ്ത്രക്രിയ പൂർത്തിയായ ശേഷം ചെറിയ surgical access points അടയ്ക്കുകയും രോഗിയെ recovery area-യിലേക്ക് മാറ്റുകയും ചെയ്യും. ഉണർന്ന ശേഷം മെഡിക്കൽ ടീം രോഗിയുടെ നില പരിശോധിക്കുകയും ആവശ്യമായ aftercare നിർദ്ദേശങ്ങൾ നൽകുകയും ചെയ്യും.</p>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-1">8. ശരീരം സുഖപ്പെടാൻ സമയം നൽകുക</h3>
                    <p>ശസ്ത്രക്രിയയ്ക്ക് ശേഷം ശരീരത്തിന് സുഖപ്പെടാൻ സമയം നൽകണം. ഡോക്ടർ നിർദ്ദേശിക്കുന്ന മരുന്നുകളും wound care നിർദ്ദേശങ്ങളും പാലിക്കുകയും ആവശ്യമായ follow-up പരിശോധനകളിൽ പങ്കെടുക്കുകയും വേണം.</p>
                  </div>

                  <div className="bg-[#FAD2E1]/10 p-4 rounded-xl border border-[#FAD2E1]/20 mt-6">
                    <p className="font-semibold text-[#FAD2E1]">ഓർമ്മിക്കുക:</p>
                    <p className="text-xs mt-1">ഓരോ രോഗിയുടെയും അവസ്ഥയും ശസ്ത്രക്രിയയും recovery സമയവും വ്യത്യസ്തമായിരിക്കാം. നിങ്ങളുടെ സ്വന്തം ചികിത്സയെക്കുറിച്ച് എപ്പോഴും നിങ്ങളുടെ ഡോക്ടറുടെ നിർദ്ദേശങ്ങൾ പിന്തുടരുക.</p>
                  </div>
                </div>
              </div>

              {/* English Column */}
              <div className="flex flex-col gap-4 text-gray-300">
                <h2 className="text-2xl font-bold text-[#FAD2E1] mb-2">Appendectomy — A Simple Guide</h2>
                <p className="text-sm font-medium">From understanding the appendix to recovering after surgery, here is a simple 8-step overview of what a patient may experience.</p>
                
                <div className="space-y-4 text-sm leading-relaxed mt-2">
                  <div>
                    <h3 className="text-white font-semibold mb-1">1. What is the appendix?</h3>
                    <p>The appendix is a small, finger-shaped structure attached near the beginning of the large intestine. It is usually located in the lower-right part of the abdomen. When there is a suspected problem with the appendix, the doctor will evaluate the patient.</p>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-1">2. The doctor checks for inflammation</h3>
                    <p>If symptoms such as abdominal pain suggest a possible appendix problem, the doctor performs a physical examination. Depending on the situation, blood tests and imaging may also be performed. These help the medical team assess whether the appendix is inflamed and whether surgery may be needed.</p>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-1">3. You will be prepared for surgery</h3>
                    <p>If surgery is recommended, the medical team prepares the patient for the procedure. This may include fasting, medications, preparation for anesthesia, and monitoring of vital signs. Anesthesia is given so that the patient is asleep during the operation.</p>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-1">4. Small access points are used</h3>
                    <p>During a laparoscopic appendectomy, a camera and specialized surgical instruments are inserted through small access points in the abdomen. This allows the surgeon to perform the procedure through small openings rather than using a large incision.</p>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-1">5. The appendix is identified</h3>
                    <p>The laparoscopic camera allows the surgeon to examine the structures inside the abdomen and identify the appendix. The surgeon carefully assesses the area to identify the inflamed appendix.</p>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-1">6. The appendix is carefully removed</h3>
                    <p>The inflamed appendix is carefully separated and removed while protecting the surrounding structures. The goal of the operation is to safely remove the problematic appendix.</p>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-1">7. The surgery is completed</h3>
                    <p>After the procedure, the small surgical access points are closed and the patient is moved to a recovery area. Once awake, the medical team monitors the patient and provides appropriate aftercare instructions.</p>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-1">8. Give your body time to recover</h3>
                    <p>After surgery, the body needs time to heal. Follow your doctor’s instructions regarding medications, wound care, activity, diet, and follow-up appointments.</p>
                  </div>

                  <div className="bg-[#FAD2E1]/10 p-4 rounded-xl border border-[#FAD2E1]/20 mt-6">
                    <p className="font-semibold text-[#FAD2E1]">Remember:</p>
                    <p className="text-xs mt-1">Every patient’s condition, procedure, and recovery can be different. Always follow the instructions provided by your own medical team regarding your individual care.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

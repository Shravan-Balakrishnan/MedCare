'use client';

import { useRouter } from 'next/navigation';

const stats = [
  { label: 'Health Score', value: '87', unit: '/100', color: 'text-[#A8DADC]' },
  { label: 'Steps Today', value: '6,240', unit: 'steps', color: 'text-[#FAD2E1]' },
  { label: 'Appointments', value: '2', unit: 'upcoming', color: 'text-[#E5D9F2]' },
  { label: 'Medications', value: '3', unit: 'active', color: 'text-[#FFCDB2]' },
];

export default function PatientDashboard() {
  const router = useRouter();

  return (
    <div className="bg-[#121212] min-h-screen text-white font-sans">
      {/* Top Nav */}
      <header className="sticky top-0 z-40 bg-[#121212]/90 backdrop-blur border-b border-white/5 px-6 md:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#A8DADC] flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 110 20A10 10 0 0112 2zm-1 6v5H7l5 5 5-5h-4V8h-2z" />
            </svg>
          </div>
          <span className="font-bold text-base tracking-tight">MedCare</span>
          <span className="ml-2 text-xs bg-[#A8DADC]/20 text-[#A8DADC] px-2 py-0.5 rounded-full font-semibold">Patient</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400 hidden md:block">admin</span>
          <div className="w-9 h-9 rounded-full bg-[#A8DADC] flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 4-1.5 4-4s-1.3-4-4-4-4 1.5-4 4 1.3 4 4 4zm0 2c-3.3 0-6 1.7-6 4v1h12v-1c0-2.3-2.7-4-6-4z" />
            </svg>
          </div>
          <button
            onClick={() => router.push('/')}
            className="text-xs text-gray-500 hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 md:px-10 py-10 flex flex-col gap-10">

        {/* Welcome Header */}
        <section className="flex flex-col gap-1">
          <p className="text-xs text-[#A8DADC] uppercase tracking-widest font-semibold">Patient Portal</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Welcome back,<br />
            <span className="text-[#A8DADC]">Admin</span> 👋
          </h1>
          <p className="text-gray-400 text-base mt-2">
            Let&apos;s explore your health journey today.
          </p>
        </section>

        {/* Stats Row */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#1A1D24] rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-colors">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">{s.label}</p>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-600 mt-0.5">{s.unit}</p>
            </div>
          ))}
        </section>

        {/* Main Action Cards */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">What would you like to do?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Triage Card */}
            <button
              onClick={() => router.push('/patient/triage')}
              className="group bg-[#FAD2E1] h-[300px] rounded-[2rem] p-8 flex flex-col justify-between shadow-lg transition-transform hover:scale-105 cursor-pointer text-left relative overflow-hidden"
            >
              <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-white/20 group-hover:scale-110 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gray-900/15 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-900/60">Symptom Check</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">Start Triage</h3>
                <p className="text-gray-900/70 text-sm mt-2 leading-relaxed">Not feeling well? Let&apos;s check your symptoms.</p>
                <div className="mt-5 inline-flex items-center gap-2 font-bold text-sm text-gray-900 group-hover:translate-x-1 transition-transform">
                  Begin Assessment
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </button>

            {/* Surgery Journey Card */}
            <button
              onClick={() => router.push('/patient/surgery')}
              className="group bg-[#A8DADC] h-[300px] rounded-[2rem] p-8 flex flex-col justify-between shadow-lg transition-transform hover:scale-105 cursor-pointer text-left relative overflow-hidden"
            >
              <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-white/20 group-hover:scale-110 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gray-900/15 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-900/60">Procedure Tracker</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">My Surgery Journey</h3>
                <p className="text-gray-900/70 text-sm mt-2 leading-relaxed">Explore your upcoming procedure step-by-step.</p>
                <div className="mt-5 inline-flex items-center gap-2 font-bold text-sm text-gray-900 group-hover:translate-x-1 transition-transform">
                  View Timeline
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </button>

            {/* Medico Legality Card */}
            <button
              onClick={() => router.push('/patient/medico-legality')}
              className="group bg-[#FFF3CD] h-[300px] rounded-[2rem] p-8 flex flex-col justify-between shadow-lg transition-transform hover:scale-105 cursor-pointer text-left relative overflow-hidden"
            >
              <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-white/20 group-hover:scale-110 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gray-900/15 flex items-center justify-center mb-4">
                  <span className="text-2xl">⚖️</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-900/60">Legal Rights</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">Medico Legality</h3>
                <p className="text-gray-900/70 text-sm mt-2 leading-relaxed">Ask Advocate Mukundan Unni about your medical legal rights.</p>
                <div className="mt-5 inline-flex items-center gap-2 font-bold text-sm text-gray-900 group-hover:translate-x-1 transition-transform">
                  Ask Now
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </section>

        {/* Secondary Cards */}
        <section>
          <h2 className="text-xl font-bold mb-5">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'My Records', icon: '📋', desc: 'Lab results & history', color: 'bg-[#E5D9F2]' },
              { label: 'Prescriptions', icon: '💊', desc: 'Active medications', color: 'bg-[#FFCDB2]' },
              { label: 'Appointments', icon: '📅', desc: 'Schedule & reminders', color: 'bg-[#D8F3DC]' },
            ].map((item) => (
              <button
                key={item.label}
                className={`${item.color} rounded-2xl p-6 flex flex-col gap-3 text-left text-gray-900 hover:scale-[1.02] transition-transform shadow-md`}
              >
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <p className="font-bold text-base">{item.label}</p>
                  <p className="text-sm text-gray-900/60 mt-0.5">{item.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Health Tip Banner */}
        <section className="bg-[#1A1D24] border border-white/5 rounded-3xl p-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#A8DADC]/20 flex items-center justify-center shrink-0 text-2xl">
            💡
          </div>
          <div>
            <p className="text-xs text-[#A8DADC] uppercase tracking-widest font-semibold mb-1">Daily Tip</p>
            <p className="text-white font-semibold">Stay hydrated — aim for 8 glasses of water today.</p>
            <p className="text-sm text-gray-500 mt-1">Proper hydration supports kidney function, energy levels, and cognitive performance.</p>
          </div>
        </section>

      </main>
    </div>
  );
}

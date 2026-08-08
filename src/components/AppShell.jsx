import { Bell } from 'lucide-react'
import Sidebar from '@/components/Sidebar'

export default function AppShell({ title, subtitle, children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0F19] text-slate-100">
      <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-[#10B981]/12 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />

      <div className="relative flex min-h-screen flex-col lg:flex-row">
        <Sidebar />

        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <header className="flex items-center justify-between border-b border-white/6 px-5 py-4 sm:px-6 lg:px-10">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-100 sm:text-2xl lg:text-3xl">{title}</h1>
              {subtitle ? <p className="mt-1 text-sm text-slate-400 sm:text-base">{subtitle}</p> : null}
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="rounded-full p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-100"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
              </button>
              <div className="h-9 w-9 overflow-hidden rounded-full border border-white/10 bg-[#111827] shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
                <img src="/avatar-neela.svg" alt="User avatar" className="h-full w-full object-cover" />
              </div>
            </div>
          </header>

          <div className="custom-scrollbar flex-1 overflow-y-auto px-5 py-6 sm:px-6 lg:px-10 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

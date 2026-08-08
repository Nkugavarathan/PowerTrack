import { Gauge, RefreshCw, TrendingUp } from 'lucide-react'
import AppShell from '@/components/AppShell'

function StatBadge() {
  return (
    <div className="rounded-xl border border-white/6 bg-white/[0.03] px-5 py-4 text-right shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
      <div className="text-sm font-medium text-slate-400">Total Units</div>
      <div className="mt-1 text-sm font-semibold text-[#67e8f9]">245 kWh</div>
    </div>
  )
}

function ProgressBar() {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-slate-400">
        <span>Billing Cycle Progress</span>
        <span className="font-medium text-slate-300">22 / 30 Days</span>
      </div>
      <div className="h-2 rounded-full bg-white/5">
        <div className="h-2 w-[73%] rounded-full bg-[#10B981] shadow-[0_0_18px_rgba(16,185,129,0.35)]" />
      </div>
    </div>
  )
}

export default function DashboardOverview() {
  return (
    <AppShell title="Dashboard Overview">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.75fr)]">
          <section className="rounded-2xl border border-white/6 bg-[#111827]/70 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.25)] lg:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Current Calculated Bill
                </div>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-xl font-semibold text-[#10B981]">LKR</span>
                  <span className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
                    14,250.00
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm font-medium text-[#67e8f9]">
                  <TrendingUp className="h-4 w-4" />
                  <span>+12% from last month</span>
                </div>
              </div>
              <StatBadge />
            </div>

            <div className="mt-16">
              <ProgressBar />
            </div>
          </section>

          <section className="rounded-2xl border border-white/6 bg-[#111827]/70 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.25)] lg:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#10B981]/12 text-[#10B981]">
                <Gauge className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-slate-100">Meter Entry</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Input latest reading for real-time projection.
            </p>

            <div className="mt-6 space-y-3">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-[#10B981]">Current Reading (kWh)</span>
                <input
                  type="text"
                  placeholder="e.g. 15420"
                  className="w-full rounded-xl border border-white/6 bg-[#0F172A] px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20"
                />
              </label>
            </div>

            <button
              type="button"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#10B981] px-4 py-3 text-sm font-semibold text-[#07110b] shadow-[0_14px_30px_rgba(16,185,129,0.25)] transition-transform hover:-translate-y-0.5 hover:bg-[#12c98a]"
            >
              <RefreshCw className="h-4 w-4" />
              Update Reading
            </button>
          </section>
        </div>
      </div>
    </AppShell>
  )
}

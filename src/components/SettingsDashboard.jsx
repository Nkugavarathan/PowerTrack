import AppShell from '@/components/AppShell'
import {
  ChevronDown,
  CreditCard,
  Download,
  Plus,
  Shield,
  SlidersHorizontal,
  Trash2,
  TriangleAlert,
} from 'lucide-react'

function CardShell({ icon: Icon, title, titleClassName = 'text-slate-100', children, accentClassName = 'bg-[#10B981]/12 text-[#10B981]', borderClassName = 'border-white/8', className = '' }) {
  return (
    <section className={`rounded-2xl border ${borderClassName} bg-white/[0.04] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.28)] backdrop-blur-sm lg:p-6 ${className}`}>
      <div className="mb-5 flex items-center gap-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${accentClassName}`}>
          <Icon className="h-5 w-5" />
        </div>
        <h2 className={`text-xl font-semibold ${titleClassName}`}>{title}</h2>
      </div>
      {children}
    </section>
  )
}

function Toggle({ checked = true }) {
  return (
    <span
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full p-0.5 transition-colors ${
        checked ? 'bg-[#10B981]' : 'bg-slate-700'
      }`}
      aria-hidden="true"
    >
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#2563eb] shadow-sm transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4">
          <path d="M8.2 13.4 4.8 10l1.4-1.4 2 2 5-5L14.6 7l-6.4 6.4Z" fill="currentColor" />
        </svg>
      </span>
    </span>
  )
}

function SelectField({ label, defaultValue, options }) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-[#34d399]">{label}</span>
      <div className="relative">
        <select
          defaultValue={defaultValue}
          className="w-full appearance-none rounded-md border border-white/6 bg-white/[0.08] px-3.5 py-3 text-sm text-slate-200 outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
    </label>
  )
}

function SectionRow({ title, description, action }) {
  return (
    <div className="flex flex-col gap-4 border-t border-white/6 pt-4 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="text-sm font-medium text-slate-200">{title}</div>
        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </div>
      <div className="shrink-0">{action}</div>
    </div>
  )
}

export default function SettingsDashboard() {
  return (
    <AppShell
      title="Settings"
      subtitle="Manage your account, billing, and application preferences."
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-7">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="space-y-6">
            <CardShell icon={Shield} title="Account Security">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full border border-white/10 bg-[#111827] shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
                    <img src="/avatar-neela.svg" alt="Profile preview" className="h-full w-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-slate-200">Profile Picture</div>
                    <p className="max-w-xs text-sm leading-6 text-slate-400">
                      Update your avatar. Recommended size 256x256px.
                    </p>
                    <button
                      type="button"
                      className="rounded-lg bg-white/8 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-white/12"
                    >
                      Upload Image
                    </button>
                  </div>
                </div>
              </div>

              <div className="my-5 h-px bg-white/6" />

              <SectionRow
                title="Password"
                description="Last changed 3 months ago."
                action={
                  <button
                    type="button"
                    className="rounded-lg border border-[#10B981] px-4 py-2 text-sm font-medium text-[#10B981] transition-colors hover:bg-[#10B981]/10"
                  >
                    Update
                  </button>
                }
              />

              <div className="mt-4 flex flex-col gap-4 border-t border-white/6 pt-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-200">Two-Factor Authentication (2FA)</div>
                  <p className="mt-1 text-sm text-slate-400">
                    Add an extra layer of security to your account.
                  </p>
                </div>
                <Toggle checked />
              </div>
            </CardShell>

            <CardShell icon={SlidersHorizontal} title="App Preferences">
              <div className="flex flex-col gap-4 border-b border-white/6 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-200">Push Notifications</div>
                  <p className="mt-1 text-sm text-slate-400">
                    Receive alerts for high usage and bill generation.
                  </p>
                </div>
                <Toggle checked />
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <SelectField
                  label="Language"
                  defaultValue="English (US)"
                  options={['English (US)', 'English (UK)', 'Sinhala', 'Tamil']}
                />
                <SelectField
                  label="Currency Display"
                  defaultValue="LKR (Sri Lankan Rupee)"
                  options={['LKR (Sri Lankan Rupee)', 'USD (US Dollar)', 'EUR (Euro)']}
                />
              </div>
            </CardShell>
          </div>

          <div className="space-y-6">
            <CardShell icon={CreditCard} title="Billing Preferences">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-medium text-slate-200">Payment Methods</div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#10B981] transition-colors hover:text-[#21d699]"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </button>
              </div>

              <div className="mt-4 rounded-xl border border-white/6 bg-white/[0.03] p-3.5">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-white/8 px-2.5 py-1.5 text-xs font-semibold tracking-wide text-slate-200">
                    VISA
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-slate-100">•••• 4242</div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Primary
                    </div>
                  </div>
                  <button
                    type="button"
                    className="rounded-md p-2 text-slate-400 transition-colors hover:bg-white/6 hover:text-slate-100"
                    aria-label="Remove payment method"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-4 border-t border-white/6 pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium text-slate-200">E-Bill Setup</div>
                    <p className="mt-1 text-sm text-slate-400">Receive invoices via email.</p>
                  </div>
                  <Toggle checked />
                </div>
                <input
                  value="user@example.com"
                  readOnly
                  className="w-full rounded-md border border-white/6 bg-white/8 px-3.5 py-3 text-sm text-slate-300 outline-none"
                />
              </div>
            </CardShell>

            <CardShell
              icon={TriangleAlert}
              title="Advanced"
              titleClassName="text-[#fca5a5]"
              accentClassName="bg-[#fca5a5]/10 text-[#fca5a5]"
              borderClassName="border-[#fca5a5]/20"
              className="bg-[#2a1020]/35"
            >
              <p className="text-sm leading-6 text-slate-400">
                Export your historical consumption data or permanently delete your account.
              </p>

              <div className="mt-5 space-y-3">
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/8 px-4 py-3 text-sm font-medium text-slate-100 transition-colors hover:bg-white/12"
                >
                  <Download className="h-4 w-4" />
                  Export Data (CSV)
                </button>
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#fca5a5]/40 px-4 py-3 text-sm font-medium text-[#fca5a5] transition-colors hover:bg-[#fca5a5]/8"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </button>
              </div>
            </CardShell>
          </div>
        </div>

        <div className="flex justify-end pb-2">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl bg-[#10B981] px-6 py-3 text-sm font-semibold text-[#07110b] shadow-[0_14px_30px_rgba(16,185,129,0.25)] transition-transform hover:-translate-y-0.5 hover:bg-[#12c98a]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </AppShell>
  )
}

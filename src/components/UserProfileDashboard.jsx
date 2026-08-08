import AppShell from '@/components/AppShell'
import { Home, Pencil, Shield, User } from 'lucide-react'

function ProfileField({ label, children, wide = false }) {
  return (
    <label className={`space-y-2 ${wide ? 'md:col-span-2' : ''}`}>
      <span className="text-sm font-medium text-slate-300">{label}</span>
      {children}
    </label>
  )
}

function SectionCard({ icon: Icon, title, children }) {
  return (
    <section className="rounded-2xl border border-white/8 bg-white/[0.04] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.28)] backdrop-blur-sm lg:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#10B981]/12 text-[#10B981]">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-semibold text-slate-100">{title}</h2>
      </div>
      {children}
    </section>
  )
}

export default function UserProfileDashboard() {
  return (
    <AppShell title="User Profile" subtitle="Manage your personal details and home configuration.">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-7">
        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <section className="rounded-2xl border border-white/8 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.28)] backdrop-blur-sm">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6 mt-2">
                <div className="absolute inset-0 rounded-full bg-[#10B981]/20 blur-2xl" />
                <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-[#0B0F19] bg-[#111827] shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
                  <img src="/avatar-neela.svg" alt="Neela avatar" className="h-full w-full object-cover" />
                </div>
                <div className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border-4 border-[#0B0F19] bg-[#10B981] text-[#07110b] shadow-lg">
                  <Pencil className="h-4 w-4" />
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-slate-100">Neela</h2>
              <p className="mt-1 text-sm text-slate-400">Premium Member</p>

              <button
                type="button"
                className="mt-6 inline-flex items-center justify-center rounded-full border border-[#10B981] px-6 py-2.5 text-sm font-semibold text-[#10B981] transition-colors hover:bg-[#10B981]/10"
              >
                Change Password
              </button>
            </div>
          </section>

          <div className="space-y-6">
            <SectionCard icon={User} title="Personal Information">
              <div className="grid gap-4 md:grid-cols-2">
                <ProfileField label="Full Name">
                  <input
                    defaultValue="Anura Samarasinghe"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20"
                    placeholder="Enter full name"
                  />
                </ProfileField>
                <ProfileField label="Email Address">
                  <input
                    defaultValue="anura.s@example.com"
                    type="email"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20"
                    placeholder="Enter email address"
                  />
                </ProfileField>
                <ProfileField label="Phone Number" wide>
                  <input
                    defaultValue="+94 77 123 4567"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20"
                    placeholder="Enter phone number"
                  />
                </ProfileField>
              </div>
            </SectionCard>

            <SectionCard icon={Home} title="Home Configuration">
              <div className="grid gap-4 md:grid-cols-2">
                <ProfileField label="House Size (sq ft)">
                  <input
                    defaultValue="2500"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20"
                    placeholder="House size"
                  />
                </ProfileField>
                <ProfileField label="Number of Occupants">
                  <input
                    defaultValue="4"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20"
                    placeholder="Occupants"
                  />
                </ProfileField>
                <ProfileField label="Primary Energy Usage" wide>
                  <div className="relative">
                    <select
                      defaultValue="Cooling (AC Heavy)"
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-11 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20"
                    >
                      <option>Cooling (AC Heavy)</option>
                      <option>Mixed Residential</option>
                      <option>Heating Focused</option>
                      <option>Lighting Heavy</option>
                      <option>Appliance Heavy</option>
                    </select>
                    <svg
                      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </ProfileField>
              </div>
            </SectionCard>

            <SectionCard icon={Shield} title="Utility Provider">
              <div className="grid gap-4 md:grid-cols-2">
                <ProfileField label="Account Number">
                  <input
                    defaultValue="0987654321"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20"
                    placeholder="Account number"
                  />
                </ProfileField>
                <ProfileField label="CEB Branch">
                  <input
                    defaultValue="Colombo South"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20"
                    placeholder="Branch"
                  />
                </ProfileField>
              </div>
            </SectionCard>
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

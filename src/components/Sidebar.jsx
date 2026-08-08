"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Zap,
  LayoutDashboard,
  FileText,
  Cpu,
  Lightbulb,
  User,
  Settings,
  HelpCircle,
} from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Bills', href: '/bills', icon: FileText },
  { label: 'Appliances', href: '/appliances', icon: Cpu },
  { label: 'AI Insights', href: '/ai-insight', icon: Lightbulb },
]

const BOTTOM_ITEMS = [
  { label: 'User Profile', href: '/user-profile', icon: User },
  { label: 'Settings', href: '/settings', icon: Settings },
  { label: 'Support', href: '/support', icon: HelpCircle },
]

function NavLink({ label, href, icon: Icon, active }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all ${
        active
          ? 'bg-[#10B981] text-[#07110b] shadow-[0_12px_30px_rgba(16,185,129,0.25)]'
          : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
      }`}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span>{label}</span>
    </Link>
  )
}

export default function Sidebar() {
  const pathname = usePathname()

  function isActive(href) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <aside className="flex w-full shrink-0 flex-col border-r border-white/5 bg-[#0C1220]/90 px-4 py-5 backdrop-blur-xl lg:sticky lg:top-0 lg:h-screen lg:w-64">
      <div>
        <div className="mb-10 flex items-start gap-3 px-2 pt-1">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#10B981]/14 text-[#10B981] ring-1 ring-[#10B981]/20">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight text-[#10B981]">PowerTrack SL</div>
            <div className="mt-1 text-xs font-medium text-slate-400">Smart Energy Management</div>
          </div>
        </div>

        <nav className="space-y-1.5">
          {NAV_ITEMS.map(({ label, href, icon }) => (
            <NavLink
              key={href}
              label={label}
              href={href}
              icon={icon}
              active={isActive(href)}
            />
          ))}
        </nav>
      </div>

      <div className="mt-6 space-y-4 lg:mt-auto">
        <div className="h-px bg-white/8" />
        <nav className="space-y-1.5">
        {BOTTOM_ITEMS.map(({ label, href, icon }) => (
          <NavLink
            key={href}
            label={label}
            href={href}
            icon={icon}
            active={isActive(href)}
          />
        ))}
        </nav>
      </div>
    </aside>
  )
}

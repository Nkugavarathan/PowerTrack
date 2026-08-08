"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Zap,
  LayoutDashboard,
  FileText,
  Cpu,
  Lightbulb,
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
  { label: 'Settings', href: '/settings', icon: Settings },
  { label: 'Support', href: '/support', icon: HelpCircle },
]

function NavLink({ label, href, icon: Icon, active }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
        active
          ? 'bg-[#10DB91]/10 text-[#10DB91]'
          : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
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
    <aside className="flex w-52 shrink-0 flex-col justify-between border-r border-[#F9BE0B]/50 bg-[#0B1326]/70 p-4">
      {/* Brand */}
      <div>
        <div className="mb-1 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#10DB91]/20 text-[#10DB91]">
            <Zap className="h-5 w-5" />
          </div>
          <p className="text-sm font-bold leading-tight text-[#10DB91]">
            PowerTrack
            <br />
            SL
          </p>
        </div>
        <p className="mb-8 pl-10 text-[9px] font-semibold uppercase tracking-widest text-slate-500">
          Smart Energy Management
        </p>

        {/* Main nav */}
        <nav className="space-y-1">
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

      {/* Bottom nav */}
      <div className="space-y-1 border-t border-slate-800/80 pt-4">
        {BOTTOM_ITEMS.map(({ label, href, icon }) => (
          <NavLink
            key={href}
            label={label}
            href={href}
            icon={icon}
            active={isActive(href)}
          />
        ))}
      </div>
    </aside>
  )
}

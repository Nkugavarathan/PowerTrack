"use client"

import React, { useState } from 'react'
import {
  AlertTriangle,
  FileText,
  Lightbulb,
  CheckCircle2,
  Check,
  Bell,
} from 'lucide-react'
import Sidebar from '@/components/Sidebar'

/* ── mock data ─────────────────────────────────────────────────────────────── */

const ALL_NOTIFICATIONS = [
  {
    id: 'n1',
    category: 'usage',
    severity: 'danger',
    unread: true,
    title: 'High Consumption Detected',
    body: 'Your Air Conditioner usage in the Master Bedroom is 35% higher than your daily average. Consider raising the temperature by 1°C.',
    actionLabel: 'Review Appliance',
    actionHref: '/appliances',
    time: '10 mins ago',
    icon: 'warning',
  },
  {
    id: 'n2',
    category: 'bill',
    severity: 'tertiary',
    unread: true,
    title: 'CEB Slab Boundary Approaching',
    body: 'You are 5 units away from entering the 61-90 unit tier. Once crossed, subsequent units will be charged at a higher rate.',
    actionLabel: 'View Forecast',
    actionHref: '/ai-insight',
    time: '2 hours ago',
    icon: 'bill',
  },
  {
    id: 'n3',
    category: 'tip',
    severity: 'secondary',
    unread: false,
    title: 'Optimization Suggestion',
    body: 'Based on your historical data, scheduling your Water Heater to run between 4 AM – 5 AM could reduce peak load strain. Would you like to set an automation?',
    actionLabel: 'Set Automation',
    actionHref: '/appliances',
    time: 'Yesterday',
    icon: 'tip',
  },
  {
    id: 'n4',
    category: 'bill',
    severity: 'neutral',
    unread: false,
    title: 'Monthly Bill Generated',
    body: 'Your electricity bill for October 2023 is ready. Total amount due is Rs. 4,250.00.',
    actionLabel: 'Download PDF',
    actionHref: '/bills',
    time: '3 days ago',
    icon: 'check',
  },
]

const FILTERS = [
  { key: 'all', label: 'All Alerts' },
  { key: 'bill', label: 'Bill Alerts' },
  { key: 'usage', label: 'Usage Warnings' },
  { key: 'tip', label: 'AI Tips' },
]

/* ── severity colour maps ──────────────────────────────────────────────────── */

const SEVERITY = {
  danger:   { border: 'border-l-[#F2555A]', dot: 'bg-[#F2555A]', icon: 'bg-[#F2555A]/20 text-[#F2555A]', action: 'text-[#10DB91]' },
  tertiary: { border: 'border-l-[#F9BE0B]', dot: 'bg-[#F9BE0B]', icon: 'bg-[#F9BE0B]/20 text-[#F9BE0B]', action: 'text-[#F9BE0B]' },
  secondary:{ border: 'border-l-[#36B6D4]', dot: 'bg-[#36B6D4]', icon: 'bg-[#36B6D4]/20 text-[#36B6D4]', action: 'text-[#10DB91]' },
  neutral:  { border: 'border-l-slate-700',  dot: '',             icon: 'bg-slate-700/40 text-slate-400',  action: 'text-[#10DB91]' },
}

/* ── icon resolver ─────────────────────────────────────────────────────────── */

function NotifIcon({ type, severity }) {
  const { icon: cls } = SEVERITY[severity] ?? SEVERITY.neutral
  const size = 'h-5 w-5'
  const iconEl =
    type === 'warning' ? <AlertTriangle className={size} /> :
    type === 'bill'    ? <FileText className={size} /> :
    type === 'tip'     ? <Lightbulb className={size} /> :
                         <CheckCircle2 className={size} />

  return (
    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${cls}`}>
      {iconEl}
    </div>
  )
}

/* ── single notification card ─────────────────────────────────────────────── */

function NotificationCard({ notif }) {
  const s = SEVERITY[notif.severity] ?? SEVERITY.neutral
  return (
    <div
      className={`relative rounded-xl border border-slate-800/70 border-l-4 ${s.border} bg-[#0F172A]/60 p-4 transition-colors hover:bg-slate-800/30`}
    >
      {/* unread dot */}
      {notif.unread && (
        <span className={`absolute right-4 top-4 h-2.5 w-2.5 rounded-full ${s.dot}`} />
      )}

      <div className="flex items-start gap-3">
        <NotifIcon type={notif.icon} severity={notif.severity} />

        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="text-sm font-semibold text-white">{notif.title}</p>
            <span className="shrink-0 text-xs text-slate-500">{notif.time}</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">{notif.body}</p>
          <a
            href={notif.actionHref}
            className={`mt-2 inline-block text-xs font-semibold hover:underline ${s.action}`}
          >
            {notif.actionLabel}
          </a>
        </div>
      </div>
    </div>
  )
}

/* ── page header ───────────────────────────────────────────────────────────── */

function NotifHeader({ onMarkAll }) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-800/80 bg-[#0F172A] px-6">
      <div className="flex items-center gap-2">
        <Bell className="h-4 w-4 text-slate-400" />
        <h1 className="text-base font-bold tracking-wide text-white">Notifications Center</h1>
      </div>
      <button
        onClick={onMarkAll}
        className="flex items-center gap-1.5 rounded-lg border border-[#10DB91]/40 bg-[#10DB91]/10 px-3 py-1.5 text-xs font-semibold text-[#10DB91] transition-colors hover:bg-[#10DB91]/20"
      >
        <Check className="h-3.5 w-3.5" />
        Mark all as read
      </button>
    </header>
  )
}

/* ── main component ────────────────────────────────────────────────────────── */

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [notifications, setNotifications] = useState(ALL_NOTIFICATIONS)

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  const filtered =
    activeFilter === 'all'
      ? notifications
      : notifications.filter((n) => n.category === activeFilter)

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B1326] p-2 font-sans text-slate-100 sm:p-4 md:p-6">
      <div className="flex h-[860px] w-full max-w-[1280px] overflow-hidden rounded-2xl border border-slate-800/80 bg-[#0F172A] shadow-2xl">

        {/* ─── Sidebar ─────────────────────────────────────────────────────── */}
        <Sidebar />

        {/* ─── Main content ─────────────────────────────────────────────── */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <NotifHeader onMarkAll={markAllRead} />

          <div className="custom-scrollbar flex-1 overflow-y-auto p-6">
            {/* Page title */}
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Notifications</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Stay updated on your energy consumption, bill alerts, and AI insights.
                </p>
              </div>
              {unreadCount > 0 && (
                <span className="rounded-full bg-[#F2555A]/20 px-2.5 py-0.5 text-xs font-semibold text-[#F2555A]">
                  {unreadCount} unread
                </span>
              )}
            </div>

            {/* Filter tabs */}
            <div className="mb-6 flex flex-wrap gap-2">
              {FILTERS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    activeFilter === key
                      ? 'bg-[#10DB91] text-slate-950'
                      : 'border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Notification list */}
            <div className="space-y-3">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                  <Bell className="mb-3 h-10 w-10 opacity-30" />
                  <p className="text-sm">No notifications in this category.</p>
                </div>
              ) : (
                filtered.map((n) => <NotificationCard key={n.id} notif={n} />)
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

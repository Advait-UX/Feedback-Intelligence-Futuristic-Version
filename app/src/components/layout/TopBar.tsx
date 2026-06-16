import { useRef, useState, useEffect } from 'react'
import {
  HelpCircle, Bell, ChevronDown,
  Shield, UserCog, MessageSquare, Sparkles,
  Bot, GitBranch, Zap, Workflow,
  Network, Headphones, User, Layers, KeyRound,
  CalendarClock, Target, ClipboardCheck, TrendingUp, GraduationCap, MessageCircle, Compass, ScanSearch,
  Play, LayoutDashboard, PieChart, FileBarChart, Activity, Search, Brain,
  History, MessageSquareText, Globe, Plug, Link2, BookOpen,
} from 'lucide-react'
import { AnimatedSmile } from '../AnimatedSmile'

type App = { label: string; icon: typeof Shield; bg: string }
type Group = { tint: string; apps: App[] }

const GROUPS: Group[] = [
  {
    tint: 'var(--lyra-color-status-info-subtle)',
    apps: [
      { label: 'Admin', icon: Shield, bg: 'var(--lyra-color-status-info-subtle)' },
      { label: 'Supervisor', icon: UserCog, bg: 'var(--lyra-color-status-info-subtle)' },
      { label: 'Message Center', icon: MessageSquare, bg: 'var(--lyra-color-status-info-subtle)' },
      { label: 'AI Studio', icon: Sparkles, bg: 'var(--lyra-color-status-info-subtle)' },
    ],
  },
  {
    tint: 'var(--lyra-color-bg-ai)',
    apps: [
      { label: 'Cogingy AI', icon: Bot, bg: 'var(--lyra-color-bg-ai)' },
      { label: 'Agent Integration', icon: GitBranch, bg: 'var(--lyra-color-bg-ai)' },
      { label: 'WFI', icon: Zap, bg: 'var(--lyra-color-bg-ai)' },
      { label: 'Neva Studio', icon: Workflow, bg: 'var(--lyra-color-bg-ai)' },
    ],
  },
  {
    tint: 'var(--lyra-color-status-warning-subtle)',
    apps: [
      { label: 'ACD', icon: Network, bg: 'var(--lyra-color-status-warning-subtle)' },
      { label: 'Agent', icon: Headphones, bg: 'var(--lyra-color-status-warning-subtle)' },
      { label: 'MAX', icon: User, bg: 'var(--lyra-color-status-warning-subtle)' },
      { label: 'Studio', icon: Layers, bg: 'var(--lyra-color-status-warning-subtle)' },
      { label: 'Studio Authentication', icon: KeyRound, bg: 'var(--lyra-color-status-warning-subtle)' },
    ],
  },
  {
    tint: 'var(--lyra-color-status-success-subtle)',
    apps: [
      { label: 'Workforce Management', icon: CalendarClock, bg: 'var(--lyra-color-status-success-subtle)' },
      { label: 'Enhanced Strategic Planner', icon: Target, bg: 'var(--lyra-color-status-success-subtle)' },
      { label: 'Quality Management', icon: ClipboardCheck, bg: 'var(--lyra-color-status-success-subtle)' },
      { label: 'Feedback Intelligence', icon: MessageSquareText, bg: 'var(--lyra-color-status-success-subtle)' },
      { label: 'Performance Management', icon: TrendingUp, bg: 'var(--lyra-color-status-success-subtle)' },
      { label: 'Coaching', icon: GraduationCap, bg: 'var(--lyra-color-status-success-subtle)' },
      { label: 'Interaction Hub', icon: MessageCircle, bg: 'var(--lyra-color-status-success-subtle)' },
      { label: 'My Zone', icon: Compass, bg: 'var(--lyra-color-status-success-subtle)' },
      { label: 'Desktop Discovery', icon: ScanSearch, bg: 'var(--lyra-color-status-success-subtle)' },
    ],
  },
  {
    tint: 'var(--lyra-color-status-critical-subtle)',
    apps: [
      { label: 'Actions', icon: Play, bg: 'var(--lyra-color-status-critical-subtle)' },
      { label: 'Dashboard', icon: LayoutDashboard, bg: 'var(--lyra-color-status-critical-subtle)' },
      { label: 'Analytics', icon: PieChart, bg: 'var(--lyra-color-status-critical-subtle)' },
      { label: 'Reporting', icon: FileBarChart, bg: 'var(--lyra-color-status-critical-subtle)' },
      { label: 'Metric', icon: Activity, bg: 'var(--lyra-color-status-critical-subtle)' },
      { label: 'Self-Service Analytics', icon: Search, bg: 'var(--lyra-color-status-critical-subtle)' },
      { label: 'Enlighten XO', icon: Brain, bg: 'var(--lyra-color-status-critical-subtle)' },
    ],
  },
  {
    tint: 'var(--lyra-slate-100)',
    apps: [
      { label: 'Performance Management (legacy)', icon: History, bg: 'var(--lyra-slate-100)' },
      { label: 'Digital', icon: Globe, bg: 'var(--lyra-slate-100)' },
      { label: 'Adapters', icon: Plug, bg: 'var(--lyra-slate-100)' },
      { label: 'Connections Hub', icon: Link2, bg: 'var(--lyra-slate-100)' },
      { label: 'Guide', icon: BookOpen, bg: 'var(--lyra-slate-100)' },
    ],
  },
]

interface TopBarProps {
  onAppSwitch?: (appLabel: string) => void
  /** Label shown in the app-switcher pill (defaults to "Feedback Intelligence"). */
  appName?: string
}

export function TopBar({ onAppSwitch, appName = 'Feedback Intelligence' }: TopBarProps = {}) {
  const [appSwitcherOpen, setAppSwitcherOpen] = useState(false)
  const switcherRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 })

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (switcherRef.current && !switcherRef.current.contains(e.target as Node)) {
        setAppSwitcherOpen(false)
      }
    }
    if (appSwitcherOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [appSwitcherOpen])

  function handleToggle() {
    if (!appSwitcherOpen && headerRef.current) {
      const headerRect = headerRef.current.getBoundingClientRect()
      const top = headerRect.bottom + 8
      const left = 8
      setDropdownPos({ top, left })
    }
    setAppSwitcherOpen(o => !o)
  }

  return (
    <header ref={headerRef} className="flex h-12 items-center justify-between px-4 pt-1 flex-shrink-0 w-full" style={{ background: 'var(--lyra-color-bg-surface-shell)' }}>
      {/* Left: logo + app name — clicking opens the App Menu */}
      <div ref={switcherRef} className="relative flex items-center">
        <button
          onClick={handleToggle}
          className="flex h-8 items-center gap-2 rounded-md px-1.5 hover:bg-accent transition-colors"
        >
          <AnimatedSmile size={20} className="block flex-shrink-0" />
          <span className="text-sm font-medium text-foreground">{appName}</span>
          <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${appSwitcherOpen ? 'rotate-180' : ''}`} />
        </button>

        {appSwitcherOpen && (
          <div
            className="fixed z-50 flex flex-col w-[320px] rounded-xl overflow-hidden"
            style={{
              border: '1px solid var(--lyra-color-border-soft)',
              backgroundColor: 'var(--lyra-color-bg-surface-overlay)',
              boxShadow: 'var(--sol-effect-shadowlg)',
              top: dropdownPos.top,
              left: dropdownPos.left,
              maxHeight: `calc(100vh - ${dropdownPos.top + 8}px)`,
            }}
          >
            {/* Scrollable app list */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
              {GROUPS.map((group, gi) => (
                <div key={gi} className="flex flex-col gap-1">
                  {group.apps.map(app => {
                    const Icon = app.icon
                    return (
                      <button
                        key={app.label}
                        onClick={() => {
                          setAppSwitcherOpen(false)
                          onAppSwitch?.(app.label)
                        }}
                        className="flex items-center gap-2 h-8 px-2 rounded-lg transition-colors text-left"
                        style={{ color: 'var(--lyra-color-fg-default)' }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--lyra-color-state-bg-hover-opacity)')}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '')}
                      >
                        <span
                          className="flex h-6 w-6 items-center justify-center rounded-md flex-shrink-0"
                          style={{ backgroundColor: app.bg }}
                        >
                          <Icon className="h-3.5 w-3.5" style={{ color: 'var(--lyra-color-fg-default)' }} strokeWidth={1.75} />
                        </span>
                        <span
                          className="text-sm font-medium truncate"
                          style={{ color: 'var(--lyra-color-fg-default)', lineHeight: '18px' }}
                        >
                          {app.label}
                        </span>
                      </button>
                    )
                  })}
                  {gi < GROUPS.length - 1 && <div className="h-px my-1" style={{ backgroundColor: 'var(--lyra-color-border-subtle)' }} />}
                </div>
              ))}
            </div>

            {/* CXone footer */}
            <div className="flex items-center justify-center h-16 flex-shrink-0" style={{ borderTop: '1px solid var(--lyra-color-border-subtle)' }}>
              <div className="flex items-center gap-1.5">
                <span className="text-[15px] font-semibold tracking-tight" style={{ color: 'var(--lyra-color-fg-default)' }}>NiCE</span>
                <span className="flex items-center px-1.5 py-0.5 rounded-md text-xs font-semibold tracking-wide" style={{ backgroundColor: 'var(--lyra-color-bg-primary)', color: 'var(--lyra-color-fg-on-primary)' }}>
                  CX<span className="rounded-sm px-0.5 ml-0.5" style={{ backgroundColor: 'var(--lyra-color-bg-surface-base)', color: 'var(--lyra-color-bg-primary)' }}>one</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right: utilities */}
      <div className="flex items-center gap-1">
        <button className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
          <HelpCircle className="h-5 w-5" />
        </button>

        <button className="relative flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full text-xs font-semibold leading-none" style={{ backgroundColor: 'var(--lyra-color-bg-destructive)', color: 'var(--lyra-color-fg-inverse)' }}>
            5
          </span>
        </button>

        <div className="ml-1 flex items-center gap-1 cursor-pointer">
          <div className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold select-none" style={{ backgroundColor: 'var(--lyra-color-bg-primary)', color: 'var(--lyra-color-fg-on-primary)' }}>
            JS
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
      </div>
    </header>
  )
}

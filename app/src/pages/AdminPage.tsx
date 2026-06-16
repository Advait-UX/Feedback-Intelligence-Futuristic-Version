import { useState } from 'react'
import {
  Users, GraduationCap, FolderKanban, FileText, Network,
  CalendarClock, MapPin, Mic, Settings, Shield,
  ChevronDown, ChevronUp, ChevronRight,
  Search, ListFilter, MoreVertical,
} from 'lucide-react'
import { TopBar } from '../components/layout/TopBar'

/* ---------- Sidebar nav ---------- */
type Child = { id: string; label: string }
type NavItem = {
  id: string
  label: string
  icon: typeof Users
  active?: boolean
  children?: Child[]
  defaultOpen?: boolean
}

const NAV: NavItem[] = [
  { id: 'employees',           label: 'Employees',           icon: Users,           active: true },
  { id: 'wem-skills',          label: 'WEM Skills',          icon: GraduationCap },
  { id: 'groups',              label: 'Groups',              icon: FolderKanban },
  { id: 'employee-templates',  label: 'Employee Templates',  icon: FileText },
  { id: 'teams',               label: 'Teams',               icon: Network },
  { id: 'scheduling-unit',     label: 'Scheduling Unit',     icon: CalendarClock },
  {
    id: 'locations', label: 'Locations', icon: MapPin, defaultOpen: false,
    children: [{ id: 'location-definitions', label: 'Location Definitions' }],
  },
  {
    id: 'recording', label: 'Recording', icon: Mic, defaultOpen: false,
    children: [
      { id: 'business-data',          label: 'Business Data' },
      { id: 'recording-policies',     label: 'Recording Policies' },
      { id: 'real-time-ai-policies',  label: 'Real Time AI Policies' },
      { id: 'third-party-systems',    label: 'Third Party Systems' },
      { id: 'screen-agent-manager',   label: 'ScreenAgent Manager' },
    ],
  },
  {
    id: 'tenant-configuration', label: 'Tenant Configuration', icon: Settings, defaultOpen: false,
    children: [
      { id: 'account-settings',   label: 'Account Settings' },
      { id: 'data-share',         label: 'Data Share' },
      { id: 'bulk-upload-portal', label: 'Bulk Upload Portal' },
      { id: 'hierarchies',        label: 'Hierarchies' },
    ],
  },
  {
    id: 'security-settings', label: 'Security Settings', icon: Shield, defaultOpen: false,
    children: [
      { id: 'roles-and-permissions', label: 'Roles and Permissions' },
      { id: 'login-authenticator',   label: 'Login Authenticator' },
      { id: 'views',                 label: 'Views' },
    ],
  },
]

/* ---------- Employees mock data ---------- */
type Employee = {
  initials: string
  name: string
  role: string
  username: string
  schedulingUnit: string
  virtualAgent: 'True' | 'False'
  state: 'active' | 'pending'
}

const EMPLOYEES: Employee[] = [
  { initials: 'AB', name: 'Aaron Bennett',     role: 'Admin',         username: 'aaron.bennett@trevalcompany.com',     schedulingUnit: 'East Coast SU',     virtualAgent: 'False', state: 'active' },
  { initials: 'AC', name: 'Abigail Carter',    role: 'Admin',         username: 'abigail.carter@trevalcompany.com',    schedulingUnit: 'East Coast SU',     virtualAgent: 'False', state: 'active' },
  { initials: 'AM', name: 'Adam Mitchell',     role: 'Manager',       username: 'adam.mitchell@trevalcompany.com',     schedulingUnit: 'VP Central Time SU', virtualAgent: 'False', state: 'active' },
  { initials: 'AT', name: 'Allison Turner',    role: 'Administrator', username: 'allison.turner@trevalcompany.com',    schedulingUnit: 'Pacific SU',         virtualAgent: 'True',  state: 'pending' },
  { initials: 'AR', name: 'Amanda Reed',       role: 'Administrator', username: 'amanda.reed@trevalcompany.com',       schedulingUnit: 'Pacific SU',         virtualAgent: 'False', state: 'active' },
  { initials: 'AS', name: 'Adam Smith',        role: 'Agent',         username: 'adam.smith@trevalcompany.com',        schedulingUnit: 'Pacific SU',         virtualAgent: 'False', state: 'active' },
  { initials: 'AC', name: 'Andrea Collins',    role: 'Admin',         username: 'andrea.collins@trevalcompany.com',    schedulingUnit: 'Pacific SU',         virtualAgent: 'False', state: 'active' },
  { initials: 'AK', name: 'Andrew King',       role: 'Administrator', username: 'andrew.king@trevalcompany.com',       schedulingUnit: 'Mountain SU',        virtualAgent: 'False', state: 'pending' },
  { initials: 'AR', name: 'Anthony Russell',   role: 'Manager',       username: 'anthony.russell@trevalcompany.com',   schedulingUnit: 'VP Central Time SU', virtualAgent: 'False', state: 'active' },
  { initials: 'AP', name: 'Ashley Parker',     role: 'Administrator', username: 'ashley.parker@trevalcompany.com',     schedulingUnit: 'Mountain SU',        virtualAgent: 'False', state: 'active' },
  { initials: 'AH', name: 'Austin Hayes',      role: 'Admin',         username: 'austin.hayes@trevalcompany.com',      schedulingUnit: 'East Coast SU',     virtualAgent: 'False', state: 'active' },
  { initials: 'BB', name: 'Benjamin Brooks',   role: 'Administrator', username: 'benjamin.brooks@trevalcompany.com',   schedulingUnit: 'VP Central Time SU', virtualAgent: 'False', state: 'active' },
  { initials: 'BC', name: 'Brittany Coleman',  role: 'Administrator', username: 'brittany.coleman@trevalcompany.com',  schedulingUnit: 'VP Central Time SU', virtualAgent: 'False', state: 'active' },
  { initials: 'CM', name: 'Caleb Morgan',      role: 'Administrator', username: 'caleb.morgan@trevalcompany.com',      schedulingUnit: 'Pacific SU',         virtualAgent: 'False', state: 'active' },
]

/* ============================================================ */

interface Props {
  onAppSwitch?: (appLabel: string) => void
}

export function AdminPage({ onAppSwitch }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden" style={{ background: 'var(--lyra-color-bg-surface-shell)' }}>
      <TopBar appName="Admin" onAppSwitch={onAppSwitch} />
      <div className="relative flex flex-1 overflow-hidden gap-0">
        {/* Sidebar — blends into canvas */}
        <AdminSidebar open={sidebarOpen} />

        {/* Floating collapse toggle, sits on the seam between sidebar and main */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          className="absolute z-20 flex h-5 w-5 items-center justify-center rounded-full bg-white border border-[--lyra-color-border-soft] shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-[--lyra-color-border-focus-default]"
          style={{
            left: sidebarOpen ? '244px' : '48px',
            top: '20px',
            color: 'var(--lyra-color-fg-secondary)',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--lyra-color-fg-default)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--lyra-color-fg-secondary)' }}
        >
          <ChevronRight className={`h-3 w-3 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
        </button>

        <EmployeesView />
      </div>
    </div>
  )
}

/* ---------- Left sidebar ---------- */
function AdminSidebar({ open }: { open: boolean }) {
  const [openIds, setOpenIds] = useState<Set<string>>(
    new Set(NAV.filter(n => n.defaultOpen).map(n => n.id))
  )
  const toggle = (id: string) => {
    setOpenIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <aside
      className="flex-shrink-0 overflow-y-auto overflow-x-hidden transition-all duration-200"
      style={{
        width: open ? 256 : 60,
        background: 'var(--lyra-color-bg-surface-shell)',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <nav className="flex flex-col px-3 pt-2 pb-5">
        {NAV.map(item => {
          const Icon = item.icon
          const hasChildren = item.children && item.children.length > 0
          const isGroupOpen = openIds.has(item.id)
          return (
            <div key={item.id}>
              {/* Parent nav item */}
              <button
                onClick={() => hasChildren && toggle(item.id)}
                title={!open ? item.label : undefined}
                className="relative flex items-center w-full rounded-lg transition-colors duration-100 focus-visible:outline-2 focus-visible:outline-[--lyra-color-border-focus-default]"
                style={{
                  height: 36,
                  padding: open ? '0 10px' : '0',
                  justifyContent: open ? undefined : 'center',
                  gap: open ? 8 : undefined,
                  backgroundColor: item.active ? 'var(--lyra-color-bg-active-moderate)' : undefined,
                }}
                onMouseEnter={e => {
                  if (!item.active) (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--lyra-color-state-bg-hover-opacity)'
                }}
                onMouseLeave={e => {
                  if (!item.active) (e.currentTarget as HTMLElement).style.backgroundColor = ''
                }}
              >
                {/* 2px left accent bar for active item */}
                {item.active && (
                  <span aria-hidden="true" style={{
                    position: 'absolute', left: 0, top: 10, bottom: 10,
                    width: 2, background: 'var(--lyra-color-border-active)', borderRadius: 2,
                  }} />
                )}
                <Icon
                  className="flex-shrink-0"
                  style={{ width: 16, height: 16, color: item.active ? 'var(--lyra-color-fg-active-strong)' : 'var(--lyra-color-fg-default)' }}
                />
                {open && (
                  <>
                    <span
                      className="flex-1 text-left truncate"
                      style={{
                        fontSize: 14, lineHeight: '20px',
                        fontWeight: item.active ? 500 : 400,
                        color: item.active ? 'var(--lyra-color-fg-active-strong)' : 'var(--lyra-color-fg-default)',
                      }}
                    >
                      {item.label}
                    </span>
                    {hasChildren && (
                      isGroupOpen
                        ? <ChevronUp style={{ width: 14, height: 14, color: 'var(--lyra-color-fg-disabled)', flexShrink: 0 }} />
                        : <ChevronDown style={{ width: 14, height: 14, color: 'var(--lyra-color-fg-disabled)', flexShrink: 0 }} />
                    )}
                  </>
                )}
              </button>

              {/* Child items */}
              {open && hasChildren && isGroupOpen && (
                <div className="flex flex-col">
                  {item.children!.map(c => (
                    <button
                      key={c.id}
                      className="flex items-center w-full rounded-lg transition-colors duration-100 focus-visible:outline-2 focus-visible:outline-[--lyra-color-border-focus-default]"
                      style={{ height: 32, padding: '0 10px 0 34px', fontSize: 14, color: 'var(--lyra-color-fg-default)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--lyra-color-state-bg-hover-opacity)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '' }}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}

/* ---------- Employees view ---------- */
function EmployeesView() {
  return (
    <main className="flex-1 overflow-hidden flex flex-col bg-white rounded-xl border border-[--lyra-color-border-subtle]" style={{ margin: '8px 12px 12px 0', boxShadow: 'var(--sol-effect-shadowsm)' }}>
      {/* Pane-head — Lyra spec: min-height 80px, padding 16px 32px, gap 40px */}
      <div
        className="flex items-center flex-shrink-0"
        style={{
          minHeight: 80,
          padding: '16px 32px',
          gap: 40,
          borderBottom: '1px solid var(--lyra-color-border-subtle)',
        }}
      >
        <h1
          className="flex-1 min-w-0 truncate"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 20,
            fontWeight: 600,
            lineHeight: '24px',
            letterSpacing: '-0.01rem',
            margin: 0,
            color: 'var(--lyra-color-fg-default)',
          }}
        >
          Employees
        </h1>
        {/* Head-actions */}
        <div className="flex items-center flex-shrink-0" style={{ gap: 8 }}>
          <button
            className="rounded-lg border transition-colors focus-visible:outline-2 focus-visible:outline-[--lyra-color-border-focus-default]"
            style={{
              height: 36, padding: '0 16px',
              border: '1px solid var(--lyra-color-border-soft)',
              background: 'var(--lyra-color-bg-surface-base)',
              fontFamily: 'var(--font-sans)',
              fontSize: 14, fontWeight: 500, lineHeight: '20px',
              color: 'var(--lyra-color-fg-action)',
            }}
          >
            Import Employees
          </button>
          <button
            className="rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[--lyra-color-border-focus-default]"
            style={{
              height: 36, padding: '0 16px',
              background: 'var(--lyra-color-bg-primary)',
              border: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: 14, fontWeight: 500, lineHeight: '20px',
              color: 'var(--lyra-color-fg-on-primary)',
            }}
          >
            Create Employee
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[--lyra-color-border-subtle] flex-shrink-0" style={{ background: 'var(--lyra-color-bg-surface-shell)' }}>
        <div className="flex items-center gap-4">
          <span className="text-sm" style={{ color: 'var(--lyra-color-fg-secondary)' }}>142 employees</span>
          <span className="w-px h-4 border-[--lyra-color-border-soft]" style={{ background: 'var(--lyra-color-border-soft)' }} />
          <span className="text-sm" style={{ color: 'var(--lyra-color-fg-secondary)' }}>0 Selected</span>
          <div className="relative ml-2">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none" style={{ color: 'var(--lyra-color-fg-disabled)' }} />
            <input
              placeholder="Start typing to find user"
              className="h-8 w-[280px] rounded-md border border-[--lyra-color-border-soft] bg-white pl-8 pr-2 text-sm focus:outline-none focus:ring-1 focus:ring-[--lyra-color-border-focus-default]"
              style={{ color: 'var(--lyra-color-fg-default)' }}
            />
          </div>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-md border border-[--lyra-color-border-soft] bg-white focus-visible:outline-2 focus-visible:outline-[--lyra-color-border-focus-default]"
            aria-label="Filter"
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--lyra-color-bg-surface-shell)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'white' }}
          >
            <ListFilter className="h-3.5 w-3.5" style={{ color: 'var(--lyra-color-fg-secondary)' }} />
          </button>
        </div>
        <div>
          <button
            className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md border border-[--lyra-color-border-soft] bg-white text-sm focus-visible:outline-2 focus-visible:outline-[--lyra-color-border-focus-default]"
            style={{ color: 'var(--lyra-color-fg-default)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--lyra-color-bg-surface-shell)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'white' }}
          >
            <ListFilter className="h-3.5 w-3.5" style={{ color: 'var(--lyra-color-fg-secondary)' }} />
            <span>All</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b border-[--lyra-color-border-subtle]">
              <th className="w-10 px-4 py-3"><input type="checkbox" /></th>
              <th className="w-10" />
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap" style={{ color: 'var(--lyra-color-fg-disabled)' }}>Name ↑</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap" style={{ color: 'var(--lyra-color-fg-disabled)' }}>Role</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap" style={{ color: 'var(--lyra-color-fg-disabled)' }}>Type</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap" style={{ color: 'var(--lyra-color-fg-disabled)' }}>Username</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap" style={{ color: 'var(--lyra-color-fg-disabled)' }}>Scheduling Unit</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap" style={{ color: 'var(--lyra-color-fg-disabled)' }}>Virtual Agent</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap" style={{ color: 'var(--lyra-color-fg-disabled)' }}>State</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap" style={{ color: 'var(--lyra-color-fg-disabled)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {EMPLOYEES.map((e, i) => (
              <tr key={i} className="border-b border-[--lyra-color-border-subtle] transition-colors"
                onMouseEnter={ev => { (ev.currentTarget as HTMLElement).style.background = 'var(--lyra-color-bg-surface-shell)' }}
                onMouseLeave={ev => { (ev.currentTarget as HTMLElement).style.background = '' }}
              >
                <td className="px-4 py-3"><input type="checkbox" /></td>
                <td className="py-2">
                  <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: 'var(--lyra-color-border-soft)', color: 'var(--lyra-color-fg-secondary)' }}>
                    {e.initials}
                  </div>
                </td>
                <td className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: 'var(--lyra-color-fg-default)' }}>{e.name}</td>
                <td className="px-4 py-3" style={{ color: 'var(--lyra-color-fg-default)' }}>{e.role}</td>
                <td className="px-4 py-3" style={{ color: 'var(--lyra-color-fg-default)' }} />
                <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--lyra-color-fg-default)' }}>{e.username}</td>
                <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--lyra-color-fg-default)' }}>{e.schedulingUnit}</td>
                <td className="px-4 py-3" style={{ color: 'var(--lyra-color-fg-default)' }}>{e.virtualAgent}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 text-sm">
                    <span
                      className="h-3.5 w-3.5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: e.state === 'active' ? 'var(--lyra-color-status-success-strong)' : 'var(--lyra-color-status-warning-strong)' }}
                    >
                      {e.state === 'active' ? (
                        <span className="text-white text-xs leading-none">✓</span>
                      ) : (
                        <span className="text-white text-xs leading-none">⏱</span>
                      )}
                    </span>
                    <span style={{ color: e.state === 'active' ? 'var(--lyra-color-status-success-strong)' : 'var(--lyra-color-status-warning-strong)' }}>
                      {e.state === 'active' ? 'Active' : 'Pending'}
                    </span>
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    className="flex h-7 w-7 items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-[--lyra-color-border-focus-default]"
                    aria-label="More actions"
                    onMouseEnter={ev => { (ev.currentTarget as HTMLElement).style.background = 'var(--lyra-color-bg-surface-shell)' }}
                    onMouseLeave={ev => { (ev.currentTarget as HTMLElement).style.background = '' }}
                  >
                    <MoreVertical className="h-4 w-4" style={{ color: 'var(--lyra-color-fg-disabled)' }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

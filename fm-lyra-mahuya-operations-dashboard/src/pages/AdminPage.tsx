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
    id: 'locations', label: 'Locations', icon: MapPin, defaultOpen: true,
    children: [{ id: 'location-definitions', label: 'Location Definitions' }],
  },
  {
    id: 'recording', label: 'Recording', icon: Mic, defaultOpen: true,
    children: [
      { id: 'business-data',          label: 'Business Data' },
      { id: 'recording-policies',     label: 'Recording Policies' },
      { id: 'real-time-ai-policies',  label: 'Real Time AI Policies' },
      { id: 'third-party-systems',    label: 'Third Party Systems' },
      { id: 'screen-agent-manager',   label: 'ScreenAgent Manager' },
    ],
  },
  {
    id: 'tenant-configuration', label: 'Tenant Configuration', icon: Settings, defaultOpen: true,
    children: [
      { id: 'account-settings',   label: 'Account Settings' },
      { id: 'data-share',         label: 'Data Share' },
      { id: 'bulk-upload-portal', label: 'Bulk Upload Portal' },
      { id: 'hierarchies',        label: 'Hierarchies' },
    ],
  },
  {
    id: 'security-settings', label: 'Security Settings', icon: Shield, defaultOpen: true,
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
    <div className="h-screen w-screen flex flex-col overflow-hidden" style={{ background: 'rgb(243, 245, 246)' }}>
      <TopBar appName="Admin" onAppSwitch={onAppSwitch} />
      <div className="relative flex flex-1 overflow-hidden gap-0">
        {/* Sidebar — blends into canvas */}
        <AdminSidebar open={sidebarOpen} />

        {/* Floating collapse toggle, sits on the seam between sidebar and main */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          className="absolute z-20 flex h-5 w-5 items-center justify-center rounded-full bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1] shadow-sm transition-all outline-none focus:outline-none"
          style={{
            left: sidebarOpen ? '244px' : '48px',
            top: '20px',
          }}
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
        background: 'rgb(243, 245, 246)',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
                className="relative flex items-center w-full rounded-lg transition-colors duration-100 outline-none focus:outline-none"
                style={{
                  height: 36,
                  padding: open ? '0 10px' : '0',
                  justifyContent: open ? undefined : 'center',
                  gap: open ? 8 : undefined,
                  backgroundColor: item.active ? '#d3e6fd' : undefined,
                }}
                onMouseEnter={e => {
                  if (!item.active) (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(0,0,0,0.04)'
                }}
                onMouseLeave={e => {
                  if (!item.active) (e.currentTarget as HTMLElement).style.backgroundColor = ''
                }}
              >
                {/* 2px left accent bar for active item */}
                {item.active && (
                  <span aria-hidden="true" style={{
                    position: 'absolute', left: 0, top: 10, bottom: 10,
                    width: 2, background: '#185ba4', borderRadius: 2,
                  }} />
                )}
                <Icon
                  className="flex-shrink-0"
                  style={{ width: 16, height: 16, color: item.active ? '#185ba4' : 'rgba(0,0,0,0.80)' }}
                />
                {open && (
                  <>
                    <span
                      className="flex-1 text-left truncate"
                      style={{
                        fontSize: 13, lineHeight: '16px',
                        fontWeight: item.active ? 500 : 400,
                        color: item.active ? '#185ba4' : 'rgba(0,0,0,0.80)',
                      }}
                    >
                      {item.label}
                    </span>
                    {hasChildren && (
                      isGroupOpen
                        ? <ChevronUp style={{ width: 14, height: 14, color: 'rgba(0,0,0,0.40)', flexShrink: 0 }} />
                        : <ChevronDown style={{ width: 14, height: 14, color: 'rgba(0,0,0,0.40)', flexShrink: 0 }} />
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
                      className="flex items-center w-full rounded-lg transition-colors duration-100 outline-none focus:outline-none"
                      style={{ height: 32, padding: '0 10px 0 34px', fontSize: 13, color: 'rgba(0,0,0,0.80)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(0,0,0,0.04)' }}
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
    <main className="flex-1 overflow-hidden flex flex-col bg-white rounded-xl border border-[rgba(0,0,0,0.10)]" style={{ margin: '8px 12px 12px 0', boxShadow: '0px 2px 6px 0px rgba(0,0,0,0.04)' }}>
      {/* Pane-head — Lyra spec: min-height 80px, padding 16px 32px, gap 40px */}
      <div
        className="flex items-center flex-shrink-0"
        style={{
          minHeight: 80,
          padding: '16px 32px',
          gap: 40,
          borderBottom: '1px solid rgba(0,0,0,0.10)',
        }}
      >
        <h1
          className="flex-1 min-w-0 truncate"
          style={{
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 20,
            fontWeight: 600,
            lineHeight: '24px',
            letterSpacing: '-0.01rem',
            margin: 0,
            color: 'rgba(0,0,0,0.80)',
          }}
        >
          Employees
        </h1>
        {/* Head-actions */}
        <div className="flex items-center flex-shrink-0" style={{ gap: 8 }}>
          <button
            className="rounded-lg border transition-colors"
            style={{
              height: 36, padding: '0 16px',
              border: '1px solid rgba(0,0,0,0.16)',
              background: '#fff',
              fontFamily: '"Inter", sans-serif',
              fontSize: 14, fontWeight: 500, lineHeight: '20px',
              color: '#5d6a79',
            }}
          >
            Import Employees
          </button>
          <button
            className="rounded-lg transition-colors"
            style={{
              height: 36, padding: '0 16px',
              background: '#185ba4',
              border: 'none',
              fontFamily: '"Inter", sans-serif',
              fontSize: 14, fontWeight: 500, lineHeight: '20px',
              color: '#fff',
            }}
          >
            Create Employee
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 bg-[#F8FAFC] border-b border-[rgba(0,0,0,0.06)] flex-shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-[13px] text-[#64748B]">142 employees</span>
          <span className="w-px h-4 bg-[#E2E8F0]" />
          <span className="text-[13px] text-[#64748B]">0 Selected</span>
          <div className="relative ml-2">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#94A3B8] pointer-events-none" />
            <input
              placeholder="Start typing to find user"
              className="h-8 w-[280px] rounded-md border border-[#E2E8F0] bg-white pl-8 pr-2 text-[13px] placeholder:text-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]"
            />
          </div>
          <button className="flex h-8 w-8 items-center justify-center rounded-md border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]">
            <ListFilter className="h-3.5 w-3.5 text-[#64748B]" />
          </button>
        </div>
        <div>
          <button className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] hover:bg-[#F8FAFC]">
            <ListFilter className="h-3.5 w-3.5 text-[#64748B]" />
            <span>All</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-[13px]">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b border-[#F1F5F9]">
              <th className="w-10 px-4 py-3"><input type="checkbox" /></th>
              <th className="w-10" />
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider whitespace-nowrap">Name ↑</th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider whitespace-nowrap">Role</th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider whitespace-nowrap">Type</th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider whitespace-nowrap">Username</th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider whitespace-nowrap">Scheduling Unit</th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider whitespace-nowrap">Virtual Agent</th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider whitespace-nowrap">State</th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {EMPLOYEES.map((e, i) => (
              <tr key={i} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors">
                <td className="px-4 py-3"><input type="checkbox" /></td>
                <td className="py-2">
                  <div className="h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-semibold bg-[#E2E8F0] text-[#475569]">
                    {e.initials}
                  </div>
                </td>
                <td className="px-4 py-3 text-[#0F172A] font-medium whitespace-nowrap">{e.name}</td>
                <td className="px-4 py-3 text-[#334155]">{e.role}</td>
                <td className="px-4 py-3 text-[#334155]" />
                <td className="px-4 py-3 text-[#334155] whitespace-nowrap">{e.username}</td>
                <td className="px-4 py-3 text-[#334155] whitespace-nowrap">{e.schedulingUnit}</td>
                <td className="px-4 py-3 text-[#334155]">{e.virtualAgent}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 text-[13px]">
                    <span
                      className="h-3.5 w-3.5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: e.state === 'active' ? '#16a34a' : '#f59e0b' }}
                    >
                      {e.state === 'active' ? (
                        <span className="text-white text-[9px]">✓</span>
                      ) : (
                        <span className="text-white text-[9px]">⏱</span>
                      )}
                    </span>
                    <span className={e.state === 'active' ? 'text-[#16a34a]' : 'text-[#d97706]'}>
                      {e.state === 'active' ? 'Active' : 'Pending'}
                    </span>
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-[#F1F5F9]">
                    <MoreVertical className="h-4 w-4 text-[#94A3B8]" />
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

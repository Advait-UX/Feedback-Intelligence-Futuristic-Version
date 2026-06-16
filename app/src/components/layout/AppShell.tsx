import { useState } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { SidebarPanel } from './SidebarPanel'
import type { SidebarNavItem } from './SidebarPanel'
import { TopBar } from './TopBar'
import { PageHeader } from './PageHeader'
import { AiAssistantPanel } from './AiAssistantPanel'

interface AppShellProps {
  children: React.ReactNode
  title?: string
  breadcrumb?: string[]
  onAppSwitch?: (appLabel: string) => void
  /** Sidebar nav items + controlled selection (optional). */
  navItems?: SidebarNavItem[]
  activeNav?: string
  onNavSelect?: (id: string) => void
  /** Set true when content has its own pane-head (e.g. iframes or pages with inline headers). */
  hidePageHeader?: boolean
}

export function AppShell({ children, title = 'Dashboard', breadcrumb = ['Feedback Intelligence'], onAppSwitch, navItems, activeNav, onNavSelect, hidePageHeader = false }: AppShellProps) {
  const [aiPanelOpen, setAiPanelOpen] = useState(false)
  const [panelOpen, setPanelOpen] = useState(true)

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden" style={{ background: 'var(--lyra-color-bg-surface-shell)' }}>
      <TopBar onAppSwitch={onAppSwitch} />

      {/* Body row — sidebar blends into canvas; main content is a white card */}
      <div className="relative flex flex-1 overflow-hidden gap-0">
        {/* Sidebar — blends into the canvas surface */}
        <SidebarPanel
          open={panelOpen}
          onToggle={() => setPanelOpen(!panelOpen)}
          items={navItems}
          activeKey={activeNav}
          onSelect={onNavSelect}
        />

        {/* Floating sidebar toggle chevron, on the seam */}
        <button
          onClick={() => setPanelOpen(!panelOpen)}
          title={panelOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          className="absolute z-20 flex h-5 w-5 items-center justify-center rounded-full shadow-sm transition-all outline-none focus:outline-none"
          style={{
            backgroundColor: 'var(--lyra-color-bg-surface-base)',
            border: '1px solid var(--lyra-color-border-soft)',
            color: 'var(--lyra-color-fg-secondary)',
            left: panelOpen ? '244px' : '48px',
            top: '20px',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = 'var(--lyra-color-fg-default)'
            e.currentTarget.style.borderColor = 'var(--lyra-color-border-medium)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'var(--lyra-color-fg-secondary)'
            e.currentTarget.style.borderColor = 'var(--lyra-color-border-soft)'
          }}
        >
          {panelOpen
            ? <ChevronLeft className="h-3 w-3" />
            : <ChevronRight className="h-3 w-3" />}
        </button>

        {/* Main content — white pane card floating on canvas */}
        <div className="flex flex-1 flex-col overflow-hidden min-w-0 rounded-xl" style={{ margin: '8px 12px 12px 0', border: '1px solid var(--lyra-color-border-subtle)', backgroundColor: 'var(--lyra-color-bg-surface-base)', boxShadow: 'var(--sol-effect-shadowsm)' }}>
          {!hidePageHeader && (
            <PageHeader
              title={title}
              breadcrumb={breadcrumb}
              onAskAi={() => setAiPanelOpen(!aiPanelOpen)}
              onToggleSidebar={() => setPanelOpen(!panelOpen)}
              sidebarOpen={panelOpen}
            />
          )}
          <main className="flex-1 overflow-auto flex flex-col" style={{ background: 'var(--lyra-color-bg-surface-shell)' }}>
            {children}
          </main>
        </div>

        {/* AI Assistant panel */}
        {aiPanelOpen && (
          <div className="w-[360px] flex-shrink-0">
            <div className="h-full rounded-xl overflow-hidden" style={{ border: '1px solid var(--lyra-color-border-soft)', backgroundColor: 'var(--lyra-color-bg-surface-base)' }}>
              <AiAssistantPanel open={aiPanelOpen} onClose={() => setAiPanelOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

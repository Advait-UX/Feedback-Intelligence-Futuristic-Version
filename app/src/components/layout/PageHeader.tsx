import { PanelLeftClose } from 'lucide-react'
import { cn } from '@/lib/utils'
// Note: sidebar toggle is handled by AppShell's floating chevron — PageHeader only needs it in the crumbs row for collapsed-state context

/*
  ─── Lyra Panel Header tokens (shell.css .pane-head + .crumbs) ───

  Crumbs row
    padding         : 12px 32px 0              [space-3 / space-8]
    font            : Inter 400 12px/16px, letter-spacing 0.01rem
    color           : rgba(0,0,0,0.64)         [fg/secondary]
    last crumb      : rgba(0,0,0,0.80) / weight 500
    separator       : opacity 0.5

  Pane-head row
    min-height      : 80px                     [Lyra spec]
    padding         : 16px 32px                [space-4 / space-8]
    padding-top     : 6px  (when crumbs present, crumbs provide the top space)
    gap (title↔actions): 40px
    border-bottom   : 1px solid rgba(0,0,0,0.10)  [border/subtle]

  h1 title
    font            : Inter 600 20px/24px
    letter-spacing  : -0.01rem
    color           : rgba(0,0,0,0.80)         [fg/default]
    overflow        : truncate

  Head-actions slot
    gap             : 8px                      [space-2]
    align           : center
*/

const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

interface PageHeaderProps {
  breadcrumb?: string[]
  title: string
  onAskAi?: () => void
  onToggleSidebar?: () => void
  sidebarOpen?: boolean
}

export function PageHeader({ breadcrumb = [], title, onToggleSidebar, sidebarOpen = true }: PageHeaderProps) {
  // Only show crumbs when there are 2+ items — a single app-name item is not a useful breadcrumb trail
  const hasCrumbs = breadcrumb.length >= 2

  return (
    <div
      className="flex-shrink-0 bg-white"
      style={{ borderBottom: '1px solid rgba(0,0,0,0.10)' }}
    >
      {/* ── Crumbs row ── */}
      {hasCrumbs && (
        <div
          className="flex items-center"
          style={{
            padding: '12px 32px 0',
            gap: 8,
            fontFamily: FONT,
            fontSize: 12,
            fontWeight: 400,
            lineHeight: '16px',
            letterSpacing: '0.01rem',
            color: 'rgba(0,0,0,0.64)',
          }}
        >
          {/* Sidebar toggle — sits at the far-left of the crumbs row */}
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              title="Toggle sidebar"
              className="flex h-5 w-5 items-center justify-center rounded transition-colors outline-none focus:outline-none flex-shrink-0"
              style={{ color: 'rgba(0,0,0,0.40)', marginRight: 4 }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(0,0,0,0.64)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(0,0,0,0.40)' }}
            >
              <PanelLeftClose className={cn('h-3.5 w-3.5 transition-transform', !sidebarOpen && 'scale-x-[-1]')} />
            </button>
          )}

          {breadcrumb.map((item, i) => (
            <span key={i} className="flex items-center" style={{ gap: 8 }}>
              {i > 0 && <span style={{ opacity: 0.5 }}>/</span>}
              <span
                style={
                  i === breadcrumb.length - 1
                    ? { color: 'rgba(0,0,0,0.80)', fontWeight: 500 }
                    : { cursor: 'pointer' }
                }
              >
                {item}
              </span>
            </span>
          ))}
        </div>
      )}

      {/* ── Pane-head: title + head-actions ── */}
      <div
        className="flex items-center"
        style={{
          minHeight: 80,
          padding: hasCrumbs ? '6px 32px 16px' : '16px 32px',
          gap: 40,
        }}
      >
        <h1
          className="flex-1 min-w-0 truncate"
          style={{
            fontFamily: FONT,
            fontSize: 20,
            fontWeight: 600,
            lineHeight: '24px',
            letterSpacing: '-0.01rem',
            margin: 0,
            color: 'rgba(0,0,0,0.80)',
          }}
        >
          {title}
        </h1>

        {/* Head-actions slot — reserved for page-level CTAs */}
        <div className="flex items-center flex-shrink-0" style={{ gap: 8 }}>
          {/* future actions */}
        </div>
      </div>
    </div>
  )
}

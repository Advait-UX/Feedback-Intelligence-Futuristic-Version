import { Box } from 'lucide-react'
import { cn } from '@/lib/utils'

const RAIL_ITEMS = [{ icon: Box }, { icon: Box }, { icon: Box }, { icon: Box }, { icon: Box }]
const ACTIVE_INDEX = 1

export function IconRail() {
  return (
    <div
      className="flex w-12 flex-shrink-0 flex-col items-center pt-3 gap-1"
      style={{ background: 'var(--lyra-color-bg-surface-shell)' }}
    >
      {RAIL_ITEMS.map((item, i) => {
        const Icon = item.icon
        const active = i === ACTIVE_INDEX
        return (
          <div key={i} className="relative flex items-center justify-center">
            {active && (
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-sm"
                style={{ background: 'var(--lyra-color-bg-primary)' }}
              />
            )}
            <button
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-lg transition-colors outline-none focus:outline-none focus-visible:outline-none',
              )}
              style={
                active
                  ? { background: 'var(--lyra-color-bg-active-subtle)', color: 'var(--lyra-color-fg-active-strong)' }
                  : undefined
              }
              onMouseEnter={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = 'var(--lyra-color-state-bg-hover-opacity)'
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--lyra-color-fg-secondary)'
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = ''
                  ;(e.currentTarget as HTMLElement).style.color = ''
                }
              }}
            >
              <Icon
                className="h-5 w-5"
                style={!active ? { color: 'var(--lyra-color-fg-disabled)' } : undefined}
              />
            </button>
          </div>
        )
      })}
    </div>
  )
}

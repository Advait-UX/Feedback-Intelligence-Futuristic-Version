import { AppShell } from '../components/layout/AppShell'
import { Star, Search } from 'lucide-react'

const SUMMARY_TILES = [
  { value: '890', value2: '457', label: 'total customers', label2: 'responding to survey', green: false },
  { value: '87%', label: 'had bot-to-human handoff', green: false },
]

const TABLE_ROWS = [
  { id: '1c4fa089', date: '7/05/2026', time: '8:21 PM', channel: 'Voice', campaign: 'Retention Voice Q2', agent: 'R. Whitman', match: 98, rating: 3, featured: true },
  { id: '2b4fa089', date: '6/05/2026', time: '9:00 AM', channel: 'Chat', campaign: 'Billing Resolution CSAT Q2', agent: 'S. Chen', match: 95, rating: 2, featured: false },
  { id: '4d4fa089', date: '4/05/2026', time: '11:00 AM', channel: 'Voice', campaign: 'Retention Voice Q2', agent: 'R. Whitman', match: 93, rating: 3, featured: false },
  { id: '5e4fa089', date: '3/05/2026', time: '12:00 PM', channel: 'Voice', campaign: 'Retention Voice Q2', agent: 'T. Wong', match: 91, rating: 3, featured: false },
  { id: '6f4fa089', date: '2/05/2026', time: '1:00 PM', channel: 'Voice', campaign: 'Retention Voice Q2', agent: 'L. Park', match: 89, rating: 3, featured: false },
  { id: '7g4fa089', date: '1/05/2026', time: '2:00 PM', channel: 'Chat', campaign: 'Billing Resolution CSAT Q2', agent: 'T. Wong', match: 87, rating: 2, featured: false },
  { id: '8h4fa089', date: '30/04/2026', time: '3:00 PM', channel: 'Voice', campaign: 'Retention Voice Q2', agent: 'A. Brooks', match: 85, rating: 3, featured: false },
  { id: '9i4fa089', date: '29/04/2026', time: '4:00 PM', channel: 'Voice', campaign: 'Retention Voice Q2', agent: 'R. Whitman', match: 83, rating: 3, featured: false },
  { id: '0j4fa089', date: '28/04/2026', time: '10:00 AM', channel: 'Email', campaign: 'Billing Resolution CSAT Q2', agent: 'S. Chen', match: 81, rating: 2, featured: false },
  { id: '1k4fa089', date: '27/04/2026', time: '11:00 AM', channel: 'Voice', campaign: 'Retention Voice Q2', agent: 'L. Park', match: 79, rating: 3, featured: false },
]

function matchColor(pct: number): string {
  if (pct >= 90) return 'var(--lyra-color-status-success-strong)'
  if (pct >= 80) return 'var(--lyra-color-status-warning-strong)'
  return 'var(--lyra-color-fg-secondary)'
}

export function CohortPage({ onBack, onOpenInteraction }: { onBack: () => void; onOpenInteraction?: () => void }) {
  return (
    <AppShell title="Cohort" breadcrumb={['Feedback Intelligence', 'Dashboard', 'Analysis']}>
      <div className="p-5 space-y-5" style={{ background: 'var(--lyra-color-bg-surface-shell)' }}>
        {/* Back link */}
        <button onClick={onBack} className="text-sm font-medium hover:underline" style={{ color: 'var(--lyra-color-fg-link)' }}>
          ← Back to analysis
        </button>

        {/* Page header */}
        <div>
          <h1 className="text-xl font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>Call Transfer Impact — Cohort</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--lyra-color-fg-secondary)' }}>890 total customers in this cohort</p>
          <p className="text-sm" style={{ color: 'var(--lyra-color-fg-secondary)' }}>457 customers responded · 433 didn't engage with the survey · Sorted by pattern relevance</p>
        </div>

        {/* Section 1 — Summary Strip */}
        <div className="grid grid-cols-2 gap-4">
          {SUMMARY_TILES.map((tile, i) => (
            <div key={i} className="rounded-lg border bg-white p-4" style={{ borderColor: 'var(--lyra-color-border-soft)' }}>
              {i === 0 ? (
                <>
                  <div className="text-2xl font-semibold leading-none" style={{ color: 'var(--lyra-color-fg-default)' }}>{tile.value}</div>
                  <div className="text-xs mt-1" style={{ color: 'var(--lyra-color-fg-secondary)' }}>{tile.label}</div>
                  <div className="text-lg font-semibold leading-none mt-2" style={{ color: 'var(--lyra-color-fg-default)' }}>{tile.value2}</div>
                  <div className="text-xs mt-1" style={{ color: 'var(--lyra-color-fg-secondary)' }}>{tile.label2}</div>
                </>
              ) : (
                <>
                  <div className="text-2xl font-semibold leading-none" style={{ color: tile.green ? 'var(--lyra-color-status-success-strong)' : 'var(--lyra-color-fg-default)' }}>{tile.value}</div>
                  <div className="text-xs mt-1" style={{ color: 'var(--lyra-color-fg-secondary)' }}>{tile.label}</div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Reconciliation line */}
        <div className="rounded-lg border px-4 py-3" style={{ borderColor: 'var(--lyra-color-status-warning-medium)', background: 'var(--lyra-color-status-warning-subtle)' }}>
          <p className="text-sm" style={{ color: 'var(--lyra-color-status-warning-strong)' }}>
            <span className="font-semibold">This cohort is one segment</span> of the larger 1,343-customer drop detected on the dashboard.
            The 890 customers here represent the Call Transfer Impact intent within that pattern.
          </p>
        </div>

        {/* Section 2 — Featured Representative Case */}
        <div className="rounded-lg border-2 p-5" style={{ borderColor: 'var(--lyra-color-status-warning-medium)', background: 'var(--lyra-color-status-warning-subtle)' }}>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 flex-shrink-0" style={{ color: 'var(--lyra-color-status-warning-strong)' }} />
              <span className="text-sm font-semibold" style={{ color: 'var(--lyra-color-status-warning-strong)' }}>Most representative case · 98% pattern match</span>
            </div>
            <span className="text-xs" style={{ color: 'var(--lyra-color-status-warning-strong)' }}>Highest match in this cohort</span>
          </div>

          {/* Body — two columns */}
          <div className="flex mt-4 gap-0">
            {/* Left — interaction details */}
            <div className="flex-1 pr-5 border-r" style={{ borderColor: 'var(--lyra-color-status-warning-medium)' }}>
              <div className="font-mono text-sm" style={{ color: 'var(--lyra-color-fg-default)' }}>1c4fa089-d0c2-4157-ad35-b519bd0a2964</div>
              <div className="text-xs mt-1" style={{ color: 'var(--lyra-color-fg-secondary)' }}>7/05/2026 · 8:21 PM · Voice · Retention Voice Q2</div>
              <div className="text-sm font-medium mt-3" style={{ color: 'var(--lyra-color-fg-default)' }}>James Carter → Rachel Whitman (Retention Unit)</div>
              <div className="text-xs mt-3" style={{ color: 'var(--lyra-color-fg-secondary)' }}>Customer rating: 3/5 · Agent FI signal: +68 (above cohort avg) · Handoff: bot → human</div>
            </div>

            {/* Right — customer comment */}
            <div className="flex-shrink-0 w-[40%] pl-5">
              <div className="rounded-md border bg-white p-3" style={{ borderColor: 'var(--lyra-color-status-warning-medium)' }}>
                <p className="text-xs italic leading-[1.4]" style={{ color: 'var(--lyra-color-fg-secondary)' }}>
                  "Rachel was patient and walked me through the duplicate charge step by step. Refund showed up the same day. Really appreciated the follow-up email."
                </p>
                <div className="text-xs mt-1.5" style={{ color: 'var(--lyra-color-fg-disabled)' }}>— Customer comment</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end mt-4">
            <button onClick={onOpenInteraction} className="inline-flex items-center rounded-lg border bg-white px-3.5 py-2 text-sm font-semibold transition-colors" style={{ borderColor: 'var(--lyra-color-status-warning-medium)', color: 'var(--lyra-color-status-warning-strong)' }}>
              Open interaction →
            </button>
          </div>
        </div>

        {/* Section 3 — Cohort Table */}
        <div className="rounded-lg border bg-white p-5" style={{ borderColor: 'var(--lyra-color-border-soft)' }}>
          {/* Header */}
          <div className="text-[15px] font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>Other cases in this cohort (456)</div>
          <div className="text-xs mt-1" style={{ color: 'var(--lyra-color-fg-secondary)' }}>All matching the bot-to-human handoff friction pattern</div>

          {/* Filter row */}
          <div className="flex items-center gap-3 mt-3">
            <button className="inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium" style={{ borderColor: 'var(--lyra-color-border-active)', background: 'var(--lyra-color-bg-active-subtle)', color: 'var(--lyra-color-fg-active-strong)' }}>
              Show: Responding only
            </button>
            <button className="inline-flex items-center rounded-full border bg-white px-3 py-1.5 text-xs" style={{ borderColor: 'var(--lyra-color-border-soft)', color: 'var(--lyra-color-fg-secondary)' }}>
              Sort by: Pattern match ▾
            </button>
            <button className="inline-flex items-center rounded-full border bg-white px-3 py-1.5 text-xs" style={{ borderColor: 'var(--lyra-color-border-soft)', color: 'var(--lyra-color-fg-secondary)' }}>
              Channel: All ▾
            </button>
            <button className="inline-flex items-center rounded-full border bg-white px-3 py-1.5 text-xs" style={{ borderColor: 'var(--lyra-color-border-soft)', color: 'var(--lyra-color-fg-secondary)' }}>
              Campaign: All ▾
            </button>
            <div className="ml-auto relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none" style={{ color: 'var(--lyra-color-fg-disabled)' }} />
              <input
                type="text"
                placeholder="Search"
                className="h-7 w-[200px] rounded-full border bg-white pl-8 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-[--lyra-color-border-focus-default]"
                style={{ borderColor: 'var(--lyra-color-border-soft)' }}
              />
            </div>
          </div>

          {/* Table */}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b" style={{ background: 'var(--lyra-color-bg-surface-shell)', borderColor: 'var(--lyra-color-border-soft)' }}>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold" style={{ color: 'var(--lyra-color-fg-secondary)' }}>ID</th>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold" style={{ color: 'var(--lyra-color-fg-secondary)' }}>Date</th>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold" style={{ color: 'var(--lyra-color-fg-secondary)' }}>Channel</th>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold" style={{ color: 'var(--lyra-color-fg-secondary)' }}>Campaign</th>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold" style={{ color: 'var(--lyra-color-fg-secondary)' }}>Agent</th>
                  <th className="px-3 py-2.5 text-right text-xs font-semibold" style={{ color: 'var(--lyra-color-fg-secondary)' }}>Match</th>
                  <th className="px-3 py-2.5 text-right text-xs font-semibold" style={{ color: 'var(--lyra-color-fg-secondary)' }}>Rating</th>
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b last:border-b-0 hover:bg-[--lyra-color-state-bg-hover-opacity] cursor-pointer transition-colors"
                    style={{
                      borderColor: 'var(--lyra-color-border-subtle)',
                      background: row.featured ? 'var(--lyra-color-status-warning-subtle)' : undefined,
                    }}
                  >
                    <td className="px-3 py-2.5 font-mono text-xs" style={{ color: 'var(--lyra-color-fg-secondary)' }}>
                      <div className="flex items-center gap-1">
                        {row.featured && <Star className="h-3 w-3 flex-shrink-0" style={{ color: 'var(--lyra-color-status-warning-strong)' }} />}
                        {row.id}…
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="text-xs" style={{ color: 'var(--lyra-color-fg-default)' }}>{row.date}</div>
                      <div className="text-xs" style={{ color: 'var(--lyra-color-fg-disabled)' }}>{row.time}</div>
                    </td>
                    <td className="px-3 py-2.5 text-xs" style={{ color: 'var(--lyra-color-fg-secondary)' }}>{row.channel}</td>
                    <td className="px-3 py-2.5 text-xs" style={{ color: 'var(--lyra-color-fg-secondary)' }}>{row.campaign}</td>
                    <td className="px-3 py-2.5 text-xs" style={{ color: 'var(--lyra-color-fg-secondary)' }}>{row.agent}</td>
                    <td className="px-3 py-2.5 text-right text-sm font-semibold" style={{ color: matchColor(row.match) }}>{row.match}%</td>
                    <td className="px-3 py-2.5 text-right">
                      <span className="text-sm font-medium" style={{ color: 'var(--lyra-color-fg-default)' }}>{row.rating}</span>
                      <span style={{ color: 'var(--lyra-color-status-warning-medium)' }}>★</span>
                      <span className="text-xs ml-2" style={{ color: 'var(--lyra-color-fg-disabled)' }}>→</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--lyra-color-fg-secondary)' }}>
              <span>Showing 1-10 of 456</span>
              <button className="inline-flex items-center rounded-lg border bg-white px-3 py-1.5 text-xs transition-colors" style={{ borderColor: 'var(--lyra-color-border-soft)', color: 'var(--lyra-color-fg-secondary)' }}>
                load more
              </button>
            </div>
            <button className="inline-flex items-center rounded-lg border bg-white px-3 py-1.5 text-xs transition-colors" style={{ borderColor: 'var(--lyra-color-border-soft)', color: 'var(--lyra-color-fg-secondary)' }}>
              Export cohort
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

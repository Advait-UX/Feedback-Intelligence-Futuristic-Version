import { Search } from 'lucide-react'
import { CAMPAIGNS, portfolioSummary, type Campaign, type CampaignStatus } from '@/lib/campaigns'

const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
const CARD_SHADOW = '0 1px 2px rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.07)'
const CARD_BORDER = '1px solid rgba(0,0,0,0.07)'

/* ============================================================
 * Feedback Campaign Monitor — Level 1 portfolio dashboard
 * ============================================================ */
export function SurveyCampaignMonitoringPage({
  onSelectCampaign,
}: {
  onSelectCampaign: (campaignId: string) => void
  onBackToAdmin: () => void
}) {
  const summary = portfolioSummary()

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: '#f5f7f9', fontFamily: FONT }}>

      {/* ── Sticky filter toolbar ── */}
      <div
        className="flex-shrink-0 bg-white flex items-center justify-between px-8"
        style={{ height: 52, borderBottom: '1px solid rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 10 }}
      >
        <FilterRow />
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-auto">
        <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 28 }}>

          {/* KPI section */}
          <section>
            <SectionHeader
              title="Campaign Performance"
              right={
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'rgba(0,0,0,0.36)', fontFamily: FONT }}>
                  <LiveDot />
                  Live across active campaigns · last 30 days
                </span>
              }
            />
            <KpiRow summary={summary} />
          </section>

          {/* Table section */}
          <section>
            <SectionHeader title="Campaigns" />
            <CampaignTable onSelectCampaign={onSelectCampaign} />
          </section>

        </div>
      </div>
    </div>
  )
}

/* ── Live indicator dot ── */
function LiveDot() {
  return (
    <span style={{ position: 'relative', display: 'inline-flex', width: 7, height: 7 }}>
      <span style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: '#16a34a', opacity: 0.5,
        animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite',
      }} />
      <span style={{ position: 'relative', width: 7, height: 7, borderRadius: '50%', background: '#16a34a' }} />
      <style>{`@keyframes ping{75%,100%{transform:scale(2);opacity:0}}`}</style>
    </span>
  )
}

/* ── Section header with extending rule ── */
function SectionHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
      <span style={{
        fontFamily: FONT, fontSize: 10, fontWeight: 700,
        color: 'rgba(0,0,0,0.36)', letterSpacing: '0.09em',
        textTransform: 'uppercase', whiteSpace: 'nowrap',
      }}>
        {title}
      </span>
      <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.07)' }} />
      {right}
    </div>
  )
}

/* ── Filter row ── */
function FilterRow() {
  const filters = ['Last 30 days', 'All Campaigns', 'All Channels', 'All Categories']
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ position: 'relative' }}>
          <Search style={{
            position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
            width: 13, height: 13, color: 'rgba(0,0,0,0.30)', pointerEvents: 'none',
          }} />
          <input
            type="text"
            placeholder="Search campaigns"
            style={{
              height: 30, width: 196, paddingLeft: 30, paddingRight: 10,
              background: 'rgba(0,0,0,0.04)', border: '1px solid transparent',
              borderRadius: 8, fontSize: 12, color: 'rgba(0,0,0,0.80)', fontFamily: FONT,
              outline: 'none',
            }}
            onFocus={e => {
              e.currentTarget.style.background = 'white'
              e.currentTarget.style.border = '1px solid rgba(24,91,164,0.40)'
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(24,91,164,0.10)'
            }}
            onBlur={e => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.04)'
              e.currentTarget.style.border = '1px solid transparent'
              e.currentTarget.style.boxShadow = ''
            }}
          />
        </div>
        {/* Divider */}
        <div style={{ width: 1, height: 18, background: 'rgba(0,0,0,0.10)' }} />
        {filters.map(label => (
          <select
            key={label}
            style={{
              height: 30, paddingLeft: 10, paddingRight: 26,
              background: `rgba(0,0,0,0) url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9' height='9' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(0,0,0,0.40)' d='M6 8L2 4h8z'/%3E%3C/svg%3E") no-repeat right 9px center`,
              border: 'none', borderRadius: 6,
              fontSize: 12, fontWeight: 500, color: 'rgba(0,0,0,0.64)', fontFamily: FONT,
              appearance: 'none', cursor: 'pointer',
            }}
          >
            <option>{label}</option>
          </select>
        ))}
      </div>
      <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.32)', fontFamily: FONT }}>Jun 2, 2026 · 09:14</span>
    </div>
  )
}

/* ── Sparkline ── */
const SPARK_DATA = [
  [1, 1, 2, 2, 3, 3, 3, 3, 4, 4],
  [48.0, 49.2, 48.8, 50.1, 50.5, 51.0, 51.8, 52.1, 52.3, 52.5],
  [2400, 2550, 2680, 2750, 2820, 2900, 2970, 3040, 3090, 3136],
  [68, 70, 69, 71, 71, 72, 72, 73, 73, 74],
]

function Sparkline({ data, color, width = 96, height = 44 }: {
  data: number[]; color: string; width?: number; height?: number
}) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pad = 4

  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: (height - pad * 2) - ((v - min) / range) * (height - pad * 2) + pad,
  }))

  // Smooth cardinal spline
  const line = pts.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`
    const prev = pts[i - 1]
    const cpx = (prev.x + p.x) / 2
    return `C ${cpx} ${prev.y} ${cpx} ${p.y} ${p.x} ${p.y}`
  }).join(' ')

  const fill = `${line} L ${pts[pts.length - 1].x} ${height} L ${pts[0].x} ${height} Z`
  const last = pts[pts.length - 1]
  const gradId = `sg-${color.replace(/[^a-z0-9]/gi, '')}`

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      <path d={fill} fill={`url(#${gradId})`} />
      <path d={line} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Glow dot */}
      <circle cx={last.x} cy={last.y} r="4" fill={color} opacity="0.18" />
      <circle cx={last.x} cy={last.y} r="2.5" fill={color} />
    </svg>
  )
}

/* ── KPI tiles ── */
const KPI_ACCENTS = ['#185ba4', '#0e7490', '#7c3aed', '#0f766e']

function KpiRow({ summary }: { summary: ReturnType<typeof portfolioSummary> }) {
  const tiles = [
    { label: 'Active campaigns',  value: `${summary.activeCount}`,                sub: '1 launched this week' },
    { label: 'Avg response rate', value: `${summary.avgResponse}%`,               delta: { text: '+3.2pp', suffix: 'vs. prior period' }, tone: 'up' as const },
    { label: 'Total responses',   value: summary.totalResponses.toLocaleString(), delta: { text: '+240',   suffix: 'last 30 days'     }, tone: 'up' as const },
    { label: 'Avg CSAT score',    value: `${summary.avgCsat}`,                    delta: { text: '+4',     suffix: 'vs. prior period' }, tone: 'up' as const },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
      {tiles.map((t, i) => (
        <KpiTile key={t.label} accent={KPI_ACCENTS[i]} sparkData={SPARK_DATA[i]} {...t} />
      ))}
    </div>
  )
}

function KpiTile({
  label, value, sub, delta, tone = 'flat', accent, sparkData,
}: {
  label: string; value: string; accent: string; sparkData?: number[]
  sub?: string
  delta?: { text: string; suffix?: string }
  tone?: 'up' | 'down' | 'flat'
}) {
  const deltaColor = tone === 'up' ? '#16a34a' : tone === 'down' ? '#dc2626' : 'rgba(0,0,0,0.40)'
  const deltaBg    = tone === 'up' ? 'rgba(22,163,74,0.10)' : tone === 'down' ? 'rgba(220,38,38,0.10)' : 'rgba(0,0,0,0.06)'
  const arrow      = tone === 'up' ? '↑' : tone === 'down' ? '↓' : ''

  return (
    <div style={{
      background: 'white', borderRadius: 16,
      boxShadow: CARD_SHADOW, border: CARD_BORDER,
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
    }}>
      {/* Accent bar */}
      <div style={{ height: 3, background: accent, flexShrink: 0 }} />

      <div style={{ padding: '16px 20px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Label */}
        <div style={{
          fontSize: 10, fontWeight: 600, color: 'rgba(0,0,0,0.36)',
          textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: FONT, marginBottom: 8,
        }}>
          {label}
        </div>

        {/* Value + sparkline row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{
            fontSize: 44, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.025em',
            color: 'rgba(0,0,0,0.88)', fontFamily: FONT, fontVariantNumeric: 'tabular-nums',
          }}>
            {value}
          </div>
          {sparkData && (
            <div style={{ paddingBottom: 2, opacity: 0.92 }}>
              <Sparkline data={sparkData} color={accent} width={88} height={44} />
            </div>
          )}
        </div>

        {/* Delta or sub */}
        {delta && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center',
              background: deltaBg, color: deltaColor,
              borderRadius: 999, padding: '3px 8px',
              fontSize: 11, fontWeight: 700, fontFamily: FONT,
            }}>
              {arrow} {delta.text}
            </span>
            {delta.suffix && (
              <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.36)', fontFamily: FONT }}>{delta.suffix}</span>
            )}
          </div>
        )}
        {sub && !delta && (
          <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.36)', fontFamily: FONT }}>{sub}</div>
        )}
      </div>
    </div>
  )
}

/* ── Campaign table ── */
function CampaignTable({ onSelectCampaign }: { onSelectCampaign: (id: string) => void }) {
  const cols = [
    { label: 'Campaign',       align: 'left'  },
    { label: 'Status',         align: 'left'  },
    { label: 'Response Rate',  align: 'left',  width: 200 },
    { label: 'Responses',      align: 'right' },
    { label: 'CSAT',           align: 'right' },
    { label: 'Emerging Topic', align: 'left'  },
    { label: 'Channel',        align: 'left'  },
    { label: 'Category',       align: 'left'  },
  ]

  return (
    <div style={{ background: 'white', borderRadius: 16, boxShadow: CARD_SHADOW, border: CARD_BORDER, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: FONT, fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
            {cols.map(col => (
              <th
                key={col.label}
                style={{
                  padding: '11px 20px',
                  textAlign: col.align as any,
                  fontSize: 10, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.07em',
                  color: 'rgba(0,0,0,0.32)',
                  width: col.width,
                  background: 'rgba(0,0,0,0.015)',
                  whiteSpace: 'nowrap',
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CAMPAIGNS.map((c, i) => (
            <CampaignRow
              key={c.id}
              campaign={c}
              isLast={i === CAMPAIGNS.length - 1}
              onSelect={() => onSelectCampaign(c.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CampaignRow({ campaign, onSelect, isLast }: { campaign: Campaign; onSelect: () => void; isLast: boolean }) {
  const topTopic       = campaign.topIntents[0] ?? '—'
  const primaryChannel = campaign.channels[0]  ?? '—'
  const responses      = Math.round(((campaign.sent ?? 0) * (campaign.responseRate ?? 0)) / 100)

  return (
    <tr
      onClick={onSelect}
      style={{ borderBottom: isLast ? 'none' : '1px solid rgba(0,0,0,0.06)', cursor: 'pointer', transition: 'background 0.1s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.016)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '' }}
    >
      <td style={{ padding: '14px 20px' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.80)' }}>{campaign.name}</span>
      </td>
      <td style={{ padding: '14px 20px' }}>
        <StatusPill status={campaign.status} />
      </td>
      <td style={{ padding: '14px 20px' }}>
        <ResponseRateCell rate={campaign.responseRate ?? 0} />
      </td>
      <td style={{ padding: '14px 20px', textAlign: 'right', color: 'rgba(0,0,0,0.72)', fontVariantNumeric: 'tabular-nums', fontSize: 13 }}>
        {responses.toLocaleString()}
      </td>
      <td style={{ padding: '14px 20px', textAlign: 'right', color: 'rgba(0,0,0,0.72)', fontVariantNumeric: 'tabular-nums', fontSize: 13 }}>
        {campaign.csat ?? '—'}
      </td>
      <td style={{ padding: '14px 20px', color: 'rgba(0,0,0,0.48)', fontSize: 12 }}>{topTopic}</td>
      <td style={{ padding: '14px 20px' }}>
        <ChannelChip channel={primaryChannel} />
      </td>
      <td style={{ padding: '14px 20px', color: 'rgba(0,0,0,0.48)', fontSize: 12 }}>{campaign.category}</td>
    </tr>
  )
}

/* ── Response rate cell ── */
function ResponseRateCell({ rate }: { rate: number }) {
  const color = rate >= 60 ? '#16a34a' : rate >= 45 ? 'rgba(0,0,0,0.80)' : '#dc2626'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 12, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color, minWidth: 34 }}>
        {rate}%
      </span>
      <div style={{ flex: 1, height: 4, background: 'rgba(0,0,0,0.07)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${rate}%`, background: color, borderRadius: 99 }} />
      </div>
    </div>
  )
}

/* ── Channel chip ── */
function ChannelChip({ channel }: { channel: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      borderRadius: 6, padding: '3px 8px',
      fontSize: 11, fontWeight: 600, letterSpacing: '0.01em',
      background: 'rgba(24,91,164,0.08)', color: '#185ba4', fontFamily: FONT,
    }}>
      {channel}
    </span>
  )
}

/* ── Status pill ── */
const STATUS_CFG: Record<CampaignStatus, { bg: string; color: string; dot: string; label: string }> = {
  active: { bg: 'rgba(22,163,74,0.10)',  color: '#15803d', dot: '#16a34a', label: 'Active' },
  paused: { bg: 'rgba(217,119,6,0.10)',  color: '#b45309', dot: '#d97706', label: 'Paused' },
  draft:  { bg: 'rgba(0,0,0,0.06)',      color: 'rgba(0,0,0,0.50)', dot: 'rgba(0,0,0,0.30)', label: 'Draft'  },
  ended:  { bg: 'rgba(0,0,0,0.05)',      color: 'rgba(0,0,0,0.36)', dot: 'rgba(0,0,0,0.20)', label: 'Ended'  },
}

function StatusPill({ status }: { status: CampaignStatus }) {
  const s = STATUS_CFG[status]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      borderRadius: 999, padding: '3px 10px',
      fontSize: 11, fontWeight: 600,
      background: s.bg, color: s.color, fontFamily: FONT,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
      {s.label}
    </span>
  )
}

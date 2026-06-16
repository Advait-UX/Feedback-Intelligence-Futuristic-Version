import { useMemo, useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Minus, ChevronDown, ChevronRight } from 'lucide-react'
import type { Topic } from '@/lib/topics'

/* ============================================================
 * TopicsTable — rich topic table with inline drill-down trends.
 * Reused on the Feedback Campaign Monitor (portfolio) and inside
 * the per-campaign Feedback Intelligence Dashboard.
 * ============================================================ */
export function TopicsTable({ topics }: { topics: Topic[] }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const sorted = useMemo(() => [...topics].sort((a, b) => (a.responseRate ?? 100) - (b.responseRate ?? 100)), [topics])

  if (sorted.length === 0) {
    return (
      <div className="bg-white border border-[--lyra-color-border-soft] rounded-[--radius-lg] p-6 text-center">
        <p className="text-sm" style={{ color: 'var(--lyra-color-fg-disabled)' }}>No topics available for this view.</p>
      </div>
    )
  }

  const thStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 500, color: 'var(--lyra-color-fg-secondary)',
    letterSpacing: '0.06em', textTransform: 'uppercase',
    fontFamily: 'var(--font-sans)',
  }

  return (
    <div className="bg-white border border-[--lyra-color-border-soft] rounded-[--radius-lg] overflow-hidden" style={{ fontFamily: 'var(--font-sans)' }}>
      <table className="w-full" style={{ fontSize: 14, fontFamily: 'var(--font-sans)' }}>
        <thead>
          <tr className="border-b border-[--lyra-color-border-subtle]">
            <th className="px-5 py-3 text-left w-[40px]" style={thStyle} />
            <th className="px-5 py-3 text-left" style={thStyle}>
              Intent
            </th>
            <th className="px-5 py-3 text-left" style={thStyle}>
              Category
            </th>
            <th className="px-5 py-3 text-right" style={thStyle}>
              Mentions
            </th>
            <th className="px-5 py-3 text-right" style={thStyle}>
              Surveys Sent
            </th>
            <th className="px-5 py-3 text-right" style={thStyle}>
              Responses
            </th>
            <th className="px-5 py-3 text-left w-[180px]" style={thStyle}>
              Response Rate
            </th>
            <th className="px-5 py-3 text-left" style={thStyle}>
              CSAT
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(t => (
            <TopicRow
              key={t.id}
              topic={t}
              expanded={openId === t.id}
              onToggle={() => setOpenId(openId === t.id ? null : t.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TopicRow({
  topic,
  expanded,
  onToggle,
}: {
  topic: Topic
  expanded: boolean
  onToggle: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const rowBg = expanded
    ? 'var(--lyra-color-bg-active-subtle)'
    : hovered ? 'var(--lyra-color-state-bg-hover-opacity)' : 'transparent'

  return (
    <>
      <tr
        onClick={onToggle}
        className="cursor-pointer"
        style={{
          borderBottom: expanded ? 'none' : '1px solid var(--lyra-color-border-subtle)',
          background: rowBg,
          boxShadow: expanded ? 'inset 3px 0 0 var(--lyra-brand-600)' : 'none',
          transition: 'background 0.15s, box-shadow 0.15s',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <td className="px-5 py-3.5">
          <div style={{
            width: 22, height: 22, borderRadius: 6,
            background: expanded ? 'var(--lyra-brand-700)' : 'var(--lyra-slate-200)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.18s, transform 0.18s',
            transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)',
            flexShrink: 0,
          }}>
            <ChevronDown
              className="h-3.5 w-3.5"
              style={{ color: expanded ? 'var(--lyra-color-fg-inverse)' : 'var(--lyra-slate-500)', transition: 'color 0.18s' }}
            />
          </div>
        </td>
        <td className="px-5 py-3.5">
          <div style={{
            fontSize: 14, fontWeight: expanded ? 600 : 500,
            color: expanded ? 'var(--lyra-color-fg-active-strong)' : 'var(--lyra-color-fg-default)',
            transition: 'color 0.18s',
            fontFamily: 'var(--lyra-font-sans)',
          }}>
            {topic.name}
          </div>
        </td>
        <td className="px-5 py-3.5" style={{ fontSize: 14, color: 'var(--lyra-color-fg-secondary)', fontFamily: 'var(--lyra-font-sans)' }}>{topic.category}</td>
        <td className="px-5 py-3.5 text-right" style={{ fontSize: 14, color: 'var(--lyra-color-fg-default)', fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--lyra-font-sans)' }}>
          {topic.mentions.toLocaleString()}
        </td>
        <td className="px-5 py-3.5 text-right" style={{ fontSize: 14, color: 'var(--lyra-color-fg-default)', fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--lyra-font-sans)' }}>
          {topic.surveysSent.toLocaleString()}
        </td>
        <td className="px-5 py-3.5 text-right" style={{ fontSize: 14, color: 'var(--lyra-color-fg-default)', fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--lyra-font-sans)' }}>
          {topic.responses.toLocaleString()}
        </td>
        <td className="px-5 py-3.5">
          <ResponseRateCell rate={topic.responseRate} />
        </td>
        <td className="px-5 py-3.5">
          <CsatBadge value={topic.csat} />
        </td>
      </tr>
      {expanded && (
        <tr style={{ borderBottom: '1px solid var(--lyra-color-border-soft)' }}>
          <td colSpan={8} style={{ padding: 0, background: 'var(--lyra-color-bg-active-subtle)' }}>
            <div style={{
              margin: '0 20px 20px 20px',
              background: 'var(--lyra-color-bg-surface-base)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--lyra-color-border-soft)',
              boxShadow: 'var(--sol-effect-shadowmd)',
              overflow: 'hidden',
            }}>
              {/* Brand accent strip */}
              <div style={{ height: 3, background: 'linear-gradient(90deg, var(--lyra-brand-600) 0%, var(--lyra-brand-400) 100%)' }} />
              <div style={{ padding: '20px 24px 24px' }}>
                <TopicTrendPanel topic={topic} />
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

/* ---------- Response rate cell — mirrors dashboard ResponseRateCell exactly ---------- */
function ResponseRateCell({ rate }: { rate: number }) {
  const [animWidth, setAnimWidth] = useState(0)
  const [hovered, setHovered] = useState(false)
  useEffect(() => { const t = setTimeout(() => setAnimWidth(rate), 60); return () => clearTimeout(t) }, [rate])

  const TARGET = 60
  const color = rate > 60 ? 'var(--lyra-color-status-success-strong)' : rate >= 30 ? 'var(--lyra-color-status-warning-strong)' : 'var(--lyra-color-status-critical-strong)'
  const gap = TARGET - rate
  const tooltipText = gap > 0
    ? `${rate}% · ${gap}pp below ${TARGET}% target`
    : `${rate}% · ${Math.abs(gap)}pp above ${TARGET}% target`

  return (
    <div className="flex items-center gap-2" style={{ fontFamily: 'var(--font-sans)' }}>
      <span style={{ fontSize: 14, fontWeight: 600, color, fontVariantNumeric: 'tabular-nums', minWidth: 38, fontFamily: 'var(--lyra-font-sans)' }}>
        {rate}%
      </span>
      <div
        className="flex-1"
        style={{ height: 4, background: 'var(--lyra-color-border-soft)', borderRadius: 9999, overflow: 'visible', position: 'relative', cursor: 'pointer' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{
          height: '100%', width: `${animWidth}%`,
          background: color, borderRadius: 9999,
          transition: 'width 0.9s cubic-bezier(0.4,0,0.2,1)',
        }} />
        {/* Target tick at 60% */}
        <div style={{
          position: 'absolute', top: -3, bottom: -3,
          left: `${TARGET}%`, width: 2,
          background: 'var(--lyra-color-fg-secondary)', borderRadius: 1, opacity: 0.35,
          transform: 'translateX(-50%)',
        }} />
        {hovered && (
          <div style={{
            position: 'absolute', bottom: 10, left: `${rate / 2}%`, transform: 'translateX(-50%)',
            background: 'var(--lyra-color-bg-surface-inverse)', color: 'var(--lyra-color-fg-inverse)',
            fontSize: 12, fontWeight: 500, fontFamily: 'var(--font-sans)',
            padding: '4px 8px', borderRadius: 4,
            whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 100,
            boxShadow: 'var(--sol-effect-shadowlg)',
          }}>
            {tooltipText}
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------- Trend arrow ---------- */
function TrendArrow({ trend }: { trend: 'up' | 'down' | 'flat' }) {
  if (trend === 'up') return <TrendingUp className="h-4 w-4 inline-block" style={{ color: 'var(--lyra-color-status-success-strong)' }} />
  if (trend === 'down') return <TrendingDown className="h-4 w-4 inline-block" style={{ color: 'var(--lyra-color-status-critical-strong)' }} />
  return <Minus className="h-4 w-4 inline-block" style={{ color: 'var(--lyra-color-fg-disabled)' }} />
}

/* ---------- CSAT badge — no red, ranges from green (high) to slate (low) ---------- */
function CsatBadge({ value }: { value: number }) {
  // ≥70 light blue · 50–69 light orange · <50 light red
  const bg = value >= 70
    ? 'var(--lyra-color-status-info-subtle)'
    : value >= 50
    ? 'var(--lyra-color-status-warning-subtle)'
    : 'var(--lyra-color-status-critical-subtle)'
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 'var(--radius-sm)',
        minWidth: 36, padding: '3px 8px',
        fontSize: 14, fontWeight: 600, fontVariantNumeric: 'tabular-nums',
        fontFamily: 'var(--lyra-font-sans)',
        backgroundColor: bg,
        color: 'var(--lyra-color-fg-default)',
        letterSpacing: '-0.01em',
      }}
    >
      {value}
    </span>
  )
}

/* ---------- Topic trend drill-down (4 mini charts) ---------- */
function TopicTrendPanel({ topic }: { topic: Topic }) {
  return (
    <div>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Brand accent bar */}
          <div style={{
            width: 4, height: 32, borderRadius: 2, flexShrink: 0,
            background: 'linear-gradient(180deg, var(--lyra-brand-600) 0%, var(--lyra-brand-400) 100%)',
          }} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--lyra-color-fg-default)', letterSpacing: '-0.01em', fontFamily: 'var(--lyra-font-sans)' }}>
                {topic.name}
              </span>
              <span style={{
                fontSize: 12, fontWeight: 500, color: 'var(--lyra-color-fg-active-strong)',
                background: 'var(--lyra-color-bg-active-subtle)',
                border: '1px solid var(--lyra-color-bg-active-moderate)',
                borderRadius: 'var(--radius-xs)',
                padding: '2px 8px', fontFamily: 'var(--lyra-font-sans)',
                letterSpacing: '0.01em',
              }}>
                {topic.category}
              </span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--lyra-color-fg-secondary)', marginTop: 3, lineHeight: 1.3, fontFamily: 'var(--lyra-font-sans)' }}>
              14-day trend across detection, delivery and response
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: 12, color: 'var(--lyra-color-fg-secondary)', fontFamily: 'var(--lyra-font-sans)' }}>CSAT</span>
          <CsatBadge value={topic.csat} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <TrendChart title="Detection rate" unit="%" data={topic.detectionRate} />
        <TrendChart title="Surveys sent" unit="" data={topic.surveysSentSeries} />
        <TrendChart title="Responses received" unit="" data={topic.responsesSeries} />
        <ResponseRateTrendCard data={topic.responseRateSeries} />
      </div>
    </div>
  )
}

/* ---------- Response rate trend card — progress bar, mirrors campaign-level card ---------- */
function ResponseRateTrendCard({ data }: { data: number[] }) {
  const [mounted, setMounted] = useState(false)
  const [tooltip, setTooltip] = useState<{ x: number } | null>(null)
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t) }, [])

  const TARGET = 60
  const latest = data.length ? data[data.length - 1] : 0
  const first  = data.length ? data[0] : 0
  const delta  = latest - first
  const deltaColor = delta > 0 ? 'var(--lyra-color-status-success-strong)' : delta < 0 ? 'var(--lyra-color-status-critical-strong)' : 'var(--lyra-color-fg-disabled)'
  const barColor   = latest > 60 ? 'var(--lyra-color-status-success-strong)' : latest >= 30 ? 'var(--lyra-color-status-warning-strong)' : 'var(--lyra-color-status-critical-strong)'
  const pct        = mounted ? Math.min(latest, 100) : 0
  const gap        = Math.abs(latest - TARGET)

  return (
    <div className="bg-white border border-[--lyra-color-border-soft] rounded-[--radius-md] p-3" style={{ fontFamily: 'var(--font-sans)' }}>
      {/* Header — same as TrendChart */}
      <div className="flex items-baseline justify-between mb-1">
        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--lyra-color-fg-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase' as const, fontFamily: 'var(--font-sans)' }}>Response rate</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: deltaColor, fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--font-sans)' }}>
          {delta > 0 ? '+' : ''}{delta.toFixed(0)}pp
        </span>
      </div>
      {/* Value — same as TrendChart */}
      <div className="flex items-baseline gap-1 mb-1">
        <span style={{ fontSize: 20, fontWeight: 600, color: barColor, fontVariantNumeric: 'tabular-nums', lineHeight: 1, letterSpacing: '-0.01em', fontFamily: 'var(--lyra-font-sans)' }}>{latest}</span>
        <span style={{ fontSize: 12, fontWeight: 400, color: barColor, lineHeight: 1, fontFamily: 'var(--lyra-font-sans)', opacity: 0.75 }}>%</span>
      </div>
      {/* Chart zone — same h-[90px] as TrendChart SVG, bar vertically centered */}
      <div className="h-[90px]" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', gap: 6 }}>
        {/* Labels */}
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
          <span style={{ fontSize: 12, color: 'var(--lyra-color-fg-secondary)', fontFamily: 'var(--font-sans)' }}>0%</span>
          <span style={{ position: 'absolute', left: `${TARGET}%`, transform: 'translateX(-50%)', fontSize: 12, color: 'var(--lyra-color-fg-secondary)', whiteSpace: 'nowrap', fontFamily: 'var(--font-sans)' }}>
            Target {TARGET}%
          </span>
          <span style={{ fontSize: 12, color: 'var(--lyra-color-fg-secondary)', fontFamily: 'var(--font-sans)' }}>100%</span>
        </div>
        {/* Track + fill + tick */}
        <div
          style={{ position: 'relative', width: '100%', height: 12, borderRadius: 9999, background: 'var(--lyra-color-border-soft)', cursor: 'default' }}
          onMouseMove={e => { const r = (e.currentTarget as HTMLElement).getBoundingClientRect(); setTooltip({ x: e.clientX - r.left }) }}
          onMouseLeave={() => setTooltip(null)}
        >
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: `${pct}%`,
            borderRadius: 9999, background: barColor,
            transition: 'width 0.9s cubic-bezier(0.4,0,0.2,1)',
          }} />
          <div style={{
            position: 'absolute', top: -2, bottom: -2, left: `${TARGET}%`, transform: 'translateX(-50%)',
            width: 2, borderRadius: 2, background: 'var(--lyra-color-fg-secondary)', opacity: 0.4,
          }} />
        </div>
        {tooltip && (
          <div style={{
            position: 'absolute', bottom: 20, left: tooltip.x, transform: 'translateX(-50%)',
            background: 'var(--lyra-color-bg-surface-inverse)', color: 'var(--lyra-color-fg-inverse)',
            fontSize: 12, fontWeight: 500, fontFamily: 'var(--font-sans)',
            padding: '4px 8px', borderRadius: 4,
            whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 100,
            boxShadow: 'var(--sol-effect-shadowlg)', lineHeight: 1.5,
          }}>
            <div style={{ fontWeight: 600 }}>{latest}% current</div>
            <div style={{ opacity: 0.7, fontSize: 12 }}>
              Target {TARGET}% · {latest >= TARGET ? `${gap}pp above` : `${gap.toFixed(1)}pp to go`}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Trend palette
const TR_UP_LINE   = '#185BA4'  // brand-700
const TR_UP_GRAD   = '#4896EC'  // brand-400
const TR_DOWN_LINE = '#DC2626'
const TR_DOWN_GRAD = '#EF4444'
const TR_FLAT_LINE = '#82959E'  // slate-500
const TR_FLAT_GRAD = '#A8B3BB'  // slate-400

function trendChartColors(first: number, last: number) {
  const pct = Math.abs(first) > 0 ? (last - first) / Math.abs(first) : 0
  if (pct > 0.01)  return { line: TR_UP_LINE,   grad: TR_UP_GRAD }
  if (pct < -0.01) return { line: TR_DOWN_LINE, grad: TR_DOWN_GRAD }
  return { line: TR_FLAT_LINE, grad: TR_FLAT_GRAD }
}

function TrendChart({
  title,
  unit,
  data,
}: {
  title: string
  unit: string
  data: number[]
}) {
  const width = 320
  const height = 110
  const padding = { top: 16, right: 10, bottom: 22, left: 28 }
  const cw = width - padding.left - padding.right
  const ch = height - padding.top - padding.bottom

  const min = Math.max(
    0,
    Math.min(...data) - Math.max(2, (Math.max(...data) - Math.min(...data)) * 0.2)
  )
  const max = Math.max(...data) + Math.max(2, (Math.max(...data) - Math.min(...data)) * 0.2)
  const range = max - min || 1
  const xs = (i: number) => padding.left + (i / (data.length - 1)) * cw
  const ys = (v: number) => padding.top + ch - ((v - min) / range) * ch

  const path = data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xs(i)} ${ys(v)}`).join(' ')
  const areaPath = `${path} L ${xs(data.length - 1)} ${padding.top + ch} L ${xs(0)} ${padding.top + ch} Z`

  const latest = data[data.length - 1]
  const first = data[0]
  // For count metrics (unit === '') the headline is the 14-day total — this
  // matches the parent row's "Surveys Sent" / "Responses" column. For rate
  // metrics (unit === '%') the headline is today's value.
  const total = data.reduce((s, v) => s + v, 0)
  const headline = unit === '' ? total : latest
  const delta = latest - first
  const deltaPct = first !== 0 ? Math.round((delta / first) * 100) : 0

  const { line: lineColor, grad: gradColor } = trendChartColors(first, latest)
  const deltaColor = delta > 0 ? 'var(--lyra-color-status-success-strong)' : delta < 0 ? 'var(--lyra-color-status-critical-strong)' : 'var(--lyra-slate-400)'
  const gradId = `tr-${title.replace(/\W/g, '').toLowerCase()}`

  return (
    <div style={{ background: 'var(--lyra-color-bg-surface-base)', border: '1px solid var(--lyra-color-border-soft)', borderRadius: 'var(--radius-md)', padding: 12, fontFamily: 'var(--lyra-font-sans)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--lyra-color-fg-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase' as const, fontFamily: 'var(--lyra-font-sans)' }}>
          {title}
        </span>
        <span style={{ fontSize: 12, fontWeight: 600, color: deltaColor, fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--lyra-font-sans)' }}>
          {delta > 0 ? '+' : ''}
          {deltaPct}%
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
        <span style={{ fontSize: 20, fontWeight: 600, color: 'var(--lyra-color-fg-default)', fontVariantNumeric: 'tabular-nums', lineHeight: 1, letterSpacing: '-0.01em', fontFamily: 'var(--lyra-font-sans)' }}>
          {unit === '' ? headline.toLocaleString() : headline}
        </span>
        {unit && <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--lyra-color-fg-secondary)', lineHeight: 1, fontFamily: 'var(--lyra-font-sans)' }}>{unit}</span>}
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 90 }} preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={gradColor} stopOpacity="0.38" />
            <stop offset="40%"  stopColor={lineColor}  stopOpacity="0.14" />
            <stop offset="100%" stopColor={lineColor}  stopOpacity="0" />
          </linearGradient>
        </defs>
        <text x={padding.left - 4} y={padding.top + 4} textAnchor="end" fill="#c8d0d8" fontSize="10">
          {Math.round(max)}
        </text>
        <text x={padding.left - 4} y={padding.top + ch} textAnchor="end" fill="#c8d0d8" fontSize="10">
          {Math.round(min)}
        </text>
        <text x={padding.left} y={height - 6} textAnchor="start" fill="#a8b3bb" fontSize="10">
          Day 1
        </text>
        <text x={width - padding.right} y={height - 6} textAnchor="end" fill="#a8b3bb" fontSize="10">
          Today
        </text>
        <line
          x1={padding.left}
          y1={padding.top + ch}
          x2={width - padding.right}
          y2={padding.top + ch}
          stroke="rgba(0,0,0,0.06)"
          strokeWidth="1"
        />
        <path d={areaPath} fill={`url(#${gradId})`} />
        <path d={path} fill="none" stroke={lineColor} strokeWidth="2" strokeLinecap="round" />
        {/* Glow halo behind endpoint */}
        <circle cx={xs(data.length - 1)} cy={ys(latest)} r="6" fill={lineColor} opacity="0.15" />
        <circle cx={xs(data.length - 1)} cy={ys(latest)} r="3" fill={lineColor} />
      </svg>
    </div>
  )
}

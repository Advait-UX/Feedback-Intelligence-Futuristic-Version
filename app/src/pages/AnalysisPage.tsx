import { useState } from 'react'
import { AlertTriangle, Sparkles, ChevronRight, Shield, Check } from 'lucide-react'
import { AppShell } from '../components/layout/AppShell'
import './AnalysisPage.css'

/* Validation matrix data */
const MATRIX_COLS = [
  { title: 'Transfer', sub: 'bounced between agents?', highlighted: true },
  { title: 'Hold', sub: 'kept waiting in-call?' },
  { title: 'Escalation', sub: 'raised above the agent?' },
  { title: 'Repeat', sub: 'recurring contact?' },
  { title: 'No action', sub: 'resolved smoothly?' },
]

const MATRIX_ROWS = [
  { label: 'Billing Dispute', cells: [{ value: '75%', pct: 75 }, { value: '64%', pct: 64 }, { value: '71%', pct: 71 }, { value: '52%', pct: 52 }, { value: '38%', pct: 38 }] },
  { label: 'Refund Processing', cells: [{ value: '73%', pct: 73 }, { value: '61%', pct: 61 }, { value: '68%', pct: 68 }, { value: '49%', pct: 49 }, { value: 'Low volume' }] },
  { label: 'Tech Support', cells: [{ value: '62%', pct: 62 }, { value: '54%', pct: 54 }, { value: '70%', pct: 70 }, { value: '58%', pct: 58 }, { value: '31%', pct: 31 }] },
  { label: 'General Inquiry', cells: [{ value: '31%', pct: 31 }, { value: '28%', pct: 28 }, { value: 'Low volume' }, { value: 'Low volume' }, { value: '19%', pct: 19 }] },
]

function cellBg(cell: { value: string; pct?: number }): string {
  if (!cell.pct) return 'var(--lyra-color-bg-surface-shell)'
  if (cell.pct >= 70) return 'var(--lyra-brand-700)'
  if (cell.pct >= 60) return 'var(--lyra-brand-500)'
  if (cell.pct >= 50) return 'var(--lyra-brand-300)'
  if (cell.pct >= 40) return 'var(--lyra-brand-200)'
  if (cell.pct >= 30) return 'var(--lyra-brand-100)'
  return 'var(--lyra-brand-50)'
}

function cellFg(cell: { value: string; pct?: number }): string {
  if (!cell.pct) return 'var(--lyra-slate-400)'
  if (cell.pct >= 60) return 'var(--lyra-color-fg-inverse)'
  return 'var(--lyra-color-fg-default)'
}

/* Insights data with role labels */
const INSIGHTS = [
  {
    roleLabel: 'FINDING',
    title: 'The friction is not the agent.',
    fact: 'Agent FI signal averages +60 across the 1,060 confirmed responses. Agents are resolving cleanly.',
    stripeColor: 'var(--lyra-color-status-success-strong)',
    icon: 'shield'
  },
  {
    roleLabel: 'METHOD',
    title: 'FI\'s contextual questions caught the friction in the customer\'s own words.',
    fact: 'The questions targeted the handoff and re-explanation experience. Customer answers matched the prediction — the friction was the context loss at transfer, validated directly by the people who lived through it.',
    stripeColor: 'var(--lyra-color-status-warning-strong)',
    icon: 'sparkles'
  },
  {
    roleLabel: 'ROOT CAUSE',
    title: 'Billing policies changed, impacting the AI routing.',
    fact: 'Call Transfer Impact is the resulting friction signal — concentrated in this cluster, not random.',
    stripeColor: 'var(--lyra-color-status-critical-strong)',
    icon: 'warning'
  },
  {
    roleLabel: 'TRUST',
    title: 'FI\'s read is reliable.',
    fact: 'Validation accuracy on Transfer interactions in this cluster is 73-75% — the highest band in the Intent × Action matrix.',
    stripeColor: 'var(--lyra-color-status-success-strong)',
    icon: 'check'
  },
]

export function AnalysisPage({ onBack, onOpenCohort }: { onBack: () => void; onOpenCohort?: () => void }) {
  const [accordion1Open, setAccordion1Open] = useState(false)
  const [accordion3Open, setAccordion3Open] = useState(false)
  const [accordion4Open, setAccordion4Open] = useState(false)
  const [animateAccordion1, setAnimateAccordion1] = useState(false)
  const [animateAccordion3, setAnimateAccordion3] = useState(false)
  const [animateAccordion4, setAnimateAccordion4] = useState(false)

  const handleAccordion1Toggle = () => {
    if (!accordion1Open) {
      setAccordion1Open(true)
      setAnimateAccordion1(true)
    } else {
      setAccordion1Open(false)
      setAnimateAccordion1(false)
    }
  }

  const handleAccordion3Toggle = () => {
    if (!accordion3Open) {
      setAccordion3Open(true)
      setAnimateAccordion3(true)
    } else {
      setAccordion3Open(false)
      setAnimateAccordion3(false)
    }
  }

  const handleAccordion4Toggle = () => {
    if (!accordion4Open) {
      setAccordion4Open(true)
      setAnimateAccordion4(true)
    } else {
      setAccordion4Open(false)
      setAnimateAccordion4(false)
    }
  }

  return (
    <AppShell title="Analysis" breadcrumb={['Feedback Intelligence', 'Dashboard']}>
      <div className="p-5 space-y-4" style={{ background: 'var(--lyra-color-bg-surface-shell)' }}>
        {/* Back link */}
        <button onClick={onBack} className="text-sm font-medium hover:underline" style={{ color: 'var(--lyra-color-fg-link)' }}>
          ← Back to dashboard
        </button>

        {/* Page header */}
        <div>
          <h1 className="text-xl font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>Billing-flow cluster — Analysis</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--lyra-color-fg-secondary)' }}>Tracking 3,520 interactions across 3 linked intents · Last 7 days</p>
        </div>

        {/* Top row: Inversion (left 50%) + Insights (right 50%) */}
        <div className="flex gap-4 items-stretch">
          {/* Left — The Inversion banner */}
          <div className="flex-1 rounded-lg bg-white p-6" style={{ border: '2px solid var(--lyra-color-status-critical-strong)' }}>
            {/* Section 1: Title block with Stardust icon */}
            <div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" style={{ color: 'var(--lyra-color-status-critical-strong)' }} />
                <div className="text-xs font-semibold uppercase tracking-[0.05em]" style={{ color: 'var(--lyra-color-status-critical-strong)' }}>THE INVERSION</div>
              </div>
              <div className="mt-1 text-base font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>Customers downrate even when the agent did well</div>
              <div className="mt-1.5 text-xs" style={{ color: 'var(--lyra-color-fg-secondary)' }}>Of the 1,060 confirmed responses in this cluster</div>
            </div>

            {/* Section 2: Divider */}
            <div className="my-4 border-t border-[--lyra-color-border-soft]" />

            {/* Section 3: 84% rating evidence */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl font-semibold leading-none" style={{ color: 'var(--lyra-color-status-critical-strong)' }}>84%</span>
                <span className="text-sm font-medium" style={{ color: 'var(--lyra-color-fg-default)' }}>rated ≤3★</span>
              </div>
              <div className="mt-1 text-xs" style={{ color: 'var(--lyra-color-fg-secondary)' }}>(892 customers)</div>
            </div>

            {/* Section 4: Sparkline chart */}
            <div className="mt-4">
              <div className="flex flex-col items-center">
                <svg width="360" height="120" viewBox="0 0 360 120" className="overflow-visible">
                  <defs>
                    {/* Gradient for area fill */}
                    <linearGradient id="sentimentFill" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#16A34A" stopOpacity="0.18" />
                      <stop offset="50%" stopColor="#94A3B8" stopOpacity="0.10" />
                      <stop offset="100%" stopColor="#D97706" stopOpacity="0.18" />
                    </linearGradient>
                    {/* Gradient for line stroke */}
                    <linearGradient id="sentimentLine" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#16A34A" />
                      <stop offset="50%" stopColor="#64748B" />
                      <stop offset="100%" stopColor="#D97706" />
                    </linearGradient>
                  </defs>

                  {/* Layer 1: Baseline grid lines */}
                  <line x1="30" y1="22" x2="330" y2="22" stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="30" y1="82" x2="330" y2="82" stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="4 4" />

                  {/* Layer 2: Area fill below the curve */}
                  <path
                    d="M 30 22 C 120 22, 165 22, 180 52 S 270 82, 330 82 L 330 112 L 30 112 Z"
                    fill="url(#sentimentFill)"
                  />

                  {/* Layer 3: The line/curve with gradient stroke */}
                  <path
                    d="M 30 22 C 120 22, 165 22, 180 52 S 270 82, 330 82"
                    stroke="url(#sentimentLine)"
                    strokeWidth="3.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Layer 4: Handoff vertical marker */}
                  <line x1="180" y1="15" x2="180" y2="90" stroke="#D97706" strokeWidth="2" strokeDasharray="6 4" strokeOpacity="0.6" />

                  {/* Layer 5: Dots with halos */}
                  {/* Starting dot halo */}
                  <circle cx="30" cy="22" r="14" fill="#16A34A" opacity="0.2" />
                  {/* Starting dot */}
                  <circle cx="30" cy="22" r="8" fill="#16A34A" stroke="#FFFFFF" strokeWidth="3" />

                  {/* Handoff dot (no halo) */}
                  <circle cx="180" cy="52" r="7" fill="#475569" stroke="#FFFFFF" strokeWidth="3" />

                  {/* Ending dot halo */}
                  <circle cx="330" cy="82" r="14" fill="#D97706" opacity="0.2" />
                  {/* Ending dot */}
                  <circle cx="330" cy="82" r="8" fill="#D97706" stroke="#FFFFFF" strokeWidth="3" />

                  {/* Layer 6: Handoff pin (floating tag at top) */}
                  <g>
                    {/* Pin background rect */}
                    <rect x="147" y="0" width="66" height="22" rx="4" fill="#D97706" />
                    {/* Pin pointer triangle */}
                    <polygon points="177,22 183,22 180,28" fill="#D97706" />
                    {/* Pin text */}
                    <text x="180" y="15" textAnchor="middle" fontSize="13" fontWeight="600" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif">handoff</text>
                  </g>
                </svg>

                {/* Labels below chart */}
                <div className="mt-4 flex justify-between items-center" style={{ width: '360px' }}>
                  <span className="text-sm font-semibold" style={{ color: 'var(--lyra-color-status-success-strong)' }}>Positive</span>
                  <span className="text-sm font-semibold" style={{ color: 'var(--lyra-color-status-warning-strong)' }}>Neutral</span>
                </div>
              </div>
            </div>

            {/* Section 5: Bottom takeaway */}
            <div className="mt-4 pt-4 border-t border-[--lyra-color-border-soft]">
              <div className="text-sm italic text-center" style={{ color: 'var(--lyra-color-fg-secondary)' }}>Friction sits upstream — not the agent.</div>
            </div>
          </div>

          {/* Right — What Feedback Intelligence is telling us */}
          <div className="flex-1 rounded-lg bg-white p-5 border border-[--lyra-color-border-soft]">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" style={{ color: 'var(--lyra-color-status-warning-strong)' }} />
              <span className="text-sm font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>What Feedback Intelligence is telling us</span>
            </div>
            <div className="text-xs mt-1" style={{ color: 'var(--lyra-color-fg-secondary)' }}>Four observations from the cluster's signal pile</div>

            <div className="mt-4 space-y-4">
              {INSIGHTS.map((insight, i) => (
                <div
                  key={i}
                  className="pl-3"
                  style={{ borderLeft: `3px solid ${insight.stripeColor}` }}
                >
                  {/* Role label (eyebrow) */}
                  <div
                    className="text-xs font-semibold uppercase tracking-[0.05em] mb-1"
                    style={{ color: insight.stripeColor }}
                  >
                    {insight.roleLabel}
                  </div>

                  {/* Title row with role icon */}
                  <div className="flex items-start gap-1.5">
                    {/* Role icon */}
                    <div className="flex-shrink-0 mt-0.5">
                      {insight.icon === 'shield' && <Shield className="h-3 w-3" style={{ color: insight.stripeColor }} />}
                      {insight.icon === 'sparkles' && <Sparkles className="h-3 w-3" style={{ color: insight.stripeColor }} />}
                      {insight.icon === 'warning' && <AlertTriangle className="h-3 w-3" style={{ color: insight.stripeColor }} />}
                      {insight.icon === 'check' && <Check className="h-3 w-3" style={{ color: insight.stripeColor }} />}
                    </div>

                    {/* Title */}
                    <div className="flex-1">
                      <div className="text-sm font-semibold leading-tight" style={{ color: 'var(--lyra-color-fg-default)' }}>{insight.title}</div>
                    </div>
                  </div>

                  {/* Supporting fact */}
                  <div className="mt-1 text-xs leading-[1.5] pl-[18px]" style={{ color: 'var(--lyra-color-fg-secondary)' }}>
                    {insight.fact}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row: Actions Taken (full width) */}
        <div>
          {/* Section header */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" style={{ color: 'var(--lyra-color-status-warning-strong)' }} />
              <span className="text-sm font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>Actions Taken</span>
            </div>
            <div className="text-xs mt-1" style={{ color: 'var(--lyra-color-fg-secondary)' }}>What FI has already done about this</div>
          </div>

            {/* Cards container */}
            <div className="flex gap-4">
              {/* Card 1 — Alert has been sent to CX manager */}
              <div className="flex-1 rounded-lg bg-white p-[18px] flex flex-col border border-[--lyra-color-border-soft]">
                {/* Pill — Completed status */}
                <span className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold self-start" style={{ background: 'var(--lyra-color-status-success-subtle)', color: 'var(--lyra-color-status-success-strong)' }}>
                  <span className="text-xs">✓</span>
                  Completed · sent today
                </span>

                {/* Title row with numbered badge and Stardust icon */}
                <div className="flex items-start gap-2 mt-4" style={{ minHeight: '70px' }}>
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold" style={{ background: 'var(--lyra-color-status-warning-subtle)', color: 'var(--lyra-color-status-warning-strong)' }}>
                    ①
                  </div>
                  <Sparkles className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--lyra-color-status-warning-strong)' }} />
                  <div>
                    <div className="text-sm font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>Alert has been sent to CX manager</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--lyra-color-fg-secondary)' }}>Root cause: billing policy changes</div>
                  </div>
                </div>

                {/* Two-metric strip */}
                <div className="flex justify-around mt-4" style={{ minHeight: '60px' }}>
                  <div className="text-center">
                    <div className="text-[22px] font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>1,343</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--lyra-color-fg-secondary)' }}>customers affected</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[22px] font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>1</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--lyra-color-fg-secondary)' }}>CX manager notified</div>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-xs leading-relaxed" style={{ minHeight: '90px', color: 'var(--lyra-color-fg-secondary)' }}>
                  Billing policy changes are the root cause of the cluster's friction — they cascaded into the AI routing, generating handoffs that shouldn't have happened. FI has alerted the CX manager with the diagnosis so the routing can be aligned to the new policy.
                </p>

                {/* Action chip — right-aligned, footer */}
                <div className="mt-auto pt-4 flex justify-end">
                  <button className="inline-flex items-center rounded-lg px-3.5 py-2 text-sm transition-colors" style={{ border: '1px solid var(--lyra-color-border-soft)', background: 'var(--lyra-color-bg-surface-base)', color: 'var(--lyra-color-fg-secondary)' }}>
                    View alert →
                  </button>
                </div>
              </div>

              {/* Card 2 — Campaign has been optimized */}
              <div className="flex-1 rounded-lg bg-white p-[18px] flex flex-col border border-[--lyra-color-border-soft]">
                {/* Pill — Auto-optimized status */}
                <span className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold self-start" style={{ background: 'var(--lyra-color-status-success-subtle)', color: 'var(--lyra-color-status-success-strong)' }}>
                  <span className="text-xs">✓</span>
                  Auto-optimized · today
                </span>

                {/* Title row with numbered badge and Stardust icon */}
                <div className="flex items-start gap-2 mt-4" style={{ minHeight: '70px' }}>
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold" style={{ background: 'var(--lyra-color-status-warning-subtle)', color: 'var(--lyra-color-status-warning-strong)' }}>
                    ②
                  </div>
                  <Sparkles className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--lyra-color-status-warning-strong)' }} />
                  <div>
                    <div className="text-sm font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>Campaign has been optimized</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--lyra-color-fg-secondary)' }}>Hold these ratings pending the routing alignment</div>
                  </div>
                </div>

                {/* Three-metric strip */}
                <div className="flex justify-around mt-4" style={{ minHeight: '60px' }}>
                  <div className="text-center">
                    <div className="text-[22px] font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>1,343</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--lyra-color-fg-secondary)' }}>ratings tagged for review</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[22px] font-semibold" style={{ color: 'var(--lyra-color-status-success-strong)' }}>+0.4★</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--lyra-color-fg-secondary)' }}>expected agent score recovery</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[22px] font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>8</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--lyra-color-fg-secondary)' }}>retention-unit agents protected</div>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-xs leading-relaxed" style={{ minHeight: '90px', color: 'var(--lyra-color-fg-secondary)' }}>
                  FI has tightened the campaign's suppression rule to prevent further pollution from this pattern, and tagged the 1,343 affected ratings for QM review. Decide whether to permanently exclude or re-include them after the routing is aligned to the new policy.
                </p>

                {/* Action chip — right-aligned, footer */}
                <div className="mt-auto pt-4 flex justify-end">
                  <button className="inline-flex items-center rounded-lg px-3.5 py-2 text-sm transition-colors" style={{ border: '1px solid var(--lyra-color-border-active)', background: 'var(--lyra-color-bg-surface-base)', color: 'var(--lyra-color-status-success-strong)' }}>
                    Review optimization →
                  </button>
                </div>
              </div>

              {/* Card 3 — Friction tracked weekly */}
              <div className="flex-1 rounded-lg bg-white p-[18px] flex flex-col border border-[--lyra-color-border-soft]">
                {/* Pill — Monitoring active status */}
                <span className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold self-start" style={{ background: 'var(--lyra-color-status-success-subtle)', color: 'var(--lyra-color-status-success-strong)' }}>
                  <span className="text-xs">✓</span>
                  Monitoring active · today
                </span>

                {/* Title row with numbered badge and Stardust icon */}
                <div className="flex items-start gap-2 mt-4" style={{ minHeight: '70px' }}>
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold" style={{ background: 'var(--lyra-color-status-warning-subtle)', color: 'var(--lyra-color-status-warning-strong)' }}>
                    ③
                  </div>
                  <Sparkles className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--lyra-color-status-warning-strong)' }} />
                  <div>
                    <div className="text-sm font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>Friction tracked weekly</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--lyra-color-fg-secondary)' }}>Until routing alignment lands</div>
                  </div>
                </div>

                {/* Three-metric strip */}
                <div className="flex justify-around mt-4" style={{ minHeight: '60px' }}>
                  <div className="text-center">
                    <div className="text-[18px] font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>7 days</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--lyra-color-fg-secondary)' }}>tracking cadence</div>
                  </div>
                  <div className="text-center">
                    <div className="text-base font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>handoff</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--lyra-color-fg-secondary)' }}>signal monitored</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[18px] font-semibold" style={{ color: 'var(--lyra-color-status-success-strong)' }}>↓</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--lyra-color-fg-secondary)' }}>expected decline</div>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-xs leading-relaxed" style={{ minHeight: '90px', color: 'var(--lyra-color-fg-secondary)' }}>
                  FI will track the handoff repetition signal weekly. You'll get an alert if it persists or grows. Expected to decline as the routing aligns to the new policy.
                </p>

                {/* Action chip — right-aligned, footer */}
                <div className="mt-auto pt-4 flex justify-end">
                  <button className="inline-flex items-center rounded-lg px-3.5 py-2 text-sm transition-colors" style={{ border: '1px solid var(--lyra-color-border-active)', background: 'var(--lyra-color-bg-surface-base)', color: 'var(--lyra-color-status-success-strong)' }}>
                    Configure tracking →
                  </button>
                </div>
              </div>
            </div>
        </div>

        {/* Section divider — Show diagnostic details */}
        <div className="relative" style={{ marginTop: '32px', marginBottom: '16px' }}>
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-[--lyra-color-border-soft]" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3.5 py-1.5 text-xs rounded-md border border-[--lyra-color-border-soft]" style={{ color: 'var(--lyra-color-fg-secondary)' }}>
              Show diagnostic details
            </span>
          </div>
        </div>

        {/* Three accordions side-by-side */}
        <div className="flex gap-4">
          {/* Accordion 1 — Campaign Concentration */}
        <div className="flex-1 rounded-lg bg-white overflow-hidden border border-[--lyra-color-border-soft]">
          <button
            onClick={handleAccordion1Toggle}
            className="w-full px-5 py-5 flex items-center justify-between cursor-pointer hover:bg-[--lyra-color-state-bg-hover-opacity] transition-colors group"
          >
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.05em]" style={{ color: 'var(--lyra-color-fg-secondary)' }}>THE FRICTION LIVES IN 2 CAMPAIGNS</div>
              <div className="text-sm font-semibold text-left mt-1" style={{ color: 'var(--lyra-color-fg-default)' }}>Which campaigns are affected?</div>
              <div className="text-xs mt-1 text-left" style={{ color: 'var(--lyra-color-fg-secondary)' }}>Both affected campaigns account for 100% of the 1,343-customer drop</div>
              <div className="flex items-center gap-2 mt-1.5 justify-start">
                <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold" style={{ background: 'var(--lyra-color-status-critical-subtle)', color: 'var(--lyra-color-status-critical-strong)' }}>
                  <span className="text-xs">⊙</span>
                  <span className="text-xs uppercase tracking-[0.05em]">DATA</span>
                  <span>·</span>
                  <span>Retention Voice Q2 — 71%</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold" style={{ background: 'var(--lyra-slate-100)', color: 'var(--lyra-color-fg-secondary)' }}>
                  <span className="text-xs">⊙</span>
                  <span className="text-xs uppercase tracking-[0.05em]">DATA</span>
                  <span>·</span>
                  <span>Billing Resolution CSAT Q2 — 29%</span>
                </span>
              </div>
            </div>
            <ChevronRight
              className={`h-5 w-5 transition-all duration-200 flex-shrink-0 ml-4 ${accordion1Open ? 'rotate-90' : ''}`}
              style={{ color: 'var(--lyra-color-fg-secondary)' }}
            />
          </button>
          <div
            className="overflow-hidden transition-all duration-200"
            style={{ maxHeight: accordion1Open ? '1000px' : '0' }}
          >
            <div className={`px-5 pb-5 ${animateAccordion1 ? 'animate-accordion-1' : ''}`}>
              <div className="grid grid-cols-2 gap-4">
                {/* Campaign 1 — Retention Voice Q2 */}
                <div className="campaign-card rounded-md p-4 border border-[--lyra-color-border-soft]" style={{ background: 'var(--lyra-color-bg-surface-shell)' }}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>Retention Voice Q2</span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--lyra-color-status-critical-strong)' }}>71%</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded overflow-hidden" style={{ background: 'var(--lyra-color-status-critical-subtle)' }}>
                    <div className="progress-bar-left h-full rounded" style={{ width: '71%', background: 'var(--lyra-color-status-critical-strong)' }} />
                  </div>
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    <div className="metric-0">
                      <div className="text-base font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>950</div>
                      <div className="text-xs" style={{ color: 'var(--lyra-color-fg-secondary)' }}>interactions</div>
                    </div>
                    <div className="metric-1">
                      <div className="text-base font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>Voice</div>
                      <div className="text-xs" style={{ color: 'var(--lyra-color-fg-secondary)' }}>channel</div>
                    </div>
                    <div className="metric-2">
                      <div className="text-base font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>8</div>
                      <div className="text-xs" style={{ color: 'var(--lyra-color-fg-secondary)' }}>agents affected</div>
                    </div>
                    <div className="metric-3">
                      <div className="text-base font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>17%</div>
                      <div className="text-xs" style={{ color: 'var(--lyra-color-fg-secondary)' }}>hidden friction rate</div>
                    </div>
                  </div>
                </div>

                {/* Campaign 2 — Billing Resolution CSAT Q2 */}
                <div className="campaign-card rounded-md p-4 border border-[--lyra-color-border-soft]" style={{ background: 'var(--lyra-color-bg-surface-shell)' }}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>Billing Resolution CSAT Q2</span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--lyra-color-fg-secondary)' }}>29%</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded overflow-hidden" style={{ background: 'var(--lyra-slate-100)' }}>
                    <div className="progress-bar-right h-full rounded" style={{ width: '29%', background: 'var(--lyra-color-fg-secondary)' }} />
                  </div>
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    <div className="metric-0">
                      <div className="text-base font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>390</div>
                      <div className="text-xs" style={{ color: 'var(--lyra-color-fg-secondary)' }}>interactions</div>
                    </div>
                    <div className="metric-1">
                      <div className="text-base font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>Chat / Email</div>
                      <div className="text-xs" style={{ color: 'var(--lyra-color-fg-secondary)' }}>channels</div>
                    </div>
                    <div className="metric-2">
                      <div className="text-base font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>3</div>
                      <div className="text-xs" style={{ color: 'var(--lyra-color-fg-secondary)' }}>agents affected</div>
                    </div>
                    <div className="metric-3">
                      <div className="text-base font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>8%</div>
                      <div className="text-xs" style={{ color: 'var(--lyra-color-fg-secondary)' }}>hidden friction rate</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="footer-text mt-4 text-xs italic max-w-[700px]" style={{ color: 'var(--lyra-color-fg-secondary)' }}>
                Most of the cohort lives in Retention Voice Q2 (voice channel). The bot-to-human handoff failure is concentrated where the AI billing routing was impacted by recent policy changes.
              </div>
            </div>
          </div>
        </div>

        {/* Accordion 2 — Where the 1,343 dropped */}
        <div className="flex-1 rounded-lg bg-white overflow-hidden border border-[--lyra-color-border-soft]">
          <button
            onClick={handleAccordion3Toggle}
            className="w-full px-5 py-5 flex items-center justify-between cursor-pointer hover:bg-[--lyra-color-state-bg-hover-opacity] transition-colors group"
          >
            <div>
              <div className="text-sm font-semibold text-left" style={{ color: 'var(--lyra-color-fg-default)' }}>Which intent is driving the drop?</div>
              <div className="text-xs mt-1 text-left" style={{ color: 'var(--lyra-color-fg-secondary)' }}>Where the 1,343 affected customers are concentrated, broken down by intent</div>
              <div className="mt-1.5 flex justify-start">
                <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold" style={{ background: 'var(--lyra-color-status-critical-subtle)', color: 'var(--lyra-color-status-critical-strong)' }}>
                  <AlertTriangle className="h-3 w-3" />
                  <span className="text-xs uppercase tracking-[0.05em]">CULPRIT</span>
                  <span>·</span>
                  <span>Top culprit: Call Transfer Impact (-69%)</span>
                </span>
              </div>
            </div>
            <ChevronRight
              className={`h-5 w-5 transition-all duration-200 flex-shrink-0 ml-4 ${accordion3Open ? 'rotate-90' : ''}`}
              style={{ color: 'var(--lyra-color-fg-secondary)' }}
            />
          </button>
          <div
            className="overflow-hidden transition-all duration-200"
            style={{ maxHeight: accordion3Open ? '1000px' : '0' }}
          >
            <div className={`px-5 pb-5 ${animateAccordion3 ? 'animate-accordion-3' : ''}`}>
              {/* Breakdown rows */}
              <div className="rounded-lg overflow-hidden border border-[--lyra-color-border-soft]">
            <div className="breakdown-row-0 flex items-center px-4 py-2.5 border-b border-[--lyra-color-border-subtle] cursor-pointer transition-colors" style={{ background: 'var(--lyra-color-status-critical-subtle)' }}>
              <div className="flex-1 flex items-center gap-2">
                <span className="text-sm font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>Call Transfer Impact</span>
                <span className="inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold" style={{ background: 'var(--lyra-color-status-critical-subtle)', color: 'var(--lyra-color-status-critical-strong)' }}>
                  <AlertTriangle className="h-2.5 w-2.5" /> culprit
                </span>
              </div>
              <div className="w-[100px] text-center text-sm font-semibold" style={{ color: 'var(--lyra-color-status-critical-strong)' }}>-69%</div>
              <div className="w-[140px] text-center text-xs" style={{ color: 'var(--lyra-color-fg-secondary)' }}>(-433 customers)</div>
              <button onClick={onOpenCohort} className="inline-flex items-center rounded-lg px-2.5 py-1 text-xs transition-colors" style={{ border: '1px solid var(--lyra-color-status-critical-strong)', background: 'var(--lyra-color-bg-surface-base)', color: 'var(--lyra-color-status-critical-strong)' }}>
                open cohort →
              </button>
            </div>
            <div className="breakdown-row-1 flex items-center px-4 py-2.5 bg-white border-b border-[--lyra-color-border-subtle] hover:bg-[--lyra-color-state-bg-hover-opacity] cursor-pointer transition-colors">
              <div className="flex-1">
                <span className="text-sm font-medium" style={{ color: 'var(--lyra-color-fg-default)' }}>Billing Dispute</span>
              </div>
              <div className="w-[100px] text-center text-sm font-semibold" style={{ color: 'var(--lyra-color-fg-secondary)' }}>-47%</div>
              <div className="w-[140px] text-center text-xs" style={{ color: 'var(--lyra-color-fg-secondary)' }}>(-410 customers)</div>
              <button className="inline-flex items-center rounded-lg px-2.5 py-1 text-xs transition-colors" style={{ border: '1px solid var(--lyra-color-border-soft)', background: 'var(--lyra-color-bg-surface-base)', color: 'var(--lyra-color-fg-secondary)' }}>
                open cohort →
              </button>
            </div>
            <div className="breakdown-row-2 flex items-center px-4 py-2.5 bg-white hover:bg-[--lyra-color-state-bg-hover-opacity] cursor-pointer transition-colors">
              <div className="flex-1">
                <span className="text-sm font-medium" style={{ color: 'var(--lyra-color-fg-default)' }}>Refund Processing</span>
              </div>
              <div className="w-[100px] text-center text-sm font-semibold" style={{ color: 'var(--lyra-color-fg-secondary)' }}>-42%</div>
              <div className="w-[140px] text-center text-xs" style={{ color: 'var(--lyra-color-fg-secondary)' }}>(-500 customers)</div>
              <button className="inline-flex items-center rounded-lg px-2.5 py-1 text-xs transition-colors" style={{ border: '1px solid var(--lyra-color-border-soft)', background: 'var(--lyra-color-bg-surface-base)', color: 'var(--lyra-color-fg-secondary)' }}>
                open cohort →
              </button>
            </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion 3 — Why we trust this read */}
        <div className="flex-1 rounded-lg bg-white overflow-hidden border border-[--lyra-color-border-soft]">
          <button
            onClick={handleAccordion4Toggle}
            className="w-full px-5 py-5 flex items-center justify-between cursor-pointer hover:bg-[--lyra-color-state-bg-hover-opacity] transition-colors group"
          >
            <div className="flex-1 pr-4">
              <div className="flex items-start justify-between">
                <div className="text-sm font-semibold text-left" style={{ color: 'var(--lyra-color-fg-default)' }}>How reliable is this read?</div>
                <span className="text-xs flex-shrink-0 ml-6" style={{ color: 'var(--lyra-slate-400)' }}>Last 7 days · VU ≥ 32 confirmed</span>
              </div>
              <div className="text-xs mt-1 text-left max-w-[700px]" style={{ color: 'var(--lyra-color-fg-secondary)' }}>How often FI's read of the friction matched what customers actually said. Higher % = more reliable diagnostic signal.</div>
              <div className="mt-1.5 flex justify-start">
                <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold" style={{ background: 'var(--lyra-color-status-success-subtle)', color: 'var(--lyra-color-status-success-strong)' }}>
                  <span className="text-xs">✓</span>
                  <span className="text-xs uppercase tracking-[0.05em]">TRUST</span>
                  <span>·</span>
                  <span>75% validation accuracy on Transfer interactions</span>
                </span>
              </div>
            </div>
            <ChevronRight
              className={`h-5 w-5 transition-all duration-200 flex-shrink-0 ml-4 ${accordion4Open ? 'rotate-90' : ''}`}
              style={{ color: 'var(--lyra-color-fg-secondary)' }}
            />
          </button>
          <div
            className="overflow-hidden transition-all duration-200"
            style={{ maxHeight: accordion4Open ? '1500px' : '0' }}
          >
            <div className={`px-5 pb-5 ${animateAccordion4 ? 'animate-accordion-4' : ''}`}>
              {/* Matrix */}
              <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="matrix-headers">
                <tr>
                  <th className="px-3 py-1.5 text-left text-xs font-medium" style={{ color: 'var(--lyra-color-fg-secondary)' }}></th>
                  {MATRIX_COLS.map((col, i) => (
                    <th
                      key={i}
                      className={`px-3 py-1.5 text-center text-xs font-medium ${col.highlighted ? 'border-2 border-b-0 rounded-t-md transfer-column-border' : ''}`}
                      style={col.highlighted ? { color: 'var(--lyra-color-fg-secondary)', borderColor: 'var(--lyra-color-status-warning-medium)' } : { color: 'var(--lyra-color-fg-secondary)' }}
                    >
                      <div>{col.title}</div>
                      <div className="font-normal text-xs mt-0.5" style={{ color: 'var(--lyra-slate-400)' }}>{col.sub}</div>
                      {col.highlighted && (
                        <span className="inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-semibold mt-1" style={{ background: 'var(--lyra-color-status-warning-subtle)', color: 'var(--lyra-color-status-warning-strong)' }}>relevant to cluster</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATRIX_ROWS.map((row, ri) => (
                  <tr key={ri}>
                    <td className="px-3 py-1.5 text-xs font-medium whitespace-nowrap" style={{ color: 'var(--lyra-color-fg-default)' }}>{row.label}</td>
                    {row.cells.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`matrix-cell px-3 py-1.5 text-center text-xs font-medium rounded ${MATRIX_COLS[ci].highlighted ? (ri === MATRIX_ROWS.length - 1 ? 'border-x-2 border-b-2 rounded-b-md' : 'border-x-2') : ''}`}
                        style={{
                          backgroundColor: cellBg(cell),
                          color: cellFg(cell),
                          animationDelay: `${0.2 + (ri + ci) * 0.04}s`,
                          ...(MATRIX_COLS[ci].highlighted ? { borderColor: 'var(--lyra-color-status-warning-medium)' } : {})
                        }}
                      >
                        {cell.value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
              </div>

              {/* Interpretation callout */}
              <div className="interpretation-callout mt-4 rounded-lg p-3.5" style={{ border: '1px solid var(--lyra-color-status-warning-medium)', background: 'var(--lyra-color-status-warning-subtle)' }}>
            <div className="flex items-start gap-2">
              <Sparkles className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" style={{ color: 'var(--lyra-color-fg-link)' }} />
              <div>
                <div className="text-xs font-semibold" style={{ color: 'var(--lyra-color-status-warning-strong)' }}>What this means for the billing-flow cluster</div>
                <p className="mt-1.5 text-xs leading-[1.4]" style={{ color: 'var(--lyra-color-fg-secondary)' }}>
                  When billing-dispute interactions involved a Transfer, FI's read of
                  the friction was confirmed 75% of the time — <span className="font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>the highest accuracy
                  band in this cluster</span>. This is why we can trust the diagnosis above:
                  FI is reliably catching the bot-to-human handoff as the friction
                  point, not noise.
                </p>
              </div>
            </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </AppShell>
  )
}

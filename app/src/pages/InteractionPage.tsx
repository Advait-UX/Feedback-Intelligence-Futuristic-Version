import { Sparkles, AlertTriangle, Play, Check, ArrowRight } from 'lucide-react'
import { AppShell } from '../components/layout/AppShell'

const VU_SCORES = [
  { intent: 'Agent Resolution', score: '+68', color: 'var(--lyra-color-status-success-strong)', description: 'Rachel resolved the issue cleanly — refund processed, bundle removed, account protected.' },
  { intent: 'Bot Transfer Impact', score: '-52', color: 'var(--lyra-color-status-critical-strong)', description: 'The bot-to-human handoff created friction. Billing policy changes impacted the routing, triggering the transfer.' },
  { intent: 'System Listening', score: '-38', color: 'var(--lyra-color-status-critical-strong)', description: 'Customer felt unheard during the bot phase — repeated the issue twice before transfer.' },
  { intent: 'Issue Clarity', score: '-34', color: 'var(--lyra-color-status-critical-strong)', description: 'The unauthorized charge wasn\'t immediately surfaced by the system — customer had to explain.' },
]

const VALIDATED_FEEDBACK = [
  { label: 'Rating', value: '3/5 ★★★☆☆' },
  { label: 'Campaign', value: 'Retention Voice Q2' },
  { label: 'Q1', value: 'Was your issue resolved?' },
  { label: 'Answer 1', value: 'Yes' },
  { label: 'Q2', value: 'How would you rate your overall experience?' },
  { label: 'Answer 2', value: '3 — Neutral' },
  { label: 'Customer comment', value: '"Rachel was patient and walked me through the duplicate charge step by step. Refund showed up the same day. Really appreciated the follow-up email."', isComment: true },
  { label: 'FI signal', value: 'Bot Transfer Impact — handoff friction detected' },
  { label: 'Confidence', value: '100/100' },
]

export function InteractionPage({ onBack, onBackToAnalysis }: { onBack: () => void; onBackToAnalysis: () => void }) {
  return (
    <AppShell title="Interaction" breadcrumb={['Feedback Intelligence', 'Dashboard', 'Analysis', 'Cohort']}>
      <div className="p-5 space-y-5" style={{ background: 'var(--lyra-color-bg-surface-shell)' }}>
        {/* Back link */}
        <button onClick={onBack} className="text-sm font-medium hover:underline" style={{ color: 'var(--lyra-color-fg-link)' }}>
          ← Back to cohort
        </button>

        {/* Page header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-lg font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>Interaction Survey Result</h1>
            <p className="font-mono text-xs mt-0.5" style={{ color: 'var(--lyra-color-fg-secondary)' }}>ID: 1c4fa089-d0c2-4157-ad35-b519bd0a2964</p>
            <p className="text-xs mt-1" style={{ color: 'var(--lyra-color-fg-secondary)' }}>7/05/2026 · 8:21 PM · Voice · Retention Voice Q2 · James Carter → Rachel Whitman (Retention Unit)</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="inline-flex items-center gap-1.5 rounded-lg border bg-white px-3 py-1.5 text-xs font-medium transition-colors" style={{ borderColor: 'var(--lyra-color-border-soft)', color: 'var(--lyra-color-fg-secondary)' }}>
              <Play className="h-3.5 w-3.5" /> Play Interaction
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg border bg-white px-3 py-1.5 text-xs font-medium hover:bg-[--lyra-color-bg-active-subtle] transition-colors" style={{ borderColor: 'var(--lyra-color-border-soft)', color: 'var(--lyra-color-fg-link)' }}>
              <Sparkles className="h-3.5 w-3.5" /> Ask AI
            </button>
          </div>
        </div>

        {/* Act 1 — The Verdict */}
        <div className="rounded-lg border p-6" style={{ borderColor: 'var(--lyra-color-status-critical-medium)', background: 'var(--lyra-color-status-critical-subtle)' }}>
          <div className="text-xs font-semibold uppercase tracking-[0.05em]" style={{ color: 'var(--lyra-color-status-critical-strong)' }}>THE VERDICT</div>
          <div className="mt-1 text-base font-semibold max-w-[900px]" style={{ color: 'var(--lyra-color-fg-default)' }}>
            The customer rated 3/5. The agent earned +68. The friction wasn't Rachel — it was the handoff.
          </div>

          <div className="grid grid-cols-4 gap-3 mt-4">
            <div className="rounded-md border bg-white p-3.5 text-center" style={{ borderColor: 'var(--lyra-color-status-critical-medium)' }}>
              <div className="text-2xl font-semibold" style={{ color: 'var(--lyra-color-status-critical-strong)' }}>3/5</div>
              <div className="text-xs mt-1" style={{ color: 'var(--lyra-color-fg-secondary)' }}>customer rating</div>
            </div>
            <div className="rounded-md border bg-white p-3.5 text-center" style={{ borderColor: 'var(--lyra-color-status-critical-medium)' }}>
              <div className="text-2xl font-semibold" style={{ color: 'var(--lyra-color-status-success-strong)' }}>+68</div>
              <div className="text-xs mt-1" style={{ color: 'var(--lyra-color-fg-secondary)' }}>agent FI signal</div>
            </div>
            <div className="rounded-md border bg-white p-3.5 text-center" style={{ borderColor: 'var(--lyra-color-status-critical-medium)' }}>
              <div className="text-2xl font-semibold" style={{ color: 'var(--lyra-color-status-critical-strong)' }}>-52</div>
              <div className="text-xs mt-1" style={{ color: 'var(--lyra-color-fg-secondary)' }}>handoff VU</div>
            </div>
            <div className="rounded-md border bg-white p-3.5 text-center" style={{ borderColor: 'var(--lyra-color-status-critical-medium)' }}>
              <div className="text-2xl font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>100/100</div>
              <div className="text-xs mt-1" style={{ color: 'var(--lyra-color-fg-secondary)' }}>validation score</div>
            </div>
          </div>

          <div className="mt-3 text-xs" style={{ color: 'var(--lyra-color-fg-secondary)' }}>
            Member of <button onClick={onBack} className="hover:underline" style={{ color: 'var(--lyra-color-fg-link)' }}>Call Transfer Impact cohort</button> · <span className="font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>890 like this case</span>
          </div>
        </div>

        {/* Acts 2 + 3 — Two-column layout */}
        <div className="grid grid-cols-2 gap-5">
          {/* Act 2 — VU score by intent */}
          <div className="rounded-lg border bg-white p-5" style={{ borderColor: 'var(--lyra-color-border-soft)' }}>
            <div className="text-sm font-semibold mb-4" style={{ color: 'var(--lyra-color-fg-default)' }}>VU score by intent</div>
            <div className="space-y-3">
              {VU_SCORES.map((item, i) => (
                <div key={i} className="rounded-md border p-3" style={{ borderColor: 'var(--lyra-color-border-soft)' }}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium" style={{ color: 'var(--lyra-color-fg-default)' }}>{item.intent}</span>
                    <span className="text-base font-semibold" style={{ color: item.color }}>{item.score}</span>
                  </div>
                  <div className="mt-1.5 text-xs leading-relaxed" style={{ color: 'var(--lyra-color-fg-secondary)' }}>{item.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Act 3 — Validated feedback */}
          <div className="rounded-lg border bg-white p-5" style={{ borderColor: 'var(--lyra-color-border-soft)' }}>
            <div className="text-sm font-semibold mb-4" style={{ color: 'var(--lyra-color-fg-default)' }}>Validated feedback</div>
            <div className="space-y-0">
              {VALIDATED_FEEDBACK.map((item, i) => (
                <div key={i} className="flex border-b last:border-b-0 py-2.5" style={{ borderColor: 'var(--lyra-color-border-subtle)' }}>
                  <div className="w-[100px] flex-shrink-0 text-xs font-medium" style={{ color: 'var(--lyra-color-fg-secondary)' }}>{item.label}</div>
                  <div className="text-xs flex-1" style={{ color: item.isComment ? 'var(--lyra-color-fg-secondary)' : 'var(--lyra-color-fg-default)', fontStyle: item.isComment ? 'italic' : undefined }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Act 4 — How this call unfolded */}
        <div className="rounded-lg border bg-white p-6" style={{ borderColor: 'var(--lyra-color-border-soft)' }}>
          <div className="text-base font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>How this call unfolded</div>
          <div className="text-xs mt-1" style={{ color: 'var(--lyra-color-fg-secondary)' }}>The narrative arc of James's call, stage by stage</div>

          <div className="mt-5 space-y-4">
            {/* Stage 1 */}
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold" style={{ background: 'var(--lyra-color-bg-surface-shell)', color: 'var(--lyra-color-fg-default)' }}>1</div>
              <div>
                <div className="text-sm font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>Bot Engagement</div>
                <div className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--lyra-color-fg-secondary)' }}>James called about an unauthorized $87 charge on his bill. Andrew (AI agent) began handling the inquiry.</div>
              </div>
            </div>
            {/* Stage 2 */}
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold" style={{ background: 'var(--lyra-color-status-critical-subtle)', color: 'var(--lyra-color-status-critical-strong)' }}>2</div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold" style={{ color: 'var(--lyra-color-status-critical-strong)' }}>The Friction Point</span>
                  <AlertTriangle className="h-3.5 w-3.5" style={{ color: 'var(--lyra-color-status-critical-strong)' }} />
                </div>
                <div className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--lyra-color-fg-secondary)' }}>AI billing routing didn't apply (recent billing policy changes impacted the routing). Andrew transferred the call to a human agent — and James had to re-explain the entire $87 charge dispute from scratch. <span className="font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>Sentiment shifted: Positive → Neutral.</span></div>
              </div>
            </div>
            {/* Stage 3 */}
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold" style={{ background: 'var(--lyra-color-status-success-subtle)', color: 'var(--lyra-color-status-success-strong)' }}>3</div>
              <div>
                <div className="text-sm font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>Human Resolution</div>
                <div className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--lyra-color-fg-secondary)' }}>Rachel (Retention Unit) refunded the charge, removed the bundle, and added account protection so it doesn't happen again. James thanked her: "you've been fantastic."</div>
              </div>
            </div>
            {/* Stage 4 */}
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold" style={{ background: 'var(--lyra-color-status-warning-subtle)', color: 'var(--lyra-color-status-warning-strong)' }}>4</div>
              <div>
                <div className="text-sm font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>Outcome — Rating Mismatch</div>
                <div className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--lyra-color-fg-secondary)' }}>Despite Rachel's clean resolution (+68 agent FI signal), James rated 3/5. The friction signal points to <span className="font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>the handoff — not the human agent's performance</span>.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Act 5 — What FI did with this signal */}
        <div className="rounded-lg border p-6" style={{ borderColor: 'var(--lyra-color-border-soft)', background: 'var(--lyra-color-bg-surface-shell)' }}>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" style={{ color: 'var(--lyra-color-status-warning-strong)' }} />
            <span className="text-base font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>What Feedback Intelligence did with this signal</span>
          </div>
          <div className="text-xs mt-1" style={{ color: 'var(--lyra-color-fg-secondary)' }}>Five steps from raw interaction to system-level action</div>

          <div className="mt-4 space-y-2.5">
            <div className="flex items-start gap-2">
              <Check className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--lyra-color-status-success-strong)' }} />
              <span className="text-sm" style={{ color: 'var(--lyra-color-fg-default)' }}>Diagnosed: <span className="font-semibold">handoff friction</span>, not agent performance</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--lyra-color-status-success-strong)' }} />
              <span className="text-sm" style={{ color: 'var(--lyra-color-fg-default)' }}>Validated: <span className="font-semibold">100/100 confidence</span> — customer's own comment confirms the diagnosis</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--lyra-color-status-success-strong)' }} />
              <span className="text-sm" style={{ color: 'var(--lyra-color-fg-default)' }}>Tagged: added to <span className="font-semibold">Call Transfer Impact cohort</span> (890 like cases)</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--lyra-color-status-success-strong)' }} />
              <span className="text-sm" style={{ color: 'var(--lyra-color-fg-default)' }}>Surfaced: contributed to <span className="font-semibold">cluster pattern detection</span> on the dashboard</span>
            </div>
            <div className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--lyra-color-status-warning-strong)' }} />
              <span className="text-sm" style={{ color: 'var(--lyra-color-fg-secondary)' }}>Pending: <span className="font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>scoring review</span> (recommended on the analysis page)</span>
            </div>
          </div>
        </div>

        {/* Act 6 — Next Actions */}
        <div className="flex items-center justify-center gap-4 py-4">
          <button onClick={onBackToAnalysis} className="inline-flex items-center rounded-lg border bg-white px-4 py-2.5 text-sm transition-colors" style={{ borderColor: 'var(--lyra-color-border-soft)', color: 'var(--lyra-color-fg-secondary)' }}>
            ← Back to analysis
          </button>
          <button className="inline-flex items-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors" style={{ background: 'var(--lyra-color-bg-primary)', color: 'var(--lyra-color-fg-on-primary)' }}>
            Add to scoring review
          </button>
          <button onClick={onBack} className="inline-flex items-center rounded-lg border bg-white px-4 py-2.5 text-sm transition-colors" style={{ borderColor: 'var(--lyra-color-border-soft)', color: 'var(--lyra-color-fg-secondary)' }}>
            ← Back to cohort
          </button>
        </div>
      </div>
    </AppShell>
  )
}

import { ChevronRight } from 'lucide-react'
import type { Survey, SurveyStatus } from '@/lib/surveys'

/* ============================================================
 * SurveysList — Recent surveys table shown inside the per-campaign
 * Level 2 FI Dashboard. Each row drills into the SurveyDetailPage.
 * ============================================================ */
export function SurveysList({
  surveys,
  onOpenSurvey,
}: {
  surveys: Survey[]
  onOpenSurvey: (id: string) => void
}) {
  return (
    <section>
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-base font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>Recent surveys</h2>
        <span className="text-xs" style={{ color: 'var(--lyra-color-fg-disabled)' }}>
          {surveys.length} surveys · click a row to open the survey detail
        </span>
      </div>

      {surveys.length === 0 ? (
        <div className="bg-white border border-[--lyra-color-border-soft] rounded-[--radius-lg] p-6 text-center">
          <p className="text-sm" style={{ color: 'var(--lyra-color-fg-disabled)' }}>No surveys yet for this campaign.</p>
        </div>
      ) : (
        <div className="bg-white border border-[--lyra-color-border-soft] rounded-[--radius-lg] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[--lyra-color-border-subtle]">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.05em]" style={{ color: 'var(--lyra-color-fg-disabled)' }}>
                  Customer
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.05em]" style={{ color: 'var(--lyra-color-fg-disabled)' }}>
                  Phone
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.05em]" style={{ color: 'var(--lyra-color-fg-disabled)' }}>
                  Email
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.05em]" style={{ color: 'var(--lyra-color-fg-disabled)' }}>
                  Agent
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.05em]" style={{ color: 'var(--lyra-color-fg-disabled)' }}>
                  Interaction
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.05em]" style={{ color: 'var(--lyra-color-fg-disabled)' }}>
                  Status
                </th>
                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-[0.05em]" style={{ color: 'var(--lyra-color-fg-disabled)' }}>
                  CSAT
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.05em]" style={{ color: 'var(--lyra-color-fg-disabled)' }}>
                  Top Topic
                </th>
                <th className="px-5 py-3 w-[36px]" />
              </tr>
            </thead>
            <tbody>
              {surveys.map(s => (
                <SurveyRow key={s.id} survey={s} onSelect={() => onOpenSurvey(s.id)} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

function SurveyRow({ survey, onSelect }: { survey: Survey; onSelect: () => void }) {
  const topTopic = survey.interaction.topicsDetected[0] ?? '—'
  const interactionDate = formatShortDate(survey.interaction.date)
  return (
    <tr
      onClick={onSelect}
      className="border-b border-[--lyra-color-border-subtle] last:border-b-0 hover:bg-[--lyra-color-state-bg-hover-opacity] cursor-pointer transition-colors"
    >
      <td className="px-5 py-3.5">
        <div className="text-sm font-medium" style={{ color: 'var(--lyra-color-fg-default)' }}>{survey.customer.name}</div>
      </td>
      <td className="px-5 py-3.5 tabular-nums" style={{ color: 'var(--lyra-color-fg-secondary)' }}>{survey.customer.phone}</td>
      <td className="px-5 py-3.5" style={{ color: 'var(--lyra-color-fg-secondary)' }}>{survey.customer.email}</td>
      <td className="px-5 py-3.5" style={{ color: 'var(--lyra-color-fg-secondary)' }}>{survey.agent.name}</td>
      <td className="px-5 py-3.5">
        <div className="text-xs" style={{ color: 'var(--lyra-color-fg-default)' }}>{interactionDate}</div>
        <div className="text-xs" style={{ color: 'var(--lyra-color-fg-disabled)' }}>{survey.interaction.channel}</div>
      </td>
      <td className="px-5 py-3.5">
        <SurveyStatusPill status={survey.status} />
      </td>
      <td className="px-5 py-3.5 text-right">
        {survey.csat !== null ? (
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 'var(--radius-sm)', minWidth: 36, padding: '3px 8px',
            fontSize: 14, fontWeight: 600, fontVariantNumeric: 'tabular-nums',
            fontFamily: 'var(--lyra-font-sans)', letterSpacing: '-0.01em',
            backgroundColor: survey.csat >= 70
              ? 'var(--lyra-color-status-info-subtle)'
              : survey.csat >= 50
              ? 'var(--lyra-color-status-warning-subtle)'
              : 'var(--lyra-color-status-critical-subtle)',
            color: 'var(--lyra-color-fg-default)',
          }}>{survey.csat}</span>
        ) : (
          <span style={{ color: 'var(--lyra-color-fg-secondary)' }}>—</span>
        )}
      </td>
      <td className="px-5 py-3.5" style={{ color: 'var(--lyra-color-fg-secondary)' }}>{topTopic}</td>
      <td className="px-5 py-3.5 text-right">
        <ChevronRight className="h-4 w-4" style={{ color: 'var(--lyra-color-fg-disabled)' }} />
      </td>
    </tr>
  )
}

/* ---------- Status pill ---------- */
const SURVEY_STATUS_STYLES: Record<SurveyStatus, { bg: string; color: string; border: string; label: string }> = {
  completed: { bg: 'var(--lyra-color-status-success-subtle)', color: 'var(--lyra-color-status-success-strong)', border: 'var(--lyra-color-status-success-medium)',  label: 'Completed' },
  partial:   { bg: 'var(--lyra-color-status-warning-subtle)', color: 'var(--lyra-color-status-warning-strong)', border: 'var(--lyra-color-status-warning-medium)', label: 'Partial'   },
  abandoned: { bg: 'var(--lyra-slate-200)',                   color: 'var(--lyra-slate-500)',                   border: 'var(--lyra-color-border-subtle)',           label: 'Abandoned' },
  pending:   { bg: 'var(--lyra-slate-100)',                   color: 'var(--lyra-slate-600)',                   border: 'var(--lyra-color-border-subtle)',           label: 'Pending'   },
}

export function SurveyStatusPill({ status }: { status: SurveyStatus }) {
  const s = SURVEY_STATUS_STYLES[status]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      borderRadius: 'var(--radius-full)', padding: '2px 8px',
      fontSize: 12, fontWeight: 500, lineHeight: '16px', letterSpacing: '0.01em',
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', flexShrink: 0 }} />
      {s.label}
    </span>
  )
}

function formatShortDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }) +
    ' · ' +
    d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

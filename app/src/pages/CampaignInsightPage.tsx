import { ArrowLeft, Sparkles } from 'lucide-react'
import type { Campaign } from '@/lib/campaigns'
import { CampaignInsightDashboard } from '@/components/feedback-intelligence/CampaignInsightDashboard'

/* ============================================================
 * Campaign Insight page — full-page Level 3 view that renders
 * the snapshot dashboard from MVP-Version's last commit.
 * Reached from "View Campaign Insight" on the per-campaign view.
 * ============================================================ */
export function CampaignInsightPage({
  campaign,
  onBack,
}: {
  campaign?: Campaign
  onBack: () => void
}) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--lyra-color-bg-surface-shell)' }}>
      <div className="border-b border-[--lyra-color-border-soft] px-6 lg:px-8 py-4" style={{ background: 'var(--lyra-color-bg-surface-base)' }}>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1 text-xs font-medium mb-3 outline-none focus:outline-none transition-colors"
          style={{ color: 'var(--lyra-color-fg-secondary)' }}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to campaign dashboard
        </button>
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] mb-1" style={{ color: '#4E39A8' }}>
              <Sparkles className="h-3 w-3" fill="#4E39A8" />
              Campaign Insight
            </div>
            <h1 className="text-[24px] font-semibold leading-tight" style={{ color: 'var(--lyra-color-fg-default)' }}>
              {campaign ? campaign.name : 'Campaign Insight'}
            </h1>
          </div>
        </div>
      </div>

      <div className="p-6 lg:px-8 flex-1">
        <CampaignInsightDashboard />
      </div>
    </div>
  )
}

import { AppShell } from '../components/layout/AppShell'
import { ArrowRight, Sparkles, Users } from 'lucide-react'

export function LandingPage({ onSelectFlow }: { onSelectFlow: (flow: 'feedback' | 'agent' | 'prototype') => void }) {
  const handleFeedbackClick = () => {
    onSelectFlow('prototype')
  }
  return (
    <AppShell title="Feedback Intelligence" breadcrumb={[]}>
      <div className="p-8 flex-1 flex items-center justify-center" style={{ background: 'var(--lyra-color-bg-surface-shell)' }}>
        <div className="max-w-5xl w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-semibold" style={{ color: 'var(--lyra-color-fg-default)' }}>Feedback Intelligence</h1>
            <p className="text-sm mt-2" style={{ color: 'var(--lyra-color-fg-secondary)' }}>Choose your intelligence flow</p>
          </div>

          {/* Two flow cards */}
          <div className="grid grid-cols-2 gap-6">
            {/* Feedback Intelligence Flow */}
            <button
              onClick={handleFeedbackClick}
              className="group rounded-xl border-2 border-[--lyra-color-border-soft] bg-white p-8 text-left hover:border-[--lyra-color-border-active] hover:shadow-lg transition-all focus-visible:outline-2 focus-visible:outline-[--lyra-color-border-focus-default]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg" style={{ background: 'var(--lyra-color-bg-active-subtle)' }}>
                  <Sparkles className="h-6 w-6" style={{ color: 'var(--lyra-color-fg-link)' }} />
                </div>
                <ArrowRight className="h-5 w-5 transition-all group-hover:translate-x-1" style={{ color: 'var(--lyra-color-fg-disabled)' }} />
              </div>
              <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--lyra-color-fg-default)' }}>Feedback Intelligence</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--lyra-color-fg-secondary)' }}>
                Analyze customer feedback patterns, detect hidden friction, and understand what's driving satisfaction scores across interactions.
              </p>
              <div className="mt-6 flex items-center gap-2">
                <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium" style={{ background: 'var(--lyra-color-status-success-subtle)', color: 'var(--lyra-color-status-success-strong)' }}>
                  Dashboard
                </span>
                <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium" style={{ background: 'var(--lyra-color-status-success-subtle)', color: 'var(--lyra-color-status-success-strong)' }}>
                  Analysis
                </span>
                <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium" style={{ background: 'var(--lyra-color-status-success-subtle)', color: 'var(--lyra-color-status-success-strong)' }}>
                  Cohorts
                </span>
              </div>
            </button>

            {/* Agent Flow */}
            <button
              onClick={() => onSelectFlow('agent')}
              className="group rounded-xl border-2 border-[--lyra-color-border-soft] bg-white p-8 text-left hover:border-[--lyra-color-border-active] hover:shadow-lg transition-all focus-visible:outline-2 focus-visible:outline-[--lyra-color-border-focus-default]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg" style={{ background: 'var(--lyra-color-bg-active-subtle)' }}>
                  <Users className="h-6 w-6" style={{ color: 'var(--lyra-color-fg-link)' }} />
                </div>
                <ArrowRight className="h-5 w-5 transition-all group-hover:translate-x-1" style={{ color: 'var(--lyra-color-fg-disabled)' }} />
              </div>
              <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--lyra-color-fg-default)' }}>Agent Flow</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--lyra-color-fg-secondary)' }}>
                Track agent performance, identify coaching opportunities, and understand how individual agents contribute to customer experience.
              </p>
              <div className="mt-6 flex items-center gap-2">
                <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium" style={{ background: 'var(--lyra-color-status-warning-subtle)', color: 'var(--lyra-color-status-warning-strong)' }}>
                  Coming soon
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Clock, Eye, Phone, MessageSquare, Sparkles } from 'lucide-react'

export function SurveyFlowPage({ onBackToLanding }: { onBackToLanding: () => void }) {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const timeoutsRef = useRef<number[]>([])

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(t => clearTimeout(t))
    timeoutsRef.current = []
  }

  const addTimeout = (fn: () => void, delay: number) => {
    const t = window.setTimeout(fn, delay)
    timeoutsRef.current.push(t)
  }

  useEffect(() => {
    return () => clearAllTimeouts()
  }, [])

  const handleQuestionClick = (questionNum: number) => {
    if (isAnimating) return

    clearAllTimeouts()
    setSelectedQuestion(questionNum)
    setIsAnimating(true)

    // Show answer after delay
    addTimeout(() => {
      setIsAnimating(false)
    }, 3000)
  }

  const replayAnimation = () => {
    clearAllTimeouts()
    setSelectedQuestion(null)
    setIsAnimating(false)
  }

  return (
    <div style={{ display: 'grid', gridTemplateRows: '56px 1fr', height: '100vh', minWidth: '1280px', fontFamily: 'var(--font-sans)' }}>
      {/* Topbar */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '8px',
        background: 'var(--lyra-color-bg-surface-base)',
        borderBottom: '1px solid var(--lyra-color-border-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '0 8px', height: '40px' }}>
          <div style={{ width: '24px', height: '24px', color: 'var(--lyra-color-fg-link)', display: 'grid', placeItems: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 23.848" fill="none">
              <path d="M 23.719 5.814 C 23.876 5.815 24.002 5.94 24 6.096 C 23.849 15.818 15.918 23.698 6.134 23.848 C 5.978 23.849 5.851 23.724 5.851 23.568 L 5.851 19.309 C 5.851 19.156 5.975 19.034 6.129 19.03 C 13.245 18.884 19.005 13.16 19.152 6.09 C 19.156 5.936 19.279 5.813 19.433 5.813 L 23.719 5.814 Z" fill="currentColor" fillRule="nonzero"/>
              <path d="M 12.256 0.001 C 13.871 0.001 15.18 1.302 15.181 2.906 C 15.181 4.511 13.872 5.812 12.256 5.813 C 10.64 5.813 9.33 4.511 9.33 2.906 C 9.33 1.302 10.64 0.001 12.256 0.001 Z" fill="currentColor" fillRule="nonzero"/>
              <path d="M 2.926 0 C 4.541 0 5.85 1.301 5.851 2.905 C 5.851 4.509 4.541 5.811 2.926 5.812 C 1.31 5.812 0 4.51 0 2.905 C 0 1.301 1.31 0 2.926 0 Z" fill="currentColor" fillRule="nonzero"/>
            </svg>
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '16px', letterSpacing: '-0.01em', color: 'var(--lyra-color-fg-default)' }}>
            CXone Agent
          </div>
        </div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          height: '32px',
          padding: '0 12px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--lyra-color-bg-active-subtle)',
          color: 'var(--lyra-color-fg-active-strong)',
          fontWeight: 600,
          fontSize: '14px'
        }}>
          <Clock size={14} />
          Survey monitor · #a2964 James C.
        </div>

        <div style={{ flex: 1 }}></div>

        <button onClick={onBackToLanding} style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          height: '32px',
          padding: '0 12px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--lyra-color-bg-surface-base)',
          color: 'var(--lyra-color-fg-active-strong)',
          border: '1px solid var(--lyra-color-border-subtle)',
          fontWeight: 600,
          fontSize: '14px',
          cursor: 'pointer',
          fontFamily: 'inherit'
        }}>
          ← Back to landing
        </button>

        <button onClick={replayAnimation} style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          height: '32px',
          padding: '0 12px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--lyra-color-bg-primary)',
          color: 'var(--lyra-color-fg-on-primary)',
          border: 'none',
          fontWeight: 600,
          fontSize: '14px',
          cursor: 'pointer',
          fontFamily: 'inherit'
        }}>
          ↻ Replay
        </button>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          height: '32px',
          padding: '0 12px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--lyra-color-bg-surface-base)',
          color: 'var(--lyra-color-fg-default)',
          border: '1px solid var(--lyra-color-border-subtle)',
          fontWeight: 600,
          fontSize: '14px'
        }}>
          <Eye size={14} style={{ color: 'var(--lyra-color-fg-secondary)' }} />
          Supervisor view · Maya R.
        </div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          height: '32px',
          padding: '0 12px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--lyra-color-bg-surface-base)',
          color: 'var(--lyra-color-fg-default)',
          border: '1px solid var(--lyra-color-border-subtle)',
          fontWeight: 600,
          fontSize: '14px'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: selectedQuestion !== null && !isAnimating ? 'var(--lyra-color-status-success-strong)' : 'var(--lyra-color-status-critical-strong)' }}></span>
          {selectedQuestion !== null && !isAnimating ? 'Complete' : 'Live'} · 00:14
        </div>
      </header>

      {/* Main */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '256px 1fr 320px 320px',
        gap: '16px',
        padding: '20px',
        minHeight: 0,
        background: 'var(--lyra-color-bg-surface-shell)'
      }}>
        {/* Sidebar */}
        <aside style={{
          background: 'var(--lyra-color-bg-surface-base)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--lyra-color-border-subtle)',
          boxShadow: 'var(--sol-effect-shadowsm)',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          overflow: 'auto'
        }}>
          <div>
            <h3 style={{
              margin: '0 8px',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--lyra-color-fg-secondary)'
            }}>Sessions</h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '8px 0 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px'
            }}>
              <li style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 10px',
                color: 'var(--lyra-color-fg-active-strong)',
                fontSize: '14px',
                fontWeight: 600,
                borderLeft: '2px solid var(--lyra-color-border-active)',
                borderRadius: 0,
                paddingLeft: '8px'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: selectedQuestion !== null && !isAnimating ? 'var(--lyra-color-status-success-strong)' : 'var(--lyra-color-status-critical-strong)' }}></span>
                #a2964 · James C.
              </li>
              <li style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 10px',
                borderRadius: 'var(--radius-md)',
                color: 'var(--lyra-color-fg-default)',
                fontSize: '14px',
                cursor: 'pointer'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--lyra-color-fg-disabled)' }}></span>
                #a2965 · Rachel W.
              </li>
              <li style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 10px',
                borderRadius: 'var(--radius-md)',
                color: 'var(--lyra-color-fg-default)',
                fontSize: '14px',
                cursor: 'pointer'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--lyra-color-fg-disabled)' }}></span>
                #a2966 · Parker W.
              </li>
            </ul>
          </div>
          <div>
            <h3 style={{
              margin: '0 8px',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--lyra-color-fg-secondary)'
            }}>Channels</h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '8px 0 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px'
            }}>
              <li style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 10px',
                borderRadius: 'var(--radius-md)',
                color: 'var(--lyra-color-fg-default)',
                fontSize: '14px',
                cursor: 'pointer'
              }}>
                <Phone size={14} style={{ color: 'var(--lyra-color-fg-secondary)' }} />
                Voice · <span style={{ color: 'var(--lyra-color-fg-secondary)' }}>6 active</span>
              </li>
              <li style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 10px',
                borderRadius: 'var(--radius-md)',
                color: 'var(--lyra-color-fg-default)',
                fontSize: '14px',
                cursor: 'pointer'
              }}>
                <MessageSquare size={14} style={{ color: 'var(--lyra-color-fg-secondary)' }} />
                Chat · <span style={{ color: 'var(--lyra-color-fg-secondary)' }}>6 active</span>
              </li>
            </ul>
          </div>
        </aside>

        {/* Center: Q&A monitor */}
        <section style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{
            color: 'var(--lyra-color-fg-secondary)',
            fontSize: '14px',
            padding: '4px 4px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>Sessions</span><span>/</span>
            <span style={{ color: 'var(--lyra-color-fg-default)', fontWeight: 600 }}>Retention Voice Q2</span><span>/</span>
            <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '12px' }}>1c4fa089…a2964</span>
          </div>

          <div style={{
            background: 'var(--lyra-color-bg-surface-base)',
            border: '1px solid var(--lyra-color-border-subtle)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--sol-effect-shadowsm)',
            padding: '36px 40px 40px',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
              <div>
                <h1 style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: 'var(--lyra-color-fg-default)',
                  letterSpacing: '-0.01em',
                  margin: 0,
                  lineHeight: 1.3
                }}>Probable list of questions based on intents identified</h1>
                <p style={{ color: 'var(--lyra-color-fg-secondary)', marginTop: '4px', fontSize: '14px' }}>
                  Generated from this session's detected intents. Each question is justified by the intent that triggered it.
                </p>
              </div>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--lyra-color-bg-ai)',
                color: '#4E39A8',
                fontWeight: 600,
                fontSize: '12px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}>
                <Sparkles size={12} />
                Intent-driven
              </span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'var(--lyra-color-bg-surface-base)',
              border: '1px solid var(--lyra-color-border-soft)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 14px',
              color: 'var(--lyra-color-fg-secondary)',
              margin: '18px 0 -4px',
              fontSize: '14px'
            }}>
              <div style={{
                width: '18px',
                height: '18px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--lyra-color-bg-primary)',
                color: 'var(--lyra-color-fg-on-primary)',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 600,
                fontSize: '12px',
                fontFamily: 'var(--font-sans)',
                flexShrink: 0
              }}>i</div>
              <div>
                <strong style={{ color: 'var(--lyra-color-fg-default)', fontWeight: 600 }}>These are probable questions</strong> — based on detected intents. They may adapt in real time as the customer responds.
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '22px' }}>
              {/* Q0 - Welcome */}
              <div onClick={() => handleQuestionClick(0)} style={{ cursor: 'pointer' }}>
                <QuestionCard
                  num={0}
                  status={selectedQuestion !== null && selectedQuestion >= 0 ? 'done' : 'inactive'}
                  text="Welcome message played · auto-advanced to Question 1"
                />
              </div>

              {/* Q1 */}
              <div onClick={() => handleQuestionClick(1)} style={{ cursor: 'pointer' }}>
                <QuestionCard
                  num={1}
                  status={selectedQuestion === 1 && isAnimating ? 'active' : (selectedQuestion !== null && selectedQuestion >= 1 ? 'done' : 'inactive')}
                  text="On a scale of 1 to 5, how satisfied were you with Rachel's handling of your request today?"
                  answer={selectedQuestion !== null && selectedQuestion >= 1 && !isAnimating ? '3 · Moderately satisfied' : undefined}
                  intentTag="Billing dispute"
                  intentWhy="Customer flagged an unrecognized $87 charge — surveying satisfaction with the resolution."
                />
              </div>

              {/* Q2 */}
              <div onClick={() => handleQuestionClick(2)} style={{ cursor: 'pointer' }}>
                <QuestionCard
                  num={2}
                  status={selectedQuestion === 2 && isAnimating ? 'active' : (selectedQuestion !== null && selectedQuestion >= 2 ? 'done' : 'inactive')}
                  text="Did the transition from the automated system to a human agent cause any frustration?"
                  answer={selectedQuestion !== null && selectedQuestion >= 2 && !isAnimating ? '"Yes, I had to repeat myself, and it felt like the system wasn\'t listening..."' : undefined}
                  intentTag="Bot-to-human handoff friction"
                  intentWhy="Adapted from a 3/5 rating — probing handoff experience as a likely friction point."
                  answerNegative={true}
                />
              </div>

              {/* Q3 */}
              <div onClick={() => handleQuestionClick(3)} style={{ cursor: 'pointer' }}>
                <QuestionCard
                  num={3}
                  status={selectedQuestion === 3 && isAnimating ? 'active' : (selectedQuestion !== null && selectedQuestion >= 3 ? 'done' : 'inactive')}
                  text="Were you left feeling unsure about what went wrong with your issue?"
                  answer={selectedQuestion !== null && selectedQuestion >= 3 && !isAnimating ? '"Yes, but Rachel was able to resolve my query."' : undefined}
                  intentTag="Explanation clarity"
                  intentWhy="Adapted from a 3/5 rating — checking whether the cause was clearly communicated."
                  answerMixed={true}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Right: Session panel */}
        <aside style={{
          background: 'var(--lyra-color-bg-surface-base)',
          border: '1px solid var(--lyra-color-border-subtle)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--sol-effect-shadowsm)',
          padding: '20px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          overflow: 'auto'
        }}>
          <h2 style={{
            margin: 0,
            fontFamily: 'var(--font-sans)',
            fontSize: '16px',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            color: 'var(--lyra-color-fg-default)'
          }}>Session</h2>
          <div style={{ color: 'var(--lyra-color-fg-secondary)', fontSize: '12px', margin: '4px 0 12px' }}>
            Routed in from CXone Agent · Rachel Whitman
          </div>

          <KeyValue k="Customer" v="James Carter" />
          <KeyValue k="Number" v="+1 (253) 334-8998" />
          <KeyValue k="Campaign" v="Retention Voice Q2" />
          <KeyValue k="Model · version" v="Telco tuned · v4 · Weights" />
          <KeyValue k="Started" v="9:15:42 AM" />
          <KeyValue k="Channel" v="Voice · IVR" />

          <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid var(--lyra-color-border-subtle)' }}>
            <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--lyra-color-fg-default)' }}>Audio input</div>
            <div style={{ color: 'var(--lyra-color-fg-secondary)', fontSize: '12px', marginTop: '2px' }}>Speech recognition only · no keypad input</div>
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '4px',
              height: '56px',
              marginTop: '14px'
            }}>
              {[28, 62, 42, 70, 84, 36, 52, 40, 74, 80, 38].map((height, i) => (
                <span key={i} style={{
                  flex: 1,
                  minWidth: '8px',
                  background: height > 60 ? '#4E39A8' : 'var(--lyra-color-bg-ai)',
                  borderRadius: '2px',
                  height: `${height}%`
                }}></span>
              ))}
            </div>
          </div>
        </aside>

        {/* Phone Mockup */}
        <div style={{
          background: 'var(--lyra-color-bg-surface-shell)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px'
        }}>
          <div style={{
            width: '280px',
            height: '600px',
            background: 'var(--lyra-color-bg-surface-base)',
            borderRadius: '32px',
            boxShadow: 'var(--sol-effect-shadowxl)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}>
            {/* Notch */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '28px',
              background: 'black',
              borderRadius: '0 0 16px 16px',
              zIndex: 10
            }}></div>

            {/* Status Bar */}
            <div style={{
              height: '44px',
              background: 'var(--lyra-color-bg-surface-base)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '0 16px 8px',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: 'var(--lyra-color-fg-default)',
              fontWeight: 500
            }}>
              <div>9:14</div>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" style={{ color: 'var(--lyra-color-fg-default)' }}>
                  <path d="M0 10h2v2H0v-2zm4-4h2v6H4V6zm4-4h2v10H8V2zm4 2h2v8h-2V4z"/>
                </svg>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--lyra-color-fg-default)' }}>
                  <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
                  <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
                  <circle cx="12" cy="20" r="1"/>
                </svg>
                <svg width="24" height="12" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--lyra-color-fg-default)' }}>
                  <rect x="1" y="1" width="18" height="10" rx="2"/>
                  <path d="M20 4v4"/>
                </svg>
              </div>
            </div>

            {/* Header */}
            <div style={{
              background: 'var(--lyra-color-bg-surface-shell)',
              padding: '16px',
              borderBottom: '1px solid var(--lyra-color-border-subtle)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--lyra-color-fg-default)', marginBottom: '2px' }}>
                NICE Customer Survey
              </div>
              <div style={{ fontSize: '12px', color: 'var(--lyra-color-fg-secondary)' }}>
                automated · adaptive flow · 00:42
              </div>
            </div>

            {/* Voice Call UI */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 20px 24px',
              background: 'var(--lyra-color-bg-surface-base)'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                {/* Avatar */}
                <div style={{
                  width: '100px',
                  height: '100px',
                  background: '#4E39A8',
                  borderRadius: '50%',
                  margin: '0 auto 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '40px',
                  fontWeight: 600,
                  color: 'var(--lyra-color-fg-inverse)',
                  boxShadow: 'var(--sol-effect-shadowlg)'
                }}>SA</div>

                {/* Call Info */}
                <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--lyra-color-fg-default)', marginBottom: '4px', textAlign: 'center' }}>
                  Survey Agent
                </div>
                <div style={{ fontSize: '14px', color: 'var(--lyra-color-fg-secondary)', marginBottom: '20px', textAlign: 'center' }}>
                  Voice Survey · IVR
                </div>

                {/* Question Display */}
                {selectedQuestion !== null && (
                  <div style={{
                    background: 'var(--lyra-color-bg-surface-shell)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px 16px',
                    marginBottom: '20px',
                    maxWidth: '220px',
                    textAlign: 'center',
                    animation: 'messageSlideIn 0.3s ease-out'
                  }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--lyra-color-fg-secondary)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {isAnimating ? 'Asking...' : 'Question ' + selectedQuestion}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--lyra-color-fg-default)', lineHeight: 1.3 }}>
                      {selectedQuestion === 1 && 'On a scale of 1 to 5, how satisfied were you?'}
                      {selectedQuestion === 2 && 'Did the transition cause any frustration?'}
                      {selectedQuestion === 3 && 'Were you left feeling unsure?'}
                    </div>
                    {!isAnimating && selectedQuestion > 0 && (
                      <div style={{
                        marginTop: '8px',
                        paddingTop: '8px',
                        borderTop: '1px solid var(--lyra-color-border-subtle)',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--lyra-color-status-success-strong)'
                      }}>
                        ✓ Response captured
                      </div>
                    )}
                  </div>
                )}

                {/* Audio Waveform */}
                {isAnimating && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    height: '32px',
                    marginBottom: '20px'
                  }}>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={i} style={{
                        width: '4px',
                        background: '#4E39A8',
                        borderRadius: '2px',
                        animation: `waveformBounce 1s ease-in-out infinite`,
                        animationDelay: `${i * 0.1}s`
                      }}></div>
                    ))}
                  </div>
                )}

                {/* Timer */}
                <div style={{
                  fontSize: '28px',
                  fontWeight: 300,
                  color: 'var(--lyra-color-fg-default)',
                  fontVariantNumeric: 'tabular-nums',
                  marginBottom: '24px',
                  letterSpacing: '0.05em'
                }}>
                  {selectedQuestion === null ? '00:00' : `00:${String(selectedQuestion * 15).padStart(2, '0')}`}
                </div>
              </div>

              {/* Call Controls */}
              <div style={{
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                paddingBottom: '8px'
              }}>
                <button style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'var(--lyra-color-bg-surface-shell)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--lyra-color-fg-secondary)'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  </svg>
                </button>

                <button style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'var(--lyra-color-status-success-strong)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--lyra-color-fg-inverse)',
                  boxShadow: 'var(--sol-effect-shadowmd)'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 2 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.79a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.29-1.29a2 2 0 0 1 2.11-.45c.89.35 1.83.59 2.79.72A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </button>

                <button style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'var(--lyra-color-bg-surface-shell)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--lyra-color-fg-secondary)'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5 6 9H2v6h4l5 4V5zM15 9a4 4 0 0 1 0 6"/>
                  </svg>
                </button>
              </div>

              {/* Hint Text */}
              {selectedQuestion === null && (
                <div style={{
                  fontSize: '12px',
                  color: 'var(--lyra-color-fg-disabled)',
                  textAlign: 'center',
                  maxWidth: '200px',
                  marginTop: '8px'
                }}>
                  Click a question card to see it in action
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function QuestionCard({ num, status, text, answer, intentTag, intentWhy, answerNegative, answerMixed }: {
  num: number
  status: 'active' | 'done' | 'inactive'
  text: string
  answer?: string
  intentTag?: string
  intentWhy?: string
  answerNegative?: boolean
  answerMixed?: boolean
}) {
  const cardStyle: React.CSSProperties = {
    border: status === 'active' ? '1.5px solid rgba(78,57,168,0.45)' : '1px solid var(--lyra-color-border-subtle)',
    background: status === 'active' ? 'var(--lyra-color-bg-ai)' : 'var(--lyra-color-bg-surface-base)',
    borderRadius: 'var(--radius-lg)',
    padding: '20px 22px',
    display: 'grid',
    gridTemplateColumns: '32px 1fr',
    gap: '14px'
  }

  const numStyle: React.CSSProperties = {
    width: '28px',
    height: '28px',
    borderRadius: 'var(--radius-full)',
    background: status === 'done' ? 'var(--lyra-color-status-success-strong)' : (status === 'active' ? '#4E39A8' : 'var(--lyra-color-bg-surface-shell)'),
    color: status === 'inactive' ? 'var(--lyra-color-fg-secondary)' : 'var(--lyra-color-fg-inverse)',
    fontWeight: 600,
    fontSize: '14px',
    display: 'grid',
    placeItems: 'center',
    marginTop: '2px',
    border: status === 'inactive' ? '1px solid var(--lyra-color-border-subtle)' : 'none',
    fontFamily: 'var(--font-sans)'
  }

  return (
    <div style={cardStyle}>
      <div style={numStyle}>{num}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: 0 }}>
        <div style={{
          fontSize: '15px',
          lineHeight: 1.5,
          color: status === 'active' ? 'var(--lyra-color-fg-default)' : 'var(--lyra-color-fg-default)',
          fontWeight: status === 'active' ? 600 : 500
        }}>{text}</div>

        {status === 'active' && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--lyra-color-fg-secondary)',
            fontSize: '12px'
          }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#4E39A8',
              fontWeight: 600
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#4E39A8',
                animation: 'pulse 1.4s ease-out infinite'
              }}></span>
              Awaiting input
            </span>
          </div>
        )}

        {answer && !answerNegative && !answerMixed && (
          <div style={{
            display: 'inline-flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '10px',
            fontSize: '14px'
          }}>
            <span style={{ color: 'var(--lyra-color-status-warning-strong)', fontWeight: 600, fontSize: '14px' }}>{answer.split('·')[0]}</span>
            <span style={{ color: 'var(--lyra-color-status-warning-strong)', fontWeight: 600 }}>· {answer.split('·')[1]}</span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--lyra-color-bg-surface-base)',
              border: '1px solid var(--lyra-color-border-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '4px 10px',
              color: 'var(--lyra-color-fg-secondary)',
              fontSize: '12px',
              fontStyle: 'italic'
            }}>
              Speech · "I'd say three out of five"
            </span>
          </div>
        )}

        {answer && answerNegative && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
            <span style={{ color: 'var(--lyra-color-status-critical-strong)', fontWeight: 600, fontSize: '14px', lineHeight: 1.5 }}>{answer}</span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--lyra-color-bg-surface-base)',
              border: '1px solid var(--lyra-color-border-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '4px 10px',
              color: 'var(--lyra-color-fg-secondary)',
              fontSize: '12px'
            }}>
              Speech
            </span>
          </div>
        )}

        {answer && answerMixed && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
            <span style={{ color: 'var(--lyra-color-fg-default)', fontWeight: 600, fontSize: '14px', lineHeight: 1.5 }}>{answer}</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '3px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px',
                fontWeight: 600,
                background: 'var(--lyra-color-status-critical-subtle)',
                color: 'var(--lyra-color-status-critical-strong)'
              }}>Issue Clarity −34</span>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '3px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px',
                fontWeight: 600,
                background: 'var(--lyra-color-status-success-subtle)',
                color: 'var(--lyra-color-status-success-strong)'
              }}>Agent Resolution +68</span>
            </div>
          </div>
        )}

        {intentTag && intentWhy && (
          <div style={{
            display: 'inline-flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '8px',
            background: status === 'active' ? 'var(--lyra-color-bg-surface-base)' : 'var(--lyra-color-bg-surface-base)',
            border: status === 'active' ? '1px solid rgba(78,57,168,0.25)' : '1px solid var(--lyra-color-border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 14px',
            color: 'var(--lyra-color-fg-secondary)',
            fontSize: '12px'
          }}>
            <span style={{
              color: 'var(--lyra-color-fg-secondary)',
              fontWeight: 600,
              fontSize: '12px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}>Intent identified</span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--lyra-color-status-critical-subtle)',
              color: 'var(--lyra-color-status-critical-strong)',
              border: '1px solid rgba(189,42,42,0.35)',
              fontWeight: 600,
              fontSize: '12px',
              padding: '3px 8px',
              borderRadius: 'var(--radius-full)'
            }}>{intentTag}</span>
            <span>{intentWhy}</span>
          </div>
        )}
      </div>
    </div>
  )
}

function KeyValue({ k, v }: { k: string; v: string }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: '10px 16px',
      padding: '12px 0',
      borderTop: '1px solid var(--lyra-color-border-subtle)',
      alignItems: 'baseline'
    }}>
      <span style={{ color: 'var(--lyra-color-fg-secondary)', fontSize: '14px' }}>{k}</span>
      <span style={{ color: 'var(--lyra-color-fg-default)', fontSize: '14px', fontWeight: 600, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{v}</span>
    </div>
  )
}

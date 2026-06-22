'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED = [
  'Tell me about DermAI',
  "What's your strongest skill?",
  'Walk me through your internships',
  'What are you working on now?',
  'How did you learn ML?',
]

interface Props {
  onClose: () => void
  onSpeaking?: (v: boolean) => void
}

export function ChatInterface({ onClose, onSpeaking }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm AI Rayane 👋 I'm a digital twin of Rayane Toumi — ENSIA AI student, ML engineer, and builder of a dozen+ projects. Ask me anything about my work, skills, or story.",
    },
  ])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const historyRef = useRef<{ role: string; content: string }[]>([])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const send = useCallback(async (text: string) => {
    if (!text.trim() || streaming) return
    setInput('')
    setStreaming(true)
    onSpeaking?.(true)

    const userMsg: Message = { role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])

    const assistantMsg: Message = { role: 'assistant', content: '' }
    setMessages(prev => [...prev, assistantMsg])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historyRef.current.slice(-8),
        }),
      })

      if (!res.ok || !res.body) {
        setMessages(prev => {
          const msgs = [...prev]
          msgs[msgs.length - 1] = {
            role: 'assistant',
            content: res.status === 503
              ? "I'm temporarily unavailable — please try again in a moment 🚀"
              : res.status === 429
              ? "You're sending messages too fast! Give me a moment to breathe ✨"
              : "Something went wrong on my end. Try again in a moment!",
          }
          return msgs
        })
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let full = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        for (const line of chunk.split('\n')) {
          if (!line.startsWith('data: ')) continue
          const payload = line.slice(6).trim()
          if (payload === '[DONE]') break
          try {
            const { text: token } = JSON.parse(payload)
            full += token
            setMessages(prev => {
              const msgs = [...prev]
              msgs[msgs.length - 1] = { role: 'assistant', content: full }
              return msgs
            })
          } catch { /* skip malformed */ }
        }
      }

      historyRef.current = [
        ...historyRef.current,
        { role: 'user', content: text },
        { role: 'assistant', content: full },
      ]
    } catch {
      setMessages(prev => {
        const msgs = [...prev]
        msgs[msgs.length - 1] = {
          role: 'assistant',
          content: 'Connection issue — please try again in a moment.',
        }
        return msgs
      })
    } finally {
      setStreaming(false)
      onSpeaking?.(false)
    }
  }, [streaming, onSpeaking])

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 60, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed inset-0 md:inset-auto md:bottom-6 md:right-6 z-50 flex flex-col md:w-[420px] md:h-[580px]"
    >
      <div className="flex flex-col h-full rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255,79,162,0.25)',
          boxShadow: '0 32px 80px rgba(255,79,162,0.2), 0 0 0 1px rgba(255,79,162,0.1)',
        }}>

        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#FF4FA2]/10"
          style={{ background: 'linear-gradient(135deg, rgba(255,79,162,0.08), rgba(255,133,194,0.05))' }}>
          <div className="relative">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
              style={{ background: 'linear-gradient(135deg, #FF4FA2, #FF85C2)' }}>
              🤖
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
          </div>
          <div>
            <p className="font-semibold text-sm text-[#2D1B2E]">AI Rayane</p>
            <p className="text-xs text-[#FF4FA2] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
              {streaming ? 'thinking...' : 'online'}
            </p>
          </div>
          <button
            data-hover="true"
            onClick={onClose}
            className="ml-auto w-8 h-8 rounded-full flex items-center justify-center text-[#B76E79] hover:bg-[#FF4FA2]/10 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'rounded-br-sm text-white'
                    : 'rounded-bl-sm text-[#2D1B2E]'
                }`}
                style={msg.role === 'user'
                  ? {
                      background: 'linear-gradient(135deg, #FF4FA2, #FF85C2)',
                      boxShadow: '0 4px 16px rgba(255,79,162,0.3)',
                    }
                  : {
                      background: 'rgba(255,214,234,0.3)',
                      border: '1px solid rgba(255,79,162,0.15)',
                    }
                }
              >
                {msg.content}
                {msg.role === 'assistant' && streaming && i === messages.length - 1 && (
                  <span className="inline-block w-1 h-4 bg-[#FF4FA2] ml-1 animate-pulse rounded-sm" />
                )}
              </div>
            </motion.div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
            {SUGGESTED.map((s) => (
              <button
                key={s}
                data-hover="true"
                onClick={() => send(s)}
                className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-[#FF4FA2]/30 text-[#FF4FA2] hover:bg-[#FF4FA2]/10 transition-colors whitespace-nowrap"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-4 py-4 border-t border-[#FF4FA2]/10">
          <div className="flex gap-2 items-center">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send(input)}
              placeholder="Ask me anything..."
              disabled={streaming}
              className="flex-1 text-sm rounded-full px-4 py-2.5 outline-none disabled:opacity-60"
              style={{
                background: 'rgba(255,214,234,0.3)',
                border: '1.5px solid rgba(255,79,162,0.25)',
                color: '#2D1B2E',
              }}
            />
            <motion.button
              data-hover="true"
              onClick={() => send(input)}
              disabled={!input.trim() || streaming}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white disabled:opacity-40 flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #FF4FA2, #FF85C2)' }}
            >
              {streaming
                ? <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : '→'
              }
            </motion.button>
          </div>
          <p className="text-center text-[10px] text-[#B76E79]/60 mt-2">
            Answers from verified context only ·{' '}
            <a href="mailto:rayanerayane290905@gmail.com" className="underline">email Rayane</a>
          </p>
        </div>
      </div>
    </motion.div>
  )
}

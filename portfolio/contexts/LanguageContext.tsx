'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Lang, translations, T } from '@/lib/translations'

interface LanguageContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: T
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
  isRTL: false,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  const setLang = (l: Lang) => {
    setLangState(l)
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-lang', l)
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-lang') as Lang | null
    if (saved && ['en', 'fr', 'ar'].includes(saved)) setLangState(saved)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  const isRTL = lang === 'ar'
  const t = translations[lang] as T

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  return useContext(LanguageContext)
}

import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LANGUAGE_NAMES } from './Header'

export default function LanguageSwitcher({ languages }) {
  const { i18n, t } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentLang = i18n.language?.split('-')[0] || 'en'

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 hover:border-white/25 bg-white/5 hover:bg-white/10 transition-all text-sm font-medium"
        aria-label={t('language.switch', 'Switch language')}
        id="language-switcher-btn"
      >
        <svg className="w-4 h-4 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
        <span className="uppercase tracking-wider">{currentLang}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl glass-card p-1 shadow-2xl animate-fade-in z-50">
          {languages.map(lng => (
            <button
              key={lng}
              onClick={() => {
                i18n.changeLanguage(lng)
                setOpen(false)
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                currentLang === lng
                  ? 'bg-brand-500/20 text-brand-300 font-semibold'
                  : 'hover:bg-white/10 text-white/70 hover:text-white'
              }`}
              id={`lang-option-${lng}`}
            >
              <span>{LANGUAGE_NAMES[lng] || lng}</span>
              <span className="text-xs uppercase text-white/30">{lng}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

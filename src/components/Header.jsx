import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

const LANGUAGE_NAMES = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  ar: 'العربية',
  uk: 'Українська',
  tr: 'Türkçe',
  es: 'Español',
  ru: 'Русский',
  fa: 'فارسی',
  it: 'Italiano',
  pl: 'Polski',
  ro: 'Română',
  pt: 'Português',
  vi: 'Tiếng Việt',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
}

export { LANGUAGE_NAMES }

export default function Header({ languages }) {
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-forest-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-forest-400 to-forest-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-forest-900">
              {t('site.name', 'Stillhilfe')}
            </span>
          </div>

          {/* Language Switcher */}
          <LanguageSwitcher languages={languages} />
        </div>
      </div>
    </header>
  )
}

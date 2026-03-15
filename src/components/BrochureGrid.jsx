import { useTranslation } from 'react-i18next'
import BrochureCard from './BrochureCard'

export default function BrochureGrid({ brochures }) {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language?.split('-')[0] || 'en'

  // Group brochures by language
  const grouped = brochures.reduce((acc, b) => {
    const lang = b.language || 'other'
    if (!acc[lang]) acc[lang] = []
    acc[lang].push(b)
    return acc
  }, {})

  // Sort: current language first, then alphabetically
  const sortedLangs = Object.keys(grouped).sort((a, b) => {
    if (a === currentLang) return -1
    if (b === currentLang) return 1
    return a.localeCompare(b)
  })

  const hasBrochures = brochures.length > 0

  return (
    <section id="brochures" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">{t('brochures.title', 'Available Brochures')}</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            {t('brochures.subtitle', 'Select and download brochures in your preferred language. All materials are free and professionally created.')}
          </p>
        </div>

        {!hasBrochures ? (
          /* Empty state */
          <div className="glass-card p-12 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-warm-500/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-warm-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white/80 mb-2">
              {t('brochures.emptyTitle', 'Brochures Coming Soon')}
            </h3>
            <p className="text-sm text-white/40">
              {t('brochures.emptyText', 'We are preparing materials. Please check back soon!')}
            </p>
          </div>
        ) : (
          /* Brochure groups by language */
          <div className="space-y-12">
            {sortedLangs.map((lang, groupIdx) => (
              <div key={lang}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="language-badge">{lang}</span>
                  <div className="flex-1 h-px bg-white/5" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {grouped[lang].map((brochure, idx) => (
                    <BrochureCard
                      key={brochure.id || idx}
                      brochure={brochure}
                      index={idx}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

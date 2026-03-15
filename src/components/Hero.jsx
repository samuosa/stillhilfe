import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-400/20 bg-brand-500/10 text-brand-300 text-xs font-semibold tracking-wider uppercase mb-8 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
          {t('hero.tag', 'Free Resources')}
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-6 animate-slide-up">
          <span className="gradient-text">{t('hero.title', 'Breastfeeding Support')}</span>
          <br />
          <span className="text-white/90">{t('hero.titleLine2', 'In Your Language')}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 animate-slide-up stagger-2 leading-relaxed">
          {t('hero.subtitle', 'Download free brochures with expert guidance on breastfeeding and lactation — available in multiple languages to support every mother.')}
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up stagger-3">
          <a href="#brochures" className="btn-primary text-base">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {t('hero.cta', 'Browse Brochures')}
          </a>
          <a href="#about" className="btn-secondary text-base">
            {t('hero.ctaSecondary', 'Learn More')}
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-16 max-w-md mx-auto animate-slide-up stagger-4">
          <div>
            <div className="font-display text-2xl sm:text-3xl font-bold text-brand-400">
              {t('hero.statLanguages', '10+')}
            </div>
            <div className="text-xs text-white/40 mt-1">{t('hero.statLanguagesLabel', 'Languages')}</div>
          </div>
          <div>
            <div className="font-display text-2xl sm:text-3xl font-bold text-warm-400">
              {t('hero.statBrochures', '20+')}
            </div>
            <div className="text-xs text-white/40 mt-1">{t('hero.statBrochuresLabel', 'Brochures')}</div>
          </div>
          <div>
            <div className="font-display text-2xl sm:text-3xl font-bold text-sage-400">
              {t('hero.statFree', '100%')}
            </div>
            <div className="text-xs text-white/40 mt-1">{t('hero.statFreeLabel', 'Free')}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

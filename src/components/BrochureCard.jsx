import { useTranslation } from 'react-i18next'

export default function BrochureCard({ brochure, index }) {
  const { t } = useTranslation()

  return (
    <div
      className="glass-card p-6 flex flex-col gap-4 animate-slide-up opacity-0"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
    >
      {/* PDF icon and title */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500/20 to-brand-600/20 flex items-center justify-center border border-brand-500/10">
          <svg className="w-6 h-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white/90 truncate text-sm">
            {brochure.title || brochure.filename}
          </h3>
          {brochure.description && (
            <p className="text-xs text-white/40 mt-1 line-clamp-2">
              {brochure.description}
            </p>
          )}
        </div>
      </div>

      {/* Meta info */}
      <div className="flex items-center gap-2 text-xs text-white/30">
        <span className="language-badge">{brochure.language}</span>
        {brochure.size && <span>• {brochure.size}</span>}
      </div>

      {/* Download button */}
      <a
        href={brochure.pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary text-sm justify-center mt-auto"
        id={`download-${brochure.id || index}`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        {t('brochures.download', 'Download PDF')}
      </a>
    </div>
  )
}

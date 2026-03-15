import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <Suspense fallback={
    <div className="min-h-screen flex items-center justify-center bg-leaf-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-forest-400 border-t-transparent animate-spin" />
        <p className="text-forest-400 text-sm font-medium tracking-wide">Loading…</p>
      </div>
    </div>
  }>
    <App />
  </Suspense>
)

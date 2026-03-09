import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Import global styles (Tailwind CSS, fonts, utility classes)
import './index.css'

// Initialize internationalization (i18n) for language support (English/Farsi)
import './i18n'

// Import the main App page statically since it's the primary landing page
// The App component is already lightweight as it lazy-loads its below-the-fold sections
import App from './App.jsx';

// Import the PrivacyPolicy page lazily to reduce initial bundle cost (secondary route)
const PrivacyPolicy = lazy(() => import('./PrivacyPolicy.jsx'));

// Helper function to determine whether to load light or dark mode on initial startup.
// It first checks local storage for a saved preference.
// If not found, it checks the user's system preferences (macOS/Windows settings).
const getInitialTheme = () => {
  try {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
  } catch {
    // Ignore storage read failures and fallback to system preference.
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Apply the determined theme to the document so Tailwind's 'dark:' classes work.
const theme = getInitialTheme();
if (theme === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

// Render the application into the root element in index.html.
// BrowserRouter handles the routing (URLs matching completely different pages).
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen w-full bg-background-light dark:bg-background-dark" aria-hidden="true" />}>
        <Routes>
          {/* The main landing page */}
          <Route path="/" element={<App />} />
          {/* The privacy policy page */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)

// GA4 event tracking utility
// Usage: trackEvent('book_call_click', { location: 'hero' })

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

type EventParams = Record<string, string | number | boolean>

export function trackEvent(eventName: string, params?: EventParams) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      ...params,
    })
  }
}

// Pre-built conversion events for Kinetic
export const events = {
  bookCallClick: (location: string) =>
    trackEvent('book_call_click', { event_label: location, event_category: 'conversion' }),

  auditCTAClick: (location: string) =>
    trackEvent('audit_cta_click', { event_label: location, event_category: 'conversion' }),

  auditFormSubmit: () =>
    trackEvent('audit_form_submit', { event_category: 'conversion', value: 1 }),

  contactFormSubmit: () =>
    trackEvent('contact_form_submit', { event_category: 'conversion', value: 1 }),

  servicePageView: (serviceName: string) =>
    trackEvent('service_page_view', { event_label: serviceName }),

  exitIntentShown: () =>
    trackEvent('exit_intent_shown', { event_category: 'engagement' }),

  exitIntentConverted: () =>
    trackEvent('exit_intent_converted', { event_category: 'conversion' }),
}

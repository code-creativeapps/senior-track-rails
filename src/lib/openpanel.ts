import { OpenPanel } from '@openpanel/web';

// Client ID set at build time via PUBLIC_OPENPANEL_CLIENT_ID. The PUBLIC_
// prefix makes Astro expose the env var to client-side code.
const CLIENT_ID = import.meta.env.PUBLIC_OPENPANEL_CLIENT_ID;

let openPanel: OpenPanel | null = null;

function isLocalhost() {
  if (typeof window === 'undefined') return false;
  return (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.startsWith('192.168.')
  );
}

function createOpenPanel(): OpenPanel | null {
  if (openPanel) return openPanel;
  if (typeof window === 'undefined') return null;

  if (isLocalhost()) {
    console.log('[openpanel] disabled on localhost');
    return null;
  }
  if (!CLIENT_ID) {
    console.warn('[openpanel] missing PUBLIC_OPENPANEL_CLIENT_ID');
    return null;
  }

  openPanel = new OpenPanel({
    clientId:           CLIENT_ID,
    trackScreenViews:   false, // we fire screenView manually so Astro nav works correctly
    trackOutgoingLinks: true,  // captures clicks to railsfullstack.com + external refs
    trackAttributes:    false,
  });

  return openPanel;
}

// UTM + ref attribution: stash on first sight so every event in the session
// inherits the source. Fresh params override stored values.
const ATTRIBUTION_KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'gclid', 'fbclid', 'ref',
] as const;

function captureAttribution(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const stored = sessionStorage.getItem('rfs-learn-attribution');
  const fromStorage: Record<string, string> = stored ? JSON.parse(stored) : {};
  const params = new URLSearchParams(window.location.search);
  const fresh: Record<string, string> = {};
  for (const k of ATTRIBUTION_KEYS) {
    const v = params.get(k);
    if (v) fresh[k] = v;
  }
  const merged = Object.keys(fresh).length > 0 ? fresh : fromStorage;
  if (Object.keys(fresh).length > 0) {
    sessionStorage.setItem('rfs-learn-attribution', JSON.stringify(fresh));
  }
  return merged;
}

export function trackPageView(overrides: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  const op = createOpenPanel();
  if (!op) return;

  op.screenView({
    path:  window.location.pathname,
    query: window.location.search,
    title: document.title,
    ...captureAttribution(),
    ...overrides,
  });
}

export function trackEvent(name: string, properties: Record<string, unknown> = {}) {
  const op = createOpenPanel();
  if (!op) return;
  op.track(name, { ...captureAttribution(), ...properties });
}

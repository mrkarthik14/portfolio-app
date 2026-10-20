'use client';

import { useSyncExternalStore } from 'react';

const query = '(prefers-reduced-motion: reduce)';
function subscribe(listener: () => void) {
    const preference = window.matchMedia(query);
    preference.addEventListener('change', listener);
    return () => preference.removeEventListener('change', listener);
}
function snapshot() { return window.matchMedia(query).matches; }
function serverSnapshot() { return false; }

// Respond to preference changes without requiring a reload, including after SSR.
export function useMotionPreference() {
    return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}

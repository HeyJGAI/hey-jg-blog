// Trickle's hosted runtime used to inject a global `reportError` function that
// shipped errors to its own dashboard. That's gone now that we're off Trickle,
// so this is a drop-in replacement — every call site in the app already calls
// reportError(error) inside a catch block, this just keeps that working.
//
// If you later want real error tracking (Sentry, etc.), this is the one place
// to wire it up.
export function reportError(error) {
    console.error('[reportError]', error);
}

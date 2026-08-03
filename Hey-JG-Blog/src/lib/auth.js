// Real admin auth, backed by Supabase Auth, replacing the old utils/auth.js
// (which hardcoded a plaintext password directly in the client bundle, and used
// a localStorage flag that anyone could fake from devtools with zero password).
//
// There's only ever one admin account. To keep the original single-field
// "type your passcode" login screen intact, we sign in with a fixed admin
// email (set once, via VITE_ADMIN_EMAIL) + whatever password the person types.
// The password is the real secret; the email is just an account identifier.

import { supabase } from './supabaseClient';

export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || '';

export async function login(password) {
    if (!ADMIN_EMAIL) {
        return { success: false, error: 'VITE_ADMIN_EMAIL is not set — see SETUP.md' };
    }
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: ADMIN_EMAIL,
            password,
        });
        if (error) throw error;
        return { success: true, user: data.user };
    } catch (error) {
        return { success: false, error: error.message || 'Invalid passcode' };
    }
}

export async function logout() {
    await supabase.auth.signOut();
}

// Resolves once we know for sure whether there's a live session — callers
// should show a loading state until this resolves, rather than assuming
// "not logged in" the way the old synchronous localStorage check did.
export async function isAuthenticated() {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
}

// Keeps a page in sync if the session changes in another tab, or expires.
// Returns an unsubscribe function.
export function onAuthStateChange(callback) {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        callback(!!session);
    });
    return () => data.subscription.unsubscribe();
}

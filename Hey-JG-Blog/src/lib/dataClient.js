// Drop-in replacement for Trickle's injected globals: trickleGetObject,
// trickleCreateObject, trickleUpdateObject, trickleListObjects, trickleDeleteObject.
//
// Trickle's hosting layer used to provide these automatically. They don't exist
// anywhere outside Trickle, so every page/component that used them would silently
// fail once deployed elsewhere. This file implements the exact same function
// signatures and return shapes ({ objectData }, { items, nextPageToken }, ...)
// backed by real Supabase tables, so the rest of the app didn't need to change.

import { supabase } from './supabaseClient';

// Maps a Trickle "object type" string to its Supabase table, and (for the two
// singleton content types) the fixed row id Trickle used to use.
const TABLES = {
    post: { table: 'posts', singletonId: null },
    tag: { table: 'tags', singletonId: null },
    'about-tab': { table: 'about_tabs', singletonId: null },
    profile: { table: 'profile', singletonId: 'user-profile' },
    'site-settings': { table: 'site_settings', singletonId: 'hf-content' },
};

// Which column list ordering means for each type.
const ORDER_COLUMN = {
    post: 'created_at',
    tag: 'created_at',
    'about-tab': 'display_order',
    profile: 'created_at',
    'site-settings': 'created_at',
};

function getTableConfig(type) {
    const cfg = TABLES[type];
    if (!cfg) {
        throw new Error(`Unknown object type: "${type}"`);
    }
    return cfg;
}

function toSnakeCase(key) {
    return key.replace(/[A-Z]/g, (letter) => '_' + letter.toLowerCase());
}

function toCamelCase(key) {
    return key.replace(/_([a-z0-9])/g, (_, letter) => letter.toUpperCase());
}

// { id, created_at, title, youtube_url, ... } -> { objectId, objectData: { title, youtubeUrl, createdAt, ... } }
function rowToObject(row) {
    const { id, ...rest } = row;
    const objectData = {};
    for (const [key, value] of Object.entries(rest)) {
        objectData[toCamelCase(key)] = value;
    }
    return { objectId: id, objectData };
}

// { title, youtubeUrl, ... } -> { title, youtube_url, ... } (drops objectId/meta fields, DB fills those in)
function objectDataToRow(objectData) {
    const row = {};
    for (const [key, value] of Object.entries(objectData || {})) {
        if (key === 'objectId') continue;
        row[toSnakeCase(key)] = value;
    }
    return row;
}

export async function trickleGetObject(type, objectId) {
    const cfg = getTableConfig(type);
    const { data, error } = await supabase
        .from(cfg.table)
        .select('*')
        .eq('id', objectId)
        .maybeSingle();

    if (error) throw error;
    if (!data) throw new Error(`${type} "${objectId}" not found`);
    return rowToObject(data);
}

export async function trickleCreateObject(type, objectData) {
    const cfg = getTableConfig(type);
    const row = objectDataToRow(objectData);
    if (cfg.singletonId) {
        row.id = cfg.singletonId;
    }

    const { data, error } = await supabase
        .from(cfg.table)
        .insert(row)
        .select()
        .single();

    if (error) throw error;
    return rowToObject(data);
}

export async function trickleUpdateObject(type, objectId, objectData) {
    const cfg = getTableConfig(type);
    const row = objectDataToRow(objectData);

    const { data, error } = await supabase
        .from(cfg.table)
        .update(row)
        .eq('id', objectId)
        .select()
        .maybeSingle();

    if (error) throw error;
    if (!data) throw new Error(`${type} "${objectId}" not found`);
    return rowToObject(data);
}

export async function trickleDeleteObject(type, objectId) {
    const cfg = getTableConfig(type);
    const { error } = await supabase.from(cfg.table).delete().eq('id', objectId);
    if (error) throw error;
    return { success: true };
}

// pageToken is just a base64-encoded row offset — an implementation detail,
// callers only ever pass back the token they were handed.
export async function trickleListObjects(type, pageSize = 100, sortDesc = true, pageToken = null) {
    const cfg = getTableConfig(type);
    const orderColumn = ORDER_COLUMN[type] || 'created_at';
    const ascending = type === 'about-tab' ? true : !sortDesc;
    const offset = pageToken ? parseInt(atob(pageToken), 10) || 0 : 0;

    const { data, error, count } = await supabase
        .from(cfg.table)
        .select('*', { count: 'exact' })
        .order(orderColumn, { ascending })
        .order('created_at', { ascending: true })
        .range(offset, offset + pageSize - 1);

    if (error) throw error;

    const items = (data || []).map(rowToObject);
    const nextOffset = offset + items.length;
    const hasMore = typeof count === 'number' && nextOffset < count;

    return {
        items,
        nextPageToken: hasMore ? btoa(String(nextOffset)) : null,
    };
}

import React from 'react';
import { trickleCreateObject, trickleGetObject, trickleUpdateObject } from './dataClient';

const HF_CONTENT_KEY = 'site-settings';
const HF_CONTENT_ID = 'hf-content';

async function loadHFContent() {
    try {
        const response = await trickleGetObject(HF_CONTENT_KEY, HF_CONTENT_ID);
        if (response?.objectData) {
            return {
                success: true,
                data: response.objectData
            };
        }
        throw new Error('No content found');
    } catch (error) {
        console.error('Error loading HF content:', error);
        return {
            success: false,
            error: error.message,
            data: getDefaultHFContent()
        };
    }
}

function getDefaultHFContent() {
    return {
        siteHeading: 'HUMAIN',
        siteTitle: 'AI in the Loop, Empathy in the Lead',
        footerLogoUrl: 'https://jg-eis.com/logo_white.png',
        footerContent: "If you're human or HUMAIN (Human who wants to add AI in daily life for higher productivity), give me a call & say Hey J G. Will find a place to sit and explore AI together. I don't have all the answers, but I've got plenty of questions and a budget for our strong coffee.",
        linkedinUrl: 'https://www.linkedin.com/in/ananth-jg/',
        discordUrl: 'https://discord.com'
    };
}

async function saveHFContent(content) {
    try {
        const updatedContent = {
            ...content,
            updatedAt: new Date().toISOString()
        };

        let saveResult;
        try {
            saveResult = await trickleUpdateObject(HF_CONTENT_KEY, HF_CONTENT_ID, updatedContent);
            console.log('HF Content updated successfully:', saveResult);
        } catch (updateError) {
            console.log('Update failed, creating new HF content:', updateError);
            saveResult = await trickleCreateObject(HF_CONTENT_KEY, {
                ...updatedContent,
                objectId: HF_CONTENT_ID
            });
            console.log('HF Content created successfully:', saveResult);
        }

        // Dispatch event for real-time updates
        window.dispatchEvent(new CustomEvent('hfContentUpdated', {
            detail: updatedContent
        }));

        return {
            success: true,
            data: updatedContent
        };
    } catch (error) {
        console.error('Error saving HF content:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

function subscribeToHFUpdates(callback) {
    const handleUpdate = (event) => {
        callback(event.detail);
    };

    window.addEventListener('hfContentUpdated', handleUpdate);
    return () => {
        window.removeEventListener('hfContentUpdated', handleUpdate);
    };
}

export { loadHFContent, getDefaultHFContent, saveHFContent, subscribeToHFUpdates };

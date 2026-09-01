import React from 'react';
import { trickleCreateObject, trickleListObjects } from './dataClient';

async function fetchAvailableTags() {
    try {
        // First, get all posts to analyze used tags
        const response = await trickleListObjects('post', 1000, true);
        const posts = response.items || [];
        
        // Extract unique tags from posts
        const usedTags = new Set();
        posts.forEach(post => {
            if (post.objectData.tag) {
                usedTags.add(post.objectData.tag);
            }
        });

        // Get custom tags from the tag collection
        const tagResponse = await trickleListObjects('tag', 100, true);
        const customTags = (tagResponse.items || []).map(tag => tag.objectData.name);

        // Combine and deduplicate tags
        const allTags = [...usedTags, ...customTags];
        return [...new Set(allTags)];
    } catch (error) {
        console.error('Error fetching available tags:', error);
        return [];
    }
}

async function createTag(tagName) {
    try {
        const tagData = {
            name: tagName.trim(),
            createdAt: new Date().toISOString()
        };
        
        const response = await trickleCreateObject('tag', tagData);
        return {
            success: true,
            tag: response.objectData
        };
    } catch (error) {
        console.error('Error creating tag:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

export { fetchAvailableTags, createTag };

import React from 'react';

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
const MAX_URL_LENGTH = 2048;
const LINKEDIN_URL_PREFIX = 'https://www.linkedin.com/in/';
const DISCORD_URL_PREFIXES = ['https://discord.gg/', 'https://discord.com/'];

async function validateImageUrl(url) {
    try {
        // Basic URL validation
        if (!url) {
            throw new Error('Profile Picture URL cannot be empty');
        }

        if (url.length > MAX_URL_LENGTH) {
            throw new Error('URL exceeds maximum length');
        }

        // Check for valid image extension
        if (!IMAGE_EXTENSIONS.some(ext => url.toLowerCase().endsWith(ext))) {
            throw new Error('URL must end with a valid image extension (jpg, jpeg, png, gif, webp)');
        }

        // Validate URL structure
        try {
            new URL(url);
        } catch {
            throw new Error('Invalid URL format');
        }

        // Verify image accessibility and MIME type
        const response = await fetch(url, { method: 'HEAD' });
        if (!response.ok) {
            throw new Error('Unable to access the image. Please check the URL');
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.startsWith('image/')) {
            throw new Error('URL does not point to a valid image');
        }

        return { isValid: true };
    } catch (error) {
        return {
            isValid: false,
            error: {
                code: 'INVALID_IMAGE_URL',
                message: error.message || 'Invalid image URL',
                suggestion: 'Please provide a valid, publicly accessible image URL'
            }
        };
    }
}

function validateLinkedInUrl(url) {
    try {
        if (!url) {
            throw new Error('LinkedIn URL cannot be empty');
        }

        if (!url.startsWith(LINKEDIN_URL_PREFIX)) {
            throw new Error('LinkedIn URL must start with https://www.linkedin.com/in/');
        }

        // Validate URL structure
        new URL(url);

        return { isValid: true };
    } catch (error) {
        return {
            isValid: false,
            error: {
                code: 'INVALID_LINKEDIN_URL',
                message: error.message || 'Invalid LinkedIn URL',
                suggestion: 'Please provide a valid LinkedIn profile URL'
            }
        };
    }
}

function validateDiscordUrl(url) {
    try {
        if (!url) {
            return { isValid: true }; // Discord URL is optional
        }

        if (!DISCORD_URL_PREFIXES.some(prefix => url.startsWith(prefix))) {
            throw new Error('Invalid Discord URL format');
        }

        // Validate URL structure
        new URL(url);

        return { isValid: true };
    } catch (error) {
        return {
            isValid: false,
            error: {
                code: 'INVALID_DISCORD_URL',
                message: error.message || 'Invalid Discord URL',
                suggestion: 'Please provide a valid Discord invite URL'
            }
        };
    }
}

async function validateProfileData(profileData) {
    const errors = {};
    const validations = [
        await validateImageUrl(profileData.profilePicture),
        validateLinkedInUrl(profileData.linkedinUrl),
        validateDiscordUrl(profileData.discordUrl)
    ];

    validations.forEach(validation => {
        if (!validation.isValid) {
            errors[validation.error.code] = validation.error;
        }
    });

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

export { validateImageUrl, validateLinkedInUrl, validateDiscordUrl, validateProfileData };

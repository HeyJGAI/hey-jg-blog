import React from 'react';
import { trickleCreateObject, trickleGetObject, trickleUpdateObject } from './dataClient';

async function saveProfile(profileData) {
    try {
        console.log('Saving profile data:', profileData);
        const profile = {
            ...profileData,
            updatedAt: new Date().toISOString(),
            objectId: 'user-profile'
        };

        let savedProfile;
        try {
            savedProfile = await trickleUpdateObject('profile', 'user-profile', profile);
        } catch (updateError) {
            console.log('Update failed, creating new profile');
            savedProfile = await trickleCreateObject('profile', {
                ...profile,
                objectId: 'user-profile'
            });
        }

        console.log('Profile saved successfully:', savedProfile);

        // Dispatch profile update event
        const event = new CustomEvent('profileUpdated', {
            detail: savedProfile.objectData
        });
        window.dispatchEvent(event);

        return {
            success: true,
            profile: savedProfile.objectData
        };
    } catch (error) {
        console.error('Error saving profile:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

async function getProfile() {
    try {
        console.log('Fetching profile data');
        const response = await trickleGetObject('profile', 'user-profile');
        console.log('Profile data fetched:', response);
        return {
            success: true,
            profile: response.objectData
        };
    } catch (error) {
        console.error('Error getting profile:', error);
        return {
            success: false,
            error: error.message,
            profile: {
                name: 'Ananth J G',
                profilePicture: 'https://jg-eis.com/heyjg.png',
                bio: ''
            }
        };
    }
}

export { saveProfile, getProfile };

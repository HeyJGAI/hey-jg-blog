import React from 'react';
import { trickleCreateObject, trickleGetObject, trickleUpdateObject } from './dataClient';
import { logError, logGroup } from './logger';
import { validateProfileData } from './profileValidator';

async function saveProfileData(profileData) {
    logGroup('Save Profile Data', () => {
        console.log('Starting save operation');
        console.log('Profile Data:', profileData);
    });

    try {
        // Validate profile data
        const validationResult = await validateProfileData(profileData);
        logGroup('Validation Result', () => {
            console.log('Is Valid:', validationResult.isValid);
            console.log('Errors:', validationResult.errors);
        });

        if (!validationResult.isValid) {
            throw new Error('Profile validation failed', {
                cause: validationResult.errors
            });
        }

        // Prepare profile data with metadata
        const updatedProfile = {
            ...profileData,
            updatedAt: new Date().toISOString(),
            validationStatus: 'valid'
        };

        logGroup('Database Operation', () => {
            console.log('Attempting to save profile');
            console.log('Data to save:', updatedProfile);
        });

        // Save to database
        try {
            await trickleUpdateObject('profile', 'user-profile', updatedProfile);
            console.log('Profile updated successfully');
        } catch (updateError) {
            console.log('Update failed, attempting to create new profile');
            await trickleCreateObject('profile', updatedProfile);
            console.log('New profile created successfully');
        }

        // Trigger profile update event
        const event = new CustomEvent('profileUpdated', {
            detail: updatedProfile
        });
        window.dispatchEvent(event);
        console.log('Profile update event dispatched');

        return {
            status: 'success',
            message: 'Profile updated successfully',
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        logError('Profile Save', error, { profileData });
        
        let errorMessage = 'Failed to save profile';
        let errorDetails = {};

        if (error.cause) {
            errorMessage = 'Profile validation failed';
            errorDetails = error.cause;
        } else if (error.message) {
            errorMessage = error.message;
        }

        return {
            status: 'error',
            message: errorMessage,
            details: errorDetails
        };
    }
}

async function loadProfileData() {
    logGroup('Load Profile Data', () => {
        console.log('Starting load operation');
    });

    try {
        const response = await trickleGetObject('profile', 'user-profile');
        logGroup('Load Result', () => {
            console.log('Profile Data:', response.objectData);
        });

        return {
            status: 'success',
            data: response.objectData
        };
    } catch (error) {
        logError('Profile Load', error);
        return {
            status: 'error',
            message: 'Failed to load profile data',
            error: error.message
        };
    }
}

export { saveProfileData, loadProfileData };

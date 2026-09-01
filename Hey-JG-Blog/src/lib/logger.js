import React from 'react';

// Logger utility functions
function logGroup(groupName, callback) {
    if (process.env.NODE_ENV === 'development') {
        console.group(groupName);
        try {
            callback();
        } finally {
            console.groupEnd();
        }
    }
}

function logError(context, error, additionalData = {}) {
    console.error('Error Context:', context);
    console.error('Error:', error);
    if (Object.keys(additionalData).length > 0) {
        console.error('Additional Data:', additionalData);
    }
    console.error('Timestamp:', new Date().toISOString());
}

function logInfo(message, data = {}) {
    console.log(message);
    if (Object.keys(data).length > 0) {
        console.log('Data:', data);
    }
}

// Simple console logging for production
const logger = {
    group: (name, cb) => {
        try {
            cb();
        } catch (error) {
            console.error('Logger Error:', error);
        }
    },
    error: (context, error) => {
        console.error(`${context}:`, error);
    },
    info: (message) => {
        console.log(message);
    }
};

export { logGroup, logError, logInfo, logger };

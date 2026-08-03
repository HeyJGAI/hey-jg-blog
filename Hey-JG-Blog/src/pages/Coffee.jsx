import React from 'react';
import { reportError } from '../lib/errorReporter';

function Coffee() {
    try {
        return (
            <div className="min-h-screen bg-[#6F4E37] flex flex-col items-center justify-center" data-name="coffee-page">
                <h1 className="text-6xl md:text-8xl text-white font-bold text-center mb-8">
                    Only Filter Coffee please
                </h1>
                <p className="text-3xl text-white/80">
                    coming soon
                </p>
            </div>
        );
    } catch (error) {
        console.error('Coffee page error:', error);
        reportError(error);
        return null;
    }
}

export default Coffee;

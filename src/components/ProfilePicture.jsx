import React from 'react';
import { reportError } from '../lib/errorReporter';

function ProfilePicture({ src, name, size = 'md', className = '' }) {
    try {
        const [imageError, setImageError] = React.useState(false);
        const [loading, setLoading] = React.useState(true);

        const sizeClasses = {
            sm: 'w-6 h-6',
            md: 'w-10 h-10',
            lg: 'w-24 h-24'
        };

        const generateInitials = (name) => {
            return name
                .split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);
        };

        const handleImageError = () => {
            setImageError(true);
            setLoading(false);
        };

        const handleImageLoad = () => {
            setLoading(false);
        };

        if (imageError || !src) {
            return (
                <div 
                    className={`${sizeClasses[size]} rounded-full bg-gray-200 flex items-center justify-center ${className}`}
                    data-name="profile-picture-fallback"
                >
                    <span className="text-gray-500 font-medium">
                        {generateInitials(name)}
                    </span>
                </div>
            );
        }

        return (
            <div className={`relative ${sizeClasses[size]} ${className}`} data-name="profile-picture">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-full">
                        <div className="animate-spin rounded-full h-1/3 w-1/3 border-2 border-black"></div>
                    </div>
                )}
                <img
                    src={src}
                    alt={name}
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                    className={`w-full h-full rounded-full object-cover ${loading ? 'opacity-0' : 'opacity-100'}`}
                />
            </div>
        );
    } catch (error) {
        console.error('ProfilePicture component error:', error);
        reportError(error);
        return null;
    }
}

export default ProfilePicture;

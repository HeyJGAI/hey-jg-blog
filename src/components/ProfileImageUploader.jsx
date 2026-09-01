import React from 'react';
import ProfilePicture from './ProfilePicture';
import { reportError } from '../lib/errorReporter';

function ProfileImageUploader({ currentImage, onImageUpdate }) {
    try {
        const [imageUrl, setImageUrl] = React.useState(currentImage || '');
        const [error, setError] = React.useState('');
        const [loading, setLoading] = React.useState(false);
        const [showUrlInput, setShowUrlInput] = React.useState(true);

        const validateImageUrl = async (url) => {
            if (!url) return false;

            // Check URL format
            try {
                new URL(url);
            } catch {
                return false;
            }

            // Check file extension
            const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
            const lowercaseUrl = url.toLowerCase();
            const hasValidExtension = imageExtensions.some(ext => lowercaseUrl.endsWith(ext));
            const hasImagePath = lowercaseUrl.includes('/image/') || 
                               lowercaseUrl.includes('/img/') || 
                               lowercaseUrl.includes('images');

            return hasValidExtension || hasImagePath;
        };

        const handleUrlSubmit = async (e) => {
            e.preventDefault();
            setError('');
            setLoading(true);

            try {
                if (!imageUrl) {
                    throw new Error('Please enter an image URL');
                }

                const isValid = await validateImageUrl(imageUrl);
                if (!isValid) {
                    throw new Error('Please enter a valid image URL');
                }

                // Create an image element to test loading
                const img = new Image();
                img.src = imageUrl;

                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = () => reject(new Error('Failed to load image'));
                });

                await onImageUpdate(imageUrl);
            } catch (err) {
                setError(err.message);
                console.error('Image upload error:', err);
            } finally {
                setLoading(false);
            }
        };

        const handleUrlChange = (url) => {
            setImageUrl(url);
            setError('');
        };

        return (
            <div className="space-y-4" data-name="profile-image-uploader">
                <div className="flex items-center space-x-4">
                    <ProfilePicture 
                        src={imageUrl} 
                        name="Profile Picture" 
                        size="lg"
                    />
                    <div className="flex-grow">
                        <form onSubmit={handleUrlSubmit} className="space-y-2">
                            <div>
                                <label className="block text-sm font-medium mb-1">Image URL</label>
                                <input
                                    type="url"
                                    value={imageUrl}
                                    onChange={(e) => handleUrlChange(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                                    placeholder="Enter image URL"
                                />
                            </div>
                            {error && (
                                <p className="text-red-500 text-sm">{error}</p>
                            )}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                                >
                                    {loading ? (
                                        <span className="flex items-center">
                                            <i className="fas fa-circle-notch fa-spin mr-2"></i>
                                            Updating...
                                        </span>
                                    ) : (
                                        'Update Image'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ProfileImageUploader component error:', error);
        reportError(error);
        return null;
    }
}

export default ProfileImageUploader;

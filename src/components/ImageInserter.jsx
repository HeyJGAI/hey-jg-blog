import React from 'react';
import { reportError } from '../lib/errorReporter';

function ImageInserter({ onInsert, onClose }) {
    try {
        const [imageUrl, setImageUrl] = React.useState('');
        const [preview, setPreview] = React.useState('');
        const [error, setError] = React.useState('');
        const [isValidating, setIsValidating] = React.useState(false);

        const validateImageUrl = (url) => {
            if (!url) {
                return false;
            }

            // Check if URL is well-formed
            try {
                new URL(url);
            } catch {
                return false;
            }

            // Check common image extensions
            const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
            const lowercaseUrl = url.toLowerCase();
            return imageExtensions.some(ext => lowercaseUrl.endsWith(ext)) || 
                   lowercaseUrl.includes('/image/') ||
                   lowercaseUrl.includes('/img/') ||
                   lowercaseUrl.includes('images');
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');
            setIsValidating(true);

            if (!imageUrl) {
                setError('Please enter an image URL');
                setIsValidating(false);
                return;
            }

            try {
                if (!validateImageUrl(imageUrl)) {
                    setError('URL does not appear to be a valid image. Please check the URL format.');
                    setIsValidating(false);
                    return;
                }

                // If we have a preview and URL is valid, proceed with insertion
                if (preview) {
                    const imageMarkdown = `\n![Image](${imageUrl})\n`;
                    onInsert(imageMarkdown);
                    onClose();
                } else {
                    setError('Unable to validate image. Please check if the image loads correctly in the preview.');
                }
            } catch (err) {
                console.error('Image validation error:', err);
                setError('An error occurred while validating the image URL.');
            } finally {
                setIsValidating(false);
            }
        };

        const handleUrlChange = (url) => {
            setImageUrl(url);
            setError('');
            setPreview(url);
        };

        const handlePreviewLoad = () => {
            setError('');
        };

        const handlePreviewError = () => {
            setPreview('');
            setError('Failed to load image preview. Please check if the URL is accessible.');
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-name="image-inserter">
                <div className="bg-white rounded-lg p-6 max-w-xl w-full mx-4" data-name="image-form">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Insert Image</h3>
                        <button 
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Image URL</label>
                            <input
                                type="url"
                                value={imageUrl}
                                onChange={(e) => handleUrlChange(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                                placeholder="Enter image URL"
                            />
                            {error && (
                                <p className="text-red-500 text-sm mt-1">{error}</p>
                            )}
                        </div>

                        {imageUrl && (
                            <div className="relative" data-name="image-preview">
                                <img
                                    src={imageUrl}
                                    alt="Preview"
                                    className="max-h-48 object-contain mx-auto"
                                    onLoad={handlePreviewLoad}
                                    onError={handlePreviewError}
                                />
                            </div>
                        )}

                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isValidating || !imageUrl}
                                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                            >
                                {isValidating ? (
                                    <span className="flex items-center">
                                        <i className="fas fa-circle-notch fa-spin mr-2"></i>
                                        Validating...
                                    </span>
                                ) : (
                                    'Insert Image'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ImageInserter component error:', error);
        reportError(error);
        return null;
    }
}

export default ImageInserter;

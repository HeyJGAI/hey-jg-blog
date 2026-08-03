import React from 'react';
import { reportError } from '../lib/errorReporter';

function HyperlinkInserter({ selectedText, onInsert, onClose }) {
    try {
        const [url, setUrl] = React.useState('');
        const [text, setText] = React.useState(selectedText || '');
        const [error, setError] = React.useState('');
        const [isValidating, setIsValidating] = React.useState(false);

        const validateUrl = (url) => {
            if (!url) {
                return false;
            }

            try {
                new URL(url);
                return true;
            } catch {
                return false;
            }
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');
            setIsValidating(true);

            try {
                if (!text.trim()) {
                    throw new Error('Please enter link text');
                }

                if (!validateUrl(url)) {
                    throw new Error('Please enter a valid URL');
                }

                const markdownLink = `[${text}](${url})`;
                onInsert(markdownLink);
                onClose();
            } catch (err) {
                setError(err.message);
            } finally {
                setIsValidating(false);
            }
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-name="hyperlink-inserter">
                <div className="bg-white rounded-lg p-6 max-w-xl w-full mx-4" data-name="hyperlink-form">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Insert Link</h3>
                        <button 
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Link Text</label>
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                                placeholder="Enter link text"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">URL</label>
                            <input
                                type="url"
                                value={url}
                                onChange={(e) => {
                                    setUrl(e.target.value);
                                    setError('');
                                }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                                placeholder="https://example.com"
                            />
                            {error && (
                                <p className="text-red-500 text-sm mt-1">{error}</p>
                            )}
                        </div>

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
                                disabled={isValidating}
                                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                            >
                                {isValidating ? (
                                    <span className="flex items-center">
                                        <i className="fas fa-circle-notch fa-spin mr-2"></i>
                                        Validating...
                                    </span>
                                ) : (
                                    'Insert Link'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('HyperlinkInserter component error:', error);
        reportError(error);
        return null;
    }
}

export default HyperlinkInserter;

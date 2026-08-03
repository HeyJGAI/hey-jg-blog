import React from 'react';
import { TAGS } from '../lib/constants';
import { trickleCreateObject } from '../lib/dataClient';
import { reportError } from '../lib/errorReporter';

function TagManager({ onSave, selectedTag, customTags = [] }) {
    try {
        const [newTag, setNewTag] = React.useState('');
        const [isAdding, setIsAdding] = React.useState(false);
        const [tagError, setTagError] = React.useState('');

        const handleAddTag = async () => {
            try {
                setTagError('');
                if (!newTag.trim()) {
                    setTagError('Tag name cannot be empty');
                    return;
                }

                setIsAdding(true);
                const tagData = {
                    name: newTag.trim(),
                    createdAt: new Date().toISOString()
                };

                await trickleCreateObject('tag', tagData);
                setNewTag('');
                onSave && onSave();
            } catch (err) {
                console.error('Error adding tag:', err);
                setTagError('Failed to add tag');
            } finally {
                setIsAdding(false);
            }
        };

        const allTags = [...Object.values(TAGS), ...customTags];

        return (
            <div className="space-y-4" data-name="tag-manager">
                {/* Tag Selection */}
                <div className="w-full" data-name="tag-selection">
                    <select
                        value={selectedTag}
                        onChange={(e) => onSave(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                        required
                    >
                        <option value="">Select tag *</option>
                        {allTags.map((tag) => (
                            <option key={tag} value={tag}>{tag}</option>
                        ))}
                    </select>
                </div>
                
                {/* Add New Tag */}
                <div className="w-full" data-name="add-tag">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={newTag}
                            onChange={(e) => {
                                setNewTag(e.target.value);
                                setTagError('');
                            }}
                            placeholder="Add new tag"
                            className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                        />
                        <button
                            onClick={handleAddTag}
                            disabled={isAdding || !newTag.trim()}
                            className="px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 min-w-[48px]"
                            title="Add new tag"
                        >
                            {isAdding ? (
                                <i className="fas fa-circle-notch fa-spin"></i>
                            ) : (
                                <i className="fas fa-plus"></i>
                            )}
                        </button>
                    </div>
                    {tagError && (
                        <p className="text-red-500 text-sm mt-1">{tagError}</p>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('TagManager component error:', error);
        reportError(error);
        return null;
    }
}

export default TagManager;

import React from 'react';
import HyperlinkInserter from './HyperlinkInserter';
import ImageInserter from './ImageInserter';
import TagManager from './TagManager';
import TextFormatToolbar from './TextFormatToolbar';
import { trickleCreateObject, trickleDeleteObject, trickleUpdateObject } from '../lib/dataClient';
import { reportError } from '../lib/errorReporter';
import { fetchAvailableTags } from '../lib/tagManager';

function PostEditor({ post, onSave }) {
    try {
        const [title, setTitle] = React.useState(post?.objectData?.title || '');
        const [content, setContent] = React.useState(post?.objectData?.content || '');
        const [excerpt, setExcerpt] = React.useState(post?.objectData?.excerpt || '');
        const [tag, setTag] = React.useState(post?.objectData?.tag || '');
        const [imageUrl, setImageUrl] = React.useState(post?.objectData?.image || '');
        const [youtubeUrl, setYoutubeUrl] = React.useState(post?.objectData?.youtubeUrl || '');
        const [customTags, setCustomTags] = React.useState([]);
        const [saving, setSaving] = React.useState(false);
        const [showDeleteModal, setShowDeleteModal] = React.useState(false);
        const [postError, setPostError] = React.useState('');
        const [showImageInserter, setShowImageInserter] = React.useState(false);
        const [showHyperlinkInserter, setShowHyperlinkInserter] = React.useState(false);
        const contentRef = React.useRef(null);

        React.useEffect(() => {
            loadCustomTags();
        }, []);

        const loadCustomTags = async () => {
            try {
                const tags = await fetchAvailableTags();
                setCustomTags(tags);
            } catch (err) {
                console.error('Error loading custom tags:', err);
                setPostError('Failed to load tags');
            }
        };

        const handleInputChange = (field, value) => {
            setPostError('');
            switch (field) {
                case 'title':
                    setTitle(value);
                    break;
                case 'content':
                    setContent(value);
                    break;
                case 'excerpt':
                    setExcerpt(value);
                    break;
                case 'tag':
                    setTag(value);
                    break;
                case 'imageUrl':
                    setImageUrl(value);
                    break;
                case 'youtubeUrl':
                    setYoutubeUrl(value);
                    break;
                default:
                    break;
            }
        };

        const handleFormat = (format) => {
            if (!contentRef.current) return;

            const textarea = contentRef.current;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const selectedText = content.substring(start, end);
            const beforeText = content.substring(0, start);
            const afterText = content.substring(end);

            let newText = '';
            if (format === '## ') {
                // For headings, add at start of line
                const lastNewLine = beforeText.lastIndexOf('\n');
                const lineStart = lastNewLine === -1 ? 0 : lastNewLine + 1;
                newText = content.substring(0, lineStart) + format + content.substring(lineStart);
            } else if (format === '\n\n\n\n') {
                // For code blocks
                newText = beforeText + format + afterText;
                setContent(newText);
                textarea.selectionStart = start + 4;
                textarea.selectionEnd = start + 4;
                return;
            } else if (format === '**') {
                // For bold text
                newText = beforeText + format + selectedText + format + afterText;
            } else {
                newText = beforeText + format + selectedText + afterText;
            }

            setContent(newText);
            textarea.focus();
        };

        const handleImageInsert = (markdown) => {
            if (!contentRef.current) return;
            
            const textarea = contentRef.current;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const beforeText = content.substring(0, start);
            const afterText = content.substring(end);
            
            const newText = beforeText + markdown + afterText;
            setContent(newText);
            setShowImageInserter(false);
            
            // Place cursor after inserted markdown
            setTimeout(() => {
                textarea.focus();
                const newPosition = start + markdown.length;
                textarea.selectionStart = newPosition;
                textarea.selectionEnd = newPosition;
            }, 0);
        };

        const handleHyperlinkInsert = (markdown) => {
            if (!contentRef.current) return;
            
            const textarea = contentRef.current;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const beforeText = content.substring(0, start);
            const afterText = content.substring(end);
            
            const newText = beforeText + markdown + afterText;
            setContent(newText);
            setShowHyperlinkInserter(false);
            
            setTimeout(() => {
                textarea.focus();
                const newPosition = start + markdown.length;
                textarea.selectionStart = newPosition;
                textarea.selectionEnd = newPosition;
            }, 0);
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setSaving(true);
            setPostError('');

            try {
                if (!title.trim()) {
                    throw new Error('Title is required');
                }

                if (!content.trim()) {
                    throw new Error('Content is required');
                }

                if (!excerpt.trim()) {
                    throw new Error('Excerpt is required');
                }

                if (!tag) {
                    throw new Error('Please select a tag');
                }

                const postData = {
                    title: title.trim(),
                    content: content.trim(),
                    excerpt: excerpt.trim(),
                    tag,
                    image: imageUrl.trim(),
                    youtubeUrl: youtubeUrl.trim(),
                    updatedAt: new Date().toISOString()
                };

                if (post) {
                    await trickleUpdateObject('post', post.objectId, postData);
                } else {
                    await trickleCreateObject('post', postData);
                }

                onSave && onSave();
            } catch (err) {
                console.error('Error saving post:', err);
                setPostError(err.message || 'Failed to save post');
                setSaving(false);
            }
        };

        const handleDelete = async () => {
            try {
                if (!post?.objectId) {
                    throw new Error('Post ID not found');
                }

                await trickleDeleteObject('post', post.objectId);
                onSave && onSave();
            } catch (err) {
                console.error('Error deleting post:', err);
                setPostError('Failed to delete post');
            }
        };

        return (
            <div className="w-full max-w-3xl mx-auto" data-name="post-editor">
                {postError && (
                    <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg" data-name="error-message">
                        {postError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4" data-name="post-fields">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Title *</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                                required
                            />
                        </div>

                        {/* Content with Formatting Options */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Content *</label>
                            <TextFormatToolbar 
                                onFormat={handleFormat}
                                onImageClick={() => setShowImageInserter(true)}
                                onHyperlinkClick={() => setShowHyperlinkInserter(true)}
                            />
                            <textarea
                                ref={contentRef}
                                value={content}
                                onChange={(e) => handleInputChange('content', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none mt-2"
                                rows="10"
                                required
                            />
                        </div>

                        {/* Excerpt */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Excerpt *</label>
                            <textarea
                                value={excerpt}
                                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                                rows="3"
                                required
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Image URL</label>
                            <input
                                type="url"
                                value={imageUrl}
                                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                            />
                        </div>

                        {/* YouTube URL */}
                        <div>
                            <label className="block text-sm font-medium mb-1">YouTube URL</label>
                            <input
                                type="url"
                                value={youtubeUrl}
                                onChange={(e) => handleInputChange('youtubeUrl', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Tags & Submit Button */}
                    <div className="space-y-4 sm:space-y-6" data-name="form-actions">
                        <div className="w-full">
                            <TagManager
                                selectedTag={tag}
                                onSave={(newTag) => handleInputChange('tag', newTag)}
                                customTags={customTags}
                            />
                        </div>
                        <div className="w-full">
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                            >
                                {saving ? (
                                    <span className="flex items-center justify-center">
                                        <i className="fas fa-circle-notch fa-spin mr-2"></i>
                                        Saving...
                                    </span>
                                ) : (
                                    post ? 'Update Post' : 'Create Post'
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Delete Post Option */}
                    {post && (
                        <div className="pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => setShowDeleteModal(true)}
                                className="text-red-600 hover:text-red-700"
                            >
                                Delete Post
                            </button>
                        </div>
                    )}
                </form>

                {/* Image Inserter Modal */}
                {showImageInserter && (
                    <ImageInserter
                        onInsert={handleImageInsert}
                        onClose={() => setShowImageInserter(false)}
                    />
                )}

                {/* Hyperlink Inserter Modal */}
                {showHyperlinkInserter && (
                    <HyperlinkInserter
                        selectedText={content.substring(
                            contentRef.current?.selectionStart || 0,
                            contentRef.current?.selectionEnd || 0
                        )}
                        onInsert={handleHyperlinkInsert}
                        onClose={() => setShowHyperlinkInserter(false)}
                    />
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-name="delete-modal">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                            <h3 className="text-lg font-semibold mb-4">Delete Post</h3>
                            <p className="text-gray-600 mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('PostEditor component error:', error);
        reportError(error);
        return null;
    }
}

export default PostEditor;

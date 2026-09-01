import React from 'react';
import AdminHeader from '../components/AdminHeader';
import HyperlinkInserter from '../components/HyperlinkInserter';
import { trickleCreateObject, trickleListObjects, trickleUpdateObject } from '../lib/dataClient';
import { reportError } from '../lib/errorReporter';

function AdminAbout() {
    try {
        const [tabs, setTabs] = React.useState([]);
        const [activeTab, setActiveTab] = React.useState(0);
        const [loading, setLoading] = React.useState(true);
        const [saving, setSaving] = React.useState(false);
        const [message, setMessage] = React.useState({ type: '', text: '' });
        const [showHyperlinkInserter, setShowHyperlinkInserter] = React.useState(false);
        const [activeEditor, setActiveEditor] = React.useState('content');
        const contentRef = React.useRef(null);
        const infoRef = React.useRef(null);

        React.useEffect(() => {
            fetchAboutContent();
        }, []);

        const fetchAboutContent = async () => {
            try {
                const response = await trickleListObjects('about-tab', 100, false);
                if (response.items && response.items.length > 0) {
                    setTabs(response.items.slice(0, 6));
                } else {
                    const defaultTabs = [
                        { objectData: { title: 'Story', content: 'My story begins...', info: 'More about my story...' } },
                        { objectData: { title: 'Mission', content: 'My mission is...', info: 'More about my mission...' } },
                        { objectData: { title: 'Values', content: 'I believe in...', info: 'More about my values...' } },
                        { objectData: { title: 'Vision', content: 'I envision...', info: 'More about my vision...' } },
                        { objectData: { title: 'Skills', content: 'My expertise includes...', info: 'More about my skills...' } },
                        { objectData: { title: 'Goals', content: 'My goals are...', info: 'More about my goals...' } }
                    ];
                    setTabs(defaultTabs);
                }
            } catch (err) {
                console.error('Error fetching about content:', err);
                setMessage({
                    type: 'error',
                    text: 'Failed to load content'
                });
            } finally {
                setLoading(false);
            }
        };

        const handleSave = async () => {
            setSaving(true);
            setMessage({ type: '', text: '' });

            try {
                for (let i = 0; i < tabs.length; i++) {
                    const tab = tabs[i];
                    if (tab.objectId) {
                        await trickleUpdateObject('about-tab', tab.objectId, tab.objectData);
                    } else {
                        await trickleCreateObject('about-tab', tab.objectData);
                    }
                }

                setMessage({
                    type: 'success',
                    text: 'Content saved successfully'
                });

                setTimeout(() => {
                    setMessage({ type: '', text: '' });
                }, 3000);
            } catch (err) {
                console.error('Error saving about content:', err);
                setMessage({
                    type: 'error',
                    text: 'Failed to save content'
                });
            } finally {
                setSaving(false);
            }
        };

        const updateTabContent = (index, field, value) => {
            const newTabs = [...tabs];
            newTabs[index] = {
                ...newTabs[index],
                objectData: {
                    ...newTabs[index].objectData,
                    [field]: value
                }
            };
            setTabs(newTabs);
        };

        const handleHyperlinkInsert = (markdown) => {
            const ref = activeEditor === 'content' ? contentRef : infoRef;
            if (!ref.current) return;
            
            const textarea = ref.current;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const content = tabs[activeTab]?.objectData[activeEditor] || '';
            const beforeText = content.substring(0, start);
            const afterText = content.substring(end);
            
            const newText = beforeText + markdown + afterText;
            updateTabContent(activeTab, activeEditor, newText);
            setShowHyperlinkInserter(false);
            
            setTimeout(() => {
                textarea.focus();
                const newPosition = start + markdown.length;
                textarea.selectionStart = newPosition;
                textarea.selectionEnd = newPosition;
            }, 0);
        };

        if (loading) {
            return (
                <div className="min-h-screen bg-white flex items-center justify-center" data-name="admin-about-loading">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
                </div>
            );
        }

        return (
            <div className="min-h-screen bg-white" data-name="admin-about-page">
                <AdminHeader activeSection="about" />
                
                <div className="max-w-7xl mx-auto px-4 pt-24 pb-32">
                    <div className="mb-12">
                        <h1 className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6vw] font-bold tracking-tight leading-none">
                            ABOUT
                        </h1>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Tab Navigation */}
                        <div className="md:w-1/4" data-name="tab-navigation">
                            <div className="space-y-2">
                                {tabs.map((tab, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveTab(index)}
                                        className={`w-full text-left px-6 py-4 rounded-lg transition-colors ${
                                            activeTab === index
                                                ? 'bg-black text-white'
                                                : 'text-gray-600 hover:text-black'
                                        }`}
                                        data-name={`tab-${index}`}
                                    >
                                        {tab.objectData.title || `Tab ${index + 1}`}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content Editor */}
                        <div className="md:w-3/4" data-name="tab-content-editor">
                            <div className="bg-gray-50 rounded-lg p-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Tab Title</label>
                                        <input
                                            type="text"
                                            value={tabs[activeTab]?.objectData.title || ''}
                                            onChange={(e) => updateTabContent(activeTab, 'title', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                                            placeholder="Enter tab title"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <label className="block text-sm font-medium">Main Content</label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setActiveEditor('content');
                                                    setShowHyperlinkInserter(true);
                                                }}
                                                className="text-sm text-gray-600 hover:text-black flex items-center gap-1"
                                            >
                                                <i className="fas fa-link"></i>
                                                Add Link
                                            </button>
                                        </div>
                                        <textarea
                                            ref={contentRef}
                                            value={tabs[activeTab]?.objectData.content || ''}
                                            onChange={(e) => updateTabContent(activeTab, 'content', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                                            rows="10"
                                            placeholder="Enter main content (Markdown supported)"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <label className="block text-sm font-medium">Info Section</label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setActiveEditor('info');
                                                    setShowHyperlinkInserter(true);
                                                }}
                                                className="text-sm text-gray-600 hover:text-black flex items-center gap-1"
                                            >
                                                <i className="fas fa-link"></i>
                                                Add Link
                                            </button>
                                        </div>
                                        <textarea
                                            ref={infoRef}
                                            value={tabs[activeTab]?.objectData.info || ''}
                                            onChange={(e) => updateTabContent(activeTab, 'info', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                                            rows="4"
                                            placeholder="Enter info section content (Markdown supported)"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        {message.text && (
                                            <div 
                                                className={`p-4 rounded-lg ${
                                                    message.type === 'error' 
                                                        ? 'bg-red-100 text-red-700' 
                                                        : 'bg-green-100 text-green-700'
                                                }`}
                                                data-name="message"
                                            >
                                                {message.text}
                                            </div>
                                        )}

                                        <div className="flex justify-end">
                                            <button
                                                onClick={handleSave}
                                                disabled={saving}
                                                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                                                data-name="save-button"
                                            >
                                                {saving ? (
                                                    <span className="flex items-center">
                                                        <i className="fas fa-circle-notch fa-spin mr-2"></i>
                                                        Saving...
                                                    </span>
                                                ) : (
                                                    'Save Changes'
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hyperlink Inserter Modal */}
                {showHyperlinkInserter && (
                    <HyperlinkInserter
                        selectedText={(activeEditor === 'content' ? contentRef : infoRef).current?.value.substring(
                            (activeEditor === 'content' ? contentRef : infoRef).current.selectionStart,
                            (activeEditor === 'content' ? contentRef : infoRef).current.selectionEnd
                        ) || ''}
                        onInsert={handleHyperlinkInsert}
                        onClose={() => setShowHyperlinkInserter(false)}
                    />
                )}
            </div>
        );
    } catch (error) {
        console.error('AdminAbout page error:', error);
        reportError(error);
        return null;
    }
}

export default AdminAbout;

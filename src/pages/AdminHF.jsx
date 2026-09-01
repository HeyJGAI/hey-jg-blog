import React from 'react';
import AdminHeader from '../components/AdminHeader';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { trickleCreateObject, trickleGetObject, trickleUpdateObject } from '../lib/dataClient';
import { reportError } from '../lib/errorReporter';

function AdminHF() {
    try {
        const [loading, setLoading] = React.useState(true);
        const [saving, setSaving] = React.useState(false);
        const [message, setMessage] = React.useState({ type: '', text: '' });
        const [activeTab, setActiveTab] = React.useState(0);
        const [formData, setFormData] = React.useState({
            siteHeading: 'HUMAIN',
            siteTitle: 'AI in the Loop, Empathy in the Lead',
            footerLogoUrl: 'https://jg-eis.com/logo_white.png',
            footerContent: "If you're human or HUMAIN (Human who wants to add AI in daily life for higher productivity), give me a call & say Hey J G. Will find a place to sit and explore AI together. I don't have all the answers, but I've got plenty of questions and a budget for our strong coffee.",
            linkedinUrl: 'https://www.linkedin.com/in/ananth-jg/',
            discordUrl: 'https://discord.com'
        });

        const tabs = [
            {
                id: 'header',
                label: 'Header',
                fields: [
                    { name: 'siteHeading', label: 'Site Heading', type: 'text', required: true },
                    { name: 'siteTitle', label: 'Site Title', type: 'textarea', rows: 3, required: true }
                ]
            },
            {
                id: 'footer',
                label: 'Footer',
                fields: [
                    { name: 'footerLogoUrl', label: 'Footer Logo URL', type: 'url', required: true },
                    { name: 'footerContent', label: 'Footer Content', type: 'textarea', rows: 6, required: true }
                ]
            },
            {
                id: 'social',
                label: 'Social Links',
                fields: [
                    { name: 'linkedinUrl', label: 'LinkedIn URL', type: 'url', required: true },
                    { name: 'discordUrl', label: 'Discord URL', type: 'url', required: true }
                ]
            }
        ];

        React.useEffect(() => {
            loadHFContent();
        }, []);

        const loadHFContent = async () => {
            try {
                const response = await trickleGetObject('site-settings', 'hf-content');
                if (response?.objectData) {
                    setFormData(response.objectData);
                }
            } catch (err) {
                console.error('Error loading HF content:', err);
                // Don't show error for initial load if content doesn't exist yet
                console.log('HF content not found, using default values');
            } finally {
                setLoading(false);
            }
        };

        const handleInputChange = (field, value) => {
            setFormData(prev => ({
                ...prev,
                [field]: value
            }));
            setMessage({ type: '', text: '' });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setSaving(true);
            setMessage({ type: '', text: '' });

            try {
                const updatedContent = {
                    ...formData,
                    updatedAt: new Date().toISOString()
                };

                // First try to update
                let saveResult;
                try {
                    saveResult = await trickleUpdateObject('site-settings', 'hf-content', updatedContent);
                    console.log('Update successful:', saveResult);
                } catch (updateError) {
                    // If update fails, try to create
                    console.log('Update failed, creating new:', updateError);
                    try {
                        saveResult = await trickleCreateObject('site-settings', {
                            ...updatedContent,
                            objectId: 'hf-content'
                        });
                        console.log('Create successful:', saveResult);
                    } catch (createError) {
                        console.error('Create failed:', createError);
                        throw createError;
                    }
                }
                
                // Dispatch event for real-time updates
                console.log('Dispatching HF content update event:', updatedContent);
                window.dispatchEvent(new CustomEvent('hfContentUpdated', {
                    detail: updatedContent
                }));

                setMessage({
                    type: 'success',
                    text: 'Content saved successfully'
                });

                // Clear message after 3 seconds
                setTimeout(() => {
                    setMessage({ type: '', text: '' });
                }, 3000);
            } catch (err) {
                console.error('Error saving HF content:', err);
                setMessage({
                    type: 'error',
                    text: 'Failed to save content'
                });
            } finally {
                setSaving(false);
            }
        };

        if (loading) {
            return (
                <div className="min-h-screen bg-white flex items-center justify-center" data-name="admin-hf-loading">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
                </div>
            );
        }

        return (
            <div className="min-h-screen bg-white" data-name="admin-hf-page">
                <AdminHeader activeSection="hf" />
                
                <div className="max-w-7xl mx-auto px-4 pt-24 pb-32">
                    <div className="mb-12">
                        <h1 className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6vw] font-bold tracking-tight leading-none">
                            HEADER & FOOTER
                        </h1>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Tab Navigation */}
                        <div className="md:w-1/4" data-name="tab-navigation">
                            <div className="space-y-2">
                                {tabs.map((tab, index) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(index)}
                                        className={`w-full text-left px-6 py-4 rounded-lg transition-colors ${
                                            activeTab === index
                                                ? 'bg-black text-white'
                                                : 'text-gray-600 hover:text-black'
                                        }`}
                                        data-name={`tab-${tab.id}`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="md:w-3/4" data-name="tab-content">
                            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-8">
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold mb-4">{tabs[activeTab].label} Section</h2>
                                        <div className="space-y-4">
                                            {tabs[activeTab].fields.map(field => (
                                                <div key={field.name}>
                                                    <label className="block text-sm font-medium mb-1">
                                                        {field.label}
                                                        {field.required && ' *'}
                                                    </label>
                                                    {field.type === 'textarea' ? (
                                                        <textarea
                                                            value={formData[field.name]}
                                                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                                                            rows={field.rows}
                                                            placeholder={`Enter ${field.label.toLowerCase()}`}
                                                            required={field.required}
                                                        />
                                                    ) : (
                                                        <input
                                                            type={field.type}
                                                            value={formData[field.name]}
                                                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                                                            placeholder={`Enter ${field.label.toLowerCase()}`}
                                                            required={field.required}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Message and Save Button */}
                                    <div className="pt-4">
                                        {message.text && (
                                            <div 
                                                className={`p-4 rounded-lg mb-4 ${
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
                                                type="submit"
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('AdminHF page error:', error);
        reportError(error);
        return null;
    }
}

export default AdminHF;

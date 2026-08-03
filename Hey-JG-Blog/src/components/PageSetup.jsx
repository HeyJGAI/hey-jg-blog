import React from 'react';
import ProfileImageUploader from './ProfileImageUploader';
import { reportError } from '../lib/errorReporter';
import { getProfile, saveProfile } from '../lib/profile';

function PageSetup() {
    try {
        const [profile, setProfile] = React.useState({
            profilePicture: 'https://i.pinimg.com/736x/e8/e6/41/e8e64141f4c0ae39c32f9701ccea9a2e.jpg',
            name: 'Ananth J G',
            bio: ''
        });
        const [saving, setSaving] = React.useState(false);
        const [message, setMessage] = React.useState({ type: '', text: '' });

        React.useEffect(() => {
            loadProfile();
        }, []);

        const loadProfile = async () => {
            try {
                const { success, profile: loadedProfile } = await getProfile();
                if (success && loadedProfile) {
                    setProfile(loadedProfile);
                }
            } catch (err) {
                console.error('Error loading profile:', err);
                setMessage({
                    type: 'error',
                    text: 'Failed to load profile data'
                });
            }
        };

        const handleImageUpdate = async (imageUrl) => {
            try {
                const updatedProfile = {
                    ...profile,
                    profilePicture: imageUrl
                };

                const result = await saveProfile(updatedProfile);
                
                if (result.success) {
                    setProfile(updatedProfile);
                    setMessage({
                        type: 'success',
                        text: 'Profile picture updated successfully'
                    });
                    
                    // Clear message after 3 seconds
                    setTimeout(() => {
                        setMessage({ type: '', text: '' });
                    }, 3000);
                } else {
                    throw new Error(result.error || 'Failed to update profile picture');
                }
            } catch (err) {
                console.error('Error updating profile picture:', err);
                setMessage({
                    type: 'error',
                    text: err.message
                });
            }
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setSaving(true);
            setMessage({ type: '', text: '' });

            try {
                const result = await saveProfile(profile);
                
                if (result.success) {
                    setMessage({
                        type: 'success',
                        text: 'Profile updated successfully'
                    });
                    
                    // Clear message after 3 seconds
                    setTimeout(() => {
                        setMessage({ type: '', text: '' });
                    }, 3000);
                } else {
                    throw new Error(result.error || 'Failed to update profile');
                }
            } catch (err) {
                console.error('Error saving profile:', err);
                setMessage({
                    type: 'error',
                    text: err.message
                });
            } finally {
                setSaving(false);
            }
        };

        return (
            <div className="max-w-2xl mx-auto" data-name="page-setup">
                <div className="space-y-8">
                    <ProfileImageUploader
                        currentImage={profile.profilePicture}
                        onImageUpdate={handleImageUpdate}
                    />

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">Display Name</label>
                            <input
                                type="text"
                                value={profile.name || ''}
                                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Bio</label>
                            <textarea
                                value={profile.bio || ''}
                                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                                rows="3"
                                placeholder="Write a short bio (optional)"
                            />
                        </div>

                        {message.text && (
                            <div 
                                className={`p-4 rounded-lg ${
                                    message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
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
                                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('PageSetup component error:', error);
        reportError(error);
        return null;
    }
}

export default PageSetup;

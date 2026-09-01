import React from 'react';
import ProfileImageUploader from './ProfileImageUploader';
import { reportError } from '../lib/errorReporter';
import { saveProfile } from '../lib/profile';

function ProfileEditor({ onClose, initialProfile }) {
    try {
        const [profile, setProfile] = React.useState({
            name: initialProfile.name || '',
            profilePicture: initialProfile.profilePicture || '',
            bio: initialProfile.bio || ''
        });
        const [saving, setSaving] = React.useState(false);
        const [message, setMessage] = React.useState({ type: '', text: '' });

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
                    
                    setTimeout(() => {
                        setMessage({ type: '', text: '' });
                        onClose();
                    }, 1500);
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
            <div className="space-y-4" data-name="profile-editor">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Edit Profile</h3>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <ProfileImageUploader
                            currentImage={profile.profilePicture}
                            onImageUpdate={(url) => setProfile(prev => ({ ...prev, profilePicture: url }))}
                        />

                        <div>
                            <label className="block text-sm font-medium mb-1">Display Name</label>
                            <input
                                type="text"
                                value={profile.name}
                                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Bio</label>
                            <textarea
                                value={profile.bio}
                                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                                rows="3"
                                placeholder="Write a short bio (optional)"
                            />
                        </div>
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
        );
    } catch (error) {
        console.error('ProfileEditor component error:', error);
        reportError(error);
        return null;
    }
}

export default ProfileEditor;

import React from 'react';
import ProfilePicture from './ProfilePicture';
import { TAG_COLORS } from '../lib/constants';
import { reportError } from '../lib/errorReporter';
import { getProfile } from '../lib/profile';

function BlogCard({ post }) {
    try {
        const [profile, setProfile] = React.useState({
            name: 'Ananth J G',
            profilePicture: 'https://jg-eis.com/heyjg.png'
        });
        const hasVideo = !!post.objectData.youtubeUrl;
        const hasImage = !!post.objectData.image;

        React.useEffect(() => {
            loadProfile();
            window.addEventListener('profileUpdated', handleProfileUpdate);
            return () => {
                window.removeEventListener('profileUpdated', handleProfileUpdate);
            };
        }, []);

        const loadProfile = async () => {
            try {
                const { success, profile: loadedProfile } = await getProfile();
                if (success && loadedProfile) {
                    setProfile(loadedProfile);
                }
            } catch (err) {
                console.error('Error loading profile in BlogCard:', err);
            }
        };

        const handleProfileUpdate = (event) => {
            console.log('BlogCard received profile update:', event.detail);
            setProfile(event.detail);
        };

        const handleClick = (e) => {
            e.preventDefault();
            window.location.href = `/post/${post.objectId}`;
        };

        const renderMedia = () => {
            if (hasVideo) {
                return (
                    <div className="h-40 overflow-hidden" data-name="blog-video-container">
                        <iframe 
                            src={`https://www.youtube.com/embed/${post.objectData.youtubeUrl.split('v=')[1]}`}
                            className="w-full h-full"
                            allowFullScreen
                        ></iframe>
                    </div>
                );
            } else if (hasImage) {
                return (
                    <div className="h-40 overflow-hidden" data-name="blog-image-container">
                        <img 
                            src={post.objectData.image} 
                            alt={post.objectData.title}
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                            data-name="blog-image"
                        />
                    </div>
                );
            } else {
                return (
                    <div 
                        className="h-40 p-4 flex items-center justify-center" 
                        style={{ backgroundColor: '#E2FF00' }}
                        data-name="title-container"
                    >
                        <h3 className="text-2xl md:text-3xl font-semibold text-center text-black" data-name="blog-title-large">
                            {post.objectData.title}
                        </h3>
                    </div>
                );
            }
        };

        return (
            <article 
                onClick={handleClick}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:bg-gray-50 transition-all duration-300 cursor-pointer flex flex-col h-[350px]" 
                data-name="blog-card"
            >
                <div className="flex flex-col flex-grow">
                    {renderMedia()}
                    <div className="p-4 pb-2 flex-grow" data-name="blog-content">
                        {(hasImage || hasVideo) && (
                            <h3 className="text-lg font-semibold mb-2" data-name="blog-title">
                                {post.objectData.title}
                            </h3>
                        )}
                        <p className="text-gray-600 line-clamp-3" data-name="blog-excerpt">
                            {post.objectData.excerpt}
                        </p>
                    </div>
                </div>

                <div className="px-4 py-3 border-t border-gray-100" data-name="blog-meta">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500" data-name="blog-author">
                            <ProfilePicture
                                src={profile.profilePicture}
                                name={profile.name}
                                size="sm"
                                className="mr-2"
                                key={profile.profilePicture}
                            />
                            <div>
                                <p className="font-medium text-gray-900 text-xs">{profile.name}</p>
                                <p className="text-xs">{new Date(post.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        {post.objectData.tag && (
                            <span className={`text-xs px-2 py-1 rounded-full ${TAG_COLORS[post.objectData.tag]}`}>
                                {post.objectData.tag}
                            </span>
                        )}
                    </div>
                </div>
            </article>
        );
    } catch (error) {
        console.error('BlogCard component error:', error);
        reportError(error);
        return null;
    }
}

export default BlogCard;

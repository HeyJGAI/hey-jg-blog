import React from 'react';
import FilterTags from './FilterTags';
import SearchBar from './SearchBar';
import { TAG_COLORS } from '../lib/constants';
import { trickleListObjects } from '../lib/dataClient';
import { reportError } from '../lib/errorReporter';

function AdminDashboard() {
    try {
        const [posts, setPosts] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [searchTerm, setSearchTerm] = React.useState('');
        const [selectedTag, setSelectedTag] = React.useState('all');

        React.useEffect(() => {
            fetchPosts();
        }, []);

        const fetchPosts = async () => {
            try {
                const response = await trickleListObjects('post', 100, true);
                setPosts(response.items || []);
            } catch (err) {
                console.error('Error fetching posts:', err);
            } finally {
                setLoading(false);
            }
        };

        const filteredPosts = posts.filter(post => {
            const matchesSearch = searchTerm === '' || 
                post.objectData.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesTag = selectedTag === 'all' || post.objectData.tag === selectedTag;
            return matchesSearch && matchesTag;
        });

        const handlePostClick = (postId) => {
            window.location.href = `/admin/edit/${postId}`;
        };

        const getYoutubeThumbUrl = (youtubeUrl) => {
            try {
                const videoId = youtubeUrl.includes('v=') 
                    ? youtubeUrl.split('v=')[1].split('&')[0]
                    : youtubeUrl.split('/').pop();
                return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
            } catch (err) {
                console.error('Error parsing YouTube URL:', err);
                return null;
            }
        };

        const getPostThumbnail = (post) => {
            if (post.objectData.youtubeUrl) {
                return getYoutubeThumbUrl(post.objectData.youtubeUrl);
            }
            return post.objectData.image || null;
        };

        if (loading) {
            return (
                <div className="flex items-center justify-center h-[50vh]" data-name="loading">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
                </div>
            );
        }

        return (
            <div className="space-y-8" data-name="admin-dashboard">
                <div className="mb-12">
                    <h1 className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6vw] font-bold tracking-tight leading-none">
                        MANAGE
                    </h1>
                </div>

                <div className="bg-gray-50 rounded-lg p-8">
                    <div className="flex flex-col md:flex-row gap-4 mb-8" data-name="dashboard-filters">
                        <div className="md:w-1/3">
                            <SearchBar onSearch={setSearchTerm} placeholder="Search posts..." />
                        </div>
                        <div className="flex-grow">
                            <FilterTags selectedTag={selectedTag} onTagSelect={setSelectedTag} />
                        </div>
                    </div>

                    <div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                        data-name="posts-grid"
                    >
                        {filteredPosts.map((post) => {
                            const thumbnail = getPostThumbnail(post);
                            return (
                                <div 
                                    key={post.objectId} 
                                    onClick={() => handlePostClick(post.objectId)}
                                    className="bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300"
                                    data-name="post-card"
                                >
                                    <div className="flex items-center h-20" data-name="post-content">
                                        {thumbnail ? (
                                            <div className="w-20 h-20 flex-shrink-0" data-name="post-thumbnail">
                                                <img 
                                                    src={thumbnail}
                                                    alt={post.objectData.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div 
                                                className="w-20 h-20 flex items-center justify-center bg-[#E2FF00] flex-shrink-0"
                                                data-name="thumbnail-placeholder"
                                            >
                                                <span className="text-2xl font-bold text-black">
                                                    {post.objectData.title.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        )}
                                        
                                        <div className="flex-grow p-3 min-w-0" data-name="post-info">
                                            <h3 className="font-medium text-sm line-clamp-1 mb-1" data-name="post-title">
                                                {post.objectData.title}
                                            </h3>
                                            <div className="flex items-center justify-between text-xs" data-name="post-meta">
                                                <span className="text-gray-500 block truncate">
                                                    {new Date(post.objectData.createdAt).toLocaleDateString()}
                                                </span>
                                                {post.objectData.tag && (
                                                    <span className={`px-2 py-1 rounded-full ml-2 flex-shrink-0 ${TAG_COLORS[post.objectData.tag]}`}>
                                                        {post.objectData.tag}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filteredPosts.length === 0 && (
                        <div className="text-center py-12 text-gray-500" data-name="no-posts">
                            No posts found. {searchTerm || selectedTag !== 'all' ? 'Try adjusting your filters.' : ''}
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('AdminDashboard component error:', error);
        reportError(error);
        return null;
    }
}

export default AdminDashboard;

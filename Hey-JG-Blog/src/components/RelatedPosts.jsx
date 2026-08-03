import React from 'react';
import { trickleListObjects } from '../lib/dataClient';
import { reportError } from '../lib/errorReporter';

function RelatedPosts({ currentPostId }) {
    try {
        const [posts, setPosts] = React.useState([]);
        const [loading, setLoading] = React.useState(true);

        React.useEffect(() => {
            fetchPosts();
        }, []);

        const fetchPosts = async () => {
            try {
                const response = await trickleListObjects('post', 10, true);
                setPosts(response.items.filter(post => post.objectId !== currentPostId));
            } catch (err) {
                console.error('Error fetching related posts:', err);
            } finally {
                setLoading(false);
            }
        };

        if (loading) {
            return <div className="text-center py-4">Loading...</div>;
        }

        return (
            <aside className="space-y-6" data-name="related-posts">
                <h3 className="text-5xl font-semibold mb-8">More Posts</h3>
                {posts.slice(0, 10).map(post => (
                    <a 
                        key={post.objectId}
                        href={`/post/${post.objectId}`}
                        className="flex items-start space-x-4 group"
                        data-name="related-post-card"
                    >
                        {post.objectData.image && (
                            <img 
                                src={post.objectData.image}
                                alt={post.objectData.title}
                                className="w-20 h-20 object-cover rounded"
                                data-name="related-post-image"
                            />
                        )}
                        <div>
                            <h4 className="font-medium group-hover:text-gray-600 transition-colors" data-name="related-post-title">
                                {post.objectData.title}
                            </h4>
                            <p className="text-sm text-gray-500 line-clamp-2" data-name="related-post-excerpt">
                                {post.objectData.excerpt.slice(0, 120)}...
                            </p>
                        </div>
                    </a>
                ))}
            </aside>
        );
    } catch (error) {
        console.error('RelatedPosts component error:', error);
        reportError(error);
        return null;
    }
}

export default RelatedPosts;

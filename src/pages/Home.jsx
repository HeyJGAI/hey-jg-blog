import React from 'react';
import BlogCard from '../components/BlogCard';
import FilterTags from '../components/FilterTags';
import { trickleDeleteObject, trickleGetObject, trickleListObjects } from '../lib/dataClient';
import { reportError } from '../lib/errorReporter';
import { fetchAvailableTags } from '../lib/tagManager';

function Home() {
    try {
        const [hfContent, setHFContent] = React.useState({
            siteHeading: 'HUMAIN',
            siteTitle: 'Lets learn how to keep AI in the Loop and Empathy in the Lead'
        });
        const [posts, setPosts] = React.useState([]);
        const [visiblePosts, setVisiblePosts] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [loadingMore, setLoadingMore] = React.useState(false);
        const [hasMore, setHasMore] = React.useState(true);
        const [nextPageToken, setNextPageToken] = React.useState(null);
        const [selectedTag, setSelectedTag] = React.useState('all');
        const [availableTags, setAvailableTags] = React.useState([]);
        const [isFiltering, setIsFiltering] = React.useState(false);

        // List of titles to exclude
        const excludedTitles = ['Technology', 'Impact', 'Team Work', 'Product Mentor'];

        React.useEffect(() => {
            fetchInitialPosts();
            loadAvailableTags();
            loadHFContent();
            removeAboutTabPosts();

            // Listen for HF content updates
            const handleHFContentUpdate = (event) => {
                console.log('Home page received HF content update:', event.detail);
                setHFContent({
                    siteHeading: event.detail.siteHeading || 'HUMAIN',
                    siteTitle: event.detail.siteTitle || ''
                });
            };

            window.addEventListener('hfContentUpdated', handleHFContentUpdate);

            return () => {
                window.removeEventListener('hfContentUpdated', handleHFContentUpdate);
            };
        }, []);

        React.useEffect(() => {
            handleFilterChange();
        }, [selectedTag, posts]);

        const removeAboutTabPosts = async () => {
            try {
                const response = await trickleListObjects('post', 100, true);
                const postsToDelete = response.items?.filter(post => 
                    excludedTitles.includes(post.objectData.title)
                ) || [];

                for (const post of postsToDelete) {
                    await trickleDeleteObject('post', post.objectId);
                    console.log(`Deleted post: ${post.objectData.title}`);
                }
            } catch (err) {
                console.error('Error removing about tab posts:', err);
            }
        };

        const fetchInitialPosts = async () => {
            try {
                setLoading(true);
                const response = await trickleListObjects('post', 9, true);
                const newPosts = response.items || [];
                
                // Filter out excluded titles
                const filteredPosts = newPosts.filter(post => {
                    return post.objectData && 
                           post.objectData.title &&
                           !excludedTitles.includes(post.objectData.title);
                });

                setPosts(filteredPosts);
                setVisiblePosts(filteredPosts);
                setNextPageToken(response.nextPageToken);
                setHasMore(!!response.nextPageToken);
            } catch (err) {
                console.error('Error fetching initial posts:', err);
            } finally {
                setLoading(false);
            }
        };

        const loadHFContent = async () => {
            try {
                console.log('Loading HF content for home page');
                const response = await trickleGetObject('site-settings', 'hf-content');
                console.log('HF Content Response:', response);
                
                if (response?.objectData) {
                    setHFContent({
                        siteHeading: response.objectData.siteHeading || 'HUMAIN',
                        siteTitle: response.objectData.siteTitle || ''
                    });
                    console.log('Home page HF content updated');
                }
            } catch (err) {
                console.error('Error loading HF content for home page:', err);
            }
        };

        const loadAvailableTags = async () => {
            try {
                const tags = await fetchAvailableTags();
                setAvailableTags(tags);
            } catch (err) {
                console.error('Error loading available tags:', err);
            }
        };

        const handleFilterChange = () => {
            setIsFiltering(true);
            const postsContainer = document.querySelector('[data-name="posts-grid"]');
            
            if (postsContainer) {
                postsContainer.style.opacity = '0';
                postsContainer.style.transform = 'translateY(10px)';
            }

            setTimeout(() => {
                const filteredPosts = selectedTag === 'all'
                    ? posts
                    : posts.filter(post => post.objectData.tag === selectedTag);
                
                setVisiblePosts(filteredPosts);

                if (postsContainer) {
                    postsContainer.style.opacity = '1';
                    postsContainer.style.transform = 'translateY(0)';
                }

                setIsFiltering(false);
            }, 300);
        };

        const loadMorePosts = async () => {
            if (!nextPageToken || loadingMore) return;
            
            setLoadingMore(true);
            try {
                const response = await trickleListObjects('post', 9, true, nextPageToken);
                const newPosts = response.items || [];
                
                // Filter out excluded titles from new posts
                const filteredNewPosts = newPosts.filter(post => {
                    return post.objectData && 
                           post.objectData.title &&
                           !excludedTitles.includes(post.objectData.title);
                });

                setPosts(prevPosts => [...prevPosts, ...filteredNewPosts]);
                setNextPageToken(response.nextPageToken);
                setHasMore(!!response.nextPageToken);
            } catch (err) {
                console.error('Error loading more posts:', err);
            } finally {
                setLoadingMore(false);
            }
        };

        if (loading) {
            return <div className="text-center py-8">Loading...</div>;
        }

        return (
            <div className="min-h-screen" data-name="home-page">
                <div className="content-wrapper">
                    <div className="mb-16 text-left pt-8" data-name="hero">
                        <h1 className="text-[21vw] sm:text-[17.5vw] md:text-[14vw] lg:text-[12.25vw] xl:text-[10.5vw] font-bold mb-0 leading-none tracking-tight -ml-1">
                            {hfContent.siteHeading}
                        </h1>
                        <div className="text-base sm:text-xl md:text-xl lg:text-2xl text-gray-600 max-w-4xl -ml-1">
                            <div className="block md:hidden text-lg" dangerouslySetInnerHTML={{ __html: hfContent.siteTitle }}>
                            </div>
                            <div className="hidden md:block md:space-y-4" dangerouslySetInnerHTML={{ __html: hfContent.siteTitle }}>
                            </div>
                        </div>
                    </div>

                    {availableTags.length > 0 && (
                        <div className="mb-8" data-name="tag-filter">
                            <FilterTags
                                selectedTag={selectedTag}
                                onTagSelect={setSelectedTag}
                                availableTags={availableTags}
                            />
                        </div>
                    )}

                    <div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 transition-all duration-300 ease-out"
                        style={{ minHeight: '200px' }}
                        data-name="posts-grid"
                    >
                        {visiblePosts.map(post => (
                            <BlogCard 
                                key={post.objectId} 
                                post={post}
                            />
                        ))}
                    </div>

                    {visiblePosts.length === 0 && !isFiltering && (
                        <div className="text-center py-12 text-gray-500" data-name="no-posts">
                            No posts found for this tag
                        </div>
                    )}

                    {hasMore && visiblePosts.length > 0 && (
                        <div className="flex justify-center pb-24" data-name="load-more">
                            <button
                                onClick={loadMorePosts}
                                disabled={loadingMore}
                                className="group relative px-8 py-4 border-2 border-black rounded-full overflow-hidden transition-all duration-300 hover:bg-black"
                            >
                                <span className="relative z-10 text-lg font-medium transition-colors duration-300 group-hover:text-white">
                                    {loadingMore ? (
                                        <span className="flex items-center">
                                            <i className="fas fa-circle-notch fa-spin mr-2"></i>
                                            Loading...
                                        </span>
                                    ) : (
                                        'Load More'
                                    )}
                                </span>
                            </button>
                        </div>
                    )}

                    {!hasMore && visiblePosts.length > 0 && (
                        <div className="text-center pb-24 text-gray-500" data-name="end-message">
                            You've reached the end
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Home page error:', error);
        reportError(error);
        return null;
    }
}

export default Home;

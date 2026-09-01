import React from 'react';
import { marked } from 'marked';
import RelatedPosts from '../components/RelatedPosts';
import { TAG_COLORS } from '../lib/constants';
import { trickleGetObject } from '../lib/dataClient';
import { reportError } from '../lib/errorReporter';
import Home from './Home';

function BlogPost() {
    try {
        const [post, setPost] = React.useState(null);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState(null);
        const postId = window.location.pathname.split('/post/')[1];

        React.useEffect(() => {
            fetchPost();
        }, []);

        const fetchPost = async () => {
            try {
                if (!postId) {
                    throw new Error('Post ID not found');
                }
                
                const response = await trickleGetObject('post', postId);
                if (!response || !response.objectData) {
                    throw new Error('Post not found');
                }
                
                setPost(response);
                document.title = `${response.objectData.title} | Hey J G`;
            } catch (err) {
                console.error('Error fetching post:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const getYoutubeEmbedUrl = (url) => {
            try {
                const videoId = url.includes('v=') 
                    ? url.split('v=')[1].split('&')[0]
                    : url.split('/').pop();
                return `https://www.youtube.com/embed/${videoId}`;
            } catch (err) {
                console.error('Error parsing YouTube URL:', err);
                return '';
            }
        };

        const renderContent = () => {
            if (!post?.objectData?.content) {
                return { __html: '' };
            }

            try {
                // Split content into paragraphs
                const paragraphs = post.objectData.content
                    .split('\n\n')
                    .filter(p => p.trim());

                // Process each paragraph with marked
                const processedParagraphs = paragraphs.map(paragraph => {
                    // Configure marked
                    marked.setOptions({
                        breaks: true,
                        gfm: true,
                        pedantic: false,
                        sanitize: false,
                        smartLists: true,
                        smartypants: true
                    });

                    // Process the paragraph
                    let html = marked.parse(paragraph.trim());

                    // If it's not already wrapped in a block element, wrap it in <p>
                    if (!html.startsWith('<h') && 
                        !html.startsWith('<ul') && 
                        !html.startsWith('<ol') && 
                        !html.startsWith('<blockquote') && 
                        !html.startsWith('<pre') && 
                        !html.startsWith('<p')) {
                        html = `<p>${html}</p>`;
                    }

                    return html;
                });

                // Join processed paragraphs with line breaks
                const html = processedParagraphs.join('\n');

                // Add target="_blank" to external links
                const modifiedHtml = html.replace(
                    /<a\s+(?:[^>]*?\s+)?href="([^"]*)">/g, 
                    '<a href="$1" target="_blank" rel="noopener noreferrer">'
                );

                return { __html: modifiedHtml };
            } catch (err) {
                console.error('Error rendering content:', err);
                return { __html: 'Error rendering content' };
            }
        };

        if (loading) {
            return (
                <div className="pt-24" data-name="blog-post-loading">
                    <div className="content-wrapper">
                        <div className="animate-pulse">
                            <div className="h-12 bg-gray-200 rounded w-3/4 mb-8"></div>
                            <div className="space-y-4">
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="pt-24" data-name="blog-post-error">
                    <div className="content-wrapper">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold mb-4">Error</h1>
                            <p className="text-gray-600 mb-8">{error}</p>
                            <a 
                                href="/"
                                className="inline-block px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                Return Home
                            </a>
                        </div>
                    </div>
                </div>
            );
        }

        if (!post) {
            return (
                <div className="pt-24" data-name="blog-post-not-found">
                    <div className="content-wrapper">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
                            <p className="text-gray-600 mb-8">The post you're looking for doesn't exist.</p>
                            <a 
                                href="/"
                                className="inline-block px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                Return Home
                            </a>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="pt-24 pb-16" data-name="blog-post-page">
                <div className="content-wrapper">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Main Content */}
                        <article className="flex-grow lg:max-w-[calc(100%-384px)]" data-name="main-content">
                            <header className="mb-12">
                                <div className="flex items-center gap-2 text-sm mb-8">
                                    <span className="text-gray-500">
                                        {new Date(post.objectData.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                    {post.objectData.tag && (
                                        <>
                                            <span className="text-gray-300">•</span>
                                            <span className={`px-2 py-1 rounded-full text-xs ${TAG_COLORS[post.objectData.tag]}`}>
                                                {post.objectData.tag}
                                            </span>
                                        </>
                                    )}
                                </div>

                                <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.objectData.title}</h1>
                                <p className="text-xl text-gray-600">{post.objectData.excerpt}</p>
                            </header>

                            {post.objectData.image && (
                                <div className="mb-12">
                                    <img
                                        src={post.objectData.image}
                                        alt={post.objectData.title}
                                        className="w-full h-[60vh] object-cover rounded-lg"
                                    />
                                </div>
                            )}

                            {post.objectData.youtubeUrl && (
                                <div className="mb-12 aspect-video">
                                    <iframe
                                        src={getYoutubeEmbedUrl(post.objectData.youtubeUrl)}
                                        className="w-full h-full rounded-lg"
                                        title={post.objectData.title}
                                        frameBorder="0"
                                        allowFullScreen
                                        loading="lazy"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    ></iframe>
                                </div>
                            )}

                            <div 
                                className="blog-content prose prose-lg max-w-none"
                                dangerouslySetInnerHTML={renderContent()}
                                data-name="post-content"
                            />
                        </article>

                        {/* Sidebar */}
                        <aside className="lg:w-[320px] flex-shrink-0" data-name="sidebar">
                            <div className="sticky top-24">
                                <RelatedPosts currentPostId={postId} />
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('BlogPost page error:', error);
        reportError(error);
        return null;
    }
}

export default BlogPost;

import React from 'react';
import { reportError } from '../lib/errorReporter';

function FeaturedPost({ post }) {
    try {
        return (
            <section className="featured-post rounded-xl p-8 mb-12" data-name="featured-post">
                <div className="max-w-3xl mx-auto">
                    <span className="inline-block px-4 py-1 bg-white rounded-full text-sm font-medium mb-4" data-name="featured-label">
                        Featured Post
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4" data-name="featured-title">
                        {post.title}
                    </h2>
                    <p className="text-lg mb-6 opacity-90" data-name="featured-excerpt">
                        {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between" data-name="featured-meta">
                        <div className="flex items-center space-x-4" data-name="featured-author">
                            <img 
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100" 
                                alt="Author"
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <p className="font-medium">Admin</p>
                                <p className="text-sm opacity-75">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <a 
                            href={`/post/${post.objectId}`}
                            className="px-6 py-2 bg-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                            data-name="featured-link"
                        >
                            Read Article
                        </a>
                    </div>
                </div>
            </section>
        );
    } catch (error) {
        console.error('FeaturedPost component error:', error);
        reportError(error);
        return null;
    }
}

export default FeaturedPost;

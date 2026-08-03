import React from 'react';
import AdminLogin from '../components/AdminLogin';
import AdminHeader from '../components/AdminHeader';
import AdminDashboard from '../components/AdminDashboard';
import AdminHF from './AdminHF';
import AdminAbout from './AdminAbout';
import PostEditor from '../components/PostEditor';
import { trickleGetObject } from '../lib/dataClient';
import { reportError } from '../lib/errorReporter';
import { isAuthenticated as checkSession, onAuthStateChange } from '../lib/auth';

function Admin() {
    try {
        const [isAuthenticated, setIsAuthenticated] = React.useState(false);
        const [authChecked, setAuthChecked] = React.useState(false);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState(null);
        const [post, setPost] = React.useState(null);
        const path = window.location.pathname;

        React.useEffect(() => {
            let cancelled = false;

            checkSession().then((authed) => {
                if (cancelled) return;
                setIsAuthenticated(authed);
                setAuthChecked(true);
                if (authed && path.startsWith('/admin/edit/')) {
                    fetchPost();
                } else {
                    setLoading(false);
                }
            });

            const unsubscribe = onAuthStateChange((authed) => {
                setIsAuthenticated(authed);
            });

            return () => {
                cancelled = true;
                unsubscribe();
            };
        }, []);

        const fetchPost = async () => {
            try {
                const postId = path.split('/').pop();
                const response = await trickleGetObject('post', postId);
                setPost(response);
            } catch (err) {
                console.error('Error fetching post:', err);
                setError('Failed to fetch post');
            } finally {
                setLoading(false);
            }
        };

        const handleLogin = () => {
            setIsAuthenticated(true);
            setError(null);
        };

        if (!authChecked) {
            return <div className="text-center py-8">Loading...</div>;
        }

        if (!isAuthenticated) {
            return <AdminLogin onLogin={handleLogin} />;
        }

        if (loading) {
            return <div className="text-center py-8">Loading...</div>;
        }

        if (error) {
            return (
                <div className="min-h-screen flex items-center justify-center px-4" data-name="admin-error">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Error</h2>
                        <p className="text-gray-600 mb-8">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="min-h-screen bg-white" data-name="admin-page">
                <AdminHeader activeSection={
                    path === '/admin' ? 'manage' :
                    path === '/admin/new' ? 'write' :
                    path === '/admin/about' ? 'about' :
                    path === '/admin/hf' ? 'hf' :
                    path.startsWith('/admin/edit/') ? 'manage' : ''
                } />

                <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-24 pb-16">
                    {path === '/admin/hf' && <AdminHF />}
                    {path === '/admin/about' && <AdminAbout />}
                    {path === '/admin/new' && (
                        <>
                            <div className="mb-12">
                                <h1 className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6vw] font-bold tracking-tight leading-none">
                                    WRITE
                                </h1>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-8">
                                <PostEditor onSave={() => window.location.href = '/admin'} />
                            </div>
                        </>
                    )}
                    {path.startsWith('/admin/edit/') && (
                        <>
                            <div className="mb-12">
                                <h1 className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6vw] font-bold tracking-tight leading-none">
                                    EDIT
                                </h1>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-8">
                                <PostEditor
                                    post={post}
                                    onSave={() => window.location.href = '/admin'}
                                />
                            </div>
                        </>
                    )}
                    {path === '/admin' && <AdminDashboard />}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Admin page error:', error);
        reportError(error);
        return (
            <div className="min-h-screen flex items-center justify-center px-4" data-name="admin-error">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Error</h2>
                    <p className="text-gray-600 mb-8">An unexpected error occurred.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }
}

export default Admin;

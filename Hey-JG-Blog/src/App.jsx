import React from 'react';
import MetaTags from './components/MetaTags';
import Header from './components/Header';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import Home from './pages/Home';
import About from './pages/About';
import Coffee from './pages/Coffee';
import BlogPost from './pages/BlogPost';
import Admin from './pages/Admin';
import Design from './pages/Design';
import { reportError } from './lib/errorReporter';
import { isAuthenticated as checkSession, logout, onAuthStateChange } from './lib/auth';

function App() {
    try {
        const [isAdmin, setIsAdmin] = React.useState(false);
        const [loading, setLoading] = React.useState(true);
        const [contentVisible, setContentVisible] = React.useState(false);
        const path = window.location.pathname;

        React.useEffect(() => {
            checkSession().then(setIsAdmin);
            const unsubscribe = onAuthStateChange(setIsAdmin);

            const minLoadTime = 3000;
            const loadSequence = async () => {
                const content = document.querySelector('[data-name="app-content"]');
                if (content) {
                    content.style.opacity = '0';
                    content.style.visibility = 'hidden';
                }

                await new Promise(resolve => setTimeout(resolve, minLoadTime));
                setLoading(false);

                setTimeout(() => {
                    setContentVisible(true);
                    if (content) {
                        content.style.visibility = 'visible';
                        content.style.opacity = '1';
                    }
                }, 800);
            };

            loadSequence();

            return () => unsubscribe();
        }, []);

        const handleLogout = async () => {
            await logout();
            setIsAdmin(false);
            window.location.href = '/';
        };

        let content;
        if (path === '/') {
            content = <Home />;
        } else if (path.startsWith('/post/')) {
            content = <BlogPost />;
        } else if (path === '/admin/design' || path === '/design') {
            content = <Design />;
        } else if (path.startsWith('/admin')) {
            // Every /admin* route (including /admin/about and /admin/hf) goes
            // through Admin, which is the one place that checks the login gate.
            // The old build special-cased /admin/about to skip that gate entirely
            // — anyone who knew the URL could edit the About page with no login.
            content = <Admin />;
        } else if (path === '/about') {
            content = <About />;
        } else if (path === '/coffee') {
            content = <Coffee />;
        } else {
            content = <div className="text-center py-8">Page not found</div>;
        }

        return (
            <div className="min-h-screen flex flex-col" data-name="app">
                {loading && <PageLoader />}
                <div
                    className="flex flex-col min-h-screen transition-opacity duration-800 ease-in-out"
                    style={{
                        opacity: contentVisible ? 1 : 0,
                        visibility: contentVisible ? 'visible' : 'hidden'
                    }}
                    data-name="app-content"
                >
                    <MetaTags />
                    <Header isAdmin={isAdmin} onLogout={handleLogout} />
                    <main className="flex-grow" data-name="main-content">
                        {content}
                    </main>
                    <Footer />
                </div>
            </div>
        );
    } catch (error) {
        console.error('App error:', error);
        reportError(error);
        return null;
    }
}

export default App;

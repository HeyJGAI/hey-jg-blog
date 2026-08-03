import React from 'react';
import AdminHeader from './AdminHeader';
import { reportError } from '../lib/errorReporter';

function Header({ isAdmin }) {
    try {
        const [menuOpen, setMenuOpen] = React.useState(false);
        const [activeRoute, setActiveRoute] = React.useState('');
        const [isScrolled, setIsScrolled] = React.useState(false);

        React.useEffect(() => {
            setActiveRoute(window.location.pathname);
            
            // Add body class when menu is open to prevent scrolling
            if (menuOpen) {
                document.body.classList.add('overflow-hidden');
            } else {
                document.body.classList.remove('overflow-hidden');
            }

            // Handle scroll for glassmorphic effect
            const handleScroll = () => {
                const scrollPosition = window.scrollY;
                setIsScrolled(scrollPosition > 0);
            };

            window.addEventListener('scroll', handleScroll);
            handleScroll();

            return () => {
                document.body.classList.remove('overflow-hidden');
                window.removeEventListener('scroll', handleScroll);
            };
        }, [menuOpen]);

        // Only render admin header if user is admin
        if (isAdmin) {
            return <AdminHeader activeSection="write" />;
        }

        return (
            <header 
                className={`fixed w-full top-0 z-50 transition-all duration-300 ${
                    isScrolled 
                        ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/50' 
                        : 'bg-white border-b border-gray-200'
                }`}
                data-name="header"
            >
                <div className="content-wrapper" data-name="header-content">
                    {/* Logo */}
                    <div className="flex items-center z-50" data-name="logo-section">
                        <a href="/" className="flex items-center" data-name="logo-link">
                            <img 
                                src="https://jg-eis.com/logo.png" 
                                alt="JG Logo"
                                className="h-full w-auto"
                                data-name="logo-image"
                            />
                        </a>
                    </div>

                    {/* Tri-bar Menu Button */}
                    <button 
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex flex-col justify-center items-end space-y-3 group z-50 h-full px-4"
                        aria-label="Toggle menu"
                        data-name="tri-bar-button"
                    >
                        <span className={`block h-[0.25rem] bg-black transition-all duration-300 ease-out ${
                            menuOpen ? 'w-8 -rotate-45 translate-y-3' : 'w-8'
                        }`}></span>
                        <span className={`block h-[0.25rem] bg-black transition-all duration-300 ease-out ${
                            menuOpen ? 'w-8 rotate-45 -translate-y-0' : 'w-8'
                        }`}></span>
                    </button>

                    {/* Full Screen Menu */}
                    <div 
                        className={`fixed inset-x-0 bottom-0 bg-black transition-all duration-500 ease-in-out ${
                            menuOpen 
                                ? 'opacity-100 pointer-events-auto' 
                                : 'opacity-0 pointer-events-none'
                        }`}
                        data-name="menu-overlay"
                    >
                        <nav 
                            className={`flex flex-col items-center justify-center h-full transition-all duration-500 ease-in-out ${
                                menuOpen ? 'opacity-100' : 'opacity-0'
                            }`}
                            data-name="menu-nav"
                        >
                            <div className="space-y-8">
                                <a 
                                    href="/"
                                    className={`block text-5xl md:text-7xl font-extralight tracking-wide transition-colors ${
                                        activeRoute === '/' 
                                            ? 'text-[#E2FF00]' 
                                            : 'text-white hover:text-gray-200'
                                    }`}
                                    onClick={() => setMenuOpen(false)}
                                    data-name="menu-blog"
                                >
                                    Blog
                                </a>
                                <div className="h-px w-16 bg-gray-800 mx-auto"></div>
                                <a 
                                    href="/about"
                                    className={`block text-5xl md:text-7xl font-extralight tracking-wide transition-colors ${
                                        activeRoute === '/about' 
                                            ? 'text-[#E2FF00]' 
                                            : 'text-white hover:text-gray-200'
                                    }`}
                                    onClick={() => setMenuOpen(false)}
                                    data-name="menu-about"
                                >
                                    About Me
                                </a>
                                <div className="h-px w-16 bg-gray-800 mx-auto"></div>
                                <a 
                                    href="/admin"
                                    className={`block text-5xl md:text-7xl font-extralight tracking-wide transition-colors ${
                                        activeRoute === '/admin' 
                                            ? 'text-[#E2FF00]' 
                                            : 'text-white hover:text-gray-200'
                                    }`}
                                    onClick={() => setMenuOpen(false)}
                                    data-name="menu-login"
                                >
                                    Login
                                </a>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
        return null;
    }
}

export default Header;

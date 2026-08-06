import React from 'react';
import { logout } from '../lib/auth';
import { reportError } from '../lib/errorReporter';
import { getProfile } from '../lib/profile';

function AdminHeader({ activeSection }) {
    try {
        const [menuOpen, setMenuOpen] = React.useState(false);
        const [profile, setProfile] = React.useState({
            name: 'Ananth J G',
            profilePicture: 'https://jg-eis.com/heyjg.png'
        });

        React.useEffect(() => {
            loadProfile();
            
            if (menuOpen) {
                document.body.classList.add('overflow-hidden');
            } else {
                document.body.classList.remove('overflow-hidden');
            }

            return () => {
                document.body.classList.remove('overflow-hidden');
            };
        }, [menuOpen]);

        const loadProfile = async () => {
            try {
                const { success, profile: loadedProfile } = await getProfile();
                if (success && loadedProfile) {
                    setProfile(loadedProfile);
                }
            } catch (err) {
                console.error('Error loading profile:', err);
            }
        };

        const handleLogout = async () => {
            await logout();
            window.location.href = '/';
        };

        const menuItems = [
            { label: 'Write', href: '/admin/new', section: 'write' },
            { label: 'Manage', href: '/admin', section: 'manage' },
            { label: 'About Me', href: '/admin/about', section: 'about' },
            { label: 'HF Section', href: '/admin/hf', section: 'hf' }
        ];

        return (
            <header className="fixed w-full top-0 z-50 bg-black border-b border-gray-800" data-name="admin-header">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="h-[73px] flex items-center justify-between" data-name="header-container">
                        <div className="flex-shrink-0" data-name="logo-section">
                            <a href="/admin/new" className="block" data-name="logo-link">
                                <img 
                                    src="https://www.jg-eis.com/logo_white.png" 
                                    alt="JG Logo"
                                    className="h-12 w-auto"
                                    data-name="logo-image"
                                />
                            </a>
                        </div>

                        <button 
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="flex flex-col justify-center items-end space-y-1.5 group z-50"
                            aria-label="Toggle menu"
                            data-name="tri-bar-button"
                        >
                            <span className={`block h-0.5 bg-white transition-all duration-300 ease-out ${
                                menuOpen ? 'w-6 -rotate-45 translate-y-2' : 'w-6'
                            }`}></span>
                            <span className={`block h-0.5 bg-white transition-all duration-300 ease-out ${
                                menuOpen ? 'w-6 opacity-0' : 'w-4'
                            }`}></span>
                            <span className={`block h-0.5 bg-white transition-all duration-300 ease-out ${
                                menuOpen ? 'w-6 rotate-45 -translate-y-2' : 'w-6'
                            }`}></span>
                        </button>
                    </div>
                </div>

                <div 
                    className={`fixed inset-0 bg-black transition-all duration-500 ease-in-out overflow-y-auto ${
                        menuOpen 
                            ? 'opacity-95 pointer-events-auto' 
                            : 'opacity-0 pointer-events-none'
                    }`}
                    style={{ marginTop: '73px' }}
                    data-name="menu-overlay"
                >
                    <div className="min-h-full flex items-center justify-center py-12" data-name="menu-content">
                        <nav 
                            className={`flex flex-col items-center justify-center w-full px-4 transition-all duration-500 ease-in-out ${
                                menuOpen ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
                            }`} 
                            data-name="menu-nav"
                        >
                            <div className="space-y-4 md:space-y-6 w-full max-w-lg">
                                {menuItems.map((item, index) => (
                                    <div key={item.section} className="text-center">
                                        <a
                                            href={item.href}
                                            className={`relative inline-block text-2xl sm:text-3xl md:text-4xl transition-all duration-300 font-extralight tracking-wide ${
                                                activeSection === item.section
                                                    ? 'text-[#E2FF00]'
                                                    : 'text-white hover:text-white/80'
                                            }`}
                                            style={{ fontWeight: 200 }}
                                            data-name={`menu-item-${item.section}`}
                                        >
                                            {item.label}
                                        </a>
                                        {index < menuItems.length - 1 && (
                                            <div className="h-px w-16 bg-gray-800 mx-auto mt-4 md:mt-6"></div>
                                        )}
                                    </div>
                                ))}
                                <div className="text-center pt-4 md:pt-6 border-t border-gray-800">
                                    <button
                                        onClick={handleLogout}
                                        className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-wide text-red-400 hover:text-red-300 transition-colors"
                                        style={{ fontWeight: 200 }}
                                        data-name="menu-item-logout"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        );
    } catch (error) {
        console.error('AdminHeader component error:', error);
        reportError(error);
        return null;
    }
}

export default AdminHeader;

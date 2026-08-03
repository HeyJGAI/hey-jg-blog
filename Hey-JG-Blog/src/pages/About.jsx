import React from 'react';
import { marked } from 'marked';
import { trickleListObjects } from '../lib/dataClient';
import { reportError } from '../lib/errorReporter';

function About() {
    try {
        const [tabs, setTabs] = React.useState([]);
        const [activeTab, setActiveTab] = React.useState(0);
        const [loading, setLoading] = React.useState(true);
        const [showLeftArrow, setShowLeftArrow] = React.useState(false);
        const [showRightArrow, setShowRightArrow] = React.useState(false);
        const scrollContainerRef = React.useRef(null);

        React.useEffect(() => {
            fetchAboutContent();
        }, []);

        React.useEffect(() => {
            checkScrollArrows();
            window.addEventListener('resize', checkScrollArrows);
            return () => window.removeEventListener('resize', checkScrollArrows);
        }, [tabs]);

        const checkScrollArrows = () => {
            const container = scrollContainerRef.current;
            if (!container) return;

            const { scrollLeft, scrollWidth, clientWidth } = container;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
        };

        const handleScroll = (direction) => {
            const container = scrollContainerRef.current;
            if (!container) return;
            
            const scrollAmount = 200;
            const start = container.scrollLeft;
            const target = direction === 'left' 
                ? Math.max(0, start - scrollAmount)
                : Math.min(container.scrollWidth - container.clientWidth, start + scrollAmount);
            
            container.scrollTo({
                left: target,
                behavior: 'smooth'
            });
        };

        const fetchAboutContent = async () => {
            try {
                const response = await trickleListObjects('about-tab', 100, false);
                if (response.items && response.items.length > 0) {
                    setTabs(response.items.slice(0, 6)); // Limit to 6 tabs
                } else {
                    // Default 6 tabs
                    const defaultTabs = [
                        { objectData: { title: 'Story', content: 'My story begins...', info: 'More about my story...' } },
                        { objectData: { title: 'Mission', content: 'My mission is...', info: 'More about my mission...' } },
                        { objectData: { title: 'Values', content: 'I believe in...', info: 'More about my values...' } },
                        { objectData: { title: 'Vision', content: 'I envision...', info: 'More about my vision...' } },
                        { objectData: { title: 'Skills', content: 'My expertise includes...', info: 'More about my skills...' } },
                        { objectData: { title: 'Goals', content: 'My goals are...', info: 'More about my goals...' } }
                    ];
                    setTabs(defaultTabs);
                }
            } catch (err) {
                console.error('Error fetching about content:', err);
            } finally {
                setLoading(false);
            }
        };

        if (loading) {
            return (
                <div className="min-h-screen bg-black flex items-center justify-center" data-name="about-loading">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                </div>
            );
        }

        return (
            <div className="min-h-screen bg-black pt-32 pb-16" data-name="about-page">
                <div className="content-wrapper">
                    {/* Tab Navigation */}
                    <div className="relative mb-2" data-name="tab-navigation">
                        {showLeftArrow && (
                            <button 
                                onClick={() => handleScroll('left')}
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-black via-black to-transparent pl-1 pr-8 h-full"
                                data-name="scroll-left"
                            >
                                <i className="fas fa-chevron-left text-white/50 hover:text-white text-lg"></i>
                            </button>
                        )}

                        <div 
                            ref={scrollContainerRef}
                            className="overflow-x-auto scrollbar-hide"
                            onScroll={checkScrollArrows}
                            data-name="tabs-container"
                        >
                            <div className="flex gap-8 min-w-max pb-2">
                                {tabs.map((tab, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveTab(index)}
                                        className={`text-base md:text-lg transition-colors ${
                                            activeTab === index
                                                ? 'text-[#E2FF00]'
                                                : 'text-gray-400 hover:text-white'
                                        }`}
                                        data-name={`tab-${index}`}
                                    >
                                        {tab.objectData.title}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {showRightArrow && (
                            <button 
                                onClick={() => handleScroll('right')}
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-l from-black via-black to-transparent pr-1 pl-8 h-full"
                                data-name="scroll-right"
                            >
                                <i className="fas fa-chevron-right text-white/50 hover:text-white text-lg"></i>
                            </button>
                        )}
                    </div>

                    {/* Main Content */}
                    <div className="flex-grow" data-name="main-content">
                        <div 
                            className="prose prose-invert max-w-none mb-8"
                            dangerouslySetInnerHTML={{ 
                                __html: marked.parse(tabs[activeTab]?.objectData.content || '') 
                            }}
                            data-name="content-body"
                        />

                        {/* Info Section - Always visible */}
                        <div data-name="info-section">
                            <div className="bg-black/90 backdrop-blur-sm border-t border-gray-800 rounded-lg pt-6" style={{ maxWidth: '640px' }}>
                                <div 
                                    className="text-gray-400 text-sm prose prose-invert max-w-none info-content"
                                    dangerouslySetInnerHTML={{ 
                                        __html: marked.parse(tabs[activeTab]?.objectData.info || '') 
                                    }}
                                    data-name="info-body"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('About page error:', error);
        reportError(error);
        return null;
    }
}

export default About;

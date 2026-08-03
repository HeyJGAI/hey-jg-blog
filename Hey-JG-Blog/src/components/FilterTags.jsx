import React from 'react';
import { reportError } from '../lib/errorReporter';

function FilterTags({ selectedTag, onTagSelect, availableTags = [] }) {
    try {
        const [showLeftArrow, setShowLeftArrow] = React.useState(false);
        const [showRightArrow, setShowRightArrow] = React.useState(false);
        const scrollContainerRef = React.useRef(null);

        const tags = [
            { id: 'all', label: 'All' },
            ...availableTags.map(tag => ({ id: tag, label: tag }))
        ];

        React.useEffect(() => {
            checkScrollArrows();
            window.addEventListener('resize', checkScrollArrows);
            return () => window.removeEventListener('resize', checkScrollArrows);
        }, []);

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
            
            const scrollAmount = 300;
            const start = container.scrollLeft;
            const target = direction === 'left' 
                ? Math.max(0, start - scrollAmount)
                : Math.min(container.scrollWidth - container.clientWidth, start + scrollAmount);
            
            container.scrollTo({
                left: target,
                behavior: 'smooth'
            });
        };

        return (
            <div className="relative" data-name="filter-tags">
                {showLeftArrow && (
                    <button 
                        onClick={() => handleScroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-white via-white to-transparent pl-1 pr-4 py-2"
                        data-name="scroll-left"
                    >
                        <i className="fas fa-chevron-left text-gray-600 text-sm"></i>
                    </button>
                )}

                <div 
                    ref={scrollContainerRef}
                    className="overflow-x-auto scrollbar-hide py-2"
                    onScroll={checkScrollArrows}
                    data-name="tag-scroll"
                >
                    <div className="flex gap-2 px-1 min-w-max">
                        {tags.map(tag => (
                            <button
                                key={tag.id}
                                onClick={() => onTagSelect(tag.id)}
                                className={`px-4 py-3 rounded-full text-sm transition-all duration-300 ${
                                    selectedTag === tag.id
                                        ? 'bg-black text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                                data-name={`tag-${tag.id.toLowerCase().replace(' ', '-')}`}
                            >
                                {tag.label}
                            </button>
                        ))}
                    </div>
                </div>

                {showRightArrow && (
                    <button 
                        onClick={() => handleScroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-l from-white via-white to-transparent pr-1 pl-4 py-2"
                        data-name="scroll-right"
                    >
                        <i className="fas fa-chevron-right text-gray-600 text-sm"></i>
                    </button>
                )}
            </div>
        );
    } catch (error) {
        console.error('FilterTags component error:', error);
        reportError(error);
        return null;
    }
}

export default FilterTags;

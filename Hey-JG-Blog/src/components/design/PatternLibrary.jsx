import React from 'react';
import { reportError } from '../../lib/errorReporter';
import About from '../../pages/About';
import Design from '../../pages/Design';
import Home from '../../pages/Home';

function PatternLibrary({ ComponentPreview, CodeBlock }) {
    try {
        return (
            <div className="space-y-16" data-name="pattern-library">
                {/* Layout Patterns */}
                <section className="space-y-8" data-name="layout-patterns">
                    <h2 className="text-3xl font-bold">Layout Patterns</h2>
                    
                    <div className="space-y-8">
                        {/* Grid Layout */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Grid Layout</h3>
                            <ComponentPreview title="Grid Layout Example">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {[1, 2, 3, 4, 5, 6].map(n => (
                                        <div key={n} className="bg-gray-100 p-4 rounded-lg text-center">
                                            Grid Item {n}
                                        </div>
                                    ))}
                                </div>
                            </ComponentPreview>
                            <CodeBlock code={`
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {items.map(item => (
        <div key={item.id} class="bg-gray-100 p-4 rounded-lg">
            {item.content}
        </div>
    ))}
</div>
                            `.trim()} />
                        </div>

                        {/* Flex Layout */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Flex Layout</h3>
                            <ComponentPreview title="Flex Layout Example">
                                <div className="flex flex-wrap gap-4">
                                    {[1, 2, 3].map(n => (
                                        <div key={n} className="flex-1 min-w-[200px] bg-gray-100 p-4 rounded-lg text-center">
                                            Flex Item {n}
                                        </div>
                                    ))}
                                </div>
                            </ComponentPreview>
                            <CodeBlock code={`
<div class="flex flex-wrap gap-4">
    {items.map(item => (
        <div key={item.id} class="flex-1 min-w-[200px] bg-gray-100 p-4">
            {item.content}
        </div>
    ))}
</div>
                            `.trim()} />
                        </div>

                        {/* Container Layout */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Container Layout</h3>
                            <ComponentPreview title="Container Example">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="bg-gray-100 p-4 rounded-lg text-center">
                                        Contained Content
                                    </div>
                                </div>
                            </ComponentPreview>
                            <CodeBlock code={`
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-gray-100 p-4 rounded-lg">
        {content}
    </div>
</div>
                            `.trim()} />
                        </div>
                    </div>
                </section>

                {/* Animation Patterns */}
                <section className="space-y-8" data-name="animation-patterns">
                    <h2 className="text-3xl font-bold">Animation Patterns</h2>
                    
                    <div className="space-y-8">
                        {/* Transitions */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Transitions</h3>
                            <ComponentPreview title="Transition Examples">
                                <div className="space-y-4">
                                    <button className="px-6 py-3 bg-black text-white rounded-lg transition-all duration-300 hover:bg-gray-800 hover:transform hover:scale-105">
                                        Hover Scale
                                    </button>
                                    <div className="w-16 h-16 bg-black rounded-lg transition-all duration-300 hover:rotate-45">
                                    </div>
                                </div>
                            </ComponentPreview>
                            <CodeBlock code={`
/* Hover Scale */
.hover-scale {
    transition: all 0.3s;
}
.hover-scale:hover {
    transform: scale(1.05);
}

/* Rotation */
.hover-rotate {
    transition: all 0.3s;
}
.hover-rotate:hover {
    transform: rotate(45deg);
}
                            `.trim()} />
                        </div>

                        {/* Loading States */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Loading States</h3>
                            <ComponentPreview title="Loading Animations">
                                <div className="flex gap-8">
                                    <div className="animate-spin h-8 w-8 border-4 border-black border-t-transparent rounded-full">
                                    </div>
                                    <div className="animate-pulse h-8 w-8 bg-black rounded-full">
                                    </div>
                                </div>
                            </ComponentPreview>
                            <CodeBlock code={`
/* Spinner */
.spinner {
    animation: spin 1s linear infinite;
}

/* Pulse */
.pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
                            `.trim()} />
                        </div>

                        {/* Page Transitions */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Page Transitions</h3>
                            <ComponentPreview title="Page Transition Example">
                                <div className="space-y-4">
                                    <div className="opacity-0 transform translate-y-4 transition-all duration-300">
                                        Fade In & Slide Up
                                    </div>
                                </div>
                            </ComponentPreview>
                            <CodeBlock code={`
/* Page Transition */
.page-enter {
    opacity: 0;
    transform: translateY(1rem);
}
.page-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 300ms, transform 300ms;
}
                            `.trim()} />
                        </div>
                    </div>
                </section>

                {/* Responsive Patterns */}
                <section className="space-y-8" data-name="responsive-patterns">
                    <h2 className="text-3xl font-bold">Responsive Patterns</h2>
                    
                    <div className="space-y-8">
                        {/* Mobile First */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Mobile First Design</h3>
                            <ComponentPreview title="Mobile First Example">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {[1, 2, 3, 4].map(n => (
                                        <div key={n} className="bg-gray-100 p-4 rounded-lg text-center">
                                            Item {n}
                                        </div>
                                    ))}
                                </div>
                            </ComponentPreview>
                            <CodeBlock code={`
/* Mobile First Grid */
.grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}

@media (min-width: 640px) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 768px) {
    .grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (min-width: 1024px) {
    .grid {
        grid-template-columns: repeat(4, 1fr);
    }
}
                            `.trim()} />
                        </div>

                        {/* Navigation Pattern */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Responsive Navigation</h3>
                            <ComponentPreview title="Navigation Example">
                                <nav className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                    <div className="text-xl font-bold">Logo</div>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <a href="#" className="hover:text-gray-600">Home</a>
                                        <a href="#" className="hover:text-gray-600">About</a>
                                        <a href="#" className="hover:text-gray-600">Contact</a>
                                    </div>
                                </nav>
                            </ComponentPreview>
                        </div>
                    </div>
                </section>
            </div>
        );
    } catch (error) {
        console.error('PatternLibrary component error:', error);
        reportError(error);
        return null;
    }
}

export default PatternLibrary;

import React from 'react';
import { reportError } from '../../lib/errorReporter';
import Design from '../../pages/Design';

function Guidelines({ ComponentPreview, CodeBlock }) {
    try {
        return (
            <div className="space-y-16" data-name="implementation-guidelines">
                {/* CSS Naming */}
                <section className="space-y-8" data-name="css-naming">
                    <h2 className="text-3xl font-bold">CSS Naming Conventions</h2>
                    
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Class Naming</h3>
                            <CodeBlock code={`
/* Component Based */
.card { }
.card-header { }
.card-content { }

/* Utility Based */
.text-lg { }
.font-bold { }
.bg-primary { }
                            `.trim()} />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">BEM Methodology</h3>
                            <CodeBlock code={`
/* Block */
.block { }

/* Element */
.block__element { }

/* Modifier */
.block--modifier { }
.block__element--modifier { }
                            `.trim()} />
                        </div>
                    </div>
                </section>

                {/* Component Usage */}
                <section className="space-y-8" data-name="component-usage">
                    <h2 className="text-3xl font-bold">Component Usage Guidelines</h2>
                    
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Button Usage</h3>
                            <div className="prose max-w-none">
                                <ul className="list-disc pl-4 space-y-2">
                                    <li>Use primary buttons for main actions</li>
                                    <li>Use secondary buttons for alternative actions</li>
                                    <li>Maintain consistent spacing between buttons</li>
                                    <li>Use icon buttons only when the icon meaning is clear</li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Form Guidelines</h3>
                            <div className="prose max-w-none">
                                <ul className="list-disc pl-4 space-y-2">
                                    <li>Always use labels with form controls</li>
                                    <li>Provide clear validation feedback</li>
                                    <li>Group related form fields</li>
                                    <li>Use consistent spacing between form elements</li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Card Guidelines</h3>
                            <div className="prose max-w-none">
                                <ul className="list-disc pl-4 space-y-2">
                                    <li>Use cards to group related content</li>
                                    <li>Maintain consistent padding within cards</li>
                                    <li>Use hover states for interactive cards</li>
                                    <li>Keep card content concise and focused</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Accessibility */}
                <section className="space-y-8" data-name="accessibility">
                    <h2 className="text-3xl font-bold">Accessibility Standards</h2>
                    
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">ARIA Labels</h3>
                            <CodeBlock code={`
<!-- Button with ARIA label -->
<button aria-label="Close modal">
    <i class="fas fa-times"></i>
</button>

<!-- Image with alt text -->
<img src="image.jpg" alt="Descriptive text">

<!-- ARIA roles -->
<div role="alert">Error message</div>
<div role="dialog" aria-labelledby="modalTitle">
    <h2 id="modalTitle">Modal Title</h2>
</div>
                            `.trim()} />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Keyboard Navigation</h3>
                            <div className="prose max-w-none">
                                <ul className="list-disc pl-4 space-y-2">
                                    <li>Ensure all interactive elements are focusable</li>
                                    <li>Maintain logical tab order</li>
                                    <li>Provide visible focus indicators</li>
                                    <li>Support standard keyboard shortcuts</li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Color Contrast</h3>
                            <div className="prose max-w-none">
                                <ul className="list-disc pl-4 space-y-2">
                                    <li>Maintain WCAG 2.1 AA contrast ratios</li>
                                    <li>Test text legibility on different backgrounds</li>
                                    <li>Provide sufficient contrast for interactive elements</li>
                                    <li>Don't rely on color alone to convey meaning</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Responsive Design */}
                <section className="space-y-8" data-name="responsive">
                    <h2 className="text-3xl font-bold">Responsive Design</h2>
                    
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Breakpoints</h3>
                            <CodeBlock code={`
/* Breakpoints */
sm: '640px'   // Small devices
md: '768px'   // Medium devices
lg: '1024px'  // Large devices
xl: '1280px'  // Extra large devices
2xl: '1536px' // 2X Large devices
                            `.trim()} />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Mobile-First Approach</h3>
                            <CodeBlock code={`
/* Base styles (mobile) */
.element {
    width: 100%;
}

/* Tablet and up */
@media (min-width: 768px) {
    .element {
        width: 50%;
    }
}

/* Desktop and up */
@media (min-width: 1024px) {
    .element {
        width: 33.333%;
    }
}
                            `.trim()} />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Responsive Images</h3>
                            <CodeBlock code={`
<!-- Responsive image -->
<img 
    src="image-sm.jpg"
    srcset="image-sm.jpg 300w,
            image-md.jpg 600w,
            image-lg.jpg 900w"
    sizes="(max-width: 768px) 100vw,
           (max-width: 1024px) 50vw,
           33vw"
    alt="Responsive image"
>
                            `.trim()} />
                        </div>
                    </div>
                </section>

                {/* Performance */}
                <section className="space-y-8" data-name="performance">
                    <h2 className="text-3xl font-bold">Performance Guidelines</h2>
                    
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Image Optimization</h3>
                            <div className="prose max-w-none">
                                <ul className="list-disc pl-4 space-y-2">
                                    <li>Use appropriate image formats (WebP with fallbacks)</li>
                                    <li>Implement responsive images with srcset</li>
                                    <li>Optimize image file sizes</li>
                                    <li>Use lazy loading for images below the fold</li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">CSS Best Practices</h3>
                            <div className="prose max-w-none">
                                <ul className="list-disc pl-4 space-y-2">
                                    <li>Minimize specificity</li>
                                    <li>Group related styles</li>
                                    <li>Use efficient selectors</li>
                                    <li>Avoid redundant styles</li>
                                </ul>
                            </div>
                            <CodeBlock code={`
/* Good */
.button { }
.button.primary { }

/* Avoid */
#header button.button-primary { }
                            `.trim()} />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">JavaScript Performance</h3>
                            <div className="prose max-w-none">
                                <ul className="list-disc pl-4 space-y-2">
                                    <li>Use event delegation for multiple listeners</li>
                                    <li>Debounce scroll and resize events</li>
                                    <li>Avoid unnecessary re-renders</li>
                                    <li>Implement code splitting</li>
                                </ul>
                            </div>
                            <CodeBlock code={`
// Event Delegation Example
document.addEventListener('click', (e) => {
    if (e.target.matches('.button')) {
        handleClick(e);
    }
});

// Debounce Example
const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};
                            `.trim()} />
                        </div>
                    </div>
                </section>

                {/* Browser Support */}
                <section className="space-y-8" data-name="browser-support">
                    <h2 className="text-3xl font-bold">Browser Support</h2>
                    
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Supported Browsers</h3>
                            <div className="prose max-w-none">
                                <ul className="list-disc pl-4 space-y-2">
                                    <li>Chrome (last 2 versions)</li>
                                    <li>Firefox (last 2 versions)</li>
                                    <li>Safari (last 2 versions)</li>
                                    <li>Edge (last 2 versions)</li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Fallback Strategies</h3>
                            <CodeBlock code={`
/* CSS Fallbacks */
.element {
    display: flex;
    display: -webkit-flex; /* Safari */
}

/* Feature Detection */
if ('IntersectionObserver' in window) {
    // Use IntersectionObserver
} else {
    // Fallback behavior
}
                            `.trim()} />
                        </div>
                    </div>
                </section>
            </div>
        );
    } catch (error) {
        console.error('Guidelines component error:', error);
        reportError(error);
        return null;
    }
}

export default Guidelines;

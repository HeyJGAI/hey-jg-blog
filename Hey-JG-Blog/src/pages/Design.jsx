import React from 'react';
import { reportError } from '../lib/errorReporter';
import Home from './Home';

function Design() {
    try {
        const [activeSection, setActiveSection] = React.useState('overview');

        const sections = [
            { id: 'overview', label: 'Overview' },
            { id: 'typography', label: 'Typography' },
            { id: 'colors', label: 'Colors' },
            { id: 'components', label: 'Components' },
            { id: 'patterns', label: 'Patterns' }
        ];

        const ColorBlock = ({ color, name, hex }) => (
            <div className="space-y-2" data-name={`color-${name.toLowerCase()}`}>
                <div 
                    className="h-20 rounded-lg"
                    style={{ backgroundColor: hex }}
                ></div>
                <p className="font-medium text-sm">{name}</p>
                <p className="text-sm text-gray-500">{hex}</p>
            </div>
        );

        const ComponentDemo = ({ title, children }) => (
            <div className="border border-gray-200 rounded-lg overflow-hidden" data-name="component-demo">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
                    <h3 className="text-sm font-medium">{title}</h3>
                </div>
                <div className="p-4">
                    {children}
                </div>
            </div>
        );

        const renderSection = () => {
            switch (activeSection) {
                case 'overview':
                    return (
                        <div className="space-y-12" data-name="overview-section">
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold">Design System Overview</h2>
                                <p className="text-lg text-gray-600 max-w-3xl">
                                    This design system provides a comprehensive set of guidelines, components, and patterns 
                                    used across our portal. It ensures consistency and efficiency in our design and development process.
                                </p>
                            </section>

                            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {sections.map(section => (
                                    section.id !== 'overview' && (
                                        <button
                                            key={section.id}
                                            onClick={() => setActiveSection(section.id)}
                                            className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                                        >
                                            <h3 className="text-xl font-semibold mb-2">{section.label}</h3>
                                            <p className="text-gray-600">
                                                Explore our {section.label.toLowerCase()} guidelines and examples.
                                            </p>
                                        </button>
                                    )
                                ))}
                            </section>
                        </div>
                    );

                case 'typography':
                    return (
                        <div className="space-y-12" data-name="typography-section">
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold">Typography</h2>
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold">Headings</h3>
                                        <div className="space-y-4 bg-white p-6 rounded-lg border border-gray-200">
                                            <h1 className="text-6xl font-bold">H1 Heading - 64px</h1>
                                            <h2 className="text-5xl font-bold">H2 Heading - 48px</h2>
                                            <h3 className="text-4xl font-bold">H3 Heading - 36px</h3>
                                            <h4 className="text-3xl font-bold">H4 Heading - 24px</h4>
                                            <h5 className="text-2xl font-bold">H5 Heading - 20px</h5>
                                            <h6 className="text-xl font-bold">H6 Heading - 16px</h6>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold">Body Text</h3>
                                        <div className="space-y-4 bg-white p-6 rounded-lg border border-gray-200">
                                            <p className="text-2xl">Large Text - 24px</p>
                                            <p className="text-lg">Medium Text - 18px</p>
                                            <p>Regular Text - 16px</p>
                                            <p className="text-sm">Small Text - 14px</p>
                                            <p className="text-xs">Extra Small Text - 12px</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold">Font Weights</h3>
                                        <div className="space-y-4 bg-white p-6 rounded-lg border border-gray-200">
                                            <p className="font-light">Light - 300</p>
                                            <p className="font-normal">Regular - 400</p>
                                            <p className="font-medium">Medium - 500</p>
                                            <p className="font-semibold">Semibold - 600</p>
                                            <p className="font-bold">Bold - 700</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    );

                case 'colors':
                    return (
                        <div className="space-y-12" data-name="colors-section">
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold">Colors</h2>
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold">Primary Colors</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <ColorBlock color="primary" name="Primary" hex="#6c2bd9" />
                                            <ColorBlock color="secondary" name="Secondary" hex="#0a0a1a" />
                                            <ColorBlock color="accent" name="Accent" hex="#E2FF00" />
                                            <ColorBlock color="neutral" name="Neutral" hex="#718096" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold">Status Colors</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <ColorBlock color="success" name="Success" hex="#38a169" />
                                            <ColorBlock color="error" name="Error" hex="#e53e3e" />
                                            <ColorBlock color="warning" name="Warning" hex="#d69e2e" />
                                            <ColorBlock color="info" name="Info" hex="#4299e1" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold">Gray Scale</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <ColorBlock color="gray-100" name="Gray 100" hex="#f7fafc" />
                                            <ColorBlock color="gray-300" name="Gray 300" hex="#e2e8f0" />
                                            <ColorBlock color="gray-500" name="Gray 500" hex="#718096" />
                                            <ColorBlock color="gray-700" name="Gray 700" hex="#2d3748" />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    );

                case 'components':
                    return (
                        <div className="space-y-12" data-name="components-section">
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold">Components</h2>
                                <div className="space-y-8">
                                    {/* Buttons */}
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold">Buttons</h3>
                                        <ComponentDemo title="Button Variants">
                                            <div className="flex flex-wrap gap-4">
                                                <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                                                    Primary Button
                                                </button>
                                                <button className="px-6 py-3 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors">
                                                    Secondary Button
                                                </button>
                                                <button className="px-6 py-3 bg-black text-white rounded-lg opacity-50 cursor-not-allowed">
                                                    Disabled
                                                </button>
                                                <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                                                    <i className="fas fa-plus mr-2"></i>
                                                    With Icon
                                                </button>
                                            </div>
                                        </ComponentDemo>
                                    </div>

                                    {/* Form Elements */}
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold">Form Elements</h3>
                                        <ComponentDemo title="Form Controls">
                                            <div className="space-y-4 max-w-md">
                                                <div>
                                                    <label className="block text-sm font-medium mb-1">
                                                        Text Input
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                                                        placeholder="Enter text"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-1">
                                                        Select Input
                                                    </label>
                                                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none">
                                                        <option value="">Select option</option>
                                                        <option value="1">Option 1</option>
                                                        <option value="2">Option 2</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-1">
                                                        Textarea
                                                    </label>
                                                    <textarea
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                                                        rows="3"
                                                        placeholder="Enter text"
                                                    ></textarea>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            className="w-4 h-4 border-gray-300 rounded"
                                                        />
                                                        <span>Checkbox</span>
                                                    </label>
                                                    <label className="flex items-center gap-2">
                                                        <input
                                                            type="radio"
                                                            name="radio-group"
                                                            className="w-4 h-4 border-gray-300"
                                                        />
                                                        <span>Radio Button</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </ComponentDemo>
                                    </div>

                                    {/* Cards */}
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold">Cards</h3>
                                        <ComponentDemo title="Card Variants">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                                    <div className="p-6">
                                                        <h4 className="text-xl font-semibold mb-2">Basic Card</h4>
                                                        <p className="text-gray-600">
                                                            A simple card with title and content.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                                                    <img
                                                        src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&h=200"
                                                        alt="Card image"
                                                        className="w-full h-32 object-cover"
                                                    />
                                                    <div className="p-6">
                                                        <h4 className="text-xl font-semibold mb-2">Media Card</h4>
                                                        <p className="text-gray-600">
                                                            A card with image and hover effect.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </ComponentDemo>
                                    </div>
                                </div>
                            </section>
                        </div>
                    );

                case 'patterns':
                    return (
                        <div className="space-y-12" data-name="patterns-section">
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold">Patterns</h2>
                                <div className="space-y-8">
                                    {/* Layout Patterns */}
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold">Layout Patterns</h3>
                                        <ComponentDemo title="Grid Layout">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {[1, 2, 3].map(n => (
                                                    <div key={n} className="bg-gray-100 p-4 rounded-lg text-center">
                                                        Grid Item {n}
                                                    </div>
                                                ))}
                                            </div>
                                        </ComponentDemo>
                                    </div>

                                    {/* Animation Patterns */}
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold">Animation Patterns</h3>
                                        <ComponentDemo title="Transitions & Animations">
                                            <div className="flex flex-wrap gap-8">
                                                <button className="px-6 py-3 bg-black text-white rounded-lg transition-all duration-300 hover:bg-gray-800 hover:transform hover:scale-105">
                                                    Hover Scale
                                                </button>
                                                <div className="animate-spin h-8 w-8 border-4 border-black border-t-transparent rounded-full">
                                                </div>
                                                <div className="animate-pulse h-8 w-8 bg-black rounded-full">
                                                </div>
                                            </div>
                                        </ComponentDemo>
                                    </div>

                                    {/* Navigation Patterns */}
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold">Navigation Patterns</h3>
                                        <ComponentDemo title="Navigation Examples">
                                            <div className="space-y-8">
                                                {/* Breadcrumbs */}
                                                <div className="flex items-center gap-2 text-sm">
                                                    <a href="#" className="text-gray-600 hover:text-black">Home</a>
                                                    <i className="fas fa-chevron-right text-gray-400"></i>
                                                    <a href="#" className="text-gray-600 hover:text-black">Section</a>
                                                    <i className="fas fa-chevron-right text-gray-400"></i>
                                                    <span className="text-black">Current</span>
                                                </div>

                                                {/* Tabs */}
                                                <div className="border-b border-gray-200">
                                                    <div className="flex gap-4">
                                                        <button className="px-4 py-2 border-b-2 border-black">
                                                            Active Tab
                                                        </button>
                                                        <button className="px-4 py-2 border-b-2 border-transparent text-gray-600 hover:text-black">
                                                            Inactive Tab
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </ComponentDemo>
                                    </div>
                                </div>
                            </section>
                        </div>
                    );

                default:
                    return null;
            }
        };

        return (
            <div className="min-h-screen bg-white pt-24" data-name="design-page">
                <div className="max-w-7xl mx-auto px-4 pb-32">
                    <div className="mb-12">
                        <h1 className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6vw] font-bold tracking-tight leading-none">
                            DESIGN SYSTEM
                        </h1>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Navigation */}
                        <div className="lg:w-64 flex-shrink-0" data-name="design-nav">
                            <div className="space-y-2 sticky top-24">
                                {sections.map(section => (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`w-full text-left px-6 py-4 rounded-lg transition-colors ${
                                            activeSection === section.id
                                                ? 'bg-black text-white'
                                                : 'text-gray-600 hover:text-black'
                                        }`}
                                        data-name={`nav-${section.id}`}
                                    >
                                        {section.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-grow" data-name="design-content">
                            {renderSection()}
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Design page error:', error);
        reportError(error);
        return null;
    }
}

export default Design;

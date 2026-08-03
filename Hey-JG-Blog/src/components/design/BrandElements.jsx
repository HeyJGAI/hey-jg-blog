import React from 'react';
import { reportError } from '../../lib/errorReporter';

function BrandElements({ ColorBlock, CodeBlock, ComponentPreview }) {
    try {
        return (
            <div className="space-y-16" data-name="brand-elements">
                {/* Color System */}
                <section className="space-y-8" data-name="color-system">
                    <h2 className="text-3xl font-bold">Color System</h2>
                    
                    <div className="space-y-8">
                        {/* Primary Colors */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Primary Colors</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                <ColorBlock
                                    color="primary"
                                    name="Primary"
                                    hex="#6c2bd9"
                                    usage="Main brand color, primary actions"
                                />
                                <ColorBlock
                                    color="secondary"
                                    name="Secondary"
                                    hex="#0a0a1a"
                                    usage="Secondary elements, backgrounds"
                                />
                                <ColorBlock
                                    color="accent"
                                    name="Accent"
                                    hex="#E2FF00"
                                    usage="Highlights, focus states"
                                />
                            </div>
                        </div>

                        {/* Text Colors */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Text Colors</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                <ColorBlock
                                    color="text-primary"
                                    name="Text Primary"
                                    hex="#ffffff"
                                    usage="Main text color on dark backgrounds"
                                />
                                <ColorBlock
                                    color="text-secondary"
                                    name="Text Secondary"
                                    hex="#a0aec0"
                                    usage="Secondary text, subtitles"
                                />
                            </div>
                        </div>

                        {/* Status Colors */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Status Colors</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                <ColorBlock
                                    color="success"
                                    name="Success"
                                    hex="#38a169"
                                    usage="Success states, confirmations"
                                />
                                <ColorBlock
                                    color="error"
                                    name="Error"
                                    hex="#e53e3e"
                                    usage="Error states, destructive actions"
                                />
                                <ColorBlock
                                    color="warning"
                                    name="Warning"
                                    hex="#d69e2e"
                                    usage="Warning states, cautionary actions"
                                />
                                <ColorBlock
                                    color="info"
                                    name="Info"
                                    hex="#4299e1"
                                    usage="Information states, help text"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Typography */}
                <section className="space-y-8" data-name="typography">
                    <h2 className="text-3xl font-bold">Typography</h2>
                    
                    <div className="space-y-8">
                        {/* Font Family */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Font Family</h3>
                            <p className="font-['Google_Sans'] text-2xl">
                                Google Sans - Primary Font
                            </p>
                            <CodeBlock code={`
font-family: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
            Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                            `.trim()} />
                        </div>

                        {/* Type Scale */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Type Scale</h3>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h1 className="text-6xl font-bold">Heading 1 - 64px</h1>
                                    <h2 className="text-5xl font-bold">Heading 2 - 48px</h2>
                                    <h3 className="text-4xl font-bold">Heading 3 - 36px</h3>
                                    <h4 className="text-3xl font-bold">Heading 4 - 24px</h4>
                                    <h5 className="text-2xl font-bold">Heading 5 - 20px</h5>
                                    <h6 className="text-xl font-bold">Heading 6 - 16px</h6>
                                </div>
                            </div>
                        </div>

                        {/* Font Weights */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Font Weights</h3>
                            <div className="space-y-2">
                                <p className="font-light">Light - 300</p>
                                <p className="font-normal">Regular - 400</p>
                                <p className="font-medium">Medium - 500</p>
                                <p className="font-semibold">Semibold - 600</p>
                                <p className="font-bold">Bold - 700</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Spacing */}
                <section className="space-y-8" data-name="spacing">
                    <h2 className="text-3xl font-bold">Spacing System</h2>
                    
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Base Spacing Units</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-4 h-4 bg-gray-200"></div>
                                    <span>4px - Extra Small (xs)</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 bg-gray-200"></div>
                                    <span>8px - Small (sm)</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gray-200"></div>
                                    <span>16px - Medium (md)</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-24 h-24 bg-gray-200"></div>
                                    <span>24px - Large (lg)</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-32 h-32 bg-gray-200"></div>
                                    <span>32px - Extra Large (xl)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    } catch (error) {
        console.error('BrandElements component error:', error);
        reportError(error);
        return null;
    }
}

export default BrandElements;

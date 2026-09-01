import React from 'react';
import { reportError } from '../../lib/errorReporter';

function UIComponents({ ComponentPreview, CodeBlock }) {
    try {
        return (
            <div className="space-y-16" data-name="ui-components">
                {/* Buttons */}
                <section className="space-y-8" data-name="buttons">
                    <h2 className="text-3xl font-bold">Buttons</h2>
                    
                    <div className="space-y-8">
                        {/* Primary Buttons */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Primary Buttons</h3>
                            <ComponentPreview title="Primary Button Variants">
                                <div className="flex flex-wrap gap-4">
                                    <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                                        Primary Button
                                    </button>
                                    <button className="px-6 py-3 bg-black text-white rounded-lg opacity-50 cursor-not-allowed">
                                        Disabled
                                    </button>
                                    <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                                        <i className="fas fa-plus mr-2"></i>
                                        With Icon
                                    </button>
                                </div>
                            </ComponentPreview>
                            <CodeBlock code={`
<button class="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 
              transition-colors">
    Primary Button
</button>
                            `.trim()} />
                        </div>

                        {/* Secondary Buttons */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Secondary Buttons</h3>
                            <ComponentPreview title="Secondary Button Variants">
                                <div className="flex flex-wrap gap-4">
                                    <button className="px-6 py-3 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors">
                                        Secondary Button
                                    </button>
                                    <button className="px-6 py-3 border-2 border-black rounded-lg opacity-50 cursor-not-allowed">
                                        Disabled
                                    </button>
                                </div>
                            </ComponentPreview>
                        </div>

                        {/* Icon Buttons */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Icon Buttons</h3>
                            <ComponentPreview title="Icon Button Variants">
                                <div className="flex flex-wrap gap-4">
                                    <button className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                                        <i className="fas fa-plus"></i>
                                    </button>
                                    <button className="w-12 h-12 flex items-center justify-center border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors">
                                        <i className="fas fa-edit"></i>
                                    </button>
                                </div>
                            </ComponentPreview>
                        </div>
                    </div>
                </section>

                {/* Form Elements */}
                <section className="space-y-8" data-name="form-elements">
                    <h2 className="text-3xl font-bold">Form Elements</h2>
                    
                    <div className="space-y-8">
                        {/* Text Inputs */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Text Inputs</h3>
                            <ComponentPreview title="Text Input Variants">
                                <div className="space-y-4 max-w-md">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Standard Input
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                                            placeholder="Enter text"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Disabled Input
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                                            placeholder="Disabled input"
                                            disabled
                                        />
                                    </div>
                                </div>
                            </ComponentPreview>
                        </div>

                        {/* Select */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Select</h3>
                            <ComponentPreview title="Select Input">
                                <div className="max-w-md">
                                    <label className="block text-sm font-medium mb-1">
                                        Category
                                    </label>
                                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none">
                                        <option value="">Select category</option>
                                        <option value="1">Category 1</option>
                                        <option value="2">Category 2</option>
                                        <option value="3">Category 3</option>
                                    </select>
                                </div>
                            </ComponentPreview>
                        </div>

                        {/* Checkboxes & Radio */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Checkboxes & Radio Buttons</h3>
                            <ComponentPreview title="Checkbox & Radio Examples">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 border-gray-300 rounded"
                                            />
                                            <span>Checkbox option</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 border-gray-300 rounded"
                                                checked
                                                readOnly
                                            />
                                            <span>Checked checkbox</span>
                                        </label>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="radio-group"
                                                className="w-4 h-4 border-gray-300"
                                            />
                                            <span>Radio option 1</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="radio-group"
                                                className="w-4 h-4 border-gray-300"
                                                checked
                                                readOnly
                                            />
                                            <span>Radio option 2</span>
                                        </label>
                                    </div>
                                </div>
                            </ComponentPreview>
                        </div>
                    </div>
                </section>

                {/* Cards */}
                <section className="space-y-8" data-name="cards">
                    <h2 className="text-3xl font-bold">Cards</h2>
                    
                    <div className="space-y-8">
                        {/* Basic Card */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Basic Card</h3>
                            <ComponentPreview title="Basic Card">
                                <div className="max-w-md bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="p-6">
                                        <h4 className="text-xl font-semibold mb-2">Card Title</h4>
                                        <p className="text-gray-600">
                                            This is a basic card component with a title and content.
                                        </p>
                                    </div>
                                </div>
                            </ComponentPreview>
                        </div>

                        {/* Interactive Card */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Interactive Card</h3>
                            <ComponentPreview title="Interactive Card">
                                <div className="max-w-md bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                                    <div className="p-6">
                                        <h4 className="text-xl font-semibold mb-2">Interactive Card</h4>
                                        <p className="text-gray-600">
                                            This card has hover and click interactions.
                                        </p>
                                    </div>
                                </div>
                            </ComponentPreview>
                        </div>

                        {/* Media Card */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Media Card</h3>
                            <ComponentPreview title="Media Card">
                                <div className="max-w-md bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&h=400"
                                        alt="Card image"
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6">
                                        <h4 className="text-xl font-semibold mb-2">Media Card</h4>
                                        <p className="text-gray-600">
                                            This card includes an image and content below it.
                                        </p>
                                    </div>
                                </div>
                            </ComponentPreview>
                        </div>
                    </div>
                </section>
            </div>
        );
    } catch (error) {
        console.error('UIComponents component error:', error);
        reportError(error);
        return null;
    }
}

export default UIComponents;

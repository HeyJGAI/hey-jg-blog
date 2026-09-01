import React from 'react';
import { reportError } from '../lib/errorReporter';

function TextFormatToolbar({ onFormat, onImageClick, onHyperlinkClick }) {
    try {
        const formats = [
            { label: 'Heading', format: '## ', icon: 'fa-heading' },
            { label: 'Bold', format: '**', icon: 'fa-bold' },
            { label: 'Quote', format: '> ', icon: 'fa-quote-left' },
            { label: 'Code', format: '\n', icon: 'fa-code' }
        ];

        const handleFormatClick = (e, format) => {
            e.preventDefault();
            onFormat(format);
        };

        return (
            <div className="flex flex-wrap gap-2 mb-4" data-name="format-toolbar">
                {formats.map((item) => (
                    <button
                        key={item.label}
                        onClick={(e) => handleFormatClick(e, item.format)}
                        className="format-button px-3 py-1 rounded text-sm flex items-center gap-2"
                        data-name={`format-${item.label.toLowerCase()}`}
                        type="button"
                        title={item.label}
                    >
                        <i className={`fas ${item.icon}`}></i>
                    </button>
                ))}
                <button
                    onClick={onImageClick}
                    className="format-button px-3 py-1 rounded text-sm flex items-center gap-2"
                    data-name="format-image"
                    type="button"
                    title="Insert Image"
                >
                    <i className="fas fa-image"></i>
                </button>
                <button
                    onClick={onHyperlinkClick}
                    className="format-button px-3 py-1 rounded text-sm flex items-center gap-2"
                    data-name="format-hyperlink"
                    type="button"
                    title="Insert Hyperlink"
                >
                    <i className="fas fa-link"></i>
                </button>
            </div>
        );
    } catch (error) {
        console.error('TextFormatToolbar component error:', error);
        reportError(error);
        return null;
    }
}

export default TextFormatToolbar;

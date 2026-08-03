import React from 'react';
import { trickleGetObject } from '../lib/dataClient';
import { reportError } from '../lib/errorReporter';

function Footer() {
    try {
        const [hfContent, setHFContent] = React.useState({
            footerLogoUrl: 'https://jg-eis.com/logo_white.png',
            footerContent: "If you're <span class=\"font-extrabold\">HUM<span class=\"text-[#F8F8F8]\">AI</span>N</span> (human interested in AI for productivity), call me <a href=\"/about\" class=\"text-[#E2FF00] hover:opacity-80 transition-opacity\">Hey J G</a>. We can sit and explore AI together. I don't have all the answers, but I've got plenty of questions and a budget for our unlimited strong <span class=\"bg-[#E2FF00] text-black px-1\">filter coffee</span>",
            linkedinUrl: 'https://www.linkedin.com/in/ananth-jg/',
            discordUrl: 'https://discord.com'
        });

        React.useEffect(() => {
            loadHFContent();
            
            // Listen for HF content updates
            window.addEventListener('hfContentUpdated', handleHFContentUpdate);
            return () => {
                window.removeEventListener('hfContentUpdated', handleHFContentUpdate);
                console.log('Footer unmounting - Cleanup complete');
            };
        }, []);

        const loadHFContent = async () => {
            try {
                console.log('Fetching HF content for footer');
                const response = await trickleGetObject('site-settings', 'hf-content');
                
                console.log('HF Content Response:', response);

                if (response?.objectData) {
                    setHFContent({
                        footerLogoUrl: response.objectData.footerLogoUrl || 'https://jg-eis.com/logo_white.png',
                        footerContent: response.objectData.footerContent || '',
                        linkedinUrl: response.objectData.linkedinUrl || 'https://www.linkedin.com/in/ananth-jg/',
                        discordUrl: response.objectData.discordUrl || 'https://discord.com'
                    });
                    
                    console.log('Footer Content Updated');
                }
            } catch (err) {
                console.error('Error fetching HF content for footer:', err);
            }
        };

        const handleHFContentUpdate = (event) => {
            console.log('Footer received HF content update');
            console.log('New Footer Data:', event.detail);

            setHFContent({
                footerLogoUrl: event.detail.footerLogoUrl || 'https://jg-eis.com/logo_white.png',
                footerContent: event.detail.footerContent || '',
                linkedinUrl: event.detail.linkedinUrl || 'https://www.linkedin.com/in/ananth-jg/',
                discordUrl: event.detail.discordUrl || 'https://discord.com'
            });
        };

        return (
            <footer className="bg-black py-32" data-name="footer">
                <div className="content-wrapper">
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8" data-name="footer-content">
                        <div className="w-full md:w-1/3" data-name="footer-logo">
                            <img 
                                src={hfContent.footerLogoUrl} 
                                alt="J G Logo" 
                                className="w-64 h-auto"
                                onError={(e) => {
                                    e.target.src = 'https://jg-eis.com/logo_white.png';
                                    console.warn('Footer logo load failed, using fallback');
                                }}
                            />
                        </div>
                        
                        <div className="w-full md:w-2/3 text-white" data-name="footer-text">
                            <p className="text-4xl font-normal leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: hfContent.footerContent }}>
                            </p>
                            
                            <div className="flex flex-col md:flex-row items-center justify-start gap-4" data-name="footer-bottom">
                                <p className="text-sm">© 2025 Hey J G</p>
                                <div className="flex items-center gap-4" data-name="social-links">
                                    <a 
                                        href={hfContent.linkedinUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white hover:opacity-75 transition-opacity"
                                        data-name="linkedin-link"
                                    >
                                        <i className="fab fa-linkedin text-xl"></i>
                                    </a>
                                    <a 
                                        href={hfContent.discordUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white hover:opacity-75 transition-opacity"
                                        data-name="discord-link"
                                    >
                                        <i className="fab fa-discord text-xl"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    } catch (error) {
        console.error('Footer component error:', error);
        reportError(error);
        return null;
    }
}

export default Footer;

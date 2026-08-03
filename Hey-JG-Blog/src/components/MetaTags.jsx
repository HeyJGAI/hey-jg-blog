import React from 'react';
import { reportError } from '../lib/errorReporter';
import Coffee from '../pages/Coffee';

function MetaTags() {
    try {
        React.useEffect(() => {
            const title = 'Hey J G';
            const description = 'Keeping AI in the Loop and not other way';
            
            document.title = title;
            updateMetaTag('description', description);
            updateMetaTag('keywords', 'AI Tools, AX, Stories, Data, Projects, Coffee');
            updateMetaTag('og:title', title);
            updateMetaTag('og:description', description);
            updateMetaTag('twitter:title', title);
            updateMetaTag('twitter:description', description);
        }, []);

        const updateMetaTag = (name, content) => {
            let meta = document.querySelector(`meta[name="${name}"]`) || 
                      document.querySelector(`meta[property="${name}"]`);
            
            if (!meta) {
                meta = document.createElement('meta');
                if (name.startsWith('og:')) {
                    meta.setAttribute('property', name);
                } else {
                    meta.setAttribute('name', name);
                }
                document.head.appendChild(meta);
            }
            
            meta.setAttribute('content', content);
        };

        return null;
    } catch (error) {
        console.error('MetaTags component error:', error);
        reportError(error);
        return null;
    }
}

export default MetaTags;

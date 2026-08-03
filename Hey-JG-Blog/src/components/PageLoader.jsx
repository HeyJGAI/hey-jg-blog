import React from 'react';
import Footer from './Footer';
import { reportError } from '../lib/errorReporter';

function PageLoader() {
    try {
        const [progress, setProgress] = React.useState(0);
        const [opacity, setOpacity] = React.useState(1);
        const [visible, setVisible] = React.useState(true);
        const [textVisible, setTextVisible] = React.useState(true);

        React.useEffect(() => {
            const duration = 3000;
            const interval = 16;
            const steps = duration / interval;
            let currentStep = 0;

            const easeInOutQuart = t => t < 0.5
                ? 8 * t * t * t * t
                : 1 - Math.pow(-2 * t + 2, 4) / 2;

            const timer = setInterval(() => {
                currentStep++;
                const rawProgress = currentStep / steps;
                const easedProgress = easeInOutQuart(rawProgress) * 100;
                setProgress(easedProgress);

                if (rawProgress >= 0.85) {
                    const fadeProgress = (rawProgress - 0.85) / 0.15;
                    const easedFade = easeInOutQuart(fadeProgress);
                    setOpacity(1 - easedFade);
                    setTextVisible(false);
                }

                if (rawProgress >= 1) {
                    clearInterval(timer);
                    setTimeout(() => {
                        setVisible(false);
                    }, 800);
                }
            }, interval);

            return () => clearInterval(timer);
        }, []);

        if (!visible) return null;

        return (
            <div 
                className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-between overflow-hidden"
                style={{
                    transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: opacity
                }}
                data-name="page-loader"
            >
                {/* Empty top space for vertical centering */}
                <div className="flex-1"></div>

                {/* Main content */}
                <div 
                    className="relative w-full max-w-2xl mx-auto px-4"
                    data-name="loader-content"
                >
                    <div 
                        className="text-center mb-8 transition-all duration-500"
                        style={{
                            opacity: textVisible ? 1 : 0,
                            transform: textVisible ? 'translateY(0)' : 'translateY(-20px)'
                        }}
                        data-name="loader-text"
                    >
                        <h1 className="text-7xl font-bold tracking-tighter mb-2">
                            <span className="text-[#2B2B2B]">HUM</span>
                            <span className="text-[#4F4E53]">AI</span>
                            <span className="text-[#2B2B2B]">N</span>
                        </h1>
                        <p className="text-[#808080] text-xl font-light">Fumbles on AI fundamentals</p>
                    </div>

                    <div 
                        className="relative h-[2px] bg-transparent overflow-hidden"
                        data-name="loader-bar-container"
                    >
                        <div 
                            className="absolute top-0 left-0 h-full bg-[#E2FF00] animate-pulse"
                            style={{ 
                                width: `${progress}%`,
                                boxShadow: '0 0 10px rgba(226, 255, 0, 0.5)',
                                transition: 'width 0.3s ease-out'
                            }}
                            data-name="loader-bar"
                        >
                            <div 
                                className="absolute left-0 top-0 h-full w-full animate-shimmer"
                                style={{
                                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                                    animation: 'shimmer 1.5s infinite'
                                }}
                                data-name="loader-shimmer"
                            ></div>
                        </div>
                    </div>

                    <style>
                        {`
                        @keyframes shimmer {
                            0% {
                                transform: translateX(-100%);
                            }
                            100% {
                                transform: translateX(100%);
                            }
                        }
                        `}
                    </style>
                </div>

                {/* Footer */}
                <div 
                    className="w-full py-8 text-center transition-all duration-500 mt-auto"
                    style={{
                        opacity: textVisible ? 1 : 0,
                        transform: textVisible ? 'translateY(0)' : 'translateY(20px)'
                    }}
                    data-name="loader-footer"
                >
                    <p className="text-white/50 text-sm">© 2025 Hey J G</p>
                </div>
            </div>
        );
    } catch (error) {
        console.error('PageLoader component error:', error);
        reportError(error);
        return null;
    }
}

export default PageLoader;

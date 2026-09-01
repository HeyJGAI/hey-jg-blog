import React from 'react';

const TAGS = {
    AI_TOOLS: 'AI Tools',
    STORIES: 'Stories',
    JG_Y: 'J G & @Y'
};

const TAG_COLORS = {
    [TAGS.AI_TOOLS]: 'bg-blue-100 text-blue-800',
    [TAGS.STORIES]: 'bg-green-100 text-green-800',
    [TAGS.JG_Y]: 'bg-yellow-100 text-yellow-800'
};

const DEFAULT_HERO_IMAGE = 'https://images.unsplash.com/photo-1675426513149-3f240125a0d9?fit=crop&w=1500&h=900';

const ROUTES = {
    HOME: '/',
    ABOUT: '/about',
    COFFEE: '/coffee',
    ADMIN: '/admin',
    ADMIN_SETTINGS: '/admin/settings',
    ADMIN_NEW: '/admin/new',
    POST: '/post'
};

const theme = {
    colors: {
        primary: {
            light: '#E2FF00',
            main: '#000000',
            dark: '#000000',
            contrastText: '#ffffff'
        },
        secondary: {
            light: '#1a1a2a',
            main: '#0a0a1a',
            dark: '#050510',
            contrastText: '#ffffff'
        },
        success: {
            light: '#48bb78',
            main: '#38a169',
            dark: '#2f855a',
            contrastText: '#ffffff'
        },
        warning: {
            light: '#ecc94b',
            main: '#d69e2e',
            dark: '#b7791f',
            contrastText: '#000000'
        },
        error: {
            light: '#fc8181',
            main: '#e53e3e',
            dark: '#c53030',
            contrastText: '#ffffff'
        },
        info: {
            light: '#63b3ed',
            main: '#4299e1',
            dark: '#3182ce',
            contrastText: '#ffffff'
        },
        grey: {
            50: '#f7fafc',
            100: '#edf2f7',
            200: '#e2e8f0',
            300: '#cbd5e0',
            400: '#a0aec0',
            500: '#718096',
            600: '#4a5568',
            700: '#2d3748',
            800: '#1a202c',
            900: '#171923',
        },
        text: {
            primary: '#ffffff',
            secondary: '#a0aec0',
            disabled: '#4a5568',
        },
        background: {
            default: '#0a0a1a',
            paper: 'rgba(0, 0, 0, 0.3)',
        },
        divider: 'rgba(255, 255, 255, 0.1)',
    },

    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
    },

    typography: {
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
        h1: {
            fontSize: {
                mobile: '32px',
                desktop: '64px'
            },
            fontWeight: 700,
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
        },
        h2: {
            fontSize: {
                mobile: '28px',
                desktop: '56px'
            },
            fontWeight: 700,
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
        },
        h3: {
            fontSize: {
                mobile: '24px',
                desktop: '48px'
            },
            fontWeight: 600,
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
        },
        h4: {
            fontSize: {
                mobile: '20px',
                desktop: '32px'
            },
            fontWeight: 600,
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
        },
        h5: {
            fontSize: {
                mobile: '18px',
                desktop: '24px'
            },
            fontWeight: 600,
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
        },
        h6: {
            fontSize: {
                mobile: '16px',
                desktop: '20px'
            },
            fontWeight: 600,
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
        },
        body1: {
            fontSize: {
                mobile: '16px',
                desktop: '18px'
            },
            fontWeight: 400,
            letterSpacing: '0',
            lineHeight: 1.5,
        },
        body2: {
            fontSize: {
                mobile: '14px',
                desktop: '16px'
            },
            fontWeight: 400,
            letterSpacing: '0',
            lineHeight: 1.5,
        },
        caption: {
            fontSize: {
                mobile: '12px',
                desktop: '14px'
            },
            fontWeight: 400,
            letterSpacing: '0',
            lineHeight: 1.5,
        }
    },

    borderRadius: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        xxl: '24px',
        round: '50%',
    },

    shadows: {
        sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
    },

    transitions: {
        easing: {
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
            sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
        },
        duration: {
            shortest: 150,
            shorter: 200,
            short: 250,
            standard: 300,
            complex: 375,
            enteringScreen: 225,
            leavingScreen: 195,
        },
    },

    breakpoints: {
        xs: '0px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
    },

    zIndex: {
        mobileStepper: 1000,
        speedDial: 1050,
        appBar: 1100,
        drawer: 1200,
        modal: 1300,
        snackbar: 1400,
        tooltip: 1500,
    },
};

export { TAGS, TAG_COLORS, DEFAULT_HERO_IMAGE, ROUTES, theme };

import React from 'react';
import { login } from '../lib/auth';
import { reportError } from '../lib/errorReporter';

function AdminLogin({ onLogin }) {
    try {
        const [password, setPassword] = React.useState('');
        const [error, setError] = React.useState('');
        const [isAnimating, setIsAnimating] = React.useState(false);
        const [pageLoaded, setPageLoaded] = React.useState(false);
        const [contentVisible, setContentVisible] = React.useState(false);

        React.useEffect(() => {
            setPassword('');
            setTimeout(() => setPageLoaded(true), 100);
            setTimeout(() => setContentVisible(true), 600);
        }, []);

        const handlePasswordChange = (e) => {
            setPassword(e.target.value);
            setError('');
        };

        // Trickle's original build fired a login attempt on every keystroke once
        // the passcode hit 6 characters. That's fine against a client-side
        // string compare, but against a real (rate-limited) Supabase auth call
        // it would fire a flurry of failed attempts while you're still typing
        // your own password. So this version submits once, on Enter.
        const attemptLogin = async () => {
            if (!password || isAnimating) return;
            setIsAnimating(true);
            setError('');
            try {
                const result = await login(password);
                if (result.success) {
                    setContentVisible(false);
                    setTimeout(() => onLogin(), 500);
                } else {
                    setError('Invalid passcode');
                    setIsAnimating(false);
                }
            } catch (err) {
                console.error('Login error:', err);
                reportError(err);
                setError('An error occurred');
                setIsAnimating(false);
            }
        };

        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                attemptLogin();
            }
        };

        return (
            <div
                className={`min-h-screen bg-[#E2FF00] transition-opacity duration-1000 ${
                    pageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                data-name="admin-login"
            >
                <div className="min-h-screen flex flex-col justify-center px-6 md:px-12">
                    <div
                        className={`max-w-4xl mx-auto transition-all duration-700 ease-out ${
                            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                        data-name="login-content"
                    >
                        <div className="max-w-3xl" data-name="login-text">
                            <div className="text-5xl md:text-6xl lg:text-7xl leading-[1.2] text-black mb-12">
                                Enter your Author's{' '}
                                <span className="relative inline-block">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        onKeyDown={handleKeyDown}
                                        onBlur={attemptLogin}
                                        className="login-input inline-block border-0 border-b-2 border-black/20
                                            focus:border-black outline-none transition-colors text-black"
                                        placeholder="passcode"
                                        required
                                        autoFocus
                                        disabled={isAnimating}
                                        data-lpignore="true"
                                    />
                                    {isAnimating && (
                                        <span className="absolute right-2 top-1/2 -translate-y-1/2">
                                            <i className="fas fa-circle-notch fa-spin text-black/40"></i>
                                        </span>
                                    )}
                                </span>
                            </div>
                            <p className="text-3xl md:text-4xl lg:text-5xl leading-[1.2] text-black mb-16">
                                to share your wisdom to guide humans through the fast evolving AI landscape
                            </p>
                            {error && (
                                <p className="text-sm text-red-500 mt-2" data-name="error-message">
                                    {error}
                                </p>
                            )}
                        </div>

                        <div
                            className={`mt-24 transition-all duration-700 ease-out ${
                                contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                            data-name="login-footer"
                        >
                            <p className="text-sm md:text-base text-black max-w-lg">
                                The Blog platform designed and developed by J G using various AI tools, all wrongs are addressed, all rights are taking shape to next level
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('AdminLogin component error:', error);
        reportError(error);
        return null;
    }
}

export default AdminLogin;

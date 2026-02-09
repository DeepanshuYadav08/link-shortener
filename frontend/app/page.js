'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';

export default function Home() {
    const [url, setUrl] = useState('');
    const [customCode, setCustomCode] = useState('');
    const [useCustomCode, setUseCustomCode] = useState(false);
    const [shortUrl, setShortUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    const handleShorten = async (e) => {
        e.preventDefault();
        setError('');
        setShortUrl('');
        setLoading(true);

        try {
            const payload = { originalUrl: url };
            if (useCustomCode && customCode) {
                payload.customCode = customCode;
            }

            const response = await api.post('/api/url/shorten', payload);
            setShortUrl(response.data.shortUrl);
            setUrl('');
            setCustomCode('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to shorten URL');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-12 animate-slide-up">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        <span className="text-gradient">Shorten Your Links</span>
                    </h1>
                    <p className="text-slate-400 text-xl md:text-2xl mb-8">
                        Create short, memorable links in seconds with our modern URL shortener
                    </p>
                </div>

                {/* URL Shortener Card */}
                <div className="glass-effect rounded-2xl p-8 md:p-12 shadow-2xl mb-12 animate-slide-up">
                    <form onSubmit={handleShorten} className="space-y-6">
                        <div>
                            <label htmlFor="url" className="block text-sm font-medium mb-2 text-slate-300">
                                Enter your long URL
                            </label>
                            <div className="relative">
                                <input
                                    type="url"
                                    id="url"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="https://example.com/very/long/url/that/needs/shortening"
                                    className="w-full px-6 py-4 rounded-xl bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-100 placeholder-slate-500"
                                    required
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Custom Code Section */}
                        <div>
                            <label className="flex items-center gap-2 text-sm text-slate-400 mb-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={useCustomCode}
                                    onChange={(e) => setUseCustomCode(e.target.checked)}
                                    className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900"
                                />
                                <span>Use custom short code (optional)</span>
                            </label>

                            {useCustomCode && (
                                <input
                                    type="text"
                                    value={customCode}
                                    onChange={(e) => setCustomCode(e.target.value)}
                                    placeholder="my-custom-link (3-20 characters)"
                                    className="w-full px-6 py-4 rounded-xl bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-100 placeholder-slate-500"
                                    pattern="[a-zA-Z0-9_-]{3,20}"
                                    title="3-20 characters: letters, numbers, hyphens, underscores only"
                                />
                            )}
                        </div>

                        {error && (
                            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Shortening...
                                </span>
                            ) : (
                                'Shorten URL'
                            )}
                        </button>
                    </form>

                    {/* Result Section */}
                    {shortUrl && (
                        <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 animate-slide-up">
                            <p className="text-sm text-slate-400 mb-2">Your shortened URL:</p>
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={shortUrl}
                                    readOnly
                                    className="flex-1 px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-100 focus:outline-none"
                                />
                                <button
                                    onClick={copyToClipboard}
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                                >
                                    {copied ? (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            Copy
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Features Section */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="glass-effect rounded-xl p-6 text-center hover:scale-105 transition-transform">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
                        <p className="text-slate-400 text-sm">Create short links instantly with our optimized platform</p>
                    </div>

                    <div className="glass-effect rounded-xl p-6 text-center hover:scale-105 transition-transform">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Track Analytics</h3>
                        <p className="text-slate-400 text-sm">Monitor clicks and performance of your links</p>
                    </div>

                    <div className="glass-effect rounded-xl p-6 text-center hover:scale-105 transition-transform">
                        <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
                        <p className="text-slate-400 text-sm">Your data is protected with enterprise-grade security</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

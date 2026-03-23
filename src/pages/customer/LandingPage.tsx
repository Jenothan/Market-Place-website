import React from 'react';
import { Link } from 'react-router-dom';
import {
    ShoppingBag,
    Zap,
    ShieldCheck,
    ArrowRight,
    Check
} from 'lucide-react';
import heroImage from '@/assets/hero_shop.png';

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-blush/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
                                <ShoppingBag className="w-5 h-5 text-mint" />
                            </div>
                            <span className="text-xl font-bold text-navy tracking-tight">WhatsLink.lk</span>
                        </div>
                        <div>
                            <Link
                                to="/login"
                                className="inline-flex items-center px-4 py-2 border border-navy text-sm font-medium rounded-full text-navy hover:bg-navy hover:text-white transition-all duration-300"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-mint rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal rounded-full blur-3xl animate-pulse delay-700" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                        <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-navy leading-[1.1]">
                                Turn your <span className="bg-gradient-to-r from-teal to-navy bg-clip-text text-transparent">WhatsApp</span> into a Shop
                            </h1>
                            <p className="text-lg sm:text-xl text-navy/70 max-w-2xl mx-auto lg:mx-0">
                                Launch your online store in minutes. Sell directly through WhatsApp with a professional catalog and seamless ordering.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                <Link
                                    to="/register"
                                    className="group bg-navy text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-teal transition-all duration-300 shadow-xl shadow-navy/20 flex items-center gap-2"
                                >
                                    Create Free Shop
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <p className="text-sm text-navy/50 font-medium">No credit card required</p>
                            </div>
                        </div>

                        <div className="flex-1 w-full max-w-lg lg:max-w-none animate-in fade-in slide-in-from-right duration-1000">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-mint/20 to-teal/20 rounded-3xl blur-2xl group-hover:opacity-75 transition-opacity" />
                                <img
                                    src={heroImage}
                                    alt="WhatsLink Shop Illustration"
                                    className="relative w-full h-auto rounded-3xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-navy/[0.02]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-4 mb-20">
                        <h2 className="text-3xl sm:text-4xl font-bold text-navy">Everything you need to sell online</h2>
                        <p className="text-navy/60 max-w-2xl mx-auto text-lg">Powerful features to help you manage your business like a pro.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-3xl border border-blush/20 shadow-sm hover:shadow-xl hover:border-teal/30 hover:-translate-y-1 transition-all duration-300 group">
                            <div className="w-14 h-14 bg-mint/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-mint transition-colors">
                                <Zap className="w-7 h-7 text-teal" />
                            </div>
                            <h3 className="text-xl font-bold text-navy mb-4">Instant Setup</h3>
                            <p className="text-navy/60 leading-relaxed">
                                Connect your WhatsApp number and started listing products in less than 2 minutes. No technical skills needed.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-blush/20 shadow-sm hover:shadow-xl hover:border-teal/30 hover:-translate-y-1 transition-all duration-300 group">
                            <div className="w-14 h-14 bg-blush/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blush transition-colors">
                                <ShoppingBag className="w-7 h-7 text-crimson" />
                            </div>
                            <h3 className="text-xl font-bold text-navy mb-4">Smart Catalog</h3>
                            <p className="text-navy/60 leading-relaxed">
                                Beautiful product displays with categories, variants, and stock management that look great on any device.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-blush/20 shadow-sm hover:shadow-xl hover:border-teal/30 hover:-translate-y-1 transition-all duration-300 group">
                            <div className="w-14 h-14 bg-teal/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal/20 transition-colors">
                                <ShieldCheck className="w-7 h-7 text-navy" />
                            </div>
                            <h3 className="text-xl font-bold text-navy mb-4">Order Management</h3>
                            <p className="text-navy/60 leading-relaxed">
                                Receive orders directly on WhatsApp. Track pending payments and approvals through your dedicated dashboard.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-4 mb-20">
                        <h2 className="text-3xl sm:text-4xl font-bold text-navy">Plan that grows with you</h2>
                        <p className="text-navy/60 max-w-2xl mx-auto text-lg">Choose a plan that fits your business needs.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Free Plan */}
                        <div className="bg-white p-10 rounded-[2.5rem] border border-blush/30 relative overflow-hidden group">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-navy">Free Plan</h3>
                                    <div className="mt-4 flex items-baseline gap-1">
                                        <span className="text-4xl font-extrabold text-navy">Rs. 0</span>
                                        <span className="text-navy/50">/ forever</span>
                                    </div>
                                </div>

                                <ul className="space-y-4 py-8 border-t border-blush/20">
                                    <li className="flex items-center gap-3 text-navy/70">
                                        <Check className="w-5 h-5 text-mint font-bold" />
                                        <span>Up to 10 Products</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-navy/70">
                                        <Check className="w-5 h-5 text-mint font-bold" />
                                        <span>Basic WhatsApp Integration</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-navy/70">
                                        <Check className="w-5 h-5 text-mint font-bold" />
                                        <span>Digital Catalog</span>
                                    </li>
                                </ul>

                                <Link
                                    to="/register"
                                    className="block w-full text-center py-4 rounded-2xl border-2 border-navy text-navy font-bold hover:bg-navy hover:text-white transition-all duration-300"
                                >
                                    Start Free
                                </Link>
                            </div>
                        </div>

                        {/* Pro Plan */}
                        <div className="bg-navy p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl transform md:scale-105 z-10">
                            <div className="absolute top-0 right-0 py-1.5 px-6 bg-mint text-navy font-bold text-sm rounded-bl-2xl">
                                MOST POPULAR
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Pro Plan</h3>
                                    <div className="mt-4 flex items-baseline gap-1">
                                        <span className="text-4xl font-extrabold text-mint">Rs. 750</span>
                                        <span className="text-white/50">/ one-time</span>
                                    </div>
                                </div>

                                <ul className="space-y-4 py-8 border-t border-white/10">
                                    <li className="flex items-center gap-3 text-white">
                                        <Check className="w-5 h-5 text-mint" />
                                        <span>Everything in Free</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-white">
                                        <Check className="w-5 h-5 text-mint" />
                                        <span>Unlimited Products</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-white">
                                        <Check className="w-5 h-5 text-mint" />
                                        <span>Custom Brand Colors</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-white">
                                        <Check className="w-5 h-5 text-mint" />
                                        <span>Priority Support</span>
                                    </li>
                                </ul>

                                <Link
                                    to="/register"
                                    className="block w-full text-center py-4 rounded-2xl bg-mint text-navy font-bold hover:bg-white transition-all duration-300"
                                >
                                    Upgrade to Pro
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-blush/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-2">
                            <ShoppingBag className="w-6 h-6 text-navy" />
                            <span className="text-lg font-bold text-navy">WhatsLink.lk</span>
                        </div>

                        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-navy/60">
                            <a href="#" className="hover:text-teal transition-colors">About</a>
                            <a href="#" className="hover:text-teal transition-colors">Contact</a>
                            <a href="#" className="hover:text-teal transition-colors">Terms</a>
                            <a href="#" className="hover:text-teal transition-colors">Privacy</a>
                        </div>

                        <p className="text-sm text-navy/40">
                            © 2025 WhatsLink.lk. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;

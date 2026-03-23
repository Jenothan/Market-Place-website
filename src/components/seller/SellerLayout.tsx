import React, { useState } from 'react';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';
import {
    ShoppingBag,
    LogOut,
    LayoutDashboard,
    Star,
    Settings,
    Menu,
    X
} from 'lucide-react';
import { Button } from "@/components/shared/ui/button";

const SellerLayout: React.FC = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const sidebarLinks = [
        { icon: LayoutDashboard, label: "Dashboard", to: "/seller-dashboard" },
        { icon: ShoppingBag, label: "My Products", to: "/seller-dashboard/products" },
        { icon: Star, label: "Upgrade (Pro)", to: "/seller/upgrade" },
        { icon: Settings, label: "Settings", to: "/seller/settings" },
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] font-sans flex text-[#08415c]">
            {/* ── Sidebar (Desktop) ────────────────────────── */}
            <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#ebbab9]/20 fixed inset-y-0 left-0 z-40 shadow-sm">
                <div className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#08415c] rounded-lg flex items-center justify-center shadow-md">
                            <ShoppingBag className="w-5 h-5 text-[#b5ffe1]" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">WhatsLink</span>
                    </div>
                </div>

                <nav className="flex-1 px-3 space-y-1">
                    {sidebarLinks.map((link) => (
                        <NavLink
                            key={link.label}
                            to={link.to}
                            end={link.to === "/seller-dashboard"}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200
                                ${isActive
                                    ? "bg-[#08415c] text-white shadow-md shadow-[#08415c]/10"
                                    : "text-[#388697] hover:bg-[#388697]/5 hover:text-[#08415c]"}
                            `}
                        >
                            <link.icon className="w-4 h-4" />
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-[#ebbab9]/10">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/')}
                        className="w-full justify-start gap-3 px-4 py-3 rounded-xl text-[#cc2936] hover:bg-[#cc2936]/5 font-semibold transition-all text-sm"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* ── Mobile Header ──────────────────────────── */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-[#ebbab9]/20 z-50 px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#08415c] rounded-lg flex items-center justify-center">
                        <ShoppingBag className="w-4 h-4 text-[#b5ffe1]" />
                    </div>
                    <span className="text-lg font-bold">WhatsLink</span>
                </div>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 text-[#08415c]"
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* ── Main Content Area ──────────────────────── */}
            <main className="flex-1 lg:ml-64 pt-14 lg:pt-0 min-h-screen">
                <div className="max-w-[1280px] mx-auto p-4 sm:p-6 lg:p-8">
                    {/* Common Page Header (Desktop) - Optional, can be page specific */}
                    <div className="hidden lg:flex justify-between items-center">
                        <div>
                            {/* We could pass a title prop or use state, but for now let's keep it simple or remove it */}
                        </div>
                        {/* <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                className="rounded-xl border border-[#08415c] text-[#08415c] font-semibold hover:bg-[#08415c] hover:text-white h-10 px-4 gap-2 text-sm transition-all"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                                View Shop
                            </Button>
                            <div className="w-10 h-10 rounded-xl bg-[#ebbab9]/20 flex items-center justify-center text-sm font-bold text-[#08415c]">
                                UN
                            </div>
                        </div> */}
                    </div>

                    <Outlet />
                </div>
            </main>

            {/* ── Mobile Navigation Drawer ────────────────── */}
            {mobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-[60] bg-[#08415c]/40 backdrop-blur-sm transition-all duration-300">
                    <div className="absolute top-0 right-0 bottom-0 w-[260px] bg-white p-6 shadow-2xl flex flex-col pt-16 animate-in slide-in-from-right duration-300">
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="absolute top-4 right-4 p-2 text-[#08415c]"
                        >
                            <X className="w-7 h-7" />
                        </button>
                        <nav className="flex-1 space-y-1">
                            {sidebarLinks.map((link) => (
                                <NavLink
                                    key={link.label}
                                    to={link.to}
                                    end={link.to === "/seller-dashboard"}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={({ isActive }) => `
                                        flex items-center gap-3 p-3.5 rounded-xl font-bold text-sm
                                        ${isActive ? "bg-[#08415c] text-white" : "text-[#388697] hover:bg-[#388697]/5"}
                                    `}
                                >
                                    <link.icon className="w-5 h-5" />
                                    {link.label}
                                </NavLink>
                            ))}
                        </nav>
                        <div className="mt-auto border-t border-gray-100 pt-4">
                            <Button
                                variant="ghost"
                                onClick={() => navigate('/')}
                                className="w-full justify-start h-12 gap-3 px-4 rounded-xl text-[#cc2936] font-bold text-sm hover:bg-[#cc2936]/5 transition-all"
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SellerLayout;

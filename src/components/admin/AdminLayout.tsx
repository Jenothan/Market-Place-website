import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/shared/ui/button";
import {
    LayoutDashboard,
    CreditCard,
    CheckCircle2,
    Users,
    Settings,
    LogOut,
    ShieldCheck,
    Menu,
    X,
} from "lucide-react";

const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/dashboard/pending-payments", label: "Pending Payments", icon: CreditCard },
    { to: "/dashboard/recent-approvals", label: "Recent Approvals", icon: CheckCircle2 },
    { to: "/dashboard/all-users", label: "All Users", icon: Users },
    { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout() {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const SidebarContent = () => (
        <>
            {/* Logo / branding */}
            <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#388697] to-[#b5ffe1] flex items-center justify-center shadow-md">
                    <ShieldCheck className="w-5 h-5 text-[#08415c]" />
                </div>
                <div>
                    <h2 className="font-bold text-sm leading-tight">Shop Manager Admin</h2>
                    <p className="text-[10px] text-[#b5ffe1]/70 leading-tight">
                        Manage your shop users
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === "/dashboard"}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                                ? "bg-[#388697] text-white shadow-md shadow-[#388697]/30"
                                : "text-white/70 hover:bg-white/10 hover:text-white"
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5 shrink-0" />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            {/* Sidebar footer */}
            <div className="px-3 py-4 border-t border-white/10 mt-auto">
                <div className="px-4 py-2 text-xs text-white/40">
                    © 2026 Shop Manager
                </div>
            </div>
        </>
    );

    return (
        <div className="min-h-screen flex bg-gray-50 flex-col lg:flex-row">
            {/* ── Mobile Header ──────────────────────────── */}
            <header className="lg:hidden h-16 bg-[#08415c] text-white flex items-center justify-between px-4 sticky top-0 z-40 shadow-md">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#388697] to-[#b5ffe1] flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4 text-[#08415c]" />
                    </div>
                    <h2 className="font-bold text-sm uppercase tracking-wider">Admin</h2>
                </div>
                <button
                    onClick={toggleMobileMenu}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </header>

            {/* ── Sidebar (Desktop) ────────────────────────── */}
            <aside className="hidden lg:flex w-64 bg-[#08415c] text-white flex-col fixed inset-y-0 left-0 z-30 shadow-xl">
                <SidebarContent />
            </aside>

            {/* ── Sidebar (Mobile Overlay) ────────────────── */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-50 bg-[#08415c]/60 backdrop-blur-sm transition-opacity duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <aside
                        className="w-72 h-full bg-[#08415c] text-white flex flex-col shadow-2xl animate-in slide-in-from-left duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <SidebarContent />
                    </aside>
                </div>
            )}

            {/* ── Main content ────────────────────────────── */}
            <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
                {/* Top header (Desktop Only) */}
                <header className="hidden lg:flex h-16 bg-white border-b border-[#ebbab9]/40 items-center justify-end px-6 sticky top-0 z-20 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-semibold text-[#08415c]">Admin User</p>
                            <p className="text-xs text-[#388697]">admin@shopmanager.com</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#388697] to-[#b5ffe1] flex items-center justify-center text-[#08415c] font-bold text-sm shadow-md">
                            AU
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate("/")}
                            className="text-[#cc2936] hover:bg-[#cc2936]/10 hover:text-[#cc2936] gap-1.5 cursor-pointer"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </Button>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

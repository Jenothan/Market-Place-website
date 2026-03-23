import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ShoppingBag,
    Copy,
    Share2,
    Plus,
    Edit,
    Trash2,
    ChevronRight,
    Eye,
    MousePointerClick,
    Star,
    ExternalLink,
    Loader2,
} from 'lucide-react';
import { Button } from "@/components/shared/ui/button";
import { Card, CardContent } from "@/components/shared/ui/card";
import AddProductModal from "@/components/shared/AddProductModal";
import {
    fetchSellerProducts,
    fetchSellerProfile,
    type SellerProduct,
} from "@/lib/data";

const SellerDashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [products, setProducts] = useState<SellerProduct[]>([]);
    const [shopUrl, setShopUrl] = useState("");
    const [sellerName, setSellerName] = useState("");
    const [shopName, setShopName] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([fetchSellerProducts(), fetchSellerProfile()]).then(
            ([prods, profile]) => {
                setProducts(prods);
                setShopUrl(profile.shopUrl);
                setSellerName(profile.name);
                setShopName(profile.shopName);
                setLoading(false);
            }
        );
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shopUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const stats = [
        { label: "Total Products", value: String(products.length), icon: ShoppingBag, color: "text-[#08415c]", bg: "bg-[#08415c]/10" },
        { label: "Profile Views", value: "45", icon: Eye, color: "text-[#388697]", bg: "bg-[#388697]/10" },
        { label: "Link Clicks", value: "12", icon: MousePointerClick, color: "text-[#cc2936]", bg: "bg-[#cc2936]/10" },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-[#388697]" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="lg:hidden mb-2">
                <h2 className="text-xl font-bold text-[#08415c]">Dashboard</h2>
                <p className="text-xs text-[#388697] font-medium">Manage your shop and track performance</p>
            </div>

            <div className="hidden lg:block mb-2">
                <h2 className="text-2xl font-bold text-[#08415c]">Dashboard</h2>
                <p className="text-sm text-[#388697] font-medium">Manage your shop and track performance</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                {/* ── Left/Middle Column (Main Content) ── */}
                <div className="xl:col-span-8 space-y-6">
                    {/* Welcome Section */}
                    <section className="bg-gradient-to-br from-[#08415c] via-[#388697] to-[#08415c] p-6 sm:p-10 rounded-[2rem] text-white shadow-lg shadow-[#08415c]/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-10 transition-all duration-700">
                            <ShoppingBag className="w-48 h-48 -mr-24 -mt-12 rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
                        </div>
                        <div className="relative z-10">
                            <span className="inline-block px-3 py-1 rounded-full bg-[#b5ffe1]/20 text-[#b5ffe1] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#b5ffe1]/30">
                                Seller Account
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Welcome, {sellerName}</h1>
                            <p className="text-white/80 text-sm sm:text-base font-medium max-w-md leading-relaxed mb-6">
                                Your shop <span className="text-[#b5ffe1] font-bold">"{shopName}"</span> is looking great! You have some new insights to check today.
                            </p>
                        </div>
                    </section>

                    {/* Stats Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {stats.map((stat, idx) => (
                            <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-all duration-300 rounded-[2rem] overflow-hidden group">
                                <CardContent className="p-6 flex items-center gap-4">
                                    <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
                                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-[#388697] uppercase tracking-widest mb-0.5">{stat.label}</p>
                                        <p className="text-2xl font-bold text-[#08415c]">{stat.value}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Products Grid */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold">My Products</h2>
                            <Button
                                variant="ghost"
                                onClick={() => navigate('/seller-dashboard/products')}
                                className="text-[#388697] hover:text-[#08415c] font-bold text-sm gap-1 group"
                            >
                                Manage All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {products.map((product) => (
                                <Card key={product.id} className="group border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-[2rem] overflow-hidden bg-white">
                                    <CardContent className="p-0 flex flex-col h-full">
                                        <div className="flex items-center p-3 h-28">
                                            <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-inner bg-gray-50 border border-gray-100">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            </div>
                                            <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                                                <div>
                                                    <h3 className="font-bold text-base truncate mb-0.5">{product.name}</h3>
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-sm text-[#388697] font-bold">Rs. {product.price}</p>
                                                        <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-[#08415c] font-bold">
                                                            Qty: {product.quantity}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-gray-50 text-[#08415c] hover:bg-[#388697] hover:text-white transition-all">
                                                        <Edit className="w-3.5 h-3.5" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-[#cc2936]/5 text-[#cc2936] hover:bg-[#cc2936] hover:text-white transition-all">
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            {/* Empty State / Add Product Card */}
                            <div
                                onClick={() => setIsAddProductModalOpen(true)}
                                className="h-28 rounded-2xl border-2 border-dashed border-[#ebbab9]/50 flex items-center justify-center p-4 cursor-pointer hover:bg-white hover:border-[#08415c] transition-all group"
                            >
                                <div className="flex items-center gap-3 text-[#388697] group-hover:text-[#08415c]">
                                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-[#08415c] group-hover:text-white transition-all">
                                        <Plus className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-base">Add New Product</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Right Column (Utility Section) ── */}
                <div className="xl:col-span-4 space-y-6">
                    {/* Plan Status Card */}
                    <Card className="rounded-[2rem] border-none bg-gradient-to-br from-white to-[#b5ffe1]/10 shadow-sm overflow-hidden border-t-4 border-[#b5ffe1]">
                        <CardContent className="p-6 space-y-6">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-[#388697] uppercase tracking-widest">Active Plan</p>
                                    <span className="inline-block px-2 py-0.5 rounded-lg bg-[#b5ffe1]/30 text-[#08415c] text-[10px] font-black tracking-wider">FREE</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold leading-tight text-[#08415c]">Upgrade Your Business</h3>
                                    <p className="text-[#388697] text-xs font-medium leading-relaxed">Unlock advanced analytics, unlimited products, and priority support to grow your shop faster.</p>
                                </div>
                                <Button
                                    onClick={() => navigate('/seller/upgrade')}
                                    className="w-full h-12 rounded-xl bg-[#08415c] text-white text-sm font-bold gap-2 hover:bg-[#388697] shadow-md shadow-[#08415c]/10 transition-all group"
                                >
                                    <Star className="w-4 h-4 fill-[#b5ffe1] text-[#b5ffe1] group-hover:rotate-12 transition-transform" />
                                    Upgrade to Pro
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Shop Link Section */}
                    <Card className="rounded-[2rem] border-none bg-white shadow-sm overflow-hidden">
                        <CardContent className="p-6 space-y-5">
                            <h2 className="text-lg font-bold">Public Shop Link</h2>
                            <div className="space-y-4">
                                <div className="flex items-center bg-[#f8fafc] px-4 py-3 rounded-xl border border-[#f1f5f9] group focus-within:border-[#388697]/50 transition-all">
                                    <span className="text-[#08415c]/60 font-medium text-xs truncate mr-3">{shopUrl}</span>
                                    <button
                                        onClick={copyToClipboard}
                                        className="ml-auto p-1.5 bg-white rounded-lg shadow-sm text-[#388697] hover:text-[#08415c] hover:scale-105 transition-all border border-gray-100"
                                        title="Copy Link"
                                    >
                                        <Copy className={`w-3.5 h-3.5 ${copied ? 'text-green-500' : ''} transition-all`} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button className="rounded-xl bg-white border border-[#08415c] text-[#08415c] hover:bg-[#08415c] hover:text-white font-bold h-11 text-xs gap-2 transition-all">
                                        <Share2 className="w-4 h-4" />
                                        Share
                                    </Button>
                                    <Button variant="outline" className="rounded-xl border border-[#388697] text-[#388697] font-bold h-11 text-xs gap-2 hover:bg-[#388697]/5 transition-all">
                                        <ExternalLink className="w-4 h-4" />
                                        Preview
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="rounded-[2rem] border-none bg-white shadow-sm overflow-hidden">
                        <CardContent className="p-6">
                            <h2 className="text-lg font-bold mb-5">Quick Actions</h2>
                            <div className="grid grid-cols-1 gap-2">
                                <Button variant="ghost" className="justify-between h-12 px-4 rounded-xl text-[#08415c] font-semibold hover:bg-[#08415c]/5 group transition-all">
                                    <span className="text-sm">Store Settings</span>
                                    <ChevronRight className="w-4 h-4 text-[#388697] group-hover:translate-x-1 transition-transform" />
                                </Button>
                                <Button variant="ghost" className="justify-between h-12 px-4 rounded-xl text-[#08415c] font-semibold hover:bg-[#08415c]/5 group transition-all">
                                    <span className="text-sm">Account Verification</span>
                                    <ChevronRight className="w-4 h-4 text-[#388697] group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* ── Add Product Modal ──────────────────────── */}
            <AddProductModal
                isOpen={isAddProductModalOpen}
                onClose={() => setIsAddProductModalOpen(false)}
            />
        </div>
    );
};

export default SellerDashboardPage;

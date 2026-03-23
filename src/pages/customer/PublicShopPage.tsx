import React, { useState, useEffect } from 'react';
import {
    MessageSquare,
    MapPin,
    CreditCard,
    QrCode,
    Instagram,
    Facebook,
    ChevronRight,
    ShoppingBag,
    Info,
    Loader2,
} from 'lucide-react';
import { Button } from "@/components/shared/ui/button";
import { Card, CardContent } from "@/components/shared/ui/card";
import { Badge } from "@/components/shared/ui/badge";
import { fetchPublicShop, fetchPublicProducts, type PublicProduct } from "@/lib/data";

const PublicShopPage: React.FC = () => {
    const [shopData, setShopData] = useState<Awaited<ReturnType<typeof fetchPublicShop>> | null>(null);
    const [products, setProducts] = useState<PublicProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([fetchPublicShop(), fetchPublicProducts()]).then(([shop, prods]) => {
            setShopData(shop);
            setProducts(prods);
            setLoading(false);
        });
    }, []);

    const handleOrder = (productName: string) => {
        if (!shopData) return;
        const text = encodeURIComponent(`Hi, I would like to order: ${productName}`);
        window.open(`https://wa.me/${shopData.whatsapp}?text=${text}`, '_blank');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
                <Loader2 className="w-10 h-10 animate-spin text-[#388697]" />
            </div>
        );
    }

    if (!shopData) return null;

    return (
        <div className="min-h-screen bg-[#f8fafc] text-[#08415c] font-sans selection:bg-[#b5ffe1] pb-24 lg:pb-12">
            {/* ── Shop Header ── */}
            <header className="relative bg-white border-b border-[#ebbab9]/20 px-4 pt-12 pb-8 flex flex-col items-center text-center space-y-4">
                {/* Logo Container */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#08415c] to-[#388697] rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                    <div className="relative w-28 h-28 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-50 flex items-center justify-center translate-y-0 group-hover:-translate-y-1 transition-transform duration-500">
                        <img src={shopData.logo} alt={shopData.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg animate-pulse">
                        <MessageSquare className="w-4 h-4 text-white fill-white" />
                    </div>
                </div>

                <div className="space-y-1 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-3xl font-black tracking-tight">{shopData.name}</h1>
                    <p className="text-[#388697] font-medium max-w-xs mx-auto text-sm leading-relaxed">{shopData.description}</p>
                </div>

                {/* Action Button (Desktop Only) */}
                <div className="hidden lg:block pt-4">
                    <Button
                        onClick={() => window.open(`https://wa.me/${shopData.whatsapp}`, '_blank')}
                        className="rounded-full bg-[#08415c] text-white px-8 h-12 font-bold shadow-lg shadow-[#08415c]/20 hover:scale-105 transition-all gap-2"
                    >
                        <MessageSquare className="w-5 h-5 fill-[#b5ffe1] text-[#b5ffe1]" />
                        Order via WhatsApp
                    </Button>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-8 space-y-12">
                {/* ── About Section ── */}
                <section className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                    <Card className="rounded-[2.5rem] border-none shadow-xl shadow-gray-200/50 overflow-hidden bg-white">
                        <CardContent className="p-8 sm:p-12 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#08415c]/10 flex items-center justify-center">
                                    <Info className="w-5 h-5 text-[#08415c]" />
                                </div>
                                <h2 className="text-xl font-bold">About Our Shop</h2>
                            </div>
                            <p className="text-[#388697] text-sm sm:text-base leading-relaxed font-medium">
                                Established with a vision to bring uniqueness to your everyday style, {shopData.name} focuses on premium quality and sustainable fashion. Every piece in our catalog is hand-picked to ensure you get nothing but the best.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2">
                                <div className="flex items-center gap-2 px-4 py-2 bg-[#f8fafc] rounded-full border border-gray-100 group cursor-pointer hover:border-[#388697]/30 transition-all">
                                    <Instagram className="w-4 h-4 text-[#cc2936]" />
                                    <span className="text-xs font-bold text-[#08415c]/80">@{shopData.socials.instagram}</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-[#f8fafc] rounded-full border border-gray-100 group cursor-pointer hover:border-[#388697]/30 transition-all">
                                    <Facebook className="w-4 h-1 text-[#08415c]" />
                                    <span className="text-xs font-bold text-[#08415c]/80">{shopData.socials.facebook}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* ── Products Grid ── */}
                <section className="space-y-8">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#cc2936]/10 flex items-center justify-center">
                                <ShoppingBag className="w-5 h-5 text-[#cc2936]" />
                            </div>
                            <h2 className="text-xl font-bold">Our Catalog</h2>
                        </div>
                        <Badge variant="outline" className="rounded-lg border-[#08415c] text-[#08415c] font-black px-3 py-1">
                            NEW ARRIVALS
                        </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Card key={product.id} className="group border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2rem] overflow-hidden bg-white">
                                <CardContent className="p-0">
                                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 right-4 group-hover:translate-x-0 translate-x-12 transition-all duration-500">
                                            <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-xl">
                                                <MessageSquare className="w-4 h-4 text-green-500 fill-green-500" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div className="space-y-1">
                                            <h3 className="font-bold text-base group-hover:text-[#388697] transition-colors truncate">{product.name}</h3>
                                            <p className="text-lg font-black text-[#08415c]">Rs. {product.price}</p>
                                        </div>
                                        <Button
                                            onClick={() => handleOrder(product.name)}
                                            className="w-full h-11 rounded-xl bg-[#08415c] text-white font-bold text-sm gap-2 hover:bg-[#388697] transition-all group/btn"
                                        >
                                            Order via WA
                                            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* ── Location & Payment ── */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Location */}
                    <Card className="rounded-[2.5rem] border-none shadow-xl shadow-gray-200/50 overflow-hidden bg-white">
                        <CardContent className="p-8 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#388697]/10 flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-[#388697]" />
                                </div>
                                <h2 className="text-xl font-bold">Visit Us</h2>
                            </div>
                            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
                                <iframe
                                    src={shopData.location.mapUrl}
                                    className="w-full h-full grayscale opacity-70 border-none"
                                    loading="lazy"
                                />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-[#08415c]">Showroom Address:</p>
                                <p className="text-sm text-[#388697] font-medium leading-relaxed">{shopData.location.address}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment */}
                    <Card className="rounded-[2.5rem] border-none shadow-xl shadow-gray-200/50 overflow-hidden bg-white flex flex-col">
                        <CardContent className="p-8 space-y-6 flex-1">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#ebbab9]/20 flex items-center justify-center">
                                    <CreditCard className="w-5 h-5 text-[#cc2936]" />
                                </div>
                                <h2 className="text-xl font-bold">Payment Methods</h2>
                            </div>
                            <div className="flex items-center gap-6 bg-[#f8fafc] p-6 rounded-3xl border border-gray-100">
                                <div className="w-24 h-24 bg-white rounded-2xl border border-gray-100 p-2 shadow-sm flex items-center justify-center shrink-0">
                                    <QrCode className="w-12 h-12 text-gray-300" />
                                </div>
                                <div className="space-y-1 overflow-hidden">
                                    <p className="text-[10px] font-black text-[#388697] uppercase tracking-widest leading-none mb-1">Direct Bank Transfer</p>
                                    <p className="text-sm font-bold text-[#08415c] truncate">{shopData.payment.bank}</p>
                                    <p className="text-base font-black text-[#08415c] tracking-wider leading-none py-1 truncate">{shopData.payment.account}</p>
                                    <p className="text-[10px] font-semibold text-[#388697] truncate">{shopData.payment.name}</p>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col justify-end">
                                <p className="text-xs text-[#388697] font-medium italic text-center p-4 border-t border-dashed border-gray-200 mt-4">
                                    * Please send the payment slip via WhatsApp after your order is confirmed.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* ── Footer ── */}
                <footer className="pt-12 pb-8 text-center space-y-4">
                    <div className="flex items-center justify-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-[#08415c]/40" />
                        <span className="text-xs font-bold text-[#08415c]/40 tracking-widest uppercase">Powered by WhatsLink</span>
                    </div>
                </footer>
            </main>

            {/* ── Mobile Sticky Button ── */}
            <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xs px-4 animate-in slide-in-from-bottom-8 duration-1000">
                <Button
                    onClick={() => window.open(`https://wa.me/${shopData.whatsapp}`, '_blank')}
                    className="w-full h-14 rounded-2xl bg-[#08415c] text-white font-black text-base shadow-2xl shadow-[#08415c]/40 gap-3 border-2 border-white/10"
                >
                    <MessageSquare className="w-5 h-5 fill-[#b5ffe1] text-[#b5ffe1]" />
                    Order via WhatsApp
                </Button>
            </div>
        </div>
    );
};

export default PublicShopPage;

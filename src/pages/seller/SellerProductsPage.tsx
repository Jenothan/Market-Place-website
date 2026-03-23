import React, { useState, useEffect } from 'react';
import {
    ShoppingBag,
    Plus,
    Edit,
    Trash2,
    Search,
    Filter,
    ChevronDown,
    Loader2,
} from 'lucide-react';
import { Button } from "@/components/shared/ui/button";
import { Card, CardContent } from "@/components/shared/ui/card";
import { Input } from "@/components/shared/ui/input";
import AddProductModal from "@/components/shared/AddProductModal";
import { fetchSellerProducts, type SellerProduct } from "@/lib/data";

const SellerProductsPage: React.FC = () => {
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState<SellerProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSellerProducts().then((data) => {
            setProducts(data);
            setLoading(false);
        });
    }, []);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 pb-12">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-[#08415c]">My Products</h2>
                    <p className="text-sm text-[#388697] font-medium">Manage your shop inventory and pricing</p>
                </div>
                <Button
                    onClick={() => setIsAddProductModalOpen(true)}
                    className="rounded-xl bg-[#08415c] text-white font-bold gap-2 hover:bg-[#388697] h-12 px-6 shadow-lg shadow-[#08415c]/10 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Add New Product
                </Button>
            </div>

            {/* toolbar */}
            <Card className="rounded-2xl border-none shadow-sm bg-white overflow-hidden">
                <CardContent className="p-4 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#388697]" />
                        <Input
                            placeholder="Search products..."
                            className="pl-10 h-11 rounded-xl border-[#ebbab9]/20 focus:border-[#08415c] focus:ring-[#08415c]/5"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="h-11 rounded-xl border-[#ebbab9]/30 text-[#08415c] font-bold gap-2 px-4">
                            <Filter className="w-4 h-4" />
                            Filter
                            <ChevronDown className="w-4 h-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Loading */}
            {loading && (
                <div className="flex items-center justify-center py-16">
                    <Loader2 className="w-8 h-8 animate-spin text-[#388697]" />
                </div>
            )}

            {/* Products Grid */}
            {!loading && (filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                    {filteredProducts.map((product) => (
                        <Card key={product.id} className="group border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-[1.5rem] overflow-hidden bg-white">
                            <CardContent className="p-0 flex flex-col h-full">
                                <div className="aspect-square w-full relative overflow-hidden bg-gray-50 border-b border-gray-100">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0 duration-300">
                                        <Button variant="secondary" size="icon" className="h-7 w-7 rounded-full bg-white/95 backdrop-blur shadow-sm hover:bg-[#08415c] hover:text-white">
                                            <Edit className="w-3 h-3" />
                                        </Button>
                                        <Button variant="secondary" size="icon" className="h-7 w-7 rounded-full bg-white/95 backdrop-blur shadow-sm hover:bg-[#cc2936] hover:text-white">
                                            <Trash2 className="w-3 h-3" />
                                        </Button>
                                    </div>
                                    {product.quantity === 0 && (
                                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
                                            <span className="bg-[#cc2936] text-white text-[8px] font-black uppercase tracking-tight px-2 py-0.5 rounded-full shadow-lg">Out of Stock</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-3 sm:p-4 space-y-2 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-[#08415c] text-sm sm:text-base leading-tight mb-0.5 truncate">{product.name}</h3>
                                        <p className="text-base sm:text-lg font-bold text-[#388697]">Rs. {product.price}</p>
                                    </div>
                                    <div className="flex items-center justify-between pt-1.5 border-t border-gray-50 mt-1">
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${product.quantity > 0 ? "bg-[#b5ffe1]/30 text-[#08415c]" : "bg-red-50 text-red-600"}`}>
                                            Qty: {product.quantity}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-[#ebbab9]/30">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <ShoppingBag className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-[#08415c] mb-1">No products found</h3>
                    <p className="text-sm text-[#388697] font-medium mb-6 text-center max-w-xs">
                        {searchQuery ? "No products match your search criteria. Try a different term." : "Your inventory is empty. Start by adding your first product!"}
                    </p>
                    <Button
                        onClick={() => setIsAddProductModalOpen(true)}
                        className="rounded-xl bg-[#08415c] text-white font-bold px-6 h-11"
                    >
                        Add Your First Product
                    </Button>
                </div>
            ))}

            {/* ── Add Product Modal ──────────────────────── */}
            <AddProductModal
                isOpen={isAddProductModalOpen}
                onClose={() => setIsAddProductModalOpen(false)}
            />
        </div>
    );
};

export default SellerProductsPage;

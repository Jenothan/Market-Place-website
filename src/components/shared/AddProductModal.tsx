import React from 'react';
import { X, Upload, Package, DollarSign, Tag, Info } from 'lucide-react';
import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/input";
import { Label } from "@/components/shared/ui/label";

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-[#08415c]/40 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-[#ebbab9]/10 bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#08415c] rounded-xl flex items-center justify-center shadow-lg shadow-[#08415c]/10">
                            <Package className="w-5 h-5 text-[#b5ffe1]" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[#08415c]">Add New Product</h2>
                            <p className="text-xs text-[#388697] font-medium">List a new item in your shop</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-[#cc2936]/10 text-[#388697] hover:text-[#cc2936] transition-all"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Scrollable Form Body */}
                <div className="px-8 py-6 max-h-[70vh] overflow-y-auto space-y-6">
                    {/* Product Image Upload Section */}
                    <div className="space-y-3">
                        <Label className="text-sm font-bold text-[#08415c] flex items-center gap-2">
                            Product Image
                            <span className="text-[#388697] font-normal text-xs">(Recommended: 800x800px)</span>
                        </Label>
                        <div className="group relative border-2 border-dashed border-[#ebbab9]/50 rounded-2xl hover:border-[#08415c] transition-all bg-gray-50/30 p-8 flex flex-col items-center justify-center cursor-pointer overflow-hidden">
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#388697] group-hover:bg-[#08415c] group-hover:text-white group-hover:scale-110 transition-all shadow-sm border border-gray-100">
                                <Upload className="w-7 h-7" />
                            </div>
                            <p className="text-[#08415c] font-bold mt-4 text-sm">Click or drag to upload</p>
                            <p className="text-[#388697] text-xs font-medium mt-1">PNG, JPG or WebP (Max 5MB)</p>

                            <Button
                                variant="outline"
                                className="mt-6 rounded-xl border-[#08415c] text-[#08415c] font-bold h-10 px-6 gap-2 hover:bg-[#08415c] hover:text-white"
                            >
                                Choose File
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Product Name */}
                        <div className="space-y-2">
                            <Label htmlFor="productName" className="text-sm font-bold text-[#08415c]">
                                Product Name <span className="text-[#cc2936]">*</span>
                            </Label>
                            <div className="relative">
                                <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#388697]" />
                                <Input
                                    id="productName"
                                    placeholder="e.g. Wireless Headphones"
                                    className="pl-11 h-12 rounded-xl border-[#ebbab9]/30 focus:border-[#08415c] focus:ring-[#08415c]/10 text-sm font-medium"
                                />
                            </div>
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                            <Label htmlFor="price" className="text-sm font-bold text-[#08415c]">
                                Price (Rs.) <span className="text-[#cc2936]">*</span>
                            </Label>
                            <div className="relative">
                                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#388697]" />
                                <Input
                                    id="price"
                                    type="number"
                                    placeholder="0.00"
                                    className="pl-11 h-12 rounded-xl border-[#ebbab9]/30 focus:border-[#08415c] focus:ring-[#08415c]/10 text-sm font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-bold text-[#08415c] flex items-center gap-2">
                            Description
                            <Info className="w-3.5 h-3.5 text-[#388697]" />
                        </Label>
                        <textarea
                            id="description"
                            className="w-full min-h-[100px] p-4 rounded-xl border border-[#ebbab9]/30 focus:border-[#08415c] focus:ring-1 focus:ring-[#08415c]/10 outline-none text-sm font-medium transition-all placeholder:text-gray-400"
                            placeholder="Tell customers more about this product..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Category */}
                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-sm font-bold text-[#08415c]">Category</Label>
                            <div className="relative">
                                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#388697]" />
                                <select
                                    id="category"
                                    className="w-full h-12 pl-11 pr-10 rounded-xl border border-[#ebbab9]/30 focus:border-[#08415c] focus:ring-1 focus:ring-[#08415c]/10 outline-none text-sm font-medium transition-all appearance-none bg-white cursor-pointer"
                                >
                                    <option value="">Select Category</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="fashion">Fashion</option>
                                    <option value="home">Home & Living</option>
                                    <option value="beauty">Beauty & Health</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg className="w-4 h-4 text-[#388697]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        {/* Stock Status */}
                        <div className="space-y-2">
                            <Label className="text-sm font-bold text-[#08415c]">Stock Status</Label>
                            <div className="flex gap-4">
                                <label className="flex-1 flex items-center justify-between p-3.5 rounded-xl border border-[#ebbab9]/30 hover:bg-gray-50 cursor-pointer group transition-all">
                                    <span className="text-sm font-semibold text-[#08415c]">In Stock</span>
                                    <input type="radio" name="stock" defaultChecked className="w-4 h-4 accent-[#08415c]" />
                                </label>
                                <label className="flex-1 flex items-center justify-between p-3.5 rounded-xl border border-[#ebbab9]/30 hover:bg-gray-50 cursor-pointer group transition-all text-gray-400">
                                    <span className="text-sm font-semibold">Out Stock</span>
                                    <input type="radio" name="stock" className="w-4 h-4 accent-[#cc2936]" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 border-t border-[#ebbab9]/10 flex items-center justify-end gap-3 bg-gray-50/50">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="rounded-xl px-6 h-12 font-bold text-[#388697] hover:bg-gray-100 hover:text-[#08415c] transition-all"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onClose}
                        className="rounded-xl px-8 h-12 bg-[#08415c] text-white font-bold hover:bg-[#388697] shadow-lg shadow-[#08415c]/10 transition-all"
                    >
                        Save Product
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddProductModal;

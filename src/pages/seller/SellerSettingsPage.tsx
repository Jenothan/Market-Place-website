import React, { useState } from 'react';
import {
    Settings,
    Store,
    Lock,
    Save,
    ShieldCheck,
    Camera,
    Info
} from 'lucide-react';
import { Button } from "@/components/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/shared/ui/card";
import { Input } from "@/components/shared/ui/input";
import { Label } from "@/components/shared/ui/label";
import { Textarea } from "@/components/shared/ui/textarea";
import { sellerProfile } from "@/lib/data";

const SellerSettingsPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSaveShopDetails = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => setIsLoading(false), 1500);
    };

    const handleUpdatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Page Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#08415c] flex items-center gap-2">
                    <Settings className="w-6 h-6" />
                    Settings
                </h2>
                <p className="text-sm text-[#388697] font-medium">Manage your shop profile and account security</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* ── Left Side: Shop Details ────────────────── */}
                <div className="lg:col-span-8 space-y-6">
                    <Card className="rounded-[2rem] border-none shadow-xl shadow-[#08415c]/5 overflow-hidden bg-white">
                        <CardHeader className="bg-gradient-to-r from-[#08415c]/5 to-transparent border-b border-[#ebbab9]/10 p-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#08415c] flex items-center justify-center shadow-lg">
                                    <Store className="w-5 h-5 text-[#b5ffe1]" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-bold text-[#08415c]">Shop Details</CardTitle>
                                    <CardDescription className="text-xs font-medium text-[#388697]">Information visible on your public shop page</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8">
                            <form onSubmit={handleSaveShopDetails} className="space-y-6">
                                {/* Logo Upload Placeholder */}
                                <div className="flex items-center gap-6 pb-4 border-b border-dashed border-gray-100 mb-6">
                                    <div className="relative group">
                                        <div className="w-24 h-24 rounded-full bg-gray-50 border-2 border-[#ebbab9]/20 flex items-center justify-center overflow-hidden transition-all group-hover:border-[#08415c]/30">
                                            <Store className="w-10 h-10 text-gray-300" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                                <Camera className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold text-[#08415c]">Shop Logo</p>
                                        <p className="text-xs text-[#388697] font-medium">PNG, JPG or GIF. Max 2MB.</p>
                                        <Button variant="outline" size="sm" className="h-8 rounded-lg mt-2 text-xs border-[#08415c] text-[#08415c] hover:bg-[#08415c] hover:text-white">Change Logo</Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="shopName" className="text-sm font-bold text-[#08415c]">Shop Name</Label>
                                        <Input id="shopName" defaultValue={sellerProfile.shopName} className="h-12 rounded-xl border-[#ebbab9]/30 focus:border-[#08415c] focus:ring-[#08415c]/10 font-medium" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="tagline" className="text-sm font-bold text-[#08415c]">Tagline</Label>
                                        <Input id="tagline" defaultValue={sellerProfile.tagline} placeholder="Quality you can trust" className="h-12 rounded-xl border-[#ebbab9]/30 focus:border-[#08415c] focus:ring-[#08415c]/10 font-medium" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-sm font-bold text-[#08415c]">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Tell customers about your business..."
                                        className="min-h-[120px] rounded-xl border-[#ebbab9]/30 focus:border-[#08415c] focus:ring-[#08415c]/10 font-medium resize-none"
                                        defaultValue={sellerProfile.description}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="whatsapp" className="text-sm font-bold text-[#08415c]">WhatsApp Number</Label>
                                        <Input id="whatsapp" defaultValue={sellerProfile.whatsapp} className="h-12 rounded-xl border-[#ebbab9]/30 focus:border-[#08415c] focus:ring-[#08415c]/10 font-medium" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="location" className="text-sm font-bold text-[#08415c]">Location / Address</Label>
                                        <Input id="location" defaultValue={sellerProfile.location} className="h-12 rounded-xl border-[#ebbab9]/30 focus:border-[#08415c] focus:ring-[#08415c]/10 font-medium" />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-50 flex justify-end">
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="h-12 px-8 rounded-xl bg-[#08415c] text-white font-bold gap-2 hover:bg-[#388697] shadow-lg shadow-[#08415c]/10 transition-all"
                                    >
                                        <Save className="w-4 h-4" />
                                        {isLoading ? 'Saving...' : 'Save Changes'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* ── Right Side: Security & Plan ───────────── */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Password Change Card */}
                    <Card className="rounded-[2rem] border-none shadow-xl shadow-[#08415c]/5 overflow-hidden bg-white">
                        <CardHeader className="bg-gradient-to-r from-[#cc2936]/5 to-transparent border-b border-[#ebbab9]/10 p-6">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-[#cc2936]/10 flex items-center justify-center">
                                    <Lock className="w-5 h-5 text-[#cc2936]" />
                                </div>
                                <CardTitle className="text-lg font-bold text-[#08415c]">Security</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <form onSubmit={handleUpdatePassword} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="currentPass" className="text-xs font-bold text-[#08415c] uppercase tracking-wider">Current Password</Label>
                                    <Input id="currentPass" type="password" placeholder="••••••••" className="h-11 rounded-lg border-[#ebbab9]/30 font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="newPass" className="text-xs font-bold text-[#08415c] uppercase tracking-wider">New Password</Label>
                                    <Input id="newPass" type="password" placeholder="••••••••" className="h-11 rounded-lg border-[#ebbab9]/30 font-medium" />
                                </div>
                                <div className="space-y-2 pb-2">
                                    <Label htmlFor="confirmPass" className="text-xs font-bold text-[#08415c] uppercase tracking-wider">Confirm New Password</Label>
                                    <Input id="confirmPass" type="password" placeholder="••••••••" className="h-11 rounded-lg border-[#ebbab9]/30 font-medium" />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-11 rounded-lg bg-[#cc2936] text-white font-bold text-sm hover:bg-[#8b1c24] transition-all"
                                >
                                    Update Password
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Security Tip */}
                    <Card className="rounded-[2rem] border-none bg-[#08415c] text-white overflow-hidden shadow-lg shadow-[#08415c]/20">
                        <CardContent className="p-6 space-y-4">
                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                <ShieldCheck className="w-6 h-6 text-[#b5ffe1]" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-lg leading-tight">Keep Your Account Safe</h3>
                                <p className="text-white/70 text-xs font-medium leading-relaxed">
                                    Use a strong password that you don't use elsewhere. Never share your login credentials with anyone.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Help */}
                    <div className="flex gap-3 p-5 rounded-[2rem] bg-[#388697]/5 border border-[#388697]/10">
                        <Info className="w-5 h-5 text-[#388697] shrink-0 mt-0.5" />
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-[#08415c]">Need help?</p>
                            <p className="text-[11px] font-medium text-[#388697] leading-relaxed">
                                Contact our support team if you have issues managing your shop details or setting up your profile.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerSettingsPage;

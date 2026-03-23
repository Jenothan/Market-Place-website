import React from 'react';
import {
    CheckCircle2,
    QrCode,
    Upload,
    Info,
    Sparkles,
    Zap,
    MousePointer2,
    BarChart3,
    Globe,
    Headphones,
} from 'lucide-react';
import { Button } from "@/components/shared/ui/button";
import { Card, CardContent } from "@/components/shared/ui/card";
import { Input } from "@/components/shared/ui/input";
import { Label } from "@/components/shared/ui/label";
import { proFeatures, upgradePaymentDetails } from "@/lib/data";

const featureIcons = [Zap, Globe, Sparkles, BarChart3, Headphones, MousePointer2];

const SellerUpgradePage: React.FC = () => {
    const proFeaturesList = proFeatures.map((name, i) => ({
        name,
        icon: featureIcons[i % featureIcons.length],
    }));


    return (
        <div className="space-y-8 pb-12">
            {/* Page Header (Desktop) */}
            <div className="hidden lg:block mb-8">
                <h2 className="text-2xl font-bold text-[#08415c]">Upgrade to Pro</h2>
                <p className="text-sm text-[#388697] font-medium">Unlock all premium features for your business</p>
            </div>

            {/* Hero Section (Visible on all but slightly adjusted) */}
            <div className="text-center space-y-4 mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#b5ffe1]/20 text-[#08415c] text-xs font-bold border border-[#b5ffe1]/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    GO PREMIER
                </div>
                <h1 className="text-3xl sm:text-3xl font-bold text-[#08415c] tracking-tight">Level Up Your Shop</h1>
                <p className="text-[#388697] font-medium max-w-lg mx-auto leading-relaxed text-sm">
                    Everything you need to scale your business with a single one-time payment.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* ── Left Column: Pricing & Features ───────── */}
                <div className="lg:col-span-5 space-y-6">
                    {/* Pricing Card */}
                    <Card className="border-none shadow-xl shadow-[#08415c]/5 overflow-hidden rounded-[2rem] bg-[#08415c] text-white">
                        <CardContent className="p-8 text-center space-y-4">
                            <p className="text-[#b5ffe1] text-xs font-black tracking-widest uppercase">One-Time Payment</p>
                            <div className="flex items-center justify-center gap-1">
                                <span className="text-2xl font-bold text-[#b5ffe1]/60 mt-1">Rs.</span>
                                <span className="text-6xl font-black">750</span>
                            </div>
                            <div className="w-full h-px bg-white/10" />
                            <p className="text-sm font-medium text-white/80">Lifetime access to all Pro features.<br />No monthly subscriptions.</p>
                        </CardContent>
                    </Card>

                    {/* Features List */}
                    <Card className="border-[#ebbab9]/30 shadow-sm rounded-[2rem] overflow-hidden">
                        <CardContent className="p-8 space-y-6">
                            <h3 className="text-sm font-black text-[#08415c] tracking-widest uppercase flex items-center gap-2">
                                Pro Features Include:
                            </h3>
                            <ul className="space-y-4">
                                {proFeaturesList.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <div className="shrink-0 w-8 h-8 rounded-lg bg-[#b5ffe1]/20 flex items-center justify-center">
                                            <CheckCircle2 className="w-5 h-5 text-[#08415c]" />
                                        </div>
                                        <span className="text-sm font-semibold text-[#08415c]/80">{feature.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* ── Right Column: Payment Process ─────────── */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border-[#ebbab9]/30 shadow-xl shadow-[#08415c]/5 rounded-[2rem] overflow-hidden border-t-4 border-[#08415c]">
                        <CardContent className="p-8 space-y-8">
                            {/* Steps Header */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-[#08415c] flex items-center gap-2">
                                    <QrCode className="w-6 h-6 text-[#388697]" />
                                    Payment Instructions
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { num: "1", text: "Scan the QR code to make payment" },
                                        { num: "2", text: "Upload your payment screenshot" },
                                        { num: "3", text: "Wait for admin approval (24h)" },
                                        { num: "4", text: "Your Pro features will be activated" },
                                    ].map((step, idx) => (
                                        <div key={idx} className="flex gap-3">
                                            <span className="shrink-0 w-6 h-6 rounded-full bg-[#08415c] text-white text-[10px] font-black flex items-center justify-center mt-0.5">
                                                {step.num}
                                            </span>
                                            <p className="text-xs font-semibold text-[#388697] leading-tight">{step.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full h-px bg-[#ebbab9]/10" />

                            {/* QR & Bank Details */}
                            <div className="flex flex-col sm:flex-row gap-8 items-center bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                                <div className="shrink-0 space-y-2 text-center">
                                    <p className="text-[10px] font-black text-[#08415c] uppercase tracking-widest mb-2">Scan to Pay</p>
                                    <div className="w-32 h-32 bg-white rounded-xl border border-[#ebbab9]/20 p-2 shadow-sm flex items-center justify-center">
                                        {/* Placeholder for QR Code */}
                                        <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                                            <QrCode className="w-12 h-12 text-gray-300" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-4 w-full">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-[#388697] uppercase tracking-widest">Bank Details</p>
                                        <div className="space-y-1">
                                            <p className="text-sm font-bold text-[#08415c]">{upgradePaymentDetails.bank}</p>
                                            <p className="text-base font-black text-[#08415c] tracking-wider">{upgradePaymentDetails.account}</p>
                                            <p className="text-xs font-semibold text-[#388697]">{upgradePaymentDetails.accountName}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Upload Proof */}
                            <div className="space-y-4">
                                <Label className="text-sm font-bold text-[#08415c] flex items-center gap-2">
                                    Upload Payment Proof
                                    <span className="text-[#cc2936]">*</span>
                                </Label>
                                <div className="group relative border-2 border-dashed border-[#ebbab9]/50 rounded-2xl hover:border-[#08415c] transition-all bg-gray-50/30 p-8 flex flex-col items-center justify-center cursor-pointer overflow-hidden">
                                    <Upload className="w-8 h-8 text-[#388697] group-hover:scale-110 transition-transform" />
                                    <p className="text-[#08415c] font-bold mt-3 text-sm">Choose File</p>
                                    <p className="text-[#388697] text-[10px] font-medium mt-1 uppercase tracking-widest">PNG or JPG (Max 5MB)</p>
                                </div>
                            </div>

                            {/* Transaction Ref */}
                            <div className="space-y-2">
                                <Label htmlFor="ref" className="text-sm font-bold text-[#08415c]">Transaction Reference (Optional)</Label>
                                <Input
                                    id="ref"
                                    placeholder="Enter reference number if any"
                                    className="h-12 rounded-xl border-[#ebbab9]/30 focus:border-[#08415c] focus:ring-[#08415c]/10 text-sm font-medium"
                                />
                            </div>

                            {/* Submit button */}
                            <Button
                                className="w-full h-14 rounded-2xl bg-[#08415c] text-white font-black text-base hover:bg-[#388697] shadow-xl shadow-[#08415c]/20 transition-all gap-2"
                            >
                                Submit for Approval
                            </Button>

                            {/* Note */}
                            <div className="flex gap-3 p-4 rounded-xl bg-[#cc2936]/5 border border-[#cc2936]/10">
                                <Info className="w-5 h-5 text-[#cc2936] shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-[#cc2936]">Important Note:</p>
                                    <p className="text-xs font-semibold text-[#8b1c24] leading-relaxed">
                                        Payment will be verified within 24 hours. You'll receive a confirmation email once your Pro features are activated.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SellerUpgradePage;

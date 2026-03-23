import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Store, Mail, Lock, User, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/input";
import { Label } from "@/components/shared/ui/label";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        shopName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Demo: redirect to dashboard after "registration"
        navigate("/seller-dashboard");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#08415c] via-[#388697] to-[#b5ffe1] p-4 font-sans">
            <div className="w-full max-w-lg">
                <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/40 p-8 md:p-12">
                    {/* Header */}
                    <div className="flex flex-col items-center mb-10">
                        <div className="w-16 h-16 rounded-2xl bg-[#08415c] flex items-center justify-center shadow-xl shadow-[#08415c]/20 mb-6">
                            <Store className="w-8 h-8 text-[#b5ffe1]" />
                        </div>
                        <h1 className="text-3xl font-black text-[#08415c] mb-2 tracking-tight">Create Your Shop</h1>
                        <p className="text-[#388697] text-sm font-medium text-center">
                            Join thousands of sellers and start your online journey today.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-[#08415c] font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                                    <User className="w-3.5 h-3.5 text-[#388697]" />
                                    Full Name
                                </Label>
                                <Input
                                    id="fullName"
                                    placeholder="John Doe"
                                    required
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="h-12 rounded-xl border-[#ebbab9]/30 bg-[#ebbab9]/5 text-[#08415c] focus:border-[#08415c] transition-all"
                                />
                            </div>

                            {/* Shop Name */}
                            <div className="space-y-2">
                                <Label htmlFor="shopName" className="text-[#08415c] font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                                    <Store className="w-3.5 h-3.5 text-[#388697]" />
                                    Shop Name
                                </Label>
                                <Input
                                    id="shopName"
                                    placeholder="My Awesome Store"
                                    required
                                    value={formData.shopName}
                                    onChange={handleChange}
                                    className="h-12 rounded-xl border-[#ebbab9]/30 bg-[#ebbab9]/5 text-[#08415c] focus:border-[#08415c] transition-all"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-[#08415c] font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5 text-[#388697]" />
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="hello@example.com"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="h-12 rounded-xl border-[#ebbab9]/30 bg-[#ebbab9]/5 text-[#08415c] focus:border-[#08415c] transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-[#08415c] font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                                    <Lock className="w-3.5 h-3.5 text-[#388697]" />
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="h-12 rounded-xl border-[#ebbab9]/30 bg-[#ebbab9]/5 text-[#08415c] focus:border-[#08415c] transition-all"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-[#08415c] font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                                    <ShieldCheck className="w-3.5 h-3.5 text-[#388697]" />
                                    Confirm
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="h-12 rounded-xl border-[#ebbab9]/30 bg-[#ebbab9]/5 text-[#08415c] focus:border-[#08415c] transition-all"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-14 rounded-2xl text-lg font-bold bg-[#08415c] text-white hover:bg-[#388697] shadow-xl shadow-[#08415c]/20 transition-all duration-300 flex items-center justify-center gap-3 mt-4"
                        >
                            Register Shop
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-10 pt-6 border-t border-gray-100 text-center">
                        <p className="text-sm text-[#388697] font-medium">
                            Already have an account?{" "}
                            <Link to="/login" className="text-[#08415c] font-bold hover:underline">
                                Log in here
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Bottom decoration */}
                <p className="text-center text-[10px] text-white/60 mt-8 font-black uppercase tracking-[0.2em]">
                    Powered by WhatsLink.lk
                </p>
            </div>
        </div>
    );
}

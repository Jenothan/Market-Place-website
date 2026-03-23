import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Mail, Lock, ArrowRight, Store, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/input";
import { Label } from "@/components/shared/ui/label";
import { verifyLogin } from "@/lib/data";

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const role = await verifyLogin(email, password);

        if (role === "admin") {
            navigate("/dashboard");
        } else if (role === "seller") {
            navigate("/seller-dashboard");
        } else {
            setError("Invalid email or password. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#08415c] via-[#388697] to-[#b5ffe1] p-4">
            {/* Glassmorphism card */}
            <div className="w-full max-w-md">
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 p-8 md:p-10">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#08415c] to-[#388697] flex items-center justify-center shadow-lg shadow-[#08415c]/30">
                            <ShieldCheck className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-bold text-center text-[#08415c] mb-1">
                        Login
                    </h1>
                    <p className="text-center text-[#388697] mb-8 text-sm">
                        Welcome back! Please login to your account.
                    </p>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 text-sm animate-in fade-in slide-in-from-top-2">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <p className="font-medium">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="text-[#08415c] font-semibold text-sm flex items-center gap-2"
                            >
                                <Mail className="w-4 h-4 text-[#388697]" />
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-12 rounded-xl border-[#ebbab9] bg-[#ebbab9]/10 text-[#08415c] placeholder:text-[#388697]/50 focus:border-[#388697] focus:ring-[#388697]/20 transition-all"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="password"
                                className="text-[#08415c] font-semibold text-sm flex items-center gap-2"
                            >
                                <Lock className="w-4 h-4 text-[#388697]" />
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-12 rounded-xl border-[#ebbab9] bg-[#ebbab9]/10 text-[#08415c] placeholder:text-[#388697]/50 focus:border-[#388697] focus:ring-[#388697]/20 transition-all"
                            />
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 rounded-xl text-base font-semibold bg-gradient-to-r from-[#08415c] via-[#388697] to-[#08415c] bg-[length:200%_100%] hover:bg-right text-white shadow-lg shadow-[#08415c]/30 transition-all duration-500 cursor-pointer flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Login to Account
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Demo note */}
                    <div className="mt-6 p-4 rounded-xl bg-[#08415c]/5 border border-[#08415c]/10 text-center">
                        <p className="text-[10px] font-bold text-[#08415c] uppercase tracking-wider mb-2">Demo Credentials</p>
                        <div className="grid grid-cols-2 gap-4 text-left">
                            <div>
                                <p className="text-[9px] text-[#388697] font-black uppercase">Admin</p>
                                <p className="text-[10px] text-[#08415c] font-medium truncate">admin@shopmanager.com</p>
                                <p className="text-[10px] text-[#08415c] font-medium">admin123</p>
                            </div>
                            <div>
                                <p className="text-[9px] text-[#388697] font-black uppercase">Seller</p>
                                <p className="text-[10px] text-[#08415c] font-medium truncate">seller@example.com</p>
                                <p className="text-[10px] text-[#08415c] font-medium">seller123</p>
                            </div>
                        </div>
                    </div>

                    {/* Register Link */}
                    <div className="mt-8 pt-6 border-t border-gray-100/50 text-center">
                        <p className="text-sm text-[#388697] font-medium mb-3">
                            Don't have a shop yet?
                        </p>
                        <Button
                            onClick={() => navigate("/register")}
                            variant="outline"
                            className="w-full h-11 rounded-xl border-[#ebbab9] text-[#08415c] font-bold hover:bg-[#ebbab9]/10 transition-all flex items-center justify-center gap-2"
                        >
                            <Store className="w-4 h-4" />
                            Register Your Shop
                        </Button>
                    </div>
                </div>

                {/* Bottom decoration */}
                <div className="flex justify-center mt-6 gap-2">
                    <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-white/40 animate-pulse delay-100" />
                    <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse delay-200" />
                </div>
            </div>
        </div>
    );
}

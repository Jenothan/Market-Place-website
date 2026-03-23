import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Crown,
    Mail,
    Calendar,
    Shield,
    Activity,
    User,
    CheckCircle,
    Loader2
} from "lucide-react";
import { Card, CardContent } from "@/components/shared/ui/card";
import { Button } from "@/components/shared/ui/button";
import { fetchAdminUserById, type AdminUser } from "@/lib/data";

export default function AdminUserDetailPage() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<AdminUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            fetchAdminUserById(parseInt(userId)).then((data) => {
                if (data) setUser(data);
                setLoading(false);
            });
        }
    }, [userId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-[#388697]" />
                <p className="text-[#388697] font-medium pulse">Loading user details...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center py-20">
                <p className="text-red-500 font-bold text-xl">User not found</p>
                <Button onClick={() => navigate("/dashboard/all-users")} className="mt-4">
                    Back to Users
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/dashboard/all-users")}
                    className="text-[#388697] hover:bg-[#388697]/10 gap-1.5 shrink-0"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Back</span>
                </Button>
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[#08415c]">User Details</h1>
                    <p className="text-xs sm:text-sm text-[#388697] mt-0.5">
                        Manage and view complete profile for {user.name}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Profile Card */}
                <Card className="border-[#ebbab9]/30 shadow-lg overflow-hidden">
                    <div className="h-24 bg-gradient-to-r from-[#08415c] to-[#388697]" />
                    <CardContent className="p-6 -mt-12 text-center">
                        <div className="w-24 h-24 rounded-full border-4 border-white bg-white mx-auto flex items-center justify-center shadow-lg overflow-hidden">
                            <div className={`w-full h-full flex items-center justify-center text-white font-bold text-3xl ${user.plan === "Pro" ? "bg-[#388697]" : "bg-[#08415c]"}`}>
                                {user.name.charAt(0)}
                            </div>
                        </div>
                        <h2 className="mt-4 text-xl font-bold text-[#08415c]">{user.name}</h2>
                        <p className="text-[#388697] text-sm flex items-center justify-center gap-1.5 mt-1">
                            <Mail className="w-3.5 h-3.5" />
                            {user.email}
                        </p>

                        <div className="flex items-center justify-center gap-2 mt-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${user.plan === "Pro" ? "bg-[#388697] text-white" : "bg-gray-100 text-[#08415c]"}`}>
                                {user.plan === "Pro" && <Crown className="w-3.5 h-3.5" />}
                                {user.plan} Plan
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.status === "Active" ? "bg-emerald-500 text-white" : "bg-amber-100 text-amber-700"}`}>
                                {user.status}
                            </span>
                        </div>

                        <div className="mt-8 space-y-3">
                            <Button className="w-full bg-[#08415c] hover:bg-[#08415c]/90 text-white rounded-xl gap-2 h-11">
                                <Mail className="w-4 h-4" />
                                Send Message
                            </Button>
                            <Button variant="outline" className="w-full border-[#08415c] text-[#08415c] hover:bg-[#08415c]/5 rounded-xl h-11">
                                Edit Profile
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <Card className="border-[#ebbab9]/30 shadow-sm">
                            <CardContent className="p-4 flex flex-col items-center text-center gap-1">
                                <Calendar className="w-5 h-5 text-[#388697] mb-1" />
                                <p className="text-[10px] text-[#388697] uppercase font-bold tracking-wider">Joined</p>
                                <p className="text-sm font-bold text-[#08415c]">{user.joinDate}</p>
                            </CardContent>
                        </Card>
                        <Card className="border-[#ebbab9]/30 shadow-sm">
                            <CardContent className="p-4 flex flex-col items-center text-center gap-1">
                                <Shield className="w-5 h-5 text-[#388697] mb-1" />
                                <p className="text-[10px] text-[#388697] uppercase font-bold tracking-wider">Security</p>
                                <p className="text-sm font-bold text-emerald-600">Verified</p>
                            </CardContent>
                        </Card>
                        <Card className="border-[#ebbab9]/30 shadow-sm col-span-2 sm:col-span-1">
                            <CardContent className="p-4 flex flex-col items-center text-center gap-1">
                                <Activity className="w-5 h-5 text-[#388697] mb-1" />
                                <p className="text-[10px] text-[#388697] uppercase font-bold tracking-wider">Last Login</p>
                                <p className="text-sm font-bold text-[#08415c]">2 hours ago</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Shop Information */}
                    <Card className="border-[#ebbab9]/30 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-[#ebbab9]/20 bg-gray-50/50 flex items-center justify-between">
                            <h3 className="font-bold text-[#08415c] flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Account Information
                            </h3>
                            <Button variant="link" size="sm" className="text-[#388697] h-auto p-0 font-bold text-xs uppercase tracking-wider">Update</Button>
                        </div>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                                <div className="space-y-1">
                                    <p className="text-[10px] text-[#388697] uppercase font-bold tracking-wider">Full Name</p>
                                    <p className="text-[#08415c] font-medium">{user.name}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] text-[#388697] uppercase font-bold tracking-wider">Email Address</p>
                                    <p className="text-[#08415c] font-medium">{user.email}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] text-[#388697] uppercase font-bold tracking-wider">Subscription Plan</p>
                                    <p className="text-[#08415c] font-medium flex items-center gap-1.5">
                                        {user.plan}
                                        {user.plan === "Pro" && <Crown className="w-3.5 h-3.5 text-amber-500" />}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] text-[#388697] uppercase font-bold tracking-wider">Account Status</p>
                                    <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
                                        <CheckCircle className="w-4 h-4" />
                                        Active
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Subscription History (Mock) */}
                    <Card className="border-[#ebbab9]/30 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-[#ebbab9]/20 bg-gray-50/50">
                            <h3 className="font-bold text-[#08415c]">Subscription History</h3>
                        </div>
                        <CardContent className="p-0">
                            <div className="divide-y divide-[#ebbab9]/10">
                                {[
                                    { date: "2026-02-15", plan: "Pro", amount: "Rs. 750", status: "Success" },
                                    { date: "2026-01-15", plan: "Pro", amount: "Rs. 750", status: "Success" },
                                ].map((row, i) => (
                                    <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                                        <div>
                                            <p className="font-semibold text-[#08415c] text-sm">{row.plan} Monthly</p>
                                            <p className="text-xs text-[#388697] mt-0.5">{row.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-[#08415c] text-sm">{row.amount}</p>
                                            <p className="text-[10px] text-emerald-600 font-bold uppercase">{row.status}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

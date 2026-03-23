import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    ArrowLeft,
    Users,
    Crown,
    UserCheck,
    Search,
    ArrowRight,
    Loader2
} from "lucide-react";
import { Card, CardContent } from "@/components/shared/ui/card";
import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/input";
import { fetchAdminUsers, type AdminUser } from "@/lib/data";

const planFilters = ["All Plans", "Free", "Pro"] as const;
const statusFilters = ["All Status", "Active", "Pending"] as const;

export default function AllUsersPage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [planFilter, setPlanFilter] = useState<string>("All Plans");
    const [statusFilter, setStatusFilter] = useState<string>("All Status");
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAdminUsers().then((data) => {
            setUsers(data);
            setLoading(false);
        });
    }, []);

    const filtered = users.filter((u) => {
        const matchSearch =
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase());
        const matchPlan = planFilter === "All Plans" || u.plan === planFilter;
        const matchStatus =
            statusFilter === "All Status" || u.status === statusFilter;
        return matchSearch && matchPlan && matchStatus;
    });

    const totalUsers = users.length;
    const proUsers = users.filter((u) => u.plan === "Pro").length;
    const activeUsers = users.filter((u) => u.status === "Active").length;

    return (
        <div className="space-y-6">
            {loading && (
                <div className="flex items-center justify-center py-16">
                    <Loader2 className="w-8 h-8 animate-spin text-[#388697]" />
                </div>
            )}
            {!loading && <>
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate("/dashboard")}
                            className="hidden sm:flex text-[#388697] hover:bg-[#388697]/10 gap-1.5 cursor-pointer"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </Button>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-[#08415c]">All Users</h1>
                            <p className="text-xs sm:text-sm text-[#388697] mt-0.5">
                                Manage and view all shop users
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#388697] text-white font-bold text-[10px] sm:text-sm shadow-md">
                            {totalUsers} Total
                        </span>
                        <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#08415c] text-white font-bold text-[10px] sm:text-sm shadow-md">
                            {proUsers} Pro
                        </span>
                    </div>
                </div>

                {/* Summary stats cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
                    <Card className="border-[#ebbab9]/30 shadow-sm">
                        <CardContent className="p-3.5 sm:p-5 flex items-center gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#388697] flex items-center justify-center shadow-md shrink-0">
                                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] sm:text-xs text-[#388697] font-medium truncate">Total Users</p>
                                <p className="text-xl sm:text-2xl font-bold text-[#08415c]">{totalUsers}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-[#ebbab9]/30 shadow-sm">
                        <CardContent className="p-3.5 sm:p-5 flex items-center gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#08415c] flex items-center justify-center shadow-md shrink-0">
                                <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] sm:text-xs text-[#388697] font-medium truncate">Pro Users</p>
                                <p className="text-xl sm:text-2xl font-bold text-[#08415c]">{proUsers}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-[#ebbab9]/30 shadow-sm col-span-2 sm:col-span-1">
                        <CardContent className="p-3.5 sm:p-5 flex items-center gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-emerald-500 flex items-center justify-center shadow-md shrink-0">
                                <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] sm:text-xs text-[#388697] font-medium truncate">
                                    Active Users
                                </p>
                                <p className="text-xl sm:text-2xl font-bold text-[#08415c]">{activeUsers}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search & Filters */}
                <Card className="border-[#ebbab9]/30 shadow-sm">
                    <CardContent className="p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            {/* Search */}
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#388697]/50" />
                                <Input
                                    placeholder="Search by email or name..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10 h-10 rounded-xl border-[#ebbab9] bg-[#ebbab9]/5 text-[#08415c] placeholder:text-[#388697]/40"
                                />
                            </div>

                            {/* Plan filter */}
                            <div className="flex gap-1.5 flex-wrap">
                                {planFilters.map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setPlanFilter(p)}
                                        className={`px-3.5 py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold transition-all cursor-pointer ${planFilter === p
                                            ? "bg-[#08415c] text-white shadow-md"
                                            : "bg-gray-100 text-[#08415c] hover:bg-gray-200"
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>

                            {/* Status filter */}
                            <div className="flex gap-1.5 flex-wrap">
                                {statusFilters.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setStatusFilter(s)}
                                        className={`px-3.5 py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold transition-all cursor-pointer ${statusFilter === s
                                            ? "bg-[#08415c] text-white shadow-md"
                                            : "bg-gray-100 text-[#08415c] hover:bg-gray-200"
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* User list */}
                <div className="space-y-4">
                    {filtered.map((user) => (
                        <Link
                            key={user.id}
                            to={`/dashboard/all-users/${user.id}`}
                            className="block"
                        >
                            <Card className="border-[#ebbab9]/30 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden border-l-4 border-transparent data-[plan=Pro]:border-l-[#388697]" data-plan={user.plan}>
                                <CardContent className="p-4 sm:p-5">
                                    <div className="flex items-center gap-4 sm:gap-6">
                                        {/* Avatar */}
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold text-base text-white shadow-sm group-hover:scale-105 transition-transform ${user.plan === "Pro" ? "bg-[#388697]" : "bg-[#08415c]"
                                                }`}
                                        >
                                            {user.name.charAt(0)}
                                        </div>

                                        {/* Content Area */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-0.5">
                                                        <p className="font-bold text-[#08415c] text-sm sm:text-base truncate">
                                                            {user.name}
                                                        </p>
                                                        {user.plan === "Pro" && <Crown className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                                                    </div>
                                                    <p className="text-xs text-[#388697] truncate">{user.email}</p>
                                                </div>

                                                <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-12">
                                                    <div className="sm:text-right">
                                                        <p className="text-[10px] text-[#388697] font-bold uppercase tracking-wider mb-0.5">Status</p>
                                                        <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold ${user.status === "Active" ? "bg-emerald-500 text-white" : "bg-amber-100 text-amber-700"}`}>
                                                            {user.status}
                                                        </span>
                                                    </div>
                                                    <div className="sm:text-right">
                                                        <p className="text-[10px] text-[#388697] font-bold uppercase tracking-wider mb-0.5">Joined</p>
                                                        <p className="font-semibold text-[#08415c] text-xs sm:text-sm">{user.joinDate}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="shrink-0 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ArrowRight className="w-5 h-5 text-[#388697]" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}

                    {filtered.length === 0 && (
                        <div className="text-center py-12 text-[#388697]">
                            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                            <p className="font-medium">No users found</p>
                            <p className="text-sm opacity-60">
                                Try adjusting your search or filters
                            </p>
                        </div>
                    )}
                </div>
            </>}
        </div>
    );
}

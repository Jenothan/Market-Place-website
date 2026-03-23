import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Users,
    Crown,
    UserCheck,
    Search,
    Eye,
    Mail,
    Loader2,
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

                {/* Summary stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <Card className="border-[#ebbab9]/30 shadow-sm">
                        <CardContent className="p-5 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#388697] flex items-center justify-center shadow-md">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-xs text-[#388697] font-medium">Total Users</p>
                                <p className="text-3xl font-bold text-[#08415c]">{totalUsers}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-[#ebbab9]/30 shadow-sm">
                        <CardContent className="p-5 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#08415c] flex items-center justify-center shadow-md">
                                <Crown className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-xs text-[#388697] font-medium">Pro Users</p>
                                <p className="text-3xl font-bold text-[#08415c]">{proUsers}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-[#ebbab9]/30 shadow-sm">
                        <CardContent className="p-5 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center shadow-md">
                                <UserCheck className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-xs text-[#388697] font-medium">
                                    Active Users
                                </p>
                                <p className="text-3xl font-bold text-[#08415c]">{activeUsers}</p>
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
                            <div className="flex gap-1.5">
                                {planFilters.map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setPlanFilter(p)}
                                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${planFilter === p
                                            ? "bg-[#08415c] text-white shadow-md"
                                            : "bg-gray-100 text-[#08415c] hover:bg-gray-200"
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>

                            {/* Status filter */}
                            <div className="flex gap-1.5">
                                {statusFilters.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setStatusFilter(s)}
                                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${statusFilter === s
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
                <div className="space-y-3">
                    {filtered.map((user) => (
                        <Card
                            key={user.id}
                            className="border-[#ebbab9]/30 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <CardContent className="p-5">
                                <div className="flex items-center gap-5">
                                    {/* Avatar */}
                                    <div
                                        className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 font-bold text-sm text-white ${user.plan === "Pro" ? "bg-[#388697]" : "bg-[#08415c]"
                                            }`}
                                    >
                                        {user.name.charAt(0)}
                                    </div>

                                    {/* Details grid */}
                                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
                                        <div>
                                            <p className="text-[10px] text-[#388697] font-medium uppercase tracking-wider">
                                                User Details
                                            </p>
                                            <p className="font-semibold text-[#08415c] text-sm">
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-[#388697]">{user.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-[#388697] font-medium uppercase tracking-wider">
                                                Plan
                                            </p>
                                            <span
                                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold ${user.plan === "Pro"
                                                    ? "bg-[#388697] text-white"
                                                    : "bg-gray-200 text-[#08415c]"
                                                    }`}
                                            >
                                                {user.plan === "Pro" && (
                                                    <Crown className="w-3 h-3" />
                                                )}
                                                {user.plan}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-[#388697] font-medium uppercase tracking-wider">
                                                Status
                                            </p>
                                            <span
                                                className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-bold ${user.status === "Active"
                                                    ? "bg-emerald-500 text-white"
                                                    : "bg-amber-100 text-amber-700"
                                                    }`}
                                            >
                                                {user.status}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-[#388697] font-medium uppercase tracking-wider">
                                                Join Date
                                            </p>
                                            <p className="font-semibold text-[#08415c] text-sm">
                                                {user.joinDate}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 justify-end">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-[#388697] hover:bg-[#388697]/10 gap-1 cursor-pointer text-xs"
                                            >
                                                <Eye className="w-3.5 h-3.5" />
                                                View
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-[#388697] hover:bg-[#388697]/10 gap-1 cursor-pointer text-xs"
                                            >
                                                <Mail className="w-3.5 h-3.5" />
                                                Email
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
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

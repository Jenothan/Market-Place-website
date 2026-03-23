import { useNavigate } from "react-router-dom";
import {
    Users,
    Crown,
    Clock,
    DollarSign,
    TrendingUp,
    TrendingDown,
    ArrowRight,
    CheckCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/shared/ui/card";
import { Button } from "@/components/shared/ui/button";
import { adminStats } from "@/lib/data";

/* ── Stat icon / colour mapping ─────────────────── */
const statMeta = [
    { icon: Users, iconBg: "bg-[#388697]", iconColor: "text-white" },
    { icon: Crown, iconBg: "bg-[#08415c]", iconColor: "text-white" },
    { icon: Clock, iconBg: "bg-[#cc2936]", iconColor: "text-white" },
    { icon: DollarSign, iconBg: "bg-gradient-to-br from-[#388697] to-[#b5ffe1]", iconColor: "text-[#08415c]" },
];

/* ── Workflow steps ──────────────────────────────── */
const workflowSteps = [
    { num: 1, title: "View Admin Dashboard", desc: "Current location · Overview of all metrics", color: "bg-[#08415c]" },
    { num: 2, title: "View Pending Payment Requests", desc: "Review user payment submissions", color: "bg-[#388697]" },
    { num: 3, title: "Review & Approve/Reject", desc: "Make decisions on payment requests", color: "bg-[#ebbab9]" },
    { num: 4, title: "System Automation", desc: "Auto-unlock features & send confirmation emails", color: "bg-[#b5ffe1]" },
];

export default function DashboardPage() {
    const navigate = useNavigate();
    const stats = adminStats.map((s, i) => ({ ...s, ...statMeta[i] }));

    return (
        <div className="space-y-6 sm:space-y-8">
            {/* ── Header ───────────────────────────────── */}
            <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#08415c]">Admin Dashboard</h1>
                <p className="text-xs sm:text-sm text-[#388697] mt-1">
                    Welcome back! Here's an overview of your shop management system.
                </p>
            </div>

            {/* ── Stat cards ───────────────────────────── */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-5">
                {stats.map((s) => (
                    <Card
                        key={s.title}
                        className="border-[#ebbab9]/30 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group"
                    >
                        <CardContent className="p-3 sm:p-5">
                            <div className="flex items-start justify-between mb-3 sm:mb-4">
                                <div
                                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${s.iconBg} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}
                                >
                                    <s.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${s.iconColor}`} />
                                </div>
                                <span
                                    className={`flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${s.up
                                        ? "bg-[#b5ffe1]/40 text-[#08415c]"
                                        : "bg-[#cc2936]/10 text-[#cc2936]"
                                        }`}
                                >
                                    {s.up ? (
                                        <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                    ) : (
                                        <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                    )}
                                    {s.change}
                                </span>
                            </div>
                            <p className="text-[10px] sm:text-xs text-[#388697] font-medium truncate">{s.title}</p>
                            <p className="text-lg sm:text-2xl font-bold text-[#08415c] mt-0.5">
                                {s.value}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* ── Action cards row ─────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {/* Pending Payment Requests */}
                <Card className="border-[#ebbab9]/30 shadow-sm">
                    <CardContent className="p-5 sm:p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-base sm:text-lg font-bold text-[#08415c]">
                                    Pending Payment Requests
                                </h3>
                                <p className="text-xs sm:text-sm text-[#388697] mt-1">
                                    You have {adminStats[2].value} payment requests waiting for approval
                                </p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-[#cc2936]/10 flex items-center justify-center shrink-0">
                                <Clock className="w-5 h-5 text-[#cc2936]" />
                            </div>
                        </div>
                        <Button
                            onClick={() => navigate("/dashboard/pending-payments")}
                            className="w-full h-11 rounded-xl font-semibold bg-gradient-to-r from-[#08415c] via-[#388697] to-[#08415c] bg-[length:200%_100%] hover:bg-right text-white shadow-md shadow-[#08415c]/20 transition-all duration-500 cursor-pointer gap-2"
                        >
                            Review Payments
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </CardContent>
                </Card>

                {/* Recent Approvals */}
                <Card className="border-[#ebbab9]/30 shadow-sm">
                    <CardContent className="p-5 sm:p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-base sm:text-lg font-bold text-[#08415c]">
                                    Recent Approvals
                                </h3>
                                <p className="text-xs sm:text-sm text-[#388697] mt-1">
                                    View your recently approved payment requests
                                </p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-[#388697]/10 flex items-center justify-center shrink-0">
                                <CheckCircle className="w-5 h-5 text-[#388697]" />
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => navigate("/dashboard/recent-approvals")}
                            className="w-full h-11 rounded-xl font-semibold border-[#08415c] text-[#08415c] hover:bg-[#08415c] hover:text-white transition-all duration-300 cursor-pointer gap-2"
                        >
                            View Approvals
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* ── Admin Workflow ────────────────────────── */}
            <Card className="border-[#ebbab9]/30 shadow-sm">
                <CardContent className="p-5 sm:p-6">
                    <h3 className="text-base sm:text-lg font-bold text-[#08415c] mb-6">
                        Admin Workflow
                    </h3>
                    <div className="space-y-6">
                        {workflowSteps.map((step, i) => (
                            <div key={step.num} className="flex items-start gap-4 group">
                                {/* Step number + line */}
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${step.color} flex items-center justify-center text-xs sm:text-sm font-bold shadow-md ${step.num <= 2 ? "text-white" : "text-[#08415c]"
                                            }`}
                                    >
                                        {step.num}
                                    </div>
                                    {i < workflowSteps.length - 1 && (
                                        <div className="w-0.5 h-8 bg-[#ebbab9]/50 mt-2" />
                                    )}
                                </div>
                                {/* Step content */}
                                <div className="pt-1 sm:pt-2">
                                    <p className="font-semibold text-[#08415c] text-xs sm:text-sm group-hover:text-[#388697] transition-colors">
                                        {step.title}
                                    </p>
                                    <p className="text-[10px] sm:text-xs text-[#388697] mt-0.5">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

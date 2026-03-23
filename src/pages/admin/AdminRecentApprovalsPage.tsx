import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    ArrowLeft,
    CheckCircle2,
    XCircle,
    Mail,
    ArrowRight,
    Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/shared/ui/card";
import { Button } from "@/components/shared/ui/button";
import { fetchRecentApprovals, type Approval } from "@/lib/data";

export default function RecentApprovalsPage() {
    const navigate = useNavigate();
    const [approvals, setApprovals] = useState<Approval[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecentApprovals().then((data) => {
            setApprovals(data);
            setLoading(false);
        });
    }, []);

    const totalApproved = approvals.filter((a) => a.status === "approved").length;
    const totalRejected = approvals.filter((a) => a.status === "rejected").length;

    return (
        <div className="space-y-6">
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
                        <h1 className="text-xl sm:text-2xl font-bold text-[#08415c]">
                            Recent Approvals
                        </h1>
                        <p className="text-xs sm:text-sm text-[#388697] mt-0.5">
                            STEP 6: View payment decisions and system actions
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-emerald-500 text-white font-bold text-[10px] sm:text-sm">
                        {totalApproved} Approved
                    </span>
                    <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#cc2936] text-white font-bold text-[10px] sm:text-sm">
                        {totalRejected} Rejected
                    </span>
                </div>
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex items-center justify-center py-16">
                    <Loader2 className="w-8 h-8 animate-spin text-[#388697]" />
                </div>
            )}

            {!loading && <>
                {/* Summary stat cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
                    <Card className="border-[#ebbab9]/30 shadow-sm bg-emerald-50">
                        <CardContent className="p-3.5 sm:p-5 flex items-center gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-emerald-500 flex items-center justify-center shadow-md shrink-0">
                                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] sm:text-xs text-[#388697] font-medium truncate">
                                    Total Approved
                                </p>
                                <p className="text-xl sm:text-3xl font-bold text-[#08415c]">
                                    {totalApproved}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-[#ebbab9]/30 shadow-sm bg-red-50">
                        <CardContent className="p-3.5 sm:p-5 flex items-center gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#cc2936] flex items-center justify-center shadow-md shrink-0">
                                <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] sm:text-xs text-[#388697] font-medium truncate">
                                    Total Rejected
                                </p>
                                <p className="text-xl sm:text-3xl font-bold text-[#08415c]">
                                    {totalRejected}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-[#ebbab9]/30 shadow-sm bg-blue-50 col-span-2 sm:col-span-1">
                        <CardContent className="p-3.5 sm:p-5 flex items-center gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#388697] flex items-center justify-center shadow-md shrink-0">
                                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] sm:text-xs text-[#388697] font-medium truncate">Emails Sent</p>
                                <p className="text-xl sm:text-3xl font-bold text-[#08415c]">
                                    {approvals.length}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Approvals list */}
                <div className="space-y-4">
                    {approvals.map((item) => (
                        <Link
                            key={item.id}
                            to={`/dashboard/recent-approvals/${item.id}`}
                            className="block"
                        >
                            <Card
                                className="border-[#ebbab9]/30 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border-l-4 border-l-transparent data-[status=approved]:border-l-emerald-500 data-[status=rejected]:border-l-[#cc2936]"
                                data-status={item.status}
                            >
                                <CardContent className="p-4 sm:p-5">
                                    <div className="flex items-center gap-4 sm:gap-6">
                                        {/* Left Side: Status & Amount (Mobile) / Icon (Desktop) */}
                                        <div className="hidden sm:flex w-12 h-12 rounded-full items-center justify-center shrink-0 bg-gray-50 group-hover:bg-white transition-colors border border-gray-100">
                                            {item.status === "approved" ? (
                                                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                                            ) : (
                                                <XCircle className="w-6 h-6 text-[#cc2936]" />
                                            )}
                                        </div>

                                        {/* Main Content Area */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2 mb-0.5">
                                                        <p className="font-bold text-[#08415c] truncate text-sm sm:text-base">
                                                            {item.name}
                                                        </p>
                                                        <span className={`inline-block sm:hidden px-2 py-0.5 rounded text-[90%] font-bold text-white ${item.status === "approved" ? "bg-emerald-500" : "bg-[#cc2936]"}`}>
                                                            {item.status === "approved" ? "✓" : "✕"}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-[#388697] truncate">{item.email}</p>
                                                </div>

                                                <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 sm:gap-10">
                                                    <div className="sm:text-right">
                                                        <p className="text-[10px] text-[#388697] font-bold uppercase tracking-wider mb-0.5">
                                                            Reference
                                                        </p>
                                                        <p className="font-semibold text-[#08415c] text-xs sm:text-sm truncate font-mono">
                                                            {item.reference}
                                                        </p>
                                                    </div>
                                                    <div className="sm:text-right">
                                                        <p className="text-[10px] text-[#388697] font-bold uppercase tracking-wider mb-0.5">
                                                            Amount
                                                        </p>
                                                        <p className={`font-black text-sm sm:text-base ${item.status === "approved" ? "text-[#388697]" : "text-[#cc2936]"}`}>
                                                            {item.amount}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="hidden sm:flex items-center justify-between mt-3 pt-3 border-t border-[#ebbab9]/10">
                                                <p className="text-[10px] text-[#388697] font-medium italic truncate max-w-[70%]">
                                                    {item.note.replace('\n', ' • ')}
                                                </p>
                                                <p className="text-[10px] font-bold text-[#388697]/60">
                                                    Processed on {item.date}
                                                </p>
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
                </div>

                {/* Automated System Actions */}
                <Card className="border-[#ebbab9]/30 shadow-sm">
                    <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-[#08415c] mb-5">
                            Automated System Actions
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <p className="font-semibold text-emerald-600 text-sm mb-3">
                                    For Approved Payments:
                                </p>
                                <ul className="space-y-2 text-sm text-[#08415c]">
                                    <li>✓ Pro features automatically unlocked</li>
                                    <li>✓ Confirmation email sent to user</li>
                                    <li>✓ Payment status updated in database</li>
                                    <li>✓ User moved to Recent Approvals list</li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-semibold text-[#cc2936] text-sm mb-3">
                                    For Rejected Payments:
                                </p>
                                <ul className="space-y-2 text-sm text-[#08415c]">
                                    <li>✓ Support ticket marked as rejected</li>
                                    <li>✓ Rejection email sent to user</li>
                                    <li>✓ Payment status updated in database</li>
                                    <li>✓ Entry logged for record keeping</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex justify-center mt-8">
                            <Button
                                onClick={() => navigate("/dashboard/pending-payments")}
                                className="h-11 px-8 rounded-xl font-semibold bg-gradient-to-r from-[#08415c] via-[#388697] to-[#08415c] bg-[length:200%_100%] hover:bg-right text-white shadow-md shadow-[#08415c]/20 transition-all duration-500 cursor-pointer gap-2"
                            >
                                Process More Payments
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </>}
        </div>
    );
}

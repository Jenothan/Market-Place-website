import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    ArrowLeft,
    Clock,
    ArrowRight,
    Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/shared/ui/card";
import { Button } from "@/components/shared/ui/button";
import { fetchPendingPayments, type PendingPayment } from "@/lib/data";

export default function PendingPaymentsPage() {
    const navigate = useNavigate();
    const [payments, setPayments] = useState<PendingPayment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPendingPayments().then((data) => {
            setPayments(data);
            setLoading(false);
        });
    }, []);

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
                            Pending Payment Requests
                        </h1>
                        <p className="text-xs sm:text-sm text-[#388697] mt-0.5">
                            STEP 2: View and process payment approval requests
                        </p>
                    </div>
                </div>
                {!loading && (
                    <span className="self-start sm:self-auto px-4 py-2 rounded-xl bg-[#cc2936]/10 text-[#cc2936] font-bold text-xs sm:text-sm">
                        {payments.length} Pending
                    </span>
                )}
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex items-center justify-center py-16">
                    <Loader2 className="w-8 h-8 animate-spin text-[#388697]" />
                </div>
            )}

            {/* Payment list */}
            {!loading && (
                <div className="space-y-4">
                    {payments.map((payment) => (
                        <Link
                            key={payment.id}
                            to={`/dashboard/pending-payments/${payment.id}`}
                            className="block"
                        >
                            <Card className="border-[#ebbab9]/30 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden border-l-4 border-l-[#cc2936]">
                                <CardContent className="p-4 sm:p-5">
                                    <div className="flex items-center gap-4 sm:gap-6">
                                        {/* Left Side: Icon */}
                                        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0 border border-red-100 group-hover:bg-red-500/10 transition-colors text-[#cc2936]">
                                            <Clock className="w-6 h-6" />
                                        </div>

                                        {/* Main Content Area */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                                                <div>
                                                    <p className="font-bold text-[#08415c] text-sm sm:text-base truncate">
                                                        {payment.name}
                                                    </p>
                                                    <p className="text-xs text-[#388697] truncate">{payment.email}</p>
                                                </div>

                                                <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 sm:gap-10">
                                                    <div className="sm:text-right">
                                                        <p className="text-[10px] text-[#388697] font-bold uppercase tracking-wider mb-0.5">Reference</p>
                                                        <p className="font-semibold text-[#08415c] text-xs sm:text-sm font-mono truncate">{payment.reference}</p>
                                                    </div>
                                                    <div className="sm:text-right">
                                                        <p className="text-[10px] text-[#388697] font-bold uppercase tracking-wider mb-0.5">Amount</p>
                                                        <p className="font-black text-[#388697] text-sm sm:text-base">{payment.amount}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-3 pt-3 border-t border-[#ebbab9]/10 flex items-center justify-between">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                                    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Pending Review</p>
                                                </div>
                                                <p className="text-[10px] font-bold text-[#388697]/60">Date: {payment.date}</p>
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
                    {payments.length === 0 && (
                        <Card className="border-dashed border-2 border-[#ebbab9]/30 bg-gray-50/50">
                            <CardContent className="py-20 text-center">
                                <p className="text-[#388697] font-medium">No pending payments found.</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}
        </div>
    );
}

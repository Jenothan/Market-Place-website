import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Clock,
    Eye,
    Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/shared/ui/card";
import { Button } from "@/components/shared/ui/button";
import { fetchPendingPayments, type PendingPayment } from "@/lib/data";

export default function PendingPaymentsPage() {
    const navigate = useNavigate();
    const [payments, setPayments] = useState<PendingPayment[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState<number | null>(null);

    useEffect(() => {
        fetchPendingPayments().then((data) => {
            setPayments(data);
            setLoading(false);
        });
    }, []);

    const handleReview = (id: number) => {
        setProcessingId(id);
        setTimeout(() => {
            setProcessingId(null);
            setPayments(prev => prev.filter(p => p.id !== id));
            // In a real app, this would open a modal or navigate to a detail page
            alert("Payment request processed successfully! (Demo)");
        }, 1500);
    };

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
                <span className="self-start sm:self-auto px-4 py-2 rounded-xl bg-[#cc2936]/10 text-[#cc2936] font-bold text-xs sm:text-sm">
                    {payments.length} Pending
                </span>
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex items-center justify-center py-16">
                    <Loader2 className="w-8 h-8 animate-spin text-[#388697]" />
                </div>
            )}

            {/* Payment list */}
            {!loading && (
                <div className="space-y-3">
                    {payments.map((payment) => (
                        <Card
                            key={payment.id}
                            className="border-[#ebbab9]/30 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <CardContent className="p-5">
                                <div className="flex items-center gap-6">
                                    {/* User avatar */}
                                    <div className="w-11 h-11 rounded-full bg-[#cc2936]/10 flex items-center justify-center shrink-0">
                                        <Clock className="w-5 h-5 text-[#cc2936]" />
                                    </div>

                                    {/* User details */}
                                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                                        <div>
                                            <p className="text-[10px] text-[#388697] font-medium uppercase tracking-wider">
                                                User Details
                                            </p>
                                            <p className="font-semibold text-[#08415c] text-sm">
                                                {payment.email}
                                            </p>
                                            <p className="text-xs text-[#388697]">{payment.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-[#388697] font-medium uppercase tracking-wider">
                                                Reference
                                            </p>
                                            <p className="font-semibold text-[#08415c] text-sm">
                                                {payment.reference}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-[#388697] font-medium uppercase tracking-wider">
                                                Date
                                            </p>
                                            <p className="font-semibold text-[#08415c] text-sm">
                                                {payment.date}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] text-[#388697] font-medium uppercase tracking-wider">
                                                    Amount
                                                </p>
                                                <p className="font-bold text-[#388697] text-sm">
                                                    {payment.amount}
                                                </p>
                                            </div>
                                            <Button
                                                size="sm"
                                                onClick={() => handleReview(payment.id)}
                                                disabled={processingId === payment.id}
                                                className="bg-[#388697] hover:bg-[#08415c] text-white rounded-lg gap-1.5 cursor-pointer shadow-md min-w-[90px]"
                                            >
                                                {processingId === payment.id ? (
                                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                ) : (
                                                    <Eye className="w-3.5 h-3.5" />
                                                )}
                                                {processingId === payment.id ? "..." : "Review"}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

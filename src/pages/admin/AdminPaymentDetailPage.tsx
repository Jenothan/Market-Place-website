import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Clock,
    CheckCircle,
    XCircle,
    DollarSign,
    Hash,
    Shield,
    Image as ImageIcon,
    Loader2
} from "lucide-react";
import { Card, CardContent } from "@/components/shared/ui/card";
import { Button } from "@/components/shared/ui/button";
import { fetchPendingPaymentById, type PendingPayment } from "@/lib/data";

export default function AdminPaymentDetailPage() {
    const { paymentId } = useParams();
    const navigate = useNavigate();
    const [payment, setPayment] = useState<PendingPayment | null>(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (paymentId) {
            fetchPendingPaymentById(parseInt(paymentId)).then((data) => {
                if (data) setPayment(data);
                setLoading(false);
            });
        }
    }, [paymentId]);

    const handleAction = (status: 'approved' | 'rejected') => {
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            alert(`Payment ${status} successfully! (Demo)`);
            navigate("/dashboard/pending-payments");
        }, 1500);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-[#388697]" />
                <p className="text-[#388697] font-medium pulse">Loading request details...</p>
            </div>
        );
    }

    if (!payment) {
        return (
            <div className="text-center py-20">
                <p className="text-red-500 font-bold text-xl">Payment request not found</p>
                <Button onClick={() => navigate("/dashboard/pending-payments")} className="mt-4">
                    Back to Pending
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
                    onClick={() => navigate("/dashboard/pending-payments")}
                    className="text-[#388697] hover:bg-[#388697]/10 gap-1.5 shrink-0"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Back</span>
                </Button>
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[#08415c]">Review Payment</h1>
                    <p className="text-xs sm:text-sm text-[#388697] mt-0.5">
                        Action required: Verify reference {payment.reference}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Information Side (2 columns on LG) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Main Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Card className="border-[#ebbab9]/30 shadow-md bg-gradient-to-br from-[#08415c] to-[#388697] text-white overflow-hidden">
                            <CardContent className="p-6 flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                                    <DollarSign className="w-7 h-7" />
                                </div>
                                <div>
                                    <p className="text-white/60 font-bold text-[10px] uppercase tracking-widest">Amount to Verify</p>
                                    <p className="text-3xl font-black">{payment.amount}</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-[#ebbab9]/30 shadow-md bg-amber-50 overflow-hidden relative">
                            <CardContent className="p-6 flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center shrink-0">
                                    <Clock className="w-7 h-7 text-white" />
                                </div>
                                <div className="z-10">
                                    <p className="text-amber-700/60 font-bold text-[10px] uppercase tracking-widest">Status</p>
                                    <p className="text-2xl font-black text-amber-700">Pending Review</p>
                                </div>
                                <div className="absolute top-0 right-0 p-2">
                                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Detailed Info Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* User Card */}
                        <Card className="border-[#ebbab9]/30 shadow-sm">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-[#08415c] border-b border-[#ebbab9]/20 pb-2 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                                    <Shield className="w-4 h-4 text-[#388697]" />
                                    User Details
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[10px] text-[#388697] uppercase font-bold tracking-wider">Name</p>
                                        <p className="text-[#08415c] font-semibold">{payment.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-[#388697] uppercase font-bold tracking-wider">Email</p>
                                        <p className="text-[#08415c] font-semibold">{payment.email}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment Card */}
                        <Card className="border-[#ebbab9]/30 shadow-sm">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-[#08415c] border-b border-[#ebbab9]/20 pb-2 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                                    <Hash className="w-4 h-4 text-[#388697]" />
                                    Payment Info
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[10px] text-[#388697] uppercase font-bold tracking-wider">Reference</p>
                                        <p className="text-[#08415c] font-semibold font-mono">{payment.reference}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-[#388697] uppercase font-bold tracking-wider">Submitted On</p>
                                        <p className="text-[#08415c] font-semibold">{payment.date}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Placeholder for Proof Image */}
                    <Card className="border-[#ebbab9]/30 shadow-md">
                        <CardContent className="p-6">
                            <h3 className="font-bold text-[#08415c] pb-4 flex items-center gap-2">
                                <ImageIcon className="w-4 h-4 text-[#388697]" />
                                Payment Proof (Uploaded Screenshot)
                            </h3>
                            <div className="aspect-[4/3] sm:aspect-video bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-200">
                                <div className="text-center">
                                    <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                                    <p className="text-gray-400 font-medium text-sm">Screenshot would appear here</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sticky Action Sidebar */}
                <div className="lg:col-span-1">
                    <Card className="border-[#ebbab9]/30 shadow-xl sticky top-6">
                        <CardContent className="p-6 space-y-6">
                            <h3 className="font-black text-[#08415c] text-lg uppercase tracking-wider">Verification Steps</h3>
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[#08415c] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</div>
                                    <p className="text-sm text-[#388697] leading-snug">Verify reference no. in your bank portal</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[#08415c] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</div>
                                    <p className="text-sm text-[#388697] leading-snug">Confirm account holder matches user name</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[#08415c] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</div>
                                    <p className="text-sm text-[#388697] leading-snug">Ensure exact amount of {payment.amount} is received</p>
                                </div>
                            </div>

                            <hr className="border-[#ebbab9]/20" />

                            <div className="space-y-3">
                                <Button
                                    onClick={() => handleAction('approved')}
                                    disabled={processing}
                                    className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 shadow-lg shadow-emerald-600/20"
                                >
                                    {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                                    Approve & Unlock
                                </Button>
                                <Button
                                    onClick={() => handleAction('rejected')}
                                    disabled={processing}
                                    variant="outline"
                                    className="w-full h-12 rounded-xl border-[#cc2936] text-[#cc2936] hover:bg-red-50 font-bold gap-2"
                                >
                                    <XCircle className="w-4 h-4" />
                                    Reject Request
                                </Button>
                            </div>

                            <p className="text-[10px] text-center text-[#388697]/60 font-medium">
                                Approval will automatically send a confirmation email to the user.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

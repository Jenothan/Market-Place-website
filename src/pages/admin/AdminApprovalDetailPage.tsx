import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    CheckCircle,
    XCircle,
    Mail,
    DollarSign,
    Hash,
    FileText,
    Loader2
} from "lucide-react";
import { Card, CardContent } from "@/components/shared/ui/card";
import { Button } from "@/components/shared/ui/button";
import { fetchApprovalById, type Approval } from "@/lib/data";

export default function AdminApprovalDetailPage() {
    const { approvalId } = useParams();
    const navigate = useNavigate();
    const [approval, setApproval] = useState<Approval | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (approvalId) {
            fetchApprovalById(parseInt(approvalId)).then((data) => {
                if (data) setApproval(data);
                setLoading(false);
            });
        }
    }, [approvalId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-[#388697]" />
                <p className="text-[#388697] font-medium pulse">Loading approval details...</p>
            </div>
        );
    }

    if (!approval) {
        return (
            <div className="text-center py-20">
                <p className="text-red-500 font-bold text-xl">Approval record not found</p>
                <Button onClick={() => navigate("/dashboard/recent-approvals")} className="mt-4">
                    Back to Recent Approvals
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-1 sm:p-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/dashboard/recent-approvals")}
                    className="text-[#388697] hover:bg-[#388697]/10 gap-1.5 shrink-0"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Back</span>
                </Button>
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[#08415c]">Approval Details</h1>
                    <p className="text-xs sm:text-sm text-[#388697] mt-0.5">
                        Historical record for reference {approval.reference}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Status Card */}
                <Card className={`border-none shadow-lg overflow-hidden ${approval.status === 'approved' ? 'bg-emerald-50' : 'bg-red-50'
                    }`}>
                    <CardContent className="p-8 text-center flex flex-col items-center gap-4">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-md ${approval.status === 'approved' ? 'bg-emerald-500' : 'bg-[#cc2936]'
                            }`}>
                            {approval.status === 'approved' ? (
                                <CheckCircle className="w-10 h-10 text-white" />
                            ) : (
                                <XCircle className="w-10 h-10 text-white" />
                            )}
                        </div>
                        <div>
                            <h2 className={`text-2xl font-black uppercase tracking-widest ${approval.status === 'approved' ? 'text-emerald-700' : 'text-[#cc2936]'
                                }`}>
                                {approval.status === 'approved' ? 'Approved' : 'Rejected'}
                            </h2>
                            <p className="text-[#388697] font-medium mt-1">Processed on {approval.date}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Amount Card */}
                <Card className="border-[#ebbab9]/30 shadow-lg flex items-center bg-gradient-to-br from-[#08415c] to-[#388697] text-white">
                    <CardContent className="p-8 flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                            <DollarSign className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-white/70 font-bold uppercase tracking-wider text-xs">Total Amount</p>
                            <p className="text-4xl font-black">{approval.amount}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* User Info */}
                <Card className="border-[#ebbab9]/30 shadow-md">
                    <CardContent className="p-6">
                        <h3 className="font-bold text-[#08415c] border-b border-[#ebbab9]/20 pb-3 mb-4 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-[#388697]" />
                            User Information
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] text-[#388697] uppercase font-bold tracking-wider">User</p>
                                <p className="text-[#08415c] font-semibold">{approval.name}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-[#388697] uppercase font-bold tracking-wider">Email</p>
                                <p className="text-[#08415c] font-semibold">{approval.email}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Transaction Info */}
                <Card className="border-[#ebbab9]/30 shadow-md">
                    <CardContent className="p-6">
                        <h3 className="font-bold text-[#08415c] border-b border-[#ebbab9]/20 pb-3 mb-4 flex items-center gap-2">
                            <Hash className="w-4 h-4 text-[#388697]" />
                            Transaction Details
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] text-[#388697] uppercase font-bold tracking-wider">Reference No.</p>
                                <p className="text-[#08415c] font-semibold font-mono tracking-tight">{approval.reference}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-[#388697] uppercase font-bold tracking-wider">Date Processed</p>
                                <p className="text-[#08415c] font-semibold">{approval.date}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* System Notes */}
                <Card className="border-[#ebbab9]/30 shadow-md md:col-span-2">
                    <CardContent className="p-6">
                        <h3 className="font-bold text-[#08415c] border-b border-[#ebbab9]/20 pb-3 mb-4 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#388697]" />
                            System Notes & Actions
                        </h3>
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 italic text-[#388697] text-sm whitespace-pre-line leading-relaxed">
                            {approval.note}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-center pt-4">
                <Button
                    variant="outline"
                    onClick={() => navigate("/dashboard/recent-approvals")}
                    className="border-[#08415c] text-[#08415c] hover:bg-[#08415c] hover:text-white rounded-xl px-8 h-12 font-bold transition-all"
                >
                    Return to List
                </Button>
            </div>
        </div>
    );
}

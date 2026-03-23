import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    CircleUser,
    Mail,
    ShieldAlert,
    Save,
    Settings2,
    Loader2,
    CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/input";
import { Card, CardContent } from "@/components/shared/ui/card";
import { Label } from "@/components/shared/ui/label";
import {
    adminProfile,
    adminEmailNotifications,
    adminSystemSettings,
} from "@/lib/data";

/* ── Toggle component ────────────────────────────── */
function Toggle({
    checked,
    onChange,
}: {
    checked: boolean;
    onChange: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onChange}
            className={`relative w-12 h-7 rounded-full transition-colors duration-300 cursor-pointer shrink-0 ${checked ? "bg-[#08415c]" : "bg-gray-300"
                }`}
        >
            <span
                className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${checked ? "left-6" : "left-1"
                    }`}
            />
        </button>
    );
}

export default function SettingsPage() {
    const navigate = useNavigate();

    const [toggles, setToggles] = useState<Record<string, boolean>>(() => {
        const initial: Record<string, boolean> = {};
        [...adminEmailNotifications, ...adminSystemSettings].forEach((item) => {
            initial[item.key] = item.default;
        });
        return initial;
    });

    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const flip = (key: string) =>
        setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1500);
    };

    return (
        <div className="space-y-8 max-w-3xl">
            {/* ── Header ───────────────────────────────── */}
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
                    <h1 className="text-2xl font-bold text-[#08415c]">Settings</h1>
                    <p className="text-sm text-[#388697] mt-0.5">
                        Manage your admin panel settings and preferences
                    </p>
                </div>
            </div>

            {/* ── Admin Profile ────────────────────────── */}
            <Card className="border-[#ebbab9]/30 shadow-sm">
                <CardContent className="p-6 space-y-5">
                    <h3 className="text-base font-bold text-[#08415c] flex items-center gap-2">
                        <CircleUser className="w-5 h-5 text-[#388697]" />
                        Admin Profile
                    </h3>

                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <Label className="text-[#08415c] text-sm font-semibold">
                                Admin Email
                            </Label>
                            <Input
                                defaultValue={adminProfile.email}
                                className="h-11 rounded-lg border-[#ebbab9]/50 bg-[#ebbab9]/5 text-[#08415c] focus:border-[#388697]"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[#08415c] text-sm font-semibold">
                                Admin Name
                            </Label>
                            <Input
                                defaultValue={adminProfile.name}
                                className="h-11 rounded-lg border-[#ebbab9]/50 bg-[#ebbab9]/5 text-[#08415c] focus:border-[#388697]"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[#08415c] text-sm font-semibold">
                                Change Password
                            </Label>
                            <Input
                                type="password"
                                placeholder="Enter new password"
                                className="h-11 rounded-lg border-[#ebbab9]/50 bg-[#ebbab9]/5 text-[#08415c] placeholder:text-[#388697]/40 focus:border-[#388697]"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* ── Email Notifications ──────────────────── */}
            <Card className="border-[#ebbab9]/30 shadow-sm">
                <CardContent className="p-6 space-y-2">
                    <h3 className="text-base font-bold text-[#08415c] flex items-center gap-2 mb-3">
                        <Mail className="w-5 h-5 text-[#388697]" />
                        Email Notifications
                    </h3>

                    <div className="divide-y divide-[#ebbab9]/30">
                        {adminEmailNotifications.map((item) => (
                            <div
                                key={item.key}
                                className="flex items-center justify-between py-4"
                            >
                                <div>
                                    <p className="font-semibold text-[#08415c] text-sm">
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-[#388697] mt-0.5">{item.desc}</p>
                                </div>
                                <Toggle
                                    checked={toggles[item.key]}
                                    onChange={() => flip(item.key)}
                                />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* ── System Settings ──────────────────────── */}
            <Card className="border-[#ebbab9]/30 shadow-sm">
                <CardContent className="p-6 space-y-2">
                    <h3 className="text-base font-bold text-[#08415c] flex items-center gap-2 mb-3">
                        <Settings2 className="w-5 h-5 text-[#388697]" />
                        System Settings
                    </h3>

                    <div className="divide-y divide-[#ebbab9]/30">
                        {adminSystemSettings.map((item) => (
                            <div
                                key={item.key}
                                className="flex items-center justify-between py-4"
                            >
                                <div>
                                    <p className="font-semibold text-[#08415c] text-sm">
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-[#388697] mt-0.5">{item.desc}</p>
                                </div>
                                <Toggle
                                    checked={toggles[item.key]}
                                    onChange={() => flip(item.key)}
                                />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* ── Payment Configuration ────────────────── */}
            <Card className="border-[#ebbab9]/30 shadow-sm">
                <CardContent className="p-6 space-y-5">
                    <h3 className="text-base font-bold text-[#08415c] flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-[#388697]" />
                        Payment Configuration
                    </h3>

                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <Label className="text-[#08415c] text-sm font-semibold">
                                Pro Plan Amount (Rs.)
                            </Label>
                            <Input
                                type="number"
                                defaultValue={adminProfile.proPlanAmount}
                                className="h-11 rounded-lg border-[#ebbab9]/50 bg-[#ebbab9]/5 text-[#08415c] focus:border-[#388697]"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[#08415c] text-sm font-semibold">
                                Currency
                            </Label>
                            <Input
                                defaultValue={adminProfile.currency}
                                className="h-11 rounded-lg border-[#ebbab9]/50 bg-[#ebbab9]/5 text-[#08415c] focus:border-[#388697]"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[#08415c] text-sm font-semibold">
                                Payment Instructions
                            </Label>
                            <textarea
                                defaultValue={adminProfile.paymentInstructions}
                                rows={4}
                                className="w-full rounded-lg border border-[#ebbab9]/50 bg-[#ebbab9]/5 text-[#08415c] p-3 text-sm resize-y focus:outline-none focus:border-[#388697] focus:ring-1 focus:ring-[#388697]/30 transition-colors"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* ── Save button ──────────────────────────── */}
            <div className="flex flex-col items-end gap-3 pb-8">
                {showSuccess && (
                    <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm font-semibold">Settings saved successfully!</span>
                    </div>
                )}
                <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="h-11 px-8 rounded-xl font-semibold bg-[#08415c] hover:bg-[#08415c]/90 text-white shadow-md cursor-pointer gap-2 min-w-[160px]"
                >
                    {isSaving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Save className="w-4 h-4" />
                    )}
                    {isSaving ? "Saving..." : "Save Settings"}
                </Button>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────
//  data.ts  –  Central static mock data for the entire frontend
//  Used by Admin, Seller, and Customer pages.
//  When the real API is ready, replace these with actual API calls.
// ─────────────────────────────────────────────────────────────────

// ══════════════════════════════════════════════
//  SHARED TYPES
// ══════════════════════════════════════════════

export type Plan = "Free" | "Pro";
export type UserStatus = "Active" | "Pending";
export type ApprovalStatus = "approved" | "rejected";

// ══════════════════════════════════════════════
//  ADMIN DATA
// ══════════════════════════════════════════════

/** Dashboard stat cards */
export const adminStats = [
    {
        title: "Total Users",
        value: "245",
        change: "+12%",
        up: true,
    },
    {
        title: "Pro Users",
        value: "68",
        change: "+8%",
        up: true,
    },
    {
        title: "Pending Payments",
        value: "12",
        change: "-3%",
        up: false,
    },
    {
        title: "Total Revenue",
        value: "Rs. 51,000",
        change: "+15%",
        up: true,
    },
] as const;

/** All users list (Admin → All Users page) */
export interface AdminUser {
    id: number;
    name: string;
    email: string;
    plan: Plan;
    status: UserStatus;
    joinDate: string;
}

export const adminUsers: AdminUser[] = [
    { id: 1, name: "Alice Johnson", email: "user1@email.com", plan: "Pro", status: "Active", joinDate: "2026-01-15" },
    { id: 2, name: "Bob Smith", email: "user2@email.com", plan: "Free", status: "Active", joinDate: "2026-01-20" },
    { id: 3, name: "Carol Davis", email: "user3@email.com", plan: "Pro", status: "Active", joinDate: "2026-01-22" },
    { id: 4, name: "Derek Wilson", email: "user4@email.com", plan: "Free", status: "Pending", joinDate: "2026-02-01" },
    { id: 5, name: "Ethan Brown", email: "user5@email.com", plan: "Pro", status: "Active", joinDate: "2026-02-05" },
    { id: 6, name: "Fiona Taylor", email: "user6@email.com", plan: "Free", status: "Active", joinDate: "2026-02-10" },
    { id: 7, name: "George Martin", email: "user7@email.com", plan: "Pro", status: "Pending", joinDate: "2026-02-12" },
    { id: 8, name: "Hannah Lee", email: "user8@email.com", plan: "Free", status: "Active", joinDate: "2026-02-14" },
];

/** Pending payment requests (Admin → Pending Payments page) */
export interface PendingPayment {
    id: number;
    email: string;
    name: string;
    reference: string;
    date: string;
    amount: string;
}

export const pendingPayments: PendingPayment[] = [
    { id: 1, email: "user@email.com", name: "John Doe", reference: "TXN123456789", date: "2026-02-20", amount: "Rs. 750" },
    { id: 2, email: "seller@email.com", name: "Jane Smith", reference: "TXN987654321", date: "2026-02-19", amount: "Rs. 1,200" },
    { id: 3, email: "shop@email.com", name: "Mike Johnson", reference: "TXN456789123", date: "2026-02-18", amount: "Rs. 950" },
    { id: 4, email: "business@email.com", name: "Sarah Williams", reference: "TXN789123456", date: "2026-02-17", amount: "Rs. 1,500" },
    { id: 5, email: "store@email.com", name: "David Lee", reference: "TXN321654987", date: "2026-02-16", amount: "Rs. 600" },
];

/** Recent approvals / rejections (Admin → Recent Approvals page) */
export interface Approval {
    id: number;
    email: string;
    name: string;
    reference: string;
    date: string;
    amount: string;
    status: ApprovalStatus;
    note: string;
}

export const recentApprovals: Approval[] = [
    { id: 1, email: "user1@email.com", name: "Alice Johnson", reference: "TXN111222333", date: "2026-02-22", amount: "Rs. 1,200", status: "approved", note: "Pro features unlocked\nEmail sent ✓" },
    { id: 2, email: "user2@email.com", name: "Bob Smith", reference: "TXN444555666", date: "2026-02-21", amount: "Rs. 750", status: "approved", note: "Pro features unlocked\nEmail sent ✓" },
    { id: 3, email: "user3@email.com", name: "Carol Davis", reference: "TXN777888999", date: "2026-02-20", amount: "Rs. 950", status: "rejected", note: "Support ticket rejected\nEmail sent ✓" },
    { id: 4, email: "user4@email.com", name: "Derek Wilson", reference: "TXN112233445", date: "2026-02-19", amount: "Rs. 1,100", status: "approved", note: "Pro features unlocked\nEmail sent ✓" },
    { id: 5, email: "user5@email.com", name: "Ethan Brown", reference: "TXN333444555", date: "2026-02-18", amount: "Rs. 850", status: "approved", note: "Pro features unlocked\nEmail sent ✓" },
    { id: 6, email: "user6@email.com", name: "Fiona Taylor", reference: "TXN666777888", date: "2026-02-17", amount: "Rs. 1,100", status: "rejected", note: "Support ticket rejected\nEmail sent ✓" },
];

/** Admin profile defaults (Admin → Settings page) */
export const adminProfile = {
    email: "admin@shopmanager.com",
    name: "Admin User",
    proPlanAmount: 750,
    currency: "Rs.",
    paymentInstructions: "Send payment to [Bank Account] and upload screenshot with reference number.",
};

/** Admin email notification toggles */
export const adminEmailNotifications = [
    { key: "newPayment", title: "New Payment Requests", desc: "Get notified when users submit payment requests", default: true },
    { key: "paymentApproval", title: "Payment Approvals", desc: "Receive confirmation when payments are processed", default: true },
    { key: "newUser", title: "New User Registration", desc: "Get alerts when new users register", default: false },
];

/** Admin system settings toggles */
export const adminSystemSettings = [
    { key: "autoUnlock", title: "Auto-Unlock Pro Features", desc: "Automatically unlock features on payment approval", default: true },
    { key: "autoEmail", title: "Auto-Send Emails", desc: "Automatically send confirmation/rejection emails", default: true },
    { key: "dbAutoUpdate", title: "Database Auto-Update", desc: "Update payment status in database automatically", default: true },
];

// ══════════════════════════════════════════════
//  SELLER DATA
// ══════════════════════════════════════════════

/** Current logged-in seller profile */
export const sellerProfile = {
    name: "User Name",
    shopName: "Official Store",
    shopUrl: "whatslink.lk/yourshop",
    plan: "Free" as Plan,
    email: "seller@example.com",
    whatsapp: "+94 77 000 0000",
    location: "Colombo, Sri Lanka",
    description: "Your one-stop destination for premium street wear and local artisan fashion.",
    tagline: "Quality you can trust",
};

/** Seller products (shared across Dashboard & Products pages) */
export interface SellerProduct {
    id: number;
    name: string;
    price: string;
    quantity: number;
    image: string;
}

export const sellerProducts: SellerProduct[] = [
    { id: 1, name: "Product Name 1", price: "1,200", quantity: 15, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop" },
    { id: 2, name: "Product Name 2", price: "850", quantity: 8, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop" },
    { id: 3, name: "Product Name 3", price: "2,500", quantity: 0, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop" },
];

/** Seller dashboard stats (derived from products + analytics) */
export const sellerDashboardStats = [
    { label: "Total Products", value: String(sellerProducts.length), key: "products" },
    { label: "Profile Views", value: "45", key: "views" },
    { label: "Link Clicks", value: "12", key: "clicks" },
];

/** Pro plan features shown on the Upgrade page */
export const proFeatures = [
    "Unlimited products",
    "Custom domain support",
    "Remove WhatsLink branding",
    "Advanced analytics",
    "Priority customer support",
    "Multiple payment methods",
];

/** Payment bank details shown on the Upgrade page */
export const upgradePaymentDetails = {
    bank: "Commercial Bank",
    account: "1234 5678 9012 3456",
    accountName: "M. S. P. Wickramasinghe",
    amount: 750,
    currency: "Rs.",
};

// ══════════════════════════════════════════════
//  CUSTOMER / PUBLIC SHOP DATA
// ══════════════════════════════════════════════

/** Public shop info shown to customers */
export const publicShopData = {
    name: "The Trend Collective",
    description: "Your one-stop destination for premium street wear and local artisan fashion. Curated with love, delivered with care.",
    logo: "https://images.unsplash.com/photo-1541167760496-1628856ab752?w=200&h=200&fit=crop",
    whatsapp: "94770000000",
    location: {
        address: "123 Fashion Street, Colombo 03, Sri Lanka",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15844.123456789!2d79.86!3d6.92!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259!2sColombo!5e0!3m2!1sen!2slk!4v1600000000000",
    },
    payment: {
        bank: "Commercial Bank",
        account: "1234 5678 9012 3456",
        name: "Trend Collective (PVT) LTD",
    },
    socials: {
        instagram: "trendcollective",
        facebook: "trendcollective.lk",
    },
};

/** Products displayed on the public shop page */
export interface PublicProduct {
    id: number;
    name: string;
    price: string;
    image: string;
}

export const publicProducts: PublicProduct[] = [
    { id: 1, name: "Premium Oversized Hoodie", price: "2,500", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop" },
    { id: 2, name: "Urban Cargo Pants", price: "3,200", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop" },
    { id: 3, name: "Vintage Canvas Tote", price: "950", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop" },
    { id: 4, name: "Signature Snapback", price: "1,450", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop" },
];

// ══════════════════════════════════════════════
//  SIMULATED ASYNC HELPERS
//  These mimic API calls with a loading delay.
//  Swap these out for real fetch() calls when API is ready.
// ══════════════════════════════════════════════

const delay = (ms = 600) => new Promise<void>((res) => setTimeout(res, ms));

// --- Admin ---
export const fetchAdminUsers = async (): Promise<AdminUser[]> => { await delay(); return adminUsers; };
export const fetchPendingPayments = async (): Promise<PendingPayment[]> => { await delay(); return pendingPayments; };
export const fetchRecentApprovals = async (): Promise<Approval[]> => { await delay(); return recentApprovals; };
export const fetchAdminUserById = async (id: number): Promise<AdminUser | undefined> => { await delay(); return adminUsers.find(u => u.id === id); };
export const fetchApprovalById = async (id: number): Promise<Approval | undefined> => { await delay(); return recentApprovals.find(a => a.id === id); };
export const fetchPendingPaymentById = async (id: number): Promise<PendingPayment | undefined> => { await delay(); return pendingPayments.find(p => p.id === id); };

// --- Seller ---
export const fetchSellerProducts = async (): Promise<SellerProduct[]> => { await delay(); return sellerProducts; };
export const fetchSellerProfile = async () => { await delay(); return sellerProfile; };

// --- Customer / Public ---
export const fetchPublicShop = async () => { await delay(); return publicShopData; };
export const fetchPublicProducts = async (): Promise<PublicProduct[]> => { await delay(); return publicProducts; };

// ══════════════════════════════════════════════
//  AUTH DATA & HELPERS
// ══════════════════════════════════════════════

export const loginCredentials = {
    admin: {
        email: "admin@shopmanager.com",
        password: "admin123",
        role: "admin",
    },
    seller: {
        email: "seller@example.com",
        password: "seller123",
        role: "seller",
    },
};

/** Verify login credentials and return user role */
export const verifyLogin = async (email: string, password: string): Promise<string | null> => {
    await delay(800);
    if (email === loginCredentials.admin.email && password === loginCredentials.admin.password) {
        return loginCredentials.admin.role;
    }
    if (email === loginCredentials.seller.email && password === loginCredentials.seller.password) {
        return loginCredentials.seller.role;
    }
    return null;
};

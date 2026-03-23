import { BrowserRouter, Routes, Route } from "react-router-dom";

// Customer/Public Pages
import LandingPage from "@/pages/customer/LandingPage";
import LoginPage from "@/pages/customer/LoginPage";
import PublicShopPage from "@/pages/customer/PublicShopPage";

// Seller Pages
import SellerDashboardPage from "@/pages/seller/SellerDashboardPage";
import SellerProductsPage from "@/pages/seller/SellerProductsPage";
import SellerSettingsPage from "@/pages/seller/SellerSettingsPage";
import SellerUpgradePage from "@/pages/seller/SellerUpgradePage";
import RegisterPage from "@/pages/seller/RegisterPage";
import SellerLayout from "@/components/seller/SellerLayout";

// Admin Pages
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AdminPendingPaymentsPage from "@/pages/admin/AdminPendingPaymentsPage";
import AdminRecentApprovalsPage from "@/pages/admin/AdminRecentApprovalsPage";
import AdminAllUsersPage from "@/pages/admin/AdminAllUsersPage";
import AdminSettingsPage from "@/pages/admin/AdminSettingsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<SellerLayout />}>
          <Route path="/seller-dashboard" element={<SellerDashboardPage />} />
          <Route path="/seller-dashboard/products" element={<SellerProductsPage />} />
          <Route path="/seller/upgrade" element={<SellerUpgradePage />} />
          <Route path="/seller/settings" element={<SellerSettingsPage />} />
        </Route>

        <Route path="/shop/:shopId" element={<PublicShopPage />} />
        <Route path="/shop-demo" element={<PublicShopPage />} />

        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="pending-payments" element={<AdminPendingPaymentsPage />} />
          <Route path="recent-approvals" element={<AdminRecentApprovalsPage />} />
          <Route path="all-users" element={<AdminAllUsersPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

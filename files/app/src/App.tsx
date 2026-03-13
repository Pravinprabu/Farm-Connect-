import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from '@/context/AppContext';
import { Toaster } from '@/components/ui/sonner';

// Layouts
import MainLayout from '@/layouts/MainLayout';
import DashboardLayout from '@/layouts/DashboardLayout';

// Public Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Market from '@/pages/Market';
import CropDetails from '@/pages/CropDetails';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';

// Farmer Dashboard
import FarmerDashboard from '@/pages/farmer/Dashboard';
import ManageCrops from '@/pages/farmer/ManageCrops';
import Orders from '@/pages/farmer/Orders';
import Reports from '@/pages/farmer/Reports';
import CropInfo from '@/pages/farmer/CropInfo';
import FarmerNotifications from '@/pages/farmer/Notifications';
import FarmerSettings from '@/pages/farmer/Settings';

// Buyer Dashboard
import BuyerDashboard from '@/pages/buyer/Dashboard';
import BrowseCrops from '@/pages/buyer/BrowseCrops';
import MyOrders from '@/pages/buyer/MyOrders';
import Wishlist from '@/pages/buyer/Wishlist';
import Payments from '@/pages/buyer/Payments';
import BuyerNotifications from '@/pages/buyer/Notifications';
import BuyerSettings from '@/pages/buyer/Settings';

// Farm Management
import FarmManagement from '@/pages/farm/FarmManagement';
import LandSoil from '@/pages/farm/LandSoil';
import Irrigation from '@/pages/farm/Irrigation';
import Pests from '@/pages/farm/Pests';
import FarmInventory from '@/pages/farm/FarmInventory';
import Greenhouse from '@/pages/farm/Greenhouse';
import Subsidies from '@/pages/farm/Subsidies';
import FarmWorkers from '@/pages/farm/FarmWorkers';

// Financial
import Finance from '@/pages/finance/Finance';
import ProfitLoss from '@/pages/finance/ProfitLoss';
import Investment from '@/pages/finance/Investment';
import FinanceDashboard from '@/pages/finance/FinanceDashboard';

// AI & Market
import AIAdvisor from '@/pages/ai/AIAdvisor';
import Trends from '@/pages/market/Trends';

// Components
import Chatbot from '@/components/Chatbot';

// Protected Route Component
function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode; allowedRole?: 'farmer' | 'buyer' }) {
  const { isAuthenticated, user } = useApp();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to={user?.role === 'farmer' ? '/farmer/dashboard' : '/buyer/dashboard'} replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated, user } = useApp();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="market" element={<Market />} />
        <Route path="market/:id" element={<CropDetails />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={isAuthenticated ? <Navigate to={`/${user?.role}/dashboard`} /> : <Login />} />
        <Route path="signup" element={isAuthenticated ? <Navigate to={`/${user?.role}/dashboard`} /> : <Signup />} />
      </Route>

      {/* Farmer Routes */}
      <Route path="/farmer" element={
        <ProtectedRoute allowedRole="farmer">
          <DashboardLayout userType="farmer" />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<FarmerDashboard />} />
        <Route path="crops" element={<ManageCrops />} />
        <Route path="orders" element={<Orders />} />
        <Route path="reports" element={<Reports />} />
        <Route path="crop-info" element={<CropInfo />} />
        <Route path="notifications" element={<FarmerNotifications />} />
        <Route path="settings" element={<FarmerSettings />} />
      </Route>

      {/* Buyer Routes */}
      <Route path="/buyer" element={
        <ProtectedRoute allowedRole="buyer">
          <DashboardLayout userType="buyer" />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<BuyerDashboard />} />
        <Route path="browse" element={<BrowseCrops />} />
        <Route path="orders" element={<MyOrders />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="payments" element={<Payments />} />
        <Route path="notifications" element={<BuyerNotifications />} />
        <Route path="settings" element={<BuyerSettings />} />
      </Route>

      {/* Farm Management Routes */}
      <Route path="/farm" element={
        <ProtectedRoute allowedRole="farmer">
          <DashboardLayout userType="farmer" />
        </ProtectedRoute>
      }>
        <Route path="management" element={<FarmManagement />} />
        <Route path="soil" element={<LandSoil />} />
        <Route path="irrigation" element={<Irrigation />} />
        <Route path="pests" element={<Pests />} />
        <Route path="inventory" element={<FarmInventory />} />
        <Route path="greenhouse" element={<Greenhouse />} />
        <Route path="subsidies" element={<Subsidies />} />
        <Route path="workers" element={<FarmWorkers />} />
      </Route>

      {/* Financial Routes */}
      <Route path="/finance" element={
        <ProtectedRoute allowedRole="farmer">
          <DashboardLayout userType="farmer" />
        </ProtectedRoute>
      }>
        <Route path="overview" element={<Finance />} />
        <Route path="profit-loss" element={<ProfitLoss />} />
        <Route path="investment" element={<Investment />} />
        <Route path="dashboard" element={<FinanceDashboard />} />
      </Route>

      {/* AI & Market Routes */}
      <Route path="/ai-advisor" element={
        <ProtectedRoute allowedRole="farmer">
          <DashboardLayout userType="farmer" />
        </ProtectedRoute>
      }>
        <Route index element={<AIAdvisor />} />
      </Route>

      <Route path="/trends" element={
        <ProtectedRoute>
          <DashboardLayout userType={user?.role || 'buyer'} />
        </ProtectedRoute>
      }>
        <Route index element={<Trends />} />
      </Route>

      {/* Redirect to home for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
        <Chatbot />
        <Toaster position="top-right" richColors />
      </Router>
    </AppProvider>
  );
}

export default App;

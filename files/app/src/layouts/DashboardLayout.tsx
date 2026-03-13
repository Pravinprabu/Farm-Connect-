import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { 
  Sprout, Menu, X, User, LogOut, LayoutDashboard, 
  Package, ShoppingCart, BarChart3, Bell, Settings,
  Leaf, Droplets, Bug, Warehouse, Sun, FileText, Users,
  TrendingUp, Wallet, Brain, Heart, CreditCard, Tractor,
  ChevronDown, ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  userType: 'farmer' | 'buyer';
}

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
  children?: { path: string; label: string }[];
}

export default function DashboardLayout({ userType }: DashboardLayoutProps) {
  const { user, logout } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const farmerNavItems: NavItem[] = [
    { path: '/farmer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/farmer/crops', label: 'Manage Crops', icon: Package },
    { path: '/farmer/orders', label: 'Orders & Sales', icon: ShoppingCart },
    { path: '/farmer/reports', label: 'Analytics', icon: BarChart3 },
    { path: '/farmer/crop-info', label: 'Crop Info', icon: Leaf },
    { 
      path: '/farm', 
      label: 'Farm Management', 
      icon: Tractor,
      children: [
        { path: '/farm/soil', label: 'Land & Soil' },
        { path: '/farm/irrigation', label: 'Irrigation' },
        { path: '/farm/pests', label: 'Pest Control' },
        { path: '/farm/inventory', label: 'Inventory' },
        { path: '/farm/greenhouse', label: 'Greenhouse' },
        { path: '/farm/workers', label: 'Workers' },
        { path: '/farm/subsidies', label: 'Subsidies' },
      ]
    },
    { 
      path: '/finance', 
      label: 'Financial Tracking', 
      icon: Wallet,
      children: [
        { path: '/finance/dashboard', label: 'Finance Dashboard' },
        { path: '/finance/profit-loss', label: 'Profit & Loss' },
        { path: '/finance/investment', label: 'Investment' },
      ]
    },
    { path: '/ai-advisor', label: 'AI Advisor', icon: Brain },
    { path: '/trends', label: 'Market Trends', icon: TrendingUp },
    { path: '/farmer/notifications', label: 'Notifications', icon: Bell },
    { path: '/farmer/settings', label: 'Settings', icon: Settings },
  ];

  const buyerNavItems: NavItem[] = [
    { path: '/buyer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/buyer/browse', label: 'Browse Crops', icon: Package },
    { path: '/buyer/orders', label: 'My Orders', icon: ShoppingCart },
    { path: '/buyer/wishlist', label: 'Wishlist', icon: Heart },
    { path: '/buyer/payments', label: 'Payments', icon: CreditCard },
    { path: '/trends', label: 'Market Trends', icon: TrendingUp },
    { path: '/buyer/notifications', label: 'Notifications', icon: Bell },
    { path: '/buyer/settings', label: 'Settings', icon: Settings },
  ];

  const navItems = userType === 'farmer' ? farmerNavItems : buyerNavItems;

  const isActive = (path: string) => {
    if (path === '/farm' || path === '/finance') {
      return location.pathname.startsWith(path);
    }
    return location.pathname === path;
  };

  const toggleMenu = (path: string) => {
    setExpandedMenus(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "hidden lg:flex flex-col bg-white border-r border-gray-200 transition-all duration-300",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && (
              <span className="text-lg font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                Farm Connect
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <div key={item.path}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => sidebarOpen && toggleMenu(item.path)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                      isActive(item.path)
                        ? "bg-green-100 text-green-700"
                        : "text-gray-600 hover:bg-green-50 hover:text-green-600",
                      !sidebarOpen && "justify-center"
                    )}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        {expandedMenus.includes(item.path) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </>
                    )}
                  </button>
                  {sidebarOpen && expandedMenus.includes(item.path) && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={cn(
                            "block px-3 py-2 rounded-lg text-sm transition-all",
                            location.pathname === child.path
                              ? "bg-green-50 text-green-700 font-medium"
                              : "text-gray-500 hover:bg-green-50/50 hover:text-green-600"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                    isActive(item.path)
                      ? "bg-green-100 text-green-700"
                      : "text-gray-600 hover:bg-green-50 hover:text-green-600",
                    !sidebarOpen && "justify-center"
                  )}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* User & Logout */}
        <div className="border-t border-gray-100 p-4">
          <div className={cn("flex items-center gap-3", !sidebarOpen && "justify-center")}>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-green-600" />
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            )}
          </div>
          <Button
            variant="outline"
            className={cn(
              "mt-3 w-full gap-2 border-red-200 text-red-600 hover:bg-red-50",
              !sidebarOpen && "px-0 justify-center"
            )}
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && "Logout"}
          </Button>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute top-20 -right-3 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-700"
        >
          {sidebarOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronRight className="w-4 h-4 rotate-180" />}
        </button>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside 
        className={cn(
          "lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-green-700">Farm Connect</span>
          </Link>
          <button onClick={() => setMobileSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          {navItems.map((item) => (
            <div key={item.path}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.path)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                      isActive(item.path)
                        ? "bg-green-100 text-green-700"
                        : "text-gray-600 hover:bg-green-50"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {expandedMenus.includes(item.path) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  {expandedMenus.includes(item.path) && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={cn(
                            "block px-3 py-2 rounded-lg text-sm",
                            location.pathname === child.path
                              ? "bg-green-50 text-green-700 font-medium"
                              : "text-gray-500 hover:bg-green-50/50"
                          )}
                          onClick={() => setMobileSidebarOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                    isActive(item.path)
                      ? "bg-green-100 text-green-700"
                      : "text-gray-600 hover:bg-green-50"
                  )}
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <hr className="my-4" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
          <button onClick={() => setMobileSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-semibold text-green-700 capitalize">{userType} Dashboard</span>
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-green-600" />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

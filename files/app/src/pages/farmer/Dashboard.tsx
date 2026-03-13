import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, TrendingDown, Package, ShoppingCart, 
  DollarSign, Users, Leaf, ArrowUpRight, ArrowDownRight,
  Calendar, Bell
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const salesData = [
  { month: 'Jan', sales: 45000, orders: 120 },
  { month: 'Feb', sales: 52000, orders: 145 },
  { month: 'Mar', sales: 48000, orders: 132 },
  { month: 'Apr', sales: 61000, orders: 168 },
  { month: 'May', sales: 55000, orders: 152 },
  { month: 'Jun', sales: 67000, orders: 185 },
];

const cropDistribution = [
  { name: 'Vegetables', value: 45, color: '#22c55e' },
  { name: 'Fruits', value: 30, color: '#f59e0b' },
  { name: 'Grains', value: 25, color: '#3b82f6' },
];

const recentOrders = [
  { id: 'ORD001', buyer: 'Rahul Sharma', product: 'Organic Tomatoes', quantity: '50 kg', amount: 2250, status: 'pending' },
  { id: 'ORD002', buyer: 'Priya Patel', product: 'Basmati Rice', quantity: '100 kg', amount: 12000, status: 'processing' },
  { id: 'ORD003', buyer: 'Amit Kumar', product: 'Fresh Spinach', quantity: '30 bunches', amount: 900, status: 'delivered' },
  { id: 'ORD004', buyer: 'Sneha Reddy', product: 'Wheat Grains', quantity: '200 kg', amount: 5600, status: 'shipped' },
];

const stats = [
  {
    title: 'Total Earnings',
    value: '₹3,24,500',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'green',
  },
  {
    title: 'Total Orders',
    value: '1,245',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingCart,
    color: 'blue',
  },
  {
    title: 'Active Products',
    value: '48',
    change: '-2.1%',
    trend: 'down',
    icon: Package,
    color: 'purple',
  },
  {
    title: 'Total Buyers',
    value: '892',
    change: '+15.3%',
    trend: 'up',
    icon: Users,
    color: 'orange',
  },
];

export default function FarmerDashboard() {
  const { user, crops, orders, notifications } = useApp();

  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
          <p className="text-gray-600">Here&apos;s what&apos;s happening on your farm today</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Bell className="w-4 h-4" />
            {unreadNotifications > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 gap-2">
            <Leaf className="w-4 h-4" />
            Add New Crop
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className={`flex items-center gap-1 mt-2 text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {stat.change} from last month
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  stat.color === 'green' ? 'bg-green-100' :
                  stat.color === 'blue' ? 'bg-blue-100' :
                  stat.color === 'purple' ? 'bg-purple-100' : 'bg-orange-100'
                }`}>
                  <stat.icon className={`w-6 h-6 ${
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                  }`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <Card className="lg:col-span-2 border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Sales Overview</CardTitle>
            <select className="text-sm border rounded-lg px-3 py-1">
              <option>Last 6 Months</option>
              <option>Last Year</option>
              <option>All Time</option>
            </select>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="sales" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Crop Distribution */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Crop Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cropDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {cropDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {cropDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders & Low Stock */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Orders</CardTitle>
            <Button variant="ghost" size="sm" className="text-green-600">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{order.product}</p>
                      <p className="text-xs text-gray-500">{order.buyer} • {order.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{order.amount}</p>
                    <Badge 
                      variant={order.status === 'delivered' ? 'default' : 'secondary'}
                      className={`text-xs ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                        'bg-green-100 text-green-700'
                      }`}
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Low Stock Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {crops.filter(c => c.stock < 100).slice(0, 4).map((crop) => (
                <div key={crop.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <img 
                      src={crop.image} 
                      alt={crop.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm">{crop.name}</p>
                      <p className="text-xs text-red-600">Only {crop.stock} {crop.unit} left</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">
                    Restock
                  </Button>
                </div>
              ))}
              {crops.filter(c => c.stock < 100).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Package className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>All products are well stocked!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-1">Ready to grow your business?</h3>
              <p className="text-green-100">Explore AI recommendations and market trends to maximize your profits</p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" className="gap-2">
                <TrendingUp className="w-4 h-4" />
                View Trends
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 gap-2">
                <Leaf className="w-4 h-4" />
                AI Advisor
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

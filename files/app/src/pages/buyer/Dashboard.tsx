import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, Heart, Package, CreditCard, 
  TrendingUp, ArrowRight, Star, Clock
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const purchaseHistory = [
  { month: 'Jan', amount: 5000 },
  { month: 'Feb', amount: 7500 },
  { month: 'Mar', amount: 6200 },
  { month: 'Apr', amount: 8900 },
  { month: 'May', amount: 7200 },
  { month: 'Jun', amount: 9500 },
];

const recentOrders = [
  { id: 'ORD001', product: 'Organic Tomatoes', farmer: 'Rajesh Kumar', amount: 2250, status: 'delivered', date: '2024-02-28' },
  { id: 'ORD002', product: 'Basmati Rice', farmer: 'Suresh Patil', amount: 12000, status: 'shipped', date: '2024-02-25' },
  { id: 'ORD003', product: 'Fresh Spinach', farmer: 'Priya Sharma', amount: 900, status: 'processing', date: '2024-02-24' },
];

const recommendedProducts = [
  { id: '1', name: 'Alphonso Mangoes', price: 350, unit: 'dozen', farmer: 'Amar Singh', rating: 4.9, image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=200' },
  { id: '2', name: 'Organic Carrots', price: 40, unit: 'kg', farmer: 'Priya Sharma', rating: 4.5, image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200' },
  { id: '3', name: 'Wheat Grains', price: 28, unit: 'kg', farmer: 'Amar Singh', rating: 4.6, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200' },
];

export default function BuyerDashboard() {
  const { user, wishlist, orders } = useApp();

  const totalOrders = orders.length;
  const totalSpent = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const wishlistCount = wishlist.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
        <p className="text-gray-600">Here&apos;s what&apos;s happening with your orders</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Orders</p>
                <p className="text-2xl font-bold">{totalOrders}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Spent</p>
                <p className="text-2xl font-bold">₹{totalSpent.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Wishlist</p>
                <p className="text-2xl font-bold">{wishlistCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Active Orders</p>
                <p className="text-2xl font-bold">{orders.filter(o => o.status !== 'delivered').length}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts & Recent Orders */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Purchase History */}
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Purchase History</CardTitle>
            <select className="text-sm border rounded-lg px-3 py-1">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={purchaseHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="amount" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Orders</CardTitle>
            <Link to="/buyer/orders">
              <Button variant="ghost" size="sm" className="text-green-600">
                View All
              </Button>
            </Link>
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
                      <p className="text-xs text-gray-500">{order.farmer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{order.amount}</p>
                    <Badge 
                      className={`text-xs ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                        'bg-blue-100 text-blue-700'
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
      </div>

      {/* Recommended Products */}
      <Card className="border-0 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recommended for You</CardTitle>
          <Link to="/buyer/browse">
            <Button variant="ghost" size="sm" className="text-green-600 gap-1">
              Browse More
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedProducts.map((product) => (
              <Link key={product.id} to={`/market/${product.id}`}>
                <div className="group border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-500">by {product.farmer}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-green-600">₹{product.price}/{product.unit}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

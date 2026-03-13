import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  Download, Calendar, TrendingUp, TrendingDown, 
  DollarSign, Package, Users, Leaf
} from 'lucide-react';
import { toast } from 'sonner';

const monthlySales = [
  { month: 'Jan', sales: 45000, profit: 12000 },
  { month: 'Feb', sales: 52000, profit: 15000 },
  { month: 'Mar', sales: 48000, profit: 13000 },
  { month: 'Apr', sales: 61000, profit: 18000 },
  { month: 'May', sales: 55000, profit: 16000 },
  { month: 'Jun', sales: 67000, profit: 21000 },
  { month: 'Jul', sales: 72000, profit: 23000 },
  { month: 'Aug', sales: 68000, profit: 20000 },
  { month: 'Sep', sales: 75000, profit: 25000 },
  { month: 'Oct', sales: 82000, profit: 28000 },
  { month: 'Nov', sales: 78000, profit: 26000 },
  { month: 'Dec', sales: 85000, profit: 30000 },
];

const topProducts = [
  { name: 'Organic Tomatoes', sales: 125000, quantity: 2500 },
  { name: 'Basmati Rice', sales: 98000, quantity: 800 },
  { name: 'Fresh Spinach', sales: 76000, quantity: 3200 },
  { name: 'Wheat Grains', sales: 65000, quantity: 2200 },
  { name: 'Alphonso Mangoes', sales: 54000, quantity: 180 },
];

const cropPerformance = [
  { name: 'Vegetables', value: 45, growth: 12.5 },
  { name: 'Fruits', value: 30, growth: 8.3 },
  { name: 'Grains', value: 25, growth: -2.1 },
];

const colors = ['#22c55e', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6'];

export default function Reports() {
  const [dateRange, setDateRange] = useState('last-30-days');

  const handleExport = () => {
    toast.success('Report downloaded successfully!');
  };

  const totalSales = monthlySales.reduce((acc, curr) => acc + curr.sales, 0);
  const totalProfit = monthlySales.reduce((acc, curr) => acc + curr.profit, 0);
  const avgOrderValue = totalSales / 156; // Assuming 156 orders

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600">Track your farm performance and growth</p>
        </div>
        <div className="flex gap-3">
          <select 
            className="border rounded-lg px-3 py-2 text-sm"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="last-7-days">Last 7 Days</option>
            <option value="last-30-days">Last 30 Days</option>
            <option value="last-3-months">Last 3 Months</option>
            <option value="last-year">Last Year</option>
          </select>
          <Button variant="outline" className="gap-2" onClick={handleExport}>
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Sales</p>
                <p className="text-2xl font-bold">₹{totalSales.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  +18.5% vs last year
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Profit</p>
                <p className="text-2xl font-bold">₹{totalProfit.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  +22.3% vs last year
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Avg Order Value</p>
                <p className="text-2xl font-bold">₹{Math.round(avgOrderValue)}</p>
                <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                  <TrendingDown className="w-4 h-4" />
                  -3.2% vs last year
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Orders</p>
                <p className="text-2xl font-bold">1,245</p>
                <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  +15.8% vs last year
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales & Profit Chart */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Sales & Profit Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlySales}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip 
                  contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#22c55e" 
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#colorProfit)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Products & Crop Performance */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-sm font-bold text-green-600">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.quantity} units sold</p>
                    </div>
                  </div>
                  <span className="font-semibold text-green-600">₹{product.sales.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Crop Performance */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Category Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cropPerformance}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {cropPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {cropPerformance.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index] }} />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{item.value}%</span>
                    <span className={`text-xs ${item.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.growth >= 0 ? '+' : ''}{item.growth}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Breakdown */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Monthly Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Month</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">Sales</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">Profit</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">Margin</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">Growth</th>
                </tr>
              </thead>
              <tbody>
                {monthlySales.map((month, index) => {
                  const margin = ((month.profit / month.sales) * 100).toFixed(1);
                  const prevMonth = monthlySales[index - 1];
                  const growth = prevMonth ? (((month.sales - prevMonth.sales) / prevMonth.sales) * 100).toFixed(1) : '0';
                  
                  return (
                    <tr key={month.month} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{month.month}</td>
                      <td className="text-right py-3 px-4">₹{month.sales.toLocaleString()}</td>
                      <td className="text-right py-3 px-4 text-green-600">₹{month.profit.toLocaleString()}</td>
                      <td className="text-right py-3 px-4">{margin}%</td>
                      <td className="text-right py-3 px-4">
                        <span className={Number(growth) >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {Number(growth) >= 0 ? '+' : ''}{growth}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

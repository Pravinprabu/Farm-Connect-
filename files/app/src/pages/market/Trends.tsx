import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  TrendingUp, TrendingDown, Search, ArrowUpRight, 
  ArrowDownRight, Calendar, Filter, Download
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, AreaChart, Area
} from 'recharts';
import { toast } from 'sonner';

const priceHistory = {
  wheat: [
    { date: 'Jan', price: 26, demand: 75 },
    { date: 'Feb', price: 27, demand: 78 },
    { date: 'Mar', price: 28, demand: 82 },
    { date: 'Apr', price: 27.5, demand: 80 },
    { date: 'May', price: 28, demand: 85 },
    { date: 'Jun', price: 29, demand: 88 },
  ],
  rice: [
    { date: 'Jan', price: 48, demand: 90 },
    { date: 'Feb', price: 47, demand: 88 },
    { date: 'Mar', price: 46, demand: 85 },
    { date: 'Apr', price: 45, demand: 82 },
    { date: 'May', price: 44, demand: 80 },
    { date: 'Jun', price: 45, demand: 83 },
  ],
  tomatoes: [
    { date: 'Jan', price: 40, demand: 70 },
    { date: 'Feb', price: 42, demand: 75 },
    { date: 'Mar', price: 45, demand: 80 },
    { date: 'Apr', price: 48, demand: 85 },
    { date: 'May', price: 50, demand: 88 },
    { date: 'Jun', price: 52, demand: 90 },
  ],
};

const currentPrices = [
  { name: 'Wheat', price: 29, unit: 'kg', change: 7.7, trend: 'up', demand: 'High' },
  { name: 'Rice', price: 45, unit: 'kg', change: -6.3, trend: 'down', demand: 'Medium' },
  { name: 'Tomatoes', price: 52, unit: 'kg', change: 12.5, trend: 'up', demand: 'High' },
  { name: 'Potatoes', price: 25, unit: 'kg', change: 0, trend: 'stable', demand: 'Medium' },
  { name: 'Onions', price: 38, unit: 'kg', change: 15.2, trend: 'up', demand: 'Very High' },
  { name: 'Mangoes', price: 120, unit: 'kg', change: 25.0, trend: 'up', demand: 'High' },
  { name: 'Spinach', price: 35, unit: 'bunch', change: -5.4, trend: 'down', demand: 'Low' },
  { name: 'Carrots', price: 42, unit: 'kg', change: 3.2, trend: 'up', demand: 'Medium' },
];

const forecastData = [
  { month: 'Jul', wheat: 30, rice: 44, tomatoes: 55 },
  { month: 'Aug', wheat: 31, rice: 43, tomatoes: 58 },
  { month: 'Sep', wheat: 32, rice: 42, tomatoes: 52 },
  { month: 'Oct', wheat: 30, rice: 44, tomatoes: 48 },
  { month: 'Nov', wheat: 28, rice: 46, tomatoes: 45 },
  { month: 'Dec', wheat: 27, rice: 48, tomatoes: 50 },
];

export default function Trends() {
  const { marketPrices } = useApp();
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrices = currentPrices.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = () => {
    toast.success('Market report downloaded!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Market Trends & Analytics</h1>
          <p className="text-gray-600">Live price updates and demand forecasting</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2" onClick={handleExport}>
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Current Prices Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredPrices.slice(0, 4).map((crop, idx) => (
          <Card key={idx} className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{crop.name}</p>
                  <p className="text-2xl font-bold">₹{crop.price}</p>
                  <p className="text-xs text-gray-400">/{crop.unit}</p>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  crop.trend === 'up' ? 'bg-green-100 text-green-700' :
                  crop.trend === 'down' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {crop.trend === 'up' ? <TrendingUp className="w-3 h-3" /> :
                   crop.trend === 'down' ? <TrendingDown className="w-3 h-3" /> : null}
                  {crop.change >= 0 ? '+' : ''}{crop.change}%
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">{crop.demand} Demand</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Price History Chart */}
      <Card className="border-0 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Price History & Trends</CardTitle>
          <div className="flex gap-2">
            {Object.keys(priceHistory).map((crop) => (
              <button
                key={crop}
                onClick={() => setSelectedCrop(crop)}
                className={`px-3 py-1 rounded-lg text-sm font-medium capitalize ${
                  selectedCrop === crop 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {crop}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceHistory[selectedCrop as keyof typeof priceHistory]}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip 
                  contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#22c55e" 
                  fillOpacity={1} 
                  fill="url(#colorPrice)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Price Forecast */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">6-Month Price Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip 
                  contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line type="monotone" dataKey="wheat" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="rice" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="tomatoes" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-gray-600">Wheat</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm text-gray-600">Rice</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-sm text-gray-600">Tomatoes</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All Prices Table */}
      <Card className="border-0 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">All Crop Prices</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search crops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Crop</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">Current Price</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">24h Change</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">Demand</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">Trend</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrices.map((crop, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{crop.name}</td>
                    <td className="text-right py-3 px-4">
                      ₹{crop.price}/{crop.unit}
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className={`flex items-center justify-center gap-1 ${
                        crop.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {crop.change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        {crop.change >= 0 ? '+' : ''}{crop.change}%
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <Badge variant="secondary">{crop.demand}</Badge>
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className={`w-2 h-2 rounded-full mx-auto ${
                        crop.trend === 'up' ? 'bg-green-500' :
                        crop.trend === 'down' ? 'bg-red-500' :
                        'bg-gray-400'
                      }`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

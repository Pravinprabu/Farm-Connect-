import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Wallet, TrendingUp, TrendingDown, PieChart, 
  BarChart3, ArrowRight, DollarSign, Calculator
} from 'lucide-react';

export default function Finance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Financial Tracking</h1>
        <p className="text-gray-600">Monitor expenses, profits, and investments</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-2xl font-bold text-green-600">₹8,45,000</p>
            <p className="text-xs text-green-600">+18% from last year</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Expenses</p>
            <p className="text-2xl font-bold text-red-600">₹5,20,000</p>
            <p className="text-xs text-red-600">+12% from last year</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Net Profit</p>
            <p className="text-2xl font-bold text-blue-600">₹3,25,000</p>
            <p className="text-xs text-blue-600">+28% from last year</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Profit Margin</p>
            <p className="text-2xl font-bold">38.5%</p>
            <p className="text-xs text-green-600">+5% from last year</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/finance/dashboard">
          <Card className="border-0 shadow-md hover:shadow-xl transition-shadow h-full">
            <CardContent className="p-6">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <BarChart3 className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Finance Dashboard</h3>
              <p className="text-gray-600 text-sm">Visual reports and financial trends</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/finance/profit-loss">
          <Card className="border-0 shadow-md hover:shadow-xl transition-shadow h-full">
            <CardContent className="p-6">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Profit & Loss</h3>
              <p className="text-gray-600 text-sm">Track income and expenses</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/finance/investment">
          <Card className="border-0 shadow-md hover:shadow-xl transition-shadow h-full">
            <CardContent className="p-6">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Calculator className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Investment Analysis</h3>
              <p className="text-gray-600 text-sm">ROI calculations and budgeting</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}

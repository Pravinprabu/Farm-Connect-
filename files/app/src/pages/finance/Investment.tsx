import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, CheckCircle2, Clock } from 'lucide-react';

const investments = [
  { name: 'Drip Irrigation System', cost: 75000, expectedReturn: 15000, roi: 20, payback: 5, status: 'recommended' },
  { name: 'Greenhouse Setup', cost: 200000, expectedReturn: 50000, roi: 25, payback: 4, status: 'recommended' },
  { name: 'Tractor Purchase', cost: 500000, expectedReturn: 80000, roi: 16, payback: 6, status: 'under-review' },
];

export default function Investment() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Investment Analysis</h1>
        <p className="text-gray-600">Plan expenses and investments for maximum return</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Invested</p>
            <p className="text-2xl font-bold">₹12,50,000</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Avg ROI</p>
            <p className="text-2xl font-bold text-green-600">18.5%</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Active Investments</p>
            <p className="text-2xl font-bold">5</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Investment Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {investments.map((inv, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{inv.name}</h4>
                      <Badge className={inv.status === 'recommended' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                        {inv.status}
                      </Badge>
                    </div>
                    <div className="flex gap-4 mt-2 text-sm text-gray-500">
                      <span>Cost: ₹{inv.cost.toLocaleString()}</span>
                      <span>Annual Return: ₹{inv.expectedReturn.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{inv.roi}%</p>
                      <p className="text-xs text-gray-500">ROI</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{inv.payback}y</p>
                      <p className="text-xs text-gray-500">Payback</p>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Analyze
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

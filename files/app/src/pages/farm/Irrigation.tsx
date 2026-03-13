import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Droplets, Clock, Calendar, TrendingDown } from 'lucide-react';

export default function Irrigation() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Irrigation & Water Management</h1>
        <p className="text-gray-600">Smart irrigation scheduling and water usage tracking</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Today's Usage</p>
            <p className="text-2xl font-bold text-blue-600">2,500 L</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Monthly Usage</p>
            <p className="text-2xl font-bold">75,000 L</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Water Saved</p>
            <p className="text-2xl font-bold text-green-600">15%</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Next Schedule</p>
            <p className="text-2xl font-bold">6:00 AM</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Irrigation Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {['Tomatoes', 'Spinach', 'Wheat'].map((crop, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">{crop}</p>
                    <p className="text-sm text-gray-500">Drip irrigation</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">30 min</p>
                  <p className="text-sm text-gray-500">500 L</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

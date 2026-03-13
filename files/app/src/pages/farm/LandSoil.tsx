import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, Droplets, Thermometer, Wind, Sun, 
  Beaker, AlertCircle, CheckCircle2, TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';

const soilTests = [
  { id: 1, date: '2024-02-15', ph: 6.5, nitrogen: 280, phosphorus: 45, potassium: 180, moisture: 45, status: 'optimal' },
  { id: 2, date: '2024-01-20', ph: 6.2, nitrogen: 250, phosphorus: 40, potassium: 165, moisture: 42, status: 'good' },
  { id: 3, date: '2023-12-15', ph: 5.8, nitrogen: 220, phosphorus: 35, potassium: 150, moisture: 38, status: 'fair' },
];

const recommendations = [
  { crop: 'Tomatoes', confidence: 95, reason: 'Soil pH and nutrients are optimal' },
  { crop: 'Spinach', confidence: 88, reason: 'Good nitrogen levels' },
  { crop: 'Carrots', confidence: 82, reason: 'Sandy loam soil suitable' },
];

export default function LandSoil() {
  const [showTestForm, setShowTestForm] = useState(false);

  const handleSubmitTest = () => {
    toast.success('Soil test submitted for analysis!');
    setShowTestForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Land & Soil Management</h1>
          <p className="text-gray-600">Monitor and optimize your soil health</p>
        </div>
        <Button onClick={() => setShowTestForm(true)} className="bg-green-600 hover:bg-green-700 gap-2">
          <Beaker className="w-4 h-4" />
          New Soil Test
        </Button>
      </div>

      {/* Current Soil Status */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Current Soil Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 bg-green-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">pH Level</p>
              <p className="text-2xl font-bold text-green-600">6.5</p>
              <Badge className="mt-2 bg-green-100 text-green-700">Optimal</Badge>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Nitrogen (N)</p>
              <p className="text-2xl font-bold text-blue-600">280</p>
              <p className="text-xs text-gray-500">kg/ha</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Phosphorus (P)</p>
              <p className="text-2xl font-bold text-purple-600">45</p>
              <p className="text-xs text-gray-500">kg/ha</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Potassium (K)</p>
              <p className="text-2xl font-bold text-orange-600">180</p>
              <p className="text-xs text-gray-500">kg/ha</p>
            </div>
            <div className="p-4 bg-cyan-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Moisture</p>
              <p className="text-2xl font-bold text-cyan-600">45%</p>
              <p className="text-xs text-gray-500">Adequate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            AI Crop Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">{rec.crop}</p>
                    <p className="text-sm text-gray-500">{rec.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">{rec.confidence}%</p>
                  <p className="text-xs text-gray-500">Confidence</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Test History */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Soil Test History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">pH</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">N (kg/ha)</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">P (kg/ha)</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">K (kg/ha)</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">Moisture</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {soilTests.map((test) => (
                  <tr key={test.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{test.date}</td>
                    <td className="text-center py-3 px-4">{test.ph}</td>
                    <td className="text-center py-3 px-4">{test.nitrogen}</td>
                    <td className="text-center py-3 px-4">{test.phosphorus}</td>
                    <td className="text-center py-3 px-4">{test.potassium}</td>
                    <td className="text-center py-3 px-4">{test.moisture}%</td>
                    <td className="text-center py-3 px-4">
                      <Badge className={
                        test.status === 'optimal' ? 'bg-green-100 text-green-700' :
                        test.status === 'good' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }>
                        {test.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Test Form Modal */}
      {showTestForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>New Soil Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>pH Level</Label>
                  <Input type="number" step="0.1" placeholder="6.5" />
                </div>
                <div className="space-y-2">
                  <Label>Moisture (%)</Label>
                  <Input type="number" placeholder="45" />
                </div>
                <div className="space-y-2">
                  <Label>Nitrogen (kg/ha)</Label>
                  <Input type="number" placeholder="280" />
                </div>
                <div className="space-y-2">
                  <Label>Phosphorus (kg/ha)</Label>
                  <Input type="number" placeholder="45" />
                </div>
                <div className="space-y-2">
                  <Label>Potassium (kg/ha)</Label>
                  <Input type="number" placeholder="180" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowTestForm(false)}>
                  Cancel
                </Button>
                <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleSubmitTest}>
                  Submit Test
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

import { Label } from '@/components/ui/label';

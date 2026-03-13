import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function FarmInventory() {
  const inventory = [
    { name: 'Wheat Seeds', quantity: 500, unit: 'kg', status: 'good' },
    { name: 'NPK Fertilizer', quantity: 50, unit: 'kg', status: 'low' },
    { name: 'Organic Pesticide', quantity: 20, unit: 'L', status: 'good' },
    { name: 'Drip Irrigation Pipes', quantity: 100, unit: 'm', status: 'good' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Farm Equipment & Inventory</h1>
        <p className="text-gray-600">Track seeds, fertilizers, pesticides, and farm tools</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Items</p>
            <p className="text-2xl font-bold">48</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Low Stock</p>
            <p className="text-2xl font-bold text-yellow-600">3</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Inventory Value</p>
            <p className="text-2xl font-bold">₹45,000</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {inventory.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.quantity} {item.unit}</p>
                  </div>
                </div>
                <Badge className={item.status === 'good' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                  {item.status === 'good' ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <AlertCircle className="w-3 h-3 mr-1" />}
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

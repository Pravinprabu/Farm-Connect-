import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, Plus } from 'lucide-react';

const workers = [
  { name: 'Ram Singh', role: 'Field Worker', dailyWage: 350, status: 'active', hours: 8 },
  { name: 'Sita Devi', role: 'Harvester', dailyWage: 400, status: 'active', hours: 7 },
  { name: 'Mohan Lal', role: 'Irrigation', dailyWage: 375, status: 'off', hours: 0 },
];

export default function FarmWorkers() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Worker & Labor Management</h1>
          <p className="text-gray-600">Assign tasks and track working hours</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 gap-2">
          <Plus className="w-4 h-4" />
          Add Worker
        </Button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Workers</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Today</p>
              <p className="text-2xl font-bold">8</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Today's Payroll</p>
            <p className="text-2xl font-bold">₹3,200</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Workers List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {workers.map((worker, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-gray-600">{worker.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{worker.name}</p>
                    <p className="text-sm text-gray-500">{worker.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-medium">₹{worker.dailyWage}/day</p>
                    <p className="text-sm text-gray-500">{worker.hours} hours today</p>
                  </div>
                  <Badge className={worker.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                    {worker.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

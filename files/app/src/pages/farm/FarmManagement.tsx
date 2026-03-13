import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Tractor, Leaf, Droplets, Bug, Warehouse, 
  Sun, FileText, Users, ArrowRight
} from 'lucide-react';

const modules = [
  { 
    path: '/farm/soil', 
    title: 'Land & Soil Management', 
    description: 'Monitor soil health, pH levels, and get AI recommendations',
    icon: Leaf,
    color: 'green',
    stats: 'pH: 6.5 | NPK: Good'
  },
  { 
    path: '/farm/irrigation', 
    title: 'Irrigation & Water', 
    description: 'Smart irrigation scheduling and water usage tracking',
    icon: Droplets,
    color: 'blue',
    stats: 'Usage: 2,500 L/day'
  },
  { 
    path: '/farm/pests', 
    title: 'Pest & Disease Control', 
    description: 'AI-based pest detection and treatment recommendations',
    icon: Bug,
    color: 'red',
    stats: 'No active alerts'
  },
  { 
    path: '/farm/inventory', 
    title: 'Equipment & Inventory', 
    description: 'Track seeds, fertilizers, tools, and equipment',
    icon: Warehouse,
    color: 'purple',
    stats: '48 items in stock'
  },
  { 
    path: '/farm/greenhouse', 
    title: 'Greenhouse Control', 
    description: 'Monitor temperature, humidity for protected farming',
    icon: Sun,
    color: 'orange',
    stats: 'Temp: 24°C | Hum: 65%'
  },
  { 
    path: '/farm/workers', 
    title: 'Labor Management', 
    description: 'Assign tasks, track hours, and manage payroll',
    icon: Users,
    color: 'teal',
    stats: '12 active workers'
  },
  { 
    path: '/farm/subsidies', 
    title: 'Government Schemes', 
    description: 'Apply for subsidies, loans, and grants',
    icon: FileText,
    color: 'indigo',
    stats: '3 schemes available'
  },
];

export default function FarmManagement() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Farm Management</h1>
        <p className="text-gray-600">Comprehensive tools to manage your farm operations</p>
      </div>

      {/* Overview Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Farm Size</p>
              <p className="text-2xl font-bold">10 Acres</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Droplets className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Water Usage</p>
              <p className="text-2xl font-bold">2.5K L</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Sun className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Crops</p>
              <p className="text-2xl font-bold">8 Types</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Workers</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modules Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Link key={module.path} to={module.path}>
            <Card className="border-0 shadow-md hover:shadow-xl transition-shadow h-full">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    module.color === 'green' ? 'bg-green-100' :
                    module.color === 'blue' ? 'bg-blue-100' :
                    module.color === 'red' ? 'bg-red-100' :
                    module.color === 'purple' ? 'bg-purple-100' :
                    module.color === 'orange' ? 'bg-orange-100' :
                    module.color === 'teal' ? 'bg-teal-100' :
                    'bg-indigo-100'
                  }`}>
                    <module.icon className={`w-7 h-7 ${
                      module.color === 'green' ? 'text-green-600' :
                      module.color === 'blue' ? 'text-blue-600' :
                      module.color === 'red' ? 'text-red-600' :
                      module.color === 'purple' ? 'text-purple-600' :
                      module.color === 'orange' ? 'text-orange-600' :
                      module.color === 'teal' ? 'text-teal-600' :
                      'text-indigo-600'
                    }`} />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{module.description}</p>
                <div className={`text-sm font-medium ${
                  module.color === 'green' ? 'text-green-600' :
                  module.color === 'blue' ? 'text-blue-600' :
                  module.color === 'red' ? 'text-red-600' :
                  module.color === 'purple' ? 'text-purple-600' :
                  module.color === 'orange' ? 'text-orange-600' :
                  module.color === 'teal' ? 'text-teal-600' :
                  'text-indigo-600'
                }`}>
                  {module.stats}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-1">Need help managing your farm?</h3>
              <p className="text-green-100">Try our AI Crop Advisor for personalized recommendations</p>
            </div>
            <Link to="/ai-advisor">
              <Button variant="secondary" className="gap-2">
                <Tractor className="w-4 h-4" />
                Get AI Advice
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

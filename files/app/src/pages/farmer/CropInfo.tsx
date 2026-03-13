import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Sun, Droplets, Thermometer, Wind, 
  Calendar, Leaf, Info, Sprout
} from 'lucide-react';

const cropDatabase = [
  {
    id: '1',
    name: 'Tomatoes',
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400',
    season: 'Winter, Summer',
    soilType: 'Loamy, Sandy Loam',
    soilPH: '6.0 - 6.8',
    waterRequirement: 'Moderate (25-50mm/week)',
    temperature: '20-27°C',
    harvestTime: '60-80 days',
    description: 'Tomatoes are one of the most popular vegetables grown worldwide. They require well-drained soil and plenty of sunlight.',
    healthBenefits: [
      'Rich in Vitamin C and K',
      'Good source of potassium',
      'Contains lycopene (antioxidant)',
      'Supports heart health',
    ],
    varieties: ['Roma', 'Cherry', 'Beefsteak', 'Heirloom'],
    pests: ['Aphids', 'Whiteflies', 'Tomato hornworm'],
    diseases: ['Early blight', 'Late blight', 'Fusarium wilt'],
  },
  {
    id: '2',
    name: 'Rice',
    category: 'Grains',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
    season: 'Kharif (Monsoon)',
    soilType: 'Clay, Clay Loam',
    soilPH: '5.5 - 6.5',
    waterRequirement: 'High (Flooded fields)',
    temperature: '20-35°C',
    harvestTime: '90-150 days',
    description: 'Rice is a staple food for more than half of the world\'s population. It requires high rainfall and flooded conditions.',
    healthBenefits: [
      'Good source of energy',
      'Gluten-free',
      'Easy to digest',
      'Contains B vitamins',
    ],
    varieties: ['Basmati', 'Sona Masuri', 'IR64', 'Ponni'],
    pests: ['Stem borer', 'Leaf folder', 'Brown plant hopper'],
    diseases: ['Blast', 'Bacterial leaf blight', 'Sheath rot'],
  },
  {
    id: '3',
    name: 'Mangoes',
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400',
    season: 'Summer',
    soilType: 'Laterite, Alluvial',
    soilPH: '5.5 - 7.5',
    waterRequirement: 'Moderate',
    temperature: '24-30°C',
    harvestTime: '100-150 days from flowering',
    description: 'Mango is known as the king of fruits. It requires a tropical climate with distinct wet and dry seasons.',
    healthBenefits: [
      'Rich in Vitamin A and C',
      'Boosts immunity',
      'Aids digestion',
      'Promotes eye health',
    ],
    varieties: ['Alphonso', 'Dasheri', 'Langra', 'Kesar'],
    pests: ['Fruit fly', 'Mango hopper', 'Mealybug'],
    diseases: ['Anthracnose', 'Powdery mildew', 'Dieback'],
  },
  {
    id: '4',
    name: 'Wheat',
    category: 'Grains',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
    season: 'Rabi (Winter)',
    soilType: 'Loamy, Clay Loam',
    soilPH: '6.0 - 7.5',
    waterRequirement: 'Moderate (450-650mm total)',
    temperature: '15-25°C',
    harvestTime: '120-150 days',
    description: 'Wheat is the second most important cereal crop. It requires cool weather during growth and warm weather during harvest.',
    healthBenefits: [
      'Good source of fiber',
      'Rich in carbohydrates',
      'Contains B vitamins',
      'Provides protein',
    ],
    varieties: ['HD-2967', 'PBW-550', 'WH-1105', 'DBW-17'],
    pests: ['Aphids', 'Termites', 'Pink stem borer'],
    diseases: ['Rust', 'Karnal bunt', 'Loose smut'],
  },
  {
    id: '5',
    name: 'Spinach',
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
    season: 'Winter',
    soilType: 'Sandy Loam, Loam',
    soilPH: '6.0 - 7.0',
    waterRequirement: 'Regular (Keep soil moist)',
    temperature: '15-21°C',
    harvestTime: '40-60 days',
    description: 'Spinach is a leafy green vegetable that grows quickly in cool weather. It\'s highly nutritious and versatile.',
    healthBenefits: [
      'High in iron',
      'Rich in vitamins A, C, K',
      'Good source of calcium',
      'Anti-inflammatory properties',
    ],
    varieties: ['Palak', 'Savoy', 'Flat-leaf', 'Semi-savoy'],
    pests: ['Aphids', 'Leaf miners', 'Spider mites'],
    diseases: ['Downy mildew', 'White rust', 'Leaf spot'],
  },
  {
    id: '6',
    name: 'Potatoes',
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82ber40f?w=400',
    season: 'Rabi, Kharif',
    soilType: 'Sandy Loam, Loam',
    soilPH: '5.0 - 6.5',
    waterRequirement: 'Moderate (500-700mm total)',
    temperature: '15-20°C',
    harvestTime: '90-120 days',
    description: 'Potatoes are the world\'s fourth-largest food crop. They grow best in cool seasons with well-drained soil.',
    healthBenefits: [
      'Good source of potassium',
      'Rich in Vitamin C',
      'Provides energy',
      'Contains fiber',
    ],
    varieties: ['Kufri Jyoti', 'Kufri Chandramukhi', 'Kufri Pukhraj'],
    pests: ['Potato tuber moth', 'Aphids', 'Cutworms'],
    diseases: ['Late blight', 'Early blight', 'Black scurf'],
  },
];

export default function CropInfo() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<typeof cropDatabase[0] | null>(null);

  const filteredCrops = cropDatabase.filter(crop =>
    crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crop.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Crop & Fruit Information</h1>
        <p className="text-gray-600">Detailed growing guides for various crops</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search crops, fruits, vegetables..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Crop Grid */}
      {!selectedCrop ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop) => (
            <Card 
              key={crop.id} 
              className="border-0 shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setSelectedCrop(crop)}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={crop.image} 
                  alt={crop.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <CardContent className="p-4">
                <Badge className="mb-2">{crop.category}</Badge>
                <h3 className="text-xl font-semibold text-gray-900">{crop.name}</h3>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {crop.harvestTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Sun className="w-4 h-4" />
                    {crop.season.split(',')[0]}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Crop Detail View */
        <div className="space-y-6">
          <button 
            onClick={() => setSelectedCrop(null)}
            className="text-green-600 hover:underline flex items-center gap-1"
          >
            ← Back to crops
          </button>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Image & Basic Info */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-md overflow-hidden">
                <img 
                  src={selectedCrop.image} 
                  alt={selectedCrop.name}
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-4">
                  <Badge className="mb-2">{selectedCrop.category}</Badge>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedCrop.name}</h2>
                  <p className="text-gray-600 mt-2">{selectedCrop.description}</p>
                </CardContent>
              </Card>
            </div>

            {/* Growing Requirements */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sprout className="w-5 h-5 text-green-600" />
                    Growing Requirements
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                      <Sun className="w-5 h-5 text-orange-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Season</p>
                        <p className="text-sm text-gray-600">{selectedCrop.season}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                      <Droplets className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Water</p>
                        <p className="text-sm text-gray-600">{selectedCrop.waterRequirement}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                      <Thermometer className="w-5 h-5 text-orange-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Temperature</p>
                        <p className="text-sm text-gray-600">{selectedCrop.temperature}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg">
                      <Leaf className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Soil Type</p>
                        <p className="text-sm text-gray-600">{selectedCrop.soilType}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                      <Info className="w-5 h-5 text-purple-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Soil pH</p>
                        <p className="text-sm text-gray-600">{selectedCrop.soilPH}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Harvest Time</p>
                        <p className="text-sm text-gray-600">{selectedCrop.harvestTime}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Health Benefits */}
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Health Benefits</h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {selectedCrop.healthBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Varieties */}
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Popular Varieties</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCrop.varieties.map((variety, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {variety}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pests & Diseases */}
              <div className="grid sm:grid-cols-2 gap-6">
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-red-600">Common Pests</h3>
                    <ul className="space-y-2">
                      {selectedCrop.pests.map((pest, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-600">
                          <div className="w-2 h-2 bg-red-400 rounded-full" />
                          {pest}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-orange-600">Common Diseases</h3>
                    <ul className="space-y-2">
                      {selectedCrop.diseases.map((disease, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-600">
                          <div className="w-2 h-2 bg-orange-400 rounded-full" />
                          {disease}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

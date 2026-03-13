import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, Search, Edit2, Trash2, Leaf, Filter,
  Package, TrendingUp, AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

const categories = ['Vegetables', 'Fruits', 'Grains', 'Pulses', 'Spices', 'Dairy'];

export default function ManageCrops() {
  const { crops, addCrop, updateCrop, deleteCrop } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCrop, setEditingCrop] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    unit: 'kg',
    stock: '',
    description: '',
    organic: false,
    season: '',
    soilType: '',
    waterRequirement: '',
    image: '',
  });

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || crop.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCrop) {
      updateCrop(editingCrop, {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      });
      toast.success('Crop updated successfully!');
      setEditingCrop(null);
    } else {
      addCrop({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        image: formData.image || 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400',
        harvestDate: new Date().toISOString(),
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Local Farm',
        healthBenefits: [],
      });
      toast.success('Crop added successfully!');
    }
    
    setIsAddDialogOpen(false);
    setFormData({
      name: '',
      category: '',
      price: '',
      unit: 'kg',
      stock: '',
      description: '',
      organic: false,
      season: '',
      soilType: '',
      waterRequirement: '',
      image: '',
    });
  };

  const handleEdit = (crop: typeof crops[0]) => {
    setEditingCrop(crop.id);
    setFormData({
      name: crop.name,
      category: crop.category,
      price: crop.price.toString(),
      unit: crop.unit,
      stock: crop.stock.toString(),
      description: crop.description,
      organic: crop.organic,
      season: crop.season,
      soilType: crop.soilType,
      waterRequirement: crop.waterRequirement,
      image: crop.image,
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this crop?')) {
      deleteCrop(id);
      toast.success('Crop deleted successfully!');
    }
  };

  const totalProducts = crops.length;
  const lowStockProducts = crops.filter(c => c.stock < 50).length;
  const totalValue = crops.reduce((acc, c) => acc + (c.price * c.stock), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Crops</h1>
          <p className="text-gray-600">Add, edit, and manage your crop inventory</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 gap-2">
              <Plus className="w-4 h-4" />
              Add New Crop
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCrop ? 'Edit Crop' : 'Add New Crop'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Crop Name</Label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g., Organic Tomatoes"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <select 
                    className="w-full border rounded-md px-3 py-2"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Price (₹)</Label>
                  <Input 
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Unit</Label>
                  <select 
                    className="w-full border rounded-md px-3 py-2"
                    value={formData.unit}
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="dozen">dozen</option>
                    <option value="piece">piece</option>
                    <option value="bunch">bunch</option>
                    <option value="litre">litre</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Stock</Label>
                  <Input 
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your crop..."
                  rows={3}
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Season</Label>
                  <Input 
                    value={formData.season}
                    onChange={(e) => setFormData({...formData, season: e.target.value})}
                    placeholder="e.g., Winter"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Soil Type</Label>
                  <Input 
                    value={formData.soilType}
                    onChange={(e) => setFormData({...formData, soilType: e.target.value})}
                    placeholder="e.g., Loamy"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Water Requirement</Label>
                  <Input 
                    value={formData.waterRequirement}
                    onChange={(e) => setFormData({...formData, waterRequirement: e.target.value})}
                    placeholder="e.g., Moderate"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox"
                  id="organic"
                  checked={formData.organic}
                  onChange={(e) => setFormData({...formData, organic: e.target.checked})}
                  className="rounded"
                />
                <Label htmlFor="organic" className="font-normal">This is an organic product</Label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                  {editingCrop ? 'Update Crop' : 'Add Crop'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-2xl font-bold">{totalProducts}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Low Stock</p>
              <p className="text-2xl font-bold">{lowStockProducts}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Inventory Value</p>
              <p className="text-2xl font-bold">₹{totalValue.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search crops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              selectedCategory === 'All' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                selectedCategory === cat ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Crops Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCrops.map((crop) => (
          <Card key={crop.id} className="border-0 shadow-md overflow-hidden group">
            <div className="relative h-40">
              <img 
                src={crop.image} 
                alt={crop.name}
                className="w-full h-full object-cover"
              />
              {crop.organic && (
                <Badge className="absolute top-2 left-2 bg-green-500">
                  <Leaf className="w-3 h-3 mr-1" />
                  Organic
                </Badge>
              )}
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleEdit(crop)}
                  className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md hover:bg-gray-100"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(crop.id)}
                  className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md hover:bg-red-50 text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{crop.name}</h3>
                  <p className="text-sm text-gray-500">{crop.category}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  crop.stock < 50 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>
                  {crop.stock} {crop.unit}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-green-600">₹{crop.price}</span>
                <span className="text-sm text-gray-500">/{crop.unit}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCrops.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No crops found</h3>
          <p className="text-gray-500 mb-4">Add your first crop to get started</p>
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Crop
          </Button>
        </div>
      )}
    </div>
  );
}

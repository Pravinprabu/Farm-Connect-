import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Filter, MapPin, Star, ShoppingCart, 
  Heart, Leaf, SlidersHorizontal
} from 'lucide-react';
import { toast } from 'sonner';

const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Pulses', 'Spices'];

export default function BrowseCrops() {
  const { crops, addToWishlist, user } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceSort, setPriceSort] = useState<'none' | 'low' | 'high'>('none');

  let filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         crop.farmerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || crop.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (priceSort === 'low') {
    filteredCrops = [...filteredCrops].sort((a, b) => a.price - b.price);
  } else if (priceSort === 'high') {
    filteredCrops = [...filteredCrops].sort((a, b) => b.price - a.price);
  }

  const handleAddToWishlist = (cropId: string) => {
    if (!user) {
      toast.error('Please login first');
      return;
    }
    addToWishlist(cropId);
    toast.success('Added to wishlist!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Browse Crops</h1>
        <p className="text-gray-600">Discover fresh produce from local farmers</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search crops, farmers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  selectedCategory === cat 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <select 
            className="border rounded-lg px-3 py-2 text-sm"
            value={priceSort}
            onChange={(e) => setPriceSort(e.target.value as typeof priceSort)}
          >
            <option value="none">Sort by Price</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCrops.map((crop) => (
          <Card key={crop.id} className="border-0 shadow-md overflow-hidden group">
            <div className="relative h-48">
              <img 
                src={crop.image} 
                alt={crop.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              {crop.organic && (
                <Badge className="absolute top-2 left-2 bg-green-500">
                  <Leaf className="w-3 h-3 mr-1" />
                  Organic
                </Badge>
              )}
              <button
                onClick={() => handleAddToWishlist(crop.id)}
                className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"
              >
                <Heart className="w-4 h-4" />
              </button>
            </div>
            <CardContent className="p-4">
              <p className="text-xs text-green-600 font-medium mb-1">{crop.category}</p>
              <h3 className="font-semibold text-gray-900 mb-1">{crop.name}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                <MapPin className="w-3 h-3" />
                {crop.farmerName}
              </div>
              <div className="flex items-center gap-1 mb-3">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{crop.rating || '4.5'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-green-600">₹{crop.price}</span>
                <span className="text-sm text-gray-500">/{crop.unit}</span>
              </div>
              <Link to={`/market/${crop.id}`}>
                <Button className="w-full mt-3 bg-green-600 hover:bg-green-700 gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCrops.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

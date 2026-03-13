import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, ShoppingCart, Trash2, Leaf, MapPin, 
  Star, ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

export default function Wishlist() {
  const { wishlist, crops, removeFromWishlist, addToWishlist, user } = useApp();

  const wishlistCrops = crops.filter(crop => 
    wishlist.some(w => w.cropId === crop.id && w.userId === user?.id)
  );

  const handleRemove = (cropId: string) => {
    removeFromWishlist(cropId);
    toast.success('Removed from wishlist');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-600">{wishlistCrops.length} items saved</p>
        </div>
        <Link to="/buyer/browse">
          <Button variant="outline" className="gap-2">
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Wishlist Grid */}
      {wishlistCrops.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistCrops.map((crop) => (
            <Card key={crop.id} className="border-0 shadow-md overflow-hidden group">
              <div className="relative h-48">
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
                <button
                  onClick={() => handleRemove(crop.id)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-red-50 text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
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
                    Buy Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Heart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-6">Save items you like to purchase later</p>
          <Link to="/buyer/browse">
            <Button className="bg-green-600 hover:bg-green-700 gap-2">
              <ShoppingCart className="w-4 h-4" />
              Browse Products
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

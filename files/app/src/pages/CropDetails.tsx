import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, MapPin, Star, Heart, Share2, ShoppingCart,
  Leaf, Droplets, Sun, Calendar, User, CheckCircle2,
  Minus, Plus, MessageCircle
} from 'lucide-react';
import { toast } from 'sonner';

export default function CropDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { crops, addToWishlist, placeOrder, user } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'shipping'>('details');

  const crop = crops.find(c => c.id === id);

  if (!crop) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link to="/market">
            <Button className="bg-green-600 hover:bg-green-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Market
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }
    
    const orderData = {
      buyerId: user.id,
      buyerName: user.name,
      farmerId: crop.farmerId,
      farmerName: crop.farmerName,
      items: [{
        cropId: crop.id,
        cropName: crop.name,
        quantity,
        price: crop.price,
        total: crop.price * quantity,
      }],
      totalAmount: crop.price * quantity,
      paymentMethod: 'upi',
      paymentStatus: 'pending' as const,
      deliveryAddress: user.address || '',
    };

    placeOrder(orderData);
    toast.success('Order placed successfully!');
    navigate('/buyer/orders');
  };

  const handleAddToWishlist = () => {
    if (!user) {
      toast.error('Please login to add to wishlist');
      return;
    }
    addToWishlist(crop.id);
    toast.success('Added to wishlist!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-green-600">Home</Link>
          <span>/</span>
          <Link to="/market" className="hover:text-green-600">Market</Link>
          <span>/</span>
          <span className="text-gray-900">{crop.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={crop.image} 
                alt={crop.name}
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 gap-2" onClick={handleAddToWishlist}>
                <Heart className="w-4 h-4" />
                Add to Wishlist
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-100 text-green-700">{crop.category}</Badge>
                {crop.organic && (
                  <Badge className="bg-emerald-100 text-emerald-700">
                    <Leaf className="w-3 h-3 mr-1" />
                    Organic
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{crop.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{crop.rating || '4.5'}</span>
                  <span className="text-gray-500">({crop.reviews?.length || 0} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <MapPin className="w-4 h-4" />
                  {crop.location}
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-green-600">₹{crop.price}</span>
                <span className="text-gray-600">per {crop.unit}</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                In Stock: {crop.stock} {crop.unit}
              </p>
            </div>

            {/* Farmer Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-7 h-7 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{crop.farmerName}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {crop.farmerRating} Rating
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <MessageCircle className="w-4 h-4" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-24 text-center"
                    min={1}
                    max={crop.stock}
                  />
                  <button
                    onClick={() => setQuantity(Math.min(crop.stock, quantity + 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <span className="text-gray-500">{crop.unit}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700 gap-2 text-lg py-6"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Buy Now - ₹{crop.price * quantity}
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex gap-6">
                {(['details', 'reviews', 'shipping'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-medium capitalize transition-colors relative ${
                      activeTab === tab
                        ? 'text-green-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
              {activeTab === 'details' && (
                <div className="space-y-4">
                  <p className="text-gray-600">{crop.description}</p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Sun className="w-5 h-5 text-orange-500" />
                      <div>
                        <p className="text-sm text-gray-500">Season</p>
                        <p className="font-medium">{crop.season}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Leaf className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-sm text-gray-500">Soil Type</p>
                        <p className="font-medium">{crop.soilType}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Droplets className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Water Need</p>
                        <p className="font-medium">{crop.waterRequirement}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-purple-500" />
                      <div>
                        <p className="text-sm text-gray-500">Harvest Date</p>
                        <p className="font-medium">{new Date(crop.harvestDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {crop.healthBenefits && crop.healthBenefits.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Health Benefits</h4>
                      <ul className="space-y-2">
                        {crop.healthBenefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-600">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {crop.reviews && crop.reviews.length > 0 ? (
                    crop.reviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{review.userName}</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              {review.rating}
                            </div>
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                          <p className="text-sm text-gray-400 mt-2">
                            {new Date(review.date).toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Free Delivery</h4>
                      <p className="text-gray-600 text-sm">On orders above ₹500</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Same Day Delivery</h4>
                      <p className="text-gray-600 text-sm">For orders placed before 2 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Easy Returns</h4>
                      <p className="text-gray-600 text-sm">7-day return policy for damaged items</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Sprout, TrendingUp, Users, Shield, ArrowRight, 
  Tractor, ShoppingBag, BarChart3, CheckCircle2,
  Star, Quote
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

const features = [
  {
    icon: Tractor,
    title: 'Farm Management',
    description: 'Comprehensive tools to manage crops, soil, irrigation, and equipment efficiently.',
  },
  {
    icon: ShoppingBag,
    title: 'Direct Marketplace',
    description: 'Sell directly to buyers and get better prices without middlemen.',
  },
  {
    icon: BarChart3,
    title: 'AI Insights',
    description: 'Get AI-powered crop recommendations and market trend predictions.',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Safe and secure payment options with multiple methods supported.',
  },
];

const stats = [
  { value: '50,000+', label: 'Registered Farmers' },
  { value: '1,00,000+', label: 'Happy Buyers' },
  { value: '₹500Cr+', label: 'Transactions' },
  { value: '25+', label: 'States Covered' },
];

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Farmer, Punjab',
    content: 'Farm Connect has transformed how I sell my crops. I get better prices and direct access to buyers. The AI advisor is incredibly helpful!',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Buyer, Mumbai',
    content: 'I love getting fresh produce directly from farmers. The quality is amazing and I know exactly where my food comes from.',
    rating: 5,
  },
  {
    name: 'Suresh Patil',
    role: 'Organic Farmer, Maharashtra',
    content: 'The farm management tools have helped me track everything from soil health to finances. Highly recommended for all farmers!',
    rating: 5,
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Register',
    description: 'Sign up as a farmer or buyer in just a few minutes.',
  },
  {
    step: '02',
    title: 'Connect',
    description: 'Farmers list products, buyers browse and purchase directly.',
  },
  {
    step: '03',
    title: 'Transact',
    description: 'Secure payments and seamless delivery tracking.',
  },
  {
    step: '04',
    title: 'Grow',
    description: 'Build relationships and grow your business together.',
  },
];

export default function Home() {
  const { isAuthenticated, user } = useApp();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <Sprout className="w-4 h-4" />
                Connecting Farmers & Buyers
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Grow Your Farm,{' '}
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Expand Your Reach
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-xl">
                Farm Connect empowers farmers with AI-driven insights, direct market access, 
                and comprehensive farm management tools. Join 50,000+ farmers already growing with us.
              </p>
              
              <div className="flex flex-wrap gap-4">
                {isAuthenticated ? (
                  <Link to={`/${user?.role}/dashboard`}>
                    <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 gap-2">
                      Go to Dashboard
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/signup">
                      <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 gap-2">
                        Get Started Free
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link to="/market">
                      <Button size="lg" variant="outline" className="gap-2">
                        <ShoppingBag className="w-4 h-4" />
                        Browse Market
                      </Button>
                    </Link>
                  </>
                )}
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Free Registration
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  No Middlemen
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Secure Payments
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80" 
                  alt="Farm landscape"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 animate-bounce">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">+40%</p>
                    <p className="text-sm text-gray-500">Income Growth</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">50K+</p>
                    <p className="text-sm text-gray-500">Farmers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to{' '}
              <span className="text-green-600">Succeed</span>
            </h2>
            <p className="text-gray-600 text-lg">
              From farm management to market access, we provide all the tools you need 
              to grow your agricultural business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How <span className="text-green-600">Farm Connect</span> Works
            </h2>
            <p className="text-gray-600 text-lg">
              Getting started is easy. Follow these simple steps to begin your journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-green-100 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-full h-0.5 bg-green-100 -z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Featured Products
              </h2>
              <p className="text-gray-600">Fresh produce directly from our trusted farmers</p>
            </div>
            <Link to="/market">
              <Button variant="outline" className="gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Organic Tomatoes', price: '₹45/kg', farmer: 'Rajesh Kumar', image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400' },
              { name: 'Basmati Rice', price: '₹120/kg', farmer: 'Suresh Patil', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
              { name: 'Alphonso Mangoes', price: '₹350/dozen', farmer: 'Amar Singh', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400' },
            ].map((product, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                      Organic
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">by {product.farmer}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-600">{product.price}</span>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our <span className="text-green-600">Users Say</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Hear from farmers and buyers who have transformed their businesses with Farm Connect.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <Quote className="w-10 h-10 text-green-200 mb-4" />
                  <p className="text-gray-600 mb-6">{testimonial.content}</p>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-green-600">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Transform Your Farming Business?
              </h2>
              <p className="text-green-100 text-lg mb-8">
                Join thousands of farmers and buyers already using Farm Connect. 
                Start your journey today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/signup">
                  <Button size="lg" variant="secondary" className="gap-2">
                    Get Started Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

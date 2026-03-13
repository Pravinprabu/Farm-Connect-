import { Card, CardContent } from '@/components/ui/card';
import { 
  Sprout, Target, Heart, Globe, Users, Award, 
  TrendingUp, Shield, Leaf, CheckCircle2 
} from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Farmer First',
    description: 'We prioritize the needs and success of farmers in everything we do.',
  },
  {
    icon: Shield,
    title: 'Transparency',
    description: 'Fair pricing and transparent transactions for all parties.',
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description: 'Leveraging technology to solve real agricultural challenges.',
  },
  {
    icon: Globe,
    title: 'Sustainability',
    description: 'Promoting eco-friendly farming practices for a better future.',
  },
];

const team = [
  {
    name: 'Dr. Amit Sharma',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    bio: 'Agricultural scientist with 15+ years of experience in sustainable farming.',
  },
  {
    name: 'Priya Patel',
    role: 'Chief Technology Officer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    bio: 'Tech innovator passionate about bringing AI to agriculture.',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    bio: 'Supply chain expert ensuring smooth farmer-buyer connections.',
  },
  {
    name: 'Sneha Reddy',
    role: 'Customer Success Lead',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    bio: 'Dedicated to helping farmers and buyers succeed on our platform.',
  },
];

const achievements = [
  { value: '50,000+', label: 'Farmers Empowered' },
  { value: '1M+', label: 'Orders Processed' },
  { value: '25', label: 'States Covered' },
  { value: '₹500Cr+', label: 'Farmer Earnings' },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
              <Sprout className="w-4 h-4" />
              About Farm Connect
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Empowering Farmers,{' '}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Connecting Communities
              </span>
            </h1>
            <p className="text-lg text-gray-600">
              Farm Connect is on a mission to revolutionize agriculture in India by bridging 
              the gap between farmers and buyers through technology, transparency, and trust.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80" 
                alt="Farmers working together"
                className="rounded-3xl shadow-xl w-full"
              />
            </div>
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To empower every farmer in India with technology, market access, and fair pricing, 
                  creating a sustainable agricultural ecosystem that benefits farmers, buyers, and 
                  the environment. We believe that when farmers thrive, communities flourish.
                </p>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To become India&apos;s most trusted agricultural platform, connecting 1 million farmers 
                  to direct markets by 2030, while promoting sustainable farming practices and 
                  ensuring food security for future generations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Core <span className="text-green-600">Values</span>
            </h2>
            <p className="text-gray-600 text-lg">
              These principles guide everything we do at Farm Connect.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-4">
                    <value.icon className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            {achievements.map((achievement, index) => (
              <div key={index}>
                <p className="text-4xl lg:text-5xl font-bold mb-2">{achievement.value}</p>
                <p className="text-green-100">{achievement.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our <span className="text-green-600">Leadership</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Passionate individuals dedicated to transforming agriculture in India.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-green-600 text-sm mb-2">{member.role}</p>
                  <p className="text-gray-500 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why Choose <span className="text-green-600">Farm Connect?</span>
              </h2>
              <p className="text-gray-600 mb-8">
                We&apos;re not just a marketplace – we&apos;re a complete ecosystem designed to help 
                farmers succeed and buyers get the best quality produce.
              </p>
              
              <div className="space-y-4">
                {[
                  'Direct farmer-to-buyer connections with no middlemen',
                  'AI-powered crop recommendations and market insights',
                  'Comprehensive farm management tools',
                  'Secure payments and transparent pricing',
                  '24/7 customer support in multiple languages',
                  'Training and resources for sustainable farming',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=400&q=80" 
                alt="Farming"
                className="rounded-2xl shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80" 
                alt="Harvest"
                className="rounded-2xl shadow-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Partners</h2>
            <p className="text-gray-600">Working together for a better agricultural future</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {['AgriTech India', 'Krishi Vikas', 'Organic India', 'NABARD', 'IFFCO'].map((partner, index) => (
              <div key={index} className="flex items-center gap-2 text-xl font-semibold text-gray-400">
                <Leaf className="w-6 h-6" />
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

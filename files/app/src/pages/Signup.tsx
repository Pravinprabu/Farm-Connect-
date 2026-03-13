import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Sprout, Eye, EyeOff, Loader2, ArrowRight, User, 
  Tractor, ShoppingBag, CheckCircle2, Phone, Mail, Lock, MapPin
} from 'lucide-react';
import { toast } from 'sonner';

type UserRole = 'farmer' | 'buyer';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useApp();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    otp: '',
    agreeTerms: false,
  });

  const handleSendOTP = () => {
    if (!formData.phone) {
      toast.error('Please enter your phone number');
      return;
    }
    setOtpSent(true);
    toast.success('OTP sent to your phone! (Use 123456 for demo)');
  };

  const handleVerifyOTP = () => {
    if (formData.otp === '123456') {
      setOtpVerified(true);
      toast.success('Phone number verified!');
    } else {
      toast.error('Invalid OTP. Try 123456 for demo');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!formData.agreeTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    setIsLoading(true);

    try {
      await signup({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: selectedRole,
        address: formData.address,
      }, formData.password);
      
      toast.success('Account created successfully!');
      navigate(`/${selectedRole}/dashboard`);
    } catch (error) {
      toast.error('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderRoleSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Your Role</h3>
        <p className="text-gray-600">Select how you want to use Farm Connect</p>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setSelectedRole('farmer')}
          className={`p-6 rounded-xl border-2 text-left transition-all ${
            selectedRole === 'farmer'
              ? 'border-green-500 bg-green-50'
              : 'border-gray-200 hover:border-green-200 hover:bg-green-50/50'
          }`}
        >
          <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Tractor className="w-7 h-7 text-green-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">I&apos;m a Farmer</h4>
          <p className="text-sm text-gray-600">
            Sell crops, manage your farm, and get AI-powered insights
          </p>
        </button>
        
        <button
          type="button"
          onClick={() => setSelectedRole('buyer')}
          className={`p-6 rounded-xl border-2 text-left transition-all ${
            selectedRole === 'buyer'
              ? 'border-green-500 bg-green-50'
              : 'border-gray-200 hover:border-green-200 hover:bg-green-50/50'
          }`}
        >
          <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <ShoppingBag className="w-7 h-7 text-blue-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">I&apos;m a Buyer</h4>
          <p className="text-sm text-gray-600">
            Buy fresh produce directly from farmers at fair prices
          </p>
        </button>
      </div>
      
      <Button 
        onClick={() => setStep(2)}
        disabled={!selectedRole}
        className="w-full bg-green-600 hover:bg-green-700 gap-2"
      >
        Continue
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );

  const renderRegistrationForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="pl-10"
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="pl-10"
            required
          />
        </div>
      </div>

      {/* Phone with OTP */}
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="phone"
              placeholder="+91 98765-43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="pl-10"
              required
              disabled={otpVerified}
            />
          </div>
          {!otpSent ? (
            <Button type="button" variant="outline" onClick={handleSendOTP}>
              Send OTP
            </Button>
          ) : !otpVerified ? (
            <Button type="button" variant="outline" onClick={handleSendOTP}>
              Resend
            </Button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-md">
              <CheckCircle2 className="w-4 h-4" />
              Verified
            </div>
          )}
        </div>
      </div>

      {/* OTP Input */}
      {otpSent && !otpVerified && (
        <div className="space-y-2">
          <Label htmlFor="otp">Enter OTP</Label>
          <div className="flex gap-2">
            <Input
              id="otp"
              placeholder="Enter 6-digit OTP"
              value={formData.otp}
              onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
              maxLength={6}
            />
            <Button type="button" onClick={handleVerifyOTP}>
              Verify
            </Button>
          </div>
          <p className="text-sm text-gray-500">Demo OTP: 123456</p>
        </div>
      )}

      {/* Address */}
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <textarea
            id="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent min-h-[80px]"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a strong password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="pl-10 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="pl-10"
            required
          />
        </div>
      </div>

      {/* Terms */}
      <div className="flex items-start gap-2">
        <Checkbox
          id="terms"
          checked={formData.agreeTerms}
          onCheckedChange={(checked) => 
            setFormData({ ...formData, agreeTerms: checked as boolean })
          }
        />
        <Label htmlFor="terms" className="text-sm font-normal leading-tight cursor-pointer">
          I agree to the{' '}
          <Link to="/terms" className="text-green-600 hover:underline">Terms of Service</Link>
          {' '}and{' '}
          <Link to="/privacy" className="text-green-600 hover:underline">Privacy Policy</Link>
        </Label>
      </div>

      {/* Submit */}
      <div className="flex gap-3">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setStep(1)}
          className="flex-1"
        >
          Back
        </Button>
        <Button 
          type="submit" 
          className="flex-1 bg-green-600 hover:bg-green-700 gap-2"
          disabled={isLoading || !otpVerified}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Sprout className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
              Farm Connect
            </span>
          </Link>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>
              {step === 1 ? 'Choose your role to get started' : 'Complete your registration'}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <div className={`w-16 h-1 rounded ${step >= 2 ? 'bg-green-600' : 'bg-gray-200'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
            </div>

            {step === 1 ? renderRoleSelection() : renderRegistrationForm()}
          </CardContent>
        </Card>

        {/* Login Link */}
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

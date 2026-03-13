// User Types
export type UserRole = 'farmer' | 'buyer' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  address?: string;
  createdAt: string;
}

// Product/Crop Types
export interface Crop {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  image: string;
  description: string;
  farmerId: string;
  farmerName: string;
  farmerRating: number;
  location: string;
  harvestDate: string;
  expiryDate?: string;
  organic: boolean;
  season: string;
  soilType: string;
  waterRequirement: string;
  healthBenefits: string[];
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

// Order Types
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

export interface Order {
  id: string;
  buyerId: string;
  buyerName: string;
  farmerId: string;
  farmerName: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  deliveryAddress: string;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
}

export interface OrderItem {
  cropId: string;
  cropName: string;
  quantity: number;
  price: number;
  total: number;
}

// Farm Management Types
export interface Farm {
  id: string;
  farmerId: string;
  name: string;
  size: number;
  sizeUnit: string;
  location: string;
  soilType: string;
  soilPH: number;
  soilMoisture: number;
  crops: FarmCrop[];
}

export interface FarmCrop {
  id: string;
  name: string;
  variety: string;
  plantedDate: string;
  expectedHarvest: string;
  area: number;
  status: 'growing' | 'harvested' | 'failed';
}

export interface SoilAnalysis {
  id: string;
  farmId: string;
  date: string;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  moisture: number;
  recommendations: string[];
}

export interface IrrigationRecord {
  id: string;
  farmId: string;
  date: string;
  method: string;
  duration: number;
  waterUsed: number;
  cropName: string;
}

export interface PestRecord {
  id: string;
  farmId: string;
  date: string;
  pestName: string;
  cropAffected: string;
  severity: 'low' | 'medium' | 'high';
  treatment: string;
  status: 'active' | 'resolved';
}

export interface Equipment {
  id: string;
  farmId: string;
  name: string;
  type: string;
  purchaseDate: string;
  lastMaintenance: string;
  nextMaintenance: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface Worker {
  id: string;
  farmId: string;
  name: string;
  role: string;
  phone: string;
  dailyWage: number;
  joinDate: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  workerId: string;
  description: string;
  date: string;
  hours: number;
  status: 'pending' | 'in-progress' | 'completed';
}

// Financial Types
export interface Transaction {
  id: string;
  userId: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
}

export interface Budget {
  id: string;
  farmerId: string;
  name: string;
  totalBudget: number;
  spent: number;
  category: string;
  startDate: string;
  endDate: string;
}

// Market Types
export interface MarketPrice {
  cropName: string;
  currentPrice: number;
  previousPrice: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  date: string;
}

export interface PriceHistory {
  cropName: string;
  prices: { date: string; price: number }[];
}

// AI Types
export interface AIRecommendation {
  crop: string;
  confidence: number;
  reason: string;
  expectedYield: string;
  marketDemand: 'high' | 'medium' | 'low';
}

export interface FertilizerRecommendation {
  fertilizer: string;
  quantity: string;
  applicationTime: string;
  benefits: string[];
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order' | 'alert' | 'info' | 'success';
  read: boolean;
  createdAt: string;
}

// Wishlist Types
export interface WishlistItem {
  id: string;
  userId: string;
  cropId: string;
  addedAt: string;
}

// Chat Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// Government Scheme Types
export interface GovernmentScheme {
  id: string;
  name: string;
  description: string;
  eligibility: string;
  benefits: string;
  deadline: string;
  applicationUrl: string;
}

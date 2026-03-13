import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { 
  User, Crop, Order, Farm, Transaction, 
  Notification, WishlistItem, ChatMessage, MarketPrice 
} from '@/types';

interface AppContextType {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Partial<User>, password: string) => Promise<boolean>;
  logout: () => void;
  
  // Data
  crops: Crop[];
  orders: Order[];
  transactions: Transaction[];
  notifications: Notification[];
  wishlist: WishlistItem[];
  marketPrices: MarketPrice[];
  chatHistory: ChatMessage[];
  
  // Actions
  addCrop: (crop: Omit<Crop, 'id' | 'farmerId' | 'farmerName' | 'farmerRating' | 'rating' | 'reviews'>) => void;
  updateCrop: (id: string, updates: Partial<Crop>) => void;
  deleteCrop: (id: string) => void;
  placeOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  addToWishlist: (cropId: string) => void;
  removeFromWishlist: (cropId: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  markNotificationRead: (id: string) => void;
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChat: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Sample data for demonstration
const sampleCrops: Crop[] = [
  {
    id: '1',
    name: 'Organic Tomatoes',
    category: 'Vegetables',
    price: 45,
    unit: 'kg',
    stock: 500,
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400',
    description: 'Fresh, organic tomatoes grown with natural farming methods. Perfect for salads and cooking.',
    farmerId: 'f1',
    farmerName: 'Rajesh Kumar',
    farmerRating: 4.8,
    location: 'Pune, Maharashtra',
    harvestDate: '2024-02-15',
    expiryDate: '2024-03-15',
    organic: true,
    season: 'Winter',
    soilType: 'Loamy',
    waterRequirement: 'Moderate',
    healthBenefits: ['Rich in Vitamin C', 'Good for heart health', 'Antioxidant properties'],
    rating: 4.7,
    reviews: []
  },
  {
    id: '2',
    name: 'Basmati Rice',
    category: 'Grains',
    price: 120,
    unit: 'kg',
    stock: 1000,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
    description: 'Premium quality basmati rice with long grains and aromatic flavor.',
    farmerId: 'f1',
    farmerName: 'Rajesh Kumar',
    farmerRating: 4.8,
    location: 'Karnal, Haryana',
    harvestDate: '2024-01-20',
    expiryDate: '2025-01-20',
    organic: false,
    season: 'Kharif',
    soilType: 'Clay',
    waterRequirement: 'High',
    healthBenefits: ['Low glycemic index', 'Gluten-free', 'Easy to digest'],
    rating: 4.5,
    reviews: []
  },
  {
    id: '3',
    name: 'Alphonso Mangoes',
    category: 'Fruits',
    price: 350,
    unit: 'dozen',
    stock: 200,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400',
    description: 'King of mangoes, sweet and juicy Alphonso mangoes from Ratnagiri.',
    farmerId: 'f2',
    farmerName: 'Suresh Patil',
    farmerRating: 4.9,
    location: 'Ratnagiri, Maharashtra',
    harvestDate: '2024-03-01',
    expiryDate: '2024-03-20',
    organic: true,
    season: 'Summer',
    soilType: 'Laterite',
    waterRequirement: 'Moderate',
    healthBenefits: ['Rich in Vitamin A', 'Boosts immunity', 'Aids digestion'],
    rating: 4.9,
    reviews: []
  },
  {
    id: '4',
    name: 'Fresh Spinach',
    category: 'Vegetables',
    price: 30,
    unit: 'bunch',
    stock: 300,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
    description: 'Nutrient-rich spinach leaves, freshly harvested daily.',
    farmerId: 'f3',
    farmerName: 'Priya Sharma',
    farmerRating: 4.6,
    location: 'Jaipur, Rajasthan',
    harvestDate: '2024-02-28',
    expiryDate: '2024-03-05',
    organic: true,
    season: 'Winter',
    soilType: 'Sandy Loam',
    waterRequirement: 'Low',
    healthBenefits: ['High in iron', 'Rich in vitamins', 'Anti-inflammatory'],
    rating: 4.4,
    reviews: []
  },
  {
    id: '5',
    name: 'Wheat Grains',
    category: 'Grains',
    price: 28,
    unit: 'kg',
    stock: 2000,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
    description: 'High-quality wheat grains, perfect for flour milling.',
    farmerId: 'f4',
    farmerName: 'Amar Singh',
    farmerRating: 4.7,
    location: 'Ludhiana, Punjab',
    harvestDate: '2024-04-10',
    expiryDate: '2025-04-10',
    organic: false,
    season: 'Rabi',
    soilType: 'Alluvial',
    waterRequirement: 'Moderate',
    healthBenefits: ['Good source of fiber', 'Energy rich', 'Contains B vitamins'],
    rating: 4.6,
    reviews: []
  },
  {
    id: '6',
    name: 'Organic Carrots',
    category: 'Vegetables',
    price: 40,
    unit: 'kg',
    stock: 400,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
    description: 'Sweet and crunchy organic carrots, rich in beta-carotene.',
    farmerId: 'f3',
    farmerName: 'Priya Sharma',
    farmerRating: 4.6,
    location: 'Jaipur, Rajasthan',
    harvestDate: '2024-02-20',
    expiryDate: '2024-03-20',
    organic: true,
    season: 'Winter',
    soilType: 'Sandy',
    waterRequirement: 'Moderate',
    healthBenefits: ['Good for eyesight', 'Rich in Vitamin A', 'Antioxidant'],
    rating: 4.5,
    reviews: []
  }
];

const sampleMarketPrices: MarketPrice[] = [
  { cropName: 'Wheat', currentPrice: 28, previousPrice: 26, unit: 'kg', trend: 'up', changePercent: 7.7, date: '2024-03-01' },
  { cropName: 'Rice', currentPrice: 45, previousPrice: 48, unit: 'kg', trend: 'down', changePercent: 6.3, date: '2024-03-01' },
  { cropName: 'Tomatoes', currentPrice: 42, previousPrice: 40, unit: 'kg', trend: 'up', changePercent: 5.0, date: '2024-03-01' },
  { cropName: 'Potatoes', currentPrice: 25, previousPrice: 25, unit: 'kg', trend: 'stable', changePercent: 0, date: '2024-03-01' },
  { cropName: 'Onions', currentPrice: 35, previousPrice: 32, unit: 'kg', trend: 'up', changePercent: 9.4, date: '2024-03-01' },
  { cropName: 'Mangoes', currentPrice: 120, previousPrice: 100, unit: 'kg', trend: 'up', changePercent: 20, date: '2024-03-01' }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [crops, setCrops] = useState<Crop[]>(sampleCrops);
  const [orders, setOrders] = useState<Order[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [marketPrices] = useState<MarketPrice[]>(sampleMarketPrices);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('farmConnect_user');
    const savedCrops = localStorage.getItem('farmConnect_crops');
    const savedOrders = localStorage.getItem('farmConnect_orders');
    const savedTransactions = localStorage.getItem('farmConnect_transactions');
    const savedWishlist = localStorage.getItem('farmConnect_wishlist');
    const savedChat = localStorage.getItem('farmConnect_chat');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedCrops) setCrops(JSON.parse(savedCrops));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedChat) setChatHistory(JSON.parse(savedChat));
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    if (user) localStorage.setItem('farmConnect_user', JSON.stringify(user));
    localStorage.setItem('farmConnect_crops', JSON.stringify(crops));
    localStorage.setItem('farmConnect_orders', JSON.stringify(orders));
    localStorage.setItem('farmConnect_transactions', JSON.stringify(transactions));
    localStorage.setItem('farmConnect_wishlist', JSON.stringify(wishlist));
    localStorage.setItem('farmConnect_chat', JSON.stringify(chatHistory));
  }, [user, crops, orders, transactions, wishlist, chatHistory]);

  const login = async (email: string): Promise<boolean> => {
    // Simulate API call
    const users = JSON.parse(localStorage.getItem('farmConnect_users') || '[]');
    const foundUser = users.find((u: User) => u.email === email);
    
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const signup = async (userData: Partial<User>): Promise<boolean> => {
    const newUser: User = {
      id: `user_${Date.now()}`,
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      role: userData.role || 'buyer',
      address: userData.address || '',
      createdAt: new Date().toISOString(),
    };

    const users = JSON.parse(localStorage.getItem('farmConnect_users') || '[]');
    users.push(newUser);
    localStorage.setItem('farmConnect_users', JSON.stringify(users));
    
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('farmConnect_user');
  };

  const addCrop = (cropData: Omit<Crop, 'id' | 'farmerId' | 'farmerName' | 'farmerRating' | 'rating' | 'reviews'>) => {
    if (!user || user.role !== 'farmer') return;
    
    const newCrop: Crop = {
      ...cropData,
      id: `crop_${Date.now()}`,
      farmerId: user.id,
      farmerName: user.name,
      farmerRating: 4.5,
      reviews: [],
      rating: 0,
    };
    setCrops([...crops, newCrop]);
  };

  const updateCrop = (id: string, updates: Partial<Crop>) => {
    setCrops(crops.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCrop = (id: string) => {
    setCrops(crops.filter(c => c.id !== id));
  };

  const placeOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `order_${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setOrders([...orders, newOrder]);
    
    // Add notification for farmer
    const notification: Notification = {
      id: `notif_${Date.now()}`,
      userId: orderData.farmerId,
      title: 'New Order Received',
      message: `You have received a new order from ${orderData.buyerName}`,
      type: 'order',
      read: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications([...notifications, notification]);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o));
  };

  const addToWishlist = (cropId: string) => {
    if (!user) return;
    const exists = wishlist.find(w => w.cropId === cropId && w.userId === user.id);
    if (!exists) {
      setWishlist([...wishlist, { id: `wish_${Date.now()}`, userId: user.id, cropId, addedAt: new Date().toISOString() }]);
    }
  };

  const removeFromWishlist = (cropId: string) => {
    if (!user) return;
    setWishlist(wishlist.filter(w => !(w.cropId === cropId && w.userId === user.id)));
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    setTransactions([...transactions, { ...transaction, id: `trans_${Date.now()}` }]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const addChatMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    setChatHistory([...chatHistory, { ...message, id: `chat_${Date.now()}`, timestamp: new Date().toISOString() }]);
  };

  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <AppContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
      crops,
      orders,
      transactions,
      notifications,
      wishlist,
      marketPrices,
      chatHistory,
      addCrop,
      updateCrop,
      deleteCrop,
      placeOrder,
      updateOrderStatus,
      addToWishlist,
      removeFromWishlist,
      addTransaction,
      markNotificationRead,
      addChatMessage,
      clearChat,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

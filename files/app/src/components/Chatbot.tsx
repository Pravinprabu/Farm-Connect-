import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const quickReplies = [
  'How do I sell my crops?',
  'Track my order',
  'Payment methods',
  'Contact support',
  'Market prices today',
];

const botResponses: Record<string, string> = {
  'hello': 'Hello! Welcome to Farm Connect. How can I help you today?',
  'hi': 'Hi there! How can I assist you with Farm Connect?',
  'help': 'I can help you with:\n• Selling crops as a farmer\n• Buying fresh produce\n• Tracking orders\n• Payment methods\n• Market prices\n• Farm management\n\nWhat would you like to know?',
  'sell': 'To sell your crops:\n1. Register as a farmer\n2. Add your crops in the dashboard\n3. Set prices and stock\n4. Wait for buyer orders\n5. Ship and get paid!\n\nWould you like to register now?',
  'buy': 'To buy fresh produce:\n1. Browse our market section\n2. Add items to cart\n3. Checkout with your preferred payment method\n4. Track your delivery\n\nVisit /market to start shopping!',
  'order': 'You can track your orders in the "My Orders" section of your dashboard. Would you like me to take you there?',
  'payment': 'We accept:\n• UPI (Google Pay, PhonePe, etc.)\n• Credit/Debit Cards\n• Net Banking\n• Cash on Delivery\n\nAll payments are secure and encrypted.',
  'price': 'Market prices vary daily. Visit our Market Trends section for live price updates and forecasts.',
  'contact': 'You can reach us at:\n📞 +91 1800-123-4567\n📧 support@farmconnect.com\n\nOr visit the Contact Us page for more options.',
  'register': 'To register:\n1. Click "Get Started" on the homepage\n2. Choose Farmer or Buyer\n3. Fill in your details\n4. Verify your phone number\n5. Start using Farm Connect!',
  'login': 'Click the "Login" button on the top right. Use your email/phone and password to access your account.',
  'crop': 'For crop-related queries, try our AI Crop Advisor! It can help with:\n• Crop recommendations\n• Fertilizer advice\n• Pest control\n• Best practices',
  'farmer': 'As a farmer, you can:\n• List and sell your crops\n• Manage inventory\n• Track orders and payments\n• Get AI crop recommendations\n• Access farm management tools\n• View market trends',
  'buyer': 'As a buyer, you can:\n• Browse fresh produce\n• Compare prices\n• Place orders\n• Track deliveries\n• Save favorites to wishlist\n• Get market insights',
};

function getBotResponse(input: string): string {
  const lowerInput = input.toLowerCase();
  
  for (const [key, response] of Object.entries(botResponses)) {
    if (lowerInput.includes(key)) {
      return response;
    }
  }
  
  // Check for specific keywords
  if (lowerInput.includes('thank')) {
    return 'You\'re welcome! Is there anything else I can help you with?';
  }
  if (lowerInput.includes('bye')) {
    return 'Goodbye! Have a great day. Feel free to chat anytime!';
  }
  if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('rate')) {
    return 'For current market prices, please visit our Market Trends section or browse the Market page. Prices are updated daily!';
  }
  if (lowerInput.includes('delivery') || lowerInput.includes('shipping')) {
    return 'We offer:\n• Free delivery on orders above ₹500\n• Same-day delivery in select areas\n• Real-time order tracking\n\nDelivery typically takes 1-3 days depending on your location.';
  }
  if (lowerInput.includes('organic')) {
    return 'We have a wide selection of organic products! Look for the "Organic" badge on products. You can also filter by organic in the market section.';
  }
  
  return 'I\'m not sure about that. You can try asking about:\n• Selling or buying crops\n• Order tracking\n• Payment methods\n• Registration\n• Market prices\n\nOr type "help" to see all options!';
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'bot',
      content: 'Hello! 👋 I\'m FarmBot, your farming assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, user } = useApp();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const response = getBotResponse(userMessage.content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    setInput(reply);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-105 z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden transition-all ${
      isMinimized ? 'h-14' : 'h-[500px]'
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">FarmBot</h3>
            <p className="text-xs text-green-100">Always here to help</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white/20 rounded"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 h-[320px] overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start gap-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' ? 'bg-green-600' : 'bg-emerald-100'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                  <div className={`rounded-2xl px-4 py-2 text-sm whitespace-pre-line ${
                    message.role === 'user' 
                      ? 'bg-green-600 text-white rounded-tr-sm' 
                      : 'bg-white shadow-sm rounded-tl-sm'
                  }`}>
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-2 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-2 bg-white border-t">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickReply(reply)}
                  className="px-3 py-1 bg-gray-100 hover:bg-green-100 text-xs rounded-full whitespace-nowrap transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1"
              />
              <Button 
                onClick={handleSend} 
                size="icon"
                className="bg-green-600 hover:bg-green-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

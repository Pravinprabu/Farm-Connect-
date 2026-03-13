import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, Send, Sprout, Droplets, Sun, Leaf,
  TrendingUp, AlertCircle, CheckCircle2, Loader2,
  Thermometer, Wind, Cloud
} from 'lucide-react';
import { toast } from 'sonner';

// Simulated AI responses for demo
const generateAIResponse = (input: string) => {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('tomato') || lowerInput.includes('tomatoes')) {
    return {
      type: 'crop_recommendation',
      title: 'Tomato Cultivation Analysis',
      content: 'Based on your query about tomatoes, here are my recommendations:',
      recommendations: [
        { icon: Sun, title: 'Best Season', value: 'Winter (Oct-Feb) or Summer (Mar-Jun)', color: 'orange' },
        { icon: Droplets, title: 'Water Requirement', value: '25-50mm per week', color: 'blue' },
        { icon: Leaf, title: 'Soil Type', value: 'Well-drained loamy soil, pH 6.0-6.8', color: 'green' },
        { icon: Thermometer, title: 'Temperature', value: '20-27°C optimal range', color: 'red' },
      ],
      tips: [
        'Use drip irrigation for better water efficiency',
        'Apply organic mulch to retain soil moisture',
        'Stake plants to prevent fruit rot',
        'Rotate crops to prevent soil-borne diseases',
      ],
      marketInsight: 'Tomato prices are expected to rise by 15% in the next month due to seasonal demand.',
    };
  }
  
  if (lowerInput.includes('rice') || lowerInput.includes('paddy')) {
    return {
      type: 'crop_recommendation',
      title: 'Rice Cultivation Analysis',
      content: 'For rice cultivation, consider these factors:',
      recommendations: [
        { icon: Sun, title: 'Best Season', value: 'Kharif (Jun-Oct)', color: 'orange' },
        { icon: Droplets, title: 'Water Requirement', value: 'High - flooded fields needed', color: 'blue' },
        { icon: Leaf, title: 'Soil Type', value: 'Clay or clay loam, pH 5.5-6.5', color: 'green' },
        { icon: Thermometer, title: 'Temperature', value: '20-35°C', color: 'red' },
      ],
      tips: [
        'Maintain 5-10cm water depth during growth',
        'Use certified seeds for better yield',
        'Apply nitrogen in split doses',
        'Monitor for stem borer infestation',
      ],
      marketInsight: 'Basmati rice demand is increasing in export markets.',
    };
  }
  
  if (lowerInput.includes('fertilizer') || lowerInput.includes('nutrient')) {
    return {
      type: 'fertilizer_recommendation',
      title: 'Fertilizer Recommendations',
      content: 'Based on common soil conditions, here are my suggestions:',
      recommendations: [
        { icon: Leaf, title: 'NPK Ratio', value: '10:26:26 for initial growth', color: 'green' },
        { icon: Droplets, title: 'Application', value: 'Split application recommended', color: 'blue' },
        { icon: Sun, title: 'Timing', value: 'Early morning or evening', color: 'orange' },
        { icon: CheckCircle2, title: 'Organic Option', value: 'Vermicompost + FYM', color: 'emerald' },
      ],
      tips: [
        'Get soil tested before applying fertilizers',
        'Avoid over-fertilization to prevent burning',
        'Mix organic and chemical fertilizers for best results',
        'Apply micronutrients based on deficiency symptoms',
      ],
      marketInsight: 'Organic fertilizers are seeing 25% price increase. Stock up early.',
    };
  }
  
  // Default response
  return {
    type: 'general',
    title: 'General Farming Advice',
    content: 'Here are some general recommendations for your query:',
    recommendations: [
      { icon: Sun, title: 'Weather', value: 'Check local forecasts regularly', color: 'orange' },
      { icon: Droplets, title: 'Irrigation', value: 'Water early morning or evening', color: 'blue' },
      { icon: Leaf, title: 'Soil Health', value: 'Test soil annually', color: 'green' },
      { icon: TrendingUp, title: 'Market', value: 'Monitor price trends', color: 'purple' },
    ],
    tips: [
      'Keep detailed records of your farming activities',
      'Join local farmer groups for knowledge sharing',
      'Attend agricultural workshops and training',
      'Use technology for better farm management',
    ],
    marketInsight: 'Stay updated with market prices for better selling decisions.',
  };
};

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  data?: ReturnType<typeof generateAIResponse>;
}

const quickQuestions = [
  'What crops should I grow this season?',
  'Best fertilizer for wheat?',
  'How to control pests in tomatoes?',
  'Market price trends for rice?',
  'Irrigation schedule for vegetables?',
];

export default function AIAdvisor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I\'m your AI Farming Assistant. Ask me anything about crops, fertilizers, pest control, or market trends!',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      const response = generateAIResponse(userMessage.content);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        data: response,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="space-y-6 h-[calc(100vh-120px)]">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Crop Advisor</h1>
          <p className="text-gray-600">Get intelligent farming recommendations</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 h-full">
        {/* Chat Area */}
        <Card className="lg:col-span-2 border-0 shadow-md flex flex-col">
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.role === 'user' ? 'bg-green-600 text-white' : 'bg-gray-100'} rounded-2xl px-4 py-3`}>
                    <p>{message.content}</p>
                    
                    {/* Structured Data */}
                    {message.data && (
                      <div className="mt-4 space-y-4">
                        <h4 className="font-semibold">{message.data.title}</h4>
                        
                        {/* Recommendations Grid */}
                        <div className="grid grid-cols-2 gap-3">
                          {message.data.recommendations.map((rec, idx) => (
                            <div key={idx} className="bg-white/90 rounded-lg p-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
                                rec.color === 'orange' ? 'bg-orange-100' :
                                rec.color === 'blue' ? 'bg-blue-100' :
                                rec.color === 'green' ? 'bg-green-100' :
                                rec.color === 'red' ? 'bg-red-100' :
                                rec.color === 'emerald' ? 'bg-emerald-100' :
                                'bg-purple-100'
                              }`}>
                                <rec.icon className={`w-4 h-4 ${
                                  rec.color === 'orange' ? 'text-orange-600' :
                                  rec.color === 'blue' ? 'text-blue-600' :
                                  rec.color === 'green' ? 'text-green-600' :
                                  rec.color === 'red' ? 'text-red-600' :
                                  rec.color === 'emerald' ? 'text-emerald-600' :
                                  'text-purple-600'
                                }`} />
                              </div>
                              <p className="text-xs text-gray-500">{rec.title}</p>
                              <p className="text-sm font-medium text-gray-900">{rec.value}</p>
                            </div>
                          ))}
                        </div>

                        {/* Tips */}
                        <div className="bg-white/90 rounded-lg p-3">
                          <p className="font-medium text-sm mb-2">💡 Pro Tips:</p>
                          <ul className="space-y-1">
                            {message.data.tips.map((tip, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Market Insight */}
                        <div className="bg-amber-50 rounded-lg p-3">
                          <p className="text-sm text-amber-800 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            {message.data.marketInsight}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl px-4 py-3 flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-green-600" />
                    <span className="text-gray-600">AI is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about crops, fertilizers, pests..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1"
                />
                <Button onClick={handleSend} disabled={loading} className="bg-green-600 hover:bg-green-700">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick Questions */}
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Quick Questions</h3>
              <div className="space-y-2">
                {quickQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-green-50 text-sm transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">AI Can Help With</h3>
              <div className="space-y-3">
                {[
                  { icon: Sprout, text: 'Crop recommendations' },
                  { icon: Droplets, text: 'Fertilizer advice' },
                  { icon: AlertCircle, text: 'Pest & disease control' },
                  { icon: TrendingUp, text: 'Market price predictions' },
                  { icon: Sun, text: 'Weather-based suggestions' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-600">{item.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

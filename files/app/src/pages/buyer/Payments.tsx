import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, Plus, Trash2, CheckCircle2, Wallet,
  Building2, Smartphone, Banknote, ArrowRightLeft
} from 'lucide-react';
import { toast } from 'sonner';

const paymentMethods = [
  { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Pay using UPI apps' },
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, RuPay' },
  { id: 'netbanking', name: 'Net Banking', icon: Building2, description: 'All major banks' },
  { id: 'cod', name: 'Cash on Delivery', icon: Banknote, description: 'Pay when you receive' },
];

const transactionHistory = [
  { id: 'TXN001', date: '2024-02-28', description: 'Order #ORD001 - Organic Tomatoes', amount: 2250, status: 'success', method: 'UPI' },
  { id: 'TXN002', date: '2024-02-25', description: 'Order #ORD002 - Basmati Rice', amount: 12000, status: 'success', method: 'Credit Card' },
  { id: 'TXN003', date: '2024-02-20', description: 'Order #ORD003 - Fresh Spinach', amount: 900, status: 'success', method: 'UPI' },
  { id: 'TXN004', date: '2024-02-15', description: 'Order #ORD004 - Wheat Grains', amount: 5600, status: 'failed', method: 'Net Banking' },
];

export default function Payments() {
  const [showAddCard, setShowAddCard] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('upi');

  const handleAddPayment = () => {
    toast.success('Payment method added successfully!');
    setShowAddCard(false);
  };

  const totalSpent = transactionHistory
    .filter(t => t.status === 'success')
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-600">Manage your payment methods and view transactions</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Spent</p>
              <p className="text-2xl font-bold">₹{totalSpent.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <ArrowRightLeft className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Transactions</p>
              <p className="text-2xl font-bold">{transactionHistory.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Saved Methods</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods */}
      <Card className="border-0 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Payment Methods</CardTitle>
          <Button size="sm" onClick={() => setShowAddCard(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <div 
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedMethod === method.id 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-green-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedMethod === method.id ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <method.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{method.name}</p>
                      {selectedMethod === method.id && (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{method.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Saved Cards */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Saved Cards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white">
              <div>
                <p className="text-sm opacity-80">HDFC Bank</p>
                <p className="text-xl font-mono mt-1">**** **** **** 4521</p>
                <p className="text-sm opacity-80 mt-2">Expires 12/26</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-white/20 text-white">Default</Badge>
                <button className="p-2 hover:bg-white/20 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border-2 border-dashed border-gray-200 rounded-xl">
              <div className="flex items-center gap-3">
                <Plus className="w-5 h-5 text-gray-400" />
                <span className="text-gray-500">Add a new card</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowAddCard(true)}>
                Add Card
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Transaction ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Method</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">Amount</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactionHistory.map((txn) => (
                  <tr key={txn.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{txn.id}</td>
                    <td className="py-3 px-4 text-gray-600">{txn.date}</td>
                    <td className="py-3 px-4 text-gray-600">{txn.description}</td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary">{txn.method}</Badge>
                    </td>
                    <td className="py-3 px-4 text-right font-medium">₹{txn.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge className={txn.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                        {txn.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Card Dialog */}
      {showAddCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Add New Card</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Card Number</label>
                <Input placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Expiry Date</label>
                  <Input placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">CVV</label>
                  <Input type="password" placeholder="***" maxLength={3} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Cardholder Name</label>
                <Input placeholder="Name on card" />
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowAddCard(false)}>
                  Cancel
                </Button>
                <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleAddPayment}>
                  Add Card
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

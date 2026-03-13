import { useApp } from '@/context/AppContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, Package, Truck, CheckCircle2, Clock, 
  XCircle, MapPin, Phone, MessageCircle
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const statusConfig = {
  pending: { color: 'bg-yellow-100 text-yellow-700', icon: Clock, label: 'Pending' },
  processing: { color: 'bg-blue-100 text-blue-700', icon: Package, label: 'Processing' },
  shipped: { color: 'bg-purple-100 text-purple-700', icon: Truck, label: 'Shipped' },
  delivered: { color: 'bg-green-100 text-green-700', icon: CheckCircle2, label: 'Delivered' },
  cancelled: { color: 'bg-red-100 text-red-700', icon: XCircle, label: 'Cancelled' },
  refunded: { color: 'bg-gray-100 text-gray-700', icon: XCircle, label: 'Refunded' },
};

const statusFilters = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function MyOrders() {
  const { orders, updateOrderStatus } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.cropName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCancel = (orderId: string) => {
    updateOrderStatus(orderId, 'cancelled');
    toast.success('Order cancelled successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-600">Track and manage your orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {statusFilters.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap capitalize ${
                statusFilter === status 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            const StatusIcon = statusConfig[order.status].icon;
            return (
              <Card key={order.id} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Order Header */}
                    <div className="lg:w-1/4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${statusConfig[order.status].color}`}>
                          <StatusIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold">{order.id}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge className={statusConfig[order.status].color}>
                        {statusConfig[order.status].label}
                      </Badge>
                    </div>

                    {/* Items */}
                    <div className="lg:w-2/4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between py-2">
                          <div>
                            <p className="font-medium">{item.cropName}</p>
                            <p className="text-sm text-gray-500">
                              {item.quantity} x ₹{item.price}
                            </p>
                          </div>
                          <span className="font-semibold">₹{item.total}</span>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="lg:w-1/4 lg:text-right">
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="text-2xl font-bold text-green-600 mb-4">₹{order.totalAmount}</p>
                      
                      <div className="flex lg:justify-end gap-2">
                        {order.status === 'pending' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleCancel(order.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            Cancel
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="gap-1">
                          <MessageCircle className="w-4 h-4" />
                          Support
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Tracking */}
                  {order.status !== 'pending' && order.status !== 'cancelled' && (
                    <div className="mt-6 pt-6 border-t">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-8">
                          {['Order Placed', 'Processing', 'Shipped', 'Delivered'].map((step, idx) => {
                            const stepStatuses = ['pending', 'processing', 'shipped', 'delivered'];
                            const currentIdx = stepStatuses.indexOf(order.status);
                            const isCompleted = idx <= currentIdx;
                            const isCurrent = idx === currentIdx;
                            
                            return (
                              <div key={step} className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${
                                  isCompleted ? 'bg-green-500' : 'bg-gray-300'
                                } ${isCurrent ? 'ring-4 ring-green-100' : ''}`} />
                                <span className={`text-sm ${
                                  isCompleted ? 'text-gray-900' : 'text-gray-400'
                                }`}>
                                  {step}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        {order.trackingNumber && (
                          <p className="text-sm text-gray-500">
                            Tracking: {order.trackingNumber}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-500">Start shopping to see your orders here</p>
          </div>
        )}
      </div>
    </div>
  );
}

import { useApp } from '@/context/AppContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, ShoppingCart, AlertTriangle, CheckCircle2, 
  TrendingUp, MessageCircle, Trash2, CheckCheck
} from 'lucide-react';
import { toast } from 'sonner';

const notificationIcons = {
  order: ShoppingCart,
  alert: AlertTriangle,
  info: Bell,
  success: CheckCircle2,
};

const notificationColors = {
  order: 'bg-blue-100 text-blue-600',
  alert: 'bg-red-100 text-red-600',
  info: 'bg-gray-100 text-gray-600',
  success: 'bg-green-100 text-green-600',
};

export default function FarmerNotifications() {
  const { notifications, markNotificationRead } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    notifications.filter(n => !n.read).forEach(n => markNotificationRead(n.id));
    toast.success('All notifications marked as read');
  };

  const handleMarkRead = (id: string) => {
    markNotificationRead(id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">Stay updated with your farm activities</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={handleMarkAllRead}>
            <CheckCheck className="w-4 h-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Notifications</p>
              <p className="text-2xl font-bold">{notifications.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Unread</p>
              <p className="text-2xl font-bold">{unreadCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Read</p>
              <p className="text-2xl font-bold">{notifications.filter(n => n.read).length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => {
            const Icon = notificationIcons[notification.type];
            return (
              <Card 
                key={notification.id} 
                className={`border-0 shadow-sm ${!notification.read ? 'bg-blue-50/50' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${notificationColors[notification.type]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                          <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                          <p className="text-gray-400 text-xs mt-2">
                            {new Date(notification.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <Badge className="bg-blue-100 text-blue-700">New</Badge>
                          )}
                          {!notification.read && (
                            <button
                              onClick={() => handleMarkRead(notification.id)}
                              className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-green-600"
                              title="Mark as read"
                            >
                              <CheckCircle2 className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications yet</h3>
            <p className="text-gray-500">You&apos;ll receive notifications about orders, alerts, and updates here</p>
          </div>
        )}
      </div>
    </div>
  );
}

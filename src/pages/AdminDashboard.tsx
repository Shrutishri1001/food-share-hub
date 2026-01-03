import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, Package, Truck, TrendingUp, 
  AlertCircle, CheckCircle2, Clock, Activity
} from 'lucide-react';

const StatCard: React.FC<{
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ElementType;
}> = ({ title, value, change, changeType, icon: Icon }) => (
  <div className="bg-card rounded-xl border border-border p-6 shadow-elegant hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
        <p className={`text-sm mt-2 flex items-center gap-1 ${
          changeType === 'positive' ? 'text-success' : 
          changeType === 'negative' ? 'text-destructive' : 'text-muted-foreground'
        }`}>
          <TrendingUp className="h-4 w-4" />
          {change}
        </p>
      </div>
      <div className="p-3 rounded-lg bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
    </div>
  </div>
);

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const recentActivities = [
    { type: 'donation', message: 'New donation from Fresh Bites Restaurant', time: '5 min ago', status: 'pending' },
    { type: 'pickup', message: 'Pickup completed by volunteer John', time: '15 min ago', status: 'completed' },
    { type: 'request', message: 'Hope Shelter requested 50 meals', time: '30 min ago', status: 'pending' },
    { type: 'user', message: 'New volunteer registration', time: '1 hour ago', status: 'new' },
  ];

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Section */}
        <div className="gradient-primary rounded-2xl p-6 lg:p-8 text-primary-foreground">
          <h2 className="text-2xl font-bold">Welcome back, {user?.fullName}!</h2>
          <p className="mt-2 text-primary-foreground/80">
            Here's what's happening with FoodShare today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <StatCard
            title="Total Users"
            value="1,247"
            change="+12% from last month"
            changeType="positive"
            icon={Users}
          />
          <StatCard
            title="Active Donations"
            value="83"
            change="+5% from last week"
            changeType="positive"
            icon={Package}
          />
          <StatCard
            title="Pickups Today"
            value="24"
            change="Same as yesterday"
            changeType="neutral"
            icon={Truck}
          />
          <StatCard
            title="Meals Distributed"
            value="5,420"
            change="+18% this month"
            changeType="positive"
            icon={Activity}
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          </div>
          <div className="divide-y divide-border">
            {recentActivities.map((activity, index) => (
              <div key={index} className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors">
                <div className={`p-2 rounded-lg ${
                  activity.status === 'completed' ? 'bg-success/10' :
                  activity.status === 'pending' ? 'bg-warning/10' : 'bg-primary/10'
                }`}>
                  {activity.status === 'completed' ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : activity.status === 'pending' ? (
                    <Clock className="h-5 w-5 text-warning" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  activity.status === 'completed' ? 'bg-success/10 text-success' :
                  activity.status === 'pending' ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'
                }`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;

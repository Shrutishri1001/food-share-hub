import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Package, Clock, CheckCircle2, Search, 
  Users, Warehouse, Calendar, MapPin
} from 'lucide-react';

const ConsumerDashboard: React.FC = () => {
  const { user } = useAuth();

  const availableDonations = [
    { id: 1, donor: 'Fresh Bites Restaurant', item: 'Cooked Meals', quantity: '50 portions', distance: '2.5 km', expiry: '4 hours' },
    { id: 2, donor: 'Grand Hotel', item: 'Bread & Pastries', quantity: '40 pieces', distance: '3.8 km', expiry: '6 hours' },
    { id: 3, donor: 'City Canteen', item: 'Rice & Dal', quantity: '30 portions', distance: '1.2 km', expiry: '3 hours' },
  ];

  const receivedHistory = [
    { id: 1, item: 'Vegetable Curry', quantity: '60 portions', status: 'Received', date: 'Today' },
    { id: 2, item: 'Fresh Fruits', quantity: '25 kg', status: 'Received', date: 'Yesterday' },
  ];

  return (
    <DashboardLayout title="Consumer Dashboard">
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Section */}
        <div className="gradient-accent rounded-2xl p-6 lg:p-8 text-accent-foreground">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Welcome, {user?.fullName}!</h2>
              <p className="mt-2 text-accent-foreground/80 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {user?.organizationName} • {user?.location}
              </p>
            </div>
            <Button className="bg-accent-foreground text-accent hover:bg-accent-foreground/90 gap-2">
              <Search className="h-5 w-5" />
              Find Donations
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <div className="bg-card rounded-xl border border-border p-6 shadow-elegant">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Daily Capacity</p>
                <p className="text-2xl font-bold text-foreground">{user?.dailyIntakeCapacity || 150}</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 shadow-elegant">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <Package className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Meals Received</p>
                <p className="text-2xl font-bold text-foreground">820</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 shadow-elegant">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <Warehouse className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Storage</p>
                <p className="text-2xl font-bold text-foreground">{user?.storageFacility ? 'Available' : 'Limited'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Available Donations */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Available Donations Near You</h3>
            <p className="text-sm text-muted-foreground mt-1">Request pickups for available food donations</p>
          </div>
          <div className="divide-y divide-border">
            {availableDonations.map((donation) => (
              <div key={donation.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{donation.item}</p>
                  <p className="text-sm text-muted-foreground">{donation.donor}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Package className="h-3 w-3" />
                      {donation.quantity}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {donation.distance}
                    </span>
                    <span className="flex items-center gap-1 text-warning">
                      <Clock className="h-3 w-3" />
                      Expires in {donation.expiry}
                    </span>
                  </div>
                </div>
                <Button size="sm" className="gradient-primary">
                  Request
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Received History */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Recently Received</h3>
            <Button variant="ghost" size="sm" className="text-primary">View All</Button>
          </div>
          <div className="divide-y divide-border">
            {receivedHistory.map((item) => (
              <div key={item.id} className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors">
                <div className="p-2 rounded-lg bg-success/10">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.item}</p>
                  <p className="text-sm text-muted-foreground">{item.quantity}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs px-3 py-1 rounded-full font-medium bg-success/10 text-success">
                    {item.status}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 justify-end">
                    <Calendar className="h-3 w-3" />
                    {item.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ConsumerDashboard;

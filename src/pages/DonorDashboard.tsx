import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Package, Clock, CheckCircle2, Plus, 
  TrendingUp, Users, MapPin
} from 'lucide-react';

const DonorDashboard: React.FC = () => {
  const { user } = useAuth();

  const donations = [
    { id: 1, item: 'Cooked Rice & Curry', quantity: '50 portions', status: 'Pending Pickup', time: '2 hours ago' },
    { id: 2, item: 'Fresh Vegetables', quantity: '20 kg', status: 'Picked Up', time: '1 day ago' },
    { id: 3, item: 'Bread Loaves', quantity: '30 pieces', status: 'Delivered', time: '2 days ago' },
  ];

  return (
    <DashboardLayout title="Donor Dashboard">
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Section */}
        <div className="gradient-primary rounded-2xl p-6 lg:p-8 text-primary-foreground">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Welcome, {user?.fullName}!</h2>
              <p className="mt-2 text-primary-foreground/80 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {user?.organizationName} • {user?.location}
              </p>
            </div>
            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2">
              <Plus className="h-5 w-5" />
              New Donation
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <div className="bg-card rounded-xl border border-border p-6 shadow-elegant">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Donations</p>
                <p className="text-2xl font-bold text-foreground">48</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 shadow-elegant">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <Users className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">People Fed</p>
                <p className="text-2xl font-bold text-foreground">1,250+</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 shadow-elegant">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Impact Score</p>
                <p className="text-2xl font-bold text-foreground">95%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Donations */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Recent Donations</h3>
            <Button variant="ghost" size="sm" className="text-primary">View All</Button>
          </div>
          <div className="divide-y divide-border">
            {donations.map((donation) => (
              <div key={donation.id} className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors">
                <div className={`p-2 rounded-lg ${
                  donation.status === 'Delivered' ? 'bg-success/10' :
                  donation.status === 'Picked Up' ? 'bg-primary/10' : 'bg-warning/10'
                }`}>
                  {donation.status === 'Delivered' ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : donation.status === 'Picked Up' ? (
                    <Package className="h-5 w-5 text-primary" />
                  ) : (
                    <Clock className="h-5 w-5 text-warning" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{donation.item}</p>
                  <p className="text-sm text-muted-foreground">{donation.quantity} • {donation.time}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  donation.status === 'Delivered' ? 'bg-success/10 text-success' :
                  donation.status === 'Picked Up' ? 'bg-primary/10 text-primary' : 'bg-warning/10 text-warning'
                }`}>
                  {donation.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DonorDashboard;

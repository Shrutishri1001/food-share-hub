import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Truck, Clock, CheckCircle2, Navigation, 
  Package, MapPin, Car, Calendar
} from 'lucide-react';

const VolunteerDashboard: React.FC = () => {
  const { user } = useAuth();

  const pendingPickups = [
    { 
      id: 1, 
      donor: 'Fresh Bites Restaurant', 
      recipient: 'Hope Shelter',
      item: '50 portions of Cooked Meals', 
      pickupAddress: '123 Main Street',
      dropAddress: '456 Shelter Lane',
      distance: '5.2 km',
      urgency: 'high'
    },
    { 
      id: 2, 
      donor: 'Grand Hotel', 
      recipient: 'Community Kitchen',
      item: '30 pieces of Bread & Pastries', 
      pickupAddress: '789 Hotel Road',
      dropAddress: '101 Kitchen Street',
      distance: '3.8 km',
      urgency: 'medium'
    },
  ];

  const completedPickups = [
    { id: 1, route: 'City Canteen → NGO Center', date: 'Today, 2:30 PM', items: '25 portions' },
    { id: 2, route: 'Spice Garden → Hope Shelter', date: 'Yesterday', items: '40 portions' },
    { id: 3, route: 'Fresh Mart → Community Kitchen', date: '2 days ago', items: '15 kg vegetables' },
  ];

  return (
    <DashboardLayout title="Volunteer Dashboard">
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-success rounded-2xl p-6 lg:p-8 text-primary-foreground">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Welcome, {user?.fullName}!</h2>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-primary-foreground/80">
                <span className="flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  {user?.vehicleType}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {user?.availability}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {user?.preferredPickupRadius} radius
                </span>
              </div>
            </div>
            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2">
              <Navigation className="h-5 w-5" />
              Start Navigation
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <div className="bg-card rounded-xl border border-border p-6 shadow-elegant">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Pickups</p>
                <p className="text-2xl font-bold text-foreground">127</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 shadow-elegant">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <Package className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Meals Delivered</p>
                <p className="text-2xl font-bold text-foreground">3,400+</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 shadow-elegant">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Distance Covered</p>
                <p className="text-2xl font-bold text-foreground">450 km</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Pickups */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Pending Pickups</h3>
            <p className="text-sm text-muted-foreground mt-1">Accept and complete pickup requests</p>
          </div>
          <div className="divide-y divide-border">
            {pendingPickups.map((pickup) => (
              <div key={pickup.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className={`mt-1 w-2 h-2 rounded-full ${
                        pickup.urgency === 'high' ? 'bg-destructive' : 'bg-warning'
                      }`} />
                      <div>
                        <p className="font-medium text-foreground">{pickup.item}</p>
                        <p className="text-sm text-muted-foreground">
                          {pickup.donor} → {pickup.recipient}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-5 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="truncate">Pickup: {pickup.pickupAddress}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-success" />
                        <span className="truncate">Drop: {pickup.dropAddress}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 ml-5 lg:ml-0">
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {pickup.distance}
                    </span>
                    <Button size="sm" className="gradient-primary">
                      Accept
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed History */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Completed Pickups</h3>
            <Button variant="ghost" size="sm" className="text-primary">View All</Button>
          </div>
          <div className="divide-y divide-border">
            {completedPickups.map((pickup) => (
              <div key={pickup.id} className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors">
                <div className="p-2 rounded-lg bg-success/10">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{pickup.route}</p>
                  <p className="text-sm text-muted-foreground">{pickup.items}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                    <Calendar className="h-3 w-3" />
                    {pickup.date}
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

export default VolunteerDashboard;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import VolunteerLayout from '@/components/VolunteerLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useVolunteer } from '@/contexts/VolunteerContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Package, Clock, CheckCircle2, TrendingUp,
  MapPin, AlertTriangle, Info, Utensils, Phone, Navigation
} from 'lucide-react';

const VolunteerHome: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { 
    isOnline, 
    setIsOnline, 
    activePickup, 
    stats,
    confirmPickup 
  } = useVolunteer();

  const firstName = user?.fullName?.split(' ')[0] || 'Volunteer';

  return (
    <VolunteerLayout 
      title={`Welcome back, ${firstName}!`}
      subtitle="Here's your volunteer dashboard overview"
    >
      <div className="space-y-6 animate-fade-in">
        {/* Status Toggle */}
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${isOnline ? 'bg-success' : 'bg-muted-foreground'}`} />
              <div>
                <p className="font-medium text-foreground">Volunteer Status</p>
                <p className="text-sm text-muted-foreground">
                  {isOnline ? 'You are available for pickups' : 'You are currently offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${isOnline ? 'text-primary' : 'text-muted-foreground'}`}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
              <Switch 
                checked={isOnline} 
                onCheckedChange={setIsOnline}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border-2 border-primary/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary font-medium">Active Pickup</p>
                <p className="text-3xl font-bold text-primary">{stats.activePickupCount}</p>
                <p className="text-xs text-muted-foreground">In progress</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl border-2 border-accent/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-accent font-medium">Pending Assignments</p>
                <p className="text-3xl font-bold text-accent">{stats.pendingAssignmentsCount}</p>
                <p className="text-xs text-muted-foreground">Awaiting response</p>
              </div>
              <div className="p-3 rounded-lg bg-accent/10">
                <Clock className="h-6 w-6 text-accent" />
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl border-2 border-success/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-success font-medium">Completed Today</p>
                <p className="text-3xl font-bold text-success">{stats.completedTodayCount}</p>
                <p className="text-xs text-muted-foreground">Great work!</p>
              </div>
              <div className="p-3 rounded-lg bg-success/10">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl border-2 border-accent/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-accent font-medium">Total Completed</p>
                <p className="text-3xl font-bold text-accent">{stats.totalCompletedCount}</p>
                <p className="text-xs text-muted-foreground">All time</p>
              </div>
              <div className="p-3 rounded-lg bg-accent/10">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Pickup Preview */}
        {activePickup && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Your Active Pickup</h2>
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{activePickup.donorName}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-4 w-4" />
                    {activePickup.address}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-medium border border-primary text-primary bg-primary/5">
                  <Clock className="h-3 w-3 inline mr-1" />
                  Accepted
                </span>
              </div>

              {/* Deadline Alert */}
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-medium text-accent">Pickup Deadline: {activePickup.pickupDeadline}</p>
                    <p className="text-sm text-accent/80">Please arrive before the deadline to ensure food quality</p>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-primary">Pickup Instructions</p>
                    <p className="text-sm text-foreground mt-1">{activePickup.pickupInstructions}</p>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-3">
                  <Utensils className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Food Type</p>
                    <p className="font-medium text-foreground">{activePickup.foodType}</p>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-3">
                  <Package className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Quantity</p>
                    <p className="font-medium text-foreground">{activePickup.quantity}</p>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Contact</p>
                    <p className="font-medium text-foreground">{activePickup.contact}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-xs text-muted-foreground mb-1">Description</p>
                <p className="text-foreground">{activePickup.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-2">
                <Button 
                  variant="outline" 
                  className="flex-1 border-primary text-primary hover:bg-primary/5"
                  onClick={() => navigate('/volunteer/active')}
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  View Route
                </Button>
                <Button 
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={() => confirmPickup(activePickup.id)}
                >
                  Confirm Pickup
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => navigate('/volunteer/assignments')}
            className="bg-card rounded-xl border border-border p-6 flex items-center gap-4 hover:border-primary/50 transition-colors text-left"
          >
            <div className="p-3 rounded-lg bg-accent/10">
              <Clock className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="font-semibold text-foreground">View Pending Assignments</p>
              <p className="text-sm text-muted-foreground">{stats.pendingAssignmentsCount} assignments waiting</p>
            </div>
          </button>
          
          <button 
            onClick={() => navigate('/volunteer/availability')}
            className="bg-card rounded-xl border border-border p-6 flex items-center gap-4 hover:border-primary/50 transition-colors text-left"
          >
            <div className="p-3 rounded-lg bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Manage Availability</p>
              <p className="text-sm text-muted-foreground">Update your schedule</p>
            </div>
          </button>
        </div>
      </div>
    </VolunteerLayout>
  );
};

export default VolunteerHome;

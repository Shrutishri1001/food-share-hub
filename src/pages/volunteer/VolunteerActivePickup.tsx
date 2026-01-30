import React from 'react';
import { useNavigate } from 'react-router-dom';
import VolunteerLayout from '@/components/VolunteerLayout';
import { useVolunteer } from '@/contexts/VolunteerContext';
import { Button } from '@/components/ui/button';
import { 
  MapPin, Phone, Utensils, Package, Clock,
  AlertTriangle, Info, Navigation
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const VolunteerActivePickup: React.FC = () => {
  const navigate = useNavigate();
  const { activePickup, confirmPickup, completeDelivery } = useVolunteer();

  const handleConfirmPickup = () => {
    if (activePickup) {
      confirmPickup(activePickup.id);
      toast({
        title: 'Pickup confirmed',
        description: 'Food has been picked up. Now deliver to the recipient.',
      });
    }
  };

  const handleCompleteDelivery = () => {
    if (activePickup) {
      completeDelivery(activePickup.id);
      toast({
        title: 'Delivery completed!',
        description: 'Great job! The delivery has been marked as complete.',
      });
      navigate('/volunteer/completed');
    }
  };

  if (!activePickup) {
    return (
      <VolunteerLayout 
        title="Active Pickup"
        subtitle="No active pickup"
      >
        <div className="bg-card rounded-xl border border-border p-12 text-center animate-fade-in">
          <Navigation className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No active pickup</h3>
          <p className="text-muted-foreground mb-4">Accept an assignment to start a pickup.</p>
          <Button onClick={() => navigate('/volunteer/assignments')} className="bg-primary hover:bg-primary/90">
            View Assignments
          </Button>
        </div>
      </VolunteerLayout>
    );
  }

  return (
    <VolunteerLayout 
      title="Active Pickup"
      subtitle={`Picking up from ${activePickup.donorName}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
        {/* Pickup Details */}
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
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-3">
              <Utensils className="h-5 w-5 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Food Type</p>
                <p className="font-medium text-foreground text-sm">{activePickup.foodType}</p>
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-3">
              <Package className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Quantity</p>
                <p className="font-medium text-foreground text-sm">{activePickup.quantity}</p>
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Contact</p>
                <p className="font-medium text-foreground text-sm">{activePickup.contact}</p>
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
            >
              <Navigation className="h-4 w-4 mr-2" />
              View Route
            </Button>
            {activePickup.status === 'accepted' ? (
              <Button 
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={handleConfirmPickup}
              >
                Confirm Pickup
              </Button>
            ) : (
              <Button 
                className="flex-1 bg-success hover:bg-success/90"
                onClick={handleCompleteDelivery}
              >
                Complete Delivery
              </Button>
            )}
          </div>
        </div>

        {/* Route Preview Placeholder */}
        <div className="bg-card rounded-xl border border-border p-6 flex flex-col items-center justify-center min-h-[400px]">
          <div className="p-4 rounded-full bg-primary/10 mb-4">
            <Navigation className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Route Preview</h3>
          <p className="text-muted-foreground text-center max-w-sm">
            Click "View Route" to see navigation details and estimated arrival time.
          </p>
        </div>
      </div>
    </VolunteerLayout>
  );
};

export default VolunteerActivePickup;

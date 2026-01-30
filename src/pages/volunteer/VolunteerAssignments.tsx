import React from 'react';
import VolunteerLayout from '@/components/VolunteerLayout';
import { useVolunteer } from '@/contexts/VolunteerContext';
import { Button } from '@/components/ui/button';
import { 
  MapPin, Phone, Utensils, Package, Clock
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const VolunteerAssignments: React.FC = () => {
  const { pendingAssignments, acceptPickup, declinePickup } = useVolunteer();

  const handleAccept = (pickupId: string, donorName: string) => {
    acceptPickup(pickupId);
    toast({
      title: 'Pickup accepted',
      description: `You have accepted the pickup from ${donorName}.`,
    });
  };

  const handleDecline = (pickupId: string, donorName: string) => {
    declinePickup(pickupId);
    toast({
      title: 'Pickup declined',
      description: `You have declined the pickup from ${donorName}.`,
    });
  };

  return (
    <VolunteerLayout 
      title="Pickup Assignments"
      subtitle={`${pendingAssignments.length} pending assignments`}
    >
      <div className="space-y-6 animate-fade-in">
        {pendingAssignments.length === 0 ? (
          <div className="bg-card rounded-xl border border-border p-12 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No pending assignments</h3>
            <p className="text-muted-foreground">Check back later for new pickup opportunities.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pendingAssignments.map((pickup) => (
              <div key={pickup.id} className="bg-card rounded-xl border border-border p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{pickup.donorName}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-4 w-4" />
                      {pickup.area}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-medium border border-accent text-accent bg-accent/5">
                    <Clock className="h-3 w-3 inline mr-1" />
                    Pending
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Contact</p>
                      <p className="font-medium text-foreground text-sm">{pickup.contact}</p>
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-3">
                    <Utensils className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-xs text-muted-foreground">Food Type</p>
                      <p className="font-medium text-foreground text-sm">{pickup.foodType}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-3">
                    <Package className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Quantity</p>
                      <p className="font-medium text-foreground text-sm">{pickup.quantity}</p>
                    </div>
                  </div>
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-accent" />
                      <div>
                        <p className="text-xs text-accent">Pickup Deadline</p>
                        <p className="font-medium text-accent text-sm">{pickup.pickupDeadline}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Description</p>
                  <p className="text-sm text-foreground">{pickup.description}</p>
                </div>

                {/* Address */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <p className="text-xs text-primary mb-1">Pickup Address</p>
                  <p className="text-sm text-foreground">{pickup.address}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-2">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-destructive text-destructive hover:bg-destructive/5"
                    onClick={() => handleDecline(pickup.id, pickup.donorName)}
                  >
                    Decline Pickup
                  </Button>
                  <Button 
                    className="flex-1 bg-primary hover:bg-primary/90"
                    onClick={() => handleAccept(pickup.id, pickup.donorName)}
                  >
                    Accept Pickup
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </VolunteerLayout>
  );
};

export default VolunteerAssignments;

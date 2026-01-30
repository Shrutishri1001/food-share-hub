import React from 'react';
import VolunteerLayout from '@/components/VolunteerLayout';
import { useVolunteer } from '@/contexts/VolunteerContext';
import { 
  MapPin, Package, Calendar, CheckCircle2
} from 'lucide-react';

const VolunteerCompleted: React.FC = () => {
  const { completedPickups } = useVolunteer();

  return (
    <VolunteerLayout 
      title="Completed Pickups"
      subtitle={`${completedPickups.length} pickups completed`}
    >
      <div className="space-y-6 animate-fade-in">
        {completedPickups.length === 0 ? (
          <div className="bg-card rounded-xl border border-border p-12 text-center">
            <CheckCircle2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No completed pickups yet</h3>
            <p className="text-muted-foreground">Your completed pickups will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {completedPickups.map((pickup) => (
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
                  <span className="px-3 py-1 rounded-full text-sm font-medium border border-success text-success bg-success/5">
                    <CheckCircle2 className="h-3 w-3 inline mr-1" />
                    Completed
                  </span>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-3">
                    <Package className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Food Items</p>
                      <p className="font-medium text-foreground">{pickup.quantity}</p>
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Type</p>
                      <p className="font-medium text-foreground">{pickup.foodType}</p>
                    </div>
                  </div>
                </div>

                {/* Completion Status */}
                <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-medium text-success">Pickup Completed</p>
                      <p className="text-sm text-success/80">Completed at: {pickup.completedAt}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </VolunteerLayout>
  );
};

export default VolunteerCompleted;

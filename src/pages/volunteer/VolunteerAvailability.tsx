import React from 'react';
import VolunteerLayout from '@/components/VolunteerLayout';
import { useVolunteer } from '@/contexts/VolunteerContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Clock, MapPin, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const VolunteerAvailability: React.FC = () => {
  const { isOnline, setIsOnline, timeSlots, toggleTimeSlot, locationPreference } = useVolunteer();

  const handleSaveAvailability = () => {
    toast({
      title: 'Availability saved',
      description: 'Your availability preferences have been updated.',
    });
  };

  return (
    <VolunteerLayout 
      title="Availability Management"
      subtitle="Manage your online status and working hours"
    >
      <div className="space-y-6 animate-fade-in max-w-3xl">
        {/* Status Toggle */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Availability Status</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${isOnline ? 'bg-success' : 'bg-muted-foreground'}`} />
              <div>
                <p className="font-medium text-foreground">Currently {isOnline ? 'Online' : 'Offline'}</p>
                <p className="text-sm text-muted-foreground">
                  {isOnline ? 'You can receive pickup assignments' : 'You will not receive new assignments'}
                </p>
              </div>
            </div>
            <Switch 
              checked={isOnline} 
              onCheckedChange={setIsOnline}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>

        {/* Time Slots */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-foreground" />
            <h3 className="font-semibold text-foreground">Available Time Slots</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Select your preferred working hours</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => toggleTimeSlot(slot.id)}
                className={`
                  relative p-4 rounded-lg border-2 transition-all text-center
                  ${slot.selected 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-border bg-card hover:border-muted-foreground text-foreground'
                  }
                `}
              >
                {slot.label}
                {slot.selected && (
                  <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                )}
              </button>
            ))}
          </div>
          
          <Button onClick={handleSaveAvailability} className="bg-primary hover:bg-primary/90">
            Save Availability
          </Button>
        </div>

        {/* Location Preference */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-foreground" />
            <h3 className="font-semibold text-foreground">Location Preference</h3>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Your preferred area</p>
            <p className="font-medium text-foreground">{locationPreference}</p>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            Contact support to update your location preference
          </p>
        </div>
      </div>
    </VolunteerLayout>
  );
};

export default VolunteerAvailability;

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type PickupStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'declined';

export interface Pickup {
  id: string;
  donorName: string;
  address: string;
  area: string;
  foodType: string;
  quantity: string;
  contact: string;
  description: string;
  pickupDeadline: string;
  pickupInstructions: string;
  status: PickupStatus;
  completedAt?: string;
}

export interface TimeSlot {
  id: string;
  label: string;
  selected: boolean;
}

interface VolunteerContextType {
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;
  activePickup: Pickup | null;
  pendingAssignments: Pickup[];
  completedPickups: Pickup[];
  timeSlots: TimeSlot[];
  locationPreference: string;
  acceptPickup: (pickupId: string) => void;
  declinePickup: (pickupId: string) => void;
  confirmPickup: (pickupId: string) => void;
  completeDelivery: (pickupId: string) => void;
  toggleTimeSlot: (slotId: string) => void;
  stats: {
    activePickupCount: number;
    pendingAssignmentsCount: number;
    completedTodayCount: number;
    totalCompletedCount: number;
  };
}

const VolunteerContext = createContext<VolunteerContextType | undefined>(undefined);

const initialTimeSlots: TimeSlot[] = [
  { id: '1', label: '06:00 - 09:00', selected: false },
  { id: '2', label: '09:00 - 12:00', selected: true },
  { id: '3', label: '12:00 - 15:00', selected: false },
  { id: '4', label: '15:00 - 18:00', selected: false },
  { id: '5', label: '18:00 - 21:00', selected: false },
];

const mockPendingAssignments: Pickup[] = [
  {
    id: '1',
    donorName: 'Green Garden Restaurant',
    address: '123 Main Street, Downtown District',
    area: 'Downtown',
    foodType: 'Prepared Meals',
    quantity: '15 portions',
    contact: '+1 (555) 234-5678',
    description: 'Fresh vegetarian meals - pasta, salads, and bread',
    pickupDeadline: '2:30 PM Today',
    pickupInstructions: 'Park in designated volunteer spot. Contact Lisa at the front desk.',
    status: 'pending',
  },
  {
    id: '2',
    donorName: 'Fresh Bakery Co.',
    address: '456 Baker Lane, Midtown Plaza',
    area: 'Midtown',
    foodType: 'Bakery Items',
    quantity: '30 items',
    contact: '+1 (555) 345-6789',
    description: 'Assorted bread, pastries, and muffins from today',
    pickupDeadline: '4:00 PM Today',
    pickupInstructions: 'Use back entrance. Ask for Mike.',
    status: 'pending',
  },
];

const mockActivePickup: Pickup = {
  id: '3',
  donorName: 'Sunrise Cafe',
  address: '789 Sunrise Blvd, East District',
  area: 'East District',
  foodType: 'Mixed Food',
  quantity: '20 portions',
  contact: '+1 (555) 456-7890',
  description: 'Sandwiches, soups, and fruit bowls',
  pickupDeadline: '3:00 PM Today',
  pickupInstructions: 'Park in designated volunteer spot. Contact Lisa at the front desk.',
  status: 'accepted',
};

const mockCompletedPickups: Pickup[] = [
  {
    id: '4',
    donorName: 'Community Kitchen',
    address: '321 West End Ave',
    area: 'West End',
    foodType: 'Hot Meals',
    quantity: '25 portions',
    contact: '+1 (555) 567-8901',
    description: 'Cooked lunch meals',
    pickupDeadline: '',
    pickupInstructions: '',
    status: 'completed',
    completedAt: '11:45 AM',
  },
];

export const VolunteerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [activePickup, setActivePickup] = useState<Pickup | null>(mockActivePickup);
  const [pendingAssignments, setPendingAssignments] = useState<Pickup[]>(mockPendingAssignments);
  const [completedPickups, setCompletedPickups] = useState<Pickup[]>(mockCompletedPickups);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(initialTimeSlots);
  const [locationPreference] = useState('Downtown District, City Center (5 km radius)');

  const acceptPickup = useCallback((pickupId: string) => {
    const pickup = pendingAssignments.find(p => p.id === pickupId);
    if (pickup) {
      setActivePickup({ ...pickup, status: 'accepted' });
      setPendingAssignments(prev => prev.filter(p => p.id !== pickupId));
    }
  }, [pendingAssignments]);

  const declinePickup = useCallback((pickupId: string) => {
    setPendingAssignments(prev => prev.filter(p => p.id !== pickupId));
  }, []);

  const confirmPickup = useCallback((pickupId: string) => {
    if (activePickup && activePickup.id === pickupId) {
      setActivePickup({ ...activePickup, status: 'in_progress' });
    }
  }, [activePickup]);

  const completeDelivery = useCallback((pickupId: string) => {
    if (activePickup && activePickup.id === pickupId) {
      const completed: Pickup = {
        ...activePickup,
        status: 'completed',
        completedAt: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      };
      setCompletedPickups(prev => [completed, ...prev]);
      setActivePickup(null);
    }
  }, [activePickup]);

  const toggleTimeSlot = useCallback((slotId: string) => {
    setTimeSlots(prev =>
      prev.map(slot =>
        slot.id === slotId ? { ...slot, selected: !slot.selected } : slot
      )
    );
  }, []);

  const stats = {
    activePickupCount: activePickup ? 1 : 0,
    pendingAssignmentsCount: pendingAssignments.length,
    completedTodayCount: 1,
    totalCompletedCount: 24,
  };

  return (
    <VolunteerContext.Provider
      value={{
        isOnline,
        setIsOnline,
        activePickup,
        pendingAssignments,
        completedPickups,
        timeSlots,
        locationPreference,
        acceptPickup,
        declinePickup,
        confirmPickup,
        completeDelivery,
        toggleTimeSlot,
        stats,
      }}
    >
      {children}
    </VolunteerContext.Provider>
  );
};

export const useVolunteer = () => {
  const context = useContext(VolunteerContext);
  if (context === undefined) {
    throw new Error('useVolunteer must be used within a VolunteerProvider');
  }
  return context;
};

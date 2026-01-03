import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';
import AuthInput from '@/components/ui/AuthInput';
import AuthSelect from '@/components/ui/AuthSelect';
import AuthCheckbox from '@/components/ui/AuthCheckbox';
import { Button } from '@/components/ui/button';
import { 
  User, Mail, Lock, Phone, MapPin, Building2, 
  ArrowRight, Loader2, ArrowLeft, Car, Clock, Target, Warehouse, Users
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type RegistrationRole = Exclude<UserRole, 'admin'>;

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    role: '' as RegistrationRole | '',
    // Donor fields
    donorOrgName: '',
    donorOrgType: '',
    foodSafetyLicenseId: '',
    hygieneDeclaration: false,
    // Consumer fields
    consumerOrgName: '',
    consumerOrgType: '',
    dailyIntakeCapacity: '',
    storageFacility: '',
    // Volunteer fields
    vehicleType: '',
    availability: '',
    preferredPickupRadius: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { register, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      const dashboardPaths: Record<UserRole, string> = {
        admin: '/admin',
        donor: '/donor',
        consumer: '/consumer',
        volunteer: '/volunteer',
      };
      navigate(dashboardPaths[user.role]);
    }
  }, [isAuthenticated, user, navigate]);

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.role) newErrors.role = 'Please select a role';

    // Role-specific validation
    if (formData.role === 'donor') {
      if (!formData.donorOrgName) newErrors.donorOrgName = 'Organization name is required';
      if (!formData.donorOrgType) newErrors.donorOrgType = 'Organization type is required';
      if (!formData.foodSafetyLicenseId) newErrors.foodSafetyLicenseId = 'Food safety license ID is required';
      if (!formData.hygieneDeclaration) newErrors.hygieneDeclaration = 'You must agree to the hygiene declaration';
    }
    
    if (formData.role === 'consumer') {
      if (!formData.consumerOrgName) newErrors.consumerOrgName = 'Organization name is required';
      if (!formData.consumerOrgType) newErrors.consumerOrgType = 'Organization type is required';
      if (!formData.dailyIntakeCapacity) newErrors.dailyIntakeCapacity = 'Daily intake capacity is required';
      if (!formData.storageFacility) newErrors.storageFacility = 'Please specify storage facility availability';
    }
    
    if (formData.role === 'volunteer') {
      if (!formData.vehicleType) newErrors.vehicleType = 'Vehicle type is required';
      if (!formData.availability) newErrors.availability = 'Availability is required';
      if (!formData.preferredPickupRadius) newErrors.preferredPickupRadius = 'Preferred pickup radius is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields correctly.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        location: formData.location,
        role: formData.role as UserRole,
        ...(formData.role === 'donor' && {
          organizationName: formData.donorOrgName,
          organizationType: formData.donorOrgType,
          foodSafetyLicenseId: formData.foodSafetyLicenseId,
          hygieneDeclaration: formData.hygieneDeclaration,
        }),
        ...(formData.role === 'consumer' && {
          organizationName: formData.consumerOrgName,
          organizationType: formData.consumerOrgType,
          dailyIntakeCapacity: parseInt(formData.dailyIntakeCapacity),
          storageFacility: formData.storageFacility === 'yes',
        }),
        ...(formData.role === 'volunteer' && {
          vehicleType: formData.vehicleType,
          availability: formData.availability,
          preferredPickupRadius: formData.preferredPickupRadius,
        }),
      };
      
      const result = await register(userData);
      
      if (!result.success) {
        toast({
          title: 'Registration Failed',
          description: result.error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Welcome to FoodShare!',
          description: 'Your account has been created successfully.',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    { value: '', label: 'Select your role' },
    { value: 'donor', label: 'Donor (Restaurant/Hotel/Canteen)' },
    { value: 'consumer', label: 'Consumer (NGO/Shelter/Kitchen)' },
    { value: 'volunteer', label: 'Volunteer (Food Pickup/Delivery)' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background overflow-y-auto">
        <div className="w-full max-w-xl animate-slide-up py-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
          
          <div className="mb-6">
            <Logo size="md" />
          </div>
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground">Create Account</h2>
            <p className="text-muted-foreground mt-2">Join our community and start making a difference</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Common Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AuthInput
                label="Full Name"
                type="text"
                icon={User}
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                error={errors.fullName}
              />
              
              <AuthInput
                label="Email Address"
                type="email"
                icon={Mail}
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                error={errors.email}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AuthInput
                label="Password"
                type="password"
                icon={Lock}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                error={errors.password}
              />
              
              <AuthInput
                label="Confirm Password"
                type="password"
                icon={Lock}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => updateField('confirmPassword', e.target.value)}
                error={errors.confirmPassword}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AuthInput
                label="Phone Number"
                type="tel"
                icon={Phone}
                placeholder="+1 234 567 8900"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                error={errors.phone}
              />
              
              <AuthInput
                label="Location"
                type="text"
                icon={MapPin}
                placeholder="City, State"
                value={formData.location}
                onChange={(e) => updateField('location', e.target.value)}
                error={errors.location}
              />
            </div>
            
            <AuthSelect
              label="Select Your Role"
              icon={Users}
              options={roleOptions}
              value={formData.role}
              onChange={(e) => updateField('role', e.target.value)}
              error={errors.role}
            />
            
            {/* Role-Specific Fields */}
            {formData.role === 'donor' && (
              <div className="space-y-4 p-5 rounded-xl bg-muted/30 border border-border animate-scale-in">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Donor Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AuthInput
                    label="Organization Name"
                    type="text"
                    placeholder="Restaurant/Hotel Name"
                    value={formData.donorOrgName}
                    onChange={(e) => updateField('donorOrgName', e.target.value)}
                    error={errors.donorOrgName}
                  />
                  
                  <AuthSelect
                    label="Organization Type"
                    options={[
                      { value: '', label: 'Select type' },
                      { value: 'Restaurant', label: 'Restaurant' },
                      { value: 'Hostel', label: 'Hostel' },
                      { value: 'Event', label: 'Event Caterer' },
                      { value: 'Canteen', label: 'Canteen' },
                    ]}
                    value={formData.donorOrgType}
                    onChange={(e) => updateField('donorOrgType', e.target.value)}
                    error={errors.donorOrgType}
                  />
                </div>
                
                <AuthInput
                  label="Food Safety License ID"
                  type="text"
                  placeholder="FSL-XXXXX"
                  value={formData.foodSafetyLicenseId}
                  onChange={(e) => updateField('foodSafetyLicenseId', e.target.value)}
                  error={errors.foodSafetyLicenseId}
                />
                
                <AuthCheckbox
                  label="I declare that all food donated will meet hygiene and safety standards"
                  checked={formData.hygieneDeclaration}
                  onChange={(e) => updateField('hygieneDeclaration', e.target.checked)}
                  error={errors.hygieneDeclaration}
                />
              </div>
            )}
            
            {formData.role === 'consumer' && (
              <div className="space-y-4 p-5 rounded-xl bg-muted/30 border border-border animate-scale-in">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Organization Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AuthInput
                    label="Organization Name"
                    type="text"
                    placeholder="NGO/Shelter Name"
                    value={formData.consumerOrgName}
                    onChange={(e) => updateField('consumerOrgName', e.target.value)}
                    error={errors.consumerOrgName}
                  />
                  
                  <AuthSelect
                    label="Organization Type"
                    options={[
                      { value: '', label: 'Select type' },
                      { value: 'NGO', label: 'NGO' },
                      { value: 'Shelter', label: 'Shelter' },
                      { value: 'Community Kitchen', label: 'Community Kitchen' },
                    ]}
                    value={formData.consumerOrgType}
                    onChange={(e) => updateField('consumerOrgType', e.target.value)}
                    error={errors.consumerOrgType}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AuthInput
                    label="Daily Intake Capacity (meals)"
                    type="number"
                    icon={Users}
                    placeholder="100"
                    value={formData.dailyIntakeCapacity}
                    onChange={(e) => updateField('dailyIntakeCapacity', e.target.value)}
                    error={errors.dailyIntakeCapacity}
                  />
                  
                  <AuthSelect
                    label="Storage Facility Available?"
                    icon={Warehouse}
                    options={[
                      { value: '', label: 'Select option' },
                      { value: 'yes', label: 'Yes' },
                      { value: 'no', label: 'No' },
                    ]}
                    value={formData.storageFacility}
                    onChange={(e) => updateField('storageFacility', e.target.value)}
                    error={errors.storageFacility}
                  />
                </div>
              </div>
            )}
            
            {formData.role === 'volunteer' && (
              <div className="space-y-4 p-5 rounded-xl bg-muted/30 border border-border animate-scale-in">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  Volunteer Information
                </h3>
                
                <AuthSelect
                  label="Vehicle Type"
                  icon={Car}
                  options={[
                    { value: '', label: 'Select vehicle' },
                    { value: 'Bike', label: 'Bike/Scooter' },
                    { value: 'Car', label: 'Car' },
                    { value: 'Van', label: 'Van' },
                    { value: 'None', label: 'No Vehicle (Walking)' },
                  ]}
                  value={formData.vehicleType}
                  onChange={(e) => updateField('vehicleType', e.target.value)}
                  error={errors.vehicleType}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AuthSelect
                    label="Availability"
                    icon={Clock}
                    options={[
                      { value: '', label: 'Select time' },
                      { value: 'Morning', label: 'Morning (6AM - 12PM)' },
                      { value: 'Afternoon', label: 'Afternoon (12PM - 6PM)' },
                      { value: 'Evening', label: 'Evening (6PM - 10PM)' },
                    ]}
                    value={formData.availability}
                    onChange={(e) => updateField('availability', e.target.value)}
                    error={errors.availability}
                  />
                  
                  <AuthSelect
                    label="Preferred Pickup Radius"
                    icon={Target}
                    options={[
                      { value: '', label: 'Select radius' },
                      { value: '5km', label: '5 km' },
                      { value: '10km', label: '10 km' },
                      { value: '15km', label: '15 km' },
                      { value: '20km', label: '20+ km' },
                    ]}
                    value={formData.preferredPickupRadius}
                    onChange={(e) => updateField('preferredPickupRadius', e.target.value)}
                    error={errors.preferredPickupRadius}
                  />
                </div>
              </div>
            )}
            
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold gradient-primary hover:opacity-90 transition-opacity"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link 
                to="/" 
                className="text-primary font-semibold hover:underline transition-all"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* Right Panel - Decorative */}
      <div className="hidden lg:flex lg:w-5/12 gradient-hero p-12 flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0tNiA2aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        
        <div className="relative z-10 space-y-8">
          <h2 className="text-4xl font-bold text-primary-foreground leading-tight">
            Join Our<br />
            Growing Community
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-primary-foreground/10 p-4 rounded-xl backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-primary-foreground/20">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-semibold text-primary-foreground">For Donors</h4>
                <p className="text-primary-foreground/70 text-sm">Share surplus food and reduce waste while helping those in need</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-primary-foreground/10 p-4 rounded-xl backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-primary-foreground/20">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-semibold text-primary-foreground">For NGOs & Shelters</h4>
                <p className="text-primary-foreground/70 text-sm">Access quality food donations to serve your community</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-primary-foreground/10 p-4 rounded-xl backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-primary-foreground/20">
                <Car className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-semibold text-primary-foreground">For Volunteers</h4>
                <p className="text-primary-foreground/70 text-sm">Help transport food and connect donors with recipients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

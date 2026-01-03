import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, LucideIcon } from 'lucide-react';

interface AuthSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
  options: { value: string; label: string }[];
}

const AuthSelect = forwardRef<HTMLSelectElement, AuthSelectProps>(
  ({ label, icon: Icon, error, options, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          {label}
        </label>
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
          )}
          <select
            ref={ref}
            className={cn(
              "w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground appearance-none cursor-pointer",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
              "transition-all duration-200",
              Icon && "pl-11",
              error && "border-destructive focus:ring-destructive/20 focus:border-destructive",
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
        </div>
        {error && (
          <p className="text-sm text-destructive animate-fade-in">{error}</p>
        )}
      </div>
    );
  }
);

AuthSelect.displayName = 'AuthSelect';

export default AuthSelect;

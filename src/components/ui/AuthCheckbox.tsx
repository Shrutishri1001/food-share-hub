import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface AuthCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
}

const AuthCheckbox = forwardRef<HTMLInputElement, AuthCheckboxProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              ref={ref}
              type="checkbox"
              className={cn(
                "peer sr-only",
                className
              )}
              {...props}
            />
            <div className={cn(
              "w-5 h-5 rounded border-2 border-input bg-card",
              "flex items-center justify-center",
              "transition-all duration-200",
              "peer-checked:bg-primary peer-checked:border-primary",
              "peer-focus:ring-2 peer-focus:ring-primary/20",
              "group-hover:border-primary/50",
              error && "border-destructive"
            )}>
              <Check className="w-3.5 h-3.5 text-primary-foreground opacity-0 peer-checked:opacity-100 transition-opacity" />
            </div>
          </div>
          <span className="text-sm text-foreground">{label}</span>
        </label>
        {error && (
          <p className="text-sm text-destructive animate-fade-in ml-8">{error}</p>
        )}
      </div>
    );
  }
);

AuthCheckbox.displayName = 'AuthCheckbox';

export default AuthCheckbox;

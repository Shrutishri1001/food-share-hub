import React from 'react';
import { Leaf, Heart } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const sizes = {
    sm: { icon: 20, text: 'text-lg' },
    md: { icon: 28, text: 'text-2xl' },
    lg: { icon: 40, text: 'text-4xl' },
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="gradient-primary p-2 rounded-xl">
          <Leaf className="text-primary-foreground" size={sizes[size].icon} />
        </div>
        <Heart 
          className="absolute -bottom-1 -right-1 text-accent fill-accent" 
          size={sizes[size].icon * 0.5} 
        />
      </div>
      {showText && (
        <div className={`font-bold ${sizes[size].text}`}>
          <span className="text-primary">Food</span>
          <span className="text-accent">Share</span>
        </div>
      )}
    </div>
  );
};

export default Logo;

import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = true
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        glass-panel rounded-2xl p-6 transition-all duration-300
        ${onClick ? 'cursor-pointer' : ''}
        ${hoverable ? 'hover:translate-y-[-4px] hover:shadow-lg hover:shadow-brand-blue/5 hover:border-brand-blue/20' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';

export interface TooltipProps {
  content: string | React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
  maxWidth?: string;
}

export default function Tooltip({ 
  content, 
  children, 
  position = 'top',
  delay = 500,
  className = '',
  maxWidth = '280px'
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [actualPosition, setActualPosition] = useState(position);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  // Handle mouse enter with delay
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      adjustPosition();
    }, delay);
  };

  // Handle mouse leave - immediate hide
  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  // Handle keyboard focus
  const handleFocus = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      adjustPosition();
    }, delay);
  };

  // Handle keyboard blur
  const handleBlur = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  // Adjust tooltip position if it goes off-screen
  const adjustPosition = () => {
    if (!tooltipRef.current || !triggerRef.current) return;

    const tooltip = tooltipRef.current;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    const tooltipRect = tooltip.getBoundingClientRect();

    let newPosition = position;

    // Check horizontal boundaries
    if (position === 'right' && tooltipRect.right > viewportWidth - 10) {
      newPosition = 'left';
    } else if (position === 'left' && tooltipRect.left < 10) {
      newPosition = 'right';
    }

    // Check vertical boundaries
    if (position === 'top' && tooltipRect.top < 10) {
      newPosition = 'bottom';
    } else if (position === 'bottom' && tooltipRect.bottom > viewportHeight - 10) {
      newPosition = 'top';
    }

    setActualPosition(newPosition);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Position classes
  const getPositionClasses = () => {
    const baseClasses = 'absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg opacity-0 invisible transition-all duration-200';
    
    if (isVisible) {
      const visibleClasses = baseClasses.replace('opacity-0 invisible', 'opacity-100 visible');
      
      switch (actualPosition) {
        case 'top':
          return `${visibleClasses} bottom-full left-1/2 transform -translate-x-1/2 mb-2`;
        case 'bottom':
          return `${visibleClasses} top-full left-1/2 transform -translate-x-1/2 mt-2`;
        case 'left':
          return `${visibleClasses} right-full top-1/2 transform -translate-y-1/2 mr-2`;
        case 'right':
          return `${visibleClasses} left-full top-1/2 transform -translate-y-1/2 ml-2`;
        default:
          return `${visibleClasses} bottom-full left-1/2 transform -translate-x-1/2 mb-2`;
      }
    }
    
    return baseClasses + ' bottom-full left-1/2 transform -translate-x-1/2 mb-2';
  };

  // Arrow classes
  const getArrowClasses = () => {
    const baseArrow = 'absolute w-2 h-2 bg-gray-900 transform rotate-45';
    
    if (!isVisible) return baseArrow + ' opacity-0';
    
    switch (actualPosition) {
      case 'top':
        return `${baseArrow} top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2`;
      case 'bottom':
        return `${baseArrow} bottom-full left-1/2 transform -translate-x-1/2 translate-y-1/2`;
      case 'left':
        return `${baseArrow} left-full top-1/2 transform -translate-x-1/2 -translate-y-1/2`;
      case 'right':
        return `${baseArrow} right-full top-1/2 transform translate-x-1/2 -translate-y-1/2`;
      default:
        return `${baseArrow} top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2`;
    }
  };

  return (
    <div 
      ref={triggerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}
      
      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className={getPositionClasses()}
        style={{ maxWidth }}
        role="tooltip"
        aria-hidden={!isVisible}
      >
        {content}
        <div className={getArrowClasses()} />
      </div>
    </div>
  );
}

// Specialized tooltip for difficulty levels
export function DifficultyTooltip({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const content = (
    <div className="text-center">
      <div className="font-semibold mb-1">Difficulty Algorithm</div>
      <div className="text-xs space-y-1">
        <div>Time (1-3) + Skills (1-3) + Ingredients (1-3)</div>
        <div className="mt-2 space-y-0.5">
          <div><strong>Easy:</strong> 3-5 points</div>
          <div><strong>Medium:</strong> 6-7 points</div>
          <div><strong>Hard:</strong> 8-9 points</div>
        </div>
      </div>
    </div>
  );

  return (
    <Tooltip content={content} position="top" maxWidth="200px" className={className}>
      {children}
    </Tooltip>
  );
}

// Specialized tooltip for time information
export function TimeTooltip({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <Tooltip 
      content="Total time includes both prep and cooking time" 
      position="top" 
      className={className}
    >
      {children}
    </Tooltip>
  );
}

// Specialized tooltip for servings
export function ServingsTooltip({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <Tooltip 
      content="Number of wrestler-sized portions (typically larger than standard servings)" 
      position="top" 
      className={className}
    >
      {children}
    </Tooltip>
  );
}

// Specialized tooltip for nutrition highlights
export function NutritionTooltip({ children, nutritionType, className = '' }: { 
  children: React.ReactNode, 
  nutritionType: 'protein' | 'carbohydrates' | 'calories',
  className?: string 
}) {
  const getContent = () => {
    switch (nutritionType) {
      case 'protein':
        return 'High protein content supports muscle repair and growth after training';
      case 'carbohydrates':
        return 'Carbohydrates provide energy for training and competition';
      case 'calories':
        return 'Total calories to help meet wrestler\'s energy needs';
      default:
        return 'Nutritional information for optimal wrestling performance';
    }
  };

  return (
    <Tooltip 
      content={getContent()} 
      position="top" 
      className={className}
    >
      {children}
    </Tooltip>
  );
}

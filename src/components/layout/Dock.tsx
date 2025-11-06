
'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Children, cloneElement, useEffect, useRef, useState, isValidElement } from 'react';
import './Dock.css';
import { cn } from '@/lib/utils';

function DockItem({ children, className = '', onClick, onLongPress, mouseX, spring, distance, magnification, baseItemSize }) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);
  const pressTimeout = useRef<NodeJS.Timeout | null>(null);

  const handlePressStart = (e: React.MouseEvent | React.TouchEvent) => {
    // Prevent default context menu on long touch
    e.preventDefault();
    pressTimeout.current = setTimeout(() => {
      if (onLongPress) {
        onLongPress();
      }
      pressTimeout.current = null; // Reset after firing
    }, 1000); // 1 second for long press
  };

  const handlePressEnd = () => {
    if (pressTimeout.current) {
      clearTimeout(pressTimeout.current);
      pressTimeout.current = null;
      if (onClick) {
        onClick(); // It was a short click
      }
    }
  };

  const mouseDistance = useTransform(mouseX, val => {
    if (val === Infinity) return Infinity;
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize
    };
    return val - rect.x - rect.width / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      className={cn("dock-item", className)}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, child => {
        if (isValidElement(child)) {
          return cloneElement(child as React.ReactElement<any>, { isHovered });
        }
        return child;
      })}
    </motion.div>
  );
}

function DockLabel({ children, className = '', isHovered }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', latest => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);


  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30, duration: 0.2 }}
          className={cn("dock-label", className)}
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = '' }) {
  return <div className={cn("dock-icon", className)}>{children}</div>;
}

type DockItemProps = {
  id?: string;
  icon: React.ReactNode;
  label?: string;
  onClick?: () => void;
  onLongPress?: () => void;
  className?: string;
  isSeparator?: boolean;
  isComponent?: boolean;
};

export function Dock({
  items,
  className = '',
}) {
  const mouseX = useMotionValue(Infinity);

  const baseItemSize = 48; 
  const magnification = 64; 
  const distance = 120;
  const spring = { stiffness: 500, damping: 30 };

  return (
    <div className="dock-outer">
      <motion.div
        onMouseMove={({ clientX }) => mouseX.set(clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        onTouchStart={e => mouseX.set(e.touches[0].clientX)}
        onTouchMove={e => mouseX.set(e.touches[0].clientX)}
        onTouchEnd={() => mouseX.set(Infinity)}
        onTouchCancel={() => mouseX.set(Infinity)}
        className={cn("dock-panel", className)}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item) => {
          if (item.isSeparator) {
            return <div key={item.id} className="dock-separator" />;
          }

          return (
            <DockItem
              key={item.id}
              onClick={item.onClick}
              onLongPress={item.onLongPress}
              className={item.className}
              mouseX={mouseX}
              spring={spring}
              distance={distance}
              magnification={magnification}
              baseItemSize={baseItemSize}
            >
              <DockIcon>{item.icon}</DockIcon>
              {!item.isComponent && <DockLabel isHovered={useMotionValue(0)}>{item.label}</DockLabel>}
            </DockItem>
          );
        })}
      </motion.div>
    </div>
  );
}

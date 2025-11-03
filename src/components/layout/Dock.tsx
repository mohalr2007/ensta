
'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Children, cloneElement, useEffect, useMemo, useRef, useState, isValidElement } from 'react';
import './Dock.css';
import { cn } from '@/lib/utils';

function DockItem({ children, className = '', onClick, mouseX, spring, distance, magnification, baseItemSize, isComponent }) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, val => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  const itemContent = useMemo(() => {
    if (isComponent) {
      // For components like LanguageSwitcher, just render them directly
      return children;
    }
    // For regular items, wrap them with label logic
    return Children.map(children, child => {
      if (isValidElement(child)) {
        return cloneElement(child as React.ReactElement<any>, { isHovered });
      }
      return child;
    });
  }, [children, isComponent, isHovered]);

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
      onClick={onClick}
      className={cn("dock-item", className)}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {itemContent}
    </motion.div>
  );
}

function DockLabel({ children, className = '', isHovered }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
  className?: string;
  isSeparator?: boolean;
  isComponent?: boolean;
};

export function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 60,
  distance = 150,
  baseItemSize = 44,
}) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="dock-outer">
      <motion.div
        onMouseMove={({ clientX }) => mouseX.set(clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn("dock-panel", className)}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => {
          if (item.isSeparator) {
            return <div key={`separator-${index}`} className="dock-separator" />;
          }
          return (
            <DockItem
              key={item.id || index}
              onClick={item.onClick}
              className={item.className}
              mouseX={mouseX}
              spring={spring}
              distance={distance}
              magnification={magnification}
              baseItemSize={baseItemSize}
              isComponent={item.isComponent}
            >
              {item.isComponent ? (
                <DockIcon>{item.icon}</DockIcon>
              ) : (
                <>
                  <DockIcon>{item.icon}</DockIcon>
                  <DockLabel isHovered={undefined}>{item.label}</DockLabel>
                </>
              )}
            </DockItem>
          );
        })}
      </motion.div>
    </div>
  );
}

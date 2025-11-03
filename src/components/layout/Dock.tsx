
'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Children, cloneElement, useEffect, useRef, useState, isValidElement } from 'react';
import './Dock.css';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

function DockItem({ children, className = '', onClick, mouseX, spring, distance, magnification, baseItemSize }) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

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
      onClick={onClick}
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
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile || !isHovered) return;
    const unsubscribe = isHovered.on('change', latest => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered, isMobile]);

  if (isMobile) return null;

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
}) {
  const isMobile = useIsMobile();
  const mouseX = useMotionValue(Infinity);

  const baseItemSize = isMobile ? 38 : 48;
  const magnification = isMobile ? 42 : 64;
  const distance = isMobile ? 80 : 120;
  const spring = { stiffness: 500, damping: 30 };

  return (
    <div className="dock-outer">
      <motion.div
        onMouseMove={({ clientX }) => !isMobile && mouseX.set(clientX)}
        onMouseLeave={() => !isMobile && mouseX.set(Infinity)}
        onTouchStart={e => {
            if (isMobile) {
                mouseX.set(e.touches[0].clientX);
            }
        }}
        onTouchMove={e => {
            if (isMobile) {
                mouseX.set(e.touches[0].clientX);
            }
        }}
        onTouchEnd={() => isMobile && mouseX.set(Infinity)}
        onTouchCancel={() => isMobile && mouseX.set(Infinity)}
        className={cn("dock-panel", className)}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item) => {
          if (item.isSeparator) {
            return <div key={item.id} className="dock-separator" />;
          }

          const isHovered = useMotionValue(0);

          return (
            <DockItem
              key={item.id}
              onClick={item.onClick}
              className={item.className}
              mouseX={mouseX}
              spring={spring}
              distance={distance}
              magnification={magnification}
              baseItemSize={baseItemSize}
            >
              <DockIcon>{item.icon}</DockIcon>
              {!item.isComponent && <DockLabel isHovered={isHovered}>{item.label}</DockLabel>}
            </DockItem>
          );
        })}
      </motion.div>
    </div>
  );
}

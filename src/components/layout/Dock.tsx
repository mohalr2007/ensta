
'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './Dock.css';

export function Dock({ items }: { items: { icon: React.ReactNode; label: string; onClick: () => void; }[] }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="dock-container">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="dock"
      >
        {items.map((item, i) => (
          <DockItem key={i} mouseX={mouseX} onClick={item.onClick}>
            <div className="dock-icon">{item.icon}</div>
            <div className="dock-label">{item.label}</div>
          </DockItem>
        ))}
      </motion.div>
    </div>
  );
}

function DockItem({ children, mouseX, onClick }: { children: React.ReactNode; mouseX: any, onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [48, 80, 48]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.button
      ref={ref}
      style={{ width }}
      className="dock-item"
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

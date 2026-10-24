'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlowingButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'gold' | 'forge' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function GlowingButton({
  variant = 'gold',
  size = 'md',
  children,
  icon,
  className = '',
  ...props
}: GlowingButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs font-semibold gap-1.5 rounded-lg',
    md: 'px-5 py-2.5 text-sm font-bold gap-2 rounded-xl min-h-[44px]',
    lg: 'px-7 py-3.5 text-base font-extrabold gap-2.5 rounded-2xl min-h-[52px]',
  }[size];

  const variantClasses = {
    gold: 'bg-gradient-to-r from-[#E6B84A] via-[#F5C75D] to-[#E6B84A] text-[#0A0A0C] shadow-lg shadow-[#E6B84A]/25 hover:shadow-[#E6B84A]/40 active:brightness-95',
    forge:
      'bg-[#18181E] text-[#FDFBF7] border border-[#E6B84A]/30 hover:border-[#E6B84A] hover:bg-[#22222A] active:bg-[#121216]',
    outline:
      'bg-transparent text-[#E6B84A] border-2 border-[#E6B84A] hover:bg-[#E6B84A]/10 active:bg-[#E6B84A]/20',
    ghost:
      'bg-transparent text-[#C4BFB5] hover:text-[#FDFBF7] hover:bg-white/5 active:bg-white/10',
  }[variant];

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`relative inline-flex items-center justify-center select-none cursor-pointer transition-colors duration-200 ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
}

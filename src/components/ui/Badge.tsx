'use client';

import React from 'react';
import { DietaryTag } from '@/lib/types/menu';
import { useLanguage } from '../providers/LanguageContext';

interface BadgeProps {
  tag?: DietaryTag;
  label?: string;
  variant?: 'gold' | 'emerald' | 'ruby' | 'muted';
  className?: string;
  onClick?: () => void;
}

export function Badge({ tag, label, variant, className = '', onClick }: BadgeProps) {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  let displayLabel = label;
  let resolvedVariant = variant || 'muted';

  if (tag) {
    switch (tag) {
      case 'halal':
        displayLabel = '100% Halal';
        resolvedVariant = 'emerald';
        break;
      case 'veggie':
        displayLabel = isEn ? 'Vegetarian' : 'Vegetarisch';
        resolvedVariant = 'emerald';
        break;
      case 'bestseller':
        displayLabel = 'Bestseller';
        resolvedVariant = 'gold';
        break;
      case 'chef_special':
        displayLabel = isEn ? 'Forge Pick' : 'Schmiede-Tipp';
        resolvedVariant = 'gold';
        break;
      case 'spicy':
        displayLabel = isEn ? 'Spicy' : 'Pikant';
        resolvedVariant = 'ruby';
        break;
    }
  }

  const variantStyles = {
    gold: 'bg-[#E6B84A]/15 text-[#E6B84A] border-[#E6B84A]/30',
    emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    ruby: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    muted: 'bg-white/5 text-[#C4BFB5] border-white/10',
  }[resolvedVariant];

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase rounded-full border transition-all ${variantStyles} ${
        onClick ? 'cursor-pointer hover:brightness-125' : ''
      } ${className}`}
    >
      {displayLabel}
    </span>
  );
}

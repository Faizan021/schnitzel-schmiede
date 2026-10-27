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
      case 'regional':
        displayLabel = isEn ? 'Regional Meat' : 'Regionales Fleisch';
        resolvedVariant = 'gold';
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
    gold: 'bg-[#d99036]/30 text-[#16202a] border-[#d99036]',
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    ruby: 'bg-rose-50 text-rose-800 border-rose-300',
    muted: 'bg-[#fffbf5] text-[#4b3b2f] border-[#e8d5be]',
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

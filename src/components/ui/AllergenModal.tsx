'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, ShieldCheck } from 'lucide-react';
import { ALLERGEN_CATALOG, AllergenKey } from '@/lib/types/menu';
import { useLanguage } from '../providers/LanguageContext';

interface AllergenModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeAllergens?: AllergenKey[];
}

export function AllergenModal({ isOpen, onClose, activeAllergens }: AllergenModalProps) {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative z-10 w-full max-w-lg rounded-2xl border border-[#e8d5be] bg-white/95 backdrop-blur-md p-6 shadow-2xl text-[#16202a]"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#e8d5be]/60">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ffedd5] text-[#16202a]">
                  <Info className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#16202a]">
                    {isEn ? 'Allergen Information (EU-LMIV)' : 'Allergen-Kennzeichnung (EU-LMIV)'}
                  </h3>
                  <p className="text-xs text-[#4b3b2f]">
                    {isEn ? 'Transparency & Product Safety at Schnitzel Schmiede MG' : 'Transparenz & Produktsicherheit bei Schnitzel Schmiede MG'}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="rounded-lg p-2 text-[#4b3b2f] hover:bg-[#f4ede4] hover:text-[#16202a] transition-colors cursor-pointer"
                aria-label={isEn ? 'Close' : 'Schließen'}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 max-h-[60vh] space-y-3 overflow-y-auto pr-1">
              <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-xs text-emerald-900 flex items-start gap-2.5">
                <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-emerald-700" />
                <span>
                  <strong>{isEn ? 'Cross-contamination notice:' : 'Hinweis zur Kreuzkontamination:'}</strong>{' '}
                  {isEn
                    ? 'Despite the utmost care in our craft kitchen, traces of gluten-containing grains and eggs cannot be 100% excluded. For severe allergies, please notify our team in advance.'
                    : 'Trotz größter Sorgfalt in unserer Handwerksküche können Spuren von glutenhaltigem Getreide und Eiern nicht zu 100% ausgeschlossen werden. Bei schweren Unverträglichkeiten sprechen Sie unser Team bitte vorab an.'}
                </span>
              </div>

              <div className="space-y-2 pt-2">
                {Object.values(ALLERGEN_CATALOG).map((item) => {
                  const isHighlighted = activeAllergens?.includes(item.code);
                  const label = isEn ? item.labelEn : item.label;
                  const desc = isEn ? item.descriptionEn : item.description;

                  return (
                    <div
                      key={item.code}
                      className={`flex items-start gap-3 rounded-xl border p-3 transition-colors ${
                        isHighlighted
                          ? 'border-[#d99036] bg-[#ffedd5]/60'
                          : 'border-[#e8d5be]/60 bg-[#fffbf5]'
                      }`}
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#d99036] text-xs font-black text-[#16202a]">
                        {item.code}
                      </span>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-[#16202a] flex items-center justify-between">
                          <span>{label}</span>
                          {isHighlighted && (
                            <span className="text-[10px] font-bold text-[#16202a] uppercase bg-[#d99036] px-2 py-0.5 rounded">
                              {isEn ? 'Present in this dish' : 'In diesem Gericht enthalten'}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#4b3b2f] mt-0.5">{desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="rounded-xl bg-[#d99036] hover:bg-[#85b0cb] px-5 py-2 text-xs font-black uppercase tracking-wider text-[#16202a] transition-colors cursor-pointer"
              >
                {isEn ? 'Understood' : 'Verstanden'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

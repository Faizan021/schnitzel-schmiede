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
            className="relative z-10 w-full max-w-lg rounded-2xl border border-[#b8d4e8] bg-white/95 backdrop-blur-md p-6 shadow-2xl text-[#1a3a52]"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#b8d4e8]/60">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#cce3f1] text-[#1a3a52]">
                  <Info className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1a3a52]">
                    {isEn ? 'Allergen Information (EU-LMIV)' : 'Allergen-Kennzeichnung (EU-LMIV)'}
                  </h3>
                  <p className="text-xs text-[#2e5f7e]">
                    {isEn ? 'Transparency & Product Safety at Schnitzel Schmiede MG' : 'Transparenz & Produktsicherheit bei Schnitzel Schmiede MG'}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="rounded-lg p-2 text-[#2e5f7e] hover:bg-[#ddeef7] hover:text-[#1a3a52] transition-colors cursor-pointer"
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
                          ? 'border-[#9bc1d9] bg-[#cce3f1]/60'
                          : 'border-[#b8d4e8]/60 bg-[#f0f7fb]'
                      }`}
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#9bc1d9] text-xs font-black text-[#1a3a52]">
                        {item.code}
                      </span>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-[#1a3a52] flex items-center justify-between">
                          <span>{label}</span>
                          {isHighlighted && (
                            <span className="text-[10px] font-bold text-[#1a3a52] uppercase bg-[#9bc1d9] px-2 py-0.5 rounded">
                              {isEn ? 'Present in this dish' : 'In diesem Gericht enthalten'}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#2e5f7e] mt-0.5">{desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="rounded-xl bg-[#9bc1d9] hover:bg-[#85b0cb] px-5 py-2 text-xs font-black uppercase tracking-wider text-[#1a3a52] transition-colors cursor-pointer"
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

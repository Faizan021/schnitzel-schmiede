'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, ShieldCheck } from 'lucide-react';
import { ALLERGEN_CATALOG, AllergenKey } from '@/lib/types/menu';

interface AllergenModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeAllergens?: AllergenKey[];
}

export function AllergenModal({ isOpen, onClose, activeAllergens }: AllergenModalProps) {
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
            className="relative z-10 w-full max-w-lg rounded-2xl border border-white/10 bg-[#141418] p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E6B84A]/10 text-[#E6B84A]">
                  <Info className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#FDFBF7]">
                    Allergen-Kennzeichnung (EU-LMIV)
                  </h3>
                  <p className="text-xs text-[#C4BFB5]">
                    Transparenz & Produktsicherheit bei Schnitzel Schmiede MG
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="rounded-lg p-2 text-[#C4BFB5] hover:bg-white/5 hover:text-[#FDFBF7] transition-colors"
                aria-label="Schließen"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 max-h-[60vh] space-y-3 overflow-y-auto pr-1">
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-300 flex items-start gap-2.5">
                <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-emerald-400" />
                <span>
                  <strong>Hinweis zur Kreuzkontamination:</strong> Trotz größter Sorgfalt in unserer
                  Handwerksküche können Spuren von glutenhaltigem Getreide und Eiern nicht zu 100%
                  ausgeschlossen werden. Bei schweren Unverträglichkeiten sprechen Sie unser Team
                  bitte vorab an.
                </span>
              </div>

              <div className="space-y-2 pt-2">
                {Object.values(ALLERGEN_CATALOG).map((item) => {
                  const isHighlighted = activeAllergens?.includes(item.code);
                  return (
                    <div
                      key={item.code}
                      className={`flex items-start gap-3 rounded-xl border p-3 transition-colors ${
                        isHighlighted
                          ? 'border-[#E6B84A] bg-[#E6B84A]/10'
                          : 'border-white/5 bg-[#1A1A20]'
                      }`}
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#E6B84A]/20 text-xs font-black text-[#E6B84A]">
                        {item.code}
                      </span>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-[#FDFBF7] flex items-center justify-between">
                          <span>{item.label}</span>
                          {isHighlighted && (
                            <span className="text-[10px] font-bold text-[#E6B84A] uppercase">
                              In diesem Gericht enthalten
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#C4BFB5] mt-0.5">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="rounded-xl bg-[#E6B84A] px-5 py-2 text-sm font-bold text-[#0A0A0C] hover:bg-[#F5C75D] transition-colors"
              >
                Verstanden
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

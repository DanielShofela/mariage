import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WEDDING_COUPLE } from '../data/weddingData';
import { X, MapPin, Navigation, Compass, Calendar, Sparkles, Phone, Copy, Check, Clock, Sun, Hotel } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRsvp: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  onOpenRsvp,
}) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(WEDDING_COUPLE.weddingDateISO).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyAddress = () => {
    navigator.clipboard.writeText(`${WEDDING_COUPLE.venue}, ${WEDDING_COUPLE.address}, ${WEDDING_COUPLE.city}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-md bg-slate-900/30">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto glass-panel rounded-[32px] p-6 sm:p-8 text-slate-800 shadow-2xl border border-white"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-6 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#005BFF] bg-[#005BFF]/10 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Lieu d’Exception
              </span>
              <h3 className="font-serif-luxury text-3xl sm:text-4xl text-slate-900 font-light">
                {WEDDING_COUPLE.venue}
              </h3>
              <p className="font-sans-luxury text-xs sm:text-sm text-slate-600 mt-1 flex items-center justify-center gap-1">
                <MapPin className="w-4 h-4 text-[#005BFF]" />
                {WEDDING_COUPLE.address}, {WEDDING_COUPLE.city}
              </p>
            </div>

            {/* Countdown Box */}
            <div className="bg-gradient-to-r from-[#005BFF] to-[#57B9FF] rounded-2xl p-4 sm:p-5 text-white shadow-lg mb-6">
              <p className="text-center text-xs font-medium tracking-wider uppercase opacity-90 mb-3">
                Compte à Rebours Jusqu’à l’Événement
              </p>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-white/15 backdrop-blur-md rounded-xl p-2">
                  <span className="font-serif-luxury text-2xl sm:text-3xl font-bold block">{timeLeft.days}</span>
                  <span className="text-[10px] uppercase font-light">Jours</span>
                </div>
                <div className="bg-white/15 backdrop-blur-md rounded-xl p-2">
                  <span className="font-serif-luxury text-2xl sm:text-3xl font-bold block">{timeLeft.hours}</span>
                  <span className="text-[10px] uppercase font-light">Heures</span>
                </div>
                <div className="bg-white/15 backdrop-blur-md rounded-xl p-2">
                  <span className="font-serif-luxury text-2xl sm:text-3xl font-bold block">{timeLeft.minutes}</span>
                  <span className="text-[10px] uppercase font-light">Min</span>
                </div>
                <div className="bg-white/15 backdrop-blur-md rounded-xl p-2">
                  <span className="font-serif-luxury text-2xl sm:text-3xl font-bold block">{timeLeft.seconds}</span>
                  <span className="text-[10px] uppercase font-light">Sec</span>
                </div>
              </div>
            </div>

            {/* Navigation & Directions Action Links */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <a
                href={WEDDING_COUPLE.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 hover:border-[#005BFF] hover:text-[#005BFF] transition-all shadow-sm"
              >
                <Compass className="w-4 h-4 text-[#005BFF]" />
                Google Maps
              </a>
              <a
                href={WEDDING_COUPLE.wazeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 hover:border-[#57B9FF] hover:text-[#57B9FF] transition-all shadow-sm"
              >
                <Navigation className="w-4 h-4 text-[#57B9FF]" />
                Waze GPS
              </a>
            </div>

            {/* Copy Address Row */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 mb-6 text-xs">
              <span className="text-slate-600 truncate mr-2">
                {WEDDING_COUPLE.venue}, {WEDDING_COUPLE.city}
              </span>
              <button
                onClick={copyAddress}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white font-semibold text-[#005BFF] border border-slate-200 hover:bg-blue-50 transition-colors flex-shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copié !' : 'Copier'}
              </button>
            </div>

            {/* Detailed Timeline Schedule */}
            <div className="space-y-4 mb-6">
              <h4 className="font-serif-luxury text-xl text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#005BFF]" />
                Déroulement de la Journée
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-xs">
                  <div className="w-16 font-semibold text-[#005BFF] pt-0.5">16h00</div>
                  <div>
                    <p className="font-bold text-slate-900">Accueil & Rafraîchissements</p>
                    <p className="text-slate-500">Service de bienvenue aux terrasses du Grand Hôtel.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs">
                  <div className="w-16 font-semibold text-[#005BFF] pt-0.5">16h30</div>
                  <div>
                    <p className="font-bold text-slate-900">Cérémonie Laïque</p>
                    <p className="text-slate-500">Échange des vœux au belvédère face à la mer.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs">
                  <div className="w-16 font-semibold text-[#005BFF] pt-0.5">18h00</div>
                  <div>
                    <p className="font-bold text-slate-900">Cocktail Riviera & Musique Live</p>
                    <p className="text-slate-500">Ateliers gastronomiques & quatuor à cordes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs">
                  <div className="w-16 font-semibold text-[#005BFF] pt-0.5">20h30</div>
                  <div>
                    <p className="font-bold text-slate-900">Dîner de Gala & Pièce Montée</p>
                    <p className="text-slate-500">Repas d'exception préparé par le Chef Étoilé.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs">
                  <div className="w-16 font-semibold text-[#005BFF] pt-0.5">23h00</div>
                  <div>
                    <p className="font-bold text-slate-900">Soirée Dansante & Feux d’Artifice</p>
                    <p className="text-slate-500">Ouverture du bal et festivités jusqu’à l’aube.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dress Code & Lodging Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-xs">
              <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100">
                <p className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                  <Sun className="w-4 h-4 text-[#005BFF]" />
                  Dress Code
                </p>
                <p className="text-slate-600">
                  Tenue de soirée élégante. Nuances de blanc, bleu ciel et tons sables suggérées.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100">
                <p className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                  <Hotel className="w-4 h-4 text-[#005BFF]" />
                  Hébergement
                </p>
                <p className="text-slate-600">
                  Tarifs privilégiés négociés. Contactez le service conciergerie avec le code "WEDDING2027".
                </p>
              </div>
            </div>

            {/* Action RSVP Trigger */}
            <button
              onClick={() => {
                onClose();
                onOpenRsvp();
              }}
              className="w-full py-3.5 rounded-xl bg-[#005BFF] hover:bg-[#004CD6] text-white text-sm font-bold shadow-lg transition-all active:scale-95"
            >
              Confirmer ma présence
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

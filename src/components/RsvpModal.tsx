import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { WEDDING_COUPLE } from '../data/weddingData';
import { RsvpFormData } from '../types';
import { X, MessageCircle, Send, CheckCircle2, User, Users, Utensils, Bus, Music, Heart, Sparkles } from 'lucide-react';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<RsvpFormData>({
    fullName: '',
    attending: 'yes',
    guestCount: 1,
    guestNames: '',
    dietary: '',
    shuttleNeeded: false,
    songRequest: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#005BFF', '#57B9FF', '#FFFFFF', '#DCEFFF'],
    });
  };

  const handleWhatsAppSend = () => {
    const nameStr = formData.fullName.trim() || 'Invité';
    const guestCountStr = `${formData.guestCount} ${formData.guestCount > 1 ? 'personnes' : 'personne'}`;
    const companionsStr = formData.guestNames.trim() ? `\n👥 Accompagnateurs : ${formData.guestNames.trim()}` : '';
    const dietaryStr = formData.dietary.trim() ? `\n🍽️ Régime / Allergies : ${formData.dietary.trim()}` : '';
    const songStr = formData.songRequest.trim() ? `\n🎵 Chanson souhaitée : ${formData.songRequest.trim()}` : '';
    const msgStr = formData.message.trim() ? `\n💬 Petit mot : "${formData.message.trim()}"` : '';

    const text = encodeURIComponent(
      `Bonjour Stéphane & Laura ! ✨\n\nJe confirme avec grand plaisir ma présence à votre mariage le Samedi 29 Août 2026 !\n\n👤 Nom & Prénom : ${nameStr}\n👥 Nombre de personnes : ${guestCountStr}${companionsStr}${dietaryStr}${songStr}${msgStr}\n\nHâte de célébrer ce moment magique avec vous ! 🥂❤️`
    );

    const whatsappUrl = `https://wa.me/${WEDDING_COUPLE.whatsappNumber}?text=${text}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    triggerConfetti();
    setSubmitted(true);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleWhatsAppSend();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-md bg-slate-900/35">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto glass-panel rounded-[32px] p-6 sm:p-8 text-slate-800 shadow-2xl border border-white"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif-luxury text-3xl text-slate-900">
                  Merci Infinitement !
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Votre confirmation a été préparée et transmise à Stéphane & Laura. Nous avons tellement hâte de fêter cela avec vous le 29 Août 2026 !
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#005BFF] text-white text-xs font-bold hover:bg-[#004CD6] transition-colors"
                >
                  Fermer la fenêtre
                </button>
              </div>
            ) : (
              <div>
                {/* Header */}
                <div className="text-center mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#005BFF] bg-[#005BFF]/10 mb-2">
                    <Heart className="w-3.5 h-3.5 fill-[#005BFF]" />
                    Confirmation de Présence
                  </span>
                  <h3 className="font-serif-luxury text-3xl sm:text-4xl text-slate-900 font-light">
                    Serez-vous des nôtres ?
                  </h3>
                  <p className="font-sans-luxury text-xs text-slate-500 mt-1">
                    Veuillez confirmer votre présence avant le 25 Août 2026.
                  </p>
                </div>

                {/* Direct WhatsApp Instant Action Banner */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-4 text-white mb-6 shadow-md flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 fill-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate">Confirmation Rapide WhatsApp</p>
                      <p className="text-[11px] opacity-90 truncate">Envoi des infos renseignées sur WhatsApp</p>
                    </div>
                  </div>
                  <button
                    onClick={handleWhatsAppSend}
                    className="flex-shrink-0 px-3.5 py-2 rounded-xl bg-white text-emerald-700 text-xs font-bold hover:bg-emerald-50 active:scale-95 transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    WhatsApp
                  </button>
                </div>

                {/* Detailed Form */}
                <form onSubmit={handleSubmitForm} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#005BFF]" />
                      Votre Prénom et Nom *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ex. Marie & Thomas Dupont"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white/90 text-xs focus:outline-none focus:border-[#005BFF] focus:ring-2 focus:ring-[#005BFF]/20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#005BFF]" />
                        Nombre de personnes
                      </label>
                      <select
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white/90 text-xs focus:outline-none focus:border-[#005BFF]"
                      >
                        <option value={1}>1 personne</option>
                        <option value={2}>2 personnes</option>
                        <option value={3}>3 personnes</option>
                        <option value={4}>4 personnes ou +</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                        <Utensils className="w-3.5 h-3.5 text-[#005BFF]" />
                        Régime / Allergies
                      </label>
                      <input
                        type="text"
                        placeholder="Végétarien, sans gluten..."
                        value={formData.dietary}
                        onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white/90 text-xs focus:outline-none focus:border-[#005BFF]"
                      />
                    </div>
                  </div>

                  {formData.guestCount > 1 && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nom(s) des accompagnateurs
                      </label>
                      <input
                        type="text"
                        placeholder="Prénoms des personnes vous accompagnant"
                        value={formData.guestNames}
                        onChange={(e) => setFormData({ ...formData, guestNames: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white/90 text-xs focus:outline-none focus:border-[#005BFF]"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                      <Music className="w-3.5 h-3.5 text-[#005BFF]" />
                      Une chanson pour vous faire danser ?
                    </label>
                    <input
                      type="text"
                      placeholder="Artiste ou titre préféré..."
                      value={formData.songRequest}
                      onChange={(e) => setFormData({ ...formData, songRequest: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white/90 text-xs focus:outline-none focus:border-[#005BFF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 text-[#005BFF]" />
                      Un petit mot pour les mariés
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Vos vœux ou vœux personnalisés..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white/90 text-xs focus:outline-none focus:border-[#005BFF]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#005BFF] to-[#57B9FF] text-white text-xs font-bold shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Envoyer ma confirmation sur WhatsApp
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

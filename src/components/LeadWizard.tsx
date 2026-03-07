'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { leadSchema, LeadFormData } from '@/lib/schema';
import { User, Building2, Mail, Phone, Clock, CheckCircle, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';

export default function LeadWizard() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<LeadFormData | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const { register, handleSubmit, formState: { errors }, trigger, getValues } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: { callbackPreference: 'today' }
  });

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmittedData(data);
        setIsSuccess(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    const valid = await trigger(['name', 'email', 'phone']);
    if (valid) setStep(2);
  };

  const callbackLabels = {
    today: 'Today',
    tomorrow: 'Tomorrow',
    this_week: 'This Week'
  };

  if (isSuccess && submittedData) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg">
        {showConfetti && <Confetti />}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-[#1a1a2e]">
            Thank you, {submittedData.name}!
          </h3>
          <p className="mb-6 text-gray-600">
            We&apos;ll call you at <span className="font-semibold">{submittedData.phone}</span> {callbackLabels[submittedData.callbackPreference].toLowerCase()}.
          </p>
          <a
            href="https://instagram.com/spanishconveyancing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#c9a227] hover:underline"
          >
            Follow us on Instagram
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-[#c9a227] text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
          <div className={`w-16 h-1 ${step >= 2 ? 'bg-[#c9a227]' : 'bg-gray-200'}`} />
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-[#c9a227] text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold mb-6 text-[#1a1a2e]">
                Your Details
              </h3>
              
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    {...register('name')}
                    placeholder="Your Name *"
                    className={`form-control ${errors.name ? 'error' : ''}`}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    {...register('agency')}
                    placeholder="Agency Name (Optional)"
                    className="form-control"
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="Email Address *"
                    className={`form-control ${errors.email ? 'error' : ''}`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="Phone Number * (+34...)"
                    className={`form-control ${errors.phone ? 'error' : ''}`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>

              <button
                type="button"
                onClick={nextStep}
                className="btn-accent w-full flex items-center justify-center gap-2"
              >
                Next <ArrowRight size={18} />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold mb-6 text-[#1a1a2e]">
                When should we call?
              </h3>

              <div className="space-y-3">
                {(['today', 'tomorrow', 'this_week'] as const).map((option) => (
                  <label
                    key={option}
                    className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      getValues('callbackPreference') === option
                        ? 'border-[#c9a227] bg-[#c9a227]/10'
                        : 'border-gray-200 hover:border-[#c9a227]/50'
                    }`}
                  >
                    <input
                      {...register('callbackPreference')}
                      type="radio"
                      value={option}
                      className="w-5 h-5 text-[#c9a227] focus:ring-[#c9a227]"
                    />
                    <Clock size={20} className="text-[#c9a227]" />
                    <span className="text-[#1a1a2e]">
                      {callbackLabels[option]}
                    </span>
                  </label>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-white-accent flex-1 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={18} /> Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-accent flex-1 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <><Loader2 className="animate-spin" size={18} /> Submitting...</>
                  ) : (
                    'Request Callback'
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}

function Confetti() {
  const [pieces, setPieces] = useState<Array<{ id: number; left: number; color: string; delay: number }>>([]);

  useEffect(() => {
    const colors = ['#c9a227', '#d4af37', '#1a1a2e', '#4ade80', '#f472b6'];
    const newPieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.5,
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

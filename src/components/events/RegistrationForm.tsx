'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { registrationSchema } from '@/lib/eventSchema';
import { User, Mail, Phone, Loader2, CheckCircle } from 'lucide-react';

// Form schema excludes eventId (passed as prop)
const formSchema = registrationSchema.omit({ eventId: true });
type FormData = z.infer<typeof formSchema>;

interface RegistrationFormProps {
  eventId: string;
  eventTitle: string;
}

export default function RegistrationForm({ eventId, eventTitle }: RegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, eventId }),
      });

      if (res.status === 201) {
        setSubmittedEmail(data.email);
        setIsSuccess(true);
        return;
      }

      const body = await res.json();

      if (body.code === 'DUPLICATE_REGISTRATION') {
        setServerError('This email address is already registered for this event.');
      } else if (body.code === 'EVENT_PAST') {
        setServerError('Registration for this event is now closed.');
      } else {
        setServerError('Something went wrong. Please try again later.');
      }
    } catch {
      setServerError('Unable to connect. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-[#1a1a2e] mb-2">
          You&apos;re registered!
        </h3>
        <p className="text-gray-600">
          You have successfully registered for <span className="font-semibold">{eventTitle}</span>.
          A confirmation has been sent to <span className="font-semibold">{submittedEmail}</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {serverError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 text-sm">{serverError}</p>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            {...register('name')}
            id="name"
            type="text"
            placeholder="Your full name"
            className={`form-control ${errors.name ? 'error' : ''}`}
          />
        </div>
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            {...register('email')}
            id="email"
            type="email"
            placeholder="you@example.com"
            className={`form-control ${errors.email ? 'error' : ''}`}
          />
        </div>
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            {...register('phone')}
            id="phone"
            type="tel"
            placeholder="+34612345678"
            className={`form-control ${errors.phone ? 'error' : ''}`}
          />
        </div>
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-accent w-full flex items-center justify-center gap-2 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Registering...
          </>
        ) : (
          'Register Now'
        )}
      </button>
    </form>
  );
}

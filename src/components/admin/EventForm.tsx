'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventSchema, type EventFormData } from '@/lib/eventSchema';
import { Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';

// Use the base schema for the form - date validation handled in onSubmit
type EventFormValues = EventFormData;

const COMMON_TIMEZONES = [
  'Europe/London',
  'Europe/Madrid',
  'Europe/Paris',
  'Europe/Berlin',
  'Europe/Rome',
  'Europe/Amsterdam',
  'Europe/Brussels',
  'Europe/Lisbon',
  'Europe/Dublin',
  'Europe/Athens',
  'Europe/Helsinki',
  'Europe/Warsaw',
  'Europe/Prague',
  'Europe/Vienna',
  'Europe/Zurich',
  'Europe/Stockholm',
  'Europe/Oslo',
  'Europe/Copenhagen',
  'Europe/Bucharest',
  'Europe/Istanbul',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Toronto',
  'America/Vancouver',
  'America/Mexico_City',
  'America/Sao_Paulo',
  'America/Buenos_Aires',
  'Asia/Dubai',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Asia/Hong_Kong',
  'Asia/Kolkata',
  'Australia/Sydney',
  'Australia/Melbourne',
  'Pacific/Auckland',
  'Africa/Johannesburg',
  'Africa/Cairo',
  'UTC',
];

interface EventFormProps {
  defaultValues?: EventFormData;
  onSubmit: (data: EventFormData) => Promise<void>;
  serverError?: string | null;
  isSubmitting?: boolean;
}

function toDatetimeLocal(isoString: string): string {
  if (!isoString) return '';
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function fromDatetimeLocal(datetimeLocal: string): string {
  if (!datetimeLocal) return '';
  return new Date(datetimeLocal).toISOString();
}

export default function EventForm({ defaultValues, onSubmit, serverError, isSubmitting }: EventFormProps) {
  const [aiText, setAiText] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiSuccess, setAiSuccess] = useState(false);
  const [dateError, setDateError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          highlights: defaultValues.highlights || [],
          schedule: defaultValues.schedule || [],
        }
      : {
          title: '',
          description: '',
          date: '',
          timezone: 'Europe/Madrid',
          location: '',
          subtitle: '',
          heroImage: '',
          highlights: [],
          aboutHeading: '',
          aboutBody: '',
          schedule: [],
          ctaHeading: '',
          ctaBody: '',
          registrationNote: '',
        },
  });

  const { fields: highlightFields, append: appendHighlight, remove: removeHighlight, replace: replaceHighlights } = useFieldArray({
    control,
    name: 'highlights',
  });

  const { fields: scheduleFields, append: appendSchedule, remove: removeSchedule, replace: replaceSchedule } = useFieldArray({
    control,
    name: 'schedule',
  });

  const handleAiParse = async () => {
    if (!aiText.trim()) return;

    setAiLoading(true);
    setAiError(null);
    setAiSuccess(false);

    try {
      const res = await fetch('/api/events/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: aiText }),
      });

      if (!res.ok) {
        const data = await res.json();
        setAiError(data.error || 'Failed to parse event details');
        return;
      }

      const parsed = await res.json();

      // Populate all form fields
      if (parsed.title) setValue('title', parsed.title);
      if (parsed.subtitle) setValue('subtitle', parsed.subtitle);
      if (parsed.description) setValue('description', parsed.description);
      if (parsed.date) setValue('date', parsed.date, { shouldValidate: true });
      if (parsed.timezone) setValue('timezone', parsed.timezone);
      if (parsed.location) setValue('location', parsed.location);
      if (parsed.heroImage) setValue('heroImage', parsed.heroImage);
      if (parsed.aboutHeading) setValue('aboutHeading', parsed.aboutHeading);
      if (parsed.aboutBody) setValue('aboutBody', parsed.aboutBody);
      if (parsed.ctaHeading) setValue('ctaHeading', parsed.ctaHeading);
      if (parsed.ctaBody) setValue('ctaBody', parsed.ctaBody);
      if (parsed.registrationNote) setValue('registrationNote', parsed.registrationNote);

      // Replace array fields
      if (parsed.highlights && Array.isArray(parsed.highlights)) {
        replaceHighlights(parsed.highlights);
      }
      if (parsed.schedule && Array.isArray(parsed.schedule)) {
        replaceSchedule(parsed.schedule);
      }

      setAiSuccess(true);
    } catch {
      setAiError('Network error. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleFormSubmit = async (data: EventFormValues) => {
    // Client-side future date validation
    if (data.date && new Date(data.date) <= new Date()) {
      setDateError('Event date must be in the future');
      return;
    }
    setDateError(null);
    await onSubmit(data);
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#c9a227] focus:border-transparent outline-none ${
      hasError ? 'border-red-500' : 'border-gray-300'
    }`;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {serverError}
        </div>
      )}

      {/* === AI AUTO-POPULATE === */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={20} className="text-purple-600" />
          <h3 className="text-lg font-bold text-purple-900">AI Auto-Populate</h3>
        </div>
        <p className="text-sm text-purple-700 mb-4">
          Paste your event details below and AI will automatically fill in all the form fields for you.
        </p>
        <textarea
          value={aiText}
          onChange={(e) => { setAiText(e.target.value); setAiSuccess(false); }}
          rows={6}
          placeholder="Paste your event details here... e.g. event name, date, time, venue, what topics will be covered, who it's for, any special offers or partnerships..."
          className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none resize-y bg-white"
        />
        {aiError && (
          <p className="mt-2 text-sm text-red-600">{aiError}</p>
        )}
        {aiSuccess && (
          <p className="mt-2 text-sm text-green-600 font-medium">✓ Form populated successfully! Review the fields below and adjust as needed.</p>
        )}
        <button
          type="button"
          onClick={handleAiParse}
          disabled={aiLoading || !aiText.trim()}
          className="mt-3 flex items-center gap-2 px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {aiLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Parsing...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Auto-Fill Form
            </>
          )}
        </button>
      </div>

      {/* === BASIC INFO === */}
      <div>
        <h3 className="text-lg font-bold text-[#1a1a2e] mb-4 pb-2 border-b">Basic Information</h3>
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Event Title *
            </label>
            <input
              id="title"
              type="text"
              maxLength={150}
              placeholder="e.g. Spanish Property Seminar"
              className={inputClass(!!errors.title)}
              {...register('title')}
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
          </div>

          {/* Subtitle */}
          <div>
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">
              Subtitle / Tagline
            </label>
            <input
              id="subtitle"
              type="text"
              maxLength={200}
              placeholder="e.g. An exclusive educational event for property professionals"
              className={inputClass(false)}
              {...register('subtitle')}
            />
            <p className="mt-1 text-xs text-gray-500">Shown below the title in the hero section</p>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Short Description *
            </label>
            <textarea
              id="description"
              rows={3}
              maxLength={2000}
              placeholder="Brief overview of the event (used for SEO and previews)"
              className={`${inputClass(!!errors.description)} resize-y`}
              {...register('description')}
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
          </div>

          {/* Date, Time, Timezone, Location */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date & Time *
              </label>
              <input
                id="date"
                type="datetime-local"
                className={inputClass(!!errors.date || !!dateError)}
                defaultValue={defaultValues?.date ? toDatetimeLocal(defaultValues.date) : ''}
                onChange={(e) => {
                  const isoValue = fromDatetimeLocal(e.target.value);
                  setValue('date', isoValue, { shouldValidate: true });
                  setDateError(null);
                }}
              />
              {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>}
              {dateError && !errors.date && <p className="mt-1 text-sm text-red-600">{dateError}</p>}
            </div>
            <div>
              <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                Timezone *
              </label>
              <select
                id="timezone"
                className={`${inputClass(!!errors.timezone)} bg-white`}
                {...register('timezone')}
              >
                <option value="">Select a timezone</option>
                {COMMON_TIMEZONES.map((tz) => (
                  <option key={tz} value={tz}>{tz.replace(/_/g, ' ')}</option>
                ))}
              </select>
              {errors.timezone && <p className="mt-1 text-sm text-red-600">{errors.timezone.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location *
            </label>
            <input
              id="location"
              type="text"
              maxLength={200}
              placeholder="e.g. La Sala, near Puerto Banús"
              className={inputClass(!!errors.location)}
              {...register('location')}
            />
            {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
          </div>

          {/* Hero Image */}
          <div>
            <label htmlFor="heroImage" className="block text-sm font-medium text-gray-700 mb-1">
              Hero Image Path
            </label>
            <input
              id="heroImage"
              type="text"
              maxLength={500}
              placeholder="e.g. /images/la-sala-venue.jpg"
              className={inputClass(false)}
              {...register('heroImage')}
            />
            <p className="mt-1 text-xs text-gray-500">Path to the hero background image (relative to /public)</p>
          </div>
        </div>
      </div>

      {/* === HIGHLIGHTS === */}
      <div>
        <h3 className="text-lg font-bold text-[#1a1a2e] mb-4 pb-2 border-b">Key Highlights</h3>
        <p className="text-sm text-gray-500 mb-4">What attendees will learn or gain (shown as cards on the landing page)</p>

        <div className="space-y-3">
          {highlightFields.map((field, index) => (
            <div key={field.id} className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg">
              <div className="flex-1 grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  maxLength={100}
                  placeholder="Highlight title"
                  className={inputClass(false)}
                  {...register(`highlights.${index}.title`)}
                />
                <input
                  type="text"
                  maxLength={200}
                  placeholder="Short description"
                  className={inputClass(false)}
                  {...register(`highlights.${index}.description`)}
                />
              </div>
              <button
                type="button"
                onClick={() => removeHighlight(index)}
                className="text-red-500 hover:text-red-700 mt-2"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => appendHighlight({ title: '', description: '' })}
          className="mt-3 flex items-center gap-2 text-sm text-[#c9a227] hover:text-[#b8921f] font-medium"
        >
          <Plus size={16} /> Add Highlight
        </button>
      </div>

      {/* === ABOUT SECTION === */}
      <div>
        <h3 className="text-lg font-bold text-[#1a1a2e] mb-4 pb-2 border-b">About Section</h3>
        <p className="text-sm text-gray-500 mb-4">Detailed information about the event and what to expect</p>

        <div className="space-y-4">
          <div>
            <label htmlFor="aboutHeading" className="block text-sm font-medium text-gray-700 mb-1">
              Section Heading
            </label>
            <input
              id="aboutHeading"
              type="text"
              maxLength={150}
              placeholder="e.g. Designed for Property Professionals"
              className={inputClass(false)}
              {...register('aboutHeading')}
            />
          </div>
          <div>
            <label htmlFor="aboutBody" className="block text-sm font-medium text-gray-700 mb-1">
              About Content
            </label>
            <textarea
              id="aboutBody"
              rows={6}
              maxLength={3000}
              placeholder="Detailed description of the event, partnership details, what attendees will learn..."
              className={`${inputClass(false)} resize-y`}
              {...register('aboutBody')}
            />
            <p className="mt-1 text-xs text-gray-500">Supports line breaks. Use blank lines to separate paragraphs.</p>
          </div>
        </div>
      </div>

      {/* === SCHEDULE === */}
      <div>
        <h3 className="text-lg font-bold text-[#1a1a2e] mb-4 pb-2 border-b">Event Schedule</h3>
        <p className="text-sm text-gray-500 mb-4">Timeline of activities (shown in the schedule card)</p>

        <div className="space-y-3">
          {scheduleFields.map((field, index) => (
            <div key={field.id} className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg">
              <div className="flex-1 grid md:grid-cols-3 gap-3">
                <input
                  type="text"
                  maxLength={50}
                  placeholder="Time (e.g. 17:00)"
                  className={inputClass(false)}
                  {...register(`schedule.${index}.time`)}
                />
                <input
                  type="text"
                  maxLength={100}
                  placeholder="Activity title"
                  className={inputClass(false)}
                  {...register(`schedule.${index}.title`)}
                />
                <input
                  type="text"
                  maxLength={200}
                  placeholder="Short description"
                  className={inputClass(false)}
                  {...register(`schedule.${index}.description`)}
                />
              </div>
              <button
                type="button"
                onClick={() => removeSchedule(index)}
                className="text-red-500 hover:text-red-700 mt-2"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => appendSchedule({ time: '', title: '', description: '' })}
          className="mt-3 flex items-center gap-2 text-sm text-[#c9a227] hover:text-[#b8921f] font-medium"
        >
          <Plus size={16} /> Add Schedule Item
        </button>
      </div>

      {/* === CTA BANNER === */}
      <div>
        <h3 className="text-lg font-bold text-[#1a1a2e] mb-4 pb-2 border-b">Call-to-Action Banner</h3>
        <p className="text-sm text-gray-500 mb-4">The highlighted banner section before the registration form</p>

        <div className="space-y-4">
          <div>
            <label htmlFor="ctaHeading" className="block text-sm font-medium text-gray-700 mb-1">
              CTA Heading
            </label>
            <input
              id="ctaHeading"
              type="text"
              maxLength={150}
              placeholder="e.g. Earn 25% Referral Commission"
              className={inputClass(false)}
              {...register('ctaHeading')}
            />
          </div>
          <div>
            <label htmlFor="ctaBody" className="block text-sm font-medium text-gray-700 mb-1">
              CTA Body Text
            </label>
            <textarea
              id="ctaBody"
              rows={3}
              maxLength={500}
              placeholder="e.g. Our referral partnership programme offers collaborators 25% of our standard 1% conveyancing fee..."
              className={`${inputClass(false)} resize-y`}
              {...register('ctaBody')}
            />
          </div>
        </div>
      </div>

      {/* === REGISTRATION NOTE === */}
      <div>
        <h3 className="text-lg font-bold text-[#1a1a2e] mb-4 pb-2 border-b">Registration Section</h3>
        <div>
          <label htmlFor="registrationNote" className="block text-sm font-medium text-gray-700 mb-1">
            Registration Note
          </label>
          <textarea
            id="registrationNote"
            rows={3}
            maxLength={500}
            placeholder="e.g. This exclusive event is specifically designed for property professionals. Spaces are limited — register now to secure your attendance."
            className={`${inputClass(false)} resize-y`}
            {...register('registrationNote')}
          />
          <p className="mt-1 text-xs text-gray-500">Shown next to the registration form</p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4 border-t">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-[#c9a227] text-white rounded-lg hover:bg-[#b8921f] disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isSubmitting ? 'Saving...' : defaultValues ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </form>
  );
}

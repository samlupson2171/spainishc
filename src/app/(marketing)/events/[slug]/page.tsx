import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { getEventBySlug } from '@/lib/eventDb';
import RegistrationForm from '@/components/events/RegistrationForm';
import EventClosedBanner from '@/components/events/EventClosedBanner';
import { Calendar, Clock, MapPin, Users, TrendingUp, Handshake, BarChart3, ArrowRight } from 'lucide-react';

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

const HIGHLIGHT_ICONS = [BarChart3, TrendingUp, Handshake, Users];

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const event = await getEventBySlug(slug);

    if (!event) {
      return { title: 'Event Not Found | Spanish Conveyancing' };
    }

    return {
      title: `${event.title} | Spanish Conveyancing`,
      description: event.description.slice(0, 160),
      openGraph: {
        title: event.title,
        description: event.description.slice(0, 160),
        images: [event.heroImage || '/images/la-sala-venue.jpg'],
      },
    };
  } catch {
    return { title: 'Event | Spanish Conveyancing' };
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;

  let event;
  try {
    event = await getEventBySlug(slug);
  } catch {
    return (
      <section className="section bg-gray-50">
        <div className="r-container">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
            <p className="text-red-700 text-lg font-medium">
              Unable to load event details. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!event || event.status === 'draft') {
    notFound();
  }

  const eventDate = new Date(event.date);
  const now = new Date();
  const isEventPast = eventDate <= now;

  const formattedDate = eventDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: event.timezone,
  });

  const formattedTime = eventDate.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: event.timezone,
  });

  const heroImage = event.heroImage || '/images/la-sala-venue.jpg';
  const highlights = event.highlights && event.highlights.length > 0 ? event.highlights : null;
  const schedule = event.schedule && event.schedule.length > 0 ? event.schedule : null;

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={`${event.title} venue`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/90 to-[#1a1a2e]/70" />
        </div>
        <div className="r-container relative z-10 py-20">
          <div className="max-w-3xl">
            <p className="text-[#c9a227] font-semibold text-sm uppercase tracking-wider mb-4">
              Exclusive Complimentary Seminar
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
              {event.title}
            </h1>
            {event.subtitle && (
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                {event.subtitle}
              </p>
            )}

            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-[#c9a227]" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-[#c9a227]" />
                <span>{formattedTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-[#c9a227]" />
                <span>{event.location}</span>
              </div>
            </div>

            {!isEventPast && (
              <a href="#register" className="btn-accent inline-flex items-center gap-2 mt-8">
                Reserve Your Place <ArrowRight size={18} />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      {highlights && (
        <section className="section bg-white">
          <div className="r-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-4">
                Why <span className="text-[#c9a227]">Attend?</span>
              </h2>
              {event.description && (
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  {event.description}
                </p>
              )}
            </div>

            <div className={`grid md:grid-cols-2 ${highlights.length >= 4 ? 'lg:grid-cols-4' : highlights.length === 3 ? 'lg:grid-cols-3' : ''} gap-8`}>
              {highlights.map((highlight, index) => {
                const Icon = HIGHLIGHT_ICONS[index % HIGHLIGHT_ICONS.length];
                return (
                  <div key={index} className="text-center p-6">
                    <div className="w-16 h-16 bg-[#c9a227]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon size={32} className="text-[#c9a227]" />
                    </div>
                    <h3 className="font-bold text-[#1a1a2e] mb-2">{highlight.title}</h3>
                    <p className="text-gray-600 text-sm">{highlight.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {(event.aboutHeading || event.aboutBody) && (
        <section className="section bg-gray-50">
          <div className="r-container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-[#c9a227] font-semibold text-sm uppercase tracking-wider mb-3">About the Event</p>
                {event.aboutHeading && (
                  <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">
                    {event.aboutHeading}
                  </h2>
                )}
                {event.aboutBody && (
                  <div className="text-gray-700 space-y-4 leading-relaxed whitespace-pre-line">
                    {event.aboutBody}
                  </div>
                )}
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2d2d4a] rounded-2xl p-8 text-white">
                  <h3 className="text-xl font-bold mb-6 text-[#c9a227]">Event Schedule</h3>
                  <div className="space-y-6">
                    {schedule && schedule.length > 0 ? (
                      schedule.map((item, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="w-12 h-12 bg-[#c9a227]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Clock size={20} className="text-[#c9a227]" />
                          </div>
                          <div>
                            <p className="font-semibold">{item.time} – {item.title}</p>
                            <p className="text-gray-300 text-sm">{item.description}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="flex gap-4">
                          <div className="w-12 h-12 bg-[#c9a227]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Clock size={20} className="text-[#c9a227]" />
                          </div>
                          <div>
                            <p className="font-semibold">{formattedTime} – Seminar</p>
                            <p className="text-gray-300 text-sm">Educational presentations and insights</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-12 h-12 bg-[#c9a227]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin size={20} className="text-[#c9a227]" />
                          </div>
                          <div>
                            <p className="font-semibold">{event.location}</p>
                            <p className="text-gray-300 text-sm">{formattedDate}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      {(event.ctaHeading || event.ctaBody) && (
        <section className="bg-gradient-to-br from-[#1a1a2e] to-[#2d2d4a] py-16">
          <div className="r-container text-center">
            {event.ctaHeading && (
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {event.ctaHeading}
              </h2>
            )}
            {event.ctaBody && (
              <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                {event.ctaBody}
              </p>
            )}
            {!isEventPast && (
              <a href="#register" className="btn-accent inline-flex items-center gap-2">
                Learn More at the Event <ArrowRight size={18} />
              </a>
            )}
          </div>
        </section>
      )}

      {/* Registration Section */}
      <section id="register" className="section bg-gray-50">
        <div className="r-container max-w-4xl">
          {isEventPast ? (
            <EventClosedBanner />
          ) : (
            <div className="grid lg:grid-cols-5 gap-8 items-start">
              <div className="lg:col-span-2">
                <p className="text-[#c9a227] font-semibold text-sm uppercase tracking-wider mb-3">Limited Places</p>
                <h2 className="text-3xl font-bold text-[#1a1a2e] mb-4">
                  Reserve Your Place
                </h2>
                {event.registrationNote && (
                  <p className="text-gray-600 mb-6">{event.registrationNote}</p>
                )}
                <div className="space-y-4 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <Calendar size={18} className="text-[#c9a227] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800">{formattedDate}</p>
                      <p>{formattedTime}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-[#c9a227] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800">{event.location}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-[#c9a227]/10 rounded-lg border border-[#c9a227]/20">
                  <p className="text-sm text-[#1a1a2e] font-medium">✓ Complimentary attendance</p>
                  <p className="text-sm text-[#1a1a2e] font-medium mt-1">✓ Drinks & canapés included</p>
                  <p className="text-sm text-[#1a1a2e] font-medium mt-1">✓ Networking opportunity</p>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-[#1a1a2e] mb-6">Register Now</h3>
                  <RegistrationForm eventId={event._id} eventTitle={event.title} />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

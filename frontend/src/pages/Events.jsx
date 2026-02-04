import { useEffect, useState } from "react";
import EmailModal from "../components/EmailModal";
import { API } from "../api/api";
import { endpoints } from "../api/endpoints";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get(endpoints.events.list);
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-slate-900 mb-4"></div>
          <p className="text-xl font-light tracking-wide text-slate-600">
            Loading events...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-slate-900 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 animate-fade-in">
              Discover
              <br />
              <span className="text-emerald-400">
                Unforgettable
              </span>
              <br />
              Experiences
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-2xl leading-relaxed text-slate-300 animate-fade-in-delay">
              Curated events that inspire, connect, and transform. Your next
              adventure awaits.
            </p>
          </div>
        </div>

        {/* Events Grid */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          {events.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">🎭</div>
              <p className="text-2xl font-light text-slate-600">
                No events available at the moment
              </p>
              <p className="text-slate-500 mt-2">Check back soon for updates</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event, index) => (
                <div
                  key={event._id}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-slide-up border border-slate-200 flex flex-col"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Decorative accent */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="relative p-8 flex flex-col flex-1">
                    {/* Event number badge */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="mb-6">
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-emerald-600 transition-colors duration-300">
                        {event.title}
                      </h2>
                      
                      <div className="flex flex-col gap-2 mb-2">
                        {event.date && (
                          <div className="flex items-center gap-2 text-slate-600">
                            <svg
                              className="w-4 h-4 text-emerald-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <span className="text-sm font-medium">
                              {new Date(event.date).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        )}
                        
                        {event.location && (
                          <div className="flex items-center gap-2 text-slate-600">
                            <svg
                              className="w-4 h-4 text-emerald-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            <span className="text-sm font-medium">{event.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {event.description && (
                      <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">
                        {event.description}
                      </p>
                    )}

                    <button
                      className="relative w-full group/btn bg-slate-900 text-white font-bold py-4 px-8 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-emerald-600 mt-auto"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <svg
                          className="w-5 h-5 transition-transform group-hover/btn:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                          />
                        </svg>
                        GET TICKETS
                      </span>
                    </button>
                  </div>

                  {/* Bottom accent line */}
                  <div className="h-1 bg-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedEvent && (
        <EmailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  );
}
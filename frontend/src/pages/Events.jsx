import { useEffect, useState } from "react";
import EmailModal from "../components/EmailModal";
import { API } from "../api/api";
import { endpoints } from "../api/endpoints";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");


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

  const filteredEvents = events.filter((event) => {
    const query = searchQuery.toLowerCase();

    return (
      event.title?.toLowerCase().includes(query) ||
      event.location?.toLowerCase().includes(query) ||
      event.description?.toLowerCase().includes(query)
    );
  });


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

          {/* Search Bar */}
          <div className="mb-10">
            <div className="relative max-w-xl">
              <input
                type="text"
                placeholder="Search events by name, location, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-5 py-4 pr-12 text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              />
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m1.85-5.4a7.25 7.25 0 11-14.5 0 7.25 7.25 0 0114.5 0z"
                />
              </svg>
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">🎭</div>
              <p className="text-2xl font-light text-slate-600">
                No events available at the moment
              </p>
              <p className="text-slate-500 mt-2">Check back soon for updates</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event, index) => (
                <div
                  key={event._id}
                  className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-slide-up border border-slate-200 flex flex-col h-[500px]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* 🔥 Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: event.imageUrl
                        ? `url(${event.imageUrl})`
                        : "linear-gradient(to bottom right, #0f172a, #1e293b)",
                    }}
                  ></div>

                  {/* 🔥 Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>

                  {/* Event number badge */}
                  <div className="absolute top-4 right-4 z-20 w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-slate-900 font-bold shadow-lg">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 flex flex-col flex-1 text-white">
                    <div className="mb-4">
                      <h2 className="text-2xl font-bold mb-3 leading-tight group-hover:text-emerald-400 transition-colors duration-300">
                        {event.title}
                      </h2>

                      <div className="flex flex-col gap-2 text-sm text-slate-200">
                        {event.date && (
                          <span>
                            {new Date(event.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        )}

                        {event.location && (
                          <span>{event.location}</span>
                        )}
                      </div>
                    </div>

                    {event.description && (
                      <p className="text-slate-200 leading-relaxed mb-6 line-clamp-3">
                        {event.description}
                      </p>
                    )}

                    <button
                      className="mt-auto bg-white text-slate-900 font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:bg-emerald-500 hover:text-white hover:shadow-xl hover:scale-105"
                      onClick={() => setSelectedEvent(event)}
                    >
                      GET TICKETS
                    </button>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20"></div>
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
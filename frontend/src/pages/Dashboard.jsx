import { useEffect, useState } from "react";
import { API } from "../api/api";
import { endpoints } from "../api/endpoints";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, pending, imported
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // setLoading(true);
    API.get(endpoints.dashboard.events.list)
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch events", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const importEvent = async (id) => {
    try {
      await API.post(endpoints.dashboard.events.import(id));
      setEvents((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status: "imported" } : e))
      );
    } catch (err) {
      console.error("Failed to import event", err);
    }
  };

  const deleteEvent = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        // Uncomment when backend endpoint is ready
        // await API.delete(endpoints.dashboard.events.delete(id));
        setEvents((prev) => prev.filter((e) => e._id !== id));
      } catch (err) {
        console.error("Failed to delete event", err);
      }
    }
  };

  // Filter and search logic
  const filteredEvents = events.filter((event) => {
    const matchesFilter =
      filter === "all" || event.status === filter;
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Statistics
  const stats = {
    total: events.length,
    imported: events.filter((e) =>
        e.status?.includes("imported")
    ).length,
    pending: events.filter((e) =>
        e.status?.includes("pending")
    ).length,
    };


  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-900 mb-2">
            Dashboard
          </h1>
          <p className="text-slate-600">
            Manage and monitor your event imports
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                  Total Events
                </p>
                <p className="text-3xl font-black text-slate-900 mt-2">
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                  Imported
                </p>
                <p className="text-3xl font-black text-emerald-600 mt-2">
                  {stats.imported}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                  Pending
                </p>
                <p className="text-3xl font-black text-amber-600 mt-2">
                  {stats.pending}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-3 rounded-lg font-bold transition-all ${
                  filter === "all"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-4 py-3 rounded-lg font-bold transition-all ${
                  filter === "pending"
                    ? "bg-amber-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter("imported")}
                className={`px-4 py-3 rounded-lg font-bold transition-all ${
                  filter === "imported"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Imported
              </button>
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-slate-900"></div>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-xl font-bold text-slate-600 mb-2">
                No events found
              </p>
              <p className="text-slate-500">
                {searchQuery
                  ? "Try adjusting your search or filters"
                  : "Get started by adding your first event"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wide">
                      Title
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wide">
                      Status
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wide">
                      Date
                    </th>
                    <th className="text-right px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {filteredEvents.map((event) => {

                    const isImported = event.status?.includes("imported");
                    return (
                    <tr
                      key={event._id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">
                          {event.title}
                        </div>
                        {event.description && (
                          <div className="text-sm text-slate-500 mt-1 line-clamp-1">
                            {event.description}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${
                            event.status?.includes("imported")
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              event.status?.includes("imported")
                                ? "bg-emerald-600"
                                : "bg-amber-600"
                            }`}
                          ></span>
                          {event.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {event.date
                          ? new Date(event.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "—"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => importEvent(event._id)}
                            disabled={isImported}
                            className={`px-4 py-2 rounded-lg font-bold transition-all ${
                                isImported
                                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                : "bg-emerald-600 text-white hover:bg-emerald-700 hover:scale-105"
                            }`}
                            >
                            {isImported ? (
                                <span className="flex items-center gap-2">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                Imported
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                    />
                                </svg>
                                Import
                                </span>
                            )}
                            </button>


                          <button
                            onClick={() => deleteEvent(event._id)}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                            title="Delete event"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Results Summary */}
        {!loading && filteredEvents.length > 0 && (
          <div className="mt-4 text-center text-sm text-slate-600">
            Showing {filteredEvents.length} of {events.length} events
          </div>
        )}
      </div>
    </div>
  );
}
import { useState, useRef, useEffect } from "react";
import { Routes, Route, NavLink, useNavigate, useLocation } from "react-router-dom";
import Events from "./pages/Events";
import Dashboard from "./pages/Dashboard";
import LoginSuccess from "./pages/LoginSuccess";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {

  const navigate = useNavigate();
  const [userLoading, setUserLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => {
      !!localStorage.getItem("token");
      setUserLoading(false);
    }
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location.pathname]);


  const loginWithGoogle = () => {
    window.location.href =
      "http://localhost:5000/api/auth/google";
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };


  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <svg
                    className="w-7 h-7 text-white"
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
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-900">
                  EventHub
                </h1>
                <p className="text-xs text-slate-500 font-medium tracking-wide">
                  Where moments matter
                </p>
              </div>
            </NavLink>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { label: "Events", path: "/" },
                { label: "About", path: "/about" },
                { label: "Contact", path: "/contact" },
              ].map(({ label, path }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `relative text-sm font-bold tracking-wide transition-colors duration-300 ${
                      isActive
                        ? "text-slate-900"
                        : "text-slate-600 hover:text-slate-900"
                    }`
                  }
                >
                  {label}
                  <span className="absolute -bottom-6 left-0 right-0 h-1 bg-emerald-500 rounded-full opacity-0 data-[active=true]:opacity-100"></span>
                </NavLink>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block relative" ref={menuRef}>
              {userLoading ? (
                <div className="hidden md:flex items-center gap-3 px-6 py-3">
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 border-t-slate-900 animate-spin" />
                  <span className="text-sm font-semibold text-slate-500">
                    Checking session…
                  </span>
                </div>
              ) : !isLoggedIn ? (
                <button
                  onClick={loginWithGoogle}
                  className="relative group/cta bg-slate-900 text-white font-bold py-3 px-6 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-emerald-600 cursor-pointer"
                >
                  Log in with Google
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="flex items-center gap-2 bg-slate-900 text-white font-bold py-3 px-4 rounded-xl hover:bg-emerald-600 transition-all"
                  >
                    <span>Account</span>
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
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50">
                      <button
                        onClick={() => {
                          navigate("/dashboard");
                          setMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        Dashboard
                      </button>

                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-3 text-sm font-semibold text-red-600 hover:bg-slate-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative">
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* OAuth callback */}
          <Route path="/login/success" element={<LoginSuccess />} />

          {/* Protected Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

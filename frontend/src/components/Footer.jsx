function Footer() {
  return (
    <footer className="relative mt-20 bg-slate-900 text-white">
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
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
                <h3 className="text-2xl font-black">EventHub</h3>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-md">
                Connecting people through unforgettable experiences. Discover,
                attend, and create memories that last a lifetime.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-slate-300">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <button className="text-slate-400 hover:text-white transition-colors">
                    Browse Events
                  </button>
                </li>
                <li>
                  <button className="text-slate-400 hover:text-white transition-colors">
                    About Us
                  </button>
                </li>
                <li>
                  <button className="text-slate-400 hover:text-white transition-colors">
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-slate-300">
                Follow Us
              </h4>
              <div className="flex gap-3">
                {["Twitter", "Instagram", "Facebook"].map((social) => (
                  <button
                    key={social}
                    className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-emerald-500 flex items-center justify-center transition-all hover:scale-110"
                    aria-label={social}
                  >
                    <div className="w-5 h-5 bg-slate-600 rounded"></div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">
              © 2026 EventHub. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-400">
              <button className="hover:text-white transition-colors">
                Privacy Policy
              </button>
              <button className="hover:text-white transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>
  );
}

export default Footer;

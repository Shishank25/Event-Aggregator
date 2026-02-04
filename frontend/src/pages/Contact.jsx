export default function Contact() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-2xl text-center">
        <h2 className="text-5xl font-black mb-6 text-slate-900">
          Get in <span className="text-emerald-500">Touch</span>
        </h2>
        <p className="text-xl text-slate-600 leading-relaxed mb-8">
          Have questions? We'd love to hear from you. Send us a message and
          we'll respond as soon as possible.
        </p>
        <button className="bg-slate-900 text-white font-bold py-4 px-8 rounded-xl hover:shadow-xl hover:scale-105 hover:bg-emerald-600 transition-all duration-300">
          Contact Us
        </button>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Sparkles, Phone, Mail, MapPin, Check, Loader2 } from "lucide-react";

export default function Footer() {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const API_URL = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${API_URL}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Something went wrong. Please try again.");
      }
      setDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer id="js-contact" className="bg-jas-ink text-white">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid place-items-center w-9 h-9 rounded-full bg-jas-lime">
                <Sparkles size={18} className="text-jas-ink" />
              </span>
              <span className="font-bricolage text-2xl font-bold tracking-tight">
                JA Sparkle
              </span>
            </div>
            <p className="text-white/60 mt-4 max-w-xs leading-relaxed">
              Honest, dependable lawn care for Rocky Mount and the Coastal
              Plains of North Carolina.
            </p>
            <div className="mt-8 space-y-3 text-white/80">
              <a
                href="tel:+12523142894"
                className="flex items-center gap-3 hover:text-jas-lime transition"
              >
                <Phone size={18} className="text-jas-lime" /> +1 252 314 2894
              </a>
              <a
                href="mailto:jasparkle@proton.me"
                className="flex items-center gap-3 hover:text-jas-lime transition"
              >
                <Mail size={18} className="text-jas-lime" /> jasparkle@proton.me
              </a>
              <p className="flex items-start gap-3 text-white/70">
                <MapPin size={18} className="text-jas-lime mt-1" /> 541 Bills Ln,
                Rocky Mount, NC 27801-9113
              </p>
            </div>
          </div>

          <div>
            <p className="text-jas-lime text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Send us a message
            </p>
            {done ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-jas-lime mx-auto mb-4 grid place-items-center">
                  <Check size={22} className="text-jas-ink" />
                </div>
                <h4 className="font-bricolage text-white text-lg font-bold mb-2">
                  Message sent!
                </h4>
                <p className="text-white/60 text-sm">
                  We'll get back to you within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setDone(false);
                    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
                  }}
                  className="mt-6 px-5 py-2 rounded-full border border-white/20 text-white/80 text-sm font-medium hover:border-jas-lime hover:text-jas-lime transition"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-jas-lime/50 transition"
                    placeholder="Your name"
                  />
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-jas-lime/50 transition"
                    placeholder="you@email.com"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-jas-lime/50 transition"
                    placeholder="Phone (optional)"
                  />
                  <input
                    value={form.subject}
                    onChange={(e) => set("subject", e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-jas-lime/50 transition"
                    placeholder="Subject (optional)"
                  />
                </div>
                <textarea
                  required
                  rows="3"
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-jas-lime/50 transition resize-none"
                  placeholder="How can we help?"
                />
                {error && (
                  <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 rounded-full bg-jas-lime text-jas-ink font-bold text-sm hover:brightness-95 transition disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs uppercase tracking-wide text-white/40">
          <span>&copy; {new Date().getFullYear()} JA Sparkle LLC &middot; All Rights Reserved</span>
          <span>Licensed &amp; Insured &middot; Rocky Mount, NC</span>
        </div>
      </div>
    </footer>
  );
}

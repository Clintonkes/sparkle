import React, { useState } from "react";
import { Check, Phone, Mail, MapPin, Loader2 } from "lucide-react";

const OPTIONS = [
  "Weekly Mowing",
  "Bi-Weekly Mowing",
  "One-Time Cut",
  "Edging & Trimming",
  "Fertilization & Weed Control",
  "Seasonal Clean-Up",
];

const TIME_SLOTS = [
  { value: "morning", label: "Morning (8am - 12pm)" },
  { value: "afternoon", label: "Afternoon (12pm - 5pm)" },
  { value: "evening", label: "Evening (5pm - 8pm)" },
];

export default function Quote() {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    service: OPTIONS[0],
    preferred_date: "",
    preferred_time: "morning",
    notes: "",
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          address: form.address,
          frequency: form.service,
          preferred_date: form.preferred_date,
          preferred_time: form.preferred_time,
        }),
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
    <section id="js-quote" className="bg-white py-20 lg:py-28">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
        <div className="rounded-[2.5rem] overflow-hidden bg-jas-paper border border-jas-ink/8 grid lg:grid-cols-5">
          <div className="lg:col-span-2 bg-jas-ink p-8 lg:p-10 relative overflow-hidden">
            <span className="inline-flex items-center gap-2 text-jas-lime text-sm font-semibold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-jas-lime" /> Free
              Quote
            </span>
            <h2 className="font-bricolage text-white text-3xl md:text-4xl font-bold tracking-tight leading-[1.05]">
              Get your price in 24 hours.
            </h2>
            <p className="text-jas-lime/70 mt-4 leading-relaxed">
              Tell us about your property — we'll come take a look and send a
              straightforward quote.
            </p>
            <div className="mt-10 space-y-4 text-white/80">
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
              <p className="flex items-start gap-3">
                <MapPin size={18} className="text-jas-lime mt-1" /> 541 Bills Ln,
                Rocky Mount, NC 27801-9113
              </p>
            </div>
          </div>
          <div className="lg:col-span-3 p-8 lg:p-10">
            {done ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-jas-lime mx-auto mb-5 grid place-items-center">
                  <Check size={28} className="text-jas-ink" />
                </div>
                <h3 className="font-bricolage text-jas-ink text-2xl font-bold mb-2">
                  Thanks, {form.name || "neighbor"}!
                </h3>
                <p className="text-jas-ink/60">
                  We'll reach out within one business day to schedule your free
                  estimate.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="grid sm:grid-cols-2 gap-5">
                <Field label="Name">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className="jas-input"
                    placeholder="Your name"
                  />
                </Field>
                <Field label="Phone">
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className="jas-input"
                    placeholder="(252) 555-0100"
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className="jas-input"
                    placeholder="you@email.com"
                  />
                </Field>
                <Field label="Service">
                  <select
                    value={form.service}
                    onChange={(e) => set("service", e.target.value)}
                    className="jas-input"
                  >
                    {OPTIONS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Preferred Date">
                  <input
                    required
                    type="date"
                    value={form.preferred_date}
                    onChange={(e) => set("preferred_date", e.target.value)}
                    className="jas-input"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </Field>
                <Field label="Preferred Time">
                  <select
                    value={form.preferred_time}
                    onChange={(e) => set("preferred_time", e.target.value)}
                    className="jas-input"
                  >
                    {TIME_SLOTS.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Property Address">
                    <input
                      required
                      value={form.address}
                      onChange={(e) => set("address", e.target.value)}
                      className="jas-input"
                      placeholder="541 Bills Ln, Rocky Mount, NC 27801"
                    />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Notes (optional)">
                    <textarea
                      rows="3"
                      value={form.notes}
                      onChange={(e) => set("notes", e.target.value)}
                      className="jas-input"
                      placeholder="Lot size, gates, anything we should know…"
                    />
                  </Field>
                </div>
                {error && (
                  <div className="sm:col-span-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    {error}
                  </div>
                )}
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-jas-lime text-jas-ink font-bold hover:brightness-95 transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Sending…
                      </>
                    ) : (
                      "Request My Free Quote"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-jas-ink/60 text-xs font-semibold uppercase tracking-[0.12em] mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}
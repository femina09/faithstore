import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — FaithStore" },
      { name: "description", content: "Reach out to the FaithStore atelier — we'd love to hear from you." },
      { property: "og:title", content: "Contact — FaithStore" },
      { property: "og:description", content: "Reach out to the FaithStore atelier." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <div className="container-x py-16 md:py-24 grid lg:grid-cols-2 gap-16">
      <div>
        <div className="eyebrow">Get in touch</div>
        <h1 className="font-serif text-5xl md:text-6xl mt-3 leading-tight">We'd love<br />to hear from you.</h1>
        <p className="mt-6 text-muted-foreground max-w-md">Questions about a piece, a custom commission, or wholesale inquiries — our atelier reads every message.</p>

        <ul className="mt-10 space-y-5 text-sm">
          <li className="flex items-start gap-4"><Mail className="h-5 w-5 text-gold mt-0.5" /><span>hello@faithstore.shop</span></li>
          <li className="flex items-start gap-4"><Phone className="h-5 w-5 text-gold mt-0.5" /><span>+1 (212) 555-0184</span></li>
          <li className="flex items-start gap-4"><MapPin className="h-5 w-5 text-gold mt-0.5" /><span>The Atelier · 14 Cathedral Lane, NY 10013</span></li>
        </ul>
      </div>

      <div className="bg-cream p-8 md:p-12">
        {sent ? (
          <div className="text-center py-12">
            <CheckCircle2 className="h-12 w-12 text-gold mx-auto" />
            <h2 className="font-serif text-3xl mt-4">Thank you.</h2>
            <p className="mt-3 text-muted-foreground">Your message has been received. We typically reply within a day.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
            <h2 className="font-serif text-3xl mb-4">Send a message</h2>
            <label className="block">
              <span className="eyebrow !text-muted-foreground text-[10px]">Your name</span>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full bg-transparent border-b border-foreground/30 py-2.5 outline-none focus:border-gold" />
            </label>
            <label className="block">
              <span className="eyebrow !text-muted-foreground text-[10px]">Email</span>
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full bg-transparent border-b border-foreground/30 py-2.5 outline-none focus:border-gold" />
            </label>
            <label className="block">
              <span className="eyebrow !text-muted-foreground text-[10px]">Message</span>
              <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-2 w-full bg-transparent border-b border-foreground/30 py-2.5 outline-none focus:border-gold resize-none" />
            </label>
            <button type="submit" className="btn-ink w-full mt-4">Send message</button>
          </form>
        )}
      </div>
    </div>
  );
}

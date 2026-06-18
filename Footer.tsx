import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail } from "lucide-react";
import { CATEGORIES } from "@/lib/products";

export function Footer() {
  return (
    <footer className="bg-cream border-t border-border mt-24">
      <div className="container-x py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-serif text-2xl">Faith<span className="text-gold">Store</span></div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
            Handcrafted Christian decor and gifts, made to bring quiet inspiration into every home.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#" aria-label="Instagram" className="p-2 border border-border rounded-full hover:bg-gold hover:text-white hover:border-gold transition"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook" className="p-2 border border-border rounded-full hover:bg-gold hover:text-white hover:border-gold transition"><Facebook className="h-4 w-4" /></a>
            <a href="mailto:hello@faithstore.shop" aria-label="Email" className="p-2 border border-border rounded-full hover:bg-gold hover:text-white hover:border-gold transition"><Mail className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <div className="eyebrow mb-5">Shop</div>
          <ul className="space-y-3 text-sm">
            <li><Link to="/products" className="link-underline">All Products</Link></li>
            {CATEGORIES.slice(0, 6).map((c) => (
              <li key={c.slug}><Link to="/category/$slug" params={{ slug: c.slug }} className="link-underline">{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-5">Company</div>
          <ul className="space-y-3 text-sm">
            <li><Link to="/about" className="link-underline">Our Story</Link></li>
            <li><Link to="/contact" className="link-underline">Contact</Link></li>
            <li><Link to="/orders" className="link-underline">Order History</Link></li>
            <li><Link to="/wishlist" className="link-underline">Wishlist</Link></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-5">Newsletter</div>
          <p className="text-sm text-muted-foreground mb-4">Weekly reflections and quiet new arrivals.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex border-b border-foreground/40 pb-2">
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
            />
            <button className="text-xs tracking-[0.2em] uppercase text-gold hover:text-foreground transition">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-x py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} FaithStore. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

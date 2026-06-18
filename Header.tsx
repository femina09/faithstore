import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { CATEGORIES } from "@/lib/products";

export function Header() {
  const { cart, wishlist, user } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setSearchOpen(false); }, [path]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) navigate({ to: "/search", search: { q: q.trim() } });
  };

  return (
    <>
      <div className="bg-ink text-ivory text-[11px] tracking-[0.22em] uppercase">
        <div className="container-x flex items-center justify-center py-2.5 text-center">
          Complimentary shipping on orders over $75 · Handcrafted with reverence
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled ? "bg-ivory/90 backdrop-blur-md border-b border-border" : "bg-ivory border-b border-transparent"
        }`}
      >
        <div className="container-x grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4 md:py-5">
          <button
            className="lg:hidden -ml-2 p-2 text-foreground"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link to="/" className="justify-self-center lg:justify-self-start flex items-center gap-2">
            <span className="font-serif text-2xl md:text-[28px] tracking-tight text-foreground">
              Faith<span className="text-gold">Store</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-9 text-[12.5px] tracking-[0.18em] uppercase justify-center">
            <Link to="/" className="link-underline">Home</Link>
            <Link to="/products" className="link-underline">Shop All</Link>
            <Link to="/category/$slug" params={{ slug: "wall-hangings" }} className="link-underline">Decor</Link>
            <Link to="/category/$slug" params={{ slug: "bibles" }} className="link-underline">Bibles</Link>
            <Link to="/about" className="link-underline">About</Link>
            <Link to="/contact" className="link-underline">Contact</Link>
          </nav>

          <div className="flex items-center gap-1 md:gap-2 justify-self-end">
            <button onClick={() => setSearchOpen(true)} aria-label="Search" className="p-2 hover:text-gold transition">
              <Search className="h-[18px] w-[18px]" />
            </button>
            <Link to={user ? "/profile" : "/auth"} aria-label="Account" className="p-2 hover:text-gold transition hidden sm:inline-flex">
              <User className="h-[18px] w-[18px]" />
            </Link>
            <Link to="/wishlist" aria-label="Wishlist" className="p-2 hover:text-gold transition relative">
              <Heart className="h-[18px] w-[18px]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 text-[10px] bg-gold text-white rounded-full h-4 min-w-4 px-1 grid place-items-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" aria-label="Cart" className="p-2 hover:text-gold transition relative">
              <ShoppingBag className="h-[18px] w-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 text-[10px] bg-gold text-white rounded-full h-4 min-w-4 px-1 grid place-items-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm" onClick={() => setSearchOpen(false)}>
          <div className="bg-ivory border-b border-border" onClick={(e) => e.stopPropagation()}>
            <div className="container-x py-8">
              <form onSubmit={submitSearch} className="flex items-center gap-4 border-b border-foreground/40 pb-3">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search for crosses, statues, scripture frames..."
                  className="flex-1 bg-transparent outline-none text-lg font-serif placeholder:text-muted-foreground"
                />
                <button type="button" onClick={() => setSearchOpen(false)} className="p-2"><X className="h-5 w-5" /></button>
              </form>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="eyebrow mr-2">Popular</span>
                {["Crucifix", "Holy Family", "Angels", "Communion", "Bibles"].map((t) => (
                  <button
                    key={t}
                    onClick={() => { setQ(t); navigate({ to: "/search", search: { q: t } }); }}
                    className="px-3 py-1 text-xs border border-border rounded-full hover:bg-cream"
                  >{t}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-50 transition ${open ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} onClick={() => setOpen(false)} />
        <aside className={`absolute left-0 top-0 h-full w-[86%] max-w-sm bg-ivory shadow-2xl transition-transform duration-500 ${open ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex items-center justify-between px-6 py-5 border-b border-border">
            <span className="font-serif text-xl">Menu</span>
            <button onClick={() => setOpen(false)} className="p-2"><X className="h-5 w-5" /></button>
          </div>
          <nav className="px-6 py-6 flex flex-col gap-1 text-[15px]">
            <Link to="/" className="py-2.5 border-b border-border/60">Home</Link>
            <Link to="/products" className="py-2.5 border-b border-border/60">Shop All</Link>
            <div className="py-3 eyebrow">Collections</div>
            {CATEGORIES.map((c) => (
              <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} className="py-2 text-foreground/80">
                {c.name}
              </Link>
            ))}
            <div className="h-px bg-border my-4" />
            <Link to="/about" className="py-2">About</Link>
            <Link to="/contact" className="py-2">Contact</Link>
            <Link to={user ? "/profile" : "/auth"} className="py-2">{user ? "My Account" : "Sign In"}</Link>
            <Link to="/orders" className="py-2">Order History</Link>
          </nav>
        </aside>
      </div>
    </>
  );
}

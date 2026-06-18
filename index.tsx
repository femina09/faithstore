import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Shield, Sparkles, Truck } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS, IMAGES } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FaithStore — Handcrafted Christian Decor & Gifts" },
      { name: "description", content: "Discover premium handcrafted Christian wall hangings, scripture frames, statues, Bibles and meaningful gifts for every sacred occasion." },
      { property: "og:title", content: "FaithStore — Handcrafted Christian Decor" },
      { property: "og:description", content: "Premium Christian decor and gifts, made with reverence." },
      { property: "og:image", content: IMAGES.hero },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream">
        <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-16 md:py-24 lg:py-32">
          <div className="reveal">
            <div className="eyebrow">The Spring Collection · 2026</div>
            <h1 className="mt-5 font-serif text-[44px] sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              Sacred objects,<br />
              <span className="italic text-gold">quietly</span> crafted.
            </h1>
            <p className="mt-6 text-[15px] md:text-base text-muted-foreground max-w-md leading-relaxed">
              Heirloom-quality Christian decor and gifts — wall hangings, scripture art, statues and devotionals — finished by hand for the homes and moments that matter most.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/products" className="btn-ink">Shop The Collection <ArrowRight className="h-3.5 w-3.5" /></Link>
              <Link to="/about" className="btn-outline">Our Story</Link>
            </div>
            <div className="mt-12 flex items-center gap-8 text-[12px] tracking-[0.18em] uppercase text-muted-foreground">
              <div>★ 4.9 · 6,200 reviews</div>
              <div className="hidden sm:block">As featured in <em className="text-foreground not-italic font-serif text-base">Vogue Home</em></div>
            </div>
          </div>
          <div className="relative reveal">
            <div className="aspect-[4/5] relative overflow-hidden">
              <img src={IMAGES.hero} alt="Handcrafted walnut crucifix with gold accents on cream linen" width={1600} height={2000} className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-ivory border border-border p-5 max-w-[230px] hidden md:block shadow-xl">
              <div className="eyebrow">Bestseller</div>
              <div className="font-serif text-lg leading-tight mt-1">Sacred Heart Walnut Crucifix</div>
              <div className="mt-1 text-sm">$89 · <span className="line-through text-muted-foreground">$119</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES MARQUEE */}
      <section className="border-y border-border bg-ivory">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {[
            { icon: Truck, t: "Free shipping over $75" },
            { icon: Shield, t: "Lifetime craftsmanship" },
            { icon: Sparkles, t: "Hand-finished pieces" },
            { icon: Shield, t: "Secure checkout" },
          ].map(({ icon: I, t }, i) => (
            <div key={i} className="flex items-center justify-center gap-3 py-5 px-3 text-center">
              <I className="h-4 w-4 text-gold" />
              <span className="text-[11.5px] tracking-[0.18em] uppercase">{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-x py-20 md:py-28">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <div className="eyebrow">Collections</div>
            <h2 className="font-serif text-4xl md:text-5xl mt-3">Find your sacred piece.</h2>
          </div>
          <Link to="/products" className="hidden md:inline-flex link-underline text-sm tracking-[0.18em] uppercase">Shop all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
          {CATEGORIES.slice(0, 5).map((c, i) => (
            <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} className={`group relative overflow-hidden ${i === 0 ? "col-span-2 md:col-span-1 lg:col-span-2 aspect-[4/3] lg:aspect-[4/5]" : "aspect-[3/4]"}`}>
              <img src={c.image} alt={c.name} loading="lazy" width={800} height={1000} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-ivory">
                <div className="font-serif text-xl md:text-2xl">{c.name}</div>
                <div className="text-[11px] tracking-[0.18em] uppercase opacity-80 mt-1">{c.tagline}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container-x py-20 md:py-24">
        <div className="text-center max-w-2xl mx-auto">
          <div className="eyebrow">Most Loved</div>
          <h2 className="font-serif text-4xl md:text-5xl mt-3">Pieces our community treasures.</h2>
          <p className="mt-4 text-muted-foreground">A quiet edit of bestsellers — finished by hand and shipped with care.</p>
        </div>
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="mt-12 text-center">
          <Link to="/products" className="btn-outline">View All Products</Link>
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="bg-cream">
        <div className="container-x py-20 md:py-28 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="aspect-[4/3] overflow-hidden order-2 lg:order-1">
            <img src={IMAGES.lifestyle} alt="Warm ivory interior with framed scripture wall hanging" loading="lazy" width={1600} height={1200} className="h-full w-full object-cover" />
          </div>
          <div className="order-1 lg:order-2">
            <div className="eyebrow">Our Promise</div>
            <h2 className="font-serif text-4xl md:text-5xl mt-3 leading-[1.1]">Made slowly,<br /> meant to last generations.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
              Every FaithStore piece is finished by hand in small batches by artisans who share our belief that what we surround ourselves with shapes how we live. Reverence in materials. Restraint in design.
            </p>
            <Link to="/about" className="btn-ink mt-8">Read Our Story</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-x py-20 md:py-28">
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="eyebrow">Words from our community</div>
          <h2 className="font-serif text-4xl mt-3">Voices of faith.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: "Anna R.", t: "The crucifix arrived more beautiful than the photographs. A truly heirloom piece for our family." },
            { n: "Michael D.", t: "Gift-wrapping was exquisite. My mother cried when she opened the framed scripture for her birthday." },
            { n: "Priya G.", t: "The Holy Family set has become the centerpiece of our living room. Quietly powerful." },
          ].map((q, i) => (
            <figure key={i} className="bg-ivory border border-border p-8">
              <div className="text-gold text-lg">★★★★★</div>
              <blockquote className="font-serif text-lg leading-snug mt-4">"{q.t}"</blockquote>
              <figcaption className="mt-6 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">— {q.n}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-x pb-24">
        <div className="bg-ink text-ivory px-8 md:px-16 py-16 md:py-24 text-center">
          <div className="eyebrow !text-gold-soft">Stay Close</div>
          <h2 className="font-serif text-4xl md:text-5xl mt-4 max-w-2xl mx-auto">A quiet letter, once a week.</h2>
          <p className="mt-4 max-w-md mx-auto text-ivory/70">New pieces, scripture reflections and early access to limited releases.</p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" required placeholder="your@email.com" className="flex-1 bg-transparent border border-ivory/30 px-5 py-3.5 text-sm placeholder:text-ivory/40 focus:border-gold outline-none" />
            <button className="btn-gold">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { IMAGES } from "@/lib/products";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — FaithStore" },
      { name: "description", content: "FaithStore is a quiet atelier of handcrafted Christian decor and gifts, finished by artisans in small batches." },
      { property: "og:title", content: "Our Story — FaithStore" },
      { property: "og:description", content: "A quiet atelier of handcrafted Christian decor and gifts." },
      { property: "og:image", content: IMAGES.lifestyle },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="relative h-[50vh] min-h-[360px]">
        <img src={IMAGES.lifestyle} alt="FaithStore atelier" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-ink/30" />
        <div className="absolute inset-0 grid place-items-center text-ivory text-center px-6">
          <div>
            <div className="eyebrow !text-gold-soft">Our Story</div>
            <h1 className="font-serif text-5xl md:text-7xl mt-3">Quiet hands.<br />Sacred objects.</h1>
          </div>
        </div>
      </section>

      <section className="container-x py-20 md:py-28 grid lg:grid-cols-2 gap-16 items-start">
        <div className="lg:sticky lg:top-32">
          <div className="eyebrow">Founded in faith</div>
          <h2 className="font-serif text-4xl md:text-5xl mt-3 leading-tight">A small atelier with a quiet calling.</h2>
        </div>
        <div className="space-y-6 text-[15px] leading-relaxed text-muted-foreground">
          <p>FaithStore began with a single wooden crucifix made for a family member — and a belief that the objects we live alongside should carry meaning, intention, and the unmistakable touch of a human hand.</p>
          <p>Today our small atelier partners with artisans who share that conviction. Wood is sourced responsibly. Resins are cast in small molds. Calligraphy is finished by hand. Every piece is inspected, blessed, and packed with care before it is sent on its way to your home.</p>
          <p>We design slowly. We release rarely. And we believe that beautiful Christian decor should never feel mass-produced — because it never is.</p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-x py-20 grid md:grid-cols-3 gap-10 text-center">
          {[
            { n: "01", t: "Reverent materials", d: "Solid woods, fine porcelain, gilded resin — chosen for longevity." },
            { n: "02", t: "Hand-finished", d: "Every piece carries the small variations of human craft." },
            { n: "03", t: "Made to last", d: "Heirloom standards. Lifetime craftsmanship guarantee." },
          ].map((v) => (
            <div key={v.n}>
              <div className="font-serif text-5xl text-gold">{v.n}</div>
              <h3 className="font-serif text-2xl mt-3">{v.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-24 text-center">
        <h2 className="font-serif text-4xl md:text-5xl max-w-2xl mx-auto leading-tight">"What we surround ourselves with shapes the way we live."</h2>
        <Link to="/products" className="btn-ink mt-10">Shop The Collection</Link>
      </section>
    </div>
  );
}

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, ShoppingBag, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { getProduct, PRODUCTS } from "@/lib/products";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — FaithStore` },
          { name: "description", content: loaderData.product.description.slice(0, 155) },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:description", content: loaderData.product.description.slice(0, 155) },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <h1 className="font-serif text-4xl">Piece not found</h1>
      <Link to="/products" className="btn-ink mt-6">Browse the collection</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const wished = wishlist.includes(product.id);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addToCart(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div>
      <div className="container-x pt-8 text-xs tracking-[0.18em] uppercase text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/products" className="hover:text-foreground">Shop</Link> / <span className="text-foreground">{product.name}</span>
      </div>

      <section className="container-x py-10 md:py-14 grid lg:grid-cols-2 gap-10 lg:gap-20">
        <div className="bg-cream aspect-[4/5] overflow-hidden">
          <img src={product.image} alt={product.name} width={1200} height={1500} className="h-full w-full object-cover hover:scale-105 transition-transform duration-[1500ms]" />
        </div>

        <div>
          <div className="eyebrow">{product.category.replace("-", " ")}</div>
          <h1 className="font-serif text-4xl md:text-5xl mt-3 leading-tight">{product.name}</h1>
          <div className="mt-4 flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
            </span>
            <span className="text-muted-foreground">{product.rating.toFixed(1)} · {product.reviews} reviews</span>
          </div>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-serif text-3xl">${product.price}</span>
            {product.compareAt && <span className="text-muted-foreground line-through">${product.compareAt}</span>}
          </div>

          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          <ul className="mt-6 space-y-2 text-sm">
            {product.details.map((d: string) => (
              <li key={d} className="flex gap-3"><span className="text-gold">—</span>{d}</li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-10 h-12 hover:bg-cream">−</button>
              <span className="w-10 text-center">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="w-10 h-12 hover:bg-cream">+</button>
            </div>
            <button onClick={handleAdd} className="btn-ink flex-1">
              <ShoppingBag className="h-3.5 w-3.5" /> {added ? "Added to bag ✓" : "Add to bag"}
            </button>
            <button onClick={() => toggleWishlist(product.id)} aria-label="Wishlist" className="w-12 h-12 grid place-items-center border border-border hover:bg-cream">
              <Heart className={`h-4 w-4 ${wished ? "fill-gold text-gold" : ""}`} />
            </button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 pt-8 border-t border-border text-[11px] tracking-[0.18em] uppercase">
            <div className="flex flex-col items-center gap-2 text-center"><Truck className="h-4 w-4 text-gold" />Free over $75</div>
            <div className="flex flex-col items-center gap-2 text-center"><RotateCcw className="h-4 w-4 text-gold" />30-day returns</div>
            <div className="flex flex-col items-center gap-2 text-center"><Shield className="h-4 w-4 text-gold" />Lifetime craft</div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-x py-20">
          <div className="eyebrow text-center">You may also love</div>
          <h2 className="font-serif text-4xl text-center mt-3 mb-12">More from this collection</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}

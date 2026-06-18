import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const wished = wishlist.includes(product.id);

  return (
    <div className="group relative">
      <Link to="/products/$id" params={{ id: product.id }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-cream">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={800}
            height={1000}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-ivory/95 text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 border border-border">
              {product.badge}
            </span>
          )}
          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
            aria-label="Add to wishlist"
            className="absolute top-3 right-3 grid place-items-center h-9 w-9 bg-ivory/95 border border-border hover:bg-gold hover:text-white hover:border-gold transition rounded-full"
          >
            <Heart className={`h-4 w-4 ${wished ? "fill-gold text-gold" : ""}`} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); addToCart(product.id); }}
            className="absolute inset-x-3 bottom-3 btn-ink translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Add to Bag
          </button>
        </div>
      </Link>
      <div className="mt-4 px-0.5">
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <Star className="h-3 w-3 fill-gold text-gold" />
          <span>{product.rating.toFixed(1)}</span>
          <span>·</span>
          <span>{product.reviews} reviews</span>
        </div>
        <Link to="/products/$id" params={{ id: product.id }}>
          <h3 className="font-serif text-[17px] leading-snug mt-1.5 hover:text-gold transition">{product.name}</h3>
        </Link>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-[15px] font-medium">${product.price}</span>
          {product.compareAt && (
            <span className="text-xs text-muted-foreground line-through">${product.compareAt}</span>
          )}
        </div>
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useStore, useCartProducts } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Shopping Bag — FaithStore" }] }),
  component: CartPage,
});

function CartPage() {
  const items = useCartProducts();
  const { updateQty, removeFromCart } = useStore();
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 9;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container-x py-24 text-center min-h-[60vh]">
        <div className="eyebrow">Your bag</div>
        <h1 className="font-serif text-5xl mt-3">A quiet pause.</h1>
        <p className="mt-4 text-muted-foreground">Your bag is empty. Begin with our most-loved pieces.</p>
        <Link to="/products" className="btn-ink mt-8">Shop The Collection</Link>
      </div>
    );
  }

  return (
    <div className="container-x py-12 md:py-16">
      <div className="eyebrow">Your bag</div>
      <h1 className="font-serif text-4xl md:text-5xl mt-3">Shopping bag</h1>

      <div className="mt-10 grid lg:grid-cols-[1fr_360px] gap-10">
        <div className="space-y-6">
          {items.map(({ product, qty }) => (
            <div key={product.id} className="grid grid-cols-[100px_1fr_auto] md:grid-cols-[140px_1fr_auto] gap-5 pb-6 border-b border-border">
              <Link to="/products/$id" params={{ id: product.id }} className="aspect-square bg-cream overflow-hidden">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" width={280} height={280} loading="lazy" />
              </Link>
              <div className="min-w-0">
                <div className="eyebrow !text-muted-foreground">{product.category.replace("-", " ")}</div>
                <Link to="/products/$id" params={{ id: product.id }} className="font-serif text-lg md:text-xl block mt-1 truncate hover:text-gold">{product.name}</Link>
                <div className="mt-1 text-sm">${product.price}</div>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center border border-border">
                    <button onClick={() => updateQty(product.id, qty - 1)} className="w-8 h-9 hover:bg-cream">−</button>
                    <span className="w-8 text-center text-sm">{qty}</span>
                    <button onClick={() => updateQty(product.id, qty + 1)} className="w-8 h-9 hover:bg-cream">+</button>
                  </div>
                  <button onClick={() => removeFromCart(product.id)} className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1">
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </div>
              <div className="text-right font-medium">${(product.price * qty).toFixed(2)}</div>
            </div>
          ))}
        </div>

        <aside className="bg-cream p-8 h-fit lg:sticky lg:top-32">
          <div className="eyebrow">Order summary</div>
          <h2 className="font-serif text-2xl mt-2">Total</h2>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Complimentary" : `$${shipping.toFixed(2)}`}</span></div>
            <div className="border-t border-border pt-3 flex justify-between font-medium text-base"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
          <Link to="/checkout" className="btn-ink w-full mt-8">Proceed to checkout</Link>
          <Link to="/products" className="block text-center text-xs tracking-[0.18em] uppercase mt-4 link-underline">Continue shopping</Link>
        </aside>
      </div>
    </div>
  );
}

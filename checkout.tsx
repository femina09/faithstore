import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useStore, useCartProducts } from "@/lib/store";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — FaithStore" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const items = useCartProducts();
  const { placeOrder, user } = useStore();
  const navigate = useNavigate();
  const [placedId, setPlacedId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    zip: "",
    card: "",
    exp: "",
    cvv: "",
  });

  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 9;
  const total = subtotal + shipping;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = placeOrder({ name: form.name, address: form.address, city: form.city, zip: form.zip });
    setPlacedId(id);
  };

  if (placedId) {
    return (
      <div className="container-x py-24 text-center min-h-[60vh]">
        <CheckCircle2 className="h-14 w-14 text-gold mx-auto" />
        <div className="eyebrow mt-6">Order confirmed</div>
        <h1 className="font-serif text-5xl mt-3">Thank you.</h1>
        <p className="mt-4 text-muted-foreground">Your order <span className="text-foreground font-medium">{placedId}</span> has been placed.<br />A confirmation has been sent to {form.email || "your email"}.</p>
        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          <button onClick={() => navigate({ to: "/orders" })} className="btn-ink">View Orders</button>
          <Link to="/products" className="btn-outline">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-x py-24 text-center min-h-[60vh]">
        <h1 className="font-serif text-4xl">Your bag is empty</h1>
        <Link to="/products" className="btn-ink mt-6">Shop the collection</Link>
      </div>
    );
  }

  return (
    <div className="container-x py-12 md:py-16">
      <div className="eyebrow">Checkout</div>
      <h1 className="font-serif text-4xl md:text-5xl mt-3">Complete your order</h1>

      <form onSubmit={onSubmit} className="mt-10 grid lg:grid-cols-[1fr_400px] gap-10">
        <div className="space-y-10">
          <section>
            <h2 className="font-serif text-2xl mb-5">Contact & shipping</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <Input label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
              <Input label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} required className="sm:col-span-2" />
              <Input label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} required />
              <Input label="Zip / Postal" value={form.zip} onChange={(v) => setForm({ ...form, zip: v })} required />
            </div>
          </section>
          <section>
            <h2 className="font-serif text-2xl mb-5">Payment</h2>
            <p className="text-xs text-muted-foreground mb-4">Demo only — no real charge will be made.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Card number" value={form.card} onChange={(v) => setForm({ ...form, card: v })} placeholder="4242 4242 4242 4242" required className="sm:col-span-2" />
              <Input label="Expiry" value={form.exp} onChange={(v) => setForm({ ...form, exp: v })} placeholder="MM/YY" required />
              <Input label="CVV" value={form.cvv} onChange={(v) => setForm({ ...form, cvv: v })} placeholder="123" required />
            </div>
          </section>
        </div>

        <aside className="bg-cream p-8 h-fit lg:sticky lg:top-32">
          <div className="eyebrow">Summary</div>
          <div className="mt-5 space-y-4 max-h-64 overflow-y-auto pr-2">
            {items.map(({ product, qty }) => (
              <div key={product.id} className="flex gap-3 items-start text-sm">
                <img src={product.image} alt="" className="w-14 h-14 object-cover bg-ivory" width={56} height={56} loading="lazy" />
                <div className="flex-1 min-w-0">
                  <div className="font-serif text-[15px] truncate">{product.name}</div>
                  <div className="text-xs text-muted-foreground">Qty {qty}</div>
                </div>
                <div className="text-sm">${(product.price * qty).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-6 pt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Complimentary" : `$${shipping.toFixed(2)}`}</span></div>
            <div className="flex justify-between font-medium text-base pt-2 border-t border-border"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
          <button type="submit" className="btn-ink w-full mt-6">Place order</button>
        </aside>
      </form>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", placeholder, required, className = "" }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean; className?: string; }) {
  return (
    <label className={`block ${className}`}>
      <span className="eyebrow !text-muted-foreground text-[10px]">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full bg-transparent border-b border-foreground/30 py-2.5 outline-none focus:border-gold text-[15px]"
      />
    </label>
  );
}

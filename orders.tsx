import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "Order History — FaithStore" }] }),
  component: OrdersPage,
});

function OrdersPage() {
  const { orders } = useStore();

  if (orders.length === 0) {
    return (
      <div className="container-x py-24 text-center min-h-[60vh]">
        <div className="eyebrow">Order history</div>
        <h1 className="font-serif text-5xl mt-3">No orders yet.</h1>
        <p className="mt-3 text-muted-foreground">When you place an order it will appear here.</p>
        <Link to="/products" className="btn-ink mt-8">Start shopping</Link>
      </div>
    );
  }

  return (
    <div className="container-x py-16 min-h-[60vh]">
      <div className="eyebrow">Order history</div>
      <h1 className="font-serif text-5xl mt-3">Your orders</h1>

      <div className="mt-10 space-y-6">
        {orders.map((o) => (
          <div key={o.id} className="border border-border bg-card">
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-border bg-cream">
              <div>
                <div className="eyebrow !text-muted-foreground text-[10px]">Order</div>
                <div className="font-serif text-lg">{o.id}</div>
              </div>
              <div>
                <div className="eyebrow !text-muted-foreground text-[10px]">Date</div>
                <div className="text-sm">{new Date(o.date).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="eyebrow !text-muted-foreground text-[10px]">Status</div>
                <div className="text-sm text-gold">{o.status}</div>
              </div>
              <div>
                <div className="eyebrow !text-muted-foreground text-[10px]">Total</div>
                <div className="font-medium">${o.total.toFixed(2)}</div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {o.items.map((i) => (
                <div key={i.id} className="flex gap-4 items-center">
                  <img src={i.image} alt={i.name} className="w-16 h-16 object-cover bg-cream" width={64} height={64} loading="lazy" />
                  <div className="flex-1 min-w-0">
                    <div className="font-serif text-base truncate">{i.name}</div>
                    <div className="text-xs text-muted-foreground">Qty {i.qty} · ${i.price}</div>
                  </div>
                  <div className="text-sm">${(i.price * i.qty).toFixed(2)}</div>
                </div>
              ))}
              <div className="text-xs text-muted-foreground pt-3 border-t border-border">
                Shipping to {o.shipping.name} · {o.shipping.address}, {o.shipping.city} {o.shipping.zip}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

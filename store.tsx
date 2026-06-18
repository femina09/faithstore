import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "./products";

type CartItem = { id: string; qty: number };
type Order = {
  id: string;
  date: string;
  items: { id: string; name: string; qty: number; price: number; image: string }[];
  total: number;
  status: "Processing" | "Shipped" | "Delivered";
  shipping: { name: string; address: string; city: string; zip: string };
};
type User = { name: string; email: string };

type StoreState = {
  cart: CartItem[];
  wishlist: string[];
  user: User | null;
  orders: Order[];
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  login: (email: string, name?: string) => void;
  logout: () => void;
  placeOrder: (shipping: Order["shipping"]) => string;
};

const StoreCtx = createContext<StoreState | null>(null);

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setCart(read<CartItem[]>("fs.cart", []));
    setWishlist(read<string[]>("fs.wishlist", []));
    setUser(read<User | null>("fs.user", null));
    setOrders(read<Order[]>("fs.orders", []));
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) write("fs.cart", cart); }, [cart, hydrated]);
  useEffect(() => { if (hydrated) write("fs.wishlist", wishlist); }, [wishlist, hydrated]);
  useEffect(() => { if (hydrated) write("fs.user", user); }, [user, hydrated]);
  useEffect(() => { if (hydrated) write("fs.orders", orders); }, [orders, hydrated]);

  const value: StoreState = {
    cart, wishlist, user, orders,
    addToCart: (id, qty = 1) =>
      setCart((c) => {
        const found = c.find((i) => i.id === id);
        if (found) return c.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
        return [...c, { id, qty }];
      }),
    removeFromCart: (id) => setCart((c) => c.filter((i) => i.id !== id)),
    updateQty: (id, qty) =>
      setCart((c) => (qty <= 0 ? c.filter((i) => i.id !== id) : c.map((i) => (i.id === id ? { ...i, qty } : i)))),
    clearCart: () => setCart([]),
    toggleWishlist: (id) =>
      setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id])),
    login: (email, name) => setUser({ email, name: name || email.split("@")[0] }),
    logout: () => setUser(null),
    placeOrder: (shipping) => {
      const items = cart.map((ci) => {
        const p = PRODUCTS.find((x) => x.id === ci.id)!;
        return { id: p.id, name: p.name, qty: ci.qty, price: p.price, image: p.image };
      });
      const total = items.reduce((s, i) => s + i.price * i.qty, 0);
      const id = "FS-" + Math.random().toString(36).slice(2, 8).toUpperCase();
      const order: Order = { id, date: new Date().toISOString(), items, total, status: "Processing", shipping };
      setOrders((o) => [order, ...o]);
      setCart([]);
      return id;
    },
  };

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export function useCartProducts(): { product: Product; qty: number }[] {
  const { cart } = useStore();
  return cart
    .map((ci) => {
      const product = PRODUCTS.find((p) => p.id === ci.id);
      return product ? { product, qty: ci.qty } : null;
    })
    .filter(Boolean) as { product: Product; qty: number }[];
}

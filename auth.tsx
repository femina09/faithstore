import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign In — FaithStore" }] }),
  component: AuthPage,
});

function AuthPage() {
  const { login } = useStore();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) return;
    login(form.email, mode === "register" ? form.name : undefined);
    navigate({ to: "/profile" });
  };

  return (
    <div className="container-x py-16 md:py-24 grid lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
      <div className="hidden lg:block">
        <div className="eyebrow">Welcome</div>
        <h1 className="font-serif text-6xl mt-3 leading-tight">A sanctuary<br />for the things<br />you love.</h1>
        <p className="mt-6 text-muted-foreground max-w-md">Save pieces to your wishlist, track orders, and receive quiet reflections each week.</p>
      </div>
      <div className="bg-cream p-8 md:p-12">
        <div className="flex gap-6 mb-8 text-sm">
          <button onClick={() => setMode("login")} className={`pb-2 tracking-[0.18em] uppercase text-xs border-b-2 ${mode === "login" ? "border-gold text-foreground" : "border-transparent text-muted-foreground"}`}>Sign In</button>
          <button onClick={() => setMode("register")} className={`pb-2 tracking-[0.18em] uppercase text-xs border-b-2 ${mode === "register" ? "border-gold text-foreground" : "border-transparent text-muted-foreground"}`}>Create Account</button>
        </div>
        <h2 className="font-serif text-3xl">{mode === "login" ? "Welcome back" : "Join FaithStore"}</h2>
        <form onSubmit={submit} className="mt-6 space-y-5">
          {mode === "register" && (
            <label className="block">
              <span className="eyebrow !text-muted-foreground text-[10px]">Full name</span>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="mt-2 w-full bg-transparent border-b border-foreground/30 py-2.5 outline-none focus:border-gold" />
            </label>
          )}
          <label className="block">
            <span className="eyebrow !text-muted-foreground text-[10px]">Email</span>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="mt-2 w-full bg-transparent border-b border-foreground/30 py-2.5 outline-none focus:border-gold" />
          </label>
          <label className="block">
            <span className="eyebrow !text-muted-foreground text-[10px]">Password</span>
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required className="mt-2 w-full bg-transparent border-b border-foreground/30 py-2.5 outline-none focus:border-gold" />
          </label>
          <button type="submit" className="btn-ink w-full mt-4">{mode === "login" ? "Sign in" : "Create account"}</button>
          {mode === "login" && <Link to="/" className="block text-xs text-center text-muted-foreground link-underline">Forgot password?</Link>}
        </form>
      </div>
    </div>
  );
}

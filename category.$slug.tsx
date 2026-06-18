import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CATEGORIES, getByCategory } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = CATEGORIES.find((c) => c.slug === params.slug);
    if (!category) throw notFound();
    return { category, products: getByCategory(params.slug) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.category.name} — FaithStore` },
          { name: "description", content: `${loaderData.category.name}: ${loaderData.category.tagline}. Handcrafted Christian decor and gifts from FaithStore.` },
          { property: "og:title", content: `${loaderData.category.name} — FaithStore` },
          { property: "og:description", content: loaderData.category.tagline },
          { property: "og:image", content: loaderData.category.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <h1 className="font-serif text-4xl">Category not found</h1>
      <Link to="/products" className="btn-ink mt-6">Shop all</Link>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category, products } = Route.useLoaderData();
  return (
    <div>
      <section className="relative h-[42vh] md:h-[52vh] min-h-[320px] overflow-hidden">
        <img src={category.image} alt={category.name} className="absolute inset-0 h-full w-full object-cover" width={1600} height={900} />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="absolute inset-0 grid place-items-center text-center text-ivory px-6">
          <div>
            <div className="eyebrow !text-gold-soft">Collection</div>
            <h1 className="font-serif text-5xl md:text-7xl mt-3">{category.name}</h1>
            <p className="mt-3 text-ivory/80 max-w-md mx-auto">{category.tagline}</p>
          </div>
        </div>
      </section>

      <div className="container-x py-16">
        {products.length === 0 ? (
          <p className="text-center py-20 text-muted-foreground">No pieces in this collection yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
            {products.map((p: import("@/lib/products").Product) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}

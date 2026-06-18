import hero from "@/assets/hero-cross.jpg";
import wallHanging from "@/assets/wall-hanging.jpg";
import angel from "@/assets/angel.jpg";
import holyFamily from "@/assets/holy-family.jpg";
import tabletop from "@/assets/tabletop.jpg";
import resinFrame from "@/assets/resin-frame.jpg";
import magnet from "@/assets/magnet.jpg";
import saint from "@/assets/saint.jpg";
import bible from "@/assets/bible.jpg";
import kids from "@/assets/kids.jpg";
import communion from "@/assets/communion.jpg";
import lifestyle from "@/assets/lifestyle.jpg";

export const IMAGES = {
  hero,
  wallHanging,
  angel,
  holyFamily,
  tabletop,
  resinFrame,
  magnet,
  saint,
  bible,
  kids,
  communion,
  lifestyle,
};

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
};

export const CATEGORIES: Category[] = [
  { slug: "wall-hangings", name: "Wall Hangings", tagline: "Scripture for sacred walls", image: wallHanging },
  { slug: "tabletops", name: "Table Tops", tagline: "Inspiration at every glance", image: tabletop },
  { slug: "angels", name: "Angels Collection", tagline: "Guardians of grace", image: angel },
  { slug: "holy-family", name: "Holy Family", tagline: "The blessing of home", image: holyFamily },
  { slug: "saints", name: "Saints Collection", tagline: "Devotion in form", image: saint },
  { slug: "frames", name: "Resin Frames", tagline: "Verses, beautifully kept", image: resinFrame },
  { slug: "magnets", name: "Magnets", tagline: "Daily reminders of faith", image: magnet },
  { slug: "communion", name: "Holy Communion", tagline: "Keepsakes of a sacred day", image: communion },
  { slug: "bibles", name: "Bibles & Devotionals", tagline: "The living word", image: bible },
  { slug: "kids", name: "Kids Collection", tagline: "Faith from the very start", image: kids },
];

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  details: string[];
  badge?: "New" | "Bestseller" | "Limited";
  featured?: boolean;
};

const D = "Crafted with reverence by skilled artisans, this piece is designed to bring quiet inspiration into your everyday spaces. Each item is finished by hand, making every piece subtly unique.";

export const PRODUCTS: Product[] = [
  { id: "p01", name: "Sacred Heart Walnut Crucifix", category: "wall-hangings", price: 89, compareAt: 119, rating: 4.9, reviews: 218, image: hero, description: D, details: ["Hand-finished walnut", "Brass crucifix inlay", "30 × 18 cm", "Wall-mount ready"], badge: "Bestseller", featured: true },
  { id: "p02", name: "Trust In The Lord — Tabletop", category: "tabletops", price: 42, rating: 4.8, reviews: 142, image: tabletop, description: D, details: ["Solid acacia wood", "Gold-leaf calligraphy", "24 × 12 cm"], featured: true },
  { id: "p03", name: "Guardian Angel Porcelain Figure", category: "angels", price: 76, rating: 4.9, reviews: 96, image: angel, description: D, details: ["Glazed porcelain", "Gold wing detail", "Height 22 cm"], badge: "New", featured: true },
  { id: "p04", name: "Holy Family Nativity Set", category: "holy-family", price: 145, compareAt: 175, rating: 5.0, reviews: 64, image: holyFamily, description: D, details: ["Cast resin, hand-painted", "5-piece set", "Wooden stable included"], badge: "Limited", featured: true },
  { id: "p05", name: "The Lord's Prayer Resin Frame", category: "frames", price: 38, rating: 4.7, reviews: 311, image: resinFrame, description: D, details: ["Gilded resin frame", "Hand-lettered print", "20 × 25 cm"], featured: true },
  { id: "p06", name: "Faith • Hope • Love Magnet Set", category: "magnets", price: 18, rating: 4.6, reviews: 502, image: magnet, description: D, details: ["Set of 3", "Ceramic with gold foil", "6 cm each"] },
  { id: "p07", name: "Saint Michael Standing Statue", category: "saints", price: 198, rating: 4.9, reviews: 47, image: saint, description: D, details: ["Hand-cast resin", "Gilded armor detail", "Height 38 cm"], featured: true },
  { id: "p08", name: "Heirloom Leather Study Bible", category: "bibles", price: 94, rating: 4.9, reviews: 1284, image: bible, description: D, details: ["Genuine leather", "Gilt-edged pages", "Ribbon markers"], badge: "Bestseller" },
  { id: "p09", name: "Little Lamb Baptism Gift Set", category: "kids", price: 56, rating: 4.8, reviews: 188, image: kids, description: D, details: ["Plush lamb", "Wooden cross keepsake", "Gift-wrapped"], featured: true },
  { id: "p10", name: "First Communion Chalice Keepsake", category: "communion", price: 72, rating: 4.9, reviews: 78, image: communion, description: D, details: ["White porcelain", "Gold rim", "Includes wooden rosary"] },
  { id: "p11", name: "As For Me & My House — Wall Plaque", category: "wall-hangings", price: 64, rating: 4.8, reviews: 256, image: wallHanging, description: D, details: ["Reclaimed pine", "Brass hangers", "40 × 25 cm"] },
  { id: "p12", name: "Joshua 24:15 Tabletop Verse", category: "tabletops", price: 34, rating: 4.7, reviews: 91, image: tabletop, description: D, details: ["Solid oak", "Engraved gold script"] },
  { id: "p13", name: "Praying Angel Mini Statue", category: "angels", price: 48, rating: 4.7, reviews: 73, image: angel, description: D, details: ["Bone-china finish", "Height 14 cm"] },
  { id: "p14", name: "Blessed Family Standing Sign", category: "holy-family", price: 58, rating: 4.8, reviews: 134, image: holyFamily, description: D, details: ["Cream resin", "Gold accent"] },
  { id: "p15", name: "John 3:16 Gilded Frame", category: "frames", price: 44, compareAt: 58, rating: 4.9, reviews: 402, image: resinFrame, description: D, details: ["Gold leaf border", "Easel back"], badge: "Bestseller" },
  { id: "p16", name: "God Is Good — Round Magnet", category: "magnets", price: 9, rating: 4.6, reviews: 220, image: magnet, description: D, details: ["Ceramic, 5 cm"] },
  { id: "p17", name: "Saint Therese Devotional Statue", category: "saints", price: 124, rating: 4.9, reviews: 38, image: saint, description: D, details: ["Hand-painted resin", "Height 30 cm"] },
  { id: "p18", name: "Pocket Edition Daily Devotional", category: "bibles", price: 28, rating: 4.7, reviews: 612, image: bible, description: D, details: ["Soft cover", "365 reflections"] },
  { id: "p19", name: "My First Prayer Book — Kids", category: "kids", price: 22, rating: 4.8, reviews: 442, image: kids, description: D, details: ["Hardcover", "Illustrated"] },
  { id: "p20", name: "Communion Rosary in Velvet Pouch", category: "communion", price: 39, rating: 4.9, reviews: 211, image: communion, description: D, details: ["Pearl & gold beads", "Velvet pouch"] },
];

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}
export function getByCategory(slug: string) {
  return PRODUCTS.filter((p) => p.category === slug);
}
export function searchProducts(q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(s) ||
      p.category.toLowerCase().includes(s) ||
      p.description.toLowerCase().includes(s)
  );
}

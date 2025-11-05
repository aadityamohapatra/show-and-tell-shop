import React, { useEffect, useMemo, useState } from "react";

const PLACEHOLDER_BRAND = "Jyoti's World";

const DEFAULTS = {
  MIN_PRICE: 0,
  MAX_PRICE: 5000,
};

// Base mock products
const BASE_PRODUCTS = [
  {
    id: "p1",
    title: "Ribbed Bodycon Mini Dress",
    brand: "Velora",
    price: 1799,
    rating: 4.4,
    reviews: 312,
    colors: ["Black", "Red", "Olive"],
    sizes: ["XS", "S", "M", "L"],
    tags: ["mini", "party", "bodycon", "sleek"],
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=900&auto=format&fit=crop",
    inStock: true,
    merchant: "DressHub",
  },
  {
    id: "p2",
    title: "Cut-out Satin Slip Dress",
    brand: "Atria",
    price: 2499,
    rating: 4.6,
    reviews: 118,
    colors: ["Emerald", "Black"],
    sizes: ["S", "M", "L"],
    tags: ["midi", "satin", "evening", "cutout"],
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900&auto=format&fit=crop",
    inStock: true,
    merchant: "GlamKart",
  },
];

const formatINR = (n) => `₹${n.toLocaleString("en-IN")}`;

function Chip({ children, active }) {
  return (
    <span
      className={
        "inline-flex items-center px-3 py-1 rounded-full border text-sm " +
        (active ? "bg-black text-white border-black" : "border-gray-300")
      }
    >
      {children}
    </span>
  );
}

function Checkbox({ label, checked, onChange, count }) {
  return (
    <label className="flex items-center justify-between gap-2 py-1 cursor-pointer">
      <span className="flex items-center gap-2">
        <input
          type="checkbox"
          className="w-4 h-4"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span>{label}</span>
      </span>
      {typeof count === "number" && (
        <span className="text-xs text-gray-500">{count}</span>
      )}
    </label>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select
      className="w-full border rounded-lg p-2"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function ProductCard({ p }) {
  return (
    <a
      href={p.url || "#"}
      target={p.url ? "_blank" : undefined}
      rel="noreferrer"
      className="group block border rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform"
          loading="lazy"
        />
      </div>
      <div className="p-3 space-y-1">
        <div className="text-sm text-gray-500">{p.brand}</div>
        <div className="font-medium leading-snug line-clamp-2">{p.title}</div>
        <div className="flex items-center justify-between pt-1">
          <div className="font-semibold">{formatINR(p.price)}</div>
          <div className="text-xs text-gray-500">
            ⭐ {p.rating ?? "—"} {p.reviews ? `· ${p.reviews}` : ""}
          </div>
        </div>
        {p.inStock === false && (
          <div className="text-xs text-rose-600 font-medium">Out of stock</div>
        )}
      </div>
    </a>
  );
}

function AddProductPanel({ onAdd }) {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("Custom");
  const [price, setPrice] = useState(1999);
  const [imageURL, setImageURL] = useState("");
  const [file, setFile] = useState(null);

  const [rating, setRating] = useState("");
  const [inStock, setInStock] = useState(true);

  function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setImageURL(URL.createObjectURL(f)); // local preview link
  }

  function add() {
    if (!title || (!imageURL && !file)) return;
    const p = {
      id: "custom-" + Math.random().toString(36).slice(2, 9),
      title,
      brand,
      price: Number(price) || 0,
      rating: rating ? Number(rating) : undefined,
      image: imageURL,
      inStock,
      merchant: PLACEHOLDER_BRAND,
      tags: [],
      sizes: [],
      colors: [],
    };
    onAdd(p);
    setTitle(""); setBrand("Custom"); setPrice(1999); setImageURL(""); setFile(null); setRating("");
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs">Title</label>
          <input className="w-full border rounded-lg p-2" value={title} onChange={e=>setTitle(e.target.value)} placeholder="My Outfit Name"/>
        </div>
        <div>
          <label className="text-xs">Brand</label>
          <input className="w-full border rounded-lg p-2" value={brand} onChange={e=>setBrand(e.target.value)} />
        </div>
        <div>
          <label className="text-xs">Price (₹)</label>
          <input type="number" className="w-full border rounded-lg p-2" value={price} onChange={e=>setPrice(e.target.value)} />
        </div>
        <div>
          <label className="text-xs">Rating (optional)</label>
          <input type="number" step="0.1" className="w-full border rounded-lg p-2" value={rating} onChange={e=>setRating(e.target.value)} />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-xs">Image</label>
        <input type="url" placeholder="https://…" className="w-full border rounded-lg p-2" value={imageURL.startsWith('blob:')?'':imageURL} onChange={e=>setImageURL(e.target.value)} />
        <div className="text-center text-xs text-gray-500">— or —</div>
        <input type="file" accept="image/*" onChange={handleFile} />
        {imageURL && (<img src={imageURL} alt="preview" className="mt-2 w-full rounded-lg border" />)}
      </div>
      <label className="flex items-center gap-2">
        <input type="checkbox" className="w-4 h-4" checked={inStock} onChange={e=>setInStock(e.target.checked)} />
        In stock
      </label>
      <button onClick={add} className="w-full rounded-xl bg-black text-white py-2">Add Product</button>
      <p className="text-xs text-gray-500">Tip: Added items are saved to your browser (local only) so you can demo without a backend.</p>
    </div>
  );
}

export default function App() {
  const [brandName, setBrandName] = useState(PLACEHOLDER_BRAND);

  // Search/filter state
  const [q, setQ] = useState("");
  const [brands, setBrands] = useState([]);
  const [minP, setMinP] = useState(DEFAULTS.MIN_PRICE);
  const [maxP, setMaxP] = useState(DEFAULTS.MAX_PRICE);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState("relevance");

  const [showAdd, setShowAdd] = useState(false);
  const [customs, setCustoms] = useState([]);

  // Load/save customs in localStorage
  useEffect(() => {
    const saved = localStorage.getItem("custom_products");
    if (saved) setCustoms(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem("custom_products", JSON.stringify(customs));
  }, [customs]);

  // Initialize from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQ(params.get("q") || "");
    setBrands(params.get("brands")?.split(",").filter(Boolean) || []);
    setMinP(Number(params.get("minP") || DEFAULTS.MIN_PRICE));
    setMaxP(Number(params.get("maxP") || DEFAULTS.MAX_PRICE));
    setInStockOnly(params.get("inStock") === "1");
    setSort(params.get("sort") || "relevance");
    setBrandName(params.get("brand") || PLACEHOLDER_BRAND);
  }, []);

  // Push to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (brands.length) params.set("brands", brands.join(","));
    if (minP !== DEFAULTS.MIN_PRICE) params.set("minP", String(minP));
    if (maxP !== DEFAULTS.MAX_PRICE) params.set("maxP", String(maxP));
    if (inStockOnly) params.set("inStock", "1");
    if (sort !== "relevance") params.set("sort", sort);
    if (brandName !== PLACEHOLDER_BRAND) params.set("brand", brandName);
    const qs = params.toString();
    const url = qs ? `?${qs}` : window.location.pathname;
    window.history.replaceState(null, "", url);
  }, [q, brands, minP, maxP, inStockOnly, sort, brandName]);

  const ALL_PRODUCTS = useMemo(() => [...BASE_PRODUCTS, ...customs], [customs]);
  const allBrands = useMemo(() => Array.from(new Set(ALL_PRODUCTS.map(p=>p.brand))), [ALL_PRODUCTS]);

  const results = useMemo(() => {
    let list = [...ALL_PRODUCTS];
    if (q) {
      const needle = q.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(needle) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(needle))) ||
          p.brand.toLowerCase().includes(needle)
      );
    }
    if (brands.length) list = list.filter((p) => brands.includes(p.brand));
    list = list.filter((p) => p.price >= minP && p.price <= maxP);
    if (inStockOnly) list = list.filter((p) => p.inStock !== false);

    switch (sort) {
      case "priceAsc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      default:
        list.sort((a, b) => {
          const score = (p) => {
            let s = (p.rating ?? 0) * 10;
            if (q) {
              const n = q.toLowerCase();
              if (p.title.toLowerCase().includes(n)) s += 5;
              if (p.tags?.some((t) => t.toLowerCase().includes(n))) s += 3;
              if (p.brand.toLowerCase().includes(n)) s += 2;
            }
            return s;
          };
          return score(b) - score(a);
        });
    }
    return list;
  }, [q, brands, minP, maxP, inStockOnly, sort, ALL_PRODUCTS]);

  const brandCounts = useMemo(() => {
    const counts = Object.fromEntries(allBrands.map((b) => [b, 0]));
    for (const p of results) counts[p.brand] = (counts[p.brand] || 0) + 1;
    return counts;
  }, [results, allBrands]);

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <img src="/logo.svg" alt="logo" className="h-7 w-auto" />
          <input
            value={brandName}
            onChange={(e)=>setBrandName(e.target.value)}
            className="text-xl font-bold tracking-tight border rounded-md px-2 py-1 w-48"
            title="Edit your site name"
          />
          <div className="flex-1">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search dresses, tags, brands…"
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2"
            />
          </div>
          <button className="rounded-xl border px-3 py-2" onClick={()=>setShowAdd(s=>!s)}>
            {showAdd ? "Close Add" : "Add Product"}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        <aside className="md:col-span-3 space-y-6">
          <section className="border rounded-2xl p-4">
            <div className="font-semibold mb-2">Sort</div>
            <Select
              value={sort}
              onChange={setSort}
              options={[
                { value: "relevance", label: "Relevance" },
                { value: "priceAsc", label: "Price: Low to High" },
                { value: "priceDesc", label: "Price: High to Low" },
                { value: "rating", label: "Rating" },
              ]}
            />
          </section>

          <section className="border rounded-2xl p-4">
            <div className="font-semibold mb-2">Brands</div>
            <div className="space-y-1">
              {allBrands.map((b) => (
                <Checkbox
                  key={b}
                  label={b}
                  checked={brands.includes(b)}
                  count={brandCounts[b]}
                  onChange={(ck) =>
                    setBrands((prev) =>
                      ck ? [...prev, b] : prev.filter((x) => x !== b)
                    )
                  }
                />
              ))}
            </div>
            {brands.length > 0 && (
              <button
                className="mt-2 text-sm underline"
                onClick={() => setBrands([])}
              >
                Clear brands
              </button>
            )}
          </section>

          <section className="border rounded-2xl p-4">
            <div className="font-semibold mb-2">Price</div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-gray-600">Min</label>
                <input
                  type="number"
                  min={DEFAULTS.MIN_PRICE}
                  max={maxP}
                  value={minP}
                  onChange={(e) => setMinP(Number(e.target.value))}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Max</label>
                <input
                  type="number"
                  min={minP}
                  max={DEFAULTS.MAX_PRICE}
                  value={maxP}
                  onChange={(e) => setMaxP(Number(e.target.value))}
                  className="w-full border rounded-lg p-2"
                />
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Range: {formatINR(minP)} – {formatINR(maxP)}
            </div>
          </section>

          {showAdd && (
            <section className="border rounded-2xl p-4">
              <div className="font-semibold mb-2">Add Product (no backend)</div>
              <AddProductPanel onAdd={(p)=>setCustoms(prev=>[p, ...prev])} />
            </section>
          )}
        </aside>

        <section className="md:col-span-9">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-600">
              {results.length} result{results.length !== 1 ? "s" : ""}
              {q && (
                <>
                  {" "}for <span className="font-medium">“{q}”</span>
                </>
              )}
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
              <span>Share this search</span>
              <button
                className="underline"
                onClick={() => navigator.clipboard.writeText(window.location.href)}
              >
                Copy link
              </button>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="border rounded-2xl p-10 text-center">
              <div className="text-lg font-semibold mb-1">No results</div>
              <div className="text-gray-600">
                Try removing filters or different keywords.
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t py-8 text-center text-sm text-gray-500">
        Built with React + Tailwind • Client-only demo • Edit the brand name in the header ↑
      </footer>
    </div>
  );
}

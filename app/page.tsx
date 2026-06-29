"use client";
 
import { useState, useMemo } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  LayoutGrid, ShoppingBag, Package, Users, BarChart3, Settings,
  Search, Sun, Moon, TrendingUp, TrendingDown, ArrowUpRight,
} from "lucide-react";


const THEMES = {
  light: {
    bg: "#F7F6F3", surface: "#FFFFFF", surfaceAlt: "#FBFAF7",
    ink: "#15211E", muted: "#6B7771", border: "#E8E6E0",
    primary: "#0E7C66", primarySoft: "#DCEFE9", accent: "#F4724E",
    grid: "#EFEDE7", track: "#ECEAE3",
  },
  dark: {
    bg: "#0E1513", surface: "#16201D", surfaceAlt: "#121A18",
    ink: "#ECEFEC", muted: "#8A968F", border: "#243029",
    primary: "#2DD4A7", primarySoft: "#14342B", accent: "#FF8567",
    grid: "#1E2A26", track: "#1E2A26",
  },
};

const revenue30 = [
  4200, 3900, 4600, 5100, 4800, 6200, 7100, 5400, 5000, 5800,
  6400, 7200, 6900, 8100, 7700, 7000, 7600, 8800, 9200, 8400,
  7900, 8600, 9700, 10400, 9800, 9100, 10200, 11300, 10800, 11900,
].map((v, i) => ({ label: `${i + 1}`, value: v }));

const revenue12 = [
  { label: "Jan", value: 142000 }, { label: "Feb", value: 138000 },
  { label: "Mar", value: 165000 }, { label: "Apr", value: 159000 },
  { label: "May", value: 187000 }, { label: "Jun", value: 201000 },
  { label: "Jul", value: 195000 }, { label: "Aug", value: 224000 },
  { label: "Sep", value: 238000 }, { label: "Oct", value: 256000 },
  { label: "Nov", value: 289000 }, { label: "Dec", value: 312000 },
];

const categories = [
  { name: "Kitchen", value: 34 },
  { name: "Lighting", value: 26 },
  { name: "Textiles", value: 22 },
  { name: "Decor", value: 18 },
];

const topProducts = [
  { name: "Ceramic Pour-Over", sales: 1240 },
  { name: "Linen Throw", sales: 980 },
  { name: "Brass Lamp", sales: 870 },
  { name: "Oak Serving Board", sales: 640 },
  { name: "Stoneware Mug Set", sales: 520 },
];

const orders = [
  { id: "#FL-2841", customer: "Amara Okeke", items: 3, total: "$184.00", status: "Paid" },
  { id: "#FL-2840", customer: "Liam Carter", items: 1, total: "$62.00", status: "Shipped" },
  { id: "#FL-2839", customer: "Sofia Marín", items: 5, total: "$312.50", status: "Paid" },
  { id: "#FL-2838", customer: "Noah Williams", items: 2, total: "$98.00", status: "Refunded" },
  { id: "#FL-2837", customer: "Zara Bello", items: 4, total: "$241.00", status: "Pending" },
];

const fmtMoney = (n: number) =>
  n >= 1000 ? `$${(n / 1000).toFixed(n >= 100000 ? 0 : 1)}k` : `$${n}`;

export default function FolioDashboard() {
  const [dark, setDark] = useState(false);
  const [range, setRange] = useState("30d");
  const t = dark ? THEMES.dark : THEMES.light;

  const series = range === "12m" ? revenue12 : revenue30;
  const chartColors = [t.primary, t.accent, "#E0A458", "#7C9CB5"];

  const kpis = useMemo(
    () => [
      { label: "Revenue", value: "$312.4k", delta: +18.2, spark: revenue30.slice(-12), pos: true },
      { label: "Orders", value: "2,841", delta: +12.5, spark: revenue30.slice(-12).map((d) => ({ value: d.value * 0.3 })), pos: true },
      { label: "Avg order value", value: "$109.98", delta: +4.1, spark: revenue30.slice(-12).map((d) => ({ value: d.value * 0.6 })), pos: true },
      { label: "Conversion rate", value: "3.24%", delta: -0.6, spark: revenue30.slice(-12).map((d) => ({ value: 12000 - d.value * 0.4 })), pos: false },
    ],
    []
  );

  const statusStyle = (s: string) => {
    const map: Record<string, string> = {
      Paid: t.primary, Shipped: "#7C9CB5", Pending: "#E0A458",
      Refunded: t.accent,
    };
    const c = map[s] || t.muted;
    return { color: c, background: dark ? `${c}22` : `${c}1A`, borderColor: `${c}55` };
  };

  const nav = [
    { icon: LayoutGrid, label: "Overview", active: true },
    { icon: ShoppingBag, label: "Orders" },
    { icon: Package, label: "Products" },
    { icon: Users, label: "Customers" },
    { icon: BarChart3, label: "Analytics" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <div
      style={{ background: t.bg, color: t.ink, fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif", transition: "background .35s, color .35s" }}
      className="min-h-screen w-full flex"
    >
      <style>{`
        @keyframes rise { from { opacity:0; transform: translateY(10px);} to {opacity:1; transform:none;} }
        .rise { animation: rise .5s cubic-bezier(.2,.7,.3,1) both; }
        .folio-scroll::-webkit-scrollbar{ width:8px;height:8px;}
        .folio-scroll::-webkit-scrollbar-thumb{ background:${t.border}; border-radius:8px;}
        @media (prefers-reduced-motion: reduce){ .rise{ animation:none;} }
      `}</style>

      {/* Sidebar */}
      <aside
        className="hidden md:flex flex-col w-60 shrink-0 px-4 py-6 gap-1"
        style={{ background: t.surfaceAlt, borderRight: `1px solid ${t.border}`, transition: "background .35s,border-color .35s" }}
      >
        <div className="flex items-center gap-2.5 px-2 mb-8">
          <div className="grid place-items-center rounded-xl" style={{ width: 36, height: 36, background: t.primary }}>
            <span style={{ color: dark ? "#0E1513" : "#fff", fontWeight: 800, fontSize: 18 }}>F</span>
          </div>
          <div className="leading-tight">
            <div style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>Folio</div>
            <div style={{ fontSize: 11, color: t.muted }}>Home Goods Co.</div>
          </div>
        </div>

        {nav.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left"
            style={{
              background: active ? t.primarySoft : "transparent",
              color: active ? t.primary : t.muted,
              fontWeight: active ? 600 : 500, fontSize: 14, transition: "background .2s,color .2s",
            }}
          >
            <Icon size={18} /> {label}
          </button>
        ))}

        <div className="mt-auto flex items-center gap-3 rounded-xl px-3 py-3" style={{ background: t.surface, border: `1px solid ${t.border}` }}>
          <div className="grid place-items-center rounded-full shrink-0" style={{ width: 34, height: 34, background: t.accent, color: "#fff", fontWeight: 700, fontSize: 13 }}>EP</div>
          <div className="leading-tight overflow-hidden">
            <div style={{ fontSize: 13, fontWeight: 600 }}>Eti-ini P.</div>
            <div style={{ fontSize: 11, color: t.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Store admin</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 folio-scroll" style={{ maxHeight: "100vh", overflowY: "auto" }}>
        {/* Topbar */}
        <header
          className="sticky top-0 z-10 flex items-center gap-3 px-5 sm:px-8 py-4"
          style={{ background: `${t.bg}E6`, backdropFilter: "blur(8px)", borderBottom: `1px solid ${t.border}`, transition: "background .35s,border-color .35s" }}
        >
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>Overview</h1>
            <p style={{ fontSize: 12.5, color: t.muted }}>Welcome back, here&apos;s how the store is doing.</p>
          </div>

          <div className="ml-auto hidden sm:flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: t.surface, border: `1px solid ${t.border}` }}>
            <Search size={15} style={{ color: t.muted }} />
            <input placeholder="Search orders, products…" className="bg-transparent outline-none" style={{ fontSize: 13, color: t.ink, width: 170 }} />
          </div>

          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
            className="relative shrink-0 rounded-full"
            style={{ width: 58, height: 30, background: dark ? t.primarySoft : t.track, border: `1px solid ${t.border}`, transition: "background .3s" }}
          >
            <span
              className="absolute grid place-items-center rounded-full"
              style={{
                top: 2, left: dark ? 30 : 2, width: 24, height: 24,
                background: dark ? t.primary : t.surface, color: dark ? "#0E1513" : t.accent,
                transition: "left .3s cubic-bezier(.2,.7,.3,1)", boxShadow: "0 1px 4px rgba(0,0,0,.18)",
              }}
            >
              {dark ? <Moon size={13} /> : <Sun size={13} />}
            </span>
          </button>
        </header>

        <div className="px-5 sm:px-8 py-6 flex flex-col gap-6">
          {/* KPI row */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {kpis.map((k, i) => (
              <div key={k.label} className="rise rounded-2xl p-5" style={{ background: t.surface, border: `1px solid ${t.border}`, animationDelay: `${i * 60}ms`, transition: "background .35s,border-color .35s" }}>
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: 13, color: t.muted, fontWeight: 500 }}>{k.label}</span>
                  <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5" style={{ fontSize: 11.5, fontWeight: 600, color: k.pos ? t.primary : t.accent, background: k.pos ? t.primarySoft : (dark ? "#3a1f18" : "#FCE6DF") }}>
                    {k.pos ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{Math.abs(k.delta)}%
                  </span>
                </div>
                <div style={{ fontSize: 27, fontWeight: 700, letterSpacing: "-0.03em", marginTop: 6 }}>{k.value}</div>
                <div style={{ height: 34, marginTop: 8 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={k.spark} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id={`sg${i}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={k.pos ? t.primary : t.accent} stopOpacity={0.35} />
                          <stop offset="100%" stopColor={k.pos ? t.primary : t.accent} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="value" stroke={k.pos ? t.primary : t.accent} strokeWidth={2} fill={`url(#sg${i})`} isAnimationActive />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
          </section>

          {/* Charts row */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Revenue */}
            <div className="rise lg:col-span-2 rounded-2xl p-5" style={{ background: t.surface, border: `1px solid ${t.border}`, animationDelay: "120ms", transition: "background .35s,border-color .35s" }}>
              <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                <div>
                  <h2 style={{ fontSize: 15, fontWeight: 700 }}>Revenue</h2>
                  <p style={{ fontSize: 12, color: t.muted }}>{range === "12m" ? "Last 12 months" : "Last 30 days"}</p>
                </div>
                <div className="flex gap-1 rounded-lg p-1" style={{ background: t.surfaceAlt, border: `1px solid ${t.border}` }}>
                  {["30d", "12m"].map((r) => (
                    <button key={r} onClick={() => setRange(r)} className="rounded-md px-3 py-1" style={{ fontSize: 12.5, fontWeight: 600, color: range === r ? (dark ? "#0E1513" : "#fff") : t.muted, background: range === r ? t.primary : "transparent", transition: "all .2s" }}>{r}</button>
                  ))}
                </div>
              </div>
              <div style={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={series} margin={{ top: 6, right: 6, left: -16, bottom: 0 }}>
                    <defs>
                      <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={t.primary} stopOpacity={0.4} />
                        <stop offset="100%" stopColor={t.primary} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={t.grid} vertical={false} />
                    <XAxis dataKey="label" tick={{ fill: t.muted, fontSize: 11 }} axisLine={false} tickLine={false} interval={range === "30d" ? 4 : 0} />
                    <YAxis tick={{ fill: t.muted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={fmtMoney} width={48} />
                    <Tooltip
                      contentStyle={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, color: t.ink, fontSize: 12 }}
                      labelStyle={{ color: t.muted }} formatter={(v) => [fmtMoney(Number(v)), "Revenue"]} cursor={{ stroke: t.primary, strokeOpacity: 0.3 }}
                    />
                    <Area type="monotone" dataKey="value" stroke={t.primary} strokeWidth={2.5} fill="url(#rev)" isAnimationActive />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category donut */}
            <div className="rise rounded-2xl p-5 flex flex-col" style={{ background: t.surface, border: `1px solid ${t.border}`, animationDelay: "180ms", transition: "background .35s,border-color .35s" }}>
              <h2 style={{ fontSize: 15, fontWeight: 700 }}>Sales by category</h2>
              <p style={{ fontSize: 12, color: t.muted, marginBottom: 8 }}>Share of revenue</p>
              <div style={{ height: 170 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categories} dataKey="value" nameKey="name" innerRadius={48} outerRadius={72} paddingAngle={3} stroke="none">
                      {categories.map((c, i) => <Cell key={c.name} fill={chartColors[i]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, color: t.ink, fontSize: 12 }} formatter={(v, n) => [`${v}%`, n]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex flex-col gap-2">
                {categories.map((c, i) => (
                  <div key={c.name} className="flex items-center gap-2" style={{ fontSize: 12.5 }}>
                    <span style={{ width: 9, height: 9, borderRadius: 3, background: chartColors[i] }} />
                    <span style={{ color: t.muted }}>{c.name}</span>
                    <span style={{ marginLeft: "auto", fontWeight: 600 }}>{c.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Bottom row */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Top products */}
            <div className="rise rounded-2xl p-5" style={{ background: t.surface, border: `1px solid ${t.border}`, animationDelay: "240ms", transition: "background .35s,border-color .35s" }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Top products</h2>
              <div style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topProducts} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }} barSize={16}>
                    <CartesianGrid strokeDasharray="3 3" stroke={t.grid} horizontal={false} />
                    <XAxis type="number" tick={{ fill: t.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="name" tick={{ fill: t.muted, fontSize: 11 }} axisLine={false} tickLine={false} width={104} />
                    <Tooltip contentStyle={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, color: t.ink, fontSize: 12 }} cursor={{ fill: t.primarySoft, fillOpacity: 0.4 }} formatter={(v) => [`${v} sold`, ""]} />
                    <Bar dataKey="sales" fill={t.primary} radius={[0, 6, 6, 0]} isAnimationActive />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent orders */}
            <div className="rise lg:col-span-2 rounded-2xl p-5 overflow-hidden" style={{ background: t.surface, border: `1px solid ${t.border}`, animationDelay: "300ms", transition: "background .35s,border-color .35s" }}>
              <div className="flex items-center justify-between mb-3">
                <h2 style={{ fontSize: 15, fontWeight: 700 }}>Recent orders</h2>
                <button className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5" style={{ fontSize: 12.5, fontWeight: 600, color: t.primary, background: t.primarySoft }}>
                  View all <ArrowUpRight size={13} />
                </button>
              </div>
              <div className="overflow-x-auto folio-scroll">
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ color: t.muted, textAlign: "left" }}>
                      {["Order", "Customer", "Items", "Total", "Status"].map((h) => (
                        <th key={h} style={{ fontWeight: 600, padding: "8px 10px", fontSize: 11.5, textTransform: "uppercase", letterSpacing: ".04em", whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} style={{ borderTop: `1px solid ${t.border}` }}>
                        <td style={{ padding: "11px 10px", fontWeight: 600, whiteSpace: "nowrap" }}>{o.id}</td>
                        <td style={{ padding: "11px 10px", whiteSpace: "nowrap" }}>{o.customer}</td>
                        <td style={{ padding: "11px 10px", color: t.muted }}>{o.items}</td>
                        <td style={{ padding: "11px 10px", fontWeight: 600, whiteSpace: "nowrap" }}>{o.total}</td>
                        <td style={{ padding: "11px 10px" }}>
                          <span className="inline-flex rounded-full px-2.5 py-0.5" style={{ fontSize: 11.5, fontWeight: 600, border: "1px solid", ...statusStyle(o.status) }}>{o.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <p style={{ fontSize: 11.5, color: t.muted, textAlign: "center", paddingBottom: 8 }}>
            Folio · demo dashboard · built with Next.js, React, TypeScript &amp; Recharts
          </p>
        </div>
      </main>
    </div>
  );
}
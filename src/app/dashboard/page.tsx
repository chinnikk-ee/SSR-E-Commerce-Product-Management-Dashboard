import Shell from "@/components/Shell";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { formatIndianNumber, formatIndianCurrency } from "@/lib/format";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let user;
  try {
    user = await requireAuth();
  } catch {
    redirect("/login");
  }

  const products = await prisma.product.findMany({
    where: { userId: user.id },
  });
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const inventoryValue = products.reduce((sum, p) => sum + Number(p.price) * p.stock, 0);

  return (
    <Shell>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ margin: 0, background: "linear-gradient(135deg, #e9d5ff 0%, #c084fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontSize: "32px", fontWeight: 700 }}>Dashboard</h1>
        <div style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.6)" }}>
          Welcome, <span style={{ color: "rgba(255, 255, 255, 0.9)", fontWeight: 500 }}>{user.name}</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "20px" }}>
        <Card title="Total Products" value={totalProducts} />
        <Card title="Total Stock" value={formatIndianNumber(totalStock)} />
        <Card title="Inventory Value" value={formatIndianCurrency(inventoryValue)} />
      </div>

      <div style={{ marginTop: "32px" }}>
        <h2 style={{ marginBottom: "12px", background: "linear-gradient(135deg, #e9d5ff 0%, #c084fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Next</h2>
        <p style={{ opacity: 0.75, color: "rgba(255, 255, 255, 0.7)" }}>
          Go to <a href="/products" className="dashboard-link">Products</a> to add/edit/delete items and view charts.
        </p>
      </div>
    </Shell>
  );
}

function Card({ title, value }: { title: string; value: any }) {
  return (
    <div
      className="dashboard-card"
      style={{
        border: "1px solid rgba(168, 85, 247, 0.2)",
        borderRadius: "16px",
        padding: "20px",
        background: "linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%)",
        boxShadow: "0 4px 20px rgba(168, 85, 247, 0.15), 0 0 0 1px rgba(168, 85, 247, 0.1) inset",
      }}
    >
      <div style={{ opacity: 0.75, fontSize: "13px", color: "rgba(255, 255, 255, 0.7)", marginBottom: "8px" }}>{title}</div>
      <div style={{ fontSize: "28px", fontWeight: 700, background: "linear-gradient(135deg, #e9d5ff 0%, #c084fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{value}</div>
    </div>
  );
}

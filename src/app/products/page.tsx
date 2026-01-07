import Shell from "@/components/Shell";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ProductActions from "./productActions";
import ProductCharts from "./productCharts";
import { formatIndianCurrency, formatIndianNumber } from "@/lib/format";
import { requireAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  let user;
  try {
    user = await requireAuth();
  } catch {
    redirect("/login");
  }

  const products = await prisma.product.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Shell>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ margin: 0, background: "linear-gradient(135deg, #e9d5ff 0%, #c084fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontSize: "32px", fontWeight: 700 }}>Products</h1>
        <div style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.6)" }}>
          Welcome, <span style={{ color: "rgba(255, 255, 255, 0.9)", fontWeight: 500 }}>{user.name}</span>
        </div>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <Link href="/products/new" style={{ padding: "8px 16px", background: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)", color: "white", textDecoration: "none", borderRadius: "8px", fontWeight: 500 }}>+ Add Product</Link>
      </div>

      <div style={{ overflowX: "auto", border: "1px solid rgba(168, 85, 247, 0.2)", borderRadius: "16px", padding: "20px", background: "linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%)", boxShadow: "0 4px 20px rgba(168, 85, 247, 0.15), 0 0 0 1px rgba(168, 85, 247, 0.1) inset" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left" }}>
              <th style={{ padding: 12, borderBottom: "1px solid rgba(168, 85, 247, 0.2)", color: "rgba(255, 255, 255, 0.9)", fontWeight: 500 }}>Name</th>
              <th style={{ padding: 12, borderBottom: "1px solid rgba(168, 85, 247, 0.2)", color: "rgba(255, 255, 255, 0.9)", fontWeight: 500 }}>SKU</th>
              <th style={{ padding: 12, borderBottom: "1px solid rgba(168, 85, 247, 0.2)", color: "rgba(255, 255, 255, 0.9)", fontWeight: 500 }}>Category</th>
              <th style={{ padding: 12, borderBottom: "1px solid rgba(168, 85, 247, 0.2)", color: "rgba(255, 255, 255, 0.9)", fontWeight: 500 }}>Price</th>
              <th style={{ padding: 12, borderBottom: "1px solid rgba(168, 85, 247, 0.2)", color: "rgba(255, 255, 255, 0.9)", fontWeight: 500 }}>Stock</th>
              <th style={{ padding: 12, borderBottom: "1px solid rgba(168, 85, 247, 0.2)", color: "rgba(255, 255, 255, 0.9)", fontWeight: 500 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td style={{ padding: 12, borderBottom: "1px solid rgba(168, 85, 247, 0.2)", verticalAlign: "middle", color: "rgba(255, 255, 255, 0.8)" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    {p.imageUrl ? (
                      <img alt={p.name} src={p.imageUrl} style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: 40, height: 40, borderRadius: 8, background: "#222" }} />
                    )}
                    <Link href={`/products/${p.id}`}>{p.name}</Link>
                  </div>
                </td>
                <td style={{ padding: 12, borderBottom: "1px solid rgba(168, 85, 247, 0.2)", verticalAlign: "middle", color: "rgba(255, 255, 255, 0.8)" }}>{p.sku}</td>
                <td style={{ padding: 12, borderBottom: "1px solid rgba(168, 85, 247, 0.2)", verticalAlign: "middle", color: "rgba(255, 255, 255, 0.8)" }}>{p.category}</td>
                <td style={{ padding: 12, borderBottom: "1px solid rgba(168, 85, 247, 0.2)", verticalAlign: "middle", color: "rgba(255, 255, 255, 0.8)" }}>{formatIndianCurrency(Number(p.price))}</td>
                <td style={{ padding: 12, borderBottom: "1px solid rgba(168, 85, 247, 0.2)", verticalAlign: "middle", color: "rgba(255, 255, 255, 0.8)" }}>{formatIndianNumber(p.stock)}</td>
                <td style={{ padding: 12, borderBottom: "1px solid rgba(168, 85, 247, 0.2)", verticalAlign: "middle", color: "rgba(255, 255, 255, 0.8)" }}><ProductActions id={p.id} /></td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td style={{ padding: 12, borderBottom: "1px solid rgba(168, 85, 247, 0.2)", verticalAlign: "middle", color: "rgba(255, 255, 255, 0.8)" }} colSpan={6}>No products yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 20 }}>
        <h2 style={{ marginBottom: "12px", background: "linear-gradient(135deg, #e9d5ff 0%, #c084fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Analytics</h2>
        <ProductCharts />
      </div>
    </Shell>
  );
}

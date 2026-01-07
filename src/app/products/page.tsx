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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Products</h1>
        <Link href="/products/new">+ Add Product</Link>
      </div>

      <div style={{ overflowX: "auto", border: "1px solid #222", borderRadius: 10 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left" }}>
              <th style={th}>Name</th>
              <th style={th}>SKU</th>
              <th style={th}>Category</th>
              <th style={th}>Price</th>
              <th style={th}>Stock</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td style={td}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    {p.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img alt={p.name} src={p.imageUrl} style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: 40, height: 40, borderRadius: 8, background: "#222" }} />
                    )}
                    <Link href={`/products/${p.id}`}>{p.name}</Link>
                  </div>
                </td>
                <td style={td}>{p.sku}</td>
                <td style={td}>{p.category}</td>
                <td style={td}>{formatIndianCurrency(Number(p.price))}</td>
                <td style={td}>{formatIndianNumber(p.stock)}</td>
                <td style={td}><ProductActions id={p.id} /></td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td style={td} colSpan={6}>No products yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 20 }}>
        <h2>Analytics</h2>
        <ProductCharts />
      </div>
    </Shell>
  );
}

const th: React.CSSProperties = { padding: 12, borderBottom: "1px solid #222" };
const td: React.CSSProperties = { padding: 12, borderBottom: "1px solid #222", verticalAlign: "middle" };

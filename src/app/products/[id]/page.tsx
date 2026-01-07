import Shell from "@/components/Shell";
import ProductForm from "@/components/ProductForm";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  let user;
  try {
    user = await requireAuth();
  } catch {
    redirect("/login");
  }

  const product = await prisma.product.findUnique({ where: { id: params.id } });

  if (!product) {
    return (
      <Shell>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h1 style={{ margin: 0, background: "linear-gradient(135deg, #e9d5ff 0%, #c084fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontSize: "32px", fontWeight: 700 }}>Product Not Found</h1>
          <div style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.6)" }}>
            Welcome, <span style={{ color: "rgba(255, 255, 255, 0.9)", fontWeight: 500 }}>{user.name}</span>
          </div>
        </div>
        <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>Product does not exist.</p>
      </Shell>
    );
  }

  if (product.userId !== user.id) {
    return (
      <Shell>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h1 style={{ margin: 0, background: "linear-gradient(135deg, #e9d5ff 0%, #c084fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontSize: "32px", fontWeight: 700 }}>Access Forbidden</h1>
          <div style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.6)" }}>
            Welcome, <span style={{ color: "rgba(255, 255, 255, 0.9)", fontWeight: 500 }}>{user.name}</span>
          </div>
        </div>
        <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>You don't have permission to access this product.</p>
      </Shell>
    );
  }

  return (
    <Shell>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ margin: 0, background: "linear-gradient(135deg, #e9d5ff 0%, #c084fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontSize: "32px", fontWeight: 700 }}>Edit Product</h1>
        <div style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.6)" }}>
          Welcome, <span style={{ color: "rgba(255, 255, 255, 0.9)", fontWeight: 500 }}>{user.name}</span>
        </div>
      </div>
      <ProductForm
        mode="edit"
        initial={{
          id: product.id,
          name: product.name,
          sku: product.sku,
          category: product.category,
          price: product.price.toString(),
          stock: product.stock.toString(),
          description: product.description ?? "",
          imageUrl: product.imageUrl ?? "",
        } as any}
      />
    </Shell>
  );
}

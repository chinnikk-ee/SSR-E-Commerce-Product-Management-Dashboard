import Shell from "@/components/Shell";
import ProductForm from "@/components/ProductForm";
import { requireAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function NewProductPage() {
  let user;
  try {
    user = await requireAuth();
  } catch {
    redirect("/login");
  }

  return (
    <Shell>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ margin: 0, background: "linear-gradient(135deg, #e9d5ff 0%, #c084fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontSize: "32px", fontWeight: 700 }}>Add Product</h1>
        <div style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.6)" }}>
          Welcome, <span style={{ color: "rgba(255, 255, 255, 0.9)", fontWeight: 500 }}>{user.name}</span>
        </div>
      </div>
      <ProductForm mode="create" />
    </Shell>
  );
}

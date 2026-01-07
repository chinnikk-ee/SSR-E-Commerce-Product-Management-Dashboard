import Shell from "@/components/Shell";
import ProductForm from "@/components/ProductForm";
import { requireAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function NewProductPage() {
  try {
    await requireAuth();
  } catch {
    redirect("/login");
  }

  return (
    <Shell>
      <h1>Add Product</h1>
      <ProductForm mode="create" />
    </Shell>
  );
}

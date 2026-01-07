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
        <h1>Not found</h1>
        <p>Product does not exist.</p>
      </Shell>
    );
  }

  if (product.userId !== user.id) {
    return (
      <Shell>
        <h1>Forbidden</h1>
        <p>You don't have permission to access this product.</p>
      </Shell>
    );
  }

  return (
    <Shell>
      <h1>Edit Product</h1>
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

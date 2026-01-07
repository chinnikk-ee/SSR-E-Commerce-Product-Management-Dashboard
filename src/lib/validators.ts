import { z } from "zod";

export const ProductCreateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  sku: z.string().min(2, "SKU must be at least 2 characters"),
  price: z.coerce.number().positive("Price must be > 0"),
  stock: z.coerce.number().int().nonnegative("Stock must be >= 0"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  imageUrl: z.string().url("Image URL must be a valid URL").optional(),
});

export const ProductUpdateSchema = ProductCreateSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided" }
);

export type ProductCreateInput = z.infer<typeof ProductCreateSchema>;
export type ProductUpdateInput = z.infer<typeof ProductUpdateSchema>;

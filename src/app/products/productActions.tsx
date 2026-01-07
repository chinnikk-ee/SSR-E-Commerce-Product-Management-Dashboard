"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

async function deleteProduct(id: string) {
  const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete");
  return res.json();
}

export default function ProductActions({ id }: { id: string }) {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteProduct(id),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["products"] });
      window.location.reload();
    },
  });

  return (
    <div style={{ display: "flex", gap: 10 }}>
      <a href={`/products/${id}`} className="edit-button">Edit</a>
      <button
        onClick={() => {
          if (confirm("Delete this product?")) mutation.mutate();
        }}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}

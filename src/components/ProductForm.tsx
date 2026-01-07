"use client";

import { useMemo, useState } from "react";
import { ProductCreateSchema, ProductCreateInput } from "@/lib/validators";

type Mode = "create" | "edit";

type Props = {
  mode: Mode;
  initial?: Partial<FormData> & { id?: string };
};

type FormData = Omit<ProductCreateInput, 'price' | 'stock'> & { price: string; stock: string };

const Step1Schema = ProductCreateSchema.pick({ name: true, sku: true, category: true });
const Step2Schema = ProductCreateSchema.pick({ price: true, stock: true });
const Step3Schema = ProductCreateSchema.pick({ description: true, imageUrl: true });

export default function ProductForm({ mode, initial }: Props) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
    name: initial?.name ?? "",
    sku: initial?.sku ?? "",
    category: initial?.category ?? "General",
    price: initial?.price?.toString() ?? "10",
    stock: initial?.stock?.toString() ?? "0",
    description: initial?.description ?? "",
    imageUrl: initial?.imageUrl ?? "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const isEdit = mode === "edit";
  const productId = initial?.id;

  const stepSchema = useMemo(() => {
    if (step === 1) return Step1Schema;
    if (step === 2) return Step2Schema;
    return Step3Schema;
  }, [step]);

  function validateCurrentStep(): boolean {
    const result = stepSchema.safeParse(form);
    if (!result.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0]);
        nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      return false;
    }
    setErrors({});
    return true;
  }

  async function onSubmit() {
    const dataToValidate: ProductCreateInput = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };
    const all = ProductCreateSchema.safeParse(dataToValidate);
    if (!all.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of all.error.issues) {
        const key = String(issue.path[0]);
        nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(isEdit ? `/api/products/${productId}` : "/api/products", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToValidate),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        alert(payload?.error ?? "Save failed");
        return;
      }

      window.location.href = "/products";
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ border: "1px solid #222", borderRadius: 10, padding: 16, maxWidth: 720 }}>
      <Stepper step={step} />

      {step === 1 && (
        <div style={{ display: "grid", gap: 12 }}>
          <Field label="Name" error={errors.name}>
            <input
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              placeholder="e.g., iPhone 15"
            />
          </Field>

          <Field label="SKU" error={errors.sku}>
            <input
              value={form.sku}
              onChange={(e) => setForm((s) => ({ ...s, sku: e.target.value }))}
              placeholder="e.g., IP15-BLK-128"
              disabled={isEdit}
            />
          </Field>

          <Field label="Category" error={errors.category}>
            <input
              value={form.category}
              onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}
              placeholder="e.g., Phones"
            />
          </Field>
        </div>
      )}

      {step === 2 && (
        <div style={{ display: "grid", gap: 12 }}>
          <Field label="Price (INR)" error={errors.price}>
            <input
              type="number"
              value={form.price}
              onChange={(e) => {
                let val = e.target.value.replace(/^0+(?=\d)/, '');
                setForm((s) => ({ ...s, price: val }));
              }}
              step="0.01"
              min={0}
            />
          </Field>

          <Field label="Stock" error={errors.stock}>
            <input
              type="number"
              value={form.stock}
              onChange={(e) => {
                let val = e.target.value.replace(/^0+/, '') || '0';
                setForm((s) => ({ ...s, stock: val }));
              }}
              min={0}
            />
          </Field>
        </div>
      )}

      {step === 3 && (
        <div style={{ display: "grid", gap: 12 }}>
          <Field label="Description" error={errors.description}>
            <textarea
              value={form.description ?? ""}
              onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
              rows={4}
              placeholder="Optional description..."
            />
          </Field>

          <div style={{ display: "grid", gap: 10 }}>
            <CloudinaryUploader
              value={form.imageUrl ?? ""}
              onChange={(url) => setForm((s) => ({ ...s, imageUrl: url }))}
            />

            {form.imageUrl ? (
              <img
                src={form.imageUrl}
                alt="Preview"
                style={{ width: 180, height: 180, objectFit: "cover", borderRadius: 10 }}
              />
            ) : null}

            {errors.imageUrl ? <div style={{ color: "tomato", fontSize: 12 }}>{errors.imageUrl}</div> : null}
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
        <button onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1 || saving}>
          Back
        </button>

        {step < 3 ? (
          <button
            onClick={() => {
              if (validateCurrentStep()) setStep((s) => s + 1);
            }}
            disabled={saving}
          >
            Next
          </button>
        ) : (
          <button onClick={onSubmit} disabled={saving}>
            {saving ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
          </button>
        )}
      </div>
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  const items = ["Basic", "Pricing", "Media"];
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
      {items.map((t, idx) => {
        const n = idx + 1;
        const active = n === step;
        return (
          <div
            key={t}
            style={{
              padding: "6px 10px",
              borderRadius: 999,
              border: "1px solid #222",
              background: active ? "#222" : "transparent",
            }}
          >
            {n}. {t}
          </div>
        );
      })}
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontSize: 12, opacity: 0.85 }}>{label}</span>
      {children}
      {error ? <span style={{ color: "tomato", fontSize: 12 }}>{error}</span> : null}
    </label>
  );
}

function CloudinaryUploader({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);

  async function onFile(file: File) {
    setUploading(true);
    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      onChange(data.secure_url);
    } catch (e: any) {
      alert(e?.message ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <input
          type="file"
          accept="image/*"
          disabled={uploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void onFile(file);
          }}
        />
        {uploading ? <span>Uploading...</span> : null}
      </div>

      <label style={{ display: "grid", gap: 6 }}>
        <span style={{ fontSize: 12, opacity: 0.85 }}>Image URL</span>
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="https://..." />
      </label>
    </div>
  );
}

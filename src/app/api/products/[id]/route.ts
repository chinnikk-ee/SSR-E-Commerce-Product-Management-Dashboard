import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ProductUpdateSchema } from "@/lib/validators";
import { Prisma } from "@prisma/client";
import { requireAuth } from "@/lib/auth";

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
  try {
    const user = await requireAuth();
    const product = await prisma.product.findUnique({ where: { id: params.id } });
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (product.userId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const user = await requireAuth();
    const body = await req.json();
    const parsed = ProductUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation error", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const existing = await prisma.product.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (existing.userId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const data: any = { ...parsed.data };
    if (typeof data.price === "number") data.price = new Prisma.Decimal(data.price);

    try {
      const updated = await prisma.product.update({
        where: { id: params.id },
        data,
      });
      return NextResponse.json(updated);
    } catch (e: any) {
      if (e?.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
      if (e?.code === "P2002") return NextResponse.json({ error: "SKU must be unique for your account" }, { status: 409 });
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const user = await requireAuth();
    const existing = await prisma.product.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (existing.userId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await prisma.product.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    if (e?.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

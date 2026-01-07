import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ProductCreateSchema } from "@/lib/validators";
import { Prisma } from "@prisma/client";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  try {
    const user = await requireAuth();
  const products = await prisma.product.findMany({
      where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
  const body = await req.json();
  const parsed = ProductCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation error", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { price, ...rest } = parsed.data;

  try {
    const created = await prisma.product.create({
      data: {
        ...rest,
        price: new Prisma.Decimal(price),
          userId: user.id,
      },
    });
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    if (e?.code === "P2002") {
        return NextResponse.json({ error: "SKU must be unique for your account" }, { status: 409 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

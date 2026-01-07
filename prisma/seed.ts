import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin@strongpass";
  const adminName = process.env.ADMIN_NAME || "Admin User";

  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  const existingUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingUser) {
    await prisma.user.update({
      where: { email: adminEmail },
      data: {
        password: hashedPassword,
        name: adminName,
      },
    });
    console.log(`🔐 Updated admin password for: ${adminEmail}`);
    return;
  }

  const user = await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      name: adminName,
    },
  });

  console.log(`✅ Created admin user: ${user.email}`);
  console.log(`   Name: ${user.name}`);
  console.log(`   ID: ${user.id}`);
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });



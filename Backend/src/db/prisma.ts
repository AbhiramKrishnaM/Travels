import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

export async function connectDatabase() {
  try {
    const client = prisma;
    await client.$connect();
    console.log("Database connected successfully");
    return client;
  } catch (error) {
    console.error("Database connection failed:", error);

    console.log("Retrying connection in 5 seconds...");
    setTimeout(connectDatabase, 5000);
    return null;
  }
}

export async function disconnectDatabase() {
  if (prisma) {
    await prisma.$disconnect();
    console.log("Database disconnected");
  }
}

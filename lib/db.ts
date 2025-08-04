import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Test database connection
export async function testConnection() {
  try {
    await prisma.$connect()
    const userCount = await prisma.user.count()
    return { success: true, userCount }
  } catch (error) {
    console.error('Database connection failed:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  } finally {
    await prisma.$disconnect()
  }
} 
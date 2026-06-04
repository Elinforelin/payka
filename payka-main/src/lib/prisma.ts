import { PrismaClient } from '@prisma/client'
import path from 'path'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const isProduction = process.env.NODE_ENV === 'production'

// For SQLite, we want to ensure the path is correct relative to the process root
// when running in different environments (like Nitro dev)
const databasePath = path.resolve(process.cwd(), 'prisma', 'dev.db')
const databaseUrl = process.env.DATABASE_URL || `file:${databasePath}`

console.log('Prisma database path:', databasePath);
console.log('Prisma database URL:', databaseUrl);

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
  log: isProduction ? [] : ['error', 'warn'],
})

if (!isProduction) globalForPrisma.prisma = prisma

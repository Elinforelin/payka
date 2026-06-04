import { PrismaClient } from '@prisma/client'
import path from 'path'
import { fileURLToPath } from 'url'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const isProduction = process.env.NODE_ENV === 'production'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Resolve the database path relative to this file's location
// This file is in src/lib/, so the database is in ../../prisma/dev.db
const databasePath = path.resolve(__dirname, '..', '..', 'prisma', 'dev.db')
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

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')
  await prisma.product.deleteMany({})
  console.log('Cleared existing products')

  const products = [
    {
      name: 'Small Gold Bangle',
      description: 'Elegant gold bangle for everyday wear',
      price: 3000,
      category: 'Bangles',
      imageUrl: '/assets/619792737_18417153727189140_5984683189343682714_n.jpg',
      sku: '121903/15',
      metalType: 'Золото',
      metalColor: 'Червоний',
      metalStandard: '585',
      gemstone: 'Без каміння',
      weight: 2.5,
      clasp: 'Застібка конго',
      design: 'Алмазна грань/насічка, Без каміння, Тонкі',
      style: 'Мінімалізм, Універсальний',
      productType: 'Конго (кільця)',
      technology: 'Прокатка',
      width: 1.4,
      thickness: 0,
      length: 15.8
    },
    {
      name: 'Diamond Eternity Ring',
      description: 'Stunning diamond eternity ring',
      price: 4500,
      category: 'Rings',
      imageUrl: '/assets/521469718_18391966183189140_5158185447317376143_n.jpg',
      sku: '234567/01',
      metalType: 'Золото',
      metalColor: 'Білий',
      metalStandard: '750',
      gemstone: 'Діамант',
      weight: 3.2,
      clasp: 'Крапанова закріпка',
      design: 'Класика',
      style: 'Розкішний',
      productType: 'Каблучка',
      technology: 'Лиття',
      width: 2.5,
      thickness: 1.5,
      length: 0
    },
    {
      name: 'Embossed Earrings',
      description: 'Beautifully crafted embossed earrings',
      price: 3000,
      category: 'Earrings',
      imageUrl: '/assets/5346354635465.png',
      sku: '345678/02',
      metalType: 'Срібло',
      metalColor: 'Сріблястий',
      metalStandard: '925',
      gemstone: 'Без каміння',
      weight: 4.0,
      clasp: 'Англійська',
      design: 'Геометрія',
      style: 'Сучасний',
      productType: 'Сережки',
      technology: 'Штампування',
      width: 10,
      thickness: 2,
      length: 20
    },
    {
      name: 'Silver Pendant',
      description: 'Minimalist silver pendant',
      price: 1500,
      category: 'Pendants',
      imageUrl: '/assets/45875674576754.png',
      sku: '456789/03',
      metalType: 'Срібло',
      metalColor: 'Сріблястий',
      metalStandard: '925',
      gemstone: 'Фіаніт',
      weight: 1.8,
      clasp: 'Вушко',
      design: 'Мінімалізм',
      style: 'Повсякденний',
      productType: 'Підвіска',
      technology: 'Лиття',
      width: 8,
      thickness: 3,
      length: 15
    },
    {
      name: 'Gold Ring',
      description: 'Classic gold ring',
      price: 2000,
      category: 'Rings',
      imageUrl: '/assets/2345413523454.png',
      sku: '567890/04',
      metalType: 'Золото',
      metalColor: 'Жовтий',
      metalStandard: '585',
      gemstone: 'Без каміння',
      weight: 2.2,
      clasp: 'Немає',
      design: 'Класика',
      style: 'Класичний',
      productType: 'Каблучка',
      technology: 'Лиття',
      width: 3,
      thickness: 1.2,
      length: 0
    }
  ]

  for (const product of products) {
    try {
      console.log(`Seeding product: ${product.name}`)
      await prisma.product.create({
        data: product
      })
    } catch (error) {
      console.error(`Error seeding product ${product.name}:`, error)
      throw error
    }
  }

  console.log('Seed completed.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { problemsData } from '../lib/problems-data'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 12)
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      username: 'testuser',
      password: hashedPassword,
    },
  })

  console.log('✅ Created test user:', testUser.username)

  // Create problems
  for (const problemData of problemsData) {
    const { examples, constraints, testCases, ...problemFields } = problemData
    
    // Check if problem already exists
    const existingProblem = await prisma.problem.findFirst({
      where: { title: problemFields.title }
    })
    
    if (existingProblem) {
      console.log(`⏭️  Problem already exists: ${problemFields.title}`)
      continue
    }
    
    const problem = await prisma.problem.create({
      data: {
        ...problemFields,
        createdBy: testUser.id,
        isCustom: false,
        examples: {
          create: examples.map((ex: any) => ({
            input: ex.input,
            output: ex.output,
            explanation: ex.explanation,
          })),
        },
        constraints: {
          create: constraints.map((constraint: string) => ({
            text: constraint,
          })),
        },
        testCases: {
          create: testCases.map((tc: any) => ({
            input: tc.input,
            expectedOutput: tc.expectedOutput,
          })),
        },
      },
    })

    console.log(`✅ Created problem: ${problem.title}`)
  }

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 
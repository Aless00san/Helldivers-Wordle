// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.stratagem.deleteMany(); // Clear existing

  const stratagems = [
    {
      name: 'Eagle Airstrike',
      code: ['↓', '→', '→'],
      category: 'Offensive',
    },
    {
      name: 'Resupply Pack',
      code: ['↓', '↓', '↑', '→'],
      category: 'Support',
    },
    {
      name: 'Anti-Tank Minefield',
      code: ['→', '↓', '←', '→'],
      category: 'Defensive',
    },
    {
      name: 'Jump Pack',
      code: ['↑', '↑', '→', '↓'],
      category: 'Mobility',
    },
    {
      name: 'Autocannon Sentry',
      code: ['←', '→', '↓', '↓'],
      category: 'Offensive',
    },
    {
      name: 'HMG Turret',
      code: ['↓', '←', '→', '↓'],
      category: 'Defensive',
    },
    {
      name: 'Shield Generator',
      code: ['↑', '→', '→', '↑'],
      category: 'Defensive',
    },
    {
      name: 'Smoke Strike',
      code: ['↓', '↓', '→'],
      category: 'Support',
    },
    {
      name: 'Incendiary Bomb',
      code: ['↑', '←', '→', '↓'],
      category: 'Offensive',
    },
    {
      name: 'Rocket Launcher',
      code: ['↓', '↑', '←', '←'],
      category: 'Offensive',
    },
  ];

  for (const strat of stratagems) {
    await prisma.stratagem.create({
      data: {
        name: strat.name,
        code: strat.code,
        category: strat.category,
      },
    });
  }

  console.log('✅ Seeded 10 stratagems');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

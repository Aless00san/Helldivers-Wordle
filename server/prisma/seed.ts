// prisma/seed.ts
import dotenv from 'dotenv';
dotenv.config(); // Load .env into process.env

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const deleted = await prisma.stratagem.deleteMany();
  console.log(`🗑️  Deleted ${deleted.count} stratagems`);
  const stratagems = [
    { name: 'SOS Beacon', code: ['🠩', '🠫', '🠪', '🠨'], category: 'Support' },
    { name: 'Resupply', code: ['🠫', '🠫', '🠩', '🠪'], category: 'Support' },
    {
      name: 'Orbital EMS Strike',
      code: ['🠪', '🠪', '🠨', '🠫'],
      category: 'Orbital',
    },
    {
      name: 'Orbital Gas Strike',
      code: ['🠪', '🠪', '🠫', '🠪'],
      category: 'Orbital',
    },
    {
      name: 'Orbital Smoke Strike',
      code: ['🠪', '🠪', '🠫', '🠩'],
      category: 'Orbital',
    },
    {
      name: 'G-16 Gatling Sentry',
      code: ['🠫', '🠩', '🠪', '🠨'],
      category: 'Sentry',
    },
    {
      name: 'MG-43 Machine Gun',
      code: ['🠫', '🠨', '🠫', '🠩', '🠪'],
      category: 'Weapon',
    },
    {
      name: 'MG-43 Machine Gun Sentry',
      code: ['🠫', '🠩', '🠪', '🠪', '🠩'],
      category: 'Sentry',
    },
    {
      name: 'A-M-12 Mortar Sentry',
      code: ['🠫', '🠩', '🠪', '🠪', '🠫'],
      category: 'Sentry',
    },
    {
      name: 'A-MLS-4X Rocket Sentry',
      code: ['🠫', '🠩', '🠪', '🠪', '🠨'],
      category: 'Sentry',
    },
    {
      name: 'APW-1 Anti-Materiel Rifle',
      code: ['🠫', '🠨', '🠪', '🠩', '🠫'],
      category: 'Weapon',
    },
    {
      name: 'EAT-17 Expendable Anti-Tank',
      code: ['🠫', '🠫', '🠨', '🠩', '🠪'],
      category: 'Weapon',
    },
    {
      name: 'GR-8 Recoilless Rifle',
      code: ['🠫', '🠨', '🠪', '🠪', '🠨'],
      category: 'Weapon',
    },
    {
      name: 'FLAM-40 Flamethrower',
      code: ['🠫', '🠨', '🠩', '🠫', '🠩'],
      category: 'Weapon',
    },
    {
      name: 'Orbital Gatling Barrage',
      code: ['🠪', '🠫', '🠨', '🠩', '🠩'],
      category: 'Orbital',
    },
    {
      name: 'Orbital Railcannon Strike',
      code: ['🠪', '🠩', '🠫', '🠫', '🠪'],
      category: 'Orbital',
    },
    {
      name: 'LAS-99 Quasar Cannon',
      code: ['🠫', '🠫', '🠩', '🠨', '🠪'],
      category: 'Weapon',
    },
    {
      name: 'Eagle Cluster Bomb',
      code: ['🠩', '🠪', '🠫', '🠫', '🠪'],
      category: 'Orbital',
    },
    {
      name: 'Orbital Napalm Barrage',
      code: ['🠪', '🠪', '🠫', '🠨', '🠪', '🠩'],
      category: 'Orbital',
    },
    {
      name: 'Orbital 120 mm HE Barrage',
      code: ['🠪', '🠪', '🠫', '🠨', '🠪', '🠫'],
      category: 'Orbital',
    },
    {
      name: 'Orbital Walking Barrage',
      code: ['🠪', '🠫', '🠪', '🠫', '🠪', '🠫'],
      category: 'Orbital',
    },
    {
      name: 'M-105 Stalwart',
      code: ['🠫', '🠨', '🠫', '🠩', '🠩', '🠨'],
      category: 'Weapon',
    },
    {
      name: 'AC-8 Autocannon',
      code: ['🠫', '🠨', '🠫', '🠩', '🠩', '🠪'],
      category: 'Weapon',
    },
    {
      name: 'ARC-3 Arc Thrower',
      code: ['🠫', '🠪', '🠫', '🠩', '🠨', '🠨'],
      category: 'Sentry',
    },
    {
      name: 'A-AC-8 Autocannon Sentry',
      code: ['🠫', '🠩', '🠪', '🠩', '🠨', '🠩'],
      category: 'Sentry',
    },
    {
      name: 'B-100 Portable Hellbomb',
      code: ['🠫', '🠪', '🠩', '🠩', '🠩'],
      category: 'Weapon',
    },
    {
      name: 'Orbital Laser',
      code: ['🠪', '🠫', '🠩', '🠪', '🠫'],
      category: 'Orbital',
    },
    {
      name: 'A-M-23 EMS Mortar Sentry',
      code: ['🠫', '🠩', '🠪', '🠫', '🠪'],
      category: 'Weapon',
    },
    {
      name: 'MLS-4X Commando',
      code: ['🠫', '🠨', '🠩', '🠫', '🠪'],
      category: 'Weapon',
    },
    {
      name: 'MD-6 Anti-Personnel Minefield',
      code: ['🠫', '🠨', '🠩', '🠪'],
      category: 'Weapon',
    },
    {
      name: 'MD-17 Anti-Tank Mines',
      code: ['🠫', '🠨', '🠩', '🠩'],
      category: 'Weapon',
    },
    {
      name: 'MD-I4 Incendiary Mines',
      code: ['🠫', '🠨', '🠨', '🠫'],
      category: 'Weapon',
    },
    {
      name: 'Eagle Napalm Airstrike',
      code: ['🠩', '🠪', '🠫', '🠩'],
      category: 'Weapon',
    },
    {
      name: 'Eagle Airstrike',
      code: ['🠩', '🠪', '🠫', '🠪'],
      category: 'Weapon',
    },
    {
      name: 'Eagle Smoke Strike',
      code: ['🠩', '🠪', '🠩', '🠫'],
      category: 'Weapon',
    },
    {
      name: 'Eagle 110mm Rocket Pods',
      code: ['🠩', '🠪', '🠩', '🠨'],
      category: 'Weapon',
    },
    {
      name: 'Eagle 500kg Bomb',
      code: ['🠩', '🠪', '🠫', '🠫', '🠫'],
      category: 'Weapon',
    },
    {
      name: 'E-GL-21 Grenadier Battlement',
      code: ['🠫', '🠪', '🠫', '🠨', '🠪'],
      category: 'Support',
    },
    {
      name: 'FX-12 Shield Generator Relay',
      code: ['🠫', '🠫', '🠨', '🠪', '🠨', '🠪'],
      category: 'Support',
    },
    {
      name: 'A-ARC-3 Tesla Tower',
      code: ['🠫', '🠩', '🠪', '🠩', '🠨', '🠪'],
      category: 'Sentry',
    },
    {
      name: 'A-FLAM-40 Flame Sentry',
      code: ['🠫', '🠩', '🠪', '🠫', '🠩', '🠩'],
      category: 'Sentry',
    },
    {
      name: 'A-LAS-98 Laser Sentry',
      code: ['🠫', '🠩', '🠪', '🠫', '🠩', '🠪'],
      category: 'Sentry',
    },
    {
      name: 'E-AT-12 Anti-Tank Emplacement',
      code: ['🠫', '🠩', '🠨', '🠪', '🠪', '🠪'],
      category: 'Weapon',
    },
    {
      name: 'E-MG-101 HMG Emplacement',
      code: ['🠫', '🠩', '🠨', '🠪', '🠪', '🠨'],
      category: 'Weapon',
    },
    {
      name: 'SH-51 Directional Shield',
      code: ['🠫', '🠩', '🠨', '🠪', '🠩', '🠩'],
      category: 'Support',
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

  console.log('✅ Seeded ' + stratagems.length + ' stratagems!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

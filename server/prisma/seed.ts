// prisma/seed.ts
import dotenv from "dotenv";
dotenv.config(); // Load .env into process.env

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const stratagems = [
    { name: "SOS Beacon", code: ["↑", "↓", "→", "←"], category: "Support" },
    { name: "Resupply", code: ["↓", "↓", "↑", "→"], category: "Support" },
    { name: "Orbital EMS Strike", code: ["→", "→", "←", "↓"], category: "Orbital" },
    { name: "Orbital Gas Strike", code: ["→", "→", "↓", "→"], category: "Orbital" },
    { name: "Orbital Smoke Strike", code: ["→", "→", "↓", "↑"], category: "Orbital" },
    { name: "G-16 Gatling Sentry", code: ["↓", "↑", "→", "←"], category: "Weapon" },
    { name: "MG-43 Machine Gun", code: ["↓", "←", "↓", "↑", "→"], category: "Weapon" },
    { name: "MG-43 Machine Gun Sentry", code: ["↓", "↑", "→", "→", "↑"], category: "Weapon" },
    { name: "A/M-12 Mortar Sentry", code: ["↓", "↑", "→", "→", "↓"], category: "Weapon" },
    { name: "A/MLS-4X Rocket Sentry", code: ["↓", "↑", "→", "→", "←"], category: "Weapon" },
    { name: "APW-1 Anti-Materiel Rifle", code: ["↓", "←", "→", "↑", "↓"], category: "Weapon" },
    { name: "EAT-17 Expendable Anti-Tank", code: ["↓", "↓", "←", "↑", "→"], category: "Weapon" },
    { name: "GR-8 Recoilless Rifle", code: ["↓", "←", "→", "→", "←"], category: "Weapon" },
    { name: "FLAM-40 Flamethrower", code: ["↓", "←", "↑", "↓", "↑"], category: "Weapon" },
    { name: "Orbital Gatling Barrage", code: ["→", "↓", "←", "↑", "↑"], category: "Orbital" },
    { name: "Orbital Railcannon Strike", code: ["→", "↑", "↓", "↓", "→"], category: "Orbital" },
    { name: "LAS-99 Quasar Cannon", code: ["↓", "↓", "↑", "←", "→"], category: "Weapon" },
    { name: "Eagle Cluster Bomb", code: ["↑", "→", "↓", "↓", "→"], category: "Orbital" },
    { name: "Orbital Napalm Barrage", code: ["→", "→", "↓", "←", "→", "↑"], category: "Orbital" },
    { name: "Orbital 120 mm HE Barrage", code: ["→", "→", "↓", "←", "→", "↓"], category: "Orbital" },
    { name: "Orbital Walking Barrage", code: ["→", "↓", "→", "↓", "→", "↓"], category: "Orbital" },
    { name: "M-105 Stalwart", code: ["↓", "←", "↓", "↑", "↑", "←"], category: "Weapon" },
    { name: "AC-8 Autocannon", code: ["↓", "←", "↓", "↑", "↑", "→"], category: "Weapon" },
    { name: "ARC-3 Arc Thrower", code: ["↓", "→", "↓", "↑", "←", "←"], category: "Weapon" },
    { name: "A/AC-8 Autocannon Sentry", code: ["↓", "↑", "→", "↑", "←", "↑"], category: "Weapon" }
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

  console.log("✅ Seeded 25 stratagems!");
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

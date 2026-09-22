import { PrismaClient } from '@prisma/client';
import { levelsSeed } from './levels';
import { lessonsSeed } from './lessons';
import { exercisesSeed } from './exercises';
import { badgesSeed } from './badges';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // 1. Levels
  for (const level of levelsSeed) {
    const createdLevel = await prisma.level.upsert({
      where: { slug: level.slug },
      update: {
        title: level.title,
        description: level.description,
        order_index: level.order_index,
        xp_reward: level.xp_reward,
      },
      create: {
        slug: level.slug,
        title: level.title,
        description: level.description,
        order_index: level.order_index,
        xp_reward: level.xp_reward,
      },
    });
    console.log(`Upserted Level: ${createdLevel.title}`);
  }

  // Handle prerequisites
  for (const level of levelsSeed) {
    if (level.prerequisites && level.prerequisites.length > 0) {
      const currentLevel = await prisma.level.findUnique({ where: { slug: level.slug } });
      for (const reqSlug of level.prerequisites) {
        const reqLevel = await prisma.level.findUnique({ where: { slug: reqSlug } });
        if (currentLevel && reqLevel) {
          await prisma.levelPrerequisite.upsert({
            where: {
              level_id_prerequisite_level_id: {
                level_id: currentLevel.id,
                prerequisite_level_id: reqLevel.id,
              },
            },
            update: {},
            create: {
              level_id: currentLevel.id,
              prerequisite_level_id: reqLevel.id,
            },
          });
        }
      }
    }
  }

  // 2. Lessons
  for (const lesson of lessonsSeed) {
    const level = await prisma.level.findUnique({ where: { slug: lesson.levelSlug } });
    if (!level) continue;
    
    await prisma.lesson.upsert({
      where: { slug: lesson.slug },
      update: {
        title: lesson.title,
        description: lesson.description,
        order_index: lesson.order_index,
        xp_reward: lesson.xp_reward,
        level_id: level.id,
      },
      create: {
        slug: lesson.slug,
        title: lesson.title,
        description: lesson.description,
        order_index: lesson.order_index,
        xp_reward: lesson.xp_reward,
        level_id: level.id,
      },
    });
    console.log(`Upserted Lesson: ${lesson.title}`);
  }

  // 3. Exercises
  for (const exercise of exercisesSeed) {
    const lesson = await prisma.lesson.findUnique({ where: { slug: exercise.lessonSlug } });
    if (!lesson) continue;

    // In a real app we'd probably have an alternate key or just clear & re-seed exercises, 
    // but for simplicity we rely on creating them or we could delete many and insert.
    // Let's find if it exists by checking type and lesson_id and order_index
    const existing = await prisma.exercise.findFirst({
      where: {
        lesson_id: lesson.id,
        order_index: exercise.order_index,
        type: exercise.type,
      }
    });

    if (existing) {
      await prisma.exercise.update({
        where: { id: existing.id },
        data: {
          question_data: exercise.question_data,
          answer_data: exercise.answer_data,
          feedback_data: exercise.feedback_data,
          xp_value: exercise.xp_value,
        }
      });
      console.log(`Updated Exercise index ${exercise.order_index} in ${lesson.slug}`);
    } else {
      await prisma.exercise.create({
        data: {
          lesson_id: lesson.id,
          type: exercise.type,
          question_data: exercise.question_data,
          answer_data: exercise.answer_data,
          feedback_data: exercise.feedback_data,
          xp_value: exercise.xp_value,
          order_index: exercise.order_index,
        }
      });
      console.log(`Created Exercise index ${exercise.order_index} in ${lesson.slug}`);
    }
  }

  // 4. Badges
  for (const badge of badgesSeed) {
    await prisma.badge.upsert({
      where: { slug: badge.slug },
      update: {
        title: badge.title,
        description: badge.description,
        icon_url: badge.icon_url,
        unlock_criteria: badge.unlock_criteria,
      },
      create: {
        slug: badge.slug,
        title: badge.title,
        description: badge.description,
        icon_url: badge.icon_url,
        unlock_criteria: badge.unlock_criteria,
      },
    });
    console.log(`Upserted Badge: ${badge.title}`);
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

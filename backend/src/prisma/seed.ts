import prisma from '../config/db';

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create subjects
  const pythonSubject = await prisma.subject.create({
    data: {
      title: 'Python Programming',
      slug: 'python-programming',
      description: 'Learn Python from basics to advanced concepts with hands-on examples',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop',
      is_published: true,
    },
  });

  const dsaSubject = await prisma.subject.create({
    data: {
      title: 'Data Structures & Algorithms',
      slug: 'data-structures-algorithms',
      description: 'Master DSA with comprehensive examples and practice problems',
      thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=400&fit=crop',
      is_published: true,
    },
  });

  const webDevSubject = await prisma.subject.create({
    data: {
      title: 'Web Development Bootcamp',
      slug: 'web-development-bootcamp',
      description: 'Full-stack web development with modern technologies and frameworks',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
      is_published: true,
    },
  });

  console.log('✅ Subjects created');

  // Python Programming sections and videos
  const pythonSections = await Promise.all([
    prisma.section.create({
      data: {
        subject_id: pythonSubject.id,
        title: 'Introduction to Python',
        order_index: 1,
      },
    }),
    prisma.section.create({
      data: {
        subject_id: pythonSubject.id,
        title: 'Python Basics',
        order_index: 2,
      },
    }),
    prisma.section.create({
      data: {
        subject_id: pythonSubject.id,
        title: 'Advanced Python',
        order_index: 3,
      },
    }),
  ]);

  await prisma.video.createMany({
    data: [
      // Section 1 - Introduction
      {
        section_id: pythonSections[0].id,
        title: 'Welcome to Python Programming',
        description: 'Introduction to the course and Python',
        youtube_url: 'https://www.youtube.com/watch?v=kqtD5dpn9C8',
        order_index: 1,
        duration_seconds: 300,
      },
      {
        section_id: pythonSections[0].id,
        title: 'Setting Up Python Environment',
        description: 'Installing Python and setting up your IDE',
        youtube_url: 'https://www.youtube.com/watch?v=YYXdXT2l-Gg',
        order_index: 2,
        duration_seconds: 420,
      },
      {
        section_id: pythonSections[0].id,
        title: 'Your First Python Program',
        description: 'Writing and running your first Python script',
        youtube_url: 'https://www.youtube.com/watch?v=7wnove7K-ZQ',
        order_index: 3,
        duration_seconds: 360,
      },

      // Section 2 - Basics
      {
        section_id: pythonSections[1].id,
        title: 'Variables and Data Types',
        description: 'Understanding variables, strings, numbers, and booleans',
        youtube_url: 'https://www.youtube.com/watch?v=NptnmWvkbXI',
        order_index: 1,
        duration_seconds: 540,
      },
      {
        section_id: pythonSections[1].id,
        title: 'Control Flow - If Statements',
        description: 'Conditional statements and logical operators',
        youtube_url: 'https://www.youtube.com/watch?v=DZwmZCUUUYk',
        order_index: 2,
        duration_seconds: 480,
      },
      {
        section_id: pythonSections[1].id,
        title: 'Loops - For and While',
        description: 'Iterating with for loops and while loops',
        youtube_url: 'https://www.youtube.com/watch?v=6iF8Xb7Z3wQ',
        order_index: 3,
        duration_seconds: 600,
      },
      {
        section_id: pythonSections[1].id,
        title: 'Functions in Python',
        description: 'Creating and using functions',
        youtube_url: 'https://www.youtube.com/watch?v=9Os0o3wzS_I',
        order_index: 4,
        duration_seconds: 660,
      },

      // Section 3 - Advanced
      {
        section_id: pythonSections[2].id,
        title: 'Object-Oriented Programming',
        description: 'Classes, objects, and OOP principles',
        youtube_url: 'https://www.youtube.com/watch?v=wfcWRAxRVBA',
        order_index: 1,
        duration_seconds: 720,
      },
      {
        section_id: pythonSections[2].id,
        title: 'File Handling',
        description: 'Reading and writing files in Python',
        youtube_url: 'https://www.youtube.com/watch?v=Uhl-h04EHDA',
        order_index: 2,
        duration_seconds: 540,
      },
      {
        section_id: pythonSections[2].id,
        title: 'Error Handling and Exceptions',
        description: 'Try-except blocks and exception handling',
        youtube_url: 'https://www.youtube.com/watch?v=NIWwJbo-9_8',
        order_index: 3,
        duration_seconds: 480,
      },
    ],
  });

  console.log('✅ Python videos created');

  // DSA sections and videos
  const dsaSections = await Promise.all([
    prisma.section.create({
      data: {
        subject_id: dsaSubject.id,
        title: 'Introduction to DSA',
        order_index: 1,
      },
    }),
    prisma.section.create({
      data: {
        subject_id: dsaSubject.id,
        title: 'Arrays and Strings',
        order_index: 2,
      },
    }),
    prisma.section.create({
      data: {
        subject_id: dsaSubject.id,
        title: 'Linked Lists',
        order_index: 3,
      },
    }),
  ]);

  await prisma.video.createMany({
    data: [
      // Section 1 - Intro
      {
        section_id: dsaSections[0].id,
        title: 'What are Data Structures?',
        description: 'Introduction to data structures and algorithms',
        youtube_url: 'https://www.youtube.com/watch?v=RBSGKlAvoiM',
        order_index: 1,
        duration_seconds: 420,
      },
      {
        section_id: dsaSections[0].id,
        title: 'Time and Space Complexity',
        description: 'Understanding Big O notation',
        youtube_url: 'https://www.youtube.com/watch?v=__vX2sjlpXU',
        order_index: 2,
        duration_seconds: 540,
      },

      // Section 2 - Arrays
      {
        section_id: dsaSections[1].id,
        title: 'Arrays Fundamentals',
        description: 'Working with arrays',
        youtube_url: 'https://www.youtube.com/watch?v=QJNwK2uJyGs',
        order_index: 1,
        duration_seconds: 480,
      },
      {
        section_id: dsaSections[1].id,
        title: 'String Manipulation',
        description: 'Common string operations',
        youtube_url: 'https://www.youtube.com/watch?v=zRqwsRIe7kI',
        order_index: 2,
        duration_seconds: 420,
      },
      {
        section_id: dsaSections[1].id,
        title: 'Two Pointer Technique',
        description: 'Two pointer approach for array problems',
        youtube_url: 'https://www.youtube.com/watch?v=Hj5PMvjpq8A',
        order_index: 3,
        duration_seconds: 600,
      },

      // Section 3 - Linked Lists
      {
        section_id: dsaSections[2].id,
        title: 'Singly Linked Lists',
        description: 'Implementation and operations',
        youtube_url: 'https://www.youtube.com/watch?v=Nq7ok2yEpyI',
        order_index: 1,
        duration_seconds: 660,
      },
      {
        section_id: dsaSections[2].id,
        title: 'Doubly Linked Lists',
        description: 'Understanding doubly linked lists',
        youtube_url: 'https://www.youtube.com/watch?v=JdHLdgvsARM',
        order_index: 2,
        duration_seconds: 540,
      },
    ],
  });

  console.log('✅ DSA videos created');

  // Web Development sections and videos
  const webDevSections = await Promise.all([
    prisma.section.create({
      data: {
        subject_id: webDevSubject.id,
        title: 'HTML Fundamentals',
        order_index: 1,
      },
    }),
    prisma.section.create({
      data: {
        subject_id: webDevSubject.id,
        title: 'CSS Essentials',
        order_index: 2,
      },
    }),
    prisma.section.create({
      data: {
        subject_id: webDevSubject.id,
        title: 'JavaScript Basics',
        order_index: 3,
      },
    }),
    prisma.section.create({
      data: {
        subject_id: webDevSubject.id,
        title: 'React.js',
        order_index: 4,
      },
    }),
  ]);

  await prisma.video.createMany({
    data: [
      // HTML
      {
        section_id: webDevSections[0].id,
        title: 'HTML Structure and Tags',
        description: 'Understanding HTML document structure',
        youtube_url: 'https://www.youtube.com/watch?v=kUMe1FH4CHE',
        order_index: 1,
        duration_seconds: 600,
      },
      {
        section_id: webDevSections[0].id,
        title: 'Forms and Input Elements',
        description: 'Creating forms with various input types',
        youtube_url: 'https://www.youtube.com/watch?v=fNcJuPIZ2WE',
        order_index: 2,
        duration_seconds: 540,
      },

      // CSS
      {
        section_id: webDevSections[1].id,
        title: 'CSS Selectors and Properties',
        description: 'Styling elements with CSS',
        youtube_url: 'https://www.youtube.com/watch?v=1PnVor36_40',
        order_index: 1,
        duration_seconds: 660,
      },
      {
        section_id: webDevSections[1].id,
        title: 'Flexbox Layout',
        description: 'Modern layout with Flexbox',
        youtube_url: 'https://www.youtube.com/watch?v=fYq5PXgSsbE',
        order_index: 2,
        duration_seconds: 720,
      },
      {
        section_id: webDevSections[1].id,
        title: 'CSS Grid',
        description: 'Creating grids with CSS Grid',
        youtube_url: 'https://www.youtube.com/watch?v=jV8B24rSN5o',
        order_index: 3,
        duration_seconds: 600,
      },

      // JavaScript
      {
        section_id: webDevSections[2].id,
        title: 'JavaScript Variables and Functions',
        description: 'ES6+ features and syntax',
        youtube_url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
        order_index: 1,
        duration_seconds: 720,
      },
      {
        section_id: webDevSections[2].id,
        title: 'DOM Manipulation',
        description: 'Interacting with the DOM',
        youtube_url: 'https://www.youtube.com/watch?v=y17RuWkWdn8',
        order_index: 2,
        duration_seconds: 660,
      },

      // React
      {
        section_id: webDevSections[3].id,
        title: 'Introduction to React',
        description: 'React fundamentals and JSX',
        youtube_url: 'https://www.youtube.com/watch?v/DLX62G4lcZA',
        order_index: 1,
        duration_seconds: 780,
      },
      {
        section_id: webDevSections[3].id,
        title: 'React Hooks',
        description: 'useState, useEffect and custom hooks',
        youtube_url: 'https://www.youtube.com/watch?v=O6P86uwfdR0',
        order_index: 2,
        duration_seconds: 840,
      },
    ],
  });

  console.log('✅ Web Development videos created');

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

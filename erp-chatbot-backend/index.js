const admin = require('firebase-admin');

// Ensure this path is correct relative to this file
const myServiceKey = require('../erp-chatbot-backend/myServiceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(myServiceKey)
});
const db = admin.firestore();

async function seedStudents() {
  const studentSkillsList = [
    ['Python', 'ML'],
    ['Java', 'DSA'],
    ['C++', 'Competitive Programming'],
    ['AI', 'Python'],
    ['DBMS', 'SQL'],
    ['HTML', 'CSS', 'JavaScript'],
    ['Linux', 'Networking'],
    ['React', 'Frontend'],
    ['Cybersecurity', 'Python'],
    ['Android', 'Kotlin']
  ];

  for (let i = 1; i <= 10; i++) {
    const uid = `student${i}`;
    const name = `Student ${i}`;

    await db.collection('users').doc(uid).set({
      name,
      role: 'student',
      skills: studentSkillsList[i - 1]
    });

    await db.collection('grades').add({
      studentId: uid,
      subject: 'Math',
      grade: ['A', 'B', 'C'][i % 3]
    });

    await db.collection('grades').add({
      studentId: uid,
      subject: 'Science',
      grade: ['B', 'A', 'B'][i % 3]
    });

    await db.collection('grades').add({
      studentId: uid,
      subject: 'English',
      grade: ['A+', 'B+', 'C'][i % 3]
    });

    await db.collection('attendance').add({
      studentId: uid,
      totalDays: 30,
      present: 30 - i,
      absent: i
    });

    await db.collection('achievements').add({
      studentId: uid,
      title: 'Project Showcase',
      description: `Presented a project on topic ${i}`
    });

    if (i % 2 === 0) {
      await db.collection('medical_certificates').add({
        studentId: uid,
        date: `2025-05-${String(i).padStart(2, '0')}`,
        reason: 'Fever'
      });
    }
  }
}

async function seedTeachers() {
  const specializations = ['AI', 'ML', 'Networking', 'DBMS', 'Cybersecurity'];
  const skills = [
    ['Python', 'AI'],
    ['ML', 'Data Analysis'],
    ['Java', 'Networking'],
    ['SQL', 'DBMS'],
    ['Cybersecurity', 'Linux']
  ];
  const locations = [
    'A Block, 2nd Floor',
    'B Block, Ground Floor',
    'C Block, 1st Floor',
    'Library Building, Room 204',
    'Admin Wing, Top Floor'
  ];
  const availability = [true, false, true, true, false];

  for (let i = 1; i <= 5; i++) {
    const uid = `teacher${i}`;
    await db.collection('users').doc(uid).set({
      name: `Teacher ${i}`,
      role: 'teacher',
      specialization: specializations[i - 1],
      skills: skills[i - 1],
      location: locations[i - 1],
      available: availability[i - 1]
    });
  }
}

async function run() {
  await seedStudents();
  await seedTeachers();
  console.log('✅ Dummy data inserted');
}

run().catch(console.error);

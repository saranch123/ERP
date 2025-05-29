const admin = require('firebase-admin');

const myServiceKey = require('./erp-chatbot-backend/myServiceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(myServiceKey)
});
const db = admin.firestore();

async function seedStudents() {
  const studentProfiles = [
    { name: 'Ramesh', skills: ['Python', 'ML'] },
    { name: 'Priya', skills: ['Java', 'DSA'] },
    { name: 'Vikram', skills: ['C++', 'Competitive Programming'] },
    { name: 'Sneha', skills: ['AI', 'Python'] },
    { name: 'Aarav', skills: ['DBMS', 'SQL'] },
    { name: 'Meera', skills: ['HTML', 'CSS', 'JavaScript'] },
    { name: 'Aditya', skills: ['Linux', 'Networking'] },
    { name: 'Diya', skills: ['React', 'Frontend'] },
    { name: 'Nikhil', skills: ['Cybersecurity', 'Python'] },
    { name: 'Isha', skills: ['Android', 'Kotlin'] }
  ];

  for (let i = 0; i < studentProfiles.length; i++) {
    const uid = `student${i + 1}`;
    const { name, skills } = studentProfiles[i];

    await db.collection('users').doc(uid).set({
      name,
      role: 'student',
      skills
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
      description: `Presented a project on topic ${i + 1}`
    });

    if (i % 2 === 0) {
      await db.collection('medical_certificates').add({
        studentId: uid,
        date: `2025-05-${String(i + 1).padStart(2, '0')}`,
        reason: 'Fever'
      });
    }
  }
}

async function seedTeachers() {
  const teachers = [
    {
      name: 'Prof. Rohit',
      specialization: 'AI',
      skills: ['Python', 'AI', 'Deep Learning'],
      location: 'A Block, 2nd Floor',
      available: true
    },
    {
      name: 'Dr. Saran',
      specialization: 'ML',
      skills: ['ML', 'Data Analysis', 'TensorFlow'],
      location: 'B Block, Ground Floor',
      available: false
    },
    {
      name: 'Ms. Tripti',
      specialization: 'Networking',
      skills: ['Java', 'Networking', 'Cybersecurity'],
      location: 'C Block, 1st Floor',
      available: true
    },
    {
      name: 'Prof. Shubhang',
      specialization: 'DBMS',
      skills: ['SQL', 'DBMS', 'MongoDB'],
      location: 'Library Building, Room 204',
      available: true
    },
    {
      name: 'Dr. Tamish',
      specialization: 'Cybersecurity',
      skills: ['Cybersecurity', 'Linux', 'Ethical Hacking'],
      location: 'Admin Wing, Top Floor',
      available: false
    }
  ];

  for (let i = 0; i < teachers.length; i++) {
    const uid = `teacher${i + 1}`;
    await db.collection('users').doc(uid).set({
      ...teachers[i],
      role: 'teacher'
    });
  }
}

async function run() {
  await seedStudents();
  await seedTeachers();
  console.log('✅ Dummy data inserted');
}

run().catch(console.error);

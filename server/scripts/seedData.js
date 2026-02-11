import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Subject from '../models/Subject.js';
import Chapter from '../models/Chapter.js';
import Quiz from '../models/Quiz.js';
import User from '../models/User.js';
import connectDB from '../config/db.js';

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await Subject.deleteMany();
        await Chapter.deleteMany();
        await Quiz.deleteMany();
        
        console.log('🗑️  Cleared existing data');

        // Create demo users
        const demoStudent = await User.findOne({ email: 'student@demo.com' });
        if (!demoStudent) {
            await User.create({
                name: 'Demo Student',
                email: 'student@demo.com',
                password: 'password123',
                role: 'student',
                xp: 1200,
                level: 5,
                streak: 3
            });
            console.log('✅ Created demo student');
        }

        const demoTeacher = await User.findOne({ email: 'teacher@demo.com' });
        if (!demoTeacher) {
            await User.create({
                name: 'Demo Teacher',
                email: 'teacher@demo.com',
                password: 'password123',
                role: 'teacher',
                assignedSubjects: []
            });
            console.log('✅ Created demo teacher');
        }

        const demoAdmin = await User.findOne({ email: 'admin@demo.com' });
        if (!demoAdmin) {
            await User.create({
                name: 'Demo Admin',
                email: 'admin@demo.com',
                password: 'password123',
                role: 'admin'
            });
            console.log('✅ Created demo admin');
        }

        // Create subjects
        const subjects = [
            { id: 'physics', title: 'Physics', description: 'Explore the fundamental laws of the universe.', icon: '⚛️' },
            { id: 'mathematics', title: 'Mathematics', description: 'The language of numbers, structure, space, and change.', icon: '📐' },
            { id: 'chemistry', title: 'Chemistry', description: 'The study of matter and its interactions.', icon: '🧪' },
            { id: 'biology', title: 'Biology', description: 'The study of life and living organisms.', icon: '🧬' },
            { id: 'computer', title: 'Computer Science', description: 'Computation, information, and automation.', icon: '💻' },
            { id: 'english', title: 'English', description: 'Literature, grammar, and communication skills.', icon: '📚' }
        ];

        await Subject.insertMany(subjects);
        console.log('✅ Created subjects');

        // Create chapters for Physics
        const physicsChapters = [
            {
                id: 'kinematics',
                subjectId: 'physics',
                title: 'Chapter 1: Kinematics',
                description: 'Motion in a straight line, vectors, and projectile motion.',
                topics: ['Velocity & Speed', 'Acceleration', 'Projectile Motion'],
                content: {
                    type: 'text',
                    body: `## Introduction to Kinematics\n\nKinematics is the branch of mechanics that describes the motion of points, bodies (objects), and systems of bodies (groups of objects) without considering the forces that cause them to move.\n\n### Key Concepts\n\n- **Displacement**: Change in position of an object.\n- **Velocity**: Rate of change of displacement.\n- **Acceleration**: Rate of change of velocity.\n\n### Equations of Motion\n\n1. v = u + at\n2. s = ut + (1/2)at²\n3. v² = u² + 2as\n\nWhere:\n- u = initial velocity\n- v = final velocity\n- a = acceleration\n- t = time\n- s = displacement`
                },
                teacherNote: 'Focus on the equations of motion. They are crucial for solving projectile motion problems!',
                order: 1
            },
            {
                id: 'laws-of-motion',
                subjectId: 'physics',
                title: 'Chapter 2: Laws of Motion',
                description: 'Newton\'s three laws and their applications.',
                topics: ['First Law', 'Second Law', 'Third Law', 'Free Body Diagrams'],
                content: {
                    type: 'text',
                    body: `## Newton's Laws of Motion\n\n### First Law (Law of Inertia)\nAn object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.\n\n### Second Law\nF = ma\nThe acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.\n\n### Third Law\nFor every action, there is an equal and opposite reaction.`
                },
                teacherNote: 'Practice drawing free body diagrams for different scenarios.',
                order: 2
            }
        ];

        await Chapter.insertMany(physicsChapters);
        console.log('✅ Created Physics chapters');

        // Create quiz for Kinematics
        const kinematicsQuiz = {
            subjectId: 'physics',
            chapterId: 'kinematics',
            title: 'Kinematics Basics Quiz',
            description: 'Test your understanding of motion and kinematics',
            questions: [
                {
                    id: 1,
                    type: 'mcq',
                    question: 'Which of the following is a vector quantity?',
                    options: ['Speed', 'Distance', 'Displacement', 'Mass'],
                    correctAnswer: 'Displacement',
                    points: 100,
                    explanation: 'Displacement has both magnitude and direction, making it a vector quantity.'
                },
                {
                    id: 2,
                    type: 'mcq',
                    question: 'The slope of a velocity-time graph represents:',
                    options: ['Displacement', 'Acceleration', 'Speed', 'Distance'],
                    correctAnswer: 'Acceleration',
                    points: 100,
                    explanation: 'The rate of change of velocity is acceleration.'
                },
                {
                    id: 3,
                    type: 'fill-in',
                    question: 'The rate of change of displacement is called ______.',
                    correctAnswer: 'velocity',
                    points: 150,
                    explanation: 'Velocity is defined as the rate of change of displacement with respect to time.'
                },
                {
                    id: 4,
                    type: 'mcq',
                    question: 'A car accelerates from rest to 20 m/s in 4 seconds. What is its acceleration?',
                    options: ['5 m/s²', '10 m/s²', '20 m/s²', '80 m/s²'],
                    correctAnswer: '5 m/s²',
                    points: 150,
                    explanation: 'Using v = u + at, where u=0, v=20, t=4: a = (v-u)/t = 20/4 = 5 m/s²'
                }
            ],
            timeLimit: 30,
            passingScore: 60
        };

        await Quiz.create(kinematicsQuiz);
        console.log('✅ Created Kinematics quiz');

        console.log('\n🎉 Database seeded successfully!');
        console.log('\n📝 Demo Credentials:');
        console.log('Student: student@demo.com / password123');
        console.log('Teacher: teacher@demo.com / password123\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedData();


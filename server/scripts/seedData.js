import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Subject from '../models/Subject.js';
import Chapter from '../models/Chapter.js';
import Quiz from '../models/Quiz.js';
import Progress from '../models/Progress.js';

dotenv.config();

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/edu-nexus';
        await mongoose.connect(mongoURI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Subject.deleteMany({});
        await Chapter.deleteMany({});
        await Quiz.deleteMany({});
        await Progress.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Create Users
        const users = await User.create([
            {
                name: 'Admin User',
                email: 'admin@demo.com',
                password: 'password123',
                role: 'admin',
                avatar: 'Felix',
                xp: 0,
                level: 1
            },
            {
                name: 'Demo Teacher',
                email: 'teacher@demo.com',
                password: 'password123',
                role: 'teacher',
                avatar: 'Felix'
            },
            {
                name: 'Demo Student',
                email: 'student@demo.com',
                password: 'password123',
                role: 'student',
                avatar: 'Felix',
                classLevel: 10,
                school: 'Springfield High',
                xp: 1500,
                level: 2,
                streak: 5
            }
        ]);
        console.log('✅ Created users');

        // Create Subjects
        // Create Subjects based on ICSE/ISC Curriculum

        const subjectsData = [
            // --- Classes 6-8 (Middle School) ---
            { title: 'English', icon: '🇬🇧', id: 'eng_mid', classes: ['6', '7', '8'], stream: null },
            { title: 'Hindi', icon: '🇮🇳', id: 'hin_mid', classes: ['6', '7', '8'], stream: null },
            { title: 'History, Civics & Geography', icon: '🌍', id: 'sst_mid', classes: ['6', '7', '8'], stream: null },
            { title: 'Mathematics', icon: '📐', id: 'math_mid', classes: ['6', '7', '8'], stream: null },
            { title: 'Science (Phy, Chem, Bio)', icon: '🔬', id: 'sci_mid', classes: ['6', '7', '8'], stream: null },
            { title: 'Computer Applications', icon: '💻', id: 'comp_mid', classes: ['6', '7', '8'], stream: null },
            { title: 'Environmental Education', icon: '🌱', id: 'evs_mid', classes: ['6', '7', '8'], stream: null },
            { title: 'Art', icon: '🎨', id: 'art_mid', classes: ['6', '7', '8'], stream: null },

            // --- Classes 9-10 (ICSE Board) ---
            // Group I (Compulsory)
            { title: 'English', icon: '🇬🇧', id: 'eng_icse', classes: ['9', '10'], stream: null },
            { title: 'Second Language', icon: '🗣️', id: 'lang2_icse', classes: ['9', '10'], stream: null },
            { title: 'History, Civics & Geography', icon: '🌍', id: 'sst_icse', classes: ['9', '10'], stream: null },
            // Group II (Electives)
            { title: 'Mathematics', icon: '📐', id: 'math_icse', classes: ['9', '10'], stream: null },
            { title: 'Science (Phy, Chem, Bio)', icon: '🔬', id: 'sci_icse', classes: ['9', '10'], stream: null },
            { title: 'Economics', icon: '💰', id: 'eco_icse', classes: ['9', '10'], stream: null },
            { title: 'Commercial Studies', icon: '💼', id: 'comm_icse', classes: ['9', '10'], stream: null },
            { title: 'Environmental Science', icon: '🌱', id: 'evs_icse', classes: ['9', '10'], stream: null },
            // Group III (Electives)
            { title: 'Computer Applications', icon: '💻', id: 'ca_icse', classes: ['9', '10'], stream: null },
            { title: 'Economic Applications', icon: '📊', id: 'eco_app_icse', classes: ['9', '10'], stream: null },
            { title: 'Commercial Applications', icon: '🏢', id: 'comm_app_icse', classes: ['9', '10'], stream: null },
            { title: 'Art', icon: '🎨', id: 'art_icse', classes: ['9', '10'], stream: null },
            { title: 'Physical Education', icon: '🏃', id: 'pe_icse', classes: ['9', '10'], stream: null },
            { title: 'Fashion Designing', icon: '👗', id: 'fd_icse', classes: ['9', '10'], stream: null },

            // --- Classes 11-12 (ISC Board) ---
            // Science Stream
            { title: 'Physics', icon: '⚛️', id: 'phy_isc', classes: ['11', '12'], stream: 'Science' },
            { title: 'Chemistry', icon: '🧪', id: 'chem_isc', classes: ['11', '12'], stream: 'Science' },
            { title: 'Biology', icon: '🧬', id: 'bio_isc', classes: ['11', '12'], stream: 'Science' },
            { title: 'Mathematics', icon: '📐', id: 'math_isc_sci', classes: ['11', '12'], stream: 'Science' },
            { title: 'Computer Science', icon: '💻', id: 'cs_isc', classes: ['11', '12'], stream: 'Science' },
            { title: 'Biotechnology', icon: '🧫', id: 'biotech_isc', classes: ['11', '12'], stream: 'Science' },

            { title: 'Environmental Science', icon: '🌱', id: 'evs_isc_sci', classes: ['11', '12'], stream: 'Science' },

            // Commerce Stream
            { title: 'Accounts', icon: '📒', id: 'acc_isc', classes: ['11', '12'], stream: 'Commerce' },
            { title: 'Commerce', icon: '💼', id: 'comm_isc', classes: ['11', '12'], stream: 'Commerce' },
            { title: 'Economics', icon: '💰', id: 'eco_isc', classes: ['11', '12'], stream: 'Commerce' },
            { title: 'Mathematics', icon: '📐', id: 'math_isc_comm', classes: ['11', '12'], stream: 'Commerce' },
            { title: 'Business Studies', icon: '👔', id: 'bst_isc', classes: ['11', '12'], stream: 'Commerce' },

            // Arts / Humanities Stream
            { title: 'History', icon: '📜', id: 'hist_isc', classes: ['11', '12'], stream: 'Arts' },
            { title: 'Geography', icon: '🌍', id: 'geo_isc', classes: ['11', '12'], stream: 'Arts' },
            { title: 'Political Science', icon: '⚖️', id: 'pol_isc', classes: ['11', '12'], stream: 'Arts' },
            { title: 'Sociology', icon: '👥', id: 'soc_isc', classes: ['11', '12'], stream: 'Arts' },
            { title: 'Psychology', icon: '🧠', id: 'psych_isc', classes: ['11', '12'], stream: 'Arts' },
            { title: 'Philosophy', icon: '🤔', id: 'phil_isc', classes: ['11', '12'], stream: 'Arts' },
            { title: 'English Literature', icon: '📖', id: 'eng_lit_isc', classes: ['11', '12'], stream: 'Arts' },
            { title: 'Environmental Science', icon: '🌱', id: 'evs_isc_arts', classes: ['11', '12'], stream: 'Arts' },
            { title: 'Physical Education', icon: '🏃', id: 'pe_isc_arts', classes: ['11', '12'], stream: 'Arts' }
        ];

        const subjects = await Subject.create(subjectsData.map(s => ({
            ...s,
            description: `Study material and quizzes for ${s.title}`,
        })));
        console.log('✅ Created subjects');

        // Class 10 Maths Chapters
        const mathChaptersData = [
            {
                id: 'ch_math_10_1',
                title: 'Unit I: Number Systems - Real Numbers',
                description: 'Fundamental Theorem of Arithmetic, Irrational Numbers.',
                topics: ['Euclid Division Lemma', 'Fundamental Theorem of Arithmetic', 'Irrational Numbers'],
                content: {
                    type: 'video',
                    body: 'Introduction to Real Numbers and their properties.',
                    videoUrl: 'https://www.youtube.com/embed/3KnwD1dolBo'
                },
                order: 1
            },
            {
                id: 'ch_math_10_2',
                title: 'Unit II: Algebra - Polynomials',
                description: 'Zeros of a polynomial, Relationship between zeros and coefficients.',
                topics: ['Geometrical Meaning of Zeros', 'Zeros and Coefficients', 'Division Algorithm'],
                content: {
                    type: 'video',
                    body: 'Zeros of a polynomial. Relationship between zeros and coefficients of quadratic polynomials.',
                    videoUrl: 'https://www.youtube.com/embed/21H8oo3nxP0'
                },
                order: 2
            },
            {
                id: 'ch_math_10_3',
                title: 'Unit II: Algebra - Linear Equations',
                description: 'Pair of Linear Equations in Two Variables.',
                topics: ['Graphical Method', 'Substitution Method', 'Elimination Method', 'Cross-Multiplication'],
                content: {
                    type: 'video',
                    body: 'Solving pairs of linear equations.',
                    videoUrl: 'https://www.youtube.com/embed/ExampleVideoID'
                },
                order: 3
            },
            {
                id: 'ch_math_10_4',
                title: 'Unit II: Algebra - Quadratic Equations',
                description: 'Standard form, Roots, Solution by factorization and quadratic formula.',
                topics: ['Standard Form', 'Factorization', 'Quadratic Formula', 'Nature of Roots'],
                content: {
                    type: 'video',
                    body: 'Mastering Quadratic Equations.',
                    videoUrl: 'https://www.youtube.com/embed/ExampleVideoID'
                },
                order: 4
            },
            {
                id: 'ch_math_10_5',
                title: 'Unit II: Algebra - Arithmetic Progressions',
                description: 'nth term and sum of first n terms of AP.',
                topics: ['AP Introduction', 'nth Term', 'Sum of n Terms'],
                content: {
                    type: 'video',
                    body: 'Arithmetic Progressions explained.',
                    videoUrl: 'https://www.youtube.com/embed/ExampleVideoID'
                },
                order: 5
            },
            {
                id: 'ch_math_10_6',
                title: 'Unit III: Coordinate Geometry',
                description: 'Distance formula, Section formula.',
                topics: ['Distance Formula', 'Section Formula', 'Area of Triangle'],
                content: {
                    type: 'video',
                    body: 'Coordinate Geometry basics.',
                    videoUrl: 'https://www.youtube.com/embed/ExampleVideoID'
                },
                order: 6
            },
            {
                id: 'ch_math_10_7',
                title: 'Unit IV: Geometry - Triangles',
                description: 'Similar triangles, BPT, Pythagoras Theorem.',
                topics: ['Similarity', 'BPT', 'Criteria for Similarity', 'Areas of Similar Triangles', 'Pythagoras Theorem'],
                content: {
                    type: 'video',
                    body: 'Understanding Triangles theorems.',
                    videoUrl: 'https://www.youtube.com/embed/ExampleVideoID'
                },
                order: 7
            },
            {
                id: 'ch_math_10_8',
                title: 'Unit IV: Geometry - Circles',
                description: 'Tangent to a circle, Number of tangents from a point.',
                topics: ['Tangent to a Circle', 'Properties of Tangents'],
                content: {
                    type: 'video',
                    body: 'Geometry of Circles.',
                    videoUrl: 'https://www.youtube.com/embed/ExampleVideoID'
                },
                order: 8
            },
            {
                id: 'ch_math_10_9',
                title: 'Unit V: Trigonometry',
                description: 'Trigonometric ratios, Identities, Heights and Distances.',
                topics: ['Trigonometric Ratios', 'Values of Ratios', 'Identities', 'Heights and Distances'],
                content: {
                    type: 'video',
                    body: 'Introduction to Trigonometry.',
                    videoUrl: 'https://www.youtube.com/embed/ExampleVideoID'
                },
                order: 9
            },
            {
                id: 'ch_math_10_10',
                title: 'Unit VI: Mensuration',
                description: 'Areas related to Circles, Surface Areas and Volumes.',
                topics: ['Area of Sector/Segment', 'Surface Area Combinations', 'Volume Combinations'],
                content: {
                    type: 'video',
                    body: 'Mensuration: Areas and Volumes.',
                    videoUrl: 'https://www.youtube.com/embed/ExampleVideoID'
                },
                order: 10
            },
            {
                id: 'ch_math_10_11',
                title: 'Unit VII: Statistics & Probability',
                description: 'Mean, Median, Mode of grouped data; Probability.',
                topics: ['Mean', 'Median', 'Mode', 'Probability'],
                content: {
                    type: 'video',
                    body: 'Statistics and Probability concepts.',
                    videoUrl: 'https://www.youtube.com/embed/ExampleVideoID'
                },
                order: 11
            }
        ];

        const chapters = await Promise.all(mathChaptersData.map(ch =>
            Chapter.create({
                ...ch,
                subjectId: 'math_icse',
                isPublished: true
            })
        ));
        console.log('✅ Created Maths chapters');

        // Navigation for Quizzes
        // We will add quizzes for at least the first few chapters
        await Quiz.create([
            {
                subjectId: 'math_icse',
                chapterId: 'ch_math_10_1',
                title: 'Quiz: Real Numbers',
                gameType: 'shooter',
                questions: [
                    { id: 1, type: 'mcq', question: 'Which of the following is an irrational number?', options: ['2.5', '√9', '√2', '0.333...'], correctAnswer: '√2', points: 100 },
                    { id: 2, type: 'mcq', question: 'HCF of 96 and 404 is?', options: ['4', '2', '8', '12'], correctAnswer: '4', points: 100 },
                    { id: 3, type: 'mcq', question: 'The decimal expansion of 13/3125 terminates after?', options: ['1 decimal place', '2 decimal places', '5 decimal places', '4 decimal places'], correctAnswer: '5 decimal places', points: 100 },
                    { id: 4, type: 'mcq', question: 'Fundamental Theorem of Arithmetic states every composite number can be expressed as product of?', options: ['Primes', 'Integers', 'Naturals', 'Evens'], correctAnswer: 'Primes', points: 100 }
                ],
                timeLimit: 30,
                passingScore: 50,
                isActive: true
            },
            {
                subjectId: 'math_icse',
                chapterId: 'ch_math_10_2',
                title: 'Quiz: Polynomials',
                gameType: 'memory',
                questions: [
                    { id: 1, type: 'mcq', question: 'If α, β are zeros of 2x² - 8x + 6, then α+β is?', options: ['4', '-4', '3', '8'], correctAnswer: '4', points: 100 },
                    { id: 2, type: 'mcq', question: 'Degree of a quadratic polynomial is?', options: ['0', '1', '2', '3'], correctAnswer: '2', points: 100 },
                    { id: 3, type: 'mcq', question: 'Graph of quadratic polynomial is a?', options: ['Straight line', 'Circle', 'Parabola', 'Ellipse'], correctAnswer: 'Parabola', points: 100 },
                    { id: 4, type: 'mcq', question: 'Sum of zeros of ax² + bx + c is?', options: ['c/a', '-b/a', 'b/a', '-c/a'], correctAnswer: '-b/a', points: 100 }
                ],
                timeLimit: 30,
                passingScore: 50,
                isActive: true
            },
            {
                subjectId: 'math_icse',
                chapterId: 'ch_math_10_3',
                title: 'Quiz: Linear Equations',
                gameType: 'shooter',
                questions: [
                    { id: 1, type: 'mcq', question: 'The pair of equations x=a and y=b graphically represents lines which are?', options: ['Parallel', 'Intersecting at (b,a)', 'Coincident', 'Intersecting at (a,b)'], correctAnswer: 'Intersecting at (a,b)', points: 100 },
                    { id: 2, type: 'mcq', question: 'If lines are parallel, the system has?', options: ['Unique Solution', 'No Solution', 'Infinite Solutions', 'Function'], correctAnswer: 'No Solution', points: 100 },
                    { id: 3, type: 'mcq', question: 'Value of k for which x + 2y = 3 and 5x + ky = 7 has unique solution?', options: ['k=10', 'k≠10', 'k=5', 'k≠5'], correctAnswer: 'k≠10', points: 100 }
                ],
                timeLimit: 30,
                passingScore: 50,
                isActive: true
            },
            {
                subjectId: 'math_icse',
                chapterId: 'ch_math_10_4',
                title: 'Quiz: Quadratic Equations',
                gameType: 'memory',
                questions: [
                    { id: 1, type: 'mcq', question: 'Discriminant of ax² + bx + c = 0 is?', options: ['b² - 4ac', 'b² + 4ac', '4ac - b²', 'b - 4ac'], correctAnswer: 'b² - 4ac', points: 100 },
                    { id: 2, type: 'mcq', question: 'If discriminant is greater than 0, roots are?', options: ['Real & Equal', 'Real & Distinct', 'No Real Roots', 'Imaginary'], correctAnswer: 'Real & Distinct', points: 100 },
                    { id: 3, type: 'mcq', question: 'Roots of x² - 9 = 0 are?', options: ['3', '-3', '±3', '9'], correctAnswer: '±3', points: 100 }
                ],
                timeLimit: 30,
                passingScore: 50,
                isActive: true
            },
            {
                subjectId: 'math_icse',
                chapterId: 'ch_math_10_5',
                title: 'Quiz: Arithmetic Progressions',
                gameType: 'shooter',
                questions: [
                    { id: 1, type: 'mcq', question: 'In AP: 2, 7, 12..., common difference is?', options: ['2', '7', '5', '12'], correctAnswer: '5', points: 100 },
                    { id: 2, type: 'mcq', question: 'Formula for nth term of AP?', options: ['a+(n-1)d', 'a+nd', 'a+(n+1)d', 'n/2[2a+(n-1)d]'], correctAnswer: 'a+(n-1)d', points: 100 },
                    { id: 3, type: 'mcq', question: 'What is the next term in AP: 5, 8, 11...?', options: ['13', '14', '15', '16'], correctAnswer: '14', points: 100 }
                ],
                timeLimit: 30,
                passingScore: 50,
                isActive: true
            },
            {
                subjectId: 'math_icse',
                chapterId: 'ch_math_10_6',
                title: 'Quiz: Coordinate Geometry',
                gameType: 'memory',
                questions: [
                    { id: 1, type: 'mcq', question: 'Distance of point (x, y) from origin is?', options: ['√(x+y)', '√(x²+y²)', 'x+y', 'x²+y²'], correctAnswer: '√(x²+y²)', points: 100 },
                    { id: 2, type: 'mcq', question: 'Coordinates of origin are?', options: ['(0,1)', '(1,0)', '(0,0)', '(1,1)'], correctAnswer: '(0,0)', points: 100 },
                    { id: 3, type: 'mcq', question: 'Section formula divides a line segment in ratio?', options: ['m:1', 'm:n', '1:1', 'k:1'], correctAnswer: 'm:n', points: 100 }
                ],
                timeLimit: 30,
                passingScore: 50,
                isActive: true
            },
            {
                subjectId: 'math_icse',
                chapterId: 'ch_math_10_7',
                title: 'Quiz: Triangles',
                gameType: 'shooter',
                questions: [
                    { id: 1, type: 'mcq', question: 'All circles are?', options: ['Congruent', 'Similar', 'Both', 'None'], correctAnswer: 'Similar', points: 100 },
                    { id: 2, type: 'mcq', question: 'Sides of two similar triangles are in ratio 4:9. Areas are in ratio?', options: ['2:3', '4:9', '81:16', '16:81'], correctAnswer: '16:81', points: 100 },
                    { id: 3, type: 'mcq', question: 'Pythagoras theorem applies to?', options: ['Equilateral', 'Isosceles', 'Right-angled', 'All'], correctAnswer: 'Right-angled', points: 100 }
                ],
                timeLimit: 30,
                passingScore: 50,
                isActive: true
            },
            {
                subjectId: 'math_icse',
                chapterId: 'ch_math_10_8',
                title: 'Quiz: Circles',
                gameType: 'memory',
                questions: [
                    { id: 1, type: 'mcq', question: 'Line touching a circle at one point is called?', options: ['Secant', 'Chord', 'Tangent', 'Diameter'], correctAnswer: 'Tangent', points: 100 },
                    { id: 2, type: 'mcq', question: 'Number of tangents from a point inside a circle?', options: ['One', 'Two', 'Zero', 'Infinite'], correctAnswer: 'Zero', points: 100 },
                    { id: 3, type: 'mcq', question: 'Angle between tangent and radius at point of contact?', options: ['45°', '60°', '90°', '180°'], correctAnswer: '90°', points: 100 }
                ],
                timeLimit: 30,
                passingScore: 50,
                isActive: true
            },
            {
                subjectId: 'math_icse',
                chapterId: 'ch_math_10_9',
                title: 'Quiz: Trigonometry',
                gameType: 'shooter',
                questions: [
                    { id: 1, type: 'mcq', question: 'Value of sin 30° is?', options: ['1/2', '1/√2', '√3/2', '1'], correctAnswer: '1/2', points: 100 },
                    { id: 2, type: 'mcq', question: 'tan 45° is equal to?', options: ['0', '1', '∞', '√3'], correctAnswer: '1', points: 100 },
                    { id: 3, type: 'mcq', question: 'Identitiy: sin²θ + cos²θ = ?', options: ['0', '1', '-1', '2'], correctAnswer: '1', points: 100 }
                ],
                timeLimit: 30,
                passingScore: 50,
                isActive: true
            },
            {
                subjectId: 'math_icse',
                chapterId: 'ch_math_10_10',
                title: 'Quiz: Mensuration',
                gameType: 'memory',
                questions: [
                    { id: 1, type: 'mcq', question: 'Volume of cylinder is?', options: ['πr²h', '1/3πr²h', '2πrh', 'πrl'], correctAnswer: 'πr²h', points: 100 },
                    { id: 2, type: 'mcq', question: 'TSA of sphere is?', options: ['2πr²', '3πr²', '4πr²', 'πr²'], correctAnswer: '4πr²', points: 100 },
                    { id: 3, type: 'mcq', question: 'Volume of cone is?', options: ['πr²h', '1/3πr²h', '2πrh', '4/3πr³'], correctAnswer: '1/3πr²h', points: 100 }
                ],
                timeLimit: 30,
                passingScore: 50,
                isActive: true
            },
            {
                subjectId: 'math_icse',
                chapterId: 'ch_math_10_11',
                title: 'Quiz: Statistics & Probability',
                gameType: 'shooter',
                questions: [
                    { id: 1, type: 'mcq', question: 'Probability of sure event is?', options: ['0', '0.5', '1', '-1'], correctAnswer: '1', points: 100 },
                    { id: 2, type: 'mcq', question: 'Mode is the?', options: ['Middle value', 'Most frequent', 'Average', 'Range'], correctAnswer: 'Most frequent', points: 100 },
                    { id: 3, type: 'mcq', question: 'Probability of an event E + Probability of not E is?', options: ['0', '1', '-1', '0.5'], correctAnswer: '1', points: 100 }
                ],
                timeLimit: 30,
                passingScore: 50,
                isActive: true
            }
        ]);
        console.log('✅ Created quizzes');

        console.log('🎉 Database seeded successfully!');
        console.log('\n📧 Test Credentials:');
        console.log('Admin: admin@demo.com / password123');
        console.log('Teacher: teacher@demo.com / password123');
        console.log('Student: student@demo.com / password123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
        process.exit(1);
    }
};

seedDatabase();

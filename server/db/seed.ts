import { getDb, setupTables } from './index';
import bcrypt from 'bcryptjs';

async function seed() {
    try {
        const db = await getDb();
        console.log('--- Initializing Global Database Terminal ---');

        await db.exec('DROP TABLE IF EXISTS reviews');
        await db.exec('DROP TABLE IF EXISTS enrollments');
        await db.exec('DROP TABLE IF EXISTS lessons');
        await db.exec('DROP TABLE IF EXISTS modules');
        await db.exec('DROP TABLE IF EXISTS courses');
        await db.exec('DROP TABLE IF EXISTS categories');
        await db.exec('DROP TABLE IF EXISTS quizzes');
        await db.exec('DROP TABLE IF EXISTS users');

        console.log('--- Re-initializing Schema ---');
        await setupTables(db);

        const hashedPassword = await bcrypt.hash('password123', 10);

        // Initial Entity Population
        await db.run(
            'INSERT INTO users (name, email, password, role, is_verified) VALUES (?, ?, ?, ?, ?)',
            ['Jane Student', 'jane@varsity.com', hashedPassword, 'student', 1]
        );
        await db.run(
            'INSERT INTO users (name, email, password, role, is_verified) VALUES (?, ?, ?, ?, ?)',
            ['Dr. Instructor', 'instructor@varsity.com', hashedPassword, 'instructor', 1]
        );
        await db.run(
            'INSERT INTO users (name, email, password, role, is_verified) VALUES (?, ?, ?, ?, ?)',
            ['Admin User', 'admin@varsity.com', hashedPassword, 'admin', 1]
        );
        await db.run(
            'INSERT INTO users (name, email, password, role, is_verified) VALUES (?, ?, ?, ?, ?)',
            ['Pending Instructor', 'pending@varsity.com', hashedPassword, 'instructor', 0]
        );


        console.log('--- Database Seeding Successful ---');
    } catch (err) {
        console.error('--- Seeding Error: ---', err);
    }
}

seed();

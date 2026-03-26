import { getDb } from './index';
import { seed } from './seed';

async function resetAndSeed() {
    const db = await getDb();

    await seed();
    console.log('--- Database Reset Complete ---');
}

resetAndSeed();

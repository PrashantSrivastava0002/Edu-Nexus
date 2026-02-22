
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

const testConnection = async () => {
    const uri = process.env.MONGODB_URI;
    console.log(`Testing connection to: ${uri ? uri.replace(/:([^@]+)@/, ':****@') : 'undefined'}`);

    if (!uri) {
        console.error('❌ MONGODB_URI is not defined in .env');
        process.exit(1);
    }

    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log('✅ Connection Successful!');
        process.exit(0);
    } catch (error) {
        console.error(`❌ Connection Failed: ${error.message}`);
        if (error.cause) console.error('Cause:', error.cause);
        process.exit(1);
    }
};

testConnection();

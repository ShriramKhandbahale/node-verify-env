import { scanForEnvVars } from './lib/scanner';
import type { VerifyEnvOptions } from './utils/types';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

export const verifyEnv = (options: VerifyEnvOptions = {}): void => {
    const projectPath = options.projectPath || process.cwd();
    const envPath = options.envPath || '.env';
    const ignore = options.ignore || [];

    const envFilePath = path.resolve(projectPath, envPath);
    if (fs.existsSync(envFilePath)) {
        dotenv.config({ path: envFilePath });
    }

    console.log('Scanning for environment variables...');
    const requiredVars = scanForEnvVars(projectPath).filter(v => !ignore.includes(v));
    console.log(`Found ${requiredVars.length} env variables in code.`);

    const missingVars = requiredVars.filter(v => !process.env[v]);

    if (missingVars.length > 0) {
        console.error('❌ Missing environment variables in runtime environment:');
        missingVars.forEach(v => console.error(`- ${v}`));
        process.exit(1);
    } else {
        console.log('✅ All required environment variables are available.');
    }
};
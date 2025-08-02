import { scanForEnvVars } from './lib/scanner';
import { checkEnvFile } from './lib/envChecker';
import type { VerifyEnvOptions } from './utils/types';

export const verifyEnv = async (options: VerifyEnvOptions = {}): Promise<void> => {
    const projectPath = options.projectPath || process.cwd();
    const envPath = options.envPath || '.env';
    const ignore = options.ignore || [];

    console.log('Scanning for environment variables...');
    const requiredVars = scanForEnvVars(projectPath).filter(v => !ignore.includes(v));
    console.log(`Found ${requiredVars.length} env variables in code.`);

    const missingVars = checkEnvFile(requiredVars, envPath);
    if (missingVars.length > 0) {
        console.error('❌ Missing environment variables in .env file:');
        missingVars.forEach((v: string) => console.error(`- ${v}`));
        process.exit(1);
    } else {
        console.log('✅ All required environment variables are present.');
    }
}
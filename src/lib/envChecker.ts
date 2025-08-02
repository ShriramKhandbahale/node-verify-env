import fs from 'fs';
import dotenv from 'dotenv';

export const checkEnvFile = (requiredVars: string[], envPath: string): string[] => {
  if (!fs.existsSync(envPath)) {
    throw new Error(`.env file not found at ${envPath}`);
  }

  const envConfig = dotenv.parse(fs.readFileSync(envPath));

  return requiredVars.filter(v => !(v in envConfig));
}
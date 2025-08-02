import fs from 'fs';
import {glob} from 'glob';

export const scanForEnvVars = (projectPath: string): string[] => {
  const files = glob.sync(`${projectPath}/**/*.{js,ts}`, {
    ignore: ['**/node_modules/**', '**/dist/**']
  });

  const envVarRegex = /process\.env\.([A-Z0-9_]+)/g;
  const foundVars = new Set<string>();

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    let match: RegExpExecArray | null;
    while ((match = envVarRegex.exec(content)) !== null) {
      if (match[1] !== undefined) {
        foundVars.add(match[1]);
      }
    }
  }

  return Array.from(foundVars);
}
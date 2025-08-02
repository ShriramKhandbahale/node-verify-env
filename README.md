# ✅ node-verify-env

[![npm version](https://img.shields.io/npm/v/node-verify-env.svg)](https://www.npmjs.com/package/node-verify-env)
[![npm downloads](https://img.shields.io/npm/dt/node-verify-env.svg)](https://www.npmjs.com/package/node-verify-env)
[![license](https://img.shields.io/npm/l/node-verify-env.svg)](LICENSE)

**Verify that all environment variables used in your Node.js project exist in your `.env` file.**  
Catch missing configuration before runtime and avoid surprises in production.

---

## 📦 Installation

```bash
# Using npm
npm install --save-dev node-verify-env

# Using yarn
yarn add --dev node-verify-env
```

---

## 🚀 Usage

### ✅ CLI

Run in your project root:

```bash
npx node-verify-env
```

**Example Output:**
```
Scanning for environment variables...
Found 3 env variables in code.
❌ Missing environment variables in .env file:
- DB_PASSWORD
- API_KEY
```

If all variables exist:
```
✅ All required environment variables are present.
```

#### CLI Options
| Option            | Description                                |
|--------------------|--------------------------------------------|
| `--project-path`  | Path to scan (default: current directory) |
| `--env-path`      | Path to .env file (default: `.env`)       |
| `--ignore`        | Comma-separated vars to ignore            |

Example:
```bash
npx node-verify-env --project-path ./src --env-path ./config/.env --ignore OPTIONAL_VAR,DEBUG
```

---

### ✅ Programmatic API

```ts
import { verifyEnv } from "node-verify-env";

await verifyEnv({
  projectPath: "./src",      // Directory to scan (default: process.cwd())
  envPath: ".env",           // Path to .env file (default: ".env")
  ignore: ["OPTIONAL_VAR"]   // Variables to ignore
});
```

---

## 📄 Example

### `.env`
```
DB_HOST=localhost
DB_USER=root
```

### `index.ts`
```js
console.log(process.env.DB_HOST);
console.log(process.env.DB_PASSWORD); // Missing in .env
console.log(process.env.SERVICE_KEY); // Missing in .env
```

Run:
```bash
npx node-verify-env
```

Output:
```
Scanning for environment variables...
Found 3 env variables in code.
❌ Missing environment variables in .env file:
- DB_PASSWORD
- SERVICE_KEY
```

---

## 🔍 How It Works
- Scans your code for `process.env.VAR_NAME`
- Collects all variable names
- Reads your `.env` file
- Prints missing variables
- Exits with status code `1` if any variables are missing (perfect for CI/CD)

---

## 🛠 Features
✔ Works with any Node.js project  
✔ Detects missing env vars before runtime  
✔ CLI + programmatic usage  
✔ TypeScript support  
✔ Great for CI/CD pipelines  

---

## 📦 Add to CI/CD
Example for **GitHub Actions**:
```yaml
- name: Verify Environment Variables
  run: npx node-verify-env
```

---

## 🛠 Contributing
Pull requests are welcome! For major changes, open an issue first to discuss what you would like to change.

---

## 📜 License
MIT © [Shriram Khandbahale](https://github.com/shriramkhandbahale)

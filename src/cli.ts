#!/usr/bin/env node

import { verifyEnv } from "./index";

(async () => {
    try {
        await verifyEnv();
    } catch (error) {
        console.error((error as Error).message);
        process.exit(1);
    }
})();
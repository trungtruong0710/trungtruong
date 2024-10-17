import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    // reporter: [['html', { outputFolder: 'my-report' }]],
    timeout: 150000,
    // retries: 1
};

export default config;
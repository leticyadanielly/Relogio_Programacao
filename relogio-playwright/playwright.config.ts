import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    headless: false,
    launchOptions: {
      slowMo: 1500, // Desacelera cada ação em 1.5 segundos
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
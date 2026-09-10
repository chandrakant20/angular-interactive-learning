import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.angularatlas.learning',
  appName: 'Angular Atlas',
  webDir: 'dist/angular-interactive-learning/browser',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  }
};

export default config;

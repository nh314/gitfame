import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/react-vite",
  async viteFinal(config) {
    config.plugins = config.plugins || [];
    config.plugins.push({
      name: 'fix-mdx-react-shim',
      enforce: 'pre',
      resolveId(source) {
        if (source.startsWith('file://') && source.includes('mdx-react-shim.js')) {
          return new URL(source).pathname;
        }
        return null;
      },
    });
    return config;
  }
};
export default config;
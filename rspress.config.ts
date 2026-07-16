import * as path from 'node:path';
import { defineConfig } from '@rspress/core';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  globalStyles: path.join(__dirname, 'tailwind.css'),
  lang: 'zh',
  title: 'SurplusToken 文档',
  logoText: 'SurplusToken',
  themeConfig: {
    enableContentAnimation: true,
    enableScrollToTop: true,
  },
});

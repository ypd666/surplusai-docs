import './index.css';
import { Layout as BasicLayout } from '@rspress/core/theme-original';
import {
  SystemCommand,
  SystemContent,
  SystemProvider,
  SystemSelector,
} from './system.tsx';

export function Layout() {
  return (
    <SystemProvider>
      <BasicLayout beforeNavMenu={<SystemSelector />} />
    </SystemProvider>
  );
}

export { SystemCommand, SystemContent, SystemSelector };
export * from '@rspress/core/theme-original';

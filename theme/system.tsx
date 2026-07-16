import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { FaApple, FaLinux, FaWindows } from 'react-icons/fa6';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

type OperatingSystem = 'windows' | 'macos' | 'linux';

type SystemContextValue = {
  operatingSystem: OperatingSystem;
  setOperatingSystem: (operatingSystem: OperatingSystem) => void;
};

const STORAGE_KEY = 'surplusai-docs-operating-system';

const SystemContext = createContext<SystemContextValue | null>(null);

function detectOperatingSystem(): OperatingSystem {
  if (typeof navigator === 'undefined') {
    return 'macos';
  }

  const platform = navigator.userAgent.toLowerCase();

  if (platform.includes('win')) {
    return 'windows';
  }

  if (platform.includes('linux') || platform.includes('x11')) {
    return 'linux';
  }

  return 'macos';
}

function isOperatingSystem(value: string | null): value is OperatingSystem {
  return value === 'windows' || value === 'macos' || value === 'linux';
}

export function SystemProvider({ children }: { children: ReactNode }) {
  const [operatingSystem, setOperatingSystem] =
    useState<OperatingSystem>('macos');

  useEffect(() => {
    const storedOperatingSystem = window.localStorage.getItem(STORAGE_KEY);
    setOperatingSystem(
      isOperatingSystem(storedOperatingSystem)
        ? storedOperatingSystem
        : detectOperatingSystem(),
    );
  }, []);

  const value = {
    operatingSystem,
    setOperatingSystem: (nextOperatingSystem: OperatingSystem) => {
      window.localStorage.setItem(STORAGE_KEY, nextOperatingSystem);
      setOperatingSystem(nextOperatingSystem);
    },
  };

  return (
    <SystemContext.Provider value={value}>{children}</SystemContext.Provider>
  );
}

function useOperatingSystem() {
  const context = useContext(SystemContext);

  if (!context) {
    throw new Error(
      'System components must be rendered inside SystemProvider.',
    );
  }

  return context;
}

const systemOptions = [
  {
    value: 'windows',
    label: 'Windows',
    icon: FaWindows,
  },
  {
    value: 'macos',
    label: 'macOS',
    icon: FaApple,
  },
  {
    value: 'linux',
    label: 'Linux',
    icon: FaLinux,
  },
] satisfies Array<{
  value: OperatingSystem;
  label: string;
  icon: typeof FaWindows;
}>;

type SystemSelectorProps = {
  variant?: 'nav' | 'content';
};

export function SystemSelector({ variant = 'nav' }: SystemSelectorProps) {
  const { operatingSystem, setOperatingSystem } = useOperatingSystem();
  const selectedSystem = systemOptions.find(
    (option) => option.value === operatingSystem,
  );

  if (!selectedSystem) {
    return null;
  }

  const SelectedIcon = selectedSystem.icon;

  return (
    <div
      className={cn(
        'system-selector',
        variant === 'content' && 'system-selector--content',
      )}
    >
      {variant === 'content' && (
        <div className="system-selector__intro">
          <span className="system-selector__title">选择你的操作系统</span>
          <span className="system-selector__description">
            后续安装步骤和命令会自动切换
          </span>
        </div>
      )}
      <Select
        value={operatingSystem}
        onValueChange={(value) => setOperatingSystem(value as OperatingSystem)}
      >
        <SelectTrigger
          aria-label="选择操作系统"
          className={cn(
            'system-selector__trigger',
            variant === 'content' && 'system-selector__trigger--content',
          )}
          size={variant === 'nav' ? 'sm' : 'default'}
        >
          <SelectValue>
            <span className="system-selector__value">
              <SelectedIcon aria-hidden="true" />
              <span className="system-selector__value-label">
                {selectedSystem.label}
              </span>
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent
          align={variant === 'nav' ? 'end' : 'start'}
          className="system-selector__content"
          position="popper"
          sideOffset={8}
        >
          {systemOptions.map((option) => {
            const Icon = option.icon;

            return (
              <SelectItem key={option.value} value={option.value}>
                <Icon aria-hidden="true" />
                {option.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

type SystemCommandProps = Record<OperatingSystem, string>;

const systemLabels: Record<OperatingSystem, string> = {
  windows: 'Windows',
  macos: 'macOS',
  linux: 'Linux',
};

export function SystemCommand(commands: SystemCommandProps) {
  const { operatingSystem } = useOperatingSystem();

  if (import.meta.env.SSG_MD) {
    return (
      <>
        {Object.entries(commands).map(([system, command]) => (
          <div key={system}>
            {`\n**${systemLabels[system as OperatingSystem]}**\n\n\`\`\`sh\n${command}\n\`\`\`\n`}
          </div>
        ))}
      </>
    );
  }

  const command = commands[operatingSystem];

  return (
    <div className="system-command">
      <div className="system-command__header">
        {systemLabels[operatingSystem]}
      </div>
      <pre className="system-command__code">
        <code>{command}</code>
      </pre>
    </div>
  );
}

type SystemContentProps = {
  system: OperatingSystem;
  children: ReactNode;
};

export function SystemContent({ system, children }: SystemContentProps) {
  const { operatingSystem } = useOperatingSystem();

  if (import.meta.env.SSG_MD) {
    return (
      <>
        {`\n**${systemLabels[system]}**\n\n`}
        {children}
      </>
    );
  }

  if (system !== operatingSystem) {
    return null;
  }

  return (
    <div className="system-content" data-system={system}>
      {children}
    </div>
  );
}

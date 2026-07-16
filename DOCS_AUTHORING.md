# SurplusToken 文档编写指南

本文说明本项目在 Rspress 基础上增加的操作系统选择功能，以及如何编写 Windows、macOS 和 Linux 专属内容。

## 文档目录

文档源码位于 `docs/`：

- 普通内容使用 `.md`。
- 需要 React 组件或操作系统切换时使用 `.mdx`。
- 同目录的 `_meta.json` 控制侧边栏页面顺序。
- 根目录的 `docs/_meta.json` 控制侧边栏分组。
- `docs/_nav.json` 控制顶部导航。

新增页面后，需要将不带扩展名的文件名加入对应的 `_meta.json`。

例如新增 `docs/platform/security.md`：

```json
[
  "register",
  "create-api-key",
  "billing",
  "contribute-account",
  "carpool",
  "security"
]
```

## 操作系统选择

站点支持以下三个系统值：

| 显示名称 | `system` 值 |
| -------- | ----------- |
| Windows  | `windows`   |
| macOS    | `macos`     |
| Linux    | `linux`     |

请使用官方拼写 `macOS`。组件参数中使用小写的 `macos`。

顶部导航和正文中的选择器共享同一份状态。用户在任意选择器中切换系统后：

- 其他选择器会同步更新。
- 所有 `SystemContent` 和 `SystemCommand` 会更新。
- 选择结果会保存在浏览器 `localStorage` 中。
- 页面跳转或刷新后仍会保留选择。
- 首次访问且没有保存记录时，会根据浏览器平台进行推断。

## 正文选择器

顶部导航已经包含紧凑的操作系统选择器。需要在正文中强调系统选择时，可以加入正文版本：

```mdx
import { SystemSelector } from '@rspress/core/theme';

# 快速开始

<SystemSelector variant="content" />
```

正文选择器通常只放在快速开始、安装入口等页面，不需要在每个页面重复添加。

## 切换整段内容

当不同系统的标题、说明、步骤或命令均不同时，使用 `SystemContent`。

文件必须使用 `.mdx` 扩展名，并导入组件：

````mdx
import { SystemContent } from '@rspress/core/theme';

# 安装客户端

<SystemContent system="windows">

## 使用 WSL2

以管理员身份打开 PowerShell：

```powershell
wsl --install
```

重启后进入 Ubuntu，再继续安装客户端。

</SystemContent>

<SystemContent system="macos">

## 使用 Homebrew

打开 Terminal：

```bash
brew install example
```

</SystemContent>

<SystemContent system="linux">

## 使用安装脚本

```bash
curl -fsSL https://example.com/install.sh | sh
```

</SystemContent>
````

`SystemContent` 中可以使用完整的 Markdown/MDX 内容，包括：

- 标题和段落
- 有序或无序列表
- 链接和图片
- 代码块
- Rspress 提示框
- 其他 MDX 组件

### MDX 空行

开始标签、Markdown 内容和结束标签之间必须保留空行：

```mdx
<SystemContent system="windows">

这里是 Markdown 内容。

</SystemContent>
```

不要写成：

```mdx
<SystemContent system="windows">
  这里的内容可能不会按 Markdown 正确解析。
</SystemContent>
```

## 只切换命令

如果正文完全相同，只有命令不同，使用 `SystemCommand`：

```mdx
import { SystemCommand } from '@rspress/core/theme';

## 安装

运行以下命令：

<SystemCommand
  windows="winget install Example.App"
  macos="brew install example"
  linux="curl -fsSL https://example.com/install.sh | sh"
/>
```

三个系统参数都是必填项。即使命令相同，也需要分别填写：

```mdx
<SystemCommand
  windows="example --version"
  macos="example --version"
  linux="example --version"
/>
```

多行命令使用 JSX 模板字符串：

```mdx
<SystemCommand
  windows={`wsl --install
wsl`}
  macos={`brew install example
example --version`}
  linux={`curl -fsSL https://example.com/install.sh | sh
example --version`}
/>
```

## 组合使用

同一页面可以同时使用三个组件：

```mdx
import {
  SystemCommand,
  SystemContent,
  SystemSelector,
} from '@rspress/core/theme';

# 快速安装

<SystemSelector variant="content" />

<SystemContent system="windows">

Windows 需要先配置 WSL2。

</SystemContent>

<SystemContent system="macos">

macOS 可以直接在 Terminal 中安装。

</SystemContent>

<SystemContent system="linux">

Linux 可以直接在 Shell 中安装。

</SystemContent>

<SystemCommand windows="wsl" macos="example" linux="example" />
```

## 选择组件的实现

操作系统功能主要由以下文件实现：

- `theme/system.tsx`：系统状态、自动检测、持久化和三个文档组件。
- `theme/index.tsx`：将 Provider 和顶部选择器接入 Rspress Layout。
- `theme/index.css`：顶部选择器、正文选择器和命令块样式。
- `src/components/ui/select.tsx`：shadcn/ui Select 组件。
- `tailwind.css`：Tailwind CSS 和 shadcn/ui 主题变量。
- `components.json`：shadcn/ui CLI 配置。

图标来自 `react-icons/fa6`，选择器交互由 shadcn/ui 的 Select 提供。

一般文档修改不需要编辑这些实现文件。只有新增操作系统、改变全站选择行为或调整选择器 UI 时才需要修改。

## 编写原则

- 只在系统流程确实不同时拆分整段内容。
- 只有命令不同时优先使用 `SystemCommand`，减少重复文案。
- Windows 命令应明确标注是在 PowerShell、Windows Terminal 还是 WSL 中运行。
- macOS 与 Linux 流程相同时，也应分别提供 `macos` 和 `linux` 内容。
- 不要在示例中写入真实 API 密钥、密码或账号凭证。
- 外部产品的安装方式可能变化，修改前应核对其官方文档。

## 本地验证

安装依赖：

```bash
npm ci
```

启动开发服务器：

```bash
npm run dev
```

至少检查以下交互：

1. 顶部选择器可以切换 Windows、macOS 和 Linux。
2. 正文选择器与顶部选择器双向同步。
3. `SystemContent` 只显示当前系统内容。
4. `SystemCommand` 显示当前系统命令。
5. 刷新页面后仍保留系统选择。
6. 浅色和深色主题下选择器均清晰可见。

提交前运行：

```bash
npm run format
npm run lint
npm run build
```

三个命令都必须通过。

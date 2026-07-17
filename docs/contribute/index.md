# 贡献文档

SurplusToken 文档由协作者共同维护。文档内容存放在
[`surplusai-docs` GitHub 仓库](https://github.com/ypd666/surplusai-docs)的 `docs/` 目录中，
请通过 Pull Request 提交新增或修改的内容。

## 上传到哪里

根据内容类型选择目标目录：

| 内容                         | 上传位置              | GitHub 入口                                                                        |
| ---------------------------- | --------------------- | ---------------------------------------------------------------------------------- |
| 入门和快速开始               | `docs/start/`         | [打开目录](https://github.com/ypd666/surplusai-docs/tree/main/docs/start)          |
| 平台账号、密钥、计费等功能   | `docs/platform/`      | [打开目录](https://github.com/ypd666/surplusai-docs/tree/main/docs/platform)       |
| Codex、OpenCode 等客户端接入 | `docs/clients/`       | [打开目录](https://github.com/ypd666/surplusai-docs/tree/main/docs/clients)        |
| 辅助工具                     | `docs/tools/`         | [打开目录](https://github.com/ypd666/surplusai-docs/tree/main/docs/tools)          |
| 常见问题                     | `docs/faq/`           | [打开目录](https://github.com/ypd666/surplusai-docs/tree/main/docs/faq)            |
| 文档图片                     | `docs/public/images/` | [打开公共资源目录](https://github.com/ypd666/surplusai-docs/tree/main/docs/public) |

普通文档使用 `.md` 文件。需要按 Windows、macOS 和 Linux 切换内容时，使用 `.mdx` 文件。
文件名请使用小写英文和连字符，例如 `account-security.md`。

如果无法判断内容属于哪个目录，请先在
[Issues](https://github.com/ypd666/surplusai-docs/issues) 中说明准备编写的主题。

## 使用 GitHub 网页提交

不需要在本地安装开发环境也可以投稿：

1. 打开上表中对应的 GitHub 目录。
2. 从 `main` 创建自己的分支，例如 `docs/account-security`。
3. 点击 **Add file**，选择 **Create new file** 或 **Upload files**。
4. 创建或上传 Markdown 文件。
5. 编辑同目录的 `_meta.json`，把新文件名加入侧边栏顺序。
6. 提交改动并创建目标为 `main` 的 Pull Request。

不要直接提交到 `main`。一个 Pull Request 应只包含同一主题的文档和图片，方便审核与回退。

### 侧边栏示例

例如新增 `docs/platform/account-security.md` 后，需要编辑 `docs/platform/_meta.json`：

```json
[
  "register",
  "create-api-key",
  "billing",
  "contribute-account",
  "carpool",
  "account-security"
]
```

`_meta.json` 中填写的是不带 `.md` 或 `.mdx` 扩展名的文件名。

## 文档和图片要求

- 页面只使用一个一级标题，并用清晰的二级标题组织步骤。
- 站内链接使用 `/platform/create-api-key` 这类不带扩展名的路径。
- 图片中不得包含 API 密钥、密码、Cookie、真实邮箱或其他敏感信息。
- 图片上传到 `docs/public/images/` 后，使用 `/images/example.png` 引用。
- 命令应注明运行环境，例如 Bash、PowerShell 或 WSL。
- 外部工具的安装方式和参数应以其官方文档为准。

## 在本地预览

需要检查页面效果时，可以在本地运行文档站：

```bash
git clone https://github.com/ypd666/surplusai-docs.git
cd surplusai-docs
npm ci
npm run dev
```

新增页面后同样需要更新对应的 `_meta.json`。提交前运行：

```bash
npm run format
npm run lint
npm run build
```

## 提交后会发生什么

Pull Request 创建后，Cloudflare 构建检查会验证文档站能否正常生成。启用分支预览时，PR 中还会出现独立的 Preview URL，协作者可以在不影响正式网站的情况下检查页面。

审核通过并合并到 `main` 后，Cloudflare 会自动重新构建并发布正式文档站。

操作系统切换组件等进阶写法参见仓库中的
[`DOCS_AUTHORING.md`](https://github.com/ypd666/surplusai-docs/blob/main/DOCS_AUTHORING.md)。

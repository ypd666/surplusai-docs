# SurplusToken 文档

## 安装依赖

```bash
npm ci
```

## 本地预览

```bash
npm run dev
```

## 编辑文档

普通文档位于 `docs/`，使用 Markdown 编写。需要根据操作系统切换内容时，将文件扩展名改为 `.mdx`。

完整的目录维护、操作系统选择和系统专属内容写法参见 [`DOCS_AUTHORING.md`](./DOCS_AUTHORING.md)。

## 提交前检查

```bash
npm run format
npm run lint
npm run build
```

生产构建可以通过 `npm run preview` 本地预览。

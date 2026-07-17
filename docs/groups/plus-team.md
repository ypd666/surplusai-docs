# plus/team 分组

`plus/team` 是创建 SurplusToken API 密钥时可选的分组之一。平台页面将其说明为“plus 和 team 账号请选择该分组”。

## 分组信息

| 项目         | 说明                                |
| ------------ | ----------------------------------- |
| 分组名称     | `plus/team`                         |
| 适用账号     | Plus 和 Team 账号                   |
| 页面显示倍率 | `0.15x`                             |
| 推荐用途     | 使用 Plus/Team 渠道接入支持的客户端 |

倍率和可用模型可能随平台策略调整。创建密钥前，请以平台页面实时显示的信息为准。

## 创建密钥

1. 登录 SurplusToken，打开 **API 密钥**页面。
2. 点击右上角的**创建密钥**。
3. 输入便于识别用途的名称，例如 `codex-plus-team`。
4. 打开**分组**选择器。
5. 选择 `plus/team`，并确认页面显示“plus 和 team 账号请选择该分组”。
6. 根据需要设置额度、速率、有效期或 IP 限制。
7. 点击**创建**并妥善保存 API Key。

<img
  src="/images/codex/select-plus-team-group.jpg"
  alt="在分组列表中选择 plus/team"
  width="720"
/>

选择完成后，表单中的分组应显示为 `plus/team`：

<img
  src="/images/codex/create-api-key-plus-team.jpg"
  alt="plus/team 密钥创建表单"
  width="720"
/>

## 在客户端教程中引用

需要推荐该分组的客户端教程，应只写简短结论并链接到本页。例如：

```md
创建密钥时请选择 [`plus/team` 分组](/groups/plus-team)。
```

分组倍率、适用账号、模型范围和限制统一在本页维护，客户端教程不重复维护完整规则。

## 相关教程

- [Codex 接入 GPT 模型](/clients/codex)
- [所有 API 密钥分组](/groups/)

:::warning 密钥安全
不要在文档、聊天记录、项目源码或截图中展示完整 API Key。发现密钥泄露后，应立即在平台禁用或删除该密钥，并创建新密钥。
:::

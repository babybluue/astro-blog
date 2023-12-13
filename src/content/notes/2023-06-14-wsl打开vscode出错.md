---
title: WSL 打开 VSCode 出错
abbrlink: 966fb4be
date: 2023-06-14T17:08:43.000Z
description: 'Setting up server environment: Looking for /home/xxx/.vscode-server/server-env-setup. Not found.'
tags:
  - VSCode
---

在 WSL 命令行中输入命令`code .`应该会呼出 Windows 的 VSCode，但是却提示错误

```bash
Setting up server environment: Looking for /home/xxx/.vscode-server/server-env-setup. Not found.
```

可以手动删除`/home/xxx/.vscode-server`，此时运行`code .`会重新安装 VSCode。

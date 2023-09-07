---
title: WSL打开VSCode出错
tags: vscode
abbrlink: 966fb4be
category: note
date: 2023-06-14 17:08:43
updated: 2023-06-14 17:08:43
---

在WSL命令行中输入命令`code .`应该会呼出Windows的VSCode,但是却提示错误

```bash
Setting up server environment: Looking for /home/xxx/.vscode-server/server-env-setup. Not found.
```

可以手动删除`/home/xxx/.vscode-server`，此时运行`code .`会重新安装VSCode。

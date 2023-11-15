---
title: 更新.gitignore
abbrlink: efc43189
date: 2023-06-14T17:30:43.000Z
tags:
  - Git
---

如何应用.gitignore文件的更新。

```bash
git rm -r --cached .  #清除缓存
git add . #重新trace file
git commit -m "update .gitignore" #提交和注释
git push origin master #可选，如果需要同步到remote上的话
```

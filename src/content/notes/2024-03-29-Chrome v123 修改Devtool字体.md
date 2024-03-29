---
title: Chrome v123 修改 Devtool 字体
date: 2024-03-29T08:43:38.061Z
abbrlink: 146eafd4
description: 更新 Chrome 版本之后发现开发者工具 (Devtool) 控制台的字体 (font family) 改变了，这是关于如何修改开发者工具面板字体。
tags:
  - Chrome
---

打开 Chrome 开发者工具查看元素信息发现控制台字体变了，原来是 Chrome 123 版更新后改变了控制台的字体策略--由 Chrome 自定义的字体接管开发者工具中的字体。  
修改字体需要在 Chorme 设置 > 外观 > 自定义字体 > 等宽字体 (Mono) 项选择自己想要的字体效果，修改可实时反映在开发者工具中，没有中文的字体会回落到上面的**标准字体**项。

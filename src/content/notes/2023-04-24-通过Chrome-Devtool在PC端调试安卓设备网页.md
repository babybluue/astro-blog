---
title: 通过 Chrome Devtool 在 PC 端调试安卓设备网页
abbrlink: 9f6a5371
date: 2023-04-24T22:55:29.000Z
description: 前端开发如何使用 Chrome Devtool 调试移动设备网页。
tags:
  - Chrome
  - 前端
---

开发过程中需要使用移动设备测试页面，为了方便调试，可以通过 PC 连接移动设备 (Android)，使用 Chrome 浏览器 Devtool 像调试 PC 页面一样调试移动设备。

- 电脑连接手机

  手机开发者模式打开 usb 调试；或者无线调试，使用 adb 命令连接设备。

- 导航栏地址 `chrome://inspect/#devices`

  允许浏览器通过 usb 或者 network 查找连接的手机

以上操作完成后，会在 Remote Target 下看到自己的手机型号，此时在手机浏览器打开任意页面都会反映在当前页面，通过 inspect 调试相应页面即可。

---
title: Windows PC 安装 ChromeOS
abbrlink: fc1b1c9c
date: 2022-11-28T15:25:27.000Z
description: 联想小新 air13 系 Windows 电脑使用 Brunch 框架安装 ChromeOS 过程。
tags:
  - ChromeOS
---

记录一下我老旧的联想小新 air13 安装 ChromeOS 的过程。

#### ChromeOS

ChromeOS 以 Google Chrome 为主要的用户界面，是由 Google 推出运行在 Chromebook 上面，满足基于浏览器的工作需求，现在也支持 Android 和 Linux，可以直接安装 Android 和 Linux 应用。相应地，国内有 FydeOS，是基于 ChromeOS 的本土化改造。

<!-- more -->

#### Brunch Framework

Brunch 根据官方 recovery 用来制作 ChromeOS 镜像，以支持在 Windows/Linux 机器上安装 ChormeOS。

#### 安装准备

1.  需要一个最小 16G 的 u 盘 / Linux 环境 (Windows 10/11 可以安装 wsl)

2.  下载[官方 recovery](https://chromiumdash.appspot.com/serving-builds?deviceCategory=Chrome%20OS)

    - Intel 1st gen -> 9th gen 网站页面搜索 rammus
    - Intel 10th & 11th gen 网站页面搜索 volteer
    - AMD Ryzen 页面搜索 zork

3.  下载 [Brunch 工具](https://github.com/sebanc/brunch/releases/latest)

4.  Linux 需要更新或安装必需的软件

    `sudo apt update && sudo apt -y install pv cgpt tar unzip`

5.  解压刚才下载的两个文件

    ```bash
    #将 filename 替换成自己的文件名称
    tar zxvf brunch_filename.tar.gz
    unzip chromeos_filename.bin.zip
    ```

6.  利用 Brunch 生成镜像文件

    ```bash
    # 将 filename 替换成自己的文件名称
    sudo bash chromeos-install.sh -src chromeos_filename.bin -dst chromeos.img
    ```

7.  使用[Rufus](https://rufus.ie/)制作 U 盘启动盘

#### 安装过程

1. 将 U 盘插到电脑，以 U 盘启动电脑会出现 Brunch 安装画面，不出意外的话，之后就成功地将 ChromeOS 安装到了 U 盘上

2. 如果想要将 ChromeOS 彻底安装到电脑上需要在 U 盘启动的 ChromeOS 上进一步操作

3. 以匿名用户跳过 ChromeOS 登录，Ctrl + Alt + T 启动 Crosh Shell，输入 shell，回车

4. 确定自己要安装到的硬盘名称 disk `lsblk -e7`

5. 命令行输入

   ```bash
   # 替换 disk 为自己的硬盘名称，如 nvme0n1
   sudo chromeos-install -dst /dev/disk
   ```

6. 安装成功之后，拔掉 U 盘重启电脑

---

参考链接：  
[到底什么是 ChromeOS](https://zhuanlan.zhihu.com/p/169828368)  
[Brunch Framework](https://github.com/sebanc/brunch)

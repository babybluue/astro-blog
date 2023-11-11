---
title: ssh连接linux虚拟机
tags: SSH
abbrlink: 1b816091
date: 2021-04-26T15:00:25.000Z
updated: 2021-04-26T15:00:25.000Z
---

SSH 的软件架构是服务器-客户端模式（Server - Client）。在这个架构中，SSH 软件分成两个部分：向服务器发出请求的部分，称为客户端（client），OpenSSH 的实现为 ssh；接收客户端发出的请求的部分，称为服务器（server），OpenSSH 的实现为 sshd。

<!--more-->

#### ssh 密码登录

```bash
$ ssh user@hostname
or
$ ssh -l user hostname
```

user 是服务端的用户名，hostname 是 ip 地址或者域名，连接之后会提示输入密码登录

#### 密钥登录

SSH 密钥登录分为以下的步骤。

- 预备步骤，客户端通过 ssh-keygen 生成自己的公钥和私钥。
- 第一步，手动将客户端的公钥放入远程服务器的指定位置。
- 第二步，客户端向服务器发起 SSH 登录的请求。
- 第三步，服务器收到用户 SSH 登录的请求，发送一些随机数据给用户，要求用户证明自己的身份。
- 第四步，客户端收到服务器发来的数据，使用私钥对数据进行签名，然后再发还给服务器。
- 第五步，服务器收到客户端发来的加密签名后，使用对应的公钥解密，然后跟原始数据比较。如果一致，就允许用户登录。

**总之，私钥在客户端手里，公钥给服务器**

```bash
$ ssh-keygen -t rsa #指定 rsa 算法生成密钥对
```

密钥默认在当前管理员路径下的.ssh/文件夹下面，包括 id_rsa 和 id_rsa.pub
生成密钥后，修改权限为仅文件拥有者可读写

```bash
$ chmod 600 ~/.ssh/id_rsa
$ chmod 600 ~/.ssh/id_rsa.pub
```

有了密钥，现在需要将公钥发送给服务器端

- 手动上传公钥

  ```bash
  $ cat ~/.ssh/id_rsa.pub | ssh user@host "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
  or
  $ scp ~/.ssh/id_rsa.pub user@host:~/.ssh/authorized_keys
  ```

  同样需要设置 authorized_keys 的权限

  ```bash
  $ chmod 644 ~/.ssh/authorized_keys
  ```

- ssh-copy-id 自动上传公钥

  ```bash
  $ ssh-copy-id -i ~/.ssh/id_ras user@host
  ```

  -i 是指定公钥文件，公钥文件可以不指定路径和.pub 后缀名，命令会自动在~/.ssh 目录下寻找

- 关闭密码登录
  启用密钥登录后，可以关闭服务器的密码登录，打开服务器 sshd 的配置文件/etc/ssh/sshd_config,将 PasswordAuthentication 设置为 no，重启 sshd
  ```bash
  # 重启
  $ sudo systemctl restart sshd.service
  ```

#### scp 命令

scp 是 secure copy 的缩写，相当于 cp 命令 + SSH。它的底层是 SSH 协议，默认端口是 22，相当于先使用 ssh 命令登录远程主机，然后再执行拷贝操作。

scp 主要用于以下三种复制操作。

- 本地复制到远程。
- 远程复制到本地。
- 两个远程系统之间的复制。

```bash
$ scp source destination
```

source 和 destination 都可以包含用户名和主机名，即

```bash
#主机和文件之间使用冒号(:)分割
$ scp user@hostname:foo.txt bar.txt
#将远程主机的foo.txt文件复制为本地的bar.txt
$ scp foo.txt user@hsotname:bar.txt
#将本地的foo.txt文件复制到远程的bar.txt
```

---

参考链接：  
[阮一峰-SSH 教程](https://wangdoc.com/ssh/)

---
title: 通过Github Action自动部署Hexo
abbrlink: 89195a6e
date: 2021-04-12T17:22:01.000Z
tags:
  - Hexo
  - Github
---

以前将 Github page 页面代码和 Hexo 源码分别放在了一个仓库的两个分支里面，每次更新文章或者修改格式两个分支都要单独 push 一下。  
今天终于打破怪圈去尝试通过 Github Action 自动部署 Github page,而且将 Hexo 源码单独放在了一个私有的仓库里，只要我往这个仓库提交代码，Action 就会自动将代码处理部署到 Github page 上去。以前因为仓库是 Github page 没法设置私有，心理总有些难受，现在意外实现了源码私有竟然对我潜在的强迫症有治愈效果。

<!--more-->

为仓库设置一个 github action 需要在.github/workflows 路径下添加一个 yaml 格式的配置文件。也可以直接在 github action 仓库里使用 Node.js 的 workflow，然后自己再编辑配置文件。

配置文件的重点在于如何通过 action 成功登录到 github 账户将代码部署到仓库，github 免密码登录有两种方式，请求 token 和 ssh 密钥登录。

> token:Personal access tokens function like ordinary OAuth access tokens. They can be used instead of a password for Git over HTTPS, or can be used to authenticate to the API over Basic Authentication.

不同的方法，对应 hexo 的配置文件\_config.yml 里部署的仓库链接也不一样

```yaml
# Deployment
## Docs: https://hexo.io/docs/one-command-deployment
deploy:
  type: git
  repo:
    #token方式-> https://github.com/yourname/yourname.github.io.git
    #ssh方式-> git@github.com:yourname/yourname.github.io.git
  branch: master
```

我使用 ssh 的方式连接，下面是我的 workflow 的配置文件。

```yaml
name: hexo-deploy
on:
  push:
    branches: [master]
  pull_request:
    branches: [master]

env:
  TZ: Asia/Shanghai

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [15.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/
    steps:
      - name: 将仓库内mater分支下载到工作目录
        uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}
      - name: install packages
        run: npm ci
      - name: Setup hexo env
        env:
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
        run: |
          #set up private key for deploy
          mkdir -p ~/.ssh/
          echo "$DEPLOY_KEY" | tr -d '\r' > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh-keyscan github.com >> ~/.ssh/known_hosts
          git config --global user.name 'yourname'
          git config --global user.email 'youremail'
      - name: Deploy
        run: npm run deploy
```

ssh 密钥登录采用的是非对称加密，需要先获取一对密钥，私钥和公钥。

```bash
$ ssh-keygen -t rsa
```

复制公钥，在 github Settings/SSH and GPG keys 里选择添加新 ssh key，随意命名，粘贴公钥。  
复制私钥，在源码的仓库 Settings/Secrets 里选择添加新的仓库 secret，记住命名，粘贴私钥(我这里的命名是 DEPLOY_KEY)。

> 关于 secrets: Secrets are environment variables that are encrypted. Anyone with collaborator access to this repository can use these secrets for Actions.
> Secrets are not passed to workflows that are triggered by a pull request from a fork. Learn more.

关于配置文件的说明:

npm ci 相当于 npm install，但速度快于 npm install

```bash
mkdir -p ~/.ssh/
echo "$DEPLOY_KEY" | tr -d '\r' > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
#客户端的私钥需要放在当前管理员路径下的.ssh 目录，默认命名 id_rsa，将其权限设置为 600，仅允许文件所有者读取。
#变量 DEPLOY_KEY 加双引号，避免不必要的转义
ssh-keyscan github.com >> ~/.ssh/known_hosts
#获取服务器的域名 github.com 的公钥哈希值，并将其保存到文件 known_hosts，设为已知主机。
```

**更新：意外发现文章时间显示不正确，在配置文件里添加时区就好了 env:TZ: Asia/Shanghai**

---

参考链接:  
[阮一峰-SSH 教程](https://wangdoc.com/ssh/)

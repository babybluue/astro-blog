---
title: VSCode 编写 gql 语句时根据 GraphQL Schema 自动补全
abbrlink: ce03c2ea
date: 2023-03-15T18:42:56.000Z
description: 自动补全 GraphQL Schema 的 Vscode 插件，GraphQL Language Feature Support
tags:
  - VSCode
  - GraphQL
---

在使用 postman 测试 GraphQL 接口时发现 postman 有个 auto-fetch 的功能，可以自动拉取 GraphQL Schema 帮助补全 gql 语句。既然 postman 能够实现这个功能，那么 VSCode 一定有现成的对应方案，为什么我还要手动写 gql 语句呢。

- VSCode 安装插件[GraphQL: Language Feature Support](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql)

- 在项目根目录添加配置文件.graphqlrc，添加 schema 地址
  ```json
  {
    "schema": "http://10.10.0.30:3007/graphql"
  }
  ```

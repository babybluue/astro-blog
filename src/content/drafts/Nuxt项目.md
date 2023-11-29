- 安装`npx nuxi init <project-name>`

- If you have enabled Take Over Mode or installed the TypeScript Vue Plugin (Volar), you can disable generating the shim for \*.vue files in your nuxt.config file:

  ```ts
  export default defineNuxtConfig({
    typescript: {
      shim: false,
    },
  })
  ```

- 添加 src 目录存放源代码

  ```ts
  export default defineNuxtConfig({
    srcDir: 'src/',
  })
  ```

- app.vue 程序入口

  ```vue
  <template>
    <div>
      <!-- 使用layout -->
      <NuxtLayout name="default">
        <NuxtPage />
      </NuxtLayout>
    </div>
  </template>
  ```

- application/ 程序共用组件，目录下的组件无需引用即可全局使用

- pages/ 程序页面，根据文件路径响应对应的路由。index.vue 作默认首页

- layouts/ 页面布局，展示 page 页面的容器。default.vue 作默认 layout

- assets/ 存放静态文件(css/image)  
  css 全局需要在 nuxt.config 里面添加 css 路径

- 添加插件

- 链接本地文件,将静态文件存放在 public 目录下

  ```json
  app: {
    head: {
      script: [{ src: '/miniature.earth.core.js' }, { src: '/script.js' }],
    },
  },

  ```

#### prettier

```bash
# 安装
yarn add -D prettier

# 配置prettier

# 格式化项目
npx prettier --write .

# 检查项目格式化
npx prettier --check .
```

#### eslint

```bash
#安装
yarn add -D eslint

# 配置eslint typescript
yarn add -D @nuxtjs/eslint-config-typescript

# 配置eslint prettier，处理eslint与prettier兼容，不然eslint会检测prettier格式化后的space 缩进
yarn add -D eslint-config-prettier

# 配置eslint

# 添加lint script
"lint": "eslint --ext .ts,.js,.vue src/"

# 检查
yarn lint
```

```json
// prettier
{
  "printWidth": 120,
  "singleQuote": true,
  "plugins": [],
  "overrides": [
    {
      "files": "*.css",
      "options": {
        "singleQuote": false
      }
    }
  ],
  "semi": false,
  "vueIndentScriptAndStyle": true,
  "endOfLine": "auto"
}


// eslint
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["@nuxtjs/eslint-config-typescript", "prettier"],
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [],
  "rules": {
    "camelcase": "off"
  }
}
```

#### 问题

- nuxt-i18n 导致页面一直 404[参考链接](https://github.com/nuxt-modules/i18n/issues/139)
  当设置 locales 时需要添加 defaultLocale,因为 i18n 会根据 locales 生成不同的路由，此时路由会覆盖默认路由，比如/about 会替换成/about\_\_en
  [nuxt/i18n-routing](https://v8.i18n.nuxtjs.org/guide/routing-strategies)

  ```ts
   i18n: {
    vueI18n: './i18n.config.ts',
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        name: 'English',
      },
      {
        code: 'zh_cn',
        name: '简体中文',
      },
      {
        code: 'zh_hk',
        name: '繁体中文',
      },
    ],
  },

  ```

- bugfix

#### Nuxt3.5.1

##### [TypeError: Cannot read properties of null (reading 'parentNode')](https://github.com/nuxt/nuxt/issues/13309)

切换 layout 后 navigateTo 跳转路由会出现这个问题，解决方法添加 {external:true}，Nuxt 之前的部分版本不会出现这个问题

##### ant-design-vue/Element Plus 设计 table 分页出现问题

升级 Nuxt 到 3.5.1

##### defaultLocale

i18n 添加 locales 属性时，如果没有设置 defaultLocale 会导致页面 404，因为 i18n 会覆盖路由

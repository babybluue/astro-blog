---
title: 页面增加dark/light模式
tags:
  - JavaScript
  - CSS
  - HTML
abbrlink: 6f92f412
date: 2022-04-20T23:48:07.000Z
updated: 2022-04-20T23:48:07.000Z
---

一直想着给 babyblue 添加黑夜模式，终于拖延到今天动手，在未开始之前总觉得修改东西会很麻烦，真正做起来倒觉得事情都很简单，还学到了新东西，趁此总结一下。

<!-- more -->

#### CSS 一键反转

```CSS
html{
    filter: invert(1) hue-rotate(180deg);
}
```

- filter
  CSS 属性 filter 将模糊或颜色偏移等图形效果应用于元素。滤镜通常用于调整图像、背景和边框的渲染。
  **blur(1px) 函数**用于模糊图像；**brightness(0.5)函数** 用于调整图像的亮度；**contrast(2) 函数**用于调整图像的对比度；**grayscale(1) 函数**用于调整图像的灰度；**hue-rotate() 函数**用于旋转图像的色相；**invert(1) 函数**用于反转图像的颜色；**opacity(0.5) 函数**用于调整图像的不透明度；**saturate(100) 函数**用于调整图像的饱和度；**sepia(0.5) 函数**用于调整图像的褐色；**drop-shadow(x 偏移, y 偏移, 模糊大小, 色值) 函数**用于为图像添加阴影。

#### @media 查询

prefers-color-scheme CSS 媒体特性用于检测用户是否有将系统的主题色设置为亮色或者暗色。

- no-preference 表示系统未得知用户在这方面的选项。在布尔值上下文中，其执行结果为 false。
- light 表示用户已告知系统他们选择使用浅色主题的界面。
- dark 表示用户已告知系统他们选择使用暗色主题的界面。

```CSS
@media (prefers-color-scheme: dark){
    .theme-icon
         background-image: url('/images/dark.png')
}
@media (prefers-color-scheme: light) {
     .theme-icon
        background-image: url('/images/light.png')
 }

```

如上，可以将媒体查询放在一个 CSS 样式文件里。

为了更好的修改和维护，也可以分别设置 dark.css、light.css 文件，style.css 存放为其他通用的样式，使用 CSS 变量定义不同的主题颜色。

```CSS
/* dark.css */
:root {
    --background-color:#1f1f1f;
    --text-color: #ccc;
    --link-color: #ececec;
}

/* light.css */
:root {
    --background-color: #fff;
    --text-color: #404040;
    --link-color:#2196f3;
}

/* style.css */
body {
    background-color: var(--background-color);
    color:var(--text-color);
}
a {
    color: var(--link-color);
}
```

```HTML
<!-- 引入样式 -->
<link rel="stylesheet" href="/style.css">
<link rel="stylesheet" href="/dark.css" media="(prefers-color-scheme: dark)">
<link rel="stylesheet" href="/light.css" media="(prefers-color-scheme: no-preference),(prefers-color-scheme: light)"
```

> :root 这个 CSS 伪类匹配文档树的根元素。对于 HTML 来说，:root 表示 \<html> 元素，除了优先级更高之外，与 html 选择器相同，通常用来声明全局 CSS 变量。

#### 通过 JS 控制主题

通过媒体查询系统的主题色决定网页的主题很方便，但是想要用户能够主动交互切换主题时，媒体查询就无能为力了，这个时候就要靠 JS 操作。

前面分别为 light/dark 模式设置了不同颜色的变量，为了控制在不同模式下响应的变量，可以通过属性选择器控制根节点 CSS 变量。

```CSS
html[data-theme="dark"]:root {
    --progress-color:linear-gradient(to right, #c2e59c, #64b3f4)
    --background-color:#1f1f1f
    --text-color: #ccc;
}

html[data-theme="light"]:root{
    --progress-color:linear-gradient(to right, #c2e59c, #64b3f4)
    --background-color: #fff;
    --text-color: #404040;
}

```

在页面初始化时通过 JS 获取系统的主题方案以修改 data-theme 的值，同时也可以响应用户的点击切换 light/dark 模式

```HTML
<script>
  //切换主题
  const toggleTheme = (isDarkMode) => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  };
  const theme = localStorage.getItem('theme');
  //获取系统的主题方案
  const themeMedia = window.matchMedia('(prefers-color-scheme: dark)');
  if (theme) {
    toggleTheme(theme === 'dark');
  } else {
    // 页面初始化切换
    toggleTheme(themeMedia.matches);
  }
  //监听系统主题切换
  themeMedia.addEventListener('change', (e) => {
      toggleTheme(e.matches);
  });
</script>
```

- matchMedia()
  Window 的 matchMedia() 方法返回一个新的 MediaQueryList 对象，表示指定的媒体查询字符串解析后的结果。返回的 MediaQueryList 可被用于判定 Document 是否匹配媒体查询，或者监控一个 document 来判定它匹配了或者停止匹配了此媒体查询。  
  当 document 满足此次媒体查询条件的时候，MediaQueryList 对象的 matches 属性将返回 true，否则返回 false，如果需要在系统切换主题色后，页面也能跟随立即切换，就需要监听 MediaQueryList 对象的 change 事件，它会在媒体查询发生变化时响应。

  ```JS
  window.matchMedia('(max-width: 600px)').addEventListener('change', (e) => {
    console.log('execute');
  });
  ```

现在可以通过监听用户点击事件交互切换 dark/light 模式。

```JS
const htmlEl = document.documentElement;
const buttonEl = document.getElementById("btn");
buttonEl.addEventListener("click", () => {
  const currentTheme = htmlEl.getAttribute("data-theme");
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  htmlEl.setAttribute("data-theme", nextTheme);
});

```

#### JS 操作与媒体查询

鉴于能用 CSS 解决的问题咱就不用 JS 原则，在站点初次加载时，可以优先使用媒体查询的方式获取系统的主题，设置页面的 light/dark 模式，在用户未主动交互前将一直使用这种方式，直到用户主动选择了页面的 light/dark 模式。  
用户作出主题选择之后，将为 html 设置 data-theme 属性，此后页面的 light/dark 模式将根据该属性设置。

```HTML
<script>
  //获取localStorage检查用户是否主动选择了light/dark
  const theme = localStorage.getItem('theme');
  if (theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }
</script>
```

```CSS
/* theme-data 判断 */
html[data-theme="dark"]:root {
    --progress-color:linear-gradient(to right, #c2e59c, #64b3f4);
    --background-color:#1f1f1f;
    --text-color: #ccc;
}
html[data-theme="light"]:root {
    --progress-color:linear-gradient(to right, #c2e59c, #64b3f4);
    --background-color: #fff;
    --text-color: #404040;
}
/* 媒体查询判断 */
@media (prefers-color-scheme: dark) {
    :root{
        --progress-color:linear-gradient(to right, #c2e59c, #64b3f4);
        --background-color:#1f1f1f;
        --text-color: #ccc;
    }
}
@media (prefers-color-scheme: light) {
    :root{
        --progress-color:linear-gradient(to right, #c2e59c, #64b3f4);
        --background-color: #fff;
        --text-color: #404040;
    }
}

```

#### 其他

- theme-color 移动设备浏览器将根据所设定的建议颜色来改变用户界面。

```HTML
    <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
    <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#1f1f1f" />
```

- color-scheme 当用户选择其中一种配色方案时，操作系统会对用户界面进行调整。这包括表单控件、滚动条和 CSS 系统颜色的使用值。
  如果用户样式表里已经设定了相应的颜色，则会优先应用用户的样式表设置。

```HTML
    <meta name="color-scheme" content="dark light" />
```

---

参考链接:  
[一文搞懂前端多主题适配方案](https://juejin.cn/post/7049384448256639006)

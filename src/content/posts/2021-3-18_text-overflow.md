---
title: 设置文字只显示一行
abbrlink: 15761b84
date: 2021-03-18T23:02:28.000Z
updated: 2021-03-18T23:02:28.000Z
tags: CSS
category: post
---

CSS 设置文字只显示一行,超出部分用省略号代替

```html
<div class="info">
  <a> doloribus minima. Voluptate repellat autem delectus recu</a>
</div>
```

<!-- more -->

```css
div {
  width: 300px; /*设置宽度*/
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /*规定段落中的文本不进行换行*/
}

div a {
  color: blue;
}
```

如上设置 a 链接的 ellipsis 属性,会发现 a 链接后面的省略号颜色仍是黑色,而不是 a 链接文本的 blue. 因为 text-overflow 只对块级元素溢出的内容有效,所以此处的省略号跟随的是 div 元素,颜色是 div 元素设定的颜色.

```css
div a{
  width: 300px; /*设置宽度*/
  display:block
  overflow: hidden;
  text-overflow: ellipsis;
  color:blue
  white-space: nowrap; /*规定段落中的文本不进行换行*/
}

```

如上,将 a 元素的设置为块级元素可以达到相同效果.

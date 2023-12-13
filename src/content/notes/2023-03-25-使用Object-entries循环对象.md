---
title: 使用 Object.entries 循环对象
abbrlink: 282cecd0
date: 2023-03-25T12:01:49.000Z
description: JavaScript 使用 Object.entries() 方法代替 Object.keys()
tags:
  - JavaScript
---

平时循环对象一直使用 Object.keys(),最近学到了用 Object.entries() 感觉更方便。

```javascript
const obj = [
  {
    name: 'wang',
    age: 38,
  },
]
for (const [name, age] of Object.entries(obj)) {
  console.log(name, age)
}
```

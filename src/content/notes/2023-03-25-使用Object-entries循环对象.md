---
title: 使用Object.entries循环对象
abbrlink: 282cecd0
date: 2023-03-25T12:01:49.000Z
tags:
  - JavaScript
---

平时循环对象一直使用 Object.keys(),最近学到了用 Object.entries()感觉更方便。

```javascript
const obj = [
  {
    name: 'wang',
    age: 38,
  },
]
for (const [name, age] of obj.entries(obj)) {
  console.log(name, age)
}
```

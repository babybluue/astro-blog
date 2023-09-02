---
title: HTML的dataset属性
abbrlink: 1dcf8778
date: 2021-05-14T15:46:40.000Z
updated: 2021-05-14T15:46:40.000Z
tags: HTML
category: post
---

```html
<style>
  * {
    margin: 0;
    padding: 0;
  }
  .content {
    padding: 200px;
    text-align: center;
    width: 800px;
    height: 100vh;
    margin: auto;
  }
  button {
    width: 80px;
    height: 40px;
    margin: 10px;
    outline: none;
    border: none;
    cursor: pointer
    border-radius: 5px;
  }
</style>
<body>
  <div class="content">
    <button>click</button>
    <button>click</button>
    <button>click</button>
    <button>click</button>
    <button>click</button>
  </div>
  <script>
    const button = document.querySelectorAll('button');
    const color = ['lightblue', 'lightcoral', 'lightcyan', 'lightpink', 'lightgreen'];
    color.map((item, index) => {
      button[index].dataset.color = item;
      button[index].style.background = item;
      button[index].textContent = item;
    });
    button.forEach((item, index) => {
      item.addEventListener('click', () => {
        const btnColor = item.dataset.color;
        document.querySelector('body').style.background = btnColor;
      });
    });
  </script>
</body>
```

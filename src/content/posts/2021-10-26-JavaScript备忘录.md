---
title: JavaScript 备忘录
abbrlink: 9765cad4
date: 2021-10-26T10:48:49.000Z
updated: 2022-05-13T00:15:49.000Z
tags:
  - JavaScript
  - 备忘录
---

- 通过对象解构赋值在循环里取对象特定的属性

  ```typescript
  interface Data {
    id: number
    name: string
    age: number
  }
  const students: Data = []
  students.map(({ id }) => {
    console.log(id)
  })
  ```

<!--more-->

- JS 可以直接使用 id 选择器的名字

  ```html
  <div id="vae">大家好,我是vae</div>
  <script>
    console.log(vae)
  </script>
  ```

- localStorage 存放和读取值的两种方式

  ```JS
  localStorage.setItem("theme",'dark')
  localStorage.getItem('theme')

  localStorage.theme='dark'
  localStorage.theme
  ```

- 原生 js 修改 css 样式

  ```html
  <body>
    <div class="demo" style="font-size: 20px">
      <h1>hello wrold</h1>
    </div>
    <script>
      const demo = document.querySelector('.demo')
      //1
      demo.style.background = 'lightgray'
      //2
      demo.style.setProperty('background', 'lightcoral')
      //3
      demo.style.cssText = 'font-size:10px;color:blue;background:lightblue'
      //4
      demo.setAttribute('style', 'background:lightgreen;font-size:30px')
    </script>
  </body>
  ```

- every() 方法

  every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

  > 注意：若收到一个空数组，此方法在一切情况下都会返回 true。

- some() 方法
  some() 方法测试数组中是不是至少有 1 个元素通过了被提供的函数测试。它返回的是一个 Boolean 类型的值。

  > 如果用一个空数组进行测试，在任何情况下它返回的都是 false。

- 清除所有的计时器

  ```JavaScript
  for(i=0; i<1000; i++) {
    clearTimeout(i);
    clearInterval(i)
  }
  ```

- slice()方法
  arr.slice([begin[, end]]) 返回一个新的数组对象，是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括 end）。原始数组不会被改变。
  begin 和 end 的取值按照索引，从 0 开始。

  ```JavaScript
  const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

  //不指明begin和end会返回原始数组的拷贝值
  animals.slice() //['ant', 'bison', 'camel', 'duck', 'elephant'];


  //指明begin，从该索引值开始取到最后一个元素
  animals.slice(3)//[ 'duck', 'elephant' ]
  //begin为负数时，按照指定的倒数位置取到最后一个元素
  animals.slice(-2)//[ 'duck', 'elephant' ]
  animals.slice(-1)//['elepant']

  //指明end，从begin取到end之前索引的元素，不包括end位置
  animals.slice(0,1)//[ 'ant' ]
  animals.slice(3,5)//[ 'duck', 'elephant' ]
  //如果end是负数，并且倒数位置取到的元素仍在begin之后且存在，正常截取否则返回空数组
  animals.slice(0,-1)//[ 'ant', 'bison', 'camel', 'duck' ]
  anmails.slice(3,-1)//[ 'duck' ]
  ```

- splice()方法
  array.splice(start[, deleteCount[, item1[, item2[, ...]]]]) 通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。

  start​
  指定修改的开始位置（从 0 计数）。如果超出了数组的长度，则从数组末尾开始添加内容；如果是负值，则表示从数组末位开始的第几位；如果负数的绝对值大于数组的长度，则表示开始位置为第 0 位。

  deleteCount 可选
  整数，表示要移除的数组元素的个数。
  如果 deleteCount 大于 start 之后的元素的总数，则从 start 后面的元素都将被删除（含第 start 位）。
  如果 deleteCount 被省略了，或者超出 start 之后元素的数量，那么 start 之后数组的所有元素都会被删除。
  如果 deleteCount 是 0 或者负数，则不移除元素。这种情况下，至少应添加一个新元素。

  item1, item2, ... 可选
  要添加进数组的元素,从 start 位置开始。如果不指定，则 splice() 将只删除数组元素。

  ```JavaScript
  const months = ['Jan', 'March', 'April', 'June'];

  //省略删除数量，将会删除索引后的整个数组
  months.splice(0) //返回值 ['Jan', 'March', 'April', 'June']
  console.log(months) //[]
  months.splice(1) // 返回值 ['March', 'April', 'June']
  console.log(months) //['Jan']

  months.splice(0,0,'abc','def','ghi') //返回值 []
  console.log(months) //['abc','def','ghi','Jan','March','April','June']

  months.splice(1,1,'abc','def') //返回值 [ 'March' ]
  console.log(months) // ['Jan', ,'abc','def','April', 'June']
  ```

- reduce()方法

  ```JS
  //语法
  arr.reduce((previousValue, currentValue, currentIndex, array) => { /* ... */ }, initialValue)
  //previousValue上一次调用的返回值，如果是第一次调用并且没有指定初始值则为arr[0]
  //currentValue当前处理的值，如果是第一次调用且没有指定初始值则为arr[1]
  //currentIndex当前处理的索引，如果没有指定初始值，从索引1开始

  const arrTest=[1,2,3,4,5,6]
  arrTest.reduct((prev,curr)=>console.log(prev,curr))
  /*
    1 2
    undefined 3
    ....
  */
  arrTest.reduct((prev,curr)=>console.log(prev,curr),'dd')
  /*
    dd 1
    undefined 2
    ....
  */
  ```

  [MDN-reduce](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

- 通过 reduce 将对象数组中某些属性值相同的对象去重

  ```JS
  const newOrder = orderData.reduce((previous, current, index) => {
    if (index == 0) {
      previous.push(current);
    } else {
      const {name,contact,address } = newData;
      const lastOrder = previous.slice(-1)[0];
      const isSame=lastOrder['name'] == name && lastOrder['contact'] == contact && lastOrder['address'] == address
      if (!isSame) {
        previous.push(newData);
      }
    }
    return previous;
  }, []);
  ```

- 如何使循环中的异步调用同步次序执行 async/await

  ```JS
  const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
  const test = async () => {
  for (i = 0; i < arr.length; i++) {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
      console.log(arr[i]);
    });
  }
  };
  test();
  ```

  在 forEach 和 map 中使用 async/await 无效，forEach 没有返回值，而 map 返回的是一个 promise 数组。
  可以通过上面的例子写一个 sleep 函数，在代码里实现等待效果，前提是支持 async/await 形式。

  ```JS
  const load = async () => {
    for (i = 1; i <= 100; i++) {
      await sleep(500);
      console.log(i);
      }
  };

  const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };
  ```

- encodeURI()与 encodeURIComponent()

  encodeURIComponent()转义除了 A-Z a-z 0-9 - \_ . ! ~ \* ' ( )的所有字符，而 encodeURI()会保留一些特殊和有意义的符合，以及数字字母。  
   一般 encodeURI()用来可以用来转义简单 URL，encodeURIComponent()用来转义 URL 复杂参数。

  ```JS
  var set1 = ";,/?:@&=+$";  // 保留字符
  var set2 = "-_.!~*'()";   // 不转义字符
  var set3 = "#";           // 数字标志
  var set4 = "ABC abc 123"; // 字母数字字符和空格

  console.log(encodeURI(set1)); // ;,/?:@&=+$
  console.log(encodeURI(set2)); // -\_.!~\*'()
  console.log(encodeURI(set3)); // #
  console.log(encodeURI(set4)); // ABC%20abc%20123 (空格被编码为 %20)

  console.log(encodeURIComponent(set1)); // %3B%2C%2F%3F%3A%40%26%3D%2B%24
  console.log(encodeURIComponent(set2)); // -\_.!~\*'()
  console.log(encodeURIComponent(set3)); // %23
  console.log(encodeURIComponent(set4)); // ABC%20abc%20123 (the space gets encoded as %20)
  ```

  [MDN-encodeURIComponet](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)

- JS 原生获取 URL 中的参数

  ```JS
  const href='https://www.youtube.com/watch?v=Ttf3CEsEwMQ'
  const videoId=new URL(href).searchParams.get('v')
  console.log(videoId) // Ttf3CEsEwMQ
  ```

  [MDN-URL()](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/URL)

- JS 原生深拷贝方法 structuredClone()

  ```JS
  const person1 = { name: 'zhou', age: 43 };
  const person2 = { name: 'li', age: 42, member: person1 };
  const person3 = structuredClone(person2);
  console.log(person3);
  person1.name = 'wang';
  console.log(person2.member); // {name: 'wang', age: 43}
  console.log(person3.member); // {name: 'zhou', age: 43}
  ```

  [MDN-structuredClone()](https://developer.mozilla.org/zh-CN/docs/Web/API/structuredClone)

- 字面量定义对象时，用表达式作为对象的属性名

  ```JS
  const keyName = 'name'

  const obj = {
    [keyName]: 'lijialong',
  }
  ```

- 字符串与数字之间的转换

  ```JS
  const num = 123
  const str = '123'

  num + ''; //数字转字符串
  + str; //字符串转数字

  ```

- 可选链式操作符 optional chains (?.)

  > 可选链操作符 ( ?. ) 允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。?. 操作符的功能类似于 . 链式操作符，不同之处在于，在引用为空 (nullish ) (null 或者 undefined) 的情况下不会引起错误，该表达式短路返回值是 undefined。与函数调用一起使用时，如果给定的函数不存在，则返回 undefined。

  ```JS
  const person={ li: { sex : 'man' } }
  console.log(person.zhang.sex) // Uncaught TypeError: Cannot read properties of undefined (reading 'sex')
  console.log(person.zhang?.sex) // undefined
  ```

- 空值合并运算符 nullish coalescing operator (??)

  > 空值合并操作符（??）是一个逻辑操作符，当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数。
  > 与逻辑或操作符（||）不同，逻辑或操作符会在左侧操作数为假值时返回右侧操作数。也就是说，如果使用 || 来为某些变量设置默认值，可能会遇到意料之外的行为。比如为假值（例如，'' 或 0）时

  ```JS
  const name = '' || 'lisi' // name = 'lisi'
  const name = '' ?? 'zhangsan' // name = 'zhangsan'

  const number = 0 || 1000 // number = 1000
  const number = 0 ?? 1000 // number = 0
  ```

---

参考链接:  
[JavaScript Tip](https://markodenic.com/javascript-tips/)

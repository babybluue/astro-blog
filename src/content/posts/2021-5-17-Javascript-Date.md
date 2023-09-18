---
title: JavaScript Date对象
abbrlink: 614ea15c
date: 2021-05-17T10:10:44.000Z
updated: 2021-05-17T10:10:44.000Z
tags: JavaScript
---

创建一个新 Date 对象的唯一方式是通过 new 操作符，若将它作为常规函数调用将返回一个字符串。

```javascript
let time1 = new Date()
console.log(time1)
//Mon May 17 2021 13:57:48 GMT+0800 (中国标准时间)
typeof time1
//"string"

let time2 = new Date()
console.log(time2)
//Mon May 17 2021 13:57:48 GMT+0800 (中国标准时间)
typeof time2
//"object"
```

<!--more-->

#### Date()构造函数有四种基本形式。

```javascript
new Date()
new Date(value)
new Date(datestring)
new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]])
```

- 没有参数
  新创建的 Date 对象表示实例化时刻的日期和时间

- value unix 时间戳
  一个 Unix 时间戳（Unix Time Stamp），它是一个整数值，表示自 1970 年 1 月 1 日 00:00:00 UTC（the Unix epoch）以来的毫秒数
  ```javascript
  new Date(1621231068000)
  //Mon May 17 2021 13:57:48 GMT+0800 (中国标准时间)
  ```
- dateString 时间戳字符串
  dateString 表示日期的字符串值，该字符串应该可以被 Date.parse()识别。仅有日期的字符串(2021-5-17)会被处理为 UTC 而不是本地时间。

  ```javascript
  Date.parse('2021.5.17 13:57')
  Date.parse('2021-5-17 13:57')
  Date.parse('2021,5,17 13:57')
  Date.parse('2021/5/17 13:57')
  Date.parse('2021 5 17 13:57')
  Date.parse('17 May 2021 13:57')
  //以上不同字符串表示的结果一致 1621231020000
  Date.parse('2021-5-17')
  //1621180800000
  //以上可以被Date.parse解析的日期格式都能由Date()构造函数识别
  ```

- 至少两个参数
  缺省值中，日期的默认参数为 1，时间的默认为 0
  year 表示年份的整数值。 0 到 99 会被映射至 1900 年至 1999 年，其它值代表实际年份。
  monthIndex 表示月份的整数值，从 0（1 月）到 11（12 月）。
  ```javascript
  new Date(99, 11)
  //Wed Dec 01 1999 00:00:00 GMT+0800 (中国标准时间)
  ```

#### 方法

- Date.now()
  返回自 1970-1-1 00:00:00 UTC（世界标准时间）至今所经过的毫秒数。
- Date.parse()
  解析一个表示日期的字符串，并返回从 1970-1-1 00:00:00 所经过的毫秒数。
- Date.UTC()

#### 实例方法

根据本地时间查询结果

- getDate() 返回月份中的第几天(1-31)
- getDay 返回星期中的第几天(0-6) 星期日是 0
- getFullYear() 返回四位数年份
- getYear() 返回 2-3 位的年份
- getTime() 返回从 UTC 时间到该日期经过的毫秒数
- getMinutes() getHours() getSeconds() getMilliseconds()

(根据 UTC 时间查询结果在前面加 UTC)

#### 转换方法

- toString()
  返回一个表示该日期对象的字符串
- toTimeString()
  以人类易读格式返回日期对象时间部分的字符串。
- toDateString()
  以人类易读的形式返回该日期对象日期部分的字符串。

  ```javascript
  const time = new Date('2021-5-17 13:57')
  time.toString()
  //"Mon May 17 2021 13:57:00 GMT+0800 (中国标准时间)"
  time.toTimeString()
  //"13:57:00 GMT+0800 (中国标准时间)"
  time.toDateString()
  //"Mon May 17 2021"
  ```

- toISOString() 　 toJSON()
  把一个日期转换为符合 ISO 8601 扩展格式的字符串。

  ```javascript
  time.toISOString()
  time.toJSON()
  //"2021-05-17T05:57:00.000Z"
  ```

- toLocaleString()
  返回一个表示该日期对象的字符串，该字符串与系统设置的地区关联（locality sensitive）
- toLocaleDateString()
  返回一个表示该日期对象日期部分的字符串
- toLocaleTimeString()
  返回一个表示该日期对象时间部分的字符串，

  ```javascript
  time.toLocaleString()
  //"2021/5/17下午1:57:00"
  time.toLocaleDateString()
  //"2021/5/17"
  time.toLocaleTimeString()
  //"下午1:57:00"
  ```

- valueOf() 返回一个日期对象的原始值。

  ```javascript
  time.valueOf()
  time.getTime()
  //1621231020000
  ```

#### 应用

- JavaScript 的时间由世界标准时间（UTC）1970 年 1 月 1 日开始，用毫秒计时，一天由 86,400,000 毫秒组成，中国时区比 utc 快八个小时，即 UTC+8，因此计算的时候要加 8 小时

  ```javascript
  const date = new Date()
  const localDate = date.getTime() + 288e5 // 288e5 = 8 * 3600 * 1000
  ```

- ISO 时间

  ISO 代表了国际通用的日期时间格式，排列顺序为 YYYY-MM-DD HH:mm:ss:SSS
  每个日期和时间都有固定的位数，不够的位数用 0 补齐
  ISO 格式不允许空格，T 用来间隔日期和时间，Z 表示时间为 UTC 时间，不带空格

  ```javascript
    <!-- 获得一个标准格式日期 -->
    const ISO = new Date(localDate).toISOString()
    //"2022-12-30T07:34:24.914Z"
    new Date(localDate).toISOString().replace('T', ' ').slice(0, 19)
    //"2022-12-30 07:34:24"
  ```

---

参考链接：
[MDN-Date](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)

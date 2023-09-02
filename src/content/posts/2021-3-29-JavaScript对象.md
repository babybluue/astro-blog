---
title: JavaScript对象
tags: JavaScript
abbrlink: 17d9136e
date: 2021-03-30T14:07:56.000Z
updated: 2021-03-30T14:07:56.000Z
category: post
---

JavaScript 有七种主要类型，string、number、boolean、null、undefined、object、symbol(es6)。  
除对象外，其他统称为简单基本类型，string、number、boolean、null、undefined、symbol，它们本身并不是对象。尽管 typeof null 会返回 object，但这是语言 bug(null 二进制表示是全 0，而前三位为 0 就被 js 判为对象)。

<!--more-->

JavaScript 有许多特殊的对象子类型，称之为复杂基本类型。其中函数和数组就是对象的一种类型。

```javascript
typeof 123; //'number'
typeof 'motherfucker'; //string
typeof [1, 2, 3, 4]; //object
typeof function a() {}; //function
```

JavaScript 中还有一些对象子类型，String、Number、Boolean、Object、Function、Array、Date、RegExp、Error，通常被称为内置对象，尽管有些内置对象的名字和简单基本类型相似。  
这些内置对象实质上是一些内置函数，它们可以当作构造函数(即由 new 产生的函数调用)来使用，从而可以构造一个对应子类型的新对象。

```javascript
//文字形式
const str = 'hello motherfucker';
typeof str; //'string'
str instanceof String; //false

//构造形式
const strObject = new String('hello motherfucker');
typeof strObject; //'object'
typeof String; //'function'
strObject instanceof String; //true
strObject instanceof Object; //true
```

一般而言，const str='hello motherfucker' str 只是一个字面量，并且是一个不可变的值，如果要在这个字面量上执行一些操作，比如获取字符串长度等就需要先将它转换成 String 对象。而我们平时可以直接访问属性和方法是因为 JavaScript 引擎会自动把自变量转换成 String 对象。

对于字符串、布尔和数值，它们的文字形式声明是一个字面量，而构造声明类型是对象。null 和 undefined 没有构造形式只有文字形式，Date 只有构造没有文字。而对于数组、函数、对象、正则表达式，它们的文字和构造声明都是对象。  
Error 对象一般是在抛出异常时被自动创建，也可以使用 new Error()主动创建。

---

#### 对象的内容

对象的内容是由一些存储在特定命名位置的任意类型值组成，即属性。所谓特定命名位置是指这些值并未存储在对象内部，只有属性的名称被存储到了对象容器内部，它们引用了这些值真正的存储位置。

```javascript
const myObj = {
  a: 'hello motherfucker',
};
myObj.a; //属性访问
myObj['a']; //键访问
```

属性访问要求属性名满足标识符的命名规范，而键访问可以接受任意字符串作为属性名。  
在对象中，属性名永远都是字符串，如果使用字符串以外的其它类型作为属性名，会被转换成字符串。

#### 复制对象

浅拷贝和深拷贝的区别，浅拷贝会复制原对象里定义的属性，而引用原对象里的引用；深拷贝则会复制原对象里的属性并且复制原对象里的引用。也就是说浅拷贝对象的引用和原对象里的引用是同一个源，而深拷贝则会引用一个新复制的源。

JSON 安全的对象：可以被序列化成一个 JSON 字符串并且可以根据这个字符串解析出一个结构和值完全一样的对象。它只适应于一般的拷贝(数组或者对象)，会丢失对象里的 function 和 undefined，以及其他一些问题。

```javascript
const newObj = JSON.parse(JSON.stringify(oldObj));
```

ES6 Object.assign()浅拷贝，第一个参数是目标对象，之后还可以跟一个或多个源对象。它会遍历一个或多个源对象的所有可枚举的自有键并把它们复制到目标对象。

#### 属性描述符

```javascript
const myObj = {
  a: 2,
};
Object.getOwnPropertyDescriptor(myObj, 'a');
/*
{
    value:2,
    writable:true,
    enumerable:true,
    configureble:true
}
*/
```

```javascript
const myObj = {};
Object.defineProperty(myObj, 'a', {
  value: 2,
  writable: true,
  configurable: true,
  enumerable: true,
});
```

- writable 决定是否可以修改属性的值
- configurable 只要属性是可配置的，就可以使用 defineProperty()方法来修改属性描述符
  即使属性是 configurable:false 还是可以将 writable 的状态由 true 改为 false，但是无法由 false 改为 true
  除了无法修改，还会禁止删除这个属性
- enumerable 控制属性是否会出现在对象的属性枚举中。
  如果设置成 false，属性就不会出现在枚举中，但是仍可以正常访问

#### 不变性

1. 对象常量  
   设置 writable:false 和 configurable:false 就可以创建一个常量属性(不可修改、重定义或者删除)
2. 禁止扩展 Object.preventExtensions()
   禁止对象添加新属性
3. 密封 Object.seal()
   密封之后不能添加新属性，也不能重新配置或者删除任何现有属性，但是可以修该属性的值  
   方法实际上会在现有对象上调用 Object.preventExtensions()并把所有现有属性标记为 configurable:false
4. 冻结 Object.freeze()
   禁止对于对象本身及其任意直接属性的修改  
   方法实际上会在现有对象上调用 Object.seal()并把 writable 标记为 false

#### [[GET]] 和 [[PUT]]

对象默认的[[GET]]和[[PUT]]操作分别可以控制属性值的设置和获取

1. [[GET]]
   myObj.a 在 myObj 上实际是实现了[[GET]]操作，对象默认的内置[[GET]]操作首先在对象中查找是否有名称相同的属性，如果找到就返回这个属性的值。  
   然而，如果没有找到名称相同的属性，按照[[GET]]算法的定义会遍历可能存在的[[prototype]]链。  
   如果都没有找到名称相同的属性，那[[GET]]操作会返回 undefined  
   (这种方法和返回变量时是不一样的，引用一个当前词法作用域不存在的变量，并不会像对象属性返回 undefined，而是会抛出 ReferenceError 异常)

   ```javascript
   myObj.c;
   //undefined
   a;
   //Uncaught ReferenceError: a is not defined
   ```

2. [[PUT]]
   给对象的属性赋值时会触发[[PUT]]，[[PUT]]算法会检查以下内容
   - 对象中是否已经存在这个属性
   - 属性是否是访问描述符，如果是并且存在 setter 就调用 setter
   - 属性的数据描述符中 writable 是否是 false，是静默失败或者抛出异常
   - 如果都不是，将该值设置为属性的值

#### Getter 和 Setter

getter 和 setter 是隐藏函数，getter 会在获取属性值时调用，setter 会在设置属性值时被调用  
当给属性定义 getter、setter 时，这个属性会被定义为‘访问描述符’(和‘数据描述符’相对)。对于访问描述符来说，JavaScript 会忽略它们的 value 和 wirtable 特性，取而代之的是关心 set 和 get 特性

```javascript
const myObj = {
  get a() {
    return 2;
  },
};
myObj.a = 3;
myObj.a; //2
```

由于只定义了 a 的 getter，所以对 a 的值进行设置时 set 操作会忽略赋值操作，不会抛出错误。

```javascript
const myObj = {
  get a() {
    return this._a_;
  },
  set a(val) {
    this._a_ = val * 2;
  },
};
myObj.a = 2;
myObj.a; //4
```

#### 存在性

```javascript
const myObj = {
  a: 2,
};
'a' in myObj; //true
'b' in myObj; //false
myObj.hasOwnProperty('a'); //true
myObj.hasOwnProperty('b'); //false
```

in 操作符会检查属性是否在对象及其[[prototype]]原型链中。(检查的是属性名是否存在)  
hasOwnProperty 只会检查属性是否在 myObj 对象中，不检查原型链

- 枚举

  ```javascript
  const myObj = {
    a: 1,
    b: 2,
  };
  Object.defineProperty(myObj, 'b', {
    enumerable: false,
  });
  for (let i in myObj) {
    console.log(i);
  }
  //'a'
  ```

  可枚举就相当于可以出现在对象属性的遍历中 for...in..

  另外一种区别可枚举的方式 propertyIsEnumerable()

  ```javascript
  const myObj = {
    a: 1,
    b: 2,
  };
  Object.defineProperty(myObj, 'b', {
    enumerable: false,
  });
  myObj.propertyIsEnumerable('a'); //true
  myObj.propertyIsEnumerable('b'); //false

  Object.keys(myObj); //['a']
  Object.getOwnPropertyNames(myObj); //['a','b']
  ```

  propertyIsEnumerable()会检查给定的属性名是否直接存在于对象之中(而不是原型链)，并且满足 enumerable:true。

  Object.keys()会返回一个数组，包含所有的可枚举属性。Object.getOwnPropertyNames()会返回一个数组，包含所有属性，无论它们是否可枚举。  
  两个方法都只会查找对象直接包含的属性而不再查找原型链。

---
title: 关于JavaScript里的this
tags: JavaScript
abbrlink: 9315014e
date: 2021-03-20T11:13:19.000Z
updated: 2021-03-20T11:13:19.000Z
category: post
---

#### this 的两个误解

- this 指向函数自身?

```javascript
function test() {
  var count = 0
  console.log(this.count)
}
var count = 1
test() // 1
```

- this 指向函数的作用域?

```javascript
function foo() {
  var a = 2
  bar() //bar()处于foo()的作用域中
}
function bar() {
  console.log(a) //2
  console.log(this.a) //undefined
}
foo()
```

<!-- more -->

> this 是在运行时绑定的，并不是在编写时绑定的，它的上下文取决于函数调用时的各种条件，this 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。  
> 当一个函数被调用时，会创建一个活动记录(执行上下文)。这个记录会包含函数在哪里被调用(调用栈)、函数的调用方式、传入的参数等信息，this 就是这个记录的一个属性，会在函数执行的过程中用到。

#### this 的绑定规则

- **默认绑定**

  无法应用其他规则时的默认规则

```javascript
function foo() {
  console.log(this.a)
}
var a = 2
foo() //2
```

上面的例子中，this 指向的是全局对象，而 a 是声明在全局作用域中的变量，于是 this.a 即打印了变量 a 的值。当 foo()运行在严格模式下时，默认绑定不能绑定全局对象，打印结果会是 undefined

- **隐式绑定**

  调用位置是否有上下文对象，或者是否被某个对象'拥有'或者'包含'。

```javascript
function foo() {
  console.log(this.a)
}
var obj = {
  a: 2,
  foo: foo,
}
obj.foo() //2
```

上例中调用位置使用 obj 上下文来引用函数，可以看成函数被调用时它就属于了 obj 对象。当函数引用有上下文对象时，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象。

_隐式丢失_

```javascript
//隐式丢失
function foo() {
  console.log(this.a)
}
var obj = {
  a: 2,
  foo: foo,
}
var bar = obj.foo
//bar实际上引用的是foo函数本身，此时的bar()是一个不带任何修饰的函数调用
var a = 'wuhu'
bar() //wuhu
```

同样，在将函数作为参数传递时也会发生赋值，只不过这是一种隐式赋值。

```javascript
//隐式丢失
function foo() {
  console.log(this.a)
}
function doFoo(fn) {
  fn() //传递的函数实际的调用位置，js引擎应用默认调用规则
}
var obj = {
  a: 2,
  foo: foo,
}
var a = 'wuhu'
doFoo(obj.foo) //wuhu
```

- **显示绑定**

  不在对象内部包含函数引用，而是在某个对象上强制调用函数，函数的 call()和 apply()方法,bind()方法

call()和 apply()的第一个参数是用来绑定 this 的，可以直接指定 this 的绑定对象。如果传入的是一个非对象类型，比如字符串或者数字，会被转化成它的对象形式(new String()、new Number())。

```javascript
function foo() {
  console.log(this.a)
}
var obj = {
  a: 2,
}
//把foo的this强行绑定到obj上
foo.call(obj) //2
```

apply()和 call()作用完全一样，只是接受参数的方式不一样

```javascript
func.call(this, arg1, arg2)
func.apply(this, [arg1, arg2])
```

_硬绑定_

```javascript
function foo(something) {
  console.log(this.a, something)
  return this.a + somethig
}
var obj = {
  a: 2,
}
var bar = function () {
  return foo.apply(obj, arguments)
  /*arguments 是一个函数的局部变量。
  它可以被用作被调用对象的所有未指定的参数。
  这样，你在使用apply函数的时候就不需要知道被调用对象的所有参数。
  你可以使用arguments来把所有的参数传递给被调用对象
  被调用对象接下来就负责处理这些参数。*/
}
var b = bar(3) //2 3
console.log(b) //5
```

在上面的例子里，无论如何调用 bar 函数，它都会永远会返回 foo 被绑定后的结果，这种显示的强制绑定为硬绑定。

bind()函数就是为了方便硬绑定而出现的函数

```javascript
function foo(something) {
  console.log(this.a, something)
  return this.a + something
}
var obj = {
  a: 2,
}
var bar = foo.bind(obj)
var b = bar(3) //2 3
console.log(bar) // 5
```

bind()会返回一个硬编码的新函数--它会把你指定的参数设置为 this 的上下文并调用原始函数

_API 调用的'上下文'_

第三方库的一些函数，JavaScript 语言和宿主环境中许多新的内置函数都提供一个可选的参数，通常被称为上下文(context),其作用和 bind()一样，确保调用函数使用指定的 this

```javascript
function foo(el) {
  console.log(el, this.id)
}
var obj = {
  id: 'hello motherfucker',
}
;[1, 2, 3].forEach(foo, obj)
//1 hello... 2 hello... 3 hello...
```

forEach 的第二个参数，绑定回调时函数的 this 值

- **new 绑定**

JavaScript 里的构造函数:

> 构造函数只是一些使用 new 操作符时被调用的函数。它们并不会属于某个类，也不会实例化一个类。实际上，它们甚至都不能说是一种特殊的函数类型，它们只是被 new 操作符调用的普通函数而已，这种函数调用被称为构造函数调用。

> 实际上并不存在所谓的‘构造函数’，只有对于函数的‘构造调用’

使用 new 来调用函数会自动执行下面的操作:

1. 创建一个全新的对象
2. 这个新对象会被执行[Prototype]连接
3. 这个新对象会绑定到函数调用的 this
4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象

```javascript
function foo(a) {
  this.a = a
}
var bar = new foo(2)
console.log(bar.a) //2
console.log(bar) // foo {a:2}
```

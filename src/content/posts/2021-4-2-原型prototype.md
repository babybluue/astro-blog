---
title: 原型Prototype
tags: JavaScript
abbrlink: 1138741b
date: 2021-04-02T11:12:15.000Z
updated: 2021-04-06T17:19:15.000Z
---

JavaScript 常被描述为一种基于原型的语言 (prototype-based language)——每个对象拥有一个原型对象，对象以其原型为模板、从原型继承方法和属性。原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为原型链 (prototype chain)，它解释了为何一个对象会拥有定义在其他对象中的属性和方法。

<!--more-->

#### JS 是靠原型链传递属性和方法

在传统的 OOP 中，首先定义“类”，此后创建对象实例时，类中定义的所有属性和方法都被复制到实例中。在 JavaScript 中并不如此复制——而是在对象实例和它的构造器之间建立一个链接（[[prototype]]），之后通过上溯原型链，在上层对象中找到这些属性和方法。

#### JS 对象的[[prototype]]

```javascript
Object.getPrototypeof(Object.prototype); //null
```

JavaScript 的对象都有一个特殊的[[prototype]]内置属性，这个属性指向了创建该对象的构造函数的原型，就是这个属性将对象连接在了一起，构成了 JavaScript 的原型链。  
所有的[[prototype]]链最终都指向 Object.prototype，这就是所有对象都有 valueOf 和 toString 方法的原因，因为这是从 Object.prototype 继承的。而 Object.prototype 的原型是 null，null 就是原型链的尽头。

```javascript
const obj1 = {
  str1: 'hello motherfucker',
};
const obj2 = Object.create(obj1); //create方法为创建的对象指定原型对象
console.log(obj2); //{}
console.log(obj2.str1); //'hello mothercfucker'
Object.getPrototypeof(obj2) === obj1; //true
```

obj1 对象有一个变量 str1，通过 Object.create()方法为新建的对象 obj2 指定它的原型对象为 obj1。  
当访问 obj2.str1 时，会首先查找 obj2 是否存在这个属性，如果不存在通过它的内置属性[[prototype]]访问它的原型对象 obj1，查找原型对象里是否存在这个属性。

**访问对象的[[prototype]]属性**

因为对象的[[prototype]]属性是内置属性，没有办法直接访问，但是可以通过 Object.getPrototypeof 和对象的\_\_proto\_\_方法访问。  
\_\_proto\_\_方法存在于内置的 Object.prototype 中，它就像是 getter/setter 方法，访问\_\_proto\_\_时，实际上是调用了\_\_proto\_\_()方法，这个方法可以在内部访问对象的[[prototype]]属性在外部展示。

#### JS 函数的 prototype 属性

```javascript
function Foo() {}
Foo.prototype; //{}
const test = new Foo();
typeof test; //object
Object.getPrototypeof(test) === Foo.prototype; //true
```

所有的函数默认都会有一个名为 prototype 的公有且不可枚举的属性，对于普通函数来说，该属性基本无用。但是，对于构造函数来说，生成实例的时候，该属性会自动成为实例对象的原型。  
原型对象的作用，就是定义所有实例对象共享的属性和方法。这也是它被称为原型对象的原因，而实例对象可以视作从原型对象衍生出来的子对象。

#### constructor 属性

```javascript
Object.prototype.constructor === Object; //true
const obj = {};
obj instanceof Object; //true
```

prototype 对象有一个 constructor 属性，默认指向 prototype 对象所在的构造函数。  
instanceof 检测对象是否为某个构造函数的实例。

---

- [cnBlog-JS 中的 prototype、\_\_proto\_\_与 constructor](https://www.cnblogs.com/jing-tian/p/11459716.html)
- [MDN-对象原型](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object_prototypes)
- [对象的继承](https://wangdoc.com/javascript/oop/prototype.html)

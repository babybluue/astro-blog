---
title: Angular与Vue的语法比较
tags:
  - Angular
  - Vue
abbrlink: 956d8401
date: 2022-06-11T13:48:14.000Z
updated: 2022-06-11T13:48:14.000Z
---

最近在看 Vue 文档，发现 Vue 与我现在使用的 Angular 在语法上有许多相似之处，于是决定对照着 Vue 官方文档，比较一下两个框架的语法结构。

#### 模版语法

- 插值
  Vue 与 Angular 的模版数据绑定都是使用“Mustache” (双大括号) 语法的文本插值。

  ```HTML
    <div> {{ message }} </div>
    <div> {{ message.split('').reverse().join('') }} </div>
  ```

  <!-- more -->

  对于在模版中插入 HTML 代码时，Vue 使用 v-html 指令，而 Angular 使用 innerHTML 属性。

  ```HTML
  <!-- Vue -->
  <span v-html="rawHtml"></span>

  <!-- Angular -->
  <span [innerHTML]="rawHtml"></span>
  ```

  对于属性绑定 Vue 通过 v-bind 指令绑定，Angular 通过 [属性名]="值" 绑定。

  ```HTML
  <!-- Vue -->
  <button v-bind:disabled="isDisabled">click</button>

  <!-- Angular -->
  <button [disabled]="isDisabled">click</button>
  ```

- 指令
  Vue 的指令是带有 v- 前缀的特殊 attribute，例如 _v-if_ _v-bind_ _v-on_ _v-for_ _v-model_ 等。其中 v-bind:attibute 可以缩写为:attibute,v-on:event 可以缩写为@event。

  Angular 的内置指令也是带有标志性字符 ng 前缀的 attribute，例如 _ngIf_ _ngFor_ _ngStyle_ _ngModel_ 等。但是在使用时需要通过[ngIf]="condition"的形式，对于结构性指令 _ngIf_ _ngFor_ _ngSwitch_ 也可以通过\*ngIf="condition"的语法糖表示。

  ```HTML
  <!-- Vue -->
  <div v-if="isShow">{{ message }}</div>
  <a :href="url"> ... </a>
  <a @click="doSomething"> ... </a>

  <!-- Angular -->
  <div *ngIf="isShow">{{ message }}</div>
  <a [href]="url"> ... </a>
  <a (click)="doSomething"> ... </a>
  ```

#### Class 与 Style 绑定

因为 class 列表和内联样式都是元素的 attribute，在 Vue 中绑定 Class 和 Style 只需要通过 v-bind 指令绑定 class 和 style 属性即可，Vue 对此做了专门的增强，表达式结果的类型除了字符串之外，还可以是对象或数组。  
而在 Angular 中，可以通过[class]="className" [style]="styleObject"的形式绑定，也可以利用 ngClass 和 ngStyle 指令绑定。但是前者(属性绑定方法)只能接受字符串，ngClass 可以接受对象或数组，ngStyle 可以接受对象表达式。

```HTML
<!-- const isActive = true; -->
<!-- const styleObject = { color: 'red' }; -->
<!-- const styleArr =[ {color: 'red'}, { background: 'blue'}]; -->

<!-- Vue -->
<div :class="{ active: isActive}"> ... </div>
<div :class="['classA','classB']"></div>

<div :style="styleObject"> ... </div>
<div :style="styleArr"> ... </div>


<!-- Angular -->
<div [class]="isActive ? 'active' : ''"> ... </div>

<div [ngClass]="{ active: isActive }"> ... </div>
<div [ngClass]="['classA','classB']"> ... </div>

<div [style]="styleObject"> ... </div>
<div [style]="{ color: isValid ? '' : 'blue' }"> ... </div>

<div [ngStyle]="styleObject"> ... </div>
<div [ngStyle]="{ color: isValid ? '' : 'blue' }"> ... </div>
```

#### 条件渲染

Vue 中\<template>元素可以包含任意的 HTML，并且最终渲染结果不会包括在 DOM 中。同样，在 Angular 中，\<ngTemplate> 元素也有相同的作用。

```HTML
<!-- Vue -->
<div v-if="isShow"> ... </div>
<div v-else-if="isShow"> ... </div>
<div v-else> ... </div>
<div v-show="isShow">...</div>

<!-- Angular -->
<div *ngIf="isShow; else others"></div>
<ng-template #others>...</ng-template>
```

#### 列表渲染

Vue 与 Angular 都可以对数组和对象的内容进行渲染，但是二者对索引的处理不同，并且 Angular 对于对象内容的渲染需要使用 Angular keyvalue 管道。

```HTML
<!-- const list=[ {name: 'zhangsan'}, {name: 'lisi'} ]; -->
<!-- const book={name:'hello world', price: 100, author:'zhangsan'}; -->

<!-- Vue -->
<ul>
  <li v-for="(item, index) in list">{{ index }} - {{ item.name }}</li>
</ul>

<ul>
  <li v-for="(value, name, index) in book">{{ index }} - {{ name }} - {{value}}</li>
</ul>

<!-- Angular -->
<ul>
  <li *ngFor="let item of list; index as i">{{i}} - {{ item.name }}</li>
</ul>

<ul>
  <li *ngFor="let item of book | keyvalue; index as i">{{i}} - {{ item.key }} - {{item.value}}</li>
</ul>

```

#### 事件处理

Vue 对于事件使用@修饰，即@click="doSomething"，Angular 使用(click)="doSomething"的形式。但是 Vue 有许多事件修饰符要比 Angular 灵活一些。

```HTML
<!-- Vue -->
<a @click="doSomething($event)"> ... </a>

<!-- Angular -->
<a (click)="doSomething($event)"> ... </a>
```

#### 表单绑定

Vue 使用 v-model 指令在表单元素上创建双向数据绑定，Angular 使用 ngModel 指令与表单元素进行绑定，其中[ngModel]='modelValue'属于单向绑定，[(ngModel)]='modelValue'属于双向绑定。

```HTML
<!-- Vue -->
<input v-model="name">

<!-- Angular -->
<input [(ngModel)]="name">
```

#### 组件基础

二者父组件向子组件传值时都以数据绑定的形式 _:posts="blogs"_ _[posts]="blogs"_，属性名为子组件的变量名，属性值为父组件的变量名。在向子组件监听事件时，都是以事件处理的方式 _@delete="removeBlog(index)"_ _(deleteEvent)="removeBlog(index)"_，事件名为子组件定义的 emit 事件名称。
二者的子组件在接受父组件的传值以及向父组件发送事件时都需要在组件前面声明一下，Vue 为 _props:[\]_ 和 _emits:[\]_，Angular 为 _@Input()_ 和 _@Output()_。

```JS
//Vue父组件传递数据以及监听子组件事件
const app = Vue.createApp({
  data(){
    return{
      blogs:[...]
    }
  }
  methods: {
    removeBlog(index) {},
  },
  template:`
    <blog-post :posts="blogs" @delete="removeBlog(index)"></blog-post>
  `
});

// Vue子组件获取数据以及事件的语法
app.component('blog-post', {
  props: ['posts'],
  emits: ['delete'],
  methods: {
    remove(index) {
      this.$emit('delete', index);
    },
  },
  template: `
    <div v-for='(post,index) of posts'>
        <h3>{{post.title}}</h3>
        <p>{{post.content}}</p>
        <button @click="remove(index)">click</button>
    </div>
  `,
});


//Angular父组件传递参数以及监听子组件事件
@Component({
  selector: 'app-root',
  template: `
  <blog-post [posts]="blogs" (deleteEvent)="removeBlog(index)"></blog-post>
  `,
  styleUrls:'',
})
export class AppCom{
  blogs=[]
  removeBlog(index){}
}

//Angular子组件传递数据以及事件的语法
@Component({
  selector: 'blog-post',
  template: `
  <div *ngFor="let post of posts">
      <h3>{{post.title}}</h3>
      <p>{{post.content}}</p>
      <button (click)="remove(index)">click</button>
  </div>
  `,
  styleUrls:'',
})
export class childCom{
  @Input() posts: Array<any>;
  @Output() deleteEvent = new EventEmitter<number>();
  remove(){
    this.deleteEvent.emit(index);
  }
}
```

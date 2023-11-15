---
title: JavaScript操作Dom元素
abbrlink: 3ff28d3c
date: 2021-11-12T00:49:03.000Z
tags:
  - JavaScript
---

```HTML
<div class="container">
    <div class="box">1</div>
    <div class="box">2</div>
    <div class="box">3</div>
</div>

<script>
  const box1 = document.querySelector(".box:first-child");
  const box2 = document.querySelector(".box:nth-child(2)");
  const box3 = document.querySelector(".box:last-child");
  const subDiv = document.createElement("div");
  subDiv.setAttribute(
        "style",
        "background:lightblue;width:200px;height:200px"
      );
</script>


```

<!-- more -->

- 节点 Node
  Node 是一个接口，各种类型的 DOM API 对象会从这个接口继承。 包含 Document, Element, Attr, Text, Comment, DocumentFragment, DocumentType 等

  Node.nodeName
  返回一个包含该节点名字的 DOMString。节点的名字的结构和节点类型不同。比如 HTMLElement 的名字跟它所关联的标签对应，就比如 HTMLAudioElement 的就是 'audio' ，Text 节点对应的是 '#text' 还有 Document 节点对应的是 '#document'。

  Node.nodeType
  返回一个与该节点类型对应的无符号短整型的值,例如 ElementNode=>1 TextNode=>3 CommentNode=>8 DocumentNode=>9

  ```JavaScript
  const container=document.querySelector('.container')
  console.log(container.nodeName) // 'DIV'
  console.log(container.nodeType) // 1
  console.log(container.childNodes) // [text, div.box, text, div.box, text, div.box, text]
  console.log(container.childNodes[0].textContent) // '\n      ' 换行

  ```

- insertBefore()

  > Node.insertBefore() 方法在参考节点之前插入一个拥有指定父节点的子节点。如果给定的子节点是对文档中现有节点的引用，insertBefore() 会将其从当前位置移动到新位置(在将节点附加到其他节点之前，不需要从其父节点删除该节点。

  > 这意味着一个节点不能同时位于文档的两个点中。因此，如果节点已经有父节点，则首先删除该节点，然后将其插入到新位置。在将节点追加到新父节点之前，可以使用 Node.cloneNode() 复制节点。注意，使用 cloneNode() 创建的节点副本不会自动与原始节点保持同步。

  ```JavaScript
    //在 box2 前插入新元素
    box2.parentNode.insertBefore(subDiv, box2);
    //在 box1 前插入 box3，box3 从原来的位置移动到新位置
    box1.parentNode.insertBefore(box3, box1);
  ```

- after()

  > Element.after() 方法会在其父节点的子节点列表中插入一些 Node 或 DOMString 对象。插入位置为该节点之后。DOMString 对象会被以 Text 的形式插入。如果给定的子节点是对文档中现有节点的引用,同样会将其从当前位置移动到新位置。

  ```JavaScript
  box2.after(subDiv);
  ```

- remove()

  > Element.remove() 把对象从它所属的 DOM 树中删除。

  ```JavaScript
  box2.remove()
  ```

- replaceChild()

  > Node.replaceChild() 方法用指定的节点替换当前节点的一个子节点，并返回被替换掉的节点。

  ```JavaScript
    //subDiv 替换 box2
    box2.parentNode.replaceChild(subDiv, box2);
    //box3替换 box1，box3 从原来的位置移动到 box1
    box1.parentNode.replaceChild(box3, box1);
  ```

- append()

  > Element.append 方法在 Element 的最后一个子节点之后插入一组 Node 对象或 DOMString 对象。

  ```JavaScript
    //按照顺序插入到container末尾，box2 位置移动
    container.append(subDiv, box2);
  ```

- appendChild()

  > Node.appendChild() 方法将一个节点附加到指定父节点的子节点列表的末尾处。如果将被插入的节点已经存在于当前文档的文档树中，那么 appendChild() 只会将它从原先的位置移动到新的位置（不需要事先移除要移动的节点）。

  > 这意味着，一个节点不可能同时出现在文档的不同位置。所以，如果某个节点已经拥有父节点，在被传递给此方法后，它首先会被移除，再被插入到新的位置。若要保留已在文档中的节点，可以先使用 Node.cloneNode() 方法来为它创建一个副本，再将副本附加到目标父节点下。请注意，用 cloneNode 制作的副本不会自动保持同步。

  ```JavaScript
    container.appendChild(subDiv);
    container.appendChild(box1);
  ```

- append() 与 appendChild() 差异：

  > Element.append() 允许追加 DOMString 对象，而 Node.appendChild() 只接受 Node 对象。
  > Element.append() 没有返回值，而 Node.appendChild() 返回追加的 Node 对象。
  > Element.append() 可以追加多个节点和字符串，而 Node.appendChild() 只能追加一个节点。

- documentFragment

  > DocumentFragment，文档片段接口，一个没有父对象的最小文档对象。它被作为一个轻量版的 Document 使用，就像标准的 document 一样，存储由节点（nodes）组成的文档结构。与 document 相比，最大的区别是 DocumentFragment 不是真实 DOM 树的一部分，它的变化不会触发 DOM 树的重新渲染，且不会导致性能等问题。

  > 最常用的方法是使用文档片段作为参数（例如，任何 Node 接口类似 Node.appendChild 和 Node.insertBefore 的方法），这种情况下被添加（append）或被插入（inserted）的是片段的所有子节点, 而非片段本身。因为所有的节点会被一次插入到文档中，而这个操作仅发生一个重渲染的操作，而不是每个节点分别被插入到文档中，因为后者会发生多次重渲染的操作。

- cloneNode()
  `const dupNode = node.cloneNode(deep);`
  deep 是否采用深度克隆,如果为 true,则该节点所有后代节点也都会被克隆,如果为 false,则只克隆该节点本身，默认值为 false

  > 克隆一个元素节点会拷贝它所有的属性以及属性值,当然也就包括了属性上绑定的事件(比如 onclick="alert(1)"),但不会拷贝那些使用 addEventListener()方法或者 node.onclick = fn 这种用 JavaScript 动态绑定的事件.

#### 示例

1. 替换子元素的父元素(保留子元素)

   ```JavaScript
   const container=document.querySelector('.container')
   const newFragment=document.createDocumentFragment()
   const newDiv=document.createElement('div')

   for(i=0;i<container.children.length;i++){
   // 1. newFragment.append(container.children[i].cloneNode())
   // 2. newDiv.append(container.children[i].cloneNode())
   }

   // 1. container.parentNode.replaceChild(newFragment,container)
     <div class="box">1</div>
     <div class="box">2</div>
     <div class="box">3</div>
   // 2. container.parentNode.replaceChild(newDiv,container)
     <div>
       <div class="box">1</div>
       <div class="box">2</div>
       <div class="box">3</div>
     </div>
   ```

   如上，通过 createDocumentFragment()创建的 newFragment 片段通过 replaceChild()添加到文档之后，添加的是片段的所有子节点，而非片段本身。而且如此即是将三个子节点一起插入到文档。

   另外在 for 循环通过 append 插入元素`newDiv.append(container.children[i].cloneNode())`，如果不克隆(cloneNode())该子元素的话，实际上插入的子元素只有 box1 和 box3。`newDiv.append(container.children[i])`在插入第一个子元素时，导致 box1 在原来的节点发生了移动，因此原来的 container 节点现在只剩下 box2 和 box3 两个元素。

```JavaScript
const container = document.querySelector(".container");
const allBox = document.querySelectorAll(".box");
for (i = 0; i < allBox.length; i++) {
  allBox[i].textContent = i;
  const div = document.createElement("div");
  div.setAttribute("style", "border:1px solid green;width:100px;height:100px");
  if (i == 0) {
    allBox[i].parentNode.insertBefore(allBox[i + 1], allBox[i]);
  }
  if (i == 1) {
    // allBox[i].remove();
  }
  if (i == 2) {
    allBox[i].after(allBox[i - 1].cloneNode(true));
    // allBox[i].parentNode.replaceChild(div, allBox[i]);
  }
}

const table = document.querySelector("table");
const trs = document.querySelectorAll("table tr");
trs.forEach((tr, indextr) => {
  const tds = tr.querySelectorAll("td");
  const divChild = tr.querySelectorAll("td:nth-child(2) div");

  if (divChild.length > 1) {
    for (i = 0; i < divChild.length; i++) {
      const newTr = document.createElement("tr");
      tds.forEach((td, indextd) => {
        const child = td.querySelectorAll("div");
        if (child.length !== 0) {
          const newTd = document.createElement("td");
          console.log(child[0].innerHTML);
          newTd.append(child[i].cloneNode(true));
          newTr.append(newTd);
        } else if (i == 0) {
          const newTd = document.createElement("td");
          td.parentNode.replaceChild(newTd, td);
          newTd.append(td.textContent);
          newTd.setAttribute("rowspan", divChild.length);
          newTr.append(newTd);
        }
        tr.parentNode.insertBefore(newTr, tr);
      });
    }
    tr.remove();
  }
});
```

---

参考链接:  
[Node 节点](https://developer.mozilla.org/zh-CN/docs/Web/API/Node)
